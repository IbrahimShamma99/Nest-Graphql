import { AdvancedOptions, ReturnTypeFunc } from './../external/type-graphql.types';
export declare function Query(): MethodDecorator;
export declare function Query(name: string): MethodDecorator;
export declare function Query(typeFunc: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
