import { PureComponent } from "react";

class Ap extends PureComponent{
  render(){
    const apdata = this.props.apdata.ap
    const lineid = this.props.linedata.lineid
    return (
      <div className="ap">
        <div>{apdata.ele1}</div>
        <div>{apdata.ele2}</div>
        <div>{apdata.ele3}</div>
        <div>{apdata.ele4}</div>
        <div>{apdata.ele5}</div>
        <button onClick={e=>{
          this.props.addapfunc(e,lineid)
        }}>add a ap
        </button>
      </div>
    )
  }
}

export default Ap
