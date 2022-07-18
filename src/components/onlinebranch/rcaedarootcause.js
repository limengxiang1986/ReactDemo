import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Rcaedarootcause extends PureComponent{
  render(){ 
    const rcaedarootcausedata = this.props.rcaedarootcausedata
    const lineid = this.props.linedata.lineid
    return (
      <div className="rcaedarootcause"> 
        <div className="content">
          {rcaedarootcausedata}
        </div>
        <div className="rcaedarootcauseactionpanel">
            <AmazonOutlined  onClick={(e)=>{this.props.addapfunc(e,lineid)}} className="rcaedarootacbtn"/>
        </div>
      </div>
    )
  }
}

export default Rcaedarootcause
