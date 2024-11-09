import helmetLogo from '../../assets/helmetjs.png'
import debian from '../../assets/debian.png'
import cicd from '../../assets/cicd.png'
import { useState } from 'react'

const Blog = () => {
    const [clickedPost, updateClickedPost] = useState<number | null>(null)
    const blogPosts = [
        {
            id: 1,
            title: 'Add helmet?',
            image: helmetLogo,
            secondaryImage: debian,
            description: 'This is the description for the first blog post.',
        },
        {
            id: 2,
            title: 'Bookworm-slim',
            image: debian,
            secondaryImage: debian,
            description: 'Why migrate to bookworm slim.',
        },
        {
            id: 3,
            title: 'CI/CD infra as code',
            image: cicd,
            secondaryImage: debian,
            description: 'Maintaining legacy systems.',
        },
    ]

    const handlePostClick = (id: number) => {
        updateClickedPost(id)
        setTimeout(() => updateClickedPost(null), 1000)
    }

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
                            className={`group relative overflow-hidden rounded-lg shadow-lg ${clickedPost === post.id ? 'scale-105 blur-md' : ''}`}
                            onClick={() => handlePostClick(post.id)}
                        >
                            <div className="flex h-48 items-center justify-center overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="group-h z-10 h-full w-full transform object-cover duration-300 group-hover:-translate-y-full"
                                />
                                <img
                                    src={post.secondaryImage}
                                    alt={post.title}
                                    className="group-h absolute left-0 top-0 z-0 h-full w-full scale-90 transform object-cover opacity-0 transition-opacity duration-1000 backdrop:filter group-hover:scale-100 group-hover:opacity-100"
                                />
                                <h2 className="text-1 absolute flex transform items-center justify-center bg-opacity-50 text-center text-neutral-900 opacity-0 transition-transform duration-300 group-hover:scale-125 group-hover:text-5xl group-hover:opacity-100">
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
