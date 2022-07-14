import { PureComponent } from "react";
import Line from './line';
import '../assets/css/panel.css';

class Panel extends PureComponent{
  render(){
    return (
      <div className="panel">
        <Line/>
        <Line/>
        <Line/>
        <Line/>
        <Line/>
      </div>
    )
  }
}

export default Panel
