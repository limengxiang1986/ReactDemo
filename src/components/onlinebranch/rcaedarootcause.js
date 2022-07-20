import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Rcaedarootcause extends PureComponent{
  render(){ 
    const rootcause = this.props.rootcause 
    return (
      <div className="rcaedarootcause"> 
        <div className="content">
          {rootcause.rootcause}
        </div>
        <div className="rcaedarootcauseactionpanel">
            <AmazonOutlined  className="rcaedarootacbtn"/> {/**onClick={(e)=>{this.props.addsubwhy(e,rootcause.eleid)}} */}
        </div>
      </div>
    )
  }
}

export default Rcaedarootcause
