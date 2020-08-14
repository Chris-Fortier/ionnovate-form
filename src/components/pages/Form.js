import React from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { isEqual } from "lodash";
import { teams } from "../../data/teams";
import { STORY_WORD_LIMIT } from "../../utils/helpers";
import Counter from "../ui/Counter";
import hash from "object-hash";
import {
   validateFirstName,
   validateLastName,
   validateEmail,
   validatePhone,
   validatePassword,
} from "../../validation";

const defaultState = {
   firstNameError: "",
   lastNameError: "",
   emailError: "",
   phoneError: "",
   passwordError: "",
   dobError: "",
   storyError: "",
};

class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = { ...defaultState, storyCharCount: 0 };
   }

   validateForm() {
      console.log("Submitting form");

      // initialize errors
      this.setState({
         ...defaultState,
         storyCharCount: this.state.storyCharCount,
      });

      // initialize the submission object
      const submission = {};

      // check if they entered a first name
      const firstNameInput = document.getElementById("first-name").value;
      const firstNameError = validateFirstName(firstNameInput);
      this.setState({ firstNameError });
      if (firstNameError === "") {
         submission.firstName = firstNameInput;
      }

      // check if they entered a last name
      const lastNameInput = document.getElementById("last-name").value;
      const lastNameError = validateLastName(lastNameInput);
      this.setState({ lastNameError });
      if (lastNameError === "") {
         submission.lastName = lastNameInput;
      }

      // test email
      const emailInput = document.getElementById("email").value;
      const emailError = validateEmail(emailInput);
      this.setState({ emailError });
      if (emailError === "") {
         submission.email = emailInput;
      }

      // test phone
      const phoneInput = document.getElementById("phone").value;
      const phoneError = validatePhone(phoneInput);
      this.setState({ phoneError });
      if (phoneError === "") {
         submission.phone = phoneInput;
      }

      // test password
      const passwordInput1 = document.getElementById("password-1").value;
      const passwordInput2 = document.getElementById("password-2").value;
      const passwordError = validatePassword(passwordInput1, passwordInput2);
      this.setState({ passwordError });
      if (passwordError === "") {
         submission.password = hash(passwordInput1);
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

      // get favorite team
      const favTeamInput = document.getElementById("favorite-team").value;
      submission.favTeam = favTeamInput;

      // get followGamesVia
      submission.followGamesVia = document.querySelector(
         'input[name="follow-via"]:checked'
      ).value;

      // get otherSportsInterests
      const otherSportsInterestInputs = {
         fantasy: document.getElementById("fantasy").checked,
         betting: document.getElementById("betting").checked,
         playing: document.getElementById("playing").checked,
         videoGames: document.getElementById("video-games").checked,
         history: document.getElementById("history").checked,
      };
      submission.otherSportsInterests = otherSportsInterestInputs;

      // check their fan story
      const fanStoryInput = document.getElementById("fan-story").value;
      if (fanStoryInput.length > STORY_WORD_LIMIT) {
         this.setState({ storyError: " Please shorten your text." });
      } else {
         submission.fanStory = fanStoryInput;
      }

      // console.log(submission);
      return submission;
   }

   async submit() {
      // await used to make sure we get the error states before the if statement
      const submission = await this.validateForm();

      // generate the state that we should match if there are no errors
      const compareState = {
         ...defaultState,
         storyCharCount: this.state.storyCharCount,
      };

      // if there are no errors, console log the submission
      if (isEqual(this.state, compareState)) {
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
               <div className="card mt-4">
                  <div className="card-body">
                     <h5 className="card-title">Account Information</h5>
                     <p className="card-subtitle mb-2 text-muted">
                        * Fields marked with an asterisk are required.
                     </p>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <input
                                 type="text"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.firstNameError,
                                 })}
                                 placeholder="First name*"
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
                                 placeholder="Last name*"
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
                                 placeholder="Email*"
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
                                    "is-invalid": this.state.passwordError,
                                 })}
                                 placeholder="Enter a password*"
                                 id="password-1"
                              />
                           </div>
                           <div className="col-12 col-sm-6">
                              <input
                                 type="password"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.passwordError,
                                 })}
                                 placeholder="Re-enter password*"
                                 id="password-2"
                              />
                           </div>
                           <div className="text-danger col">
                              {this.state.passwordError}
                           </div>
                        </div>
                     </div>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <label htmlFor="date-of-birth">
                                 Date of birth
                              </label>
                              <input
                                 type="date"
                                 className={classnames({
                                    "form-control": true,
                                    "is-invalid": this.state.dobError,
                                 })}
                                 // placeholder="Enter a date of birth"
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
               <div className="card mt-4">
                  <div className="card-body">
                     <h5 className="card-title">Fan Information</h5>
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
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
                     <div className="form-group">
                        <div className="form-row">
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <fieldset>
                                 <legend>
                                    How do you usually follow the games?
                                 </legend>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="follow-via"
                                       value="tv"
                                       id="tv"
                                       defaultChecked
                                    />
                                    <label
                                       className="form-check-label"
                                       htmlFor="tv"
                                    >
                                       TV
                                    </label>
                                 </div>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="follow-via"
                                       value="radio"
                                       id="radio"
                                    />
                                    <label
                                       className="form-check-label"
                                       htmlFor="radio"
                                    >
                                       Radio
                                    </label>
                                 </div>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="follow-via"
                                       value="internet"
                                       id="internet"
                                    />
                                    <label
                                       className="form-check-label"
                                       htmlFor="internet"
                                    >
                                       Internet
                                    </label>
                                 </div>
                                 <div className="form-check">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="follow-via"
                                       value="stadium"
                                       id="stadium"
                                    />
                                    <label
                                       className="form-check-label"
                                       htmlFor="stadium"
                                    >
                                       At the stadium
                                    </label>
                                 </div>
                              </fieldset>
                           </div>
                           <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                              <p>What other sports interests do you have?</p>
                              <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="fantasy"
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor="fantasy"
                                 >
                                    Fantasy Sports
                                 </label>
                              </div>
                              <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="betting"
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor="betting"
                                 >
                                    Sports Betting
                                 </label>
                              </div>
                              <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="playing"
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor="playing"
                                 >
                                    Playing Sports
                                 </label>
                              </div>
                              <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="video-games"
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor="video-games"
                                 >
                                    Sports Video Games
                                 </label>
                              </div>
                              <div className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="history"
                                 />
                                 <label
                                    className="form-check-label"
                                    htmlFor="history"
                                 >
                                    Sports History
                                 </label>
                              </div>
                           </div>
                        </div>
                     </div>
                     <textarea
                        rows="6"
                        defaultValue={""}
                        style={{ width: "100%" }}
                        placeholder={`In ${STORY_WORD_LIMIT} words or less, describe how you became a fan.`}
                        onChange={() => {
                           this.setState({
                              storyCharCount: document.getElementById(
                                 "fan-story"
                              ).value.length,
                           });
                        }}
                        id="fan-story"
                     ></textarea>
                     <Counter
                        count={this.state.storyCharCount}
                        max={STORY_WORD_LIMIT}
                     />
                     <span className="text-danger">
                        {this.state.storyError}
                     </span>
                  </div>
               </div>
               <div
                  type="submit"
                  className="btn btn-primary mt-4"
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

export default withRouter(Form);
