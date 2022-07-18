import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined  } 
        from '@ant-design/icons'
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
                <div className="whyqatitleq" onDoubleClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}>
                    Question:
                </div>
                <div className="whyqacontentq" onDoubleClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}>
                    {whydata.why.question}
                </div>
                <div className="whyqatitlea" onDoubleClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}>
                    Answer:
                </div>
                <div className="whyqacontente" onDoubleClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}>
                    {whydata.why.answer}
                </div>
            </div>
            <div className="whyqaactionpanel" onDoubleClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}>
                {/**<SubnodeOutlined onClick={(e)=>{this.props.addrightwhyfunc(e,linedata.lineid)}} className="whyacbtn" title="sdfsad"/>*/}
                <SisternodeOutlined onClick={(e)=>{this.props.addsubwhyfunc(e,linedata.lineid)}} className="whyacbtn"/>
                <ColumnHeightOutlined onClick={(e)=>{this.props.addsubwhyfunc(e,linedata.lineid)}} className="whyacbtn"/>
                <LoginOutlined onClick={(e)=>{this.props.addrootescapsecausefunc(e,linedata.lineid)}} className="whyacbtn"/>
                <MinusCircleOutlined onClick={(e)=>{this.props.delwhyfunc(e,linedata.lineid,whydata.whyid)}} className="whyacbtn"/>
                <EditOutlined className="whyacbtn" onClick={e=>{this.props.editqafunc(e,linedata.lineid,whydata.whyid)}}/>
                <DownOutlined className="whyacbtn" onClick={e=>{this.props.addlinefunc(e)}}/>
                <DownOutlined className="whyacbtn" onClick={e=>{this.props.modifycontent(e,linedata.lineid,whydata.whyid,'slakflsafdjkl')}}/>
            </div>
        </div>
    }else {
        return <div className="emptywhy"></div>
    }
  }
}

export default Why
