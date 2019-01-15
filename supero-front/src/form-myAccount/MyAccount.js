import React, { Component, Fragment } from "react";
import Header from "../Header";
import axios from "axios";
import Loading from "../Loading";
// import { Button } from "reactstrap";
// import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { load as loadAccount } from "./account";
import { connect } from "react-redux";
import "./myAccount.css";

class MyAccount extends Component {
  async componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/connecteduser`, {
        headers: {
          accept: "application/json",
          authorization: "Bearer " + localStorage.getItem("superoUser")
        }
      })
      .then(res => {
        this.props.getConnectedUser(res.data);
      });
  }

  render() {
    const { handleSubmit, load, pristine, reset, submitting } = this.props;
    return (
      <div
        style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        <div style={{ paddingBottom: "10px" }}>
          <Header title="Succès !" />
        </div>
        <div className="myAccount-container">
          {!this.props.loading ? (
            <Fragment>
              <form onSubmit={handleSubmit}>
                <h3>{this.props.connectedUser.user_pseudo}</h3>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      load(this.props.connectedUser)
                    }
                  >
                    Load Account
                  </button>
                </div>
                <div>
                  <label>Your pseudo</label>
                  <div>
                    <Field
                      name="user_pseudo"
                      component="input"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                </div>
              </form>
            </Fragment>
          ) : (
            <Fragment>
              <Loading />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

MyAccount = reduxForm({
  form: "initializeFromState"
})(MyAccount);

MyAccount = connect(
  state => ({
    initialValues: state.account.connectedUser // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(MyAccount);

export default MyAccount;
