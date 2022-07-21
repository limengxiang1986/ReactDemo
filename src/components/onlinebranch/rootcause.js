import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined,MinusCircleOutlined,CommentOutlined,EditOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Rootcause extends PureComponent{
  render(){ 
    const rootcause = this.props.rootcause 
    return (
      <div className="rcaedarootcause"> 
        <div className="content">
          <div className="title" >
              Root Cause
          </div>
          {rootcause.rootcause}
        </div>
        <div className="rcaedarootcauseactionpanel">
            <AmazonOutlined onClick={(e)=>{this.props.addsubap(e, rootcause.eleid)}} title="Create ap" className="acbtn"/> 
            <MinusCircleOutlined onClick={(e)=>{this.props.delele(e, rootcause.eleid)}} title="Delete" className="acbtn"/> 
            <EditOutlined className="acbtn" onClick={e=>{this.props.editrootcause(e,rootcause.eleid)}} title="Edit"/>
            <CommentOutlined className="acbtn" onClick={e=>{this.props.addcomment(e,rootcause.eleid)}} title="Comment"/>
        </div>
      </div>
    )
  }
}

export default Rootcause
