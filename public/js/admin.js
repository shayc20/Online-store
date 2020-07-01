// global variables
var serverURL = "http://localhost:8080/API/";
var items =[];

function init(){
    console.log('Admin Page');

    $("#btn-register").on('click',function(){
        register();
    })
    
}

window.onload=init;

// object constructor
class Item{
    constructor(code,title,price,description,category,image){
        this.code=code;
        this.title=title;
        this.price=price;
        this.description=description;
        this.category=category;
        this.image=image;
        this.user="shay"
    }
}
// register function

function register(){

    // get from form
    var code =$("#code").val();
    var title=$("#title").val();
    var price=$("#price").val();
    var description=$("#description").val();
    var category=$("#category").val();
    var image=$("#image").val();
    if(code !="" && title!="" && price !=""){ //no empty values
    // create the object
    var newItem = new Item(code,title,price,description,category,image);
    // push item into array
        items.push(newItem);
        var jsonString = JSON.stringify(newItem);
    // display item on console
    console.log(newItem);
    console.log(jsonString);
    
    }  
    else{
        alert("add a code, title and price!")
    }
    
    $.ajax({
        url:`${serverURL}items`,
        type:"POST",
        contentType:"application/json",
        data:jsonString,
        success:function(response){
            console.log("It worked!",response);
            // show notification
            $("#alert-box").removeClass("hidden");
            // hide notification
            setTimeout(function(){
                $("#alert-box").addClass("hidden");
            },3000);
            
        },
        error:function(errorDetails){
            console.log("Something went wrong.. ", errorDetails);
            
        }
    });
    clearForm();
}

function clearForm(){
    $("#code").val("");
    $("#title").val("");
    $("#price").val("");
    $("#description").val("");
    $("#category").val("");
    $("#image").val("");
}