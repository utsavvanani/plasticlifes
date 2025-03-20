  import axios from "axios";
  import { Flip, toast } from "react-toastify";
  const url = "http://localhost:5500/v1";

  // const success = {
  //   position: "top-center",
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  //   transition: Flip,
  // };

  export const get_product = async (data) => {
    try {
      const response = await axios.get(`${url}/product/get_product`);
      //    console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      console.log("get user api:", error.message);
    }
  };

  export const SignupUser = async (data) => {
    try {
      const response = await axios.post(`${url}/user/SignupUser`, data);
      console.log(response?.data?.data);
      toast.success(response?.data?.message);
      return true;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  };

  export const LoginUser = async (data) => {
    try {
      const response = await axios.post(`${url}/user/LoginUser`, data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      return true;
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  };

  export const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `${url}/userProduct/addToCart/${productId}`,
        "",
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.data);
      toast.success(response?.data?.message);
      return true;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  };

  export const AddQuantity = async (productid) => {
    await axios.post(`${url}/userProduct/AddQuantity/${productid}`, "", {
      withCredentials: true,
    });
  };

  export const DecQuantity = async (productid) => {
    const resprose = await axios.post(
      `${url}/userProduct/DecQuantity/${productid}`,
      "",
      {
        withCredentials: true,
      }
    );
    // console.log("response", resprose.data.data.quantity);
    return resprose?.data?.data?.Quantity;
  };

  export const getUserProduct = async () => {
    try {
      const response = await axios.post(`${url}/userProduct/getUserProduct`, "", {
        withCredentials: true,
      });
      // console.log(response.data);
      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  };

  export const deleteProduct = async (productid) => {
    try {
      await axios.post(`${url}/userProduct/deleteProduct/${productid}`, "", {
        withCredentials: true,
      });
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  export const countProduct = async () => {
    try {
      const response = await axios.post(`${url}/userProduct/countProduct`, "", {
        withCredentials: true,
      });
      return response?.data?.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      return false;
    }
  };

  export const currentUser = async () => {
    try {
      const response = await axios.post(`${url}/user/currentUser`, "", {
        withCredentials: true,
      });
      console.log(response?.data?.data)
      return response?.data?.data;
    } catch (error) {
      console.log("sdd", error?.response?.data?.message);
      return false;
    }
  };

  export const userLogout = async () => {
    const res = await axios.post(`${url}/user/userLogout`, "", {
      withCredentials: true,
    });
    console.log("res", res);
    return res;
  };

  export const addToWishlist = async (productId) => {
    try {
      const res = await axios.post(`${url}/wishlist/addToWish/${productId}`,"",{withCredentials: true}
    );
    toast.success(res?.data?.message);

    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  export const getWishlist = async () => {
    try {
      const res = await axios.get(`${url}/wishlist/getWishlist`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  export const deleteWishlist = async (productId) => {
    try {
      const res = await axios.post(
        `${url}/wishlist/deleteWishlist/${productId}`,
        " ",
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  export const findProductById = async (productId) => {
    try {
      const res = await axios.post(
        `${url}/product/findProductById/${productId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data)
      return res.data.data;
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };






  export const allUser = async () => {
    try {
      const response = await axios.post(`${url}/user/allUser`, "", {
        withCredentials: true,
      });
      // console.log(response.data);
      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  };


  export const changeUserRole = async(userId,role) => {
    try {
      const response = await axios.post(`${url}/user/changeUserRole`, {userId,role}, {
        withCredentials: true,
      });
      // console.log(response.data);
      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  }
  
  export const deleteUser = async(userId) => {
    try {
      const response = await axios.post(`${url}/user/deleteUser`, {userId}, {
        withCredentials: true,
      });
      // console.log(response.data);
      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  }

  export const deleteAdminProduct = async(productId) => {
    try {
      const response = await axios.post(`${url}/product/productDelete`, {productId}, {
        withCredentials: true,
      });
      // console.log(response.data);
      toast.success(response?.data?.message);
      return response?.data?.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return false;
    }
  }
  

export  const addAdminProduct = async(data) => {
  try {
    const response = await axios.post(`${url}/product/create_product`, {data}, {
      withCredentials: true,
    });
    // console.log(response.data);
    toast.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
    return false;
  }
  }

export  const updateAdminProduct = async(id,data) => {
  try {
    const response = await axios.post(`${url}/product/update_product/${id}`, {data}, {
      withCredentials: true,
    });
    // console.log(response.data);
    toast.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
    return false;
  }
  }


  export const userOderProductEmpty = async (productid) => {
    try {
      await axios.post(`${url}/userProduct/userOderProductEmpty`, "", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };


