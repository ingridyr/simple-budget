import { Switch, Route } from "react-router-dom";
import { ModalAddBuget } from "../components/Modais/addBuget";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ModalAddBuget} />
    </Switch>
  );
};
