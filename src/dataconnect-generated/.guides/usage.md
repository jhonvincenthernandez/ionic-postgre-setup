# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listPeople, createPerson, updatePerson, deletePerson } from '@dataconnect/generated';


// Operation ListPeople: 
const { data } = await ListPeople(dataConnect);

// Operation CreatePerson:  For variables, look at type CreatePersonVars in ../index.d.ts
const { data } = await CreatePerson(dataConnect, createPersonVars);

// Operation UpdatePerson:  For variables, look at type UpdatePersonVars in ../index.d.ts
const { data } = await UpdatePerson(dataConnect, updatePersonVars);

// Operation DeletePerson:  For variables, look at type DeletePersonVars in ../index.d.ts
const { data } = await DeletePerson(dataConnect, deletePersonVars);


```