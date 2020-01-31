"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeTempField(schema) {
    const queryTypeRef = schema.getQueryType();
    if (!queryTypeRef) {
        return schema;
    }
    const fields = queryTypeRef.getFields();
    if (!fields) {
        return schema;
    }
    delete fields['temp__'];
    return schema;
}
exports.removeTempField = removeTempField;
