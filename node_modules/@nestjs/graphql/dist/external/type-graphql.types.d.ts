import { Type } from '@nestjs/common';
import { GraphQLScalarType } from 'graphql';
export declare type TypeValue = Type<any> | GraphQLScalarType | Function | object | symbol;
export declare type ReturnTypeFuncValue = TypeValue | [TypeValue];
export declare type ReturnTypeFunc = (returns?: void) => ReturnTypeFuncValue;
export declare type NullableListOptions = 'items' | 'itemsAndList';
export interface DecoratorTypeOptions {
    nullable?: boolean | NullableListOptions;
    defaultValue?: any;
}
export interface TypeOptions extends DecoratorTypeOptions {
    array?: boolean;
}
export interface DescriptionOptions {
    description?: string;
}
export interface DepreciationOptions {
    deprecationReason?: string;
}
export interface SchemaNameOptions {
    name?: string;
}
export interface ResolverClassOptions {
    isAbstract?: boolean;
}
export declare type ClassTypeResolver = (of?: void) => Type<any>;
export declare type BasicOptions = DecoratorTypeOptions & DescriptionOptions;
export declare type AdvancedOptions = BasicOptions & DepreciationOptions & SchemaNameOptions;
export interface BuildSchemaOptions {
    dateScalarMode?: DateScalarMode;
    scalarsMap?: ScalarsTypeMap[];
}
export declare type DateScalarMode = 'isoDate' | 'timestamp';
export interface ScalarsTypeMap {
    type: Function;
    scalar: GraphQLScalarType;
}
