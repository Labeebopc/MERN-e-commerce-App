import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logger from 'use-reducer-logger'
// import data from '../../Data/data'
import './HomePage.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('http://localhost:5000/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    // const fetchData = async () => {
    //   const res = await axios.get("http://localhost:5000/api/products");
    //   setProducts(res.data)
    // };

    fetchData();

  }, [])

  return (
    <div>
      <h1>Featured Products</h1>
      <div className='products'>
        
        {loading ? (<div> Loading...</div>)
          :
          error ? (<div>{error}</div>)
            :
            (
              products.map((value) => (
                <div key={value.slug} className='product'>
                  <Link to={`/product/${value.slug}`}>
                    <img src={value.image} alt={value.name} />
                  </Link>
                  <div className="product-info">
                    <Link to={`/product/${value.slug}`}>
                      <p>{value.name}</p>
                    </Link>
                    <p>${value.price}</p>
                    <button>Add to Cart</button>
                  </div>
                </div>
              ))
            )
        }
      </div>
    </div>
  )
}

export default HomePage