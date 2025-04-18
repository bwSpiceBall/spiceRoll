import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

interface Image {
    name?: string
    documentId?: string
    formats?: {
        small?: {
            name?: string
            url?: string
        }
    }
}

export interface BlogPostProps {
    post: PostType
}

export interface PostType {
    id: string
    title: string
    slug?: string
    excerpt?: string
    description?: string
    last_modified_date?: string
    documentId: string
    image?: Image
    secondary_image?: Image
    content?: string | Node
}

// Helper function to safely get image URL
const getImageUrl = (image?: Image) => {
    if (!image || !image.formats || !image.formats.small || !image.formats.small.url) {
        return '/src/assets/react.svg' // Fallback image
    }
    return `${import.meta.env.VITE_CMS_URL}${image.formats.small.url}`
}

// Helper function to safely get image alt text
const getImageAlt = (image?: Image) => {
    if (!image || !image.formats || !image.formats.small || !image.formats.small.name) {
        return 'Blog image' // Fallback alt text
    }
    return image.formats.small.name
}

const Blog = () => {
    const { isPending, error, data } = useQuery({
        queryKey: [`${import.meta.env.VITE_CMS_URL}/api/posts`],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_CMS_URL}/api/posts`
            )
            return await response.json()
        },
    })

    if (isPending) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse text-primary text-xl">Loading...</div>
        </div>
    )

    if (error)
        return (
            <div className="bg-dark-200 text-primary p-6 rounded-lg border border-dark-400">
                An error has occurred: {error.message}
            </div>
        )

    // Check if data exists and has the expected structure
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-light border-b border-dark-400 pb-6 mb-8">Blog</h1>
                <p className="text-light-100">No blog posts found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-light border-b border-dark-400 pb-6 mb-8">Blog</h1>
            
            <div className="grid gap-8 md:grid-cols-2">
                {data.data.map((post: PostType) => (
                    <Link
                        key={post.id}
                        to={`/blog/${post.documentId}`}
                        className="group"
                    >
                        <div className="overflow-hidden rounded-lg bg-dark-200 border border-dark-400 transition-all duration-300 hover:border-primary">
                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                <img
                                    className="h-48 w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                                    src={getImageUrl(post.image)}
                                    alt={getImageAlt(post.image)}
                                />
                            </div>
                            <div className="p-5">
                                <h2 className="mb-3 text-xl font-semibold text-light group-hover:text-primary transition-colors">
                                    {post.title || 'Untitled Post'}
                                </h2>
                                <p className="text-light-100 line-clamp-3">
                                    {post.description || 'No description available.'}
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="w-16 h-16 overflow-hidden rounded-md">
                                        <img
                                            src={getImageUrl(post.secondary_image)}
                                            alt={getImageAlt(post.secondary_image)}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <span className="inline-flex items-center rounded-md bg-dark-300 px-3 py-1 text-sm text-light-100">
                                        Read more
                                        <svg 
                                            className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" 
                                            fill="none" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Blog
