import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { routes } from "./routes";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// You can re-hydrate the initial state of the store here.
// Generally good if the initial state can come from a backing service.
// Or if it was being loaded from local storage.
const store = configureStore({});

/**
 * Pull the routes from a separate page to keep this one clean of the application layout.
 */
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
