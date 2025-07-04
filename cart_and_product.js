class EccommerceProductAndCart {
	constructor() {
		this.products = []
		this.carts = []
	}
	addToCart(name, price, stock) {
		let quanity = document.getElementById("quantity-" + name).value
		if (quanity === "") {
			console.log("please enter quantity")
			return
		}
		let intQuantity = parseInt(quanity)
		if (intQuantity > stock) {
			console.log("stock not available")
			return;
		}
		let matchedCart = this.carts.find(
			(cart) => {
				return cart.name === name
			}
		)
		if (matchedCart) {
			console.log("product already exist in cart")
			matchedCart.quanity = parseInt(matchedCart.quanity) + intQuantity
			matchedCart.totalPrice = matchedCart.price * matchedCart.quanity
			let newCarts = this.carts.map(
				(c, i) => {
					if (c.id === matchedCart.id) {
						return matchedCart
					} else {
						return c
					}
				}
			)
			this.carts = newCarts
			console.log("cart updated: ", this.carts)
			this.updateCartUI(); // update cart UI after update
			return;
		}
		let cartDetails = {
			id: Date.now().toLocaleString(),
			name: name,
			price: price,
			quantity: intQuantity,
			totalPrice: price * intQuantity,
		}
		this.carts.push(cartDetails)
		console.log("cart added: ", this.carts)
		this.updateCartUI(); // update cart UI after add
	}

	// Display cart and checkout button
	updateCartUI() {
		let cartUl = document.getElementById("cart_and_product");
		if (!cartUl) return;
		if (this.carts.length === 0) {
			cartUl.innerHTML = "<li>Cart is empty</li>";
			return;
		}
		let cartItems = this.carts.map(cart =>
			`<li>
                ${cart.name} - Rs.${cart.price} x ${cart.quantity} = Rs.${cart.totalPrice}
            </li>`
		).join("");
		let total = this.carts.reduce((sum, cart) => sum + cart.totalPrice, 0);
		cartUl.innerHTML = `
            <h2>Cart</h2>
            ${cartItems}
            <li><strong>Total: Rs.${total}</strong></li>
            <button onclick="store.checkout()">Checkout</button>
        `;
	}

	checkout() {
		if (this.carts.length === 0) {
			alert("Cart is empty!");
			return;
		}
		alert("Checkout successful! Thank you for your purchase.");
		this.carts = [];
		this.updateCartUI();
	}

	addProduct() {
		let product1 = {
			id: Date.now().toLocaleString(),
			name: "laptop",
			price: 50000,
			stock: 10
		}
		let product2 = {
			id: Date.now().toLocaleString(),
			name: "mobile",
			price: 5000,
			stock: 10
		}
		this.products.push(product1, product2)
		console.log("products: ", this.products)
		this.updateUI()
		this.updateCartUI() // initialize cart UI
	}
	updateUI() {
		let productsUl = document.getElementById("products")
		productsUl.innerHTML = this.products.map(
			(product, index) => {
				return `<li key="${product.id}">
                <div>
                    <h5>${product.name}</h5>
                    <p>Rs.${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <input type="number" name="quantity" placeholder="Enter quantity" id="quantity-${product.name}">
                    <button onclick="store.addToCart('${product.name}', '${product.price}', ${product.stock})">Add To Cart</button>
                </div>
                </li>`
			}
		).join(" ")
	}
}
let store = new EccommerceProductAndCart()
function main() {

	store.addProduct()
}
main()