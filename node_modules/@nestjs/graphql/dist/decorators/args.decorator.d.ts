import { PipeTransform, Type } from '@nestjs/common';
import 'reflect-metadata';
import { BasicOptions } from '../external/type-graphql.types';
export interface ArgsOptions extends BasicOptions {
    name?: string;
    type: () => any;
}
export declare function Args(): any;
export declare function Args(...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Args(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Args(options: ArgsOptions, ...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
