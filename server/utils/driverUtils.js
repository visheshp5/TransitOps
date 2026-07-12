/**
 * Helper function to check if a driver's license is expired.
 * @param {Date|String} expiryDate - The expiry date of the license.
 * @returns {Boolean} - Returns true if the license is expired (date is strictly before today), otherwise false.
 */
export const isLicenseExpired = (expiryDate) => {
  if (!expiryDate) return true;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison
  
  const expiration = new Date(expiryDate);
  
  return expiration < today;
};