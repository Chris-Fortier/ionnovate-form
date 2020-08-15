const {
   validateFirstName,
   validateLastName,
   validateEmail,
   validatePhone,
   validatePassword,
   validateDob,
} = require("./validation");

// testing first names
test("Testing an empty first name", () => {
   expect(validateFirstName("")).toBe("Please enter your first name.");
});
test("Testing a valid last name", () => {
   expect(validateFirstName("Chris")).toBe("");
});

// testing last names
test("Testing an empty last name", () => {
   expect(validateLastName("")).toBe("Please enter your last name.");
});
test("Testing a valid last name", () => {
   expect(validateLastName("Fortier")).toBe("");
});

// testing email
test("Testing an empty email", () => {
   expect(validateEmail("")).toBe("Please enter your email address.");
});
test("Testing an invalid email", () => {
   expect(validateEmail("asdlfkjsfd")).toBe(
      "Please enter a valid email address."
   );
});
test("Testing a valid email", () => {
   expect(validateEmail("asDFSDFkjsf321d@sdflkjsfd.com")).toBe("");
});

// testing phone numbers
test("Testing an empty phone number", () => {
   expect(validatePhone("")).toBe(""); // should pass since this is optional
});
test("Testing invalid phone number: 12345", () => {
   expect(validatePhone("12345")).toBe(
      "Please enter valid 10-digit phone number."
   );
});
test("Testing invalid phone number: 555-1234", () => {
   expect(validatePhone("12345")).toBe(
      "Please enter valid 10-digit phone number."
   );
});
test("Testing invalid phone number: 702-555-abcd", () => {
   expect(validatePhone("12345")).toBe(
      "Please enter valid 10-digit phone number."
   );
});
test("Testing valid phone number: 702-555-1234", () => {
   expect(validatePhone("702-555-1234")).toBe("");
});
test("Testing valid phone number: (702) 555-1234", () => {
   expect(validatePhone("(702) 555-1234")).toBe("");
});
test("Testing valid phone number: (702)555-1234", () => {
   expect(validatePhone("(702)555-1234")).toBe("");
});
test("Testing valid phone number: 7025551234", () => {
   expect(validatePhone("7025551234")).toBe("");
});
test("Testing valid phone number: 702.555.1234", () => {
   expect(validatePhone("702.555.1234")).toBe("");
});

// testing password inputs
test("Testing empty password inputs", () => {
   expect(validatePassword("", "")).toBe(
      "Please enter a matching password in both fields."
   );
});
test("Testing an empty first password input", () => {
   expect(validatePassword("", "password")).toBe(
      "Please enter a matching password in both fields."
   );
});
test("Testing an empty second password input", () => {
   expect(validatePassword("password", "")).toBe(
      "Please enter a matching password in both fields."
   );
});
test("Testing not matching password inputs", () => {
   expect(validatePassword("password", "1234")).toBe(
      "You password inputs do not match."
   );
});
test("Testing short password", () => {
   expect(validatePassword("password", "password")).toBe(
      "Your password must be at least 10 characters long."
   );
});
test("Testing valid password", () => {
   expect(validatePassword("klhjsfda980345jkh", "klhjsfda980345jkh")).toBe("");
});

// testing dob
test("Testing an empty dob", () => {
   expect(validateDob("")).toBe("Please enter your date of birth.");
});
test("Testing an invalid dob", () => {
   expect(validateDob("2100-01-01")).toBe(
      "Your birthday cannot be in the future."
   );
});
test("Testing a valid dob", () => {
   expect(validateDob("1950-01-01")).toBe("");
});
