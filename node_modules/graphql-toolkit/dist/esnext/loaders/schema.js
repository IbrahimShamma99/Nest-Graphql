import { loadTypedefs } from './load-typedefs';
import { buildASTSchema } from 'graphql';
import { OPERATION_KINDS } from './documents';
import { mergeTypeDefs } from '../epoxy';
export async function loadSchema(pointToSchema, options, cwd = process.cwd()) {
    const types = await loadTypedefs(pointToSchema, options, OPERATION_KINDS, cwd);
    return buildASTSchema(mergeTypeDefs(types.map(m => m.content)));
}
//# sourceMappingURL=schema.js.map