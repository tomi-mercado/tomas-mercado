import React from 'react';
import { MdEmail as EmailIcon } from 'react-icons/md';

const ModalNoCredits: React.FC = () => {
  return (
    <dialog id="no-credits-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          You have no questions left to ask to TomBot 😪
        </h3>
        <p className="py-4">
          If you want to ask more questions, you can send me a message on my
          email
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error">Close</button>
          </form>
          <a className="btn btn-primary" href="mailto:tmercadoslp@gmail.com">
            <EmailIcon />
            Email me
          </a>
        </div>
      </div>
    </dialog>
  );
};

export default ModalNoCredits;
