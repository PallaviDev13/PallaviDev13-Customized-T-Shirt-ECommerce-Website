import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";


const Pagenotfound = () => {
  return (
    <Layout title={"Go back - Page Not Found"}>
      <center>
      <div className="pnf-container">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <p className="pnf-text">The page you are looking for doesn’t exist or has been moved.</p>
        <Link to="/" className="pnf-btn">
          🔙 Go Back Home
        </Link>
      </div>
      </center>
    </Layout>
  );
};

export default Pagenotfound;
