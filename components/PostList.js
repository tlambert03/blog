import Link from 'next/link';

import ArrowIcon from './ArrowIcon';

export default function PostList(props) {
  return (
    <ul className="w-full">
      {props.posts.map((post) => (
        <li
          key={post.filePath}
          className="border border-b-0 border-gray-800 border-opacity-10 
          bg-white bg-opacity-10 backdrop-blur-lg transition last:border-b 
          hover:border-b hover:bg-opacity-20 hovered-sibling:border-t-0 
          dark:border-white dark:border-opacity-10 dark:bg-black dark:bg-opacity-30
          dark:hover:bg-opacity-50 md:first:rounded-t-lg md:last:rounded-b-lg"
        >
          <Link
            as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
            href={`/posts/[slug]`}
          >
            <a className="block py-6 px-6 focus:outline-none focus:ring-4 lg:py-10 lg:px-16">
              {post.data.date && (
                <p className="mb-3 font-bold uppercase opacity-60">{post.data.date}</p>
              )}
              <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
              {post.data.description && (
                <p className="mt-3 text-lg opacity-60">{post.data.description}</p>
              )}
              <ArrowIcon className="mt-4" />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
