import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'

const BlogPost = () => {
    const { documentId } = useParams()
    const { isPending, data: response } = useQuery({
        queryKey: ['http://localhost:1337/api/posts', { documentId }],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:1337/api/posts/?filters[documentId][$eq]=${documentId}`
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
        <div className="flex items-center">
            <div className="relative max-w-screen-lg rounded-lg bg-white p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{blogPost.title}</h2>
                    <br />
                    <span
                        dangerouslySetInnerHTML={{
                            __html: blogPost.content,
                        }}
                    />
                    <p className="mb-4 text-sm text-gray-500">
                        Last modified: {blogPost.last_modified_date}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogPost
