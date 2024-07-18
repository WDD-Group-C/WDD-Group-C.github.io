const checkoutData = localStorage.getItem('checkoutData'); // get the checkout data from local storage
const checkoutArray = JSON.parse(checkoutData); // convert the checkout data into an array

console.log(checkoutArray); // log the checkout array to the console

const cartBadge = document.getElementById('cart-badge');
const cartAmount = document.getElementById('cart-amount');
const cartItemList = document.getElementById('cart-item-list');

const form = document.getElementById('check-out-form-html');
const submitButton = document.getElementById('submit-bt');

let cart_items = []; // create an empty array to store the cart items

cart_items = checkoutArray; // set the cart items to the checkout array

function showCartItems() {
    cartItemList.innerHTML = ''; // clear the cart item list
    let total = 0; 
    let totalQuantity = 0;

    // loop through the cart items
    cart_items.forEach((value, key) => {
        const li = document.createElement('li'); // create a list item
        let itemPrice = value.itemPrice * value.itemQuantity;
        total += itemPrice;
        totalQuantity += value.itemQuantity;

        li.innerHTML = `
                <div style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    align-items: center;
                    justify-content: end;
                    gap:50px;
                    padding:0;
                    margin:0;
                ">
                    <div>${value.itemName} * ${value.itemQuantity}</div>
                    <div>Rs. ${itemPrice.toFixed(2)}</div>
                </div>
                <hr>`;
        cartItemList.appendChild(li);
    });

    cartBadge.textContent = totalQuantity;
    cartAmount.textContent = `Rs. ${total.toFixed(2)}`;
}

showCartItems();

function redirectToSuccessPage() {
    window.location.href = "success.html";
    return false;
}
