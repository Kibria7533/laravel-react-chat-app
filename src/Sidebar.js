import React from "react";
import {Link, NavLink, Outlet} from "react-router-dom"
import Inbox from "./Inbox";
import Avatar from 'react-avatar';

const Sidebar = ({contacts,conversations}) => {
    return (<>
        <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            name=""
                            className="form-control search"
                        />
                        <div className="input-group-prepend">
                <span className="input-group-text search_btn">
                  <i className="fas fa-search"/>
                </span>
                        </div>
                    </div>
                </div>
                <div className="card-body contacts_body">
                    <ui className="contacts">
                        {conversations.length>0 && conversations.map((el,ind)=>{
                            return(
                                <li className="active" key={ind}>
                                    <Link to={`group/${el.id}/${el.conversation_name}`}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <Avatar   className="rounded-circle user_img" name={el.conversation_name} size="40" style={{"paddingTop":"8px"}}   maxInitials={1} round textSizeRatio={1.75} />
                                                <span className="online_icon"/>
                                            </div>
                                            <div className="user_info">
                                                <span>{el.conversation_name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                        {contacts.length>0 && contacts.map((el,ind)=>{
                            return(
                                <li className="active" key={ind}>
                                    <Link to={`/us/${el.id}/${el.first_name}`}>
                                        <div className="d-flex bd-highlight">
                                            <div className="img_cont">
                                                <Avatar   className="rounded-circle user_img" name={el.first_name} size="40" style={{"paddingTop":"8px"}}   maxInitials={1} round textSizeRatio={1.75} />
                                                <span className="online_icon"/>
                                            </div>
                                            <div className="user_info">
                                                <span>{el.first_name}</span>
                                                <p>{el.first_name} {el.last_name} is online</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}


                    </ui>
                </div>
                <div className="card-footer"/>
            </div>
            <Link to={"/"}>Back</Link>
        </div>
        <Outlet/>

    </>)
}
export default Sidebar;