const response_codes = {
  ZER0: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
};
const response_messages = {
  ZER0: "Success",
  ONE: "Provide all fields",
  TWO: "Populate all fields",
  THREE: "User already exists",
  FOUR: "Incorrect credentials",
};

module.exports = { response_codes, response_messages };
