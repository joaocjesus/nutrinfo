module.exports = {
  linters: {
    '*.+(js|jsx|ts|tsx)': ['eslint'],
    '*.+(js|jsx|json|css|md|graphql|mdx)': ['prettier --write', 'git add'],
  },
};
