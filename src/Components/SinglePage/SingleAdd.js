import React, { useState, useEffect } from "react";
import {
  FaAngleRight,
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import { FaVideoSlash } from "react-icons/fa";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { useNavigate, useParams } from "react-router-dom";
import Benefits from "../Benefits/Benefits";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { toast } from "react-toastify";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import axios from "axios";
import { Link } from "react-scroll";
import "./single.css";


const SingleAdd = () => {

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //   });
  // }, []);

  let cu = useSelector((store) => store.userSection.cu);
  const [formData, setFormData] = useState(new FormData());

  let move = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const allComments = useSelector((store) => store.Comment.comment);

  const { productId, title } = useParams();
  const [comments, setComments] = useState([])
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sucess, setSucess] = useState("")
  const [timeoutId, setTimeoutId] = useState(null);
  const [form, setForm] = useState(false)
  const [cmntLoading, setcmntLoading] = useState(false)
  const [imageSelected, setImageSelected] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);

  const dispatch = useDispatch();

  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setImageSelected(true);
    }
};

const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setVideoSelected(true);
    }
};

  const sendWhatsAppMessage = () => {
    const message = `I'm interested in product\n${window.location.href}\n\nCan you provide more details?`;
    const whatsappURL = `https://wa.me/+923067208343?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };


  useEffect(() => {

    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true)
        const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/singleProduct?id=${productId}`, { cancelToken: source.token })
        setProduct(resp?.data)
        setLoading(false)
      } catch (error) {
        if (axios.isCancel(error)) {
        } else { }
      }
    };
    fetchData();
    return () => {
      source.cancel();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [productId]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalImages = product?.images?.length || 0;

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setScrollPosition(index * 23);
  };

  const handleLeftArrowClick = () => {
    setSelectedImage(
      (prevSelectedImage) => (prevSelectedImage - 1 + totalImages) % totalImages
    );
  };

  const handleRightArrowClick = () => {
    setSelectedImage(
      (prevSelectedImage) => (prevSelectedImage + 1) % totalImages
    );
  };

  const copyUrlToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error("Error copying URL to clipboard:", error);
      return false;
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = window.location.href;
    const copiedSuccessfully = await copyUrlToClipboard(shareUrl);
    if (copiedSuccessfully) {
      toast.success("URL copied to clipboard");
    } else {
      toast.error("Failed to copy URL. Please try again or manually copy the URL.");
    }
    switch (platform) {
      case "general":
        break;
      case "instagram":
        window.open(`https://www.instagram.com/`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/`);
        break;
      default:
        break;
    }
  };


  const handleScroll = (direction) => {
    const container = document.querySelector(".small_images");
    if (container) {
      const scrollAmount = 50;

      if (direction === "up") {
        container.scrollBy({
          top: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "down") {
        container.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "left") {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
      setScrollPosition(
        direction === "left" || direction === "right"
          ? container.scrollLeft
          : container.scrollTop
      );
    }
  };

  const Increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const Decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const calculateTotalPrice = (
    quantity,

  ) => {

    let updatedFprice = product?.Fprice || 0;

    let totalPrice = updatedFprice * quantity;

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice(
    quantity,
  );

  async function AddToCart(
    product,
    totalPrice,
    color,
    size,
  ) {
  
    // if ((product?.sizes?.length > 0 && product?.colors?.length > 0)|| (product?.sizes?.length > 0 || product?.colors?.length > 0)) {
    //   if (!size || !color) {
    //     return toast.warning("Select Options");
    //   }
    // }
    
    if (cu._id === undefined) {
      move(`/login/${product.title}/${productId}`);
      toast.success("Login to Place Your Order");
    } else if (cu.role === "admin") {
      dispatch({
        type: "LOGOUT_USER",
      });
      move("/login");
      // toast.success("Login with different account");
    } else {

      try {
        product.userId = cu?._id;
        product.productId = product?._id;
        product.total = totalPrice;
        // product.price = product?.price;
        product.quantity = quantity;
        product.color = color;
        product.size = size;
        product.image = product?.images[0];
        product.discount = product?.discount;

        console.log("product data is", product)
        let response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addToCart`,
          product
        );

        if (response.data.message === "Product Added") {
          dispatch({
            type: "ADD_TO_CART",
            payload: response.data.alldata,

          });
        toast.success("Added to cart")
          // setSucess("cart")
        }
      } catch (error) {
        // toast.warning("Server Error Try Again Later...")
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (sucess) {
      const timeoutId = setTimeout(() => {
        setSucess('')
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    if (Error) {
      const timeoutId = setTimeout(() => {
        setError('')
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [sucess, Error]);

  async function Order() {
    await AddToCart(
      product,
      totalPrice,
      size,
      color,
    )

    //  if ((product?.sizes?.length > 0 && product?.colors?.length > 0)|| (product?.sizes?.length > 0 || product?.colors?.length > 0)) {
    //   if (!size || !color) {
    //     return toast.warning("Select Options");
    //   }
    // }

    if (cu._id && cu.role !== "admin") {
      move(`/cart-checkout/${cu._id}`);
    } else {
      move("/login/" + productId);
    }

  }

  const openForm = () => {
    setForm(!form)
  }

  const resetMediaSelection = () => {
    setImageSelected(false);
    setVideoSelected(false);
};

  const Comment = async (cmnt) => {

    window.scrollTo({
      top: 0,
    });
        const modal = document.getElementById('exampleModal');
        document.querySelector('.modal-backdrop').remove();
            console.log("comment working");
            setLoading(true);
            console.log("Commetn data is", cmnt.name, cmnt.email, cmnt.comment)

            if(!cu){
                toast.warning("Login to give feedback")
                return move('/login')
            }

    let mediaUrl = "";

    if (cmnt.image && cmnt.image[0] && cmnt.video && cmnt.video[0]) {
        setLoading(false);
        return toast.warning("Select each media");
    }

    if (cmnt.image && cmnt.image[0]) {
    setLoading(true);
        
        const imageType = cmnt.image[0].type;

        if (!imageType.startsWith("image/")) {
            setLoading(false);
            return toast.warning("Select valid image file");
        }

        const formData = new FormData();
        formData.append('file', cmnt.image[0]);
        formData.append('upload_preset', 'zonfnjjo');
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/image/upload", formData);
            mediaUrl = response.data.url;
            // console.log("Image uploaded successfully");
        } catch (error) {
            // console.error("Image upload failed", error);
        }
    }

    if (cmnt.video && cmnt.video[0]) {
    setLoading(true);
        
        const videoType = cmnt.video[0].type;


        if (!videoType.startsWith("video/")) {
            setLoading(false);
            return toast.warning("Select valid video format");
        }
        const formData = new FormData();
        formData.append('file', cmnt.video[0]);
        formData.append('upload_preset', 'zonfnjjo');
        try {
    setLoading(true);

            const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/video/upload", formData);
            mediaUrl = response.data.url;
            reset();
            // console.log("Video uploaded successfully");
        } catch (error) {
            // console.error("Video upload failed", error);
        }
    }

    try {
        setLoading(true);

        cmnt.mediaUrl = mediaUrl;
        cmnt.userId = cu._id;
        cmnt.name=cmnt.name;
        cmnt.email=cmnt.email;
        const commentWithProductId = { ...cmnt, productId };
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, commentWithProductId);
  
        if (response.data.message === "Comment Added") {

            dispatch({
                type: "ADD_COMMENT",
                payload: response.data.alldata,
            });
            setComments(response.data.alldata);
          
        // imageSelected([])
        // videoSelected([])
            setLoading(false);
            toast.success("Feedback submitted");
            // window.location.reload();
            reset();
        }
    } catch (e) {
        //   console.error("Comment submission failed", e);
    }
};

  useEffect(() => {
    setLoading(true);
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
        if (res) {
          dispatch({ type: "ADD_COMMENT", payload: res.data });
          setLoading(false)
        }
      });
    } catch (e) {
    }
  }, []);

  useEffect(() => {
    if (allComments) {
      setComments(allComments);
      setLoading(false);
    }
  }, [allComments]);

  const formatDateTime = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };
  return <>
    {loading ? (
      <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
        <Loader />
      </div >
    ) : product && product.images ? (
      <div className="container-fluid min-vh-100">
        <div className="row">
          <div className="col-lg-12 col-sm-12 my-5 s_categories_P d-flex align-items-center">
            {product?.category &&
              <p className="m-0 text-capitalize">
                home <FaAngleRight />
                product <FaAngleRight /> {product?.category}
              </p>
              }

          </div>

          <div className="col-lg-1 col-md-2 col-sm-12 order-lg-1 order-md-1 order-2 p-0 m-0 d-flex flex-column align-items-center" style={{ position: "relative" }}>
            <div className="small_images">
              {product?.images &&
                product?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="No Network"
                    onClick={() => handleThumbnailClick(index)}
                    className={`rounded-3 ${index === selectedImage ? "activeImg" : ""}`}
                  />
                ))}
            </div>
            {product?.images && product?.images.length > 3 && (
              <>
                {/* <div className="mt-3 arrow_display1 text-center">
                  <button
                    className="plus_btn"
                    onClick={() => handleScroll("up")}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className="plus_btn"
                    onClick={() => handleScroll("down")}
                  >
                    <FaArrowDown />
                  </button>
                </div> */}
                {/* <div className="arrow_display2">
                      <button
                        className="plus_btn plus_btn1 mx-2"
                        onClick={() => handleScroll("left")}
                      >
                        <IoIosArrowBack />
                      </button>
                      <button
                        className="plus_btn plus_btn2"
                        onClick={() => handleScroll("right")}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div> */}
              </>
            )}
          </div>

          <div className="col-lg-5 col-md-8 col-sm-12 order-lg-2 order-md-2 order-1 mb-lg-5 mb-2" style={{ height: "fit-content" }}>
            {loading || product.length === 9 ? (
              <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                <Loader />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ transition: "opacity 0.5s ease-in-out", position: "relative" }}>
                <InnerImageZoom
                  zoomScale={1}
                  className="rounded-3"
                  src={
                    product?.images && product.images[selectedImage]
                      ? product.images[selectedImage]
                      : "/loader.jpg"
                  }
                  zoomSrc={
                    product?.images && product.images[selectedImage]
                      ? product.images[selectedImage]
                      : "/loader.jpg"
                  }
                />
                {product?.discount && product?.discount > 0 ? (
                  <div className="discount">{`-${product?.discount}%`}</div>
                ) : null}

                {product?.images && product?.images.length > 1 && (
                  <>
                    <div
                      className="single_arrow1"
                      onClick={handleLeftArrowClick}
                    >
                      <IoIosArrowBack />
                    </div>
                    <div
                      className="single_arrow2"
                      onClick={handleRightArrowClick}
                    >
                      <IoIosArrowForward />
                    </div>
                  </>
                )}
              </div>
            )
            }

          </div>

          <div className="col-lg-5 col-sm-12 order-3" style={{ position: "relative", height: "fit-content" }}>
            <div className={`s_content ${product?.category === "bed" ? "bed_class" : ""}`}>
              <h1
                className="fs-1 "
              >
                {product?.title}
              </h1>
              {comments.filter((item) => item.productId === productId)
                .length > 0 && (
                  <div className=" my-2 cursor">
                    <Link to="review">
                      ({comments.filter(
                        (item) => item.productId === productId
                      ).length
                      }{" "}
                      Customer Review)
                    </Link>
                  </div>
                )}
               
              <div className="">
                <span
                  className="fw-bold fs-5"
                  style={{ color: "red" }}
                >{`£${totalPrice?.toFixed()}`}</span>
                {product.discount > 0 &&
                  <span className="fs-6 text-muted">
                    <s className="mx-2">{`£${product?.price.toFixed()}`}</s>
                  </span>}
              </div>
{product.sizes.length>0 &&
  <div className="my-2">
        <select
          name="size"
          id="size"
          className="form-select"
          value={size}
          onChange={(e)=>setSize(e.target.value)}
        >
          <option value="">Select a size</option>
          {product.sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
}

      {product.colors.length>0 &&
      <div className="my-2">
      <select
        name="color"
        id="color"
        className="form-select"
        value={color}
        onChange={(e)=>setColor(e.target.value)}
      >
        <option value="">Select a Color</option>
        {product.colors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
      }
      
              <div className="sigle_quatity_main mt-3">
                <div className="">
                  <p
                    className="m-0"
                    style={{
                      fontSize: "17px",
                      fontWeight: "600",
                    }}
                  >
                    Quantity{" "}
                  </p>
                </div>
                <div className="sigle_quatity">
                  <button className="plus_btn fs-6" onClick={Decrement}>
                    <FaMinus />
                  </button>
                  <p className="input_single text-center m-0 p-0">
                    {quantity}
                  </p>
                  <button className="plus_btn fs-6" onClick={Increment}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex mt-3">
              <p className="fs-6 fw-bolder">🌟 3-4 Days - </p><p className="text-muted"> Fast-Delivery</p>
            </div>
            <div className="d-flex">
              <p className="fs-6 fw-bolder ">🌟 7 Days - </p><p className="text-muted"> Warrenty Replacements</p>
            </div>
            <div className="d-flex">
              <p className="fs-6 fw-bolder ">🌟 24/7 - </p><p className="text-muted"> Customer Support</p>
            </div>
            <div className="mt-3 d-flex flex-wrap gap-3">
              <p className="m-0 d-flex align-items-center cursor" style={{
                fontSize: "17px",
                fontWeight: "600",
              }}>Share Product</p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("general")} style={{ width: "30px", height: "30px", borderRadius: "100%" }}><FaShareAlt /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("instagram")} style={{ width: "30px", height: "30px", background: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)", color: "rgb(255, 255, 255)", borderRadius: "100%" }}><FaInstagram /></p>
              {/* <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("tiktok")} style={{ width: "30px", height: "30px", background: "black", color: "white", borderRadius: "100%" }}><FaTiktok /></p> */}
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("facebook")} style={{ width: "30px", height: "30px", backgroundColor: "rgb(24, 119, 242)", color: "rgb(255, 255, 255)", borderRadius: "100%" }}><FaFacebook /></p>
              {/* <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("pint")} style={{ width: "30px", height: "30px", backgroundColor: "#E60023", color: "#FFFFFF", borderRadius: "100%" }}><FaPinterestP /></p> */}
            </div>

            {Error === "options" && (
              <div className="error">All fields are required</div>
            )}

            <div className="s_btn my-3">
              <button
                className="button-submit px-5 py-3 fw-bolder"
                onClick={() =>
                  AddToCart(
                    product,
                    totalPrice,
                    size,
                    color,
                  )
                }
              >
                Add to Cart
              </button>
              <button className="button-submit px-5 py-3 fw-bolder" onClick={Order}>
                Order Now
              </button>
            </div>
            <button className="s_whatsapp fw-bolder" onClick={sendWhatsAppMessage}>
              Buy via WhatsApp
            </button>
          </div>

        </div>

        <div className="row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <p
              className="fs-2 fw-bolder"
            >
              Size Chart
            </p>
              <div className="d-flex justify-content-center">
                <img src="/chart.png" className="img-fluid" alt="" />
              </div>
          </div>
        </div>

        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <p className="fs-3 fw-bolder">Related Products
            </p>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "80vh" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4 my-5">
                {data?.filter((item)=>item.category===product.category)
                .map((item, index) => (
                  <div className="col card" key={index}>
                    <a href={`/product/${item.title.replace(/ /g, '-')}/${item._id}`}>
                      <div className="card_img">
                        <img src={item?.images[0]} className="text-center" alt={item?.title} />
                      </div>
                      <p className="card_title">{item?.title}</p>
                      <p className="final_price">
                        ${item?.Fprice.toFixed(0)}
                        {item?.discount > 0 && (
                          <>
                            <span className="mx-2 text-muted discounted_price"><s>${item?.price.toFixed(0)}</s></span>
                            <span className="mx-2 discount">-{item?.discount}%</span>
                          </>
                        )}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="row mb-5" id="review">
          <div className="col-lg-12 col-md-12 col-sm-12 px-lg-5 px-3" >
            <div className="row d-flex justify-content-center">
           
            <div className="col-12 p-2" style={{ backgroundColor: "#F2F0F1" }}>
                  <div className="border p-5 d-flex flex-column justify-content-center align-items-center">
                    <p className="fw-bolder fs-3">Customer Reviews</p>
                    <p className="text-center fs-5">No review yet. Any feedback? Let us know </p>
                    <div className="">
                      <button className="button-submit px-3" 
                       data-bs-toggle="modal"
                       data-bs-target="#exampleModal"
                       >Write a review</button>
                    </div>
                  </div>
                </div>
            {comments.filter((item) => item.productId === productId).length > 0  &&
  <div className="col-lg-12 col-md-12 col-sm-12 my-5">
  <h1 className="fs-1 fw-bolder my-5">
    Riski-Brothers Society
  </h1>
  {/* <p className=fs-6'>Over 10,000 happy customers!</p> */}

  <div className='h_box_main'>
    {loading ? (
      <div
        className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <Loader />
      </div>
    ) : comments.filter((item) => item.productId === productId)
      .length === 0 ? (
      <div
        className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <h2>No Review available</h2>
      </div>
    ) : (comments
      .filter((item) => item.productId === productId)
      .map((item, index) => {
        return <>
          <div className='card border p-2' style={{ width: "270px" }} key={index}>
            <div className="card_img mb-2" style={{ background: "transparent" }}>
              {item?.mediaUrl ===undefined &&(
                    <img src="/feedback.png" alt={item.title} style={{ maxWidth: '100%', height: '95%' }} />
              )
              }
              {item?.mediaUrl && (
                <div>
                  {item?.mediaUrl.endsWith('.jpg') || item?.mediaUrl.endsWith('.png') ? (
                    <img src={item?.mediaUrl} alt={item.title} style={{ maxWidth: '100%', height: '95%' }} />
                  ) : (
                   <video controls autoPlay={false} style={{ maxWidth: '100%', maxHeight: '95%' }}>
                      <source src={item?.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
            <p className='text-center'>{item?.comment}</p>
            <p className='text-center fw-bolder'>{item?.name}</p>
          </div>
        </>
      })
    )}
  </div>
</div>
            }
          


                {loading ? (
                        <div className='min-vh-50 d-flex justify-content-center align-items-center'>
                            <Loader />

                        </div>
                    ) : (
                        <div
  className="modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Reviews
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={resetMediaSelection}
        />
      </div>
      <div className="modal-body">
      <div className="modal-body p-3">
                                        <form action="" onSubmit={handleSubmit(Comment)}>
                                           
                                            <div className="mb-3">
                                                <label className="form-label">Your Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Rose Merie"
                                                    defaultValue={cu?.name}
                                                    required
                                                    {...register('name')}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Email address</label>
                                                <input
                                                    type="email"
                                                    placeholder="asd@gmail.com"
                                                    className="form-control"
                                                    defaultValue={cu?.email}
                                                    required
                                                    {...register('email')}
                                                />
                                            </div>

                                            <div className="d-flex gap-2 mb-3">
                                            {!imageSelected && !videoSelected && (
            <>
                {/* Image input */}
                <div className="file-input-container">
                    <label className="file-input-box">
                        <i><MdOutlinePhotoLibrary /></i>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            className="file-input"
                            onChange={handleImageChange}
                        />
                        <p className="text-muted m-0">Photo</p>
                    </label>
                </div>

                {/* Video input */}
                <div className="file-input-container">
                    <label className="file-input-box">
                        <i><FaVideoSlash /></i>
                        <input
                            type="file"
                            accept="video/*"
                            {...register('video')}
                            className="file-input"
                            onChange={handleVideoChange}
                        />
                        <p className="text-muted m-0">Video</p>
                    </label>
                </div>
            </>
        )}

        {/* Show success messages after selection */}
        {imageSelected && <p className='text-success'>Image Selected</p>}
        {videoSelected && <p className='text-success'>Video Selected</p>}                                      
                                              
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Write your feedback</label>
                                                <textarea
                                                    rows="5"
                                                    className="form-control"
                                                    required
                                                    {...register('comment')}
                                                />
                                            </div>
                                            <button type="submit" className="button-submit w-100">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
      </div>
     
    </div>
  </div>
</div>

                    )
                    }
              
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <Benefits />
          </div>
        </div>

      </div >
    ) : (
      <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
        <Loader />
      </div >
    )
    }

  </>
};

export default SingleAdd;
