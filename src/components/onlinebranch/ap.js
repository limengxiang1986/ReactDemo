import { PureComponent } from "react";
import {MinusCircleOutlined,AmazonOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Ap extends PureComponent{
  render(){
    const ap = this.props.ap
    return (
      <div className="ap">
        <div className="content">
          <div>
            Preventive Action Proposal
          </div>
          <div>Root Cause Category</div>
          <div><input />{ap.ele1}</div>
          <div>Root Cause Subcategory</div>
          <div><input />{ap.ele2}</div>
          <div>RCA Action Type</div>
          <div><input />{ap.ele3}</div>
        </div>
        <div className="apactionpanel">
            {/* <AmazonOutlined onClick={(e)=>{this.props.addsubap(e, ap.eleid)}} title="Create ap" className="acbtn"/>  */}
            <MinusCircleOutlined onClick={(e)=>{this.props.delele(e, ap.eleid)}} title="Delete" className="acbtn"/> 
        </div>
      </div>
    )
  }
}

export default Ap
