import Home from "./routes/home/Home";
import Admin from "./routes/admin/Admin";
import { Switch, Route } from 'react-router-dom';
import EnteringTest from "./routes/entering-test/EnteringTest";
// import SolveTest from "./components/solve-test/SolveTest";
import SolvingTest from "./routes/solving-test/SolvingTest";
import AdminLogin from "./routes/auth/AdminLogin";
import Private from "./routes/private/PrivateRoute";
import PrivateUser from "./routes/private/PrivateUser";
import UserLogin from "./routes/auth/UserLogin";
import PrivateTestRoute from './routes/private/PrivateTestRoute';
import Congrats from "./routes/congrats/Congrats";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/video/:tabid">
          <Home/>
        </Route>
        <PrivateUser path="/enteringtest" component={EnteringTest}/>
        <Route path="/congrats" component={Congrats}/>
        <PrivateTestRoute path="/resolvingtest" component={SolvingTest}/>
        <Route path="/user/login">
          <UserLogin/>
        </Route>
        <Route path="/login" component={AdminLogin}/>
        <Private path="/admin" component={Admin} />
      </Switch>
    </>
  );
}

export default App;