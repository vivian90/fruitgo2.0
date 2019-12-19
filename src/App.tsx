import React, { Dispatch } from 'react';
import {connect, DispatchProp} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {fetchFruits, changePage, searchByText} from './Actions';
import {AutoComplete, PageHeader, Row, Col, Pagination} from 'antd';
import "antd/dist/antd.css";
import FruitInfo from './Components/fruitInfo'
import Menu from './Components/Menu';
import { Category } from './Reducers/SearchReducer';

interface IProps {
  fruits?: any[],
  pageNumber: number,
  fetchFruits: () => void,
  changePage: (page: number) => void,
  searchByText: (text: string) => void
}

class App extends React.Component<IProps> {
  state = {
    headerMenu: [
      {
        path: 'index',
        breadcrumbName: 'Find your fruit',
      },
      {
        path: 'orders',
        breadcrumbName: 'See your orders',
      }
    ],
    pageNumber: 1,
    countPerPage: 10,
  
  };
 componentDidMount () {
    this.props.fetchFruits();
 }
 handlePageChange = (page : number) => {
    this.props.changePage(page);
 }
 handleSearch = (text: string) => {
   if (text == "") return;
   this.props.searchByText(text);
 }

 render(){
   const {fruits, pageNumber} = this.props;
   const countPerPage = 10;
   const total = fruits ? fruits.length : 0;
   const currentFruits = fruits ? fruits.slice((pageNumber - 1) * countPerPage, pageNumber * countPerPage) : [];

    return (
      <div className="App">
        <PageHeader 
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          title="Fruit GO"
          breadcrumb={{routes: this.state.headerMenu}}
           />
           <div>
              <Row>
                <Col span={4}>
                   <Menu/>
                </Col>
                <Col span={20} className="content">
                  <div>
                    <label style={{marginRight: '10px'}}>Search what your want:</label>
                    <AutoComplete onSearch={(text) => this.handleSearch(text)}/>
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap'}}  className="content">
                    {currentFruits && currentFruits.map(fruit => (
                        <FruitInfo 
                          key={fruit.id}
                          name={fruit.name}
                          src={fruit.src}
                          price={fruit.price.toFixed(2)}
                          star={fruit.star}
                          unit={fruit.unit}
                      />
                    ))}
                  </div>
                  <div>
                    <Pagination 
                      size="small" 
                      total={total} 
                      showTotal={() => (`Total ${total} items`)}
                      onChange={(page) => this.handlePageChange(page)}
                      current={pageNumber}
                    />
                  </div>
                </Col>    
              </Row>
           </div>       
      </div>
    );
  }
}
const getFilteredFruits = (fruits: any[], filters: Category[], searchText: string) => {
  let res = fruits, categoryToCount:{[key: string]: any} = {};
  if (searchText != "") {
    res = res.filter(fruit => fruit.name.indexOf(searchText) > -1);
  }
  filters = filters.filter(f => f.isChecked);
  for (let filter of filters) {
    if (categoryToCount[filter.cateKey] == undefined) {
      categoryToCount[filter.cateKey] = [filter.value];
    } else {
      categoryToCount[filter.cateKey].push(filter.value);
    }
  }
  
  for (let filter of filters) {
    res = res.filter(fruit => categoryToCount[filter.cateKey].indexOf(fruit[filter.cateKey]) > - 1);
  }

  return res;
}
function mapStateToProps (state: any) {
  return {
    fruits: getFilteredFruits(state.fruit.fruits, state.search.categories, state.search.searchText),
    pageNumber: state.pageNumber
  }
}
export default connect(mapStateToProps, {
  fetchFruits,
  changePage,
  searchByText
})(App);
