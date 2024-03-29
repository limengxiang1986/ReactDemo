import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import {AmazonOutlined,MinusCircleOutlined,CommentOutlined,EditOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";
import './css/scenariothead.scss'

class ScenarioThead extends PureComponent{
  render(){ 
    const scenariothead = this.props.scenariothead;
    const css = this.props.css;
    return (
      <div className="scenariothead" style={{height: css.multiple*css.theadheight+"px",
                                             width: css.multiple*(css.elewidth)+"px",
                                             padding:scenariothead.padding, 
                                             backgroundColor:scenariothead.backgroundcolor,
                                             color:scenariothead.color
                                            }}>
        <div className="content">
          <div style={{fontSize:"21px"}}>
            {scenariothead.theadcontent}
          </div>
        </div>
      </div>
    )
  }
}

export default ScenarioThead
