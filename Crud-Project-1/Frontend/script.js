const fetch_data = document.getElementById("fetch-data")

// =========== Get data

let productdata = []

fetch("http://localhost:8080/home")
    .then((res) => res.json())
    .then((data) => {
        productdata = data
        cardList(data)
    })
    .then((err) => console.log(err))

function cardList(data) {
    let store = data.map((el) => card(el.id, el.image, el.title, el.price))

    fetch_data.innerHTML = store.join("")
}

function card(id, image, title, price) {
    return `
     <div class="card" data-id="${id}">
        <div class="card-img">
        <img src="${image}" alt="img not available">
        </div>
        <div class="card-body">
        <h4 class="card-id">Id : ${id}</h4>
        <h4 class="card-title">Title : ${title}</h4>
        <p class="card-price">Price : ${price}</p>
        <a href="#" class="card-link" data-id="${id}">Update</a>
        <button class="delete-btn"   data-id="${id}">Delete</button>
        </div>
    </div>`
}

// =========== Add data // POST

let product_id = document.getElementById("product-id")
let product_title = document.getElementById("product-title")
let product_image = document.getElementById("product-image")
let product_price = document.getElementById("product-price")
let adddata = document.getElementById("add-product")

adddata.addEventListener(("click"), (e) => {
    e.preventDefault()

    let obj = {
        id: product_id.value,
        title: product_title.value,
        price: product_price.value,
        image: product_image.value
    }

    fetch("http://localhost:8080/addproduct", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.JSON())
        .then((data) => alert("Data added successfully"))
        .catch((err) => console.log(err))

})

// =========== Update data // PUT

let update_product_id = document.getElementById("update-product-id")
let update_product_title = document.getElementById("update-product-title")
let update_product_image = document.getElementById("update-product-image")
let update_product_price = document.getElementById("update-product-price")
let updatedata = document.getElementById("update-product")


document.addEventListener(("click"), (e) => {
    if (e.target.classList.contains("card-link")) {
        let id = e.target.dataset.id;
        updateproduct(id)
    }
})

const updateproduct = (id) => {
    const filterdata = productdata.filter((el) => el.id == id)

    const title = filterdata[0].title
    const image = filterdata[0].image
    const price = filterdata[0].price

    update_product_id.value = id
    update_product_title.value = title
    update_product_image.value = image
    update_product_price.value = price

}

updatedata.addEventListener(("click"), () => {

    let obj = {
        id: update_product_id.value,
        title: update_product_title.value,
        price: update_product_price.value,
        image: update_product_image.value
    }

    fetch(`http://localhost:8080/updateproduct/${obj.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
        .then((res) => { res.JSON() })
        .then((data) => alert("Data updateed successfully"))
        .catch((err) => console.log(err))
})

// =========== Edit Only One data // PATCH

let edit_id_product_id = document.getElementById("edit-id-product-id")
let edit_price_product_price = document.getElementById("edit-price-product-price")
let edit_price_btn = document.getElementById("edit-price-product")

edit_price_btn.addEventListener(("click"), () => {
    let edit_id = edit_id_product_id.value
    let edit_price = edit_price_product_price.value

    let obj = {
        id: edit_id,
        price: edit_price
    }

    fetch(`http://localhost:8080/editproduct/${obj.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.JSON())
        .then((data) => alert("Data updateed successfully"))
        .catch((err) => console.log(err))

})

// =========== Delete data // DELETE

document.addEventListener(("click"), (e) => {
    if (e.target.classList.contains("delete-btn")) {
        let id = e.target.dataset.id;
        deleteProduct(id)
    }
})

    const deleteProduct = (id) => {
        fetch(`http://localhost:8080/deleteproduct/${id}`, {

            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.JSON())
            .then((data) => alert("Data Deleted successfully"))
            .catch((err) => console.log(err))
    }