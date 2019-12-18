import React, { Dispatch } from 'react';
import {connect, DispatchProp} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {fetchFruits} from './Actions';
import {AutoComplete, PageHeader, Row, Col, Checkbox} from 'antd';
import "antd/dist/antd.css";
import FruitInfo from './Components/fruitInfo'
import Menu from './Components/Menu';
import { Category } from './Reducers/SearchReducer';

interface IProps {
  fruits?: any[],
  fetchFruits: () => void,
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
    menu: [
      {
        catgory: "fresh",
        title: "Fresh Fruits"
      },
      {
        catgory: "dry",
        title: "Dry Fruits"
      },
      {
        category: "juice",
        title: "Juice"
      }
    ]
  };
 componentDidMount () {
    this.props.fetchFruits();
 }


 render(){
   const { fruits } = this.props; 

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
                  <div style={{alignContent:'left'}}>
                    <label style={{marginRight: '10px'}}>Search what your want:</label>
                    <AutoComplete />
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap'}}  className="content">
                    {fruits && fruits.map(fruit => (
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
                </Col>    
              </Row>
           </div>       
      </div>
    );
  }
}
const getFilteredFruits = (fruits: any[], filters: Category[]) => {
  let res = fruits, categoryToCount:{[key: string]: any} = {};
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
    fruits: getFilteredFruits(state.fruit.fruits, state.search),
  }
}
export default connect(mapStateToProps, {
  fetchFruits,
})(App);
