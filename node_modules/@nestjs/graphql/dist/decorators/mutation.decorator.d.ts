import { AdvancedOptions, ReturnTypeFunc } from './../external/type-graphql.types';
export declare function Mutation(): MethodDecorator;
export declare function Mutation(name: string): MethodDecorator;
export declare function Mutation(typeFunc: ReturnTypeFunc, options?: AdvancedOptions): MethodDecorator;
