# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPeople*](#listpeople)
- [**Mutations**](#mutations)
  - [*CreatePerson*](#createperson)
  - [*UpdatePerson*](#updateperson)
  - [*DeletePerson*](#deleteperson)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPeople
You can execute the `ListPeople` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPeople(options?: ExecuteQueryOptions): QueryPromise<ListPeopleData, undefined>;

interface ListPeopleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPeopleData, undefined>;
}
export const listPeopleRef: ListPeopleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPeople(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPeopleData, undefined>;

interface ListPeopleRef {
  ...
  (dc: DataConnect): QueryRef<ListPeopleData, undefined>;
}
export const listPeopleRef: ListPeopleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPeopleRef:
```typescript
const name = listPeopleRef.operationName;
console.log(name);
```

### Variables
The `ListPeople` query has no variables.
### Return Type
Recall that executing the `ListPeople` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPeopleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPeopleData {
  people: ({
    id: UUIDString;
    name: string;
    age: number;
    createdAt: TimestampString;
  } & Person_Key)[];
}
```
### Using `ListPeople`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPeople } from '@dataconnect/generated';


// Call the `listPeople()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPeople();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPeople(dataConnect);

console.log(data.people);

// Or, you can use the `Promise` API.
listPeople().then((response) => {
  const data = response.data;
  console.log(data.people);
});
```

### Using `ListPeople`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPeopleRef } from '@dataconnect/generated';


// Call the `listPeopleRef()` function to get a reference to the query.
const ref = listPeopleRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPeopleRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.people);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.people);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreatePerson
You can execute the `CreatePerson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPerson(vars: CreatePersonVariables): MutationPromise<CreatePersonData, CreatePersonVariables>;

interface CreatePersonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePersonVariables): MutationRef<CreatePersonData, CreatePersonVariables>;
}
export const createPersonRef: CreatePersonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPerson(dc: DataConnect, vars: CreatePersonVariables): MutationPromise<CreatePersonData, CreatePersonVariables>;

interface CreatePersonRef {
  ...
  (dc: DataConnect, vars: CreatePersonVariables): MutationRef<CreatePersonData, CreatePersonVariables>;
}
export const createPersonRef: CreatePersonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPersonRef:
```typescript
const name = createPersonRef.operationName;
console.log(name);
```

### Variables
The `CreatePerson` mutation requires an argument of type `CreatePersonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePersonVariables {
  name: string;
  age: number;
}
```
### Return Type
Recall that executing the `CreatePerson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePersonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePersonData {
  person_insert: Person_Key;
}
```
### Using `CreatePerson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPerson, CreatePersonVariables } from '@dataconnect/generated';

// The `CreatePerson` mutation requires an argument of type `CreatePersonVariables`:
const createPersonVars: CreatePersonVariables = {
  name: ..., 
  age: ..., 
};

// Call the `createPerson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPerson(createPersonVars);
// Variables can be defined inline as well.
const { data } = await createPerson({ name: ..., age: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPerson(dataConnect, createPersonVars);

console.log(data.person_insert);

// Or, you can use the `Promise` API.
createPerson(createPersonVars).then((response) => {
  const data = response.data;
  console.log(data.person_insert);
});
```

### Using `CreatePerson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPersonRef, CreatePersonVariables } from '@dataconnect/generated';

// The `CreatePerson` mutation requires an argument of type `CreatePersonVariables`:
const createPersonVars: CreatePersonVariables = {
  name: ..., 
  age: ..., 
};

// Call the `createPersonRef()` function to get a reference to the mutation.
const ref = createPersonRef(createPersonVars);
// Variables can be defined inline as well.
const ref = createPersonRef({ name: ..., age: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPersonRef(dataConnect, createPersonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.person_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.person_insert);
});
```

## UpdatePerson
You can execute the `UpdatePerson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePerson(vars: UpdatePersonVariables): MutationPromise<UpdatePersonData, UpdatePersonVariables>;

interface UpdatePersonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePersonVariables): MutationRef<UpdatePersonData, UpdatePersonVariables>;
}
export const updatePersonRef: UpdatePersonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePerson(dc: DataConnect, vars: UpdatePersonVariables): MutationPromise<UpdatePersonData, UpdatePersonVariables>;

interface UpdatePersonRef {
  ...
  (dc: DataConnect, vars: UpdatePersonVariables): MutationRef<UpdatePersonData, UpdatePersonVariables>;
}
export const updatePersonRef: UpdatePersonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePersonRef:
```typescript
const name = updatePersonRef.operationName;
console.log(name);
```

### Variables
The `UpdatePerson` mutation requires an argument of type `UpdatePersonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePersonVariables {
  id: UUIDString;
  name: string;
  age: number;
}
```
### Return Type
Recall that executing the `UpdatePerson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePersonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePersonData {
  person_update?: Person_Key | null;
}
```
### Using `UpdatePerson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePerson, UpdatePersonVariables } from '@dataconnect/generated';

// The `UpdatePerson` mutation requires an argument of type `UpdatePersonVariables`:
const updatePersonVars: UpdatePersonVariables = {
  id: ..., 
  name: ..., 
  age: ..., 
};

// Call the `updatePerson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePerson(updatePersonVars);
// Variables can be defined inline as well.
const { data } = await updatePerson({ id: ..., name: ..., age: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePerson(dataConnect, updatePersonVars);

console.log(data.person_update);

// Or, you can use the `Promise` API.
updatePerson(updatePersonVars).then((response) => {
  const data = response.data;
  console.log(data.person_update);
});
```

### Using `UpdatePerson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePersonRef, UpdatePersonVariables } from '@dataconnect/generated';

// The `UpdatePerson` mutation requires an argument of type `UpdatePersonVariables`:
const updatePersonVars: UpdatePersonVariables = {
  id: ..., 
  name: ..., 
  age: ..., 
};

// Call the `updatePersonRef()` function to get a reference to the mutation.
const ref = updatePersonRef(updatePersonVars);
// Variables can be defined inline as well.
const ref = updatePersonRef({ id: ..., name: ..., age: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePersonRef(dataConnect, updatePersonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.person_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.person_update);
});
```

## DeletePerson
You can execute the `DeletePerson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePerson(vars: DeletePersonVariables): MutationPromise<DeletePersonData, DeletePersonVariables>;

interface DeletePersonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePersonVariables): MutationRef<DeletePersonData, DeletePersonVariables>;
}
export const deletePersonRef: DeletePersonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePerson(dc: DataConnect, vars: DeletePersonVariables): MutationPromise<DeletePersonData, DeletePersonVariables>;

interface DeletePersonRef {
  ...
  (dc: DataConnect, vars: DeletePersonVariables): MutationRef<DeletePersonData, DeletePersonVariables>;
}
export const deletePersonRef: DeletePersonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePersonRef:
```typescript
const name = deletePersonRef.operationName;
console.log(name);
```

### Variables
The `DeletePerson` mutation requires an argument of type `DeletePersonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePersonVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePerson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePersonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePersonData {
  person_delete?: Person_Key | null;
}
```
### Using `DeletePerson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePerson, DeletePersonVariables } from '@dataconnect/generated';

// The `DeletePerson` mutation requires an argument of type `DeletePersonVariables`:
const deletePersonVars: DeletePersonVariables = {
  id: ..., 
};

// Call the `deletePerson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePerson(deletePersonVars);
// Variables can be defined inline as well.
const { data } = await deletePerson({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePerson(dataConnect, deletePersonVars);

console.log(data.person_delete);

// Or, you can use the `Promise` API.
deletePerson(deletePersonVars).then((response) => {
  const data = response.data;
  console.log(data.person_delete);
});
```

### Using `DeletePerson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePersonRef, DeletePersonVariables } from '@dataconnect/generated';

// The `DeletePerson` mutation requires an argument of type `DeletePersonVariables`:
const deletePersonVars: DeletePersonVariables = {
  id: ..., 
};

// Call the `deletePersonRef()` function to get a reference to the mutation.
const ref = deletePersonRef(deletePersonVars);
// Variables can be defined inline as well.
const ref = deletePersonRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePersonRef(dataConnect, deletePersonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.person_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.person_delete);
});
```

