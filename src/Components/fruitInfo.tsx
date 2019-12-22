import React, { Component } from 'react'
import {Rate, Button} from 'antd';
import styles from './fruitInfo.module.scss';


interface fruitInfoProps {
  src : string,
  name: string,
  price: number,
  star: number,
  unit: string,
  id: number,
  handleBuyFruit: (id: number) => void
}

export const toCapital = (str: string) => {
  let arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    let first = arr[i].slice(0,1).toUpperCase();
    arr[i] = first.concat(arr[i].slice(1));
  }
  return arr.join(" ");
}

export default function FruitInfo (props : fruitInfoProps) {
    const {src, name, price, star, unit, handleBuyFruit, id} = props;

    return (
      <div className={styles.info}>
        <img src={src} />
        <h4>{toCapital(name)}</h4>
        <Rate disabled defaultValue={star} />
        <div>
          <p style={{display:"inline-block"}}>{`${price} / ${unit}`}</p>
          <Button 
            style={{float: 'right'}} 
            type="primary" 
            size="small"
            onClick={() => handleBuyFruit(id)}
          >
            Buy
          </Button>
        </div>   
      </div>
    )
}
