(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{185:function(t,e,a){"use strict";a.r(e);var i=a(0),s=Object(i.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),a("p",[t._v("参考："),a("a",{attrs:{href:"https://www.jianshu.com/p/89e25eb7533e",target:"_blank",rel:"noopener noreferrer"}},[t._v("git | git的标签管理"),a("OutboundLink")],1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"关于-git-tag"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关于-git-tag","aria-hidden":"true"}},[this._v("#")]),this._v(" 关于 git tag")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("TIP")]),this._v(" "),e("p",[this._v("2018年12月26日"),e("br"),this._v("\n关于 tag 打标签的问题")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("git tag 会默认标记到最新的一条 commit，可以理解为给 commit 的那段哈希值起一个可读性高的名字。"),e("br"),this._v("\n所以发版的时候使用的 tag 其实也是使用那个 commit，所以！！！"),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("git tag")]),this._v(" 之后再推的代码，并不能包含在使用 新tag 发版的代码里面！！！")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("$ git tag <name>  # 新建一个标签，默认为 HEAD，也可以制定一个 commit id\n$ git tag -a <tag-name> -m 'bla.bla.bla...' # 可以指定标签信息\n$ git tag # 可以查看所有标签\n$ git show <tag-name> # 可以看到标签信息及标签的说明文字\n$ git push origin <tag-name> # 推送本地的标签到远程仓库\n$ git tag -d <tag-name> # 删除一个本地标签\n$ git push origin:res/tags/<atg-name>\n")])])])}],!1,null,null,null);s.options.__file="06.md";e.default=s.exports}}]);