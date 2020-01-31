import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { GqlModuleOptions } from '../interfaces/gql-module-options.interface';
import { ResolverMetadata } from '../interfaces/resolver-metadata.interface';
import { BaseExplorerService } from './base-explorer.service';
export declare class DelegatesExplorerService extends BaseExplorerService {
    private readonly modulesContainer;
    private readonly metadataScanner;
    private readonly gqlOptions;
    constructor(modulesContainer: ModulesContainer, metadataScanner: MetadataScanner, gqlOptions: GqlModuleOptions);
    explore(): (mergeInfo: any) => any;
    filterDelegates(wrapper: InstanceWrapper): ResolverMetadata[];
    curryDelegates(delegates: any): (mergeInfo: any) => any;
}
