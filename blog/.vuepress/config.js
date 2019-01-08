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
        title: '杂谈',
        children: [
          '/content/01',
          '/content/06',
          '/content/10',
          '/content/21'
        ],
      },
      {
        title: 'JS 笔记',
        children: [
          '/content/09',
          '/content/09-1',
          '/content/07',
          '/content/08',
        ]
      },
      // {
      //   title: '开发环境搭建',
      //   children: [
      //     '/content/11',
      //   ]
      // },
      // {
      //   title: '规范',
      //   children: [
      //     '/content/12',
      //     '/content/13',
      //   ]
      // }
    ],
    sidebarDepth: 0,
  },
};