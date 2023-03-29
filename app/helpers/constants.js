CONTENT_STATUS_PUBLISHED = 1
CONTENT_STATUS_DRAFT = 2
CONTENT_STATUS_DISCARDED = 3

CONTENT_STATUS = [
    {id: 1, text: "Published", className: "completed"},
    {id: 2, text: "Draft", className: "pending"},
    {id: 3, text: "Discarded", className: "canceled"}
]

CONTENT_STATUS_MAP = {}
for (let t of CONTENT_STATUS) {
    CONTENT_STATUS_MAP[t.id] = t;
}

RECIPE_TYPES = [
    {id: 1, name: "Veg"},
    {id: 2, name: "NonVeg"},
    {id: 3, name: "Eggitarian"},
]
RECIPE_TYPES_MAP = {}
for (let t of RECIPE_TYPES) {
    RECIPE_TYPES_MAP[t.id] = t;
}

ORDER_NEW = 1
ORDER_ACCEPTED = 2
ORDER_PREPARING = 3
ORDER_OUT_FOR_DELIVERY = 4
ORDER_DELIVERED = 5
ORDER_FAILED = 6
ORDER_REJECTED = 7

ORDER_STATUS = [
    {id: 1, text: "Placed", className: "order-placed"},
    {id: 2, text: "Accepted", className: "order-accepted"},
    {id: 3, text: "Preparing", className: "order-preparing"},
    {id: 4, text: "Out for Delivery", className: "out-for-dilevery"},
    {id: 5, text: "Delivered", className: "order-delivered"},
    {id: 6, text: "Failed", className: "order-failed"},
    {id: 7, text: "Rejected", className: "order-rejected"},
]

ORDER_STATUS_MAP = {}
for (let t of ORDER_STATUS) {
    ORDER_STATUS_MAP[t.id] = t;
}

RESTAURANT_ORDER_INITIATED = 0
RESTAURANT_ORDER_ONGOING = 1
RESTAURANT_ORDER_COMPLETED = 2

ACCOUNT_STATE_INTRO = 1
ACCOUNT_STATE_BASIC = 2
ACCOUNT_STATE_PREMIUM = 3
ACCOUNT_STATE_SUPER = 4

ACCOUNT_STATE = [
    {id: 1, text: "INTRO"},
    {id: 2, text: "BASIC"},
    {id: 3, text: "PREMIUM"},
    {id: 4, text: "SUPER"},
]

ACCOUNT_STATE_MAP = {}
for (let t of ACCOUNT_STATE) {
    ACCOUNT_STATE_MAP[t.id] = t;
}

ENTITY_IMAGE_RECIPE = 1
ENTITY_IMAGE_RESTAURANT_LOGO = 2
ENTITY_IMAGE_RESTAURANT_SLIDER_IMAGE = 3
ENTITY_IMAGE_RESTAURANT_HORIZONTAL_LOGO = 4
ENTITY_IMAGE_RESTAURANT_GALLERY_IMAGE = 5

ACTIVATE_ROUTE = {
    "dashboard-restaurant": "dashboard",
    "dashboard-recipe-edit": "dashboard",
    "restaurant-profile": "profile",
    "restaurant-tables": "tables",
    "restaurant-table-orders": "tables",
    "dashboard-admin": "users",
    "admin-entities": "entities",
    "admin-languages": "languages",
    "admin-masterchild": "masterchild",
    "admin-enquires": "enquires",
    "admin-password-reset": "password-reset",
    "interns": "interns",
    "leads": "leads",
    "order-history": "order-history",
    "table-history": "table-history",
}

COUNTRIES = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "AmericanSamoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HN": "Honduras",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RO": "Romania",
    "RW": "Rwanda",
    "WS": "Samoa",
    "SM": "San Marino",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TJ": "Tajikistan",
    "TH": "Thailand",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "WF": "Wallis and Futuna",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe",
    "AX": "land Islands",
    "AQ": "Antarctica",
    "BO": "Bolivia, Plurinational State of",
    "BN": "Brunei Darussalam",
    "CC": "Cocos (Keeling) Islands",
    "CD": "Congo, The Democratic Republic of the",
    "CI": "Cote d Ivoire",
    "FK": "Falkland Islands (Malvinas)",
    "GG": "Guernsey",
    "VA": "Holy See (Vatican City State)",
    "HK": "Hong Kong",
    "IR": "Iran, Islamic Republic of",
    "IM": "Isle of Man",
    "JE": "Jersey",
    "KP": "Korea, Democratic Peoples Republic of",
    "KR": "Korea, Republic of",
    "LA": "Lao Peoples Democratic Republic",
    "LY": "Libyan Arab Jamahiriya",
    "MO": "Macao",
    "MK": "Macedonia, The Former Yugoslav Republic of",
    "FM": "Micronesia, Federated States of",
    "MD": "Moldova, Republic of",
    "MZ": "Mozambique",
    "PS": "Palestinian Territory, Occupied",
    "PN": "Pitcairn",
    "RE": "Réunion",
    "RU": "Russia",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena, Ascension and Tristan Da Cunha",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "ST": "Sao Tome and Principe",
    "SO": "Somalia",
    "SJ": "Svalbard and Jan Mayen",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan, Province of China",
    "TZ": "Tanzania, United Republic of",
    "TL": "Timor-Leste",
    "VE": "Venezuela, Bolivarian Republic of",
    "VN": "Viet Nam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S."
}

CURRENCY = {
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    "ANG": "Netherlands Antillean Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AWG": "Aruban Florin",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia-Herzegovina Convertible Mark",
    "BBD": "Barbadian Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BMD": "Bermudan Dollar",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar",
    "BTC": "Bitcoin",
    "BTN": "Bhutanese Ngultrum",
    "BWP": "Botswanan Pula",
    "BYN": "Belarusian Ruble",
    "BZD": "Belize Dollar",
    "CAD": "Canadian Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLF": "Chilean Unit of Account (UF)",
    "CLP": "Chilean Peso",
    "CNH": "Chinese Yuan (Offshore)",
    "CNY": "Chinese Yuan",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colón",
    "CUC": "Cuban Convertible Peso",
    "CUP": "Cuban Peso",
    "CVE": "Cape Verdean Escudo",
    "CZK": "Czech Republic Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "EUR": "Euro",
    "FJD": "Fijian Dollar",
    "FKP": "Falkland Islands Pound",
    "GBP": "British Pound Sterling",
    "GEL": "Georgian Lari",
    "GGP": "Guernsey Pound",
    "GHS": "Ghanaian Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambian Dalasi",
    "GNF": "Guinean Franc",
    "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanaese Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Sheqel",
    "IMP": "Manx pound",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Króna",
    "JEP": "Jersey Pound",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KGS": "Kyrgystani Som",
    "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc",
    "KPW": "North Korean Won",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge",
    "LAK": "Laotian Kip",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar",
    "LSL": "Lesotho Loti",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Myanma Kyat",
    "MNT": "Mongolian Tugrik",
    "MOP": "Macanese Pataca",
    "MRO": "Mauritanian Ouguiya (pre-2018)",
    "MRU": "Mauritanian Ouguiya",
    "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa",
    "MWK": "Malawian Kwacha",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Nuevo Sol",
    "PGK": "Papua New Guinean Kina",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Zloty",
    "PYG": "Paraguayan Guarani",
    "QAR": "Qatari Rial",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychellois Rupee",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SLL": "Sierra Leonean Leone",
    "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar",
    "SSP": "South Sudanese Pound",
    "STD": "São Tomé and Príncipe Dobra (pre-2018)",
    "STN": "São Tomé and Príncipe Dobra",
    "SVC": "Salvadoran Colón",
    "SYP": "Syrian Pound",
    "SZL": "Swazi Lilangeni",
    "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni",
    "TMT": "Turkmenistani Manat",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "USD": "United States Dollar",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistan Som",
    "VEF": "Venezuelan Bolívar Fuerte (Old)",
    "VES": "Venezuelan Bolívar Soberano",
    "VND": "Vietnamese Dong",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tala",
    "XAF": "CFA Franc BEAC",
    "XAG": "Silver Ounce",
    "XAU": "Gold Ounce",
    "XCD": "East Caribbean Dollar",
    "XDR": "Special Drawing Rights",
    "XOF": "CFA Franc BCEAO",
    "XPD": "Palladium Ounce",
    "XPF": "CFP Franc",
    "XPT": "Platinum Ounce",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMW": "Zambian Kwacha",
    "ZWL": "Zimbabwean Dollar"
}

ALLERGIES = [
    {
        "id": 1,
        "name": "Brinjal"
    },
    {
        "id": 2,
        "name": "Celery"
    },
    {
        "id": 3,
        "name": "Crab"
    },
    {
        "id": 4,
        "name": "Mushrooms"
    },
    {
        "id": 5,
        "name": "Cashew Nut"
    },
    {
        "id": 6,
        "name": "Almond"
    },
    {
        "id": 7,
        "name": "Chickpea Flour (Besan) "
    },
    {
        "id": 8,
        "name": "Poppy Seeds"
    },
    {
        "id": 9,
        "name": "Peanuts"
    },
    {
        "id": 10,
        "name": "Walnut"
    },
    {
        "id": 11,
        "name": "Sesame Seeds"
    },
    {
        "id": 12,
        "name": "Hazelnut"
    },
    {
        "id": 13,
        "name": "Food Colors"
    },
    {
        "id": 14,
        "name": "Pistachio"
    },
    {
        "id": 15,
        "name": "Litchee"
    },
    {
        "id": 16,
        "name": "Kiwi"
    },
    {
        "id": 17,
        "name": "Coconut Water"
    },
    {
        "id": 18,
        "name": "Strawberry"
    },
    {
        "id": 19,
        "name": "Sago"
    },
    {
        "id": 20,
        "name": "Cucumber"
    },
    {
        "id": 21,
        "name": "Pine Nut"
    },
    {
        "id": 22,
        "name": "Black Pepper"
    },
    {
        "id": 23,
        "name": "Pineapple"
    },
    {
        "id": 24,
        "name": "Mustard"
    },
    {
        "id": 25,
        "name": "Buckwheat"
    },
    {
        "id": 26,
        "name": "Squid"
    },
    {
        "id": 27,
        "name": "Coconut"
    },
    {
        "id": 28,
        "name": "Monosodium Glutamate (MSG)"
    },
    {
        "id": 30,
        "name": "Red Meat"
    },
    {
        "id": 31,
        "name": "Cheese"
    },
    {
        "id": 32,
        "name": "Garlic"
    },
    {
        "id": 33,
        "name": "Sea Foods"
    },
    {
        "id": 34,
        "name": "Yeast"
    },
    {
        "id": 35,
        "name": "Food Additives"
    },
    {
        "id": 36,
        "name": "Egg"
    },
    {
        "id": 37,
        "name": "Poultry Meat"
    },
    {
        "id": 38,
        "name": "Not Allergic"
    },
    {
        "id": 39,
        "name": "Cow Milk Protein"
    },
    {
        "id": 40,
        "name": "Tree Nut"
    },
    {
        "id": 41,
        "name": "Corn"
    },
    {
        "id": 42,
        "name": "Lactose"
    },
    {
        "id": 43,
        "name": "Shell Fish"
    },
    {
        "id": 44,
        "name": "Soy"
    },
    {
        "id": 45,
        "name": "Gluten (Wheat, Oats, Rye, Barley)"
    },
    {
        "id": 46,
        "name": "Wheat"
    },
    {
        "id": 47,
        "name": "Milk & Milk products"
    },
    {
        "id": 48,
        "name": "Seafood"
    },
    {
        "id": 50,
        "name": "Sago "
    },
    {
        "id": 51,
        "name": "Sesame Seeds "
    },
    {
        "id": 52,
        "name": "Soy Lecithin"
    },
    {
        "id": 53,
        "name": "Egg Yolk"
    },
    {
        "id": 54,
        "name": "Sunflower Seeds"
    },
    {
        "id": 55,
        "name": "Masoor Dal"
    },
    {
        "id": 56,
        "name": "Asafoetida (Hing)"
    },
    {
        "id": 57,
        "name": "Pumpkin"
    },
    {
        "id": 58,
        "name": "Banana"
    },
    {
        "id": 59,
        "name": "Tomato"
    },
    {
        "id": 60,
        "name": "Red Chilli"
    },
    {
        "id": 61,
        "name": "Fish"
    },
    {
        "id": 62,
        "name": "Citrus Fruits"
    },
    {
        "id": 63,
        "name": "Lemon"
    },
    {
        "id": 64,
        "name": "Wine"
    },
    {
        "id": 65,
        "name": "Pecan"
    },
    {
        "id": 66,
        "name": "Caffeine"
    },
    {
        "id": 67,
        "name": "Cocoa"
    },
    {
        "id": 68,
        "name": "Curd and Buttermilk"
    },
    {
        "id": 69,
        "name": "Lady's Finger"
    },
    {
        "id": 70,
        "name": "Turmeric"
    },
    {
        "id": 71,
        "name": "Macadamia Nuts"
    },
    {
        "id": 73,
        "name": "Mushroom"
    },
    {
        "id": 74,
        "name": "Sunflower Seed"
    },
    {
        "id": 75,
        "name": "Dairy Products"
    }
]

MEAL_TYPES = [
    {
        "id": 40,
        "name": "During Workout"
    },
    {
        "id": 41,
        "name": "Snack"
    },
    {
        "id": 42,
        "name": "Bed Time"
    },
    {
        "id": 43,
        "name": "Mid Meals"
    },
    {
        "id": 44,
        "name": "Sweet"
    },
    {
        "id": 45,
        "name": "Mid morning meal"
    },
    {
        "id": 46,
        "name": "Bedtime"
    },
    {
        "id": 47,
        "name": "evening meal"
    },
    {
        "id": 48,
        "name": "All Day Food/Snacks"
    },
    {
        "id": 49,
        "name": "Lunch"
    },
    {
        "id": 50,
        "name": "Breakfast"
    },
    {
        "id": 51,
        "name": "Dinner"
    },
    {
        "id": 52,
        "name": "Pre Workout "
    },
    {
        "id": 53,
        "name": "Early Morning"
    },
    {
        "id": 54,
        "name": "Post Workout"
    }
]
