module.exports = {
   validateFirstName(input) {
      if (input === "") {
         return "Please enter your first name.";
      } else {
         return "";
      }
   },

   validateLastName(input) {
      if (input === "") {
         return "Please enter your last name.";
      } else {
         return "";
      }
   },

   validateEmail(emailInput) {
      // eslint-disable-next-line
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailInput === "") {
         return "Please enter your email address.";
      } else if (!emailRegex.test(emailInput)) {
         return "Please enter a valid email address.";
      } else {
         return "";
      }
   },

   validatePhone(phoneInput) {
      const phoneRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/; // https://regexlib.com Laurence O'Donnell
      if (phoneInput === "") {
         return ""; // an empty phone # will be considered valid since this is optional
      } else if (!phoneRegex.test(phoneInput)) {
         return "Please enter valid 10-digit phone number.";
      } else {
         return "";
      }
   },
};
// module.exports =  validateHasText ;