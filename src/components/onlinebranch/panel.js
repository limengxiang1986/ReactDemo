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
        marginbottom:5
      },
      paneldata : {
        "scenarios":[{
          "scenarioid":"scenarioidasdfl01",
          "why":
          {
          "eletype":"why",
          "whyid":"whyid0001", 
          "question":"123",
          "answer":"1",
          "pid":"",
          "subeles":[
            {
              "eletype":"why",
              "whyid":"whyid0002", 
              "question":"123",
              "answer":"2" ,
              "pid":"whyid0001",
              "subeles":[
                {
                  "eletype":"why",
                  "whyid":"whyid0003", 
                  "question":"123",
                  "answer":"3" ,
                  "pid":"whyid0002",
                  "subeles":[
                    
                  ]
                },
                {
                  "eletype":"why",
                  "whyid":"whyid0004", 
                  "question":"123",
                  "answer":"4" ,
                  "pid":"whyid0002",
                  "subeles":[
                    {
                      "eletype":"why",
                      "whyid":"whyid0007", 
                      "question":"123",
                      "answer":"7" ,
                      "pid":"whyid0004",
                      "subeles":[
                        
                      ]
                    },
                    {
                      "eletype":"rootcause",
                      "rtid":"rtid00001", 
                      "rootcause":"root cause",
                      "pid":"whyid0004",
                      "subeles":[
                        
                      ]
                    },
                  ]
                },
              ]
            },
            {
              "eletype":"why",
              "whyid":"whyid0005", 
              "question":"123",
              "answer":"5" ,
              "pid":"whyid0001",
              "subeles":[
                {
                  "eletype":"why",
                  "whyid":"whyid0006", 
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
                  addrootescapsecause={(e,whyid)=>this.addrootescapsecause(whyid)}
                  delwhy={(e,whyid)=>this.delwhy(whyid)}
                  editqa={(e,whyid)=>this.editqa(whyid)}
                  addscenario={(e,whyid)=>this.addscenario(whyid)}
            />
          })
        }
        <button className="addscenario" onClick={e=>{
          this.addscenario()
         }}>add a scenario</button>
      </div>
    )
  }
  findwhy(whyid,paneldata){
    let w = ''
    for(let i=0;i<paneldata.scenarios.length;i++){
      w = this.findwhyunderwhy(whyid, paneldata.scenarios[i].why);
      if(w) {
        return w;
      }
    }
    return w;
  }
  findpwhy(whyid, paneldata){ 
    let w = this.findwhy(whyid, paneldata);
    let pw = '';
    for(let i=0;i<paneldata.scenarios.length;i++){
      pw = this.findwhyunderwhy(w.pid, paneldata.scenarios[i].why);
      if(pw) {
        return pw;
      }
    }
    return pw;
  }
  findwhyunderwhy(whyid, why){
    if(whyid == why.whyid){
      return why;
    }
    for(let i=0;i<why.subeles.length;i++){
      let w = this.findwhyunderwhy(whyid, why.subeles[i]);
      if(w){
        return w;
      }
    }
    return ''
  }
  addsubwhy(whyid){
    const paneldata = {...this.state.paneldata};
    const why = this.findwhy(whyid, paneldata);
    console.log(why);
    why.subeles.push(this.genEmptyWhy(whyid));
    this.setState({
      paneldata: paneldata
    })
  }
  genEmptyWhy(pwhyid){
    return {"whyid":"whyid"+this.getRandomNum(), 
    "question":this.getRandomNum(),
    "answer":this.getRandomNum() ,
    "pid":pwhyid,
    "subeles":[
    ]}
  }
  addrootescapsecause(whyid){

  }
  delwhy(whyid){
    const paneldata = {...this.state.paneldata};
    const why = this.findwhy(whyid, paneldata);
    const pwhy = this.findpwhy(whyid, paneldata);
    pwhy.subeles.splice(pwhy.subeles.indexOf(why),1);
    this.setState({
      paneldata: paneldata
    })
  }
  editqa(whyid){

  }
  genEmptyScenario(){
    return {
      "scenarioid":"scenarioid"+this.getRandomNum(),
      "why":
      {
      "whyid":"whyid"+this.getRandomNum(), 
      "question":"123",
      "answer":"1",
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
