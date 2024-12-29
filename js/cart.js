function loadCart(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    renderCart(cart);
}

function renderCart(cart){
    const container = document.getElementById("cart-container");
    container.innerHTML = "";

    if(cart.length === 0){
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((product) => {
        console.log("product", product);
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="cart-item-info">
            <h3>${product.title}</h3>
            <p><strong>Price:</strong>${product.price}</p>
            <p><small>Quantity: </small>${product.quantity}</p>
            <button class="add-to-cart" onclick="removeProductFromCart(${product.id})">Remove</button>
        </div>
        `

        container.appendChild(cartItem);
    })
    
}

function removeProductFromCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart()
})