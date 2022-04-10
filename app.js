
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeIcon = document.querySelector('#close-cart');

cartIcon.onclick = () => {
  cart.classList.add('active');
}
closeIcon.onclick = () => {
  cart.classList.remove('active');
}

if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
}else {
  ready();
}

function ready(){
  let removeCartBtn = document.getElementsByClassName('cart-remove');
  console.log(removeCartBtn);
  for (let i = 0; i < removeCartBtn.length; i++) {
    const button = removeCartBtn[i];
    button.addEventListener('click', removeCartItem);
  }
  let quantityInput = document.getElementsByClassName('cart-value');
  for (let i = 0; i < quantityInput.length; i++) {
    const input = quantityInput[i];
    input.addEventListener('change', quantityChange);
  }
  //adicionando ao carrinho
  let addCart = document.getElementsByClassName('add-cart');
  for (let i = 0; i < addCart.length; i++) {
    const button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
  //botão finalizar compra
  document.getElementsByClassName('btn-buy')[0]
  .addEventListener('click', buyButtonClicked);
}
//botão comprar
function buyButtonClicked() {
  alert('Seu pedido foi concluido');
  let cartContent = document.getElementsByClassName('cart-content')[0];
  while(cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  atualizarTotal();
}

//remove items do carrinho
function removeCartItem(item){
  let buttonClicked = item.target;
  buttonClicked.parentElement.remove();
  atualizarTotal();
}

//alterando as quantidades
function quantityChange(event){
  let input = event.target;
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  atualizarTotal();
}

//adicionar no carrinho
function addCartClicked(event){
  let button = event.target;
  let shopProduct = button.parentElement;
  let title = shopProduct.getElementsByClassName('product-title')[0].innerText;
  let price = shopProduct.getElementsByClassName('price')[0].innerText;
  let productImg = shopProduct.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  atualizarTotal();
}

function addProductToCart(title, price, productImg) {
  const cartShop = document.createElement('div');
  cartShop.classList.add('cart-box');
  const cartItem = document.getElementsByClassName('cart-content')[0];
  const cartItemName = cartItem.getElementsByClassName('cart-product-title');

  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert('Vocẽ ja tem esse item adicionado ao carrinho.')
      return;
    }
  }
  const cartBoxContent = `
  <img src="${productImg}" alt="" class="cart-img">
  <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-value">
  </div>
  <i class='bx bx-trash cart-remove'></i>
  `;
  cartShop.innerHTML = cartBoxContent;
  cartItem.append(cartShop);
  cartShop.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
  cartShop.getElementsByClassName('cart-value')[0].addEventListener('change', quantityChange);
}

//atualizando o total
function atualizarTotal(){
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBox = document.getElementsByClassName('cart-box');
  var total = 0;
  for (let i = 0; i < cartBox.length; i++) {
    const box = cartBox[i];
    let priceElement = box.getElementsByClassName('cart-price')[0];
    let valueElement = box.getElementsByClassName('cart-value')[0];
    let price = parseFloat(priceElement.innerText.replace('R$', ''));
    let quantity = valueElement.value;
    total += (price * quantity);
  }

  const totalAbs = total.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
  document.getElementsByClassName('total-price')[0].innerText = totalAbs
}

// teste
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

