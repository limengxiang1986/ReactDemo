import { PureComponent } from "react";
import Footer from "./components/app-footer";
import Body from "./components/body";
import Headers from "./components/app-header";
import {Route} from 'react-router-dom';
import routes from './router';
import { HashRouter } from "react-router-dom";
import {renderRoutes} from 'react-router-config';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Panel from './components/panel';
import './assets/css/style.css';

class App extends PureComponent{
  constructor(prop){
    super(prop);
    this.state = {
        paneldata : [{'why5':[{'why':{'question':'123','answer':'xxx'}},{'why':{'question':'123','answer':'xxx'}}],
                             'rcaedaap':{'rcaedarootcause':'rc message','aps':[{'ap':{'ele1':'1','ele2':'1','ele3':'1','ele4':'1','ele5':'1'}}]}
                            
                    },{'why5':[{'why':{'question':'123','answer':'xxx'}},{'why':{'question':'123','answer':'xxx'}}],
                    'rcaedaap':{'rcaedarootcause':'rc message','aps':[{'ap':{'ele1':'1','ele2':'1','ele3':'1','ele4':'1','ele5':'1'}}]}
                   }
        ]
    }
  }
  render(){
    const paneldata = this.state.paneldata;
    return (
      <BrowserRouter>
         <Panel className="" paneldata={paneldata} /> 
      </BrowserRouter>
    )
  }
}

export default App
