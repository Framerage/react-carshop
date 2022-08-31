import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useCart } from "../hooks/useCart";

function Header(props){

  const {cartItems}=useContext(AppContext)
  const orderPrice=useCart(cartItems)
    return (
        <header>
        <div className="headerLeft">
          <img
            src="/img/logo.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", borderRadius: "20px" }}
          />
          <Link to='/react-carshop/'>          
          <div className="headerInfo">
            <h3 className="text__uppercase">React sneackers</h3>
            <p style={{ opacity: "0.5" }}>Магазин лучших машин</p>
          </div></Link>

        </div>

        <ul className="headerRight">
          <li onClick={props.onClickCart} style={{ margin: "0 30px" ,cursor:'pointer'}}>
            <img
              src="/img/packet.png"
              alt="Cart"
              width={18}
              height={18}
              style={{marginRight: "15px",borderRadius:'9px'}}
            />
            <span>{cartItems ? orderPrice : '0'} rub</span>
          </li>
          <li>
            <Link to='/react-carshop/favorites'>          
            <img
              src="/img/heart.svg"
              alt="Login"
              width={18}
              height={18}
              style={{borderRadius:'9px',marginRight:'30px'}}
            /></Link>

            <Link to='/react-carshop/orders'>
            <img
              src="/img/user.png"
              alt="Login"
              width={18}
              height={18}
              style={{borderRadius:'9px'}}
            />
            </Link>
          </li>
        </ul>
      </header>
    );
}
export default Header;

