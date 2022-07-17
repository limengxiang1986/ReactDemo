import { PureComponent } from "react";
import {MinusCircleOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Ap extends PureComponent{
  render(){
    const apdata = this.props.apdata.ap
    const lineid = this.props.linedata.lineid
    return (
      <div className="ap">
        <div className="content">
          <div>{apdata.ele1}</div>
          <div>{apdata.ele2}</div>
          <div>{apdata.ele3}</div>
          <div>{apdata.ele4}</div>
          <div>{apdata.ele5}</div>
        </div>
        <div className="apactionpanel">
            <MinusCircleOutlined  onClick={(e)=>{this.props.delapfunc(e,lineid,apdata.apid)}} className="apactionbtn"
                  />
        </div>
      </div>
    )
  }
}

export default Ap
