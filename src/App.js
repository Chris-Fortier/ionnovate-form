import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./components/pages/Form";

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Form} />
            <Route component={Form} />
         </Switch>
      </Router>
   );
}

export default App;
