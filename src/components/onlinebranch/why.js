import { PureComponent } from "react";
import { Modal } from 'antd';
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined,CommentOutlined  } 
        from '@ant-design/icons';
import "antd/dist/antd.css";
import './css/why.scss'


class Why extends PureComponent{
    constructor(props){
        super(props);
    }
  render(){
    const why = this.props.why; 
    let eleid = why.eleid;
    const css = this.props.css;
    const comments = this.props.findcomments(null,why.eleid);
    const hightrelationeleflag = this.props.hightrelationeleflag;
    let hightlightclass = (hightrelationeleflag ? "hightlight" : "" ) ;
    return (
        <>
        <div className={"why " + hightlightclass} style={{height: css.multiple*(css.eleheight*why.rsize)+(why.rsize-1)*css.marginbottom+"px",
                                        width: css.multiple*(css.elewidth)+"px",
                                        }} 
                                        onClick={(e)=>{this.props.setHightLightEle(e, eleid)}} 
                                >
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
                {/* <SisternodeOutlined onClick={(e)=>{this.props.addsubwhy(eleid)}} className="whyacbtn" title="Add subwhy"/> */}
                <SisternodeOutlined onClick={(e)=>{this.props.shownewwhypanel(e, eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} className="whyacbtn" title="Add subwhy"/>
                <LoginOutlined onClick={(e)=>{this.props.addrootcause(e,eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} className="whyacbtn" title="Add root cause"/>
                <MinusCircleOutlined onClick={(e)=>{this.props.delele(e,eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} className="whyacbtn" title="Delete"/>
                <EditOutlined className="whyacbtn" onClick={e=>{this.props.editqa(e,eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} title="Edit"/>     
                <CommentOutlined className="whyacbtn" onClick={e=>{this.props.showcomment(e,eleid);
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();}} title={"Comment,"+comments.length}/>
            </div>
        </div>
        </>
    )
  }
  //this.props.addsubwhy(e,eleid, question, answer)
}

export default Why;



