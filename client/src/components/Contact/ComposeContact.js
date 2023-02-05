import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";

const ComposeContact = () => {
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

  const handleClick = (e) => {
    const formData = {
      name: `${contacts.firstName} ${contacts.lastName}`,
      mobile: contacts.mobile,
      message: contacts.message,
      createdAt: Date(),
    };
    setContacts(formData);

    axios.post("/messages", formData).then((response) => {
      const formData = response.data;
      setContacts(formData);
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Send",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div style={{ textAlign: "center", margin: "60px 0px 0px 0px" }}>
      <p className="font-weight-bold">Message : </p>
      <ul className="list-inline">
        <li className="font-weight-normal list-inline-item">
          {" "}
          Name :-
          {contacts.firstName && contacts.lastName ? (
            <span>
              {contacts.firstName} - {contacts.lastName}
            </span>
          ) : (
            <span>{contacts.name}</span>
          )}
        </li>
        <br />
        <li className="font-weight-normal list-inline-item">
          {" "}
          Message :- {contacts.message}
        </li>
      </ul>
      <button
        type="button"
        onClick={(e) => handleClick(e)}
        className="btn btn-primary btn-sm"
      >
        Send
      </button>{" "}
      <br />
      <br />
      <div className="badge badge-warning">
        <Link to="/messages">Back to Contacts</Link>
      </div>
    </div>
  );
};

export default ComposeContact;
