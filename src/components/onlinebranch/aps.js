import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Ap from './ap.js';

class Aps extends PureComponent{
  render(){
    console.log('Rcaedaap')
    const aps = this.props.apsdata
    const linedata = this.props.linedata
    return (
      <div className="aps">
        {
          aps.map((item, index, allitem)=>{
            return <Ap  key={"ap"+index} apdata={item} linedata={linedata}
                    addapfunc={this.props.addapfunc}
                    delapfunc={this.props.delapfunc}/>
          })
        }
      </div>
    )
  }
}

export default Aps
