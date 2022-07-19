import { PureComponent } from "react";
import Rcaedarootcause from "./rcaedarootcause";
import Aps from "./aps";

class Rcamodel extends PureComponent{
  render(){
    return (
      <div className="line">
        <Rcaedarootcause/>
        <Aps/>
      </div>
    )
  }
}

export default Rcamodel
