import React, { useEffect } from 'react';
import './App.css';


function App() {
  
  const [result, setResult] = React.useState([]);
  const [poke, setPoke] = React.useState([]);
  const [load, setLoad] = React.useState('true');
  const [arrP, setArrP] = React.useState([]);
  const [pages, setPages] = React.useState(1);

  const arr = [];
  const limit  = 150
  
  useEffect(() => {

  fetch('https://pokeapi.co/api/v2/pokemon/?limit='+limit)
      .then((response) => response.json())
      .then((data) => setResult(
        data.results.map((item) => {
          fetch(item.url)
            .then((response) => response.json())
            .then((allpokemon) => arr.push(allpokemon));
            setPoke(arr);
        }),
      ));
  }, []);

  useEffect(() => {
    console.log(poke.length)
        setTimeout(() => {
          setLoad(false);
          pagination(result.length);
        }, 1000);
    }, [result]);


   const gotoPage = page => {
    let arr = poke.slice(((page-1)*10),(page*10))
    return arr.map((img, i) => (
      <div id={img.id} key={img.id}>

        <div className='card'>
          <img  src={img.sprites.front_default} alt='pokemon' />
          <div >
            <h5 >{img.name}</h5>
            <h6>type: {img.types[0].type.name}</h6>
          </div>
        </div>

      </div>
    ))
  }

  const pagination = (limit) => {
    let arr1 = [];
    let pag = limit/10;
    for(let i = 1; i<=pag; i++){
      arr1.push(i);
    }
    setArrP(arr1);
  }

  const handleClick = page => evt => {
    evt.preventDefault();
    setPages(page)
    gotoPage(pages);
  }
 
  return (
    <div className="App">
       <div className='pokegallery'>

        { load ? (
          <p>Loading...</p>
        ) : (

          gotoPage(pages))}

          {
            arrP.map((id) => (
                      <div id={id} key={id} className="pagination"> 
                      <a className="page-link" href="#" onClick={ handleClick(id) }>{ id }</a>
                      </div>
                    ))
            
          }



</div>
    </div>
  );
}

export default App;