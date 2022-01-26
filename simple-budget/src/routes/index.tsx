import { Switch, Route } from "react-router-dom";
// import { Home } from "../pages/Home/index";
import { Signup } from "../pages/Signup/index";
import { Login } from "../pages/Login/index";
// import { Dashboard} from "../pages/Dashboard/index";

export const Routes = () => {
  return (
    <Switch>
      {/* <Route exact path="/" component={Home} /> */}
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      {/* <Route path="/dashboard" component={Dashboard} /> */}
    </Switch>
  );
};
