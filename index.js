class Product {
    constructor(name, description, price){
            this.name = name;
            this.description = description;
            this.price = price;
    }
}

class UI{
    addProduct(product){
        const productList = document.getElementById("product-list");
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                <strong>Nombre del producto</strong>: ${product.name} 
                <br><strong>Descripcion del producto</strong>: ${product.description} 
                <br><strong>Precio del producto</strong>: ${product.price} 
                <br><a href="#" class="btn btn-danger btn-block" name="delete">Eliminar producto</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado','info')
        }
    }

    showMessage(message, cssClass){
       const div = document.createElement('div');
       div.className = `alert alert-${cssClass} mt-2`;
       div.appendChild(document.createTextNode(message));
       //mensaje
       const container = document.querySelector('.container');
       const app = document.querySelector('#App');
       container.insertBefore(div, app);
       setTimeout(function(){
        document.querySelector('.alert').remove();
       }, 3000);
    }
}

// Eventos del DOM (document object model)

document.getElementById('product-form').addEventListener('submit',function(e){
   const name = document.getElementById('name').value;
   const description = document.getElementById('description').value;
   const price = document.getElementById('price').value;

   const product = new Product(name, description, price);

   const ui = new  UI();

    if(name === '' || description==='' || price===''){
        return ui.showMessage('Todos los campos son obligatorios', 'danger');
    }

   ui.addProduct(product);
   ui.resetForm();
   ui.showMessage('Producto agregado', 'success');

   e.preventDefault();

});

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
});