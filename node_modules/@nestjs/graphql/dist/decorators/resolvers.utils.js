"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const graphql_constants_1 = require("../graphql.constants");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
let FieldResolver;
try {
    FieldResolver = require('type-graphql').FieldResolver;
}
catch (e) { }
function addResolverMetadata(resolver, name, target, key, descriptor) {
    common_1.SetMetadata(graphql_constants_1.RESOLVER_TYPE_METADATA, resolver || name)(target, key, descriptor);
    common_1.SetMetadata(graphql_constants_1.RESOLVER_NAME_METADATA, name)(target, key, descriptor);
}
exports.addResolverMetadata = addResolverMetadata;
function createPropertyDecorator(propertyNameOrFunc, typeFuncOrOptions, advancedOptions) {
    return (target, key, descriptor) => {
        let [propertyName, typeFunc, options] = shared_utils_1.isFunction(propertyNameOrFunc)
            ? [undefined, propertyNameOrFunc, typeFuncOrOptions]
            : [propertyNameOrFunc, typeFuncOrOptions, advancedOptions];
        common_1.SetMetadata(graphql_constants_1.RESOLVER_NAME_METADATA, propertyName)(target, key, descriptor);
        common_1.SetMetadata(graphql_constants_1.RESOLVER_PROPERTY_METADATA, true)(target, key, descriptor);
        const isField = true;
        if (FieldResolver && isField) {
            options = shared_utils_1.isObject(options)
                ? Object.assign({ name: propertyName }, options) : propertyName
                ? { name: propertyName }
                : undefined;
            lazy_metadata_storage_1.lazyMetadataStorage.store(() => FieldResolver(typeFunc, options)(target, key, descriptor));
        }
    };
}
exports.createPropertyDecorator = createPropertyDecorator;
function createDelegateDecorator(propertyName, typeFunc, options) {
    return (target, key, descriptor) => {
        common_1.SetMetadata(graphql_constants_1.RESOLVER_NAME_METADATA, propertyName)(target, key, descriptor);
        common_1.SetMetadata(graphql_constants_1.RESOLVER_DELEGATE_METADATA, propertyName)(target, key, descriptor);
        FieldResolver && FieldResolver(typeFunc, options)(target, key, descriptor);
    };
}
exports.createDelegateDecorator = createDelegateDecorator;
exports.getClassName = (nameOrType) => {
    if (shared_utils_1.isString(nameOrType)) {
        return nameOrType;
    }
    const classOrUndefined = exports.getClassOrUndefined(nameOrType);
    return classOrUndefined && classOrUndefined.name;
};
exports.getClassOrUndefined = (typeOrFunc) => {
    return isConstructor(typeOrFunc)
        ? typeOrFunc
        : shared_utils_1.isFunction(typeOrFunc)
            ? typeOrFunc()
            : undefined;
};
function isConstructor(obj) {
    return (!!obj.prototype &&
        !!obj.prototype.constructor &&
        !!obj.prototype.constructor.name);
}
