import React, {Component} from 'react'
import { connect } from 'react-redux';
import { OrderItem } from '../types';
import { Row, Col } from 'antd';
import styles from "./OrderDetails.module.scss";
import { FruitItem } from '../Actions';
import {getFruit, FruitCard} from "./CartDetails";


interface IProps {
  orders?: OrderItem[],
  fruits?: FruitItem[]
}

interface OrderProps {
  order?: OrderItem,
  key: number,
  fruits?: FruitItem[]
}

class OrderDetails extends Component<IProps> {
  render() {
    const {orders, fruits} = this.props;
  
    return (
    <div className={styles.container}>
       {orders && orders.length > 0 ?
          orders.map(order => (
            <OrderCard 
              key={order.orderNumber}
              order={order}
              fruits={fruits}
            />
          ))
          : "Sorry, you don't have any orders."
          }
    </div>
    )}
}

function OrderCard(props: OrderProps) {
  const currentFruits = (props.order && props.order.fruitList && props.fruits) ? 
                          getFruit(props.order.fruitList, props.fruits) : [];
 
  return (
    props.order ?
    <div className={styles.order}>
      <Row className={styles.header}>
        <Col span={4}>
          <p>ORDER PLACED</p>
          <span>{new Date(props.order.purchaseTime).toLocaleDateString()}</span>
        </Col>
        <Col span={4}>
          <p>TOTAL</p>
          <span>{`$ ${props.order.sum.toFixed(2)}`}</span>
        </Col>
        <Col span={16}>
          <p>ORDER #</p>
          <span>{props.order.orderNumber}</span>
        </Col>
      </Row>
      <Row>
        {currentFruits && props.order && 
          currentFruits.map(fruit => (
            <FruitCard 
              key={fruit.id} 
              fruit={fruit}
              quantity={props.order ? props.order.fruitList[fruit.id]: 0}
              isEditable={false}
            />
        ))}
      </Row>
    </div>
    : null
  )
}

const mapStateToProps = (state: any) => ({
    orders: state.fruit.orders,
    fruits: state.fruit.fruits
})

export default connect(mapStateToProps, null)(OrderDetails)