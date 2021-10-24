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
    const units = Number(document.getElementById('newprod-units').value)
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    if(document.getElementById('newprod-id').value){
      const id = Number(document.getElementById('newprod-id').value)
      myController.changeProductInStore({id,name, price,units })
    } else {
      myController.addProductToStore({name, price,units })
    }
    myController.hideForm()
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })


  document.getElementById('show-form').addEventListener('click', (event)=>{
    event.preventDefault()

    myController.showForm()
  })

  document.getElementById('show-table').addEventListener('click', (event)=>{
    event.preventDefault()

    myController.hideForm()
  })

})
