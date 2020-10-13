/// <reference types="node" />
import { RunContextServer } from '../rc-server';
import * as stream from "stream";
import { Mubble } from '@mubble/core';
export declare namespace UStream {
    const Encoding: {
        bin: string;
        text: string;
        json: string;
    };
    abstract class BaseStreams {
        readonly rc: RunContextServer;
        readonly streams: (stream.Writable | stream.Readable)[];
        readonly uPromise: Mubble.uPromise<any>;
        cleaned: boolean;
        readonly fnError: any;
        logging: boolean;
        constructor(rc: RunContextServer, streams: (stream.Writable | stream.Readable)[], uPromise?: Mubble.uPromise<any>);
        cleanup(): void;
        private onError;
        protected isWritable(stream: any): boolean;
        abstract subscribe(stream: stream.Writable | stream.Readable): void;
        abstract unsubscribe(stream: stream.Writable | stream.Readable): void;
    }
    class WriteStreams extends BaseStreams {
        private fnFinish;
        constructor(rc: RunContextServer, streams: (stream.Writable | stream.Readable)[], promise?: Mubble.uPromise<any>);
        write(data: Buffer | string): Promise<void>;
        subscribe(stream: stream.Writable | stream.Readable): void;
        unsubscribe(stream: stream.Writable | stream.Readable): void;
        private onFinish;
    }
    class ReadStreams extends BaseStreams {
        private encoding;
        private fnEnd;
        private fnData;
        private body;
        constructor(rc: RunContextServer, streams: (stream.Writable | stream.Readable)[], promise?: Mubble.uPromise<any>);
        read(encoding?: string): Promise<Buffer | string>;
        subscribe(stream: stream.Writable | stream.Readable): void;
        unsubscribe(stream: stream.Writable | stream.Readable): void;
        onData(chunk: Buffer | string): void;
        onEnd(): void;
    }
    class PipedWriterStreams extends BaseStreams {
        private fnFinish;
        constructor(rc: RunContextServer, streams: (stream.Writable | stream.Readable)[], promise?: Mubble.uPromise<any>);
        start(): Promise<void>;
        subscribe(stream: stream.Writable | stream.Readable): void;
        unsubscribe(stream: stream.Writable | stream.Readable): void;
        private onFinish;
    }
}
