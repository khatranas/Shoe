import React from "react";
import "../../scss/component/Admin/Order.scss";

export default function Order() {
  // const [data, setData] = React.useState([]);

  // const getApi = async () => {
  //   axios
  //     .get("https://localhost:7292/api/Order_Admin")
  //     .tden((res) => setData(res.data));
  // };
  // React.useEffect(() => {
  //   getApi();
  // }, []);

  return (
    <div>
        <h3 className="title"> Quản lý đơn hàng</h3>
      {data?.map((item, index) => {
        return (
            <div className="table">
          <div key={index}>
                
            {data?.map((item) => (
              <div >
              {/* <tr>
                <td>Id</td>
                <td>orderDate</td>
                <td>productName</td>
                <td>shipName</td>
                <td>status</td>
                <td>price</td>
                <td>quantity</td>
                <td>productImage</td>
                <td>total</td>
                <td>size</td>

              </tr> */}
              <tr>
                <td>{item.id}</td>
                <td>{item.orderDated}</td>
                <td>{item.productName}</td>
                <td>{item.shipName}</td>
                <td>{item.status}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <img src={item.productImage}/>
                <td>{item.total}</td>
                <td>{item.size}</td>

              </tr>
              
            </div>
            ))}{" "}
           
          </div>
            </div>
        );
      })}
    </div>
  );
}

const data = [
  {
    id: "538af071-0017-4e25-a02f-2a268375456d",
    orderDate: "2022-11-04T14:37:38.854364",
    productName: "Nike ZoomX Streakfly",
    shipName: "Châu Tinh Trì",
    shipAddress: "TPHCM",
    shipPhoneNumber: "123456789",
    status: 0,
    price: 213,
    quantity: 3,
    total: 639,
    brandName: "Men's Shoes",
    size: "M",
    productImage:
      "https://lh3.googleusercontent.com/drive-viewer/AJc5JmR4vAg9_VJqlg0WiateWDeoYd84lQzvlnvyHE3ltsfWXAl51_Zbqo6djfpEtbb1Ce_QMOZLLcY=w1920-h870",
  },
  {
    id: "51cd92ce-4371-4edd-bb7b-dcf6d1fd053b",
    orderDate: "2022-11-03T18:13:40.4750056",
    productName: "Nike ZoomX Streakfly",
    shipName: "Châu Tinh Trì",
    shipAddress: "TPHCM",
    shipPhoneNumber: "123456789",
    status: 0,
    price: 213,
    quantity: 1,
    total: 213,
    brandName: "Men's Shoes",
    size: "L",
    productImage:
      "https://lh3.googleusercontent.com/drive-viewer/AJc5JmR4vAg9_VJqlg0WiateWDeoYd84lQzvlnvyHE3ltsfWXAl51_Zbqo6djfpEtbb1Ce_QMOZLLcY=w1920-h870",
  },
];
