// Component names MUST start with a Capital letter!!!!
// Otherwise react won't know what to do.
export function Button(props: {
  onClickFunction: (incrementValue: number) => void;
  increment: number;
}) {
  // counter = state object (getter)
  // setCounter = updater function (setter)
  // Parameter passed into the "useState" function is the initial state
  // Define the results as a const to make sure that it is a "tuple" and not an un-bounded array.
  // useState is a "hook".
  const handleClick = () => {
    props.onClickFunction(props.increment);
  };

  // Don't invoke function here, just pass pointer to function (function name).
  return <button onClick={handleClick}>+{props.increment}</button>;
}

export function Display(props: { message: number }) {
  return <div>{props.message}</div>;
}
