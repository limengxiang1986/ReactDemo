import { InfoCircleTwoTone } from "@ant-design/icons";
import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Why from './why';

class Scenario extends PureComponent{
  render(){
    const scenariodata = this.props.scenariodata;
    const css = this.props.css;
    const scenariometrics = scenariodata.why;
    //1. tree to treearr
    const whytreearr = this.transtreetoarr(scenariometrics);
    //2. fill treearr position
    this.filltreearrposition(whytreearr);
    //3. make why metrics
    const whymetrics = this.makewhymetrics(whytreearr);
    //4. make whycssarr
    const whycssarr = this.makewhycssarr(whymetrics);

    const rsize = whytreearr[0].rsize;
    const csize = whytreearr[0].csize;
    const heightc = rsize*css.eleheight + (rsize)*css.marginbottom+"px";
    const widthc = csize*css.elewidth+"px";
    return (
      <div className="scenario" style={{height: heightc,width:widthc}}>
        {
            whycssarr.map((item,index, allitem)=>{
                return <Why key={item.whyid} why={item} css={css}
                        addsubwhy={this.props.addsubwhy}
                        addrootescapsecause={this.props.addrootescapsecause}
                        delwhy={this.props.delwhy}
                        editqa={this.props.editqa}
                        addscenario={this.props.addscenario}
                       />
            })
        }
      </div>
    )
  }
  makewhycssarr(whymetrics){
    let whycssarr = [];
    //scan from col to row
    let csize = whymetrics[0].length;
    for(let i=0;i<csize;i++){
        for(let j=0;j<whymetrics.length;j++){
            if(whycssarr.indexOf(whymetrics[j][i].why) == -1){
                whycssarr.push(whymetrics[j][i].why);
            }
        }
    }
    return whycssarr;
  }
  makewhymetrics(whytreearr){
    let rootwhy = whytreearr[0];
    let rsize = rootwhy.rsize;
    let csize = rootwhy.csize;
    let emptymetrics = []
    //init emptymetrics with 0
    for(let i=0;i<rsize;i++){
        emptymetrics.push([])
        for(let j=0;j<csize;j++){
            emptymetrics[i].push({why:null,value:0})
        }
    }
    let whytreearr2 = [...whytreearr];
    // fill empty metrics with whynode
    for(let i=0;i<emptymetrics.length;i++){
        for(let j=0;j<emptymetrics[i].length;j++){
            if(emptymetrics[i][j].value == 0 ){
                let w = whytreearr2[0];
                let wrsize = w.rsize;
                for(let m=0;m<wrsize;m++){
                    emptymetrics[i+m][j].value = 1;    
                    emptymetrics[i+m][j].why = w;
                }
                whytreearr2 = whytreearr2.slice(1);
                if(w.isleafnode==true){ 
                    break;
                } 
            }
        }
    }
    // fill metrics with blankwhy when why is null
    for(let i=0;i<emptymetrics.length;i++){
        for(let j=0;j<emptymetrics[i].length;j++){
            if(emptymetrics[i][j].value == 0 && emptymetrics[i][j].why == null){
                emptymetrics[i][j] = {why:{isblank:true,whyid:this.props.getRandomNum()},value:1}
            }
            // set blank colsize if it's a leafnode, for cssarr use
            if(emptymetrics[i][j].why.isleafnode == true){
                let csize = emptymetrics[0].length;
                emptymetrics[i][j].why.nextblankcol = csize - j - 1;
            }
        }
    }
    return emptymetrics
  }
  transtreetoarr(rootwhy){
    let rootwhy1 = {...rootwhy};
    let whyarr = []
    this.looptree(rootwhy1, whyarr)
    return whyarr;
  }
  looptree(why, whyarr){
    let why1 = {...why};
    whyarr.push(why1)
    for(let i=0;i<why1.subeles.length;i++){
        this.looptree(why1.subeles[i], whyarr)
    }
  }
  filltreearrposition(whytreearr){
    for(let i=0;i<whytreearr.length;i++){
        this.fillwhynodeposition(whytreearr[i],this.transtreetoarr(whytreearr[i]))
    }
    for(let i=0;i<whytreearr.length;i++){
        if(whytreearr[i].subeles.length==0){
            whytreearr[i].isleafnode = true
        }
    }
  }
  fillwhynodeposition(whynode, whytreearr){
    let mcs = this.calmetrics(whynode, whytreearr);
    whynode.rsize = mcs.rsize;
    whynode.csize = mcs.csize;
  }
  calmetrics(whynode, whytreearr){
    let leafnodearr = []
    this.findleafnode(whynode, whytreearr,leafnodearr);
    // console.log(leafnodearr);
    //cal rsize
    let rsize = leafnodearr.length 
    //cal csize
    let maxcsize = 0
    for(let i=0;i<leafnodearr.length;i++){
        let csize = this.calcsize(leafnodearr[i],whytreearr);
        if(csize > maxcsize){
            maxcsize = csize;
        }
    }
    return {rsize:rsize, csize:maxcsize}
  } 
  calcsize(node, whytreearr){
    if(this.hasparent(node,whytreearr)){
        return 1+this.calcsize(this.getparent(node, whytreearr),whytreearr)
    }
    return 1;
  }
  hasparent(node, whytreearr){
    for(let i=0;i<whytreearr.length;i++){
        if(node.pid == whytreearr[i].whyid){
            return true
        }
    }
    return false
  }
  getparent(node, whytreearr){
    for(let i=0;i<whytreearr.length;i++){
        if(node.pid == whytreearr[i].whyid){
            return whytreearr[i]
        }
    }
    return null
  }
  findleafnode(whynode, whytree, leafnodearr){
    if(whynode.subeles.length == 0 ){
        leafnodearr.push(whynode)
    }else {
        for (let i=0;i<whynode.subeles.length;i++){
            this.findleafnode(whynode.subeles[i],whytree, leafnodearr)
        }
    }
  }
}

export default Scenario
