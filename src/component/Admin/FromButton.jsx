import React from "react";
import { useEffect } from "react";
import axiosApi from "../../api/axios";
import "../../scss/component/Admin/FromButton.scss";
export default function FromButton() {
  const [data, setData] = React.useState([]);
  const [productId, setProductId] = React.useState("");

  const [item, setItem] = React.useState({
    productName: "",
    type: "",
    description: "",
    brandName: "",
    price: 2.0,
    stock: 0,
    size: "",
    status: 0,
    imageFile: "",
  });
  // console.log(">>> kết quả: ", item);
  const getApi = async () => {
    await axiosApi
      .get("Category_Admin")
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getApi();
  }, []);
  // Chức năng thêm
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const checkItem = e.filter((item) => item.id === 1);
    console.log(checkItem);
    try {
      item.price = parseInt(item.price).toFixed(1);
      item.stock = parseInt(item.stock);
      item.status = parseInt(item.status);
      console.log(item);
      await axiosApi.post("Category_Admin/AddProduct", item);
    } catch (err) {
      console.log("Error");
    }
  };

  const handleOnChange = (e) => {
    const newItem = { ...item };

    newItem[e.target.id] = e.target.value;
    setItem(newItem);
  };

  // Chức năng xóa => thành công
  const deleteId = async (e) => {
    setProductId(e);
    alert("Bạn có chắc chắn muốn xóa không!");
    await axiosApi.delete(`Category_Admin/${productId}`);
  };

  // Chức năng sửa
  const updateId = async (e) => {
    setItem({
      productName: e.productName,
      type: e.type,
      description: e.description,
      brandName: e.brandName,
      price: e.price,
      stock: e.stock,
      size: e.size,
      status: e.status,
      imageFile: e.productImage,
    });
  };

  return (
    <div>
      <div>
        <div className="Header_form">
          <ul>
            {/* <li>
              <a className="" href="">
                ADDS
              </a>
            </li>
            <li>
              <a href="">ADMIN</a>
            </li>
            <li>
              <a href="">HOMEPAGE</a>
            </li> */}
          </ul>
        </div>
        <h1 className="Header">THÊM SẢN PHẨM </h1>
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
            <Input
              className="Content_from_content_btn "
              label="Size"
              id="size"
              value={item.size}
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
                      type="button"
                      className="Admin_remove"
                      onClick={() => deleteId(productId)}
                    >
                      XÓA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
