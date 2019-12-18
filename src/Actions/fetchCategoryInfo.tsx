import { FruitCategory } from "../types";

export const FETCH_MENU_INFO = 'FETCH_MENU_INFO';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';

export const fetchCategoryInfo = () => ({
  type: FETCH_MENU_INFO,
  data: [
    {
      id: 1,
      category: 'Category',
      title: "Fresh Fruits",
      isChecked: false,
      value: FruitCategory.fresh,
      cateKey: "category"
    },
    {
      id: 2,
      category: 'Category',
      title: "Dried Fruits",
      isChecked: false,
      value: FruitCategory.dried,
      cateKey: "category"
    },
    {
      id: 3,
      category: 'Is Organic',
      title: "Organic Fruits",
      isChecked: false,
      value: true,
      cateKey: "isOrganic"
    },
    {
      id: 4,
      category: 'Fresshipping',
      title: "Freeshipping",
      isChecked: false,
      value: true,
      cateKey: "isFreeshipping"
    },
    {
      id: 5,
      category: 'Fresshipping',
      title: "No Need",
      isChecked: false,
      value: false,
      cateKey: "isFreeshipping"
    }
  ],
});

export const toggleFilter = (id: number) => ({
  type: TOGGLE_FILTERS,
  id
})

