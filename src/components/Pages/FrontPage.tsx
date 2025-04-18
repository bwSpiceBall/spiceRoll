const FrontPage = () => {
    return (
        <main className="flex flex-1 flex-col items-center">
            <div className="my-12 max-w-2xl px-4 text-center">
                <h1 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
                    <span className="text-light">Start building </span>
                    <span className="text-primary">websites</span>
                    <span className="text-light"> people remember.</span>
                </h1>
                
                <div className="mb-10 h-1 w-16 bg-primary mx-auto"></div>
                
                <p className="max-w-2xl text-center text-lg text-light-100 leading-relaxed">
                    Hi, I&apos;m a Software Engineer focusing on full stack development with a passion for
                    excellent user experiences. I specialize in building scalable, maintainable
                    applications with a strong emphasis on code quality and scalability.
                    <br /><br />
                    My approach centers on thoroughly tested code, smart architecture decisions,
                    and clean design that aligns with your business goals.
                </p>
                
                <div className="mt-10 flex justify-center space-x-4">
                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary">Learn More</button>
                </div>
                
                <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-dark-200 p-6 shadow-md border border-dark-400">
                        <h3 className="mb-3 text-xl font-semibold text-light">Modern Design</h3>
                        <p className="text-light-100">Clean, responsive interfaces built with the latest web technologies</p>
                    </div>
                    
                    <div className="rounded-lg bg-dark-200 p-6 shadow-md border border-dark-400">
                        <h3 className="mb-3 text-xl font-semibold text-light">Performance</h3>
                        <p className="text-light-100">Lightning fast load times and smooth interactions for the best user experience</p>
                    </div>
                    
                    <div className="rounded-lg bg-dark-200 p-6 shadow-md border border-dark-400">
                        <h3 className="mb-3 text-xl font-semibold text-light">Reliability</h3>
                        <p className="text-light-100">Thoroughly tested code and robust architecture for dependable applications</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FrontPage
