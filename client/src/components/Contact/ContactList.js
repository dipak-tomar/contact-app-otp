import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios
      .get("/contacts")
      .then((response) => {
        const contacts = response.data;
        setContacts(contacts);
        console.log("contact", contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRemove = (id) => {
    console.log(contacts);
    axios.delete(`/contacts/${id}`).then((response) => {
      setContacts((prevState) => ({
        ...prevState,
        contacts: prevState.filter(
          (contact) => contact._id !== response.data._id
        ),
      }));
      Swal.fire({ title: "Deleted", icon: "success" });
      navigate("/");
    });
  };

  return (
    <div style={{ margin: "40px 0px 0px 0px" }}>
      <h4>
        <p className="font-weight-bolder">Contact List:- {contacts.length}</p>
      </h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {!contacts && <h1>No Contacts Found</h1>}
          {contacts.map((contact, i) => {
            return (
              <tr key={contact._id}>
                <td>{i + 1}.</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>
                  <a
                    href={`/contacts/${contact._id}`}
                    className="btn btn-success"
                  >
                    {" "}
                    Info{" "}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleRemove(contact._id);
                    }}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <a href="/contacts/add" className="btn btn-primary">
        Add New
      </a>
    </div>
  );
};

export default ContactList;
