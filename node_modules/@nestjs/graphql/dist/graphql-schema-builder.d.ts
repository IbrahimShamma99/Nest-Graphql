import { BuildSchemaOptions } from './external/type-graphql.types';
import { ScalarsExplorerService } from './services/scalars-explorer.service';
export declare class GraphQLSchemaBuilder {
    private readonly scalarsExplorerService;
    constructor(scalarsExplorerService: ScalarsExplorerService);
    build(autoSchemaFile: string | boolean, options: BuildSchemaOptions, resolvers: Function[]): Promise<any>;
    private loadBuildSchemaFactory;
}
