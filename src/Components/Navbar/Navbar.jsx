import React, { useState, useEffect, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { BsCart } from "react-icons/bs";
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaBars, FaCross, FaPowerOff } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {Link} from "react-scroll";
import { IoLogOutOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "./navbar.css"
import Loader from "../Loader/Loader";



const Navbar = () => {

  const move = useNavigate();
  const cu = useSelector((store) => store.userSection.cu);
  const allCartItems = useSelector((store) => store.Cart.cart);


  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const [openSearch, setOpenSearch]=useState(false)
  const sideNavRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      try {
        if (res) {
          dispatch({
            type: "ADD_TO_CART",
            payload: res.data,
          });
        }
      } catch (e) {
      }
        });
  }, []);

  useEffect(() => {
    if (allCartItems) {
      setCart(allCartItems);
    }

  }, [allCartItems]);

  const filterCart = cart.filter((item) => item.userId === userId)
 
  const totalQuantity = filterCart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  const toggleSearch=()=>{
    setOpenSearch(!openSearch)
    setOpen(false)
  }

  const toggleNav = () => {
    setOpen(!open);
    setOpenSearch(false)
  };

  const handleClickOutside = (event) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      setOpen(false); // Close the sidebar if clicked outside
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    setLoading(true);
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
        if (res) {
          setProducts(res.data);
        }
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filtered = products?.filter((product) => {
      const searchResult = searchValue?.toLowerCase();
      const title = product?.title?.toLowerCase();
      const category = product?.category?.toLowerCase();
      const titleMatch = title?.includes(searchResult);
      const categoryMatch = category?.includes(searchResult);
      return (
        (titleMatch || categoryMatch )
      );
    });
    setFilteredProducts(filtered);
  }, [searchValue]);



  function Logout() {
    dispatch({
      type: "LOGOUT_USER",
    });
    move("/login");
  }


  return <>
    {/* For large screen */}
    <div className="container-fluid px-5 navbar_display" style={{ backgroundColor: "#F2F0F1" }}>
      <div className="d-flex justify-content-between align-items-center no-wrap">
        <div className="d-flex no-wrap align-items-center ">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="" />
          </a>
        </div>
        <div className="d-flex no-wrap align-items-center justify-content-center gap-5 fs-5">
          <div>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/products/all">
              Shop
            </NavLink>
          </div>
          <div>
            <Link className="nav-link cursor" to="review">
              Reviews
            </Link>
          </div>
          <div>
            <NavLink className="nav-link" to="/contact">
              Contact Us
            </NavLink>
          </div>
          {/* <div>
              <NavLink className="nav-link" to="/faqs">
                Faq's
              </NavLink>
            </div> */}
            <div>
              <NavLink className="nav-link" to="/all-blog">
                Blog
              </NavLink>
            </div>
        </div>
        <div className="small_nav_btn">
          <div className="navbar_right d-flex no-wrap gap-0 fs-3">
            <NavLink
              className="nav-link"
              onClick={toggleSearch}
            ><CgSearch />
            </NavLink>
            {cu.role != "admin" && (
        <NavLink className="nav-link cart-link" to={`/cart-checkout/${cu._id}`}>
          <div style={{ position: 'relative' }}>
            <BsCart size={24} />
            {/* {(cu._id != undefined) &&
              <span className="cart-badge">{filterCart?.length}</span>
            } */}
          </div>
        </NavLink>
      )}
            {cu.role === "admin" &&
              <NavLink
                className="nav-link"
                onClick={Logout}>
               <IoLogOutOutline />
              </NavLink>
            }
            {cu._id &&
              <>
                <NavLink
                  className="nav-link"
                  to={cu?.role === "admin" ? `/admin-dashboard` : `/user-profile/${cu._id}`}
                >
                  <FiUser />
                </NavLink>
              </>
            }
            {!cu._id &&
              <NavLink
                className="nav-link"
                to="/login"
              >
                <FiUser />
              </NavLink>
            }
          </div>
        </div>
      </div>
    </div>
    {/* Large screen end */}

    {/* For small screen */}

    <div className="container-fluid p-2 navbar_small" style={{ backgroundColor: "#F2F0F1" }}>
      <div className="d-flex no-wrap justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center">
          <button
            className="fs-3 p-0"
            style={{border:"none", outline:"none"}}
            onClick={toggleNav}
          >
            {open ? <RxCross2 /> : <HiBars3CenterLeft />}
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="" />
          </a>
        </div>
        <div className="small_nav_btn">
          <div className="navbar_right d-flex no-wrap gap-0 fs-3">
            <NavLink
              className="nav-link"
              onClick={toggleSearch}
            ><CgSearch />
            </NavLink>
            {cu.role !== "admin" && (
        <NavLink className="nav-link cart-link" to={`/cart-checkout/${cu._id}`}>
          <div style={{ position: 'relative' }}>
            <BsCart size={24} />
            {/* {filterCart?.length > 0 && (
              <span className="cart-badge">{filterCart?.length}</span>
            )} */}
          </div>
        </NavLink>
      )}
            {cu.role === "admin" &&
              <NavLink
                className="nav-link"
                onClick={Logout}>
                <IoLogOutOutline />
              </NavLink>
            }
            {cu._id &&
              <>
                <NavLink
                  className="nav-link"
                  to={cu?.role === "admin" ? `/admin-dashboard` : `/user-profile/${cu._id}`}
                >
                  <FiUser />
                </NavLink>
              </>
            }
            {!cu._id &&
              <NavLink
                className="nav-link"
                to="/login"
              >
                <FiUser />
              </NavLink>
            }
          </div>
        </div>
      </div>
    </div>

    {open && (
        <div ref={sideNavRef} className={`side_nav ${open ? 'side_nav_open' : ''}`}>
          <div className="d-flex flex-column gap-3">
            <div>
              <NavLink className="nav-link" to="/" onClick={toggleNav}>
                Home
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-link" to="/products/all" onClick={toggleNav}>
                Shop
              </NavLink>
            </div>
            <div>
              <Link className="nav-link" to="review" onClick={toggleNav}>
                Reviews
              </Link>
            </div>
            <div>
              <NavLink className="nav-link" to="/contact" onClick={toggleNav}>
                Contact Us
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-link" to="/all-blog" onClick={toggleNav}>
                Blog
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-link" to="/faqs" onClick={toggleNav}>
                Faq's
              </NavLink>
            </div>
            
          </div>
        </div>
      )}
    {/* Small screen end */}

{/* Seach Products */}
{openSearch &&
<>
  <div className=" d-flex justify-content-center mb-1" style={{position:"relative"}}>
      <input type="search" className="form-control"
      placeholder="Search Anything"
      style={{width:"300px"}}
      onChange={(e)=>setSearchValue(e.target.value)}
      />
  </div>
</>
}
{searchValue && (
  <div className="container-fluid px-lg-3 px-2 nav_search_margin">
    <div className="my-4 fs-5">Search Result...</div>
    {filteredProducts?.length === 0 ? (
      <div className="d-flex justify-content-center min-vh-50">
          <p>No Product found try with different keyword!</p>
      </div>
    ) : (
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2">
        {filteredProducts?.reverse().map((item, index) => (
          <div className="col card" key={index}>
            <a href={`/product/${item.title.replace(/ /g, '-')}/${item._id}`}>
              <div className="card_img">
                <img
                  src={item?.images[0]}
                  className="text-center"
                  alt={item?.title}
                />
              </div>
              <p className="card_title">{item?.title}</p>
              <p className="final_price">
                ${item?.Fprice.toFixed(0)}
                {item?.discount > 0 && (
                  <>
                    <span className="mx-2 text-muted discounted_price">
                      <s>${item?.price.toFixed(0)}</s>
                    </span>
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
)}

  </>
}

export default Navbar