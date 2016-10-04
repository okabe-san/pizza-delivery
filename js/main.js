$(document).on('ready', function() {
  console.log('sanity check!');
  $('.sizeCheck input:checkbox').click(function() {
    $('.sizeCheck input:checkbox').not(this).prop('checked', false);
  });
  $('.crustCheck input:checkbox').click(function() {
    $('.crustCheck input:checkbox').not(this).prop('checked', false);
  });
  $('.sauceCheck input:checkbox').click(function() {
    $('.sauceCheck input:checkbox').not(this).prop('checked', false);
  });
  $('.deliveryCheck input:checkbox').click(function() {
    $('.deliveryCheck input:checkbox').not(this).prop('checked', false);
  });
});

$('.placeOrder').on('submit', function(el) {
  el.preventDefault();
  order();
  basePrice(OrderInfo.size);
  saucePrice(OrderInfo.sauce);
  toppingPrice(OrderInfo.topping);
  toppingExtra(OrderInfo.topping);
  option(OrderInfo.option);
  deliveryInfo(OrderInfo.delivery);
  showInfo();
  total = 0;
  deliveryFee = 0;
  validateOrder();
});

var total = 0;
var deliveryFee = 0;
var OrderInfo = {
  size: '',
  crust: '',
  sauce: '',
  topping: [],
  option: [],
  delivery: true,
};

function order() {
  OrderInfo.size = $('input:checkbox[name="size"]:checked').val();
  OrderInfo.crust = $('input:checkbox[name="crust"]:checked').val();
  OrderInfo.sauce = $('input:checkbox[name="sauce"]:checked').val();
  OrderInfo.topping = $('input:checkbox[name="topping"]:checked').map(function (index, el) {
    return el.value;
  });
  OrderInfo.option = $('input:checkbox[name="option"]:checked').map(function (index, el) {
    return el.value;
  });
  OrderInfo.delivery = $('input:checkbox[name="delivery"]:checked').val();
  return OrderInfo;
}

function basePrice() {
  if (OrderInfo.size === 'small') {
    total += 5.00;
  } else if (OrderInfo.size === 'medium') {
    total += 10.00;
  } else if (OrderInfo.size === 'large') {
    total += 15.00;
  } else {
    total += 0.00;
  }
}

function saucePrice() {
  if (OrderInfo.sauce === 'cream') {
    total += 1.50;
  }
}

function toppingPrice() {
  total += OrderInfo.topping.length * 0.75;
}

function toppingExtra() {
  var temp = OrderInfo.topping.filter(function (index, el) {
    return ['bacon', 'chicken'].indexOf(el) > -1;
  });
  total +=  temp.length * 0.50;
}

function option() {
  for (var i = 0; i < OrderInfo.option.length; i++) {
    if (OrderInfo.option[i] === 'extra cheese') {
      total += 1.00;
    }
    if (OrderInfo.option[i] === 'bread sticks') {
      total += 5.00;
    }
  }
}

function deliveryInfo() {
 if (OrderInfo.delivery) {
   deliveryFee += 5.00;
 }
}

function enabledInfo(checkbox) {
  var toggle = document.getElementById('info');
  if($(toggle).prop('disabled')=== true) {
    ($(toggle).prop('disabled', false));
  } else {
    ($(toggle).prop('disabled', true));
  }
}

function validateOrder() {
  var a = $('input:checkbox[name="size"]:checked').val();
  var b = $('input:checkbox[name="crust"]:checked').val();
  var c = $('input:checkbox[name="sauce"]:checked').val();
  if (a === undefined || b === undefined || c === undefined) {
    $('.warningTitle'). append('<h2>Order Warning</h2>');
  }
  if (a === undefined) {
    $('.warning').append('<p>* Please choose size beore order.</p>');
  } if (b === undefined) {
    $('.warning').append('<p>* Please choose crust beore order.</p>');
  } if (c === undefined) {
    $('.warning').append('<p>* Please choose sauce beore order.</p>');
  }
  return false;
}

function showInfo() {
  $('.sub, .tax, .fee, .total, .tip, .size, .crust, .sauce, .topping, .option').empty();
  $('.sub').append('<p>Subtotal: $ ' + total.toFixed(2) + '</p>');
  $('.tax').append('<p>Tax (8%): $ ' + (total * 0.08).toFixed(2) + '</p>');
  $('.fee').append('<p>Delivery Fee: $ ' + deliveryFee.toFixed(2) + '</p>');
  var totalAmount = (total + (total * 0.08) + deliveryFee).toFixed(2);
  $('.total').append('<p>Total: $ ' + totalAmount + '</p>');
  var tipSuggestion = ((total + (total * 0.08) + deliveryFee) * 0.15).toFixed(2);
  $('.tip').append('<p>Suggestion Tip (15%): $ ' + tipSuggestion + '</p>');
  // get topping choices
  var toppings = [];
  for(i = 0; i < OrderInfo.topping.length; i++) {
    toppings.push(' ' + OrderInfo.topping[i]);
  }
  // get options
  var options = [];
  for(i = 0; i < OrderInfo.option.length; i++) {
    options.push(' ' + OrderInfo.option[i]);
  }
  $('.size').append('<p>Size: ' + OrderInfo.size + '</p>');
  $('.crust').append('<p>Crust: ' + OrderInfo.crust + '</p>');
  $('.sauce').append('<p>Sauce: ' + OrderInfo.sauce + '</p>');
  $('.topping').append('<p>Toppings: ' + toppings + '</p>');
  $('.option').append('<p>Options: ' + options + '</p>');
}
