let username = document.getElementById('uName');
let tab1 = document.getElementById('Accepted');
let tab2 = document.getElementById('Pending');
let tab3 = document.getElementById('Rejected');
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
let accepted = () => {
    tab1.setAttribute("class", "");
    tab2.setAttribute("class", "hidden");
    tab3.setAttribute("class", "hidden");
    link1.setAttribute("class", "nav-link active");
    link2.setAttribute("class", "nav-link");
    link3.setAttribute("class", "nav-link");
    status("Accepted")
}
let pending = () => {
    tab1.setAttribute("class", "hidden");
    tab3.setAttribute("class", "hidden");
    tab2.setAttribute("class", "");
    link2.setAttribute("class", "nav-link active");
    link1.setAttribute("class", "nav-link");
    link3.setAttribute("class", "nav-link");
    status("Pending");
}
let rejected = () => {
    tab3.setAttribute("class", "");
    tab1.setAttribute("class", "hidden");
    tab2.setAttribute("class", "hidden");
    link3.setAttribute("class", "nav-link active");
    link2.setAttribute("class", "nav-link");
    link1.setAttribute("class", "nav-link");
    status("Rejected");
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
        let imageName = itemImage.name;
        let storage = firebase.storage().ref("images").child(imageName);
        let imgURL;
        storage.put(itemImage).then((success1) => {
            success1.ref.getDownloadURL().then((success2) => {
                imgURL = success2;
                let productId = firebase.database().ref("products").push().key;
                let obj = {
                    Item_Name: itemName,
                    Item_Price: itemPrice,
                    Item_Category: Category,
                    Item_Img_Url: imgURL,
                    Delivery_Type: deliveryType,
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
let products = () => {
    let div = document.getElementById('rest-products');
    div.innerHTML = `<h3 id="load" class="loading">Loading...</h3>`;
    let content;
    let userId = cData.Restaurant_Id;
    let ok = firebase.database().ref("products").child(userId).on("child_added", (data) => {
        content = data.val();
        load.setAttribute("class", "hidden");
        div.innerHTML += `<div class="card" style="width: 18rem;margin:20px;">
            <img src="${content.Item_Img_Url}" class="card-img-top" alt="${content.Item_Name}">
            <div class="card-body div-flex">
                <h5 class="card-title">Item Name : ${content.Item_Name}</h5>
                <p class="card-text">Price : ${content.Item_Price}</p>
                <p class="card-text">Category : ${content.Item_Category}</p>
                <p class="card-text">Delivery Type : ${content.Delivery_Type}</p>
                <a href="javascript:void(0)" class="btn btn-primary" onclick="del('${content.Restaurant_Id}','${content.Product_Id}')">Delete Item</a>
            </div>
        </div>`;
    });
}
let del = (userId, productId) => {
    firebase.database().ref("products").child(userId).child(productId).remove();
    products();
}
let status = (typeName) => {
    let orders = [];
    let div = document.getElementById(typeName);
    div.innerHTML = "";
    let content;
    let i = 1;
    let pendingOrders = [];
    firebase.database().ref("orders").on("child_added", (data) => {
        orders.push(data.val());
    });
    setTimeout(() => {
        for (let l = 0; l < orders.length; l++) {
            for (let key in orders[l]) {
                if (orders[l][key].Order_Status == typeName) {
                    pendingOrders.push(orders[l][key]);
                };
            }
        }
        content = `<table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th scope="col">S.NO</th>
                <th scope="col">Item Name</th>
                <th scope="col">Item Price</th>
                <th scope="col">Item Category</th>
                <th scope="col">Item Delivery Type</th>
                <th scope="col">Order Status</th>
            </tr>
        </thead>
        <tbody>`;
        for (let l = 0; l < orders.length; l++) {
            for (let key in orders[l]) {
                // console.log(i, orders[l][key])
                content += `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${orders[l][key].Item_Name}</td>
                        <td>${orders[l][key].Item_Price}</td>
                        <td>${orders[l][key].Item_Category}</td>
                        <td>${orders[l][key].Item_Delivery_Type}</td>
                        <td>${orders[l][key].Order_Status}</td>
                    </tr>`;
                i++;
            }
        }
        content += `</tbody></table>`;
        div.innerHTML += content;
    }, 5000)
}
let logout = () => {
    localStorage.removeItem("Current User");
    localStorage.removeItem("Restaurant_Id");
    window.location.href = "./index.html";
}