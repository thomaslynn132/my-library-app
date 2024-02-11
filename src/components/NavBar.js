import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
export default function NavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
      border: "double",
      color: isActive ? "darkblue" : "black",
      height: "30px",
      width: "85px",
      textAlign: "center",
      padding: "5px",
      marginTop: "5px",
      marginLeft: "5px",
      fontSize: "15px",
      borderRadius: "8%",
      boxShadow: "3px 3px 0px 0px",
      display: "inline-block",
      backgroundColor: "lightblue",
    };
  };

  const navItems = [
    { label: "Home", to: "/", exact: true },
    { label: "Books", to: "/Books", exact: true },
  ];

  return (
    <>
      <nav
        className="NavBar"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "55px",
        }}>
        {/* <NavLink
          to="/"
          exact
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
          }}>
          <img
            src={Logo}
            alt="Logo Of ALY Myanmar"
            height={50}
            width={50}
            style={{ marginLeft: "0" }}></img>
          <label
            style={{
              fontSize: "30px",
              fontFamily: "fantasy",
              color: "black",
            }}>
            ALY Myanmar
          </label>
        </NavLink> */}

        {isDesktop && (
          <div className="desktopMenu">
            <div className="mobileMenu">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  style={navLinkStyles}
                  to={item.to}
                  exact={item.exact}
                  onClick={toggleMobileMenu}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {!isDesktop && (
          <>
            <div className="navItems">
              <div className="desktopMenu">
                <div
                  onClick={toggleMobileMenu}
                  style={{ marginRight: "0px", marginLeft: "auto" }}>
                  <FiMenu
                    size={30}
                    style={{
                      color: "black",
                      border: "3px solid",
                      borderRadius: "20%",
                    }}
                  />
                </div>
                {isMobileMenuOpen && (
                  <>
                    <div className="mobileMenu">
                      {navItems.map((item, index) => (
                        <div className="mobileNav">
                          <NavLink
                            key={index}
                            style={navLinkStyles}
                            to={item.to}
                            exact={item.exact}
                            onClick={toggleMobileMenu}>
                            {item.label}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
