import React from "react";
import "../../scss/component/Des/Banner.scss";
import { useParams } from "react-router-dom";
import axiosApi from "../../api/axios";
import Description from "./Description";
import { useRecoilState } from "recoil";
import { addToCart, cartState } from "../../features/cart/cartState";

export default function BannerDes() {
  const [cart, setCart] = useRecoilState(cartState)
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [size, setSize] = React.useState('40')

  const param = useParams()

  React.useEffect(() => {
    const getApi = async () => {
      setLoading(true)
      await axiosApi.get(
        `/DetailProductDescription/GetByLocal?productId=${param.id}`)
        .then((res) => setData(res)).catch(err => console.log(err.message));
      setLoading(false)
    };
    getApi()
  }, [param.id]);

  const handleAddToCart = (product) => {

    const newCart = addToCart(cart, product, size);
    setCart(newCart)
  }

  const handleSize = (e) => {
    setSize(e.target.value)
  }

  return (
    <div>
      {loading ? <h1>loading .........</h1> : (<>{data?.map((item, index) => (

        <div key={index} className="Banner flex-mobile">
          <div className="Banner_img">
            <img className="Banner_img-item" src={item.productImage} alt='' />
          </div>
          <div className="Banner_header">
            <h2 className="Banner_header_h3">
              {item.productName}
            </h2>
            <p className="Banner_header_p">{item.brandName}</p>
            <div className="Banner_header_two">
              <div className="Banner_header_two_price">
                ${item.price}
              </div>
            </div>
            <div className="Banner_header_des">
              <p className="Banner_header_des_p">
                {item.description}
              </p>
            </div>
            <a href="#Des" className="Banner_header_p1">See Details</a>
            <div className="Banner_header_btn">
              <p>QNT</p>
              <select
                id="cars"
              >
                <option value="1">1</option>
              </select>
              <p>SIZE</p>
              <select
                id="cars"
                onChange={handleSize}
              >
                <option value="40">40</option>
              </select>
            </div>
            <div className="Banner_header_button34">
              <button
                className="Banner_header_button34_3"
                onClick={() => handleAddToCart(item)}
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      ))}
      </>)}

      <div id="Des">
        <Description />
      </div>

    </div>
  );
}
