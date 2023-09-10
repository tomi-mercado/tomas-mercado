import { getCredits, getUser } from 'services/auth';

import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let user;
    try {
      user = await getUser(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Something went wrong obtaining user information' });
    }

    let credits;
    try {
      credits = await getCredits(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Something went wrong adding inital credits to the user',
      });
    }

    return res.status(200).json({ credits });
  },
);

export default handler;
