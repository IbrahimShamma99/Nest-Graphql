"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const glob = require("glob");
const path_1 = require("path");
const fs_1 = require("fs");
const graphql_1 = require("graphql");
const DEFAULT_SCHEMA_EXTENSIONS = ['gql', 'graphql', 'graphqls', 'ts', 'js'];
const DEFAULT_IGNORED_RESOLVERS_EXTENSIONS = ['spec', 'test', 'd', 'gql', 'graphql', 'graphqls'];
const DEFAULT_RESOLVERS_EXTENSIONS = ['ts', 'js'];
const DEFAULT_SCHEMA_EXPORT_NAMES = ['typeDefs', 'schema'];
const DEFAULT_RESOLVERS_EXPORT_NAMES = ['resolvers', 'resolver'];
function isDirectory(path) {
    const fs = eval(`require('fs')`);
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}
function scanForFiles(globStr, globOptions = {}) {
    return glob_1.sync(globStr, { absolute: true, ...globOptions });
}
function buildGlob(basePath, extensions, ignoredExtensions = [], recursive) {
    return `${basePath}${recursive ? '/**' : ''}/${ignoredExtensions.length > 0 ? `!(${ignoredExtensions.map(e => '*.' + e).join('|')})` : '*'}+(${extensions.map(e => '*.' + e).join('|')})`;
}
function extractExports(fileExport, exportNames) {
    if (!fileExport) {
        return null;
    }
    if (fileExport.default) {
        for (const exportName of exportNames) {
            if (fileExport.default[exportName]) {
                return fileExport.default[exportName];
            }
        }
        return fileExport.default;
    }
    for (const exportName of exportNames) {
        if (fileExport[exportName]) {
            return fileExport[exportName];
        }
    }
    return fileExport;
}
const LoadSchemaFilesDefaultOptions = {
    ignoredExtensions: [],
    extensions: DEFAULT_SCHEMA_EXTENSIONS,
    useRequire: false,
    requireMethod: null,
    globOptions: {},
    exportNames: DEFAULT_SCHEMA_EXPORT_NAMES,
    recursive: true,
    ignoreIndex: false,
};
function loadSchemaFiles(path, options = LoadSchemaFilesDefaultOptions) {
    const execOptions = { ...LoadSchemaFilesDefaultOptions, ...options };
    const relevantPaths = scanForFiles(isDirectory(path) ? buildGlob(path, execOptions.extensions, execOptions.ignoredExtensions, execOptions.recursive) : path, options.globOptions);
    return relevantPaths.map(path => {
        if (isIndex(path, execOptions.extensions) && options.ignoreIndex) {
            return false;
        }
        const extension = path_1.extname(path);
        if (extension.endsWith('.js') || extension.endsWith('.ts') || execOptions.useRequire) {
            const fileExports = (execOptions.requireMethod ? execOptions.requireMethod : eval('require'))(path);
            const extractedExport = extractExports(fileExports, execOptions.exportNames);
            if (extractedExport && extractedExport.kind === 'Document') {
                return graphql_1.print(extractedExport);
            }
            return extractedExport;
        }
        else {
            return fs_1.readFileSync(path, { encoding: 'utf-8' });
        }
    }).filter(v => v);
}
exports.loadSchemaFiles = loadSchemaFiles;
const LoadResolversFilesDefaultOptions = {
    ignoredExtensions: DEFAULT_IGNORED_RESOLVERS_EXTENSIONS,
    extensions: DEFAULT_RESOLVERS_EXTENSIONS,
    requireMethod: null,
    globOptions: {},
    exportNames: DEFAULT_RESOLVERS_EXPORT_NAMES,
    recursive: true,
    ignoreIndex: false,
};
function loadResolversFiles(path, options = LoadResolversFilesDefaultOptions) {
    const execOptions = { ...LoadResolversFilesDefaultOptions, ...options };
    const relevantPaths = scanForFiles(isDirectory(path) ? buildGlob(path, execOptions.extensions, execOptions.ignoredExtensions, execOptions.recursive) : path, options.globOptions);
    return relevantPaths.map(path => {
        if (isIndex(path, execOptions.extensions) && options.ignoreIndex) {
            return false;
        }
        try {
            const fileExports = (execOptions.requireMethod ? execOptions.requireMethod : eval('require'))(path);
            return extractExports(fileExports, execOptions.exportNames);
        }
        catch (e) {
            throw new Error(`Unable to load resolver file: ${path}, error: ${e}`);
        }
    }).filter(t => t);
}
exports.loadResolversFiles = loadResolversFiles;
function scanForFilesAsync(globStr, globOptions = {}) {
    return new Promise((resolve, reject) => glob(globStr, { absolute: true, ...globOptions }, (err, matches) => {
        if (err) {
            reject(err);
        }
        resolve(matches);
    }));
}
async function loadSchemaFilesAsync(path, options = LoadSchemaFilesDefaultOptions) {
    const execOptions = { ...LoadSchemaFilesDefaultOptions, ...options };
    const relevantPaths = await scanForFilesAsync(isDirectory(path) ? buildGlob(path, execOptions.extensions, execOptions.ignoredExtensions, execOptions.recursive) : path, options.globOptions);
    const require$ = (path) => Promise.resolve().then(() => eval(`require('${path}')`));
    return Promise.all(relevantPaths.map(async (path) => {
        if (isIndex(path, execOptions.extensions) && options.ignoreIndex) {
            return false;
        }
        const extension = path_1.extname(path);
        if (extension.endsWith('.js') || extension.endsWith('.ts') || execOptions.useRequire) {
            const fileExports = await (execOptions.requireMethod ? execOptions.requireMethod : require$)(path);
            const extractedExport = extractExports(fileExports, execOptions.exportNames);
            if (extractedExport && extractedExport.kind === 'Document') {
                return graphql_1.print(extractedExport);
            }
            return extractedExport;
        }
        else {
            return new Promise((resolve, reject) => {
                fs_1.readFile(path, { encoding: 'utf-8' }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
        }
    }).filter(p => p));
}
exports.loadSchemaFilesAsync = loadSchemaFilesAsync;
async function loadResolversFilesAsync(path, options = LoadResolversFilesDefaultOptions) {
    const execOptions = { ...LoadResolversFilesDefaultOptions, ...options };
    const relevantPaths = await scanForFilesAsync(isDirectory(path) ? buildGlob(path, execOptions.extensions, execOptions.ignoredExtensions, execOptions.recursive) : path, options.globOptions);
    const require$ = (path) => Promise.resolve().then(() => eval(`require('${path}')`));
    return Promise.all(relevantPaths.map(async (path) => {
        if (isIndex(path, execOptions.extensions) && options.ignoreIndex) {
            return false;
        }
        try {
            const fileExports = await (execOptions.requireMethod ? execOptions.requireMethod : require$)(path);
            return extractExports(fileExports, execOptions.exportNames);
        }
        catch (e) {
            throw new Error(`Unable to load resolver file: ${path}, error: ${e}`);
        }
    }));
}
exports.loadResolversFilesAsync = loadResolversFilesAsync;
function isIndex(path, extensions = []) {
    const IS_INDEX = /(\/|\\)index\.[^\/\\]+$/i; // (/ or \) AND `index.` AND (everything except \ and /)(end of line)
    return IS_INDEX.test(path) && extensions.some(ext => path.endsWith('.' + ext));
}
//# sourceMappingURL=file-scanner.js.map