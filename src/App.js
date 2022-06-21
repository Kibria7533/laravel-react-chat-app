import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Nomatch from "./Nomatch";
import Welcome from "./Welcome";
import InitMessegeHome from "./InitMessegeHome";
import axios from 'axios';
import {base} from './Url';
import Cgroup from "./Cgroup";
import Cgchat from "./Cgchat";
import {useChannel, useEvent} from "@harelpls/use-pusher";
import {setPusherClient} from 'react-pusher';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo'
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'e07a1de7d158f0f09e94',
    cluster: 'ap2',
    forceTLS: true
});
const App = () => {

    const [contacts,setContact]=useState([]);
    const [allcontacts,setAllContact]=useState([]);
    const [conversations,setConversation]=useState([]);

    const getContacts=async ()=>{
        await axios.get(`${base}/contacts`).then(data=>{
             console.log(data);
            setAllContact(data.data.data);
              let id=sessionStorage.getItem('id');
              if(id){
                  let filterd=data.data.data.filter(el=>el.id!=id);
                  console.log(filterd,'loo')
                  setContact(filterd);
                  return;
              }

            setContact(data.data.data);
        })
    }
    const saveContact=async (name)=>{
        let contact={first_name:name,last_name:"islam",email:"a@gmail.com",profile_photo:"jjj"}
        await axios.post(`${base}/contact`,contact,{headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'}}).then(e=>{
            sessionStorage.setItem('id',e.data.data.id);
                    getContacts();
        });
    }

    const getConversation=async ()=>{
        await axios.get(`${base}/conversations/${sessionStorage.getItem('id')}`).then(data=>{
            console.log(data);
            setConversation(data.data.data);
        })
    }
    let channel = window.Echo.channel('contact');
    channel.listen('Contact', function (data) {
        console.log(data,'contacts from event')
        setAllContact(data.contact);
        let id=sessionStorage.getItem('id');
        if(id){
            let filterd=data.contact.filter(el=>el.id!=id);
            console.log(filterd,'loo')
            setContact(filterd);
            return;
        }
        setContact(data.contact);
    });

    let channelC = window.Echo.channel('conversation');
    channelC.listen('ConversationEvent', function (data) {
        console.log(data.conversation,'conversations from event')
        let filtered=data.conversation.filter(el=>(el.contact_id==sessionStorage.getItem('id')));
        setConversation(filtered);
    });
    useEffect(()=>{
        getContacts();
        getConversation();
    },[])
    return (
        <>
            <title>Chat</title>
            <div className="container-fluid h-100  mt-5">
                <div className="row justify-content-center h-100">
                    <Router>
                        <Routes>
                            <Route exact path='/us' element={<Sidebar conversations={conversations} contacts={contacts}/>}>
                                <Route   path='init' element={<InitMessegeHome/>}/>
                                <Route   path=':id/:title' element={<Inbox/>}/>
                                <Route   path='group/:id/:title' element={<Cgchat/>}/>
                                <Route   path='group' element={<Cgroup contacts={allcontacts}/>}/>
                            </Route>
                            <Route exact  path ="/" element={<Welcome saveContact={saveContact}/>}/>
                            <Route  path ='*' element={<Nomatch />}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </>


    )
};


export default App;