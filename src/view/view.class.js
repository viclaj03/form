const divMessagesUI = document.getElementById('messages');
const tableTotalImportUI = document.getElementById('total')
class View{
    renderNewProduct(product) {
        const $productTBodyUI = document.querySelector('#almacen tbody');	

        const $productUI = document.createElement('tr');
        $productUI.id = 'prod-'+product.id;
        $productUI.innerHTML = productToTr(product);
    
        $productTBodyUI.appendChild($productUI);
    }

    renderEditProduct(product) {
        // Buscamos el producto
        const $productUI = document.getElementById('prod-'+product.id);
        if ($productUI) {            // Si está lo modificamos
            $productUI.innerHTML = productToTr(product);
        }
    }

    renderDelProduct(id) {
        // Miramos si ya está el producto
        const $productUI = document.getElementById('prod-'+id);
        if ($productUI) {
            $productUI.parentElement.removeChild($productUI);
        }
    }

    renderStoreImport(total) {
        tableTotalImportUI.innerHTML = total.toFixed(2);
    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

function productToTr(product) {
    return `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.units}</td>
        <td>${product.price}</td>
        <td>${product.productImport().toFixed(2)} €</td>
        <td></td>`;
}

module.exports = View;
