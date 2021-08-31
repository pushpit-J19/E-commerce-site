
var CART = JSON.parse(localStorage.getItem('cart'));
var totalQty = 0, subTotal = 0;
console.log(CART);
$(function() {
    $.getJSON('../shirts.json', function(data) {
        $.each(CART, function(key, val) {
        
            item = document.getElementById("item").content.querySelector("div");
            a = document.importNode(item, true);
            a.setAttribute("id", key);
            console.log("oi",a);

            a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src = data[key].img;
            a.getElementsByTagName("div")[0].getElementsByTagName("div")[1].getElementsByTagName("div")[0].innerHTML = data[key].title;
            a.getElementsByTagName("div")[0].getElementsByTagName("div")[1].getElementsByTagName("div")[1].innerHTML = data[key].description;
            
            a.getElementsByTagName("div")[5].getElementsByTagName("span")[1].innerHTML =  key;
            a.getElementsByTagName("div")[5].getElementsByTagName("span")[2].innerHTML =  val;
            a.getElementsByTagName("div")[5].getElementsByTagName("span")[4].innerHTML =  key;
            
            var currTotal = parseInt(data[key].price.slice(1,))*parseInt(val);
            a.getElementsByTagName("div")[6].getElementsByTagName("span")[0].innerHTML += data[key].price;
            a.getElementsByTagName("div")[7].getElementsByTagName("span")[0].innerHTML = data[key].price[0] + currTotal;
            
            totalQty += parseInt(val);
            subTotal += currTotal;
            document.getElementById("items").appendChild(a);
          
        });

        // No of items 
        $(".no-of-items").html(totalQty);

        // Sub Total Amount
        $("#sub-total-amt").html(subTotal);

        // Total Payable amount
        var deliveryType = document.getElementsByTagName("select")[0];
        $("#total-amt").html('$' + (subTotal+5));
        deliveryType.onchange = function(){
            if (deliveryType.selectedIndex == 0){
                $("#total-amt").html('$' + (subTotal+5));
            }else{
                $("#total-amt").html('$' + (subTotal+15));
            }
        }
        
    });

});

function changeAmt(text){
    var sign = $(text).text()[0];
    var key = $(text).text().slice(1,);
    var qtyElement = text.parentElement.getElementsByTagName("span")[2];
    var superParent = text.parentElement.parentElement.parentElement;
    var currTotal = superParent.getElementsByTagName("div")[0].getElementsByTagName("div")[6].getElementsByTagName("span")[0].innerHTML.slice(1,);
    currTotal = parseInt(currTotal);
    $.getJSON('../shirts.json', function(data) {
        var tmp = parseInt(data[key].price.slice(1,));
        if (sign=="+"){
            CART[key] += 1;
            subTotal += tmp;
            currTotal += tmp;
            totalQty += 1;
            
        }else {
            if(qtyElement.innerHTML != 1){
                CART[key] -= 1;
                subTotal -= tmp;
                currTotal -= tmp;
                totalQty -= 1;
            }
            
        }
        localStorage.setItem("cart", JSON.stringify(CART));
        console.log(CART);
        qtyElement.innerHTML = CART[key];
        console.log("here: ", currTotal);
        superParent.getElementsByTagName("div")[0].getElementsByTagName("div")[6].getElementsByTagName("span")[0].innerHTML = '$'+currTotal.toString();
        
        $(".no-of-items").html(totalQty);
        $("#sub-total-amt").html(subTotal);

        var deliveryType = document.getElementsByTagName("select")[0];
        $("#total-amt").html('$' + (subTotal+5));
        if (deliveryType.selectedIndex == 0){
            $("#total-amt").html('$' + (subTotal+5));
        }else{
            $("#total-amt").html('$' + (subTotal+15));
        }

    
    });
    
}



function checkout(){
    // PAYMENT AND OTHER OPTIONS LIKE CREDIT CARD
    // ==========================================
    // After payment
    alert("Thankyou! Please pay amount : "+ document.getElementById("total-amt").innerHTML);
    window.localStorage.removeItem("cart");
    window.location.reload();
}

function deleteItem(item){ 
    var key = item.parentElement.parentElement.parentElement.id;
    console.log(key);
    var CART = JSON.parse(localStorage.getItem('cart'));
    delete CART[key];
    localStorage.setItem("cart", JSON.stringify(CART));
    window.location.reload();
}