import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Line from './line';

class Panel extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      showqaedit:true,
      editedwhyid : '',
      paneldata : [
        {
        "lineid":"lineid0001",
        "why5":[
        {
        "whyid":"whyid"+this.getRandomNum(),
        "why":{
        "question":"123",
        "answer":"xxx"
        }
        },
        {
        "whyid":"whyid"+this.getRandomNum(),
        "why":{
        "question":"123",
        "answer":"xxx"
        }
        },
        {
        "whyid":"whyid"+this.getRandomNum(),
        "why":{
        "question":"123",
        "answer":"xxx"
        }
        }
        // ,
        // {
        // "whyid":"whyid"+this.getRandomNum(),
        // "why":{
        // "question":"123",
        // "answer":"xxx"
        // }
        // }
        // ,
        // {
        // "whyid":"whyid"+this.getRandomNum(),
        // "why":{
        // "question":"123",
        // "answer":"xxx"
        // }
        // }
        ],
        "rcaedarootcause":"rc message",
        "aps":[
        {
        "ap":{
        "apid":"ap"+this.getRandomNum(),
        "ele1":"1",
        "ele2":"12",
        "ele3":"13",
        "ele4":"14",
        "ele5":"145"
        }
        }
        ],
        "aplimit":5,
        "whylimit":5
        },
        {
        "lineid":"lineid0002",
        "why5":[
        {
        "whyid":"whyid"+this.getRandomNum(),
        "why":{
        "question":"123",
        "answer":"xxx"
        }
        },
        {
        "whyid":"whyid"+this.getRandomNum(),
        "why":{
        "question":"123",
        "answer":"xxx"
        }
        },
        {
        "whyid":"whyid"+this.getRandomNum(),
        "why":{
        "question":"123",
        "answer":"xxx"
        }
        }
        // ,
        // {
        // "whyid":"whyid"+this.getRandomNum(),
        // "why":{
        // "question":"123",
        // "answer":"xxx"
        // }
        // },
        // {
        // "whyid":"whyid"+this.getRandomNum(),
        // "why":{
        // "question":"123",
        // "answer":"xxx"
        // }
        // }
        ],
        "rcaedarootcause":"rc message",
        "aps":[
        {
        "ap":{
        "apid":"ap"+this.getRandomNum(),
        "ele1":"1",
        "ele2":"12",
        "ele3":"13",
        "ele4":"14",
        "ele5":"145"
        }
        }
        ],
        "aplimit":5,
        "whylimit":5
        }
        ]
    }
  }
  render(){
    const paneldata = this.state.paneldata;
    const editedwhyid = this.state.editedwhyid;
    return (
      <div className="panel">
        {
          paneldata.map((item , index, allline)=>{
            let maxwhycols = 1
            allline.map((item, index)=>{
              if (maxwhycols < item.why5.length){
                maxwhycols = item.why5.length
              }
            })
            return <Line key={"line"+index} linedata={item} maxwhycols={maxwhycols}
                    addrightwhyfunc={(e,lineid)=>{this.addrightwhy(lineid)}}
                    addsubwhyfunc={(e,lineid)=>{this.addsubwhy(lineid)}}
                    addrootescapsecausefunc={(e,lineid)=>{this.addrootescapsecause(lineid)}}
                    addapfunc={(e,lineid)=>{this.addap(lineid)}}
                    delapfunc={(e,lineid,apid)=>{this.delap(lineid,apid)}}
                    delwhyfunc={(e,lineid,whyid)=>{this.delwhy(lineid,whyid)}}
                    editqafunc={(e,lineid,whyid)=>{this.editqa(lineid,whyid)}}
                    addlinefunc={(e)=>{this.addline()}}/>
          })
        }
        <button className="btn" onClick={e=>{
          this.addline()
         }}>add line</button>
         <button className="btn" onClick={e=>{
          this.clearline()
         }}>clear</button>
         {
           this.renderQaEditPanel(editedwhyid)
         }
         <div id="modal-root"></div>
      </div>
      
    )
  }
  renderQaEditPanel(editedwhyid){
    if(editedwhyid){
      return this.state.showqaedit && 
        <div>
          <div className="maskclass">
          </div>
          <div className="qaEditPanel">
            <div className="whyqa" >
                <div className="whyqatitleq" >
                    Question:
                </div>
                <div className="whyqacontentq" >
                    {editedwhyid}
                </div>
                <div className="whyqatitlea" >
                    Answer:
                </div>
                <div className="whyqacontente" >
                    {editedwhyid}
                </div>
            </div>  
            <div className="bottom">
              <button onClick={e=>{this.qaeditSave(this.state.showqaedit,'12345678')}} className="savetn">Save</button>
              <button onClick={e=>{this.qaeditClose(this.state.showqaedit)}} className="closebtn">Close</button>
            </div>
          </div>
        </div>
    }else {
      return ''
    }
  }
  editqa(lineid, whyid){
    this.setState({
      editedwhyid:whyid,
      showqaedit:true
    })
  }
  qaeditClose(showqaedit){
    this.setState({
      showqaedit: !showqaedit
    }) 
  }
  qaeditSave(showqaedit,content){
    const paneldatanew = [...this.state.paneldata];
    this.setState({
      showqaedit: !showqaedit,
      paneldata:paneldatanew
    }) 
  }
  addline(){
    const paneldatanew = [...this.state.paneldata];
    paneldatanew.push({'lineid':'lineid'+this.getRandomNum()+(this.state.paneldata.length+1),'why5':[{'whyid':'whyid'+this.getRandomNum(),'why':{'question':'','answer':''}}],
        'rcaedarootcause':'','aps':[],
        'aplimit':5,'whylimit':5
    })
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
          paneldatanew[i].why5.push({'why':{'question':'','answer':''},'whyid':'whyid'+this.getRandomNum()})
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
        paneldatanew1[i].aps.push({'ap':{"apid":"ap"+this.getRandomNum(),'ele1':'','ele2':'','ele3':'','ele4':'','ele5':''}});
      }
    }
    this.setState({
      paneldata:paneldatanew1
    })
  }
  addsubwhy(lineid){
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
  addrightwhy(lineid){
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
    this.setState({
      paneldata:paneldatanew1
    })
  }
  addrootescapsecause(lineid){
    if(!lineid){
      return
    }
    const paneldatanew1 = [...this.state.paneldata];
    for(let i=0;i<paneldatanew1.length;i++){
      if(paneldatanew1[i].lineid == lineid){
        if(paneldatanew1[i].whylimit <= paneldatanew1[i].why5.length){
          return ;
        }
        paneldatanew1[i].rcaedarootcause = '123';
      }
    }
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
    this.setState({
      paneldata:paneldatanew1
    })
  }
  delap(lineid,apid){
    if(!lineid){
      return
    }
    const paneldatanew1 = [...this.state.paneldata];
    for(let i=0;i<paneldatanew1.length;i++){
      if(paneldatanew1[i].lineid == lineid){ 
        for(let j=0;j<paneldatanew1[i].aps.length;j++){
          if(paneldatanew1[i].aps[j].ap.apid == apid){
            paneldatanew1[i].aps.pop(paneldatanew1[i].aps[j]);
          }
        }
      }
    }
    this.setState({
      paneldata:paneldatanew1
    })
  }
  getRandomNum(){
    return parseInt(Math.random() * 999999999999)
  } 
}

export default Panel
