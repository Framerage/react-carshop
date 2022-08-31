import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Favorites from "./components/Pages/Favorites";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import { AppContext } from "./context/AppContext";
import Orders from "./components/Pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesCard, setFavoritesCard] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchedItems, setSearchedItems] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // {"name": "Cyber car light version, illusion","price": 12999, "imageURL":"/img/cars/cyberbmw.jpg","id":1},
  // {"name": "Fastest car light version, illusion","price": 3333, "imageURL":"/img/cars/limuz.jpg","id":2},
  // {"name": "Great car light version, illusion","price": 12999, "imageURL":"/img/cars/minicar.jpg","id":3},
  // {"name": "Cyber car light version, illusion","price": 12999, "imageURL":"/img/cars/yelcar.jpg","id":4},
  // {"name": "Best car light version, illusion","price": 12559, "imageURL":"/img/cars/crashcar.jpg","id":5},
  // {"name": "Long car light version, illusion","price": 12999, "imageURL":"/img/cars/sweatcar.jpg","id":6},
  // {"name": "Cyber car light version, illusion","price": 12999, "imageURL":"/img/cars/offroad.jpg","id":7},
  // {"name": "Dirty car light version, illusion","price": 22000, "imageURL":"/img/cars/sport.jpg","id":8}

  useEffect(() => {
    async function fetchData() {
      try{
        setIsLoading(true);
        const [resCart,resFavorites,resItems]=await Promise.all([
          axios.get(
          "https://6301500e9a1035c7f800b13a.mockapi.io/cartItems"
        ),axios.get(
          "https://6301500e9a1035c7f800b13a.mockapi.io/favorites"
        ),axios.get(
          "https://6301500e9a1035c7f800b13a.mockapi.io/base"
        )]);

        setIsLoading(false);
  
        setCartItems(resCart.data);
        setFavoritesCard(resFavorites.data);
        setItems(resItems.data);
      }
      catch(error){
        alert('Owibka')
      }
    }
    fetchData();
  }, []);

  const getSearchedItems = (event) => {
    setSearchedItems(event);
  };

  // useEffect(() => {
  //   fetch("https://62b5bd93da3017eabb2177a9.mockapi.io/api/search/cars")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => {
  //       setItems(json);
  //     });
  // }, []);

  const onAddToCart = async(obj) => {
    try{
      if (cartItems.find((el) => Number(el.id) === Number(obj.id))) {
        await axios.delete(
          `https://6301500e9a1035c7f800b13a.mockapi.io/cartItems/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((el) => Number(el.id) !== Number(obj.id))
        );
      } else {
        await axios.post("https://6301500e9a1035c7f800b13a.mockapi.io/cartItems", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    }
    catch(error){
      console.log('beda, ', error)
    }
  };

  const onAddtoFavorite = async (obj) => {
    try {
      if (favoritesCard.find((el) => Number(el.id) === Number(obj.id))) {
        axios.delete(
          `https://6301500e9a1035c7f800b13a.mockapi.io/favorites/${obj.id}`
        );
        setFavoritesCard((prev) => prev.filter((el) => el.id !== obj.id));
      } else {
        await axios.post(
          "https://6301500e9a1035c7f800b13a.mockapi.io/favorites",
          obj
        );
        setFavoritesCard((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Not add", error);
    }
  };

  const onRemoveCartItems = (id) => {
    try{
      axios.delete(`https://6301500e9a1035c7f800b13a.mockapi.io/cartItems/${id}`);
      setCartItems((prev) => prev.filter((el) => Number(el.id) !== Number(id)));
    }
    catch(error){
      alert(' Owibka udaleniya ',error)
    }
  };
  const isItemAdded = (id) => {
    return  cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  const isItemChoosed = (id) => {
    return favoritesCard.some((obj) => Number(obj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoritesCard,
        isItemAdded,
        isItemChoosed,
        setCartOpened,
        setCartItems,
        getSearchedItems,
        searchedItems,
      }}
    >
      <div className="wrapper">
        
      <Drawer
            items={cartItems}
            onCloseCart={() => setCartOpened(false)}
            onRemove={onRemoveCartItems}
            opened={cartOpened}
          />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                onAddtoFavorite={onAddtoFavorite}
                onAddToCart={onAddToCart}
                searchedItems={searchedItems}
                cartItems={cartItems}
                items={items}
                getSearchedItems={getSearchedItems}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                onAddtoFavorite={onAddtoFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
                    <Route
            path="/orders"
            element={
              <Orders
                onAddtoFavorite={onAddtoFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
