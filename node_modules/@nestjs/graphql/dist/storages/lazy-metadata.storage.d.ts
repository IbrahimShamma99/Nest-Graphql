export declare class LazyMetadataStorageHost {
    private readonly storage;
    store(fn: Function): void;
    load(): void;
}
export declare const lazyMetadataStorage: LazyMetadataStorageHost;
