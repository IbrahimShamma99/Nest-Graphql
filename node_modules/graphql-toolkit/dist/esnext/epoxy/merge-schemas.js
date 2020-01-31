import { makeExecutableSchema } from "@kamilkisiela/graphql-tools";
import { mergeTypeDefs } from "./typedefs-mergers/merge-typedefs";
import { asArray } from "../utils/helpers";
import { mergeResolvers } from "./resolvers-mergers/merge-resolvers";
import { extractResolversFromSchema, composeResolvers } from "../utils";
export function mergeSchemas({ schemas, typeDefs, resolvers, resolversComposition, schemaDirectives, resolverValidationOptions, logger, exclusions, }) {
    return makeExecutableSchema({
        typeDefs: mergeTypeDefs([
            ...schemas,
            ...typeDefs ? asArray(typeDefs) : []
        ], { exclusions }),
        resolvers: composeResolvers(mergeResolvers([
            ...schemas.map(schema => extractResolversFromSchema(schema)),
            ...resolvers ? asArray(resolvers) : []
        ], { exclusions }), resolversComposition || {}),
        schemaDirectives,
        resolverValidationOptions,
        logger
    });
}
export async function mergeSchemasAsync({ schemas, typeDefs, resolvers, resolversComposition, schemaDirectives, resolverValidationOptions, logger, exclusions, }) {
    const [typeDefsOutput, resolversOutput,] = await Promise.all([
        mergeTypeDefs([
            ...schemas,
            ...typeDefs ? asArray(typeDefs) : []
        ], { exclusions }),
        Promise
            .all(schemas.map(async (schema) => extractResolversFromSchema(schema)))
            .then(extractedResolvers => composeResolvers(mergeResolvers([
            ...extractedResolvers,
            ...resolvers ? asArray(resolvers) : []
        ], { exclusions }), resolversComposition || {})),
    ]);
    return makeExecutableSchema({
        typeDefs: typeDefsOutput,
        resolvers: resolversOutput,
        schemaDirectives,
        resolverValidationOptions,
        logger
    });
}
//# sourceMappingURL=merge-schemas.js.map