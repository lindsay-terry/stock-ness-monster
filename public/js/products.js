const getAllProducts = async () => {
  try {
    const response = await fetch(`/api/products`, {
      method: 'GET'
    });
    
    if (response.ok) {
      document.location.replace('/api/products');
    } else {
      throw new Error('Failed to GET products');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Okay'
    });
  }
};

const productById = async () => {
  const id = document.querySelector('#product-id-input').value;
  console.log(id)
  if (!id) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter a product ID',
      icon: 'error',
      confirmButtonText: 'Okay'
    });
    return;
  }
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'GET'
    });
    
    if (response.ok) {
      document.location.replace(`/api/products/${id}`);
    } else {
      throw new Error('Failed to GET product by id');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Okay'
    });
  }
};

const displayProductForm = () => {
  const toggleDisplay = document.querySelector('#product-form');
  toggleDisplay.classList.toggle('d-none');
};

const addProduct = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#product-name').value.trim();
  const price = document.querySelector('#product-price').value.trim();
  const stock = document.querySelector('#product-stock').value.trim();

  if (name && price && stock) {
    try {
      const response = await fetch(`/api/products`, { 
        method: 'POST',
        body: JSON.stringify({ name, price, stock }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: `Added ${name} to products.`,
          icon: 'success',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'custom-confirm-popup',
            confirmButton: 'custom-confirm-button'
          }
        }).then(() => {
          document.location.replace('/products');
        });
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }
};

const deleteProduct = async (event) => {
  console.log('in delete function')
  if (event.target.classList.contains('delete-product')) {
    const id = event.target.getAttribute('data-id');

    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'custom-confirm-popup',
        confirmButton: 'custom-confirm-button'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            Swal.fire({
              title: 'Deleted!',
              text: `Product ID: ${id} has been destroyed.`,
              icon: 'success',
              customClass: {
                popup: 'custom-confirm-popup',
                confirmButton: 'custom-confirm-button'
              }
            }).then(() => {
              document.location.replace('/products');
            });
          } else {
            throw new Error('Failed to delete product');
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      }
    });
  }
};

document
    .querySelector('#all-products')
    .addEventListener('click', getAllProducts);

document
    .querySelector('#product-by-id')
    .addEventListener('click', productById);

document
    .querySelector('#add-product')
    .addEventListener('click', displayProductForm);

document
    .querySelector('#product-submit')
    .addEventListener('click', addProduct);

document.addEventListener('click', deleteProduct);