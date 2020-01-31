"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
require("reflect-metadata");
const gql_paramtype_enum_1 = require("../enums/gql-paramtype.enum");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
const param_utils_1 = require("./param.utils");
let TypeGqlArg, TypeGqlArgs;
try {
    const TypeGql = require('type-graphql');
    TypeGqlArg = TypeGql.Arg;
    TypeGqlArgs = TypeGql.Args;
}
catch (e) { }
function Args(propertyOrOptions, ...pipes) {
    let typeFn = undefined;
    let argOptions = {};
    let property = propertyOrOptions;
    if (propertyOrOptions &&
        shared_utils_1.isObject(propertyOrOptions) &&
        !propertyOrOptions.transform) {
        property = propertyOrOptions.name;
        typeFn = propertyOrOptions.type;
        argOptions = {
            description: propertyOrOptions.description,
            nullable: propertyOrOptions.nullable,
            defaultValue: propertyOrOptions.defaultValue,
        };
    }
    return (target, key, index) => {
        param_utils_1.addPipesMetadata(gql_paramtype_enum_1.GqlParamtype.ARGS, property, pipes, target, key, index);
        property && shared_utils_1.isString(property)
            ? TypeGqlArg &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlArg(property, typeFn, argOptions)(target, key, index))
            : TypeGqlArgs &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlArgs(typeFn)(target, key, index));
    };
}
exports.Args = Args;
