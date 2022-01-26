import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={{}} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};
