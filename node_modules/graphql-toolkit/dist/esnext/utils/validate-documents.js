import * as AggregateError from 'aggregate-error';
import { validate, specifiedRules } from 'graphql';
const rulesToIgnore = ['KnownFragmentNames', 'NoUnusedFragments', 'NoUnusedVariables', 'KnownDirectives'];
const effectiveRules = specifiedRules.filter((f) => !rulesToIgnore.includes(f.name));
export const validateGraphQlDocuments = (schema, documentFiles) => documentFiles
    .map(result => ({
    filePath: result.filePath,
    errors: validate(schema, result.content, effectiveRules),
}))
    .filter(r => r.errors.length > 0);
export function checkValidationErrors(loadDocumentErrors) {
    if (loadDocumentErrors.length > 0) {
        const errors = [];
        for (const loadDocumentError of loadDocumentErrors) {
            for (const graphQLError of loadDocumentError.errors) {
                const error = new Error();
                error.name = 'GraphQLDocumentError';
                error.message = `${error.name}: ${graphQLError.message}`;
                error.stack = error.message;
                graphQLError.locations.forEach(location => error.stack += `\n    at ${loadDocumentError.filePath}:${location.line}:${location.column}`);
                errors.push(error);
            }
        }
        throw new AggregateError(errors);
    }
}
//# sourceMappingURL=validate-documents.js.map