import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Ap from './ap.js';
import Rcaedarootcause from './rcaedarootcause.js';

class Rcaedaap extends PureComponent{
  render(){
    const rcaedaapdata = this.props.rcaedaapdata;
    return (
      <div className="rcaedaap">
        <Rcaedarootcause rcaedarootcausedata={rcaedaapdata.rcaedarootcause}/>
        {
          rcaedaapdata.map((item, index)=>{
            return <Ap apdata={rcaedaapdata.aps}/>
          })
        }
      </div>
    )
  }
}

export default Rcaedaap
