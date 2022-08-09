import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Scenario from "./scenario";
import Comment from "./comment";
import './css/panel.scss'
import ModalCompoent from "../../../ModalCompoent/ModalCompoent";
import { CSSTransition } from 'react-transition-group';
import { Modal } from 'antd';
import { ZoomInOutlined,ZoomOutOutlined  } from '@ant-design/icons';
class Panel extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      css:{
        eleheight:210,
        elewidth:210,
        theadheight:30,
        marginbottom:5,
        marginright:5,
        multiple:1,
        highlightborder:"3px solid lightcoral",
      },
      actionparam:{
        editedwhyid:'',
        editedrootcauseid:'',
        editedapid:'',
        commentpid:'',
        styletype:'group',  //continuity,group 
        highlightele:'',
        aplimit:5,
        whylimit:5,
        deeplimit:5,
        rootcauselimit:1,
        hightlighteleid:'-1',
        relationeletree:[],
        currentwhyid:'',
        isshowedit:false,
        question:'',
        answer:'',
      },
      paneldata : {
        "onlineid":"onlineid0001",
        "scenarios":[{
          "scenarioid":"rca01",
          "scenariomc":"where was the fault introduced?",
          "scenariodescription":"where was the fault introduced?",
          "rootwhy":
          {
          "eletype":"why",
          "eleid":"whyid0001", 
          "question":"123",
          "answer":"why1",
          "pid":"",
          "subeles":[
            {
              "eletype":"why",
              "eleid":"whyid0002", 
              "question":"123",
              "answer":"why2-1" ,
              "pid":"whyid0001",
              "subeles":[
                {
                  "eletype":"why",
                  "eleid":"whyid0003", 
                  "question":"123",
                  "answer":"why3-1" ,
                  "pid":"whyid0002",
                  "subeles":[
                    
                  ]
                },
                {
                  "eletype":"why",
                  "eleid":"whyid0004", 
                  "question":"123",
                  "answer":"why3-2" ,
                  "pid":"whyid0002",
                  "subeles":[
                    {
                      "eletype":"rootcause",
                      "eleid":"rtid00001", 
                      "rootcause":"root cause",
                      "pid":"whyid0004",
                      "subeles":[
                        {
                          "eletype":"ap",
                          "eleid":"ap00001", 
                          "ele1":"ele1",
                          "ele2":"ele2",
                          "ele3":"ele3",
                          "ele4":"ele4",
                          "ele5":"ele5",
                          "ele6":"ele6",
                          "pid":"rtid00001",
                          "subeles":[
                            
                          ]
                        }
                      ]
                    },
                  ]
                },
              ]
            },
            {
              "eletype":"why",
              "eleid":"whyid0005", 
              "question":"123",
              "answer":"why2-2" ,
              "pid":"whyid0001",
              "subeles":[
                {
                  "eletype":"why",
                  "eleid":"whyid0006", 
                  "question":"123",
                  "answer":"6" ,
                  "pid":"whyid0005",
                  "subeles":[
                    
                  ]
                }
              ]
            },
          ]
          },
          "comments":[
            {
              "eletype":"comment",
              "eleid":"comment00001",
              "comment":"it works, useful",
              "pid":"whyid0001"
            }
          ]
      }]
      }
    }
  }
  render(){
    const paneldata = this.state.paneldata;
    return (
      <div className="panel">
        {
          paneldata.scenarios.map((item , index, allline)=>{
            return <Scenario key={"sce"+this.getRandomNum()} scenariodata={item} css={this.state.css} actionparam={this.state.actionparam} getRandomNum={this.getRandomNum}
                  addsubwhy={(e,whyid, question, answer)=>this.addsubwhy(whyid, question, answer)}
                  addrootcause={(e,whyid)=>this.addrootcause(whyid)}
                  delele={(e,eleid)=>this.delele(eleid)}
                  editqa={(e,eleid)=>this.editqa(eleid)}
                  editrootcause={(e,eleid)=>this.editrootcause(eleid)}
                  addscenario={(e,whyid)=>this.addscenario(whyid)}
                  addsubap={(e,eleid)=>this.addsubap(eleid)}
                  showcomment={(e,eleid)=>this.showcomment(eleid)}
                  findcomments={(e,eleid)=>this.findcomments(eleid)} 
                  setHightLightEle={(e,eleid)=>this.setHightLightEle(eleid)}  
                  shownewwhypanel={(e,eleid)=>this.shownewwhypanel(eleid)}  
            />
          })
        }
        {
           this.renderQaEditPanel()
        }
        {
           this.renderRootCauseEditPanel()
        }
        {
           this.renderComments()
        }
        {
          this.renderNewWhy()
        }
        <button className="scenariobtn" onClick={e=>{
          this.addscenario()
         }}>add a scenario</button>
         <button className="scenariobtn" onClick={e=>{
           this.toggleStyle()
          }}>toggle style</button>
          <button className="scenariobtn" onClick={e=>{
            this.alertScenariojson()
           }}>alertScenariojson</button>
          <ZoomInOutlined onClick={e=>{this.ZommIn()}} className="scenarioicon"/>
          <ZoomOutOutlined onClick={e=>{this.ZommOut()}} className="scenarioicon"/>
      </div>
    )
  }
  renderNewWhy(){
    return (
        <Modal title="New Why" visible={this.state.actionparam.isshowedit} 
            onOk={(e)=>{this.newwhyhandleOk(this.state.actionparam.currentwhyid)}}
            onCancel={(e)=>{this.newwhyhandleCancel()}}>
            <div>Question:</div>
            <div style={{border:"1px solid #000"}}><input ref={input => this.newwhyquestioninput = input} defaultValue={""}/></div>
            <div>Answer:</div>
            <div style={{border:"1px solid #000"}}><input ref={input => this.newwhyanswerinput = input} defaultValue={""}/></div>
        </Modal>
    )
  }
  renderComments(){
    let commentpid = this.state.actionparam.commentpid;
    let comments = this.findcomments(commentpid);
    if(commentpid){
      return (
      <div className="comments">
          <div className="maskclass">
          </div>
          <div className="qaEditPanel">
            <div className="whyqa" >
                {
                  comments.map((item,index,allcomments)=>{
                    return <Comment key={item.eleid} comment={item} getRandomNum={(e)=>{this.getRandomNum()}}/>
                  })
                }
                <div className="commentaddbtn">
                  Add a comment : &nbsp;
                  <input ref={input => this.commentinput = input} defaultValue={''}/>
                </div>
            </div>  
            <div className="bottom"> 
              <button onClick={e=>{this.commenteditSave(commentpid)}} className="btn">Add</button>
              <button onClick={e=>{this.commenteditClose(this.state.actionparam.showcomments)}} className="btn">Close</button>
            </div>
          </div>
        </div>)
    }else {
      return ''
    }
  }
  renderQaEditPanel(){
    let editedwhyid = this.state.actionparam.editedwhyid;
    let why = this.findele(editedwhyid, this.state.paneldata);
    let currentq = why.question;
    let currenta = why.answer;
    if(editedwhyid){
      return (<div>
        <CSSTransition in={editedwhyid != ""}
                    classNames="qaeditpanelclass"
                    timeout={1000}>
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
        </CSSTransition>
        </div>)
    }else {
      return ''
    }
  }
  renderRootCauseEditPanel(){
    let editedrootcauseid = this.state.actionparam.editedrootcauseid;
    let rt = this.findele(editedrootcauseid, this.state.paneldata);
    let rootcause = rt.rootcause;
    if(editedrootcauseid){
      return <div className="edpanel">
          <div className="maskclass">
          </div>
          <div className="qaEditPanel">
            <div className="whyqa" >
                <div className="whyqatitleq" >
                    Root Cause:
                </div>
                <div className="whyqacontentq" >
                    <input ref={input => this.rootcauseinput = input} defaultValue={rootcause}/>
                </div>
            </div>  
            <div className="bottom">
              <button onClick={e=>{this.rteditSave()}} className="btn">Save</button>
              <button onClick={e=>{this.rteditClose()}} className="btn">Close</button>
            </div>
          </div>
        </div>
    }else {
      return ''
    }
  }
  shownewwhypanel(eleid){
      const actionparam = {...this.state.actionparam};
      const paneldata = {...this.state.paneldata};
      const why = this.findele(eleid, paneldata);
      actionparam.currentwhyid = eleid;
      actionparam.isshowedit = true;
      actionparam.question = why.question;
      actionparam.answer = why.answer;
      this.setState({
          actionparam:actionparam
      })
  }
  newwhyhandleCancel(){
    const actionparam = {...this.state.actionparam};
    actionparam.isshowedit = false;
      this.setState({
          actionparam:actionparam
      })
  }
  newwhyhandleOk(eleid){
    const actionparam = {...this.state.actionparam};
    actionparam.currentwhyid = eleid;
    actionparam.isshowedit = false;
    actionparam.question = this.newwhyquestioninput.value;
    actionparam.answer = this.newwhyanswerinput.value;
    this.setState({
      actionparam:actionparam
    },()=>{
      this.addsubwhy(eleid, this.newwhyquestioninput.value, this.newwhyanswerinput.value);
      this.newwhyquestioninput.value = '';
      this.newwhyanswerinput.value = '';
    })
  }
  commenteditSave(pid){
    let actionparam = {...this.state.actionparam};
    let paneldata = {...this.state.paneldata}
    let scenario = this.findscenario(pid, paneldata)
    let comments = scenario.comments;
    comments.push({
      "eletype":"comment",
      "eleid":"comment"+this.getRandomNum(),
      "comment": this.commentinput.value,
      "pid":pid
    })
    this.setState({
      actionparam:actionparam,
      paneldata:paneldata
    },()=>{
      this.commentinput.value = '';
    })
  }
  commenteditClose(){
    let actionparam = {...this.state.actionparam};
    actionparam.commentpid = '';
    this.setState({
      actionparam:actionparam
    })
  }
  qaeditClose(){
    let actionparam = {...this.state.actionparam};
    actionparam.editedwhyid = '';
    this.setState({
      actionparam:actionparam
    })
  }
  qaeditSave(){
    const paneldatanew = {...this.state.paneldata};
    let actionparam = {...this.state.actionparam};
    let ele = this.findele(actionparam.editedwhyid, paneldatanew)
    ele.question = this.questioninput.value;
    ele.answer = this.answerinput.value;
    actionparam.editedwhyid = '';
    this.setState({
      actionparam:actionparam,
      paneldatanew:paneldatanew
    }) 
  }
  rteditClose(){
    let actionparam = {...this.state.actionparam};
    actionparam.editedrootcauseid = '';
    this.setState({
      actionparam:actionparam
    })
  }
  rteditSave(){
    const paneldatanew = {...this.state.paneldata};
    let actionparam = {...this.state.actionparam};
    let ele = this.findele(actionparam.editedrootcauseid, paneldatanew)
    ele.rootcause = this.rootcauseinput.value;
    actionparam.editedrootcauseid = '';
    this.setState({
      actionparam:actionparam,
      paneldatanew:paneldatanew
    }) 
  }
  findleafele(eleid,paneldata){
    let ele = this.findele(eleid,paneldata);
    if(!ele){
      return ''
    }
    if(ele.subeles.length == 0){
      return ele;
    }
    for(let i=0;i<ele.subeles.length;i++){
      return this.findleafele(ele.subeles[i].eleid,paneldata);
    }
  }
  findscenario(eleid,paneldata){
    let w = ''
    for(let i=0;i<paneldata.scenarios.length;i++){
      w = this.findwhyunderwhy(eleid, paneldata.scenarios[i].rootwhy);
      if(w) {
        return paneldata.scenarios[i];
      }
    }
    return w;
  }
  findele(whyid,paneldata){
    let w = ''
    for(let i=0;i<paneldata.scenarios.length;i++){
      w = this.findwhyunderwhy(whyid, paneldata.scenarios[i].rootwhy);
      if(w) {
        return w;
      }
    }
    return w;
  }
  findsubeles(whyid, paneldata, subeles){
    let w = this.findele(whyid, paneldata);
    for(let i=0;i<w.subeles.length;i++){
      const ele = this.findele(w.subeles[i].eleid, paneldata);
      subeles.push(ele);
      if(ele && ele.subeles && ele.subeles.length > 0){
        subeles.concat(this.findsubeles(ele.eleid, paneldata, subeles))
      }
    }
    return subeles;
  }
  findpele(whyid, paneldata){
    let w = this.findele(whyid, paneldata);
    let pw = '';
    for(let i=0;i<paneldata.scenarios.length;i++){
      pw = this.findwhyunderwhy(w.pid, paneldata.scenarios[i].rootwhy);
      if(pw) {
        return pw;
      }
    }
    return pw;
  }
  findwhyunderwhy(whyid, pele){
    if(whyid == pele.eleid){
      return pele;
    }
    for(let i=0;i<pele.subeles.length;i++){
      let w = this.findwhyunderwhy(whyid, pele.subeles[i]);
      if(w){
        return w;
      }
    }
    return ''
  }
  addsubwhy(whyid, qustion, answer){
    const paneldata = {...this.state.paneldata};
    const why = this.findele(whyid, paneldata);
    let deeplevel = 0;
    let tmpwhyid = why.eleid;
    while(tmpwhyid != ""){
      let twhy = this.findele(this.findele(tmpwhyid, paneldata).pid, paneldata);
      tmpwhyid = twhy ? twhy.eleid : '';
      deeplevel += 1;
    }
    console.log(why);
    if(deeplevel < this.state.actionparam.whylimit){
      why.subeles.push(this.genEmptyWhy(whyid, qustion, answer));
      this.setState({
        paneldata: paneldata
      },()=>{
        this.setHightLightEle(whyid);
      })
    }
  }
  editqa(eleid){
    const actionparam = {...this.state.actionparam};
    actionparam.editedwhyid = eleid
    this.setState({
      actionparam:actionparam
    })
  }
  editrootcause(eleid){
    const actionparam = {...this.state.actionparam};
    actionparam.editedrootcauseid = eleid
    this.setState({
      actionparam:actionparam
    })
  }
  addrootcause(whyid){
    const paneldata = {...this.state.paneldata};
    const why = this.findele(whyid, paneldata);
    console.log(why);
    why.subeles.push(this.genEmptyRootCause(whyid));
    this.setState({
      paneldata: paneldata
    },()=>{
      this.setHightLightEle(whyid);
    })
  } 
  addsubap(eleid){
    const paneldata = {...this.state.paneldata};
    const ele = this.findleafele(eleid, paneldata);
    console.log(ele);
    ele.subeles.push(this.genEmptyAp(ele.eleid));
    this.setState({
      paneldata: paneldata
    },()=>{
      this.setHightLightEle(eleid);
    })
  }
  delele(whyid){
    const paneldata = {...this.state.paneldata};
    const why = this.findele(whyid, paneldata);
    const pwhy = this.findpele(whyid, paneldata);
    pwhy.subeles.splice(pwhy.subeles.indexOf(why),1);
    this.setState({
      paneldata: paneldata
    })
  }
  ZommIn(){
    const css = {...this.state.css};
    if(css.multiple < 1.4){
      css.multiple = css.multiple + 0.1;
    }
    this.setState({
      css:css,
    })
  }
  ZommOut(){
    const css = {...this.state.css};
    if(css.multiple > 0.1){
      css.multiple = css.multiple - 0.1;
    }
    this.setState({
      css:css,
    })
  }
  genEmptyAp(peleid){
    return {
      "eletype":"ap",
      "eleid":"ap"+this.getRandomNum(), 
      "ele1":"ele1",
      "ele2":"ele2",
      "ele3":"ele3",
      "ele4":"ele4",
      "ele5":"ele5",
      "ele6":"ele6",
      "pid":peleid,
      "subeles":[
        
      ]
    }
  }
  genEmptyRootCause(pwhyid){
    return {
      "eletype":"rootcause",
      "eleid":"rtid"+this.getRandomNum(), 
      "rootcause":"root cause",
      "pid":pwhyid,
      "subeles":[
      ]
    }
  }
  genEmptyWhy(pwhyid, qustion, answer){
    return {
      "eletype":"why",
      "eleid":"whyid"+this.getRandomNum(), 
      "question":qustion ? qustion : this.getRandomNum(),
      "answer":answer ? answer : this.getRandomNum() ,
      "pid":pwhyid,
      "subeles":[
      ]}
  }
  genEmptyScenario(){
    return {
      "scenarioid":"scenarioid"+this.getRandomNum(),
      "scenariomc":"where was the fault introduced?",
      "scenariodescription":"where was the fault introduced?",
      "rootwhy":
      {
      "eletype":"why",
      "eleid":"whyid"+this.getRandomNum(), 
      "question":this.getRandomNum(),
      "answer":this.getRandomNum(),
      "pid":"",
      "subeles":[]
      },
      "comments":[]}
  }
  addscenario(){
    const paneldata = {...this.state.paneldata};
    paneldata.scenarios.push(this.genEmptyScenario());
    this.setState({
      paneldata: paneldata
    })
  }
  toggleStyle(){
    const actionparam = {...this.state.actionparam};
    actionparam.styletype = actionparam.styletype == 'group' ? 'continuity' : 'group';
    this.setState({
      actionparam: actionparam
    })
  }
  alertScenariojson(){
  }
  showcomment(eleid) {
    const paneldatanew = {...this.state.paneldata};
    let actionparam = {...this.state.actionparam}; 
    actionparam.commentpid = eleid; 
    this.setState({
      actionparam: actionparam,
      paneldatanew: paneldatanew
    })
  }
  findcomments(eleid){
    if(!eleid){
      return []
    }
    let scenario = this.findscenario(eleid, this.state.paneldata);
    let comments = scenario.comments;
    let elecomment = [];
    for(let i=0;i<comments.length;i++){
        if(comments[i].pid == eleid){
          elecomment.push(comments[i])
        }
    }
    return elecomment;
  }
  setHightLightEle(eleid){
    const actionparam = {...this.state.actionparam};
    actionparam.hightlighteleid = eleid;
    const relationeletree = this.getRelationEleTree(eleid);
    actionparam.relationeletree = relationeletree;
    this.setState({
      actionparam:actionparam,
    })
  }
  getRelationEleTree(eleid){
    const paneldata = this.state.paneldata;
    let relationeletree = [];
    let currentele = this.findele(eleid, paneldata);
    let ele = {...currentele};
    relationeletree.push(this.findele(eleid, paneldata));
    //find parent
    while(ele && ele.pid) {
      ele = this.findele(ele.pid, paneldata);
      relationeletree.push(ele);
    }
    //find sub
    let subeles = this.findsubeles(eleid, paneldata, []);
    relationeletree = relationeletree.concat(subeles);
    return relationeletree;
  }
  
  getRandomNum(){
    return parseInt(Math.random() * 999999999999)
  } 
}

export default Panel
