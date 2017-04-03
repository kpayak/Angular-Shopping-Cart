var ngCart = angular.module("ngCart", ["ngRoute"]);

// ROUTER
ngCart.config(function($routeProvider) {
    $routeProvider

        .when("/", {
        templateUrl: "main.html"
    })

    .when("/checkout", {
        templateUrl: "checkout.html",
        controller: "cartController"
    });
});

ngCart.controller("catalogController", function(cartService) {
    this.inventory = [{
        "Title": "Nature's Fresh Organic Honey",
        "Src": "images/honey.jpg",
        "Price": 3.00,
        "Weight": "2 lb.",
        "Quantity": 1
    }, {
        "Title": "5-grain Organic Wheat Bread",
        "Src": "images/bread.jpg",
        "Price": 2.00,
        "Weight": "1 lb.",
        "Quantity": 1
    }, {
        "Title": "Breakfast Oats-Chinese Flavored",
        "Src": "images/oats.jpg",
        "Price": 1.00,
        "Weight": "1 lb.",
        "Quantity": 1
    }, {
        "Title": "Certified Organic Toor Daal",
        "Src": "images/dal.jpg",
        "Price": 7.00,
        "Weight": "5 lb.",
        "Quantity": 1
    }, {
        "Title": "Cadbury Chocolate Bar",
        "Src": "images/dairymilk.jpg",
        "Price": 2.00,
        "Weight": "400 ounces",
        "Quantity": 1
    }];
    this.incrementQuantity = function(index) {
        this.inventory[index].Quantity += 1;
    }
    this.decrementQuantity = function(index) {
        if (this.inventory[index].Quantity >= 2) {
            this.inventory[index].Quantity -= 1;
        }
    }

    this.addToCart = function(index) {
        cartService.cartItems.push(this.inventory[index]);
        // console.log("Clicked:", this.inventory[index]);
    }
});


//CART SERVICE
ngCart.service('cartService', function() {
    this.cartItems = [];
});

// CART CONTROLLER
ngCart.controller('cartController', function(cartService) {

    this.cartItems = cartService.cartItems;
    this.showCart = false;
    this.toggleCart = function() {
        this.showCart = !this.showCart;
    }

    //CALCULATE CART TOTAL
    this.updateCartTotal = function() {
        this.cartTotal = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            this.cartTotal += parseInt(this.cartItems[i].Price) * parseInt(this.cartItems[i].Quantity);
        }
        //TAX - 10%
        this.tax = this.cartTotal * 0.1;
        //Price with TAX
        this.taxPrice = this.tax + this.cartTotal;
    }

    //REMOVE item
    this.removeItem = function(index) {
        this.cartItems.splice(index, 1);
        this.updateCartTotal();
    }
});

//Sort dropdown controller
ngCart.controller('sortController', function() {
    this.toggleDropdown = function() {

    }
});
