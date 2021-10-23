const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        let product = {}
        try {
            product = this.store.addProduct(formData)
        } catch (err) {
            this.view.renderErrorMessage(err)
            return
        }
        this.view.renderNewProduct(product)
        document.getElementById('prod-' + product.id).querySelector('.btn-delete').addEventListener("click", ()=>{
            this.deleteProductFromStore(product.id)
        })
        document.getElementById('prod-' + product.id).querySelector('.btn-up').addEventListener("click", ()=>{
            var units = 1;
            var id = product.id;
            this.changeProductStock({id,units})
        })
        document.getElementById('prod-' + product.id).querySelector('.btn-down').addEventListener("click", ()=>{
            var units = -1;
            var id = product.id;
            this.changeProductStock({id,units})
        })
        document.getElementById('prod-' + product.id).querySelector('.btn-edit').addEventListener("click", ()=> {
            
            this.view.showData(product)
            this.view.showForm()
        })
        
        this.view.renderStoreImport(this.store.totalImport())
    }

    showForm(){
        this.view.clearForm()
        this.view.showForm()
    }

    hideForm(){
        this.view.hideForm()
    }

    deleteProductFromStore(prodId) {
        // Debemos obtener el producto para pedir confirmación
        const product = this.store.findProduct(Number(prodId))
        if (!product) {
            this.view.renderErrorMessage('No hay ningún producto con id ' + prodId)
            return
        }

        if (confirm(`Deseas borrar el producto "${product.name}" con id ${product.id}?`)) {
            if (product.units) {
                // Si tiene unidades hay que pedir una segunda confirmación
                if (confirm(`Ese producto aún tiene ${product.units} uds. que desaparecerán. Deseas continuar?`)) {
                    try {
                        this.store.changeProductUnits({
                            id: product.id, 
                            units: -product.units
                        })
                    } catch(err) {
                        this.view.renderErrorMessage(err)
                        return
                    }
                } else {
                    return     // No se hace nada
                }
            }
            try {
                var prodDeleted = this.store.delProduct(prodId)
            } catch(err) {
                this.view.renderErrorMessage(err)
                return
            }
            this.view.renderDelProduct(prodDeleted.id)
            this.view.renderStoreImport(this.store.totalImport())
        }
    }

    changeProductInStore(formData) {
        try {
            var prodModified = this.store.changeProduct(formData)
        } catch (err) {
            this.view.renderErrorMessage(err)
            return
        }
        this.view.renderEditProduct(prodModified)
        this.view.renderStoreImport(this.store.totalImport())
    }

    changeProductStock(formData) {
        try {
            var prodModified = this.store.changeProductUnits({
                id: formData.id,
                units: formData.units
            })
        } catch (err) {
            this.view.renderErrorMessage(err)
            return
        }
        this.view.renderEditProduct(prodModified)
        this.view.renderStoreImport(this.store.totalImport())
    }
}

    

module.exports = Controller
