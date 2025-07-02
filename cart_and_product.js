class EcommerceProductAndCart {
	constructor() {
		this.products = [];
		this.cart = []; // Initialize cart as an array
	}

	addToCart(productId) {
		// Get quantity from input
		const quantityInput = document.getElementById(`quantity-${productId}`);
		const quantity = parseInt(quantityInput.value, 10) || 1;

		let product = this.products.find((product) => product.id === productId);

		if (!product) {
			console.log("Product not found");
			return;
		}
		if (quantity > product.stock) {
			console.log("Insufficient stock");
			return;
		}

		let matchedCart = this.cart.find((cart) => cart.name === product.name);
		if (matchedCart) {
			console.log("product already in cart");
			return;
		}

		console.log("add to cart");
		let cartDetails = {
			id: Date.now().toLocaleString(),
			name: product.name,
			price: product.price,
			quantity: quantity,
			totalPrice: product.price * quantity,
		};
		this.cart.push(cartDetails);
		console.log("cart added", this.cart);
	}

	addProduct() {
		let product1 = {
			id: "1",
			name: "laptop",
			price: 5000,
			stock: 10,
		};

		let product2 = {
			id: "2",
			name: "mobile",
			price: 1000,
			stock: 20,
		};

		this.products.push(product1, product2);
		console.log("products", this.products);
		this.updateUI();
	}

	updateUI() {
		let productList = document.getElementById("product-list");
		productList.innerHTML = this.products.map((product) => (
			`<li key="${product.id}">
				<div>
					<h3>${product.name}</h3>
					<p>Price: $${product.price}</p>
					<p>Stock: ${product.stock}</p>
					<input type="number" id="quantity-${product.id}" min="1" max="${product.stock}" value="1" style="width:50px;" />
					<button onclick="store.addToCart('${product.id}')">Add to Cart</button>
				</div>
			</li>`
		)).join("");
	}
}
const store = new EcommerceProductAndCart();

function main() {
	store.addProduct();
}
main();
