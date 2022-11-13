import React from "react";
import { useEffect } from "react";
import Modal from "../Common/Modal.js";
import UseModal from "../Common/UseModal.js";
import axiosApi from "../../api/axios";
// import Modal from "../Common/Modal";
import useModal from "../Common/UseModal";
import "../../scss/component/Admin/FromButton.scss";
export default function FromButton() {
  const { isShowing, toggle } = useModal();
  const [data, setData] = React.useState([]);
  const [productId, setProductId] = React.useState("");
  const [update, setUpdate] = React.useState({});
  const [item, setItem] = React.useState({
    productName: "",
    type: "",
    description: "",
    brandName: "",
    price: 0,
    stock: 0,
    status: 0,
    imageFile: "",
  });

  const getApi = async () => {
    await axiosApi
      .get("Category_Admin")
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getApi();
  }, []);
  // Chức năng thêm/ sửa
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const checkItem = data.filter((i) => i.productId === update.productId);

    if (checkItem.length > 0) {
      try {
        item.price = parseInt(item.price);
        item.stock = parseInt(item.stock);
        item.status = parseInt(item.status);

        await axiosApi.put("Category_Admin", item);
      } catch (err) {}
    } else {
      try {
        item.price = parseInt(item.price);
        item.stock = parseInt(item.stock);
        item.status = parseInt(item.status);
        console.log(item);
        await axiosApi.post("Category_Admin/AddProduct", item);
      } catch (err) {}
    }
  };

  const handleOnChange = (e) => {
    const newItem = { ...item };

    newItem[e.target.id] = e.target.value;
    setItem(newItem);
  };

  // Chức năng xóa
  const deleteId = async (e) => {
    await axiosApi.delete(`Category_Admin/${e}`).then(() => getApi());
  };

  //Chức năng sửa
  const updateId = (e) => {
    setUpdate(e);
    setItem({
      productName: e.productName,
      type: e.type,
      description: e.description,
      brandName: e.brandName,
      price: e.price,
      stock: e.stock,
      status: e.status,
      imageFile: e.productImage,
    });
    // console.log(e);
  };

  //  Lấy id truyền qua model
  const handleModel = (e) => {
    toggle(); //kích hoạt model
    setProductId(e); // setState id
  };

  return (
    <div>
      <div>
        <div className="Header_form">
          <ul>
            <li>
              <a className="" href="">
                Product
              </a>
            </li>
            <li>
              <a href="">Order</a>
            </li>
          </ul>
        </div>
        <button className="Header">Thêm sản phẩm</button>
        <div className="Content">
          <form className="Content_from " onSubmit={(e) => handleOnSubmit(e)}>
            <Input
              className="Content_from_content_btn "
              label="ProductName"
              id="productName"
              value={item.productName}
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              className="Content_from_content_btn "
              label="Type"
              id="type"
              value={item.type}
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              className="Content_from_content_btn "
              label="Description"
              id="description"
              value={item.description}
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              className="Content_from_content_btn "
              label="BrandName"
              id="brandName"
              value={item.brandName}
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              className="Content_from_content_btn "
              label="Price"
              id="price"
              value={item.price}
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              className="Content_from_content_btn "
              label="Stock"
              id="stock"
              value={item.stock}
              onChange={(e) => handleOnChange(e)}
            />

            <label>Status</label>
            <select
              className="Content_from_content_btn "
              onChange={(e) => setItem({ ...item, status: e.target.value })}
              id="status"
              value={item.status}
            >
              <option value="">----</option>
              <option value="0">Deactive</option>
              <option value="1">Active</option>
            </select>
            <Input
              className="Content_from_content_btn "
              label="ImageFile"
              id="imageFile"
              value={item.imageFile}
              onChange={(e) => handleOnChange(e)}
            />
            <div className="Content_from_btn">
              <button className="Content_from_btn_1" type="submit">
                THÊM SẢN PHẨM
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Admin product */}
      <div className="Admin">
        <h1 className="header"> ADMIN PRODUCTS</h1>
        <div className="Product">
          <table>
            <thead className="table" id="render">
              <tr className="table_header">
                <td>ID</td>
                <td>ImageFile</td>
                <td>ProductName</td>
                <td>BrandName</td>
                <td>Price</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody>
              {data?.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>
                    <img
                      src={item.productImage}
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.brandName}</td>
                  <td>{item.price}.000VNĐ</td>
                  <td>
                    {item.status === 1
                      ? "Active"
                      : item.status === 0
                      ? "Deactive"
                      : null}
                  </td>
                  <td>
                    <button
                      className="Admin_update"
                      onClick={() => updateId(item)}
                      type="button"
                    >
                      SỬA
                    </button>

                    <button
                      className="Admin_remove"
                      onClick={() => handleModel(item.productId)}
                    >
                      XÓA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            isShowing={isShowing}
            hide={toggle}
            deleteId={() => deleteId(productId)}
          />
        </div>
      </div>
    </div>
  );
}

// tạo function cho input
function Input({ label, onChange, value, id }) {
  return (
    <div className="Content_from_content">
      <label className="Content_from_content_label" htmlFor="name">
        {label}
      </label>
      <br></br>
      <input
        required
        id={id}
        value={value}
        className="Content_from_content_input "
        onChange={onChange}
      />
    </div>
  );
}
