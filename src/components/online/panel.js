import { PureComponent } from "react";
import Line from './line';

class Panel extends PureComponent{
  render(){
    const paneldata = this.props.paneldata
    const editedwhyid = this.props.editedwhyid
    return (
      <div className="panel">
        {
          paneldata.map((item , index,allmap)=>{
            return <Line key={"line"+index} linedata={item} addapfunc={this.props.addapfunc} 
                          addwhyfunc={this.props.addwhyfunc}
                          delwhyfunc={this.props.delwhyfunc}
                          editqafunc={this.props.editqafunc}/>
          })
        }
        {
          this.renderQaEditPanel(editedwhyid)
        }
      </div>
    )
  }
  renderQaEditPanel(editedwhyid){
    if(editedwhyid){
      return <div className="QaEditPanel">{editedwhyid}</div>
    }else {
      return ''
    }
  }
}

export default Panel
