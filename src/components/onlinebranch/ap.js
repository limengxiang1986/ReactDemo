import { PureComponent } from "react";
import {MinusCircleOutlined,AmazonOutlined,CommentOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";
import './css/ap.scss'
class Ap extends PureComponent{
  render(){
    const ap = this.props.ap;
    const css = this.props.css;
    const comments = this.props.findcomments(null,ap.eleid);
    const hightrelationeleflag = this.props.hightrelationeleflag;
    let hightlightclass = (hightrelationeleflag ? "hightlight" : "" ) ;
    return (
      <div className={"ap " + hightlightclass} style={{height: css.multiple*css.eleheight+"px",
                                  width: css.multiple*(css.elewidth)+"px",}}
                                  onClick={(e)=>{this.props.setHightLightEle(e, ap.eleid)}} 
                                  >
        <div className="content">
          <div className="title" >
              Action Proposal
          </div>
          <div>
            Preventive Action Proposal
          </div>
          <div>Root Cause Category</div>
          <div><input defaultValue={ap.ele1}/></div>
          <div>Root Cause Subcategory</div>
          <div><input defaultValue={ap.ele2}/></div>
        </div>
        <div className="apactionpanel">
            {/* <AmazonOutlined onClick={(e)=>{this.props.addsubap(e, ap.eleid)}} title="Create ap" className="acbtn"/>  */}
            <MinusCircleOutlined onClick={(e)=>{this.props.delele(e, ap.eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} title="Delete" className="acbtn"/> 
            <CommentOutlined className="acbtn" onClick={e=>{this.props.showcomment(e,ap.eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} title={"Comment,"+comments.length}/>
        </div>
      </div>
    )
  }
}

export default Ap
