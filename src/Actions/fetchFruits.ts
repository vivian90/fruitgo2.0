import {Category} from '../Reducers/SearchReducer';
import { FruitCategory } from '../types';
export const FETCH_FRUITS = "FETCH_FRUITS";
export const FETCH_FRUITS_BY_FILTERS  = "FETCH_FRUITS_BY_FILTERS";

const lb = 'LB'
const count = 'Count'

export const fetchFruits = () => ({
  type: FETCH_FRUITS,
  data: [
    { id: 1, 
      name: "apple", 
      price: 1 , 
      star: 4, 
      src: "http://expertofdreams.com/data_images/apple/apple-7.jpg",
      category: FruitCategory.fresh,
      isOrganic: false,
      isFreeshipping: false,
      unit: lb
    },
    { id: 2, 
      name: "banana", 
      price: 1.5 , 
      star: 3, 
      src: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/6/3/6/866367-1-eng-GB/KSA-s-HAQ-starts-new-banana-contract.jpg",
      category: FruitCategory.fresh,
      isOrganic: true,
      isFreeshipping: false,
      unit: lb
    },
    { id: 3, 
      name: "green apple", 
      price: 1.2 , 
      star: 3, 
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx4Q6keooGLWgYg1P4MuSFXlr32MdIPMwxgu_z4jtTSRSPBloP&s",
      category: FruitCategory.fresh,
      isOrganic: false,
      isFreeshipping: true,
      unit: lb
    },
    { id: 4, 
      name: "orange", 
      price: 2 , 
      star: 5, 
      src: "https://producemadesimple.ca/wp-content/uploads/2015/01/orange-web-600x450.jpg",
      category: FruitCategory.fresh,
      isOrganic: false,
      isFreeshipping: true,
      unit: lb
    },
    { id: 5, 
      name: "watermelon", 
      price: 4, 
      star: 5, 
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHg8lXfISjlvDfDeWVffvR37b4-67yyNm41-N1PoX8Aae1S2ij&s",
      category: FruitCategory.fresh,
      isOrganic: true,
      isFreeshipping: false,
      unit: count
    },
    { id: 6, 
      name: "dried strawberry", 
      price: 5, 
      star: 3, 
      src: "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/bf94510bcbf61511-nsF58DJ5-large.jpg",
      category: FruitCategory.dried,
      isOrganic: true,
      isFreeshipping: false,
      unit: lb
    },
    { id: 7, 
      name: "dried kiwi", 
      price: 8, 
      star: 4, 
      src: "https://images-na.ssl-images-amazon.com/images/I/81-dLKy6fUL._SL1500_.jpg",
      category: FruitCategory.dried,
      isOrganic: false,
      isFreeshipping: false,
      unit: lb
    },
    { id: 8, 
      name: "dried apricot", 
      price: 7, 
      star: 5, 
      src:'https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/e3b1a3cf07c093c1-S986R_2v-large.jpg',
      category: FruitCategory.dried,
      isOrganic: false,
      isFreeshipping: true,
      unit: lb
    },
    ]
});

export const fetchFruitsByFilter = (filters: Category[]) => ({
  type: FETCH_FRUITS_BY_FILTERS,
  filters
})


