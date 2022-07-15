import { PureComponent } from "react";
import Why5 from './why5';
import Rcaedaap from "./rcaedaap";

class Line extends PureComponent{
  render(){
    const why5data = this.props.why5data
    const rcaedaapdata = this.props.rcaedaapdata
    return (
      <div className="line">
        <Why5 why5data={why5data} />
        <Rcaedaap rcaedaapdata={rcaedaapdata}/>
      </div>
    )
  }
}

export default Line
