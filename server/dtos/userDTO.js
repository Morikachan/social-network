class UserDTO {
  id;
  email;
  login;
  isVerified;

  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.login = user.login;
    this.isVerified = user.isVerified;
  }
}

module.exports = UserDTO;
