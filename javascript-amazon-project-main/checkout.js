import {cart, removeFromCart} from './data/cart.js';
import {products} from './data/products.js';
import { formatCurrency } from './utilities/money.js';
import dayjs from 'https://cdn.skypack.dev/dayjs';
import {deliveryOptions} from './data/deliveryOptions.js';

let cartSummaryHTML = '';

console.log(dayjs());
console.log(dayjs().format('dddd, MMMM, D'));
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `<div class="cart-item-container js-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src=${matchingProduct.image}>

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionHTML (matchingProduct)}
            </div>
        </div>
        </div>`
});

function deliveryOptionHTML (matchingProduct){
    let HTML = '';

    deliveryOptions.forEach((deliveryOption)=>{
        let deliveryDate = dayjs().add(deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        let priceString = deliveryOption.deliveryPrice ? `$${formatCurrency(deliveryOption.deliveryPrice)} - ` : 'FREE';

        HTML += `<div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>`;
    });
    return HTML;
}

document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.delete-quantity-link').forEach((del)=>{
    del.addEventListener('click',()=>{
        let productId = del.dataset.productId;
        removeFromCart(productId);
        const product = document.querySelector(`.js-item-container-${productId}`);
        product.remove();
    });
});