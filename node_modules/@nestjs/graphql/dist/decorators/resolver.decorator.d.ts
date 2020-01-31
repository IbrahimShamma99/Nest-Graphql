import { Type } from '@nestjs/common';
import { ClassTypeResolver, ResolverClassOptions } from './../external/type-graphql.types';
export declare function Resolver(): any;
export declare function Resolver(name: string): any;
export declare function Resolver(classType: Type<any>, options?: ResolverClassOptions): any;
export declare function Resolver(typeFunc: ClassTypeResolver, options?: ResolverClassOptions): any;
