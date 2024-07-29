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
              text: "Cannot close order: insufficient stock.  Please replenish",
              icon: 'error',
              confirmButtonText: 'Okay',
              customClass: {
                popup: 'custom-error-popup',
                confirmButton: 'custom-confirm-button'
              }
            });
            return;
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

// function to handle deleting an order
const handleDeleteOrder = async (event) => {
    const id = event.target.getAttribute('data-id');
    //check for id.  If none, throw error message
    if (!id) {
      Swal.fire({
        title: 'Error!',
        text: 'No order found with that ID',
        icon: 'error',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'custom-error-popup',
          confirmButton: 'bg-warning',
        }
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This cannot be undone.  Proceed?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete Order',
        customClass: {
          popup: 'custom-confirm-popup',
          confirmButton: 'custom-confirm-button'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`/api/orders/${id}`, {
              method: 'DELETE',
            });

            if (response.ok) {
              Swal.fire({
                title: 'Deleted!',
                text: `Order ID ${id} has been deleted.  No inventory has been removed.`,
                icon: 'success',
                customClass: {
                  popup: 'custom-confirm-popup',
                  confirmButton: 'custom-confirm-button'
                }
              }).then(() => {
                document.location.replace('/orders');
              });
            } else {
              throw new Error('Failed to delete order');
            }
          } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: error.message,
              icon: 'error',
              customButtonText: 'Okay',
            });
          }
        }
      });
    }
};

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

//event listener for delete order button
document
  .querySelectorAll('.delete-order').forEach(button => {
    button.addEventListener('click', handleDeleteOrder);
  })

// check product availability and make new order
// ----------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

  const availabilityMainContainer = document.querySelector('.availability-container');
  const availabilityFormEl = document.getElementById('available-form');
  const productInputEl = document.getElementById('product');
  const quantityInputEl = document.getElementById('quantity');
  const availabilityBtn = document.getElementById('checkAvailability');
  const placeOrderMainContainer = document.querySelector('.place-order-main-container');
  const orderFormEl = document.getElementById('orderForm');
  const companyNameInput = document.getElementById('companyName');
  const makeOrderbtn = document.getElementById('makeOrder');

  //globally creating message div 
  const messageContainer = document.createElement('div');
  messageContainer.setAttribute('class', 'message-container');
  const message = document.createElement('p');
  message.setAttribute('class', 'message');
  messageContainer.appendChild(message);
  availabilityFormEl.appendChild(messageContainer);


  // CHECK AVAILABILITY
  // --------------------------------------------------------

  const isAvailable = async (event) => {
    try {
      event.preventDefault();
      const productID = productInputEl.value;
      const quantity = parseInt(quantityInputEl.value.trim(), 10);

      if (productID && quantity > 0) {
        const response = await fetch(`/api/availability/${productID}`, {
          method: 'GET',
        });

        if (response.ok) {
          //result should only be stock of specified product
          const data = await response.json();

          //checks stock of product against user input quantity
          if (data >= quantity) {
            document.querySelector('#add-to-order').classList.remove('disabled');
            message.textContent = 'Available'
          } else {
            makeOrderbtn.disabled = false;
            Swal.fire({
              title: 'Warning!',
              text: 'Insufficient stock, replenish before closing order.',
              icon: 'warning',
              confirmButtonText: 'Okay',
              customClass: {
                  popup: 'custom-error-popup',
                  confirmButton: 'bg-warning'
              }
            }).then(async (result) => {
              if (result.isConfirmed) {
                document.querySelector('#add-to-order').classList.remove('disabled');
              }
            })
          }
        } else {
            Swal.fire({
              title: 'Warning!',
              text: 'Product does not exist',
              icon: 'warning',
              confirmButtonText: 'Okay',
              customClass: {
                  popup: 'custom-error-popup',
                  confirmButton: 'bg-warning'
              }
            })
        };

      } else {
        Swal.fire({
          title: 'Error',
          text: 'Please continue filling out form',
          icon: 'error',
          confirmButtonText: 'Okay',
          customClass: {
              popup: 'custom-error-popup',
              confirmButton: 'bg-warning'
          }
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay',
        customClass: {
            popup: 'custom-error-popup',
            confirmButton: 'bg-warning'
        }
      })
    }
    
  };

//temporary array to hold order data
const holdOrder = [];
 
//event listeners to check availability and add items to order
availabilityBtn.addEventListener('click', isAvailable);

document
  .getElementById('add-to-order')
  .addEventListener('click', async function(event) {
      event.preventDefault();
      let order = {
        product_id: productInputEl.value,
        item_name: document.getElementById(`option${productInputEl.value}`).getAttribute('data-name'),
        quantity: quantityInputEl.value,
      }

      await holdOrder.push(order);
      message.innerHTML = 'Continue to add items or proceed to make an order'
      document.getElementById('makeOrder').classList.remove('disabled');
      availabilityFormEl.reset();
})

//event listener to trigger place order sequence
document 
  .getElementById('makeOrder')
  .addEventListener('click', function (event) {
      event.preventDefault();
      placeOrder();
  })

// PLACE AN ORDER
// ---------------------------------------------------------

const placeOrder = () => {
      availabilityMainContainer.style.display = 'none';
      availabilityFormEl.style.display = 'none';
      placeOrderMainContainer.style.display = 'flex';
      orderFormEl.style.display = 'flex';

      //display customer selections for verification before adding to database
      holdOrder.forEach((item) => {
        const list = document.createElement('li');
        list.textContent = `${item.item_name} - ${item.quantity}`
        document.querySelector('.display-order-list').appendChild(list);
      }); 
  };

// SUBMIT THE ORDER TO THE SERVER
// ---------------------------------------------------------------
const handleOrderSubmit = async (event) => {
  event.preventDefault();
  try {
    const company = companyNameInput.value;
    const productOrder = holdOrder.map(item => item.product_id);
    const quantityOrder = holdOrder.map(item => parseInt(item.quantity, 10));

    if (
      company !== 'Select company' &&
      Array.isArray(productOrder) && productOrder.length > 0 &&
      Array.isArray(quantityOrder) && quantityOrder.length > 0 &&
      quantityOrder.every(quantity => !isNaN(quantity) && quantity > 0)
    ) {
      const response = await fetch('/api/orders/make-order', {
        method: 'POST',
        body: JSON.stringify({ company, productOrder, quantityOrder }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        await Swal.fire({
            title: 'Success',
            text: 'The order has been created!',
            icon: 'success',
            confirmButtonText: 'Okay',
            customClass: {
              popup: 'custom-confirm-popup',
              confirmButton: 'custom-confirm-button'
            }
        })
        //refresh the page
        document.location.replace('/orders');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error creating order',
          icon: 'error',
          confirmButtonText: 'Okay',
          customClass: {
              popup: 'custom-error-popup',
              confirmButton: 'bg-warning'
          }
        })
        return;
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Order form is not completely filled out',
        icon: 'error',
        confirmButtonText: 'Okay',
        customClass: {
            popup: 'custom-error-popup',
            confirmButton: 'bg-warning'
        }
      })
      return;
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Okay',
      customClass: {
          popup: 'custom-error-popup',
          confirmButton: 'bg-warning'
      }
    })
  }
};

orderFormEl.addEventListener('submit', handleOrderSubmit);

});