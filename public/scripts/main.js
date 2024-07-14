document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const productsContainer = document.getElementById('products-container');

    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>Vendor: Mercado Libre</p>
            <img src="${product.thumbnail}" alt="${product.title}">
            <a href="${product.permalink}" target="_blank">View Product</a>
        `;
        return card;
    };

    const fetchProducts = async (query) => {
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=5`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            productsContainer.innerHTML = ''; // Limpiar resultados anteriores

            if (data.results && data.results.length > 0) {
                data.results.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });
            } else {
                productsContainer.innerHTML = '<p>No products found</p>';
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error fetching products</p>';
        }
    };

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            fetchProducts(query);
        }
    });
});

function searchProduct() {
    const searchInput = document.getElementById('search-input').value;
    const categories = document.getElementById('categories');
    const results = document.getElementById('results');
    const productDetails = document.getElementById('product-details');

    if (searchInput) {
        categories.style.display = 'none';
        results.style.display = 'block';
        productDetails.style.display = 'none';
        // Call the function to fetch and display products
    }
}

function showProductDetails(name, price, rating, review, vendorReview) {
    const results = document.getElementById('results');
    const productDetails = document.getElementById('product-details');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productRating = document.getElementById('product-rating');
    const productReview = document.getElementById('product-review');
    const vendorReviewElement = document.getElementById('vendor-review');

    productName.textContent = name;
    productPrice.textContent = price;
    productRating.textContent = rating;
    productReview.textContent = `Reseña del producto: ${review}`;
    vendorReviewElement.textContent = `Reseña del vendedor: ${vendorReview}`;

    results.style.display = 'none';
    productDetails.style.display = 'block';
}

function closeProductDetails() {
    const productDetails = document.getElementById('product-details');
    const results = document.getElementById('results');

    productDetails.style.display = 'none';
    results.style.display = 'block';
}

function toggleAuthPanel() {
    const authPanel = document.getElementById('auth-panel');
    authPanel.style.display = authPanel.style.display === 'block' ? 'none' : 'block';
}

function toggleEditPanel() {
    const editPanel = document.getElementById('edit-profile-panel');
    editPanel.style.display = editPanel.style.display === 'none' ? 'block' : 'none';
}
