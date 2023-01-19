import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../Environment";
import "../DetailFoods/Detail.css";
import { Link } from "react-router-dom";

const DetailFoods = () => {
  const [AllFoods, setAllFoods] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${id}`,
      headers: {
        apiKey: `${API_KEY}`,
      },
    })
      .then((response) => {
        console.log("cek:", response);
        console.log("cek1:", response.data.data);
        setAllFoods(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },);

  return (
    <>
      <div className="box-container">
        <div>
          <div
            className="card mb-3 mx-auto  shadow"
            style={{ maxWidth: `540px` }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={AllFoods.imageUrl}
                  className="img-fluid m-2 shadow"
                  style={{ height: "250px" }}
                  alt={AllFoods.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "26px" }}>
                    {AllFoods.name}
                  </h5>
                  <div className="d-flex gap-2 mt-4">
                    <i
                      className="bi bi-card-list"
                      style={{ color: "#0d6efd", fontSize: "16px" }}
                    ></i>
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Desc:
                      </span>{" "}
                      {AllFoods.description}
                    </p>
                  </div>
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <i
                      className="bi bi-card-checklist"
                      style={{ color: "#0d6efd", fontSize: "16px" }}
                    ></i>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Ingredients:
                      {AllFoods &&
                        AllFoods.ingredients.map((m, index) => {
                          return (
                            <span
                              style={{ fontWeight: "normal", fontSize: "16px" }}
                              key={index}
                            >
                              {(index ? ", " : " ") + m}
                            </span>
                          );
                        })}
                    </p>
                  </div>
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <i
                      className="bi bi-card-list"
                      style={{ color: "#0d6efd", fontSize: "16px" }}
                    ></i>
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Created At:
                      </span>{" "}
                      {AllFoods.createdAt}
                    </p>
                  </div>
                  <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                    <i
                      className="bi bi-card-list"
                      style={{ color: "#0d6efd", fontSize: "16px" }}
                    ></i>
                    <p className="text-desc" style={{ fontSize: "16px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Updated At:
                      </span>{" "}
                      {AllFoods.updatedAt}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  <i
                    className="fa-solid fa-heart m-1"
                    style={{ color: `red` }}
                  ></i>
                  {AllFoods.totalLikes}
                </small>
                <small className="text-muted">
                  <Link to={`/rating/${AllFoods.id}`}>
                    <i
                      className="fa-solid fa-star m-1"
                      style={{ color: `gold` }}
                    ></i>
                  </Link>
                  {AllFoods.rating}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailFoods;
