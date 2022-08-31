import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Card from "../Card";

function Favorites({
  onAddtoFavorite,
  onAddToCart
}) {
  const {favoritesCard,getSearchedItems,searchedItems}=useContext(AppContext);
  return (
    <div className="content">
      <div className="content-head">
        <h1 className="listName">
          {searchedItems
            ? `Поиск по запросу: "${searchedItems}"`
            : "My favorites"}
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
        {favoritesCard.length > 0 ? (
          favoritesCard
            .filter((elem) =>
              elem.title
                .toLocaleLowerCase()
                .includes(searchedItems.toLocaleLowerCase())
            )
            .map((item,index) => (
              <Card
                key={0-index}
                title={item.title}
                id={item.id}
                price={item.price}
                imageURL={item.imageURL}
                onAddItem={onAddToCart}
                onFavorite={onAddtoFavorite}
              />
            ))
        ) : (
          <h1>Nothing</h1>
        )}
      </div>
    </div>
  );
}
export default Favorites;
