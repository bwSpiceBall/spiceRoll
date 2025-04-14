import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'

const BlogPost = () => {
    const { documentId } = useParams()
    const { isPending, data: response } = useQuery({
        queryKey: [`${import.meta.env.VITE_CMS_URL}/api/posts`, { documentId }],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_CMS_URL}/api/posts/?filters[documentId][$eq]=${documentId}`
            )
            return await response.json()
        },
    })
    if (isPending) return 'loading'
     
    const { data, error } = response

    if (error) return 'An error has occurred: ' + error.message

    const blogPost = data && {
        content: data ? DOMPurify.sanitize(data[0].content) : '',
        last_modified_date: data[0].last_modified_date,
        title: data[0].title,
    }

    return (
        <div className="flex w-full flex-col items-center px-4 py-6 md:px-0">
            <div className="relative w-full max-w-screen-lg rounded-lg bg-white p-4 shadow-md md:p-8">
                <div className="blog-content">
                    <h2 className="mb-6 text-center text-xl font-bold text-navy md:text-2xl">{blogPost.title}</h2>
                    <div 
                        className="prose max-w-none break-words md:prose-lg"
                        dangerouslySetInnerHTML={{
                            __html: blogPost.content,
                        }}
                    />
                    <p className="mt-8 text-xs text-gray-500 md:text-sm">
                        Last modified: {blogPost.last_modified_date}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogPost
