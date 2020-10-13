"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UStream = void 0;
const buffer_1 = require("buffer");
const core_1 = require("@mubble/core");
var UStream;
(function (UStream) {
    UStream.Encoding = {
        bin: 'bin',
        text: 'text',
        json: 'json'
    };
    class BaseStreams {
        constructor(rc, streams, uPromise = new core_1.Mubble.uPromise()) {
            this.rc = rc;
            this.streams = streams;
            this.uPromise = uPromise;
            this.cleaned = false;
            this.fnError = this.onError.bind(this);
            this.logging = false;
            const len = streams.length, lastStream = streams[len - 1], firstStream = streams[0], readable = firstStream;
            // Needed for Readable and PipedWriteStream
            if (readable.pause)
                readable.pause();
            this.subscribe(lastStream);
            lastStream.on('error', this.fnError);
            let prevStream = lastStream;
            for (let i = len - 2; i >= 0; i--) {
                const stream = streams[i];
                stream.on('error', this.fnError).pipe(prevStream);
                prevStream = stream;
            }
        }
        cleanup() {
            let lastStream, stream;
            if (this.cleaned)
                return;
            while (stream = this.streams.shift()) {
                // had skipped removeListener to avoid process level error event
                stream.removeListener('error', this.fnError);
                if (lastStream && lastStream.unpipe)
                    lastStream.unpipe(stream);
                lastStream = stream;
            }
            if (lastStream) { // last one, stream would be null at this point
                this.unsubscribe(lastStream);
            }
            this.cleaned = true;
        }
        onError(err) {
            if (this.cleaned)
                return;
            this.rc.isError() && this.rc.error(this.rc.getName(this), 'Error on streams', err);
            this.cleanup();
            this.uPromise.reject(err);
        }
        isWritable(stream) {
            return !!stream.write;
        }
    }
    UStream.BaseStreams = BaseStreams;
    class WriteStreams extends BaseStreams {
        constructor(rc, streams, promise) {
            super(rc, streams, promise);
        }
        async write(data) {
            const writeStream = this.streams[0];
            data ? writeStream.end(data) : writeStream.end();
            await this.uPromise.promise;
        }
        subscribe(stream) {
            if (!this.fnFinish)
                this.fnFinish = this.onFinish.bind(this);
            stream.on('finish', this.fnFinish);
        }
        unsubscribe(stream) {
            if (this.fnFinish)
                stream.removeListener('finish', this.fnFinish);
        }
        onFinish() {
            this.cleanup();
            this.uPromise.resolve(null);
        }
    }
    UStream.WriteStreams = WriteStreams;
    class ReadStreams extends BaseStreams {
        constructor(rc, streams, promise) {
            super(rc, streams, promise);
            this.encoding = UStream.Encoding.bin;
        }
        async read(encoding) {
            const stream = this.streams[0];
            if (encoding)
                this.encoding = encoding;
            stream.resume();
            const result = await this.uPromise.promise;
            this.logging && this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ReadStreams: result', buffer_1.Buffer.isBuffer(this.body) ? 'Buffer' : 'String', result.length);
            return result;
        }
        subscribe(stream) {
            if (!this.fnEnd) {
                this.fnEnd = this.onEnd.bind(this);
                this.fnData = this.onData.bind(this);
            }
            stream.on('data', this.fnData).on('end', this.fnEnd);
        }
        unsubscribe(stream) {
            if (!this.fnEnd)
                return;
            stream.removeListener('data', this.fnData);
            stream.removeListener('end', this.fnEnd);
        }
        onData(chunk) {
            if (this.cleaned)
                return;
            if (!this.body) {
                this.body = chunk;
                return;
            }
            if (chunk instanceof buffer_1.Buffer) {
                this.body = buffer_1.Buffer.concat([this.body, chunk]);
            }
            else {
                this.body += chunk;
            }
            this.logging && this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ReadStreams: onData', 'body', buffer_1.Buffer.isBuffer(this.body) ? 'Buffer' : 'String', this.body.length);
        }
        onEnd() {
            if (this.cleaned)
                return;
            this.cleanup();
            if (this.body === undefined) {
                this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'You have tried reading an empty file');
                this.body = buffer_1.Buffer.from('');
            }
            if (this.body instanceof buffer_1.Buffer) {
                if (this.encoding === UStream.Encoding.json || this.encoding === UStream.Encoding.text) {
                    this.body = this.body.toString();
                }
            }
            const result = this.encoding === UStream.Encoding.json ? JSON.parse(this.body || '{}') : this.body;
            this.logging && this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ReadStreams: onEnd', 'body', buffer_1.Buffer.isBuffer(result) ? 'Buffer' : 'String', result.length);
            this.uPromise.resolve(result);
        }
    }
    UStream.ReadStreams = ReadStreams;
    class PipedWriterStreams extends BaseStreams {
        constructor(rc, streams, promise) {
            super(rc, streams, promise);
            const firstStream = this.streams[0];
        }
        async start() {
            const firstStream = this.streams[0];
            this.rc.isAssert() && this.rc.assert(this.rc.getName(this), firstStream.resume);
            firstStream.resume();
            await this.uPromise.promise;
        }
        subscribe(stream) {
            if (!this.fnFinish)
                this.fnFinish = this.onFinish.bind(this);
            stream.on('finish', this.fnFinish);
        }
        unsubscribe(stream) {
            if (this.fnFinish)
                stream.removeListener('finish', this.fnFinish);
        }
        onFinish() {
            this.cleanup();
            this.logging && this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'PipedWriterStreams: onFinish');
            this.uPromise.resolve(null);
        }
    }
    UStream.PipedWriterStreams = PipedWriterStreams;
})(UStream = exports.UStream || (exports.UStream = {}));
//# sourceMappingURL=mubble-stream.js.map