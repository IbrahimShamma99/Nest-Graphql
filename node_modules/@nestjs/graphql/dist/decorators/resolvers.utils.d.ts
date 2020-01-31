import { Type } from '@nestjs/common';
import { Resolvers } from '../enums/resolvers.enum';
import { AdvancedOptions, ReturnTypeFunc } from '../external/type-graphql.types';
export declare function addResolverMetadata(resolver: Resolvers | string | undefined, name: string | undefined, target?: Object | Function, key?: string | symbol, descriptor?: string): void;
export declare function createPropertyDecorator(typeFunc?: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
export declare function createPropertyDecorator(propertyName?: string, typeFunc?: ReturnTypeFunc, options?: AdvancedOptions): any;
export declare function createDelegateDecorator(propertyName?: string, typeFunc?: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
export declare const getClassName: (nameOrType: string | Function | Type<any>) => any;
export declare const getClassOrUndefined: (typeOrFunc: Function | Type<any>) => any;
