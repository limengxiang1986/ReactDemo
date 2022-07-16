import { PureComponent } from "react";
import ReactDOM from 'react-dom';

class Rcaedarootcause extends PureComponent{
  render(){ 
    const rcaedarootcausedata = this.props.rcaedarootcausedata
    return (
      <div className="rcaedarootcause">
        {rcaedarootcausedata}
      </div>
    )
  }
}

export default Rcaedarootcause
