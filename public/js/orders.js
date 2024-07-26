//function to toggle new order form
const toggleNewOrder = () => {
  const form = document.querySelector('#new-order');

  if (form.getAttribute('style') === 'display: none') {
      form.setAttribute('style', 'display: block;');
  } else {
      form.setAttribute('style', 'display: none');
  };
    //scroll down to see form
    form.scrollIntoView({ behavior: 'smooth' });
};

//function to toggle closed orders
const toggleClosedOrders = () => {
  const section = document.querySelector('#closed-order-div');

  if (section.getAttribute('style') === 'display: none') {
      section.setAttribute('style', 'display: block;');
  } else {
      section.setAttribute('style', 'display: none');
  };
    //scroll down to see div
    section.scrollIntoView({ behavior: 'smooth' });
};

//function to handle closing an order
const closeOrder = async (id) => {
  if (id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close order.',
      customClass: {
        popup: 'custom-confirm-popup',
        confirmButton: 'custom-confirm-button'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
          });
          //if response OK show confirmation
          if (response.ok) {
            await Swal.fire({
              title: 'Success',
              text: 'The order has been closed and inventory has been updated',
              icon: 'success',
              confirmButtonText: 'Okay',
              customClass: {
                popup: 'custom-confirm-popup',
                confirmButton: 'custom-confirm-button'
              }
            });
            document.location.replace('/orders');
          } else {
            await Swal.fire({
              title: 'Error',
              text: "There's been an error closing the order, please try again.",
              icon: 'error',
              confirmButtonText: 'Okay',
              customClass: {
                popup: 'custom-error-popup',
                confirmButton: 'custom-confirm-button'
              }
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Okay',
            customClass: {
              popup: 'custom-error-popup',
              confirmButton: 'custom-confirm-button'
            }
          });
        }
      }
    });
  }
}

//event listener for close order button
document
  .querySelector('.open-orders-div')
  .addEventListener('click', function(event) {
    if (event.target.classList.contains('close-order')) {
      const btnId = event.target.getAttribute('data-id');
      closeOrder(btnId);
    }
  })

//event listener to toggle new order form with create order button
document
  .querySelector('.order-toggle')
  .addEventListener('click', toggleNewOrder)

//event listener to toggle closed orders
document
  .querySelector('.view-closed')
  .addEventListener('click', toggleClosedOrders)

document.addEventListener('DOMContentLoaded', () => {


const availableProducts = [
    "Keyboard",
    "Mouse",
    "Clothes",
    "Laptop",
    "Computer",
    "Car"
  ];

  // Initialize the autocomplete widget
  $("#product").autocomplete({
    source: availableProducts
  });

  const orderFormEl = document.getElementById('orderForm');
  const availabilityMainContainer = document.querySelector('.availability-container');
  const availabilityFormEl = document.getElementById('available-form');
  const productInputEl = document.getElementById('product');
  const quantityInputEl = document.getElementById('quantity');
  const availabilityBtn = document.getElementById('checkAvailability');
  const makeOrderbtn = document.getElementById('makeOrder');
  const placeOrderMainContainer = document.querySelector('.place-order-main-container');
  const placeOrderFormRl = document.querySelector('.order-form');
  const ordersContainerEl = document.querySelector('orders-container');
  const goBackAvailability = document.getElementById('go-back-availability');

  


  // CHECK AVAILABILITY
  // --------------------------------------------------------

  const isAvailable = async (event) => {
    try {
      event.preventDefault();
      const product = productInputEl.value.trim();
      const quantity = parseInt(quantityInputEl.value.trim(), 10);

      if (product && quantity > 0) {
        const response = await fetch('/api/availability/check-availability', {
          method: 'POST',
          body: JSON.stringify({ product, quantity }),
          headers: { 'Content-Type': 'application/json' },
        });

        // Clear previous messages
        const existingMessage = document.querySelector('.message-container');
        if (existingMessage) {
          existingMessage.remove();
        }

        if (response.ok) {
          const data = await response.json();
          const messageContainer = document.createElement('div');
          messageContainer.setAttribute('class', 'message-container');

          const message = document.createElement('p');
          message.setAttribute('class', 'message');

          if (data.available) {
            message.innerHTML = 'The product you are looking for is available in our stock. Please proceed to make an order.';
            makeOrderbtn.classList.remove('disabled');
            makeOrderbtn.disabled = false;
          } else {
            makeOrderbtn.disabled = true;
            message.innerHTML = data.message || 'Sorry, there was an issue.';
          }

          availabilityFormEl.appendChild(messageContainer);
          messageContainer.appendChild(message);
        } else {
          const messageContainer = document.createElement('div');
          messageContainer.setAttribute('class', 'message-container');

          const message = document.createElement('p');
          message.setAttribute('class', 'message');
          makeOrderbtn.disabled = true;
          message.innerHTML = `This product is not available in our stock or Please check the spelling and try again: ${response.status} - ${response.statusText}`;

          availabilityFormEl.appendChild(messageContainer);
          messageContainer.appendChild(message);
        };

      } else {
          // Clear previous messages 2
         const existingMessage2 = document.querySelector('.message-container');
        if (existingMessage2) {
          existingMessage2.remove();
        }
        const messageContainer = document.createElement('div');
        messageContainer.setAttribute('class', 'message-container');
        makeOrderbtn.disabled = true;

        const message = document.createElement('p');
        message.setAttribute('class', 'message');
        message.innerHTML = 'Please fill out both the product and quantity fields correctly.';

        availabilityFormEl.appendChild(messageContainer);
        messageContainer.appendChild(message);
      }
    } catch (error) {
      console.error('Error:', error);
      const messageContainer = document.createElement('div');
      messageContainer.setAttribute('class', 'message-container');

      const message = document.createElement('p');
      message.setAttribute('class', 'message');
      makeOrderbtn.disabled = true;
      message.innerHTML = 'An error occurred while checking availability.';

      availabilityFormEl.appendChild(messageContainer);
      messageContainer.appendChild(message);
    }
  };

  availabilityBtn.addEventListener('click', isAvailable);



// PLACE AN ORDER
// ---------------------------------------------------------



const placeOrder = async (event) => {
  try {
    event.preventDefault();
     availabilityMainContainer.setAttribute('style', 'display: none');
    availabilityFormEl.setAttribute('style', 'display: none');
    placeOrderMainContainer.setAttribute('style', 'display: flex');
    orderFormEl.setAttribute('style', 'display: flex');

   
     


    
  } catch (error) {
    console.error('Error:', error);
  }
};

makeOrderbtn.addEventListener('click', placeOrder);







 // GO BACK TO AVAILABILITY CHECK

  const goBack = (event) => {
    try {
      event.preventDefault();
      availabilityMainContainer.setAttribute('style', 'display: flex');
      availabilityFormEl.setAttribute('style', 'display: flex');
      placeOrderMainContainer.setAttribute('style', 'display: none');
      orderFormEl.setAttribute('style', 'display: none');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  goBackAvailability.addEventListener('click', goBack);

});




