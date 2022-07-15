import { PureComponent } from "react";
import Line from './line';

class Panel extends PureComponent{
  render(){
    const paneldata = this.props.paneldata
    return (
      <div className="panel">
        {
          paneldata.map((item , index)=>{
            return <Line why5data={paneldata.why5} rcaedaapdata={paneldata.rcaedaap}/>
          })
        }
      </div>
    )
  }
}

export default Panel
