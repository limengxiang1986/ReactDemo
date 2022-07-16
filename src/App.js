import { PureComponent } from "react";
import Footer from "./components/app-footer";
import Body from "./components/body";
import Headers from "./components/app-header";
import {Route} from 'react-router-dom';
import routes from './router';
import { HashRouter } from "react-router-dom";
import {renderRoutes} from 'react-router-config';
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Panel from './components/online/panel';
import './assets/css/style.css';



class App extends PureComponent{
  constructor(prop){
    super(prop);
    this.state = {
        editedwhyid : '',
        paneldata : [{'lineid':'lineid0001','why5':[{'whyid':'whyid1','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid2','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid3','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid4','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid5','why':{'question':'123','answer':'xxx'}}],
                             'rcaedarootcause':'rc message','aps':[{'ap':{'ele1':'1','ele2':'12','ele3':'13','ele4':'14','ele5':'145'}}],
                             'aplimit':5,'whylimit':5
                    },{'lineid':'lineid0002','why5':[{'whyid':'whyid1','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid2','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid3','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid4','why':{'question':'123','answer':'xxx'}},{'whyid':'whyid5','why':{'question':'123','answer':'xxx'}}],
                             'rcaedarootcause':'rc message','aps':[{'ap':{'ele1':'1','ele2':'12','ele3':'13','ele4':'14','ele5':'145'}}],
                             'aplimit':5,'whylimit':5
                   }
        ]
    }
  }
  render(){
    const paneldata = this.state.paneldata;
    const editedwhyid = this.state.editedwhyid;
    const visible = false;
    return (
      <BrowserRouter>
         <Panel className="" paneldata={paneldata} editedwhyid={editedwhyid}
                addapfunc={(e,lineid)=>{this.addap(lineid)}} 
                addwhyfunc={(e,lineid)=>{this.addwhy(lineid)}}
                delwhyfunc={(e,lineid,whyid)=>{this.delwhy(lineid,whyid)}}
                editqafunc={(e,lineid,whyid)=>{this.editqa(lineid,whyid)}}/> 
         <button className="btn" onClick={e=>{
          this.addline()
         }}>add line</button>
         <button className="btn" onClick={e=>{
          this.clearline()
         }}>clear</button>
      </BrowserRouter>
    )
  }
  addline(){
    // this.setState({
    //   paneldata:[]
    // })
    const paneldatanew = [...this.state.paneldata];
    // paneldatanew.push({'lineid':'lineid000'+(this.state.paneldata.length+1),'why5':[{'why':{'question':'123','answer':'xxx'}},{'why':{'question':'123','answer':'xxx'}},{'why':{'question':'123','answer':'xxx'}},{'why':{'question':'123','answer':'xxx'}},{'why':{'question':'123','answer':'xxx'}}],
    //     'rcaedarootcause':'rc message','aps':[{'ap':{'ele1':'1','ele2':'12','ele3':'13','ele4':'14','ele5':'145'}}],
    //     'aplimit':5,'whylimit':5
    // })
    paneldatanew.push({'lineid':'lineid'+this.getRandomNum()+(this.state.paneldata.length+1),'why5':[{'whyid':'whyid'+this.getRandomNum(),'why':{'question':'','answer':''}}],
        'rcaedarootcause':'rc message','aps':[{'ap':{'ele1':'1','ele2':'12','ele3':'13','ele4':'14','ele5':'145'}}],
        'aplimit':5,'whylimit':5
    })
    // let paneldatanew=this.smoothWhy5(paneldatanew)
    // this.setState({
    //   paneldata:paneldatanew
    // })
    this.setState({
      paneldata:paneldatanew
    })
  }
  clearline(){
    this.setState({
      paneldata:[]
    })
  }
  smoothWhy5(paneldatanew){
    for(let i=0;i<paneldatanew.length;i++){
      if(paneldatanew[i].why5.length < 5){
        for ( let j = 0;j<5-paneldatanew[i].why5.length;j++){
          paneldatanew[i].why5.push({'why':{'question':'','answer':''},'whyid':'whyid1'})
        }
      }
    }
    return paneldatanew
  }
  addap(lineid){
    if(!lineid){
      return
    }
    const paneldatanew1 = [...this.state.paneldata];
    for(let i=0;i<paneldatanew1.length;i++){
      if(paneldatanew1[i].lineid == lineid){
        if(paneldatanew1[i].aplimit <= paneldatanew1[i].aps.length){
          return ;
        }
        paneldatanew1[i].aps.push({'ap':{'ele1':'','ele2':'','ele3':'','ele4':'','ele5':''}});
      }
    }
    // this.setState({
    //   paneldata:paneldatanew1
    // })
    this.setState({
      paneldata:paneldatanew1
    })
  }
  addwhy(lineid){
    if(!lineid){
      return
    }
    const paneldatanew1 = [...this.state.paneldata];
    for(let i=0;i<paneldatanew1.length;i++){
      if(paneldatanew1[i].lineid == lineid){
        if(paneldatanew1[i].whylimit <= paneldatanew1[i].why5.length){
          return ;
        }
        paneldatanew1[i].why5.push({'why':{'question':'','answer':''},'whyid':'whyid'+this.getRandomNum()});
      }
    }
    // this.setState({
    //   paneldata:paneldatanew1
    // })
    this.setState({
      paneldata:paneldatanew1
    })
  }
  delwhy(lineid,whyid){
    if(!lineid){
      return
    }
    const paneldatanew1 = [...this.state.paneldata];
    for(let i=0;i<paneldatanew1.length;i++){
      if(paneldatanew1[i].lineid == lineid){
        if(paneldatanew1[i].why5.length == 1){
          return ;
        }
        for(let j=0;j<paneldatanew1[i].why5.length;j++){
          if(paneldatanew1[i].why5[j].whyid == whyid){
            paneldatanew1[i].why5.pop(paneldatanew1[i].why5[j]);
          }
        }
      }
    }
    // this.setState({
    //   paneldata:paneldatanew1
    // })
    this.setState({
      paneldata:paneldatanew1
    }) 
  }
  editqa(lineid, whyid){
    this.setState({
      editedwhyid:whyid
    })
  }
  getRandomNum(){
    return parseInt(Math.random() * 999999999999)
  } 
}

export default App
