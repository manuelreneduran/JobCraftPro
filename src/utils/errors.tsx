export const serializeError = (error: String, useRawMessage: boolean) => {
  if (useRawMessage) {
    return error;
  }
  if (error.includes("auth/invalid-email")) {
    return "Invalid email address.";
  } else if (error.includes("auth/user-not-found")) {
    return "User not found.";
  } else if (error.includes("auth/wrong-password")) {
    return "Incorrect password.";
  } else if (error.includes("auth/weak-password")) {
    return "Password is too weak.";
  } else if (error.includes("auth/email-already-in-use")) {
    return "Email already in use.";
  } else if (error.includes("auth/too-many-requests")) {
    return "Too many requests. Try again later.";
  } else if (error.includes("auth/network-request-failed")) {
    return "Network error. Try again later.";
  } else if (error.includes("auth/operation-not-allowed")) {
    return "Operation not allowed.";
  } else if (error.includes("auth/invalid-action-code")) {
    return "Invalid action code.";
  } else if (error.includes("auth/invalid-credential")) {
    return "Invalid credential.";
  }

  return "An error occurred.";
};
