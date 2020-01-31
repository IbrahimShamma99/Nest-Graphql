import { introspectionQuery, buildClientSchema, parse } from 'graphql';
import { printSchemaWithDirectives } from '../utils/print-schema-with-directives';
export async function loadFromUrl(url, options) {
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
            fetch = (await import('cross-fetch')).fetch;
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
            query: introspectionQuery,
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
    const asSchema = buildClientSchema(body.data);
    const printed = printSchemaWithDirectives(asSchema);
    return parse(printed);
}
//# sourceMappingURL=load-from-url.js.map