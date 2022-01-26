import { Switch, Route } from "react-router-dom";
import {Signup} from "../pages/Signup/index"
import {Login} from "../pages/Login/index"

export const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path="/" component={} /> */}
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};
