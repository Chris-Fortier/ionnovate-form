import React from "react";
import { withRouter } from "react-router-dom"; // a React element for linking
import classnames from "classnames";

// const nflTeams = [
//    {
//       location: "Seattle",
//       teamName: "Seahawks",
//    },
//    {
//       location: "San Francisco",
//       teamName: "49ers",
//    },
// ];

const defaultState = {
   emailError: "",
   passwordError: "",
   firstNameError: "",
   lastNameError: "",
};

class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = defaultState;
   }

   submitForm() {
      console.log("Submitting form");

      // initialize errors to false
      let hasErrors = false;
      this.setState(defaultState);

      // check if they entered a first name
      if (document.getElementById("first-name").value === "") {
         this.setState({ firstNameError: "Please enter your first name" });
      }

      // check if they entered a last name
      if (document.getElementById("last-name").value === "") {
         this.setState({ lastNameError: "Please enter your last name" });
      }

      // if no errors, submit form
   }

   render() {
      return (
         <div className="container">
            <h1>Form Title</h1>
            <form formNoValidate>
               <div className="form-row">
                  <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                     <input
                        type="text"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.firstNameError,
                        })}
                        placeholder="First name"
                        id="first-name"
                     />
                     <div class="text-danger">{this.state.firstNameError}</div>
                  </div>
                  <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                     <input
                        type="text"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.lastNameError,
                        })}
                        placeholder="Last name"
                        id="last-name"
                     />
                     <div class="text-danger">{this.state.lastNameError}</div>
                  </div>
               </div>
               {/* <div className="row">
                  <div className="col">
                     <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                           Email address
                        </label>
                        <input
                           type="email"
                           className="form-control"
                           id="exampleInputEmail1"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                           We'll never share your email with anyone else.
                        </small>
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                           type="password"
                           className="form-control"
                           id="exampleInputPassword1"
                           placeholder="Password"
                        />
                     </div>
                     <div className="form-check">
                        <input
                           type="checkbox"
                           className="form-check-input"
                           id="exampleCheck1"
                        />
                        <label
                           className="form-check-label"
                           htmlFor="exampleCheck1"
                        >
                           Check me out
                        </label>
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">
                           Example select
                        </label>
                        <select
                           className="form-control"
                           id="exampleFormControlSelect1"
                        >
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                           Example textarea
                        </label>
                        <textarea
                           className="form-control"
                           id="exampleFormControlTextarea1"
                           rows="3"
                        ></textarea>
                     </div>
                  </div>
               </div> */}
               <div
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                     this.submitForm();
                  }}
               >
                  Submit
               </div>
            </form>
         </div>
      );
   }
}

export default withRouter(Form); // this is required for the redirect to work
