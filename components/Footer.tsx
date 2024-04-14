import { readCommonContent } from 'services/content';
import { Locale } from 'utils/locales';

import { FaGithub } from 'react-icons/fa';

import Link from 'next/link';

const Footer = async ({ locale }: { locale: Locale }) => {
  const {
    contact: { github },
    footer: { byMe, madeWith, seeSourceCode },
  } = await readCommonContent(locale);

  return (
    <footer className="w-full flex justify-center items-center py-6 bg-base-200">
      <div className="max-w-6xl px-6 flex flex-col gap-4 items-center text-center w-full">
        <p className="text-sm">
          {madeWith} 🤎 {byMe}
        </p>
        <Link
          href={`${github}/tomas-mercado`}
          className="text-xs flex gap-2 items-center"
          target={'_blank'}
        >
          <FaGithub />
          {seeSourceCode}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
