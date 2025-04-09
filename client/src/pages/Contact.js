import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contactImage from "../images/Contact.png";


const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <center>
      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-image">
          <img src={contactImage} alt="Contact Us" />


          </div>
          <div className="contact-info">
            <h1> <br>
            </br>📞 Get in Touch</h1>
            <p className="contact-desc">
              Have any queries? Need help with our products? <br />
              Feel free to reach out! We’re available 24/7. 🛒✨
            </p>
            <div className="contact-details">
              <p><BiMailSend /> <strong>Email:</strong> support@CustomT-shirt.com</p>
              <p><BiPhoneCall /> <strong>Phone:</strong> +91-987456321</p>
              <p><BiSupport /> <strong>Toll-Free:</strong> 1800-000-0000</p>
            </div>
          </div>
        </div>
      </div>
      </center>
    </Layout>
  );
};

export default Contact;
