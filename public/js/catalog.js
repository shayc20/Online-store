// global variables

// var items =[
//     {
//         code: '1tvs',
//         title: 'TV Samsung',
//         price: 1000,
//         description:'Long description',
//         category:'Electronics',
//         image:'https://www.bhphotovideo.com/images/images2500x2500/samsung_un32n5300afxza_n5300_series_32_smart_1395974.jpg'
//     },
//     {
//         code: '1ph10',
//         title: 'iphone',
//         price: 100,
//         description:'Long description',
//         category:'mobile device',
//         image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&amp;hei=1058&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1567022175704'
//     },
//     {
//         code:'2spk',
//         title:'speakers',
//         price:10,
//         description:'long description',
//         category:'sound',
//         image:'https://images-na.ssl-images-amazon.com/images/I/71o5w0ZfptL._AC_SL1500_.jpg'
//     }
// ];
var items = [];
var serverURL = "http://localhost:8080/API/";

function fetchCatalog() {
    // get the items from the server
    $.ajax({
        url:`${serverURL}items`,
        type: "GET",
        success: function (res) {
            console.log("it Works" + res);
            for (var i = 0; i < res.length; i++) {
                if (res[i].user == "shay") {
                    items.push(res[i]);
                }
            }
            displayCatalog();


        },
        error: function (details) {
            console.log("error" + details);

        }
    });
}

function displayCatalog() {
    // travel items array
    for (var i = 0; i < items.length; i++) {
        //get element from array
        var product = items[i];
        drawItem(product);
    }
}

function drawItem(product) {
    var layout = `
    <div class="item" id="${product.code}">
        <img src="${product.image}">
        <h4>${product.title}</h4>
        <h6 class="itemPrice">$ ${product.price}</h6>
        <p>${product.description}</p>
        <button class="btn btn-primary">Add to Cart</button>
    </div>`;
    //display on DOM
    $('#catalog').append(layout);
}

function search(){
    
    var searchText=$("#search").val();
    $("#catalog").html("");
    for(var i=0;i<items.length;i++){
        var item = items[i];
        if(item.title.toLowerCase().includes(searchText.toLowerCase())){
            drawItem(item);
        }
    }
}


function init() {
    console.log('catalog page');
    fetchCatalog();
    $("#btn-search").click(search);

}

window.onload = init;