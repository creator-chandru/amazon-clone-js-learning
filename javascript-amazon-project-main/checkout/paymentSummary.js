import {findProduct} from '../data/products.js';
import {cart} from '../data/cart.js';

export function renderPaymentsummary () {
    let totalPrice = 0;
    cart.forEach((cartItem)=>{
        let product = findProduct(cartItem.productId);
        totalPrice += cartItem.quantity * product.priceCents;
        console.log(totalPrice);
    });
}
