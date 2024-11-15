// Function to calculate discount based on subtotal
function calculateDiscount(subtotal) {
    let discountPercentage = 0;

    if (subtotal > 1000) {
        discountPercentage = 40;
    } else if (subtotal > 500) {
        discountPercentage = 20;
    } else if (subtotal > 200) {
        discountPercentage = 10;
    }

    return discountPercentage;
}

// Function to load billing summary from cart data
function loadBillingSummary() {
    // Retrieve cart data from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Calculate subtotal
    let subtotal = 0;
    for (const item in cart) {
        subtotal += cart[item].price * cart[item].quantity;
    }

    // Calculate discount
    const discountPercentage = calculateDiscount(subtotal);
    const discountAmount = subtotal * (discountPercentage / 100);

    // Calculate total
    const totalAmount = subtotal - discountAmount;

    // Update HTML elements with billing details
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount').innerText = `${discountPercentage}%`;
    document.getElementById('totalAmount').innerText = `$${totalAmount.toFixed(2)}`;
}

// Function to validate billing details
function validateBillingDetails() {
    const fields = [
        'firstName', 
        'lastName', 
        'phoneNumber', 
        'email', 
        'country', 
        'city', 
        'address', 
        'zipCode', 
        'cardName', 
        'cardNumber'
    ];
    
    for (let field of fields) {
        const input = document.getElementById(field);
        if (!input.value) {
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
            input.focus();
            return false; // Stop if any field is empty
        }
    }

    const paymentMethodSelected = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethodSelected) {
        alert("Please select a payment method.");
        return false; // Stop if no payment method is selected
    }

    return true; // All validations passed
}

// Call function to load billing summary when the page loads
window.onload = function() {
    loadBillingSummary();
};

// Checkout button event listener for final checkout button
document.getElementById('checkoutBtn').addEventListener('click', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Add items before proceeding.");
    } else {
        alert("Proceeding to payment...");
        window.location.href = "./Payment.html"; // Redirect to payment page
    }
});

// Final checkout button event listener
document.getElementById('checkoutBtnFinal').addEventListener('click', function() {
    if (validateBillingDetails()) {
        // Store the current cart data before redirecting
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        console.log('Storing cart data:', cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        window.location.href = "./finalpaymnt.html";
    }
});
