import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined,MinusCircleOutlined,CommentOutlined,EditOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";
import './css/rootcause.scss'
class Rootcause extends PureComponent{
  render(){ 
    const rootcause = this.props.rootcause;
    const css = this.props.css;
    const comments = this.props.findcomments(null,rootcause.eleid);
    const hightrelationeleflag = this.props.hightrelationeleflag;
    let hightlightclass = (hightrelationeleflag ? "hightlight" : "" ) ;
    return (
      <div className={"rcaedarootcause " + hightlightclass} style={{height: css.multiple*css.eleheight+"px",
                                               width: css.multiple*(css.elewidth)+"px",}}
                                       onClick={(e)=>{this.props.setHightLightEle(e, rootcause.eleid)}}
                                       > 
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
            <CommentOutlined className="acbtn" onClick={e=>{this.props.showcomment(e,rootcause.eleid)}} title={"Comment,"+comments.length}/>
        </div>
      </div>
    )
  }
}

export default Rootcause
