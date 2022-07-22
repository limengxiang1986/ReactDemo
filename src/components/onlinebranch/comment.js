import { PureComponent } from "react";
import {MinusCircleOutlined,AmazonOutlined,CommentOutlined} 
        from '@ant-design/icons'
import "antd/dist/antd.css";

class Comment extends PureComponent{
    render(){
      const comment = this.props.comment;
      return (
          <>
              <div className="comment">{comment.comment}</div>
          </>
      )
    } 
  }
  
  export default Comment