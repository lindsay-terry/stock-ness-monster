

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

    //event listener for the orders button to send to orders page
document
.querySelector('#order-btn')
.addEventListener('click', function() {
    document.location.href = '/orders';
});

//event listener for the users button to send to users page
document
    .querySelector('#users-btn')
    .addEventListener('click', function() {
        document.location.href = '/users';
    });

    //event listener for the home button to send to home page
document
.querySelector('#home-btn')
.addEventListener('click', function() {
    document.location.href = '/';
});