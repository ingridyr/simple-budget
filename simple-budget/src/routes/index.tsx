import { Switch, Route} from "react-router-dom";
import { Home } from "../pages/Home/index";
import { Signup } from "../pages/Signup/index";
import { Login } from "../pages/Login/index";
import { Dashboard } from "../pages/Dashboard/index";
//import { useAuth } from "../providers/AuthContext";
//import { Redirect } from "react-router-dom";
import { Statistics } from "../pages/Statistics";

export const Routes = () => {

  //const { accessToken } = useAuth()

  return (
    <Switch>
      <Route exact path="/" component={Home}/> 
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path="/dashboard" component={Dashboard}>
        {/* {!accessToken && <Redirect to="/" />} */}
      </Route>
      <Route path="/statistics" component={Statistics}/>
    </Switch>
  );
};