/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */

/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

var formintorjs;
! function() {
    if (!formintorjs || !formintorjs.requirejs) {
        formintorjs ? require = formintorjs : formintorjs = {};
        var requirejs, require, define;
        ! function(global, setTimeout) {
            function commentReplace(t, e) { return e || "" }

            function isFunction(t) { return "[object Function]" === ostring.call(t) }

            function isArray(t) { return "[object Array]" === ostring.call(t) }

            function each(t, e) { if (t) { var i; for (i = 0; i < t.length && (!t[i] || !e(t[i], i, t)); i += 1); } }

            function eachReverse(t, e) { if (t) { var i; for (i = t.length - 1; i > -1 && (!t[i] || !e(t[i], i, t)); i -= 1); } }

            function hasProp(t, e) { return hasOwn.call(t, e) }

            function getOwn(t, e) { return hasProp(t, e) && t[e] }

            function eachProp(t, e) {
                var i;
                for (i in t)
                    if (hasProp(t, i) && e(t[i], i)) break
            }

            function mixin(t, e, i, n) { return e && eachProp(e, function(e, o) {!i && hasProp(t, o) || (!n || "object" != typeof e || !e || isArray(e) || isFunction(e) || e instanceof RegExp ? t[o] = e : (t[o] || (t[o] = {}), mixin(t[o], e, i, n))) }), t }

            function bind(t, e) { return function() { return e.apply(t, arguments) } }

            function scripts() { return document.getElementsByTagName("script") }

            function defaultOnError(t) { throw t }

            function getGlobal(t) { if (!t) return t; var e = global; return each(t.split("."), function(t) { e = e[t] }), e }

            function makeError(t, e, i, n) { var o = new Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t); return o.requireType = t, o.requireModules = n, i && (o.originalError = i), o }

            function newContext(t) {
                function e(t) {
                    var e, i;
                    for (e = 0; e < t.length; e++)
                        if ("." === (i = t[e])) t.splice(e, 1), e -= 1;
                        else if (".." === i) {
                        if (0 === e || 1 === e && ".." === t[2] || ".." === t[e - 1]) continue;
                        e > 0 && (t.splice(e - 1, 2), e -= 2)
                    }
                }

                function i(t, i, n) {
                    var o, r, a, s, l, p, d, u, c, m, f, h = i && i.split("/"),
                        _ = F.map,
                        v = _ && _["*"];
                    if (t && (t = t.split("/"), p = t.length - 1, F.nodeIdCompat && jsSuffixRegExp.test(t[p]) && (t[p] = t[p].replace(jsSuffixRegExp, "")), "." === t[0].charAt(0) && h && (f = h.slice(0, h.length - 1), t = f.concat(t)), e(t), t = t.join("/")), n && _ && (h || v)) {
                        r = t.split("/");
                        t: for (a = r.length; a > 0; a -= 1) {
                            if (l = r.slice(0, a).join("/"), h)
                                for (s = h.length; s > 0; s -= 1)
                                    if ((o = getOwn(_, h.slice(0, s).join("/"))) && (o = getOwn(o, l))) { d = o, u = a; break t }!c && v && getOwn(v, l) && (c = getOwn(v, l), m = a)
                        }!d && c && (d = c, u = m), d && (r.splice(0, u, d), t = r.join("/"))
                    }
                    return getOwn(F.pkgs, t) || t
                }

                function n(t) { isBrowser && each(scripts(), function(e) { if (e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === x.contextName) return e.parentNode.removeChild(e), !0 }) }

                function o(t) { var e = getOwn(F.paths, t); if (e && isArray(e) && e.length > 1) return e.shift(), x.require.undef(t), x.makeRequire(null, { skipMap: !0 })([t]), !0 }

                function r(t) { var e, i = t ? t.indexOf("!") : -1; return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t] }

                function a(t, e, n, o) {
                    var a, s, l, p, d = null,
                        u = e ? e.name : null,
                        c = t,
                        m = !0,
                        f = "";
                    return t || (m = !1, t = "_@r" + (T += 1)), p = r(t), d = p[0], t = p[1], d && (d = i(d, u, o), s = getOwn($, d)), t && (d ? f = n ? t : s && s.normalize ? s.normalize(t, function(t) { return i(t, u, o) }) : -1 === t.indexOf("!") ? i(t, u, o) : t : (f = i(t, u, o), p = r(f), d = p[0], f = p[1], n = !0, a = x.nameToUrl(f))), l = !d || s || n ? "" : "_unnormalized" + (D += 1), { prefix: d, name: f, parentMap: e, unnormalized: !!l, url: a, originalName: c, isDefine: m, id: (d ? d + "!" + f : f) + l }
                }

                function s(t) {
                    var e = t.id,
                        i = getOwn(k, e);
                    return i || (i = k[e] = new x.Module(t)), i
                }

                function l(t, e, i) {
                    var n = t.id,
                        o = getOwn(k, n);
                    !hasProp($, n) || o && !o.defineEmitComplete ? (o = s(t), o.error && "error" === e ? i(o.error) : o.on(e, i)) : "defined" === e && i($[n])
                }

                function p(t, e) {
                    var i = t.requireModules,
                        n = !1;
                    e ? e(t) : (each(i, function(e) {
                        var i = getOwn(k, e);
                        i && (i.error = t, i.events.error && (n = !0, i.emit("error", t)))
                    }), n || req.onError(t))
                }

                function d() { globalDefQueue.length && (each(globalDefQueue, function(t) { var e = t[0]; "string" == typeof e && (x.defQueueMap[e] = !0), U.push(t) }), globalDefQueue = []) }

                function u(t) { delete k[t], delete j[t] }

                function c(t, e, i) {
                    var n = t.map.id;
                    t.error ? t.emit("error", t.error) : (e[n] = !0, each(t.depMaps, function(n, o) {
                        var r = n.id,
                            a = getOwn(k, r);
                        !a || t.depMatched[o] || i[r] || (getOwn(e, r) ? (t.defineDep(o, $[r]), t.check()) : c(a, e, i))
                    }), i[n] = !0)
                }

                function m() {
                    var t, e, i = 1e3 * F.waitSeconds,
                        r = i && x.startTime + i < (new Date).getTime(),
                        a = [],
                        s = [],
                        l = !1,
                        d = !0;
                    if (!g) {
                        if (g = !0, eachProp(j, function(t) {
                                var i = t.map,
                                    p = i.id;
                                if (t.enabled && (i.isDefine || s.push(t), !t.error))
                                    if (!t.inited && r) o(p) ? (e = !0, l = !0) : (a.push(p), n(p));
                                    else if (!t.inited && t.fetched && i.isDefine && (l = !0, !i.prefix)) return d = !1
                            }), r && a.length) return t = makeError("timeout", "Load timeout for modules: " + a, null, a), t.contextName = x.contextName, p(t);
                        d && each(s, function(t) { c(t, {}, {}) }), r && !e || !l || !isBrowser && !isWebWorker || w || (w = setTimeout(function() { w = 0, m() }, 50)), g = !1
                    }
                }

                function f(t) { hasProp($, t[0]) || s(a(t[0], null, !0)).init(t[1], t[2]) }

                function h(t, e, i, n) { t.detachEvent && !isOpera ? n && t.detachEvent(n, e) : t.removeEventListener(i, e, !1) }

                function _(t) { var e = t.currentTarget || t.srcElement; return h(e, x.onScriptLoad, "load", "onreadystatechange"), h(e, x.onScriptError, "error"), { node: e, id: e && e.getAttribute("data-requiremodule") } }

                function v() {
                    var t;
                    for (d(); U.length;) {
                        if (t = U.shift(), null === t[0]) return p(makeError("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
                        f(t)
                    }
                    x.defQueueMap = {}
                }
                var g, b, x, y, w, F = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} },
                    k = {},
                    j = {},
                    q = {},
                    U = [],
                    $ = {},
                    z = {},
                    C = {},
                    T = 1,
                    D = 1;
                return y = { require: function(t) { return t.require ? t.require : t.require = x.makeRequire(t.map) }, exports: function(t) { if (t.usingExports = !0, t.map.isDefine) return t.exports ? $[t.map.id] = t.exports : t.exports = $[t.map.id] = {} }, module: function(t) { return t.module ? t.module : t.module = { id: t.map.id, uri: t.map.url, config: function() { return getOwn(F.config, t.map.id) || {} }, exports: t.exports || (t.exports = {}) } } }, b = function(t) { this.events = getOwn(q, t.id) || {}, this.map = t, this.shim = getOwn(F.shim, t.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0 }, b.prototype = {
                    init: function(t, e, i, n) { n = n || {}, this.inited || (this.factory = e, i ? this.on("error", i) : this.events.error && (i = bind(this, function(t) { this.emit("error", t) })), this.depMaps = t && t.slice(0), this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check()) },
                    defineDep: function(t, e) { this.depMatched[t] || (this.depMatched[t] = !0, this.depCount -= 1, this.depExports[t] = e) },
                    fetch: function() {
                        if (!this.fetched) {
                            this.fetched = !0, x.startTime = (new Date).getTime();
                            var t = this.map;
                            if (!this.shim) return t.prefix ? this.callPlugin() : this.load();
                            x.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], bind(this, function() { return t.prefix ? this.callPlugin() : this.load() }))
                        }
                    },
                    load: function() {
                        var t = this.map.url;
                        z[t] || (z[t] = !0, x.load(this.map.id, t))
                    },
                    check: function() {
                        if (this.enabled && !this.enabling) {
                            var t, e, i = this.map.id,
                                n = this.depExports,
                                o = this.exports,
                                r = this.factory;
                            if (this.inited) {
                                if (this.error) this.emit("error", this.error);
                                else if (!this.defining) {
                                    if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                        if (isFunction(r)) { if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try { o = x.execCb(i, r, n, o) } catch (e) { t = e } else o = x.execCb(i, r, n, o); if (this.map.isDefine && void 0 === o && (e = this.module, e ? o = e.exports : this.usingExports && (o = this.exports)), t) return t.requireMap = this.map, t.requireModules = this.map.isDefine ? [this.map.id] : null, t.requireType = this.map.isDefine ? "define" : "require", p(this.error = t) } else o = r;
                                        if (this.exports = o, this.map.isDefine && !this.ignore && ($[i] = o, req.onResourceLoad)) {
                                            var a = [];
                                            each(this.depMaps, function(t) { a.push(t.normalizedMap || t) }), req.onResourceLoad(x, this.map, a)
                                        }
                                        u(i), this.defined = !0
                                    }
                                    this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                                }
                            } else hasProp(x.defQueueMap, i) || this.fetch()
                        }
                    },
                    callPlugin: function() {
                        var t = this.map,
                            e = t.id,
                            n = a(t.prefix);
                        this.depMaps.push(n), l(n, "defined", bind(this, function(n) {
                            var o, r, d, c = getOwn(C, this.map.id),
                                m = this.map.name,
                                f = this.map.parentMap ? this.map.parentMap.name : null,
                                h = x.makeRequire(t.parentMap, { enableBuildCallback: !0 });
                            return this.map.unnormalized ? (n.normalize && (m = n.normalize(m, function(t) { return i(t, f, !0) }) || ""), r = a(t.prefix + "!" + m, this.map.parentMap, !0), l(r, "defined", bind(this, function(t) { this.map.normalizedMap = r, this.init([], function() { return t }, null, { enabled: !0, ignore: !0 }) })), void((d = getOwn(k, r.id)) && (this.depMaps.push(r), this.events.error && d.on("error", bind(this, function(t) { this.emit("error", t) })), d.enable()))) : c ? (this.map.url = x.nameToUrl(c), void this.load()) : (o = bind(this, function(t) { this.init([], function() { return t }, null, { enabled: !0 }) }), o.error = bind(this, function(t) { this.inited = !0, this.error = t, t.requireModules = [e], eachProp(k, function(t) { 0 === t.map.id.indexOf(e + "_unnormalized") && u(t.map.id) }), p(t) }), o.fromText = bind(this, function(i, n) {
                                var r = t.name,
                                    l = a(r),
                                    d = useInteractive;
                                n && (i = n), d && (useInteractive = !1), s(l), hasProp(F.config, e) && (F.config[r] = F.config[e]);
                                try { req.exec(i) } catch (t) { return p(makeError("fromtexteval", "fromText eval for " + e + " failed: " + t, t, [e])) }
                                d && (useInteractive = !0), this.depMaps.push(l), x.completeLoad(r), h([r], o)
                            }), void n.load(t.name, h, o, F))
                        })), x.enable(n, this), this.pluginMaps[n.id] = n
                    },
                    enable: function() {
                        j[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(t, e) {
                            var i, n, o;
                            if ("string" == typeof t) {
                                if (t = a(t, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[e] = t, o = getOwn(y, t.id)) return void(this.depExports[e] = o(this));
                                this.depCount += 1, l(t, "defined", bind(this, function(t) { this.undefed || (this.defineDep(e, t), this.check()) })), this.errback ? l(t, "error", bind(this, this.errback)) : this.events.error && l(t, "error", bind(this, function(t) { this.emit("error", t) }))
                            }
                            i = t.id, n = k[i], hasProp(y, i) || !n || n.enabled || x.enable(t, this)
                        })), eachProp(this.pluginMaps, bind(this, function(t) {
                            var e = getOwn(k, t.id);
                            e && !e.enabled && x.enable(t, this)
                        })), this.enabling = !1, this.check()
                    },
                    on: function(t, e) {
                        var i = this.events[t];
                        i || (i = this.events[t] = []), i.push(e)
                    },
                    emit: function(t, e) { each(this.events[t], function(t) { t(e) }), "error" === t && delete this.events[t] }
                }, x = {
                    config: F,
                    contextName: t,
                    registry: k,
                    defined: $,
                    urlFetched: z,
                    defQueue: U,
                    defQueueMap: {},
                    Module: b,
                    makeModuleMap: a,
                    nextTick: req.nextTick,
                    onError: p,
                    configure: function(t) {
                        if (t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/"), "string" == typeof t.urlArgs) {
                            var e = t.urlArgs;
                            t.urlArgs = function(t, i) { return (-1 === i.indexOf("?") ? "?" : "&") + e }
                        }
                        var i = F.shim,
                            n = { paths: !0, bundles: !0, config: !0, map: !0 };
                        eachProp(t, function(t, e) { n[e] ? (F[e] || (F[e] = {}), mixin(F[e], t, !0, !0)) : F[e] = t }), t.bundles && eachProp(t.bundles, function(t, e) { each(t, function(t) { t !== e && (C[t] = e) }) }), t.shim && (eachProp(t.shim, function(t, e) { isArray(t) && (t = { deps: t }), !t.exports && !t.init || t.exportsFn || (t.exportsFn = x.makeShimExports(t)), i[e] = t }), F.shim = i), t.packages && each(t.packages, function(t) {
                            var e, i;
                            t = "string" == typeof t ? { name: t } : t, i = t.name, e = t.location, e && (F.paths[i] = t.location), F.pkgs[i] = t.name + "/" + (t.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                        }), eachProp(k, function(t, e) { t.inited || t.map.unnormalized || (t.map = a(e, null, !0)) }), (t.deps || t.callback) && x.require(t.deps || [], t.callback)
                    },
                    makeShimExports: function(t) {
                        function e() { var e; return t.init && (e = t.init.apply(global, arguments)), e || t.exports && getGlobal(t.exports) }
                        return e
                    },
                    makeRequire: function(e, o) {
                        function r(i, n, l) { var d, u, c; return o.enableBuildCallback && n && isFunction(n) && (n.__requireJsBuild = !0), "string" == typeof i ? isFunction(n) ? p(makeError("requireargs", "Invalid require call"), l) : e && hasProp(y, i) ? y[i](k[e.id]) : req.get ? req.get(x, i, e, r) : (u = a(i, e, !1, !0), d = u.id, hasProp($, d) ? $[d] : p(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + t + (e ? "" : ". Use require([])")))) : (v(), x.nextTick(function() { v(), c = s(a(null, e)), c.skipMap = o.skipMap, c.init(i, n, l, { enabled: !0 }), m() }), r) }
                        return o = o || {}, mixin(r, {
                            isBrowser: isBrowser,
                            toUrl: function(t) {
                                var n, o = t.lastIndexOf("."),
                                    r = t.split("/")[0],
                                    a = "." === r || ".." === r;
                                return -1 !== o && (!a || o > 1) && (n = t.substring(o, t.length), t = t.substring(0, o)), x.nameToUrl(i(t, e && e.id, !0), n, !0)
                            },
                            defined: function(t) { return hasProp($, a(t, e, !1, !0).id) },
                            specified: function(t) { return t = a(t, e, !1, !0).id, hasProp($, t) || hasProp(k, t) }
                        }), e || (r.undef = function(t) {
                            d();
                            var i = a(t, e, !0),
                                o = getOwn(k, t);
                            o.undefed = !0, n(t), delete $[t], delete z[i.url], delete q[t], eachReverse(U, function(e, i) { e[0] === t && U.splice(i, 1) }), delete x.defQueueMap[t], o && (o.events.defined && (q[t] = o.events), u(t))
                        }), r
                    },
                    enable: function(t) { getOwn(k, t.id) && s(t).enable() },
                    completeLoad: function(t) {
                        var e, i, n, r = getOwn(F.shim, t) || {},
                            a = r.exports;
                        for (d(); U.length;) {
                            if (i = U.shift(), null === i[0]) {
                                if (i[0] = t, e) break;
                                e = !0
                            } else i[0] === t && (e = !0);
                            f(i)
                        }
                        if (x.defQueueMap = {}, n = getOwn(k, t), !e && !hasProp($, t) && n && !n.inited) {
                            if (!(!F.enforceDefine || a && getGlobal(a))) return o(t) ? void 0 : p(makeError("nodefine", "No define call for " + t, null, [t]));
                            f([t, r.deps || [], r.exportsFn])
                        }
                        m()
                    },
                    nameToUrl: function(t, e, i) {
                        var n, o, r, a, s, l, p, d = getOwn(F.pkgs, t);
                        if (d && (t = d), p = getOwn(C, t)) return x.nameToUrl(p, e, i);
                        if (req.jsExtRegExp.test(t)) s = t + (e || "");
                        else {
                            for (n = F.paths, o = t.split("/"), r = o.length; r > 0; r -= 1)
                                if (a = o.slice(0, r).join("/"), l = getOwn(n, a)) { isArray(l) && (l = l[0]), o.splice(0, r, l); break }
                            s = o.join("/"), s += e || (/^data\:|^blob\:|\?/.test(s) || i ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : F.baseUrl) + s
                        }
                        return F.urlArgs && !/^blob\:/.test(s) ? s + F.urlArgs(t, s) : s
                    },
                    load: function(t, e) { req.load(x, t, e) },
                    execCb: function(t, e, i, n) { return e.apply(n, i) },
                    onScriptLoad: function(t) {
                        if ("load" === t.type || readyRegExp.test((t.currentTarget || t.srcElement).readyState)) {
                            interactiveScript = null;
                            var e = _(t);
                            x.completeLoad(e.id)
                        }
                    },
                    onScriptError: function(t) { var e = _(t); if (!o(e.id)) { var i = []; return eachProp(k, function(t, n) { 0 !== n.indexOf("_@r") && each(t.depMaps, function(t) { if (t.id === e.id) return i.push(n), !0 }) }), p(makeError("scripterror", 'Script error for "' + e.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), t, [e.id])) } }
                }, x.require = x.makeRequire(), x
            }

            function getInteractiveScript() { return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(t) { if ("interactive" === t.readyState) return interactiveScript = t }), interactiveScript) }
            var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.3",
                commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
                cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
                jsSuffixRegExp = /\.js$/,
                currDirRegExp = /^\.\//,
                op = Object.prototype,
                ostring = op.toString,
                hasOwn = op.hasOwnProperty,
                isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
                isWebWorker = !isBrowser && "undefined" != typeof importScripts,
                readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
                defContextName = "_",
                isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
                contexts = {},
                cfg = {},
                globalDefQueue = [],
                useInteractive = !1;
            if (void 0 === define) {
                if (void 0 !== requirejs) {
                    if (isFunction(requirejs)) return;
                    cfg = requirejs, requirejs = void 0
                }
                void 0 === require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(t, e, i, n) { var o, r, a = defContextName; return isArray(t) || "string" == typeof t || (r = t, isArray(e) ? (t = e, e = i, i = n) : t = []), r && r.context && (a = r.context), o = getOwn(contexts, a), o || (o = contexts[a] = req.s.newContext(a)), r && o.configure(r), o.require(t, e, i) }, req.config = function(t) { return req(t) }, req.nextTick = void 0 !== setTimeout ? function(t) { setTimeout(t, 4) } : function(t) { t() }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = { contexts: contexts, newContext: newContext }, req({}), each(["toUrl", "undef", "defined", "specified"], function(t) { req[t] = function() { var e = contexts[defContextName]; return e.require[t].apply(e, arguments) } }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], (baseElement = document.getElementsByTagName("base")[0]) && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(t, e, i) { var n = t.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"); return n.type = t.scriptType || "text/javascript", n.charset = "utf-8", n.async = !0, n }, req.load = function(t, e, i) { var n, o = t && t.config || {}; if (isBrowser) return n = req.createNode(o, e, i), n.setAttribute("data-requirecontext", t.contextName), n.setAttribute("data-requiremodule", e), !n.attachEvent || n.attachEvent.toString && n.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (n.addEventListener("load", t.onScriptLoad, !1), n.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0, n.attachEvent("onreadystatechange", t.onScriptLoad)), n.src = i, o.onNodeCreated && o.onNodeCreated(n, o, e, i), currentlyAddingScript = n, baseElement ? head.insertBefore(n, baseElement) : head.appendChild(n), currentlyAddingScript = null, n; if (isWebWorker) try { setTimeout(function() {}, 0), importScripts(i), t.completeLoad(e) } catch (n) { t.onError(makeError("importscripts", "importScripts failed for " + e + " at " + i, n, [e])) } }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(t) { if (head || (head = t.parentNode), dataMain = t.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0 }), define = function(t, e, i) { var n, o; "string" != typeof t && (i = e, e = t, t = null), isArray(e) || (i = e, e = null), !e && isFunction(i) && (e = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function(t, i) { e.push(i) }), e = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(e))), useInteractive && (n = currentlyAddingScript || getInteractiveScript()) && (t || (t = n.getAttribute("data-requiremodule")), o = contexts[n.getAttribute("data-requirecontext")]), o ? (o.defQueue.push([t, e, i]), o.defQueueMap[t] = !0) : globalDefQueue.push([t, e, i]) }, define.amd = { jQuery: !0 }, req.exec = function(text) { return eval(text) }, req(cfg)
            }
        }(this, "undefined" == typeof setTimeout ? void 0 : setTimeout), formintorjs.requirejs = requirejs, formintorjs.require = require, formintorjs.define = define
    }
}(), formintorjs.define("requireLib", function() {}), formintorjs.define("text", ["module"], function(t) {
        "use strict";
        var e, i, n = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            o = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            r = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            a = "undefined" != typeof location && location.href,
            s = a && location.protocol && location.protocol.replace(/\:/, ""),
            l = a && location.hostname,
            p = a && (location.port || void 0),
            d = [],
            u = t.config && t.config() || {};
        return e = {
            version: "2.0.3",
            strip: function(t) {
                if (t) {
                    t = t.replace(o, "");
                    var e = t.match(r);
                    e && (t = e[1])
                } else t = "";
                return t
            },
            jsEscape: function(t) { return t.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029") },
            createXhr: u.createXhr || function() {
                var t, e, i;
                if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                if ("undefined" != typeof ActiveXObject)
                    for (e = 0; e < 3; e += 1) { i = n[e]; try { t = new ActiveXObject(i) } catch (t) {} if (t) { n = [i]; break } }
                return t
            },
            parseName: function(t) {
                var e = !1,
                    i = t.indexOf("."),
                    n = t.substring(0, i),
                    o = t.substring(i + 1, t.length);
                return i = o.indexOf("!"), -1 !== i && (e = o.substring(i + 1, o.length), e = "strip" === e, o = o.substring(0, i)), { moduleName: n, ext: o, strip: e }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(t, i, n, o) { var r, a, s, l = e.xdRegExp.exec(t); return !l || (r = l[2], a = l[3], a = a.split(":"), s = a[1], a = a[0], !(r && r !== i || a && a.toLowerCase() !== n.toLowerCase() || (s || a) && s !== o)) },
            finishLoad: function(t, i, n, o) { n = i ? e.strip(n) : n, u.isBuild && (d[t] = n), o(n) },
            load: function(t, i, n, o) {
                if (o.isBuild && !o.inlineText) return void n();
                u.isBuild = o.isBuild;
                var r = e.parseName(t),
                    d = r.moduleName + "." + r.ext,
                    c = i.toUrl(d),
                    m = u.useXhr || e.useXhr;
                !a || m(c, s, l, p) ? e.get(c, function(i) { e.finishLoad(t, r.strip, i, n) }, function(t) { n.error && n.error(t) }) : i([d], function(t) { e.finishLoad(r.moduleName + "." + r.ext, r.strip, t, n) })
            },
            write: function(t, i, n, o) {
                if (d.hasOwnProperty(i)) {
                    var r = e.jsEscape(d[i]);
                    n.asModule(t + "!" + i, "define(function () { return '" + r + "';});\n")
                }
            },
            writeFile: function(t, i, n, o, r) {
                var a = e.parseName(i),
                    s = a.moduleName + "." + a.ext,
                    l = n.toUrl(a.moduleName + "." + a.ext) + ".js";
                e.load(s, n, function(i) {
                    var n = function(t) { return o(l, t) };
                    n.asModule = function(t, e) { return o.asModule(t, l, e) }, e.write(t, s, n, r)
                }, r)
            }
        }, "node" === u.env || !u.env && "undefined" != typeof process && process.versions && process.versions.node ? (i = require.nodeRequire("fs"), e.get = function(t, e) {
            var n = i.readFileSync(t, "utf8");
            0 === n.indexOf("\ufeff") && (n = n.substring(1)), e(n)
        }) : "xhr" === u.env || !u.env && e.createXhr() ? e.get = function(t, i, n) {
            var o = e.createXhr();
            o.open("GET", t, !0), u.onXhr && u.onXhr(o, t), o.onreadystatechange = function(e) {
                var r, a;
                4 === o.readyState && (r = o.status, r > 399 && r < 600 ? (a = new Error(t + " HTTP status: " + r), a.xhr = o, n(a)) : i(o.responseText))
            }, o.send(null)
        } : ("rhino" === u.env || !u.env && "undefined" != typeof Packages && "undefined" != typeof java) && (e.get = function(t, e) {
            var i, n, o = new java.io.File(t),
                r = java.lang.System.getProperty("line.separator"),
                a = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o), "utf-8")),
                s = "";
            try {
                for (i = new java.lang.StringBuffer, n = a.readLine(), n && n.length() && 65279 === n.charAt(0) && (n = n.substring(1)), i.append(n); null !== (n = a.readLine());) i.append(r), i.append(n);
                s = String(i.toString())
            } finally { a.close() }
            e(s)
        }), e
    }), formintorjs.define("text!admin/templates/popups.html", [], function() { return '<div>\r\n\r\n\t<script type="text/template" id="popup-integration-tpl">\r\n\r\n\t\t<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-integration-popup">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-integration-content-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<div class="sui-dialog-image" aria-hidden="true">\r\n\r\n\t\t\t\t<img\r\n\t\t\t\t\tsrc="{{ image }}"\r\n\t\t\t\t\tsrcset="{{ image }} 1x, {{ image_x2 }} 2x"\r\n\t\t\t\t\talt="{{ title }}"\r\n\t\t\t\t/>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="sui-box-content integration-header"></div>\r\n\r\n\t\t\t<button class="sui-dialog-back powerform-addon-back" aria-label="Back" style="display: none;"></button>\r\n\r\n\t\t\t<button class="sui-dialog-close powerform-integration-close" aria-label="{{ Powerform.l10n.popup.close_label }}"></button>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body"></div>\r\n\r\n\t\t<div class="sui-box-footer sui-box-footer-center"></div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-new-tpl">\r\n\r\n\t\t<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-popup">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-tpl">\r\n\r\n\t\t<div class="sui-dialog" id="powerform-popup" aria-hidden="true">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-header-tpl">\r\n\r\n\t\t<div class="sui-box-header">\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle">{{ title }}</h3>\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button data-a11y-dialog-hide="" class="sui-dialog-close" aria-label=""></button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-loader-tpl">\r\n\r\n\t\t<p class="fui-loading-dialog" aria-label="Loading content">\r\n\r\n\t\t\t<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>\r\n\r\n\t\t</p>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-stripe-tpl">\r\n\r\n\t\t<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-stripe-popup">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-stripe-content-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<div class="sui-dialog-image" aria-hidden="true">\r\n\r\n\t\t\t\t<img src="{{ image }}"\r\n\t\t\t\t     srcset="{{ image }} 1x, {{ image_x2 }} 2x" alt="{{ title }}" />\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle2" style="display: none;">{{ title }}</h3>\r\n\r\n\t\t\t<button class="sui-dialog-close powerform-integration-close" aria-label="{{ Powerform.l10n.popup.close_label }}"></button>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body sui-block-content-center sui-box-body-slim"></div>\r\n\r\n\t\t<div class="sui-box-footer sui-box-footer-center"></div>\r\n\r\n\t<\/script>\r\n\r\n</div>\r\n' }),
    function(t) {
        window.empty = function(t) { return void 0 === t || !t }, window.count = function(t) { return void 0 === t ? 0 : t && t.length ? t.length : 0 }, window.stripslashes = function(t) {
            return (t + "").replace(/\\(.?)/g, function(t, e) {
                switch (e) {
                    case "\\":
                        return "\\";
                    case "0":
                        return "\0";
                    case "":
                        return "";
                    default:
                        return e
                }
            })
        }, window.powerform_array_value_exists = function(t, e) { return !_.isUndefined(t[e]) && !_.isEmpty(t[e]) }, window.decodeHtmlEntity = function(t) { return void 0 === t ? t : t.replace(/&#(\d+);/g, function(t, e) { return String.fromCharCode(e) }) }, window.encodeHtmlEntity = function(t) { if (void 0 === t) return t; for (var e = [], i = t.length - 1; i >= 0; i--) e.unshift(["&#", t[i].charCodeAt(), ";"].join("")); return e.join("") }, formintorjs.define("admin/utils", ["text!admin/templates/popups.html"], function(e) {
            var i = {
                    fields_ids: [],
                    google_font_families: [],
                    is_touch: function() { return Powerform.Data.is_touch },
                    is_mobile_size: function() { return window.screen.width <= 782 },
                    is_mobile: function() { return !(!Powerform.Utils.is_touch() && !Powerform.Utils.is_mobile_size()) },
                    template: function(t) { return _.templateSettings = { evaluate: /\{\[([\s\S]+?)\]\}/g, interpolate: /\{\{([\s\S]+?)\}\}/g }, _.template(t) },
                    template_php: function(t) {
                        var e = _.templateSettings,
                            i = !1;
                        return _.templateSettings = { interpolate: /<\?php echo (.+?) \?>/g, evaluate: /<\?php (.+?) \?>/g }, i = _.template(t), _.templateSettings = e,
                            function(t) { return _.each(t, function(e, i) { t["$" + i] = e }), i(t) }
                    },
                    ucfirst: function(t) { return t.charAt(0).toUpperCase() + t.slice(1) },
                    get_slug: function(t) { return t = t.replace(" ", "-"), t = t.replace(/[^-a-zA-Z0-9]/, "") },
                    sanitize_uri_string: function(t) { var e = decodeURIComponent(t); return e = e.replace(/-/g, " ") },
                    get_url_param: function(t) { for (var e = window.location.search.substring(1), i = e.split("&"), n = 0; n < i.length; n++) { var o = i[n].split("="); if (o[0] === t) return o[1] } return !1 },
                    is_email_wp: function(t) {
                        if (t.length < 6) return !1;
                        if (t.indexOf("@", 1) < 0) return !1;
                        var e = t.split("@", 2);
                        if (!e[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) return !1;
                        if (e[1].match(/\.{2,}/)) return !1;
                        var i = e[1],
                            n = i.split(".");
                        if (n.length < 2) return !1;
                        for (var o = n.length, r = 0; r < o; r++)
                            if (!n[r].match(/^[a-z0-9-]+$/i)) return !1;
                        return !0
                    },
                    powerform_select2_tags: function(e, i) {
                        i = _.defaults(i, { allowClear: !0, dropdownCssClass: "sui-select-dropdown" }), e.find("select.sui-select.fui-multi-select").each(function() {
                            t(this).attr("data-reorder") && t(this).on("select2:select", function(e) {
                                var i = e.params.data.element,
                                    n = t(i),
                                    o = t(this);
                                o.append(n), o.trigger("change.select2")
                            }), t(this).SUIselect2(i)
                        })
                    },
                    powerform_select2_custom: function(e, i) {
                        i = _.defaults(i, { dropdownCssClass: "sui-select-dropdown" }), e.find("select.sui-select.custom-select2").each(function() {
                            t(this).attr("data-reorder") && t(this).on("select2:select", function(e) {
                                var i = e.params.data.element,
                                    n = t(i),
                                    o = t(this);
                                o.append(n), o.trigger("change.select2")
                            }), t(this).SUIselect2(i)
                        })
                    },
                    init_select2: function() { window.SUI },
                    load_google_fonts: function(e) {
                        var i = this;
                        t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: { action: "powerform_load_google_fonts", _wpnonce: Powerform.Data.gFontNonce } }).done(function(t) {!0 === t.success && (i.google_font_families = t.data), e.apply(t, [i.google_font_families]) })
                    },
                    sui_delegate_events: function() { "object" == typeof window.SUI && setTimeout(function() { SUI.suiAccordion(t(".sui-accordion")), SUI.suiTabs(t(".sui-tabs")), t("select").not(".sui-select").not(".powerform-select").not(".powerform-time").not(".fui-multi-select").each(function() { SUI.suiSelect(t(this)) }), t("select.sui-select").not(".fui-multi-select").not(".custom-select2").each(function() { t(this).SUIselect2({ dropdownCssClass: "sui-select-dropdown" }) }), SUI.loadCircleScore(t(".sui-circle-score")), SUI.showHidePassword() }, 50) }
                },
                n = {
                    $popup: {},
                    _deferred: {},
                    initialize: function() {
                        var i = Powerform.Utils.template(t(e).find("#popup-tpl").html());
                        t("#powerform-popup").length ? (t("#powerform-popup").remove(), this.initialize()) : t("main.sui-wrap").append(i({})), this.$popup = t("#powerform-popup")
                    },
                    open: function(i, n, o) {
                        this.data = n, this.title = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0;
                        var r = Powerform.Utils.template(t(e).find("#popup-header-tpl").html());
                        _.isUndefined(this.data) || (_.isUndefined(this.data.title) || (this.title = this.data.title), _.isUndefined(this.data.has_footer) || (this.has_footer = this.data.has_footer), _.isUndefined(this.data.action_callback) || _.isUndefined(this.data.action_text) || (this.action_callback = this.data.action_callback, this.action_text = this.data.action_text, _.isUndefined(this.data.action_css_class) || (this.action_css_class = this.data.action_css_class)), _.isUndefined(this.data.has_custom_box) || (this.has_custom_box = this.data.has_custom_box)), this.initialize(), this.$popup.find(".sui-box").html(r({ title: this.title }));
                        var a = this,
                            s = function() { return a.close(), !1 };
                        if (o && this.$popup.addClass(o), this.has_custom_box) i.apply(this.$popup.find(".sui-box").get(), n);
                        else {
                            var l = '<div class="sui-box-body"></div>';
                            this.has_footer && (l += '<div class="sui-box-footer"><button class="sui-button powerform-popup-cancel" data-a11y-dialog-hide="powerform-popup">' + Powerform.l10n.popup.cancel + "</button></div>"), this.$popup.find(".sui-box").append(l), i.apply(this.$popup.find(".sui-box-body").get(), n)
                        }
                        if (this.action_text && this.action_callback) {
                            var p = this.action_callback;
                            this.$popup.find(".sui-box-footer").append('<div class="sui-actions-right"><button class="powerform-popup-action sui-button ' + this.action_css_class + '">' + this.action_text + "</button></div>"), this.$popup.find(".powerform-popup-action").on("click", function() { p && p.apply(), a.close() })
                        } else this.$popup.find(".powerform-popup-action").remove();
                        return this.$popup.find(".sui-dialog-close").on("click", s), this.$popup.find(".sui-dialog-overlay").on("click", s), this.$popup.on("click", ".powerform-popup-cancel", s), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new t.Deferred, this._deferred.promise()
                    },
                    close: function(e, i) {
                        var n = t("#powerform-popup");
                        n.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), n.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), setTimeout(function() { n.attr("aria-hidden", "true"), i && i.apply() }, 300), this._deferred.resolve(this.$popup, e)
                    }
                },
                o = {
                    $popup: {},
                    _deferred: {},
                    initialize: function() {
                        var i = Powerform.Utils.template(t(e).find("#popup-new-tpl").html());
                        t("#powerform-popup").length ? (t("#powerform-popup").remove(), this.initialize()) : t("main.sui-wrap").append(i({})), this.$popup = t("#powerform-popup")
                    },
                    open: function(e, i, n) {
                        this.data = i, this.title = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0, this.initialize(), e.apply(this.$popup.find(".sui-box").get(), i);
                        var o = this,
                            r = function() { return o.close(), !1 };
                        return this.$popup.find(".sui-dialog-close").on("click", r), this.$popup.find(".sui-dialog-overlay").on("click", r), this.$popup.on("click", ".powerform-popup-cancel", r), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new t.Deferred, this._deferred.promise()
                    },
                    close: function(e, i) {
                        var n = t("#powerform-popup");
                        n.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), n.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), setTimeout(function() { n.attr("aria-hidden", "true"), i && i.apply() }, 300), this._deferred.resolve(this.$popup, e)
                    }
                },
                r = {
                    $notification: {},
                    _deferred: {},
                    initialize: function() { t("#powerform-notification").length ? (t("#powerform-notification").remove(), this.initialize()) : t("main.sui-wrap").append('<div id="powerform-notification" class="sui-notice-top sui-notice-' + this.type + ' sui-can-dismiss"><div class="sui-notice-content"><p>' + this.text + '</p></div><span class="sui-notice-dismiss"><a role="button" href="#" aria-label="Dismiss" class="sui-icon-check"></a></span></div>'), this.$notification = t("#powerform-notification") },
                    open: function(e, i, n) { var o = this; return this.type = e || "notice", this.text = i, this.initialize(), t(".sui-notice-dismiss a").click(function(t) { return t.preventDefault(), o.close(), !1 }), _.isUndefined(n) || setTimeout(function() { o.close() }, n), this._deferred = new t.Deferred, this._deferred.promise() },
                    close: function(e) {
                        var i = t("#powerform-notification");
                        i.stop().slideUp("slow"), this._deferred.resolve(i, e)
                    }
                };
            return {
                Utils: i,
                Popup: n,
                New_Popup: o,
                Integrations_Popup: {
                    $popup: {},
                    _deferred: {},
                    initialize: function() {
                        var i = Powerform.Utils.template(t(e).find("#popup-integration-tpl").html());
                        t("#powerform-integration-popup").length ? (t("#powerform-integration-popup").remove(), this.initialize()) : t("main.sui-wrap").append(i({ provider_image: "", provider_image2: "", provider_title: "" })), this.$popup = t("#powerform-integration-popup")
                    },
                    open: function(i, n, o) {
                        this.data = n, this.title = "", this.image = "", this.image_x2 = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0, _.isUndefined(this.data) || (_.isUndefined(this.data.title) || (this.title = this.data.title), _.isUndefined(this.data.image) || (this.image = this.data.image), _.isUndefined(this.data.image_x2) || (this.image_x2 = this.data.image_x2)), this.initialize();
                        var r = Powerform.Utils.template(t(e).find("#popup-integration-content-tpl").html());
                        this.$popup.find(".sui-box").html(r({ image: this.image, image_x2: this.image_x2, title: this.title }));
                        var a = this,
                            s = function() { return a.close(), !1 };
                        if (o && this.$popup.addClass(o), i.apply(this.$popup.get(), n), this.action_text && this.action_callback) {
                            var l = this.action_callback;
                            this.$popup.find(".sui-box-footer").append('<div class="sui-actions-right"><button class="powerform-popup-action sui-button ' + this.action_css_class + '">' + this.action_text + "</button></div>"), this.$popup.find(".powerform-popup-action").on("click", function() { l && l.apply(), a.close() })
                        } else this.$popup.find(".powerform-popup-action").remove();
                        return this.$popup.find(".sui-dialog-close").on("click", s), this.$popup.find(".sui-dialog-overlay").on("click", s), this.$popup.on("click", ".powerform-popup-cancel", s), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), t("body").css("overflow", "hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new t.Deferred, this._deferred.promise()
                    },
                    close: function(e, i) {
                        var n = t("#powerform-integration-popup");
                        n.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), n.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), t("body").css("overflow", "auto"), Powerform.Events.trigger("powerform:addons:reload"), setTimeout(function() { n.attr("aria-hidden", "true"), i && i.apply() }, 300), this._deferred.resolve(this.$popup, e)
                    }
                },
                Stripe_Popup: {
                    $popup: {},
                    _deferred: {},
                    initialize: function() {
                        var i = Powerform.Utils.template(t(e).find("#popup-stripe-tpl").html());
                        t("#powerform-stripe-popup").length ? (t("#powerform-stripe-popup").remove(), this.initialize()) : t("main.sui-wrap").append(i({ provider_image: "", provider_image2: "", provider_title: "" })), this.$popup = t("#powerform-stripe-popup")
                    },
                    open: function(i, n, o) {
                        this.data = n, this.title = "", this.image = "", this.image_x2 = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0, _.isUndefined(this.data) || (_.isUndefined(this.data.title) || (this.title = this.data.title), _.isUndefined(this.data.image) || (this.image = this.data.image), _.isUndefined(this.data.image_x2) || (this.image_x2 = this.data.image_x2)), this.initialize();
                        var r = Powerform.Utils.template(t(e).find("#popup-stripe-content-tpl").html());
                        this.$popup.find(".sui-box").html(r({ image: this.image, image_x2: this.image_x2, title: this.title })), this.$popup.find(".sui-box-footer").css({ "padding-top": "0" });
                        var a = this,
                            s = function() { return a.close(), !1 };
                        if (o && this.$popup.addClass(o), i.apply(this.$popup.get(), n), this.action_text && this.action_callback) {
                            var l = this.action_callback;
                            this.$popup.find(".sui-box-footer").append('<div class="sui-actions-right"><button class="powerform-popup-action sui-button ' + this.action_css_class + '">' + this.action_text + "</button></div>"), this.$popup.find(".powerform-popup-action").on("click", function() { l && l.apply(), a.close() })
                        } else this.$popup.find(".powerform-popup-action").remove();
                        return this.$popup.find(".sui-dialog-close").on("click", s), this.$popup.find(".sui-dialog-overlay").on("click", s), this.$popup.on("click", ".powerform-popup-cancel", s), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), t("body").css("overflow", "hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new t.Deferred, this._deferred.promise()
                    },
                    close: function(e, i) {
                        var n = t("#powerform-stripe-popup");
                        n.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), n.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), t("body").css("overflow", "auto"), setTimeout(function() { n.attr("aria-hidden", "true"), i && i.apply() }, 300), this._deferred.resolve(this.$popup, e)
                    }
                },
                Notification: r
            }
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/dashboard", [], function(e) {
            return new(Backbone.View.extend({
                el: ".psource-dashboard-section",
                events: { "click .psource-action-close": "dismiss_welcome" },
                initialize: function() {
                    var e = Powerform.Utils.get_url_param("notification"),
                        i = Powerform.Utils.get_url_param("title"),
                        n = Powerform.Utils.get_url_param("createnew");
                    if (setTimeout(function() { t(".powerform-scroll-to").length && t("html, body").animate({ scrollTop: t(".powerform-scroll-to").offset().top }, "slow") }, 100), e) {
                        var o = _.template("<strong>{{ formName }}</strong> {{ Powerform.l10n.options.been_published }}");
                        Powerform.Notification.open("success", o({ formName: Powerform.Utils.sanitize_uri_string(i) }), 4e3)
                    }
                    return n && setTimeout(function() { jQuery(".powerform-create-" + n).click() }, 200), this.render()
                },
                dismiss_welcome: function(e) {
                    e.preventDefault();
                    var i = t(e.target).closest(".sui-box"),
                        n = t(e.target).data("nonce");
                    i.slideToggle(300, function() { t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: { action: "powerform_dismiss_welcome", _ajax_nonce: n }, complete: function(t) { i.remove() } }) })
                },
                render: function() { setTimeout(function() { void 0 !== SUI.dialogs && void 0 !== SUI.dialogs["powerform-new-feature"] && SUI.dialogs["powerform-new-feature"].show() }, 1e3) }
            }))
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/settings-page", [], function() {
            var e = Backbone.View.extend({
                    el: ".psource-powerform-powerform-settings",
                    events: { "click .sui-side-tabs label.sui-tab-item input": "sidetabs", "click .sui-sidenav .sui-vertical-tab a": "sidenav", "change .sui-sidenav select.sui-mobile-nav": "sidenav_select", "click .stripe-connect-modal": "open_stripe_connect_modal", "click .paypal-connect-modal": "open_paypal_connect_modal", "click .powerform-stripe-connect": "connect_stripe", "click .disconnect_stripe": "disconnect_stripe", "click .powerform-paypal-connect": "connect_paypal", "click .disconnect_paypal": "disconnect_paypal", "click button.sui-tab-item": "buttonTabs", "click .powerform-toggle-unsupported-settings": "show_unsupported_settings", "click .powerform-dismiss-unsupported": "hide_unsupported_settings" },
                    initialize: function() {
                        var e = this;
                        if (t(".psource-powerform-powerform-settings").length) {
                            this.$el.find(".powerform-settings-save").submit(function(i) {
                                i.preventDefault();
                                var n = t(this),
                                    o = n.find(".psource-action-done").data("nonce"),
                                    r = n.find(".psource-action-done").data("action"),
                                    a = n.find(".psource-action-done").data("title"),
                                    s = n.find(".psource-action-done").data("isReload");
                                e.submitForm(t(this), r, o, a, s)
                            });
                            var i = window.location.hash;
                            _.isUndefined(i) || _.isEmpty(i) || this.sidenav_go_to(i.substring(1), !0), this.render("v2"), this.render("v2-invisible"), this.render("v3")
                        }
                    },
                    render: function(e) {
                        var i = this.$el.find("#" + e + "-recaptcha-preview");
                        i.html('<p class="fui-loading-dialog"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>'), t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: { action: "powerform_load_recaptcha_preview", captcha: e } }).done(function(t) { t.success && i.html(t.data) })
                    },
                    submitForm: function(e, i, n, o, r) {
                        var a = {},
                            s = this;
                        a.action = "powerform_save_" + i + "_popup", a._ajax_nonce = n;
                        var l = e.serialize() + "&" + t.param(a);
                        t.ajax({
                            url: Powerform.Data.ajaxUrl,
                            type: "POST",
                            data: l,
                            beforeSend: function() { e.find(".sui-button").addClass("sui-button-onload") },
                            success: function(t) {
                                var e = _.template("<strong>{{ tab }}</strong> {{ Powerform.l10n.commons.update_successfully }}");
                                Powerform.Notification.open("success", e({ tab: o }), 4e3), "captcha" === i && (s.render("v2"), s.render("v2-invisible"), s.render("v3")), r && window.location.reload()
                            },
                            error: function(t) { Powerform.Notification.open("error", Powerform.l10n.commons.update_unsuccessfull, 4e3) }
                        }).always(function() { e.find(".sui-button").removeClass("sui-button-onload") })
                    },
                    sidetabs: function(t) {
                        var e = this.$(t.target),
                            i = e.parent("label"),
                            n = e.data("tab-menu"),
                            o = e.closest(".sui-side-tabs"),
                            r = o.find(".sui-tabs-menu .sui-tab-item"),
                            a = r.find("input");
                        e.is("input") && (r.removeClass("active"), a.removeAttr("checked"), o.find(".sui-tabs-content > div").removeClass("active"), i.addClass("active"), e.prop("checked", "checked"), o.find('.sui-tabs-content div[data-tab-content="' + n + '"]').length && o.find('.sui-tabs-content div[data-tab-content="' + n + '"]').addClass("active"))
                    },
                    sidenav: function(e) {
                        var i = t(e.target).data("nav");
                        i && this.sidenav_go_to(i, !0), e.preventDefault()
                    },
                    sidenav_select: function(e) {
                        var i = t(e.target).val();
                        i && this.sidenav_go_to(i, !0), e.preventDefault()
                    },
                    sidenav_go_to: function(t, e) {
                        var i = this.$el.find('a[data-nav="' + t + '"]'),
                            n = i.closest(".sui-vertical-tabs"),
                            o = n.find(".sui-vertical-tab"),
                            r = this.$el.find(".sui-box[data-nav]"),
                            a = this.$el.find('.sui-box[data-nav="' + t + '"]');
                        e && history.pushState({ selected_tab: t }, "Global Settings", "admin.php?page=powerform-settings&section=" + t), o.removeClass("current"), r.hide(), i.parent().addClass("current"), a.show()
                    },
                    open_stripe_connect_modal: function(e) {
                        e.preventDefault();
                        var i = this,
                            n = t(e.target),
                            o = n.data("modalImage"),
                            r = n.data("modalImageX2"),
                            a = n.data("modalTitle"),
                            s = n.data("modalNonce");
                        return Powerform.Stripe_Popup.open(function() {
                            var e = t(this);
                            i.render_stripe_connect_modal_content(e, "small", s, {})
                        }, { title: a, image: o, image_x2: r }), !1
                    },
                    render_stripe_connect_modal_content: function(e, i, n, o) {
                        var r = this;
                        o.action = "powerform_stripe_settings_modal", o._ajax_nonce = n, t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: o }).done(function(o) {
                            if (o && o.success) {
                                e.find(".sui-box-header h3.sui-box-title").show(), e.find(".sui-box-body").html(o.data.html);
                                var a = o.data.buttons;
                                if (e.find(".sui-box-footer").html(""), _.each(a, function(t) { e.find(".sui-box-footer").append(t.markup) }), e.find(".sui-button").removeClass("sui-button-onload"), !_.isUndefined(i)) { var s = t("#powerform-stripe-popup"); "normal" === i && s.removeClass("sui-dialog-sm sui-dialog-lg"), "small" === i && (s.addClass("sui-dialog-sm"), s.removeClass("sui-dialog-lg")), "large" === i && (s.addClass("sui-dialog-lg"), s.removeClass("sui-dialog-sm")) }
                                _.isUndefined(o.data.notification) || _.isUndefined(o.data.notification.type) || _.isUndefined(o.data.notification.text) || _.isUndefined(o.data.notification.duration) || (Powerform.Notification.open(o.data.notification.type, o.data.notification.text, o.data.notification.duration).done(function() {}), r.update_stripe_page(n))
                            }
                        })
                    },
                    update_stripe_page: function(e) {
                        var i = { action: "powerform_stripe_update_page", _ajax_nonce: e };
                        t.post({ url: Powerform.Data.ajaxUrl, type: "get", data: i }).done(function(t) { jQuery("#sui-box-stripe").html(t.data), Powerform.Utils.sui_delegate_events(), Powerform.Stripe_Popup.close() })
                    },
                    show_unsupported_settings: function(e) { e.preventDefault(), t(".powerform-unsupported-settings").show() },
                    hide_unsupported_settings: function(e) { e.preventDefault(), t(".powerform-unsupported-settings").hide() },
                    connect_stripe: function(e) {
                        e.preventDefault();
                        var i = t(e.target);
                        i.addClass("sui-button-onload");
                        var n = i.data("nonce"),
                            o = this.$el.find("#powerform-stripe-popup"),
                            r = o.find("form"),
                            a = r.serializeArray(),
                            s = {};
                        return t.map(a, function(t, e) { s[t.name] = t.value }), s.connect = !0, this.render_stripe_connect_modal_content(o, "small", n, s), !1
                    },
                    buttonTabs: function(t) {
                        var e = this.$(t.target),
                            i = e.closest(".sui-tabs"),
                            n = i.find(".sui-tabs-menu .sui-tab-item"),
                            o = i.find(".sui-tabs-content .sui-tab-content");
                        e.is("button") && (n.removeClass("active"), n.attr("tabindex", "-1"), o.attr("hidden", !0), o.removeClass("active"), e.removeAttr("tabindex"), e.addClass("active"), i.find("#" + e.attr("aria-controls")).addClass("active"), i.find("#" + e.attr("aria-controls")).attr("hidden", !1), i.find("#" + e.attr("aria-controls")).removeAttr("hidden")), t.preventDefault()
                    },
                    open_paypal_connect_modal: function(e) {
                        e.preventDefault();
                        var i = this,
                            n = t(e.target),
                            o = n.data("modalImage"),
                            r = n.data("modalImageX2"),
                            a = n.data("modalTitle"),
                            s = n.data("modalNonce");
                        return Powerform.Stripe_Popup.open(function() {
                            var e = t(this);
                            i.render_paypal_connect_modal_content(e, "small", s, {})
                        }, { title: a, image: o, image_x2: r }), !1
                    },
                    render_paypal_connect_modal_content: function(e, i, n, o) {
                        var r = this;
                        o.action = "powerform_paypal_settings_modal", o._ajax_nonce = n, t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: o }).done(function(o) {
                            if (o && o.success) {
                                e.find(".sui-box-header h3.sui-box-title").show(), e.find(".sui-box-body").html(o.data.html);
                                var a = o.data.buttons;
                                if (e.find(".sui-box-footer").html(""), _.each(a, function(t) { e.find(".sui-box-footer").append(t.markup) }), e.find(".sui-button").removeClass("sui-button-onload"), !_.isUndefined(i)) { var s = t("#powerform-paypal-popup"); "normal" === i && s.removeClass("sui-dialog-sm sui-dialog-lg"), "small" === i && (s.addClass("sui-dialog-sm"), s.removeClass("sui-dialog-lg")), "large" === i && (s.addClass("sui-dialog-lg"), s.removeClass("sui-dialog-sm")) }
                                _.isUndefined(o.data.notification) || _.isUndefined(o.data.notification.type) || _.isUndefined(o.data.notification.text) || _.isUndefined(o.data.notification.duration) || (Powerform.Notification.open(o.data.notification.type, o.data.notification.text, o.data.notification.duration).done(function() {}), r.update_paypal_page(n))
                            }
                        })
                    },
                    update_paypal_page: function(e) {
                        var i = { action: "powerform_paypal_update_page", _ajax_nonce: e };
                        t.post({ url: Powerform.Data.ajaxUrl, type: "get", data: i }).done(function(t) { jQuery("#sui-box-paypal").html(t.data), Powerform.Utils.sui_delegate_events(), Powerform.Stripe_Popup.close() })
                    },
                    connect_paypal: function(e) {
                        e.preventDefault();
                        var i = t(e.target);
                        i.addClass("sui-button-onload");
                        var n = i.data("nonce"),
                            o = this.$el.find("#powerform-stripe-popup"),
                            r = o.find("form"),
                            a = r.serializeArray(),
                            s = {};
                        return t.map(a, function(t, e) { s[t.name] = t.value }), s.connect = !0, this.render_paypal_connect_modal_content(o, "small", n, s), !1
                    },
                    disconnect_stripe: function(e) {
                        var i = t(e.target),
                            n = { action: "powerform_disconnect_stripe", _ajax_nonce: i.data("nonce") };
                        i.addClass("sui-button-onload"), t.post({ url: Powerform.Data.ajaxUrl, type: "get", data: n }).done(function(t) { jQuery("#sui-box-stripe").html(t.data.html), Powerform.Utils.sui_delegate_events(), Powerform.Popup.close(), _.isUndefined(t.data.notification) || _.isUndefined(t.data.notification.type) || _.isUndefined(t.data.notification.text) || _.isUndefined(t.data.notification.duration) || Powerform.Notification.open(t.data.notification.type, t.data.notification.text, t.data.notification.duration).done(function() {}) })
                    },
                    disconnect_paypal: function(e) {
                        var i = t(e.target),
                            n = { action: "powerform_disconnect_paypal", _ajax_nonce: i.data("nonce") };
                        i.addClass("sui-button-onload"), t.post({ url: Powerform.Data.ajaxUrl, type: "get", data: n }).done(function(t) { jQuery("#sui-box-paypal").html(t.data.html), Powerform.Utils.sui_delegate_events(), Powerform.Popup.close(), _.isUndefined(t.data.notification) || _.isUndefined(t.data.notification.type) || _.isUndefined(t.data.notification.text) || _.isUndefined(t.data.notification.duration) || Powerform.Notification.open(t.data.notification.type, t.data.notification.text, t.data.notification.duration).done(function() {}) })
                    }
                }),
                e = new e;
            return e
        })
    }(jQuery);
var powerform_render_admin_captcha = function() {
        setTimeout(function() {
            var t = jQuery(".powerform-g-recaptcha"),
                e = t.data("sitekey"),
                i = t.data("theme"),
                n = t.data("size");
            window.grecaptcha.render(t[0], { sitekey: e, theme: i, size: n })
        }, 100)
    },
    powerform_render_admin_captcha_v2 = function() {
        setTimeout(function() {
            var t = jQuery(".powerform-g-recaptcha-v2"),
                e = t.data("sitekey"),
                i = t.data("theme"),
                n = t.data("size");
            window.grecaptcha.render(t[0], { sitekey: e, theme: i, size: n })
        }, 100)
    },
    powerform_render_admin_captcha_v2_invisible = function() {
        setTimeout(function() {
            var t = jQuery(".powerform-g-recaptcha-v2-invisible"),
                e = t.data("sitekey"),
                i = t.data("theme"),
                n = t.data("size");
            window.grecaptcha.render(t[0], { sitekey: e, theme: i, size: n, badge: "inline" })
        }, 100)
    },
    powerform_render_admin_captcha_v3 = function() {
        setTimeout(function() {
            var t = jQuery(".powerform-g-recaptcha-v3"),
                e = t.data("sitekey"),
                i = t.data("theme"),
                n = t.data("size");
            window.grecaptcha.render(t[0], { sitekey: e, theme: i, size: n, badge: "inline" })
        }, 100)
    };
formintorjs.define("text!tpl/dashboard.html", [], function() {
        return '<div>\r\n\r\n\t<script type="text/template" id="powerform-new-form-content-tpl">\r\n\t\t<p><small>{{ Powerform.l10n.popup.new_form_desc2 }}</small></p>\r\n\t\t<div class="sui-notice" id="powerform-template-register-notice" style="display: none;">\r\n\t\t\t<p>{{ Powerform.l10n.popup.registration_notice }}</p>\r\n\t\t</div>\r\n\t\t<div class="sui-notice" id="powerform-template-login-notice" style="display: none;">\r\n\t\t\t<p>{{ Powerform.l10n.popup.login_notice }}</p>\r\n\t\t</div>\r\n\t\t<div id="powerform-form-name-input" class="sui-form-field">\r\n\r\n\t\t\t<label for="powerform-form-name" class="sui-screen-reader-text">{{ Powerform.l10n.popup.input_label }}</label>\r\n\t\t\t<input type="text"\r\n\t\t\t       id="powerform-form-name"\r\n\t\t\t       class="sui-form-control fui-required"\r\n\t\t\t       placeholder="{{Powerform.l10n.popup.new_form_placeholder}}" autofocus>\r\n\t\t\t<span class="sui-error-message" style="display: none;">{{Powerform.l10n.popup.form_name_validation}}</span>\r\n\r\n\t\t</div>\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-new-poll-content-tpl">\r\n\t\t<p><small>{{ Powerform.l10n.popup.new_poll_desc2 }}</small></p>\r\n\r\n\t\t<div id="powerform-form-name-input" class="sui-form-field">\r\n\r\n\t\t\t<label for="powerform-form-name" class="sui-screen-reader-text">{{ Powerform.l10n.popup.input_label }}</label>\r\n\t\t\t<input type="text"\r\n\t\t\t       id="powerform-form-name"\r\n\t\t\t       class="sui-form-control fui-required"\r\n\t\t\t       placeholder="{{Powerform.l10n.popup.new_poll_placeholder}}" autofocus>\r\n\t\t\t<span class="sui-error-message" style="display: none;">{{Powerform.l10n.popup.poll_name_validation}}</span>\r\n\r\n\t\t</div>\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-new-quiz-content-tpl">\r\n\r\n\t\t<p><small>{{ Powerform.l10n.popup.new_quiz_desc2 }}\r\n\t\t\t{[ if( Powerform.Data.showDocLink ) { ]}\r\n\t\t\t<a href="https://n3rds.work/docs/wpmu-dev-plugins/powerform/?utm_source=powerform&utm_medium=plugin&utm_campaign=capture_leads_learnmore_link#leads" target="_blank">\r\n\t\t\t\t{{ Powerform.l10n.popup.learn_more }}\r\n\t\t\t</a>\r\n\t\t\t{[ } ]}\r\n\t\t</small></p>\r\n\r\n\t\t<div class="sui-form-field" style="margin-bottom: 0;">\r\n\r\n\t\t\t<label for="powerform-new-quiz-leads" class="sui-toggle fui-highlighted-toggle">\r\n\r\n\t\t\t\t<input\r\n\t\t\t\t\ttype="checkbox"\r\n\t\t\t\t\tid="powerform-new-quiz-leads"\r\n\t\t\t\t\taria-labelledby="powerform-new-quiz-leads-label"\r\n\t\t\t\t/>\r\n\r\n\t\t\t\t<span class="sui-toggle-slider" aria-hidden="true"></span>\r\n\r\n\t\t\t\t<span id="powerform-new-quiz-leads-label" class="sui-toggle-label">{{ Powerform.l10n.quiz.quiz_leads_toggle }}</span>\r\n\r\n\t\t\t</label>\r\n\r\n\t\t\t<div id="sui-quiz-leads-description" class="sui-notice sui-notice-info" style="display: none; margin-top: 30px;">\r\n\t\t\t\t<p>{{ Powerform.l10n.quiz.quiz_leads_desc }}</p>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-new-form-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle">{{ Powerform.l10n.popup.enter_name }}</h3>\r\n\r\n\t\t\t<button class="sui-dialog-close powerform-cancel-create-form" data-a11y-dialog-hide aria-label="Close this dialog window"></button>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body sui-box-body-slim sui-block-content-center">\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer sui-box-footer-right" style="padding-top: 0;">\r\n\r\n\t\t\t<button id="powerform-build-your-form" class="sui-button sui-button-blue">\r\n\t\t\t\t<span class="sui-loading-text"><i class="sui-icon-plus" aria-hidden="true"></i> {{Powerform.l10n.popup.create}}</span>\r\n\t\t\t\t<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>\r\n\t\t\t</button>\r\n\r\n\t\t</div>\r\n\r\n\t\t{[ if( Powerform.Data.showBranding ) { ]}\r\n\t\t<img src="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png"\r\n\t\t     srcset="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png 1x, {{ Powerform.Data.imagesUrl }}/powerform-create-modal@2x.png 2x"\r\n\t\t     class="sui-image sui-image-center"\r\n\t\t     aria-hidden="true"\r\n\t\t     alt="Powerform">\r\n\t\t{[ } ]}\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-new-quiz-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle">{{ Powerform.l10n.quiz.collect_leads }}</h3>\r\n\r\n\t\t\t<button class="sui-dialog-close powerform-cancel-create-form" data-a11y-dialog-hide aria-label="Close this dialog window"></button>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body sui-box-body-slim sui-block-content-center">\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer sui-box-footer-right" style="padding-top: 0;">\r\n\r\n\t\t\t<button id="powerform-build-your-form" class="sui-button sui-button-blue">\r\n\t\t\t\t<span class="sui-loading-text"><i class="sui-icon-plus" aria-hidden="true"></i> {{ Powerform.l10n.quiz.create_quiz }}</span>\r\n\t\t\t\t<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>\r\n\t\t\t</button>\r\n\r\n\t\t</div>\r\n\r\n\t\t{[ if( Powerform.Data.showBranding ) { ]}\r\n\t\t<img src="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png"\r\n\t\t     srcset="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png 1x, {{ Powerform.Data.imagesUrl }}/powerform-create-modal@2x.png 2x"\r\n\t\t     class="sui-image sui-image-center"\r\n\t\t     aria-hidden="true"\r\n\t\t     alt="Powerform">\r\n\t\t{[ } ]}\r\n\r\n\t<\/script>\r\n\r\n    <script type="text/template" id="powerform-login-popup-tpl">\r\n\r\n        <div class="psource-row">\r\n\r\n            <div class="psource-col col-12 col-sm-6">\r\n\r\n                <a class="psource-popup--logreg" href="{{ loginUrl }}">\r\n\r\n                    <div class="psource-logreg--header">\r\n\r\n                        <span class="wpdui-icon wpdui-icon-key"></span>\r\n\r\n                        <h3 class="psource-logreg--title">{{ Powerform.l10n.login.login_label }}</h3>\r\n\r\n                    </div>\r\n\r\n                    <div class="psource-logreg--section">\r\n\r\n                        <p class="psource-logreg--description">{{ Powerform.l10n.login.login_description }}</p>\r\n\r\n                        <div class="psource-logreg--image">\r\n                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\r\n                                 width="110" height="140" viewBox="0 0 110 140" preserveAspectRatio="none"\r\n                                 class="psource-svg-login">\r\n                                <defs>\r\n                                    <path id="b" d="M0 40h100v94H0z"/>\r\n                                    <filter id="a" width="116%" height="117%" x="-8%" y="-7.4%"\r\n                                            filterUnits="objectBoundingBox">\r\n                                        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"/>\r\n                                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"\r\n                                                        stdDeviation="2.5"/>\r\n                                        <feColorMatrix in="shadowBlurOuter1"\r\n                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>\r\n                                    </filter>\r\n                                    <path id="c" d="M10 112h6v6h-6z"/>\r\n                                    <path id="d" d="M10 90h80v15H10z"/>\r\n                                    <path id="e" d="M10 60h80v15H10z"/>\r\n                                </defs>\r\n                                <g fill="none" fill-rule="evenodd" transform="translate(5)">\r\n                                    <use fill="#000" filter="url(#a)" xlink:href="#b"/>\r\n                                    <use fill="#FFF" xlink:href="#b"/>\r\n                                    <rect width="22" height="12" x="68" y="112" fill="#0472AC" rx="3"/>\r\n                                    <path fill="#808285" d="M19 114h26v2H19z"/>\r\n                                    <use fill="#FBFBFB" xlink:href="#c"/>\r\n                                    <path stroke="#E1E1E1" d="M10.5 112.5h5v5h-5z"/>\r\n                                    <use fill="#FBFBFB" xlink:href="#d"/>\r\n                                    <path stroke="#E1E1E1" d="M10.5 90.5h79v14h-79z"/>\r\n                                    <path fill="#808285" d="M10 85h26v2H10z"/>\r\n                                    <use fill="#FBFBFB" xlink:href="#e"/>\r\n                                    <path stroke="#E1E1E1" d="M10.5 60.5h79v14h-79z"/>\r\n                                    <path fill="#808285" d="M10 55h50v2H10z"/>\r\n                                    <circle cx="50" cy="15" r="15" fill="#0272AC"/>\r\n                                </g>\r\n                            </svg>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </a>\r\n\r\n            </div>\r\n\r\n            <div class="psource-col col-12 col-sm-6">\r\n\r\n                <a class="psource-popup--logreg" href="{{ registerUrl }}">\r\n\r\n                    <div class="psource-logreg--header">\r\n\r\n                        <span class="wpdui-icon wpdui-icon-profile-female"></span>\r\n\r\n                        <h3 class="psource-logreg--title">{{ Powerform.l10n.login.registration_label }}</h3>\r\n\r\n                    </div>\r\n\r\n                    <div class="psource-logreg--section">\r\n\r\n                        <p class="psource-logreg--description">{{ Powerform.l10n.login.registration_description }}</p>\r\n\r\n                        <div class="psource-logreg--image">\r\n                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\r\n                                 width="183" height="97" viewBox="0 0 183 97" preserveAspectRatio="none"\r\n                                 class="psource-svg-registration">\r\n                                <defs>\r\n                                    <path id="a" d="M0 58h183v15H0z"/>\r\n                                    <path id="b" d="M0 23h183v15H0z"/>\r\n                                </defs>\r\n                                <g fill="none" fill-rule="evenodd">\r\n                                    <rect width="50" height="14" y="83" fill="#353535" rx="3"/>\r\n                                    <path fill="#FBFBFB" stroke="#E1E1E1" d="M.5 58.5h182v14H.5z"/>\r\n                                    <path fill="#808285" d="M0 51h40v2H0z"/>\r\n                                    <path fill="#FBFBFB" stroke="#E1E1E1" d="M.5 23.5h182v14H.5z"/>\r\n                                    <path fill="#808285" d="M0 16h40v2H0z"/>\r\n                                    <path fill="#353535" d="M0 0h120v6H0z"/>\r\n                                </g>\r\n                            </svg>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </a>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    <\/script>\r\n\r\n\t<script type="text/template" id="powerform-quizzes-popup-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle">{{ Powerform.l10n.quiz.choose_quiz_title }}</h3>\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button data-a11y-dialog-hide="" class="sui-dialog-close" aria-label=""></button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body" style="padding-top: 10px; padding-bottom: 5px;">\r\n\r\n\t\t\t<p class="sui-description sui-block-content-center">{{ Powerform.l10n.quiz.choose_quiz_description }}</p>\r\n\r\n\t\t\t<div id="powerform-form-name-input" class="sui-form-field">\r\n\r\n\t\t\t\t<label for="powerform-form-name" class="sui-label">{{ Powerform.l10n.quiz.quiz_name }}</label>\r\n\r\n\t\t\t\t<input\r\n\t\t\t\t\ttype="text"\r\n\t\t\t\t\tid="powerform-form-name"\r\n\t\t\t\t\tclass="sui-form-control"\r\n\t\t\t\t\tplaceholder="{{Powerform.l10n.popup.new_quiz_placeholder}}"\r\n\t\t\t\t\tautofocus\r\n\t\t\t\t/>\r\n\r\n\t\t\t\t<div id="sui-quiz-name-error" class="sui-notice sui-notice-error powerform-validate-answers" style="display: none;">\r\n\t\t\t\t\t <p>{{Powerform.l10n.popup.quiz_name_validation}}</p>\r\n\t\t\t\t </div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<label class="sui-label">{{ Powerform.l10n.quiz.quiz_type }}</label>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-selectors">\r\n\r\n\t\t\t<ul>\r\n\r\n\t\t\t\t<li><label for="powerform-new-quiz--knowledge" class="sui-box-selector">\r\n\t\t\t\t\t<input\r\n\t\t\t\t\t\ttype="radio"\r\n\t\t\t\t\t\tname="powerform-new-quiz"\r\n\t\t\t\t\t\tid="powerform-new-quiz--knowledge"\r\n\t\t\t\t\t\tclass="powerform-new-quiz-type"\r\n\t\t\t\t\t\tvalue="knowledge"\r\n\t\t\t\t\t\tchecked="checked"\r\n\t\t\t\t\t/>\r\n\t\t\t\t\t<span>\r\n\t\t\t\t\t\t<i class="sui-icon-academy" aria-hidden="true"></i>\r\n\t\t\t\t\t\t{{ Powerform.l10n.quiz.knowledge_label }}\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<span>{{ Powerform.l10n.quiz.knowledge_description }}</span>\r\n\t\t\t\t</label></li>\r\n\r\n\t\t\t\t<li><label for="powerform-new-quiz--nowrong" class="sui-box-selector">\r\n\t\t\t\t\t<input\r\n\t\t\t\t\t\ttype="radio"\r\n\t\t\t\t\t\tname="powerform-new-quiz"\r\n\t\t\t\t\t\tid="powerform-new-quiz--nowrong"\r\n\t\t\t\t\t\tclass="powerform-new-quiz-type"\r\n\t\t\t\t\t\tvalue="nowrong"\r\n\t\t\t\t\t/>\r\n\t\t\t\t\t<span>\r\n\t\t\t\t\t\t<i class="sui-icon-community-people" aria-hidden="true"></i>\r\n\t\t\t\t\t\t{{ Powerform.l10n.quiz.nowrong_label }}\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<span>{{ Powerform.l10n.quiz.nowrong_description }}</span>\r\n\t\t\t\t</label></li>\r\n\r\n\t\t\t</ul>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button class="sui-button select-quiz-template">\r\n\t\t\t\t\t<span class="sui-loading-text">{{ Powerform.l10n.quiz.continue_button }}</span>\r\n\t\t\t\t\t<i class="sui-icon-load sui-loading" aria-hidden="true"></i>\r\n\t\t\t\t</button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t{[ if( Powerform.Data.showBranding ) { ]}\r\n\t\t<img src="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png"\r\n\t\t     srcset="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png 1x, {{ Powerform.Data.imagesUrl }}/powerform-create-modal@2x.png 2x"\r\n\t\t     class="sui-image sui-image-center"\r\n\t\t     aria-hidden="true"\r\n\t\t     alt="Powerform">\r\n\t\t{[ } ]}\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-form-popup-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle">{{ Powerform.l10n.form.form_template_title }}</h3>\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button data-a11y-dialog-hide="" class="sui-dialog-close" aria-label=""></button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body sui-block-content-center" style="padding-top: 10px;">\r\n\r\n\t\t\t<p class="sui-description">{{ Powerform.l10n.form.form_template_description }}</p>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-selectors sui-box-selectors-col-2">\r\n\r\n\t\t\t<ul>\r\n\r\n\t\t\t\t{[ _.each(templates, function(template){ ]}\r\n\r\n\t\t\t\t\t{[ if( template.options.id !== \'leads\' ) { ]}\r\n\r\n\t\t\t\t\t\t<li>\r\n\r\n\t\t\t\t\t\t\t<label for="powerform-new-quiz--{{ template.options.id }}" class="sui-box-selector">\r\n\r\n\t\t\t\t\t\t\t\t<input\r\n\t\t\t\t\t\t\t\t\t\ttype="radio"\r\n\t\t\t\t\t\t\t\t\t\tname="powerform-form-template"\r\n\t\t\t\t\t\t\t\t\t\tid="powerform-new-quiz--{{ template.options.id }}"\r\n\t\t\t\t\t\t\t\t\t\tclass="powerform-new-form-type"\r\n\t\t\t\t\t\t\t\t\t\tvalue="{{ template.options.id }}"\r\n\t\t\t\t\t\t\t\t\t\t{[ if( template.options.id === \'blank\' ) { ]}\r\n\t\t\t\t\t\t\t\t\t\tchecked="checked"\r\n\t\t\t\t\t\t\t\t\t\t{[ } ]}\r\n\t\t\t\t\t\t\t\t/>\r\n\r\n\t\t\t\t\t\t\t\t<span>\r\n\t\t\t\t\t\t\t\t\t<i class="sui-icon-{{template.options.icon}}" aria-hidden="true"></i>\r\n\t\t\t\t\t\t\t\t\t{{ template.options.name }}\r\n\t\t\t\t\t\t\t\t</span>\r\n\r\n\t\t\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t\t</li>\r\n\r\n\t\t\t\t\t{[ } ]}\r\n\r\n\t\t\t\t{[ }); ]}\r\n\r\n\t\t\t</ul>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button class="sui-button select-quiz-template">\r\n\t\t\t\t\t<span class="sui-loading-text">{{ Powerform.l10n.quiz.continue_button }}</span>\r\n\t\t\t\t\t<i class="sui-icon-load sui-loading" aria-hidden="true"></i>\r\n\t\t\t\t</button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t\t{[ if( Powerform.Data.showBranding ) { ]}\r\n\t\t<img src="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png"\r\n\t\t     srcset="{{ Powerform.Data.imagesUrl }}/powerform-create-modal.png 1x, {{ Powerform.Data.imagesUrl }}/powerform-create-modal@2x.png 2x"\r\n\t\t     class="sui-image sui-image-center"\r\n\t\t     aria-hidden="true"\r\n\t\t     alt="Powerform">\r\n\t\t{[ } ]}\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-exports-schedule-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\r\n\t\t\t<div class="sui-box-settings-row">\r\n\r\n\t\t\t\t<div class="sui-box-settings-col-2">\r\n\r\n\t\t\t\t\t<span class="sui-settings-label sui-dark">{{ Powerform.l10n.popup.manual_exports }}</span>\r\n\t\t\t\t\t<span class="sui-description">{{ Powerform.l10n.popup.manual_description }}</span>\r\n\r\n\t\t\t\t\t<form method="post" style="margin-top: 10px;">\r\n\r\n\t\t\t\t\t\t<input type="hidden" name="powerform_export" value="1" />\r\n\t\t\t\t\t\t<input type="hidden" name="form_id" value="{{ Powerform.l10n.exporter.form_id }}" />\r\n\t\t\t\t\t\t<input type="hidden" name="form_type" value="{{ Powerform.l10n.exporter.form_type }}" />\r\n\t\t\t\t\t\t<input type="hidden" name="_powerform_nonce" value="{{ Powerform.l10n.exporter.export_nonce }}" />\r\n\r\n\t\t\t\t\t\t<button class="sui-button sui-button-ghost">{{ Powerform.l10n.popup.download_csv }}</button>\r\n\r\n\t\t\t\t\t\t{[ if( \'cform\' === Powerform.l10n.exporter.form_type || \'quiz\' === Powerform.l10n.exporter.form_type ) { ]}\r\n\t\t\t\t\t\t\t<label for="apply-submission-filter" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked" style="margin-top: 20px;">\r\n\t\t\t\t\t\t\t\t<input type="checkbox" name="submission-filter" id="apply-submission-filter" value="yes" />\r\n\t\t\t\t\t\t\t\t<span aria-hidden="true"></span>\r\n\t\t\t\t\t\t\t\t<span>{{ Powerform.l10n.popup.apply_submission_filter }}</span>\r\n\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t{[ } ]}\r\n\r\n\t\t\t\t\t</form>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<form method="post" class="sui-box-settings-row schedule-action">\r\n\r\n\t\t\t\t<div class="sui-box-settings-col-2">\r\n\r\n\t\t\t\t\t<span class="sui-settings-label sui-dark">{{ Powerform.l10n.popup.scheduled_exports }}</span>\r\n\t\t\t\t\t<span class="sui-description">{{ Powerform.l10n.popup.scheduled_description }}</span>\r\n\r\n\t\t\t\t\t<div class="sui-side-tabs" style="margin-top: 10px;">\r\n\r\n\t\t\t\t\t\t<div class="sui-tabs-menu tab-labels">\r\n\r\n\t\t\t\t\t\t\t<label for="powerform-disable-scheduled-exports" class="sui-tab-item tab-label-disable">\r\n\t\t\t\t\t\t\t\t<input\r\n\t\t\t\t\t\t\t\t\ttype="radio"\r\n\t\t\t\t\t\t\t\t\tname="enabled"\r\n\t\t\t\t\t\t\t\t\tvalue="false"\r\n\t\t\t\t\t\t\t\t\tid="powerform-disable-scheduled-exports"\r\n\t\t\t\t\t\t\t\t/>\r\n\t\t\t\t\t\t\t\t{{ Powerform.l10n.popup.disable }}\r\n\t\t\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t\t\t<label for="powerform-enable-scheduled-exports" class="sui-tab-item tab-label-enable">\r\n\t\t\t\t\t\t\t\t<input\r\n\t\t\t\t\t\t\t\t\ttype="radio"\r\n\t\t\t\t\t\t\t\t\tname="enabled"\r\n\t\t\t\t\t\t\t\t\tvalue="true"\r\n\t\t\t\t\t\t\t\t\tid="powerform-enable-scheduled-exports"\r\n\t\t\t\t\t\t\t\t/>\r\n\t\t\t\t\t\t\t\t{{ Powerform.l10n.popup.enable }}\r\n\t\t\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<div class="sui-tabs-content schedule-enabled">\r\n\r\n\t\t\t\t\t\t\t<div id="powerform-export-schedule-timeframe" class="sui-tab-content sui-tab-boxed active">\r\n\r\n\t\t\t\t\t\t\t\t<div class="sui-row">\r\n\r\n\t\t\t\t\t\t\t\t\t<div class="sui-col-md-6">\r\n\r\n\t\t\t\t\t\t\t\t\t\t<div class="sui-form-field">\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t<label class="sui-label">{{ Powerform.l10n.popup.frequency }}</label>\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t<select name="interval" class="sui-select">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="daily">{{ Powerform.l10n.popup.daily }}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="weekly">{{ Powerform.l10n.popup.weekly }}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="monthly">{{ Powerform.l10n.popup.monthly }}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t<div class="sui-col-md-6">\r\n\r\n\t\t\t\t\t\t\t\t\t\t<div class="sui-form-field">\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t<label class="sui-label">{{ Powerform.l10n.popup.day_time }}</label>\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t<select name="hour" class="sui-select">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="00:00">12:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="01:00">01:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="02:00">02:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="03:00">03:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="04:00">04:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="05:00">05:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="06:00">06:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="07:00">07:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="08:00">08:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="09:00">09:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="10:00">10:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="11:00">11:00 AM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="12:00">12:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="13:00">01:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="14:00">02:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="15:00">03:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="16:00">04:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="17:00">05:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="18:00">06:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="19:00">07:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="20:00">08:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="21:00">09:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="22:00">10:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="23:00">11:00 PM</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="sui-form-field">\r\n\r\n\t\t\t\t\t\t\t\t\t<label class="sui-label">{{ Powerform.l10n.popup.week_day }}</label>\r\n\r\n\t\t\t\t\t\t\t\t\t<select name="day" class="sui-select">\r\n\t\t\t\t\t\t\t\t\t\t<option value="mon">{{ Powerform.l10n.popup.monday }}</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="tue">{{ Powerform.l10n.popup.tuesday }}</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="wed">{{ Powerform.l10n.popup.wednesday }}</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="thu">{{ Powerform.l10n.popup.thursday }}</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="fri">{{ Powerform.l10n.popup.friday }}</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="sat">{{ Powerform.l10n.popup.saturday }}</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="sun">{{ Powerform.l10n.popup.sunday }}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class="sui-form-field">\r\n\r\n\t\t\t\t\t\t\t\t\t<label class="sui-label">{{ Powerform.l10n.popup.day_month }}</label>\r\n\r\n\t\t\t\t\t\t\t\t\t<select name="month_day" class="sui-select">\r\n\t\t\t\t\t\t\t\t\t\t<option value="1">1</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="2">2</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="3">3</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="4">4</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="5">5</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="6">6</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="7">7</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="8">8</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="9">9</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="10">10</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="11">11</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="12">12</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="13">13</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="14">14</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="15">15</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="16">16</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="17">17</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="18">18</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="19">19</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="20">20</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="21">21</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="22">22</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="23">23</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="24">24</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="25">25</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="26">26</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="27">27</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="28">28</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="29">29</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="30">30</option>\r\n\t\t\t\t\t\t\t\t\t\t<option value="31">31</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div id="powerform-export-schedule-email" class="sui-form-field" style="margin-bottom: 20px;">\r\n\r\n\t\t\t\t\t\t\t\t\t<label class="sui-label">{{ Powerform.l10n.popup.email_to }}</label>\r\n\r\n\t\t\t\t\t\t\t\t\t<select name="email[]" class="sui-select fui-multi-select psource-select" multiple="multiple">\r\n\t\t\t\t\t\t\t\t\t\t{[ _.each( Powerform.l10n.exporter.email, function ( email ) { ]}\r\n\t\t\t\t\t\t\t\t\t\t<option value="{{ email }}" selected="selected">{{ email }}</option>\r\n\t\t\t\t\t\t\t\t\t\t{[ }) ]}\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\r\n\t\t\t\t\t\t\t\t\t<input type="hidden" name="form_id" value="{{ Powerform.l10n.exporter.form_id }}"/>\r\n\t\t\t\t\t\t\t\t\t<input type="hidden" name="form_type" value="{{ Powerform.l10n.exporter.form_type }}"/>\r\n\t\t\t\t\t\t\t\t\t<input type="hidden" name="action" value="powerform_export_entries"/>\r\n\t\t\t\t\t\t\t\t\t<input type="hidden" name="_powerform_nonce" value="{{ Powerform.l10n.exporter.export_nonce }}"/>\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<label for="powerform-send-if-new-exports" class="sui-checkbox sui-checkbox-sm sui-checkbox-stacked">\r\n\t\t\t\t\t\t\t\t\t<input\r\n\t\t\t\t\t\t\t\t\t\ttype="checkbox"\r\n\t\t\t\t\t\t\t\t\t\tname="if_new"\r\n\t\t\t\t\t\t\t\t\t\tvalue="true"\r\n\t\t\t\t\t\t\t\t\t\tid="powerform-send-if-new-exports"\r\n\t\t\t\t\t\t\t\t\t\tclass="powerform-field-singular"\r\n\t\t\t\t\t\t\t\t\t/>\r\n\t\t\t\t\t\t\t\t\t<span aria-hidden="true"></span>\r\n\t\t\t\t\t\t\t\t\t<span class="sui-description">{{ Powerform.l10n.popup.scheduled_export_if_new }}</span>\r\n\t\t\t\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t</form>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\r\n\t\t\t<button class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide="powerform-popup">{{ Powerform.l10n.popup.cancel }}</button>\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button type="submit" class="sui-button psource-action-done">{{ Powerform.l10n.popup.save }}</button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n    <script type="text/template" id="powerform-new-form-popup-tpl">\r\n\r\n        <div class="psource-box--congrats">\r\n\r\n            <div class="psource-congrats--image"></div>\r\n\r\n            <div class="psource-congrats--message">\r\n\r\n                <p><strong>{{ title }}</strong> {{ Powerform.l10n.popup.is_ready }}<br/>\r\n\t\t\t\t\t{{ Powerform.l10n.popup.new_form_desc }}</p>\r\n\r\n            </div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n    <script type="text/template" id="powerform-delete-popup-tpl">\r\n\r\n\t    <div class="sui-box-body">\r\n\t\t    <span class="sui-description">{{ content }}</span>\r\n\t    </div>\r\n\r\n\t    <div class="sui-box-footer">\r\n\t\t    <button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t    <form method="post" class="delete-action">\r\n\t\t\t    <input type="hidden" name="powerform_action" value="delete">\r\n\t\t\t    <input type="hidden" name="id" value="{{ id }}">\r\n\t\t\t    <input type="hidden" id="powerformNonce" name="powerformNonce" value="{{ nonce }}">\r\n\t\t\t\t<input type="hidden" id="powerformEntryNonce" name="powerformEntryNonce" value="{{ nonce }}">\r\n\t\t\t    <input type="hidden" name="_wp_http_referer" value="{{ referrer }}">\r\n\t\t\t    <button type="submit" class="sui-button sui-button-ghost sui-button-red popup-confirmation-confirm">\r\n\t\t\t\t    <i class="sui-icon-trash" aria-hidden="true"></i>\r\n\t\t\t\t    {{ Powerform.l10n.popup.delete }}\r\n\t\t\t    </button>\r\n\t\t    </form>\r\n\t    </div>\r\n\r\n\t<\/script>\r\n\r\n    <script type="text/template" id="powerform-confirmation-popup-tpl">\r\n\r\n\t    <div class="sui-box-body">\r\n\t\t    <p>{{ confirmation_message }}</p>\r\n\t    </div>\r\n\r\n        <form class="sui-box-footer" method="post">\r\n\t\t\t<button type="button" class="sui-button popup-confirmation-cancel">{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<div class="sui-actions-right">\r\n\t\t\t\t<button type="button" class="sui-button sui-button-red popup-confirmation-confirm">{{ Powerform.l10n.popup.delete }}</button>\r\n\t\t\t</div>\r\n        </form>\r\n\r\n    <\/script>\r\n\r\n\t<script type="text/template" id="powerform-reset-plugin-settings-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\t\t\t<span class="sui-description">{{ content }}</span>\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\t\t\t<button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<form method="post" class="delete-action">\r\n\t\t\t\t<input type="hidden" name="powerform_action" value="reset_plugin_settings">\r\n\t\t\t\t<input type="hidden" id="powerformNonce" name="powerformNonce" value="{{ nonce }}">\r\n\t\t\t\t<input type="hidden" name="_wp_http_referer" value="{{ referrer }}">\r\n\t\t\t\t<button type="submit" class="sui-button sui-button-ghost sui-button-red popup-confirmation-confirm">\r\n\t\t\t\t\t<i class="sui-icon-refresh" aria-hidden="true"></i>\r\n\t\t\t\t\t{{ Powerform.l10n.popup.reset }}\r\n\t\t\t\t</button>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-disconnect-stripe-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\t\t\t<span class="sui-description">{{ content }}</span>\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\t\t\t<button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<button type="submit" class="disconnect_stripe sui-button sui-button-ghost sui-button-red popup-confirmation-confirm" data-nonce="{{ nonce }}" data-action="disconnect_stripe">\r\n\t\t\t\t<i class="sui-icon-refresh" aria-hidden="true"></i>\r\n\t\t\t\t{{ Powerform.l10n.popup.disconnect }}\r\n\t\t\t</button>\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\t<script type="text/template" id="powerform-disconnect-paypal-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\t\t\t<span class="sui-description">{{ content }}</span>\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\t\t\t<button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<button type="submit" class="disconnect_paypal sui-button sui-button-ghost sui-button-red popup-confirmation-confirm" data-nonce="{{ nonce }}" data-action="disconnect_paypal">\r\n\t\t\t\t{{ Powerform.l10n.popup.disconnect }}\r\n\t\t\t</button>\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-delete-poll-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\t\t\t<span class="sui-description">{{ content }}</span>\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\t\t\t<button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<button type="submit" class="delete-poll-submission sui-button sui-button-ghost sui-button-red popup-confirmation-confirm" data-nonce="{{ nonce }}" data-id="{{ id }}" data-action="delete_poll_submissions">\r\n\t\t\t\t{{ Powerform.l10n.popup.delete }}\r\n\t\t\t</button>\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-approve-user-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\t\t\t<span class="sui-description">{{ content }}</span>\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\t\t\t<button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<form method="post" class="form-approve-user">\r\n\t\t\t\t<input type="hidden" name="powerform_action" value="approve_user">\r\n\t\t\t\t<input type="hidden" name="id" value="{{ id }}">\r\n\t\t\t\t<input type="hidden" name="activationKey" value="{{ activationKey }}">\r\n\t\t\t\t<input type="hidden" id="powerformNonce" name="powerformNonce" value="{{ nonce }}">\r\n\t\t\t\t<input type="hidden" id="powerformEntryNonce" name="powerformEntryNonce" value="{{ nonce }}">\r\n\t\t\t\t<input type="hidden" name="_wp_http_referer" value="{{ referrer }}">\r\n\t\t\t\t<button type="submit" class="sui-button approve-user popup-confirmation-confirm">\r\n\t\t\t\t\t{{ Powerform.l10n.popup.approve_user }}\r\n\t\t\t\t</button>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="powerform-delete-unconfirmed-user-popup-tpl">\r\n\r\n\t\t<div class="sui-box-body">\r\n\t\t\t<span class="sui-description">{{ content }}</span>\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-footer">\r\n\t\t\t<button type="button" class="sui-button sui-button-ghost powerform-popup-cancel" data-a11y-dialog-hide>{{ Powerform.l10n.popup.cancel }}</button>\r\n\t\t\t<form method="post" class="form-delete-unconfirmed-user">\r\n\t\t\t\t<input type="hidden" name="powerformAction" value="delete-unconfirmed-user">\r\n\t\t\t\t<input type="hidden" name="formId" value="{{ formId }}">\r\n\t\t\t\t<input type="hidden" name="entryId" value="{{ entryId }}">\r\n\t\t\t\t<input type="hidden" name="activationKey" value="{{ activationKey }}">\r\n\t\t\t\t<input type="hidden" id="powerformNonceDeleteUnconfirmedUser" name="powerformNonceDeleteUnconfirmedUser" value="{{ nonce }}">\r\n\t\t\t\t<input type="hidden" name="_wp_http_referer" value="{{ referrer }}">\r\n\t\t\t\t<button type="submit" class="sui-button sui-button-ghost sui-button-red delete-unconfirmed-user popup-confirmation-confirm">\r\n\t\t\t\t\t<i class="sui-icon-trash" aria-hidden="true"></i>\r\n\t\t\t\t\t{{ Powerform.l10n.popup.delete }}\r\n\t\t\t\t</button>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n</div>\r\n'
    }),
    function(t) {
        formintorjs.define("admin/popup/templates", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "psource-popup--quiz",
                step: "1",
                template: "blank",
                events: { "click .select-quiz-template": "selectTemplate", "click .sui-dialog-close": "close", "change .powerform-new-form-type": "clickTemplate", "click #powerform-build-your-form": "handleMouseClick", keyup: "handleKeyClick" },
                popupTpl: Powerform.Utils.template(t(e).find("#powerform-form-popup-tpl").html()),
                newFormTpl: Powerform.Utils.template(t(e).find("#powerform-new-form-tpl").html()),
                newFormContent: Powerform.Utils.template(t(e).find("#powerform-new-form-content-tpl").html()),
                render: function() { var t = jQuery("#powerform-popup"); "1" === this.step && (this.$el.html(this.popupTpl({ templates: Powerform.Data.modules.custom_form.templates })), this.$el.find(".select-quiz-template").prop("disabled", !1), t.removeClass("sui-dialog-sm")), "2" === this.step && (this.$el.html(this.newFormTpl()), this.$el.find(".sui-box-body").html(this.newFormContent()), "registration" === this.template && (this.$el.find("#powerform-template-register-notice").show(), this.$el.find("#powerform-form-name").val(Powerform.l10n.popup.registration_name)), "login" === this.template && (this.$el.find("#powerform-template-login-notice").show(), this.$el.find("#powerform-form-name").val(Powerform.l10n.popup.login_name)), t.addClass("sui-dialog-sm")) },
                close: function(t) { t.preventDefault(), Powerform.New_Popup.close() },
                clickTemplate: function(t) { this.$el.find(".select-quiz-template").prop("disabled", !1) },
                selectTemplate: function(t) {
                    t.preventDefault();
                    var e = this.$el.find("input[name=powerform-form-template]:checked").val();
                    this.template = e, this.step = "2", this.render()
                },
                handleMouseClick: function(t) { this.createQuiz(t) },
                handleKeyClick: function(t) { t.preventDefault(), 13 === t.which && this.createQuiz(t) },
                createQuiz: function(e) {
                    var i = t(e.target).closest(".sui-box").find("#powerform-form-name");
                    if ("" === i.val()) t(e.target).closest(".sui-box").find(".sui-error-message").show();
                    else {
                        var n = Powerform.Data.modules.custom_form.new_form_url;
                        t(e.target).closest(".sui-box").find(".sui-error-message").hide(), form_url = n + "&name=" + i.val(), form_url = form_url + "&template=" + this.template, window.location.href = form_url
                    }
                }
            })
        })
    }(jQuery),
    function(t) { formintorjs.define("admin/popup/login", ["text!tpl/dashboard.html"], function(e) { return Backbone.View.extend({ className: "psource-section--popup", popupTpl: Powerform.Utils.template(t(e).find("#powerform-login-popup-tpl").html()), render: function() { this.$el.html(this.popupTpl({ loginUrl: Powerform.Data.modules.login.login_url, registerUrl: Powerform.Data.modules.login.register_url })) } }) }) }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/quizzes", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "psource-popup--quiz",
                step: "1",
                type: "knowledge",
                events: { "click .select-quiz-template": "selectTemplate", "click .sui-dialog-close": "close", "change .powerform-new-quiz-type": "clickTemplate", "click #powerform-build-your-form": "handleMouseClick", "click #powerform-new-quiz-leads": "handleToggle", keyup: "handleKeyClick" },
                popupTpl: Powerform.Utils.template(t(e).find("#powerform-quizzes-popup-tpl").html()),
                newFormTpl: Powerform.Utils.template(t(e).find("#powerform-new-quiz-tpl").html()),
                newFormContent: Powerform.Utils.template(t(e).find("#powerform-new-quiz-content-tpl").html()),
                render: function() { var t = jQuery("#powerform-popup"); "1" === this.step && (this.$el.html(this.popupTpl()), this.$el.find(".select-quiz-template").prop("disabled", !1), t.removeClass("sui-dialog-sm")), "2" === this.step && (this.$el.html(this.newFormTpl()), this.$el.find(".sui-box-body").html(this.newFormContent()), t.addClass("sui-dialog-sm powerform-create-quiz-second-step")) },
                close: function(t) { t.preventDefault(), Powerform.New_Popup.close() },
                clickTemplate: function(t) { this.$el.find(".select-quiz-template").prop("disabled", !1) },
                selectTemplate: function(e) {
                    e.preventDefault();
                    var i = this.$el.find("input[name=powerform-new-quiz]:checked").val(),
                        n = this.$el.find("#powerform-form-name").val();
                    "" === n ? t(e.target).closest(".sui-box").find("#sui-quiz-name-error").show() : (this.type = i, this.name = n, this.step = "2", this.render())
                },
                handleMouseClick: function(t) { this.createQuiz(t) },
                handleKeyClick: function(t) { t.preventDefault(), 13 === t.which && ("1" === this.step ? this.selectTemplate(t) : this.createQuiz(t)) },
                handleToggle: function(e) {
                    var i = t(e.target).is(":checked"),
                        n = t(e.target).closest(".sui-box").find("#sui-quiz-leads-description");
                    i ? n.show() : n.hide()
                },
                createQuiz: function(e) {
                    var i = t(e.target).closest(".sui-box").find("#powerform-new-quiz-leads").is(":checked"),
                        n = Powerform.Data.modules.quizzes.knowledge_url;
                    "nowrong" === this.type && (n = Powerform.Data.modules.quizzes.nowrong_url), form_url = n + "&name=" + this.name, i && (form_url += "&leads=true"), window.location.href = form_url
                }
            })
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/schedule", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                popupTpl: Powerform.Utils.template(t(e).find("#powerform-exports-schedule-popup-tpl").html()),
                events: { 'change select[name="interval"]': "on_change_interval", "click .sui-toggle-label": "click_label", "click .tab-labels .sui-tab-item": "click_tab_label", "click .psource-action-done": "submit_schedule" },
                render: function() {
                    this.$el.html(this.popupTpl({})), Powerform.Utils.sui_delegate_events();
                    var t = powerforml10n.exporter,
                        e = { tags: !0, tokenSeparators: [",", " "], language: { searching: function() { return t.searching }, noResults: function() { return t.noResults } }, ajax: { url: powerformData.ajaxUrl, type: "POST", delay: 350, data: function(t) { return { action: "powerform_builder_search_emails", _wpnonce: powerformData.searchNonce, q: t.term } }, processResults: function(t) { return { results: t.data } }, cache: !0 }, createTag: function(t) { const e = jQuery.trim(t.term); return Powerform.Utils.is_email_wp(e) ? { id: e, text: e } : null }, insertTag: function(t, e) { t.push(e) } };
                    Powerform.Utils.powerform_select2_tags(this.$el, e), this.$el.find('input[name="if_new"]').prop("checked", t.if_new), this.set_enabled(t.enabled), this.$el.find('select[name="interval"]').change(), null !== t.email && (this.$el.find('select[name="interval"]').val(t.interval), this.$el.find('select[name="day"]').val(t.day), this.$el.find('select[name="month_day"]').val(t.month_day ? t.month_day : 1), this.$el.find('select[name="hour"]').val(t.hour), "weekly" === t.interval ? this.$el.find('select[name="day"]').closest(".sui-form-field").show() : "monthly" === t.interval && this.$el.find('select[name="month_day"]').closest(".sui-form-field").show())
                },
                set_enabled: function(t) { t ? (this.$el.find('input[name="enabled"][value="true"]').prop("checked", !0), this.$el.find('input[name="enabled"][value="false"]').prop("checked", !1), this.$el.find(".tab-label-disable").removeClass("active"), this.$el.find(".tab-label-enable").addClass("active"), this.$el.find(".schedule-enabled").show(), this.$el.find('input[name="email"]').prop("required", !0)) : (this.$el.find('input[name="enabled"][value="false"]').prop("checked", !0), this.$el.find('input[name="enabled"][value="true"]').prop("checked", !1), this.$el.find(".tab-label-disable").addClass("active"), this.$el.find(".tab-label-enable").removeClass("active"), this.$el.find(".schedule-enabled").hide()) },
                on_change_interval: function(t) { this.$el.find('select[name="day"]').closest(".sui-form-field").hide(), this.$el.find('select[name="month_day"]').closest(".sui-form-field").hide(), "weekly" === t.target.value ? (this.$el.find('select[name="month-day"]').closest(".sui-form-field").hide(), this.$el.find('select[name="day"]').closest(".sui-form-field").show()) : "monthly" === t.target.value && (this.$el.find('select[name="month_day"]').closest(".sui-form-field").show(), this.$el.find('select[name="day"]').closest(".sui-form-field").hide()) },
                click_label: function(t) { t.preventDefault(), this.$el.closest(".sui-form-field").find(".sui-toggle input").click() },
                click_tab_label: function(e) {
                    var i = t(e.target);
                    i.closest(".sui-tab-item").hasClass("tab-label-disable") ? this.set_enabled(!1) : i.closest(".sui-tab-item").hasClass("tab-label-enable") && this.set_enabled(!0)
                },
                submit_schedule: function(t) { this.$el.find("form.schedule-action").trigger("submit") }
            })
        })
    }(jQuery),
    function(t) { formintorjs.define("admin/popup/new-form", ["text!tpl/dashboard.html"], function(e) { return Backbone.View.extend({ className: "psource-section--popup", popupTpl: Powerform.Utils.template(t(e).find("#powerform-new-form-popup-tpl").html()), initialize: function(t) { this.title = t.title, this.title = Powerform.Utils.sanitize_uri_string(this.title) }, render: function() { this.$el.html(this.popupTpl({ title: this.title })) } }) }) }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/polls", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "psource-popup-templates",
                newFormTpl: Powerform.Utils.template(t(e).find("#powerform-new-form-tpl").html()),
                newPollContent: Powerform.Utils.template(t(e).find("#powerform-new-poll-content-tpl").html()),
                events: { "click #powerform-build-your-form": "handleMouseClick", keyup: "handleKeyClick" },
                initialize: function(t) { this.options = t },
                render: function() { this.$el.html(this.newFormTpl()), "form" === this.options.type && this.$el.find(".sui-box-body").html(this.newFormContent()), "poll" === this.options.type && this.$el.find(".sui-box-body").html(this.newPollContent()) },
                handleMouseClick: function(t) { "form" === this.options.type && this.create_form(t), "poll" === this.options.type && this.create_poll(t) },
                handleKeyClick: function(t) { t.preventDefault(), 13 === t.which && ("form" === this.options.type && this.create_form(t), "poll" === this.options.type && this.create_poll(t)) },
                create_form: function(e) {
                    e.preventDefault();
                    var i = t(e.target).closest(".sui-box").find("#powerform-form-name");
                    if ("" === i.val()) t(e.target).closest(".sui-box").find(".sui-error-message").show();
                    else {
                        var n = Powerform.Data.modules.custom_form.new_form_url;
                        t(e.target).closest(".sui-box").find(".sui-error-message").hide(), n = n + "&name=" + i.val(), window.location.href = n
                    }
                },
                create_poll: function(e) {
                    e.preventDefault();
                    var i = t(e.target).closest(".sui-box").find("#powerform-form-name");
                    if ("" === i.val()) t(e.target).closest(".sui-box").find(".sui-error-message").show();
                    else {
                        var n = Powerform.Data.modules.polls.new_form_url;
                        t(e.target).closest(".sui-box").find(".sui-error-message").hide(), n = n + "&name=" + i.val(), window.location.href = n
                    }
                }
            })
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/ajax", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "sui-box-body",
                events: { "click .psource-action-done": "save", "click .psource-action-ajax-done": "ajax_save", "click .psource-action-ajax-cf7-import": "ajax_cf7_import", "click .psource-button-clear-exports": "clear_exports", "click .powerform-radio--field": "show_poll_custom_input", "click .powerform-popup-close": "close_popup", "click .powerform-retry-import": "ajax_cf7_import", "change #powerform-choose-import-form": "import_form_action", "change .powerform-import-forms": "import_form_action" },
                initialize: function(t) { return t = _.extend({ action: "", nonce: "", data: "", id: "", enable_loader: !0 }, t), this.action = t.action, this.nonce = t.nonce, this.data = t.data, this.id = t.id, this.enable_loader = t.enable_loader, this.render() },
                render: function() {
                    var e = this,
                        i = {};
                    if (i.action = "powerform_load_" + this.action + "_popup", i._ajax_nonce = this.nonce, i.data = this.data, this.id && (i.id = this.id), this.enable_loader) { var n = ""; "sui-box-body" !== this.className && (n += '<div class="sui-box-body">'), n += '<p class="fui-loading-dialog" aria-label="Loading content"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>', "sui-box-body" !== this.className && (n += "</div>"), e.$el.html(n) }
                    t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: i }).done(function(t) {
                        if (t && t.success) {
                            e.$el.html(t.data), e.$el.find(".psource-hidden-popup").show(400), Powerform.Utils.sui_delegate_events();
                            e.$el.find(".powerform-custom-form");
                            e.delegateEvents()
                        }
                    }).always(function() { e.$el.find(".fui-loading-dialog").remove() })
                },
                save: function(e) {
                    e.preventDefault();
                    var i = {},
                        n = t(e.target).data("nonce");
                    i.action = "powerform_save_" + this.action + "_popup", i._ajax_nonce = n, t(".psource-popup-form input, .psource-popup-form select").each(function() {
                        var e = t(this);
                        i[e.attr("name")] = e.val()
                    }), t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: i, success: function(t) { Powerform.Popup.close(!1, function() { window.location.reload() }) } })
                },
                ajax_save: function(e) {
                    var i = this;
                    e.preventDefault();
                    var n = {},
                        o = t(e.target).data("nonce");
                    n.action = "powerform_save_" + this.action + "_popup", n._ajax_nonce = o, t(".psource-popup-form input, .psource-popup-form select, .psource-popup-form textarea").each(function() {
                        var e = t(this);
                        n[e.attr("name")] = e.val()
                    }), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.$el.find(".psource-ajax-error-placeholder").addClass("sui-hidden"), t.ajax({
                        url: Powerform.Data.ajaxUrl,
                        type: "POST",
                        data: n,
                        success: function(t) {
                            if (!0 === t.success) {
                                var e = !1;
                                _.isUndefined(t.data.url) || (e = t.data.url), Powerform.Popup.close(!1, function() { e && (location.href = e) })
                            } else _.isUndefined(t.data) || i.$el.find(".psource-ajax-error-placeholder").removeClass("sui-hidden").find("p").text(t.data)
                        }
                    }).always(function() { i.$el.find(".sui-button:not(.disable-loader)").removeClass("sui-button-onload") })
                },
                clear_exports: function(e) {
                    e.preventDefault();
                    var i = {},
                        n = this,
                        o = t(e.target).data("nonce"),
                        r = t(e.target).data("form-id");
                    i.action = "powerform_clear_" + this.action + "_popup", i._ajax_nonce = o, i.id = r, t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: i, success: function() { n.render() } })
                },
                show_poll_custom_input: function(e) {
                    var i = this,
                        n = this.$el.find(".powerform-input"),
                        o = e.target.checked,
                        r = t(e.target).attr("id");
                    if (n.hide(), i.$el.find(".powerform-input#" + r + "-extra").length) {
                        var a = i.$el.find(".powerform-input#" + r + "-extra");
                        o ? a.show() : a.hide()
                    }
                },
                ajax_cf7_import: function(e) {
                    var i = this,
                        n = i.$el.find("form").serializeArray();
                    e.preventDefault(), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.$el.find(".psource-ajax-error-placeholder").addClass("sui-hidden"), this.$el.find(".powerform-cf7-imported-fail").addClass("sui-hidden"), t.ajax({
                        url: Powerform.Data.ajaxUrl,
                        type: "POST",
                        data: n,
                        xhr: function() {
                            var t = new window.XMLHttpRequest;
                            return t.upload.addEventListener("progress", function(t) {
                                if (t.lengthComputable) {
                                    var e = t.loaded / t.total;
                                    e = parseInt(100 * e), i.$el.find(".powerform-cf7-importing .sui-progress-text").html(e + "%"), i.$el.find(".powerform-cf7-importing .sui-progress-bar span").css("width", e + "%")
                                }
                            }, !1), t
                        },
                        success: function(t) {!0 === t.success ? setTimeout(function() { i.$el.find(".powerform-cf7-importing").addClass("sui-hidden"), i.$el.find(".powerform-cf7-imported").removeClass("sui-hidden") }, 1e3) : _.isUndefined(t.data) || (setTimeout(function() { i.$el.find(".powerform-cf7-importing").addClass("sui-hidden"), i.$el.find(".powerform-cf7-imported-fail").removeClass("sui-hidden") }, 1e3), i.$el.find(".psource-ajax-error-placeholder").removeClass("sui-hidden").find("p").text(t.data)) }
                    }).always(function(t) { i.$el.find(".sui-button:not(.disable-loader)").removeClass("sui-button-onload"), i.$el.find(".powerform-cf7-import").addClass("sui-hidden"), i.$el.find(".powerform-cf7-importing").removeClass("sui-hidden") })
                },
                close_popup: function() { Powerform.Popup.close() },
                import_form_action: function(e) {
                    e.preventDefault();
                    var i = t(e.target),
                        n = i.val(),
                        o = !1;
                    "specific" === n && (o = !0), (null == n || Array.isArray(n) && n.length < 1) && (o = !0), this.$el.find(".psource-action-ajax-cf7-import").prop("disabled", o)
                }
            })
        })
    }(jQuery),
    function(t) { formintorjs.define("admin/popup/delete", ["text!tpl/dashboard.html"], function(e) { return Backbone.View.extend({ className: "psource-section--popup", popupTpl: Powerform.Utils.template(t(e).find("#powerform-delete-popup-tpl").html()), popupPollTpl: Powerform.Utils.template(t(e).find("#powerform-delete-poll-popup-tpl").html()), initialize: function(t) { this.module = t.module, this.nonce = t.nonce, this.id = t.id, this.referrer = t.referrer, this.content = t.content || Powerform.l10n.popup.cannot_be_reverted }, render: function() { "poll" === this.module ? this.$el.html(this.popupPollTpl({ nonce: this.nonce, id: this.id, referrer: this.referrer, content: this.content })) : this.$el.html(this.popupTpl({ nonce: this.nonce, id: this.id, referrer: this.referrer, content: this.content })) } }) }) }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/preview", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "sui-box-body",
                initialize: function(e) {
                    var i = this,
                        n = { action: "", type: "", id: "", preview_data: {}, enable_loader: !0 };
                    return "powerform_quizzes" === e.type && (n.has_lead = e.has_lead, n.leads_id = e.leads_id), e = _.extend(n, e), this.action = e.action, this.type = e.type, this.nonce = e.nonce, this.id = e.id, this.render_id = 0, this.preview_data = e.preview_data, this.enable_loader = e.enable_loader, "powerform_quizzes" === e.type && (this.has_lead = e.has_lead, this.leads_id = e.leads_id), t(document).off("after.load.powerform"), t(document).on("after.load.powerform", function(t) { i.after_load() }), this.render()
                },
                render: function() {
                    var e = this,
                        i = {};
                    if (i.action = this.action, i.type = this.type, i.id = this.id, i.render_id = this.render_id, i.nonce = this.nonce, i.is_preview = 1, i.preview_data = this.preview_data, i.last_submit_data = {}, "powerform_quizzes" === this.type && (i.has_lead = this.has_lead, i.leads_id = this.leads_id), this.enable_loader) { var n = ""; "sui-box-body" !== this.className && (n += '<div class="sui-box-body">'), n += '<p class="fui-loading-dialog" aria-label="Loading content"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>', "sui-box-body" !== this.className && (n += "</div>"), e.$el.html(n) }
                    var o = t('<form id="powerform-module-' + this.id + '" data-powerform-render="' + this.render_id + '" style="display:none"></form>');
                    e.$el.append(o), t(e.$el.find("#powerform-module-" + this.id + '[data-powerform-render="' + this.render_id + '"]').get(0)).powerformLoader(i)
                },
                after_load: function() {
                    var t = this;
                    t.$el.find('div[data-form="powerform-module-' + this.id + '"]').remove(), t.$el.find(".fui-loading-dialog").remove()
                }
            })
        })
    }(jQuery),
    function(t) { formintorjs.define("admin/popup/reset-plugin-settings", ["text!tpl/dashboard.html"], function(e) { return Backbone.View.extend({ className: "psource-section--popup", popupTpl: Powerform.Utils.template(t(e).find("#powerform-reset-plugin-settings-popup-tpl").html()), initialize: function(t) { this.nonce = t.nonce, this.referrer = t.referrer, this.content = t.content || Powerform.l10n.popup.cannot_be_reverted }, render: function() { this.$el.html(this.popupTpl({ nonce: this.nonce, id: this.id, referrer: this.referrer, content: this.content })) } }) }) }(jQuery),
    function(t) { formintorjs.define("admin/popup/disconnect-stripe", ["text!tpl/dashboard.html"], function(e) { return Backbone.View.extend({ className: "psource-section--popup delete-stripe--popup", popupTpl: Powerform.Utils.template(t(e).find("#powerform-disconnect-stripe-popup-tpl").html()), initialize: function(t) { this.nonce = t.nonce, this.referrer = t.referrer, this.content = t.content || Powerform.l10n.popup.cannot_be_reverted }, render: function() { this.$el.html(this.popupTpl({ nonce: this.nonce, id: this.id, referrer: this.referrer, content: this.content })) } }) }) }(jQuery),
    function(t) { formintorjs.define("admin/popup/disconnect-paypal", ["text!tpl/dashboard.html"], function(e) { return Backbone.View.extend({ className: "psource-section--popup", popupTpl: Powerform.Utils.template(t(e).find("#powerform-disconnect-paypal-popup-tpl").html()), initialize: function(t) { this.nonce = t.nonce, this.referrer = t.referrer, this.content = t.content || Powerform.l10n.popup.cannot_be_reverted }, render: function() { this.$el.html(this.popupTpl({ nonce: this.nonce, id: this.id, referrer: this.referrer, content: this.content })) } }) }) }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/approve-user", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "psource-section--popup",
                popupTpl: Powerform.Utils.template(t(e).find("#powerform-approve-user-popup-tpl").html()),
                events: { "click .approve-user.popup-confirmation-confirm": "approveUser" },
                initialize: function(t) { this.nonce = t.nonce, this.referrer = t.referrer, this.content = t.content || Powerform.l10n.popup.cannot_be_reverted, this.activationKey = t.activationKey },
                render: function() { this.$el.html(this.popupTpl({ nonce: this.nonce, id: this.id, referrer: this.referrer, content: this.content, activationKey: this.activationKey })) },
                submitForm: function(e, i, n) {
                    var o = {};
                    o.action = "powerform_approve_user_popup", o._ajax_nonce = i, o.activation_key = n;
                    var r = e.serialize() + "&" + t.param(o);
                    t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: r, beforeSend: function() { e.find(".sui-button").addClass("sui-button-onload") }, success: function(t) { t && t.success ? (Powerform.Notification.open("success", Powerform.l10n.commons.approve_user_successfull, 4e3), window.location.reload()) : Powerform.Notification.open("error", t.data, 4e3) }, error: function(t) { Powerform.Notification.open("error", Powerform.l10n.commons.approve_user_unsuccessfull, 4e3) } }).always(function() { e.find(".sui-button").removeClass("sui-button-onload") })
                },
                approveUser: function(e) {
                    e.preventDefault(), t(e.target).addClass("sui-button-onload");
                    var i = this.$el.find(".form-approve-user"),
                        n = i.find("form");
                    return this.submitForm(n, this.nonce, this.activationKey), !1
                }
            })
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/popup/delete-unconfirmed-user", ["text!tpl/dashboard.html"], function(e) {
            return Backbone.View.extend({
                className: "psource-section--popup",
                popupTpl: Powerform.Utils.template(t(e).find("#powerform-delete-unconfirmed-user-popup-tpl").html()),
                events: { "click .delete-unconfirmed-user.popup-confirmation-confirm": "deleteUnconfirmedUser" },
                initialize: function(t) { this.nonce = t.nonce, this.formId = t.formId, this.referrer = t.referrer, this.content = t.content || Powerform.l10n.popup.cannot_be_reverted, this.activationKey = t.activationKey, this.entryId = t.entryId },
                render: function() { this.$el.html(this.popupTpl({ nonce: this.nonce, formId: this.formId, referrer: this.referrer, content: this.content, activationKey: this.activationKey, entryId: this.entryId })) },
                submitForm: function(e, i, n, o, r) {
                    var a = { action: "powerform_delete_unconfirmed_user_popup", _ajax_nonce: i, activation_key: n, form_id: o, entry_id: r },
                        s = e.serialize() + "&" + t.param(a);
                    t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: s, beforeSend: function() { e.find(".sui-button").addClass("sui-button-onload") }, success: function(t) { t && t.success ? window.location.reload() : Powerform.Notification.open("error", t.data, 4e3) }, error: function(t) { Powerform.Notification.open("error", t.data, 4e3) } }).always(function() { e.find(".sui-button").removeClass("sui-button-onload") })
                },
                deleteUnconfirmedUser: function(e) {
                    e.preventDefault(), t(e.target).addClass("sui-button-onload");
                    var i = this.$el.find(".form-delete-unconfirmed-user"),
                        n = i.find("form");
                    return this.submitForm(n, this.nonce, this.activationKey, this.formId, this.entryId), !1
                }
            })
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/popups", ["admin/popup/templates", "admin/popup/login", "admin/popup/quizzes", "admin/popup/schedule", "admin/popup/new-form", "admin/popup/polls", "admin/popup/ajax", "admin/popup/delete", "admin/popup/preview", "admin/popup/reset-plugin-settings", "admin/popup/disconnect-stripe", "admin/popup/disconnect-paypal", "admin/popup/approve-user", "admin/popup/delete-unconfirmed-user"], function(e, i, n, o, r, a, s, l, p, d, u, c, m, f) {
            var h = Backbone.View.extend({
                el: "main.sui-wrap",
                events: { "click .psource-open-modal": "open_modal", "click .psource-button-open-modal": "open_modal" },
                initialize: function() {
                    var t = Powerform.Utils.get_url_param("new"),
                        e = Powerform.Utils.get_url_param("title");
                    if (t) {
                        var i = new r({ title: e });
                        i.render(), this.open_popup(i, Powerform.l10n.popup.congratulations)
                    }
                    return this.open_export(), this.open_delete(), this.render()
                },
                render: function() { return this },
                open_delete: function() {
                    var t = Powerform.Utils.get_url_param("delete"),
                        e = Powerform.Utils.get_url_param("module_id"),
                        i = Powerform.Utils.get_url_param("nonce"),
                        n = Powerform.Utils.get_url_param("module_type"),
                        o = Powerform.l10n.popup.delete_form,
                        r = Powerform.l10n.popup.are_you_sure_form,
                        a = this;
                    "poll" === n && (o = Powerform.l10n.popup.delete_poll, r = Powerform.l10n.popup.are_you_sure_poll), "quiz" === n && (o = Powerform.l10n.popup.delete_quiz, r = Powerform.l10n.popup.are_you_sure_quiz), t && setTimeout(function() { a.open_delete_popup("", e, i, o, r) }, 100)
                },
                open_export: function() {
                    var t = Powerform.Utils.get_url_param("export"),
                        e = Powerform.Utils.get_url_param("module_id"),
                        i = Powerform.Utils.get_url_param("exportnonce"),
                        n = Powerform.Utils.get_url_param("module_type"),
                        o = this;
                    t && setTimeout(function() { o.open_export_module_modal(n, i, e, Powerform.l10n.popup.export_cform, !1, !0, "psource-ajax-popup") }, 100)
                },
                open_modal: function(e) {
                    e.preventDefault();
                    var i = t(e.target);
                    t(e.target).closest(".psource-split--item");
                    i.hasClass("psource-open-modal") || i.hasClass("psource-button-open-modal") || (i = i.closest(".psource-open-modal"));
                    var n = i.data("modal"),
                        o = i.data("nonce"),
                        r = i.data("form-id"),
                        a = i.data("has-leads"),
                        s = i.data("leads-id"),
                        l = i.data("modal-title"),
                        p = i.data("modal-content"),
                        d = i.data("nonce-preview");
                    switch (n) {
                        case "custom_forms":
                            this.open_cform_popup();
                            break;
                        case "login_registration_forms":
                            this.open_login_popup();
                            break;
                        case "polls":
                            this.open_polls_popup();
                            break;
                        case "quizzes":
                            this.open_quizzes_popup();
                            break;
                        case "exports":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.your_exports);
                            break;
                        case "exports-schedule":
                            this.open_exports_schedule_popup();
                            break;
                        case "delete-module":
                            this.open_delete_popup("", r, o, l, p);
                            break;
                        case "delete-poll-submission":
                            this.open_delete_popup("poll", r, o, l, p);
                            break;
                        case "paypal":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.paypal_settings);
                            break;
                        case "preview_cforms":
                            _.isUndefined(l) && (l = Powerform.l10n.popup.preview_cforms), this.open_preview_popup(r, l, "powerform_load_cform", "powerform_forms", d);
                            break;
                        case "preview_polls":
                            _.isUndefined(l) && (l = Powerform.l10n.popup.preview_polls), this.open_preview_popup(r, l, "powerform_load_poll", "powerform_polls", d);
                            break;
                        case "preview_quizzes":
                            _.isUndefined(l) && (l = Powerform.l10n.popup.preview_quizzes), this.open_quiz_preview_popup(r, l, "powerform_load_quiz", "powerform_quizzes", a, s, d);
                            break;
                        case "captcha":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.captcha_settings, !1, !0, "psource-ajax-popup");
                            break;
                        case "currency":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.currency_settings, !1, !0, "psource-ajax-popup");
                            break;
                        case "pagination_entries":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.pagination_entries, !1, !0, "psource-ajax-popup");
                            break;
                        case "pagination_listings":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.pagination_listings, !1, !0, "psource-ajax-popup");
                            break;
                        case "email_settings":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.email_settings, !1, !0, "psource-ajax-popup");
                            break;
                        case "uninstall_settings":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.uninstall_settings, !1, !0, "psource-ajax-popup");
                            break;
                        case "privacy_settings":
                            this.open_settings_modal(n, o, r, Powerform.l10n.popup.privacy_settings, !1, !0, "psource-ajax-popup");
                            break;
                        case "export_cform":
                            this.open_export_module_modal("custom_form", o, r, Powerform.l10n.popup.export_cform, !1, !0, "psource-ajax-popup");
                            break;
                        case "export_poll":
                            this.open_export_module_modal("poll", o, r, Powerform.l10n.popup.export_poll, !1, !0, "psource-ajax-popup");
                            break;
                        case "export_quiz":
                            this.open_export_module_modal("quiz", o, r, Powerform.l10n.popup.export_quiz, !1, !0, "psource-ajax-popup");
                            break;
                        case "import_cform":
                            this.open_import_module_modal("custom_form", o, r, Powerform.l10n.popup.import_cform, !1, !0, "psource-ajax-popup");
                            break;
                        case "import_cform_cf7":
                            this.open_import_module_modal("custom_form_cf7", o, r, Powerform.l10n.popup.import_cform_cf7, !1, !0, "psource-ajax-popup");
                            break;
                        case "import_cform_ninja":
                            this.open_import_module_modal("custom_form_ninja", o, r, Powerform.l10n.popup.import_cform_ninja, !1, !0, "psource-ajax-popup");
                            break;
                        case "import_cform_gravity":
                            this.open_import_module_modal("custom_form_gravity", o, r, Powerform.l10n.popup.import_cform_gravity, !1, !0, "psource-ajax-popup");
                            break;
                        case "import_poll":
                            this.open_import_module_modal("poll", o, r, Powerform.l10n.popup.import_poll, !1, !0, "psource-ajax-popup");
                            break;
                        case "import_quiz":
                            this.open_import_module_modal("quiz", o, r, Powerform.l10n.popup.import_quiz, !1, !0, "psource-ajax-popup");
                            break;
                        case "reset-plugin-settings":
                            this.open_reset_plugin_settings_popup(o, l, p);
                            break;
                        case "disconnect-stripe":
                            this.open_disconnect_stripe_popup(o, l, p);
                            break;
                        case "disconnect-paypal":
                            this.open_disconnect_paypal_popup(o, l, p);
                            break;
                        case "approve-user-module":
                            var u = i.data("activation-key");
                            this.open_approve_user_popup(o, l, p, u);
                            break;
                        case "delete-unconfirmed-user-module":
                            this.open_unconfirmed_user_popup(i.data("form-id"), o, l, p, i.data("activation-key"), i.data("entry-id"))
                    }
                },
                open_popup: function(e, i, n, o, r, a, s) {
                    _.isUndefined(i) && (i = Powerform.l10n.custom_form.popup_label);
                    var l = { title: i };
                    _.isUndefined(n) || (l.has_custom_box = n), _.isUndefined(o) || (l.action_text = o), _.isUndefined(r) || (l.action_css_class = r), _.isUndefined(a) || (l.action_callback = a), Powerform.Popup.open(function() { _.isUndefined(e.el) ? t(this).append(e) : t(this).append(e.el), "function" == typeof s && s.apply(this) }, l)
                },
                open_ajax_popup: function(e, i, n, o, r, a, l) {
                    _.isUndefined(o) && (o = Powerform.l10n.custom_form.popup_label), _.isUndefined(r) && (r = !0), _.isUndefined(a) && (a = !1), _.isUndefined(l) && (l = "sui-box-body");
                    var p = new s({ action: e, nonce: i, id: n, enable_loader: !0, className: l }),
                        d = { title: o, has_custom_box: a };
                    Powerform.Popup.open(function() { t(this).append(p.el) }, d)
                },
                open_cform_popup: function() {
                    var i = new e({ type: "form" });
                    i.render();
                    var n = i;
                    Powerform.New_Popup.open(function() { _.isUndefined(n.el) ? t(this).append(n) : t(this).append(n.el), t(this).closest(".sui-dialog").removeClass("sui-dialog-sm"), t(this).closest(".sui-dialog").addClass("sui-dialog-alt"), t(this).closest(".sui-dialog").find(".sui-box-header").addClass("sui-block-content-center") }, { title: "", has_custom_box: !0 })
                },
                open_delete_popup: function(e, i, n, o, r) {
                    var a = new l({ module: e, id: i, nonce: n, referrer: window.location.pathname + window.location.search, content: r });
                    a.render();
                    var s = a;
                    Powerform.Popup.open(function() { _.isUndefined(s.el) ? t(this).append(s) : t(this).append(s.el) }, { title: o, has_custom_box: !0 })
                },
                open_login_popup: function() {
                    var t = new i;
                    t.render(), this.open_popup(t, Powerform.l10n.popup.edit_login_form)
                },
                open_polls_popup: function() {
                    var e = new a({ type: "poll" });
                    e.render();
                    var i = e;
                    Powerform.New_Popup.open(function() { _.isUndefined(i.el) ? t(this).append(i) : t(this).append(i.el) }, { title: "" })
                },
                open_quizzes_popup: function() {
                    var e = new n;
                    e.render();
                    var i = e;
                    Powerform.New_Popup.open(function() { _.isUndefined(i.el) ? t(this).append(i) : t(this).append(i.el), t(this).closest(".sui-dialog").removeClass("sui-dialog-sm"), t(this).closest(".sui-dialog").addClass("sui-dialog-alt"), t(this).closest(".sui-dialog").find(".sui-box-header").addClass("sui-block-content-center") }, { title: Powerform.l10n.quiz.choose_quiz_title, has_custom_box: !0 })
                },
                open_exports_schedule_popup: function() {
                    var t = new o;
                    t.render(), this.open_popup(t, Powerform.l10n.popup.edit_scheduled_export, !0)
                },
                open_settings_modal: function(t, e, i, n, o, r, a) { this.open_ajax_popup(t, e, i, n, o, r, a) },
                open_export_module_modal: function(t, e, i, n, o, r, a) {
                    var s = "";
                    switch (t) {
                        case "custom_form":
                            s = "export_custom_form";
                            break;
                        case "poll":
                            s = "export_poll";
                            break;
                        case "quiz":
                            s = "export_quiz"
                    }
                    this.open_ajax_popup(s, e, i, n, o, r, a)
                },
                open_import_module_modal: function(t, e, i, n, o, r, a) {
                    var s = "";
                    switch (t) {
                        case "custom_form":
                            s = "import_custom_form";
                            break;
                        case "custom_form_cf7":
                            s = "import_custom_form_cf7";
                            break;
                        case "custom_form_ninja":
                            s = "import_custom_form_ninja";
                            break;
                        case "custom_form_gravity":
                            s = "import_custom_form_gravity";
                            break;
                        case "poll":
                            s = "import_poll";
                            break;
                        case "quiz":
                            s = "import_quiz"
                    }
                    this.open_ajax_popup(s, e, i, n, o, r, a)
                },
                open_preview_popup: function(e, i, n, o, r) {
                    _.isUndefined(i) && (i = Powerform.l10n.custom_form.popup_label);
                    var a = new p({ action: n, type: o, nonce: r, id: e, enable_loader: !0, className: "sui-box-body" }),
                        s = { title: i, has_custom_box: !0 };
                    Powerform.Popup.open(function() { t(this).append(a.el) }, s)
                },
                open_quiz_preview_popup: function(e, i, n, o, r, a, s) {
                    _.isUndefined(i) && (i = Powerform.l10n.custom_form.popup_label);
                    var l = new p({ action: n, type: o, id: e, enable_loader: !0, className: "sui-box-body", has_lead: r, leads_id: a, nonce: s }),
                        d = { title: i, has_custom_box: !0 };
                    Powerform.Popup.open(function() { t(this).append(l.el) }, d)
                },
                open_reset_plugin_settings_popup: function(e, i, n) {
                    var o = new d({ nonce: e, referrer: window.location.pathname + window.location.search, content: n });
                    o.render();
                    var r = o;
                    Powerform.Popup.open(function() { _.isUndefined(r.el) ? t(this).append(r) : t(this).append(r.el), t(this).closest(".sui-dialog").addClass("sui-dialog-alt sui-dialog-sm"), t(this).closest(".sui-dialog").find(".sui-box-header, .sui-box-body").addClass("sui-block-content-center"), t(this).closest(".sui-dialog").find(".sui-box-body").css({ "padding-top": "10px" }), t(this).closest(".sui-dialog").find(".sui-box-footer").css({ "padding-top": "0", "padding-bottom": "40px", "justify-content": "center" }) }, { title: i, has_custom_box: !0 })
                },
                open_disconnect_stripe_popup: function(e, i, n) {
                    var o = new u({ nonce: e, referrer: window.location.pathname + window.location.search, content: n });
                    o.render();
                    var r = o;
                    Powerform.Popup.open(function() { _.isUndefined(r.el) ? t(this).append(r) : t(this).append(r.el), t(this).closest(".sui-dialog").addClass("sui-dialog-alt sui-dialog-sm"), t(this).closest(".sui-dialog").find(".sui-box-header, .sui-box-body").addClass("sui-block-content-center"), t(this).closest(".sui-dialog").find(".sui-box-body").css({ "padding-top": "10px" }), t(this).closest(".sui-dialog").find(".sui-box-footer").css({ "padding-top": "0", "padding-bottom": "40px", "justify-content": "center" }) }, { title: i, has_custom_box: !0 })
                },
                open_disconnect_paypal_popup: function(e, i, n) {
                    var o = new c({ nonce: e, referrer: window.location.pathname + window.location.search, content: n });
                    o.render();
                    var r = o;
                    Powerform.Popup.open(function() { _.isUndefined(r.el) ? t(this).append(r) : t(this).append(r.el), t(this).closest(".sui-dialog").addClass("sui-dialog-alt sui-dialog-sm"), t(this).closest(".sui-dialog").find(".sui-box-header, .sui-box-body").addClass("sui-block-content-center"), t(this).closest(".sui-dialog").find(".sui-box-body").css({ "padding-top": "10px" }), t(this).closest(".sui-dialog").find(".sui-box-footer").css({ "padding-top": "0", "padding-bottom": "40px", "justify-content": "center" }) }, { title: i, has_custom_box: !0 })
                },
                open_approve_user_popup: function(e, i, n, o) {
                    var r = new m({ nonce: e, referrer: window.location.pathname + window.location.search, content: n, activationKey: o });
                    r.render();
                    var a = r;
                    Powerform.Popup.open(function() { _.isUndefined(a.el) ? t(this).append(a) : t(this).append(a.el), t(this).closest(".sui-dialog").addClass("sui-dialog-alt sui-dialog-sm"), t(this).closest(".sui-dialog").find(".sui-box-header, .sui-box-body").addClass("sui-block-content-center"), t(this).closest(".sui-dialog").find(".sui-box-body").css({ "padding-top": "10px" }), t(this).closest(".sui-dialog").find(".sui-box-footer").css({ "padding-top": "0", "padding-bottom": "40px", "justify-content": "center" }) }, { title: i, has_custom_box: !0 })
                },
                open_unconfirmed_user_popup: function(e, i, n, o, r, a) {
                    var s = new f({ formId: e, nonce: i, referrer: window.location.pathname + window.location.search, content: o, activationKey: r, entryId: a });
                    s.render();
                    var l = s;
                    Powerform.Popup.open(function() { _.isUndefined(l.el) ? t(this).append(l) : t(this).append(l.el) }, { title: n, has_custom_box: !0 })
                }
            });
            jQuery(document).ready(function() { new h })
        })
    }(jQuery), formintorjs.define("text!tpl/popups.html", [], function() { return '<div>\r\n\r\n\t<script type="text/template" id="popup-integration-tpl">\r\n\r\n\t\t<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-integration-popup">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-integration-content-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<div class="sui-dialog-image" aria-hidden="true">\r\n\r\n\t\t\t\t<img\r\n\t\t\t\t\tsrc="{{ image }}"\r\n\t\t\t\t\tsrcset="{{ image }} 1x, {{ image_x2 }} 2x"\r\n\t\t\t\t\talt="{{ title }}"\r\n\t\t\t\t/>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="sui-box-content integration-header"></div>\r\n\r\n\t\t\t<button class="sui-dialog-back powerform-addon-back" aria-label="Back" style="display: none;"></button>\r\n\r\n\t\t\t<button class="sui-dialog-close powerform-integration-close" aria-label="{{ Powerform.l10n.popup.close_label }}"></button>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body"></div>\r\n\r\n\t\t<div class="sui-box-footer sui-box-footer-center"></div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-new-tpl">\r\n\r\n\t\t<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-popup">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-tpl">\r\n\r\n\t\t<div class="sui-dialog" id="powerform-popup" aria-hidden="true">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-header-tpl">\r\n\r\n\t\t<div class="sui-box-header">\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle">{{ title }}</h3>\r\n\r\n\t\t\t<div class="sui-actions-right">\r\n\r\n\t\t\t\t<button data-a11y-dialog-hide="" class="sui-dialog-close" aria-label=""></button>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-loader-tpl">\r\n\r\n\t\t<p class="fui-loading-dialog" aria-label="Loading content">\r\n\r\n\t\t\t<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>\r\n\r\n\t\t</p>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-stripe-tpl">\r\n\r\n\t\t<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-stripe-popup">\r\n\r\n\t\t\t<div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div>\r\n\r\n\t\t\t<div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog">\r\n\r\n\t\t\t\t<div class="sui-box" role="document"></div>\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t<\/script>\r\n\r\n\t<script type="text/template" id="popup-stripe-content-tpl">\r\n\r\n\t\t<div class="sui-box-header sui-block-content-center">\r\n\r\n\t\t\t<div class="sui-dialog-image" aria-hidden="true">\r\n\r\n\t\t\t\t<img src="{{ image }}"\r\n\t\t\t\t     srcset="{{ image }} 1x, {{ image_x2 }} 2x" alt="{{ title }}" />\r\n\r\n\t\t\t</div>\r\n\r\n\t\t\t<h3 class="sui-box-title" id="dialogTitle2" style="display: none;">{{ title }}</h3>\r\n\r\n\t\t\t<button class="sui-dialog-close powerform-integration-close" aria-label="{{ Powerform.l10n.popup.close_label }}"></button>\r\n\r\n\t\t</div>\r\n\r\n\t\t<div class="sui-box-body sui-block-content-center sui-box-body-slim"></div>\r\n\r\n\t\t<div class="sui-box-footer sui-box-footer-center"></div>\r\n\r\n\t<\/script>\r\n\r\n</div>\r\n' }),
    function(t) {
        formintorjs.define("admin/addons/view", ["text!tpl/popups.html"], function(e) {
            return Backbone.View.extend({
                className: "psource-section--integrations",
                loaderTpl: Powerform.Utils.template(t(e).find("#popup-loader-tpl").html()),
                model: {},
                events: { "click .powerform-addon-connect": "connect_addon", "click .powerform-addon-disconnect": "disconnect_addon", "click .powerform-addon-form-disconnect": "form_disconnect_addon", "click .powerform-addon-next": "submit_next_step", "click .powerform-addon-back": "go_prev_step", "click .powerform-addon-finish": "finish_steps" },
                initialize: function(t) { this.slug = t.slug, this.nonce = t.nonce, this.action = t.action, this.form_id = t.form_id, this.multi_id = t.multi_id, this.step = 0, this.next_step = !1, this.prev_step = !1, this.scrollbar_width = this.get_scrollbar_width(); var e = this; return this.$el.find(".powerform-integration-close, .powerform-addon-close").on("click", function() { e.close(e) }), this.render() },
                render: function() {
                    var t = {};
                    t.action = this.action, t._ajax_nonce = this.nonce, t.data = {}, t.data.slug = this.slug, t.data.step = this.step, t.data.current_step = this.step, this.form_id && (t.data.form_id = this.form_id), this.multi_id && (t.data.multi_id = this.multi_id), this.request(t, !1, !0)
                },
                request: function(e, i, n) {
                    var o = this,
                        r = { data: e, close: i, loader: n };
                    n && (this.$el.find(".sui-box-body").html(this.loaderTpl()), this.$el.find(".sui-box-footer").html(""), this.$el.find(".integration-header").html("")), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.ajax = t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: e }).done(function(e) {
                        if (e && e.success) {
                            o.render_body(e), o.render_footer(e);
                            var n = e.data.data;
                            if (o.on_render(n), o.$el.find(".sui-button").removeClass("sui-button-onload"), (i || !_.isUndefined(n.is_close) && n.is_close) && o.close(o), o.$el.find(".powerform-addon-close").on("click", function() { o.close(o) }), _.isUndefined(n.notification) || _.isUndefined(n.notification.type) || _.isUndefined(n.notification.text) || Powerform.Notification.open(n.notification.type, n.notification.text, 4e3), _.isUndefined(n.has_back) ? o.$el.find(".powerform-addon-back").hide() : n.has_back ? o.$el.find(".powerform-addon-back").show() : o.$el.find(".powerform-addon-back").hide(), !_.isUndefined(n.size)) { var a = t("#powerform-integration-popup"); "normal" === n.size && a.removeClass("sui-dialog-sm sui-dialog-lg"), "small" === n.size && (a.addClass("sui-dialog-sm"), a.removeClass("sui-dialog-lg")), "large" === n.size && (a.addClass("sui-dialog-lg"), a.removeClass("sui-dialog-sm")) }
                            n.is_poll && setTimeout(o.request(r.data, r.close, r.loader), 5e3);
                            t("#powerform-integration-popup .sui-box").height() > t(window).height() ? t("#powerform-integration-popup .sui-dialog-overlay").css("right", o.scrollbar_width + "px") : t("#powerform-integration-popup .sui-dialog-overlay").css("right", 0)
                        }
                    }), this.ajax.always(function() { o.$el.find(".fui-loading-dialog").remove() })
                },
                render_body: function(t) {
                    this.$el.find(".sui-box-body").html(t.data.data.html);
                    var e = this.$el.find(".sui-box-body .integration-header").remove();
                    e.length > 0 && this.$el.find(".integration-header").html(e.html()), t.data.data.nopadding && this.$el.find(".sui-box-body").css({ padding: "10px" })
                },
                render_footer: function(t) {
                    var e = this,
                        i = t.data.data.buttons;
                    e.$el.find(".sui-box-footer").html(""), _.each(i, function(t) { e.$el.find(".sui-box-footer").append(t.markup) })
                },
                on_render: function(t) { this.delegateEvents(), Powerform.Utils.sui_delegate_events(), Powerform.Utils.powerform_select2_tags(this.$el, {}), _.isUndefined(t.powerform_addon_current_step) || (this.step = +t.powerform_addon_current_step), _.isUndefined(t.powerform_addon_has_next_step) || (this.next_step = t.powerform_addon_has_next_step), _.isUndefined(t.powerform_addon_has_prev_step) || (this.prev_step = t.powerform_addon_has_prev_step) },
                get_step: function() { return this.next_step ? this.step + 1 : this.step },
                get_prev_step: function() { return this.prev_step ? this.step - 1 : this.step },
                connect_addon: function(e) {
                    var i = {},
                        n = this.$el.find("form"),
                        o = { slug: this.slug, step: this.get_step(), current_step: this.step },
                        r = n.serialize();
                    this.form_id && (o.form_id = this.form_id), this.multi_id && (o.multi_id = this.multi_id), r = r + "&" + t.param(o), i.action = this.action, i._ajax_nonce = this.nonce, i.data = r, this.request(i, !1, !1)
                },
                submit_next_step: function(e) {
                    var i = {},
                        n = this.$el.find("form"),
                        o = { slug: this.slug, step: this.get_step(), current_step: this.step },
                        r = n.serialize();
                    this.form_id && (o.form_id = this.form_id), r = r + "&" + t.param(o), i.action = this.action, i._ajax_nonce = this.nonce, i.data = r, this.request(i, !1, !1)
                },
                go_prev_step: function(t) {
                    var e = {},
                        i = { slug: this.slug, step: this.get_prev_step(), current_step: this.step };
                    this.form_id && (i.form_id = this.form_id), this.multi_id && (i.multi_id = this.multi_id), e.action = this.action, e._ajax_nonce = this.nonce, e.data = i, this.request(e, !1, !1)
                },
                finish_steps: function(e) {
                    var i = {},
                        n = this.$el.find("form"),
                        o = { slug: this.slug, step: this.get_step(), current_step: this.step },
                        r = n.serialize();
                    this.form_id && (o.form_id = this.form_id), this.multi_id && (o.multi_id = this.multi_id), r = r + "&" + t.param(o), i.action = this.action, i._ajax_nonce = this.nonce, i.data = r, this.request(i, !1, !1)
                },
                disconnect_addon: function(t) {
                    var e = {};
                    e.action = "powerform_addon_deactivate", e._ajax_nonce = this.nonce, e.data = {}, e.data.slug = this.slug, this.request(e, !0, !1)
                },
                form_disconnect_addon: function(t) {
                    var e = {};
                    e.action = "powerform_addon_form_deactivate", e._ajax_nonce = this.nonce, e.data = {}, e.data.slug = this.slug, e.data.form_id = this.form_id, this.multi_id && (e.data.multi_id = this.multi_id), this.request(e, !0, !1)
                },
                close: function(t) { t.ajax.abort(), t.remove(), Powerform.Integrations_Popup.close(), Powerform.Events.trigger("powerform:addons:reload") },
                get_scrollbar_width: function() {
                    var e = 0;
                    if (navigator.userAgent.match("MSIE")) {
                        var i = t('<textarea cols="10" rows="2"></textarea>').css({ position: "absolute", top: -1e3, left: -1e3 }).appendTo("body"),
                            n = t('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({ position: "absolute", top: -1e3, left: -1e3 }).appendTo("body");
                        e = i.width() - n.width(), i.add(n).remove()
                    } else {
                        var o = t("<div />").css({ width: 100, height: 100, overflow: "auto", position: "absolute", top: -1e3, left: -1e3 }).prependTo("body").append("<div />").find("div").css({ width: "100%", height: 200 });
                        e = 100 - o.width(), o.parent().remove()
                    }
                    return e
                }
            })
        })
    }(jQuery),
    function(t) {
        formintorjs.define("admin/addons/addons", ["admin/addons/view"], function(e) {
            var i = Backbone.View.extend({
                el: ".sui-wrap.psource-powerform-powerform-integrations",
                currentTab: "powerform-integrations",
                events: { "change .powerform-addon-toggle-enabled": "toggle_state", "click .connect-integration": "connect_integration", "click .powerform-integrations-wrapper .sui-vertical-tab a": "go_to_tab", "change .powerform-integrations-wrapper .sui-sidenav-hide-lg select": "go_to_tab", "keyup input.sui-form-control": "required_settings" },
                initialize: function(e) { if (t(this.el).length > 0) return this.listenTo(Powerform.Events, "powerform:addons:reload", this.render_addons_page), this.render() },
                render: function() { this.render_addons_page(), this.update_tab() },
                render_addons_page: function() {
                    var e = this,
                        i = {};
                    this.$el.find("#powerform-integrations-display").html('<div class="sui-notice sui-notice-loading"><p>Fetching integration list…</p></div>'), i.action = "powerform_addon_get_addons", i._ajax_nonce = Powerform.Data.addonNonce, i.data = {}, t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: i }).done(function(t) { t && t.success && e.$el.find("#powerform-integrations-page").html(t.data.data) }).always(function() { e.$el.find(".sui-notice sui-notice-loading").remove() })
                },
                connect_integration: function(i) {
                    i.preventDefault();
                    var n = t(i.target);
                    n.hasClass("connect-integration") || (n = n.closest(".connect-integration"));
                    var o = n.data("nonce"),
                        r = n.data("slug"),
                        a = n.data("title"),
                        s = n.data("image"),
                        l = n.data("imagex2"),
                        p = n.data("action"),
                        d = n.data("form-id"),
                        u = n.data("multi-id");
                    Powerform.Integrations_Popup.open(function() { new e({ slug: r, nonce: o, action: p, form_id: d, multi_id: u, el: t(this) }) }, { title: a, image: s, image_x2: l })
                },
                go_to_tab: function(e) {
                    e.preventDefault();
                    var i = t(e.target),
                        n = i.attr("href"),
                        o = "";
                    if (_.isUndefined(n)) { o = i.val() } else o = n.replace("#", "", n);
                    _.isEmpty(o) || (this.currentTab = o), this.update_tab(), e.stopPropagation()
                },
                update_tab_select: function() { this.$el.hasClass("psource-powerform-powerform-integrations") && (this.$el.find(".sui-sidenav-hide-lg select").val(this.currentTab), this.$el.find(".sui-sidenav-hide-lg select").trigger("sui:change")) },
                update_tab: function() { this.$el.hasClass("psource-powerform-powerform-integrations") && (this.clear_tabs(), this.$el.find("[data-tab-id=" + this.currentTab + "]").addClass("current"), this.$el.find(".psource-settings--box#" + this.currentTab).show()) },
                clear_tabs: function() { this.$el.hasClass("psource-powerform-powerform-integrations") && (this.$el.find(".sui-vertical-tab ").removeClass("current"), this.$el.find(".psource-settings--box").hide()) },
                required_settings: function(e) {
                    var i = t(e.target),
                        n = i.parent(),
                        o = n.find(".sui-error-message"),
                        r = i.closest("div[data-nav]"),
                        a = r.find(".sui-box-footer"),
                        s = a.find(".psource-action-done");
                    this.$el.hasClass("psource-powerform-powerform-settings") && (i.hasClass("powerform-required") && !i.val() && n.hasClass("sui-form-field") && (n.addClass("sui-form-field-error"), o.show()), i.hasClass("powerform-required") && i.val() && n.hasClass("sui-form-field") && (n.removeClass("sui-form-field-error"), o.hide()), r.find("input.sui-form-control").hasClass("powerform-required") && (0 === r.find("div.sui-form-field-error").length ? s.prop("disabled", !1) : s.prop("disabled", !0))), e.stopPropagation()
                }
            });
            jQuery(document).ready(function() { new i })
        })
    }(jQuery),
    function(t) { formintorjs.define("admin/views", ["admin/dashboard", "admin/settings-page", "admin/popups", "admin/addons/addons"], function(t, e, i, n) { return { Views: { Dashboard: t, SettingsPage: e, Popups: i } } }) }(jQuery),
    function(t) { formintorjs.define("admin/application", ["admin/views"], function(t) { return _.extend(Powerform, t), new(Backbone.Router.extend({ app: !1, data: !1, layout: !1, module_id: null, routes: { "": "run", "*path": "run" }, events: {}, init: function() { if (!this.data) return this.app = Powerform.Data.application || !1, this.data = {}, !1 }, run: function(t) { this.init(), this.module_id = t } })) }) }(jQuery), formintorjs.define("jquery", [], function() { return jQuery }), formintorjs.define("powerform_global_data", function() { return powerformData }), formintorjs.define("powerform_language", function() { return powerforml10n });
var Powerform = window.Powerform || {};
Powerform.Events = {}, Powerform.Data = {}, Powerform.l10n = {}, formintorjs.require.config({ baseUrl: ".", paths: { js: ".", admin: "admin" }, shim: { backbone: { deps: ["underscore", "jquery", "powerform_global_data", "powerform_language"], exports: "Backbone" }, underscore: { exports: "_" } }, waitSeconds: 60 }), formintorjs.require(["admin/utils"], function(t) { _.templateSettings = { evaluate: /\{\[([\s\S]+?)\]\}/g, interpolate: /\{\{([\s\S]+?)\}\}/g }, _.extend(Powerform.Data, powerformData), _.extend(Powerform.l10n, powerforml10n), _.extend(Powerform, t), _.extend(Powerform.Events, Backbone.Events), formintorjs.require(["admin/application"], function(t) { jQuery(document).ready(function() { _.extend(Powerform, t), Powerform.Events.trigger("application:booted"), Backbone.history.start() }) }) }), formintorjs.define("admin/setup", function() {}), formintorjs.define("main", function() {});