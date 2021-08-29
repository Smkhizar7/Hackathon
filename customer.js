let cData = localStorage.getItem("Current User");
let cUser = JSON.parse(cData);
// let userId = cUser.User_Id;
let userId;
let username = document.getElementById('uName');
username.innerHTML = cUser.User_Name;
let getRest = () => {
    let allData;
    let div = document.getElementById("content");
    div.innerHTML = `<h3 id="load1" class="loading">Loading...</h3>`;
    firebase.database().ref('restaurants').on('child_added', (data) => {
        allData = data.val();
        load1.setAttribute("class", "hidden");
        div.innerHTML += `<div class="card rest-card-div" onclick="move('${allData.Restaurant_Id}')">
        <h3 class="card-text h3">${allData.Restaurant_Name}</h3>
    </div>`;
    })
}
let move = (restId) => {
    localStorage.setItem("Restaurant_Id", restId);
    window.location.href = "./restaurant-page.html";
}
let products = () => {
    let restId = localStorage.getItem("Restaurant_Id");
    let productContent, i = 1;
    let div = document.getElementById('rest-content');
    div.innerHTML = `<h1 id="load2" class="loading">Loading...</h1>`;
    firebase.database().ref('products').child(restId).on('child_added', (data) => {
        productContent = data.val();
        load2.setAttribute("class", "hidden");
        div.innerHTML += `<div class="card" style="width: 18rem;margin:20px;">
        <img src="${productContent.Item_Img_Url}" class="card-img-top" alt="${productContent.Item_Name}">
        <div class="card-body div-flex">
            <h5 class="card-title">Item Name : ${productContent.Item_Name}</h5>
            <p class="card-text">Price : ${productContent.Item_Price}</p>
            <p class="card-text">Category : ${productContent.Item_Category}</p>
            <p class="card-text">Delivery Type : ${productContent.Delivery_Type}</p>
            <p class="card-text">Item Quantity : <input type="number" id="qty${i}" value="1"></p>
            <a href="javascript:void(0)" class="btn btn-primary" onclick="addToCart('${productContent.Restaurant_Id}','${productContent.Restaurant_Name}','${productContent.Product_Id}','${productContent.Item_Img_Url}','${productContent.Item_Name}','${productContent.Item_Price}','qty${i}','${productContent.Item_Category}','${productContent.Delivery_Type}')">Add to Cart</a>
        </div>
    </div>`;
        i++;
    })
}
let addToCart = (restId, restName, productId, itemImg, itemName, itemPrice, itemQty, itemCategory, itemDelivery) => {
    let alert4 = document.getElementById('alert4');
    let qty = document.getElementById(itemQty);
    alert4.setAttribute("class", "hidden");
    let cartItems = [];
    let cartData = sessionStorage.getItem("Cart");
    if (cartData != null && cartData != "") {
        let cart = JSON.parse(cartData);
        cartItems = cart;
    }
    let find = cartItems.filter((data) => data.Product_Id == productId);
    // let key = firebase.database().ref("orders").child(restId).push().key;
    if (find.length != 0) {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].Product_Id == productId) {
                qty1 = cartItems[i].Item_Quantity;
                cartItems[i].Item_Quantity = (Number(qty1) + Number(qty.value));
            }
        }
    } else {
        let obj = {
            Restaurant_Id: restId,
            Restaurant_Name: restName,
            Product_Id: productId,
            Customer_Id: userId,
            Item_Image_URL: itemImg,
            Item_Name: itemName,
            Item_Price: itemPrice,
            Item_Category: itemCategory,
            Item_Delivery_Type: itemDelivery,
            Item_Quantity: qty.value,
            Order_Status: "Pending"
        };
        cartItems.push(obj);
    }
    sessionStorage.setItem("Cart", JSON.stringify(cartItems));
    // firebase.database().ref("orders").child(restId).child(key).set(obj);
    alert4.setAttribute("class", "alert alert-success");
    qty.value = "1";
    setTimeout(() => {
        alert4.setAttribute("class", "hidden");
    }, 2000);
}
let cartView = () => {
    let cartItems = [];
    let cartData = sessionStorage.getItem("Cart");
    if (cartData != null && cartData != "") {
        let cart = JSON.parse(cartData);
        cartItems = cart;
    }
    let content;
    let div = document.getElementById('cart-content');
    div.innerHTML = `<h1 id="load2" class="loading">Loading...</h1>`;
    setTimeout(() => {
        load2.setAttribute("class", "hidden");
        content = `<br><table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">S.NO</th>
                    <th scope="col">Item Image</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Item Price</th>
                    <th scope="col">Item Quantity</th>
                    <th scope="col">Item Category</th>
                    <th scope="col">Delivery Type</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>`;
        let i = 1;
        for (let k = 0; k < cartItems.length; k++) {
            content += `<tr>
                    <td scope="col">${i}</td>
                    <td scope="col"><img src="${cartItems[k].Item_Image_URL}" width="100px"></td>
                    <td scope="col">${cartItems[k].Item_Name}</td>
                    <td scope="col">${cartItems[k].Item_Price}</td>
                    <td scope="col">${cartItems[k].Item_Quantity}</td>
                    <td scope="col">${cartItems[k].Item_Category}</td>
                    <td scope="col">${cartItems[k].Item_Delivery_Type}</td>
                    <td scope="col"><button class="btn btn-danger" onclick="remove('${k}')">Remove</button></th>
                </tr>`;
            i++;
        }
        content += `</tbody></table>
            <div>
                <button onclick="ordered()" class="btn btn-success">Order All</button>
                <button onclick="removeAll()" class="btn btn-danger">Remove All</button>
            </div>`;
        div.innerHTML = content;
    }, 2000);
}
let remove = (k) => {
    let cartItems = [];
    let cartData = sessionStorage.getItem("Cart");
    if (cartData != null && cartData != "") {
        let cart = JSON.parse(cartData);
        cartItems = cart;
    }
    cartItems.splice(k, 1);
    sessionStorage.setItem("Cart", JSON.stringify(cartItems));
    cartView();
}
let removeAll = () => {
    sessionStorage.removeItem("Cart");
    cartView();
}
let ordered = () => {
    let cartItems = [];
    let cartData = sessionStorage.getItem("Cart");
    if (cartData != null && cartData != "") {
        let cart = JSON.parse(cartData);
        cartItems = cart;
    }
    for (let k = 0; k < cartItems.length; k++) {
        let obj = cartItems[k];
        let restId = obj.Restaurant_Id;
        let key = firebase.database().ref("orders").child(restId).push().key;
        let obj2 = {
            ...obj,
            Order_Id: key,
        }
        firebase.database().ref("orders").child(restId).child(key).set(obj2);
    }
    sessionStorage.removeItem("Cart");
    cartView();
    // let alert5 = document.getElementById('alert5');
    // alert5.setAttribute("class", "hidden");
    // let key = firebase.database().ref("orders").child(restId).push().key;
    // let obj = {
    //     Restaurant_Id: restId,
    //     Product_Id: productId,
    //     Customer_Id: userId,
    //     Item_Name: itemName,
    //     Item_Price: itemPrice,
    //     Item_Category: itemCategory,
    //     Item_Delivery_Type: itemDelivery,
    //     Order_Id: key,
    //     Order_Status: "Pending"
    // };
    // firebase.database().ref("orders").child(restId).child(key).set(obj);
    // alert5.setAttribute("class", "alert alert-success");
}
let order = () => {
    let rest;
    let div = document.getElementById('cust-orders');
    div.innerHTML = `<h1 id="load3" class="loading">Loading...</h1>`;
    let content;
    let i = 1;
    content = `<table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Item Image</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Price</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">View Details</th>
            </tr>
        </thead>
        <tbody>`;
    firebase.database().ref("orders").on("child_added", (data) => {
        rest = data.val();
        for (let key in rest) {
            if (rest[key].Customer_Id == userId) {
                content += `<tr>
                            <td scope="row">${i}</td>
                            <td><img src="${rest[key].Item_Image_URL}" width="100px"></td>
                            <td>${rest[key].Item_Name}</td>
                            <td>${rest[key].Item_Price}</td>
                            <td>${rest[key].Item_Quantity}</td>
                            <td scope="col"><button class="btn btn-warning" onclick="viewDetails('${rest[key].Restaurant_Id}','${rest[key].Order_Id}')">View Details</button></td>
                        </tr>`;
                i++;
            }
        }
    });
    setTimeout(() => {
        content += `</tbody></table>`;
        div.innerHTML = content;
    }, 5000);
}
let viewDetails = (restId, orderId) => {
    sessionStorage.setItem("Restaurant_Id", restId);
    sessionStorage.setItem("Order_Id", orderId);
    window.location.href = "./orderDetail.html";
}
let Details = () => {
    let restId = sessionStorage.getItem("Restaurant_Id");
    let orderId = sessionStorage.getItem("Order_Id");
    let div = document.getElementById('order-detail');
    div.innerHTML = `<h1 id="load3" class="loading">Loading...</h1>`;
    let content, rest;
    firebase.database().ref("orders").child(restId).child(orderId).once("value", (data) => {
        rest = data.val();
    });
    setTimeout(() => {
        content = `<br><table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Item Image</td>
            <td><img src="${rest.Item_Image_URL}"</td>
            </tr>
            <tr>
                <td scope="row">Item Name</td>
                <td>${rest.Item_Name}</td>
            </tr>
            <tr>
                <td scope="row">Item Price</td>
                <td>${rest.Item_Price}</td>
            </tr>
            <tr>
                <td scope="row">Item Quantity</td>
                <td>${rest.Item_Quantity}</td>
            </tr>
            <tr>
                <td scope="row">Item Category</td>
                <td>${rest.Item_Category}</td>
            </tr>
            <tr>
                <td scope="row">Delivery Type</td>
                <td>${rest.Item_Delivery_Type}</td>
            </tr>
            <tr>
                <td scope="row">Order Id</td>
                <td>${rest.Order_Id}</td>
            </tr>
            <tr>
                <td scope="row">Product Id</td>
                <td>${rest.Product_Id}</td>
            </tr>
            <tr>
                <td scope="row">Restaurant Name</td>
                <td>${rest.Restaurant_Name}</td>
            </tr>
            <tr>
                <td scope="row">Restaurant Id</td>
                <td>${rest.Restaurant_Id}</td>
            </tr>
            <tr>
                <td scope="row">Order Status</td>
                <td>${rest.Order_Status}</td>
            </tr>
            <tr>
                <td scope="row" colspan="2"><button class="btn btn-danger" onclick="removeOrder('${rest.Restaurant_Id}','${rest.Order_Id}')">Remove Order</button></td>
            </tr>
        </tbody>
        </table>`;
        div.innerHTML = content;
    }, 5000);
}
let removeOrder = (restId, orderId) => {
    firebase.database().ref("orders").child(restId).child(orderId).remove();
    window.location.href = "./cust-order.html";
}

function signOut() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        localStorage.removeItem("Current User");
        localStorage.removeItem("Restaurant_Id");
        sessionStorage.removeItem("Order_Id");
        sessionStorage.removeItem("Restaurant_Id");
        sessionStorage.removeItem("Cart");
    }).catch((error) => {
        alert(error);
    });
    // [END auth_sign_out]
}

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            userId = user.uid;
        } else {
            window.location.href = "./index.html";
        }
    });
    // [END auth_state_listener]
}
authStateListener();