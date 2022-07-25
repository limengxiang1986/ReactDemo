import { PureComponent } from "react"; 
import './css/emptywhy.scss'

class Empty extends PureComponent{
  render(){
    const isempty = this.props.isempty;
    const css = this.props.css;
    return (
        <>
            {this.renderContent(isempty,css)}
        </>
    )
  }
  renderContent = (isempty,css) =>{
    if(isempty=="true"){
        return <div className="emptywhy" style={{height: css.multiple*css.eleheight+"px",
                                                 width: css.multiple*(css.elewidth)+"px",}}></div>
    }else {
        return '';
    }
  }
}

export default Empty
