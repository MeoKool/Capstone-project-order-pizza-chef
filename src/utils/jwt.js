/**
 * Decodes a JWT token without using external libraries
 * @param {string} token - The JWT token to decode
 * @returns {object|null} The decoded token payload or null if invalid
 */
export function decodeJWT(token) {
  try {
    // JWT tokens are made up of three parts: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // The payload is the second part, base64 encoded
    const base64Payload = parts[1];
    // Replace characters for base64url to base64
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
    // Decode the base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
