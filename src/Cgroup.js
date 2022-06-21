import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import {base} from "./Url";
import Avatar from "react-avatar";
import Select from 'react-select';

const  Cgroup=({contacts})=>{
    const[messeges,setMesseges]=useState([]);
    const[messege,setMessege]=useState('');
    const [title_name,setTitle] =useState('');
    const [agtoggle,setAddGT]=useState(false);
    const [customContacts,setCustomContact]=useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cgname,setCgName]=useState('')
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };
let navigate=useNavigate();
    let {id,title}=useParams();
    console.log(id,title);
    const getMessges=async(initId,recId)=>{
        await axios.get(`${base}/messeges/${initId}/${recId}`).then(data=>{
            console.log(data.data.data);
            setMesseges(data.data.data);
        })
    }
    const saveMesseges=async()=>{
        let messegeData={
            "from_contact_id": sessionStorage.getItem('id'),
            "to_contact_id": id,
            "messege_text": messege,
            "contact_id":sessionStorage.getItem('id')
        }
        if(!messege){
            alert('Write something to text');
        }
        await axios.post(`${base}/messege`,messegeData,{headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}}).then(data=>{
            console.log(data);
            setMessege('')
            getMessges();
        })
    }
    const customizeForOption=()=>{
        let customOption=contacts.map(el=>{
            return{value: el.id, label: el.first_name};
        })
        setCustomContact(customOption)
    }
    useEffect(()=>{
        // let objDiv = document.getElementsByClassName("msg_card_body");
        // objDiv.scrollTop = objDiv.scrollHeight;
        customizeForOption();
        getMessges(sessionStorage.getItem('id'),id);
        setTitle(title);
    },[id])

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const  customStyles={
        input: () => ({
            // none of react-select's styles are passed to <Control />
            width: 400,
        })
    }
    const saveGroup=async ()=>{
        await  axios.post(`${base}/conversation`,{selectedOption,cgname},{headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}}).then(data=>{
                    console.log(data,'g create holo');
            navigate("/us/init", { replace: true });
        })
    }
    return(<>
        <div className="col-md-8 col-xl-6 chat" onClick={()=>setAddGT(false)}>
            <div className="card">
                <div className="card-header msg_head">
                    <div className="d-flex">
                        <div className="user_info">
                            <Select
                                defaultValue={selectedOption}
                                placeholder={"Select Member To Add"}
                                onChange={setSelectedOption}
                                options={customContacts}
                                isSearchable={true}
                                isMulti={true}
                                styles={customStyles}
                            />
                        </div>
                        <div className="user_info">
                            <input
                                placeholder={'Group Name'}
                                value={cgname}
                                onChange={(e)=>setCgName(e.target.value)}
                                name={cgname}
                                style={{width: '213px',
                                height: '53px',
                                border: 'aliceblue',
                                borderRadius: '8px',
                                background: 'C1E6c6'}}/>
                        </div>
                        <div style={{textAlign: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            margin: 'auto',
                            borderRadius: '69px'}}>
                           <button onClick={saveGroup} style={{height: '48px',
                               borderRadius: '17px'}}>Create</button>
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
export  default  Cgroup;