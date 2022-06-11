function App() {
  return (
    <div className="wrapper">
      <header>
        <div className="headerLeft">
          <img src="/img/logo.jpg" alt="logo" style={{width:'40px',height:'40px',borderRadius:'20px'}}/>
          <div className="headerInfo">
            <h3 className="text__uppercase">React sneackers</h3>
            <p style={{opacity:'0.5'}}>Магазин лучших машин</p>
          </div>
        </div>
        <ul className="headerRight">
          <li style={{marginRight:'30px'}}>
          <img src="/img/packet.png" alt="logo" width={18} height={18} borderRadius={9}/>
            <span >1205 rub</span>
          </li>
          <li>
          <img src="/img/user.png" alt="logo" width={18} height={18} borderRadius={9}/>

          </li>
        </ul>
      </header>
      <div className="content">
        <h1 className="listName">All sneakersS</h1>

        <div className="cars">
        <div className="card" >
          <img width={143} height={112} src="/img/cars/musculcar.jpg" alt="car"/>
          <h5>CyberCar light version, illusion</h5>
          <div className="cardBottom">
            <div className="cardPrice">
              <span>Цена:</span>
              <b>12 999 rub</b>
            </div>
            <button className="cardBtn">
              <img width={11} height={11} src="/img/plus.png" alt="plus"/>
            </button>
          </div>
        </div>

        <div className="card" >
          <img width={143} height={112} src="/img/cars/cyberbmw.jpg" alt="car"/>
          <h5>CyberCar light version, illusion</h5>
          <div className="cardBottom">
            <div className="cardPrice">
              <span>Цена:</span>
              <b>12 999 rub</b>
            </div>
            <button className="cardBtn">
              <img width={11} height={11} src="/img/plus.png" alt="plus"/>
            </button>
          </div>
        </div>

        <div className="card" >
          <img width={143} height={112} src="/img/cars/yelcar.jpg" alt="car"/>
          <h5>CyberCar light version, illusion</h5>
          <div className="cardBottom">
            <div className="cardPrice">
              <span>Цена:</span>
              <b>12 999 rub</b>
            </div>
            <button className="cardBtn">
              <img width={11} height={11} src="/img/plus.png" alt="plus"/>
            </button>
          </div>
        </div>

        <div className="card" >
          <img width={143} height={112} src="/img/cars/cybermask.jpeg" alt="car"/>
          <h5>CyberCar light version, illusion</h5>
          <div className="cardBottom">
            <div className="cardPrice">
              <span>Цена:</span>
              <b>12 999 rub</b>
            </div>
            <button className="cardBtn">
              <img width={11} height={11} src="/img/plus.png" alt="plus"/>
            </button>
          </div>
        </div>

        </div>




      </div>

    </div>
  );
}

export default App;
