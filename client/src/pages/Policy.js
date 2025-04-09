import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Terms & Conditions"}>
      <center>
      <div className="policy-container">
        <h1 className="policy-title">
          <br>
          </br><b> <br></br>Terms & Conditions</b></h1>
        <p className="policy-text">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
        </p>
        <h2 className="policy-subtitle">Information We Collect</h2>
        <p className="policy-text">
          We may collect personal information such as your name, email address, and phone number when you interact with our website.
        </p>
        <h2 className="policy-subtitle">How We Use Your Information</h2>
        <p className="policy-text">
          We use your information to provide and improve our services, personalize your experience, and communicate with you.
        </p>
        <h2 className="policy-subtitle">Your Rights</h2>
        <p className="policy-text">
          You have the right to access, update, or delete your personal data. If you have any questions, feel free to contact us.
        </p>
      </div>
      </center>
    </Layout>
  );
};

export default Policy;
