import { PureComponent } from "react";
import Why5 from './why5';
import Rcaedaap from "./rcaedaap";

class Line extends PureComponent{
  render(){
    return (
      <div>
        <Why5/>
        <Rcaedaap/>
      </div>
    )
  }
}

export default Line
