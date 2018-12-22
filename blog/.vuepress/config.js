module.exports = {
  title: '我思故我在',
  base: '/wubai-blog/',
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
        ],
      },
    ],
    sidebarDepth: 0,
  },
};