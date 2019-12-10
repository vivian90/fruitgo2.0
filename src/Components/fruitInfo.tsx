import React, { Component } from 'react'
import {Rate} from 'antd';
import styles from './fruitInfo.module.scss';

interface fruitInfoProps {
  src : string,
  title: string,
  price: number,
  star: number
}
export default function FruitInfo (props : fruitInfoProps) {
    const {src, title, price, star} = props;

    return (
      <div className={styles.info}>
        <img src={src} />
        <h4>{title}</h4>
        <Rate disabled defaultValue={star} />
        <p>{price}</p>
      </div>
    )
}
