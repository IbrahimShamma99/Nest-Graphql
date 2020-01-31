import { buildClientSchema, parse } from 'graphql';
import { existsSync, readFileSync } from 'fs';
import { printSchemaWithDirectives } from '../utils/print-schema-with-directives';
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
export async function loadFromJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        if (existsSync(filePath)) {
            try {
                const fileContent = readFileSync(filePath, 'utf8');
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
                const asSchema = buildClientSchema(introspection);
                const printed = printSchemaWithDirectives(asSchema);
                resolve(parse(printed));
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
//# sourceMappingURL=load-from-json-file.js.map