import React from "react";
import {Link, NavLink, Outlet} from "react-router-dom"
import Inbox from "./Inbox";

const Sidebar = () => {
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
                        <li className="active">
                            <Link to={"/us/chose"}>
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img
                                        src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                        className="rounded-circle user_img"
                                    />
                                    <span className="online_icon"/>
                                </div>
                                <div className="user_info">
                                    <span>Khalid</span>
                                    <p>Kalid is online</p>
                                </div>
                            </div>
                            </Link>
                        </li>

                    </ui>
                </div>
                <div className="card-footer"/>
            </div>
        </div>
        <Outlet/>
    </>)
}
export default Sidebar;