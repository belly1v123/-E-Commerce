class EcommerceStore {
	constructor() {
		this.categories = {};
	}

	createCategory(categoryName) {
		if (!this.categories[categoryName]) {
			//if not exist
			this.categories[categoryName] = [];
		} else {
			//if exist
			console.log("category already exist ");
		}
		this.updateUi();
		this.registerDeleteEvent(this.categories);
		this.updateCategoryDropdown();
	}

	updateCategoryDropdown() {
		const categoryNameList = Object.keys(this.categories);
		const selectElement = document.getElementById("category-select");

		selectElement.innerHTML = categoryNameList
			.map((elm, _) => `<option value=${elm} name=${elm}>${elm}</option>`)
			.join("");

		// categoryNameList.map((elm, _) => {
		// 	const optionElement = document.createElement("option");
		// 	optionElement.value = elm;
		// 	optionElement.text = elm;
		// 	// selectElement.innerHTML += optionElement;

		// 	selectElement.innerHTML += `<option value=${elm} name=${elm}>
		// 	${elm}
		// 		</option>`;
		// });
	}

	updateUi() {
		const olElement = document.getElementById("category-list");
		// olElement.innerHTML = "<li>Fruits</li>";
		let categoryNameList = Object.keys(this.categories);
		olElement.innerHTML = categoryNameList
			.map(
				(elm, index) => `<li key=${index}>${elm}
            <button id="delete-${elm}"> Delete</button>
            </li>`
			)
			.join("");
		document.getElementById("category-title").style.display =
			Object.keys(store.categories).length === 0 ? "none" : "block";
		this.updateCategoryDropdown();
	}
	deleteCategory(categoryName) {
		delete this.categories[categoryName];
		console.log(this.categories);
		this.updateUi();
		// this.createCategory();
		this.registerDeleteEvent(this.categories);
		this.updateCategoryDropdown();
	}

	registerDeleteEvent(categories) {
		Object.keys(categories).forEach((category, index) => {
			document
				.getElementById(`delete-${category}`)
				.addEventListener("click", () => {
					console.log("category to be deleted", category);
					store.deleteCategory(category);
				});
		});
	}

	addProduct(item, categoryName) {
		this.categories[categoryName].push(item);
		this.updateProductList();
	}

	updateProductList() {
		let productListDiv = document.getElementById("product-list");
		productListDiv.innerHTML = Object.entries(this.categories)
			.map(([categoryName, productList]) => {
				if (!productList.length) {
					return;
				}
				console.log(productList, categoryName);
				return `
				<div key=${categoryName}'>
				<h4>${categoryName}</h4>
				<ol>
				${productList.map(
					(product) => `<li>${product.name} - Rs. ${product.price}</li>`
				)}
			</ol>
				`;
			})
			.join("");
	}
}
const store = new EcommerceStore();
store.createCategory("Electronics");
store.createCategory("Clothing");
store.createCategory("Hotels");

document
	.getElementById("create-category-btn")
	.addEventListener("click", (e) => {
		e.preventDefault();
		const categoryName = document.getElementById("category-name").value;
		if (categoryName === "") {
			alert("Please enter category name");
			return;
		}
		store.createCategory(categoryName);
		document.getElementById("category-name").value = "";
	});

Object.keys(store.categories).forEach((category, index) => {
	document
		.getElementById(`delete-${category}`)
		.addEventListener("click", () => {
			console.log("category to be deleted", category);
			store.deleteCategory(category);
		});
});

// submit form add item

const handleAddItem = () => {
	let addItemBtn = document.getElementById("add-item");
	const itemInput = document.getElementById("item-input");
	const priceInput = document.getElementById("price-input");
	const categorySelect = document.getElementById("category-select");

	addItemBtn.addEventListener("click", () => {
		let itemName = itemInput.value;
		let itemPrice = priceInput.value;
		let itemCategory = categorySelect.value;

		let itemDetails = {
			id: Date.now().toLocaleString(),
			name: itemName,
			price: itemPrice,
			category: itemCategory,
		};

		store.addProduct(itemDetails, itemCategory);
		itemInput.value = "";
		priceInput.value = "";
		console.log(store.categories);
	});
};

handleAddItem();
