import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { GraphQLScalarType } from 'graphql';
import { GqlModuleOptions } from '../interfaces/gql-module-options.interface';
import { BaseExplorerService } from './base-explorer.service';
export declare class ScalarsExplorerService extends BaseExplorerService {
    private readonly modulesContainer;
    private readonly gqlOptions;
    constructor(modulesContainer: ModulesContainer, gqlOptions: GqlModuleOptions);
    explore(): any[];
    filterImplicitScalar<T extends any = any>(wrapper: InstanceWrapper<T>): {
        [x: string]: GraphQLScalarType;
    };
    getScalarsMap(): any[];
    filterExplicitScalar<T extends any = any>(wrapper: InstanceWrapper<T>): {
        type: any;
        scalar: GraphQLScalarType;
    };
}
