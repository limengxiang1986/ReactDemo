import { PureComponent } from "react";
import Why from './why'

class Why5 extends PureComponent{
  render(){
    const why5data = this.props.why5data
    const linedata = this.props.linedata
    const maxwhycols = this.props.maxwhycols
    const why5emptydata = this.genEmptydata(why5data, Math.min(maxwhycols, linedata.whylimit))
    return (
      <div className="why5">
        {
          why5data.map((item,index)=>{
            return <Why key={"why"+index} whydata={item} linedata={linedata} 
                    addrightwhyfunc={this.props.addrightwhyfunc}
                    addsubwhyfunc={this.props.addsubwhyfunc}
                    addrootescapsecausefunc={this.props.addrootescapsecausefunc}
                    addlinefunc={this.props.addlinefunc}
                    delwhyfunc={this.props.delwhyfunc}
                    editqafunc={this.props.editqafunc}
                    />
          })
        }
        {
            why5emptydata.map((item,index)=>{
                return <Why whydata={''} key={Math.random()*999999}/>
            })
        }
      </div>
    )
  }
  genEmptydata(why5data, whylimit){
    let emptydata = []
    for(let i=0;i<whylimit-why5data.length;i++){
        emptydata.push(i)
    }
    return emptydata
  }
}

export default Why5
