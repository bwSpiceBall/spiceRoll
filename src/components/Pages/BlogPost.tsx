const provisionalBlogPost = [
    {
        title: 'Understanding React Hooks',
        slug: 'understanding-react-hooks',
        image_path: '/images/react-hooks.png',
        excerpt:
            'A comprehensive guide to understanding and using React Hooks in your applications.',
        last_modified_date: '2023-10-01',
    },
]

const BlogPost = () => {
    return (
        <div>
            {provisionalBlogPost.map((post) => (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image_path} alt={post.title} />
                    <p>{post.excerpt}</p>
                    <p>Last modified: {post.last_modified_date}</p>
                </>
            ))}
        </div>
    )
}

export default BlogPost
