export function areDatesWithinTwoSeconds(date1, date2) {
    // Convert date numbers to Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Get the difference in milliseconds between the two dates
    const diff = Math.abs(d1 - d2);
    
    // Check if the difference is less than or equal to 2000 milliseconds (2 seconds)
    return diff <= 1000;
}

export function getScale({ width, height }, maxSize) {
  const largestDimension = Math.max(width, height);
  const scale = maxSize / largestDimension;
  return scale;
}

export function getWindowHeight() {
  if (typeof window !== 'undefined') {
    console.log("Window height:", window.innerHeight);
    return window.innerHeight;
  }
  return 0; // Fallback for server-side rendering
}