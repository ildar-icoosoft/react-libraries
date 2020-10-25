<h1 align="center">ii-react-libraries</h1>

<h3 align="center">

A collection of useful react libraries

</h3>

<p align="center">
    <img alt="CI" src="https://github.com/ildar-icoosoft/react-libraries/workflows/CI/badge.svg">
    <a href="https://codecov.io/gh/ildar-icoosoft/react-libraries">
        <img alt="codecov" src="https://codecov.io/gh/ildar-icoosoft/react-libraries/branch/master/graph/badge.svg?token=G34ATTWUCT">
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
    </a>
    <a href="https://www.npmjs.com/package/ii-react-libraries">
        <img alt="semantic-release" src="https://img.shields.io/npm/v/ii-react-libraries">
    </a>
</p>

At the moment, the library contains several react hooks. In future releases it is planned to add useful components and helper functions.

- Usage
  - [Installation](#installation)
- Hooks
  - [useCombinedRefs](#usecombinedrefs)
  - [usePrevious](#useprevious)
  - [usePreviousDifferent](#usepreviousdifferent)
  - [useShallowEqualSelector](#useshallowequalselector)
  - [useDeepEqualSelector](#usedeepequalselector)
  
## Installation

```bash
npm install ii-react-libraries # or yarn add ii-react-libraries
```  

## Hooks

### useCombinedRefs

```javascript
const ref = useCombinedRefs(...refs)
```

Merges refs into one ref. Useful when you need to bind more than one ref to DOM element.

Usage example:

```JSX
import { useCombinedRefs } from "ii-react-libraries";
import { useDrag, useDrop } from "react-dnd";

function App() {
  const domRef = useRef(null);

  const [, dragRef] = useDrag({
    // ...
  });

  const [, dropRef] = useDrop({
    // ...
  });

  return (
    <div ref={useCombinedRefs(domRef, dragRef, dropRef)}></div>
  );
}
```  

### usePrevious 

```javascript
const prevValue = usePrevious(initialValue);
```

One question that comes up a lot is "When using hooks how do I get the previous value of props or state?". 
With React class components you have the componentDidUpdate method which receives previous props and state
as arguments or you can update an instance variable (this.previous = value) and reference it later to get
the previous value. So how can we do this inside a functional component that doesn't have lifecycle methods
or an instance to store values on? Hooks to the rescue! We can create a custom hook that uses the useRef hook
internally for storing the previous value. See the recipe below with inline comments. You can also find this
example in the official [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).

Usage example:

```JSX
import { useState, useEffect, useRef } from 'react';
import { usePrevious } from "ii-react-libraries";

// Usage
function App() {
  // State value and setter for our example
  const [count, setCount] = useState(0);
  
  // Get the previous value (was passed into hook on last render)
  const prevCount = usePrevious(count);
  
  // Display both current and previous count value
  return (
    <div>
      <div>Now: {count}, before: {prevCount}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
   );
}
```

### usePreviousDifferent 

```javascript
const prevDifferentValue = usePreviousDifferent(initialValue);
```

Like [usePrevious](#usePrevious), but returns previous value, different from the current

### useShallowEqualSelector 

```javascript
const result = useShallowEqualSelector(selector);
```

This hook uses [useSelector()](https://react-redux.js.org/api/hooks#useselector) with shallow equality.
 
It is shortcut for this code:

```JSX
import { useSelector, shallowEqual } from "react-redux";

useSelector(selector, shallowEqual);
```

Usage example:

```JSX
import { useShallowEqualSelector } from "ii-react-libraries";

useShallowEqualSelector(selector);
```

### useDeepEqualSelector

```javascript
const result = useDeepEqualSelector(selector[, customizer])
```

This hook uses [useSelector()](https://react-redux.js.org/api/hooks#useselector) with deep equality.
For comparison function Lodash's [_.isEqualWith()](https://lodash.com/docs/4.17.15#isEqualWith) is used.
You can pass optional customizer parameter which is invoked to compare values. If customizer returns undefined, comparisons are handled by the method instead. The customizer is invoked with up to six arguments: (objValue, othValue [, index|key, object, other, stack]).

Usage example:
  
```JSX
import { useDeepEqualSelector } from "ii-react-libraries";

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, othValue) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
    return true;
  }
}

useDeepEqualSelector(selector, customizer);
```
