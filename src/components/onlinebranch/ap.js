import { PureComponent } from "react";
import {MinusCircleOutlined,AmazonOutlined,CommentOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Ap extends PureComponent{
  render(){
    const ap = this.props.ap;
    const css = this.props.css;
    const comments = this.props.findcomments(null,ap.eleid);
    return (
      <div className="ap" style={{height: css.multiple*css.eleheight+"px"}}>
        <div className="content">
          <div className="title" >
              Action Proposal
          </div>
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
            <CommentOutlined className="acbtn" onClick={e=>{this.props.showcomment(e,ap.eleid)}} title={"Comment,"+comments.length}/>
        </div>
      </div>
    )
  }
}

export default Ap
