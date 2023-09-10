import { useContent } from 'contexts/content';

import React from 'react';
import { MdEmail as EmailIcon } from 'react-icons/md';

import Link from 'next/link';

const ModalNoCredits: React.FC = () => {
  const {
    content: {
      contact: { email },
      common: { close },
      tombot: { noQuestionsLeft, noQuestionLeftDescription, emailMe },
    },
  } = useContent('Home');

  return (
    <dialog id="no-credits-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{noQuestionsLeft} 😪</h3>
        <p className="py-4">{noQuestionLeftDescription}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error">{close}</button>
          </form>
          <Link className="btn btn-primary" href={`mailto:${email}`}>
            <EmailIcon />
            {emailMe}
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default ModalNoCredits;
