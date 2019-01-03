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
          '/content/02',
          '/content/03',
          '/content/04',
          '/content/05',
          '/content/06',
          '/content/10',
        ],
      },
      {
        title: '关于 JS 异步编程笔记',
        children: [
          '/content/async/09',
          '/content/async/promise',
        ]
      },
      {
        title: '关于 JS 浅薄的编码笔记',
        children: [
          '/content/07',
          '/content/08',
        ]
      },
      {
        title: '开发环境搭建',
        children: [
          '/content/11',
        ]
      },
      {
        title: '规范',
        children: [
          '/content/12',
          '/content/13',
        ]
      }
    ],
    sidebarDepth: 0,
  },
};