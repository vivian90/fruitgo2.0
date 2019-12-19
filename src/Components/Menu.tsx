import React from 'react';
import {connect} from 'react-redux';
import { Checkbox } from 'antd';
import {fetchCategoryInfo, toggleFilter, fetchFruitsByFilter} from '../Actions';
import { Category } from '../Reducers/SearchReducer';
import styles from './Menu.module.scss';

interface MenuProps {
  menuitems: Category[],
  fetchCategoryInfo: () => void;
  toggleFilter: (id: number) => void;
  fetchFruitsByFilter: (filters: any[]) => void;
}

interface SubMenuProps {
  category: string,
  items: any[],
  handleChange: (event: any) => void
}

class Menu extends React.Component<MenuProps> {
   getCategoriItems = (items: any[]) => {
      let hash: {[key: string]: any} = {}, res = [];
      for (let item of items) {
        let cate = item.category;
        if (hash[cate] == undefined) {
          hash[cate] = [];
        }
        hash[cate].push(item);
      }
    
      for (let key in hash) {
          let ans: {[key: string] : any} = {};
          ans.category = key;
          ans.items = hash[key];
          res.push(ans);
      }
     
      return res;
  } 
  
  handleChange = (event: any) => {
    const target = event.target;
    this.props.toggleFilter(target.id);
    let filters = this.props.menuitems.filter(item => item.isChecked);
    this.props.fetchFruitsByFilter(filters);
  }
  componentDidMount() {
    this.props.fetchCategoryInfo();
  }

  render() {
    const menuCategories = this.getCategoriItems(this.props.menuitems);

    return (
      <div>
        {menuCategories.map(cate => (
          <SubMenu 
            key={cate.category}
            category={cate.category} 
            items={cate.items}
            handleChange={this.handleChange}
            />  
        ))}
      </div>
    )
  }
}

export function SubMenu (props: SubMenuProps) {
  return (
    <div className={styles.category}>
        <h4>{props.category}</h4>
        {props.items.map(item => (
          <Checkbox 
            key={item.id} 
            id={item.id.toString()} 
            checked={item.isChecked}
            onChange={(e) => props.handleChange(e)}
            >
              {item.title}
            </Checkbox>
        ))}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
    menuitems: state.search.categories
});

export default connect(mapStateToProps, {
  fetchCategoryInfo,
  toggleFilter,
  fetchFruitsByFilter
})(Menu);