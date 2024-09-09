
export const emailTemplate = (name, token, userID) => {
  const verifyLink = `http://localhost:3000/users/verify/${token}/${userID}`;
  return;
  `
        Hi ${name}!
        <br/><br/>
        Thank you for joining us! Please click the link below to confirm your Email and activate your account:
        <br/>
        <a href="${verifyLink}">${verifyLink}</a>
        <br/><br/>
        Yours truly,
        Imre
       `;
};
