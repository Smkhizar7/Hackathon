let allrest, allCusts;
let alert1 = document.getElementById('alert1');
let eError = document.getElementById('e_error');
let pError = document.getElementById('p_error');
let rError = document.getElementById('r_error');
let loginCheck = () => {
    let cUser = localStorage.getItem("Current User");
    if (cUser) {
        let cData = JSON.parse(cUser);
        if (cData.Type == "Restaurant") {
            window.location.href = "./restaurant-panel.html";
        } else {
            window.location.href = "./customer-panel.html";
        }
    } else {
        getData();
    }
}
let getData = () => {
    firebase.database().ref('restaurants').once('value', (data) => {
        allrest = data.val();
        localStorage.setItem('allrest', JSON.stringify(allrest));
    })
    firebase.database().ref('customers').once('value', (data) => {
        allCusts = data.val();
        localStorage.setItem('allCusts', JSON.stringify(allCusts));
    })
}
let validate = (radio, email, password) => {
    let valid = true,
        radioSelected = false;
    eError.innerHTML = "";
    pError.innerHTML = "";
    rError.innerHTML = "";
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radioSelected = true;
        }
    }
    if (!radioSelected) {
        valid = false;
        rError.innerHTML = "Login type is required*";
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
    return valid;
}
let login = () => {
    let type;
    let radio = document.getElementsByName('loginType');
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    alert1.setAttribute("class", "hidden");
    if (validate(radio, email, password)) {
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                type = radio[i].value;
            }
        }
        if (type == "Restaurant") {
            // Sign In With Firebase
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    let userId = user.uid;
                    let data = localStorage.getItem('allrest');
                    let obj = JSON.parse(data);
                    let currentUser = JSON.stringify(obj[userId]);
                    localStorage.setItem("Current User", currentUser);
                    alert1.setAttribute("class", "alert alert-success");
                    alert1.innerHTML = "Sign In Successfully!";
                    setTimeout(() => {
                        window.location.href = "./restaurant-panel.html";
                    }, 2000);
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    alert1.setAttribute("class", "alert alert-danger")
                    alert1.innerHTML = errorMessage;
                });
        } else {
            // Sign In With Firebase
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    let userId = user.uid;
                    let data = localStorage.getItem('allCusts');
                    let obj = JSON.parse(data);
                    let currentUser = JSON.stringify(obj[userId]);
                    localStorage.setItem("Current User", currentUser);
                    alert1.setAttribute("class", "alert alert-success");
                    alert1.innerHTML = "Sign In Successfully!";
                    setTimeout(() => {
                        window.location.href = "./customer-panel.html";
                    }, 2000);
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    alert1.setAttribute("class", "alert alert-danger")
                    alert1.innerHTML = errorMessage;
                });
        }
    }
}