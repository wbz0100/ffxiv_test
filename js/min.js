! function() {
  let e = /[\?&]OVERLAY_WS=([^&]+)/.exec(location.href),
    n = null,
    r = [],
    l = 0,
    t = {},
    s = {},
    i = null,
    o = !1;
  if (e) {
    i = e => {
        r ? r.push(e) : n.send(JSON.stringify(e))
      },
      function l() {
        n = new WebSocket(e[1]), n.addEventListener("error", (e => {
          console.error(e)
        })), n.addEventListener("open", (() => {
          console.log("Connected!");
          let e = r;
          r = null;
          for (let n of e) i(n)
        })), n.addEventListener("message", (e => {
          try {
            e = JSON.parse(e.data)
          } catch (n) {
            return void console.error("Invalid message received: ", e)
          }
          void 0 !== e.rseq && t[e.rseq] ? (t[e.rseq](e), delete t[e.rseq]) : a(e)
        })), n.addEventListener("close", (() => {
          r = [], console.log("Trying to reconnect..."), setTimeout((() => {
            l()
          }), 300)
        }))
      }()
  } else {
    i = (e, n) => {
        r ? r.push([e, n]) : OverlayPluginApi.callHandler(JSON.stringify(e), n)
      },
      function e() {
        if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) return void setTimeout(e, 300);
        let n = r;
        r = null, window.__OverlayCallback = a;
        for (let [e, r] of n) i(e, r)
      }()
  }

  function a(e) {
    if (s[e.type])
      for (let n of s[e.type]) n(e)
  }
  window.dispatchOverlayEvent = a, window.addOverlayListener = (e, n) => {
    o && s[e] && console.warn(`A new listener for ${e} has been registered after event transmission has already begun.\nSome events might have been missed and no cached values will be transmitted.\nPlease register your listeners before calling startOverlayEvents().`), s[e] || (s[e] = []), s[e].push(n)
  }, window.removeOverlayListener = (e, n) => {
    if (s[e]) {
      let r = s[e],
        l = r.indexOf(n);
      l > -1 && r.splice(l, 1)
    }
  }, window.callOverlayHandler = e => {
    let r;
    return n ? (e.rseq = l++, r = new Promise((n => {
      t[e.rseq] = n
    })), i(e)) : r = new Promise((n => {
      i(e, (e => {
        n(null == e ? null : JSON.parse(e))
      }))
    })), r
  }, window.startOverlayEvents = () => {
    o = !1, i({
      call: "subscribe",
      events: Object.keys(s)
    })
  }
}();