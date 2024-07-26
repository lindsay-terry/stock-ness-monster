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





