const renderProducts = products => {
    let htmlStr = products.map(product => `<div class="card text-white bg-dark col-3 py-3">
        <img class="card-img-top" src="${product.thumbnail}" alt="">
        <div class="card-body">
            <h5 class="card-title">${product.brand} ${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <h4 class="text-primary">${product.price}$</h4>
        </div></div>`).join('');
    document.getElementById('cards').innerHTML = htmlStr;
}

 let renderSelect = categories => {
    let htmlStr = `<option value="">Please, select category</option>`;
    htmlStr += categories.map(category => `<option value="${category}">${category}</option>`);
    document.getElementById('categories').innerHTML = htmlStr;
    setCategory();
 }

 let setCategory = () => { 
    document.getElementById('categories').onchange = event => {
        event.currentTarget.value.length > 0 ? getByCategory(event.currentTarget.value) : getProducts();
    }
 }

function getProducts (){
    fetch('https://dummyjson.com/products').then(res => res.json())
    .then(data => {
        renderProducts(data.products);
    });
}
function getCategories (){
    fetch('https://dummyjson.com/products/categories').then(res => res.json())
    .then(data => {
        renderSelect(data);
    });
}
function getByCategory (category){
    fetch(`https://dummyjson.com/products/category/${category}`).then(res => res.json())
    .then(data => {
        renderProducts(data.products);
    });
}
window.onload = function() {
    getProducts();
    getCategories();
}