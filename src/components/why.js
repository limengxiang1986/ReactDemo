import { PureComponent } from "react";

class Why extends PureComponent{
  render(){
    const whydata = this.props.whydata
    return (
      <div className="why">
        <div>Question:{whydata.question}</div>
        <div>Answer:{whydata.answer}</div>
      </div>
    )
  }
}

export default Why
