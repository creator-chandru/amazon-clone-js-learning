export const deliveryOptions =  [{
    id : '1',
    deliveryDays : 7,
    deliveryPrice : 0
},{
    id : '2',
    deliveryDays : 5,
    deliveryPrice : 499
},{
    id : '3',
    deliveryDays : 3,
    deliveryPrice : 999
}];

export function findDeliveryMethod(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if (option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}