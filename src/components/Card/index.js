import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classes from "./Card.module.scss";
import { AppContext } from "../../context/AppContext";

function Card({
  title,
  price,
  imageURL,
  id,
  onAddItem,
  onFavorite,
  loading=false
}) {

  const {isItemAdded,isItemChoosed}=useContext(AppContext)
  const itemObj={ title, parentId:id, price, imageURL, id }


  const onClickPlus = () => {
    onAddItem(itemObj);
  };
  const onClickHeart = () => {
    onFavorite(itemObj);
  };
  return (
    <div className={classes.card}>
      {loading
      ?      <Skeleton
      speed={2}
      width={165}
      height={250}
      viewBox="0 0 155 265"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="160" height="155" />
      <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
      <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
      <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
      <rect x="124" y="229" rx="10" ry="10" width="35" height="35" />
    </Skeleton>
    : 
    <>
        <div className={classes.card__favorite} onClick={onClickHeart}>
          {onFavorite &&       <img
        className={classes.favorite__heart}
        src={isItemChoosed(id) ? "/img/liked.svg" : "/img/unliked.svg"}
        alt="Like"
      />}
    </div>
    <img
      style={{ borderRadius: "10px 0 0" }}
      width='100%'
      height={135}
      src={imageURL}
      alt="car"
    />
    <h5>{title}</h5>
    <div className={classes.cardBottom}>
      <div className={classes.cardPrice}>
        <span>Цена:</span>
        <b>{price} rub</b>
      </div>
      {onAddItem &&       <img
        className={classes.plus}
        onClick={onClickPlus}
        src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
        alt="plus"
      />}
    </div>
    </>
    }


    </div>
  );
}
export default Card;
