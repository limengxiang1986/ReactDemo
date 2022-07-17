import { PureComponent } from "react";
import Footer from "./components/app-footer";
import Body from "./components/body";
import Headers from "./components/app-header";
import {Route} from 'react-router-dom';
import routes from './router';
import { HashRouter } from "react-router-dom";
import {renderRoutes} from 'react-router-config';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Panel from './components/online/panel';
import './assets/css/style.css';



class App extends PureComponent{
  constructor(prop){
    super(prop);
    this.state = {
    }
  }
  render(){
    return (
      <BrowserRouter>
         <Panel /> 
      </BrowserRouter>
    )
  }
}

export default App
