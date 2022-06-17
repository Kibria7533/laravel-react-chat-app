import React, {useEffect} from 'react';
import {useChannel, useEvent} from "@harelpls/use-pusher";
import {useState} from "react";
import {setPusherClient} from 'react-pusher';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo'

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'e07a1de7d158f0f09e94',
    cluster: 'ap2',
    forceTLS: true
});


const Example = () => {
    const [messeges, setMesseg] = useState([]);
    useEffect(() => {
        let channel = window.Echo.channel('status-liked');
        // console.log(channel);
        channel.listen('StatusLiked', function (data) {
            console.log(data)
            let msg = [...messeges]
            msg.push(data.message);
            setMesseg(msg)
        });
    })


    return (<>
            {messeges.map(el => {
                return <>{el}<br> </br></>
            })
            }
        </>
    );
};

export default Example;