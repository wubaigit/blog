const basePath = 'post'

module.exports = {
  // meta
  title: '我的博客', 
  description: '万事皆虚，万事皆允',
  // vuepress config
  dest: basePath,
  base: `/${basePath}/`,
  serviceWorker: true,
  evergreen: true,
  ga: 'UA-112738831-1'
}