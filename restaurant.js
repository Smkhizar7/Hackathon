let username = document.getElementById('uName');
let tab1 = document.getElementById('Accepted');
let tab2 = document.getElementById('Pending');
let tab3 = document.getElementById('Rejected');
let tab4 = document.getElementById('Delivered');
let link1 = document.getElementById('link1');
let link2 = document.getElementById('link2');
let link3 = document.getElementById('link3');
let nError = document.getElementById('i_n_error');
let pError = document.getElementById('i_p_error');
let cError = document.getElementById('i_c_error');
let iError = document.getElementById('i_img_error');
let dError = document.getElementById('i_delivery_error');
let alert3 = document.getElementById('alert3');
let cUser = localStorage.getItem("Current User");
let cData = JSON.parse(cUser);
username.innerHTML = cData.Restaurant_Name;
let restId = cData.Restaurant_Id;
let products = [];
let orders = [];
let onloaded = () => {
    firebase.database().ref("orders").child(restId).on("child_added", (data) => {
        orders.push(data.val());
        sessionStorage.setItem("Orders", JSON.stringify(orders));
    });
    // For Products
    firebase.database().ref("products").child(restId).on("child_added", (data) => {
        products.push(data.val());
        sessionStorage.setItem("Products", JSON.stringify(products));
    });
    setTimeout(() => {
        pending();
    }, 3000);
}
let accepted = () => {
    tab1.setAttribute("class", "container-fluid body-div div-flow");
    tab2.setAttribute("class", "hidden");
    tab3.setAttribute("class", "hidden");
    tab4.setAttribute("class", "hidden");
    link1.setAttribute("class", "nav-link active");
    link2.setAttribute("class", "nav-link");
    link3.setAttribute("class", "nav-link");
    link4.setAttribute("class", "nav-link");
    let content;
    let i = 1;
    let ordersData = sessionStorage.getItem("Orders");
    let orders = JSON.parse(ordersData);
    content = `<table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Price</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">Order Status</th>
                <th scope="col">View Details</th>
            </tr>
        </thead>
        <tbody>`;
    for (let l = 0; l < orders.length; l++) {
        if (orders[l].Order_Status === "Accepted") {
            content += `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${orders[l].Item_Name}</td>
                        <td>${orders[l].Item_Price}</td>
                        <td>${orders[l].Item_Quantity}</td>
                        <td>${orders[l].Order_Status}</td>
                        <td><button class="btn btn-warning" onclick="viewDetails('${orders[l].Restaurant_Id}','${orders[l].Order_Id}')">View Details</button></td>
                    </tr>`;
            i++;
        };
    }
    content += `</tbody></table>`;
    setTimeout(() => {
        tab1.innerHTML = content;
    }, 2000);
}
let pending = () => {
    tab1.setAttribute("class", "hidden");
    tab3.setAttribute("class", "hidden");
    tab4.setAttribute("class", "hidden");
    tab2.setAttribute("class", "container-fluid body-div div-flow");
    link2.setAttribute("class", "nav-link active");
    link1.setAttribute("class", "nav-link");
    link4.setAttribute("class", "nav-link");
    link3.setAttribute("class", "nav-link");
    statusPending();
}
let rejected = () => {
    tab3.setAttribute("class", "container-fluid body-div div-flow");
    tab1.setAttribute("class", "hidden");
    tab2.setAttribute("class", "hidden");
    tab4.setAttribute("class", "hidden");
    link3.setAttribute("class", "nav-link active");
    link2.setAttribute("class", "nav-link");
    link1.setAttribute("class", "nav-link");
    link4.setAttribute("class", "nav-link");
    let content;
    let i = 1;
    let ordersData = sessionStorage.getItem("Orders");
    let orders = JSON.parse(ordersData);
    content = `<table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Price</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">Order Status</th>
                <th scope="col">View Details</th>
            </tr>
        </thead>
        <tbody>`;
    for (let l = 0; l < orders.length; l++) {
        if (orders[l].Order_Status === "Rejected") {
            content += `
                    <tr>
                        <td scope="row">${i}</td>
                        <td>${orders[l].Item_Name}</td>
                        <td>${orders[l].Item_Price}</td>
                        <td>${orders[l].Item_Quantity}</td>
                        <td>${orders[l].Order_Status}</td>
                        <td><button class="btn btn-warning" onclick="viewDetails('${orders[l].Restaurant_Id}','${orders[l].Order_Id}')">View Details</button></td>
                    </tr>`;
            i++;
        };
    }
    content += `</tbody></table>`;
    setTimeout(() => {
        tab3.innerHTML = content;
    }, 2000);
}
let delivered = () => {
    tab4.setAttribute("class", "container-fluid body-div div-flow");
    tab1.setAttribute("class", "hidden");
    tab2.setAttribute("class", "hidden");
    tab3.setAttribute("class", "hidden");
    link4.setAttribute("class", "nav-link active");
    link2.setAttribute("class", "nav-link");
    link1.setAttribute("class", "nav-link");
    link3.setAttribute("class", "nav-link");
    let content;
    let i = 1;
    let ordersData = sessionStorage.getItem("Orders");
    let orders = JSON.parse(ordersData);
    content = `<table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Price</th>
                <th scope="col">Item Quantity</th>
                <th scope="col">Order Status</th>
                <th scope="col">View Details</th>
            </tr>
        </thead>
        <tbody>`;
    for (let l = 0; l < orders.length; l++) {
        if (orders[l].Order_Status === "Delivered") {
            content += `
                    <tr>
                        <td scope="row">${i}</td>
                        <td>${orders[l].Item_Name}</td>
                        <td>${orders[l].Item_Price}</td>
                        <td>${orders[l].Item_Quantity}</td>
                        <td>${orders[l].Order_Status}</td>
                        <td><button class="btn btn-warning" onclick="viewDetails('${orders[l].Restaurant_Id}','${orders[l].Order_Id}')">View Details</button></td>
                    </tr>`;
            i++;
        };
    }
    content += `</tbody></table>`;
    setTimeout(() => {
        tab4.innerHTML = content;
    }, 2000);
}
let viewDetails = (restId, orderId) => {
    sessionStorage.setItem("Restaurant_Id", restId);
    sessionStorage.setItem("Order_Id", orderId);
    window.location.href = "./Restaurant-Order-Detail.html";
}
let Details = () => {
    let restId = sessionStorage.getItem("Restaurant_Id");
    let orderId = sessionStorage.getItem("Order_Id");
    let div = document.getElementById('order-detail');
    div.innerHTML = `<h1 id="load3" class="loading">Loading...</h1>`;
    let content, rest;
    firebase.database().ref("orders").child(restId).child(orderId).once("value", (data) => {
        rest = data.val();
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
                <td scope="row"><label for="item-action">Change Order Status</label></td>
                <td>
                    <select class="custom-select" id="item-action">
                        <option selected disabled value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <span id="selectError" class="hidden"></span>
                </td>
            </tr>
            <tr>
                <td colspan="2"><button class="btn btn-success" onclick="changeStatus('${rest.Restaurant_Id}','${rest.Order_Id}')">Change Status</button></td>
            </tr>
        </tbody>
        </table>`;
        div.innerHTML = content;
    });
}
let changeStatus = (restId, orderId) => {
    let select = document.getElementById('item-action');
    let error = document.getElementById('selectError');
    let action = null;
    error.setAttribute("class", "hidden");
    for (let i = 0; i < select.length; i++) {
        if (select[i].selected) {
            action = select[i].value;
        }
    }
    if (action == null && action == "") {
        error.setAttribute("class", "error");
        error.innerHTML = "Please select status first *"
    } else {
        firebase.database().ref("orders").child(restId).child(orderId).once("value", (data) => {
            orderData = data.val();
            orderData.Order_Status = action;
            firebase.database().ref("orders").child(restId).child(orderId).set(orderData);
            Details();
        })
    }
}
let addItem = () => {
    let itemName = document.getElementById('item-name').value;
    let itemPrice = document.getElementById('item-price').value;
    let itemCategory = document.getElementById('item-category');
    let itemImage = document.getElementById('item-image').files[0];
    let itemDelivery = document.getElementById('item-delivery-type');
    let deliveryType, Category, valid = true;
    alert3.setAttribute("class", "hidden");
    nError.innerHTML = "";
    pError.innerHTML = "";
    cError.innerHTML = "";
    iError.innerHTML = "";
    dError.innerHTML = "";
    if (itemName == "" || itemName == null) {
        valid = false;
        nError.innerHTML = "Item Name is required*!";
    }
    if (itemPrice == "" || itemPrice == null) {
        valid = false;
        pError.innerHTML = "Item Price is required*!";
    }
    for (let i = 0; i < itemCategory.length; i++) {
        if (itemCategory[i].selected) {
            Category = itemCategory[i].value;
        }
    }
    if (Category == null || Category == "") {
        valid = false;
        cError.innerHTML = "Item Category is required*!";
    }
    if (itemImage == "" || itemImage == null) {
        valid = false;
        iError.innerHTML = "Item Image is required*!";
    }
    for (let i = 0; i < itemDelivery.length; i++) {
        if (itemDelivery[i].selected) {
            deliveryType = itemDelivery[i].value;
        }
    }
    if (deliveryType == "" || deliveryType == null) {
        valid = false;
        dError.innerHTML = "Item Delivery type is required*!";
    }
    if (valid) {
        let userId = cData.Restaurant_Id;
        let productId = firebase.database().ref("products").push().key;
        let imageName = productId + "-" + itemImage.name;
        let storage = firebase.storage().ref("images").child(imageName);
        let imgURL;
        storage.put(itemImage).then((success1) => {
            success1.ref.getDownloadURL().then((success2) => {
                imgURL = success2;
                // let productId = firebase.database().ref("products").push().key;
                let obj = {
                    Item_Name: itemName,
                    Item_Price: itemPrice,
                    Item_Category: Category,
                    Item_Img_Url: imgURL,
                    Delivery_Type: deliveryType,
                    Restaurant_Name: cData.Restaurant_Name,
                    Restaurant_Id: userId,
                    Product_Id: productId
                }
                firebase.database().ref("products").child(userId).child(productId).set(obj);
                alert3.setAttribute("class", "alert alert-success");
                alert3.innerHTML = "Item successfuly added";
            }).catch((err) => {
                alert3.setAttribute("class", "alert alert-danger");
                alert3.innerHTML = err;
            })
        }).catch((err) => {
            alert3.setAttribute("class", "alert alert-danger");
            alert3.innerHTML = err;
        })
    }
}
let product = () => {
    let div = document.getElementById('rest-products');
    div.innerHTML = `<h3 id="load1" class="loading">Loading...</h3>`;
    let productsData = sessionStorage.getItem("Products");
    let products = JSON.parse(productsData);
    let load1 = document.getElementById('load1');
    load1.setAttribute("class", "hidden");
    for (let l = 0; l < products.length; l++) {
        div.innerHTML += `<div class="card card-1" style="width: 18rem;margin:20px;">
        <img src="${products[l].Item_Img_Url}" class="card-img-top" alt="${products[l].Item_Name}">
        <div class="card-body div-flex">
            <h5 class="card-title">Item Name : ${products[l].Item_Name}</h5>
            <p class="card-text">Price : ${products[l].Item_Price}</p>
            <p class="card-text">Category : ${products[l].Item_Category}</p>
            <p class="card-text">Delivery Type : ${products[l].Delivery_Type}</p>
            <a href="javascript:void(0)" class="btn btn-primary" onclick="del('${products[l].Restaurant_Id}','${products[l].Product_Id}')">Delete Item</a>
        </div>
    </div>`;
    }
}
let del = (userId, productId) => {
    firebase.database().ref("products").child(userId).child(productId).remove();
    location.reload();
}
let statusPending = () => {
        let content;
        let i = 1;
        let ordersData = sessionStorage.getItem("Orders");
        let orders = JSON.parse(ordersData);
        content = `<table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">S.NO</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Item Quantity</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">View Details</th>
                        </tr>
                    </thead>
                <tbody>`;
        for (let l = 0; l < orders.length; l++) {
            if (orders[l].Order_Status === "Pending") {
                content += `<tr>
                            <td scope="row">${i}</td>
                            <td>${orders[l].Item_Name}</td>
                            <td>${orders[l].Item_Price}</td>
                            <td>${orders[l].Item_Quantity}</td>
                            <td>${orders[l].Order_Status}</td>
                            <td><button class="btn btn-warning" onclick="viewDetails('${orders[l].Restaurant_Id}','${orders[l].Order_Id}')">View Details</button></td>
                        </tr>`;
                i++;
            }
        }
        content += `</tbody></table>`;
        setTimeout(() => {
            tab2.innerHTML = content;
        }, 2000);
    }
    // let accept = (restId, orderId) => {
    //     let orderData;
    //     console.log(restId, orderId);
    //     firebase.database().ref("orders").child(restId).child(orderId).once("value", (data) => {
    //         orderData = data.val();
    //         orderData.Order_Status = "Accepted";
    //         firebase.database().ref("orders").child(restId).child(orderId).set(orderData);
    //         tab2.innerHTML = `<h1 class="loading">Loading...</h1>`;
    //         statusPending();
    //     })
    // }
    // let reject = (restId, orderId) => {
    //     let orderData;
    //     console.log(restId, orderId);
    //     firebase.database().ref("orders").child(restId).child(orderId).once("value", (data) => {
    //         orderData = data.val();
    //         orderData.Order_Status = "Rejected";
    //         firebase.database().ref("orders").child(restId).child(orderId).set(orderData);
    //         tab2.innerHTML = `<h1 class="loading">Loading...</h1>`;
    //         statusPending();
    //     })
    // }
function signOut() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        localStorage.removeItem("Current User");
        sessionStorage.removeItem("Orders");
        sessionStorage.removeItem("Products");
        sessionStorage.removeItem("Restaurant_Id");
        sessionStorage.removeItem("Order_Id");
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