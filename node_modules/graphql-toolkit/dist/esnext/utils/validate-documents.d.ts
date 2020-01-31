import { GraphQLSchema, GraphQLError } from 'graphql';
import { DocumentFile } from '../loaders/load-typedefs';
export interface LoadDocumentError {
    readonly filePath: string;
    readonly errors: ReadonlyArray<GraphQLError>;
}
export declare const validateGraphQlDocuments: (schema: GraphQLSchema, documentFiles: DocumentFile[]) => readonly LoadDocumentError[];
export declare function checkValidationErrors(loadDocumentErrors: ReadonlyArray<LoadDocumentError>): void | never;
