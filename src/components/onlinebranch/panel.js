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
                  editqa={(e,whyid)=>this.editqa(whyid)}
                  addscenario={(e,whyid)=>this.addscenario(whyid)}
                  addsubap={(e,eleid)=>this.addsubap(eleid)}
            />
          })
        }
        <button className="addscenario" onClick={e=>{
          this.addscenario()
         }}>add a scenario</button>
      </div>
    )
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
  editqa(whyid){

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
