import React,{Fragment, useEffect} from 'react'
import { FaBeer } from 'react-icons/fa';
import Carousel from 'react-material-ui-carousel';
import './Home.css';
import Product from "./ProductCard.js"
import MetaData from '../layout/MetaData';
import {getProduct} from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/Loading/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Home() {

  const dispatch = useDispatch();
  const {loading,error,products,productCount} = useSelector(state=>state.products)
  useEffect(()=>{
    if(error){
      return toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    dispatch(getProduct())
  },[dispatch,error])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Hamro Pasal" />

          <Carousel showArrows={true} className="sliders">
            <div className="sliderimgs">
              <div className="linearbg"></div>
              <img
                className="CarouselImages"
                src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                alt=""
              />
              <p className="legend">Fresh and clean</p>
              <p className="legendchild">
                Nepal Best Tasty Food Services and Food Preparing
              </p>
            </div>
            <div>
              <div className="linearbg"></div>
              <img
                className="CarouselImages"
                src="https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                alt=""
              />
              <p className="legend">Evergreen plants</p>
              <p className="legendchild">
                for your better health and life
              </p>
            </div>
            <div>
              <div className="linearbg"></div>
              <img
                className="CarouselImages"
                src="https://media.istockphoto.com/id/1348369752/photo/seamless-food-background-made-of-opened-canned-food.jpg?s=2048x2048&w=is&k=20&c=d5btWU5kb8SAlIii-viFisFddEIrITnizvrjkOIW2Kg="
                alt=""
              />
              <p className="legend">Variety of items</p>
              <p className="legendchild">
                For your taste and health
              </p>
            </div>
          </Carousel>
          <h2 className="homeHeading">All Vegetables</h2>
          <div className="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
}

export default Home