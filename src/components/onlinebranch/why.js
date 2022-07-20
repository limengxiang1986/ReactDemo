import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined  } 
        from '@ant-design/icons'
import "antd/dist/antd.css";


class Why extends PureComponent{
  render(){
    const why = this.props.why;
    const css = this.props.css;
    const whyid = why.whyid;
    return (
        <>
            {this.renderContent(why, css)}
        </>
    )
  }
  renderContent = (why,css) =>{
    let whyid = why.eleid; 
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
                <SisternodeOutlined onClick={(e)=>{this.props.addsubwhy(e,whyid)}} className="whyacbtn" title="Add subwhy"/>
                <LoginOutlined onClick={(e)=>{this.props.addrootcause(e,whyid)}} className="whyacbtn" title="Add root cause"/>
                <MinusCircleOutlined onClick={(e)=>{this.props.delele(e,whyid)}} className="whyacbtn" title="Delete"/>
                <EditOutlined className="whyacbtn" onClick={e=>{this.props.editqa(e,whyid)}} title="Edit"/>
            </div>
        </div>
  }
}

export default Why
