'use client';

import { AiOutlineGlobal } from 'react-icons/ai';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UpdateLocaleButton: React.FC = () => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const restOfPath = pathname.split('/').slice(2).join('/');

  if (typeof locale !== 'string') {
    return null;
  }

  return (
    <Link
      href={locale === 'en' ? `/es/${restOfPath}` : `/en/${restOfPath}`}
      className="flex space-x-2 items-center"
    >
      <AiOutlineGlobal />

      <p className="text-sm md:text-base">{locale.toUpperCase()}</p>
    </Link>
  );
};

export default UpdateLocaleButton;
