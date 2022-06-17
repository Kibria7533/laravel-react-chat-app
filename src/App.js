import React from "react";
import {PusherProvider} from "@harelpls/use-pusher";
import Example from "./Example";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Nomatch from "./Nomatch";
import Welcome from "./Welcome";
import InitMessegeHome from "./InitMessegeHome";
const App = () => {
    return (
        <>
            <title>Chat</title>
            <div className="container-fluid h-100  mt-5">
                <div className="row justify-content-center h-100">
                    <Router>
                        <Routes>
                            <Route exact path='/us' element={<Sidebar/>}>
                                <Route   path='init' element={<InitMessegeHome/>}/>
                                <Route   path='chose' element={<Inbox/>}/>

                            </Route>
                            <Route exact  path ="/" element={<Welcome/>}/>
                            <Route  path ='*' element={<Nomatch />}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </>


    )
};


export default App;