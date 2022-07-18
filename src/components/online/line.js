import { PureComponent } from "react";
import Rcaedarootcause from "./rcaedarootcause";
import Why5 from './why5';
import Aps from "./aps";

class Line extends PureComponent{
  render(){
    const lineid = this.props.linedata.lineid
    const why5data = this.props.linedata.why5
    const rcaedarootcause = this.props.linedata.rcaedarootcause
    const aps = this.props.linedata.aps
    const maxwhycols = this.props.maxwhycols;
    return (
      <div className="line">
        <Why5 why5data={why5data} linedata={this.props.linedata} maxwhycols={maxwhycols}
                addrightwhyfunc={this.props.addrightwhyfunc}
                addsubwhyfunc={this.props.addsubwhyfunc}
                addrootescapsecausefunc={this.props.addrootescapsecausefunc}
                delwhyfunc={this.props.delwhyfunc}
                modifycontent={this.props.modifycontent}
                addlinefunc={this.props.addlinefunc}
                editqafunc={this.props.editqafunc}/>
        {
          this.renderCauseAp(aps,rcaedarootcause)
        }
        {/* <Aps apsdata={aps} linedata={this.props.linedata} addapfunc={this.props.addapfunc} />
        <Rcaedarootcause rcaedarootcausedata={rcaedarootcause} linedata={this.props.linedata} addapfunc={this.props.addapfunc}  /> */}
      </div>
    )
  }
  renderCauseAp(aps,rcaedarootcause){
    if(rcaedarootcause != ""){
      return (
        <>
          <Rcaedarootcause rcaedarootcausedata={rcaedarootcause} linedata={this.props.linedata} addapfunc={this.props.addapfunc}  />
          <Aps apsdata={aps} linedata={this.props.linedata} 
               addapfunc={this.props.addapfunc} 
               delapfunc={this.props.delapfunc} 
               />
        </>
      )
    }else {
      return ('')
    }
  }
}

export default Line
