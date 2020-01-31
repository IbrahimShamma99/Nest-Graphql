import { Source } from 'graphql';
export interface ExtractOptions {
    tagPluck?: {
        modules?: Array<{
            name: string;
            identifier?: string;
        }>;
        magicComment?: string;
        globalIdentifier?: string;
    };
}
export declare function extractDocumentStringFromCodeFile(source: Source, options?: ExtractOptions): Promise<string | void>;
