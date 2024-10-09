
import crypto from 'crypto';


// getUUID is a function that returns a UUID

export const getUUID = () => {
  return crypto.randomUUID();
}