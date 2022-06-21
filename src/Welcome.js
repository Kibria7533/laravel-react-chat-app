import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Example from "./Example";
const Welcome=({saveContact})=>{
    const [name,setName]=useState('');
    let navigate = useNavigate();
    useEffect(()=>{
        if(sessionStorage.getItem('id')){
            navigate("/us/init", { replace: true });
        }else{
            navigate("/", { replace: true });
        }
    },[])

   const  onJoin=()=>{
       saveContact(name);
       navigate("/us/init", { replace: true });
    }
    return(
        <>
            <div className="container">
                {/*<div className="row">*/}
                {/*    <div className="col-md-12">*/}
                {/*        <div className="error-template">*/}
                {/*            <h1>Oops!</h1>*/}
                {/*            <h2>404 Not Found</h2>*/}
                {/*            <div className="error-details">*/}
                {/*                Sorry, an error has occured, Requested page not found!*/}
                {/*            </div>*/}
                {/*            <div className="error-actions">*/}
                {/*                <a*/}
                {/*                    href="http://www.jquery2dotnet.com"*/}
                {/*                    className="btn btn-primary btn-lg"*/}
                {/*                >*/}
                {/*                    <span className="glyphicon glyphicon-home" />*/}
                {/*                    Take Me Home{" "}*/}
                {/*                </a>*/}
                {/*                <a*/}
                {/*                    href="http://www.jquery2dotnet.com"*/}
                {/*                    className="btn btn-default btn-lg"*/}
                {/*                >*/}
                {/*                    <span className="glyphicon glyphicon-envelope" /> Contact Support{" "}*/}
                {/*                </a>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <section id="newsletter">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h3>Get in Touch With Chat Smart</h3>
                            {/*<DistortionText text="Hello wold" />*/}
                            <p>

                                All-in-one multichannel marketing solution

                                Facebook Chatbot, eCommerce, Social Media Management & SMS/Email Marketing
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <form onSubmit={onJoin}>
                                <input type="text" name="nmae" placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)}/>
                                <input type="submit" value={'JOIN'} />
                            </form>
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com/kibria.iu.cse/">
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a href="https://twitter.com/kibria_01">
                            <i className="fab fa-twitter" />
                        </a>
                        <a href="https://www.linkedin.com/in/kibria-islam-5783b21a5/">
                            <i className="fab fa-linkedin-in" />
                        </a>
                        <a href="#">
                            <i className="fab fa-pinterest-p" />
                        </a>
                        <a href="https://www.instagram.com/kibria9249/">
                            <i className="fab fa-instagram" />
                        </a>
                    </div>
                </div>
            </section>
        </>

    )
}

export  default Welcome;