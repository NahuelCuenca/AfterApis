document.addEventListener('DOMContentLoaded', e => {
    // prompt("como te llamas")

    trearJson()

    // hacerCards()
})

const carrito = [
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 1, cantidad: 2, precio: 100},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 1, precio: 4400},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 3, precio: 100},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 4, precio: 100}]

const productosML = []
const productosJson = []


const producto1 = {
    nombre: "pepe",
    precio: 1000
}

let producto2 = {

}

const botonMc = document.getElementById("botonMc")
const botonJson = document.getElementById("botonJson")
const botonMp = document.getElementById("botonPagar")

botonMc.addEventListener("click", e => trearInfo())
botonJson.addEventListener("click", e => trearJson())
botonMp.addEventListener("click", e => pagar())


const trearInfo = async () => {
    
    const buscador = document.getElementById("buscador")
    
    let response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${buscador.value}`)
    console.log(response)
    let data = await response.json()
    
    
    productosML.push(...data.results)
    
}


const trearJson = async () => {
    
    let response = await fetch("./productos.json")
    let data = await response.json()
    
    productosJson.push(...data)
    console.error(productosJson)
    
    let contenedor = document.getElementById("contenedor")
    
    
    for (const element of productosJson) {
        let card = document.createElement("div")
        card.innerHTML=`
        <h1>${element.nombre}</h1>
        <h4>Precio : ${element.precio}</h4>`
    
        // let card = `<h1>Hola</h1>`
    
        contenedor.append(card)
    }

}

const pagar = async () => {

    const productosToMap = carrito.map(Element => {
        let nuevoElemento = {
            title: Element.nombre,
            description: Element.descripcion,
            picture_url: Element.img,
            category_id: Element.id,
            quantity: Element.cantidad,
            currency_id: "ARS",
            unit_price: Element.precio
        }
        return nuevoElemento
    })

    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
            Authorization: "Bearer "
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })

    let data = await response.json()

    window.open(data.init_point, "_blank")

    console.log(data)



}

// curl -X POST \
//       'https://api.mercadopago.com/checkout/preferences' \
//       -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
//       -H 'Content-Type: application/json' \ 
//       -d '{
//   "items": [
//     {
//       "title": "Dummy Title",
//       "description": "Dummy description",
//       "picture_url": "http://www.myapp.com/myimage.jpg",
//       "category_id": "car_electronics",
//       "quantity": 1,
//       "currency_id": "U$",
//       "unit_price": 10
//     }
//   ],
//   "payer": {
//     "phone": {},
//     "identification": {},
//     "address": {}
//   },
//   "payment_methods": {
//     "excluded_payment_methods": [
//       {}
//     ],
//     "excluded_payment_types": [
//       {}
//     ]
//   },
//   "shipments": {
//     "free_methods": [
//       {}
//     ],
//     "receiver_address": {}
//   },
//   "back_urls": {},
//   "differential_pricing": {},
//   "tracks": [
//     {
//       "type": "google_ad"
//     }
//   ],
//   "metadata": {}
// }'