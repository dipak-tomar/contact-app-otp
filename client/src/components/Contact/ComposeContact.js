import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ComposeContact = () => {
  const [contacts, setContacts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/contacts/${id}`)
      .then((response) => {
        const contacts = response.data;
        setContacts(contacts);
        console.log("Contacts", contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleClick = (e) => {
    const formDatas = e.target.value;
    const formData = {
      name: `${contacts.firstName} ${contacts.lastName}`,
      mobile: contacts.mobile,
      message: contacts.message,
      createdAt: Date(),
    };
    setContacts(formData);
    console.log("Form", formData, "2", formDatas);

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

    console.log(contacts);
  };
  console.log(contacts);
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
      <a href="/contacts" className="badge badge-warning">
        Back to Contacts
      </a>
    </div>
  );
};

export default ComposeContact;
