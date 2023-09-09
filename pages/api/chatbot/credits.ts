import { getAuth0User, patchAuth0User } from 'services/auth';

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const INITIAL_CREDITS = 5;

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req, res);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let user;
    try {
      user = await getAuth0User(session.user.sub);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Something went wrong obtaining user information' });
    }

    let credits = user.app_metadata?.credits;
    if (credits === undefined) {
      try {
        await patchAuth0User(session.user.sub, {
          app_metadata: {
            credits: INITIAL_CREDITS,
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: 'Something went wrong adding inital credits to the user',
        });
      }
      credits = INITIAL_CREDITS;
    }

    return res.status(200).json({ credits });
  },
);

export default handler;
