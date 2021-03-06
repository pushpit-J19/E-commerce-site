// Adding a new row in the page
if (document.getElementsByClassName("row").length === 0 ){
  item = document.getElementById("newrow").content.querySelector(".row");
  a = document.importNode(item, true);
  document.getElementById("products").appendChild(a);
}

// CART related activites maintained with an object
var CART = {};
if (localStorage.getItem("cart")===""){
  localStorage.setItem('cart', JSON.stringify(CART));
}

function addToCart(item){
  // Function to add items to cart from detail page with quantity called by the button
  var CART = localStorage.getItem('cart');
  var qty =parseInt(document.getElementById("qty").value);
  item = item.getElementsByTagName("span")[0].innerHTML;
  if (CART !== null){
    CART = JSON.parse(CART);
  }else{
    CART = {};
  }
  
  if (item in CART){
    CART[item] += qty;
  }else{
    CART[item] = qty
  }

  console.log(CART);
  localStorage.setItem('cart', JSON.stringify(CART));

  alert(qty + " item(s) added to the cart.")

}

function detailPg(item){
  // Function called when a customer wants to see details of the item
  // Redirects to the required page, which is then populated by Javascript
  key = item.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML;
  window.location.href = "detail.html";
  localStorage.setItem("currItem" , key);  
};

function goToCart(){
  // function to redirect to the cart page
  window.location.href = "cart.html";
}


if(window.location.href !== "detail.html"){

$(function() {

  $.getJSON('../shirts.json', function(data) {
      $.each(data, function(key, val) {
        const title = val.title ;
        const description = val.description ;
        const price = val.price ;
        const img = val.img ;

        newitem = document.getElementById("newitem");
        if (newitem!==null){
          newitem = newitem.content.querySelector("div");
          a = document.importNode(newitem, true);     // creating a new node from the template


          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[0].innerHTML = title;
          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML = description;
          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[1].innerHTML = price;
          a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = key;
          pageimg = a.getElementsByTagName("div")[0].getElementsByTagName("img")[0]
          pageimg.src = img;
          pageimg.style.width = "100%";
          pageimg.style.height = "18rem";

          var rows = document.getElementsByClassName("row");
          var lastrow = rows[ rows.length - 1];
          if (lastrow.getElementsByClassName("item").length == 4){
            newrow = document.getElementById("newrow").content.querySelector(".row");
            tmp = document.importNode(newrow, true);
            document.getElementById("products").appendChild(tmp);
            rows = document.getElementsByClassName("row");
            lastrow = rows[ rows.length - 1];
          }

          lastrow.appendChild(a);     // change [0] to [-1]
        }
    });

  });

});

}


// ROUGH

/* // t = shirts.json;
t=[]
for (var i=0; i<3; i++){
  item = document.getElementById("newitem").content.querySelector("div");
  a = document.importNode(item, true);
  a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[0].innerHTML = "yare yare";
  document.getElementsByClassName("row")[0].appendChild(a);     // change [0] to [-1]
}
 */

/*   
  fetch('https://api.coinmarketcap.com/v2/ticker/1312/')
  .then(shirt => shirts.json())
  .then((shirt) => {
    const title = shirt.title ;
    const description = shirt.description ;
    const price = shirt.price ;
    const img = shirt.img ;
    

  });
 */