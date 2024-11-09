import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'

const BlogPost = () => {
    const { blogId } = useParams()
    const { isPending, error, data } = useQuery({
        queryKey: ['http://localhost:8080/api', { blogId }],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:8080/api/content/item/blog/${blogId}`
            )
            return await response.json()
        },
    })
    if (isPending) return 'loading'
    if (error) return 'An error has occurred: ' + error.message

    const clean = data && data ? DOMPurify.sanitize(data.content) : ''

    return (
        <div className="flex items-center overflow-auto bg-black bg-opacity-50">
            <div className="relative max-w-screen-lg rounded-lg bg-white p-8 shadow-lg">
                <div className="">
                    <h2 className="mb-2 text-2xl font-bold">{data.title}</h2>
                    <div className="">
                        <span
                            dangerouslySetInnerHTML={{
                                __html: clean,
                            }}
                        />
                    </div>
                    <p className="mb-4 text-sm text-gray-500">
                        Last modified: {data.last_modified_date}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogPost
