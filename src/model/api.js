

async function pideDatos(){
    const response = await fetch('http://localhost:3000/products')
    const posts = await response.json()
    return posts;
}


async function addDatos(newProduct){
    const response = await fetch('http://localhost:3000/products',{
        method:'POST',
        body: JSON.stringify(newProduct),
        headers:{
            'Content-Type': 'application/json'
          }
    })
    const posts = await response.json()
    return posts;
}

async function deleteDatos(id){
    const response = await fetch('http://localhost:3000/products/' + id,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
          }
    })
    const posts = await response.json()
    return posts;
}

async function updateDatos(product){
    const response = await fetch('http://localhost:3000/products/' + product.id,{
        method:'PATCH',
        body: JSON.stringify(product),
        headers:{
            'Content-Type': 'application/json'
          }
    })
    const posts = await response.json()
    return posts;
}

module.exports = {
    pideDatos,
    addDatos,
    deleteDatos,
    updateDatos
}