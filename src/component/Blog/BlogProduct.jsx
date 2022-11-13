import React from "react";
import "../../scss/grid.css";
import "../../scss/component/Blog/BlogProduct.scss";
import "../../scss/component/homepage/responsive.css";
import axios from "axios";
import RecentPost from "../DetailBlog/RecentPost";
import PopularAuthor from "../DetailBlog/PopularAuthor";
import PopularPost from "../DetailBlog/PopularPost";

export default function BlogProduct() {
  const [data, setData] = React.useState([]);
  const getApi = async () => {
    axios
      .get("https://localhost:7292/api/Blog/GetAllBlog?CategoryId=4&page=1")
      .then((res) => setData(res.data));
  };
  React.useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="BlogProduct">
      <div className="grid wide BlogProduct__container">
        <div className="row BlogProduct__details">
          <div className="BlogProduct__posts">
            <div className="row">
              <div className="col l-8 c-12 BlogProduct__desc">
                <div className="row">
                  {data.map((item) => {
                    return (
                      <div className="BlogProduct__content" key={item.id}>
                        <div className="col l-6 m-12 sm-gutter BlogProduct__content-container">
                          <div>
                            <img
                              className="BlogProduct__content-img"
                              src={item.productImage}
                              alt=""
                            />

                            <header className="BlogProduct__content-header">
                              {item.productDetails.style}
                            </header>
                            <h1 className="BlogProduct__content-title">
                              {item.posts}
                            </h1>
                            <p className="BlogProduct__content-text">
                              {item.productDetails.description}
                            </p>

                            <div className="BlogProduct__content-account">
                              <img
                                className="BlogProduct__content-account-img"
                                src={item.account.avatar}
                                alt=""
                              />
                              <div className="BlogProduct__content-account-info">
                                <h2 className="BlogProduct__content-account-name">
                                  {item.account.userName}
                                </h2>
                                <p className="BlogProduct__content-account-date">
                                  {item.account.orderBy}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col l-4">
                <RecentPost />
                <PopularAuthor />
                <PopularPost />
              </div>
            </div>
            <ul className="BlogProduct__pagination">
              <li className="BlogProduct__pagination-item BlogProduct__pagination-item--active">
                <a className="BlogProduct__pagination-item-link">1</a>
              </li>
              <li className="BlogProduct__pagination-item">
                <a className="BlogProduct__pagination-item-link">2</a>
              </li>
              <li className="BlogProduct__pagination-item">
                <a className="BlogProduct__pagination-item-link">3</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
