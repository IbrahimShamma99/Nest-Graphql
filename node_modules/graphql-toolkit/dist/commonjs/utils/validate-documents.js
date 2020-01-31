"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateError = require("aggregate-error");
const graphql_1 = require("graphql");
const rulesToIgnore = ['KnownFragmentNames', 'NoUnusedFragments', 'NoUnusedVariables', 'KnownDirectives'];
const effectiveRules = graphql_1.specifiedRules.filter((f) => !rulesToIgnore.includes(f.name));
exports.validateGraphQlDocuments = (schema, documentFiles) => documentFiles
    .map(result => ({
    filePath: result.filePath,
    errors: graphql_1.validate(schema, result.content, effectiveRules),
}))
    .filter(r => r.errors.length > 0);
function checkValidationErrors(loadDocumentErrors) {
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
exports.checkValidationErrors = checkValidationErrors;
//# sourceMappingURL=validate-documents.js.map