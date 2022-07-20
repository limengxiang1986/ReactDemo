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
                return <Why key={item.whyid} why={item} css={css}/>
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
            // if(whymetrics[j][i].why.isblank == true){
            //     continue;
            // }
            if(whycssarr.indexOf(whymetrics[j][i].why) == -1){
                whycssarr.push(whymetrics[j][i].why);
                // //if next col is blank, then insert blank
                // if(whymetrics[j][i].why.nextblankcol && whymetrics[j][i].why.nextblankcol > 0 ){
                //     for(let b = 0 ;b<whymetrics[j][i].why.nextblankcol;b++){
                //         whycssarr.push({whyid:'',isblank:true});
                //     }
                // }
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
    for(let i=0;i<why1.subwhys.length;i++){
        this.looptree(why1.subwhys[i], whyarr)
    }
  }
  filltreearrposition(whytreearr){
    for(let i=0;i<whytreearr.length;i++){
        this.fillwhynodeposition(whytreearr[i],this.transtreetoarr(whytreearr[i]))
    }
    for(let i=0;i<whytreearr.length;i++){
        if(whytreearr[i].subwhys.length==0){
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
    console.log(leafnodearr);
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
    if(whynode.subwhys.length == 0 ){
        leafnodearr.push(whynode)
        // return leafnodearr;
    }else {
        for (let i=0;i<whynode.subwhys.length;i++){
            this.findleafnode(whynode.subwhys[i],whytree, leafnodearr)
        }
    }
  }
//   makemetrics(whys){
//     let rsize = this.getRsize(whys[0],0);
//     let csize = this.getCsize(whys[0],1);
//     let whysnew = [...whys];
//     let whyarrzero = this.makewhyarr(csize,rsize)
//     whysnew = this.fillwhyrowcol(whysnew)
//     let whylist = this.makewhylist(whysnew, whyarrzero,[])
//     let metrics = {rsize:rsize,csize:csize,whyarr:[]}
//     //fill empty why
//     for(let i=0;i<whylist.length;i++){
//         for(let j=0;j<whylist[i].length;j++){
//             if(whylist[i][j].value == 0 ){
//                 whylist[i][j].why = {isblank:true}
//                 whylist[i][j].value = 1
//             }
//         }
//     }
//     for(let i=0;i<whylist.length;i++){
//         for(let j=0;j<whylist[i].length;j++){
//             metrics.whyarr.push(whylist[i][j].why)
//         }
//     }
//     return metrics
//   }
//   makewhylist(whysnew, whyarrzero,whysarr){ 
//     whysarr = this.makewhylistloop(whysnew, whysarr) //trans why tree to whyarr
//     for(let i=0;i<whysarr.length;i++){
//         this.fillwhyarrzero(whysarr[i], whyarrzero)
//     }
//     return whyarrzero
//   }
//   fillwhyarrzero(why, whyarrzero){
//     for(let i=0;i<whyarrzero.length;i++){
//         for(let j=0;j<whyarrzero[i].length;j++){
//             for(let k=0;k<why.rsize;k++){
//                 if(whyarrzero[i][j].value == 0 ){
//                     whyarrzero[i][j].value = 1
//                     if(!this.containw(whyarrzero, why)){
//                         whyarrzero[i][j].value = why
//                     }
//                 }
//             }
//         }
//     }
//   }
//   containw(whyarrzero, why){
//     let hascontain = false
//     for(let i=0;i<whyarrzero.length;i++){
//         for(let j=0;j<whyarrzero[i].length;j++){
//             if(whyarrzero[i][j].why.whyid = why.whyid){
//                 hascontain = true
//                 return hascontain
//             }
//         }
//     }
//     return hascontain
//   }
//   makewhylistloop(whysnew, whysarr){  //trans why tree to whyarr
//     for(let i=0;i<whysnew.length;i++){
//         whysarr.push(whysnew[i])
//         for(let j=0;j<whysnew.subwhys.length;j++){
//             this.makewhylistloop(whysnew.subwhys[j], whysarr)
//         }
//     }
//   }
//   getCsize(why){
//     let maxcurcsize = 0
//     for(let i=0;i<why.subwhys.length;i++){
//         let curcsize = this.getCsize(why.subwhys[i])
//         if(curcsize >= maxcurcsize){
//             maxcurcsize = curcsize
//         }
//     }
//     return maxcurcsize+1
//   }
//   getRsize(why,rsize){
//     for(let i=0;i<why.subwhys.length;i++){
//         rsize += this.getRsize(why.subwhys[i],rsize)
//     }
//     if(why.subwhys.length==0){
//         return 1
//     }
//     return rsize
//   }
// //   makemetrics(whys){
// //     let whysnew = [...whys];
// //     let rsize = this.calwhymetrics(this.findrootwhy(whys) ,whysnew)[0];
// //     let csize = this.calwhymetrics(this.findrootwhy(whys) ,whysnew)[1];
// //     let whyarrzero = this.makewhyarr(whysnew)
// //     let whylist = this.fillwhyrowcol(whysnew) 
// //     let metrics = {rsize:rsize,csize:csize,whyarr:[]}
// //     for(let i=0;i<whylist.length;i++){
// //         this.fillzeroarr(whylist[i], whyarrzero);
// //     }
// //     //fill empty why
// //     for(let i=0;i<whyarrzero.length;i++){
// //         for(let j=0;j<whyarrzero[i].length;j++){
// //             if(whyarrzero[i][j] == 0 ){
// //                 whyarrzero[i][j].why = {isblank:true}
// //                 whyarrzero[i][j].value = 1
// //             }
// //         }
// //     }
// //     for(let i=0;i<whyarrzero.length;i++){
// //         for(let j=0;j<whyarrzero[i].length;j++){
// //             metrics.whyarr.push(whyarrzero[i][j].why)
// //         }
// //     }
// //     // let metrics = {
// //     //     "rsize":3,
// //     //     "csize":3,
// //     //     "whys":[
// //     //     {"whyid":"sdfsaf001", 
// //     //     "question":"123",
// //     //     "answer":"1",
// //     //     "pid":"",
// //     //     "rsize":3,
// //     //     "csize":1
// //     //     },
// //     //     {"whyid":"sdfsaf002", 
// //     //     "question":"123",
// //     //     "answer":"2",
// //     //     "pid":"sdfsaf001",
// //     //     "rsize":2,
// //     //     "csize":1
// //     //     },
// //     //     {"whyid":"sdfsaf003", 
// //     //     "question":"123",
// //     //     "answer":"3",
// //     //     "pid":"sdfsaf001",
// //     //     "rsize":1,
// //     //     "csize":1
// //     //     },
// //     //     {"whyid":"sdfsaf004", 
// //     //     "question":"123",
// //     //     "answer":"4",
// //     //     "pid":"sdfsaf002",
// //     //     "rsize":1,
// //     //     "csize":1
// //     //     },
// //     //     {"whyid":"sdfsaf005", 
// //     //     "question":"123",
// //     //     "answer":"5",
// //     //     "pid":"sdfsaf002",
// //     //     "rsize":1,
// //     //     "csize":1
// //     //     }
// //     // ]}
// //     return metrics;
// // }
//   fillzeroarr(why, whyarrzero){
//     for(let i=0;i<whyarrzero.length;i++){
//         for(let j=0;j<whyarrzero[i].length;j++){
//             if(whyarrzero[i][j].value == 0){
//                 for(let k = 0 ;k< why.width;k++){
//                     whyarrzero[i][k] = {why: why, value:1}
//                 }
//             }
//         }
//     }
//   }
//   fillwhyrowcol(whys){
//     let rsize = this.getRsize(whys,0); 
//     whys.rsize = rsize;
//     for(let i=0;i<whys.subwhys.length;i++){
//         this.fillwhyrowcol(whys.subwhys[i])
//     }
//   }
// //   fillwhyrowcol(whys){
// //     for(let i=0;i<whys.length;i++){
// //         let mcs = this.calwhymetrics(whys[i],whys);
// //         whys[i].rsize = mcs[0];
// //         whys[i].csize = mcs[1];
// //     }
// //     return whys
// //   }
// //   fillwhyrowcol(whys){
// //     for(let i=0;i<whys.length;i++){
// //         let mcs = this.calwhymetrics(whys[i],whys);
// //         whys[i].rsize = mcs[0];
// //         whys[i].csize = mcs[1];
// //     }
// //     return whys
// //   }
//   makewhyarr(c,r){
//     let newarr = [];
//     for(let i=0; i< r; i++){         //col is main axios
//         newarr.push([])
//         for(let j=0; j< c; j++) {
//             newarr[i].push({why:'',value:0})
//         }
//     }
//     console.log(r , c);
//     return newarr
//   }
// //   makewhyarr(whys){
// //     let rwhy = this.findrootwhy(whys);
// //     let newarr = [];
// //     let csize = this.caldeep(rwhy,whys,1);
// //     let rsize = this.calwidth(rwhy,whys,1);
// //     for(let i=0; i< csize; i++){         //col is main axios
// //         newarr.push([])
// //         for(let j=0; j< rsize; j++) {
// //             newarr[i].push({why:'',value:0})
// //         }
// //     }
// //     console.log(csize , rsize);
// //     return newarr
// //   }
//   calwhymetrics(why,whys){
//     return [this.calwidth(why,whys,1),this.caldeep(why,whys,1)]
//   }
//   calwidth(why, whys, width){
//     let subwhys = this.findsubwhy(why,whys);
//     let widthcur = 1
//     for(let i=0;i<subwhys.length;i++){
//         if(this.hassubwhy(subwhys[i],whys,width)) {
//             widthcur += width
//         }
//     } 
//     return widthcur
//   }
//   caldeep(why,whys,deep){
//     while(this.hassubwhy(why,whys)){
//         deep += this.caldeep(this.hassubwhy(why,whys),whys,deep)
//     }
//     return deep += 1
//   }
//   hassubwhy(why,whys){
//     for(let i=0; i<whys.length; i++){
//         if(whys[i].pid = why.whyid){
//             return true
//         }
//     }
//     return false
//   }
//   findsubwhy(why,whys){
//     let subwhys = []
//     for(let i=0; i<whys.length; i++){
//         if(whys[i].pid = why.whyid){
//             subwhys.push(whys[i])
//         }
//     }
//     return subwhys
//   }
//   findrootwhy(whys){
//     for(let i=0;i<whys.length;i++){
//         if(whys[i].pid == ''){
//             return whys[i]
//         }
//     }
//   }
}

export default Scenario
