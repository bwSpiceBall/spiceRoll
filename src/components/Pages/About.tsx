const About = () => {
    return (
        <div className="space-y-8">
            <div className="border-b border-dark-400 pb-6">
                <h1 className="text-3xl font-bold text-light mb-6">About Me</h1>
                <div className="space-y-4">
                    <p className="text-light-100">
                        Hi, I&apos;m Tom Szpak, a software engineer based in the Bristol area. 
                        I specialize in building modern, scalable web applications and have a strong 
                        background in both frontend and backend development.
                    </p>
                    <p className="text-light-100">
                        With a proactive approach to communication and a passion for clean, maintainable code, 
                        I strive to deliver high-quality software solutions. I&aposm always eager to learn and 
                        contribute to projects that make a meaningful impact.
                    </p>
                </div>
            </div>

            <div className="border-t border-dark-400 my-6"></div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-dark-200 rounded-lg p-6 border border-dark-400">
                    <h2 className="text-2xl font-bold text-primary mb-4">Skills</h2>
                    <ul className="space-y-2 text-light-100">
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            JavaScript/TypeScript, Node.js, React, Git, Express.js
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            PostgreSQL, Docker, GitHub Actions
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-primary">▹</span>
                            Proactive communication, Agile methodologies
                        </li>
                    </ul>
                </div>

                <div className="bg-dark-200 rounded-lg p-6 border border-dark-400">
                    <h2 className="text-2xl font-bold text-primary mb-4">Experience</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-light">Software Engineer</h3>
                            <p className="text-primary">Brandwatch Ltd, Brighton/Remote</p>
                            <p className="text-sm text-light-100">Jan 2021 - Present</p>
                            <p className="text-light-100 text-sm">
                                Developed and maintained features for internal admin apps and Node.js microservices. 
                                Migrated REST APIs, optimized performance, and contributed to scalability planning.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-light">Technical Support Engineer</h3>
                            <p className="text-primary">Brandwatch Ltd, Brighton/Remote</p>
                            <p className="text-sm text-light-100">April 2018 - Jan 2021</p>
                            <p className="text-light-100 text-sm">
                                Provided second-line support, resolved technical issues, and contributed to the 
                                development of an internal admin platform.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-light">Data Analyst</h3>
                            <p className="text-primary">Leidos Europe, Bristol</p>
                            <p className="text-sm text-light-100">Oct 2017 - Jan 2018</p>
                            <p className="text-light-100 text-sm">
                                Analyzed data for secure delivery systems, leveraging analytical skills and BPSS clearance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-dark-400 my-6"></div>

            <div className="bg-dark-200 rounded-lg p-6 border border-dark-400">
                <h2 className="text-2xl font-bold text-primary mb-4">Education</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-light">Cardiff Metropolitan University</h3>
                        <p className="text-primary">BSc Computing, Computer and Data Science</p>
                        <p className="text-sm text-light-100">2015 - 2017</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-light">Fontys University of Applied Sciences</h3>
                        <p className="text-primary">Erasmus - ML/Big Data Analysis</p>
                        <p className="text-sm text-light-100">2016 - 2017</p>
                        <p className="text-light-100 text-sm">
                            Focused on Machine Learning, Data Visualization (D3.js, Tableau), and data processing 
                            using Python, Pandas, and NumPy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
