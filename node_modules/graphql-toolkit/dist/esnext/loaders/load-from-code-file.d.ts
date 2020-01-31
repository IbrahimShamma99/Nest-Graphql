import { DocumentNode } from 'graphql';
import { ExtractOptions } from '../utils/extract-document-string-from-code-file';
export declare function loadFromCodeFile(filePath: string, options: ExtractOptions & {
    noRequire?: boolean;
}): Promise<DocumentNode>;
