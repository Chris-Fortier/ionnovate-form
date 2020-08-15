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
   validateDob,
} from "../../validation";
import toDisplayDate from "date-fns/format";

const defaultState = {
   firstNameError: "",
   lastNameError: "",
   emailError: "",
   phoneError: "",
   passwordError: "",
   dobError: "",
   storyError: "",
   submitError: "",
};

class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         ...defaultState,
         storyCharCount: 0,
         isShowingMembershipCard: false,
         submission: {},
      };
   }

   validateForm() {
      console.log("Submitting form");

      // initialize errors
      this.setState({
         ...defaultState,
         storyCharCount: this.state.storyCharCount,
         isShowingMembershipCard: this.state.isShowingMembershipCard,
         submission: this.state.submission,
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
      const dobError = validateDob(dobInput);
      this.setState({ dobError });
      if (dobError === "") {
         submission.dob = Date.parse(dobInput);
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
         isShowingMembershipCard: this.state.isShowingMembershipCard,
         submission: this.state.submission,
      };

      // if there are no errors, console log the submission
      if (isEqual(this.state, compareState)) {
         console.log("Submission looks good", submission);
         this.setState({ isShowingMembershipCard: true, submission });
      } else {
         console.log("There were errors", this.state);
         this.setState({
            submitError: "You must fix your errors above before submitting.",
         });
      }
   }

   // toggle the membership card
   toggleMembershipCardDisplay() {
      this.setState({
         isShowingMembershipCard: !this.state.isShowingMembershipCard,
      });
   }

   renderMembershipCard() {
      return (
         <div
            id="myModal"
            className="modal"
            onClick={() => {
               this.toggleMembershipCardDisplay();
            }}
         >
            <div
               className="modal-content"
               onClick={(e) => {
                  e.stopPropagation();
               }} // this stops it from doing the parent onClick event (stops it from closing if you click inside the modal)
            >
               <h3>
                  NFL Fan Club
                  <br />
                  Membership Card
               </h3>
               <table className="table table-borderless mb-0">
                  <tbody>
                     <tr>
                        <th scope="row">Name</th>
                        <td>
                           {this.state.submission.firstName}&nbsp;
                           {this.state.submission.lastName}
                        </td>
                     </tr>
                     <tr>
                        <th scope="row">Email</th>
                        <td>{this.state.submission.email}</td>
                     </tr>
                     <tr>
                        <th scope="row">Member Since</th>
                        <td>{toDisplayDate(Date.now(), "MMM dd, yyyy")}</td>
                     </tr>
                     <tr>
                        <th scope="row">Rank</th>
                        <td>Rookie</td>
                     </tr>
                     <tr>
                        <th></th>
                        <td>
                           <img
                              className="float-right"
                              src={
                                 teams.find((team) => {
                                    return (
                                       team.code ===
                                       this.state.submission.favTeam
                                    );
                                 }).logo
                              }
                              alt="team logo"
                              width="120px"
                           />
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      );
   }

   render() {
      return (
         <div className="container">
            <h1>
               NFL Fan Club
               <br />
               Membership Application
            </h1>
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
                                 onBlur={(e) => {
                                    // check if they entered a first name
                                    this.setState({
                                       firstNameError: validateFirstName(
                                          e.target.value
                                       ),
                                    });
                                 }}
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
                                 onBlur={(e) => {
                                    // check if they entered a last name
                                    this.setState({
                                       lastNameError: validateLastName(
                                          e.target.value
                                       ),
                                    });
                                 }}
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
                                 onBlur={(e) => {
                                    // check email
                                    this.setState({
                                       emailError: validateEmail(
                                          e.target.value
                                       ),
                                    });
                                 }}
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
                                 onBlur={(e) => {
                                    // check phone number
                                    this.setState({
                                       phoneError: validatePhone(
                                          e.target.value
                                       ),
                                    });
                                 }}
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
                                 onBlur={() => {
                                    // check password inputs
                                    this.setState({
                                       passwordError: validatePassword(
                                          document.getElementById("password-1")
                                             .value,
                                          document.getElementById("password-2")
                                             .value
                                       ),
                                    });
                                 }}
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
                                 onBlur={() => {
                                    // check password inputs
                                    this.setState({
                                       passwordError: validatePassword(
                                          document.getElementById("password-1")
                                             .value,
                                          document.getElementById("password-2")
                                             .value
                                       ),
                                    });
                                 }}
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
                                 onBlur={(e) => {
                                    // check dob
                                    this.setState({
                                       dobError: validateDob(e.target.value),
                                    });
                                 }}
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
                        onChange={(e) => {
                           this.setState({
                              storyCharCount: e.target.value.length,
                           });
                           if (e.target.value.length > STORY_WORD_LIMIT) {
                              this.setState({
                                 storyError: " Please shorten your text.",
                              });
                           } else {
                              this.setState({
                                 storyError: "",
                              });
                           }
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
               <div className="row">
                  <div className="col-12 col-sm-6">
                     <span
                        type="submit"
                        className="btn btn-primary mt-4 btn-block"
                        onClick={() => {
                           this.submit();
                        }}
                     >
                        Submit
                     </span>
                  </div>

                  <div className="col col-12 col-sm-6 mt-sm-4">
                     <span className="text-danger">
                        {this.state.submitError}
                     </span>
                  </div>
               </div>
               <div className="row" style={{ height: "64px" }}></div>
            </form>
            {this.state.isShowingMembershipCard && this.renderMembershipCard()}
         </div>
      );
   }
}

export default withRouter(Form);
