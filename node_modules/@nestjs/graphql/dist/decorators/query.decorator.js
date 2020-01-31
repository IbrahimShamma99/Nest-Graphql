"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const resolvers_enum_1 = require("../enums/resolvers.enum");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
const resolvers_utils_1 = require("./resolvers.utils");
let TypeGqlQuery;
try {
    TypeGqlQuery = require('type-graphql').Query;
}
catch (e) { }
function Query(nameOrType, options) {
    return (target, key, descriptor) => {
        const name = shared_utils_1.isString(nameOrType)
            ? nameOrType
            : (options && options.name) || undefined;
        resolvers_utils_1.addResolverMetadata(resolvers_enum_1.Resolvers.QUERY, name, target, key, descriptor);
        if (nameOrType && !shared_utils_1.isString(nameOrType)) {
            TypeGqlQuery &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlQuery(nameOrType, options)(target, key, descriptor));
        }
    };
}
exports.Query = Query;
