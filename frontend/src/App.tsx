import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes";
import NotFound from "./components/NotFound";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.Index.url} component={Routes.Index.component} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
