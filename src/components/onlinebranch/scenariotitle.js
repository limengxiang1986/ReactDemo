import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined,MinusCircleOutlined,CommentOutlined,EditOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Scenariotitle extends PureComponent{
  render(){ 
    const scenariotitle = this.props.scenariotitle;
    const css = this.props.css;
    return (
      <div className="scenariotitle" style={{height: css.eleheight*scenariotitle.rsize+(scenariotitle.rsize-1)*css.marginbottom+"px"}}>
        <div className="content">
          <div className="title">
            Scenario
          </div>
          <div style={{fontSize:"21px"}}>
            {scenariotitle.scenariodescription}
          </div>
        </div>
      </div>
    )
  }
}

export default Scenariotitle
