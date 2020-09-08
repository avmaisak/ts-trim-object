# ts-trim-object

Small library which removes empty data from the object.

## Usage

_1. Install the package_

```sh
npm i ts-trim-object --save
```

_2. Import module_
```ts
import 'ts-trim-object';
```
_3. Define yor object_
```ts
const myObject1 = { property: 'MyProperty', blankProperty:'', array: [] };
const myObject2 = { property: '      ' };
const myObject3 = { property: 'MyProperty',  array: [{ prop: 'PropText', prop2: ''}] };

// remove empty properties
const result1 = myObject1.trimProps();
const result2 = myObject2.trimProps();
const result3 = myObject3.trimProps();

```
### result1 will be 
```{ property: 'MyProperty' }```

### result2 will be 
``` { } ```

### result3 will be 
``` { property: 'MyProperty',  array: [{ prop: 'PropText' }] } ```
