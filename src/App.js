import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
/*------ Pages-----*/
import ScrollToTopRoute from "./ScrollToTopRoute";

import NotFound from "./Pages/404";
import FarmerSaathi from "./Pages/FarmerSaathi";
import SaathiPreview from "./Pages/SaathiPreview";
import Existinguser from "./components/AgraniLanding/SaathiForm/PreviewPage/Existinguser";
import UserPreview from "./components/AgraniLanding/SaathiForm/UserPreview";


class App extends Component {
  componentDidMount() {
    this.props.hideLoader();
  }
  render() {
    return (
      <Router>
       
        <Switch>
        <ScrollToTopRoute exact={true} path="/" component={FarmerSaathi} />
        
       
          <ScrollToTopRoute path="/final-preview" component={SaathiPreview} />
          <ScrollToTopRoute path="/Existinguser" component={Existinguser} />
          <ScrollToTopRoute path="/UserPreview" component={UserPreview} />
         
         
          
          <ScrollToTopRoute component={NotFound} />
       
          
        </Switch>
      </Router>
    );

  }
}

export default App;
