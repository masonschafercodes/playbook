export const getUserIDFromToken = (token: string) => {
  const [prefWithID, _hmac] = token.split('.');

  const [_prefix, userID] = prefWithID.split('_');

  // userID from base64
  const id = Buffer.from(userID, 'base64url').toString('utf-8');

  return id;
};
