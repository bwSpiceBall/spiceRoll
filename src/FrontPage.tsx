import React from 'react';

import './index.css';

const FrontPage: React.FC = () => {
    return (
        <div className="flex flex-1">
            <main className="flex-1 p-8 flex flex-col justify-center items-center">
                <p className="max-w-2xl text-lg text-center leading-relaxed">
                    Hi, I'm a Software Engineer specializing in backend development and feature enhancement for internal applications. With a focus on code quality and scalability, I help build and maintain robust solutions in an Agile environment. I’m dedicated to creating well-documented, thoroughly tested code and actively collaborate with cross-functional teams to deliver reliable and impactful software that supports evolving business needs.
                </p>
            </main>
        </div>
    );
  };

export default FrontPage;
