import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Info = ({title,image,description}) => {

    const {setCartOpened}=useContext(AppContext)
return (
    <div className="cartEmpty">
    <img className="emptyCart" src={image} width={120} alt="Empty" />
    <h2>{title}</h2>
    <p>{description}</p>
    <button onClick={()=>setCartOpened(false)} className="greenBtnEmpty">
    <img src="./img/arrow.svg" alt="Arrow" />{" "}Back 
  </button>
  </div>
);
};
export default Info;