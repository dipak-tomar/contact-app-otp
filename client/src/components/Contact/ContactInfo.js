import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { Link, useParams } from "react-router-dom";

const ContactInfo = () => {
  const [contacts, setContacts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/contacts/${id}`)
      .then((response) => {
        const contacts = response.data;
        setContacts(contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div style={{ textAlign: "center", margin: "60px 0px 0px 0px" }}>
      <p className="font-weight-bold">Contact Info :</p>
      <ul className="list-inline">
        <li className="font-weight-normal list-inline-item">
          {" "}
          Name :- {contacts.firstName} {contacts.lastName}
        </li>
        <br />
        <li className="font-weight-normal list-inline-item">
          {" "}
          Mobile No. :- {contacts.mobile}
        </li>
      </ul>

      <div className="btn btn-info btn-sm ">
        <Link to={`/contacts/${contacts._id}/send`}> Send Message</Link>
      </div>

      <br />

      <div className="badge badge-warning">
        <Link to="/contacts">Back</Link>
      </div>
    </div>
  );
};

export default ContactInfo;
