import React from "react";
import Card from "../Card";

const Home = ({
  onAddtoFavorite,
  onAddToCart,
  searchedItems,
  getSearchedItems,
  isLoading,
  items
}) => {
  const renderItems=()=>        {
    const filtredItems=items.filter((elem) => elem.title.toLocaleLowerCase().includes(searchedItems.toLocaleLowerCase()))
    return (isLoading ? [...Array(8)] : filtredItems)
      .map((item,index) => (
        <Card
          key={index*3}
          {...item}
          onAddItem={onAddToCart}
          onFavorite={onAddtoFavorite}
          loading={isLoading}
        />
      ))
  }
  return (
    <div className="content">
      <div className="content-head">
        <h1 className="listName">
          {searchedItems
            ? `Поиск по запросу: "${searchedItems}"`
            : "All versions"}
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
};
export default Home;
