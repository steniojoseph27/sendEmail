// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCaEyW9Lvkk3wENiZu_qd41MXCHxanRUr8",
  authDomain: "test-form-3a094.firebaseapp.com",
  projectId: "test-form-3a094",
  storageBucket: "test-form-3a094.appspot.com",
  messagingSenderId: "744730239950",
  appId: "1:744730239950:web:7c72415978a9aa43d3019f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
  // Refernece contactInfo collections
  let contactInfo = firebase.database().ref("infos");
  
  // Listen for a submit
  document.querySelector(".contact-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    //   Get input Values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;
  
    saveContactInfo(name, email, message);
  
    document.querySelector(".contact-form").reset();

    sendEmail(name, email, message);
  }
  
  // Save infos to Firebase
  function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();
  
    newContactInfo.set({
      name: name,
      email: email,
      message: message,
    });

    retrieveInfos();
  }

  // Retrieve Infos
  function retrieveInfos() {
    let ref = firebase.database().ref("infos");
    ref.on("value", gotData);
  }

  function gotData(data) {
    let info = data.val();
    let keys = Object.keys(info);

    for (let i = 0; i < keys.length; i++) {
      let infoData = keys[i];
      let name = info[infoData].name;
      let email = info[infoData].email;
      let message = info[infoData].message;
      console.log(name, email, message);

      let infosResults = document.querySelector(".infosResults");

      infosResults.innerHTML += `<div>
      <p><strong>Name: </strong> ${name} <br></br>
      <a><strong>Email: </strong> ${email}</a> <br></br>
      <a><strong>Message: </strong> ${message}</a>
      </p>
    </div>`;
    }
  }

  retrieveInfos();

  // Send Email Info
  function sendEmail(name, email, message) {
    Email
    .send({
      Host: "smtp.gmail.com",
      Username: "ursel.ellis87@gmail.com",
      Password: "utebgfrosrzivwyq",
      To: "ursel.ellis87@gmail.com",
      From: `${email}`,
      Subject: `${name} send you a message`,
      Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
    })
    .then((message) => alert("mail send successfully."))
  }