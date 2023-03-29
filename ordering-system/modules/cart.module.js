let cart = {
    recipes: [],
    count: 0,
    child:{},
    recipeMap: {},
    amount: {
        total: 0,
        taxes: 0,
        totalWithTax: 0,
    },
    init: function () {
        this.count = 0;
        this.recipeMap = {};
        this.recipes = utility.localStorage.get(CART_ITEMS) || [];
        for (let recipe of this.recipes) {
            this.recipeMap[recipe.id] = recipe;
            this.count += recipe.quantity;
        }
    },
    update: function (recipe, action) {
        let recipeObj = this.getRecipeObject(recipe);
        let count;
        if (action === 'add') {
            count = recipeObj.quantity + 1;
        } else if (action == 'none') {
            count = this.getCurrentCount(recipe);
        } else if (action == 'addOpen') {
            count = recipeObj.quantity + 1;
        }
        else {
            count = recipeObj.quantity - 1;
        }
           
        let index = this.recipes.findIndex(rec => rec.id === recipe.id);
        if (count === 0) {
            if (index !== -1) {
                this.recipes.splice(index, 1);
            }
        } else {
            recipeObj = {
                ...recipeObj,
                quantity: count,
                totalPrice: this.child.child_price ? count * recipeObj.child_price  :  count * recipeObj.price,
                child_id: this.child.child_id,
                child_price:this.child.child_price,
                child_name:this.child.child_name
            }
            if (index === -1) {
                this.recipes.push(recipeObj);
            } else {
                this.recipes[index] = {...recipeObj};
            }
        }
        utility.localStorage.set(CART_ITEMS, this.recipes);
        this.init();
    },
    getRecipeObject: function (recipe) {
        return {
            id: recipe.id,
            name: recipe.name,
            price: recipe.price,
            statusId: RESTAURANT_ORDER_INITIATED,
            image: (recipe.recipe_images && recipe.recipe_images.length > 0) ? recipe.recipe_images[0] : "",
            quantity: this.getCurrentCount(recipe),
            child_id: this.child.child_id,
            child_name : this.child.child_name,
            child_price: this.child.child_price
        }
    },
    getCurrentCount: function (recipe) {
        return this.recipeMap[recipe.id] ? this.recipeMap[recipe.id].quantity : 0;
    },
    calculatePayableAmount: function (tax) {
        let totalPrice = 0;
        for (let recipe of this.recipes) {
            totalPrice += recipe.totalPrice;
        }
        this.amount.total = totalPrice;
        this.amount.taxes = parseFloat((totalPrice * (tax / 100)).toFixed(2));
        this.amount.totalWithTax = (this.amount.total + this.amount.taxes);
    },
}

cart.init();
