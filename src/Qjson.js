import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import './index.css';
import 'whatwg-fetch';
// import React,{ useState,useEffect } from 'react';
// import { render } from '@testing-library/react';

export default class App extends React.Component{
    constructor(props){
      super(props)
      this.state={
        data:[]
      }
     this.getData=this.getData.bind(this)
  }
  getData(){
    fetch('./joblist.json')
    .then(response=>
      response.text()
    )
    .then(data=>{
      console.log(data)
      // this.setState({data:data.teams}
      })
    .catch(e=>{console.log("error")})
}

    componentWillMount(){  
       this.getData();
     };   


    render() {
      const datas =this.state.data;
      // 对数据做一个处理,每一个数据加一个id和一个ifCheck属性
      datas.map((item ,index)=> {
            item.checked="fales";
            item.id="team"+parseInt(index+1);
              item.jobs.map( (item,index)=>{
                item.checked="false";
                item.id="job"+parseInt(index+1);
              })
        })  
        

        return(
            <List data={this.state.data}></List>
        )
    }

}