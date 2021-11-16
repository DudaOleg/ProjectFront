import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import users from "../components/users/getAllUsers/GetAllUsers";
import create from "../components/users/createUsers/CreateUser";
import update from "../components/users/updateUsers/UpdateUsers";
import auth from "../components/users/authorization/Authorization";

export default function IndexRoutes() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {

        return (
            <BrowserRouter>
                <Switch>
                    <Route path={'/create'} component={create}/>
                    <Route path={'/update'} component={update}/>
                    <Route path={'/users'} component={users}/>
                    <Redirect to={'/users'}/>
                </Switch>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <Switch>
                    <Route path={'/authorizaton'} component={auth}/>
                    <Redirect to={'/authorizaton'}/>
            </Switch>
        </BrowserRouter>
    )
}