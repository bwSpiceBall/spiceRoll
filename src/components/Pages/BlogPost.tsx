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
    
    if (isPending) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse text-primary text-xl">Loading...</div>
        </div>
    )
     
    const { data, error } = response

    if (error) return (
        <div className="bg-dark-200 text-primary p-6 rounded-lg border border-dark-400">
            An error has occurred: {error.message}
        </div>
    )

    const blogPost = data && {
        content: data ? DOMPurify.sanitize(data[0].content) : '',
        last_modified_date: data[0].last_modified_date,
        title: data[0].title,
    }

    return (
        <div className="flex w-full flex-col items-center px-4 py-6 md:px-0">
            <div className="relative w-full max-w-screen-lg rounded-lg bg-dark-200 p-4 shadow-md border border-dark-400 md:p-8">
                <div className="blog-content">
                    <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">{blogPost.title}</h2>
                    
                    <div className="mb-8 h-1 w-24 bg-primary mx-auto"></div>
                    
                    <div 
                        className="prose prose-invert max-w-none break-words md:prose-lg"
                        dangerouslySetInnerHTML={{
                            __html: blogPost.content,
                        }}
                    />
                    
                    <div className="mt-12 pt-8 border-t border-dark-400">
                        <p className="text-xs text-light-100 md:text-sm">
                            Last modified: {blogPost.last_modified_date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPost
