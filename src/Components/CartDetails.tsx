import React, {Component} from 'react'
import { connect } from 'react-redux';
import styles from './CartDetails.module.scss'
import {FruitItem, addToCart, FruitInfo, deleteFruit, purchaseAll} from '../Actions'
import {Row, Col, InputNumber, Button, Rate} from "antd"
import { toCapital } from './fruitInfo';
import { OrderItem } from '../types';
import { Redirect } from 'react-router';


interface IProps {
  fruitInCart: FruitInfo,
  fruits: any[],
  orders: OrderItem[],
  addToCart: (fruitInfo: FruitInfo) => void,
  deleteFruit: (id: number) => void,
  purchaseAll: (order: OrderItem) => void
}

interface CardProp { 
  key: number,
  fruit: FruitItem,
  quantity: number,
  isEditable: boolean,
  modifyCart?: (fruitInfo: FruitInfo) => void,
  removeFruit?: (id: number) => void
}

export const getFruit = (fruitInCart: FruitInfo, fruits: FruitItem[]) => {
  let res = [];
  for (let key in fruitInCart) {
     let arr = fruits.filter(f => f.id == (+key));
     if (arr.length > 0) {
        res.push(arr[0]) 
     }
  }
  //console.log(res)
  return res;
}

class CartDetails extends Component<IProps> {
  static defaultProps = {
    fruitInCart: {},
    fruits: []
  }
  state = {
    hasPlacedOrder: false
  }
  modifyCart = (fruitInfo: FruitInfo) => {
    this.props.addToCart(fruitInfo);
  }

  purchaseAll = (total: number) => {
    let order = {
      fruitList: this.props.fruitInCart,
      purchaseTime: new Date().toString(),
      sum: total,
      orderNumber: Object.keys(this.props.orders).length + 1
    }
     this.props.purchaseAll(order);
     this.setState({
      hasPlacedOrder: true
     })
    
  }

  getTotal = () => {
    let sum = 0;
    const {fruitInCart, fruits} = this.props;

    for(let id in fruitInCart) {
      let f = fruits.find(f => f.id === (+id));
      let price = f.price;
      sum += price * fruitInCart[id];
    }
    return sum;
  }

  render(){
    const {fruitInCart, fruits} = this.props;
    const currentFruits = (fruitInCart && fruits) ? getFruit(fruitInCart, fruits) : [];
    const total = (fruitInCart && fruits) ? this.getTotal() : 0;
    if (this.state.hasPlacedOrder) {
      return <Redirect to="/orders" />
    }
    return (
      <div className={styles.container}>
        {(Object.keys(currentFruits).length > 0 
        && currentFruits.length > 0)  ? 
           <div>
            {currentFruits.map(f => (
              <FruitCard 
                key={f.id} 
                fruit={f}
                quantity={fruitInCart[f.id]} 
                modifyCart={this.modifyCart}
                removeFruit={this.props.deleteFruit}
                isEditable={true}
              />
            ))
            }
            <span style={{display:'inline-block', margin: '20px'}} >
              Total: {`$ ${total.toFixed(2)}`}
            </span>
            <Button 
              style={{margin: '20px', float: 'right'}} 
              type="primary"
              onClick={() => this.purchaseAll(total)}
            >
                Place Order
            </Button>
          </div>
        : "Sorry, you don't have anything in cart."}  
      </div>
    )
  }
}

export function FruitCard(props: CardProp) {
  const fruit = props.fruit;

  return fruit &&
      <Row className={styles.card} >
          <Col span={4}>
            <img src={fruit.src} />
          </Col>
          <Col span={20}>
             <h4>{toCapital(fruit.name)}</h4>
             <Row style={{display:"flex", justifyContent: "space-between"}}> 
             <Col span={12}>
              {(props.isEditable ?
                <InputNumber 
                      style={{width:'150px', marginRight: '20px', marginTop:'10px'}} 
                      size="small"
                      min={0}
                      max={10}
                      precision={fruit.unit == "Count" ? 0 : 1}
                      value={props.quantity}
                      onChange={(e) => props.modifyCart ? props.modifyCart({[fruit.id]: e as number}) : null}
                  />
                  : <span style={{display:"inline-block", marginTop:"10px"}}>{props.quantity}</span>)}
                <span>
                  {` x $${fruit.price.toFixed(2)} /${fruit.unit}`}
                </span>
             </Col>     
              <Col span={6} style={{marginTop:"10px"}}>
                {`$ ${(fruit.price * props.quantity).toFixed(2)}`}
              </Col>
              <Col span={6} style={{marginTop:"10px"}}>
                  {props.isEditable ? 
                    <a onClick={() => props.removeFruit ? props.removeFruit(fruit.id) : null}>remove</a>   
                    : <Rate style={{marginTop:"-10px"}} disabled defaultValue={fruit.star} />
                  }
              </Col>
            </Row>
          </Col>
      </Row>
}

const mapStateToProps = (state: any) => ({
   fruitInCart: state.fruit.fruitInCart,
   fruits: state.fruit.fruits,
   orders: state.fruit.orders
})

export default connect(mapStateToProps, {
  addToCart,
  deleteFruit,
  purchaseAll
})(CartDetails);