module.exports = {
  title: 'Wubai\'s blog',
  base: '/wubai-blog',
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
        ],
      },
    ],
    sidebarDepth: 0,
  },
};