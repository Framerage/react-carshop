import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Info from "../Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from './Drawer.module.scss'

function Drawer({ onCloseCart, items, onRemove,opened }) {
  const { setCartItems,cartItems } = useContext(AppContext);
  const [orderId,setOrderId]=useState(null)
  const [isOrderComlete, setIsOrderComlete] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const orderPrice=useCart(cartItems)

  const delay=()=>new Promise((resolve)=>setTimeout(resolve,1000))
  const onClickOrder = async() => {
    try{
      setIsLoadingOrders(true)
      const {data}= await axios.post('https://6301500e9a1035c7f800b13a.mockapi.io/orders',{items:cartItems})
      setOrderId(data.id)
      setIsOrderComlete(true);
      setCartItems([]);

      for (let i=0;i<cartItems.length;i++){
        const item=cartItems[i];
        await axios.delete(`https://6301500e9a1035c7f800b13a.mockapi.io/cartItems/${item.id}`)
        await delay();
      }
    }
    catch(error){
      alert("Error with order")
    }
    setIsLoadingOrders(false)
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={`${styles.drawer} ${opened ? '' : ''}`}>
        <h2 style={{ marginBottom: "30px" }}>
          Package
          <img
            onClick={onCloseCart}
            className={styles.drawer__removeBtn}
            width={32}
            height={32}
            src="./img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className='drawerItems'>
            <div className="items">
              {items.map((obj) => (
                <div key={obj.imageURL} className='cartItem'>
                  <div
                    style={{ backgroundImage: `url(${obj.imageURL})` }}
                    className='cartItemImg'
                  ></div>
                  <div className="cartItem__info">
                    <p className="cartItem__text">{obj.title}</p>
                    <b>{obj.price} rub</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="cartItem__removeBtn"
                    width={32}
                    height={32}
                    src="./img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className='overlay__total'>
              <ul>
                <li className='overlay__total__item'>
                  <span>Итого:</span>
                  <div></div>
                  <b>{orderPrice} руб.</b>
                </li>
                <li className='overlay__total__item'>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.ceil(orderPrice*0.05)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoadingOrders} onClick={onClickOrder} className='greenBtn'>
                Оформить заказ <img src="./img/arrow.svg" alt="Arrow" />{" "}
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComlete ?'Order comleted'  : "Cart empty"}
            description={isOrderComlete ? `Your order #${orderId} will sent` : "Please add some order"}
            image={isOrderComlete ? './img/complete-order.jpg' : "./img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
