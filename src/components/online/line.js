import { PureComponent } from "react";
import Rcaedarootcause from "./rcaedarootcause";
import Why5 from './why5';
import Aps from "./aps";

class Line extends PureComponent{
  render(){
    const why5data = this.props.linedata.why5
    const rcaedarootcause = this.props.linedata.rcaedarootcause
    const aps = this.props.linedata.aps
    return (
      <div className="line">
        <Why5 why5data={why5data} linedata={this.props.linedata} 
                addwhyfunc={this.props.addwhyfunc}
                delwhyfunc={this.props.delwhyfunc}
                editqafunc={this.props.editqafunc}/>
        <Rcaedarootcause rcaedarootcausedata={rcaedarootcause}  linedata={this.props.linedata} />
        <Aps apsdata={aps} addapfunc={this.props.addapfunc}   linedata={this.props.linedata} />
      </div>
    )
  }
}

export default Line
