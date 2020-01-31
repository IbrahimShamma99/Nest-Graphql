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
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const scalars_explorer_service_1 = require("./services/scalars-explorer.service");
const lazy_metadata_storage_1 = require("./storages/lazy-metadata.storage");
let GraphQLSchemaBuilder = class GraphQLSchemaBuilder {
    constructor(scalarsExplorerService) {
        this.scalarsExplorerService = scalarsExplorerService;
    }
    build(autoSchemaFile, options = {}, resolvers) {
        return __awaiter(this, void 0, void 0, function* () {
            lazy_metadata_storage_1.lazyMetadataStorage.load();
            const buildSchema = this.loadBuildSchemaFactory();
            const scalarsMap = this.scalarsExplorerService.getScalarsMap();
            try {
                return yield buildSchema(Object.assign(Object.assign({}, options), { emitSchemaFile: autoSchemaFile !== true ? autoSchemaFile : false, scalarsMap, validate: false, resolvers }));
            }
            catch (err) {
                if (err && err.details) {
                    console.error(err.details);
                }
                throw err;
            }
        });
    }
    loadBuildSchemaFactory() {
        const { buildSchema } = load_package_util_1.loadPackage('type-graphql', 'SchemaBuilder', () => require('type-graphql'));
        return buildSchema;
    }
};
GraphQLSchemaBuilder = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [scalars_explorer_service_1.ScalarsExplorerService])
], GraphQLSchemaBuilder);
exports.GraphQLSchemaBuilder = GraphQLSchemaBuilder;
