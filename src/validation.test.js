const {
   validateFirstName,
   validateLastName,
   validateEmail,
   validatePhone,
} = require("./validation");

// testing names
test("Testing an empty first name", () => {
   expect(validateFirstName("")).toBe("Please enter your first name.");
});
test("Testing a valid last name", () => {
   expect(validateFirstName("Chris")).toBe("");
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
