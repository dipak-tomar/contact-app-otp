import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useParams, Link } from "react-router-dom";

const Show = () => {
  const [messages, setMessages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/messages/${id}`)
      .then((response) => {
        const messages = response.data;
        setMessages(messages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div style={{ textAlign: "center", margin: "60px 0px 0px 0px" }}>
      <p className="font-weight-bold">Message Info :</p>
      <ul className="list-inline">
        <li className="font-weight-normal list-inline-item">
          {" "}
          Name :- {messages.name}{" "}
        </li>
        <br />
        <li className="font-weight-normal list-inline-item">
          {" "}
          Mobile No. :- {messages.mobile}
        </li>
        <br />
        <li className="font-weight-normal list-inline-item">
          {" "}
          Message :- {messages.message}
        </li>
        <br />
        <li className="font-weight-normal list-inline-item">
          {" "}
          Time :- {messages.createdAt}
        </li>
      </ul>
      <div className="badge badge-warning">
        <Link to="/messages">Back to Messages</Link>
      </div>
    </div>
  );
};

export default Show;
