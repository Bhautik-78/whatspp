import {db} from '../firebase'

const usersDb = db.collection("users");

const MessageDb = db.collection('messages');

const tagsDb = db.collection('Tags');

const data = JSON.parse(localStorage.getItem('user'));

export const createUserMessage = async (payload, callback) => {
    usersDb.add(payload)
        .then(() =>{
            callback({success: true})
        }).catch(function (error) {
        callback({success: false, message: "something went wrong"})
    });
};

export const createBusinessAddress = async (payload, callback) => {
    usersDb.add(payload)
        .then(() =>{
            callback({success: true})
        }).catch(function (error) {
        callback({success: false, message: "something went wrong"})
    });
};

export const getUserAddress = async  (email,callback) => {
    usersDb.where("Email", "==", email)
        .get()
        .then((querySnapshot) => {
            callback({success: true, querySnapshot});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};

export const createMessage = async  (payload,callback) => {
    MessageDb.add(payload)
        .then(async documentReference => {
            callback({success: true, documentReference});
        })
        .catch(error => {
            console.log(error.message)
        })
};

export const creatTag = async  (payload,callback) => {
    tagsDb.add(payload)
        .then(async documentReference => {
            callback({success: true, documentReference});
        })
        .catch(error => {
            console.log(error.message)
        })
};

export const deleteMessage = async (deleteId,callback) => {
    MessageDb.doc(deleteId).delete().then(function () {
        callback({success: true})
    }).catch(function () {
        callback({success: false, message: "something went wrong"})
    });
};

export const editMessage = async (editId,callback) => {
    MessageDb.doc(editId)
        .get()
        .then((doc) => {
            callback({success: true, doc});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};

export const editAddress = async (editId,callback) => {
    tagsDb.doc(editId)
        .get()
        .then((doc) => {
            callback({success: true, doc});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};

export const deleteTag = async (tagId,callback) => {
    tagsDb.doc(tagId).delete().then(function () {
        callback({success: true})
    }).catch(function () {
        callback({success: false, message: "something went wrong"})
    });
};

export const deleteHomeAddress = async (AddressId,callback) => {
    usersDb.doc(AddressId).delete().then(function () {
        callback({success: true})
    }).catch(function () {
        callback({success: false, message: "something went wrong"})
    });
};

export const deleteBussinessAddress = async (AddressId,callback) => {
    usersDb.doc(AddressId).delete().then(function () {
        callback({success: true})
    }).catch(function () {
        callback({success: false, message: "something went wrong"})
    });
};

export const getMessage = async (callback) =>{
    MessageDb.where("Email", "==", data.email).get()
        .then((querySnapshot) => {
            callback({success: true, querySnapshot});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};

export const  getTag = async (callback) =>{
    tagsDb.where("Email", "==", data.email).get()
        .then((querySnapshot) => {
            callback({success: true, querySnapshot});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};

export const updateMess = async (editId,payload, callback) => {
    MessageDb.doc(editId).update({
        Message: payload.Message,
        MessageValue: payload.MessageValue
    })
        .then((querySnapshot) => {
            callback({success: true, querySnapshot});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};

export const updateAddre = async (editId,payload, callback) => {
    tagsDb.doc(editId).update({
        Label: payload.Label,
        Address: payload.Address
    })
        .then((querySnapshot) => {
            callback({success: true, querySnapshot});
        })
        .catch(function (error) {
            console.log("Error getting:", error);
        });
};


