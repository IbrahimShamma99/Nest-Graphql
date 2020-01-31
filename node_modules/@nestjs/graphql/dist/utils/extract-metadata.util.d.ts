import 'reflect-metadata';
import { ResolverMetadata } from '../interfaces/resolver-metadata.interface';
export declare function extractMetadata(instance: Object, prototype: any, methodName: string, filterPredicate: (resolverType: string, isDelegated: boolean, isPropertyResolver?: boolean) => boolean): ResolverMetadata;
