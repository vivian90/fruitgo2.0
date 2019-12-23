import React, { Dispatch } from 'react';
import {connect, DispatchProp} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import {fetchFruits, changePage, searchByText, 
        buyCurrentFruit, clearCurrentFruit, addToCart} from './Actions';
import {Input, PageHeader, Row, Col, Pagination, Modal, InputNumber, Icon, Menu} from 'antd';
import "antd/dist/antd.css";
import FruitInfo, {toCapital} from './Components/fruitInfo'
import CategoryMenu from './Components/Menu';
import { Category } from './Reducers/SearchReducer';
import CartDetails from "./Components/CartDetails";
import OrderDetails from "./Components/OrderDetails";

interface IProps {
  fruits?: any[],
  pageNumber: number,
  currentFruitId:  number,
  fruitInCart: {[key: number]: number},
  fetchFruits: () => void,
  changePage: (page: number) => void,
  searchByText: (text: string) => void,
  buyCurrentFruit: (id: number) => void,
  clearCurrentFruit: () => void,
  addToCart: (fruit: {[key: number]: number}) => void
}

class App extends React.Component<IProps> {
  state = {
    pageNumber: 1,
    countPerPage: 10,
    showModal: false,
    currentQuantity: 0
  
  };
 componentDidMount () {
    this.props.fetchFruits();
 }
 handlePageChange = (page : number) => {
    this.props.changePage(page);
 }
 handleSearch = (text: string) => {
   this.props.searchByText(text);
 }
 handleBuyFruit = (id: number) => {
   this.props.buyCurrentFruit(id);
   this.setState({
     showModal: true
   })
 }

 handleCancel = () => {
   this.props.clearCurrentFruit();
   this.setState({
     showModal: false,
     currentQuantity: 0
   })
 }
 handleCountChange = (count: any) => {
   this.setState({
     currentQuantity: count
   })
 }

 addToCart = () => {
   this.props.addToCart({
    [this.props.currentFruitId] : this.state.currentQuantity
   });
   this.setState({
    showModal: false,
    currentQuantity: 0
  })
   //console.log(fruit)
 }
 render(){
   const {fruits, pageNumber, currentFruitId, fruitInCart} = this.props;
   const countPerPage = 10;
   const total = fruits ? fruits.length : 0;
   const currentFruits = fruits ? 
                         fruits.slice((pageNumber - 1) * countPerPage, pageNumber * countPerPage) 
                         : [];
   const currentFruit = currentFruitId > 0 ? 
                        currentFruits.find(f => f.id === currentFruitId) 
                        : null;
 // console.log(fruitInCart);
   return (
     <Router>
      <div className="App">
        <PageHeader 
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          title="Fruit GO"
          extra={[
            <Link to="/cart">
              <span 
                style={{
                  position: "relative", 
                  left: "16px", 
                  top: "-5px", 
                  color:"#eca377"
                }}>
                {Object.keys(fruitInCart).length}
              </span>
              <Icon 
                key="shopping-cart"
                style={{fontSize: "22px", color: "#eca377", position:"relative", top: "12px"}}
                type="shopping-cart"
                theme="outlined" 
              />
            </Link>
          ]}
        />
        <Route render={(props) => {
          const currentPath = props.location.pathname
          return (
          <Menu mode="horizontal" selectedKeys={[currentPath.length > 1 ? currentPath.slice(1): "home"]}>
            <Menu.Item key="home">
              <Link to="/">
                    Home
              </Link>
            </Menu.Item>
            <Menu.Item key="orders">
              <Link to="/orders">
                    Orders
              </Link>
            </Menu.Item>
          </Menu>
        )}} />

        <Switch>
          <Route path="/cart">
            <CartDetails />
          </Route>  
          <Route path="/orders">
            <OrderDetails />
          </Route> 
          <Route path="/">
            <div>
              <Row>
                <Col span={4}>
                    <CategoryMenu/>
                </Col>
                <Col span={20} className="content">
                  <div style={{display:'flex'}}>
                    <label style={{flexBasis: '200px'}}>Search what your want:</label>
                    <Input 
                        style={{flexBasis: '300px'}} 
                        onChange={(e) => this.handleSearch(e.target.value)}
                    />
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap'}}  className="content">
                    {currentFruits && currentFruits.map(fruit => (
                        <FruitInfo 
                          handleBuyFruit={this.handleBuyFruit}
                          key={fruit.id}
                          name={fruit.name}
                          src={fruit.src}
                          price={fruit.price.toFixed(2)}
                          star={fruit.star}
                          unit={fruit.unit}
                          id={fruit.id}
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
              {currentFruit && 
                <div>
                  <Modal 
                    className="modal"
                    visible={this.state.showModal}
                    title={toCapital(currentFruit.name)}
                    okText="Add to cart"
                    width="300px"
                    onCancel={this.handleCancel}
                    onOk={this.addToCart}
                  >
                    <div style={{textAlign:'center'}}>
                      <div >
                        <img src={currentFruit.src}></img>
                      </div>
                      <div >
                        <InputNumber 
                          style={{width:'150px', marginRight: '20px', marginTop:'10px'}} 
                          size="small"
                          min={0}
                          max={10}
                          value={this.state.currentQuantity}
                          onChange={(c) => this.handleCountChange(c)}
                          precision={currentFruit.unit == "Count" ? 0 : 1}
                        />
                        <label>{currentFruit.unit}</label>
                      </div>
                    </div>     
                  </Modal>
                </div>
              }
            </div> 
          </Route>
        </Switch>
      </div>
     </Router>
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
    res = res.filter(fruit => 
      categoryToCount[filter.cateKey]
      .indexOf(fruit[filter.cateKey]) > - 1
    );
  }

  return res;
}
function mapStateToProps(state: any) {
  return {
    fruits: getFilteredFruits(
              state.fruit.fruits,
              state.search.categories, 
              state.search.searchText
            ),
    pageNumber: state.pageNumber, 
    currentFruitId: state.fruit.currentFruitId,
    fruitInCart: state.fruit.fruitInCart
  }
}
export default connect(mapStateToProps, {
  fetchFruits,
  changePage,
  searchByText,
  buyCurrentFruit,
  clearCurrentFruit,
  addToCart
})(App);
