import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Foods/foods.css";
import "../Rating/Rating.css";


const Rating = () => {
  let { foodsID } = useParams();

  const [foods, setFoods] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        console.log('cek data:', res)
        setFoods(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodsID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/food-rating/${foodsID}`,
      headers: {
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        console.log('cek rating:',res)
        setRating(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/rate-food/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((res) => {
        console.log(res);
        getRating();
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.string().required("Required"),
      review: Yup.string().required("Required"),
    }),
  });
  return (
    <>
      <div style={{padding:'120px', backgroundColor: '#e3f2fd'}}>
        <div
          className="card mb-3 mx-auto  shadow"
          style={{ maxWidth: `540px` }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={foods && foods.imageUrl}
                className="img-fluid m-2 shadow"
                style={{height:'250px'}}
                alt={foods && foods.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title" style={{fontSize:'26px'}}>{foods && foods.name}</h5>
                <div className="d-flex gap-2 mt-4" >
                  <i className="bi bi-card-list" style={{color: '#0d6efd', fontSize:'16px'}}></i>
                  <p className="text-desc" style={{fontSize:'16px'}}><span style={{fontWeight:'bold', fontSize:'16px'}}>Desc:</span> {foods && foods.description}</p>
                </div>           
                <div className="d-flex gap-2" style={{marginTop:'-20px'}}>
                    <i className="bi bi-card-checklist" style={{color: '#0d6efd', fontSize:'16px'}}>                     
                    </i>
                    <p style={{fontSize: '16px', fontWeight:'bold'}}>Ingredients:
                      {foods && foods.ingredients.map((i, index) => {
                          return (
                            <span style={{fontWeight: 'normal', fontSize:'16px'}} key={index}>{(index ? ", " : " ") + i}</span>
                          );
                        })}
                    </p>
                </div>
                <p className="card-text">
                  <i
                    className="fa-solid fa-star m-1"
                    style={{ color: `gold` }}
                  ></i>
                  {foods && foods.rating}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn-create shadow fw-bold"
            data-bs-toggle="modal"
            data-bs-target={`#rating${foods && foods.id}`}
          >
            Create Rating
          </button>
        </div>
        <div
          className="modal fade"
          id={`rating${foods && foods.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body">
              <form
                className="box-addFoods"
                onSubmit={(e) => handleSubmit(e, foods.id)}
              >
                <div className="text-center">
                  <h2 style={{color:'#0d6efd',position:'relative', right: '-30px'}}>Create Rating</h2>
                  <h4 className="color1 fw-bolder">
                  {/* {foods && foods.name} */}
                  </h4>
                </div>
                <div style={{position:'relative', right: '40px'}} className='row gap-4'>
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Rating
                  </label>
                  <input
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                    className="add-input"
                    id="rating"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Review
                  </label>
                  <input
                    value={formik.values.review}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="add-input"
                    id="review"
                  />
                </div>                           
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>

        {rating &&
          rating.map((rate) => {
            return (
              <div key={rate.id}>
                <div
                  className="col-6 list-group mt-3 mx-auto  "   
                >
                  <li className="d-flex justify-content-between align-items-start food-card shadow list-group-item">
                    <div className="d-flex gap-3">
                      <img
                        src={rate.user.profilePictureUrl}
                        className="set-img"
                        alt={rate.user.name}
                      />
                      <div className=" ">
                        <div className="fw-bold" style={{color: '#0d6efd'}}>{rate.user.name}</div>
                        {rate.review}
                      </div>
                    </div>
                    
                    <div>
                      <i
                        className="fa-solid fa-star m-1"
                        style={{ color: `gold` }}
                      ></i>
                      {rate.rating}
                    </div>
                  </li>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Rating;