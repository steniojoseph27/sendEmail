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
    console.log(name, email, message);
  
    saveContactInfo(name, email, message);
  
    document.querySelector(".contact-form").reset();
  }
  
  // Save infos to Firebase
  function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();
  
    newContactInfo.set({
      name: name,
      email: email,
      message: message,
    });
  }

  // Retrieve Infos
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);

  function gotData(data) {
    let info = data.val();
    let keys = Object.keys(info);

    for (let i = 0; i < keys.length; i++) {
      let i = keys[i]
      let name = info[i].name
      let email = info[i].email
      let message = info[i].message
      console.log(name, email, message);
    }
  }