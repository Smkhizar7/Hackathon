let alert1 = document.getElementById('alert1');
let alert2 = document.getElementById('alert2');
let resError = document.getElementById('res_error');
let eError = document.getElementById('e_error');
let pError = document.getElementById('p_error');
let cityError = document.getElementById('city_error');
let conError = document.getElementById('con_error');
let nameError = document.getElementById('name_error');
let cEError = document.getElementById('cust_e_error');
let cPError = document.getElementById('cust_p_error');
let cPhoneError = document.getElementById('cust_phone_error');
let cCityError = document.getElementById('cust_city_error');
let cConError = document.getElementById('cust_con_error');
let restValidate = (name, email, password, city, country) => {
    let valid = true;
    resError.innerHTML = "";
    eError.innerHTML = "";
    pError.innerHTML = "";
    cityError.innerHTML = "";
    conError.innerHTML = "";
    if (name == "" || name == null) {
        valid = false;
        resError.innerHTML = "Restaurant name is required*!"
    }
    if (email == "" || email == null) {
        valid = false;
        eError.innerHTML = "Email address is required!";
    } else if (email.lastIndexOf("@") == -1) {
        valid = false;
        eError.innerHTML = "Email should have aleast one @ character!";
    } else if (email.lastIndexOf(".") == -1) {
        valid = false;
        eError.innerHTML = "Email should have aleast one '.' dot character!";
    } else if (email.lastIndexOf("@") >= email.lastIndexOf(".") - 3) {
        valid = false;
        eError.innerHTML = "'.' should be placed after 3 character of '@'!";
    } else if (email.lastIndexOf("@") < 3) {
        valid = false;
        eError.innerHTML = "'@' should be placed after 3 character from staring!";
    } else if (email.lastIndexOf(".") > email.length - 3) {
        valid = false;
        eError.innerHTML = "'.' should be placed before 2 character from ending!";
    }
    if (password == null || password == "") {
        valid = false;
        pError.innerHTML = "Password is required*!";
    } else if (password.length < 8) {
        valid = false;
        pError.innerHTML = "Password should be atleast 8 characters long!";
    }
    if (city == "" || city == null) {
        valid = false;
        cityError.innerHTML = "City name is required*!"
    }
    if (country == "" || country == null) {
        valid = false;
        conError.innerHTML = "Country name is required*!"
    }
    return valid;
}
let restSignUp = () => {
    let name = document.getElementById('rest-name').value;
    let email = document.getElementById('rest-email').value;
    let password = document.getElementById('rest-password').value;
    let city = document.getElementById('rest-city').value;
    let country = document.getElementById('rest-country').value;
    alert1.setAttribute("class", "hidden");
    if (restValidate(name, email, password, city, country)) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                let userId = user.uid;
                let obj = {
                    Restaurant_Name: name,
                    Email: email,
                    Password: password,
                    Type: "Restaurant",
                    City: city,
                    Country: country,
                    Restaurant_Id: userId
                }
                firebase.database().ref('restaurants').child(userId).set(obj);
                alert1.setAttribute("class", "alert alert-success");
                alert1.innerHTML = "Sign Up Successfully!";
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 2000);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert1.setAttribute("class", "alert alert-danger");
                alert1.innerHTML = errorMessage;
            });
    }
}
let custValidate = (name, email, password, phone, city, country) => {
    let valid = true;
    nameError.innerHTML = "";
    cEError.innerHTML = "";
    cPError.innerHTML = "";
    cPhoneError.innerHTML = "";
    cCityError.innerHTML = "";
    cConError.innerHTML = "";
    if (name == "" || name == null) {
        valid = false;
        nameError.innerHTML = "Restaurant name is required*!"
    }
    if (email == "" || email == null) {
        valid = false;
        cEError.innerHTML = "Email address is required!";
    } else if (email.lastIndexOf("@") == -1) {
        valid = false;
        cEError.innerHTML = "Email should have aleast one @ character!";
    } else if (email.lastIndexOf(".") == -1) {
        valid = false;
        cEError.innerHTML = "Email should have aleast one '.' dot character!";
    } else if (email.lastIndexOf("@") >= email.lastIndexOf(".") - 3) {
        valid = false;
        cEError.innerHTML = "'.' should be placed after 3 character of '@'!";
    } else if (email.lastIndexOf("@") < 3) {
        valid = false;
        cEError.innerHTML = "'@' should be placed after 3 character from staring!";
    } else if (email.lastIndexOf(".") > email.length - 3) {
        valid = false;
        cEError.innerHTML = "'.' should be placed before 2 character from ending!";
    }
    if (password == null || password == "") {
        valid = false;
        cPError.innerHTML = "Password is required*!";
    } else if (password.length < 8) {
        valid = false;
        cPError.innerHTML = "Password should be atleast 8 characters long!";
    }
    if (phone == "" || phone == null) {
        valid = false;
        cPhoneError.innerHTML = "City name is required*!"
    }
    if (city == "" || city == null) {
        valid = false;
        cCityError.innerHTML = "City name is required*!"
    }
    if (country == "" || country == null) {
        valid = false;
        cConError.innerHTML = "Country name is required*!"
    }
    return valid;
}
let custSignUp = () => {
    let name = document.getElementById('cust-name').value;
    let email = document.getElementById('cust-email').value;
    let password = document.getElementById('cust-password').value;
    let phone = document.getElementById('cust-phone').value;
    let city = document.getElementById('cust-city').value;
    let country = document.getElementById('cust-country').value;
    alert2.setAttribute("class", "hidden");
    if (custValidate(name, email, password, phone, city, country)) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                let userId = user.uid;
                let obj = {
                    User_Name: name,
                    Email: email,
                    Password: password,
                    Phone_No: phone,
                    Type: "Customer",
                    City: city,
                    Country: country,
                    User_Id: userId
                }
                firebase.database().ref('customers').child(userId).set(obj);
                alert2.setAttribute("class", "alert alert-success");
                alert2.innerHTML = "Sign Up Successfully!";
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 2000);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert2.setAttribute("class", "alert alert-danger");
                alert2.innerHTML = errorMessage;
            });
    }
}

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            userId = user.uid;
            let cData = localStorage.getItem("Current User");
            let cUser = JSON.parse(cData);
            let type = cUser.Type;
            if (type == "Customer") {
                window.location.href = "./customer-panel.html";
            } else {
                window.location.href = "./restaurant-panel.html";
            }
        } else {
            window.location.href = "./index.html";
        }
    });
    // [END auth_state_listener]
}
authStateListener();