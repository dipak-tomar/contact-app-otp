import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddContact from "./components/Contact/AddContact";
import ContactList from "./components/Contact/ContactList";
import ContactInfo from "./components/Contact/ContactInfo";
import ComposeContact from "./components/Contact/ComposeContact";
import Message from "./components/Message/Message";
import Show from "./components/Message/Show";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/contacts">
                  Contact
                </a>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/messages">
                  Message
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} exact={true} />
          <Route path="/contacts" element={<ContactList />} exact={true} />
          <Route path="/contacts/add" element={<AddContact />} exact={true} />
          <Route path="/contacts/:id" element={<ContactInfo />} exact={true} />
          <Route path="/contacts/:id/send" element={<ComposeContact />} />

          <Route path="/messages" element={<Message />} exact={true} />
          <Route path="/messages/:id" element={<Show />} exact={true} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
