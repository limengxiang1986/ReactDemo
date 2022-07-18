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
          <div>
            Preventive Action Proposal
          </div>
          <div>
            <input />
          </div>
          <div>Root Cause Category</div>
          <div><input /></div>
          <div>Root Cause Subcategory</div>
          <div><input /></div>
          <div>RCA Action Type</div>
          <div><input /></div>
          <div>Assigned To</div>
          <div><input /></div>
          <div>Jira Action Item Link</div>
          <div><input /></div>
          <div>Completion Target Date</div>
          <div><input /></div>
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
