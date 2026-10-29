import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreatePersonData {
  person_insert: Person_Key;
}

export interface CreatePersonVariables {
  name: string;
  age: number;
}

export interface DeletePersonData {
  person_delete?: Person_Key | null;
}

export interface DeletePersonVariables {
  id: UUIDString;
}

export interface ListPeopleData {
  people: ({
    id: UUIDString;
    name: string;
    age: number;
    createdAt: TimestampString;
  } & Person_Key)[];
}

export interface Person_Key {
  id: UUIDString;
  __typename?: 'Person_Key';
}

export interface UpdatePersonData {
  person_update?: Person_Key | null;
}

export interface UpdatePersonVariables {
  id: UUIDString;
  name: string;
  age: number;
}

interface ListPeopleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPeopleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPeopleData, undefined>;
  operationName: string;
}
export const listPeopleRef: ListPeopleRef;

export function listPeople(options?: ExecuteQueryOptions): QueryPromise<ListPeopleData, undefined>;
export function listPeople(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPeopleData, undefined>;

interface CreatePersonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePersonVariables): MutationRef<CreatePersonData, CreatePersonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePersonVariables): MutationRef<CreatePersonData, CreatePersonVariables>;
  operationName: string;
}
export const createPersonRef: CreatePersonRef;

export function createPerson(vars: CreatePersonVariables): MutationPromise<CreatePersonData, CreatePersonVariables>;
export function createPerson(dc: DataConnect, vars: CreatePersonVariables): MutationPromise<CreatePersonData, CreatePersonVariables>;

interface UpdatePersonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePersonVariables): MutationRef<UpdatePersonData, UpdatePersonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePersonVariables): MutationRef<UpdatePersonData, UpdatePersonVariables>;
  operationName: string;
}
export const updatePersonRef: UpdatePersonRef;

export function updatePerson(vars: UpdatePersonVariables): MutationPromise<UpdatePersonData, UpdatePersonVariables>;
export function updatePerson(dc: DataConnect, vars: UpdatePersonVariables): MutationPromise<UpdatePersonData, UpdatePersonVariables>;

interface DeletePersonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePersonVariables): MutationRef<DeletePersonData, DeletePersonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePersonVariables): MutationRef<DeletePersonData, DeletePersonVariables>;
  operationName: string;
}
export const deletePersonRef: DeletePersonRef;

export function deletePerson(vars: DeletePersonVariables): MutationPromise<DeletePersonData, DeletePersonVariables>;
export function deletePerson(dc: DataConnect, vars: DeletePersonVariables): MutationPromise<DeletePersonData, DeletePersonVariables>;

