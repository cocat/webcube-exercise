import React from 'react';
import './title.scss';

export default class Title extends React.Component{


    render(){
        return(
            <div >
                <div className="title">
                    <span className="teamName">团队名称</span>
                    <span>招聘数量</span>
                    <span className="control">操作</span>
                </div>
            </div>
        )
    }
}