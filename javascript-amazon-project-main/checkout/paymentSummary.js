import {findProduct} from '../data/products.js';
import {cart} from '../data/cart.js';
import {findDeliveryMethod} from '../data/deliveryOptions.js';
import {formatCurrency} from '../utilities/money.js';

export function renderPaymentSummary() {
    let totalPrice = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem)=>{
        let product = findProduct(cartItem.productId);
        totalPrice += cartItem.quantity * product.priceCents;

        const deliveryOption = findDeliveryMethod(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.deliveryPrice;
    });
    console.log(totalPrice);
    console.log(shippingPrice);
    const totalBeforeTax = totalPrice + shippingPrice;
    console.log(totalBeforeTax);
    const tax = 0.10 * totalBeforeTax;
    console.log(tax);
    let paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax + tax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}