import React from 'react';
import { DistortionText } from 'react-text-fun'
import Typical from 'react-typical'
const  InitMessegeHome=()=>{
    return(<>
        <div className="col-md-8 col-xl-6 chat">
            <div className="card" style={{textAlign: "center",justifyContent: "center"}}>

                <Typical
                    steps={['Please', 1000, 'Select One!', 500,'Two Continue!', 600]}
                    loop={Infinity}
                    wrapper="h1"
                />

            </div>
        </div>
    </>)
}
export  default  InitMessegeHome;