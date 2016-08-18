// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

$('form').on('submit', function(el) {
  el.preventDefault();
  order();
  basePrice(OrderInfo.size);
  saucePrice(OrderInfo.sauce);
  toppingPrice(OrderInfo.topping);
  toppingExtra(OrderInfo.topping);
  console.log(total);
  console.log(OrderInfo);
});

var OrderInfo = {
  size: '',
  crust: '',
  sauce: '',
  topping: [],
  option: [],
  delivery: true,
  deliveryInfo: deliveryInfo(),
  totalPrice: totalPrice()
};

var total =0;

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
  return OrderInfo;
}

function basePrice() {
  if (OrderInfo.size === 'small') {
    total += 5;
  } else if (OrderInfo.size === 'medium') {
    total += 10;
  } else {
    total += 15;
  }
}

function saucePrice() {
  if (OrderInfo.sauce === 'cream') {
    total += 1.5;
  }
}

function toppingPrice() {
  total += OrderInfo.topping.length * 0.75;
  console.log(OrderInfo.topping);
}

function toppingExtra() {
  for (var i = 0; i < OrderInfo.topping.length; i++) {
    if (OrderInfo.topping[i] === 'bacon') {
      total += 0.5;
    }
    if (OrderInfo.topping[i] === 'chicken') {
      total += 0.5;
    }
  }
}

function deliveryInfo() {

}

function totalPrice() {

}
