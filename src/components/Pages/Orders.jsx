import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Card from "../Card";

function Orders({
  onAddtoFavorite,
  onAddToCart
}) {
  const {getSearchedItems,searchedItems}=useContext(AppContext);
  const [orders,setOrders]=useState([])
  const [isOrdersLoad,setIsOrdersLoad]=useState(false)
  useEffect(()=>{
    (async()=>{
        try{
            setIsOrdersLoad(true)
            const {data} =await axios.get('https://6301500e9a1035c7f800b13a.mockapi.io/orders')
            setOrders(data.flatMap(obj=>obj.items))
            //console.log(data.flatMap(obj=>obj.items))
            //console.log(data.map(obj=>obj.items).flat())
            //console.log(data.reduce((prev,curr)=>[...prev,...curr.items],[]))
        }
        catch(error){
            alert('err')
        }
        setTimeout(()=>{
            setIsOrdersLoad(false)

        },1000)
    })
    ()
  },[])

  const renderItems=()=>        {
    const orderItems=orders.filter((elem) => elem.title.toLocaleLowerCase().includes(searchedItems.toLocaleLowerCase()))
    return (isOrdersLoad ? [...Array(8)] : orderItems)
      .map((item,index) => (
        <Card
          key={index*3}
          {...item}
          //onAddItem={onAddToCart}
          //onFavorite={onAddtoFavorite}
          loading={isOrdersLoad}
        />
      ))
  }
  return (
    <div className="content">
      <div className="content-head">
        <h1 className="listName">
          {searchedItems
            ? `Поиск по запросу: "${searchedItems}"`
            : "My orders"}
        </h1>
        <div className="search-block">
          <img
            className="search-block__pic"
            width={32}
            height={32}
            src="/img/search.svg"
            alt="Search"
          />
          <input
            className="search-block__input"
            placeholder="Search..."
            value={searchedItems}
            onChange={(el) => getSearchedItems(el.target.value)}
          />
        </div>
      </div>
      <div className="cars">
        {renderItems()}
      </div>
    </div>
  );
}
export default Orders;
