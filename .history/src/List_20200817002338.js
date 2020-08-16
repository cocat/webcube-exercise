import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css'
import './list.scss';


export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //这里默认是传了数据的
            data:this.props.data,
            //新增的数据
            addcount:[],
            addjob:[],
            id:[],
            // 团队
            addteam:'',
            editable:[],
            temval:'',
            temcount:[],
            //总数，要传给底部的
            allCount:'',
            //折叠展开 folder 一开始data是没有这个属性的，当他赋值为true的时候是收起
            folder:true,
            //展开收起箭头
            arr:[],
            //表单值修改
            // loacalValue:{
            savaTeamName:'',
            savaJobName:'',
            savaJobCount:'',
            // }
            // 错误消息
            jobmess:'',
            countmess:'',
            errorMes:'',
        };
    }
    
    // checkbox
    handleTeamCheck1(e, index ){
        this.state.data[index].checked = e.target.checked;
        this.state.data[index].jobs.forEach(job => job.checked = e.target.checked);
        this.forceUpdate();
        this.countAll(index);
        this.getAllCount();
    }

    handleJobCheck(e,index,i){
        this.state.data[index].jobs[i].checked = !!e.target.checked;
        const unChecked = this.state.data[index].jobs.filter(job => !job.checked);

        if (unChecked.length === 0){
            this.state.data[index].checked = true
        } else {
            this.state.data[index].checked = false
        }
        this.countAll(index);
        this.forceUpdate();
        this.getAllCount();
    }

    //输入框改变
    handleJobChange(e,index){
        //从state中取到数组的值
        const addjob = [...this.state.addjob]
        addjob[index]= e.target.value
        this.setState({addjob});
        this.forceUpdate();    
    }

    handleCountChange(e,index) {
        const addcount = [...this.state.addcount]
        addcount[index]=e.target.value
        this.setState({addcount})
    }

    // job行的确认取消按钮
    confirmed(index){
        this.setState({jobmess:''});
        this.setState({countmess:''});
        const idlength = this.state.data[index].jobs.length+1
        
            // 验证
            const nameValide = this.state.addjob[index];
            const joblist = this.state.data[index].jobs;
            //验证职业是否重复
            const jobValide =  joblist.some(job=>{     
                const jobname = job.name;
                return nameValide === jobname;
            })
            console.log(this.state.addjob[index]);
            if(this.state.addcount[index]>=100){
                console.log('*人数需要少于100');
                this.setState({
                    countmess:true
                })
            }

            if (jobValide){
                console.log('*不能新建重复职业');
            // this.state.mess[index]=true;
            this.setState({
                jobmess:true
            })
            // this.state.jobmess=false;
            console.log(this.state.jobmess)
            }

            if(!this.state.addcount[index]){
                console.log('*需要输入人数才可以提交');
            }
            if(!this.state.addjob[index]){
                console.log('*需要输入职位才可以提交');
            } 
            if( (this.state.addcount[index]>0&&this.state.addcount[index]<100) && (!jobValide && this.state.addjob[index] !== undefined )){
                // 验证通过 加到数组里
                this.state.data[index].jobs.push({
                id: 'newjob'+idlength,  
                name: this.state.addjob[index], 
                count: Number(this.state.addcount[index])
                })
                // 清空内容
                this.state.addjob[index]=''
                this.state.addcount[index]=''
                const addjobClass= document.getElementsByClassName('addjob');
                addjobClass[index].style.display='none';
            }   

            // 新增了一个之后，checkbox要更新
            this.state.data[index].checked = false;

            this.getAllCount();
            this.forceUpdate()
    }

    // 最好把验证抽离出来------------待实现

    removeAdd(index){
        const addjob =[...this.state.addjob]
        const addcount = [...this.state.addcount]
        addjob[index]=''
        addcount[index]=''
        this.setState({addjob,addcount})

        const addjobClass= document.getElementsByClassName('addjob');
        addjobClass[index].style.display='none';

        this.setState({jobmess:''});
        this.setState({countmess:''});
    }

    // 计算job的count
    countAll(index){
        //jobcount 是一个数组  数组里是对象 对象里有count属性
        const jobcount = this.state.data[index].jobs.filter(job=> job.checked === true);
        //拿到了只有count的数组
        var newcount =  jobcount.map(job => {
            return job.count;
        });
        
        for (var i=0,s=0 ; i<newcount.length; i++) {
          s += newcount[i];
        }
        this.state.data[index].count=s;
        this.forceUpdate()

    };

    //team行的确认取消
    handleTeamChange(e){
    //   console.log(e.target.value)
        const temval= e.target.value
      this.setState({
          temval
      })
    //   console.log(this.state.temval)
    }

    confirmedTeam(){
        
        //如果有team的name 和 this.state.temval重复,返回true
        const teamValide =  this.state.data.some(team=>{     
            const teamname = team.name;
            return this.state.temval === teamname;
        })

        if (teamValide){
            console.log('*不能新建重复团队');
            // this.state.errorMes=true;
            this.setState({
                errorMes:true
            })
            return;
            }
        // if(!this.state.temval){
        //     console.log('*需要输入团队才可以提交');
        //     return;
        // }

        const idlength = this.state.data.length+1;
        // console.log(this.state.temval);
        // console.log(this.state.temval.toString());
        this.state.data.push({ 
        id: 'newteam'+idlength,
        name: this.state.temval,
        count:'',
        jobs:[],
        })
        //清空
        this.state.temval='';
        // console.log(this.state.data)
        //清空消息
        this.state.errorMes='';
        this.forceUpdate();

        const addTeamClass= document.getElementsByClassName('addteam');
        addTeamClass[0].style.display='none';
    }

    removeAddTeam(){
        // console.log(this.state)
        this.setState({
            temval:''
        })

        const addTeamClass= document.getElementsByClassName('addteam');
        addTeamClass[0].style.display='none';
    }

    // 计算所有总数
    getAllCount(){
        // console.log(this.state.data);
        var teamCount;
        teamCount = this.state.data.map(team =>{  
               return team.count; 
            })
        // console.log(teamCount);

        //这个是team数组的总和
        var s = 0;

        for (var i=teamCount.length-1; i>=0; i--) {
            if(teamCount[i] != undefined){
                s += teamCount[i];
            }
        }
        this.state.allCount=s;
 
        this.setState({
            allCount:s
        })
    }

    //提交页面内容
    submitAll(){
        // console.log(this.state);
        const newstate = this.state.data;

        //如果还有没提交的行应该提醒的--------待实现

        //这个是submit里的提交，能把state的所有状态提交上去
        localStorage.setItem(
            'newstate', JSON.stringify(newstate)
        )

        //解析状态newstate --- 其实不需要 纯展示 --newstate理论上应该提交给后端
        const newState = JSON.parse(localStorage.getItem('newstate'));
        // console.log(newState)

        this.getAllCount();
    }

    //重新赋值
    reSetAll(){
        //解析newDate，作为data的拷贝，为了重置内容的时候重新渲染
        const inidata = JSON.parse(localStorage.getItem('inidata'));
        this.state.data = inidata;
        this.forceUpdate();
        // console.log(this.state.data)

        // 再强制刷新allcount
        this.getAllCount();
        // console.log(this.state.allCount)
    };

    componentWillMount() {
        //初始数据inidata 存档
        const inidata =  this.state.data;
        localStorage.setItem(
          'inidata', JSON.stringify(inidata)
      )

      this.getAllCount();
      };
    
    //list展开收起 
    handleRowExpend(e, index){
        //首先 要设置一个初始值，每个list都是true 默认展开

        // 如果list.folder这个不存在  给他赋值 为true
        if(this.state.data[index].folder == null) {
            this.state.data[index].folder =true;
        }else{
            // 否则 拿到这个folder的值  取反
            const folder = this.state.data[index].folder;
            this.state.data[index].folder= !folder;
        }
        if(this.state.arr[index]){
            this.state.arr[index] = !this.state.arr[index];
        }else{
            this.state.arr[index]=true;
        }

        console.log(!this.state.arr[index]);
        this.forceUpdate()
    };

    //团队名称编辑
    teamNameChange(e){
        const savaTeamName = e.target.value;
        // console.log(savaTeamName)
        this.setState({savaTeamName})
    }

    teamEditButton(e,index){
        // 新值
        // console.log(this.state.savaTeamName)
        //原始值value
        const value = this.state.data[index].name;
        
        // 如果这个值没变，返回
         // 如果，这个值改变了，存到state里
            if(this.state.savaTeamName !== value){
               const newvalue=this.state.savaTeamName;
                console.log(newvalue)
                this.state.data[index].name= newvalue
                this.forceUpdate();
            }     
    }

    //控制是否显示新增行职位
    appearAddJob(e,index){
        const addjobClass= document.getElementsByClassName('addjob');
        // console.log(addjobClass);
        addjobClass[index].style.display='block';
    };

    appearAddTeam(){
        const addTeamClass= document.getElementsByClassName('addteam');
        addTeamClass[0].style.display='block';
    }


    render(){   

        return <div style = {{textAlign:'left'}}>
            {this.state.data.map((team,index)=> {
                return (
                    // 渲染
                    <div className="alllist" key ={team.id}>
                        <div className="teamlist">
                             {/* 这个select要改成图片的 */}
                             <img 
                             className={this.state.arr[index] === true ? 'arrowTransformReturn':'arrowTransform' }
                             src="./arrRight.png"
                             onClick={e => this.handleRowExpend(e, index)}
                             />
                            <input  type='checkbox' checked ={team.checked}  onChange={ e => this.handleTeamCheck1(e , index)}/>
                            {/* ________________________________ */}
                            <span  className='teamname' name = "saveJobName" defaultValue={team.name} onChange={e=> this.teamNameChange(e,index)}>{team.name}</span>
                            <span className="teamcount">{ team.count }</span>    
                            <span  className="editteam">修改</span>
                            {/* <button onClick= {e=>this.teamEditButton(e,index)}>修改</button> */}
                            {/* <button onClick= {e=>this.teamCancelEdit(e,index)}>取消</button>  */}
                        </div>
                        {team.jobs.map((job,i) => {
                          return (
                            <div className='joblist' key ={job.id}  style={{display:this.state.data[index].folder?'none':'block'}}>
                                <input type='checkbox' checked={job.checked} onChange={ e => this.handleJobCheck(e, index, i)}/>
                                <span  className='jobname' suppressContentEditableWarning contentEditable= {job.editable} >{job.name}</span>
                                <span className='jobcount' suppressContentEditableWarning contentEditable= {job.editable}>{job.count}</span>   
                                <span  className='editjob' onClick= {e=>this.jobEditButton(e,index,i)}>修改</span>
                            </div> 
                          )
                        })}
                        {/* 新增 */}
                        <div   style={{display:this.state.data[index].folder ? 'none':'block'}}>
                            <div className='addjob' style={{display:'none'}} >
                                <input className='addjobname'  placeholder="请输入职位的名称"  value = {this.state.addjob[index]}  onChange={e=> this.handleJobChange(e,index) } />
                                <span className={this.state.jobmess === true? 'errormessage':'visiblemes'}>* 不能新建重复职业</span>
                                <input  className='addjobcount' type="number"  placeholder="请输入招聘人数"   value = {this.state.addcount[index]}  onChange={e=>this.handleCountChange(e,index)} />
                                <span className={this.state.countmess === true? 'errorCount':'visiblemes'}>* 招聘人数少于100人</span>
                                <span  className='addjobconfirm' onClick={ () => this.confirmed(index)}>确认</span>
                                <span className='addjobcancel'  onClick={() => this.removeAdd(index)}> 取消</span>
                            </div>
                            <div className="addJobLine">
                               <span onClick={e=> this.appearAddJob(e,index)}>+ 新增职位</span> 
                            </div>
                        </div>
                        
                    </div>)
                })
                }
                    <div className='addteam' style={{display:'none'}} >
                        <input className ='addteamname' placeholder="输入团队名称" value = {this.state.temval} onChange ={this.handleTeamChange.bind(this)} />
                        <span className={this.state.errorMes === true? 'errormessage':'visiblemes'}>*不能新建重复团队</span>
                        <span className='addteamconfirm' onClick={ this.confirmedTeam.bind(this)}>确认</span>
                        <span  className='addteamcancel' onClick={this.removeAddTeam.bind(this)}> 取消</span>
                    </div>  
                    <div className="addTeamLine">
                        <span  onClick={e=> this.appearAddTeam()}>+ 新增团队</span>
                    </div> 
                <div className="footer">
                    <span>总计共 </span>{this.state.allCount}<span> 人</span>
                    <button className ='submitAll' onClick = {e => this.submitAll()} >提交</button>
                    <button className='reSetAll' onClick = {e => this.reSetAll()}>重置</button>
                </div>
            </div>         
    }
}

