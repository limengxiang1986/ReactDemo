import React, { memo } from 'react';
import { NavLink } from "react-router-dom";
import { HeaderStyle, HeaderLeft, HeaderRight } from './style';
import { headerlinks } from '../../common/local-data';


const index = memo(function rcaindex() {
    const showlinks = (item,index)=>{
        if( index > 2){
            return (
                <NavLink to={item.link} exact>
                    {item.title}
                </NavLink>
            )
        }else {
            return <a href={item.link}>{item.title}</a> 
        }
    }
    return (
        <HeaderStyle>
            <div className="content wrap-v1">
                <HeaderLeft>
                    {
                        headerlinks.map((item, index) => {
                            let swidth = item.width
                            return (
                                <div key={item.title} className="select-item" style={{width:{swidth}}}>
                                    {showlinks(item,index)}
                                </div>
                            ) 
                        })
                    }
                </HeaderLeft>
                <HeaderRight>
                    xxxx
                </HeaderRight>

            </div>
        </HeaderStyle>
    )
})
export default index
