import { api } from 'Core/api/rtk-car-api'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    Float: number,
};

export type Car = {
    __typename?: 'Car',
    brand: Scalars['String'],
    dupa?: Maybe<Scalars['Int']>,
    id: Scalars['ID'],
    model: Scalars['String'],
    similar: Array<Car>,
};

export type Query = {
    __typename?: 'Query',
    cars: Array<Maybe<Car>>,
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>;


export type Unnamed_1_Query = { __typename?: 'Query', cars: Array<{ __typename?: 'Car', id: string, brand: string, model: string, similar: Array<{ __typename?: 'Car', id: string }> } | null> };


export const Document = `
    {
  cars {
    id
    brand
    model
    similar {
      id
    }
  }
}
    `

const injectedRtkApi = api.injectEndpoints({
    overrideExisting: module.hot?.status() === 'apply',
    endpoints: build => ({
    }),
})

export { injectedRtkApi as api }


