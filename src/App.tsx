import React, { Dispatch } from 'react';
import {connect, DispatchProp} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {fetchFruits} from './Actions';
import {AutoComplete} from 'antd';
import "antd/dist/antd.css";
import FruitInfo from './Components/fruitInfo'

const App: React.FC = (props: any) => {
  const { dispatch, fruits } = props;
  dispatch(fetchFruits);
 // console.log(fruits);
  return (
    <div className="App">
      <AutoComplete />
      <div style={{display: 'flex'}} >
        <FruitInfo 
          title="banana" 
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/6/3/6/866367-1-eng-GB/KSA-s-HAQ-starts-new-banana-contract.jpg" 
          price={1.50}
          star={4}
        />
        <FruitInfo 
          title="banana" 
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/6/3/6/866367-1-eng-GB/KSA-s-HAQ-starts-new-banana-contract.jpg" 
          price={1.50}
          star={3.5}
        />
        <FruitInfo 
          title="banana" 
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/6/3/6/866367-1-eng-GB/KSA-s-HAQ-starts-new-banana-contract.jpg" 
          price={1.50}
          star={4}
        />
        <FruitInfo 
          title="banana" 
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/7/6/3/6/866367-1-eng-GB/KSA-s-HAQ-starts-new-banana-contract.jpg" 
          price={1.50}
          star={1}
        />
      </div>
    </div>
  );
}
function mapStateToProps (state: any) {
  return {
    fruits: state.fruit.fruits
  }
}
export default connect(mapStateToProps, null)(App);
