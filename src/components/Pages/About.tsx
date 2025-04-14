const About = () => {
    return (
        <div className="space-y-8">
            <div className="border-b border-dark-400 pb-6">
                <h1 className="text-3xl font-bold text-light mb-6">About Me</h1>
                <div className="space-y-4">
                    <p className="text-light-100">
                        I&apos;m a software engineer with expertise in building modern, responsive web applications. 
                        With over 8 years of experience in the field, I&aposve worked on a variety of projects 
                        ranging from small business websites to complex enterprise applications.
                    </p>
                    <p className="text-light-100">
                        My approach to development focuses on creating clean, maintainable code that delivers 
                        exceptional user experiences. I believe in the power of thorough testing, continuous 
                        integration, and well-documented code to create software that stands the test of time.
                    </p>
                </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-dark-200 rounded-lg p-6 border border-dark-400">
                    <h2 className="text-2xl font-bold text-primary mb-4">Skills</h2>
                    <ul className="space-y-2 text-light-100">
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            Frontend: React, Vue, TypeScript, TailwindCSS
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            Backend: Node.js, Express, Django, Laravel
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            Database: PostgreSQL, MongoDB, Redis
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            DevOps: Docker, AWS, CI/CD, Kubernetes
                        </li>
                    </ul>
                </div>
                
                <div className="bg-dark-200 rounded-lg p-6 border border-dark-400">
                    <h2 className="text-2xl font-bold text-primary mb-4">Experience</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-light">Senior Software Engineer</h3>
                            <p className="text-primary">Tech Innovations Inc.</p>
                            <p className="text-sm text-light-100">2020 - Present</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-light">Software Developer</h3>
                            <p className="text-primary">Digital Solutions LLC</p>
                            <p className="text-sm text-light-100">2017 - 2020</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-dark-200 rounded-lg p-6 border border-dark-400">
                <h2 className="text-2xl font-bold text-primary mb-4">Projects</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-dark-300 p-4 rounded-md">
                        <h3 className="font-semibold text-light">E-commerce Platform</h3>
                        <p className="text-sm text-light-100">Full-stack React/Node.js application with integrated payment processing</p>
                    </div>
                    <div className="bg-dark-300 p-4 rounded-md">
                        <h3 className="font-semibold text-light">Health Analytics Dashboard</h3>
                        <p className="text-sm text-light-100">Data visualization platform using D3.js with real-time updates</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
