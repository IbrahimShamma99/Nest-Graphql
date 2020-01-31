import { Connection, Schema } from 'mongoose';
import { AsyncModelFactory } from './interfaces';
export declare function createMongooseProviders(connectionName?: string, models?: {
    name: string;
    schema: Schema;
    collection?: string;
}[]): {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("mongoose").Document, {}>;
    inject: string[];
}[];
export declare function createMongooseAsyncProviders(connectionName?: string, modelFactories?: AsyncModelFactory[]): {
    provide: string;
    useFactory: (connection: Connection, ...args: unknown[]) => Promise<import("mongoose").Model<import("mongoose").Document, {}>>;
    inject: any[];
}[];
