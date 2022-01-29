import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home/index";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../providers/AuthContext";

export const Routes = () => {
  const { accessToken } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {!!accessToken && <Redirect to="/dashboard" />}
      <Route path="/signup" component={Signup}>
        {!!accessToken && <Redirect to="/dashboard" />}
      </Route>
      <Route path="/login" component={Login}>
        {!!accessToken && <Redirect to="/dashboard" />}
      </Route>
      <Route path="/dashboard" component={Dashboard}>
        {!accessToken && <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};
