angular.module("OrderingSystemApp").controller("CartDetailsCtrl", ["$scope", "AuthService", "OrdersService", function ($scope, AuthService, OrdersService) {

    $scope.cart = {
        items: [],
        formIsSubmit:false,
        dto: {},
        amount: {},
        userDetails:{},
        tables: AuthService.details.tables,
        currency: AuthService.details ? AuthService.details.currency : "",
        orderId: null,
        init: function () {
            this.items = utility.ObjectUtility.clone(cart.recipes);
            if (AuthService.details.selectedTableId) {
                this.dto['selectedTableId'] = AuthService.details.selectedTableId;
                this.userDetails.customer_name = AuthService.details.customer_name;
                this.userDetails.customer_address = AuthService.details.customer_address;
                this.userDetails.customer_mobile_no = AuthService.details.customer_mobile_no;
                this.dto['selectedTableDdDisabled'] = true;
                OrdersService.retrieveTableOrderDetails(AuthService.details.selectedTableId, (error, data) => {
                    if (error) {
                        AuthService.saveUserDetails({
                            selectedTableId: null
                        })
                        this.dto['selectedTableId'] = "";
                        this.dto['selectedTableDdDisabled'] = false;
                        return
                    }
                    this.orderId = data.id;
                    for (let subOrder of data.sub_orders) {
                        for (let recipe of subOrder.sub_order_details) {
                            this.items.push({
                                name: recipe.recipe_name,
                                quantity: recipe.quantity,
                                image: (recipe.images ? recipe.images[0] : ""),
                                price: recipe.current_price,
                                statusId: subOrder.status_id
                            })
                        }
                    }
                })
            }
            this.calculatePayableAmount();
        },
        removeFood: function (recipe) {
            for (let i = 0; i < recipe.quantity; i++) {
                this.alter(recipe, 'remove')
            }
        },
        alter: function (recipe, action) {
            cart.update(recipe, action);
            this.init();
        },
        goBackToHome: function () {
            $scope.goTo(`${AuthService.details.menuKey}`)
        },
        calculatePayableAmount: function () {
            cart.calculatePayableAmount(AuthService.details.tax)
            this.amount = cart.amount;
        },
        placeOrder: function () {
            if (this.dto['btnLoader']) {
                return;
            }
            if (this.items.length === 0) {
                return
            }
            if (this.dto['selectedTableId'] == null) {
                alert("Select table");
                return
            }
            if (this.dto['selectedTableId'] == 1)
            {
                if (!this.userDetails.customer_name && !this.userDetails.customer_mobile_no && !this.userDetails.customer_address) {
                    this.formIsSubmit = true;
                    alert("Please Enter Your Details");
                    return;
                }
            }
            this.formIsSubmit = false;
            let orderList = [];
            for (let orderItem of cart.recipes) {
                if (orderItem.statusId === RESTAURANT_ORDER_INITIATED) {
                    orderList.push({
                        id: orderItem.id,
                        quantity: orderItem.quantity,
                        current_price: orderItem.price,
                        name: orderItem.name,
                        child_id: orderItem.child_id,
                        child_name: orderItem.child_name,
                        child_price: orderItem.child_price
                    })
                }
            }
            let params = {
                table_id: this.dto['selectedTableId'],
                instruction: this.dto['cookingNotes'],
                table_order_id: this.orderId,
                order_details: orderList,
                customer_name: this.userDetails.customer_name,
                customer_address: this.userDetails.customer_address,
                customer_mobile_no: this.userDetails.customer_mobile_no
            }
            this.dto['btnLoader'] = true;
            OrdersService.addNewTableOrder(params, (error, data) => {
                if (error) {
                    return
                }
                let notificationObj = {
                    "title": `New order on ${this.dto['selectedTableId']}`,
                    "body": "Click here to open",
                    "click_action": `${window.location.origin}/landing#!/table-orders/${this.dto['selectedTableId']}`,
                    "icon": AuthService.details.logo
                }
                OrdersService.sendNotification(notificationObj, (error, data) => {
                    if (error) {
                        return
                    }

                    console.log(data)
                })
                AuthService.saveUserDetails({
                    selectedTableId: this.dto['selectedTableId'],
                    customer_name:this.userDetails.customer_name,
                    customer_address:this.userDetails.customer_address,
                    customer_mobile_no:this.userDetails.customer_mobile_no
                })
                utility.localStorage.removeItem(CART_ITEMS);
                cart.init();
                $scope.goTo("/order/order-accepted");
            })
        }
    }

    $scope.pageInit.init(() => {
        $scope.cart.init();
    })
}])