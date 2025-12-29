const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubPages ? '/moticommand' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig