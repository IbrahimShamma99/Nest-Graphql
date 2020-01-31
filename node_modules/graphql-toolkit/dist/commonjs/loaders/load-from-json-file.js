"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fs_1 = require("fs");
const print_schema_with_directives_1 = require("../utils/print-schema-with-directives");
function stripBOM(content) {
    content = content.toString();
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1);
    }
    return content;
}
function parseBOM(content) {
    return JSON.parse(stripBOM(content));
}
async function loadFromJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        if (fs_1.existsSync(filePath)) {
            try {
                const fileContent = fs_1.readFileSync(filePath, 'utf8');
                if (!fileContent) {
                    reject(`Unable to read local introspection file: ${filePath}`);
                }
                let introspection = parseBOM(fileContent);
                if (introspection['data']) {
                    introspection = introspection['data'];
                }
                if (!introspection.__schema) {
                    throw new Error('Invalid schema provided!');
                }
                const asSchema = graphql_1.buildClientSchema(introspection);
                const printed = print_schema_with_directives_1.printSchemaWithDirectives(asSchema);
                resolve(graphql_1.parse(printed));
            }
            catch (e) {
                reject(e);
            }
        }
        else {
            reject(`Unable to locate local introspection file: ${filePath}`);
        }
    });
}
exports.loadFromJsonFile = loadFromJsonFile;
//# sourceMappingURL=load-from-json-file.js.map