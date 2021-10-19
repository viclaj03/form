'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newprod-name').value
    const price = document.getElementById('newprod-price').value

    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    myController.addProductToStore({ name, price })   
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteProductFromStore(document.getElementById('delprod-id').value)
  })

  document.getElementById('stock-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.changeProductStock({
      id: document.getElementById('stockprod-id').value, 
      units: document.getElementById('stockprod-units').value
    })
  })

})
