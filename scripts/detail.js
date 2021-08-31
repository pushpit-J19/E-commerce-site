
// populates the detail page based on which item was clicked on

key = localStorage.getItem("currItem");

$(function() {

    $.getJSON('../shirts.json', function(data) {

    a = document.getElementsByClassName("row")[0];
    a.getElementsByClassName("img")[0].src  = data[key].img;
    a.getElementsByClassName("img")[0].alt  = data[key].title;
    a.getElementsByClassName("content")[0].getElementsByClassName("card-title")[0].innerHTML = data[key].title;
    a.getElementsByClassName("content")[0].getElementsByClassName("description")[0].innerHTML = data[key].description;
    a.getElementsByClassName("content")[0].getElementsByClassName("price")[0].innerHTML = data[key].price;


    a.getElementsByTagName("div")[0].getElementsByTagName("button")[0].getElementsByTagName("span")[0].innerHTML = key;

    document.getElementsByTagName("main")[0].appendChild(a);

    });
});

