import jwt from 'jsonwebtoken';
import UserAuth from '../../models/userAuth.model.js';


// Constant for cookies names and for cookies expired time
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const MAX_AGE = 24 * 60 * 60 * 1000;


const handleRefreshTokenController = async (request, response) => {

  // get request cookies from the browser
  const cookies = request.cookies;

  if (!cookies?.jwt) return response.sendStatus(401);

  // Create the refresh token from the cookies
  const refreshToken = cookies.jwt;

  // Delete the cookie
  // response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  // Find user using refresh token
  const foundUser = await User.findOne({ refresh_token: refreshToken }).exec();

  // if there are any user detected refresh token reuse
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) return response.sendStatus(403); // Forbidden

        const hackedUser = await UserAuth.findOne({ _id: decoded._id }).exec();

        // Note: why set user refreshToken array to empty
        // hackedUser.refreshToken = [];

        const result = await hackedUser.save();
      });
    return response.sendStatus(403); // Forbidden
  }


  const newRefreshTokenArray = foundUser.refresh_token.filter(rt => rt !== refreshToken);
  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      if (error) {
        foundUser.refresh_token = [...newRefreshTokenArray];
        await foundUser.save();
      }

      if (error || foundUser._id.toJSON() !== decoded._id) {
        return response.sendStatus(403); // Forbbiden
      }

      // Refresh token was still valid
      const accessToken = jwt.sign({ '_id': decoded._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );


      const newRefreshToken = jwt.sign({ '_id': foundUser._id.toJSON() },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '1w' });

      //saving refreshToken with current user
      foundUser.refresh_token = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh token
      response.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: MAX_AGE });

      response.json({ _id: foundUser._id.toJSON(), accessToken: accessToken });
    }
  ).catch(error => {
    console.error('[refreshTokenController] error:', error);
    return response.sendStatus(403); // Forbbiden
  });
}


export default { handleRefreshTokenController };