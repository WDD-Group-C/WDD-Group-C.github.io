const open_shopping_cart = document.getElementById('shopping-cart')
const close_shopping_cart = document.getElementById('close-shopping-cart')
const shopping_cart_menu = document.getElementById('shopping-cart-menu')
const checkout_button = document.getElementById('checkout-button')
const reset_button = document.getElementById('reset-button')
const add_to_cart_button = document.getElementsByClassName('add-to-cart-button')
const cart_total = document.getElementById('cart-total')

let cart_items = []; // list to store the items in the cart


open_shopping_cart.addEventListener('click', function() {
    shopping_cart_menu.style.display = 'block'; // display the shopping cart menu
});

close_shopping_cart.addEventListener('click', function() {
    shopping_cart_menu.style.display = 'none'; // hide the shopping cart menu
    showCartItems(); // show the items in the cart in a list format
});

for (const button of add_to_cart_button) {
    button.addEventListener('click', function() {
        const item = this.getAttribute('data-item'); 
        const price = parseFloat(this.getAttribute('data-price'));

        const existingCartItem = cart_items.find(cart_items => cart_items.item === item); // check if the item is already in the cart

        // if the item is already in the cart, increase the quantity by 1
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart_items.push({ item, price, quantity: 1 }); // if the item is not in the cart, add it to the cart
        } 

        const cart_badge = document.getElementById('cart-badge'); 
        cart_badge.textContent = cart_items.length; // update the cart badge
        showCartItems();
        alert(item + ' added to the cart!');
    });
}

function showCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
        cartItemsList.innerHTML = ''; // clear the list
        let total = 0;  
        let totalQuantity = 0;

        cart_items.forEach((value, key) => {
            const li = document.createElement('li'); // create a list item
            let itemPrice = value.price * value.quantity; // calculate the total price of the item

            // add html code to display item with details in the list
            li.innerHTML = `
                <div style="
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: center;
                    gap:50px
                ">
                    <div>${value.item}</div>
                    <div>$${itemPrice.toFixed(2)}</div>
                    <div style="display:flex; align-items: center; gap:10px">
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>
                </div>
                <hr>`;

            cartItemsList.appendChild(li); // add the list item to the list
            total += itemPrice; // add the item price to the total price
            totalQuantity += value.quantity; // add the item quantity to the total quantity
        });

        cart_total.textContent = `Total: $${total.toFixed(2)}`; // display the total price

        const cart_badge = document.getElementById('cart-badge'); 
        cart_badge.textContent = totalQuantity; // update the cart badge
}

function changeQuantity(index, newQuantity) {
    const cartItem = cart_items[index];
    
    if (newQuantity < 1) {
        cartItems.splice(index, 1); 
    } else {
        cartItem.quantity = newQuantity; 
    }

    showCartItems(); 
    const cart_badge = document.getElementById('cart-badge');
    cart_badge.textContent = cart_items.length;
}


checkout_button.addEventListener('click', function() {
    if (cart_items.length === 0) {
        alert('No products are in the shopping list') // if the cart is empty, show an alert
    } else {
        const checkoutArray = [];

        // convert the cart items into an array
        cart_items.forEach(item => {
            const { item: itemName, price: itemPrice, quantity: itemQuantity } = item;
            checkoutArray.push({
                itemName: itemName,
                itemPrice: itemPrice.toFixed(2),
                itemQuantity: itemQuantity
            });
        });
        localStorage.setItem('checkoutData', JSON.stringify(checkoutArray)); // store the array in local storage
        window.location.href = "checkout.html"; // redirect to checkout page
    }
});

reset_button.addEventListener('click', function() {
    cart_items.length = 0;
    const cart_badge = document.getElementById('cart-badge');
    cart_badge.textContent = cart_items.length;
    showCartItems();
});


