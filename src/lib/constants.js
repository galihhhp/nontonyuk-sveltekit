export const getUrl = (type = '', page = 1) => {
  return `https://api.themoviedb.org/3/movie/${type}?api_key=b092fbfe96fe122af99d753ce8372286&page=${page}`;
};
