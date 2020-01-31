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
const common_1 = require("@nestjs/common");
const mongoose_utils_1 = require("./common/mongoose.utils");
function createMongooseProviders(connectionName, models = []) {
    const providers = (models || []).map(model => ({
        provide: mongoose_utils_1.getModelToken(model.name),
        useFactory: (connection) => connection.model(model.name, model.schema, model.collection),
        inject: [mongoose_utils_1.getConnectionToken(connectionName)],
    }));
    return providers;
}
exports.createMongooseProviders = createMongooseProviders;
function createMongooseAsyncProviders(connectionName, modelFactories = []) {
    const providers = (modelFactories || []).map(model => [
        {
            provide: mongoose_utils_1.getModelToken(model.name),
            useFactory: (connection, ...args) => __awaiter(this, void 0, void 0, function* () {
                const schema = yield model.useFactory(...args);
                return connection.model(model.name, schema, model.collection);
            }),
            inject: [mongoose_utils_1.getConnectionToken(connectionName), ...(model.inject || [])],
        },
    ]);
    return common_1.flatten(providers);
}
exports.createMongooseAsyncProviders = createMongooseAsyncProviders;
