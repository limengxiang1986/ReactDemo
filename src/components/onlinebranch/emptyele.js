import { PureComponent } from "react"; 


class Empty extends PureComponent{
  render(){
    const isempty = this.props.isempty;
    return (
        <>
            {this.renderContent(isempty)}
        </>
    )
  }
  renderContent = (isempty) =>{
    if(isempty=="true"){
        return <div className="emptywhy"></div>
    }else {
        return '';
    }
  }
}

export default Empty
