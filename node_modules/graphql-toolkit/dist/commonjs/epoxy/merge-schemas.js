"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("@kamilkisiela/graphql-tools");
const merge_typedefs_1 = require("./typedefs-mergers/merge-typedefs");
const helpers_1 = require("../utils/helpers");
const merge_resolvers_1 = require("./resolvers-mergers/merge-resolvers");
const utils_1 = require("../utils");
function mergeSchemas({ schemas, typeDefs, resolvers, resolversComposition, schemaDirectives, resolverValidationOptions, logger, exclusions, }) {
    return graphql_tools_1.makeExecutableSchema({
        typeDefs: merge_typedefs_1.mergeTypeDefs([
            ...schemas,
            ...typeDefs ? helpers_1.asArray(typeDefs) : []
        ], { exclusions }),
        resolvers: utils_1.composeResolvers(merge_resolvers_1.mergeResolvers([
            ...schemas.map(schema => utils_1.extractResolversFromSchema(schema)),
            ...resolvers ? helpers_1.asArray(resolvers) : []
        ], { exclusions }), resolversComposition || {}),
        schemaDirectives,
        resolverValidationOptions,
        logger
    });
}
exports.mergeSchemas = mergeSchemas;
async function mergeSchemasAsync({ schemas, typeDefs, resolvers, resolversComposition, schemaDirectives, resolverValidationOptions, logger, exclusions, }) {
    const [typeDefsOutput, resolversOutput,] = await Promise.all([
        merge_typedefs_1.mergeTypeDefs([
            ...schemas,
            ...typeDefs ? helpers_1.asArray(typeDefs) : []
        ], { exclusions }),
        Promise
            .all(schemas.map(async (schema) => utils_1.extractResolversFromSchema(schema)))
            .then(extractedResolvers => utils_1.composeResolvers(merge_resolvers_1.mergeResolvers([
            ...extractedResolvers,
            ...resolvers ? helpers_1.asArray(resolvers) : []
        ], { exclusions }), resolversComposition || {})),
    ]);
    return graphql_tools_1.makeExecutableSchema({
        typeDefs: typeDefsOutput,
        resolvers: resolversOutput,
        schemaDirectives,
        resolverValidationOptions,
        logger
    });
}
exports.mergeSchemasAsync = mergeSchemasAsync;
//# sourceMappingURL=merge-schemas.js.map