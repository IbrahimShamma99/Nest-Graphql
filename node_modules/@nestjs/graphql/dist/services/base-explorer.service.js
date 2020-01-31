"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class BaseExplorerService {
    getModules(modulesContainer, include) {
        if (!include || lodash_1.isEmpty(include)) {
            return [...modulesContainer.values()];
        }
        const whitelisted = this.includeWhitelisted(modulesContainer, include);
        return whitelisted;
    }
    includeWhitelisted(modulesContainer, include) {
        return [...modulesContainer.values()].filter(({ metatype }) => include.some(item => item === metatype));
    }
    flatMap(modules, callback) {
        const invokeMap = () => modules.map(module => [...module.providers.values()].map(wrapper => callback(wrapper, module)));
        return lodash_1.flattenDeep(invokeMap()).filter(lodash_1.identity);
    }
    groupMetadata(resolvers) {
        const groupByType = lodash_1.groupBy(resolvers, metadata => metadata.type);
        return lodash_1.mapValues(groupByType, resolversArr => resolversArr.reduce((prev, curr) => {
            return Object.assign(Object.assign({}, prev), { [curr.name]: curr.callback });
        }, {}));
    }
}
exports.BaseExplorerService = BaseExplorerService;
