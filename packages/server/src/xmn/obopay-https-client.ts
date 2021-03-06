/*------------------------------------------------------------------------------
   About      : Obopay Https Client
   
   Created on : Tue Dec 18 2018
   Author     : Vishal Sinha
   
   Copyright (c) 2018 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/

import {
         Mubble,
         HTTP
       }                        from '@mubble/core'
import {
         CredentialRegistry,
         ServerCredentials
       }                        from './credential-registry'
import { RunContextServer }     from '../rc-server'
import { HttpsEncProvider }     from './https-enc-provider'
import { SecurityErrorCodes }   from './security-errors'
import { UStream }              from '../util'
import { RedisWrapper }         from '../cache'
import * as https               from 'https'
import * as http                from 'http'
import * as fs                  from 'fs'
import * as stream              from 'stream'
import * as lo                  from 'lodash'
import * as urlModule           from 'url'

const REQUEST_TS_RANGE    = 15 * 60 * 1000 * 1000,    // 15 minutes in micro seconds
      REQUEST_EXPIRY_SECS = 30 * 60,                  // 30 minutes in seconds
      PIPE_SEP            = ' | '

export namespace ObopayHttpsClient {

  export const OBOPAY_STR = 'obopay'
  export const API_STR    = 'api'

  const CLASS_NAME = 'ObopayHttpsClient',
        POST       = 'POST'

  let selfId             : string,
      credentialRegistry : CredentialRegistry,
      privateKey         : string,
      requestMem         : RedisWrapper

  export type ResultStruct = {
    error     : null   | string
    data      : number | string | Mubble.uObject<any>
    errorObj ?: Mubble.uObject<any>
  }

  export function init(rc           : RunContextServer,
                       selfIdentity : string,
                       registry     : CredentialRegistry,
                       pk           : string,
                       requestRedis : RedisWrapper) {

    rc.isDebug() && rc.debug(CLASS_NAME, 'Initializing ObopayHttpsClient.')
                    
    if(selfId) throw new Error('Calling init twice.')

    selfId             = selfIdentity
    credentialRegistry = registry
    privateKey         = pk
    requestMem         = requestRedis
  }

  export async function obopayApi(rc            : RunContextServer, 
                                  apiName       : string,
                                  params        : Mubble.uObject<any>,
                                  serverId      : string,
                                  syncHashPath ?: string) : Promise<ResultStruct> {

    if(!selfId || !credentialRegistry)
      throw new Error('ObopayHttpsClient not initialized.')

    const requestServer = credentialRegistry.getCredential(serverId)

    if(!requestServer || !requestServer.syncHash || !requestServer.host || !requestServer.port)
      throw new Error('requestServer not defined.')

    const syncHash                      = syncHashPath ? fs.readFileSync(syncHashPath).toString()
                                                       : requestServer.syncHash,
          requestTs                     = Date.now() * 1000,
          headers : Mubble.uObject<any> = {}

    rc.isDebug() && rc.debug(CLASS_NAME, 'requestTs', requestTs)

    const encProvider = new HttpsEncProvider(privateKey)

    headers[HTTP.HeaderKey.clientId]      = selfId
    headers[HTTP.HeaderKey.versionNumber] = HTTP.CurrentProtocolVersion
    headers[HTTP.HeaderKey.contentType]   = HTTP.HeaderValue.stream
    headers[HTTP.HeaderKey.symmKey]       = encProvider.encodeRequestKey(syncHash)
    headers[HTTP.HeaderKey.requestTs]     = encProvider.encodeRequestTs(requestTs)

    rc.isDebug() && rc.debug(rc.getName(this), 'Encoding body.', params)

    const encBodyObj = encProvider.encodeBody(params, false)

    headers[HTTP.HeaderKey.bodyEncoding] = encBodyObj.bodyEncoding

    if(!encBodyObj.contentLength) {
      headers[HTTP.HeaderKey.transferEncoding] = HTTP.HeaderValue.chunked
    }

    let unsecuredConn = requestServer.unsecured

    rc.isDebug() && rc.debug(CLASS_NAME,
                             `http${unsecuredConn ? '' : 's'} request headers.`,
                             headers)

    const urlObj : urlModule.UrlObject = {
      protocol : unsecuredConn ? HTTP.Const.protocolHttp : HTTP.Const.protocolHttps,
      hostname : requestServer.host,
      port     : requestServer.port,
      pathname : `/${apiName}`
    }

    const options : https.RequestOptions = {
      method   : POST,
      protocol : unsecuredConn ? HTTP.Const.protocolHttp : HTTP.Const.protocolHttps,
      hostname : requestServer.host,
      port     : requestServer.port,
      path     : `/${apiName}`,
      headers  : headers
    }

    return await request(rc,
                         urlModule.format(urlObj),
                         options,
                         syncHash,
                         encProvider,
                         encBodyObj.streams,
                         encBodyObj.dataStr,
                         unsecuredConn)
  }

  export async function request(rc            : RunContextServer,
                                url           : string,
                                options       : https.RequestOptions,
                                serverPubKey  : string,
                                encProvider   : HttpsEncProvider,
                                writeStreams  : Array<stream.Writable>,
                                dataStr       : string,
                                unsecured    ?: boolean) : Promise<ResultStruct> {

    rc.isDebug() && rc.debug(CLASS_NAME, `${unsecured ? 'http' : 'https'} request to server.`, url, options)

    const req          = unsecured ? http.request(url, options) : https.request(options),
          writePromise = new Mubble.uPromise(),
          readPromise  = new Mubble.uPromise()

    writeStreams.push(req)

    req.on('response', (resp : http.IncomingMessage) => {

      rc.isDebug() && rc.debug(CLASS_NAME,
                               `http${unsecured ? '' : 's'} response headers.`,
                               resp.headers)

      if(!resp.headers[HTTP.HeaderKey.symmKey]) {
        const err = new Error(`${HTTP.HeaderKey.symmKey} missing in response headers.`)
        writePromise.reject(err)
        readPromise.reject(err)
        
        return
      }

      if(!resp.headers[HTTP.HeaderKey.bodyEncoding])
        resp.headers[HTTP.HeaderKey.bodyEncoding] = HTTP.HeaderValue.identity
    
      encProvider.decodeResponseKey(serverPubKey, resp.headers[HTTP.HeaderKey.symmKey] as string)

      const readStreams = encProvider.decodeBody([resp],
                                                 resp.headers[HTTP.HeaderKey.bodyEncoding] as string,
                                                 true)

      const readUstream = new UStream.ReadStreams(rc, readStreams, readPromise)
      readUstream.read()
    })

    req.on('error', (err : Error) => {
      rc.isError() && rc.error(CLASS_NAME,
                               `http${unsecured ? '' : 's'} request error.`,
                               err)

      writePromise.reject(err)
      readPromise.reject(err)
    })

    const writeUstream = new UStream.WriteStreams(rc, writeStreams, writePromise)

    writeUstream.write(dataStr)

    rc.isStatus() && rc.status(CLASS_NAME,
                               `http${unsecured ? '' : 's'} request.`,
                               options)

    const [ , output] : Array<any> = await Promise.all([writePromise.promise,
                                                        readPromise.promise])

    rc.isStatus() && rc.status(CLASS_NAME,
                                `http${unsecured ? '' : 's'} response.`,
                                output.toString())

    const result = JSON.parse(output.toString()) as ResultStruct

    return result
  }

  export function getEncProvider() : HttpsEncProvider {
    return new HttpsEncProvider(privateKey)
  }

  export function verifyClientRequest(rc          : RunContextServer,
                                      clientId    : string,
                                      version     : string,
                                      encProvider : HttpsEncProvider,
                                      headers     : Mubble.uObject<any>,
                                      clientIp    : string) {

    rc.isDebug() && rc.debug(CLASS_NAME,
                             'Verifying client request headers.',
                             headers,
                             clientIp)

    if(!headers[HTTP.HeaderKey.symmKey]) {
      throw new Error(`${HTTP.HeaderKey.symmKey} missing in request headers.`)
    }

    encProvider.decodeRequestKey(headers[HTTP.HeaderKey.symmKey])

    const clientCredentials = credentialRegistry.getCredential(clientId)

    if(clientCredentials && clientCredentials.syncHash) {
        
      if(!ObopayHttpsClient.verifyVersion(version)) {
        throw new Mubble.uError(SecurityErrorCodes.INVALID_VERSION,
                                'Invalid protocol version : ' + version)
      }

      if(!ObopayHttpsClient.verifyClientId(clientId)) {
        throw new Mubble.uError(SecurityErrorCodes.INVALID_CLIENT,
                                'Invalid clientId ' + clientId)
      }

      if(!verifyIp(lo.cloneDeep(clientCredentials.permittedIps), clientIp)) {
        throw new Mubble.uError(SecurityErrorCodes.INVALID_CLIENT,
                                `Client IP not permitted: ${clientIp}`)
      }

      if(!headers[HTTP.HeaderKey.bodyEncoding])
        headers[HTTP.HeaderKey.bodyEncoding] = HTTP.HeaderValue.identity

      const requestTs = encProvider.decodeRequestTs(clientCredentials.syncHash, headers[HTTP.HeaderKey.requestTs])

      rc.isDebug() && rc.debug(CLASS_NAME, 'requestTs', requestTs)

      if(!verifyRequestTs(requestTs)) {
        throw new Mubble.uError(SecurityErrorCodes.INVALID_REQUEST_TS,
                                'requestTs out of range.')
      }

      return true
    }

    throw new Mubble.uError(SecurityErrorCodes.INVALID_CLIENT,
                            'Client not found in registry.')
  }

  export function verifyClientId(clientId : string) : boolean {
    const clientCredentials = credentialRegistry.getCredential(clientId)

    return !!clientCredentials
  }

  export function verifyIp(permittedIps : Array<string>, ip : string) : boolean {
    if(!permittedIps || !permittedIps.length) return true
    
    permittedIps.forEach((permittedIp) => permittedIps.push('::ffff:' + permittedIp))

    return lo.includes(permittedIps, ip)
  }

  export function verifyVersion(version : string) : boolean {
    return version === HTTP.CurrentProtocolVersion
  }

  export function verifyModule(module : string, apiName : string) : boolean {
    // TODO : Add module and apiName check

    return true
  }

  export function verifyRequestTs(requestTs : number) : boolean {
    const serverTsMicro = Date.now() * 1000

    return (serverTsMicro + REQUEST_TS_RANGE) > requestTs 
           && (serverTsMicro - REQUEST_TS_RANGE) < requestTs
  }

  export async function addRequestToMemory(xObopayTs   : string,
                                           xObopayCid  : string,
                                           apiName     : string,
                                           messageBody : string) {

    const key    = xObopayTs  + PIPE_SEP +
                   xObopayCid + PIPE_SEP +
                   apiName    + PIPE_SEP +
                   messageBody,
          replay = await verifyRequestReplay(key)

    if(replay)
      throw new Mubble.uError(SecurityErrorCodes.REQUEST_REPLAY, 'Replay attack ???')

    const multi = requestMem.redisMulti()

    multi.set(key, Date.now())
    multi.expire(key, REQUEST_EXPIRY_SECS)

    await requestMem.execRedisMulti(multi)
  }

  // Verifies request-replay, returns true for replay attacks.
  export async function verifyRequestReplay(requestKey : string) : Promise<boolean> {
    const exists = await requestMem.redisCommand().exists(requestKey)

    return exists
  }

  export function getThirdPartyRequestUrl(rc           : RunContextServer,
                                          credentials  : ServerCredentials,
                                          apiName      : string,
                                          apiParams    : Mubble.uObject<any>,
                                          unsecured   ?: boolean) : string {

    const encProvider    = getEncProvider(),
          requestPath    = encProvider.encodeThirdPartyRequestPath(apiParams),
          encRequestPath = encodeURIComponent(requestPath),
          urlObj         = {
                             protocol : unsecured ? HTTP.Const.protocolHttp : HTTP.Const.protocolHttps,
                             hostname : credentials.host,
                             port     : credentials.port,
                             pathname : `/${OBOPAY_STR}/${apiName}/${encRequestPath}`
                           },
          url            = urlModule.format(urlObj)

    rc.isStatus() && rc.status(CLASS_NAME, 'getThirdPartyRequestUrl', url)
                
    return url
  }
}
