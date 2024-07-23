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

document
    .querySelector('#all-products')
    .addEventListener('click', getAllProducts);

document
    .querySelector('#product-by-id')
    .addEventListener('click', productById);