/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import functions = require('firebase-functions');
import admin = require('firebase-admin');
admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate(user => {

  let userName = ""
  if (user.displayName) {
    userName = user.displayName;
  }

  return admin.firestore().collection('Users').doc(user.uid).set({
    name: userName,
    img: user.photoURL,
    role: '',
  });
});

exports.userDeleted = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('Users').doc(user.uid);
  return doc.delete();
});
