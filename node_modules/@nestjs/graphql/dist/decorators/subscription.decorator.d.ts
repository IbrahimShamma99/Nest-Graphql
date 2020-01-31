import { AdvancedOptions, ReturnTypeFunc } from './../external/type-graphql.types';
export interface SubscriptionOptions {
    filter?: (payload: any, variables: any, context: any) => boolean | Promise<boolean>;
    resolve?: (payload: any, args: any, context: any, info: any) => any | Promise<any>;
}
export declare function Subscription(): MethodDecorator;
export declare function Subscription(name: string): MethodDecorator;
export declare function Subscription(name: string, options: SubscriptionOptions): MethodDecorator;
export declare function Subscription(typeFunc: ReturnTypeFunc, options?: AdvancedOptions & SubscriptionOptions): MethodDecorator;
