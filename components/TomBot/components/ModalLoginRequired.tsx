import React from 'react';
import { FaGoogle as GoogleIcon } from 'react-icons/fa';

const ModalLoginRequired: React.FC = () => {
  return (
    <dialog id="login-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          You are almost ready to ask TomBot 🤖
        </h3>
        <p className="py-4">You need to be logged in to ask.</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error">Close</button>
          </form>
          <a className="btn btn-primary" href="/api/auth/login">
            <GoogleIcon />
            Login with Google
          </a>
        </div>
      </div>
    </dialog>
  );
};

export default ModalLoginRequired;
