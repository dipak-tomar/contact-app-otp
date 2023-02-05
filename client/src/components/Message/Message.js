import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Message = () => {
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/messages")
      .then((response) => {
        const messages = response.data.reverse();
        setMessages(messages);
        console.log("Message", messages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRemove = (id) => {
    axios.delete(`/messages/${id}`).then((response) => {
      setMessages((prevState) => ({
        ...prevState,
        messages: prevState.filter(
          (message) => message._id !== response.data._id
        ),
      }));
      Swal.fire("Deleted", "", "sucess");
      navigate("/");
    });
  };

  return (
    <div style={{ margin: "40px 0px 0px 0px" }}>
      <h4>
        <p className="font-weight-bolder">
          Message Sent List:- {messages.length}
        </p>
      </h4>
      <table className="table table-sm col-md-9">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>OTP</th>
            <th>Action</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, i) => {
            return (
              <tr key={message._id}>
                <td>{i + 1}. </td>
                <td>{message.name}</td>
                <td>{message.createdAt}</td>
                <td>{message.message}</td>
                <td>
                  <a
                    href={`/messages/${message._id}`}
                    className="btn btn-outline-primary"
                  >
                    {" "}
                    Info{" "}
                  </a>
                </td>
                <td>
                  {
                    <button
                      onClick={() => {
                        handleRemove(message._id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Message;
