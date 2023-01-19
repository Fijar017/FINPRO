import Footer from '../Footer/Footer';
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link, Outlet } from "react-router-dom";
import imgmasterfood3 from "../../img/masterfood3.png";
import Navbar from '../Navbar/Navbar';
// import Carousel from 'react-elastic-carousel';

// const breakPoints = [
//   { width: 1, itemsToShow: 1 },
//   { width: 550, itemsToShow: 2 },
//   { width: 768, itemsToShow: 3 },
//   { width: 1200, itemsToShow: 4 }
// ];

const Home = () => {
  const [AllFoods, setAllFoods] = useState([]);

  const getAllFoods = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${API_KEY}` };
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods`,
      headers: headers,
    })
      .then((resp) => {
        console.log("cek:", resp);
        setAllFoods(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, try reloading the page");
      });
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  const handleLikes = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/like`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
      })
        .then((response) => {
          console.log(response);
          getAllFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/unlike`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
      })
        .then((response) => {
          console.log(response);
          getAllFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
    <Navbar />
    <Outlet />
    <div className='home-body'></div>
      <div className="home-section">
        <div className="content">
          <h3>Welcome To Gallery Master Food</h3>
          <p1>
          you can explore all the best recipes in Nusantara
          </p1>
          <br></br>
          <p2>
            "East or West, Food is the best"
          </p2>
        </div>

        <div className="img-home">
          <img src={imgmasterfood3} alt="landing" />
        </div>
      </div>
      




      <div className=" bg-food">
        <h3 className="title-h3">Gallery Noesantara</h3>
        <div className="img-center">
          <div className="grid-img">
            {AllFoods &&
              AllFoods.map((foods) => {
                return (
                  <>
                  {/* <Carousel breakPoints={breakPoints}></Carousel> */}
<Fragment>
      <section>
        <div className='row'>
            <div className='product'>
              <div className='product-thumb'>
                <Link><img src={foods.imageUrl} alt='imagefood' /></Link>
              </div>
              <div className='product-body'>
                <div className='title'>
                    <h6>{foods.name}</h6>
                </div>
                <div className='price'>
                <i
                              className="fa-solid fa-heart"
                              onClick={() =>
                                handleLikes(foods.id, foods.isLike)
                              }
                              on
                              style={{
                                color: `${foods.isLike ? "red" : ""}`,
                                cursor: "pointer",
                                fontSize: "25px",
                              }}
                            ></i>
                             <p
                              style={{
                                position: "relative",
                                fontSize: "20px",
                              }}
                            >
                              {foods.totalLikes}
                            </p>
                            <Link
                              className="d-flex set-rating"
                              style={{ marginLeft:"14px" }}
                              to={`/rating/${foods.id}`}
                            >
                              <i
                                className="fa-solid fa-star"
                                style={{ color: "#FFD700", fontSize: "25px" }}
                              ></i>
                              <p
                                style={{
                                  position: "relative",
                                  fontSize: "20px",
                                }}
                              >
                                {foods.rating}
                              </p>
                            </Link>
                </div>          
                <div className='footer'>
                  <div className='btn'>
                    <Link className="btn-detail"
                                to={`/detail-foods/${foods.id}`}>View Detail
                                </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </Fragment>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
