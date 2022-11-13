import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../scss/component/PageShop/responsive.css";
import Arrow from "../../assets/font/Arrow.js";
import RangePrice from "./RangePrice";
import "../../scss/component/PageShop/Shop.scss";
import axiosApi from "../../api/axios";
export default function Shop() {
  const [data, setData] = React.useState([]);
  const param = useParams()
  const [page, setPage] = React.useState(1)
  const navigate = useNavigate()


  React.useEffect(() => {
    if (param.id) {
      const getApi = async () => {
        axiosApi
          .get(`Products/AllProductInUser?search=${param.id}`)
          .then((res) => setData(res));
      };
      getApi();
    } else {
      const getApi = async () => {
        axiosApi
          .get(`Products/AllProductInUser?page=${page}`)
          .then((res) => setData(res));
      };
      getApi();
    }
  }, [param.id, navigate, page]);

  return (
    <div className="Shop">
      <div className="grid wide">
        <div className="row">
          <div className="col l-3 m-12 c-12">
            <h1 className="Shop__heading">All Products (531)</h1>
            <p className="Shop__categories">Categories</p>
            <ul className="Shop__categories-list">
              <li className="Shop__categories-item">
                <Link to="#" className="Shop__categories-link">
                  Shoes (321)
                </Link>
              </li>
              <li className="Shop__categories-item">
                <Link to="#" className="Shop__categories-link">
                  Clothing (75)
                </Link>
              </li>
              <li className="Shop__categories-item">
                <Link to="#" className="Shop__categories-link">
                  Accessoris (135)
                </Link>
              </li>
            </ul>
            <RangePrice />
          </div>
          <div className="col l-9 m-12 c-12 Shop__product">
            <div className="Shop__product-sort">
              <span className="Shop__product-sort-name">Sort by</span>
              <Arrow />
            </div>
            <div className="row Shop__product-wrapper">
              {data.map((item, index) => {
                return (
                  <Link
                    to={`/DetailWriteReview/${item.id}`}
                    key={index}
                    className="col l-4 m-6 c-12 Shop__product-item"
                  >
                    <img
                      src={item.productImage}
                      alt=""
                      className="Shop__product-item-img"
                    />
                    <div className="Shop__product-info">
                      <h1 className="Shop__product-info-name">
                        {item.productName}
                      </h1>
                      <span className="Shop__product-info-price">
                        ${item.price}
                      </span>
                    </div>
                    <span className="Shop__product-item-brandname">
                      {item.brandName}
                    </span>
                  </Link>
                );
              })}
            </div>
           </div>
        </div>
      </div>
      <button onClick={() => setPage(1)}> page 1</button>
      <button onClick={() => setPage(2)}> page 2</button>

    </div>
  );
}
