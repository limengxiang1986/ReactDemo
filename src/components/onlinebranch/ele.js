import { PureComponent } from "react";
import { PlusCircleOutlined,MinusCircleOutlined,EditOutlined,SubnodeOutlined,SisternodeOutlined,
    ColumnHeightOutlined ,LoginOutlined ,DownOutlined  } 
        from '@ant-design/icons'
import "antd/dist/antd.css";


class Why extends PureComponent{
  render(){
    const ele = this.props.ele;
    const css = this.props.css;
    const whyid = ele.whyid;
    return (
        <>
            {this.renderContent(ele, css)}
        </>
    )
  }
  renderContent = (why,css) =>{
    let whyid = why.whyid;
    if(!why.isblank){
        return <div className="why" style={{height: css.eleheight*why.rsize+(why.rsize-1)*css.marginbottom+"px"}}>
                
            </div>
    }else {
        return <div className="emptywhy"></div>
    }
  }
}

export default Why
