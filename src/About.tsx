// src/pages/About.tsx
import React from 'react'

const About: React.FC = () => {
    return (
        <div className="p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">About Me</h2>
            <p className="text-lg leading-relaxed">
                Hello! I'm a Software Engineer with a strong focus on backend
                development and internal applications. I have experience in
                designing scalable, maintainable solutions and a deep
                understanding of Agile methodologies.
                <br />
                <br />
                My work involves enhancing features, addressing technical debt,
                and improving code quality to meet the evolving needs of
                businesses. Collaboration with cross-functional teams, attention
                to detail, and a passion for reliable software drive my
                commitment to delivering impactful results.
                <br />
                <br />
                In my free time, I enjoy exploring new technologies, mentoring
                others, and contributing to open-source projects.
            </p>
        </div>
    )
}

export default About
