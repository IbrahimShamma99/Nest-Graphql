"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const apollo_server_core_1 = require("apollo-server-core");
const graphql_tools_1 = require("graphql-tools");
const chokidar = require("chokidar");
const graphql_1 = require("graphql");
const graphql_ast_explorer_1 = require("./graphql-ast.explorer");
const graphql_types_loader_1 = require("./graphql-types.loader");
const remove_temp_util_1 = require("./utils/remove-temp.util");
class GraphQLDefinitionsFactory {
    constructor() {
        this.gqlAstExplorer = new graphql_ast_explorer_1.GraphQLAstExplorer();
        this.gqlTypesLoader = new graphql_types_loader_1.GraphQLTypesLoader();
    }
    generate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDebugEnabled = !(options && options.debug === false);
            const typePathsExists = options.typePaths && !shared_utils_1.isEmpty(options.typePaths);
            if (!typePathsExists) {
                throw new Error(`"typePaths" property cannot be empty.`);
            }
            if (options.watch) {
                this.printMessage('GraphQL factory is watching your files...', isDebugEnabled);
                const watcher = chokidar.watch(options.typePaths);
                watcher.on('change', (file) => __awaiter(this, void 0, void 0, function* () {
                    this.printMessage(`[${new Date().toLocaleTimeString()}] "${file}" has been changed.`, isDebugEnabled);
                    yield this.exploreAndEmit(options.typePaths, options.path, options.outputAs, isDebugEnabled);
                }));
            }
            yield this.exploreAndEmit(options.typePaths, options.path, options.outputAs, isDebugEnabled);
        });
    }
    exploreAndEmit(typePaths, path, outputAs, isDebugEnabled) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeDefs = yield this.gqlTypesLoader.mergeTypesByPaths(typePaths || []);
            if (!typeDefs) {
                throw new Error(`"typeDefs" property cannot be null.`);
            }
            let schema = graphql_tools_1.makeExecutableSchema({
                typeDefs,
                resolverValidationOptions: { allowResolversNotInSchema: true },
            });
            schema = remove_temp_util_1.removeTempField(schema);
            const tsFile = yield this.gqlAstExplorer.explore(apollo_server_core_1.gql `
        ${graphql_1.printSchema(schema)}
      `, path, outputAs);
            yield tsFile.save();
            this.printMessage(`[${new Date().toLocaleTimeString()}] The definitions have been updated.`, isDebugEnabled);
        });
    }
    printMessage(text, isEnabled) {
        isEnabled && console.log(text);
    }
}
exports.GraphQLDefinitionsFactory = GraphQLDefinitionsFactory;
