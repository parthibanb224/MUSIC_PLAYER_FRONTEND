import React, { useState } from 'react';
import Modal from '../component/Modal';
import LoginForm from '../component/LoginForm'
import RegistrationForm from '../component/RegistrationForm'
import ForgotPasswordForm from '../component/ForgotPasswordForm'
import ResetPasswordForm from '../component/ResetPasswordForm'
import { useUser } from '../context/Users.context';

function FrontPage() {
    const { isLoginModalOpen, setLoginModalOpen, isRegistrationModalOpen, setRegistrationModalOpen } = useUser();
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
    return (
        <div className="h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white flex flex-col justify-center items-center">
            <header className="text-center">
                <h1 className="text-5xl font-extrabold leading-tight mb-4">Welcome to Music App</h1>
                <p className="text-lg mb-8">Discover and enjoy your favorite music.</p>
                <div className="space-x-4">
                    <button onClick={(e) => {
                        e.preventDefault();
                        setLoginModalOpen(true);
                    }} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-lg">Get Started</button>
                </div>
            </header>

            <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
                <LoginForm
                    onRegisterClick={() => {
                        setLoginModalOpen(false);
                        setRegistrationModalOpen(true);
                    }}
                    onForgotPasswordClick={() => {
                        setLoginModalOpen(false);
                        setForgotPasswordModalOpen(true);
                    }}
                />
            </Modal>
            <Modal isOpen={isRegistrationModalOpen} onClose={() => setRegistrationModalOpen(false)}>
                <RegistrationForm />
            </Modal>
            <Modal isOpen={isForgotPasswordModalOpen} onClose={() => setForgotPasswordModalOpen(false)}>
                <ForgotPasswordForm
                    onResetPasswordClick={() => {
                        setForgotPasswordModalOpen(false);
                        setResetPasswordModalOpen(true);
                    }}
                />
            </Modal>
            <Modal isOpen={isResetPasswordModalOpen} onClose={() => setResetPasswordModalOpen(false)}>
                <ResetPasswordForm />
            </Modal>

        </div>
    );
}

export default FrontPage;
