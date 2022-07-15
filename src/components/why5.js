import { PureComponent } from "react";
import Why from './why'

class Why5 extends PureComponent{
  render(){
    const why5data = this.props.why5data
    return (
      <div className="why5">
        {
          why5data.map((item,index)=>{
            return <Why whydata={item.why} />
          })
        }
      </div>
    )
  }
}

export default Why5
