"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var GraphQLModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const core_1 = require("@nestjs/core");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const graphql_1 = require("graphql");
const graphql_ast_explorer_1 = require("./graphql-ast.explorer");
const graphql_schema_builder_1 = require("./graphql-schema-builder");
const graphql_types_loader_1 = require("./graphql-types.loader");
const graphql_constants_1 = require("./graphql.constants");
const graphql_factory_1 = require("./graphql.factory");
const delegates_explorer_service_1 = require("./services/delegates-explorer.service");
const resolvers_explorer_service_1 = require("./services/resolvers-explorer.service");
const scalars_explorer_service_1 = require("./services/scalars-explorer.service");
const extend_util_1 = require("./utils/extend.util");
const generate_token_util_1 = require("./utils/generate-token.util");
const merge_defaults_util_1 = require("./utils/merge-defaults.util");
const normalize_route_path_util_1 = require("./utils/normalize-route-path.util");
let GraphQLModule = GraphQLModule_1 = class GraphQLModule {
    constructor(httpAdapterHost, options, graphqlFactory, graphqlTypesLoader, applicationConfig) {
        this.httpAdapterHost = httpAdapterHost;
        this.options = options;
        this.graphqlFactory = graphqlFactory;
        this.graphqlTypesLoader = graphqlTypesLoader;
        this.applicationConfig = applicationConfig;
    }
    static forRoot(options = {}) {
        options = merge_defaults_util_1.mergeDefaults(options);
        return {
            module: GraphQLModule_1,
            providers: [
                {
                    provide: graphql_constants_1.GRAPHQL_MODULE_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    static forRootAsync(options) {
        return {
            module: GraphQLModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
                {
                    provide: graphql_constants_1.GRAPHQL_MODULE_ID,
                    useValue: generate_token_util_1.generateString(),
                },
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: graphql_constants_1.GRAPHQL_MODULE_OPTIONS,
                useFactory: (...args) => __awaiter(this, void 0, void 0, function* () { return merge_defaults_util_1.mergeDefaults(yield options.useFactory(...args)); }),
                inject: options.inject || [],
            };
        }
        return {
            provide: graphql_constants_1.GRAPHQL_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return merge_defaults_util_1.mergeDefaults(yield optionsFactory.createGqlOptions()); }),
            inject: [options.useExisting || options.useClass],
        };
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.httpAdapterHost) {
                return;
            }
            const httpAdapter = this.httpAdapterHost.httpAdapter;
            if (!httpAdapter) {
                return;
            }
            const typeDefs = (yield this.graphqlTypesLoader.mergeTypesByPaths(this.options.typePaths)) || [];
            const mergedTypeDefs = extend_util_1.extend(typeDefs, this.options.typeDefs);
            const apolloOptions = yield this.graphqlFactory.mergeOptions(Object.assign(Object.assign({}, this.options), { typeDefs: mergedTypeDefs }));
            if (this.options.definitions && this.options.definitions.path) {
                yield this.graphqlFactory.generateDefinitions(graphql_1.printSchema(apolloOptions.schema), this.options);
            }
            this.registerGqlServer(apolloOptions);
            if (this.options.installSubscriptionHandlers) {
                this.apolloServer.installSubscriptionHandlers(httpAdapter.getHttpServer());
            }
        });
    }
    registerGqlServer(apolloOptions) {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const adapterName = httpAdapter.constructor && httpAdapter.constructor.name;
        if (adapterName === 'ExpressAdapter') {
            this.registerExpress(apolloOptions);
        }
        else if (adapterName === 'FastifyAdapter') {
            this.registerFastify(apolloOptions);
        }
        else {
            throw new Error(`No support for current HttpAdapter: ${adapterName}`);
        }
    }
    registerExpress(apolloOptions) {
        const { ApolloServer } = load_package_util_1.loadPackage('apollo-server-express', 'GraphQLModule', () => require('apollo-server-express'));
        const path = this.getNormalizedPath(apolloOptions);
        const { disableHealthCheck, onHealthCheck, cors, bodyParserConfig, } = this.options;
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const app = httpAdapter.getInstance();
        const apolloServer = new ApolloServer(apolloOptions);
        apolloServer.applyMiddleware({
            app,
            path,
            disableHealthCheck,
            onHealthCheck,
            cors,
            bodyParserConfig,
        });
        this.apolloServer = apolloServer;
    }
    registerFastify(apolloOptions) {
        const { ApolloServer } = load_package_util_1.loadPackage('apollo-server-fastify', 'GraphQLModule', () => require('apollo-server-fastify'));
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const app = httpAdapter.getInstance();
        const path = this.getNormalizedPath(apolloOptions);
        const apolloServer = new ApolloServer(apolloOptions);
        const { disableHealthCheck, onHealthCheck, cors, bodyParserConfig, } = this.options;
        app.register(apolloServer.createHandler({
            disableHealthCheck,
            onHealthCheck,
            cors,
            bodyParserConfig,
            path,
        }));
        this.apolloServer = apolloServer;
    }
    getNormalizedPath(apolloOptions) {
        const prefix = this.applicationConfig.getGlobalPrefix();
        const useGlobalPrefix = prefix && this.options.useGlobalPrefix;
        const gqlOptionsPath = normalize_route_path_util_1.normalizeRoutePath(apolloOptions.path);
        return useGlobalPrefix
            ? normalize_route_path_util_1.normalizeRoutePath(prefix) + gqlOptionsPath
            : gqlOptionsPath;
    }
};
GraphQLModule = GraphQLModule_1 = __decorate([
    common_1.Module({
        providers: [
            graphql_factory_1.GraphQLFactory,
            metadata_scanner_1.MetadataScanner,
            resolvers_explorer_service_1.ResolversExplorerService,
            delegates_explorer_service_1.DelegatesExplorerService,
            scalars_explorer_service_1.ScalarsExplorerService,
            graphql_ast_explorer_1.GraphQLAstExplorer,
            graphql_types_loader_1.GraphQLTypesLoader,
            graphql_schema_builder_1.GraphQLSchemaBuilder,
        ],
        exports: [graphql_types_loader_1.GraphQLTypesLoader, graphql_ast_explorer_1.GraphQLAstExplorer],
    }),
    __param(1, common_1.Inject(graphql_constants_1.GRAPHQL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost, Object, graphql_factory_1.GraphQLFactory,
        graphql_types_loader_1.GraphQLTypesLoader,
        core_1.ApplicationConfig])
], GraphQLModule);
exports.GraphQLModule = GraphQLModule;
