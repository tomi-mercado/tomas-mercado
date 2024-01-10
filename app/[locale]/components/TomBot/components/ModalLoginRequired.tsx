import { useContent } from 'contexts/content';

import React from 'react';
import { FaGoogle as GoogleIcon } from 'react-icons/fa';

import Link from 'next/link';

const ModalLoginRequired: React.FC = () => {
  const {
    content: {
      common: { close },
      tombot: { almostReady, needLogin, loginWithGoogle },
    },
  } = useContent('Home');

  return (
    <dialog id="login-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{almostReady} 🤖</h3>
        <p className="py-4">{needLogin}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error">{close}</button>
          </form>
          <Link className="btn btn-primary" href="/api/auth/login">
            <GoogleIcon />
            {loginWithGoogle}
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default ModalLoginRequired;
