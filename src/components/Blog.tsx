import helmetLogo from '../assets/helmetjs.png'
import debian from '../assets/debian.png'
import cicd from '../assets/cicd.png'

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Add helmet?',
            image: helmetLogo,
            description: 'This is the description for the first blog post.',
        },
        {
            id: 2,
            title: 'Bookworm-slim',
            image: debian,
            description: 'Why migrate to bookworm slim.',
        },
        {
            id: 3,
            title: 'CI/CD infra as code',
            image: cicd,
            description: 'Maintaining legacy systems.',
        },
    ]

    return (
        <div className="p-20">
            <h1 className="mb-5 text-center text-3xl font-bold text-navy">
                Blog
            </h1>
            <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative overflow-hidden rounded-lg shadow-lg"
                        >
                            <div className="flex h-48 items-center justify-center overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="group-h h-full w-full transform object-cover duration-300 group-hover:-translate-y-full"
                                />
                                <h2 className="absolute flex items-center justify-center bg-black bg-opacity-50 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    {post.title}
                                </h2>
                            </div>
                            <div className="p-4">
                                <p>{post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blog
