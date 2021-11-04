import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppDispatch } from "./redux/store";
import { loadUser } from "./redux/slice/auth";
import Layout from "./components/Layout";
import Routes from "./routes";
import NotFound from "./components/NotFound";


const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={Routes.Index.url} component={Routes.Index.component} />
          <Route exact path={Routes.Register.url} component={Routes.Register.component} />
          <Route exact path={Routes.Login.url} component={Routes.Login.component} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;