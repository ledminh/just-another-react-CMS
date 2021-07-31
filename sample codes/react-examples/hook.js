import React, { useEffect, useState } from 'react';

const [state, setState] = useState({});

setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});


//Lazy initial state
const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
  });


  function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
      <>
        Count: {count}
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      </>
    );
  }


  useEffect(
    () => {
      const subscription = props.source.subscribe();
      return () => {
        subscription.unsubscribe();
      };
    },
    [props.source],
  );