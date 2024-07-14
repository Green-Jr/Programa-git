document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const productsContainer = document.getElementById('products-container');
    const authForm = document.getElementById('auth-form');
    const loginButton = document.getElementById('login-button');
    const editProfileButton = document.getElementById('edit-profile-button');

    let isLoginMode = true;

    const toggleAuthMode = () => {
        isLoginMode = !isLoginMode;
        document.getElementById('auth-title').textContent = isLoginMode ? 'Iniciar sesión' : 'Registrarse';
        document.getElementById('auth-button').textContent = isLoginMode ? 'Enviar' : 'Registrarse';
        document.getElementById('toggle-auth-mode').textContent = isLoginMode ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión';
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const endpoint = isLoginMode ? '/login' : '/register';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (result.success) {
                if (isLoginMode) {
                    toggleAuthPanel();
                    loginButton.style.display = 'none';
                    editProfileButton.style.display = 'inline-block';
                } else {
                    alert('Registro exitoso. Ahora puedes iniciar sesión.');
                    toggleAuthMode();
                }
            } else {
                alert(result.message || 'Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            alert('Error en la autenticación');
        }
    };

    authForm.addEventListener('submit', handleAuth);

    const createProductCard = (product, vendor) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>Vendor: ${vendor}</p>
            <a href="${product.permalink}" target="_blank">View Product</a>
        `;
        return card;
    };

    const fetchProducts = async (query) => {
        const urls = [
            `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
            // Agrega otras URLs aquí según sea necesario
        ];

        try {
            productsContainer.innerHTML = ''; 

            for (const url of urls) {
                const response = await fetch(url);
                const data = await response.json();
                const results = data.results.slice(0, 5); // Limitar a 5 productos por API
                const vendor = url.includes('mercadolibre') ? 'Mercado Libre' :
                               url.includes('shopee') ? 'Shopee' :
                               url.includes('amazon') ? 'Amazon' : 'AliExpress';

                results.forEach(product => {
                    const productCard = createProductCard(product, vendor);
                    productsContainer.appendChild(productCard);
                });
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

    const editProfile = () => {
        // Aquí puedes redirigir al usuario a la página de edición de perfil
        window.location.href = '/edit-profile';
    };

    editProfileButton.addEventListener('click', editProfile);

    function toggleAuthPanel() {
        const authPanel = document.getElementById('auth-panel');
        authPanel.style.display = authPanel.style.display === 'block' ? 'none' : 'block';
    }
});
