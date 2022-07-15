import { PureComponent } from "react";

class Ap extends PureComponent{
  render(){
    const apdata = this.props.apdata
    return (
      <div className="ap">
        <div>{apdata.ele1}</div>
        <div>{apdata.ele2}</div>
        <div>{apdata.ele3}</div>
        <div>{apdata.ele4}</div>
        <div>{apdata.ele5}</div>
      </div>
    )
  }
}

export default Ap
