import LinkMantainLocale from 'components/LinkMantainLocale';

import Image from 'next/image';

export default async function NotFound() {
  // TODO
  return (
    <div className="container py-6 flex flex-col gap-4 h-full flex-1">
      <div className="w-full h-full flex flex-col gap-6 items-center flex-1 justify-center">
        <p className="text-3xl text-center">
          We could not find the page you were looking for.
        </p>
        <Image
          src="/images/notfound.webp"
          alt="Empty"
          width={350}
          height={350}
          className="rounded-full mix-blend-hard-light"
        />
        <LinkMantainLocale href="/" className="underline">
          Go back to the home page
        </LinkMantainLocale>
      </div>
    </div>
  );
}
