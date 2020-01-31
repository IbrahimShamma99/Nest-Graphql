import { IOptions } from 'glob';
import { IResolvers } from '@kamilkisiela/graphql-tools';
export interface LoadSchemaFilesOptions {
    ignoredExtensions?: string[];
    extensions?: string[];
    useRequire?: boolean;
    requireMethod?: any;
    globOptions?: IOptions;
    exportNames?: string[];
    recursive?: boolean;
    ignoreIndex?: boolean;
}
export declare function loadSchemaFiles(path: string, options?: LoadSchemaFilesOptions): string[];
export interface LoadResolversFilesOptions {
    ignoredExtensions?: string[];
    extensions?: string[];
    requireMethod?: any;
    globOptions?: IOptions;
    exportNames?: string[];
    recursive?: boolean;
    ignoreIndex?: boolean;
}
export declare function loadResolversFiles<Resolvers extends IResolvers = IResolvers>(path: string, options?: LoadResolversFilesOptions): Resolvers[];
export declare function loadSchemaFilesAsync(path: string, options?: LoadSchemaFilesOptions): Promise<string[]>;
export declare function loadResolversFilesAsync<Resolvers extends IResolvers = IResolvers>(path: string, options?: LoadResolversFilesOptions): Promise<Resolvers[]>;
