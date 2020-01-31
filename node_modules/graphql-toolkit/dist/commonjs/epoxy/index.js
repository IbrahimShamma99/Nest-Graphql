"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_typedefs_1 = require("./typedefs-mergers/merge-typedefs");
exports.mergeTypeDefs = merge_typedefs_1.mergeTypeDefs;
exports.mergeGraphQLSchemas = merge_typedefs_1.mergeGraphQLSchemas;
var merge_resolvers_1 = require("./resolvers-mergers/merge-resolvers");
exports.mergeResolvers = merge_resolvers_1.mergeResolvers;
var merge_schemas_1 = require("./merge-schemas");
exports.mergeSchemas = merge_schemas_1.mergeSchemas;
exports.mergeSchemasAsync = merge_schemas_1.mergeSchemasAsync;
//# sourceMappingURL=index.js.map