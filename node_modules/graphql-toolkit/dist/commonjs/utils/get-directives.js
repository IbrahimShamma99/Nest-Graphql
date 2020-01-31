"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const values_1 = require("graphql/execution/values");
function getDirectives(schema, node) {
    const schemaDirectives = schema && schema.getDirectives ? schema.getDirectives() : [];
    const astNode = node && node['astNode'];
    let result = {};
    if (astNode) {
        schemaDirectives.forEach((directive) => {
            const directiveValue = values_1.getDirectiveValues(directive, astNode);
            if (directiveValue !== undefined) {
                result[directive.name] = directiveValue || {};
            }
        });
    }
    return result;
}
exports.getDirectives = getDirectives;
//# sourceMappingURL=get-directives.js.map