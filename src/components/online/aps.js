import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Ap from './ap.js';

class Rcaedaap extends PureComponent{
  render(){
    const aps = this.props.apsdata
    const linedata = this.props.linedata
    return (
      <div className="aps">
        {
          aps.map((item, index)=>{
            return <Ap  key={"ap"+index} apdata={item} linedata={linedata} addapfunc={this.props.addapfunc}/>
          })
        }
      </div>
    )
  }
}

export default Rcaedaap
