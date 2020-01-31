"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const resolvers_enum_1 = require("../enums/resolvers.enum");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
const resolvers_utils_1 = require("./resolvers.utils");
let TypeGqlMutation;
try {
    TypeGqlMutation = require('type-graphql').Mutation;
}
catch (e) { }
function Mutation(nameOrType, options) {
    return (target, key, descriptor) => {
        const name = shared_utils_1.isString(nameOrType)
            ? nameOrType
            : (options && options.name) || undefined;
        resolvers_utils_1.addResolverMetadata(resolvers_enum_1.Resolvers.MUTATION, name, target, key, descriptor);
        if (nameOrType && !shared_utils_1.isString(nameOrType)) {
            TypeGqlMutation &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlMutation(nameOrType, options)(target, key, descriptor));
        }
    };
}
exports.Mutation = Mutation;
