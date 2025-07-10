import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogList;