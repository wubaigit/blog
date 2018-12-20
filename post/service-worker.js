/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "064cf2b971f97905e0f670b1549b422c"
  },
  {
    "url": "assets/css/0.styles.443c254f.css",
    "revision": "c7e3f72432ec6e7673627db0265904b8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.4714df12.js",
    "revision": "88fcea952a99e1a9aa82a7ca1ad4e916"
  },
  {
    "url": "assets/js/3.701843c3.js",
    "revision": "7af6a94ec4a50bc73e1a13ceee909d9d"
  },
  {
    "url": "assets/js/4.69305b7a.js",
    "revision": "e3a231f87a4193ee669182f559cfde8d"
  },
  {
    "url": "assets/js/app.57d05bab.js",
    "revision": "4374127b9ef76d636e724910c51e7e45"
  },
  {
    "url": "index.html",
    "revision": "9ec20e9cb60c2a147fd27017243a1e7e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
