import { useContent } from 'contexts/content';

import React from 'react';
import { MdEmail as EmailIcon } from 'react-icons/md';

const ModalNoCredits: React.FC = () => {
  const {
    content: {
      contact: { email },
      common: { close },
      tombot: { noQuestionsLeft, noQuestionLeftDescription, emailMe },
    },
  } = useContent();

  return (
    <dialog id="no-credits-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{noQuestionsLeft} 😪</h3>
        <p className="py-4">{noQuestionLeftDescription}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error">{close}</button>
          </form>
          <a className="btn btn-primary" href={`mailto:${email}`}>
            <EmailIcon />
            {emailMe}
          </a>
        </div>
      </div>
    </dialog>
  );
};

export default ModalNoCredits;
