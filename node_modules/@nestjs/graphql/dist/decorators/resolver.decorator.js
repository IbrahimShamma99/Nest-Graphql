"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
const resolvers_utils_1 = require("./resolvers.utils");
let TypeGqlResolver;
let getMetadataStorage;
try {
    TypeGqlResolver = require('type-graphql').Resolver;
    getMetadataStorage = require('type-graphql/dist/metadata/getMetadataStorage')
        .getMetadataStorage;
}
catch (e) { }
function Resolver(nameOrType, options) {
    return (target, key, descriptor) => {
        let name = nameOrType && resolvers_utils_1.getClassName(nameOrType);
        if (getMetadataStorage && shared_utils_1.isFunction(nameOrType)) {
            const ctor = resolvers_utils_1.getClassOrUndefined(nameOrType);
            const objectMetadata = getMetadataStorage().objectTypes.find(type => type.target === ctor);
            objectMetadata && (name = objectMetadata.name);
        }
        resolvers_utils_1.addResolverMetadata(undefined, name, target, key, descriptor);
        if (!shared_utils_1.isString(nameOrType)) {
            TypeGqlResolver &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlResolver(nameOrType, options)(target));
        }
    };
}
exports.Resolver = Resolver;
