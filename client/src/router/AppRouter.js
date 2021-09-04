import { BrowserRouter,  Route,  Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import OperationsPage from "../pages/OperationsPage";
import PrivateRoute from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Switch>
                <PublicRouter exact path="/" component={HomePage}/>
                <PrivateRoute path="/operations" component={OperationsPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    )
}