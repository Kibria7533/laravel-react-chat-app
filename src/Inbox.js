import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import {base} from "./Url";
import Avatar from "react-avatar";
import Echo from 'laravel-echo'
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'e07a1de7d158f0f09e94',
    cluster: 'ap2',
    forceTLS: true
});
const  Inbox=()=>{
    const[messeges,setMesseges]=useState([]);
    const[messege,setMessege]=useState('');
    const [title_name,setTitle] =useState('');
    const [agtoggle,setAddGT]=useState(false);
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };

    let {id,title}=useParams();
    console.log(id,title);
    const getMessges=async(initId,recId)=>{
        await axios.get(`${base}/messeges/${parseInt(initId)}/${parseInt(recId)}`).then(data=>{
            console.log(data.data.data);
            setMesseges(data.data.data);
        })
    }

    let channel = window.Echo.channel('messege');
    channel.listen('MessegeEvent', function (data) {
        console.log(data,'messeges from event');
        let filteredMessege=data.messege.filter(el=> (el.from_contact_id ==sessionStorage.getItem('id') || el.from_contact_id == id ));
        setMesseges(filteredMessege);
    });

    const saveMesseges=async()=>{
        let messegeData={
            "from_contact_id": sessionStorage.getItem('id'),
            "to_contact_id": id,
            "messege_text": messege,
            "contact_id":sessionStorage.getItem('id')
        }
        console.log(messegeData);
        if(!messege){
            alert('Write something to text');
        }
        await axios.post(`${base}/messege`,messegeData,{headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}}).then(data=>{
                    console.log(data);
                    setMessege('')
                    getMessges(sessionStorage.getItem('id'),id);
        })
    }
   useEffect(()=>{
       // let objDiv = document.getElementsByClassName("msg_card_body");
       // objDiv.scrollTop = objDiv.scrollHeight;
       getMessges(sessionStorage.getItem('id'),id);
       setTitle(title);
   },[id])
    return(<>
        <div className="col-md-8 col-xl-6 chat" >
            <div className="card">
                <div className="card-header msg_head">
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <Avatar   className="rounded-circle user_img" name={title_name} size="40" style={{"paddingTop":"8px"}}   maxInitials={1} round textSizeRatio={1.75} />
                            <span className="online_icon" />
                        </div>
                        <div className="user_info">
                            <span>Chat with {title_name}</span>
                            <p>1767 Messages</p>
                        </div>
                        <div className="video_cam">
                <span>
                  <i className="fas fa-video" />
                </span>
                            <span>
                  <i className="fas fa-phone" />
                </span>
                        </div>
                    </div>
                    <span id="action_menu_btn" onClick={()=>setAddGT(!agtoggle)}>
              <i className="fas fa-ellipsis-v" />
            </span>
                    <div className="action_menu" style={{display:`${agtoggle ? "block" : "none" }`}}>
                        <ul>
                            <li>
                                <i className="fas fa-user-circle" /> View profile
                            </li>
                            <li>
                                <i className="fas fa-users" /> Add to close friends
                            </li>
                            <li>
                              <i className="fas fa-plus" /> Add to group
                            </li>
                            <li>
                                <Link to={"/us/group"} style={{color:'white'}}>  <i className="fas fa-plus" /> Create group</Link>
                            </li>
                            <li>
                                <i className="fas fa-ban" /> Block
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body msg_card_body" style={{ flexDirection: "column-reverse"}}>
                    {messeges.length>0 && messeges.map((el,ind)=>{
                        return(
                            <div  key={ind} className={el.from_contact_id==sessionStorage.getItem('id')?"d-flex justify-content-end mb-4" : "d-flex justify-content-start mb-4"}>
                                <div className="img_cont_msg">
                                    <Avatar   className="rounded-circle user_img" name={el.sender_name} size="25" style={{"paddingTop":"8px"}}   maxInitials={1} round textSizeRatio={2.75} />

                                    {/*<img*/}
                                    {/*    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"*/}
                                    {/*    className="rounded-circle user_img_msg  img-thumbnai"*/}
                                    {/*/>*/}
                                </div>
                                <div className={el.from_contact_id==sessionStorage.getItem('id')?"msg_cotainer_send":"msg_cotainer"} style={{minWidth:"42px"}}>
                                    {el.messege_text}
                                    <span className={el.from_contact_id==sessionStorage.getItem('id')?"msg_time_send":"msg_time"} style={{width: "max-content"}}><Moment calendar={calendarStrings} >{el.created_at}</Moment></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <div className="input-group-append">
                <span className="input-group-text attach_btn">
                  <i className="fas fa-paperclip" />
                </span>
                        </div>
                        <textarea
                            name="messege"
                            value={messege}
                            onChange={(e)=>setMessege(e.target.value)}
                            className="form-control type_msg"
                            placeholder="Type your message..."
                            defaultValue={""}
                        />
                        <div className="input-group-append">
                <span className="input-group-text send_btn" onClick={saveMesseges}>
                  <i className="fas fa-location-arrow" />
                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export  default  Inbox;