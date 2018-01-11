// Inicializando Firebase
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);

const db = firebase.firestore()

const name = document.querySelector("#name"),
      email = document.querySelector("#email"),
      message = document.querySelector("#message")
const send = document.querySelector("#send")

send.addEventListener('click', registerAndSendEmail)

function registerAndSendEmail() {

  let data = {
    name: name.value,
    email: email.value,
    message: message.value
  }


  db.collection('messages').add(data)
  .then((docRef) => {
    console.log(`Documento Guardado con ID: ${docRef.id}`)
    swal({
      title: "Gracias por Comunicarte",
      text: "Pronto me estare comunicando...",
      icon: "success",
      button: "Nos Vemos!",
    })
  })
  .catch((error) => {
    console.log(error)
    swal({
      title: "Disculpa no llego tu mensaje",
      text: "Pero puedes llamarme :)",
      icon: "error",
      button: "Algo Paso ahora lo veo",
    })
  })

  name.value = ""
  email.value = ""
  message.value = ""
}





