const functions = require('firebase-functions');
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase)
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

exports.sendEmailInformation = functions.firestore.document('messages/{messagesId}').onCreate(event => {
  const val = event.data.data()

  const mailOptions = {
    from: '"Joseph Ospina." <noreply@firebase.com>',
    to: 'josh.999126@gmail.com',
    subject: 'Informacion de Contacto',
    text: `Datos del contacto: 
            Nombre: ${val.name}
            Email: ${val.email}
            Mensaje: ${val.message}`
  }

  return mailTransport.sendMail(mailOptions)
    .then(() => console.log('Email Sent'))
    .catch( error => console.log(error))

})