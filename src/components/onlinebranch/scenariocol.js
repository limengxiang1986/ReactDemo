import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined,MinusCircleOutlined,CommentOutlined,EditOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class ScenarioCol extends PureComponent{
  render(){ 
    const scenariocol = this.props.scenariocol;
    const css = this.props.css;
    return (
      <div className="scenariocol" style={{height: css.multiple*(css.eleheight*scenariocol.rsize+(scenariocol.rsize-1)*css.marginbottom)+"px"}}>
        <div className="content">
          <div style={{fontSize:"21px"}}>
            {scenariocol.scenariodescription}
          </div>
        </div>
      </div>
    )
  }
}

export default ScenarioCol
