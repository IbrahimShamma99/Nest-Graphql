import { PipeTransform, Type } from '@nestjs/common';
import 'reflect-metadata';
export declare function Context(): any;
export declare function Context(...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Context(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
