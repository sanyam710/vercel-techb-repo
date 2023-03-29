angular.module("TechBistro").controller("TableOrdersCtrl", ["$scope", "$routeParams", "AuthService", "$timeout" , "RestaurantService", function ($scope, $routeParams, AuthService,$timeout, RestaurantService) {
    $scope.table = {
        id: $routeParams.tableId,
        list: [],
        dto: {},
        search:'',
        searchChild:'',
        listOfRecipes:[],
        listOfMasterChild:[],
        showQty:false,
        loader: true,
        editRecipe:false,
        order_details:[],
        orderList:[],
        order:[],
        customerDetails:{
            customer_name:null,
            customer_email:null,
            customer_address:null,
            customer_mobile_no:null
        },
        showCustomerDetails:false,
        qty:1,
        kotOrder:[],
        showMenuActive:false,
        showChildMenu:false,
        init: function () {
            this.loader = true;
            this.listOfRecipes = $scope.pageView.userDetails.recipes;
            RestaurantService.orders.getTableOngoingOrder(this.id, (error, data) => {
                if (error) {
                    return;
                }
                this.list = data.sort((a, b) => b.id - a.id);
                if (this.list[0] && this.list[0].status_id === RESTAURANT_ORDER_ONGOING) {
                    this.getOrderDetails(this.list[0]);
                }
                if (this.list.length == 0) {
                    this.showCustomerDetails = true;
                }
                this.loader = false;
            })
        },
        getOrderDetails: function (order) {
            utility.ObjectUtility.setDto(order);
            if (order['dto']['isActive']) {
                order['dto']['isActive'] = false;
                return
            }
            order['dto']['isActive'] = true;
            if (order['subOrders']) {
                return
            }
            order['dto']['loader'] = true;
            RestaurantService.orders.getOrderDetails(order.id, (error, data) => {
                if (error) {
                    return
                }
                if (order['subOrders'] === undefined) {
                    order['subOrders'] = [];
                }
                this.order['subOrders'] = data;
                this.order_id = data.id;
                order['dto']['loader'] = false;
            })
        },
        updateStatus: function () {
            let statusId = RESTAURANT_ORDER_COMPLETED;
            this.dto['statusUpdateBtnLoader'] = true;
            if ($scope.popOver.data.hasOwnProperty('sub_order_details')) {
                RestaurantService.orders.updateSubOrder($scope.popOver.data.id, statusId, (error, data) => {
                    if (error) {
                        return
                    }

                    this.init();
                    $scope.popOver.hide();
                    this.dto['statusUpdateBtnLoader'] = false;
                    $scope.toast.show("Order is now completed!", "success");
                })
            } else if ($scope.popOver.data.hasOwnProperty('subOrders')) {
                RestaurantService.orders.updateOrder($scope.popOver.data.id, statusId, (error, data) => {
                    if (error) {
                        return
                    }

                    this.init();
                    $scope.popOver.hide();
                    $scope.toast.show("Order is now completed!", "success");
                    this.dto['statusUpdateBtnLoader'] = false;
                })
            }
        },
        showMenu:function() {
            this.showMenuActive = true;
        },
        print: function () {
            // let content = $("#invoice-POS").html();
            // window.print();
            // var childWindow = window.open("<myCurrentURL>", '_blank');
            // $(childWindow.document).find("head").append('<link rel="stylesheet" href="/css/print.css">');
            // return false;
            // let content = document.getElementById("invoice-POS").innerHTML;
            // var mywindow = window.open('', 'Print  Report');
            // mywindow.document.write('<html><head><title>Print  Report</title><link rel="stylesheet" href="/css/print.css"></head></head><body style="margin:10px;">');
            // mywindow.document.write(content);
            // mywindow.document.write('</body></html>');
            // setTimeout(function(){  mywindow.print(); }, 100)
            $timeout(function(){
                let content = document.getElementById("invoice-POS").innerHTML;
                var mywindow = window.open('','Print  Report');
                mywindow.document.write('<html><head><title>Print  Report</title><link rel="stylesheet" href="/css/print.css"></head></head><body style="margin:10px;" class="body" onafterprint="window.close();">');
                mywindow.document.write(content);
                mywindow.document.write('</body></html>');
                setTimeout(function(){  mywindow.print(); }, 100)
            },1)
        },
        searchRecipes:function() {
        },
        saveOrder:function() {
            if (this.order_details.length <= 0) {
                $scope.toast.show("Please Add Order Before Save", "error");
                return;
            }
            RestaurantService.orders.addOrder(this.id,this.sub_order_id,this.instruction,this.order_id,this.order_details,this.customerDetails.customer_name,this.customerDetails.customer_email,this.customerDetails.customer_address,this.customerDetails.customer_mobile_no, (error, data) => {
                if (error) {
                    return;
                }
                this.order['subOrders'] = data;
                for(let i = 0; i<=this.list.length;i++){
                    if (data.id == this.list[i].id) {
                        this.list[i].total_price = data.total_price;
                        break;
                    }
                }
                $scope.toast.show("Order Added Successfully", "success");
                this.order_details = [];
                this.instruction = '';
                this.sub_order_id = null;
                this.showCustomerDetails = false;
                if (this.list==0)
                {
                    RestaurantService.orders.getTableOngoingOrder(this.id, (error, data) => {
                        if (error) {
                            return;
                        }
                        this.list = data.sort((a, b) => b.id - a.id);
                        if (this.list[0] && this.list[0].status_id === RESTAURANT_ORDER_ONGOING) {
                            this.getOrderDetails(this.list[0]);
                        }
                    })
                }
            })

            
        },
        getDetails: function(id){
            this.loader = true;

            RestaurantService.orders.getCollectiveDetails(id, (error, data) => {
                if (error) {
                    return;
                }
                this.loader = false;
                $scope.popOver.show('invoice', data);
                this.print();
                
            })
        },
        deletesuborder:function(id){
            
            RestaurantService.orders.deleteSubOrder(id,(error,data) => {
                if(error) {
                    return;
                }
                $scope.popOver.hide();
                for(let i=0; i<=this.order['subOrders']['sub_orders'].length; i++)
                {
                    if(this.order['subOrders']['sub_orders'][i].id == id) {
                        this.order['subOrders']['sub_orders'].splice(i,1);
                        $scope.toast.show("SubOrder Deleted Successfully", "success");
                        break;
                    }
                }
                for(let i = 0; i<=this.list.length;i++){
                    if (data.id == this.list[i].id) {
                        this.list[i].total_price = data.total_price;
                        break;
                    }
                }
            });

        },
        onSelect: function(recipe) {
            this.search = recipe.name;
            if (recipe.children.length > 0) {
                this.listOfMasterChild = recipe.children;
            }
            this.recipe_id = recipe.id;
            this.showMenuActive = false;
            this.showQty = true;
        },
        onSelectChild: function(child) {
            this.child = child;
            this.searchChild = child.child_name;
            this.showChildMenu = false;
        },
        addOrders:function() {
            if(this.isValid()) 
            {
                for (let id in this.listOfRecipes) {
                    if(this.listOfRecipes[id].id == this.recipe_id) {
                        this.order_details.push({id:this.listOfRecipes[id].id,name:this.listOfRecipes[id].name,quantity:this.qty,current_price:this.listOfRecipes[id].price,instruction:this.instruction,recipe_child_id:this.child?.child_id, child_current_price: this.child?.child_price, child_name:this.child?.child_name})
                    }
                 }
                 this.reset();
            }
        },
        editSubOrderRecipe: function(recipes) {
            this.order_details = [];
            this.sub_order_id = recipes.id;
            let recipe = angular.copy(recipes['sub_order_details']);
            for (let i = 0; i<recipe.length; i++) {
                this.order_details.push({id:recipe[i]?.recipe_id,sub_order_details_id:recipe[i].id , name:recipe[i]?.recipe_name,quantity:recipe[i]?.quantity,current_price:recipe[i]?.current_price,instruction:recipe[i]?.instruction})
            }
        },
        deleteOrderDetaile:function(id) {
            for (let i=0; i<=this.order_details.length; i++)
            {
                if(this.order_details[i].id == id) {
                    this.order_details.splice(i,1);
                    return;
                }
            }
        },
        updateQty: function (data,order){
            for (let i = 0; i<=this.order_details.length; i++) {
                if (this.order_details[i].id == order.id) {
                    this.order_details[i].quantity = data;
                    this.editRecipe = false;
                    return;
                }
            }
        },
        editActive: function(order) {
            this.isActiveRecipe = order.id;
            this.isInactiveRecipe = true;
        },
        reset:function() {
            this.search = '';
            this.qty = 1;
            this.child = {};    
            this.searchChild = '';
            this.instruction='';
            this.listOfMasterChild = [];

        },
        isValid: function () {
            if (this.listOfMasterChild.length > 0) {
                if (!this.searchChild) {
                    $scope.toast.show("Please Select Recipe Child", "error");
                    return false;
                }
                
            }
            if (!this.search) {
                $scope.toast.show("Recipe is Missing", "error");
                return false;
            }
            if (!this.qty) {
                $scope.toast.show("Quantity Missing", "error");
                return false;
            }
            return true;
        },
        saveSuborder() {
            params = {
                table_id : this.id,
                instruction: "This is instruction",
                table_recipe_id: 53,
            }
        }
    },

    $scope.pageView.init(() => {
        $scope.table.init();
    })
}])
