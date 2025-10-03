import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [30, "Username cannot be more than 30 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
      select: false, // Hides the password from query results by default
    },
    // NEW: User role for permissions
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // NEW: Profile picture URL
    profilePicture: {
      type: String,
      default: "", // Can be a default image URL
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

// Middleware to hash password before saving a new user
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Instance method to check if the provided password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
