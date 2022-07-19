import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Why from './why';

class Scenario extends PureComponent{
  render(){
    const scenariodata = this.props.scenariodata;
    const css = this.props.css;
    const whys = scenariodata.whys;
    const scenariometrics = this.makemetrics(whys);
    const rsize = scenariometrics.rsize;
    const csize = scenariometrics.csize;
    const heightc = rsize*css.eleheight+(rsize)*css.marginbottom+"px";
    const widthc = rsize*css.elewidth+"px";
    return (
      <div className="scenario" style={{height: heightc,width:widthc}}>
        {
            scenariometrics.whys.map((item,index, allitem)=>{
                return <Why why={item} css={css}/>
            })
        }
      </div>
    )
  }
  makemetrics(whys){
    // let whysnew = [...whys];
    // let rsize = this.calwhymetrics(this.findrootwhy(whys) ,whysnew)[0];
    // let csize = this.calwhymetrics(this.findrootwhy(whys) ,whysnew)[1];
    // let whyarrzero = this.makewhyarr(whysnew)
    // let whylist = this.fillwhyrowcol(whysnew) 
    // let metrics = {rsize:rsize,csize:csize,whyarr:[]}
    // for(let i=0;i<whylist.length;i++){
    //     this.fillzeroarr(whylist[i], whyarrzero);
    // }
    // //fill empty why
    // for(let i=0;i<whyarrzero.length;i++){
    //     for(let j=0;j<whyarrzero[i].length;j++){
    //         if(whyarrzero[i][j] == 0 ){
    //             whyarrzero[i][j].why = {isblank:true}
    //             whyarrzero[i][j].value = 1
    //         }
    //     }
    // }
    // for(let i=0;i<whyarrzero.length;i++){
    //     for(let j=0;j<whyarrzero[i].length;j++){
    //         metrics.whyarr.push(whyarrzero[i][j].why)
    //     }
    // }
    let metrics = {
        "rsize":3,
        "csize":3,
        "whys":[
        {"whyid":"sdfsaf001", 
        "question":"123",
        "answer":"1",
        "pid":"",
        "rsize":3,
        "csize":1
        },
        {"whyid":"sdfsaf002", 
        "question":"123",
        "answer":"2",
        "pid":"sdfsaf001",
        "rsize":2,
        "csize":1
        },
        {"whyid":"sdfsaf003", 
        "question":"123",
        "answer":"3",
        "pid":"sdfsaf001",
        "rsize":1,
        "csize":1
        },
        {"whyid":"sdfsaf004", 
        "question":"123",
        "answer":"4",
        "pid":"sdfsaf002",
        "rsize":1,
        "csize":1
        },
        {"whyid":"sdfsaf005", 
        "question":"123",
        "answer":"5",
        "pid":"sdfsaf002",
        "rsize":1,
        "csize":1
        }
    ]}
    return metrics;
}
  fillzeroarr(why, whyarrzero){
    for(let i=0;i<whyarrzero.length;i++){
        for(let j=0;j<whyarrzero[i].length;j++){
            if(whyarrzero[i][j].value == 0){
                for(let k = 0 ;k< why.width;k++){
                    whyarrzero[i][k] = {why: why, value:1}
                }
            }
        }
    }
  }
  fillwhyrowcol(whys){
    for(let i=0;i<whys.length;i++){
        let mcs = this.calwhymetrics(whys[i],whys);
        whys[i].rsize = mcs[0];
        whys[i].csize = mcs[1];
    }
    return whys
  }
  makewhyarr(whys){
    let rwhy = this.findrootwhy(whys);
    let newarr = [];
    let csize = this.caldeep(rwhy,whys,1);
    let rsize = this.calwidth(rwhy,whys,1);
    for(let i=0; i< csize; i++){         //col is main axios
        newarr.push([])
        for(let j=0; j< rsize; j++) {
            newarr[i].push({why:'',value:0})
        }
    }
    console.log(csize , rsize);
    return newarr
  }
  calwhymetrics(why,whys){
    return [this.calwidth(why,whys,1),this.caldeep(why,whys,1)]
  }
  calwidth(why, whys, width){
    let subwhys = this.findsubwhy(why,whys);
    let widthcur = 1
    for(let i=0;i<subwhys.length;i++){
        if(this.hassubwhy(subwhys[i],whys,width)) {
            widthcur += width
        }
    } 
    return widthcur
  }
  caldeep(why,whys,deep){
    while(this.hassubwhy(why,whys)){
        deep += this.caldeep(this.hassubwhy(why,whys),whys,deep)
    }
    return deep += 1
  }
  hassubwhy(why,whys){
    for(let i=0; i<whys.length; i++){
        if(whys[i].pid = why.whyid){
            return true
        }
    }
    return false
  }
  findsubwhy(why,whys){
    let subwhys = []
    for(let i=0; i<whys.length; i++){
        if(whys[i].pid = why.whyid){
            subwhys.push(whys[i])
        }
    }
    return subwhys
  }
  findrootwhy(whys){
    for(let i=0;i<whys.length;i++){
        if(whys[i].pid == ''){
            return whys[i]
        }
    }
  }
}

export default Scenario
