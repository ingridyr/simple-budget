import { Switch, Route } from "react-router-dom";
<<<<<<< HEAD
import { Dashboard } from "../pages/Dashboard";
=======
import {Signup} from "../pages/Signup/index"
import {Login} from "../pages/Login/index"
>>>>>>> a91c87ae71e5311f332f7abf185ef687a1338ec0

export const Routes = () => {
  return (
    <Switch>
<<<<<<< HEAD
      <Route exact path="/" component={{}} />
      <Route path="/dashboard" component={Dashboard} />
=======
      {/* <Route exact path="/" component={} /> */}
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
>>>>>>> a91c87ae71e5311f332f7abf185ef687a1338ec0
    </Switch>
  );
};
