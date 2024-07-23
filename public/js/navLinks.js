//event listener for login button to send to login page
document
    .querySelector('#login-btn')
    .addEventListener('click', function() {
        document.location.href = '/login';
    });

//event listener for the customers button to send to customers page
document
    .querySelector('#customer-btn')
    .addEventListener('click', function() {
        document.location.href = '/customers';
    });

//event listener for the products button to send to products page
document
    .querySelector('#products-btn')
    .addEventListener('click', function() {
        document.location.href = '/products';
    });