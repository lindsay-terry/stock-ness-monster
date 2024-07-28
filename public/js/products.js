const toggleProductForm = () => {
  const toggleDisplay = document.querySelector('#add-product-form');
  toggleDisplay.classList.toggle('d-none');
};

const addProduct = async (event) => {
  event.preventDefault();

  const name = document.getElementById('add-product-name').value.trim();
  const price = document.getElementById('add-product-price').value.trim();
  const stock = document.getElementById('add-product-stock').value.trim();
  const category = document.getElementById('add-category-dropdown').value;

  if (name && price && stock && category) {
    try {
      const response = await fetch(`/api/products`, { 
        method: 'POST',
        body: JSON.stringify({ name, price, stock, category }),
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

const enableEditProduct = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.getElementById(`product-name-${id}`).disabled = false;
  document.getElementById(`product-price-${id}`).disabled = false;
  document.getElementById(`product-stock-${id}`).disabled = false;
  document.getElementById(`category-dropdown-${id}`).disabled = false;

  document.querySelector(`.edit-product[data-id="${id}"]`).classList.add('d-none');
  document.querySelector(`.delete-product[data-id="${id}"]`).classList.add('d-none');
  document.querySelector(`.save-product[data-id="${id}"]`).classList.remove('d-none');
  document.querySelector(`.cancel-product[data-id="${id}"]`).classList.remove('d-none');
}

const cancelEditProduct = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.getElementById(`product-name-${id}`).disabled = true;
  document.getElementById(`product-price-${id}`).disabled = true;
  document.getElementById(`product-stock-${id}`).disabled = true;
  document.getElementById(`category-dropdown-${id}`).disabled = true;

  document.querySelector(`.edit-product[data-id="${id}"]`).classList.remove('d-none');
  document.querySelector(`.delete-product[data-id="${id}"]`).classList.remove('d-none');
  document.querySelector(`.save-product[data-id="${id}"]`).classList.add('d-none');
  document.querySelector(`.cancel-product[data-id="${id}"]`).classList.add('d-none');
}

const editProduct = async (event) => {
  const id = event.target.getAttribute('data-id');
  const editName = document.getElementById(`product-name-${id}`).value.trim();
  const editPrice = document.getElementById(`product-price-${id}`).value.trim();
  const editStock = document.getElementById(`product-stock-${id}`).value.trim();
  const editCategory = document.getElementById(`category-dropdown-${id}`).value;
  if (editName && editPrice && editStock && editCategory) {
    try {
      const response = await fetch(`/api/products/${id}`, { 
        method: 'PUT',
        body: JSON.stringify({ item_name: editName, price: editPrice, stock: editStock, category_id: editCategory }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: `Edited product ${id}.`,
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
        throw new Error('Failed to edit product');
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
};

const deleteProduct = async (event) => {
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
    .querySelector('.add-product')
    .addEventListener('click', addProduct);

document.querySelectorAll('.edit-product').forEach(button => {
  button.addEventListener('click', enableEditProduct);
});

document.querySelectorAll('.cancel-product').forEach(button => {
  button.addEventListener('click', cancelEditProduct);
});

document.querySelectorAll('.save-product').forEach(button => {
  button.addEventListener('click', editProduct);
});

document.addEventListener('click', deleteProduct);