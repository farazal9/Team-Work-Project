document.addEventListener('DOMContentLoaded', function() {
    // Get cart and billing data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    // Calculate subtotal and total items
    let subtotal = 0;
    let totalItems = 0;
    for (const item in cart) {
        subtotal += cart[item].price * cart[item].quantity;
        totalItems += cart[item].quantity;
    }

    // Calculate discount
    const discountPercentage = calculateDiscount(subtotal);
    const discountAmount = subtotal * (discountPercentage / 100);
    const totalAmount = subtotal - discountAmount;

    // Generate order number
    const orderNumber = '#' + Math.floor(100000 + Math.random() * 900000);
    
    // Get current date
    const currentDate = new Date().toLocaleDateString();

    // Debug logging
    console.log('Cart:', cart);
    console.log('Subtotal:', subtotal);
    console.log('Total Items:', totalItems);
    console.log('Discount:', discountPercentage);
    console.log('Total Amount:', totalAmount);

    // Update all DOM elements
    try {
        document.getElementById('order-number').textContent = orderNumber;
        document.getElementById('order-date').textContent = currentDate;
        document.getElementById('total-items').textContent = `${totalItems} items`;
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('discount').textContent = `${discountPercentage}%`;
        document.getElementById('total-price').textContent = `$${totalAmount.toFixed(2)}`;
    } catch (error) {
        console.error('Error updating DOM:', error);
    }
});

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

// Add this to check if the script is loading
console.log('total-bill.js loaded');
