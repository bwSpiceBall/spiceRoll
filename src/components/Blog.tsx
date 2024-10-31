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
            <h1 className="text-3xl font-bold text-center text-navy mb-5">
                Blog
            </h1>
            <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="overflow-hidden shadow-lg group rounded-lg relative"
                        >
                            <div className="flex justify-center items-center h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:-translate-y-full"
                                />
                                <h2 className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black bg-opacity-50">
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
