(function(n, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : n.NProgress = e()
}
)(this, function() {
    function n(n, e, t) {
        return n < e ? e : n > t ? t : n
    }
    function e(n) {
        return 100 * (-1 + n)
    }
    function t(n, t, r) {
        var i;
        return i = "translate3d" === f.positionUsing ? {
            transform: "translate3d(" + e(n) + "%,0,0)"
        } : "translate" === f.positionUsing ? {
            transform: "translate(" + e(n) + "%,0)"
        } : {
            "margin-left": e(n) + "%"
        },
        i.transition = "all " + t + "ms " + r,
        i
    }
    function r(n, e) {
        var t = "string" == typeof n ? n : o(n);
        return t.indexOf(" " + e + " ") >= 0
    }
    function i(n, e) {
        var t = o(n)
          , i = t + e;
        r(t, e) || (n.className = i.substring(1))
    }
    function s(n, e) {
        var t, i = o(n);
        r(n, e) && (t = i.replace(" " + e + " ", " "),
        n.className = t.substring(1, t.length - 1))
    }
    function o(n) {
        return (" " + (n.className || "") + " ").replace(/\s+/gi, " ")
    }
    function a(n) {
        n && n.parentNode && n.parentNode.removeChild(n)
    }
    var u, c, l = {
        version: "0.2.0"
    }, f = l.settings = {
        minimum: .08,
        easing: "ease",
        positionUsing: "",
        speed: 200,
        trickle: !0,
        trickleRate: .02,
        trickleSpeed: 800,
        showSpinner: !0,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: "body",
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    l.configure = function(n) {
        var e, t;
        for (e in n)
            t = n[e],
            void 0 !== t && n.hasOwnProperty(e) && (f[e] = t);
        return this
    }
    ,
    l.status = null,
    l.set = function(e) {
        var r = l.isStarted();
        e = n(e, f.minimum, 1),
        l.status = 1 === e ? null : e;
        var i = l.render(!r)
          , s = i.querySelector(f.barSelector)
          , o = f.speed
          , a = f.easing;
        return i.offsetWidth,
        d(function(n) {
            "" === f.positionUsing && (f.positionUsing = l.getPositioningCSS()),
            m(s, t(e, o, a)),
            1 === e ? (m(i, {
                transition: "none",
                opacity: 1
            }),
            i.offsetWidth,
            setTimeout(function() {
                m(i, {
                    transition: "all " + o + "ms linear",
                    opacity: 0
                }),
                setTimeout(function() {
                    l.remove(),
                    n()
                }, o)
            }, o)) : setTimeout(n, o)
        }),
        this
    }
    ,
    l.isStarted = function() {
        return "number" == typeof l.status
    }
    ,
    l.start = function() {
        l.status || l.set(0);
        var n = function() {
            setTimeout(function() {
                l.status && (l.trickle(),
                n())
            }, f.trickleSpeed)
        };
        return f.trickle && n(),
        this
    }
    ,
    l.done = function(n) {
        return n || l.status ? l.inc(.3 + .5 * Math.random()).set(1) : this
    }
    ,
    l.inc = function(e) {
        var t = l.status;
        return t ? ("number" != typeof e && (e = (1 - t) * n(Math.random() * t, .1, .95)),
        t = n(t + e, 0, .994),
        l.set(t)) : l.start()
    }
    ,
    l.trickle = function() {
        return l.inc(Math.random() * f.trickleRate)
    }
    ,
    u = 0,
    c = 0,
    l.promise = function(n) {
        return n && "resolved" !== n.state() ? (0 === c && l.start(),
        u++,
        c++,
        n.always(function() {
            c--,
            0 === c ? (u = 0,
            l.done()) : l.set((u - c) / u)
        }),
        this) : this
    }
    ,
    l.render = function(n) {
        if (l.isRendered())
            return document.getElementById("nprogress");
        i(document.documentElement, "nprogress-busy");
        var t = document.createElement("div");
        t.id = "nprogress",
        t.innerHTML = f.template;
        var r, s = t.querySelector(f.barSelector), o = n ? "-100" : e(l.status || 0), u = document.querySelector(f.parent);
        return m(s, {
            transition: "all 0 linear",
            transform: "translate3d(" + o + "%,0,0)"
        }),
        f.showSpinner || (r = t.querySelector(f.spinnerSelector),
        r && a(r)),
        u != document.body && i(u, "nprogress-custom-parent"),
        u.appendChild(t),
        t
    }
    ,
    l.remove = function() {
        s(document.documentElement, "nprogress-busy"),
        s(document.querySelector(f.parent), "nprogress-custom-parent");
        var n = document.getElementById("nprogress");
        n && a(n)
    }
    ,
    l.isRendered = function() {
        return !!document.getElementById("nprogress")
    }
    ,
    l.getPositioningCSS = function() {
        var n = document.body.style
          , e = "WebkitTransform"in n ? "Webkit" : "MozTransform"in n ? "Moz" : "msTransform"in n ? "ms" : "OTransform"in n ? "O" : "";
        return e + "Perspective"in n ? "translate3d" : e + "Transform"in n ? "translate" : "margin"
    }
    ;
    var d = function() {
        function n() {
            var t = e.shift();
            t && t(n)
        }
        var e = [];
        return function(t) {
            e.push(t),
            1 == e.length && n()
        }
    }()
      , m = function() {
        function n(n) {
            return n.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(n, e) {
                return e.toUpperCase()
            })
        }
        function e(n) {
            var e = document.body.style;
            if (n in e)
                return n;
            for (var t, r = i.length, s = n.charAt(0).toUpperCase() + n.slice(1); r--; )
                if (t = i[r] + s,
                t in e)
                    return t;
            return n
        }
        function t(t) {
            return t = n(t),
            s[t] || (s[t] = e(t))
        }
        function r(n, e, r) {
            e = t(e),
            n.style[e] = r
        }
        var i = ["Webkit", "O", "Moz", "ms"]
          , s = {};
        return function(n, e) {
            var t, i, s = arguments;
            if (2 == s.length)
                for (t in e)
                    i = e[t],
                    void 0 !== i && e.hasOwnProperty(t) && r(n, t, i);
            else
                r(n, s[1], s[2])
        }
    }();
    return l
});
