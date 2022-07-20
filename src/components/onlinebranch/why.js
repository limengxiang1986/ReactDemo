import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined,CommentOutlined  } 
        from '@ant-design/icons'
import "antd/dist/antd.css";


class Why extends PureComponent{
  render(){
    const why = this.props.why;
    const css = this.props.css;
    return (
        <>
            {this.renderContent(why, css)}
        </>
    )
  }
  renderContent = (why,css) =>{
    let eleid = why.eleid; 
    return <div className="why" style={{height: css.eleheight*why.rsize+(why.rsize-1)*css.marginbottom+"px"}}>
            <div className="whyqa" >
                <div className="whyqatitleq" >
                    Question:
                </div>
                <div className="whyqacontentq" >
                    {why.question}
                </div>
                <div className="whyqatitlea" >
                    Answer:
                </div>
                <div className="whyqacontente" >
                    {why.answer}
                </div>
            </div>
            <div className="whyqaactionpanel" > 
                <SisternodeOutlined onClick={(e)=>{this.props.addsubwhy(e,eleid)}} className="whyacbtn" title="Add subwhy"/>
                <LoginOutlined onClick={(e)=>{this.props.addrootcause(e,eleid)}} className="whyacbtn" title="Add root cause"/>
                <MinusCircleOutlined onClick={(e)=>{this.props.delele(e,eleid)}} className="whyacbtn" title="Delete"/>
                <EditOutlined className="whyacbtn" onClick={e=>{this.props.editqa(e,eleid)}} title="Edit"/>
                <CommentOutlined className="whyacbtn" onClick={e=>{this.props.addcomment(e,eleid)}} title="Comment"/>
            </div>
        </div>
  }
}

export default Why
