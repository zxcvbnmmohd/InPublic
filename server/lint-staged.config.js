module.exports = {
    '*.{js,ts}': ['eslint --fix', 'eslint'],
    '**/*.ts?(x)': () => 'npm run build-types',
    '*.json': ['prettier --write'],
};