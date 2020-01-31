"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const resolvers_enum_1 = require("../enums/resolvers.enum");
const graphql_constants_1 = require("../graphql.constants");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
const resolvers_utils_1 = require("./resolvers.utils");
let TypeGqlSubscription;
try {
    TypeGqlSubscription = require('type-graphql').Subscription;
}
catch (e) { }
function Subscription(nameOrType, options = {}) {
    return (target, key, descriptor) => {
        const name = shared_utils_1.isString(nameOrType)
            ? nameOrType
            : (options && options.name) || undefined;
        resolvers_utils_1.addResolverMetadata(resolvers_enum_1.Resolvers.SUBSCRIPTION, name, target, key, descriptor);
        common_1.SetMetadata(graphql_constants_1.SUBSCRIPTION_OPTIONS_METADATA, options)(target, key, descriptor);
        if (nameOrType && !shared_utils_1.isString(nameOrType)) {
            const topics = ['undefined'];
            TypeGqlSubscription &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlSubscription(nameOrType, Object.assign({ topics }, options))(target, key, descriptor));
        }
    };
}
exports.Subscription = Subscription;
