"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function calculateOptions(options) {
    if (!options || !options.tagPluck) {
        return {};
    }
    // toolkit option's key -> option in graphql-tag-pluck
    const keyMap = {
        modules: 'modules',
        magicComment: 'gqlMagicComment',
        globalIdentifier: 'globalGqlIdentifierName',
    };
    return Object.keys(keyMap).reduce((prev, curr) => {
        const value = options.tagPluck[curr];
        if (value) {
            return {
                ...prev,
                [keyMap[curr]]: value,
            };
        }
        return prev;
    }, {});
}
async function extractDocumentStringFromCodeFile(source, options) {
    try {
        const parsed = graphql_1.parse(source.body);
        if (parsed) {
            return source.body;
        }
    }
    catch (e) {
        try {
            const { gqlPluckFromFile } = eval(`require('graphql-tag-pluck')`);
            return gqlPluckFromFile(source.name, calculateOptions(options)) || null;
        }
        catch (e) {
            throw new e.constructor(`${e.message} at ${source.name}`);
        }
    }
}
exports.extractDocumentStringFromCodeFile = extractDocumentStringFromCodeFile;
//# sourceMappingURL=extract-document-string-from-code-file.js.map