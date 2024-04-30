const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    OTP: {
      type: Number,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.salt = randomBytes(32).toString("hex");
    this.password = createHmac("sha256", this.salt)
      .update(this.password)
      .digest("hex");
  }
  next();
});

userSchema.methods.verifyPassword = function (password) {
  return (
    this.password ===
    createHmac("sha256", this.salt).update(password).digest("hex")
  );
};

userSchema.methods.createJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema);
