import React from 'react';
import {Avatar, Popconfirm} from "antd";

const Header = ({user,text,confirm}) => {
    return(
        <div className="d-flex justify-content-between" style={{height: 60, backgroundColor: "white"}}>
            <div/>
            <div className="d-flex align-items-center" style={{width: "22%", justifyContent: "space-around"}}>
                <div className="d-flex d-inline-block mr-3">
                    <a href="https://www.json2any.com/" target="_blank" className="json2any" style={{
                        fontSize: '20px',
                        color: 'Black',
                    }}>Json2any.com
                    </a>
                </div>
                <div className="whatsAppDirect d-flex d-inline-block" style={{
                    fontSize: '20px',
                    color: 'Black',
                }}>
                    whatsdirectchat.com
                </div>
            </div>
            <div>
                {
                    user && user.email ?
                        <div className="d-flex align-items-center">
                            <div
                                className="d-flex d-inline-block userNameClass"
                                style={{
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    marginRight: "5px",
                                    width: '100%',
                                    color: "black",
                                    display: 'inline-table'
                                }}> {(user && user.displayName) || ""}
                            </div>
                            <div className="d-flex d-inline-block">
                                <Popconfirm placement="bottomLeft" title={text}
                                            onConfirm={confirm}
                                            okText="Yes"
                                            cancelText="No">
                                    <Avatar size={50} style={{marginTop: 3, marginRight: 10}}
                                            icon={<img src={(user && user.photoURL)} alt=""/>}/>
                                </Popconfirm>
                            </div>
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
};

export default Header;
