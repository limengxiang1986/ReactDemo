import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined  } 
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
    if(!why.isblank){
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
            {/* <div className="whyqaactionpanel" > 
                <SisternodeOutlined onClick={(e)=>{this.props.addsubwhyfunc(e,linedata.lineid)}} className="whyacbtn"/>
                <ColumnHeightOutlined onClick={(e)=>{this.props.addsubwhyfunc(e,linedata.lineid)}} className="whyacbtn"/>
                <LoginOutlined onClick={(e)=>{this.props.addrootescapsecausefunc(e,linedata.lineid)}} className="whyacbtn"/>
                <MinusCircleOutlined onClick={(e)=>{this.props.delwhyfunc(e,linedata.lineid,why.whyid)}} className="whyacbtn"/>
                <EditOutlined className="whyacbtn" onClick={e=>{this.props.editqafunc(e,linedata.lineid,why.whyid)}}/>
                <DownOutlined className="whyacbtn" onClick={e=>{this.props.addlinefunc(e)}}/>
            </div> */}
        </div>
    }else {
        return <div className="emptywhy"></div>
    }
  }
}

export default Why
