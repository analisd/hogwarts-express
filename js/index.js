
// Variables y constantes
let compraTotal = 0,
    $itemsContainer = document.querySelector(".items"),
    items = []

const
    $carritoContainer = document.querySelector(".carrito"),
    $totalCompra = document.querySelector(".total"),
    $carritoConteo = document.querySelectorAll(".carritoConteo"),
    $comprar = document.querySelector(".buy-btn"),
    $vaciar = document.querySelector(".vaciar-btn")

document.addEventListener("DOMContentLoaded", () => {
    getcarrito()
    showItems()
})

const showContainerItems = products => {
    products.forEach(product => {
        items.push(product)
        $itemsContainer.innerHTML += `
        <div class= "row">
            <div class= "col"
                <div class="card card-product" style="width: 18rem; margin:10px">
                <img src=${product.image} class="card-img-top" alt=${product.name}>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text"><span class="price">$${product.price}</span></p>
                        <button type="button" class="btn btn-primary buy-btn" id="${product.id}" onClick="addToArray(${product.id})">Agregar al carrito</button>
                    </div>
                </div>
                
            </div>
        </div>
        `
    })
}

async function showItems() {
    const articulosFetch = await fetch("articulos.json")    
    const articulosJson = await articulosFetch.json()
    showContainerItems(articulosJson)
}

const addToArray = (id) => {
    /* Agrega el producto al carrito */
    if(IDS.indexOf(id) !== -1){
        Swal.fire({
            icon: 'error',
            title: 'Oops... El producto está en el carrito',
            text: 'Puedes agregar más desde ahí!'
          })
    }else{
        items.forEach(product => {
            if (product.id === parseInt(id) && carrito.indexOf(product) === -1 && IDS.indexOf(product.id) === -1) {
                carrito.push(product)
                IDS.push(product)
                updateCar()
                updateTotal()
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado con éxito.'                    
                  })

            }
        })
    }
}

const updateCar = () => {
    $carritoContainer.innerHTML = ""
    carrito.forEach(product => {
        
        $carritoContainer.innerHTML += `
        <div class="cardInCar">
            <div class="container-img">
                <img src=${product.image} alt="${product.name}">
            </div>
            <div class="info">
                <span class="nameInCar">${product.name}</span>
                <span class="priceInCar">$${product.price}</span>
            </div>
                <i id="${product.id}" onClick="deleteItemCar(${product.id})" class="fa-solid fa-trash delete-btn"></i>
            </div>
            <input id="${product.id}" onChange="updateTotal(event)" type="number" min="1" max="5" value="${product.cantidad}" class="cart-quantity">
        `
    })
}

const deleteItemCar = id => {
    let index = IDS.indexOf(id)
    IDS.splice(index, 1)
    carrito.splice(index, 1)
    updateTotal()
    updateCar()
    items.forEach(product => {
        if (product.id === parseInt(id)) {
            product.cantidad = 1
        }
    })
}

const updateTotal = e => {
    if (e) {
        let id = parseInt(e.target.id),
            quantity = parseInt(e.target.value)
        if (quantity > 5) {
            quantity = 5
            e.target.value = 5
        }
        carrito.forEach(product => product.id === id ? product.cantidad = quantity : e.target.value = quantity)
    }
    compraTotal = 0
    carrito.forEach(product => compraTotal += product.price * product.cantidad)
    $totalCompra.textContent = `Total: $${compraTotal}`
    saveItemsPrice()
    $carritoConteo.forEach(span => span.textContent = carrito.length !== 0 ? carrito.map(product => product.cantidad).reduce((a, b) => a + b) : "0")
}

const saveItemsPrice = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("total", JSON.stringify(compraTotal))
    localStorage.setItem("ids", JSON.stringify(IDS))
}

function getcarrito() {
    carrito = localStorage.getItem("carrito") === null ? carrito = [] : JSON.parse(localStorage.getItem("carrito"))
    IDS = localStorage.getItem("ids") === null ? IDS = [] : JSON.parse(localStorage.getItem("ids"))
    compraTotal = JSON.parse(localStorage.getItem("total"))
    updateCar()
    updateTotal()
    $carritoConteo.textContent = carrito.length !== 0 ? carrito.map(producto => producto.cantidad).reduce((a, b) => a + b) : "0"
}

$comprar.onclick = () => {
    if (carrito.length > 0){
        Swal.fire({
            icon: 'success',
            title: 'Pedido realizado con éxito.'                    
          })
        totalCompra = 0
        carrito = []
        IDS = []
        updateCar()
        updateTotal()
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Todavía no tienes productos en el carrito.'                    
        })
    }
}

$vaciar.onclick = () => {
    /* Vacía el carrito */
    if (carrito.length > 0){
        Swal.fire({
            icon: 'success',
            title: 'Carrito vacío.'                    
          })
        totalCompra = 0
        carrito = []
        IDS = []
        updateCar()
        updateTotal()
    }else{
        Swal.fire({
            icon: 'error',
            title: 'El carrito se encuentra vacio.'                    
        })
    }
}
