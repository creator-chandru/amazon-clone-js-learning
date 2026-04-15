import {findProduct} from '../data/products.js';
import {cart} from '../data/cart.js';
import {findDeliveryMethod} from '../data/deliveryOptions.js';

export function renderPaymentsummary () {
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
}