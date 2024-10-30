import LinkMantainLocale from 'components/LinkMantainLocale';
import { getAuth0User } from 'services/auth';
import { readCommonContent } from 'services/content';
import { Locale } from 'utils/locales';

import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

import { MdLogout } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import UpdateLocaleButton from './UpdateLocaleButton';

const Navbar = async ({ locale }: { locale: Locale }) => {
  const {
    userMenu: { welcome },
  } = await readCommonContent(locale);
  const session = await getSession();
  const user = session ? await getAuth0User(session.user.sub) : undefined;

  return (
    <header className="w-full flex justify-center fixed z-20 py-6 bg-muted border-b-2">
      <div className="container flex justify-between">
        <LinkMantainLocale href="/" className="flex gap-2 items-center">
          <Image
            src="/images/logo.png"
            alt="Tomas Mercado Logo"
            width={36}
            height={36}
            className="w-auto"
          />
          <h1 className="md:text-xl">Tomás Mercado</h1>
        </LinkMantainLocale>

        <div className="flex gap-4 items-center">
          <UpdateLocaleButton />
          {!!user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user.picture || ''}
                  alt={user.name || 'Profile Image'}
                  width={40}
                  height={40}
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href="/api/auth/logout"
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <MdLogout />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
