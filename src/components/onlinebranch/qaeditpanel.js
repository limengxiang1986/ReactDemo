import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined,MinusCircleOutlined,CommentOutlined,EditOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";
import './css/rootcause.scss'
class Qaeditpandel extends PureComponent{
  render(){ 
    const rootcause = this.props.rootcause;
    const css = this.props.css; 
    const why = this.props.why;
    const editedwhyid = this.props.editedwhyid;
    return (
        <div className="edpanel">
            <div className="maskclass">
            </div>
            <div className="qaEditPanel">
            <div className="whyqa" >
                <div className="whyqatitleq" >
                    Question:
                </div>
                <div className="whyqacontentq" >
                    <input ref={input => this.questioninput = input} defaultValue={why.question}/>
                </div>
                <div className="whyqatitlea" >
                    Answer:
                </div>
                <div className="whyqacontente" >
                    <input ref={input => this.answerinput = input} defaultValue={why.answer}/>
                </div>
            </div>  
            <div className="bottom">
                <button onClick={e=>{this.qaeditSave(this.state.actionparam.showwhyedit,editedwhyid)}} className="btn">Save</button>
                <button onClick={e=>{this.qaeditClose(this.state.actionparam.showwhyedit)}} className="btn">Close</button>
            </div>
            </div>
      </div>
    )
  }
}

export default Qaeditpandel
