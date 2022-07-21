import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Scenario from "./scenario";

class Panel extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      css:{
        eleheight:250,
        elewidth:250,
        marginbottom:5,
        marginright:5
      },
      actionparam:{
        editedwhyid:'',
        editedrootcauseid:'',
        editedapid:'',
      },
      paneldata : {
        "scenarios":[{
          "scenarioid":"scenarioidasdfl01",
          "rootwhy":
          {
          "eletype":"why",
          "eleid":"whyid0001", 
          "question":"123",
          "answer":"1",
          "pid":"",
          "subeles":[
            {
              "eletype":"why",
              "eleid":"whyid0002", 
              "question":"123",
              "answer":"2" ,
              "pid":"whyid0001",
              "subeles":[
                {
                  "eletype":"why",
                  "eleid":"whyid0003", 
                  "question":"123",
                  "answer":"3" ,
                  "pid":"whyid0002",
                  "subeles":[
                    
                  ]
                },
                {
                  "eletype":"why",
                  "eleid":"whyid0004", 
                  "question":"123",
                  "answer":"4" ,
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
              "answer":"5" ,
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
          }
      }],
      "aplimit":5,
      "whylimit":5
      }
    }
  }
  render(){
    const paneldata = this.state.paneldata;
    return (
      <div className="panel">
        {
          paneldata.scenarios.map((item , index, allline)=>{
            return <Scenario key={"sce"+this.getRandomNum()} scenariodata={item} css={this.state.css} getRandomNum={this.getRandomNum}
                  addsubwhy={(e,whyid)=>this.addsubwhy(whyid)}
                  addrootcause={(e,whyid)=>this.addrootcause(whyid)}
                  delele={(e,eleid)=>this.delele(eleid)}
                  editqa={(e,eleid)=>this.editqa(eleid)}
                  editrootcause={(e,eleid)=>this.editrootcause(eleid)}
                  addscenario={(e,whyid)=>this.addscenario(whyid)}
                  addsubap={(e,eleid)=>this.addsubap(eleid)}
                  addcomment={(e,eleid)=>this.addcomment(eleid)}
            />
          })
        }
        {
           this.renderQaEditPanel()
        }
        {
           this.renderRootCauseEditPanel()
        }
        <button className="addscenario" onClick={e=>{
          this.addscenario()
         }}>add a scenario</button>
      </div>
    )
  }
  renderQaEditPanel(){
    let editedwhyid = this.state.actionparam.editedwhyid;
    let why = this.findele(editedwhyid, this.state.paneldata);
    let currentq = why.question;
    let currenta = why.answer;
    if(editedwhyid){
      return <div className="edpanel">
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
  addsubwhy(whyid){
    const paneldata = {...this.state.paneldata};
    const why = this.findele(whyid, paneldata);
    console.log(why);
    why.subeles.push(this.genEmptyWhy(whyid));
    this.setState({
      paneldata: paneldata
    })
  }
  editqa(eleid){
    this.setState({
      actionparam:{
        editedwhyid:eleid,
      }
    })
  }
  editrootcause(eleid){
    this.setState({
      actionparam:{
        editedrootcauseid:eleid,
      }
    })
  }
  addrootcause(whyid){
    const paneldata = {...this.state.paneldata};
    const why = this.findele(whyid, paneldata);
    console.log(why);
    why.subeles.push(this.genEmptyRootCause(whyid));
    this.setState({
      paneldata: paneldata
    })
  } 
  addsubap(eleid){
    const paneldata = {...this.state.paneldata};
    const ele = this.findleafele(eleid, paneldata);
    console.log(ele);
    ele.subeles.push(this.genEmptyAp(ele.eleid));
    this.setState({
      paneldata: paneldata
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
  genEmptyWhy(pwhyid){
    return {
      "eletype":"why",
      "eleid":"whyid"+this.getRandomNum(), 
      "question":this.getRandomNum(),
      "answer":this.getRandomNum() ,
      "pid":pwhyid,
      "subeles":[
      ]}
  }
  genEmptyScenario(){
    return {
      "scenarioid":"scenarioid"+this.getRandomNum(),
      "rootwhy":
      {
      "eletype":"why",
      "eleid":"whyid"+this.getRandomNum(), 
      "question":this.getRandomNum(),
      "answer":this.getRandomNum(),
      "pid":"",
      "subeles":[]
      }}
  }
  addscenario(){
    const paneldata = {...this.state.paneldata};
    paneldata.scenarios.push(this.genEmptyScenario());
    this.setState({
      paneldata: paneldata
    })
  }
  getRandomNum(){
    return parseInt(Math.random() * 999999999999)
  } 
}

export default Panel
