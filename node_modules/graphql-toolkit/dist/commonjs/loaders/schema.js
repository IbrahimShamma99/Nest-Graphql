"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load_typedefs_1 = require("./load-typedefs");
const graphql_1 = require("graphql");
const documents_1 = require("./documents");
const epoxy_1 = require("../epoxy");
async function loadSchema(pointToSchema, options, cwd = process.cwd()) {
    const types = await load_typedefs_1.loadTypedefs(pointToSchema, options, documents_1.OPERATION_KINDS, cwd);
    return graphql_1.buildASTSchema(epoxy_1.mergeTypeDefs(types.map(m => m.content)));
}
exports.loadSchema = loadSchema;
//# sourceMappingURL=schema.js.map