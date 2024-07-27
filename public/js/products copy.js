// const getAllProducts = async () => {
//   try {
//     const response = await fetch(`/api/products`, {
//       method: 'GET'
//     });
    
//     if (response.ok) {
//       document.location.replace('/api/products');
//     } else {
//       throw new Error('Failed to GET products');
//     }
//   } catch (error) {
//     Swal.fire({
//       title: 'Error!',
//       text: error.message,
//       icon: 'error',
//       confirmButtonText: 'Okay'
//     });
//   }
// };

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

const toggleProductForm = () => {
  const toggleDisplay = document.querySelector('#add-product-form');
  toggleDisplay.classList.toggle('d-none');
};

const addProduct = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#product-name').value.trim();
  const price = document.querySelector('#product-price').value.trim();
  const stock = document.querySelector('#product-stock').value.trim();
  const category = document.querySelector('#category-dropdown').value;

  if (name && price && stock) {
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

const editProduct = async (event) => {
  if (event.target.classList.contains('edit-product')) {
    const id = event.target.getAttribute('data-id');

    // Fetch the current product data (optional but useful)
    const response = await fetch(`/api/products/${id}`);
    const product = await response.json();

    Swal.fire({
      title: 'Edit Product',
      html: `
        <input type="text" id="swal-product-name" class="swal2-input" placeholder="Name" value="${product.name}">
        <input type="text" id="swal-product-price" class="swal2-input" placeholder="Price" value="${product.price}">
        <input type="text" id="swal-product-stock" class="swal2-input" placeholder="Stock" value="${product.stock}">
        <select class="form-select mb-1" aria-label="swal-category-dropdown" id="category-dropdown">
          <option selected>Select a Category</option>
          {{#each categories}} 
          <option value="{{id}}">{{name}}</option>
          {{/each}}
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const productName = document.getElementById('swal-product-name').value;
        const productPrice = document.getElementById('swal-product-price').value;
        const productStock = document.getElementById('swal-product-stock').value;
        const category = document.getElementById('swal-category-dropdown').value;
        return { productName, productPrice, productStock, category };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { productName, productPrice, productStock, category } = result.value;
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name: productName, price: productPrice, stock: productStock, category_id: category }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            Swal.fire({
              title: 'Updated!',
              text: `Product ID: ${id} has been updated.`,
              icon: 'success',
              customClass: {
                popup: 'custom-confirm-popup',
                confirmButton: 'custom-confirm-button'
              }
            }).then(() => {
              document.location.replace('/products');
            });
          } else {
            throw new Error('Failed to update product');
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

document.getElementById('show-modal').addEventListener('click', function() {
  Swal.fire({
      title: 'Multiple Inputs',
      html: `
          <input type="text" id="swal-input1" class="swal2-input" placeholder="Input 1">
          <input type="text" id="swal-input2" class="swal2-input" placeholder="Input 2">
          <input type="text" id="swal-input3" class="swal2-input" placeholder="Input 3">
      `,
      focusConfirm: false,
      preConfirm: () => {
          return [
              document.getElementById('swal-input1').value,
              document.getElementById('swal-input2').value,
              document.getElementById('swal-input3').value
          ];
      }
  }).then((result) => {
      if (result.isConfirmed) {
          console.log(result.value); // Output the array of input values
      }
  });
});

// document
//     .querySelector('#all-products')
//     .addEventListener('click', getAllProducts);

// document
//     .querySelector('#product-by-id')
//     .addEventListener('click', productById);

document
    .querySelector('#add-product')
    .addEventListener('click', toggleProductForm);

document
    .querySelector('#product-submit')
    .addEventListener('click', addProduct);

document.addEventListener('click', deleteProduct);