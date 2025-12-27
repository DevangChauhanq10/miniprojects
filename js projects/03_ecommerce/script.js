document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Milk", price: 30.99 },
    { id: 2, name: "Bread", price: 20.0 },
    { id: 3, name: "Wine", price: 59.999 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span> 
    <button data-id="${product.id}">Add to cart</button> 
    `; //product is from forEach
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

