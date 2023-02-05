import React, { useState } from "react";
import axios from "../../config/api";
import Swal from "sweetalert2";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      mobile: contact.mobile,
      message: `Hi, Your OTP is: ${Math.round(Math.random() * 1000000)}`,
    };

    axios.post("/contacts", formData).then((response) => {
      if (response.data.hasOwnProperty("errors")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message.toUpperCase(),
        });
      } else {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  console.log(contact);
  const handleMobileChange = (e) => {
    const mobileNo = e.target.value;
    if (validator.isNumeric(mobileNo)) {
      setContact({ ...contact, mobile: mobileNo });
    } else {
      setContact({ ...contact, mobile: "" });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter only Numeric Number",
      });
    }
  };
  return (
    <div style={{ margin: "50px 0px 0px 0px" }}>
      <h4>
        <p className="font-weight-bolder">Add new Contact: </p>
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="form-group col-md-2 form-inline">
          <label htmlFor="firstName"> First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={contact.firstName}
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
            className="form-control mx-sm-3"
          />{" "}
        </div>
        <br />

        <div className="form-group col-md-2 form-inline">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={contact.lastName}
            onChange={(e) =>
              setContact({ ...contact, lastName: e.target.value })
            }
            className="form-control mx-sm-3"
          />{" "}
        </div>
        <br />

        <div className="form-group col-md-2 form-inline">
          <label htmlFor="mobile">Mobile:</label>

          <input
            type="search"
            id="mobile"
            name="mobile"
            value={contact.mobile}
            onChange={(e) => handleMobileChange(e)}
            maxLength="10"
            className="form-control mx-sm-3 no-arrow"
          />
        </div>
        <input type="submit" value="Add" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default AddContact;
