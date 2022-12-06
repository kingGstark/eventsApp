import ReactDom from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./index.css";
const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
