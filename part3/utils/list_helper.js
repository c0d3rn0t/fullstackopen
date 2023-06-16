const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curVal) => {
    if (acc.length === 0) {
      return 0;
    } else if (acc.length === 1) {
      return acc + curVal.likes;
    } else {
      return acc + curVal.likes;
    }
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likes);
  const blog = blogs.find((blog) => blog.likes === mostLikes);
  return blog;
};

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = blogs.reduce((acc, curVal) => {
    if (curVal.numOfBlogs > acc.numOfBlogs) {
      return curVal;
    }
    return acc;
  });
  const { author, numOfBlogs } = authorWithMostBlogs;
  return { author, numOfBlogs };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
