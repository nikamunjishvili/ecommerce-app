// https://fakestoreapi.com/products

(async function (){
    async function fetchProducts(){
        const container = document.getElementById("products-container");
        const loader = document.getElementById("loader");

        loader.style.display = 'block';

        try {
            const cachedProducts = JSON.parse(localStorage.getItem("cachedProducts"));
            if(cachedProducts){
                renderProducts(cachedProducts);
                loader.style.display = 'none';
                return;
            }

            const response = await fetch("https://fakestoreapi.com/products");
            if(!response.ok){
                throw new Error("HTPP error!")
            }
            const products = await response.json();

            localStorage.setItem('cachedProducts', JSON.stringify(products))
            renderProducts(products);
        } catch (error) {
            console.log("failed products", error);
            container.innerHTML = `<p>Failed to load products.</p>`
        } finally{
            loader.style.display = 'none';
        }
    }

    function renderProducts(products, limit = 10){
        const container = document.getElementById("products-container");
        container.innerHTML = '';

        products.slice(0, limit).forEach((product) => {
            const productElement = document.createElement("div");
            productElement.className = 'product';
            
            productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>${product.description.slice(0, 100)}...</p>
                <p><strong>Price:</strong>${product.price}</p>
                <p><small>Rating: </small>${product.rating.rate} ${product.rating.count} rewies</p>
                <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.title}', '${product.price}', '${product.image}')">Add to Cart</button>
            </div>
            `

            container.appendChild(productElement)
        })
    }

    function addToCart(id, title, price, image){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === id);
        if(existingProduct){
            existingProduct.quantity += 1;
        }else{
            cart.push({id, title,price, image, quantity: 1})
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showModal(`${title} addet to cart!`, 'success')
        setTimeout(() => {
            window.location.href = "./cart.html";
        },
        2000)
    }

    window.addToCart = addToCart;

    const filterDialog = document.getElementById("product-filter");
    const closeFilter = document.getElementById("close-filter")
    const applyFilter = document.getElementById("apply-filter");
    const categorySelect = document.getElementById("filter-category");
    const minPriceInput = document.getElementById("filter-min-price");
    const maxPriceInput = document.getElementById("filter-max-price");

    const filterButton = document.createElement("button");
    filterButton.textContent = "Filter Products";
    document.querySelector(".content").insertBefore(filterButton, document.getElementById("products-container"))

    filterButton.addEventListener("click", () => {
        filterDialog.style.display = 'block'
    })

    closeFilter.addEventListener("click", () => {
        filterDialog.style.display = 'none'
    })

    applyFilter.addEventListener("click", () => {
        const category = categorySelect.value;
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || 0;

        const cachedProducts = JSON.parse(localStorage.getItem("cachedProducts"));

        const filteredProducts = cachedProducts.filter((product) => {
            const matchesCategory = !category || product.category === category;
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            return matchesCategory && matchesPrice;
        })
        renderProducts(filteredProducts)
        filterDialog.style.display = 'none'
    })

    fetchProducts();

    const logoutButton = document.getElementById("logout");
    if(logoutButton){
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedin');
            window.location.href = './login.html'
        })
    }else{
        console.log("Logout button not found!")
    }
})()

function showModal(message, type){
    const modal = document.getElementById('modal');
    modal.textContent = message;
    modal.className = type;
    modal.style.display = 'flex';

    setTimeout(() => {
        modal.style.display = "none";
    }, 3000)
}

