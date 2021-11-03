import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Routes from "./routes";
import NotFound from "./components/NotFound";


const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={Routes.Index.url} component={Routes.Index.component} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;