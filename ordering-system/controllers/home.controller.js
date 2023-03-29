angular.module("OrderingSystemApp").controller("HomeCtrl", ["$scope", "AuthService", "OrdersService", "$timeout", "$location", "$anchorScroll", function ($scope, AuthService, OrdersService, $timeout, $location, $anchorScroll) {

    $scope.home = {
        dto: {},
        childActive:"",
        userInfo: AuthService.details,
        menuData: [],
        searchRecipe: "",
        selectedChild:'',
        languages: [],
        selectedLan: null,
        init: function () {
            if (this.userInfo && this.userInfo.language != null) {
                this.selectedLan = this.userInfo.language;
                this.getMenuDetails();
                return;
            }
            this.dto['pageLoader'] = true;
            OrdersService.retrieveLanguages((error, data) => {
                if (error) {
                    return
                }
                let obj = {
                    ...data.user,
                    serverKey: data.server_key,
                    sliderImages: data.slider_images,
                    galleryImages: data.gallery_images,
                    logo: data.logo,
                    tables: data.tables
                }
                AuthService.saveUserDetails(obj);

                if (data.languages.length === 1) {
                    this.selectedLan = data.languages[0].id;
                    this.getMenuDetails();
                } else {
                    this.dto['languagePopUp'] = true;
                    this.languages = data.languages;
                    this.dto['pageLoader'] = false;
                    this.initSliderImages();
                }
            })
        },
        getMenuDetails: function () {
            if (!this.selectedLan) {
                alert("Select language");
                return;
            }
            this.dto['languagePopUp'] = false;
            this.dto['pageLoader'] = true;
            OrdersService.retrieveMenuTemplate( true, this.selectedLan, (error, data) => {
                if (error) {
                    return
                }

                this.menuData = data.categories;

                let categoriesList = [];
                for (let cat of this.menuData) {
                    categoriesList.push(cat.name);
                    for (let res of cat.recipes) {
                        res['nutrients_map'] = {}
                        if (res.nutrition_info) {
                            for (let nut of res.nutrition_info) {
                                res['nutrients_map'][nut.name] = nut;
                            }
                        }
                    }
                }
                let obj = {
                    language: this.selectedLan,
                    categoriesList: categoriesList,
                }
                AuthService.saveUserDetails(obj);
                this.userInfo = AuthService.details;
                this.initSliderImages();
                this.dto['pageLoader'] = false;
            });
        },
        getVegNonVeg: function (recipe) {
            if (recipe.recipe_type === 1) {
                return "veg";
            } else if (recipe.recipe_type === 2) {
                return "nonVeg";
            }
            return "";
        },
        scrollToCategory: function (name) {
            document.getElementById(name).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            this.closeDrawer();
        },
        openCustomisableMenu: function(recipe) {
            this.dto['costomisableRecipe'] = recipe;
            this.childActive = this.dto['costomisableRecipe'].children[0] // set first children
            this.dto['costomisableMenu'] = true;
            this.dto['hideBrowsingMenuDrawerBtn'] = true;
        },
        closeCustomisableMenu: function() {
            $scope.cart.setChild (this.dto['costomisableRecipe'].children[0]); //By default selected 1st value if user open menu and close it without click
            this.dto['costomisableMenu'] = false;
            $timeout(() => {
                this.dto['hideBrowsingMenuDrawerBtn'] = false;
            }, 400)
        },
        openDrawer: function () {
            this.dto['browsingMenu'] = true;
            this.dto['hideBrowsingMenuDrawerBtn'] = true;
        },
        closeDrawer: function () {
                this.dto['browsingMenu'] = false;
                $timeout(() => {
                    this.dto['hideBrowsingMenuDrawerBtn'] = false;
                }, 400)
        },
        navigateToCart: function () {
            if ($scope.cart.count > 0) {
                $scope.goTo("/order/cart");
            }
        },
        navigateToRecipeDetails: function (recipe) {
            utility.localStorage.set(RECIPE_INFO, recipe);
            $scope.goTo("/recipe/details/" + recipe.id);
        },
        navigateToResProfile: function (recipe) {
            $scope.goTo("/restaurant-info");
        },
        initSliderImages: function () {
            $timeout(() => {
                $('.owl-carousel').owlCarousel({
                    // loop: true,
                    animateOut: 'slideOutDown',
                    animateIn: 'flipInX',
                    items: 1,
                    margin: 10,
                    smartSpeed: 450
                })
            })
        },
        selectChild: function(cat) {
            this.selectedChild = cat;
        }
    }

    $scope.cart = {
        count: cart.count,
        recipeMap: cart.recipeMap,
        alter: function (recipe, action) {
            if (action == 'addOpen' ) {
                if (recipe.children.length != 0) {
                    if (recipe.children.length == 1 ) {
                        $scope.home.selectedChild = recipe.children[0];
                        cart.child = $scope.home.selectedChild;
                        cart.update(recipe, action);
                        this.recipeMap = cart.recipeMap;
                        this.count = cart.count;
                    }
                    else {
                        $scope.home.openCustomisableMenu(recipe);
                    }
                }
                else {
                    cart.update(recipe, action);
                    this.recipeMap = cart.recipeMap;
                    this.count = cart.count;
                }
            }
            else {
                cart.update(recipe, action);
                this.recipeMap = cart.recipeMap;
                this.count = cart.count;
            }
        },
        setChild: function(recipe){
            // if (!$scope.home.selectedChild) {
            //     alert("Please Select Something from Menu");
            //     return;
            // }
            cart.child = $scope.home.selectedChild;
            cart.update(recipe, 'add');
            this.recipeMap = cart.recipeMap;
            this.count = cart.count;
            // cart.update(recipe,'none')
            $scope.home.dto['costomisableMenu'] = false;
            $timeout(() => {
                $scope.home.selectedChild = '';
                $scope.home.dto['hideBrowsingMenuDrawerBtn'] = false;
            }, 300)
        }
    }

    $scope.pageInit.init(() => {
        $scope.home.init();
    })
}])