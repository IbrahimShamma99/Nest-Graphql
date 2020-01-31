import { parse } from 'graphql';
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
export async function extractDocumentStringFromCodeFile(source, options) {
    try {
        const parsed = parse(source.body);
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
//# sourceMappingURL=extract-document-string-from-code-file.js.map