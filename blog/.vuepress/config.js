module.exports = {
  title: 'Owl',
  base: '/wubai-blog/',
  head: [
    ['link', { rel: 'icon', href: '/20-owl.png' }],
  ],
  themeConfig: {
    sidebar: [
      {
        title: '首页',
        children: [
          '/',
        ],
      },
      {
        title: '目录',
        children: [
          '/content/01',
          '/content/02',
          '/content/03',
          '/content/04',
          '/content/05',
          '/content/06',
          '/content/07',
          '/content/08',
          '/content/09',
          '/content/10',
          '/content/11',
          '/content/12',
          '/content/13',
        ],
      },
    ],
    sidebarDepth: 0,
  },
};