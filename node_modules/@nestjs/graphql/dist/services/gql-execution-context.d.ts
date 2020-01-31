import { ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GraphQLArgumentsHost } from './gql-arguments-host';
export interface GraphQLExecutionContext extends ExecutionContext, GraphQLArgumentsHost {
    getRoot<T = any>(): T;
    getInfo<T = any>(): T;
    getArgs<T = any>(): T;
    getContext<T = any>(): T;
}
export declare class GqlExecutionContext extends ExecutionContextHost {
    static create(context: ExecutionContext): GraphQLExecutionContext;
}
