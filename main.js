function userDetection() {
  let username = document.getElementById("usernameText");
  let password = document.getElementById("passwordText");
  let error = document.getElementById("errorLabel");
  let count = 0;
  if (username.value !== "" && password.value !== "") {
    for (var key in users) {
      if (key === username.value) {
        if (users[key].password === password.value) {
          for (var keys in users[key]) {
            localStorage.setItem(keys, users[key][keys]);
          }
          delete localStorage.password;
          console.log(localStorage);
          document.getElementById("login").style.display = "none";
          document.getElementById("account").style.display = "block";
          configureUserPage();
          document.getElementById("welcomeUser").innerText =
            "Welcome " + localStorage.fullName;
          username.value = "";
          password.value = "";
        } else {
          error.value = "Password Incorrect.";
          password.value = "";
        }
      } else {
        count++;
      }
    }
    if (count === Object.keys(users).length) {
      error.value = "Username Does Not Exist";
      username.value = "";
      password.value = "";
    }
  } else {
    error.value = "Please fill in the two inputs.";
  }
}
function clearError() {
  let error = document.getElementById("errorLabel");
  error.value = "";
}
function signUpDirect() {
  window.open("./signup.html", "_self");
}
function logInDirect() {
  window.open("./access.html", "_self");
}
function logout() {
  localStorage.clear();
  window.open("./home.html", "_self");
}
function createUser() {
  let username = document.getElementById("usernameText");
  let password = document.getElementById("passwordText");
  let email = document.getElementById("emailText");
  let phone = document.getElementById("phoneText");
  let error = document.getElementById("errorLabel");
  if (
    username.value !== "" &&
    password.value !== "" &&
    email.value !== "" &&
    phone.value !== ""
  ) {
    let count = 0;
    for (var key in users) {
      if (key === username.value) {
        error.value = "Username Already Exists!";
      } else if (users[key].email === email.value) {
        error.value = "E-mail Already Exists!";
      } else if (users[key].phoneNumber === phone.value) {
        error.value = "Phone Number is already Used!";
      } else {
        count++;
      }
    }
    if (count === Object.keys(users).length) {
      currentUser = username.value;
      window.open("./account.html", "_self");
    }
  } else {
    error.value = "Please Fill All The Inputs.";
  }
}
function renderList(list) {
  for (var key in list) {
    if (key !== "ADMIN") {
      var outerDiv = document.createElement("div");
      var circleDiv = document.createElement("div");
      circleDiv.className = "circles";
      var right = document.createElement("div");
      var pTag = document.createElement("p");
      var text = document.createTextNode(key);
      right.className = "right";
      pTag.id = key;
      pTag.className = "studentsNames";
      pTag.appendChild(text);
      right.appendChild(pTag);
      outerDiv.appendChild(circleDiv);
      outerDiv.appendChild(right);
      document.getElementById("students").appendChild(outerDiv);
      var student = document.getElementById(key);
      student.addEventListener("click", (e) => {
        showProfile(e.target.id);
      });
    }
  }
}
function showProfile(arg) {
  let profile = document.getElementById("details");
  profile.innerText = "";
  profile.append(`${users[arg].fullName}`);
}
function configureUserPage() {
  if (Object.keys(localStorage).length > 0) {
    renderList(users);
    document.getElementById("welcomeUser").innerText =
      "Welcome " + localStorage.fullName;
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("account").style.display = "none";
  }
}
