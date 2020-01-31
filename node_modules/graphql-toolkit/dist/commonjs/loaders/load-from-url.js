"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const print_schema_with_directives_1 = require("../utils/print-schema-with-directives");
async function loadFromUrl(url, options) {
    let headers = {};
    let fetch;
    if (options) {
        if (Array.isArray(options.headers)) {
            headers = options.headers.reduce((prev, v) => ({ ...prev, ...v }), {});
        }
        else if (typeof options.headers === 'object') {
            headers = options.headers;
        }
        if (options.fetch) {
            fetch = options.fetch;
        }
        else {
            fetch = (await Promise.resolve().then(() => require('cross-fetch'))).fetch;
        }
    }
    let extraHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
    };
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            query: graphql_1.introspectionQuery,
        }),
        headers: extraHeaders,
    });
    const body = await response.json();
    let errorMessage;
    if (body.errors && body.errors.length > 0) {
        errorMessage = body.errors.map((item) => item.message).join(', ');
    }
    else if (!body.data) {
        errorMessage = body;
    }
    if (errorMessage) {
        throw 'Unable to download schema from remote: ' + errorMessage;
    }
    if (!body.data.__schema) {
        throw new Error('Invalid schema provided!');
    }
    const asSchema = graphql_1.buildClientSchema(body.data);
    const printed = print_schema_with_directives_1.printSchemaWithDirectives(asSchema);
    return graphql_1.parse(printed);
}
exports.loadFromUrl = loadFromUrl;
//# sourceMappingURL=load-from-url.js.map