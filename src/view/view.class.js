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
            $productUI.children[1].innerHTML = product.name
            $productUI.children[2].innerHTML = product.units
            $productUI.children[3].innerHTML = product.price
            $productUI.children[4].innerHTML = product.productImport().toFixed(2)
            if(product.units){
                $productUI.children[5].children[2].disabled=false
            } else{
                $productUI.children[5].children[2].disabled=true
            }
            /*$productUI.innerHTML = productToTr(product);*/
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
    
    showForm(){
        const formulario = document.getElementById('new-prod')
        const alamcen = document.getElementById('almacen')
        const botonForm = document.getElementById('show-form')
        const botonTable = document.getElementById('show-table')
        botonForm.classList.add('hide')
        botonTable.classList.remove('hide')
        formulario.classList.remove('hide')
        alamcen.classList.add('hide')
    }

    hideForm(){
        const formulario = document.getElementById('new-prod')
        const alamcen = document.getElementById('almacen')
        const botonForm = document.getElementById('show-form')
        const botonTable = document.getElementById('show-table')
        botonForm.classList.remove('hide')
        botonTable.classList.add('hide')
        formulario.classList.add('hide')
        alamcen.classList.remove('hide')
    }

    clearForm(){
        document.getElementById('newprod-id').value = ""
        document.getElementById('newprod-name').value = "";
        document.getElementById('newprod-price').value = "";
        document.getElementById('newprod-units').value = "";
        document.getElementById('legend-prod').innerHTML= 'Nuevo producto';
        document.getElementById('boton').innerHTML="Añadir"
    }

    showData(product){
        document.getElementById('newprod-id').value = product.id
        document.getElementById('newprod-name').value = product.name;
            document.getElementById('newprod-price').value = product.price;
            document.getElementById('newprod-units').value = product.units;
            document.getElementById('legend-prod').innerHTML= 'producto id:' + product.id;
            document.getElementById('boton').innerHTML="Actulizar"
    }
    
}

    

function productToTr(product) {
    
    var tabla = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.units}</td>
    <td>${product.price}</td>
    <td>${product.productImport().toFixed(2)} €</td>`
    if(!product.units){
        tabla +=`<td><button class="btn btn-delete">
        <span class="material-icons ">delete</span>
    </button>
    <button class="btn btn-up">
        <span class="material-icons">arrow_circle_up</span>
    </button>
    <button class="btn btn-down" disabled>
        <span class="material-icons" >arrow_circle_down</span>
    </button>
    <button class="btn btn-edit">
        <span class="material-icons second_botton">edit</span>
    </button>
    </td>`
    return tabla;
    }
    return `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.units}</td>
        <td>${product.price}</td>
        <td>${product.productImport().toFixed(2)} €</td>
        <td>
        <button class="btn btn-delete">
            <span class="material-icons">delete</span>
        </button>
        <button class="btn btn-up">
            <span class="material-icons">arrow_circle_up</span>
        </button>
        <button class="btn btn-down" >
            <span class="material-icons">arrow_circle_down</span>
        </button>
        <button class="btn btn-edit">
            <span class="material-icons">edit</span>
        </button>
        </td>`;
}

module.exports = View;
