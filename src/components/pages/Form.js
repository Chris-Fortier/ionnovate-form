import React from "react";
import { withRouter } from "react-router-dom"; // a React element for linking
import classnames from "classnames";
import { isEqual } from "lodash";
import { teams } from "../../data/teams";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/; // https://regexlib.com Laurence O'Donnell

const defaultState = {
   firstNameError: "",
   lastNameError: "",
   emailError: "",
   phoneError: "",
   passwordError1: "",
   passwordError2: "",
   dobError: "",
   favTeamError: "",
};

class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = defaultState;
   }

   validateForm() {
      console.log("Submitting form");

      // initialize errors to false
      // let hasErrors = false;
      this.setState(defaultState);

      // initialize the submission object
      const submission = {};

      // check if they entered a first name
      const firstNameInput = document.getElementById("first-name").value;
      if (firstNameInput === "") {
         this.setState({ firstNameError: "Please enter your first name" });
      } else {
         submission.firstName = firstNameInput;
      }

      // check if they entered a last name
      const lastNameInput = document.getElementById("last-name").value;
      if (lastNameInput === "") {
         this.setState({ lastNameError: "Please enter your last name" });
      } else {
         submission.lastName = lastNameInput;
      }

      // test email
      const emailInput = document.getElementById("email").value.toLowerCase();
      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
         });
      else if (!EMAIL_REGEX.test(emailInput)) {
         this.setState({
            emailError: "Please enter a valid email address.",
         });
      } else {
         submission.email = emailInput;
      }

      // test phone
      const phoneInput = document.getElementById("phone").value;
      if (phoneInput === "")
         // this.setState({
         //    phoneError: "Please enter your phone number.",
         // });
         submission.phone = "";
      else if (!PHONE_REGEX.test(phoneInput)) {
         this.setState({
            phoneError: "Please enter valid 10-digit phone number.",
         });
      } else {
         // submit it without nonnumeric characters stripped out
         submission.phone = phoneInput.replace(/\D/g, "");
      }

      // test password
      const passwordInput1 = document.getElementById("password-1").value;
      const passwordInput2 = document.getElementById("password-2").value;
      let passwordInput1Good = false;
      let passwordInput2Good = false;
      if (passwordInput1 === "")
         this.setState({
            passwordError1: "Please enter a password.",
         });
      else if (passwordInput1.length < 10) {
         this.setState({
            passwordError1:
               "Your password must be at least 10 characters long.",
         });
      } else {
         passwordInput1Good = true;
      }

      if (passwordInput2 === "") {
         this.setState({
            passwordError2: "Please re-enter your password.",
         });
      } else if (passwordInput1 !== passwordInput2) {
         this.setState({
            passwordError2: "Your password inputs do not match.",
         });
      } else {
         passwordInput2Good = true;
      }

      if (passwordInput1Good && passwordInput2Good) {
         submission.password = passwordInput1;
      }

      // check if they entered a date
      const dobInput = document.getElementById("date-of-birth").value;
      const parsedDob = Date.parse(dobInput);
      if (dobInput === "") {
         this.setState({ dobError: "Please enter your date of birth" });
      } else if (parsedDob >= Date.now()) {
         this.setState({ dobError: "Your birthday cannot be in the future." });
      } else {
         submission.dob = parsedDob;
      }

      return submission;
   }

   async submit() {
      // await used to make sure we get the error states before the if statement
      const submission = await this.validateForm();

      // if there are no errors, console log the submission
      if (isEqual(this.state, defaultState)) {
         console.log("Submission looks good", submission);
      } else {
         console.log("There were errors", this.state);
      }
   }

   render() {
      return (
         <div className="container">
            <h1>NFL Fan Club Membership Application</h1>
            <form formNoValidate>
               <div className="card">
                  <div className="card-body">
                     <h5 className="card-title">Account Information</h5>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              {/* <label for="formGroupExampleInput">Example label</label> */}
                              <input
                                 type="text"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.firstNameError,
                                 })}
                                 placeholder="First name"
                                 id="first-name"
                              />
                              <div className="text-danger">
                                 {this.state.firstNameError}
                              </div>
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
                              <div className="text-danger">
                                 {this.state.lastNameError}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <input
                                 type="text"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.emailError,
                                 })}
                                 placeholder="Email"
                                 id="email"
                              />
                              <div className="text-danger">
                                 {this.state.emailError}
                              </div>
                           </div>
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <input
                                 type="tel"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.phoneError,
                                 })}
                                 placeholder="Phone (optional)"
                                 id="phone"
                              />
                              <div className="text-danger">
                                 {this.state.phoneError}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <input
                                 type="password"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.passwordError1,
                                 })}
                                 placeholder="Enter a password"
                                 id="password-1"
                              />
                              <div className="text-danger">
                                 {this.state.passwordError1}
                              </div>
                           </div>
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <input
                                 type="password"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.passwordError2,
                                 })}
                                 placeholder="Re-enter password"
                                 id="password-2"
                              />
                              <div className="text-danger">
                                 {this.state.passwordError2}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <input
                                 type="date"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.dobError,
                                 })}
                                 placeholder="Enter a date of birth"
                                 id="date-of-birth"
                              />
                              <div className="text-danger">
                                 {this.state.dobError}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="card">
                  <div className="card-body">
                     <h5 className="card-title">Fan Information</h5>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              {/* <label htmlFor="exampleFormControlSelect1">
                           Example select
                        </label> */}
                              <select
                                 className="form-control"
                                 id="favorite-team"
                              >
                                 <option value="" key="xxx">
                                    Favorite Team (Optional)
                                 </option>
                                 {teams.map((team, i) => {
                                    return (
                                       <option value={team.code} key={i}>
                                          {team.full_name}
                                       </option>
                                       // NOTE: removing the fragments caused the unique key warning to go away
                                    );
                                 })}
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* <div className="row">
                  <div className="col">
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
                     this.submit();
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
