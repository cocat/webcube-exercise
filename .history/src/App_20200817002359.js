import React from 'react';
// import ReactDOM from 'react-dom';
import List from './List';
import Title from './Title';
import './index.css';
// import { render } from '@testing-library/react';

export default class App extends React.Component{
    constructor(props){
      super(props);
      this.state={
        data:[],
    }
  }

componentWillMount(){
      var httpRequest = new XMLHttpRequest();

      httpRequest.open('GET', 'https://s.flipchina.cn/api/exercise/job-list.json', true);
      httpRequest.send();
      
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText;
            localStorage.setItem(
              'json', json
              )
           }
        }

      const datas = JSON.parse(localStorage.getItem('json'));
      // console.log(datas);
      // console.log(datas.teams);

      // 对数据做一个处理,每一个数据加一个id和一个ifCheck属性
      datas.teams.map((item ,index)=> {
            item.checked = false;
            item.id="team"+parseInt(index+1);
              item.jobs.map( (item,index)=>{
                item.checked=false ;
                item.id="job"+parseInt(index+1);
              })
        }) ;
      
        const data=datas.teams;
        this.setState({data:data});
      }

    render() {
      console.log(this.state.data)
        return(
          <div>
            <Title></Title>
            <List data={this.state.data}></List>
          </div>
        )
    }

}