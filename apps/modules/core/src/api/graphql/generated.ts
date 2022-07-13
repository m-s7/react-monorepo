import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Car = {
  __typename?: 'Car';
  brand: Scalars['String'];
  id: Scalars['ID'];
  model: Scalars['String'];
  similar: Array<Car>;
};

export type Query = {
  __typename?: 'Query';
  cars: Array<Maybe<Car>>;
};

export type FetchCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCarsQuery = { __typename?: 'Query', cars: Array<{ __typename?: 'Car', id: string, brand: string, model: string, similar: Array<{ __typename?: 'Car', id: string }> } | null> };


export const FetchCarsDocument = `
    query fetchCars {
  cars {
    id
    brand
    model
    similar {
      id
    }
  }
}
    `;
export const useFetchCarsQuery = <
      TData = FetchCarsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FetchCarsQueryVariables,
      options?: UseQueryOptions<FetchCarsQuery, TError, TData>
    ) =>
    useQuery<FetchCarsQuery, TError, TData>(
      variables === undefined ? ['fetchCars'] : ['fetchCars', variables],
      fetcher<FetchCarsQuery, FetchCarsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FetchCarsDocument, variables),
      options
    );

useFetchCarsQuery.getKey = (variables?: FetchCarsQueryVariables) => variables === undefined ? ['fetchCars'] : ['fetchCars', variables];
;
