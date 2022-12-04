import { useState } from "react";
import "./App.css";
import { Button, Display } from "./Button";

export function App() {
  // Top level state, this can be passed as props to child components.
  const [counter, setCounter] = useState(0);

  const incrementCounter = (incrementValue: number) => {
    setCounter(counter + incrementValue);
  };

  return (
    // Short hand to React.Fragment, no new dom element will be created.
    // But allows for chaining multiple elements together.
    <>
      <Button onClickFunction={incrementCounter} increment={1}></Button>
      <Button onClickFunction={incrementCounter} increment={5}></Button>
      <Button onClickFunction={incrementCounter} increment={10}></Button>
      <Button onClickFunction={incrementCounter} increment={100}></Button>
      <Display message={counter}></Display>
    </>
  );
}
