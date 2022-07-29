import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined,CommentOutlined  } 
        from '@ant-design/icons';
import "antd/dist/antd.css";
import './css/why.scss'


class Why extends PureComponent{
  render(){
    const why = this.props.why; 
    const css = this.props.css;
    const comments = this.props.findcomments(null,why.eleid);
    const hightlighteleid = this.props.actionparam.hightlighteleid;
    return (
        <>
            {this.renderContent(why, css, comments, hightlighteleid)}
        </>
    )
  }
  renderContent = (why,css,comments, hightlighteleid) =>{
    let eleid = why.eleid; 
    let hightclass = (this.relationwithele(hightlighteleid,why) ? "whyhightlight":"");
    let className = "why" + " " + hightclass;
    return <div className={className} style={{height: css.multiple*(css.eleheight*why.rsize)+(why.rsize-1)*css.marginbottom+"px",
                                        width: css.multiple*(css.elewidth)+"px",
                                        }} 
                                onClick={(e)=>{this.props.setHightLightEle(e, eleid)}}    >
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
                <CommentOutlined className="whyacbtn" onClick={e=>{this.props.showcomment(e,eleid)}} title={"Comment,"+comments.length}/>
            </div>
        </div>
  } 
  relationwithele(hightlighteleid, ele){
    if (ele.eleid == hightlighteleid || ele.pid == hightlighteleid ){
        return true
    }
    if(ele.pid){
        
    }
    if(ele.subeles){
        for(let i=0;i<ele.subeles.length;i++){
            if(ele.subeles[i].eleid == hightlighteleid){
                return true
            }
            if(ele.subeles[i].subeles){
                for(let j=0;j<ele.subeles[i].subeles.length;j++){
                    if(ele.subeles[i].subeles[j].eleid == hightlighteleid){
                        return true
                    }
                    if(ele.subeles[i].subeles[j].subeles){
                        for(let k=0;k<ele.subeles[i].subeles[j].length;k++){
                            if(ele.subeles[i].subeles[j].subeles[k].eleid == hightlighteleid){
                                return true
                            }
                            if(ele.subeles[i].subeles[j].subeles[k].subeles){
                                for(let m=0;m<ele.subeles[i].subeles[j].subeles[k].length;m++){
                                    if(ele.subeles[i].subeles[j].subeles[k].subeles[m].eleid == hightlighteleid){
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
  }
}

export default Why;



