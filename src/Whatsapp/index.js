import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from "./header";
import PhoneInput from 'react-phone-input-2'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import { Popconfirm, Select, Divider, Tabs } from 'antd';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../firebase'
import "firebase/auth";
import img1 from "../Assets/microSoft.png"
import img2 from "../Assets/playStore.png"
import img3 from "../Assets/appStore.png"
import {
    createUserMessage,
    getUserAddress,
    createMessage,
    creatTag,
    getMessage,
    getTag,
    createBusinessAddress,
    deleteMessage,
    deleteTag,
    googleFirebase,
    deleteHomeAddress,
    editMessage,
    editAddress,
    updateMess,
    updateAddre
} from '../actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-input-2/lib/style.css'
import 'antd/dist/antd.css';
import '../App.css'
import '../Assets/style.css'
import "./login.css";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Bling as GPT } from "react-gpt";
import usePageTracking from "../usePageTracking";

const { TabPane } = Tabs;

const { Option } = Select;
GPT.enableSingleRequest();

const path = "/419163168/https:////whatsdirectchat.com.Banner";
// const path = "/4595/nfl.test.open";

const sloat = [
    { viewport: [0, 0], slot: [300, 250] },
    { viewport: [750, 0], slot: [[160, 600], [300, 250]] },
    { viewport: [1050, 0], slot: [[160, 600], [160, 600], [120, 600], [120, 240]] }
];

const WhatsApp = () => {

    {
        usePageTracking()
    }
    const history = useHistory();
    const [user, setUser] = useState({});
    const [detail, setDetail] = useState({});
    const [message, setMessage] = useState({});
    const [messageList, setMessageList] = useState([]);
    const [tags, setTags] = useState({});
    const [tagList, setTagList] = useState([]);
    const [font, setFont] = useState({ textDecoration: false, fontWeight: false, fontStyle: false });
    const [isFocus, setIsFocus] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [errors, setValidation] = useState({});
    const [errorsAddMessage, setValidationAddMessage] = useState({});
    const [errorsEditMessage, setValidationEditMessage] = useState({});
    const [errorsAddTag, setValidationAddTag] = useState({});
    const [errorsEditTag, setValidationEditTag] = useState({});
    const [loginUser, setLoginUserDetails] = useState({});
    const [errorsHomeAddress, setValidationHomeAddress] = useState({});
    const [errorsBussinessAddress, setValidationBussinessAddress] = useState({});
    const [deleteId, setDeleteId] = useState('');
    const [editId, setEditId] = useState('');
    const [tagId, setTagId] = useState('');
    const [AddressId, SetAddressId] = useState('');
    const [editMessageValue, setEditMessageValue] = useState({});
    const [editAddressValue, setEditAddressValue] = useState({});

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [AddMessagemodal, setAddMessagemodal] = useState(false);
    const toggleAddMessage = () => {
        setAddMessagemodal(!AddMessagemodal);
        setValidationAddMessage({})
    };

    const [AddTagModal, setAddTagModal] = useState(false);
    const toggleAddTag = () => {
        setAddTagModal(!AddTagModal);
        setValidationAddTag({})
    };

    const [HomeAddressModal, setHomeAddressModal] = useState(false);
    const toggleHomeAddress = () => {
        setHomeAddressModal(!HomeAddressModal);
        setValidationHomeAddress({})
    };

    const [BussinessAddressModal, setBussinessAddressModal] = useState(false);
    const toggleBussinessAddress = () => {
        setBussinessAddressModal(!BussinessAddressModal);
        setValidationBussinessAddress({})
    };

    const [CreateIconModal, setCreateIconModal] = useState(false);
    const toggleCreateIcon = () => {
        setCreateIconModal(!CreateIconModal);
    };

    const [MessageEditIconModal, setMessageEditIconModal] = useState(false);
    const toggleMessageEditIcon = () => {
        setMessageEditIconModal(!MessageEditIconModal);
        setValidationEditMessage({})
    };

    const [AddModal, setAddModal] = useState(false);
    const toggleAdd = () => {
        setAddModal(!AddModal);
    };

    const [TagEditIconModal, setTagEditIconModal] = useState(false);
    const toggleTagEditIcon = () => {
        setTagEditIconModal(!TagEditIconModal);
        setValidationEditTag({})
    };

    const callback = (key) => {
        console.log(key);
    };

    useEffect(() => {
        const user1 = JSON.parse(localStorage.getItem("user"));
        if (user1 && user1.email) {
            setLoginUserDetails(JSON.parse(localStorage.getItem('user')) || {});
            GetMessage();
            GetTag();
            setUser(user1);
        }
    }, []);

    useEffect(() => {
        const user1 = JSON.parse(localStorage.getItem("user"));
        if (user1 && user1.email) {
            setLoginUserDetails(JSON.parse(localStorage.getItem('user')) || {});
            GetTag();
            GetMessage();
        }
    }, []);

    useEffect(() => {
        const user1 = JSON.parse(localStorage.getItem("user"));
        if (user1 && user1.email) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log("user signed in")
                } else {
                    console.log("No User Signed In");
                }
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetail({ ...detail, [name]: value })
    };

    const handleOnMessage = (e) => {
        const { name, value } = e.target;
        setMessage({ ...message, [name]: value })
    };

    const handleOnTag = (e) => {
        const { name, value } = e.target;
        setTags({ ...tags, [name]: value })
    };

    const updateOnTag = (e) => {
        const { name, value } = e.target;
        setEditAddressValue({ ...editAddressValue, [name]: value })
    };

    const updateOnMessage = (e) => {
        const { name, value } = e.target;
        setEditMessageValue({ ...editMessageValue, [name]: value })
    };

    const GetMessage = () => {
        getMessage((result) => {
            if (result && result.success && result.querySnapshot) {
                let data = [];
                result.querySnapshot.forEach((doc) => {
                    const d = {
                        id: doc.id,
                        ...doc.data()
                    };
                    data.push(d)
                });
                setMessageList(data)
            }
        });
    };

    const GetTag = () => {
        getTag((result) => {
            if (result && result.success && result.querySnapshot) {
                let data = [];
                result.querySnapshot.forEach((doc) => {
                    const d = {
                        id: doc.id,
                        ...doc.data()
                    };
                    data.push(d)
                });
                setTagList(data)
            }
        })
    };

    const validation1 = (name, value) => {
        switch (name) {
            case 'Name':
                if (!value) {
                    return 'Please input your Display Name!'
                } else {
                    return '';
                }
            case 'Message':
                if (!value) {
                    return 'Please input your Message!'
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const onMsg = async () => {
        let allErrors1 = {};

        const userData = {
            Name: message.displayMessageName,
            Message: message.messageValue,
        };

        Object.keys(userData).forEach(key => {
            const error1 = validation1(key, userData[key]);
            if (error1 && error1.length) {
                allErrors1[key] = error1
            }
        });
        if (Object.keys(allErrors1).length) {
            return setValidationAddMessage(allErrors1)
        } else {
            const data = JSON.parse(localStorage.getItem('user'));
            await addMessage({
                Message: message.displayMessageName,
                MessageValue: message.messageValue,
                Email: data.email
            });
            toggleAddMessage();
            setMessage({});
            setValidationAddMessage({})
        }
    };

    const validation2 = (name, value) => {
        switch (name) {
            case 'Label':
                if (!value) {
                    return 'Please input your Label!'
                } else {
                    return '';
                }
            case 'LabelValue':
                if (!value) {
                    return 'Please input your Message!'
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const onTag = async () => {
        let allErrors2 = {};

        const userData = {
            Label: tags.displayTagName,
            LabelValue: tags.tagValue,
        };

        Object.keys(userData).forEach(key => {
            const error2 = validation2(key, userData[key]);
            if (error2 && error2.length) {
                allErrors2[key] = error2
            }
        });
        if (Object.keys(allErrors2).length) {
            return setValidationAddTag(allErrors2)
        } else {
            const data = JSON.parse(localStorage.getItem('user'));
            await addTag({ Label: tags.displayTagName, Address: tags.tagValue, Email: data.email });
            toggleAddTag();
            setTags({});
            setValidationAddTag({})
        }
    };

    const addMessage = async (payload) => {
        createMessage(payload, (result) => {
            if (result && result.success && result.documentReference) {
                console.log('document reference ID', result.documentReference.id)
            }
        });
        GetMessage()
    };

    const addTag = async (payload) => {
        creatTag(payload, (result) => {
            if (result && result.success && result.documentReference) {
                console.log('document reference ID', result.documentReference.id)
            }
        });
        GetTag()
    };

    const create = (key, payload) => {
        if (key === "createMessage") {
            createUserMessage(payload, (result) => {
                if (result && result.success) {
                    console.log("user successfully")
                }
            })
        } else if (key === 'createBusinessAddress') {
            createBusinessAddress(payload, (result) => {
                if (result && result.success) {
                    console.log("user successfully")
                }
            })
        }

    };

    const resetForm = () => {
        setDetail((prevState) => ({
            ...prevState,
            phone: ""
        }))
    };

    const validation = (name, value) => {
        const mobileRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        switch (name) {
            case 'Phone':
                if (!mobileRegx.test(value)) {
                    return 'Please input your Mobile Number!'
                } else {
                    return '';
                }
            case 'Message':
                if (!value) {
                    return 'Please input your Message!'
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const sendClicked = async (type) => {
        let allErrors = {};

        const userData = {
            mobile: detail.mobile,
            Message: detail.message,
        };

        Object.keys(userData).forEach(key => {
            const error = validation(key, userData[key]);
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setValidation(allErrors)
        } else {
            if (type === 'WhatsAppDesktop') {
                const dialCode = "+";
                const s = detail.message.replace(/\n/g, '%0a');
                const reDirectUrl = `https://api.whatsapp.com/send?phone=${dialCode}${detail.mobile}&text=${s}`;
                window.open(reDirectUrl, '_blank');
                resetForm();
                setValidation({})
            } else if (type === 'WhatsAppWeb') {
                const dialCode = "+";
                const s = detail.message.replace(/\n/g, '%0a');
                const reDirectUrl = `https://web.whatsapp.com/send?phone=${dialCode}${detail.mobile}&text=${s}`;
                window.open(reDirectUrl, '_blank');
                resetForm();
                setValidation({})
            }
        }
    };

    const fontChange = () => {
        setIsToggle(!isToggle)
    };

    const onPopUp = (key) => {
        if (localStorage.getItem("user")) {
            if (detail[key] === "") {
                detail[key] === 'homeAddress' ? toggleHomeAddress() : toggleBussinessAddress()
            } else {
                onGetAddress(loginUser.email, key)
            }
        } else {
            toggle()
        }
    };

    const onSignIn = async () => {
        googleFirebase(result => {
            if (result && result.success) {
                const res = result.result;
                const user = res.user;
                localStorage.setItem("user", JSON.stringify(user));
                setDetail(res);
                if (res) {
                    history.push('/');
                }
                toggle()
                window.location.reload()
            }
        })
    };

    const validation3 = (name, value) => {
        switch (name) {
            case 'homeAddress':
                if (!value) {
                    return 'Please Enter Your HomeAddress!'
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const onAddress = async () => {
        const data = JSON.parse(localStorage.getItem('user'));
        let allErrors3 = {};

        const userData = {
            homeAddress: detail.homeAddress,
        };

        Object.keys(userData).forEach(key => {
            const error3 = validation3(key, userData[key])
            if (error3 && error3.length) {
                allErrors3[key] = error3
            }
        });
        if (Object.keys(allErrors3).length) {
            return setValidationHomeAddress(allErrors3)
        } else {
            await create("createMessage", { homeAddress: detail.homeAddress, Email: data.email });
            resetForm();
            toggleHomeAddress();
            setValidationHomeAddress({})
        }
    };

    const validation4 = (name, value) => {
        switch (name) {
            case 'businessAddress':
                if (!value) {
                    return 'Please Enter Your businessAddress!'
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    };

    const onBusinessAdd = async () => {
        const data = JSON.parse(localStorage.getItem('user'));
        let allErrors4 = {};

        const userData = {
            businessAddress: detail.businessAddress,

        };
        Object.keys(userData).forEach(key => {
            const error4 = validation4(key, userData[key]);
            if (error4 && error4.length) {
                allErrors4[key] = error4
            }
        });
        if (Object.keys(allErrors4).length) {
            return setValidationBussinessAddress(allErrors4)
        } else {
            await create("createBusinessAddress", { businessAddress: detail.businessAddress, Email: data.email });
            resetForm();
            toggleBussinessAddress();
            setValidationHomeAddress({})
        }
    };

    const onGetAddress = (email, key) => {
        getUserAddress(email, (result) => {
            if (result && result.success && result.querySnapshot) {
                let data = {};
                let data2 = [];
                let isAddress = false;
                result.querySnapshot.forEach((doc) => {
                    const d = {
                        id: doc.id,
                        ...doc.data()
                    };
                    data2.push(d)
                    data = doc.data();
                    if (data[key]) {
                        isAddress = true;
                        const data1 = { ...detail };
                        data1.message = data[key]
                        setDetail(data1)
                    }
                });
                SetAddressId(data2)
                if (!isAddress) {
                    key === 'homeAddress' ? toggleHomeAddress() : toggleBussinessAddress()
                }
            }
        })
    };

    const onEmail = () => {
        const data = JSON.parse(localStorage.getItem('user'));
        setDetail({ ...detail, message: data.email })
    };

    const text = 'Are you sure to delete this Message?';
    const text1 = 'Are you sure to delete this Tag?';
    const text2 = 'Are you sure to LogOut?';
    const text3 = 'Are you sure to delete?';
    const text4 = 'Are you sure to Edit this message?';

    const confirmDeleteMessage = () => {
        deleteMessage(deleteId, (result) => {
            if (result && result.success) {
                console.log("Document successfully deleted!");
            } else {
                console.error("Error removing document: ",);
            }
        });
        GetMessage()
    };

    const confirmLogOut = () => {
        logOut()
    };

    const confirmDeleteTag = () => {
        deleteTag(tagId, (result) => {
            if (result && result.success) {
                console.log("Document successfully deleted!");
            } else {
                console.error("Error removing document: ",);
            }
        });
        GetTag()
    };

    const confirmStaticAddress = (id) => {
        deleteHomeAddress(id, (result) => {
            if (result && result.success) {
                console.log("Document successfully deleted!");
            } else {
                console.error("Error removing document: ",);
            }
        });
        GetTag()
        toggleAddTag()
    };

    const confirmEditMessage = () => {
        toggleMessageEditIcon();
        editMessage(editId, (result) => {
            if (result.success) {
                setEditMessageValue(result.doc.data());
            } else {
                console.error("Error removing document: ",);
            }
        });
    };

    const confirmEditTag = () => {
        toggleTagEditIcon();
        editAddress(editId, (result) => {
            if (result.success) {
                setEditAddressValue(result.doc.data());
            } else {
                console.error("Error removing document: ",);
            }
        });
    };

    const logOut = () => {
        localStorage.removeItem("user");
        alert("user log out successfully");
        setUser({});
        window.location.reload()
    };

    const validation5 = (name, value) => {
        switch (name) {
            case 'Message':
                if (!value) {
                    return 'Please input your Display Name!'
                } else {
                    return '';
                }
            case 'MessageValue':
                if (!value) {
                    return 'Please input your Message!'
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const updateMessage = async (editId) => {
        let allErrors5 = {};

        const userData = {
            Message: editMessageValue.Message,
            MessageValue: editMessageValue.MessageValue,
        };

        Object.keys(userData).forEach(key => {
            const error5 = validation5(key, userData[key]);
            if (error5 && error5.length) {
                allErrors5[key] = error5
            }
        });
        if (Object.keys(allErrors5).length) {
            return setValidationEditMessage(allErrors5)
        } else {
            await updateMes(editId, {
                Message: editMessageValue.Message,
                MessageValue: editMessageValue.MessageValue,
            });
            toggleMessageEditIcon();
            toggleCreateIcon();
            GetMessage();
            setValidationEditMessage({})
        }
    };

    const updateMes = (editId, payload) => {
        updateMess(editId, payload, (result) => {
            if (result && result.success && result.documentReference) {
                console.log('document reference ID', result.documentReference.id)
            }
        });
    };

    const validation6 = (name, value) => {
        switch (name) {
            case 'Label':
                if (!value) {
                    return 'Please input your Label!'
                } else {
                    return '';
                }
            case 'Address':
                if (!value) {
                    return 'Please input your Message!'
                } else {
                    return ''
                }
            default: {
                return null;
            }
        }
    };

    const updateAddress = async (editId) => {
        let allErrors6 = {};

        const userData = {
            Label: editAddressValue.Label,
            Address: editAddressValue.Address,
        };

        Object.keys(userData).forEach(key => {
            const error6 = validation6(key, userData[key]);
            if (error6 && error6.length) {
                allErrors6[key] = error6
            }
        });
        if (Object.keys(allErrors6).length) {
            return setValidationEditTag(allErrors6)
        } else {
            await updateAdd(editId, {
                Label: editAddressValue.Label,
                Address: editAddressValue.Address,
            });
            toggleTagEditIcon();
            toggleAdd();
            GetTag();
            setValidationEditTag({})

        }
    };

    const updateAdd = (editId, payload) => {
        updateAddre(editId, payload, (result) => {
            if (result && result.success && result.documentReference) {
                console.log('document reference ID', result.documentReference.id)
            }
        });
    };

    const onPaste = (e) => {
        navigator.clipboard.readText()
            .then(text => {
                setDetail({ ...detail, mobile: text })
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    };

    const isMobileDevice = () => window.innerWidth <= 768;

    return (
        <>
            <Header user={user} text2={text2} confirm={confirmLogOut} />
            <div className="whatsapp all646">
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} style={{ color: "black" }} />
                    <ModalBody>
                        <div className="d-flex justify-content-center w-100">
                            <div className="google-btn">
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" alt=""
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                </div>
                                <p className="btn-text" onClick={onSignIn}><b>Sign in with google</b></p>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <Row className="">
                    <Col md={12} className="container-fluid main-container-1">
                        <div className="site-card-border-less-wrapper add1">
                            <div id="div-gpt-ad-1612775480075-0 text-center" style={{textAlign: "center", marginBottom: "10px", position: 'sticky', top: '10px'}}>
                                <GPT adUnitPath={path}
                                    sizeMapping={sloat}
                                />
                            </div>
                        </div>
                        <div className="mr-3 ml-3">
                            <Row style={{ marginBottom: "10px" }}>
                                <Col md={12}>
                                    <button className="ButtonInput" onClick={(e) => onPaste(e)}>Paste</button>
                                    <PhoneInput name="mobile" inputClass="phoneInput"
                                        country={'in'}
                                        value={detail.mobile}
                                        onChange={(value) => handleChange({
                                            target: {
                                                name: "mobile",
                                                value: value
                                            }
                                        })}
                                        inputStyle={{ color: "white" }}
                                        placeholder="Enter Mobile Number"
                                    />
                                    <span style={{ color: "red" }}>{errors.mobile}</span>
                                </Col>
                            </Row>

                            <div className="fontchange" style={{ borderRadius: 5 }}>
                                <Row>
                                    <Col md={12}>
                                        {!isFocus && <button className="onfontchange"
                                            onClick={fontChange}>Font Change</button>}
                                        <textarea id="message" className="colrad"
                                            style={{
                                                resize: "none",
                                                marginTop: '2px',
                                                textDecoration: font.textDecoration && 'underline',
                                                fontWeight: font.fontWeight && 700,
                                                fontStyle: font.fontStyle && 'italic'
                                            }}
                                            placeholder="Enter Message"
                                            onFocus={() => {
                                                setIsFocus(true)
                                            }}
                                            onBlur={() => {
                                                setIsFocus(false)
                                            }}
                                            name="message"
                                            onChange={handleChange}
                                            value={detail.message}
                                            defaultValue={""} />
                                    </Col>
                                </Row>
                                {isToggle && <div style={{ marginLeft: '10px' }}>
                                    <button className="fontType" onClick={() => {
                                        setFont({ ...font, fontWeight: !font.fontWeight })
                                    }}>Bold
                                    </button>
                                    <button className="fontType" onClick={() => {
                                        setFont({ ...font, fontStyle: !font.fontStyle })
                                    }}>Italic
                                    </button>
                                    <button className="fontType" onClick={() => {
                                        setFont({ ...font, textDecoration: !font.textDecoration })
                                    }}>UnderLine
                                    </button>
                                </div>}
                            </div>
                            <span style={{ color: "red", marginTop: -15 }}>{errors.Message}</span>

                            <Row>
                                <Col md={6} sm={6} xs={6} lg={6} xl={6} style={{ padding: "0px 5px 0px 15px" }}>
                                    <span className="whatsappSend">
                                        <button
                                            className="btn whatsAppButton whatsAppBoth whatsAppDesktop" id="send"
                                            name='WhatsAppDesktop'
                                            onClick={() => {
                                                sendClicked('WhatsAppDesktop')
                                            }}>Send To WhatsApp DeskTop
                            </button>
                                    </span>
                                </Col>
                                <Col md={6} sm={6} xs={6} lg={6} xl={6} style={{ padding: "0px 15px 0px 5px" }}>
                                    <span className="whatsappSend">
                                        <button
                                            className="btn whatsAppButton whatsAppBoth whatsAppWeb" id="send"
                                            name="WhatsAppWeb"
                                            onClick={() => {
                                                sendClicked('WhatsAppWeb')
                                            }}>Send to WhatsApp Web
                            </button>
                                    </span>
                                </Col>
                            </Row>

                            <div style={{ marginTop: 10 }}>
                                <span>
                                    <button className="customBottom fontType" onClick={toggleCreateIcon}>
                                        <i style={{ height: '35px' }}><CreateIcon /></i>
                                    </button>

                                    <Modal isOpen={CreateIconModal} toggle={toggleCreateIcon}>
                                        <ModalHeader toggle={toggleCreateIcon} style={{ color: "black" }}>
                                            <Button type="primary" onClick={toggleAddMessage}>Add Message</Button>
                                        </ModalHeader>
                                        <ModalBody style={{ maxHeight: '150px', overflow: 'auto' }}>
                                            {
                                                messageList.map((value, index) => (
                                                    <button key={index} className="popupButton">{value.Message}
                                                        <Popconfirm placement="bottomLeft" title={text4}
                                                            onConfirm={confirmEditMessage}
                                                            okText="Yes"
                                                            cancelText="No">
                                                            <i style={{ height: '35px' }}
                                                                onClick={() => setEditId(value.id)}><CreateIcon /></i>
                                                        </Popconfirm>
                                                        <Popconfirm placement="bottomLeft" title={text}
                                                            onConfirm={confirmDeleteMessage}
                                                            okText="Yes"
                                                            cancelText="No">
                                                            <i style={{ height: '35px' }}
                                                                onClick={() => setDeleteId(value.id)}><DeleteIcon /></i>
                                                        </Popconfirm>
                                                    </button>
                                                )
                                                )
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={toggleCreateIcon}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={MessageEditIconModal} toggle={toggleMessageEditIcon}>
                                        <ModalHeader toggle={toggleMessageEditIcon} style={{ color: "black" }} />
                                        <ModalBody>
                                            <h6 style={{ color: "black" }}>Display Name</h6>
                                            <input style={{ color: "#ffffff" }} type="text" name="Message"
                                                placeholder="Enter Display Name"
                                                value={editMessageValue.Message}
                                                onChange={updateOnMessage} />
                                            <span style={{ color: "red" }}>{errorsEditMessage.Message}</span><br /><br />
                                            <h6 style={{ color: "black" }}>Message</h6>
                                            <textarea id="tagName"
                                                className="messageTextArea"
                                                onChange={updateOnMessage}
                                                placeholder="Enter Message"
                                                value={editMessageValue.MessageValue}
                                                name="MessageValue"
                                                defaultValue={""} />
                                            <span style={{ color: "red" }}>{errorsEditMessage.MessageValue}</span>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={() => {
                                                updateMessage(editId)
                                            }}>Update</Button>{' '}
                                            <Button color="secondary" onClick={toggleMessageEditIcon}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={AddMessagemodal} toggle={toggleAddMessage}>
                                        <ModalHeader toggle={toggleAddMessage} style={{ color: "black" }} />
                                        <ModalBody>
                                            <h6 style={{ color: "black" }}>Display Name</h6>
                                            <input style={{ color: "#ffffff" }} type="text" name="displayMessageName"
                                                placeholder="Enter Display Name "
                                                onChange={handleOnMessage} />
                                            <span style={{ color: "red" }}>{errorsAddMessage.Name}</span><br /><br />
                                            <h6 style={{ color: "black" }}>Message</h6>
                                            <textarea id="tagName"
                                                className="messageTextArea"
                                                onChange={handleOnMessage}
                                                placeholder="Enter Message"
                                                name="messageValue"
                                                defaultValue={""} />
                                            <span style={{ color: "red" }}>{errorsAddMessage.Message}</span>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onMsg}>Submit</Button>{' '}
                                            <Button color="secondary" onClick={toggleAddMessage}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </span>
                                <button className="fontType"
                                    onClick={() => {
                                        setDetail({ ...detail, message: "Hi" })
                                    }}>Hi
                                </button>
                                <button className="fontType" onClick={() => {
                                    setDetail({ ...detail, message: "Hello" })
                                }}>Hello
                                </button>
                                <button className="fontType" onClick={() => {
                                    setDetail({ ...detail, message: "How are you?" })
                                }}>How r u?
                                </button>
                                <button className="eb eb1 fontType" onClick={() => {
                                    onEmail(loginUser.email)
                                }}>Email
                                </button>
                                {
                                    messageList.map((value, index) => (
                                        <button key={index} className="fontType" onClick={() => {
                                            setDetail({ ...detail, message: value.MessageValue })
                                        }}>{value.Message}
                                        </button>
                                    )
                                    )
                                }
                            </div>

                            <div className=" ">
                                <button className="fontType" onClick={() => onPopUp('homeAddress')}>Home Address
                                </button>
                                <button className="fontType"
                                    onClick={() => onPopUp('businessAddress')}>Bussiness Address
                                </button>
                                {
                                    tagList.map((value, index) => (
                                        <button key={index} className="fontType"

                                            onClick={() => {
                                                setDetail({ ...detail, message: value.Address })
                                            }}>{value.Label}
                                        </button>
                                    )
                                    )
                                }
                                <span>
                                    <button className="fontType" onClick={toggleAdd}>+ Add</button>
                                    <Modal isOpen={AddModal} toggle={toggleAdd}>
                                        <ModalHeader toggle={toggleAdd} style={{ color: "black" }}>
                                            <Button type="primary" onClick={toggleAddTag}>Add Tag</Button>
                                        </ModalHeader>
                                        <ModalBody style={{ maxHeight: '150px', overflow: 'auto' }}>
                                            {
                                                tagList.map((value, index) => (
                                                    <button key={index} className="popupButton">{value.Label}
                                                        <Popconfirm placement="bottomLeft" title={text4}
                                                            onConfirm={confirmEditTag}
                                                            okText="Yes"
                                                            cancelText="No">
                                                            <i style={{ height: '35px' }}
                                                                onClick={() => setEditId(value.id)}><CreateIcon /></i>
                                                        </Popconfirm>
                                                        <Popconfirm placement="bottomLeft" title={text}
                                                            onConfirm={confirmDeleteTag}
                                                            okText="Yes"
                                                            cancelText="No">
                                                            <i style={{ height: '35px' }}
                                                                onClick={() => setTagId(value.id)}><DeleteIcon /></i>
                                                        </Popconfirm>
                                                    </button>
                                                )
                                                )
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={toggleAdd}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={TagEditIconModal} toggle={toggleTagEditIcon}>
                                        <ModalHeader style={{ color: "black" }}>

                                        </ModalHeader>
                                        <ModalBody>
                                            <h6 style={{ color: "black" }}>Label</h6>
                                            <input style={{ color: "#ffffff" }} type="text" name="Label"
                                                placeholder="Enter Your Label Name"
                                                value={editAddressValue.Label}
                                                onChange={updateOnTag} />
                                            <span style={{ color: "red" }}>{errorsEditTag.Label}</span><br /><br />
                                            <h6 style={{ color: "black" }}>Message</h6>
                                            <textarea id="tagName"
                                                className="messageTextArea"
                                                onChange={updateOnTag}
                                                value={editAddressValue.Address}
                                                placeholder="Enter Your Address"
                                                name="Address"
                                                defaultValue={""} />
                                            <span style={{ color: "red" }}>{errorsEditTag.Address}</span><br /><br />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={() => {
                                                updateAddress(editId)
                                            }}>Update</Button>{' '}
                                            <Button color="secondary" onClick={toggleTagEditIcon}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={AddTagModal} toggle={toggleAddTag}>
                                        <ModalHeader toggle={toggleAddTag} style={{ color: "black" }}>
                                            {
                                                Array.isArray(AddressId) && AddressId.map((v, index) => {
                                                    return (
                                                        <>
                                                            <Popconfirm key={index} placement="bottomLeft" title={text3}
                                                                onConfirm={() => confirmStaticAddress(v.id)}
                                                                okText="Yes" cancelText="No">
                                                                {v.homeAddress && (
                                                                    <button className="fontType"
                                                                    >Home
                                                                        Address
                                                                    </button>
                                                                )
                                                                }
                                                            </Popconfirm>
                                                            <Popconfirm key={index} placement="bottomLeft" title={text3}
                                                                onConfirm={() => confirmStaticAddress(v.id)}
                                                                okText="Yes" cancelText="No">
                                                                {
                                                                    v.businessAddress && (
                                                                        <button className="fontType"
                                                                        >Bussiness Address
                                                                        </button>
                                                                    )
                                                                }
                                                            </Popconfirm>

                                                        </>
                                                    )
                                                })
                                            }
                                            {
                                                tagList.map((value, index) => (
                                                    <Popconfirm key={index} placement="bottomLeft" title={text1}
                                                        onConfirm={confirmDeleteTag}
                                                        okText="Yes" cancelText="No">
                                                        <button className="popupButton"
                                                            onClick={() => setTagId(value.id)}>{value.Label}
                                                        </button>
                                                    </Popconfirm>
                                                )
                                                )
                                            }
                                        </ModalHeader>
                                        <ModalBody>
                                            <h6 style={{ color: "black" }}>Label</h6>
                                            <input style={{ color: "#ffffff" }} type="text" name="displayTagName"
                                                placeholder="Enter Your Label Name"
                                                onChange={handleOnTag} />
                                            <span style={{ color: "red" }}>{errorsAddTag.Label}</span><br /><br />
                                            <h6 style={{ color: "black" }}>Message</h6>
                                            <textarea id="tagName"
                                                className="messageTextArea"
                                                onChange={handleOnTag}
                                                placeholder="Enter Your Address"
                                                name="tagValue"
                                                defaultValue={""} />
                                            <span style={{ color: "red" }}>{errorsAddTag.LabelValue}</span><br /><br />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onTag}>Submit</Button>{' '}
                                            <Button color="secondary" onClick={toggleAddTag}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </span>
                                <br />
                            </div>

                            <Modal isOpen={HomeAddressModal} toggle={toggleHomeAddress}>
                                <ModalHeader toggle={toggleHomeAddress} style={{ color: "black" }}>Add
                                    Address</ModalHeader>
                                <ModalBody>
                                    <textarea id="message" className="colrad"
                                        style={{
                                            textDecoration: font.textDecoration && 'underline',
                                            fontWeight: font.fontWeight && 700,
                                            fontStyle: font.fontStyle && 'italic'
                                        }}
                                        placeholder="Enter your Home Address"
                                        onFocus={() => {
                                            setIsFocus(true)
                                        }}
                                        onBlur={() => {
                                            setIsFocus(false)
                                        }}
                                        name="homeAddress"
                                        onChange={handleChange}
                                        value={detail.homeAddress}
                                        defaultValue={""} />
                                    <span style={{ color: "red" }}>{errorsHomeAddress.homeAddress}</span>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={onAddress}>Submit</Button>{' '}
                                    <Button color="secondary" onClick={toggleHomeAddress}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={BussinessAddressModal} toggle={toggleBussinessAddress}>
                                <ModalHeader toggle={toggleBussinessAddress} style={{ color: "black" }}>Add
                                    Address</ModalHeader>
                                <ModalBody>
                                    <textarea id="message" className="colrad"
                                        style={{
                                            textDecoration: font.textDecoration && 'underline',
                                            fontWeight: font.fontWeight && 700,
                                            fontStyle: font.fontStyle && 'italic'
                                        }}
                                        placeholder="Enter your Business Address"
                                        onFocus={() => {
                                            setIsFocus(true)
                                        }}
                                        onBlur={() => {
                                            setIsFocus(false)
                                        }}
                                        name="businessAddress"
                                        onChange={handleChange}
                                        value={detail.businessAddress}
                                        defaultValue={""} />
                                    <span style={{ color: "red" }}>{errorsBussinessAddress.businessAddress}</span>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={onBusinessAdd}>Submit</Button>{' '}
                                    <Button color="secondary" onClick={toggleBussinessAddress}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Divider style={{ color: "white" }}><ArrowDownOutlined /> DOWNLOAD THE
                                APP <ArrowDownOutlined /></Divider>
                            <div className="d-flex justify-content-between">
                                <a href='https://www.microsoft.com/store/apps/9NNZMXGTVRT9' target="_blank"><img
                                    src={img1} height={70} width={70} alt="" /></a>
                                <a href='https://play.google.com/store/apps/details?id=com.whatsapp'
                                    target="_blank"><img src={img2} height={70} width={70} alt="" /></a>
                                <a href='https://apps.apple.com/us/app/whats-direct-chat-and-web/id1481182077'
                                    target="_blank"><img src={img3} height={70} width={70} alt="" /></a>
                            </div>
                            
                            {
                                isMobileDevice() && 
                                <div>
                                    <div id="div-gpt-ad-1612775480075-0 text-center" style={{ textAlign: "center", marginTop: "10px" }}>
                                        <GPT adUnitPath={path}
                                            sizeMapping={sloat}
                                            
                                        />
                                    </div>
                                </div>
                            }

                            <Row>
                                <Col md={12} sm={12} xs={12} lg={12}>
                                    <Tabs defaultActiveKey="1" onChange={callback}>
                                        <TabPane tab="about" key="1">
                                            <div className="tagDiv">
                                                <h1 className="tagFont" style={{fontSize: "25px"}}>
                                                    Whatsapp is one of the most admired andextensively used messaging
                                                    apps.
                                                </h1>
                                                <div className="tagFont">
                                                    In this hi-tech generation, it is impractical to visualize a life
                                                    without WhatsApp.
                                                    It has become a part of our life, anideal mode to bond with your
                                                    family, friends and even clientele.
                                                    Now it’s time of Whatsapp direct chat whichallows individual to send
                                                    Whatsapp message without adding contact number.
                                                </div><br/>
                                                <h2 className="tagFont" style={{fontSize: "20px"}}>
                                                    The annoying part of WhatsApp:
                                                </h2>
                                                <div className="tagFont">
                                                    Whatsapp is one of the most admired andextensively used messaging
                                                    apps. In this hi-tech generation,
                                                    it is impractical to visualize a life without WhatsApp. It has
                                                    become a part of our life, anideal mode to bond with your family,
                                                    friends and even clientele. Now it’s time of Whatsapp direct chat
                                                    whichallows individual to send Whatsapp message without adding
                                                    contact number.
                                                    The annoying part of WhatsApp:Though it comes with a myriad of
                                                    facilities and isupdating regularly one thing that annoys users
                                                    is that youcan only share your content with those who are on
                                                    yourcontact list. There is no other way to share information with
                                                    thosewho are not on
                                                    your contact list.This is a very significant feature that keeps your
                                                    privacyrestricted and does not allow anyone to get access toyour
                                                    status and DP
                                                    but it also creates ruckus as youcannot save everyone’s contact and
                                                    burden your phonewith a long list of users.
                                                </div><br/>
                                                <h2 className="tagFont" style={{fontSize: "20px"}}>
                                                    Whatsdirect:
                                                </h2>
                                                <div className="tagFont">
                                                    To overcome the issue of connecting without saving thenumber of
                                                    contacts we have come up with anunbelievable app Whatsdirect.
                                                    Whatsdirect,
                                                    as the name, says help you in sendingmessages directly to the mobile
                                                    number without evensaving it.
                                                    We can deliver Whatsdirect service with help ofour Whatsapp tool.We
                                                    will not only take care of your privacy issues but alsokeep your
                                                    information secret.
                                                    Direct chat for Whatsappis an immense tool for yourfavourite
                                                    messenger app to propel messages to anynumbers those are not saved
                                                    in your contacts.
                                                    This convenient and free app is considered one of thebest way to
                                                    connect with your family and friends and withthe increasing
                                                    e-commerce market it has a
                                                    lso helpedbusinesses to connect with their customers.
                                                </div><br/>
                                                <h2 className="tagFont" style={{fontSize: "20px"}}>
                                                    How to Find Whatsapp direct chat link?
                                                </h2>
                                                <div className="tagFont">
                                                    Create your own link with a pre-filled message. User willbe
                                                    readdressing to the Whatsapp chat for that number,
                                                    even though the phone is not saved on your device.Whatsapp nearly
                                                    has 2 billion monthly users worldwideand the counting is increasing
                                                    with incredible speed.Whatsapp
                                                    is a cross-platform messaging app that iscompatible with android,
                                                    iOS, windows and even
                                                    blackberry. It allows you to share photos, videos andother
                                                    information with your friends and family.
                                                </div><br/>
                                                <h2 className="tagFont" style={{fontSize: "20px"}}>
                                                    How does Whatsapp direct work?
                                                </h2>
                                                <div className="tagFont">
                                                    Enter a number to which you want to send amessage OR you can also
                                                    select numbers fromrecent calls.Type your text message and tap on
                                                    the send button.This will navigate you to your favourite
                                                    messenger,WhatsApp then a chat window will be created withthe given
                                                    number.
                                                </div><br/>
                                                <h2 className="tagFont" style={{fontSize: "20px"}}>
                                                    How to send Multimedia Messages by WhatsappDirect ?
                                                </h2>
                                                <div className="tagFont">
                                                    Enter a number or select from recent call logs towhich you wish to
                                                    send a message.Tap on 'Send Media'.You will be directed to your
                                                    WhatsApp messengerapp where you can attach any media from there.
                                                    The entered phone number should be a user of WhatsAppotherwise you
                                                    will not be able to connect with thatperson.To know more, check out
                                                    our Whtsappdirect tool.
                                                </div>
                                            </div><br/>
                                        </TabPane>
                                        <TabPane tab="privacy" key="2">
                                            <div className="tagDiv">
                                                <h2 className="tagFont">Privacy</h2>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="privacy" key="3">
                                            <div className="tagDiv">
                                                <h2 className="tagFont">Terms & Conditions</h2>
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                        </div>
                        <div className="site-card-border-less-wrapper add2">
                            {/*<Card title="Card title" >*/}
                            {/*</Card>*/}
                            <div id="div-gpt-ad-1612775480075-0 text-center" style={{textAlign: "center", marginBottom: "10px", position: 'sticky', top: '10px'}}>
                                <GPT adUnitPath={path}
                                    sizeMapping={sloat}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    )
};

export default WhatsApp;