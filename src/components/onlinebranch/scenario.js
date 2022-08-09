import { InfoCircleTwoTone } from "@ant-design/icons";
import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Rootcause from './rootcause';
import ScenarioCol from './scenariocol';
import ScenarioThead from './scenariothead';
import Why from './why';
import Empty from "./emptyele";
import Ap from "./ap";
import './css/scenario.scss'


class Scenario extends PureComponent{
  render(){
    const actionparam = this.props.actionparam;
    const scenariodata = this.props.scenariodata;
    const scenariomc = this.props.scenariodata.scenariomc;
    const scenariodescription = this.props.scenariodata.scenariodescription;
    const css = this.props.css;
    const scenariometrics = scenariodata.rootwhy;
    const comments = scenariodata.comments; 
    //1. tree to treearr
    const whytreearr = this.transtreetoarr(scenariometrics);
    //2. fill treearr position
    this.filltreearrposition(whytreearr);
    //3. make why metrics
    let whymetrics = this.makewhymetrics(whytreearr); // style1: rootcause direct follow why, style2: fill rootcause and why with empty node if why index less than max why index. 
    if(actionparam.styletype == 'group'){
      whymetrics = this.makewhymetricsgroup(whymetrics);
    }else if(actionparam.styletype == 'continuity'){

    }
    //4. fill metrics with title and scenario 
    whymetrics = this.fillwhymetricswiththeadandscenariocol(whymetrics,scenariomc,scenariodescription);
    //5. make whycssarr
    const whycssarr = this.makewhycssarr(whymetrics);

    const rsize = whymetrics.length;
    const csize = whymetrics[0].length;
    const heightc = css.multiple*((rsize-1)*css.eleheight + css.theadheight)+ (rsize)*css.marginbottom+"px";   //thead height(50px) + tbody height(250*rsize)
    const widthc = css.multiple*(csize*css.elewidth)+csize*css.marginright+"px";
    const relationeletree = actionparam.relationeletree;
    return (
      <div className="scenario" style={{height: heightc,width:widthc}}>
        {
            whycssarr.map((item, index, allitem)=>{
                let hightrelationeleflag = false ;
                for(let i=0;i<relationeletree.length;i++){
                  if(relationeletree[i].eleid == item.eleid){
                    hightrelationeleflag = true;
                    break;
                  }
                }
                if(item.eletype == 'why'){
                    return <Why key={item.eleid+index} why={item} comments={comments} css={css} actionparam={actionparam}
                            hightrelationeleflag={hightrelationeleflag}
                            addsubwhy={this.props.addsubwhy}
                            addrootcause={this.props.addrootcause}
                            delele={this.props.delele}
                            editqa={this.props.editqa}
                            addscenario={this.props.addscenario}
                            showcomment={this.props.showcomment}
                            findcomments={this.props.findcomments}
                            setHightLightEle={this.props.setHightLightEle}
                            shownewwhypanel={this.props.shownewwhypanel}
                           />
                }else if(item.eletype == 'rootcause'){
                    return <Rootcause key={item.eleid+index} rootcause={item} comments={comments} css={css} 
                            hightrelationeleflag={hightrelationeleflag}
                            addsubap={this.props.addsubap}
                            editrootcause={this.props.editrootcause}
                            delele={this.props.delele}
                            findcomments={this.props.findcomments}
                            showcomment={this.props.showcomment}
                            setHightLightEle={this.props.setHightLightEle}
                           />
                }else if(item.eletype == 'ap'){
                    return <Ap key={item.eleid+index} ap={item} comments={comments} css={css}
                            hightrelationeleflag={hightrelationeleflag}
                            addsubap={this.props.addsubap}
                            delele={this.props.delele}
                            findcomments={this.props.findcomments}
                            showcomment={this.props.showcomment}
                            setHightLightEle={this.props.setHightLightEle}
                           />
                }else if(item.eletype == 'scenariocol'){
                    return <ScenarioCol key={item.eleid+index} scenariocol={item} css={css}
                           />
                }else if(item.eletype == 'scenariothead'){
                  return <ScenarioThead key={item.eleid+index} scenariothead={item} css={css}
                         />
                }else if(item.eletype == 'empty'){
                    return <Empty key={item.eleid+index} isempty="true" css={css} />
                }
            })
        }
      </div>
    )
  }
  makewhycssarr(whymetrics){
    let whycssarr = [];
    //scan from col to row
    let csize = whymetrics[0].length;
    whycssarr.push(whymetrics[0][0].ele);
    for(let i=0;i<csize;i++){
        for(let j=0;j<whymetrics.length;j++){
          let existsflag = false
          for(let k=0;k<whycssarr.length;k++){
            if(whycssarr[k].eleid == whymetrics[j][i].ele.eleid){
              existsflag = true
            }
          }
          if(!existsflag){
            whycssarr.push(whymetrics[j][i].ele);
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
            emptymetrics[i].push({ele:null,value:0})
        }
    }
    let whytreearr2 = [...whytreearr];
    // fill empty metrics with whynode
    for(let i=0;i<emptymetrics.length;i++){
        for(let j=0;j<emptymetrics[i].length;j++){
            if(emptymetrics[i][j].value == 0 ){
                let w = whytreearr2[0]; //get first ele, later will remove
                let wrsize = w.rsize;
                for(let m=0;m<wrsize;m++){
                    emptymetrics[i+m][j].value = 1;    
                    emptymetrics[i+m][j].ele = w;
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
            if(emptymetrics[i][j].value === 0 && emptymetrics[i][j].ele === null){
                emptymetrics[i][j] = this.newEmpty()
            }
            // set blank colsize if it's a leafnode, for cssarr use
            if(emptymetrics[i][j].ele.isleafnode == true){
                let csize = emptymetrics[0].length;
                emptymetrics[i][j].ele.nextblankcol = csize - j - 1;
            }
        }
    }
    return emptymetrics
  }
  newEmpty() {
    return { ele: { eletype: "empty", isblank: true, eleid: this.props.getRandomNum() }, value: 1 };
  }
  makewhymetricsgroup(whymetrics){
    let maxwhycol = 0;
    let maxrootapsize = 0;
    let maxgroupcolsize = 0;   //the maxwhysize + maxrootapsize is maxgroupcolsize
    // find maxwhycol
    for(let i=0;i<whymetrics.length;i++){
      let groupcolsize = 0
      for(let j=0;j<whymetrics[i].length;j++){
        if(whymetrics[i][j].ele.eletype == 'why' ){
          maxwhycol = j > maxwhycol ? j : maxwhycol;
        }
        if(['rootcause','ap'].indexOf(whymetrics[i][j].ele.eletype)>-1){
          groupcolsize += 1
          if(groupcolsize > maxrootapsize){
            maxrootapsize = groupcolsize;
          }
        }
      }
    }
    // expand metrics if maxgroupcolsize large than whymetrics's col size each row
    maxgroupcolsize = maxwhycol+1+maxrootapsize;
    const currentCols = whymetrics[0].length;
    if(maxgroupcolsize > currentCols){
      for(let i=0;i<whymetrics.length;i++){
        for(let j=0;j<maxgroupcolsize-currentCols;j++){
          whymetrics[i].push(this.newEmpty());
        }
      }
    }
    // find rootcause which index larger than or equal to maxwhycol, fill with empty
    for(let i=0;i<whymetrics.length;i++){ 
      for(let j=0;j<whymetrics[i].length;j++){
        if(whymetrics[i][j].ele.eletype == 'rootcause' && j <= maxwhycol ){
          // copy rootcause+aps to maxwhcol's next node 
          whymetrics[i].copyWithin(maxwhycol+1,j)
          // fill node which between rootcause and lastwhycol of this row with empty
          for(let k=j;k<=maxwhycol;k++){
            whymetrics[i][k] = this.newEmpty()
          }
        }
      }
    }
    return whymetrics;
  }
  fillwhymetricswiththeadandscenariocol(whymetrics,scenariomc,scenariodescription){
      let rsize = whymetrics.length;
      let csize = whymetrics[0].length;
      let maxwhycol = 0
      for(let i=0;i<whymetrics.length;i++){
        for(let j=0;j<whymetrics[i].length;j++){
          if(whymetrics[i][j].ele.eletype == 'why' ){
            maxwhycol = j > maxwhycol ? j : maxwhycol;
          }
        } 
      }
      let newwhymetrics = whymetrics.slice();
      // 1. fill with scenario col
      //append a new row, append a new col for each row
      for(let i=0;i<newwhymetrics.length;i++){
        newwhymetrics[i].unshift("");
      }
      // fillwithscenario
      for(let i=0;i<newwhymetrics.length;i++){
        newwhymetrics[i][0] = {
          "ele":{
            "eletype":"scenariocol",
            "eleid":"scenariocol",
            "scenariomc":scenariomc,
            "scenariodescription":scenariodescription,
            "rsize":newwhymetrics.length,
            "csize":newwhymetrics[0].length
          },
          "value":1
        };
      }
      // 2. fill with thead
      newwhymetrics.unshift(newwhymetrics[0].slice());   //add thead
      // set thead
      for(let i=0;i<newwhymetrics[0].length;i++){
        if(i==0) {
          newwhymetrics[0][i] = {
            "ele": {
              "eletype":"scenariothead",
              "eleid":"scenariothead"+i,
              "theadcontent":"Scenario",
              "padding": "0px 0px 0px 60px",
              "rsize": 1,
              "csize": 1
            },
            "value": 1
          }
        } else if(i>0 && i <= maxwhycol+1) {   // why, scenario + whyscols = 1 + maxwhycols
          newwhymetrics[0][i] = {
            "ele":{
              "eletype":"scenariothead",
              "eleid":"scenariothead"+i,
              "theadcontent":"Why"+(i),
              "backgroundcolor":"",
              "padding": "0px 0px 0px 70px",
              "rsize": 1,
              "csize": 1
            },
            "value":1
          }
        } else if(i == maxwhycol+2) {  //rootcause col index
          newwhymetrics[0][i] = {
            "ele":{
              "eletype":"scenariothead",
              "eleid":"rootcause"+i,
              "theadcontent":"Root Cause",
              "backgroundcolor":"#FFCC00",
              "padding": "0px 0px 0px 50px",
              "color":"#545557",
              "rsize": 1,
              "csize": 1
            },
            "value":1
          }
        } else if(i > maxwhycol+2) {  //ap col index
          newwhymetrics[0][i] = {
            "ele":{
              "eletype":"scenariothead",
              "eleid":"ap"+i,
              "theadcontent":"Action Proposal",
              "backgroundcolor":"#3DAA00",
              "padding": "0px 0px 0px 30px",
              "rsize": 1,
              "csize": 1
            },
            "value":1
          }
        }
      }
      return newwhymetrics;
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
        if(node.pid == whytreearr[i].eleid){
            return true
        }
    }
    return false
  }
  getparent(node, whytreearr){
    for(let i=0;i<whytreearr.length;i++){
        if(node.pid == whytreearr[i].eleid){
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
  relationwithele(hightlighteleid, ele){
    if (ele.eleid == hightlighteleid || ele.pid == hightlighteleid ){
        return true
    }
    if(ele.pid){
        
    }
    if(ele.subeles){
        for(let i=0;i<ele.subeles.length;i++){
            if(ele.subeles[i].eleid == hightlighteleid){
                return true
            }
            if(ele.subeles[i].subeles){
                for(let j=0;j<ele.subeles[i].subeles.length;j++){
                    if(ele.subeles[i].subeles[j].eleid == hightlighteleid){
                        return true
                    }
                    if(ele.subeles[i].subeles[j].subeles){
                        for(let k=0;k<ele.subeles[i].subeles[j].length;k++){
                            if(ele.subeles[i].subeles[j].subeles[k].eleid == hightlighteleid){
                                return true
                            }
                            if(ele.subeles[i].subeles[j].subeles[k].subeles){
                                for(let m=0;m<ele.subeles[i].subeles[j].subeles[k].length;m++){
                                    if(ele.subeles[i].subeles[j].subeles[k].subeles[m].eleid == hightlighteleid){
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
  }
}

export default Scenario
