import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined} from '@ant-design/icons'
import "antd/dist/antd.css";


class Why extends PureComponent{
  render(){
    const whydata = this.props.whydata;
    const linedata = this.props.linedata;
    return (
        <>
            {this.renderContent(whydata,linedata)}
        </>
    )
  }
  renderContent = (whydata,linedata) =>{
    if(whydata.whyid){
        return <div className="why">
            <div className="whyqa" onDoubleClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}>
                <div className="whyqatitleq">
                    Question:
                </div>
                <div className="whyqacontentq">
                    {whydata.why.question}
                </div>
                <div className="whyqatitlea">
                    Answer:
                </div>
                <div className="whyqacontente">
                    {whydata.why.answer}
                </div>
            </div>
            <div className="whyqaactionpanel">
                <PlusCircleOutlined onClick={(e)=>{this.props.addwhyfunc(e,linedata.lineid)}} className="whyacbtn"/>
                <MinusCircleOutlined onClick={(e)=>{this.props.delwhyfunc(e,linedata.lineid,whydata.whyid)}} className="whyacbtn"/>
                <EditOutlined  className="whyacbtn" onClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}/>
            </div>
        </div>
    }else {
        return <div className="emptywhy"></div>
    }
  }
}

export default Why
