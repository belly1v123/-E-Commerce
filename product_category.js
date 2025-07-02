class EcommerceStore {
    constructor() {
        this.categories = {}
    }

    createCategory(categoryName) {
        if (!this.categories[categoryName]) {
            //if not exist 
            this.categories[categoryName] = []
        }
        else {
            //if exist 
            console.log("category already exist ")
        }
        this.updateUI();
    }

    deleteCategory(categoryName) {
        delete this.categories[categoryName]
        this.updateUI();
    }

    updateUI() {
        let olElement = document.getElementById("category-list")
        let categoryNameList = Object.keys(this.categories)
        olElement.innerHTML = categoryNameList.map((ele, index) => {
            return `<li>${ele}
            <button id="delete-${ele}">Delete</button>
            </li>`
        }).join("");
        this.registerEventListenerForDeleteCategory();
        this.updateCategoryDropdown();
    }

    updateCategoryDropdown() {
        const dropdown = document.getElementById("category-dropdown");
        if (!dropdown) return;
        dropdown.innerHTML = `<option value="">Select Category</option>`;
        Object.keys(this.categories).forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        });
    }

    registerEventListenerForDeleteCategory() {
        Object.keys(this.categories).forEach(category => {
            const deleteButton = document.getElementById(`delete-${category}`);
            if (deleteButton) {
                deleteButton.addEventListener("click", () => {
                    console.log("category", category);
                    this.deleteCategory(category);
                });
            }
        });
    }

    addItemToCategory(categoryName, itemName) {
        if (this.categories[categoryName]) {
            this.categories[categoryName].push(itemName);
        }
        this.updateUI();
    }
}
const store = new EcommerceStore()
store.createCategory("Electronics")
store.createCategory("Clothing")
store.createCategory("Hotels")

const categoryInput = document.getElementById("category-input");
const categoryAddButton = document.getElementById("add-category");

//adding click event listener 

categoryAddButton.addEventListener("click", function () {
    const category = categoryInput.value;
    if (category === "") {
        alert("Please enter a category name");
    }
    store.createCategory(category);
    categoryInput.value = "";
},
)

// After your existing code, add this event listener:
const categoryDropdown = document.getElementById("category-dropdown");
if (categoryDropdown) {
    categoryDropdown.addEventListener("change", function () {
        const selectedCategory = categoryDropdown.value;
        const itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";
        if (selectedCategory && store.categories[selectedCategory]) {
            const items = store.categories[selectedCategory];
            if (items.length === 0) {
                itemsList.innerHTML = "<li>No items in this category.</li>";
            } else {
                items.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    itemsList.appendChild(li);
                });
            }
        }
    });
}

const itemInput = document.getElementById("item-input");
const addItemButton = document.getElementById("add-item");

if (addItemButton) {
    addItemButton.addEventListener("click", function () {
        const selectedCategory = categoryDropdown.value;
        const itemName = itemInput.value.trim();
        if (!selectedCategory) {
            alert("Please select a category first.");
            return;
        }
        if (!itemName) {
            alert("Please enter an item name.");
            return;
        }
        store.addItemToCategory(selectedCategory, itemName);
        itemInput.value = "";
    });
}


