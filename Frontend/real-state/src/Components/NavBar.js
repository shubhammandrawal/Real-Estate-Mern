import React from 'react';
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const id = localStorage.getItem("userID");
  const name = localStorage.getItem("name").toUpperCase();
  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', fontWeight: "400px", fontSize: "20px", color: "#bcbcbc", padding: "0 2.8rem", marginTop: "10px" }}>
        <a href='/home'
          className='align-middle '>
          <p style={{ color: "#bcbcbc" }}
            className='  '
            id='menu'>
            USER ID: {id}
          </p>
          </a>
        <div className='nav-item'>
          <span
            className="nav-link"
            style={{ display: "flex", marginRight: "8%", }}
          >
            <i className='fs-4 bi-house' >
              <div className='dropdown'>
                <button
                // style={{background:"#6AB4F8"}}
                  type="button"
                  className="btn btn-info dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <FaUserAlt />
                  <span
                    // className=""
                    // style={{ marginTop: "5px", background:"#6AB4F8" }}
                  >{name}</span>

                </button>
                <div
                  className="dropdown-menu"
                  // style={{
                  //   backgroundColor: "#6AB4F8",
                  // }}
                >
                  
                  <a
                    style={{ textDecoration: "none", marginLeft:"8px"}}  
                    className="dropdown-item"
                    onClick={() => localStorage.clear()}
                    href="/"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </i>

          </span>
        </div>
      </div>
      <hr style={{ backgroundColor: "#e1f9f4", borderTop: "3px solid rgb(225, 249, 244)", marginBottom: "30px" }} />
    </>
  )
}

export default Navbar