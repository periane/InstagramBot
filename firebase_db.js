const firebase = require('firebase-admin');
const config = require('./config/db_config.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://instagrambot-8a149.firebaseio.com"
  });

let database = firebase.database();
let addFollow = async() =>{
    return database.put({_id: username, added: new Date().getTime()});
};


module.exports = addFollow;
