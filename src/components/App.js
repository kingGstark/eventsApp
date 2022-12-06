import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Home from "../pages/Home";
import UserList from "./UserList";
import Events from "../pages/Events";
import LeafletMap from "./LeafletMap";
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route exact path="/" component={Events}></Route> */}
        <Route exact path="/" component={LeafletMap}></Route>
      </Switch>
    </Router>
  );
};
export default App;
