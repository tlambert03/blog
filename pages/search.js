import { useState } from 'react';
import Fuse from 'fuse.js';
import { getPosts } from '../utils/mdx-utils';

var highlighter = function (resultItem) {
  resultItem.matches.forEach((matchItem) => {
    var text = resultItem.item[matchItem.key];
    var result = [];
    var matches = [].concat(matchItem.indices);
    var pair = matches.shift();

    for (var i = 0; i < text.length; i++) {
      var char = text.charAt(i);
      if (pair && i == pair[0]) {
        result.push('<b>');
      }
      result.push(char);
      if (pair && i == pair[1]) {
        result.push('</b>');
        pair = matches.shift();
      }
    }
    resultItem.highlight = result.join('');

    if (resultItem.children && resultItem.children.length > 0) {
      resultItem.children.forEach((child) => {
        highlighter(child);
      });
    }
  });
};

export default function Page({ books }) {
  const [results, setResults] = useState();

  const options = {
    shouldSort: true,
    includeMatches: true,
    threshold: 4,
    tokenize: true,
    location: 0,
    // distance: 100,
    maxPatternLength: 64,
    minMatchCharLength: 2,
    includeScore: true,
    findAllMatches: true,
    keys: [
      { name: 'title', weight: 0.8 },
      { name: 'description', weight: 0.7 },
      { name: 'contents', weight: 0.5 },
    ],
  };
  const fuse = new Fuse(books, options);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const results = fuse.search(e.currentTarget.value);
          results.forEach((resultItem) => {
            return highlighter(resultItem);
          });
          setResults(results);
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const books = posts.map((post) => {
    return { ...post.data, content: post.content };
  });
  return { props: { books } };
}
