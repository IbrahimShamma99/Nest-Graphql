import { DocumentNode } from 'graphql';
export declare type FetchFn = WindowOrWorkerGlobalScope['fetch'];
declare type Headers = Record<string, string> | Array<Record<string, string>>;
export interface LoadFromUrlOptions {
    headers?: Headers;
    fetch?: FetchFn;
}
export declare function loadFromUrl(url: string, options?: LoadFromUrlOptions): Promise<DocumentNode>;
export {};
