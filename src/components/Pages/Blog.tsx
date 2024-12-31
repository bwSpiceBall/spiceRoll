import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

interface Image {
    name: string
    documentId: string
    formats: {
        small: {
            name: string
            url: string
        }
    }
}

export interface BlogPostProps {
    post: PostType
}

export interface PostType {
    title: string
    slug: string
    excerpt: string
    description: string
    last_modified_date: string
    documentId: string
    image: Image
    secondary_image: Image
    content: string | Node
}

const Blog = () => {
    const { data: response, isPending } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_CMS_URL}/api/posts/?populate=image&populate=secondary_image&fields=title,description`,
                {
                    headers: {
                        Authorization: `Bearer: ${import.meta.env.VITE_CMS_TOKEN}`,
                      
                    }
                }
            )
            return await response.json()
        },
    })

    if (isPending) return 'loading'

    const { data, error } = response
    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            <div className="p-20">
                <h1 className="mb-5 text-center text-3xl font-bold text-navy">
                    Blog
                </h1>
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {data &&
                            data.map((post: PostType) => (
                                <NavLink
                                    key={post.documentId}
                                    to={post.documentId}
                                >
                                    <div
                                        key={post.documentId}
                                        className={`shadow-lg} group relative overflow-hidden rounded-lg`}
                                    >
                                        <div className="flex h-48 items-center justify-center overflow-hidden">
                                            <img
                                                src={`${import.meta.env.VITE_CMS_URL}${post.image.formats.small.url}`}
                                                alt={
                                                    post.image.formats.small
                                                        .name
                                                }
                                                className="group-h z-10 h-full w-full transform object-cover duration-300 group-hover:-translate-y-full"
                                            />
                                            <img
                                                src={`${import.meta.env.VITE_CMS_URL}${post.secondary_image.formats.small.url}`}
                                                alt={
                                                    post.secondary_image
                                                        .formats.small.name
                                                }
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
                                </NavLink>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
