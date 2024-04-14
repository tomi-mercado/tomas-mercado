import { getAuth0User, getCredits } from 'services/auth';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';
import { Locale } from 'utils/locales';

import { getSession } from '@auth0/nextjs-auth0';

import TomBotClient from './Tombot.client';

const TombotServer = async ({ locale }: { locale: Locale }) => {
  const content = await readContent('content/home.json', locale, homeSchema);
  const session = await getSession();

  if (!session) {
    return <TomBotClient content={content} credits={undefined} />;
  }

  const user = await getAuth0User(session.user.sub);

  try {
    const credits = await getCredits(user);
    return <TomBotClient content={content} credits={credits} />;
  } catch (error) {
    console.error(error);
    return (
      <TomBotClient content={content} credits={undefined} errorLoadingCredits />
    );
  }
};

export default TombotServer;
