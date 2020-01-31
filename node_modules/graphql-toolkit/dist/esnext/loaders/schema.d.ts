import { LoadTypedefsOptions } from './load-typedefs';
import { GraphQLSchema } from 'graphql';
export declare function loadSchema(pointToSchema: string | string[], options?: LoadTypedefsOptions, cwd?: string): Promise<GraphQLSchema>;
