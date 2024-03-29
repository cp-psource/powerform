! function(e) {
    "use strict";
    var t, n = ["a[href]", "area[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];

    function i(e, t) { this._show = this.show.bind(this), this._hide = this.hide.bind(this), this._maintainFocus = this._maintainFocus.bind(this), this._bindKeypress = this._bindKeypress.bind(this), this.node = e, this._listeners = {}, this.create(t) }

    function o(e) { return Array.prototype.slice.call(e) }

    function r(e, t) { return o((t || document).querySelectorAll(e)) }

    function s(e) {
        var t = a(e);
        t.length && t[0].focus()
    }

    function a(e) { return r(n.join(","), e).filter(function(e) { return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) }) }
    i.prototype.create = function(e) { var t, n; return this._targets = this._targets || function(e) { if (NodeList.prototype.isPrototypeOf(e)) return o(e); if (Element.prototype.isPrototypeOf(e)) return [e]; if ("string" == typeof e) return r(e) }(e) || (t = this.node, (n = o(t.parentNode.childNodes).filter(function(e) { return 1 === e.nodeType })).splice(n.indexOf(t), 1), n), this.node.setAttribute("aria-hidden", !0), this.shown = !1, this._openers = r('[data-a11y-dialog-show="' + this.node.id + '"]'), this._openers.forEach(function(e) { e.addEventListener("click", this._show) }.bind(this)), this._closers = r("[data-a11y-dialog-hide]", this.node).concat(r('[data-a11y-dialog-hide="' + this.node.id + '"]')), this._closers.forEach(function(e) { e.addEventListener("click", this._hide) }.bind(this)), this._fire("create"), this }, i.prototype.show = function(e) {
        if (this.shown) return this;
        var n = this.node.getElementsByClassName("sui-dialog-overlay");
        return this.node.getElementsByClassName("sui-dialog-content")[0].className = "sui-dialog-content sui-bounce-in", n[0].className = "sui-dialog-overlay sui-fade-in", this.shown = !0, this.node.removeAttribute("aria-hidden"), this._targets.forEach(function(e) {
            var t = e.getAttribute("aria-hidden");
            t && e.setAttribute("data-a11y-dialog-original", t), e.setAttribute("aria-hidden", "true")
        }), t = document.activeElement, s(this.node), document.body.addEventListener("focus", this._maintainFocus, !0), document.addEventListener("keydown", this._bindKeypress), document.getElementsByTagName("html")[0].classList.add("sui-has-overlay"), this._fire("show", e), this
    }, i.prototype.hide = function(e) {
        if (!this.shown) return this;
        var n = this.node.getElementsByClassName("sui-dialog-overlay");
        this.node.getElementsByClassName("sui-dialog-content")[0].className = "sui-dialog-content sui-bounce-out", n[0].className = "sui-dialog-overlay sui-fade-out", this.shown = !1;
        var i = this.node;
        return setTimeout(function() { i.setAttribute("aria-hidden", "true") }, 300), this._targets.forEach(function(e) {
            var t = e.getAttribute("data-a11y-dialog-original");
            t ? (e.setAttribute("aria-hidden", t), e.removeAttribute("data-a11y-dialog-original")) : e.removeAttribute("aria-hidden")
        }), t && t.focus(), document.body.removeEventListener("focus", this._maintainFocus, !0), document.removeEventListener("keydown", this._bindKeypress), document.getElementsByTagName("html")[0].classList.remove("sui-has-overlay"), this._fire("hide", e), this
    }, i.prototype.destroy = function() { return this.hide(), this._openers.forEach(function(e) { e.removeEventListener("click", this._show) }.bind(this)), this._closers.forEach(function(e) { e.removeEventListener("click", this._hide) }.bind(this)), this._fire("destroy"), this._listeners = {}, this }, i.prototype.on = function(e, t) { return void 0 === this._listeners[e] && (this._listeners[e] = []), this._listeners[e].push(t), this }, i.prototype.off = function(e, t) { var n = this._listeners[e].indexOf(t); return n > -1 && this._listeners[e].splice(n, 1), this }, i.prototype._fire = function(e, t) {
        (this._listeners[e] || []).forEach(function(e) { e(this.node, t) }.bind(this))
    }, i.prototype._bindKeypress = function(e) {
        var t, n, i, o;
        this.shown && 27 === e.which && (e.preventDefault(), this.hide()), this.shown && 9 === e.which && (t = this.node, n = e, i = a(t), o = i.indexOf(document.activeElement), n.shiftKey && 0 === o ? (i[i.length - 1].focus(), n.preventDefault()) : n.shiftKey || o !== i.length - 1 || (i[0].focus(), n.preventDefault()))
    }, i.prototype._maintainFocus = function(e) { this.shown && !this.node.contains(e.target) && s(this.node) }, "undefined" != typeof module && void 0 !== module.exports ? module.exports = i : "function" == typeof define && define.amd ? define("A11yDialog", [], function() { return i }) : "object" == typeof e && (e.A11yDialog = i)
}("undefined" != typeof global ? global : window),
function(e) {
    "use strict";
    var t = "SUIAccordion",
        n = {};

    function i(i, o) { this.element = i, this.$element = e(this.element), this.settings = e.extend({}, n, o), this._defaults = n, this._name = t, this.init() }
    e.extend(i.prototype, {
        init: function() {
            this.$element.on("click", "div.sui-accordion-item-header, tr.sui-accordion-item", function(t) {
                var n = e(this).closest(".sui-accordion-item"),
                    i = (n.nextUntil(".sui-accordion-item").filter(".sui-accordion-item-content"), n.closest(".sui-accordion"), n.find(".sui-chartjs-animated"), e(t.target)),
                    o = e(this),
                    r = o.parent(),
                    s = r.find(".sui-chartjs-animated"),
                    a = r.parent(),
                    l = e(this),
                    c = l.nextUntil(".sui-accordion-item").filter(".sui-accordion-item-content");
                if (i.closest(".sui-accordion-item-action").length) return !0;
                o.hasClass("sui-accordion-item-header") && (r.hasClass("sui-accordion-item--disabled") ? r.removeClass("sui-accordion-item--open") : r.hasClass("sui-accordion-item--open") ? r.removeClass("sui-accordion-item--open") : r.addClass("sui-accordion-item--open"), a.hasClass("sui-accordion-block") && 0 !== s.length && (r.find(".sui-accordion-item-data").addClass("sui-onload"), s.removeClass("sui-chartjs-loaded"), r.hasClass("sui-accordion-item--open") && setTimeout(function() { r.find(".sui-accordion-item-data").removeClass("sui-onload"), s.addClass("sui-chartjs-loaded") }, 1200))), l.hasClass("sui-accordion-item") && (l.hasClass("sui-accordion-item--disabled") ? c.removeClass("sui-accordion-item--open") : l.hasClass("sui-accordion-item--open") ? (l.removeClass("sui-accordion-item--open"), c.removeClass("sui-accordion-item--open")) : (l.addClass("sui-accordion-item--open"), c.addClass("sui-accordion-item--open"))), t.stopPropagation()
            })
        }
    }), e.fn[t] = function(n) { return this.each(function() { e.data(this, t) || e.data(this, t, new i(this, n)) }) }
}(jQuery, window, document),
function(e) { "use strict"; "object" != typeof window.SUI && (window.SUI = {}), SUI.suiAccordion = function(t) { return e(t).SUIAccordion({}), this }, 0 !== e(".sui-2-3-15 .sui-accordion").length && e(".sui-2-3-15 .sui-accordion").each(function() { SUI.suiAccordion(this) }) }(jQuery),
function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ClipboardJS = t() : e.ClipboardJS = t() }(this, function() {
    return function(e) {
        var t = {};

        function n(i) { if (t[i]) return t[i].exports; var o = t[i] = { i: i, l: !1, exports: {} }; return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports }
        return n.m = e, n.c = t, n.i = function(e) { return e }, n.d = function(e, t, i) { n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: i }) }, n.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return n.d(t, "a", t), t }, n.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 3)
    }([function(e, t, n) {
        var i, o, r, s;
        s = function(e, t) {
            "use strict";
            var n, i = (n = t) && n.__esModule ? n : { default: n };
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
            var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                }(),
                s = function() {
                    function e(t) {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e), this.resolveOptions(t), this.initSelection() }
                    return r(e, [{
                        key: "resolveOptions",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }
                    }, { key: "initSelection", value: function() { this.text ? this.selectFake() : this.target && this.selectTarget() } }, {
                        key: "selectFake",
                        value: function() {
                            var e = this,
                                t = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function() { return e.removeFake() }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                            var n = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                        }
                    }, { key: "removeFake", value: function() { this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null) } }, { key: "selectTarget", value: function() { this.selectedText = (0, i.default)(this.target), this.copyText() } }, {
                        key: "copyText",
                        value: function() {
                            var e = void 0;
                            try { e = document.execCommand(this.action) } catch (t) { e = !1 }
                            this.handleResult(e)
                        }
                    }, { key: "handleResult", value: function(e) { this.emitter.emit(e ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) }) } }, { key: "clearSelection", value: function() { this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges() } }, { key: "destroy", value: function() { this.removeFake() } }, { key: "action", set: function() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy"; if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"') }, get: function() { return this._action } }, {
                        key: "target",
                        set: function(e) {
                            if (void 0 !== e) {
                                if (!e || "object" !== (void 0 === e ? "undefined" : o(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = e
                            }
                        },
                        get: function() { return this._target }
                    }]), e
                }();
            e.exports = s
        }, o = [e, n(7)], void 0 === (r = "function" == typeof(i = s) ? i.apply(t, o) : i) || (e.exports = r)
    }, function(e, t, n) {
        var i = n(6),
            o = n(5);
        e.exports = function(e, t, n) { if (!e && !t && !n) throw new Error("Missing required arguments"); if (!i.string(t)) throw new TypeError("Second argument must be a String"); if (!i.fn(n)) throw new TypeError("Third argument must be a Function"); if (i.node(e)) return d = t, g = n, (u = e).addEventListener(d, g), { destroy: function() { u.removeEventListener(d, g) } }; if (i.nodeList(e)) return l = e, c = t, h = n, Array.prototype.forEach.call(l, function(e) { e.addEventListener(c, h) }), { destroy: function() { Array.prototype.forEach.call(l, function(e) { e.removeEventListener(c, h) }) } }; if (i.string(e)) return r = e, s = t, a = n, o(document.body, r, s, a); throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList"); var r, s, a, l, c, h, u, d, g }
    }, function(e, t) {
        function n() {}
        n.prototype = {
            on: function(e, t, n) { var i = this.e || (this.e = {}); return (i[e] || (i[e] = [])).push({ fn: t, ctx: n }), this },
            once: function(e, t, n) {
                var i = this;

                function o() { i.off(e, o), t.apply(n, arguments) }
                return o._ = t, this.on(e, o, n)
            },
            emit: function(e) { for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, o = n.length; i < o; i++) n[i].fn.apply(n[i].ctx, t); return this },
            off: function(e, t) {
                var n = this.e || (this.e = {}),
                    i = n[e],
                    o = [];
                if (i && t)
                    for (var r = 0, s = i.length; r < s; r++) i[r].fn !== t && i[r].fn._ !== t && o.push(i[r]);
                return o.length ? n[e] = o : delete n[e], this
            }
        }, e.exports = n
    }, function(e, t, n) {
        var i, o, r, s;
        s = function(e, t, n, i) {
            "use strict";
            var o = a(t),
                r = a(n),
                s = a(i);

            function a(e) { return e && e.__esModule ? e : { default: e } }
            var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
            var c = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
            }();
            var h = function(e) {
                function t(e, n) {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, t); var i = function(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)); return i.resolveOptions(n), i.listenClick(e), i }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, r.default), c(t, [{
                    key: "resolveOptions",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === l(e.container) ? e.container : document.body
                    }
                }, {
                    key: "listenClick",
                    value: function(e) {
                        var t = this;
                        this.listener = (0, s.default)(e, "click", function(e) { return t.onClick(e) })
                    }
                }, {
                    key: "onClick",
                    value: function(e) {
                        var t = e.delegateTarget || e.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new o.default({ action: this.action(t), target: this.target(t), text: this.text(t), container: this.container, trigger: t, emitter: this })
                    }
                }, { key: "defaultAction", value: function(e) { return u("action", e) } }, { key: "defaultTarget", value: function(e) { var t = u("target", e); if (t) return document.querySelector(t) } }, { key: "defaultText", value: function(e) { return u("text", e) } }, { key: "destroy", value: function() { this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null) } }], [{
                    key: "isSupported",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                            t = "string" == typeof e ? [e] : e,
                            n = !!document.queryCommandSupported;
                        return t.forEach(function(e) { n = n && !!document.queryCommandSupported(e) }), n
                    }
                }]), t
            }();

            function u(e, t) { var n = "data-clipboard-" + e; if (t.hasAttribute(n)) return t.getAttribute(n) }
            e.exports = h
        }, o = [e, n(0), n(2), n(1)], void 0 === (r = "function" == typeof(i = s) ? i.apply(t, o) : i) || (e.exports = r)
    }, function(e, t) {
        var n = 9;
        if ("undefined" != typeof Element && !Element.prototype.matches) {
            var i = Element.prototype;
            i.matches = i.matchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector || i.webkitMatchesSelector
        }
        e.exports = function(e, t) {
            for (; e && e.nodeType !== n;) {
                if ("function" == typeof e.matches && e.matches(t)) return e;
                e = e.parentNode
            }
        }
    }, function(e, t, n) {
        var i = n(4);

        function o(e, t, n, o, r) { var s = function(e, t, n, o) { return function(n) { n.delegateTarget = i(n.target, t), n.delegateTarget && o.call(e, n) } }.apply(this, arguments); return e.addEventListener(n, s, r), { destroy: function() { e.removeEventListener(n, s, r) } } }
        e.exports = function(e, t, n, i, r) { return "function" == typeof e.addEventListener ? o.apply(null, arguments) : "function" == typeof n ? o.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, function(e) { return o(e, t, n, i, r) })) }
    }, function(e, t) { t.node = function(e) { return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType }, t.nodeList = function(e) { var n = Object.prototype.toString.call(e); return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in e && (0 === e.length || t.node(e[0])) }, t.string = function(e) { return "string" == typeof e || e instanceof String }, t.fn = function(e) { return "[object Function]" === Object.prototype.toString.call(e) } }, function(e, t) {
        e.exports = function(e) {
            var t;
            if ("SELECT" === e.nodeName) e.focus(), t = e.value;
            else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                var n = e.hasAttribute("readonly");
                n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value
            } else {
                e.hasAttribute("contenteditable") && e.focus();
                var i = window.getSelection(),
                    o = document.createRange();
                o.selectNodeContents(e), i.removeAllRanges(), i.addRange(o), t = i.toString()
            }
            return t
        }
    }])
}),
function(e, t, n, i, o) {
    "use strict";
    var r = "SUICodeSnippet",
        s = { copyText: "Copy", copiedText: "Copied!" };

    function a(t, n) { this.element = t, this.$element = e(this.element), this.settings = e.extend({}, s, n), this._defaults = s, this._name = r, this._clipboardJs = null, this._clipboardId = "", this.init() }
    e.extend(a.prototype, {
        init: function() {
            var n = this,
                i = "";
            0 === this.$element.parent("sui-code-snippet-wrapper").length && (this.$element.wrap('<div class="sui-code-snippet-wrapper"></div>'), this._clipboardId = this.generateUniqueId(), i = '<button class="sui-button" id="sui-code-snippet-button-' + this._clipboardId + '" data-clipboard-target="#sui-code-snippet-' + this._clipboardId + '">' + this.settings.copyText + "</button>", this.$element.attr("id", "sui-code-snippet-" + this._clipboardId).after(i), this._clipboardJs = new t("#sui-code-snippet-button-" + this._clipboardId), this._clipboardJs.on("success", function(e) { e.clearSelection(), n.showTooltip(e.trigger, n.settings.copiedText) }), e("#sui-code-snippet-button-" + this._clipboardId).on("mouseleave.SUICodeSnippet", function() { e(this).removeClass("sui-tooltip"), e(this).removeAttr("aria-label"), e(this).removeAttr("data-tooltip") }))
        },
        getClipboardJs: function() { return this._clipboardJs },
        showTooltip: function(t, n) { e(t).addClass("sui-tooltip"), e(t).attr("aria-label", n), e(t).attr("data-tooltip", n) },
        generateUniqueId: function() { return "_" + Math.random().toString(36).substr(2, 9) },
        destroy: function() { null !== this._clipboardJs && (this._clipboardJs.destroy(), this.$element.attr("id", ""), this.$element.unwrap(".sui-code-snippet-wrapper"), e("#sui-code-snippet-button-" + this._clipboardId).remove()) }
    }), e.fn[r] = function(t) { return this.each(function() { e.data(this, r) || e.data(this, r, new a(this, t)) }) }
}(jQuery, ClipboardJS, window, document),
function(e) { "use strict"; "object" != typeof window.SUI && (window.SUI = {}), SUI.suiCodeSnippet = function() { e(".sui-2-3-15 .sui-code-snippet:not(.sui-no-copy)").each(function() { e(this).SUICodeSnippet({}) }) }, e(document).ready(function() { SUI.suiCodeSnippet() }) }(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.linkDropdown = function() {
        function t(t) {
            var n = e(".sui-2-3-15 .sui-dropdown");
            t && (n = n.not(t)), n.removeClass("open")
        }
        e("body").on("click", ".sui-dropdown-anchor", function(n) {
            var i = e(this).parent();
            t(i), i.hasClass("sui-dropdown") && i.toggleClass("open"), n.preventDefault()
        }), e("body").mouseup(function(n) {
            var i = e(".sui-2-3-15 .sui-dropdown-anchor");
            i.is(n.target) || 0 !== i.has(n.target).length || t()
        })
    }, SUI.linkDropdown()
}(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), document.addEventListener("DOMContentLoaded", function() {
        var t = e(".sui-wrap");
        SUI.dialogs = {}, e(".sui-dialog").each(function() { SUI.dialogs[this.id] = new A11yDialog(this, t) })
    })
}(jQuery),
function(e) { e(".sui-2-3-15 .sui-notice-top:not(.sui-can-dismiss, .sui-cant-dismiss)").delay(3e3).slideUp("slow"), e(".sui-2-3-15 .sui-notice-dismiss").click(function(t) { return t.preventDefault(), e(this).parent().stop().slideUp("slow"), !1 }) }(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.showHidePassword = function() {
        e(".sui-2-3-15 .sui-form-field").each(function() {
            var t = e(this);
            0 !== t.find('input[type="password"]').length && t.find('[class*="sui-button"], .sui-password-toggle').on("click", function() {
                var t = e(this),
                    n = t.parent().find("input"),
                    i = t.find("i");
                t.parent().toggleClass("sui-password-visible"), t.find(".sui-password-text").toggleClass("sui-hidden"), t.parent().hasClass("sui-password-visible") ? (n.prop("type", "text"), i.removeClass("sui-icon-eye").addClass("sui-icon-eye-hide")) : (n.prop("type", "password"), i.removeClass("sui-icon-eye-hide").addClass("sui-icon-eye"))
            })
        })
    }, SUI.showHidePassword()
}(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.loadCircleScore = function(t) {
        e(t).find("svg circle:last-child");
        var n = e(t).data("score"),
            i = '<svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n<circle stroke-width="16" cx="50" cy="50" r="42" />\n<circle stroke-width="16" cx="50" cy="50" r="42" stroke-dasharray="0,' + (100 * (2 * Math.PI * 42 / 100 * n) - n) + '" />\n</svg>\n<span class="sui-circle-score-label">' + n + "</span>\n";
        e(t).prepend(i).addClass("loaded").find("circle:last-child").css("animation", "sui" + n + " 3s forwards")
    }, e(".sui-2-3-15 .sui-circle-score").each(function() { SUI.loadCircleScore(this) })
}(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.suiSelect = function(t) {
        var n, i, o, r, s, a, l = e(t);
        if (l.is("select") && !(l.closest(".select-container").length || l.data("select2") || l.is(".sui-select") || l.is(".none-sui"))) return l.wrap('<div class="select-container">'), l.hide(), n = l.parent(), i = e('<span class="dropdown-handle"><i class="sui-icon-chevron-down" aria-hidden="true"></i></span>').prependTo(n), o = e('<div class="select-list-container"></div>').appendTo(n), r = e('<div class="list-value">&nbsp;</div>').appendTo(o), s = e('<ul class="list-results"></ul>').appendTo(o), n.addClass(l.attr("class")), c(), l.on("sui:change", function() { c(), s.find("li").not(".optgroup-label").on("click", function(t) { f(e(t.target), !1), h() }) }), s.find("li").not(".optgroup-label").on("click", function(t) { f(e(t.target), !1), h() }), i.on("click", u), r.on("click", u), l.on("focus", g), e(document).click(function(t) {
            var n, i = e(t.target);
            i.closest(".select-container").length || i.is("label") && i.attr("for") && (n = i.attr("for"), e("select#" + n).length) || d()
        }), (a = l.attr("id")) && e("label[for=" + a + "]").on("click", g), l.addClass("sui-styled"), this;

        function c() {
            var t = l.children();
            s.empty(), t.each(function() {
                var t, n, i, o = e(this),
                    r = e(this);
                "OPTION" == e(this).prop("tagName") ? (t = e("<li></li>").appendTo(s), o.data("content") ? (t.addClass("sui-element-flex"), t.html("<span>" + o.text() + "</span><span>" + o.data("content") + "</span>")) : o.data("icon") ? t.html('<i class="sui-icon-' + o.data("icon") + '" aria-hidden="true"></i> ' + o.text()) : t.text(o.text()), t.data("value", o.val()), o.val() == l.val() && f(t, !0)) : (n = e("<ul></ul>").appendTo(s), i = e('<li class="optgroup-label"></li>').text(r.prop("label")), n.html(i), n.addClass("optgroup"), r.find("option").each(function() {
                    var t, i = e(this);
                    (t = e("<li></li>").appendTo(n)).text(i.text()), t.data("value", i.val()), i.val() == l.val() && f(t)
                }))
            })
        }

        function h() {
            var e = l[0].value;
            e.match("^https?://|#") && (window.location.href = e)
        }

        function u() { n.find("select").is(":disabled") || (n.hasClass("active") ? d() : g()) }

        function d(e) { e || (e = n), e.removeClass("active"), e.closest("tr").removeClass("select-open") }

        function g() { e(".select-container.active").each(function() { d(e(this)) }), n.addClass("active"), n.closest("tr").addClass("select-open") }

        function f(t, n) { n = void 0 !== n && n, r.text(t.text()), e(".current", s).removeClass("current"), t.addClass("current"), d(), l.val(t.data("value")), n || l.trigger("change") }
    }, e(".sui-2-3-15 select").each(function() { SUI.suiSelect(this) })
}(jQuery),
function(e) { e(jQuery) }(function(e) {
    return function() {
        if (e && e.fn && e.fn.select2 && e.fn.select2.amd) var t = e.fn.select2.amd;
        var n, i, o, r;
        return t && t.requirejs || (t ? i = t : t = {}, function(e) {
            var t, r, s, a, l = {},
                c = {},
                h = {},
                u = {},
                d = Object.prototype.hasOwnProperty,
                g = [].slice,
                f = /\.js$/;

            function p(e, t) { return d.call(e, t) }

            function m(e, t) {
                var n, i, o, r, s, a, l, c, u, d, g, p = t && t.split("/"),
                    m = h.map,
                    v = m && m["*"] || {};
                if (e) {
                    for (s = (e = e.split("/")).length - 1, h.nodeIdCompat && f.test(e[s]) && (e[s] = e[s].replace(f, "")), "." === e[0].charAt(0) && p && (e = p.slice(0, p.length - 1).concat(e)), u = 0; u < e.length; u++)
                        if ("." === (g = e[u])) e.splice(u, 1), u -= 1;
                        else if (".." === g) {
                        if (0 === u || 1 === u && ".." === e[2] || ".." === e[u - 1]) continue;
                        u > 0 && (e.splice(u - 1, 2), u -= 2)
                    }
                    e = e.join("/")
                }
                if ((p || v) && m) {
                    for (u = (n = e.split("/")).length; u > 0; u -= 1) {
                        if (i = n.slice(0, u).join("/"), p)
                            for (d = p.length; d > 0; d -= 1)
                                if ((o = m[p.slice(0, d).join("/")]) && (o = o[i])) { r = o, a = u; break }
                        if (r) break;
                        !l && v && v[i] && (l = v[i], c = u)
                    }!r && l && (r = l, a = c), r && (n.splice(0, a, r), e = n.join("/"))
                }
                return e
            }

            function v(t, n) { return function() { var i = g.call(arguments, 0); return "string" != typeof i[0] && 1 === i.length && i.push(null), r.apply(e, i.concat([t, n])) } }

            function w(e) { return function(t) { l[e] = t } }

            function A(n) {
                if (p(c, n)) {
                    var i = c[n];
                    delete c[n], u[n] = !0, t.apply(e, i)
                }
                if (!p(l, n) && !p(u, n)) throw new Error("No " + n);
                return l[n]
            }

            function C(e) { var t, n = e ? e.indexOf("!") : -1; return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e] }

            function b(e) { return e ? C(e) : [] }
            s = function(e, t) {
                var n, i, o = C(e),
                    r = o[0],
                    s = t[1];
                return e = o[1], r && (n = A(r = m(r, s))), r ? e = n && n.normalize ? n.normalize(e, (i = s, function(e) { return m(e, i) })) : m(e, s) : (r = (o = C(e = m(e, s)))[0], e = o[1], r && (n = A(r))), { f: r ? r + "!" + e : e, n: e, pr: r, p: n }
            }, a = { require: function(e) { return v(e) }, exports: function(e) { var t = l[e]; return void 0 !== t ? t : l[e] = {} }, module: function(e) { return { id: e, uri: "", exports: l[e], config: (t = e, function() { return h && h.config && h.config[t] || {} }) }; var t } }, t = function(t, n, i, o) {
                var r, h, d, g, f, m, C, y = [],
                    F = typeof i;
                if (m = b(o = o || t), "undefined" === F || "function" === F) {
                    for (n = !n.length && i.length ? ["require", "exports", "module"] : n, f = 0; f < n.length; f += 1)
                        if ("require" === (h = (g = s(n[f], m)).f)) y[f] = a.require(t);
                        else if ("exports" === h) y[f] = a.exports(t), C = !0;
                    else if ("module" === h) r = y[f] = a.module(t);
                    else if (p(l, h) || p(c, h) || p(u, h)) y[f] = A(h);
                    else {
                        if (!g.p) throw new Error(t + " missing " + h);
                        g.p.load(g.n, v(o, !0), w(h), {}), y[f] = l[h]
                    }
                    d = i ? i.apply(l[t], y) : void 0, t && (r && r.exports !== e && r.exports !== l[t] ? l[t] = r.exports : d === e && C || (l[t] = d))
                } else t && (l[t] = i)
            }, n = i = r = function(n, i, o, l, c) {
                if ("string" == typeof n) return a[n] ? a[n](i) : A(s(n, b(i)).f);
                if (!n.splice) {
                    if ((h = n).deps && r(h.deps, h.callback), !i) return;
                    i.splice ? (n = i, i = o, o = null) : n = e
                }
                return i = i || function() {}, "function" == typeof o && (o = l, l = c), l ? t(e, n, i, o) : setTimeout(function() { t(e, n, i, o) }, 4), r
            }, r.config = function(e) { return r(e) }, n._defined = l, (o = function(e, t, n) {
                if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                t.splice || (n = t, t = []), p(l, e) || p(c, e) || (c[e] = [e, t, n])
            }).amd = { jQuery: !0 }
        }(), t.requirejs = n, t.require = i, t.define = o), t.define("almond", function() {}), t.define("jquery", [], function() { var t = e || $; return null == t && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), t }), t.define("select2/utils", ["jquery"], function(e) {
            var t = {};

            function n(e) {
                var t = e.prototype,
                    n = [];
                for (var i in t) { "function" == typeof t[i] && ("constructor" !== i && n.push(i)) }
                return n
            }
            t.Extend = function(e, t) {
                var n = {}.hasOwnProperty;

                function i() { this.constructor = e }
                for (var o in t) n.call(t, o) && (e[o] = t[o]);
                return i.prototype = t.prototype, e.prototype = new i, e.__super__ = t.prototype, e
            }, t.Decorate = function(e, t) {
                var i = n(t),
                    o = n(e);

                function r() {
                    var n = Array.prototype.unshift,
                        i = t.prototype.constructor.length,
                        o = e.prototype.constructor;
                    i > 0 && (n.call(arguments, e.prototype.constructor), o = t.prototype.constructor), o.apply(this, arguments)
                }
                t.displayName = e.displayName, r.prototype = new function() { this.constructor = r };
                for (var s = 0; s < o.length; s++) {
                    var a = o[s];
                    r.prototype[a] = e.prototype[a]
                }
                for (var l = function(e) {
                        var n = function() {};
                        e in r.prototype && (n = r.prototype[e]);
                        var i = t.prototype[e];
                        return function() { return Array.prototype.unshift.call(arguments, n), i.apply(this, arguments) }
                    }, c = 0; c < i.length; c++) {
                    var h = i[c];
                    r.prototype[h] = l(h)
                }
                return r
            };
            var i = function() { this.listeners = {} };
            return i.prototype.on = function(e, t) { this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t] }, i.prototype.trigger = function(e) {
                var t = Array.prototype.slice,
                    n = t.call(arguments, 1);
                this.listeners = this.listeners || {}, null == n && (n = []), 0 === n.length && n.push({}), n[0]._type = e, e in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
            }, i.prototype.invoke = function(e, t) { for (var n = 0, i = e.length; n < i; n++) e[n].apply(this, t) }, t.Observable = i, t.generateChars = function(e) { for (var t = "", n = 0; n < e; n++) { t += Math.floor(36 * Math.random()).toString(36) } return t }, t.bind = function(e, t) { return function() { e.apply(t, arguments) } }, t._convertData = function(e) {
                for (var t in e) {
                    var n = t.split("-"),
                        i = e;
                    if (1 !== n.length) {
                        for (var o = 0; o < n.length; o++) {
                            var r = n[o];
                            (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in i || (i[r] = {}), o == n.length - 1 && (i[r] = e[t]), i = i[r]
                        }
                        delete e[t]
                    }
                }
                return e
            }, t.hasScroll = function(t, n) {
                var i = e(n),
                    o = n.style.overflowX,
                    r = n.style.overflowY;
                return (o !== r || "hidden" !== r && "visible" !== r) && ("scroll" === o || "scroll" === r || (i.innerHeight() < n.scrollHeight || i.innerWidth() < n.scrollWidth))
            }, t.escapeMarkup = function(e) { var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" }; return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function(e) { return t[e] }) }, t.appendMany = function(t, n) {
                if ("1.7" === e.fn.jquery.substr(0, 3)) {
                    var i = e();
                    e.map(n, function(e) { i = i.add(e) }), n = i
                }
                t.append(n)
            }, t
        }), t.define("select2/results", ["jquery", "./utils"], function(e, t) {
            function n(e, t, i) { this.$element = e, this.data = i, this.options = t, n.__super__.constructor.call(this) }
            return t.Extend(n, t.Observable), n.prototype.render = function() { var t = e('<ul class="select2-results__options" role="tree"></ul>'); return this.options.get("multiple") && t.attr("aria-multiselectable", "true"), this.$results = t, t }, n.prototype.clear = function() { this.$results.empty() }, n.prototype.displayMessage = function(t) {
                var n = this.options.get("escapeMarkup");
                this.clear(), this.hideLoading();
                var i = e('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                    o = this.options.get("translations").get(t.message);
                i.append(n(o(t.args))), i[0].className += " select2-results__message", this.$results.append(i)
            }, n.prototype.hideMessages = function() { this.$results.find(".select2-results__message").remove() }, n.prototype.append = function(e) {
                this.hideLoading();
                var t = [];
                if (null != e.results && 0 !== e.results.length) {
                    e.results = this.sort(e.results);
                    for (var n = 0; n < e.results.length; n++) {
                        var i = e.results[n],
                            o = this.option(i);
                        t.push(o)
                    }
                    this.$results.append(t)
                } else 0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" })
            }, n.prototype.position = function(e, t) { t.find(".select2-results").append(e) }, n.prototype.sort = function(e) { return this.options.get("sorter")(e) }, n.prototype.highlightFirstItem = function() {
                var e = this.$results.find(".select2-results__option[aria-selected]"),
                    t = e.filter("[aria-selected=true]");
                t.length > 0 ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible()
            }, n.prototype.setClasses = function() {
                var t = this;
                this.data.current(function(n) {
                    var i = e.map(n, function(e) { return e.id.toString() });
                    t.$results.find(".select2-results__option[aria-selected]").each(function() {
                        var t = e(this),
                            n = e.data(this, "data"),
                            o = "" + n.id;
                        null != n.element && n.element.selected || null == n.element && e.inArray(o, i) > -1 ? t.attr("aria-selected", "true") : t.attr("aria-selected", "false")
                    })
                })
            }, n.prototype.showLoading = function(e) {
                this.hideLoading();
                var t = { disabled: !0, loading: !0, text: this.options.get("translations").get("searching")(e) },
                    n = this.option(t);
                n.className += " loading-results", this.$results.prepend(n)
            }, n.prototype.hideLoading = function() { this.$results.find(".loading-results").remove() }, n.prototype.option = function(t) {
                var n = document.createElement("li");
                n.className = "select2-results__option";
                var i = { role: "treeitem", "aria-selected": "false" };
                for (var o in t.disabled && (delete i["aria-selected"], i["aria-disabled"] = "true"), null == t.id && delete i["aria-selected"], null != t._resultId && (n.id = t._resultId), t.title && (n.title = t.title), t.children && (i.role = "group", i["aria-label"] = t.text, delete i["aria-selected"]), i) {
                    var r = i[o];
                    n.setAttribute(o, r)
                }
                if (t.children) {
                    var s = e(n),
                        a = document.createElement("strong");
                    a.className = "select2-results__group";
                    e(a);
                    this.template(t, a);
                    for (var l = [], c = 0; c < t.children.length; c++) {
                        var h = t.children[c],
                            u = this.option(h);
                        l.push(u)
                    }
                    var d = e("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                    d.append(l), s.append(a), s.append(d)
                } else this.template(t, n);
                return e.data(n, "data", t), n
            }, n.prototype.bind = function(t, n) {
                var i = this,
                    o = t.id + "-results";
                this.$results.attr("id", o), t.on("results:all", function(e) { i.clear(), i.append(e.data), t.isOpen() && (i.setClasses(), i.highlightFirstItem()) }), t.on("results:append", function(e) { i.append(e.data), t.isOpen() && i.setClasses() }), t.on("query", function(e) { i.hideMessages(), i.showLoading(e) }), t.on("select", function() { t.isOpen() && (i.setClasses(), i.highlightFirstItem()) }), t.on("unselect", function() { t.isOpen() && (i.setClasses(), i.highlightFirstItem()) }), t.on("open", function() { i.$results.attr("aria-expanded", "true"), i.$results.attr("aria-hidden", "false"), i.setClasses(), i.ensureHighlightVisible() }), t.on("close", function() { i.$results.attr("aria-expanded", "false"), i.$results.attr("aria-hidden", "true"), i.$results.removeAttr("aria-activedescendant") }), t.on("results:toggle", function() {
                    var e = i.getHighlightedResults();
                    0 !== e.length && e.trigger("mouseup")
                }), t.on("results:select", function() { var e = i.getHighlightedResults(); if (0 !== e.length) { var t = e.data("data"); "true" == e.attr("aria-selected") ? i.trigger("close", {}) : i.trigger("select", { data: t }) } }), t.on("results:previous", function() {
                    var e = i.getHighlightedResults(),
                        t = i.$results.find("[aria-selected]"),
                        n = t.index(e);
                    if (0 !== n) {
                        var o = n - 1;
                        0 === e.length && (o = 0);
                        var r = t.eq(o);
                        r.trigger("mouseenter");
                        var s = i.$results.offset().top,
                            a = r.offset().top,
                            l = i.$results.scrollTop() + (a - s);
                        0 === o ? i.$results.scrollTop(0) : a - s < 0 && i.$results.scrollTop(l)
                    }
                }), t.on("results:next", function() {
                    var e = i.getHighlightedResults(),
                        t = i.$results.find("[aria-selected]"),
                        n = t.index(e) + 1;
                    if (!(n >= t.length)) {
                        var o = t.eq(n);
                        o.trigger("mouseenter");
                        var r = i.$results.offset().top + i.$results.outerHeight(!1),
                            s = o.offset().top + o.outerHeight(!1),
                            a = i.$results.scrollTop() + s - r;
                        0 === n ? i.$results.scrollTop(0) : s > r && i.$results.scrollTop(a)
                    }
                }), t.on("results:focus", function(e) { e.element.addClass("select2-results__option--highlighted") }), t.on("results:message", function(e) { i.displayMessage(e) }), e.fn.mousewheel && this.$results.on("mousewheel", function(e) {
                    var t = i.$results.scrollTop(),
                        n = i.$results.get(0).scrollHeight - t + e.deltaY,
                        o = e.deltaY > 0 && t - e.deltaY <= 0,
                        r = e.deltaY < 0 && n <= i.$results.height();
                    o ? (i.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : r && (i.$results.scrollTop(i.$results.get(0).scrollHeight - i.$results.height()), e.preventDefault(), e.stopPropagation())
                }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(t) {
                    var n = e(this),
                        o = n.data("data");
                    "true" !== n.attr("aria-selected") ? i.trigger("select", { originalEvent: t, data: o }) : i.options.get("multiple") ? i.trigger("unselect", { originalEvent: t, data: o }) : i.trigger("close", {})
                }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(t) {
                    var n = e(this).data("data");
                    i.getHighlightedResults().removeClass("select2-results__option--highlighted"), i.trigger("results:focus", { data: n, element: e(this) })
                })
            }, n.prototype.getHighlightedResults = function() { return this.$results.find(".select2-results__option--highlighted") }, n.prototype.destroy = function() { this.$results.remove() }, n.prototype.ensureHighlightVisible = function() {
                var e = this.getHighlightedResults();
                if (0 !== e.length) {
                    var t = this.$results.find("[aria-selected]").index(e),
                        n = this.$results.offset().top,
                        i = e.offset().top,
                        o = this.$results.scrollTop() + (i - n),
                        r = i - n;
                    o -= 2 * e.outerHeight(!1), t <= 2 ? this.$results.scrollTop(0) : (r > this.$results.outerHeight() || r < 0) && this.$results.scrollTop(o)
                }
            }, n.prototype.template = function(t, n) {
                var i = this.options.get("templateResult"),
                    o = this.options.get("escapeMarkup"),
                    r = i(t, n);
                null == r ? n.style.display = "none" : "string" == typeof r ? n.innerHTML = o(r) : e(n).append(r)
            }, n
        }), t.define("select2/keys", [], function() { return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 } }), t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(e, t, n) {
            function i(e, t) { this.$element = e, this.options = t, i.__super__.constructor.call(this) }
            return t.Extend(i, t.Observable), i.prototype.render = function() { var t = e('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'); return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), t.attr("title", this.$element.attr("title")), t.attr("tabindex", this._tabindex), this.$selection = t, t }, i.prototype.bind = function(e, t) {
                var i = this,
                    o = (e.id, e.id + "-results");
                this.container = e, this.$selection.on("focus", function(e) { i.trigger("focus", e) }), this.$selection.on("blur", function(e) { i._handleBlur(e) }), this.$selection.on("keydown", function(e) { i.trigger("keypress", e), e.which === n.SPACE && e.preventDefault() }), e.on("results:focus", function(e) { i.$selection.attr("aria-activedescendant", e.data._resultId) }), e.on("selection:update", function(e) { i.update(e.data) }), e.on("open", function() { i.$selection.attr("aria-expanded", "true"), i.$selection.attr("aria-owns", o), i._attachCloseHandler(e) }), e.on("close", function() { i.$selection.attr("aria-expanded", "false"), i.$selection.removeAttr("aria-activedescendant"), i.$selection.removeAttr("aria-owns"), i.$selection.focus(), i._detachCloseHandler(e) }), e.on("enable", function() { i.$selection.attr("tabindex", i._tabindex) }), e.on("disable", function() { i.$selection.attr("tabindex", "-1") })
            }, i.prototype._handleBlur = function(t) {
                var n = this;
                window.setTimeout(function() { document.activeElement == n.$selection[0] || e.contains(n.$selection[0], document.activeElement) || n.trigger("blur", t) }, 1)
            }, i.prototype._attachCloseHandler = function(t) {
                e(document.body).on("mousedown.select2." + t.id, function(t) {
                    var n = e(t.target).closest(".select2");
                    e(".select2.select2-container--open").each(function() {
                        var t = e(this);
                        this != n[0] && t.data("element").SUIselect2("close")
                    })
                })
            }, i.prototype._detachCloseHandler = function(t) { e(document.body).off("mousedown.select2." + t.id) }, i.prototype.position = function(e, t) { t.find(".selection").append(e) }, i.prototype.destroy = function() { this._detachCloseHandler(this.container) }, i.prototype.update = function(e) { throw new Error("The `update` method must be defined in child classes.") }, i
        }), t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, n, i) {
            function o() { o.__super__.constructor.apply(this, arguments) }
            return n.Extend(o, t), o.prototype.render = function() { var e = o.__super__.render.call(this); return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e }, o.prototype.bind = function(e, t) {
                var n = this;
                o.__super__.bind.apply(this, arguments);
                var i = e.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", i), this.$selection.attr("aria-labelledby", i), this.$selection.on("mousedown", function(e) { 1 === e.which && n.trigger("toggle", { originalEvent: e }) }), this.$selection.on("focus", function(e) {}), this.$selection.on("blur", function(e) {}), e.on("focus", function(t) { e.isOpen() || n.$selection.focus() }), e.on("selection:update", function(e) { n.update(e.data) })
            }, o.prototype.clear = function() { this.$selection.find(".select2-selection__rendered").empty() }, o.prototype.display = function(e, t) { var n = this.options.get("templateSelection"); return this.options.get("escapeMarkup")(n(e, t)) }, o.prototype.selectionContainer = function() { return e("<span></span>") }, o.prototype.update = function(e) {
                if (0 !== e.length) {
                    var t = e[0],
                        n = this.$selection.find(".select2-selection__rendered"),
                        i = this.display(t, n);
                    n.empty().append(i), n.prop("title", t.title || t.text)
                } else this.clear()
            }, o
        }), t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(e, t, n) {
            function i(e, t) { i.__super__.constructor.apply(this, arguments) }
            return n.Extend(i, t), i.prototype.render = function() { var e = i.__super__.render.call(this); return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e }, i.prototype.bind = function(t, n) {
                var o = this;
                i.__super__.bind.apply(this, arguments), this.$selection.on("click", function(e) { o.trigger("toggle", { originalEvent: e }) }), this.$selection.on("click", ".select2-selection__choice__remove", function(t) {
                    if (!o.options.get("disabled")) {
                        var n = e(this).parent().data("data");
                        o.trigger("unselect", { originalEvent: t, data: n })
                    }
                })
            }, i.prototype.clear = function() { this.$selection.find(".select2-selection__rendered").empty() }, i.prototype.display = function(e, t) { var n = this.options.get("templateSelection"); return this.options.get("escapeMarkup")(n(e, t)) }, i.prototype.selectionContainer = function() { return e('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>') }, i.prototype.update = function(e) {
                if (this.clear(), 0 !== e.length) {
                    for (var t = [], i = 0; i < e.length; i++) {
                        var o = e[i],
                            r = this.selectionContainer(),
                            s = this.display(o, r);
                        r.append(s), r.prop("title", o.title || o.text), r.data("data", o), t.push(r)
                    }
                    var a = this.$selection.find(".select2-selection__rendered");
                    n.appendMany(a, t)
                }
            }, i
        }), t.define("select2/selection/placeholder", ["../utils"], function(e) {
            function t(e, t, n) { this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n) }
            return t.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, t.prototype.createPlaceholder = function(e, t) { var n = this.selectionContainer(); return n.html(this.display(t)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n }, t.prototype.update = function(e, t) {
                var n = 1 == t.length && t[0].id != this.placeholder.id;
                if (t.length > 1 || n) return e.call(this, t);
                this.clear();
                var i = this.createPlaceholder(this.placeholder);
                this.$selection.find(".select2-selection__rendered").append(i)
            }, t
        }), t.define("select2/selection/allowClear", ["jquery", "../keys"], function(e, t) {
            function n() {}
            return n.prototype.bind = function(e, t, n) {
                var i = this;
                e.call(this, t, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(e) { i._handleClear(e) }), t.on("keypress", function(e) { i._handleKeyboardClear(e, t) })
            }, n.prototype._handleClear = function(e, t) {
                if (!this.options.get("disabled")) {
                    var n = this.$selection.find(".select2-selection__clear");
                    if (0 !== n.length) {
                        t.stopPropagation();
                        for (var i = n.data("data"), o = 0; o < i.length; o++) { var r = { data: i[o] }; if (this.trigger("unselect", r), r.prevented) return }
                        this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {})
                    }
                }
            }, n.prototype._handleKeyboardClear = function(e, n, i) { i.isOpen() || n.which != t.DELETE && n.which != t.BACKSPACE || this._handleClear(n) }, n.prototype.update = function(t, n) {
                if (t.call(this, n), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === n.length)) {
                    var i = e('<span class="select2-selection__clear">&times;</span>');
                    i.data("data", n), this.$selection.find(".select2-selection__rendered").prepend(i)
                }
            }, n
        }), t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(e, t, n) {
            function i(e, t, n) { e.call(this, t, n) }
            return i.prototype.render = function(t) {
                var n = e('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
                this.$searchContainer = n, this.$search = n.find("input");
                var i = t.call(this);
                return this._transferTabIndex(), i
            }, i.prototype.bind = function(e, t, i) {
                var o = this;
                e.call(this, t, i), t.on("open", function() { o.$search.trigger("focus") }), t.on("close", function() { o.$search.val(""), o.$search.removeAttr("aria-activedescendant"), o.$search.trigger("focus") }), t.on("enable", function() { o.$search.prop("disabled", !1), o._transferTabIndex() }), t.on("disable", function() { o.$search.prop("disabled", !0) }), t.on("focus", function(e) { o.$search.trigger("focus") }), t.on("results:focus", function(e) { o.$search.attr("aria-activedescendant", e.id) }), this.$selection.on("focusin", ".select2-search--inline", function(e) { o.trigger("focus", e) }), this.$selection.on("focusout", ".select2-search--inline", function(e) { o._handleBlur(e) }), this.$selection.on("keydown", ".select2-search--inline", function(e) {
                    if (e.stopPropagation(), o.trigger("keypress", e), o._keyUpPrevented = e.isDefaultPrevented(), e.which === n.BACKSPACE && "" === o.$search.val()) {
                        var t = o.$searchContainer.prev(".select2-selection__choice");
                        if (t.length > 0) {
                            var i = t.data("data");
                            o.searchRemoveChoice(i), e.preventDefault()
                        }
                    }
                });
                var r = document.documentMode,
                    s = r && r <= 11;
                this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) { s ? o.$selection.off("input.search input.searchcheck") : o.$selection.off("keyup.search") }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) {
                    if (s && "input" === e.type) o.$selection.off("input.search input.searchcheck");
                    else {
                        var t = e.which;
                        t != n.SHIFT && t != n.CTRL && t != n.ALT && t != n.TAB && o.handleSearch(e)
                    }
                })
            }, i.prototype._transferTabIndex = function(e) { this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1") }, i.prototype.createPlaceholder = function(e, t) { this.$search.attr("placeholder", t.text) }, i.prototype.update = function(e, t) {
                var n = this.$search[0] == document.activeElement;
                this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.focus()
            }, i.prototype.handleSearch = function() {
                if (this.resizeSearch(), !this._keyUpPrevented) {
                    var e = this.$search.val();
                    this.trigger("query", { term: e })
                }
                this._keyUpPrevented = !1
            }, i.prototype.searchRemoveChoice = function(e, t) { this.trigger("unselect", { data: t }), this.$search.val(t.text), this.handleSearch() }, i.prototype.resizeSearch = function() {
                this.$search.css("width", "25px");
                var e = "";
                "" !== this.$search.attr("placeholder") ? e = this.$selection.find(".select2-selection__rendered").innerWidth() : e = .75 * (this.$search.val().length + 1) + "em";
                this.$search.css("width", e)
            }, i
        }), t.define("select2/selection/eventRelay", ["jquery"], function(e) {
            function t() {}
            return t.prototype.bind = function(t, n, i) {
                var o = this,
                    r = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                    s = ["opening", "closing", "selecting", "unselecting"];
                t.call(this, n, i), n.on("*", function(t, n) {
                    if (-1 !== e.inArray(t, r)) {
                        n = n || {};
                        var i = e.Event("select2:" + t, { params: n });
                        o.$element.trigger(i), -1 !== e.inArray(t, s) && (n.prevented = i.isDefaultPrevented())
                    }
                })
            }, t
        }), t.define("select2/translation", ["jquery", "require"], function(e, t) {
            function n(e) { this.dict = e || {} }
            return n.prototype.all = function() { return this.dict }, n.prototype.get = function(e) { return this.dict[e] }, n.prototype.extend = function(t) { this.dict = e.extend({}, t.all(), this.dict) }, n._cache = {}, n.loadPath = function(e) {
                if (!(e in n._cache)) {
                    var i = t(e);
                    n._cache[e] = i
                }
                return new n(n._cache[e])
            }, n
        }), t.define("select2/diacritics", [], function() { return { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" } }), t.define("select2/data/base", ["../utils"], function(e) {
            function t(e, n) { t.__super__.constructor.call(this) }
            return e.Extend(t, e.Observable), t.prototype.current = function(e) { throw new Error("The `current` method must be defined in child classes.") }, t.prototype.query = function(e, t) { throw new Error("The `query` method must be defined in child classes.") }, t.prototype.bind = function(e, t) {}, t.prototype.destroy = function() {}, t.prototype.generateResultId = function(t, n) { var i = t.id + "-result-"; return i += e.generateChars(4), null != n.id ? i += "-" + n.id.toString() : i += "-" + e.generateChars(4), i }, t
        }), t.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, t, n) {
            function i(e, t) { this.$element = e, this.options = t, i.__super__.constructor.call(this) }
            return t.Extend(i, e), i.prototype.current = function(e) {
                var t = [],
                    i = this;
                this.$element.find(":selected").each(function() {
                    var e = n(this),
                        o = i.item(e);
                    t.push(o)
                }), e(t)
            }, i.prototype.select = function(e) {
                var t = this;
                if (e.selected = !0, n(e.element).is("option")) return e.element.selected = !0, void this.$element.trigger("change");
                if (this.$element.prop("multiple")) this.current(function(i) {
                    var o = [];
                    (e = [e]).push.apply(e, i);
                    for (var r = 0; r < e.length; r++) { var s = e[r].id; - 1 === n.inArray(s, o) && o.push(s) }
                    t.$element.val(o), t.$element.trigger("change")
                });
                else {
                    var i = e.id;
                    this.$element.val(i), this.$element.trigger("change")
                }
            }, i.prototype.unselect = function(e) {
                var t = this;
                if (this.$element.prop("multiple")) {
                    if (e.selected = !1, n(e.element).is("option")) return e.element.selected = !1, void this.$element.trigger("change");
                    this.current(function(i) {
                        for (var o = [], r = 0; r < i.length; r++) {
                            var s = i[r].id;
                            s !== e.id && -1 === n.inArray(s, o) && o.push(s)
                        }
                        t.$element.val(o), t.$element.trigger("change")
                    })
                }
            }, i.prototype.bind = function(e, t) {
                var n = this;
                this.container = e, e.on("select", function(e) { n.select(e.data) }), e.on("unselect", function(e) { n.unselect(e.data) })
            }, i.prototype.destroy = function() { this.$element.find("*").each(function() { n.removeData(this, "data") }) }, i.prototype.query = function(e, t) {
                var i = [],
                    o = this;
                this.$element.children().each(function() {
                    var t = n(this);
                    if (t.is("option") || t.is("optgroup")) {
                        var r = o.item(t),
                            s = o.matches(e, r);
                        null !== s && i.push(s)
                    }
                }), t({ results: i })
            }, i.prototype.addOptions = function(e) { t.appendMany(this.$element, e) }, i.prototype.option = function(e) {
                var t;
                e.children ? (t = document.createElement("optgroup")).label = e.text : void 0 !== (t = document.createElement("option")).textContent ? t.textContent = e.text : t.innerText = e.text, void 0 !== e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title);
                var i = n(t),
                    o = this._normalizeItem(e);
                return o.element = t, n.data(t, "data", o), i
            }, i.prototype.item = function(e) {
                var t = {};
                if (null != (t = n.data(e[0], "data"))) return t;
                if (e.is("option")) t = { id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title") };
                else if (e.is("optgroup")) {
                    t = { text: e.prop("label"), children: [], title: e.prop("title") };
                    for (var i = e.children("option"), o = [], r = 0; r < i.length; r++) {
                        var s = n(i[r]),
                            a = this.item(s);
                        o.push(a)
                    }
                    t.children = o
                }
                return (t = this._normalizeItem(t)).element = e[0], n.data(e[0], "data", t), t
            }, i.prototype._normalizeItem = function(e) { n.isPlainObject(e) || (e = { id: e, text: e }); return null != (e = n.extend({}, { text: "" }, e)).id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), n.extend({}, { selected: !1, disabled: !1 }, e) }, i.prototype.matches = function(e, t) { return this.options.get("matcher")(e, t) }, i
        }), t.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, t, n) {
            function i(e, t) {
                var n = t.get("data") || [];
                i.__super__.constructor.call(this, e, t), this.addOptions(this.convertToOptions(n))
            }
            return t.Extend(i, e), i.prototype.select = function(e) {
                var t = this.$element.find("option").filter(function(t, n) { return n.value == e.id.toString() });
                0 === t.length && (t = this.option(e), this.addOptions(t)), i.__super__.select.call(this, e)
            }, i.prototype.convertToOptions = function(e) {
                var i = this,
                    o = this.$element.find("option"),
                    r = o.map(function() { return i.item(n(this)).id }).get(),
                    s = [];

                function a(e) { return function() { return n(this).val() == e.id } }
                for (var l = 0; l < e.length; l++) {
                    var c = this._normalizeItem(e[l]);
                    if (n.inArray(c.id, r) >= 0) {
                        var h = o.filter(a(c)),
                            u = this.item(h),
                            d = n.extend(!0, {}, c, u),
                            g = this.option(d);
                        h.replaceWith(g)
                    } else {
                        var f = this.option(c);
                        if (c.children) {
                            var p = this.convertToOptions(c.children);
                            t.appendMany(f, p)
                        }
                        s.push(f)
                    }
                }
                return s
            }, i
        }), t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, n) {
            function i(e, t) { this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), i.__super__.constructor.call(this, e, t) }
            return t.Extend(i, e), i.prototype._applyDefaults = function(e) { var t = { data: function(e) { return n.extend({}, e, { q: e.term }) }, transport: function(e, t, i) { var o = n.ajax(e); return o.then(t), o.fail(i), o } }; return n.extend({}, t, e, !0) }, i.prototype.processResults = function(e) { return e }, i.prototype.query = function(e, t) {
                var i = this;
                null != this._request && (n.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                var o = n.extend({ type: "GET" }, this.ajaxOptions);

                function r() {
                    var r = o.transport(o, function(o) {
                        var r = i.processResults(o, e);
                        i.options.get("debug") && window.console && console.error && (r && r.results && n.isArray(r.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), t(r)
                    }, function() { r.status && "0" === r.status || i.trigger("results:message", { message: "errorLoading" }) });
                    i._request = r
                }
                "function" == typeof o.url && (o.url = o.url.call(this.$element, e)), "function" == typeof o.data && (o.data = o.data.call(this.$element, e)), this.ajaxOptions.delay && null != e.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(r, this.ajaxOptions.delay)) : r()
            }, i
        }), t.define("select2/data/tags", ["jquery"], function(e) {
            function t(t, n, i) {
                var o = i.get("tags"),
                    r = i.get("createTag");
                void 0 !== r && (this.createTag = r);
                var s = i.get("insertTag");
                if (void 0 !== s && (this.insertTag = s), t.call(this, n, i), e.isArray(o))
                    for (var a = 0; a < o.length; a++) {
                        var l = o[a],
                            c = this._normalizeItem(l),
                            h = this.option(c);
                        this.$element.append(h)
                    }
            }
            return t.prototype.query = function(e, t, n) {
                var i = this;
                this._removeOldTags(), null != t.term && null == t.page ? e.call(this, t, function e(o, r) {
                    for (var s = o.results, a = 0; a < s.length; a++) {
                        var l = s[a],
                            c = null != l.children && !e({ results: l.children }, !0);
                        if ((l.text || "").toUpperCase() === (t.term || "").toUpperCase() || c) return !r && (o.data = s, void n(o))
                    }
                    if (r) return !0;
                    var h = i.createTag(t);
                    if (null != h) {
                        var u = i.option(h);
                        u.attr("data-select2-tag", !0), i.addOptions([u]), i.insertTag(s, h)
                    }
                    o.results = s, n(o)
                }) : e.call(this, t, n)
            }, t.prototype.createTag = function(t, n) { var i = e.trim(n.term); return "" === i ? null : { id: i, text: i } }, t.prototype.insertTag = function(e, t, n) { t.unshift(n) }, t.prototype._removeOldTags = function(t) {
                this._lastTag;
                this.$element.find("option[data-select2-tag]").each(function() { this.selected || e(this).remove() })
            }, t
        }), t.define("select2/data/tokenizer", ["jquery"], function(e) {
            function t(e, t, n) {
                var i = n.get("tokenizer");
                void 0 !== i && (this.tokenizer = i), e.call(this, t, n)
            }
            return t.prototype.bind = function(e, t, n) { e.call(this, t, n), this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field") }, t.prototype.query = function(t, n, i) {
                var o = this;
                n.term = n.term || "";
                var r = this.tokenizer(n, this.options, function(t) {
                    var n, i = o._normalizeItem(t);
                    if (!o.$element.find("option").filter(function() { return e(this).val() === i.id }).length) {
                        var r = o.option(i);
                        r.attr("data-select2-tag", !0), o._removeOldTags(), o.addOptions([r])
                    }
                    n = i, o.trigger("select", { data: n })
                });
                r.term !== n.term && (this.$search.length && (this.$search.val(r.term), this.$search.focus()), n.term = r.term), t.call(this, n, i)
            }, t.prototype.tokenizer = function(t, n, i, o) {
                for (var r = i.get("tokenSeparators") || [], s = n.term, a = 0, l = this.createTag || function(e) { return { id: e.term, text: e.term } }; a < s.length;) {
                    var c = s[a];
                    if (-1 !== e.inArray(c, r)) {
                        var h = s.substr(0, a),
                            u = l(e.extend({}, n, { term: h }));
                        null != u ? (o(u), s = s.substr(a + 1) || "", a = 0) : a++
                    } else a++
                }
                return { term: s }
            }, t
        }), t.define("select2/data/minimumInputLength", [], function() {
            function e(e, t, n) { this.minimumInputLength = n.get("minimumInputLength"), e.call(this, t, n) }
            return e.prototype.query = function(e, t, n) { t.term = t.term || "", t.term.length < this.minimumInputLength ? this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : e.call(this, t, n) }, e
        }), t.define("select2/data/maximumInputLength", [], function() {
            function e(e, t, n) { this.maximumInputLength = n.get("maximumInputLength"), e.call(this, t, n) }
            return e.prototype.query = function(e, t, n) { t.term = t.term || "", this.maximumInputLength > 0 && t.term.length > this.maximumInputLength ? this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } }) : e.call(this, t, n) }, e
        }), t.define("select2/data/maximumSelectionLength", [], function() {
            function e(e, t, n) { this.maximumSelectionLength = n.get("maximumSelectionLength"), e.call(this, t, n) }
            return e.prototype.query = function(e, t, n) {
                var i = this;
                this.current(function(o) {
                    var r = null != o ? o.length : 0;
                    i.maximumSelectionLength > 0 && r >= i.maximumSelectionLength ? i.trigger("results:message", { message: "maximumSelected", args: { maximum: i.maximumSelectionLength } }) : e.call(i, t, n)
                })
            }, e
        }), t.define("select2/dropdown", ["jquery", "./utils"], function(e, t) {
            function n(e, t) { this.$element = e, this.options = t, n.__super__.constructor.call(this) }
            return t.Extend(n, t.Observable), n.prototype.render = function() { var t = e('<span class="select2-dropdown"><span class="select2-results"></span></span>'); return t.attr("dir", this.options.get("dir")), this.$dropdown = t, t }, n.prototype.bind = function() {}, n.prototype.position = function(e, t) {}, n.prototype.destroy = function() { this.$dropdown.remove() }, n
        }), t.define("select2/dropdown/search", ["jquery", "../utils"], function(e, t) {
            function n() {}
            return n.prototype.render = function(t) {
                var n = t.call(this),
                    i = e('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');
                return this.$searchContainer = i, this.$search = i.find("input"), n.prepend(i), n
            }, n.prototype.bind = function(t, n, i) {
                var o = this;
                t.call(this, n, i), this.$search.on("keydown", function(e) { o.trigger("keypress", e), o._keyUpPrevented = e.isDefaultPrevented() }), this.$search.on("input", function(t) { e(this).off("keyup") }), this.$search.on("keyup input", function(e) { o.handleSearch(e) }), n.on("open", function() { o.$search.attr("tabindex", 0), o.$search.focus(), window.setTimeout(function() { o.$search.focus() }, 0) }), n.on("close", function() { o.$search.attr("tabindex", -1), o.$search.val("") }), n.on("focus", function() { n.isOpen() || o.$search.focus() }), n.on("results:all", function(e) { null != e.query.term && "" !== e.query.term || (o.showSearch(e) ? o.$searchContainer.removeClass("select2-search--hide") : o.$searchContainer.addClass("select2-search--hide")) })
            }, n.prototype.handleSearch = function(e) {
                if (!this._keyUpPrevented) {
                    var t = this.$search.val();
                    this.trigger("query", { term: t })
                }
                this._keyUpPrevented = !1
            }, n.prototype.showSearch = function(e, t) { return !0 }, n
        }), t.define("select2/dropdown/hidePlaceholder", [], function() {
            function e(e, t, n, i) { this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n, i) }
            return e.prototype.append = function(e, t) { t.results = this.removePlaceholder(t.results), e.call(this, t) }, e.prototype.normalizePlaceholder = function(e, t) { return "string" == typeof t && (t = { id: "", text: t }), t }, e.prototype.removePlaceholder = function(e, t) {
                for (var n = t.slice(0), i = t.length - 1; i >= 0; i--) {
                    var o = t[i];
                    this.placeholder.id === o.id && n.splice(i, 1)
                }
                return n
            }, e
        }), t.define("select2/dropdown/infiniteScroll", ["jquery"], function(e) {
            function t(e, t, n, i) { this.lastParams = {}, e.call(this, t, n, i), this.$loadingMore = this.createLoadingMore(), this.loading = !1 }
            return t.prototype.append = function(e, t) { this.$loadingMore.remove(), this.loading = !1, e.call(this, t), this.showLoadingMore(t) && this.$results.append(this.$loadingMore) }, t.prototype.bind = function(t, n, i) {
                var o = this;
                t.call(this, n, i), n.on("query", function(e) { o.lastParams = e, o.loading = !0 }), n.on("query:append", function(e) { o.lastParams = e, o.loading = !0 }), this.$results.on("scroll", function() { var t = e.contains(document.documentElement, o.$loadingMore[0]);!o.loading && t && (o.$results.offset().top + o.$results.outerHeight(!1) + 50 >= o.$loadingMore.offset().top + o.$loadingMore.outerHeight(!1) && o.loadMore()) })
            }, t.prototype.loadMore = function() {
                this.loading = !0;
                var t = e.extend({}, { page: 1 }, this.lastParams);
                t.page++, this.trigger("query:append", t)
            }, t.prototype.showLoadingMore = function(e, t) { return t.pagination && t.pagination.more }, t.prototype.createLoadingMore = function() {
                var t = e('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                    n = this.options.get("translations").get("loadingMore");
                return t.html(n(this.lastParams)), t
            }, t
        }), t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(e, t) {
            function n(t, n, i) { this.$dropdownParent = i.get("dropdownParent") || e(document.body), t.call(this, n, i) }
            return n.prototype.bind = function(e, t, n) {
                var i = this,
                    o = !1;
                e.call(this, t, n), t.on("open", function() { i._showDropdown(), i._attachPositioningHandler(t), o || (o = !0, t.on("results:all", function() { i._positionDropdown(), i._resizeDropdown() }), t.on("results:append", function() { i._positionDropdown(), i._resizeDropdown() })) }), t.on("close", function() { i._hideDropdown(), i._detachPositioningHandler(t) }), this.$dropdownContainer.on("mousedown", function(e) { e.stopPropagation() })
            }, n.prototype.destroy = function(e) { e.call(this), this.$dropdownContainer.remove() }, n.prototype.position = function(e, t, n) { t.attr("class", n.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({ position: "absolute", top: -999999 }), this.$container = n }, n.prototype.render = function(t) {
                var n = e("<span></span>"),
                    i = t.call(this);
                return n.append(i), this.$dropdownContainer = n, n
            }, n.prototype._hideDropdown = function(e) { this.$dropdownContainer.detach() }, n.prototype._attachPositioningHandler = function(n, i) {
                var o = this,
                    r = "scroll.select2." + i.id,
                    s = "resize.select2." + i.id,
                    a = "orientationchange.select2." + i.id,
                    l = this.$container.parents().filter(t.hasScroll);
                l.each(function() { e(this).data("select2-scroll-position", { x: e(this).scrollLeft(), y: e(this).scrollTop() }) }), l.on(r, function(t) {
                    var n = e(this).data("select2-scroll-position");
                    e(this).scrollTop(n.y)
                }), e(window).on(r + " " + s + " " + a, function(e) { o._positionDropdown(), o._resizeDropdown() })
            }, n.prototype._detachPositioningHandler = function(n, i) {
                var o = "scroll.select2." + i.id,
                    r = "resize.select2." + i.id,
                    s = "orientationchange.select2." + i.id;
                this.$container.parents().filter(t.hasScroll).off(o), e(window).off(o + " " + r + " " + s)
            }, n.prototype._positionDropdown = function() {
                var t = e(window),
                    n = this.$dropdown.hasClass("select2-dropdown--above"),
                    i = this.$dropdown.hasClass("select2-dropdown--below"),
                    o = null,
                    r = this.$container.offset();
                r.bottom = r.top + this.$container.outerHeight(!1);
                var s = { height: this.$container.outerHeight(!1) };
                s.top = r.top, s.bottom = r.top + s.height;
                var a = this.$dropdown.outerHeight(!1),
                    l = t.scrollTop(),
                    c = t.scrollTop() + t.height(),
                    h = l < r.top - a,
                    u = c > r.bottom + a,
                    d = { left: r.left, top: s.bottom },
                    g = this.$dropdownParent;
                "static" === g.css("position") && (g = g.offsetParent());
                var f = g.offset();
                d.top -= f.top, d.left -= f.left, n || i || (o = "below"), u || !h || n ? !h && u && n && (o = "below") : o = "above", ("above" == o || n && "below" !== o) && (d.top = s.top - f.top - a), null != o && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + o), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + o)), this.$dropdownContainer.css(d)
            }, n.prototype._resizeDropdown = function() {
                var e = { width: this.$container.outerWidth(!1) + "px" };
                this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.position = "relative", e.width = "auto"), this.$dropdown.css(e)
            }, n.prototype._showDropdown = function(e) { this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown() }, n
        }), t.define("select2/dropdown/minimumResultsForSearch", [], function() {
            function e(e, t, n, i) { this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, i) }
            return e.prototype.showSearch = function(e, t) {
                return !(function e(t) {
                    for (var n = 0, i = 0; i < t.length; i++) {
                        var o = t[i];
                        o.children ? n += e(o.children) : n++
                    }
                    return n
                }(t.data.results) < this.minimumResultsForSearch) && e.call(this, t)
            }, e
        }), t.define("select2/dropdown/selectOnClose", [], function() {
            function e() {}
            return e.prototype.bind = function(e, t, n) {
                var i = this;
                e.call(this, t, n), t.on("close", function(e) { i._handleSelectOnClose(e) })
            }, e.prototype._handleSelectOnClose = function(e, t) {
                if (t && null != t.originalSelect2Event) { var n = t.originalSelect2Event; if ("select" === n._type || "unselect" === n._type) return }
                var i = this.getHighlightedResults();
                if (!(i.length < 1)) {
                    var o = i.data("data");
                    null != o.element && o.element.selected || null == o.element && o.selected || this.trigger("select", { data: o })
                }
            }, e
        }), t.define("select2/dropdown/closeOnSelect", [], function() {
            function e() {}
            return e.prototype.bind = function(e, t, n) {
                var i = this;
                e.call(this, t, n), t.on("select", function(e) { i._selectTriggered(e) }), t.on("unselect", function(e) { i._selectTriggered(e) })
            }, e.prototype._selectTriggered = function(e, t) {
                var n = t.originalEvent;
                n && n.ctrlKey || this.trigger("close", { originalEvent: n, originalSelect2Event: t })
            }, e
        }), t.define("select2/i18n/en", [], function() {
            return {
                errorLoading: function() { return "The results could not be loaded." },
                inputTooLong: function(e) {
                    var t = e.input.length - e.maximum,
                        n = "Please delete " + t + " character";
                    return 1 != t && (n += "s"), n
                },
                inputTooShort: function(e) { return "Please enter " + (e.minimum - e.input.length) + " or more characters" },
                loadingMore: function() { return "Loading more results…" },
                maximumSelected: function(e) { var t = "You can only select " + e.maximum + " item"; return 1 != e.maximum && (t += "s"), t },
                noResults: function() { return "No results found" },
                searching: function() { return "Searching…" }
            }
        }), t.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(e, t, n, i, o, r, s, a, l, c, h, u, d, g, f, p, m, v, w, A, C, b, y, F, E, x, $, k, S) {
            function D() { this.reset() }
            return D.prototype.apply = function(u) {
                if (null == (u = e.extend(!0, {}, this.defaults, u)).dataAdapter) {
                    if (null != u.ajax ? u.dataAdapter = f : null != u.data ? u.dataAdapter = g : u.dataAdapter = d, u.minimumInputLength > 0 && (u.dataAdapter = c.Decorate(u.dataAdapter, v)), u.maximumInputLength > 0 && (u.dataAdapter = c.Decorate(u.dataAdapter, w)), u.maximumSelectionLength > 0 && (u.dataAdapter = c.Decorate(u.dataAdapter, A)), u.tags && (u.dataAdapter = c.Decorate(u.dataAdapter, p)), null == u.tokenSeparators && null == u.tokenizer || (u.dataAdapter = c.Decorate(u.dataAdapter, m)), null != u.query) {
                        var S = t(u.amdBase + "compat/query");
                        u.dataAdapter = c.Decorate(u.dataAdapter, S)
                    }
                    if (null != u.initSelection) {
                        var D = t(u.amdBase + "compat/initSelection");
                        u.dataAdapter = c.Decorate(u.dataAdapter, D)
                    }
                }
                if (null == u.resultsAdapter && (u.resultsAdapter = n, null != u.ajax && (u.resultsAdapter = c.Decorate(u.resultsAdapter, F)), null != u.placeholder && (u.resultsAdapter = c.Decorate(u.resultsAdapter, y)), u.selectOnClose && (u.resultsAdapter = c.Decorate(u.resultsAdapter, $))), null == u.dropdownAdapter) {
                    if (u.multiple) u.dropdownAdapter = C;
                    else {
                        var B = c.Decorate(C, b);
                        u.dropdownAdapter = B
                    }
                    if (0 !== u.minimumResultsForSearch && (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, x)), u.closeOnSelect && (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, k)), null != u.dropdownCssClass || null != u.dropdownCss || null != u.adaptDropdownCssClass) {
                        var _ = t(u.amdBase + "compat/dropdownCss");
                        u.dropdownAdapter = c.Decorate(u.dropdownAdapter, _)
                    }
                    u.dropdownAdapter = c.Decorate(u.dropdownAdapter, E)
                }
                if (null == u.selectionAdapter) {
                    if (u.multiple ? u.selectionAdapter = o : u.selectionAdapter = i, null != u.placeholder && (u.selectionAdapter = c.Decorate(u.selectionAdapter, r)), u.allowClear && (u.selectionAdapter = c.Decorate(u.selectionAdapter, s)), u.multiple && (u.selectionAdapter = c.Decorate(u.selectionAdapter, a)), null != u.containerCssClass || null != u.containerCss || null != u.adaptContainerCssClass) {
                        var L = t(u.amdBase + "compat/containerCss");
                        u.selectionAdapter = c.Decorate(u.selectionAdapter, L)
                    }
                    u.selectionAdapter = c.Decorate(u.selectionAdapter, l)
                }
                if ("string" == typeof u.language)
                    if (u.language.indexOf("-") > 0) {
                        var R = u.language.split("-")[0];
                        u.language = [u.language, R]
                    } else u.language = [u.language];
                if (e.isArray(u.language)) {
                    var T = new h;
                    u.language.push("en");
                    for (var M = u.language, O = 0; O < M.length; O++) {
                        var I = M[O],
                            W = {};
                        try { W = h.loadPath(I) } catch (e) { try { I = this.defaults.amdLanguageBase + I, W = h.loadPath(I) } catch (e) { u.debug && window.console && console.warn && console.warn('Select2: The language file for "' + I + '" could not be automatically loaded. A fallback will be used instead.'); continue } }
                        T.extend(W)
                    }
                    u.translations = T
                } else {
                    var P = h.loadPath(this.defaults.amdLanguageBase + "en"),
                        z = new h(u.language);
                    z.extend(P), u.translations = z
                }
                return u
            }, D.prototype.reset = function() {
                function t(e) { return e.replace(/[^\u0000-\u007E]/g, function(e) { return u[e] || e }) }
                this.defaults = {
                    amdBase: "./",
                    amdLanguageBase: "./i18n/",
                    closeOnSelect: !0,
                    debug: !1,
                    dropdownAutoWidth: !1,
                    escapeMarkup: c.escapeMarkup,
                    language: S,
                    matcher: function n(i, o) {
                        if ("" === e.trim(i.term)) return o;
                        if (o.children && o.children.length > 0) { for (var r = e.extend(!0, {}, o), s = o.children.length - 1; s >= 0; s--) null == n(i, o.children[s]) && r.children.splice(s, 1); return r.children.length > 0 ? r : n(i, r) }
                        var a = t(o.text).toUpperCase(),
                            l = t(i.term).toUpperCase();
                        return a.indexOf(l) > -1 ? o : null
                    },
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: !1,
                    sorter: function(e) { return e },
                    templateResult: function(e) { return e.text },
                    templateSelection: function(e) { return e.text },
                    theme: "default",
                    width: "resolve"
                }
            }, D.prototype.set = function(t, n) {
                var i = {};
                i[e.camelCase(t)] = n;
                var o = c._convertData(i);
                e.extend(this.defaults, o)
            }, new D
        }), t.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(e, t, n, i) {
            function o(t, o) {
                if (this.options = t, null != o && this.fromElement(o), this.options = n.apply(this.options), o && o.is("input")) {
                    var r = e(this.get("amdBase") + "compat/inputData");
                    this.options.dataAdapter = i.Decorate(this.options.dataAdapter, r)
                }
            }
            return o.prototype.fromElement = function(e) {
                var n = ["select2"];
                null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.language && (e.prop("lang") ? this.options.language = e.prop("lang").toLowerCase() : e.closest("[lang]").prop("lang") && (this.options.language = e.closest("[lang]").prop("lang"))), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), e.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), e.data("data", e.data("select2Tags")), e.data("tags", !0)), e.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", e.data("ajaxUrl")), e.data("ajax--url", e.data("ajaxUrl")));
                var o = {};
                o = t.fn.jquery && "1." == t.fn.jquery.substr(0, 2) && e[0].dataset ? t.extend(!0, {}, e[0].dataset, e.data()) : e.data();
                var r = t.extend(!0, {}, o);
                for (var s in r = i._convertData(r)) t.inArray(s, n) > -1 || (t.isPlainObject(this.options[s]) ? t.extend(this.options[s], r[s]) : this.options[s] = r[s]);
                return this
            }, o.prototype.get = function(e) { return this.options[e] }, o.prototype.set = function(e, t) { this.options[e] = t }, o
        }), t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(e, t, n, i) {
            var o = function(e, n) {
                null != e.data("select2") && e.data("select2").destroy(), this.$element = e, this.id = this._generateId(e), n = n || {}, this.options = new t(n, e), o.__super__.constructor.call(this);
                var i = e.attr("tabindex") || 0;
                e.data("old-tabindex", i), e.attr("tabindex", "-1");
                var r = this.options.get("dataAdapter");
                this.dataAdapter = new r(e, this.options);
                var s = this.render();
                this._placeContainer(s);
                var a = this.options.get("selectionAdapter");
                this.selection = new a(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, s);
                var l = this.options.get("dropdownAdapter");
                this.dropdown = new l(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, s);
                var c = this.options.get("resultsAdapter");
                this.results = new c(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                var h = this;
                this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(e) { h.trigger("selection:update", { data: e }) }), e.addClass("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), e.data("select2", this)
            };
            return n.Extend(o, n.Observable), o.prototype._generateId = function(e) { return "select2-" + (null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + n.generateChars(2) : n.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "") }, o.prototype._placeContainer = function(e) {
                e.insertAfter(this.$element);
                var t = this._resolveWidth(this.$element, this.options.get("width"));
                null != t && e.css("width", t)
            }, o.prototype._resolveWidth = function(e, t) { var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i; if ("resolve" == t) { var i = this._resolveWidth(e, "style"); return null != i ? i : this._resolveWidth(e, "element") } if ("element" == t) { var o = e.outerWidth(!1); return o <= 0 ? "auto" : o + "px" } if ("style" == t) { var r = e.attr("style"); if ("string" != typeof r) return null; for (var s = r.split(";"), a = 0, l = s.length; a < l; a += 1) { var c = s[a].replace(/\s/g, "").match(n); if (null !== c && c.length >= 1) return c[1] } return null } return t }, o.prototype._bindAdapters = function() { this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container) }, o.prototype._registerDomEvents = function() {
                var t = this;
                this.$element.on("change.select2", function() { t.dataAdapter.current(function(e) { t.trigger("selection:update", { data: e }) }) }), this.$element.on("focus.select2", function(e) { t.trigger("focus", e) }), this._syncA = n.bind(this._syncAttributes, this), this._syncS = n.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                var i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                null != i ? (this._observer = new i(function(n) { e.each(n, t._syncA), e.each(n, t._syncS) }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", t._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", t._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, !1))
            }, o.prototype._registerDataEvents = function() {
                var e = this;
                this.dataAdapter.on("*", function(t, n) { e.trigger(t, n) })
            }, o.prototype._registerSelectionEvents = function() {
                var t = this,
                    n = ["toggle", "focus"];
                this.selection.on("toggle", function() { t.toggleDropdown() }), this.selection.on("focus", function(e) { t.focus(e) }), this.selection.on("*", function(i, o) {-1 === e.inArray(i, n) && t.trigger(i, o) })
            }, o.prototype._registerDropdownEvents = function() {
                var e = this;
                this.dropdown.on("*", function(t, n) { e.trigger(t, n) })
            }, o.prototype._registerResultsEvents = function() {
                var e = this;
                this.results.on("*", function(t, n) { e.trigger(t, n) })
            }, o.prototype._registerEvents = function() {
                var e = this;
                this.on("open", function() { e.$container.addClass("select2-container--open") }), this.on("close", function() { e.$container.removeClass("select2-container--open") }), this.on("enable", function() { e.$container.removeClass("select2-container--disabled") }), this.on("disable", function() { e.$container.addClass("select2-container--disabled") }), this.on("blur", function() { e.$container.removeClass("select2-container--focus") }), this.on("query", function(t) { e.isOpen() || e.trigger("open", {}), this.dataAdapter.query(t, function(n) { e.trigger("results:all", { data: n, query: t }) }) }), this.on("query:append", function(t) { this.dataAdapter.query(t, function(n) { e.trigger("results:append", { data: n, query: t }) }) }), this.on("keypress", function(t) {
                    var n = t.which;
                    e.isOpen() ? n === i.ESC || n === i.TAB || n === i.UP && t.altKey ? (e.close(), t.preventDefault()) : n === i.ENTER ? (e.trigger("results:select", {}), t.preventDefault()) : n === i.SPACE && t.ctrlKey ? (e.trigger("results:toggle", {}), t.preventDefault()) : n === i.UP ? (e.trigger("results:previous", {}), t.preventDefault()) : n === i.DOWN && (e.trigger("results:next", {}), t.preventDefault()) : (n === i.ENTER || n === i.SPACE || n === i.DOWN && t.altKey) && (e.open(), t.preventDefault())
                })
            }, o.prototype._syncAttributes = function() { this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {}) }, o.prototype._syncSubtree = function(e, t) {
                var n = !1,
                    i = this;
                if (!e || !e.target || "OPTION" === e.target.nodeName || "OPTGROUP" === e.target.nodeName) {
                    if (t)
                        if (t.addedNodes && t.addedNodes.length > 0)
                            for (var o = 0; o < t.addedNodes.length; o++) { t.addedNodes[o].selected && (n = !0) } else t.removedNodes && t.removedNodes.length > 0 && (n = !0);
                        else n = !0;
                    n && this.dataAdapter.current(function(e) { i.trigger("selection:update", { data: e }) })
                }
            }, o.prototype.trigger = function(e, t) {
                var n = o.__super__.trigger,
                    i = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };
                if (void 0 === t && (t = {}), e in i) {
                    var r = i[e],
                        s = { prevented: !1, name: e, args: t };
                    if (n.call(this, r, s), s.prevented) return void(t.prevented = !0)
                }
                n.call(this, e, t)
            }, o.prototype.toggleDropdown = function() { this.options.get("disabled") || (this.isOpen() ? this.close() : this.open()) }, o.prototype.open = function() { this.isOpen() || this.trigger("query", {}) }, o.prototype.close = function() { this.isOpen() && this.trigger("close", {}) }, o.prototype.isOpen = function() { return this.$container.hasClass("select2-container--open") }, o.prototype.hasFocus = function() { return this.$container.hasClass("select2-container--focus") }, o.prototype.focus = function(e) { this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {})) }, o.prototype.enable = function(e) {
                this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != e && 0 !== e.length || (e = [!0]);
                var t = !e[0];
                this.$element.prop("disabled", t)
            }, o.prototype.data = function() { this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'); var e = []; return this.dataAdapter.current(function(t) { e = t }), e }, o.prototype.val = function(t) {
                if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == t || 0 === t.length) return this.$element.val();
                var n = t[0];
                e.isArray(n) && (n = e.map(n, function(e) { return e.toString() })), this.$element.val(n).trigger("change")
            }, o.prototype.destroy = function() { this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null }, o.prototype.render = function() { var t = e('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'); return t.attr("dir", this.options.get("dir")), this.$container = t, this.$container.addClass("select2-container--" + this.options.get("theme")), t.data("element", this.$element), t }, o
        }), t.define("select2/compat/utils", ["jquery"], function(e) {
            return {
                syncCssClasses: function(t, n, i) {
                    var o, r, s = [];
                    (o = e.trim(t.attr("class"))) && e((o = "" + o).split(/\s+/)).each(function() { 0 === this.indexOf("select2-") && s.push(this) }), (o = e.trim(n.attr("class"))) && e((o = "" + o).split(/\s+/)).each(function() { 0 !== this.indexOf("select2-") && null != (r = i(this)) && s.push(r) }), t.attr("class", s.join(" "))
                }
            }
        }), t.define("select2/compat/containerCss", ["jquery", "./utils"], function(e, t) {
            function n(e) { return null }

            function i() {}
            return i.prototype.render = function(i) {
                var o = i.call(this),
                    r = this.options.get("containerCssClass") || "";
                e.isFunction(r) && (r = r(this.$element));
                var s = this.options.get("adaptContainerCssClass");
                if (s = s || n, -1 !== r.indexOf(":all:")) {
                    r = r.replace(":all:", "");
                    var a = s;
                    s = function(e) { var t = a(e); return null != t ? t + " " + e : e }
                }
                var l = this.options.get("containerCss") || {};
                return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(o, this.$element, s), o.css(l), o.addClass(r), o
            }, i
        }), t.define("select2/compat/dropdownCss", ["jquery", "./utils"], function(e, t) {
            function n(e) { return null }

            function i() {}
            return i.prototype.render = function(i) {
                var o = i.call(this),
                    r = this.options.get("dropdownCssClass") || "";
                e.isFunction(r) && (r = r(this.$element));
                var s = this.options.get("adaptDropdownCssClass");
                if (s = s || n, -1 !== r.indexOf(":all:")) {
                    r = r.replace(":all:", "");
                    var a = s;
                    s = function(e) { var t = a(e); return null != t ? t + " " + e : e }
                }
                var l = this.options.get("dropdownCss") || {};
                return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(o, this.$element, s), o.css(l), o.addClass(r), o
            }, i
        }), t.define("select2/compat/initSelection", ["jquery"], function(e) {
            function t(e, t, n) { n.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = n.get("initSelection"), this._isInitialized = !1, e.call(this, t, n) }
            return t.prototype.current = function(t, n) {
                var i = this;
                this._isInitialized ? t.call(this, n) : this.initSelection.call(null, this.$element, function(t) { i._isInitialized = !0, e.isArray(t) || (t = [t]), n(t) })
            }, t
        }), t.define("select2/compat/inputData", ["jquery"], function(e) {
            function t(e, t, n) { this._currentData = [], this._valueSeparator = n.get("valueSeparator") || ",", "hidden" === t.prop("type") && n.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), e.call(this, t, n) }
            return t.prototype.current = function(t, n) {
                function i(t, n) { var o = []; return t.selected || -1 !== e.inArray(t.id, n) ? (t.selected = !0, o.push(t)) : t.selected = !1, t.children && o.push.apply(o, i(t.children, n)), o }
                for (var o = [], r = 0; r < this._currentData.length; r++) {
                    var s = this._currentData[r];
                    o.push.apply(o, i(s, this.$element.val().split(this._valueSeparator)))
                }
                n(o)
            }, t.prototype.select = function(t, n) {
                if (this.options.get("multiple")) {
                    var i = this.$element.val();
                    i += this._valueSeparator + n.id, this.$element.val(i), this.$element.trigger("change")
                } else this.current(function(t) { e.map(t, function(e) { e.selected = !1 }) }), this.$element.val(n.id), this.$element.trigger("change")
            }, t.prototype.unselect = function(e, t) {
                var n = this;
                t.selected = !1, this.current(function(e) {
                    for (var i = [], o = 0; o < e.length; o++) {
                        var r = e[o];
                        t.id != r.id && i.push(r.id)
                    }
                    n.$element.val(i.join(n._valueSeparator)), n.$element.trigger("change")
                })
            }, t.prototype.query = function(e, t, n) {
                for (var i = [], o = 0; o < this._currentData.length; o++) {
                    var r = this._currentData[o],
                        s = this.matches(t, r);
                    null !== s && i.push(s)
                }
                n({ results: i })
            }, t.prototype.addOptions = function(t, n) {
                var i = e.map(n, function(t) { return e.data(t[0], "data") });
                this._currentData.push.apply(this._currentData, i)
            }, t
        }), t.define("select2/compat/matcher", ["jquery"], function(e) {
            return function(t) {
                return function(n, i) {
                    var o = e.extend(!0, {}, i);
                    if (null == n.term || "" === e.trim(n.term)) return o;
                    if (i.children) {
                        for (var r = i.children.length - 1; r >= 0; r--) {
                            var s = i.children[r];
                            t(n.term, s.text, s) || o.children.splice(r, 1)
                        }
                        if (o.children.length > 0) return o
                    }
                    return t(n.term, i.text, i) ? o : null
                }
            }
        }), t.define("select2/compat/query", [], function() {
            function e(e, t, n) { n.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), e.call(this, t, n) }
            return e.prototype.query = function(e, t, n) { t.callback = n, this.options.get("query").call(null, t) }, e
        }), t.define("select2/dropdown/attachContainer", [], function() {
            function e(e, t, n) { e.call(this, t, n) }
            return e.prototype.position = function(e, t, n) { n.find(".dropdown-wrapper").append(t), t.addClass("select2-dropdown--below"), n.addClass("select2-container--below") }, e
        }), t.define("select2/dropdown/stopPropagation", [], function() {
            function e() {}
            return e.prototype.bind = function(e, t, n) {
                e.call(this, t, n);
                this.$dropdown.on(["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"].join(" "), function(e) { e.stopPropagation() })
            }, e
        }), t.define("select2/selection/stopPropagation", [], function() {
            function e() {}
            return e.prototype.bind = function(e, t, n) {
                e.call(this, t, n);
                this.$selection.on(["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"].join(" "), function(e) { e.stopPropagation() })
            }, e
        }), r = function(e) {
            var t, n, i = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                o = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                r = Array.prototype.slice;
            if (e.event.fixHooks)
                for (var s = i.length; s;) e.event.fixHooks[i[--s]] = e.event.mouseHooks;
            var a = e.event.special.mousewheel = {
                version: "3.1.12",
                setup: function() {
                    if (this.addEventListener)
                        for (var t = o.length; t;) this.addEventListener(o[--t], l, !1);
                    else this.onmousewheel = l;
                    e.data(this, "mousewheel-line-height", a.getLineHeight(this)), e.data(this, "mousewheel-page-height", a.getPageHeight(this))
                },
                teardown: function() {
                    if (this.removeEventListener)
                        for (var t = o.length; t;) this.removeEventListener(o[--t], l, !1);
                    else this.onmousewheel = null;
                    e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
                },
                getLineHeight: function(t) {
                    var n = e(t),
                        i = n["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                    return i.length || (i = e("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
                },
                getPageHeight: function(t) { return e(t).height() },
                settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
            };

            function l(i) {
                var o, s = i || window.event,
                    l = r.call(arguments, 1),
                    u = 0,
                    d = 0,
                    g = 0,
                    f = 0,
                    p = 0;
                if ((i = e.event.fix(s)).type = "mousewheel", "detail" in s && (g = -1 * s.detail), "wheelDelta" in s && (g = s.wheelDelta), "wheelDeltaY" in s && (g = s.wheelDeltaY), "wheelDeltaX" in s && (d = -1 * s.wheelDeltaX), "axis" in s && s.axis === s.HORIZONTAL_AXIS && (d = -1 * g, g = 0), u = 0 === g ? d : g, "deltaY" in s && (u = g = -1 * s.deltaY), "deltaX" in s && (d = s.deltaX, 0 === g && (u = -1 * d)), 0 !== g || 0 !== d) {
                    if (1 === s.deltaMode) {
                        var m = e.data(this, "mousewheel-line-height");
                        u *= m, g *= m, d *= m
                    } else if (2 === s.deltaMode) {
                        var v = e.data(this, "mousewheel-page-height");
                        u *= v, g *= v, d *= v
                    }
                    if (o = Math.max(Math.abs(g), Math.abs(d)), (!n || o < n) && (n = o, h(s, o) && (n /= 40)), h(s, o) && (u /= 40, d /= 40, g /= 40), u = Math[u >= 1 ? "floor" : "ceil"](u / n), d = Math[d >= 1 ? "floor" : "ceil"](d / n), g = Math[g >= 1 ? "floor" : "ceil"](g / n), a.settings.normalizeOffset && this.getBoundingClientRect) {
                        var w = this.getBoundingClientRect();
                        f = i.clientX - w.left, p = i.clientY - w.top
                    }
                    return i.deltaX = d, i.deltaY = g, i.deltaFactor = n, i.offsetX = f, i.offsetY = p, i.deltaMode = 0, l.unshift(i, u, d, g), t && clearTimeout(t), t = setTimeout(c, 200), (e.event.dispatch || e.event.handle).apply(this, l)
                }
            }

            function c() { n = null }

            function h(e, t) { return a.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0 }
            e.fn.extend({ mousewheel: function(e) { return e ? this.bind("mousewheel", e) : this.trigger("mousewheel") }, unmousewheel: function(e) { return this.unbind("mousewheel", e) } })
        }, "function" == typeof t.define && t.define.amd ? t.define("jquery-mousewheel", ["jquery"], r) : "object" == typeof exports ? module.exports = r : r(e), t.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function(e, t, n, i) {
            if (null == e.fn.select2) {
                var o = ["open", "close", "destroy"];
                e.fn.select2 = function(t) {
                    if ("object" == typeof(t = t || {})) return this.each(function() {
                        var i = e.extend(!0, {}, t);
                        new n(e(this), i)
                    }), this;
                    if ("string" == typeof t) {
                        var i, r = Array.prototype.slice.call(arguments, 1);
                        return this.each(function() {
                            var n = e(this).data("select2");
                            null == n && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), i = n[t].apply(n, r)
                        }), e.inArray(t, o) > -1 ? this : i
                    }
                    throw new Error("Invalid arguments for Select2: " + t)
                }
            }
            return null == e.fn.select2.defaults && (e.fn.select2.defaults = i), n
        }), t.define("sui.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function(e, t, n, i) {
            if (null == e.fn.SUIselect2) {
                var o = ["open", "close", "destroy"];
                e.fn.SUIselect2 = function(t) {
                    if ("object" == typeof(t = t || {})) return this.each(function() {
                        var i = e.extend(!0, {}, t);
                        new n(e(this), i)
                    }), this;
                    if ("string" == typeof t) {
                        var i, r = Array.prototype.slice.call(arguments, 1);
                        return this.each(function() {
                            var n = e(this).data("select2");
                            null == n && window.console && console.error && console.error("The SUISelect2('" + t + "') method was called on an element that is not using Select2."), i = n[t].apply(n, r)
                        }), e.inArray(t, o) > -1 ? this : i
                    }
                    throw new Error("Invalid arguments for SUISelect2: " + t)
                }
            }
            return null == e.fn.SUIselect2.defaults && (e.fn.SUIselect2.defaults = i), n
        }), { define: t.define, require: t.require }
    }().require("sui.select2")
}),
function(e) { e(".sui-color-accessible")[0] ? (e(".sui-select").SUIselect2({ dropdownCssClass: "sui-select-dropdown sui-color-accessible" }), e(".sui-variables").SUIselect2({ dropdownCssClass: "sui-variables-dropdown sui-color-accessible" })) : (e(".sui-select").SUIselect2({ dropdownCssClass: "sui-select-dropdown" }), e(".sui-variables").SUIselect2({ dropdownCssClass: "sui-variables-dropdown" })) }(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.floatInput = function() {
        e("body").ready(function() {
            var t = e(".sui-sidenav .sui-with-floating-input"),
                n = e(".sui-header-inline"),
                i = n.find(".sui-header-title").width(),
                o = n.next().find(".sui-sidenav").width();
            i > o && t.each(function() { e(this).css({ left: i + 20 + "px" }) })
        })
    }, SUI.floatInput()
}(jQuery),
function(e) {
    "use strict";

    function t(e) { e.getBoundingClientRect().top <= parseInt(getComputedStyle(e).top.replace("px", "")) ? e.classList.add("sui-is-sticky") : e.classList.remove("sui-is-sticky") }[].slice.call(document.querySelectorAll(".sui-box-sticky")).forEach(function(e) { CSS.supports && CSS.supports("position", "sticky") && (t(e), window.addEventListener("scroll", function() { t(e) })) })
}(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.suiTabs = function(e) {
        var t, n, i, o, r = ["tab", "pane"],
            s = [],
            a = [],
            l = [],
            c = [],
            h = [];

        function u(e, n) { d(e, n), "function" == typeof t.callback && t.callback(c.tab, c.pane) }

        function d(e, t) {
            var u;
            for (i = e, o = t, u = 0; u < r.length; u++) n = r[u], a[n] = s[n][i], l[n] = a[n].children, c[n] = l[n][o], g();
            h[e] = [], h[e][t] = !0
        }

        function g() {
            var e;
            for (e = 0; e < l[n].length; e++) l[n][e].classList.remove(t[n + "Aktiv"]);
            c[n].classList.add(t[n + "Aktiv"])
        }

        function f(e, n) {
            (t = t || [])[e] = t[e] || n
        }
        return function(e) {
            var a, l, c;
            for (t = e, function() { var e; for (e = 0; e < r.length; e++) f((n = r[e]) + "Group", "[data-" + n + "s]"), f(n + "Aktiv", "active") }(), s.tab = document.querySelectorAll(t.tabGroup), s.pane = document.querySelectorAll(t.paneGroup), a = 0; a < s.tab.length; a++)
                for (l = s.tab[a].children, c = 0; c < l.length; c++) l[c].addEventListener("click", u.bind(this, a, c), !1), i = a, o = c, window.location.hash && window.location.hash.replace(/[^\w-_]/g, "") === l[c].id && d(a, c)
        }(e)
    }, 0 !== e(".sui-2-3-15 .sui-tabs").length && SUI.suiTabs()
}(jQuery),
function(e) {
    "use strict";
    "object" != typeof window.SUI && (window.SUI = {}), SUI.upload = function() {
        e('.sui-2-3-15 .sui-upload-group input[type="file"]').on("change", function(t) {
            var n = e(this)[0].files[0],
                i = e(this).find("~ .sui-upload-message");
            n && i.text(n.name)
        })
    }, SUI.upload()
}(jQuery),
function() {
    var e = function() { return this }();
    !e && "undefined" != typeof window && (e = window);
    var t = function(e, n, i) { "string" == typeof e ? (2 == arguments.length && (i = n), t.modules[e] || (t.payloads[e] = i, t.modules[e] = null)) : t.original ? t.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace()) };
    t.modules = {}, t.payloads = {};
    var n, i, o = function(e, t, n) {
            if ("string" == typeof t) { var i = a(e, t); if (null != i) return n && n(), i } else if ("[object Array]" === Object.prototype.toString.call(t)) {
                for (var o = [], s = 0, l = t.length; s < l; ++s) {
                    var c = a(e, t[s]);
                    if (null == c && r.original) return;
                    o.push(c)
                }
                return n && n.apply(null, o) || !0
            }
        },
        r = function(e, t) { var n = o("", e, t); return null == n && r.original ? r.original.apply(this, arguments) : n },
        s = function(e, t) {
            if (-1 !== t.indexOf("!")) { var n = t.split("!"); return s(e, n[0]) + "!" + s(e, n[1]) }
            if ("." == t.charAt(0))
                for (t = e.split("/").slice(0, -1).join("/") + "/" + t; - 1 !== t.indexOf(".") && i != t;) {
                    var i = t;
                    t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                }
            return t
        },
        a = function(e, n) {
            n = s(e, n);
            var i = t.modules[n];
            if (!i) {
                if ("function" == typeof(i = t.payloads[n])) {
                    var r = {},
                        a = { id: n, uri: "", exports: r, packaged: !0 };
                    r = i(function(e, t) { return o(n, e, t) }, r, a) || a.exports, t.modules[n] = r, delete t.payloads[n]
                }
                i = t.modules[n] = r || i
            }
            return i
        };
    i = e, (n = "ace") && (e[n] || (e[n] = {}), i = e[n]), i.define && i.define.packaged || (t.original = i.define, i.define = t, i.define.packaged = !0), i.require && i.require.packaged || (r.original = i.require, i.require = r, i.require.packaged = !0)
}(), ace.define("ace/lib/regexp", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i, o = { exec: RegExp.prototype.exec, test: RegExp.prototype.test, match: String.prototype.match, replace: String.prototype.replace, split: String.prototype.split },
        r = void 0 === o.exec.call(/()??/, "")[1],
        s = (i = /^/g, o.test.call(i, ""), !i.lastIndex);
    s && r || (RegExp.prototype.exec = function(e) {
        var t, n, i, a = o.exec.apply(this, arguments);
        if ("string" == typeof e && a) {
            if (!r && a.length > 1 && function(e, t, n) {
                    if (Array.prototype.indexOf) return e.indexOf(t, n);
                    for (var i = n || 0; i < e.length; i++)
                        if (e[i] === t) return i;
                    return -1
                }(a, "") > -1 && (n = RegExp(this.source, o.replace.call(((i = this).global ? "g" : "") + (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.extended ? "x" : "") + (i.sticky ? "y" : ""), "g", "")), o.replace.call(e.slice(a.index), n, function() { for (var e = 1; e < arguments.length - 2; e++) void 0 === arguments[e] && (a[e] = void 0) })), this._xregexp && this._xregexp.captureNames)
                for (var l = 1; l < a.length; l++)(t = this._xregexp.captureNames[l - 1]) && (a[t] = a[l]);
            !s && this.global && !a[0].length && this.lastIndex > a.index && this.lastIndex--
        }
        return a
    }, s || (RegExp.prototype.test = function(e) { var t = o.exec.call(this, e); return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t }))
}), ace.define("ace/lib/es5-shim", ["require", "exports", "module"], function(e, t, n) {
    function i() {}

    function o(e) { try { return Object.defineProperty(e, "sentinel", {}), "sentinel" in e } catch (e) {} }

    function r(e) { return (e = +e) != e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e }
    Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError("Function.prototype.bind called on incompatible " + t);
        var n = f.call(arguments, 1),
            o = function() { if (this instanceof o) { var i = t.apply(this, n.concat(f.call(arguments))); return Object(i) === i ? i : this } return t.apply(e, n.concat(f.call(arguments))) };
        return t.prototype && (i.prototype = t.prototype, o.prototype = new i, i.prototype = null), o
    });
    var s, a, l, c, h, u = Function.prototype.call,
        d = Array.prototype,
        g = Object.prototype,
        f = d.slice,
        p = u.bind(g.toString),
        m = u.bind(g.hasOwnProperty);
    if ((h = m(g, "__defineGetter__")) && (s = u.bind(g.__defineGetter__), a = u.bind(g.__defineSetter__), l = u.bind(g.__lookupGetter__), c = u.bind(g.__lookupSetter__)), 2 != [1, 2].splice(0).length)
        if (function() {
                function e(e) { var t = new Array(e + 2); return t[0] = t[1] = 0, t }
                var t, n = [];
                if (n.splice.apply(n, e(20)), n.splice.apply(n, e(26)), t = n.length, n.splice(5, 0, "XXX"), n.length, t + 1 == n.length) return !0
            }()) {
            var v = Array.prototype.splice;
            Array.prototype.splice = function(e, t) { return arguments.length ? v.apply(this, [void 0 === e ? 0 : e, void 0 === t ? this.length - e : t].concat(f.call(arguments, 2))) : [] }
        } else Array.prototype.splice = function(e, t) {
            var n = this.length;
            e > 0 ? e > n && (e = n) : null == e ? e = 0 : e < 0 && (e = Math.max(n + e, 0)), e + t < n || (t = n - e);
            var i = this.slice(e, e + t),
                o = f.call(arguments, 2),
                r = o.length;
            if (e === n) r && this.push.apply(this, o);
            else {
                var s = Math.min(t, n - e),
                    a = e + s,
                    l = a + r - s,
                    c = n - a,
                    h = n - s;
                if (l < a)
                    for (var u = 0; u < c; ++u) this[l + u] = this[a + u];
                else if (l > a)
                    for (u = c; u--;) this[l + u] = this[a + u];
                if (r && e === h) this.length = h, this.push.apply(this, o);
                else
                    for (this.length = h + r, u = 0; u < r; ++u) this[e + u] = o[u]
            }
            return i
        };
    Array.isArray || (Array.isArray = function(e) { return "[object Array]" == p(e) });
    var w, A, C = Object("a"),
        b = "a" != C[0] || !(0 in C);
    if (Array.prototype.forEach || (Array.prototype.forEach = function(e) {
            var t = L(this),
                n = b && "[object String]" == p(this) ? this.split("") : t,
                i = arguments[1],
                o = -1,
                r = n.length >>> 0;
            if ("[object Function]" != p(e)) throw new TypeError;
            for (; ++o < r;) o in n && e.call(i, n[o], o, t)
        }), Array.prototype.map || (Array.prototype.map = function(e) {
            var t = L(this),
                n = b && "[object String]" == p(this) ? this.split("") : t,
                i = n.length >>> 0,
                o = Array(i),
                r = arguments[1];
            if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
            for (var s = 0; s < i; s++) s in n && (o[s] = e.call(r, n[s], s, t));
            return o
        }), Array.prototype.filter || (Array.prototype.filter = function(e) {
            var t, n = L(this),
                i = b && "[object String]" == p(this) ? this.split("") : n,
                o = i.length >>> 0,
                r = [],
                s = arguments[1];
            if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
            for (var a = 0; a < o; a++) a in i && (t = i[a], e.call(s, t, a, n) && r.push(t));
            return r
        }), Array.prototype.every || (Array.prototype.every = function(e) {
            var t = L(this),
                n = b && "[object String]" == p(this) ? this.split("") : t,
                i = n.length >>> 0,
                o = arguments[1];
            if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
            for (var r = 0; r < i; r++)
                if (r in n && !e.call(o, n[r], r, t)) return !1;
            return !0
        }), Array.prototype.some || (Array.prototype.some = function(e) {
            var t = L(this),
                n = b && "[object String]" == p(this) ? this.split("") : t,
                i = n.length >>> 0,
                o = arguments[1];
            if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
            for (var r = 0; r < i; r++)
                if (r in n && e.call(o, n[r], r, t)) return !0;
            return !1
        }), Array.prototype.reduce || (Array.prototype.reduce = function(e) {
            var t = L(this),
                n = b && "[object String]" == p(this) ? this.split("") : t,
                i = n.length >>> 0;
            if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
            if (!i && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
            var o, r = 0;
            if (arguments.length >= 2) o = arguments[1];
            else
                for (;;) { if (r in n) { o = n[r++]; break } if (++r >= i) throw new TypeError("reduce of empty array with no initial value") }
            for (; r < i; r++) r in n && (o = e.call(void 0, o, n[r], r, t));
            return o
        }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(e) {
            var t = L(this),
                n = b && "[object String]" == p(this) ? this.split("") : t,
                i = n.length >>> 0;
            if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
            if (!i && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
            var o, r = i - 1;
            if (arguments.length >= 2) o = arguments[1];
            else
                for (;;) { if (r in n) { o = n[r--]; break } if (--r < 0) throw new TypeError("reduceRight of empty array with no initial value") }
            for (; r in this && (o = e.call(void 0, o, n[r], r, t)), r--;);
            return o
        }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function(e) {
            var t = b && "[object String]" == p(this) ? this.split("") : L(this),
                n = t.length >>> 0;
            if (!n) return -1;
            var i = 0;
            for (arguments.length > 1 && (i = r(arguments[1])), i = i >= 0 ? i : Math.max(0, n + i); i < n; i++)
                if (i in t && t[i] === e) return i;
            return -1
        }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(e) {
            var t = b && "[object String]" == p(this) ? this.split("") : L(this),
                n = t.length >>> 0;
            if (!n) return -1;
            var i = n - 1;
            for (arguments.length > 1 && (i = Math.min(i, r(arguments[1]))), i = i >= 0 ? i : n - Math.abs(i); i >= 0; i--)
                if (i in t && e === t[i]) return i;
            return -1
        }), Object.getPrototypeOf || (Object.getPrototypeOf = function(e) { return e.__proto__ || (e.constructor ? e.constructor.prototype : g) }), !Object.getOwnPropertyDescriptor) {
        Object.getOwnPropertyDescriptor = function(e, t) {
            if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + e);
            if (m(e, t)) {
                var n;
                if (n = { enumerable: !0, configurable: !0 }, h) {
                    var i = e.__proto__;
                    e.__proto__ = g;
                    var o = l(e, t),
                        r = c(e, t);
                    if (e.__proto__ = i, o || r) return o && (n.get = o), r && (n.set = r), n
                }
                return n.value = e[t], n
            }
        }
    }(Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(e) { return Object.keys(e) }), Object.create) || (w = null === Object.prototype.__proto__ ? function() { return { __proto__: null } } : function() { var e = {}; for (var t in e) e[t] = null; return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e }, Object.create = function(e, t) {
        var n;
        if (null === e) n = w();
        else {
            if ("object" != typeof e) throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
            var i = function() {};
            i.prototype = e, (n = new i).__proto__ = e
        }
        return void 0 !== t && Object.defineProperties(n, t), n
    });
    if (Object.defineProperty) {
        var y = o({}),
            F = "undefined" == typeof document || o(document.createElement("div"));
        if (!y || !F) var E = Object.defineProperty
    }
    if (!Object.defineProperty || E) {
        Object.defineProperty = function(e, t, n) {
            if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.defineProperty called on non-object: " + e);
            if ("object" != typeof n && "function" != typeof n || null === n) throw new TypeError("Property description must be an object: " + n);
            if (E) try { return E.call(Object, e, t, n) } catch (e) {}
            if (m(n, "value"))
                if (h && (l(e, t) || c(e, t))) {
                    var i = e.__proto__;
                    e.__proto__ = g, delete e[t], e[t] = n.value, e.__proto__ = i
                } else e[t] = n.value;
            else {
                if (!h) throw new TypeError("getters & setters can not be defined on this javascript engine");
                m(n, "get") && s(e, t, n.get), m(n, "set") && a(e, t, n.set)
            }
            return e
        }
    }
    Object.defineProperties || (Object.defineProperties = function(e, t) { for (var n in t) m(t, n) && Object.defineProperty(e, n, t[n]); return e }), Object.seal || (Object.seal = function(e) { return e }), Object.freeze || (Object.freeze = function(e) { return e });
    try { Object.freeze(function() {}) } catch (e) { Object.freeze = (A = Object.freeze, function(e) { return "function" == typeof e ? e : A(e) }) }
    if (Object.preventExtensions || (Object.preventExtensions = function(e) { return e }), Object.isSealed || (Object.isSealed = function(e) { return !1 }), Object.isFrozen || (Object.isFrozen = function(e) { return !1 }), Object.isExtensible || (Object.isExtensible = function(e) {
            if (Object(e) === e) throw new TypeError;
            for (var t = ""; m(e, t);) t += "?";
            e[t] = !0;
            var n = m(e, t);
            return delete e[t], n
        }), !Object.keys) {
        var x = !0,
            $ = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            k = $.length;
        for (var S in { toString: null }) x = !1;
        Object.keys = function(e) {
            if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.keys called on a non-object");
            var t = [];
            for (var n in e) m(e, n) && t.push(n);
            if (x)
                for (var i = 0, o = k; i < o; i++) {
                    var r = $[i];
                    m(e, r) && t.push(r)
                }
            return t
        }
    }
    Date.now || (Date.now = function() { return (new Date).getTime() });
    var D = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";
    if (!String.prototype.trim || D.trim()) {
        D = "[" + D + "]";
        var B = new RegExp("^" + D + D + "*"),
            _ = new RegExp(D + D + "*$");
        String.prototype.trim = function() { return String(this).replace(B, "").replace(_, "") }
    }
    var L = function(e) { if (null == e) throw new TypeError("can't convert " + e + " to object"); return Object(e) }
}), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function(e, t, n) {
    "use strict";
    e("./regexp"), e("./es5-shim")
}), ace.define("ace/lib/dom", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    t.getDocumentHead = function(e) { return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement }, t.createElement = function(e, t) { return document.createElementNS ? document.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : document.createElement(e) }, t.hasCssClass = function(e, t) { return -1 !== (e.className + "").split(/\s+/g).indexOf(t) }, t.addCssClass = function(e, n) { t.hasCssClass(e, n) || (e.className += " " + n) }, t.removeCssClass = function(e, t) {
        for (var n = e.className.split(/\s+/g);;) {
            var i = n.indexOf(t);
            if (-1 == i) break;
            n.splice(i, 1)
        }
        e.className = n.join(" ")
    }, t.toggleCssClass = function(e, t) {
        for (var n = e.className.split(/\s+/g), i = !0;;) {
            var o = n.indexOf(t);
            if (-1 == o) break;
            i = !1, n.splice(o, 1)
        }
        return i && n.push(t), e.className = n.join(" "), i
    }, t.setCssClass = function(e, n, i) { i ? t.addCssClass(e, n) : t.removeCssClass(e, n) }, t.hasCssString = function(e, t) {
        var n, i = 0;
        if ((t = t || document).createStyleSheet && (n = t.styleSheets)) {
            for (; i < n.length;)
                if (n[i++].owningElement.id === e) return !0
        } else if (n = t.getElementsByTagName("style"))
            for (; i < n.length;)
                if (n[i++].id === e) return !0;
        return !1
    }, t.importCssString = function(e, n, i) {
        if (i = i || document, n && t.hasCssString(n, i)) return null;
        var o;
        n && (e += "\n/*# sourceURL=ace/css/" + n + " */"), i.createStyleSheet ? ((o = i.createStyleSheet()).cssText = e, n && (o.owningElement.id = n)) : ((o = t.createElement("style")).appendChild(i.createTextNode(e)), n && (o.id = n), t.getDocumentHead(i).appendChild(o))
    }, t.importCssStylsheet = function(e, n) {
        if (n.createStyleSheet) n.createStyleSheet(e);
        else {
            var i = t.createElement("link");
            i.rel = "stylesheet", i.href = e, t.getDocumentHead(n).appendChild(i)
        }
    }, t.getInnerWidth = function(e) { return parseInt(t.computedStyle(e, "paddingLeft"), 10) + parseInt(t.computedStyle(e, "paddingRight"), 10) + e.clientWidth }, t.getInnerHeight = function(e) { return parseInt(t.computedStyle(e, "paddingTop"), 10) + parseInt(t.computedStyle(e, "paddingBottom"), 10) + e.clientHeight }, t.scrollbarWidth = function(e) {
        var n = t.createElement("ace_inner");
        n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
        var i = t.createElement("ace_outer"),
            o = i.style;
        o.position = "absolute", o.left = "-10000px", o.overflow = "hidden", o.width = "200px", o.minWidth = "0px", o.height = "150px", o.display = "block", i.appendChild(n);
        var r = e.documentElement;
        r.appendChild(i);
        var s = n.offsetWidth;
        o.overflow = "scroll";
        var a = n.offsetWidth;
        return s == a && (a = i.clientWidth), r.removeChild(i), s - a
    }, "undefined" != typeof document ? (void 0 !== window.pageYOffset ? (t.getPageScrollTop = function() { return window.pageYOffset }, t.getPageScrollLeft = function() { return window.pageXOffset }) : (t.getPageScrollTop = function() { return document.body.scrollTop }, t.getPageScrollLeft = function() { return document.body.scrollLeft }), window.getComputedStyle ? t.computedStyle = function(e, t) { return t ? (window.getComputedStyle(e, "") || {})[t] || "" : window.getComputedStyle(e, "") || {} } : t.computedStyle = function(e, t) { return t ? e.currentStyle[t] : e.currentStyle }, t.setInnerHtml = function(e, t) { var n = e.cloneNode(!1); return n.innerHTML = t, e.parentNode.replaceChild(n, e), n }, "textContent" in document.documentElement ? (t.setInnerText = function(e, t) { e.textContent = t }, t.getInnerText = function(e) { return e.textContent }) : (t.setInnerText = function(e, t) { e.innerText = t }, t.getInnerText = function(e) { return e.innerText }), t.getParentWindow = function(e) { return e.defaultView || e.parentWindow }) : t.importCssString = function() {}
}), ace.define("ace/lib/oop", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    t.inherits = function(e, t) { e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }) }, t.mixin = function(e, t) { for (var n in t) e[n] = t[n]; return e }, t.implement = function(e, n) { t.mixin(e, n) }
}), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop"], function(e, t, n) {
    "use strict";
    e("./fixoldbrowsers");
    var i = e("./oop"),
        o = function() {
            var e, t, n = { MODIFIER_KEYS: { 16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta" }, KEY_MODS: { ctrl: 1, alt: 2, option: 2, shift: 4, super: 8, meta: 8, command: 8, cmd: 8 }, FUNCTION_KEYS: { 8: "Backspace", 9: "Tab", 13: "Return", 19: "Pause", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Links", 38: "Up", 39: "Rechts", 40: "Down", 44: "Print", 45: "Insert", 46: "Löschen", 96: "Numpad0", 97: "Numpad1", 98: "Numpad2", 99: "Numpad3", 100: "Numpad4", 101: "Numpad5", 102: "Numpad6", 103: "Numpad7", 104: "Numpad8", 105: "Numpad9", "-13": "NumpadEnter", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Numlock", 145: "Scrolllock" }, PRINTABLE_KEYS: { 32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 61: "=", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 107: "+", 109: "-", 110: ".", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 111: "/", 106: "*" } };
            for (t in n.FUNCTION_KEYS) e = n.FUNCTION_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
            for (t in n.PRINTABLE_KEYS) e = n.PRINTABLE_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
            return i.mixin(n, n.MODIFIER_KEYS), i.mixin(n, n.PRINTABLE_KEYS), i.mixin(n, n.FUNCTION_KEYS), n.enter = n.return, n.escape = n.esc, n.del = n.delete, n[173] = "-",
                function() { for (var e = ["cmd", "ctrl", "alt", "shift"], t = Math.pow(2, e.length); t--;) n.KEY_MODS[t] = e.filter(function(e) { return t & n.KEY_MODS[e] }).join("-") + "-" }(), n.KEY_MODS[0] = "", n.KEY_MODS[-1] = "input-", n
        }();
    i.mixin(t, o), t.keyCodeToString = function(e) { var t = o[e]; return "string" != typeof t && (t = String.fromCharCode(e)), t.toLowerCase() }
}), ace.define("ace/lib/useragent", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    if (t.OS = { LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS" }, t.getOS = function() { return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS }, "object" == typeof navigator) {
        var i = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            o = navigator.userAgent;
        t.isWin = "win" == i, t.isMac = "mac" == i, t.isLinux = "linux" == i, t.isIE = "Microsoft Internet Explorer" == navigator.appName || navigator.appName.indexOf("MSAppHost") >= 0 ? parseFloat((o.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((o.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = (window.Controllers || window.controllers) && "Gecko" === window.navigator.product, t.isOldGecko = t.isGecko && parseInt((o.match(/rv:(\d+)/) || [])[1], 10) < 4, t.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(o.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(o.split(" Chrome/")[1]) || void 0, t.isAIR = o.indexOf("AdobeAIR") >= 0, t.isIPad = o.indexOf("iPad") >= 0, t.isChromeOS = o.indexOf(" CrOS ") >= 0, t.isIOS = /iPad|iPhone|iPod/.test(o) && !window.MSStream, t.isIOS && (t.isMac = !0)
    }
}), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(e, t, n) {
    "use strict";

    function i(e, t, n) {
        var i = c(t);
        if (!s.isMac && a) {
            if (t.getModifierState && (t.getModifierState("OS") || t.getModifierState("Win")) && (i |= 8), a.altGr) {
                if (3 == (3 & i)) return;
                a.altGr = 0
            }
            if (18 === n || 17 === n) {
                var o = "location" in t ? t.location : t.keyLocation;
                if (17 === n && 1 === o) 1 == a[n] && (l = t.timeStamp);
                else if (18 === n && 3 === i && 2 === o) { t.timeStamp - l < 50 && (a.altGr = !0) }
            }
        }
        if ((n in r.MODIFIER_KEYS && (n = -1), 8 & i && n >= 91 && n <= 93 && (n = -1), !i && 13 === n) && (3 === (o = "location" in t ? t.location : t.keyLocation) && (e(t, i, -n), t.defaultPrevented))) return;
        if (s.isChromeOS && 8 & i) {
            if (e(t, i, n), t.defaultPrevented) return;
            i &= -9
        }
        return !!(i || n in r.FUNCTION_KEYS || n in r.PRINTABLE_KEYS) && e(t, i, n)
    }

    function o() { a = Object.create(null) }
    var r = e("./keys"),
        s = e("./useragent"),
        a = null,
        l = 0;
    t.addListener = function(e, t, n) {
        if (e.addEventListener) return e.addEventListener(t, n, !1);
        if (e.attachEvent) {
            var i = function() { n.call(e, window.event) };
            n._wrapper = i, e.attachEvent("on" + t, i)
        }
    }, t.removeListener = function(e, t, n) {
        if (e.removeEventListener) return e.removeEventListener(t, n, !1);
        e.detachEvent && e.detachEvent("on" + t, n._wrapper || n)
    }, t.stopEvent = function(e) { return t.stopPropagation(e), t.preventDefault(e), !1 }, t.stopPropagation = function(e) { e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0 }, t.preventDefault = function(e) { e.preventDefault ? e.preventDefault() : e.returnValue = !1 }, t.getButton = function(e) { return "dblclick" == e.type ? 0 : "contextmenu" == e.type || s.isMac && e.ctrlKey && !e.altKey && !e.shiftKey ? 2 : e.preventDefault ? e.button : { 1: 0, 2: 2, 4: 1 }[e.button] }, t.capture = function(e, n, i) {
        function o(e) { n && n(e), i && i(e), t.removeListener(document, "mousemove", n, !0), t.removeListener(document, "mouseup", o, !0), t.removeListener(document, "dragstart", o, !0) }
        return t.addListener(document, "mousemove", n, !0), t.addListener(document, "mouseup", o, !0), t.addListener(document, "dragstart", o, !0), o
    }, t.addTouchMoveListener = function(e, n) {
        var i, o;
        "ontouchmove" in e && (t.addListener(e, "touchstart", function(e) {
            var t = e.changedTouches[0];
            i = t.clientX, o = t.clientY
        }), t.addListener(e, "touchmove", function(e) {
            var t = e.changedTouches[0];
            e.wheelX = -(t.clientX - i) / 1, e.wheelY = -(t.clientY - o) / 1, i = t.clientX, o = t.clientY, n(e)
        }))
    }, t.addMouseWheelListener = function(e, n) {
        "onmousewheel" in e ? t.addListener(e, "mousewheel", function(e) { void 0 !== e.wheelDeltaX ? (e.wheelX = -e.wheelDeltaX / 8, e.wheelY = -e.wheelDeltaY / 8) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / 8), n(e) }) : "onwheel" in e ? t.addListener(e, "wheel", function(e) {
            switch (e.deltaMode) {
                case e.DOM_DELTA_PIXEL:
                    e.wheelX = .35 * e.deltaX || 0, e.wheelY = .35 * e.deltaY || 0;
                    break;
                case e.DOM_DELTA_LINE:
                case e.DOM_DELTA_PAGE:
                    e.wheelX = 5 * (e.deltaX || 0), e.wheelY = 5 * (e.deltaY || 0)
            }
            n(e)
        }) : t.addListener(e, "DOMMouseScroll", function(e) { e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = 5 * (e.detail || 0), e.wheelY = 0) : (e.wheelX = 0, e.wheelY = 5 * (e.detail || 0)), n(e) })
    }, t.addMultiMouseDownListener = function(e, n, i, o) {
        function r(e) {
            if (0 !== t.getButton(e) ? u = 0 : e.detail > 1 ? ++u > 4 && (u = 1) : u = 1, s.isIE) {
                var r = Math.abs(e.clientX - l) > 5 || Math.abs(e.clientY - c) > 5;
                h && !r || (u = 1), h && clearTimeout(h), h = setTimeout(function() { h = null }, n[u - 1] || 600), 1 == u && (l = e.clientX, c = e.clientY)
            }
            if (e._clicks = u, i[o]("mousedown", e), u > 4) u = 0;
            else if (u > 1) return i[o](d[u], e)
        }

        function a(e) { u = 2, h && clearTimeout(h), h = setTimeout(function() { h = null }, n[u - 1] || 600), i[o]("mousedown", e), i[o](d[u], e) }
        var l, c, h, u = 0,
            d = { 2: "dblclick", 3: "tripleclick", 4: "quadclick" };
        Array.isArray(e) || (e = [e]), e.forEach(function(e) { t.addListener(e, "mousedown", r), s.isOldIE && t.addListener(e, "dblclick", a) })
    };
    var c = !s.isMac || !s.isOpera || "KeyboardEvent" in window ? function(e) { return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0) } : function(e) { return 0 | (e.metaKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.ctrlKey ? 8 : 0) };
    if (t.getModifierString = function(e) { return r.KEY_MODS[c(e)] }, t.addCommandKeyListener = function(e, n) {
            var r = t.addListener;
            if (s.isOldGecko || s.isOpera && !("KeyboardEvent" in window)) {
                var l = null;
                r(e, "keydown", function(e) { l = e.keyCode }), r(e, "keypress", function(e) { return i(n, e, l) })
            } else {
                var c = null;
                r(e, "keydown", function(e) { a[e.keyCode] = (a[e.keyCode] || 0) + 1; var t = i(n, e, e.keyCode); return c = e.defaultPrevented, t }), r(e, "keypress", function(e) { c && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && (t.stopEvent(e), c = null) }), r(e, "keyup", function(e) { a[e.keyCode] = null }), a || (o(), r(window, "focus", o))
            }
        }, "object" == typeof window && window.postMessage && !s.isOldIE) {
        t.nextTick = function(e, n) {
            n = n || window;
            var i = "zero-timeout-message-1";
            t.addListener(n, "message", function o(r) { r.data == i && (t.stopPropagation(r), t.removeListener(n, "message", o), e()) }), n.postMessage(i, "*")
        }
    }
    t.nextFrame = "object" == typeof window && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function(e) { setTimeout(e, 17) }
}), ace.define("ace/lib/lang", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    t.last = function(e) { return e[e.length - 1] }, t.stringReverse = function(e) { return e.split("").reverse().join("") }, t.stringRepeat = function(e, t) { for (var n = ""; t > 0;) 1 & t && (n += e), (t >>= 1) && (e += e); return n };
    var i = /^\s\s*/,
        o = /\s\s*$/;
    t.stringTrimLeft = function(e) { return e.replace(i, "") }, t.stringTrimRight = function(e) { return e.replace(o, "") }, t.copyObject = function(e) { var t = {}; for (var n in e) t[n] = e[n]; return t }, t.copyArray = function(e) { for (var t = [], n = 0, i = e.length; n < i; n++) e[n] && "object" == typeof e[n] ? t[n] = this.copyObject(e[n]) : t[n] = e[n]; return t }, t.deepCopy = function e(t) { if ("object" != typeof t || !t) return t; var n; if (Array.isArray(t)) { n = []; for (var i = 0; i < t.length; i++) n[i] = e(t[i]); return n } if ("[object Object]" !== Object.prototype.toString.call(t)) return t; for (var i in n = {}, t) n[i] = e(t[i]); return n }, t.arrayToMap = function(e) { for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = 1; return t }, t.createMap = function(e) { var t = Object.create(null); for (var n in e) t[n] = e[n]; return t }, t.arrayRemove = function(e, t) { for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1) }, t.escapeRegExp = function(e) { return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") }, t.escapeHTML = function(e) { return e.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;") }, t.getMatchOffsets = function(e, t) { var n = []; return e.replace(t, function(e) { n.push({ offset: arguments[arguments.length - 2], length: e.length }) }), n }, t.deferredCall = function(e) {
        var t = null,
            n = function() { t = null, e() },
            i = function(e) { return i.cancel(), t = setTimeout(n, e || 0), i };
        return i.schedule = i, i.call = function() { return this.cancel(), e(), i }, i.cancel = function() { return clearTimeout(t), t = null, i }, i.isPending = function() { return t }, i
    }, t.delayedCall = function(e, t) {
        var n = null,
            i = function() { n = null, e() },
            o = function(e) { null == n && (n = setTimeout(i, e || t)) };
        return o.delay = function(e) { n && clearTimeout(n), n = setTimeout(i, e || t) }, o.schedule = o, o.call = function() { this.cancel(), e() }, o.cancel = function() { n && clearTimeout(n), n = null }, o.isPending = function() { return n }, o
    }
}), ace.define("ace/keyboard/textinput_ios", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang", "ace/lib/keys"], function(e, t, n) {
    "use strict";
    var i = e("../lib/event"),
        o = e("../lib/useragent"),
        r = e("../lib/dom"),
        s = e("../lib/lang"),
        a = e("../lib/keys"),
        l = a.KEY_MODS,
        c = o.isChrome < 18,
        h = o.isIE;
    t.TextInput = function(e, t) {
        function n(e) {
            if (!w) {
                if (w = !0, E) t = 0, n = e ? 0 : g.value.length - 1;
                else var t = 4,
                    n = 5;
                try { g.setSelectionRange(t, n) } catch (e) {}
                w = !1
            }
        }

        function u() { w || (g.value = f, o.isWebKit && F.schedule()) }

        function d() { clearTimeout(R), R = setTimeout(function() { A && (g.style.cssText = A, A = ""), null == t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor()) }, 0) }
        var g = r.createElement("textarea");
        g.className = o.isIOS ? "ace_text-input ace_text-input-ios" : "ace_text-input", o.isTouchPad && g.setAttribute("x-palm-disable-auto-cap", !0), g.setAttribute("wrap", "off"), g.setAttribute("autocorrect", "off"), g.setAttribute("autocapitalize", "off"), g.setAttribute("spellcheck", !1), g.style.opacity = "0", e.insertBefore(g, e.firstChild);
        var f = "\n aaaa a\n",
            p = !1,
            m = !1,
            v = !1,
            w = !1,
            A = "",
            C = !0;
        try { var b = document.activeElement === g } catch (e) {}
        i.addListener(g, "blur", function(e) { t.onBlur(e), b = !1 }), i.addListener(g, "focus", function(e) { b = !0, t.onFocus(e), n() }), this.focus = function() {
            if (A) return g.focus();
            g.style.position = "fixed", g.focus()
        }, this.blur = function() { g.blur() }, this.isFocused = function() { return b };
        var y = s.delayedCall(function() { b && n(C) }),
            F = s.delayedCall(function() { w || (g.value = f, b && n()) });
        o.isWebKit || t.addEventListener("changeSelection", function() { t.selection.isEmpty() != C && (C = !C, y.schedule()) }), u(), b && t.onFocus();
        var E = null;
        this.setInputHandler = function(e) { E = e }, this.getInputHandler = function() { return E };
        var x = !1,
            $ = function(e) { 4 === g.selectionStart && 5 === g.selectionEnd || (E && (e = E(e), E = null), v ? (n(), e && t.onPaste(e), v = !1) : e == f.substr(0) && 4 === g.selectionStart ? x ? t.execCommand("del", { source: "ace" }) : t.execCommand("backspace", { source: "ace" }) : p || (e.substring(0, 9) == f && e.length > f.length ? e = e.substr(9) : e.substr(0, 4) == f.substr(0, 4) ? e = e.substr(4, e.length - f.length + 1) : e.charAt(e.length - 1) == f.charAt(0) && (e = e.slice(0, -1)), e != f.charAt(0) && e.charAt(e.length - 1) == f.charAt(0) && (e = e.slice(0, -1)), e && t.onTextInput(e)), p && (p = !1), x && (x = !1)) },
            k = function(e) {
                if (!w) {
                    var t = g.value;
                    $(t), u()
                }
            },
            S = function(e, t, n) { var i = e.clipboardData || window.clipboardData; if (i && !c) { var o = h || n ? "Text" : "text/plain"; try { return t ? !1 !== i.setData(o, t) : i.getData(o) } catch (e) { if (!n) return S(e, t, !0) } } },
            D = function(e, r) {
                var s = t.getCopyText();
                if (!s) return i.preventDefault(e);
                S(e, s) ? (o.isIOS && (m = r, g.value = "\n aa" + s + "a a\n", g.setSelectionRange(4, 4 + s.length), p = { value: s }), r ? t.onCut() : t.onCopy(), o.isIOS || i.preventDefault(e)) : (p = !0, g.value = s, g.select(), setTimeout(function() { p = !1, u(), n(), r ? t.onCut() : t.onCopy() }))
            };
        i.addCommandKeyListener(g, t.onCommandKey.bind(t)), i.addListener(g, "select", function(e) {
            var i;
            0 === (i = g).selectionStart && i.selectionEnd === i.value.length ? (t.selectAll(), n()) : E && n(t.selection.isEmpty())
        }), i.addListener(g, "input", k), i.addListener(g, "cut", function(e) { D(e, !0) }), i.addListener(g, "copy", function(e) { D(e, !1) }), i.addListener(g, "paste", function(e) { var r = S(e); "string" == typeof r ? (r && t.onPaste(r, e), o.isIE && setTimeout(n), i.preventDefault(e)) : (g.value = "", v = !0) });
        var B = function() {
                if (w && t.onCompositionUpdate && !t.$readOnly) {
                    var e = g.value.replace(/\x01/g, "");
                    if (w.lastValue !== e && (t.onCompositionUpdate(e), w.lastValue && t.undo(), w.canUndo && (w.lastValue = e), w.lastValue)) {
                        var n = t.selection.getRange();
                        t.insert(w.lastValue), t.session.markUndoGroup(), w.range = t.selection.getRange(), t.selection.setRange(n), t.selection.clearSelection()
                    }
                }
            },
            _ = function(e) {
                if (t.onCompositionEnd && !t.$readOnly) {
                    var n = w;
                    w = !1;
                    var i = setTimeout(function() {
                        i = null;
                        var e = g.value.replace(/\x01/g, "");
                        w || (e == n.lastValue ? u() : !n.lastValue && e && (u(), $(e)))
                    });
                    E = function(e) { return i && clearTimeout(i), (e = e.replace(/\x01/g, "")) == n.lastValue ? "" : (n.lastValue && i && t.undo(), e) }, t.onCompositionEnd(), t.removeListener("mousedown", _), "compositionend" == e.type && n.range && t.selection.setRange(n.range), (o.isChrome && o.isChrome >= 53 || o.isWebKit && o.isWebKit >= 603) && k()
                }
            },
            L = s.delayedCall(B, 50);
        i.addListener(g, "compositionstart", function(e) { w || !t.onCompositionStart || t.$readOnly || ((w = {}).canUndo = t.session.$undoManager, t.onCompositionStart(), setTimeout(B, 0), t.on("mousedown", _), w.canUndo && !t.selection.isEmpty() && (t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection()), t.session.markUndoGroup()) }), o.isGecko ? i.addListener(g, "text", function() { L.schedule() }) : (i.addListener(g, "keyup", function() { L.schedule() }), i.addListener(g, "keydown", function() { L.schedule() })), i.addListener(g, "compositionend", _), this.getElement = function() { return g }, this.setReadOnly = function(e) { g.readOnly = e }, this.onContextMenu = function(e) { x = !0, n(t.selection.isEmpty()), t._emit("nativecontextmenu", { target: t, domEvent: e }), this.moveToMouse(e, !0) }, this.moveToMouse = function(e, n) {
            A || (A = g.style.cssText), g.style.cssText = (n ? "z-index:100000;" : "") + "height:" + g.style.height + ";" + (o.isIE ? "opacity:0.1;" : "");
            var s = t.container.getBoundingClientRect(),
                a = r.computedStyle(t.container),
                l = s.top + (parseInt(a.borderTopWidth) || 0),
                c = s.left + (parseInt(s.borderLeftWidth) || 0),
                h = s.bottom - l - g.clientHeight - 2,
                u = function(e) { g.style.left = e.clientX - c - 2 + "px", g.style.top = Math.min(e.clientY - l - 2, h) + "px" };
            u(e), "mousedown" == e.type && (t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = null), clearTimeout(R), o.isWin && i.capture(t.container, u, d))
        }, this.onContextMenuClose = d;
        var R, T = function(e) { t.textInput.onContextMenu(e), d() };
        if (i.addListener(g, "mouseup", T), i.addListener(g, "mousedown", function(e) { e.preventDefault(), d() }), i.addListener(t.renderer.scroller, "contextmenu", T), i.addListener(g, "contextmenu", T), o.isIOS) {
            var M = null,
                O = !1;
            e.addEventListener("keydown", function(e) { M && clearTimeout(M), O = !0 }), e.addEventListener("keyup", function(e) { M = setTimeout(function() { O = !1 }, 100) });
            var I = function(e) {
                if (document.activeElement === g && !O) {
                    if (m) return setTimeout(function() { m = !1 }, 100);
                    var n = g.selectionStart,
                        i = g.selectionEnd;
                    if (g.setSelectionRange(4, 5), n == i) switch (n) {
                        case 0:
                            t.onCommandKey(null, 0, a.up);
                            break;
                        case 1:
                            t.onCommandKey(null, 0, a.home);
                            break;
                        case 2:
                            t.onCommandKey(null, l.option, a.left);
                            break;
                        case 4:
                            t.onCommandKey(null, 0, a.left);
                            break;
                        case 5:
                            t.onCommandKey(null, 0, a.right);
                            break;
                        case 7:
                            t.onCommandKey(null, l.option, a.right);
                            break;
                        case 8:
                            t.onCommandKey(null, 0, a.end);
                            break;
                        case 9:
                            t.onCommandKey(null, 0, a.down)
                    } else {
                        switch (i) {
                            case 6:
                                t.onCommandKey(null, l.shift, a.right);
                                break;
                            case 7:
                                t.onCommandKey(null, l.shift | l.option, a.right);
                                break;
                            case 8:
                                t.onCommandKey(null, l.shift, a.end);
                                break;
                            case 9:
                                t.onCommandKey(null, l.shift, a.down)
                        }
                        switch (n) {
                            case 0:
                                t.onCommandKey(null, l.shift, a.up);
                                break;
                            case 1:
                                t.onCommandKey(null, l.shift, a.home);
                                break;
                            case 2:
                                t.onCommandKey(null, l.shift | l.option, a.left);
                                break;
                            case 3:
                                t.onCommandKey(null, l.shift, a.left)
                        }
                    }
                }
            };
            document.addEventListener("selectionchange", I), t.on("destroy", function() { document.removeEventListener("selectionchange", I) })
        }
    }
}), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang", "ace/keyboard/textinput_ios"], function(e, t, n) {
    "use strict";
    var i = e("../lib/event"),
        o = e("../lib/useragent"),
        r = e("../lib/dom"),
        s = e("../lib/lang"),
        a = o.isChrome < 18,
        l = o.isIE,
        c = e("./textinput_ios").TextInput;
    t.TextInput = function(e, t) {
        function n(e) {
            if (!m) {
                if (m = !0, y) t = 0, n = e ? 0 : d.value.length - 1;
                else var t = e ? 2 : 1,
                    n = 2;
                try { d.setSelectionRange(t, n) } catch (e) {}
                m = !1
            }
        }

        function h() { m || (d.value = g, o.isWebKit && b.schedule()) }

        function u() { clearTimeout(T), T = setTimeout(function() { v && (d.style.cssText = v, v = ""), null == t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor()) }, 0) }
        if (o.isIOS) return c.call(this, e, t);
        var d = r.createElement("textarea");
        d.className = "ace_text-input", d.setAttribute("wrap", "off"), d.setAttribute("autocorrect", "off"), d.setAttribute("autocapitalize", "off"), d.setAttribute("spellcheck", !1), d.style.opacity = "0", e.insertBefore(d, e.firstChild);
        var g = "\u2028\u2028",
            f = !1,
            p = !1,
            m = !1,
            v = "",
            w = !0;
        try { var A = document.activeElement === d } catch (e) {}
        i.addListener(d, "blur", function(e) { t.onBlur(e), A = !1 }), i.addListener(d, "focus", function(e) { A = !0, t.onFocus(e), n() }), this.focus = function() {
            if (v) return d.focus();
            var e = d.style.top;
            d.style.position = "fixed", d.style.top = "0px", d.focus(), setTimeout(function() { d.style.position = "", "0px" == d.style.top && (d.style.top = e) }, 0)
        }, this.blur = function() { d.blur() }, this.isFocused = function() { return A };
        var C = s.delayedCall(function() { A && n(w) }),
            b = s.delayedCall(function() { m || (d.value = g, A && n()) });
        o.isWebKit || t.addEventListener("changeSelection", function() { t.selection.isEmpty() != w && (w = !w, C.schedule()) }), h(), A && t.onFocus();
        var y = null;
        this.setInputHandler = function(e) { y = e }, this.getInputHandler = function() { return y };
        var F = !1,
            E = function(e) { y && (e = y(e), y = null), p ? (n(), e && t.onPaste(e), p = !1) : e == g.charAt(0) ? F ? t.execCommand("del", { source: "ace" }) : t.execCommand("backspace", { source: "ace" }) : (e.substring(0, 2) == g ? e = e.substr(2) : e.charAt(0) == g.charAt(0) ? e = e.substr(1) : e.charAt(e.length - 1) == g.charAt(0) && (e = e.slice(0, -1)), e.charAt(e.length - 1) == g.charAt(0) && (e = e.slice(0, -1)), e && t.onTextInput(e)), F && (F = !1) },
            x = function(e) {
                if (!m) {
                    var t = d.value;
                    E(t), h()
                }
            },
            $ = function(e, t, n) { var i = e.clipboardData || window.clipboardData; if (i && !a) { var o = l || n ? "Text" : "text/plain"; try { return t ? !1 !== i.setData(o, t) : i.getData(o) } catch (e) { if (!n) return $(e, t, !0) } } },
            k = function(e, o) {
                var r = t.getCopyText();
                if (!r) return i.preventDefault(e);
                $(e, r) ? (o ? t.onCut() : t.onCopy(), i.preventDefault(e)) : (f = !0, d.value = r, d.select(), setTimeout(function() { f = !1, h(), n(), o ? t.onCut() : t.onCopy() }))
            },
            S = function(e) { k(e, !0) },
            D = function(e) { k(e, !1) },
            B = function(e) { var r = $(e); "string" == typeof r ? (r && t.onPaste(r, e), o.isIE && setTimeout(n), i.preventDefault(e)) : (d.value = "", p = !0) };
        i.addCommandKeyListener(d, t.onCommandKey.bind(t)), i.addListener(d, "select", function(e) {
            var i;
            f ? f = !1 : 0 === (i = d).selectionStart && i.selectionEnd === i.value.length ? (t.selectAll(), n()) : y && n(t.selection.isEmpty())
        }), i.addListener(d, "input", x), i.addListener(d, "cut", S), i.addListener(d, "copy", D), i.addListener(d, "paste", B), (!("oncut" in d) || !("oncopy" in d) || !("onpaste" in d)) && i.addListener(e, "keydown", function(e) {
            if ((!o.isMac || e.metaKey) && e.ctrlKey) switch (e.keyCode) {
                case 67:
                    D(e);
                    break;
                case 86:
                    B(e);
                    break;
                case 88:
                    S(e)
            }
        });
        var _ = function() {
                if (m && t.onCompositionUpdate && !t.$readOnly) {
                    var e = d.value.replace(/\u2028/g, "");
                    if (m.lastValue !== e && (t.onCompositionUpdate(e), m.lastValue && t.undo(), m.canUndo && (m.lastValue = e), m.lastValue)) {
                        var n = t.selection.getRange();
                        t.insert(m.lastValue), t.session.markUndoGroup(), m.range = t.selection.getRange(), t.selection.setRange(n), t.selection.clearSelection()
                    }
                }
            },
            L = function(e) {
                if (t.onCompositionEnd && !t.$readOnly) {
                    var n = m;
                    m = !1;
                    var i = setTimeout(function() {
                        i = null;
                        var e = d.value.replace(/\u2028/g, "");
                        m || (e == n.lastValue ? h() : !n.lastValue && e && (h(), E(e)))
                    });
                    y = function(e) { return i && clearTimeout(i), (e = e.replace(/\u2028/g, "")) == n.lastValue ? "" : (n.lastValue && i && t.undo(), e) }, t.onCompositionEnd(), t.removeListener("mousedown", L), "compositionend" == e.type && n.range && t.selection.setRange(n.range), (o.isChrome && o.isChrome >= 53 || o.isWebKit && o.isWebKit >= 603) && x()
                }
            },
            R = s.delayedCall(_, 50);
        i.addListener(d, "compositionstart", function(e) { m || !t.onCompositionStart || t.$readOnly || ((m = {}).canUndo = t.session.$undoManager, t.onCompositionStart(), setTimeout(_, 0), t.on("mousedown", L), m.canUndo && !t.selection.isEmpty() && (t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection()), t.session.markUndoGroup()) }), o.isGecko ? i.addListener(d, "text", function() { R.schedule() }) : (i.addListener(d, "keyup", function() { R.schedule() }), i.addListener(d, "keydown", function() { R.schedule() })), i.addListener(d, "compositionend", L), this.getElement = function() { return d }, this.setReadOnly = function(e) { d.readOnly = e }, this.onContextMenu = function(e) { F = !0, n(t.selection.isEmpty()), t._emit("nativecontextmenu", { target: t, domEvent: e }), this.moveToMouse(e, !0) }, this.moveToMouse = function(e, n) {
            v || (v = d.style.cssText), d.style.cssText = (n ? "z-index:100000;" : "") + "height:" + d.style.height + ";" + (o.isIE ? "opacity:0.1;" : "");
            var s = t.container.getBoundingClientRect(),
                a = r.computedStyle(t.container),
                l = s.top + (parseInt(a.borderTopWidth) || 0),
                c = s.left + (parseInt(s.borderLeftWidth) || 0),
                h = s.bottom - l - d.clientHeight - 2,
                g = function(e) { d.style.left = e.clientX - c - 2 + "px", d.style.top = Math.min(e.clientY - l - 2, h) + "px" };
            g(e), "mousedown" == e.type && (t.renderer.$keepTextAreaAtCursor && (t.renderer.$keepTextAreaAtCursor = null), clearTimeout(T), o.isWin && i.capture(t.container, g, u))
        }, this.onContextMenuClose = u;
        var T, M = function(e) { t.textInput.onContextMenu(e), u() };
        i.addListener(d, "mouseup", M), i.addListener(d, "mousedown", function(e) { e.preventDefault(), u() }), i.addListener(t.renderer.scroller, "contextmenu", M), i.addListener(d, "contextmenu", M)
    }
}), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
    "use strict";

    function i(e) {
        e.$clickSelection = null;
        var t = e.editor;
        t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e)), t.setDefaultHandler("touchmove", this.onTouchMove.bind(e));
        ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"].forEach(function(t) { e[t] = this[t] }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
    }

    function o(e, t) {
        if (e.start.row == e.end.row) var n = 2 * t.column - e.start.column - e.end.column;
        else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column) n = 2 * t.row - e.start.row - e.end.row;
        else var n = t.column - 4;
        return n < 0 ? { cursor: e.start, anchor: e.end } : { cursor: e.end, anchor: e.start }
    }
    e("../lib/dom"), e("../lib/event");
    var r = e("../lib/useragent");
    (function() {
        this.onMouseDown = function(e) {
            var t = e.inSelection(),
                n = e.getDocumentPosition();
            this.mousedownEvent = e;
            var i = this.editor,
                o = e.getButton();
            if (0 !== o) { var s = i.getSelectionRange().isEmpty(); return i.$blockScrolling++, (s || 1 == o) && i.selection.moveToPosition(n), i.$blockScrolling--, void(2 == o && (i.textInput.onContextMenu(e.domEvent), r.isMozilla || e.preventDefault())) }
            return this.mousedownEvent.time = Date.now(), !t || i.isFocused() || (i.focus(), !this.$focusTimout || this.$clickSelection || i.inMultiSelectMode) ? (this.captureMouse(e), this.startSelect(n, e.domEvent._clicks > 1), e.preventDefault()) : (this.setState("focusWait"), void this.captureMouse(e))
        }, this.startSelect = function(e, t) {
            e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
            var n = this.editor;
            n.$blockScrolling++, this.mousedownEvent.getShiftKey() ? n.selection.selectToPosition(e) : t || n.selection.moveToPosition(e), t || this.select(), n.renderer.scroller.setCapture && n.renderer.scroller.setCapture(), n.setStyle("ace_selecting"), this.setState("select"), n.$blockScrolling--
        }, this.select = function() {
            var e, t = this.editor,
                n = t.renderer.screenToTextCoordinates(this.x, this.y);
            if (t.$blockScrolling++, this.$clickSelection) {
                var i = this.$clickSelection.comparePoint(n);
                if (-1 == i) e = this.$clickSelection.end;
                else if (1 == i) e = this.$clickSelection.start;
                else {
                    var r = o(this.$clickSelection, n);
                    n = r.cursor, e = r.anchor
                }
                t.selection.setSelectionAnchor(e.row, e.column)
            }
            t.selection.selectToPosition(n), t.$blockScrolling--, t.renderer.scrollCursorIntoView()
        }, this.extendSelectionBy = function(e) {
            var t, n = this.editor,
                i = n.renderer.screenToTextCoordinates(this.x, this.y),
                r = n.selection[e](i.row, i.column);
            if (n.$blockScrolling++, this.$clickSelection) {
                var s = this.$clickSelection.comparePoint(r.start),
                    a = this.$clickSelection.comparePoint(r.end);
                if (-1 == s && a <= 0) t = this.$clickSelection.end, r.end.row == i.row && r.end.column == i.column || (i = r.start);
                else if (1 == a && s >= 0) t = this.$clickSelection.start, r.start.row == i.row && r.start.column == i.column || (i = r.end);
                else if (-1 == s && 1 == a) i = r.end, t = r.start;
                else {
                    var l = o(this.$clickSelection, i);
                    i = l.cursor, t = l.anchor
                }
                n.selection.setSelectionAnchor(t.row, t.column)
            }
            n.selection.selectToPosition(i), n.$blockScrolling--, n.renderer.scrollCursorIntoView()
        }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() { this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture() }, this.focusWait = function() {
            var e, t, n, i, o = (e = this.mousedownEvent.x, t = this.mousedownEvent.y, n = this.x, i = this.y, Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2))),
                r = Date.now();
            (o > 0 || r - this.mousedownEvent.time > this.$focusTimout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
        }, this.onDoubleClick = function(e) {
            var t = e.getDocumentPosition(),
                n = this.editor,
                i = n.session.getBracketRange(t);
            i ? (i.isEmpty() && (i.start.column--, i.end.column++), this.setState("select")) : (i = n.selection.getWordRange(t.row, t.column), this.setState("selectByWords")), this.$clickSelection = i, this.select()
        }, this.onTripleClick = function(e) {
            var t = e.getDocumentPosition(),
                n = this.editor;
            this.setState("selectByLines");
            var i = n.getSelectionRange();
            i.isMultiLine() && i.contains(t.row, t.column) ? (this.$clickSelection = n.selection.getLineRange(i.start.row), this.$clickSelection.end = n.selection.getLineRange(i.end.row).end) : this.$clickSelection = n.selection.getLineRange(t.row), this.select()
        }, this.onQuadClick = function(e) {
            var t = this.editor;
            t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("selectAll")
        }, this.onMouseWheel = function(e) {
            if (!e.getAccelKey()) {
                e.getShiftKey() && e.wheelY && !e.wheelX && (e.wheelX = e.wheelY, e.wheelY = 0);
                var t = e.domEvent.timeStamp,
                    n = t - (this.$lastScrollTime || 0),
                    i = this.editor;
                return i.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed) || n < 200 ? (this.$lastScrollTime = t, i.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
            }
        }, this.onTouchMove = function(e) {
            var t = e.domEvent.timeStamp,
                n = t - (this.$lastScrollTime || 0),
                i = this.editor;
            if (i.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed) || n < 200) return this.$lastScrollTime = t, i.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()
        }
    }).call(i.prototype), t.DefaultHandlers = i
}), ace.define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], function(e, t, n) {
    "use strict";

    function i(e) { this.isOpen = !1, this.$element = null, this.$parentNode = e }
    e("./lib/oop");
    var o = e("./lib/dom");
    (function() { this.$init = function() { return this.$element = o.createElement("div"), this.$element.className = "ace_tooltip", this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element }, this.getElement = function() { return this.$element || this.$init() }, this.setText = function(e) { o.setInnerText(this.getElement(), e) }, this.setHtml = function(e) { this.getElement().innerHTML = e }, this.setPosition = function(e, t) { this.getElement().style.left = e + "px", this.getElement().style.top = t + "px" }, this.setClassName = function(e) { o.addCssClass(this.getElement(), e) }, this.show = function(e, t, n) { null != e && this.setText(e), null != t && null != n && this.setPosition(t, n), this.isOpen || (this.getElement().style.display = "block", this.isOpen = !0) }, this.hide = function() { this.isOpen && (this.getElement().style.display = "none", this.isOpen = !1) }, this.getHeight = function() { return this.getElement().offsetHeight }, this.getWidth = function() { return this.getElement().offsetWidth }, this.destroy = function() { this.isOpen = !1, this.$element && this.$element.parentNode && this.$element.parentNode.removeChild(this.$element) } }).call(i.prototype), t.Tooltip = i
}), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], function(e, t, n) {
    "use strict";

    function i(e) { a.call(this, e) }
    var o = e("../lib/dom"),
        r = e("../lib/oop"),
        s = e("../lib/event"),
        a = e("../tooltip").Tooltip;
    r.inherits(i, a),
        function() {
            this.setPosition = function(e, t) {
                var n = window.innerWidth || document.documentElement.clientWidth,
                    i = window.innerHeight || document.documentElement.clientHeight,
                    o = this.getWidth(),
                    r = this.getHeight();
                (e += 15) + o > n && (e -= e + o - n), (t += 15) + r > i && (t -= 20 + r), a.prototype.setPosition.call(this, e, t)
            }
        }.call(i.prototype), t.GutterHandler = function(e) {
            function t() { r && (r = clearTimeout(r)), l && (u.hide(), l = null, c._signal("hideGutterTooltip", u), c.removeEventListener("mousewheel", t)) }

            function n(e) { u.setPosition(e.x, e.y) }
            var r, a, l, c = e.editor,
                h = c.renderer.$gutterLayer,
                u = new i(c.container);
            e.editor.setDefaultHandler("guttermousedown", function(t) {
                if (c.isFocused() && 0 == t.getButton() && "foldWidgets" != h.getRegion(t)) {
                    var n = t.getDocumentPosition().row,
                        i = c.session.selection;
                    if (t.getShiftKey()) i.selectTo(n, 0);
                    else {
                        if (2 == t.domEvent.detail) return c.selectAll(), t.preventDefault();
                        e.$clickSelection = c.selection.getLineRange(n)
                    }
                    return e.setState("selectByLines"), e.captureMouse(t), t.preventDefault()
                }
            }), e.editor.setDefaultHandler("guttermousemove", function(i) {
                var s = i.domEvent.target || i.domEvent.srcElement;
                if (o.hasCssClass(s, "ace_fold-widget")) return t();
                l && e.$tooltipFollowsMouse && n(i), a = i, r || (r = setTimeout(function() {
                    r = null, a && !e.isMousePressed ? function() {
                        var i = a.getDocumentPosition().row,
                            o = h.$annotations[i];
                        if (!o) return t();
                        if (i == c.session.getLength()) {
                            var r = c.renderer.pixelToScreenCoordinates(0, a.y).row,
                                s = a.$pos;
                            if (r > c.session.documentToScreenRow(s.row, s.column)) return t()
                        }
                        if (l != o)
                            if (l = o.text.join("<br/>"), u.setHtml(l), u.show(), c._signal("showGutterTooltip", u), c.on("mousewheel", t), e.$tooltipFollowsMouse) n(a);
                            else {
                                var d = a.domEvent.target.getBoundingClientRect(),
                                    g = u.getElement().style;
                                g.left = d.right + "px", g.top = d.bottom + "px"
                            }
                    }() : t()
                }, 50))
            }), s.addListener(c.renderer.$gutter, "mouseout", function(e) { a = null, l && !r && (r = setTimeout(function() { r = null, t() }, 50)) }), c.on("changeSession", t)
        }
}), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
    "use strict";
    var i = e("../lib/event"),
        o = e("../lib/useragent"),
        r = t.MouseEvent = function(e, t) { this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1 };
    (function() {
        this.stopPropagation = function() { i.stopPropagation(this.domEvent), this.propagationStopped = !0 }, this.preventDefault = function() { i.preventDefault(this.domEvent), this.defaultPrevented = !0 }, this.stop = function() { this.stopPropagation(), this.preventDefault() }, this.getDocumentPosition = function() { return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos) }, this.inSelection = function() {
            if (null !== this.$inSelection) return this.$inSelection;
            var e = this.editor.getSelectionRange();
            if (e.isEmpty()) this.$inSelection = !1;
            else {
                var t = this.getDocumentPosition();
                this.$inSelection = e.contains(t.row, t.column)
            }
            return this.$inSelection
        }, this.getButton = function() { return i.getButton(this.domEvent) }, this.getShiftKey = function() { return this.domEvent.shiftKey }, this.getAccelKey = o.isMac ? function() { return this.domEvent.metaKey } : function() { return this.domEvent.ctrlKey }
    }).call(r.prototype)
}), ace.define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
    "use strict";

    function i(e) {
        function t() {
            var e, t, n, i, r, s = b;
            b = f.renderer.screenToTextCoordinates(v, w), e = b, t = s, n = Date.now(), i = !t || e.row != t.row, r = !t || e.column != t.column, !x || i || r ? (f.$blockScrolling += 1, f.moveCursorToPosition(e), f.$blockScrolling -= 1, x = n, $ = { x: v, y: w }) : o($.x, $.y, v, w) > h ? x = null : n - x >= c && (f.renderer.scrollCursorIntoView(), x = null),
                function(e, t) {
                    var n = Date.now(),
                        i = f.renderer.layerConfig.lineHeight,
                        o = f.renderer.layerConfig.characterWidth,
                        r = f.renderer.scroller.getBoundingClientRect(),
                        s = { x: { left: v - r.left, right: r.right - v }, y: { top: w - r.top, bottom: r.bottom - w } },
                        a = Math.min(s.x.left, s.x.right),
                        c = Math.min(s.y.top, s.y.bottom),
                        h = { row: e.row, column: e.column };
                    a / o <= 2 && (h.column += s.x.left < s.x.right ? -3 : 2), c / i <= 1 && (h.row += s.y.top < s.y.bottom ? -1 : 1);
                    var u = e.row != h.row,
                        d = e.column != h.column,
                        g = !t || e.row != t.row;
                    u || d && !g ? E ? n - E >= l && f.renderer.scrollCursorIntoView(h) : E = n : E = null
                }(b, s)
        }

        function n() { C = f.selection.toOrientedRange(), m = f.session.addMarker(C, "ace_selection", f.getSelectionStyle()), f.clearSelection(), f.isFocused() && f.renderer.$cursorLayer.setBlinking(!1), clearInterval(A), t(), A = setInterval(t, 20), S = 0, s.addListener(document, "mousemove", u) }

        function i() { clearInterval(A), f.session.removeMarker(m), m = null, f.$blockScrolling += 1, f.selection.fromOrientedRange(C), f.$blockScrolling -= 1, f.isFocused() && !F && f.renderer.$cursorLayer.setBlinking(!f.getReadOnly()), C = null, b = null, S = 0, E = null, x = null, s.removeListener(document, "mousemove", u) }

        function u() { null == D && (D = setTimeout(function() { null != D && m && i() }, 20)) }

        function d(e) { var t = e.types; return !t || Array.prototype.some.call(t, function(e) { return "text/plain" == e || "Text" == e }) }

        function g(e) {
            var t = ["copy", "copymove", "all", "uninitialized"],
                n = a.isMac ? e.altKey : e.ctrlKey,
                i = "uninitialized";
            try { i = e.dataTransfer.effectAllowed.toLowerCase() } catch (e) {}
            var o = "none";
            return n && t.indexOf(i) >= 0 ? o = "copy" : ["move", "copymove", "linkmove", "all", "uninitialized"].indexOf(i) >= 0 ? o = "move" : t.indexOf(i) >= 0 && (o = "copy"), o
        }
        var f = e.editor,
            p = r.createElement("img");
        p.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", a.isOpera && (p.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");
        ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"].forEach(function(t) { e[t] = this[t] }, this), f.addEventListener("mousedown", this.onMouseDown.bind(e));
        var m, v, w, A, C, b, y, F, E, x, $, k = f.container,
            S = 0;
        this.onDragStart = function(e) {
            if (this.cancelDrag || !k.draggable) { var t = this; return setTimeout(function() { t.startSelect(), t.captureMouse(e) }, 0), e.preventDefault() }
            C = f.getSelectionRange();
            var n = e.dataTransfer;
            n.effectAllowed = f.getReadOnly() ? "copy" : "copyMove", a.isOpera && (f.container.appendChild(p), p.scrollTop = 0), n.setDragImage && n.setDragImage(p, 0, 0), a.isOpera && f.container.removeChild(p), n.clearData(), n.setData("Text", f.session.getTextRange()), F = !0, this.setState("drag")
        }, this.onDragEnd = function(e) {
            if (k.draggable = !1, F = !1, this.setState(null), !f.getReadOnly()) { var t = e.dataTransfer.dropEffect;!y && "move" == t && f.session.remove(f.getSelectionRange()), f.renderer.$cursorLayer.setBlinking(!0) }
            this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("")
        }, this.onDragEnter = function(e) { if (!f.getReadOnly() && d(e.dataTransfer)) return v = e.clientX, w = e.clientY, m || n(), S++, e.dataTransfer.dropEffect = y = g(e), s.preventDefault(e) }, this.onDragOver = function(e) { if (!f.getReadOnly() && d(e.dataTransfer)) return v = e.clientX, w = e.clientY, m || (n(), S++), null !== D && (D = null), e.dataTransfer.dropEffect = y = g(e), s.preventDefault(e) }, this.onDragLeave = function(e) { if (--S <= 0 && m) return i(), y = null, s.preventDefault(e) }, this.onDrop = function(e) {
            if (b) {
                var t = e.dataTransfer;
                if (F) switch (y) {
                    case "move":
                        C = C.contains(b.row, b.column) ? { start: b, end: b } : f.moveText(C, b);
                        break;
                    case "copy":
                        C = f.moveText(C, b, !0)
                } else {
                    var n = t.getData("Text");
                    C = { start: b, end: f.session.insert(b, n) }, f.focus(), y = null
                }
                return i(), s.preventDefault(e)
            }
        }, s.addListener(k, "dragstart", this.onDragStart.bind(e)), s.addListener(k, "dragend", this.onDragEnd.bind(e)), s.addListener(k, "dragenter", this.onDragEnter.bind(e)), s.addListener(k, "dragover", this.onDragOver.bind(e)), s.addListener(k, "dragleave", this.onDragLeave.bind(e)), s.addListener(k, "drop", this.onDrop.bind(e));
        var D = null
    }

    function o(e, t, n, i) { return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2)) }
    var r = e("../lib/dom"),
        s = e("../lib/event"),
        a = e("../lib/useragent"),
        l = 200,
        c = 200,
        h = 5;
    (function() {
        this.dragWait = function() { Date.now() - this.mousedownEvent.time > this.editor.getDragDelay() && this.startDrag() }, this.dragWaitEnd = function() { this.editor.container.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd() }, this.dragReadyEnd = function(e) { this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly()), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd() }, this.startDrag = function() {
            this.cancelDrag = !1;
            var e = this.editor;
            e.container.draggable = !0, e.renderer.$cursorLayer.setBlinking(!1), e.setStyle("ace_dragging");
            var t = a.isWin ? "default" : "move";
            e.renderer.setCursorStyle(t), this.setState("dragReady")
        }, this.onMouseDrag = function(e) {
            var t = this.editor.container;
            a.isIE && "dragReady" == this.state && (o(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > 3 && t.dragDrop());
            "dragWait" === this.state && (o(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > 0 && (t.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition())))
        }, this.onMouseDown = function(e) {
            if (this.$dragEnabled) {
                this.mousedownEvent = e;
                var t = this.editor,
                    n = e.inSelection(),
                    i = e.getButton();
                if (1 === (e.domEvent.detail || 1) && 0 === i && n) {
                    if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey())) return;
                    this.mousedownEvent.time = Date.now();
                    var o = e.domEvent.target || e.domEvent.srcElement;
                    if ("unselectable" in o && (o.unselectable = "on"), t.getDragDelay()) {
                        if (a.isWebKit) this.cancelDrag = !0, t.container.draggable = !0;
                        this.setState("dragWait")
                    } else this.startDrag();
                    this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0
                }
            }
        }
    }).call(i.prototype), t.DragdropHandler = i
}), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
    "use strict";
    var i = e("./dom");
    t.get = function(e, t) {
        var n = new XMLHttpRequest;
        n.open("GET", e, !0), n.onreadystatechange = function() { 4 === n.readyState && t(n.responseText) }, n.send(null)
    }, t.loadScript = function(e, t) {
        var n = i.getDocumentHead(),
            o = document.createElement("script");
        o.src = e, n.appendChild(o), o.onload = o.onreadystatechange = function(e, n) {!n && o.readyState && "loaded" != o.readyState && "complete" != o.readyState || (o = o.onload = o.onreadystatechange = null, n || t()) }
    }, t.qualifyURL = function(e) { var t = document.createElement("a"); return t.href = e, t.href }
}), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = {},
        o = function() { this.propagationStopped = !0 },
        r = function() { this.defaultPrevented = !0 };
    i._emit = i._dispatchEvent = function(e, t) {
        this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
        var n = this._eventRegistry[e] || [],
            i = this._defaultHandlers[e];
        if (n.length || i) { "object" == typeof t && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = o), t.preventDefault || (t.preventDefault = r), n = n.slice(); for (var s = 0; s < n.length && (n[s](t, this), !t.propagationStopped); s++); return i && !t.defaultPrevented ? i(t, this) : void 0 }
    }, i._signal = function(e, t) { var n = (this._eventRegistry || {})[e]; if (n) { n = n.slice(); for (var i = 0; i < n.length; i++) n[i](t, this) } }, i.once = function(e, t) {
        var n = this;
        t && this.addEventListener(e, function i() { n.removeEventListener(e, i), t.apply(null, arguments) })
    }, i.setDefaultHandler = function(e, t) {
        var n = this._defaultHandlers;
        if (n || (n = this._defaultHandlers = { _disabled_: {} }), n[e]) {
            var i = n[e],
                o = n._disabled_[e];
            o || (n._disabled_[e] = o = []), o.push(i);
            var r = o.indexOf(t); - 1 != r && o.splice(r, 1)
        }
        n[e] = t
    }, i.removeDefaultHandler = function(e, t) {
        var n = this._defaultHandlers;
        if (n) {
            var i = n._disabled_[e];
            if (n[e] == t) {
                n[e];
                i && this.setDefaultHandler(e, i.pop())
            } else if (i) { var o = i.indexOf(t); - 1 != o && i.splice(o, 1) }
        }
    }, i.on = i.addEventListener = function(e, t, n) { this._eventRegistry = this._eventRegistry || {}; var i = this._eventRegistry[e]; return i || (i = this._eventRegistry[e] = []), -1 == i.indexOf(t) && i[n ? "unshift" : "push"](t), t }, i.off = i.removeListener = i.removeEventListener = function(e, t) { this._eventRegistry = this._eventRegistry || {}; var n = this._eventRegistry[e]; if (n) { var i = n.indexOf(t); - 1 !== i && n.splice(i, 1) } }, i.removeAllListeners = function(e) { this._eventRegistry && (this._eventRegistry[e] = []) }, t.EventEmitter = i
}), ace.define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t, n) {
    "no use strict";

    function i(e) { "undefined" != typeof console && console.warn && console.warn.apply(console, arguments) }

    function o(e, t) {
        var n = new Error(e);
        n.data = t, "object" == typeof console && console.error && console.error(n), setTimeout(function() { throw n })
    }
    var r = e("./oop"),
        s = e("./event_emitter").EventEmitter,
        a = { setOptions: function(e) { Object.keys(e).forEach(function(t) { this.setOption(t, e[t]) }, this) }, getOptions: function(e) { var t = {}; return e ? Array.isArray(e) || (t = e, e = Object.keys(t)) : e = Object.keys(this.$options), e.forEach(function(e) { t[e] = this.getOption(e) }, this), t }, setOption: function(e, t) { if (this["$" + e] !== t) { var n = this.$options[e]; return n ? n.forwardTo ? this[n.forwardTo] && this[n.forwardTo].setOption(e, t) : (n.handlesSet || (this["$" + e] = t), void(n && n.set && n.set.call(this, t))) : i('misspelled option "' + e + '"') } }, getOption: function(e) { var t = this.$options[e]; return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : i('misspelled option "' + e + '"') } },
        l = function() { this.$defaultOptions = {} };
    (function() {
        r.implement(this, s), this.defineOptions = function(e, t, n) { return e.$options || (this.$defaultOptions[t] = e.$options = {}), Object.keys(n).forEach(function(t) { var i = n[t]; "string" == typeof i && (i = { forwardTo: i }), i.name || (i.name = t), e.$options[i.name] = i, "initialValue" in i && (e["$" + i.name] = i.initialValue) }), r.implement(e, a), this }, this.resetOptions = function(e) { Object.keys(e.$options).forEach(function(t) { var n = e.$options[t]; "value" in n && e.setOption(t, n.value) }) }, this.setDefaultValue = function(e, t, n) {
            var i = this.$defaultOptions[e] || (this.$defaultOptions[e] = {});
            i[t] && (i.forwardTo ? this.setDefaultValue(i.forwardTo, t, n) : i[t].value = n)
        }, this.setDefaultValues = function(e, t) { Object.keys(t).forEach(function(n) { this.setDefaultValue(e, n, t[n]) }, this) }, this.warn = i, this.reportError = o
    }).call(l.prototype), t.AppConfig = l
}), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/app_config"], function(e, t, n) {
    "no use strict";
    var i = e("./lib/lang"),
        o = (e("./lib/oop"), e("./lib/net")),
        r = e("./lib/app_config").AppConfig;
    n.exports = t = new r;
    var s = function() { return this || "undefined" != typeof window && window }(),
        a = { packaged: !1, workerPath: null, modePath: null, themePath: null, basePath: "", suffix: ".js", $moduleUrls: {} };
    t.get = function(e) { if (!a.hasOwnProperty(e)) throw new Error("Unknown config key: " + e); return a[e] }, t.set = function(e, t) {
        if (!a.hasOwnProperty(e)) throw new Error("Unknown config key: " + e);
        a[e] = t
    }, t.all = function() { return i.copyObject(a) }, t.moduleUrl = function(e, t) {
        if (a.$moduleUrls[e]) return a.$moduleUrls[e];
        var n = e.split("/"),
            i = "snippets" == (t = t || n[n.length - 2] || "") ? "/" : "-",
            o = n[n.length - 1];
        if ("worker" == t && "-" == i) {
            var r = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
            o = o.replace(r, "")
        }(!o || o == t) && n.length > 1 && (o = n[n.length - 2]);
        var s = a[t + "Path"];
        return null == s ? s = a.basePath : "/" == i && (t = i = ""), s && "/" != s.slice(-1) && (s += "/"), s + t + i + o + this.get("suffix")
    }, t.setModuleUrl = function(e, t) { return a.$moduleUrls[e] = t }, t.$loading = {}, t.loadModule = function(n, i) {
        var r, s;
        Array.isArray(n) && (s = n[0], n = n[1]);
        try { r = e(n) } catch (e) {}
        if (r && !t.$loading[n]) return i && i(r);
        if (t.$loading[n] || (t.$loading[n] = []), t.$loading[n].push(i), !(t.$loading[n].length > 1)) {
            var a = function() {
                e([n], function(e) {
                    t._emit("load.module", { name: n, module: e });
                    var i = t.$loading[n];
                    t.$loading[n] = null, i.forEach(function(t) { t && t(e) })
                })
            };
            if (!t.get("packaged")) return a();
            o.loadScript(t.moduleUrl(n, s), a)
        }
    }, t.init = function(i) {
        if (s && s.document) {
            a.packaged = i || e.packaged || n.packaged || s.define && define.packaged;
            for (var o, r = {}, l = "", c = document.currentScript || document._currentScript, h = (c && c.ownerDocument || document).getElementsByTagName("script"), u = 0; u < h.length; u++) {
                var d = h[u],
                    g = d.src || d.getAttribute("src");
                if (g) {
                    for (var f = d.attributes, p = 0, m = f.length; p < m; p++) {
                        var v = f[p];
                        0 === v.name.indexOf("data-ace-") && (r[(o = v.name.replace(/^data-ace-/, ""), o.replace(/-(.)/g, function(e, t) { return t.toUpperCase() }))] = v.value)
                    }
                    var w = g.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                    w && (l = w[1])
                }
            }
            for (var A in l && (r.base = r.base || l, r.packaged = !0), r.basePath = r.base, r.workerPath = r.workerPath || r.base, r.modePath = r.modePath || r.base, r.themePath = r.themePath || r.base, delete r.base, r) void 0 !== r[A] && t.set(A, r[A])
        }
    }
}), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/config"], function(e, t, n) {
    "use strict";
    var i = e("../lib/event"),
        o = e("../lib/useragent"),
        r = e("./default_handlers").DefaultHandlers,
        s = e("./default_gutter_handler").GutterHandler,
        a = e("./mouse_event").MouseEvent,
        l = e("./dragdrop_handler").DragdropHandler,
        c = e("../config"),
        h = function(e) {
            var t = this;
            this.editor = e, new r(this), new s(this), new l(this);
            var n = function(t) {
                    (!document.hasFocus || !document.hasFocus() || !e.isFocused() && document.activeElement == (e.textInput && e.textInput.getElement())) && window.focus(), e.focus()
                },
                a = e.renderer.getMouseEventTarget();
            i.addListener(a, "click", this.onMouseEvent.bind(this, "click")), i.addListener(a, "mousemove", this.onMouseMove.bind(this, "mousemove")), i.addMultiMouseDownListener([a, e.renderer.scrollBarV && e.renderer.scrollBarV.inner, e.renderer.scrollBarH && e.renderer.scrollBarH.inner, e.textInput && e.textInput.getElement()].filter(Boolean), [400, 300, 250], this, "onMouseEvent"), i.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel")), i.addTouchMoveListener(e.container, this.onTouchMove.bind(this, "touchmove"));
            var c = e.renderer.$gutter;
            i.addListener(c, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), i.addListener(c, "click", this.onMouseEvent.bind(this, "gutterclick")), i.addListener(c, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), i.addListener(c, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), i.addListener(a, "mousedown", n), i.addListener(c, "mousedown", n), o.isIE && e.renderer.scrollBarV && (i.addListener(e.renderer.scrollBarV.element, "mousedown", n), i.addListener(e.renderer.scrollBarH.element, "mousedown", n)), e.on("mousemove", function(n) {
                if (!t.state && !t.$dragDelay && t.$dragEnabled) {
                    var i = e.renderer.screenToTextCoordinates(n.x, n.y),
                        o = e.session.selection.getRange(),
                        r = e.renderer;
                    !o.isEmpty() && o.insideStart(i.row, i.column) ? r.setCursorStyle("default") : r.setCursorStyle("")
                }
            })
        };
    (function() {
        this.onMouseEvent = function(e, t) { this.editor._emit(e, new a(t, this.editor)) }, this.onMouseMove = function(e, t) {
            var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
            n && n.length && this.editor._emit(e, new a(t, this.editor))
        }, this.onMouseWheel = function(e, t) {
            var n = new a(t, this.editor);
            n.speed = 2 * this.$scrollSpeed, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n)
        }, this.onTouchMove = function(e, t) {
            var n = new a(t, this.editor);
            n.speed = 1, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n)
        }, this.setState = function(e) { this.state = e }, this.captureMouse = function(e, t) {
            this.x = e.x, this.y = e.y, this.isMousePressed = !0;
            var n = this.editor.renderer;
            n.$keepTextAreaAtCursor && (n.$keepTextAreaAtCursor = null);
            var r = this,
                s = function(e) { if (e) return o.isWebKit && !e.which && r.releaseMouse ? r.releaseMouse() : (r.x = e.clientX, r.y = e.clientY, t && t(e), r.mouseEvent = new a(e, r.editor), void(r.$mouseMoved = !0)) },
                l = function(e) { clearInterval(h), c(), r[r.state + "End"] && r[r.state + "End"](e), r.state = "", null == n.$keepTextAreaAtCursor && (n.$keepTextAreaAtCursor = !0, n.$moveTextAreaToCursor()), r.isMousePressed = !1, r.$onCaptureMouseMove = r.releaseMouse = null, e && r.onMouseEvent("mouseup", e) },
                c = function() { r[r.state] && r[r.state](), r.$mouseMoved = !1 };
            if (o.isOldIE && "dblclick" == e.domEvent.type) return setTimeout(function() { l(e) });
            r.$onCaptureMouseMove = s, r.releaseMouse = i.capture(this.editor.container, s, l);
            var h = setInterval(c, 20)
        }, this.releaseMouse = null, this.cancelContextMenu = function() {
            var e = function(t) { t && t.domEvent && "contextmenu" != t.domEvent.type || (this.editor.off("nativecontextmenu", e), t && t.domEvent && i.stopEvent(t.domEvent)) }.bind(this);
            setTimeout(e, 10), this.editor.on("nativecontextmenu", e)
        }
    }).call(h.prototype), c.defineOptions(h.prototype, "mouseHandler", { scrollSpeed: { initialValue: 2 }, dragDelay: { initialValue: o.isMac ? 150 : 0 }, dragEnabled: { initialValue: !0 }, focusTimout: { initialValue: 0 }, tooltipFollowsMouse: { initialValue: !0 } }), t.MouseHandler = h
}), ace.define("ace/mouse/fold_handler", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    t.FoldHandler = function(e) {
        e.on("click", function(t) {
            var n = t.getDocumentPosition(),
                i = e.session,
                o = i.getFoldAt(n.row, n.column, 1);
            o && (t.getAccelKey() ? i.removeFold(o) : i.expandFold(o), t.stop())
        }), e.on("gutterclick", function(t) {
            if ("foldWidgets" == e.renderer.$gutterLayer.getRegion(t)) {
                var n = t.getDocumentPosition().row,
                    i = e.session;
                i.foldWidgets && i.foldWidgets[n] && e.session.onFoldWidgetClick(n, t), e.isFocused() || e.focus(), t.stop()
            }
        }), e.on("gutterdblclick", function(t) {
            if ("foldWidgets" == e.renderer.$gutterLayer.getRegion(t)) {
                var n = t.getDocumentPosition().row,
                    i = e.session,
                    o = i.getParentFoldRangeData(n, !0),
                    r = o.range || o.firstRange;
                if (r) {
                    n = r.start.row;
                    var s = i.getFoldAt(n, i.getLine(n).length, 1);
                    s ? i.removeFold(s) : (i.addFold("...", r), e.renderer.scrollCursorIntoView({ row: r.start.row, column: 0 }))
                }
                t.stop()
            }
        })
    }
}), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function(e, t, n) {
    "use strict";
    var i = e("../lib/keys"),
        o = e("../lib/event"),
        r = function(e) { this.$editor = e, this.$data = { editor: e }, this.$handlers = [], this.setDefaultHandler(e.commands) };
    (function() {
        this.setDefaultHandler = function(e) { this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0) }, this.setKeyboardHandler = function(e) {
            var t = this.$handlers;
            if (t[t.length - 1] != e) {
                for (; t[t.length - 1] && t[t.length - 1] != this.$defaultHandler;) this.removeKeyboardHandler(t[t.length - 1]);
                this.addKeyboardHandler(e, 1)
            }
        }, this.addKeyboardHandler = function(e, t) { if (e) { "function" == typeof e && !e.handleKeyboard && (e.handleKeyboard = e); var n = this.$handlers.indexOf(e); - 1 != n && this.$handlers.splice(n, 1), null == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == n && e.attach && e.attach(this.$editor) } }, this.removeKeyboardHandler = function(e) { var t = this.$handlers.indexOf(e); return -1 != t && (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0) }, this.getKeyboardHandler = function() { return this.$handlers[this.$handlers.length - 1] }, this.getStatusText = function() {
            var e = this.$data,
                t = e.editor;
            return this.$handlers.map(function(n) { return n.getStatusText && n.getStatusText(t, e) || "" }).filter(Boolean).join(" ")
        }, this.$callKeyboardHandlers = function(e, t, n, i) { for (var r, s = !1, a = this.$editor.commands, l = this.$handlers.length; l-- && !((r = this.$handlers[l].handleKeyboard(this.$data, e, t, n, i)) && r.command && ((s = "null" == r.command || a.exec(r.command, this.$editor, r.args, i)) && i && -1 != e && 1 != r.passEvent && 1 != r.command.passEvent && o.stopEvent(i), s));); return !s && -1 == e && (r = { command: "insertstring" }, s = a.exec("insertstring", this.$editor, t)), s && this.$editor._signal && this.$editor._signal("keyboardActivity", r), s }, this.onCommandKey = function(e, t, n) {
            var o = i.keyCodeToString(n);
            this.$callKeyboardHandlers(t, o, n, e)
        }, this.onTextInput = function(e) { this.$callKeyboardHandlers(-1, e) }
    }).call(r.prototype), t.KeyBinding = r
}), ace.define("ace/range", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = function(e, t, n, i) { this.start = { row: e, column: t }, this.end = { row: n, column: i } };
    (function() {
        this.isEqual = function(e) { return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column }, this.toString = function() { return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]" }, this.contains = function(e, t) { return 0 == this.compare(e, t) }, this.compareRange = function(e) {
            var t, n = e.end,
                i = e.start;
            return 1 == (t = this.compare(n.row, n.column)) ? 1 == (t = this.compare(i.row, i.column)) ? 2 : 0 == t ? 1 : 0 : -1 == t ? -2 : -1 == (t = this.compare(i.row, i.column)) ? -1 : 1 == t ? 42 : 0
        }, this.comparePoint = function(e) { return this.compare(e.row, e.column) }, this.containsRange = function(e) { return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end) }, this.intersects = function(e) { var t = this.compareRange(e); return -1 == t || 0 == t || 1 == t }, this.isEnd = function(e, t) { return this.end.row == e && this.end.column == t }, this.isStart = function(e, t) { return this.start.row == e && this.start.column == t }, this.setStart = function(e, t) { "object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t) }, this.setEnd = function(e, t) { "object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t) }, this.inside = function(e, t) { return 0 == this.compare(e, t) && (!this.isEnd(e, t) && !this.isStart(e, t)) }, this.insideStart = function(e, t) { return 0 == this.compare(e, t) && !this.isEnd(e, t) }, this.insideEnd = function(e, t) { return 0 == this.compare(e, t) && !this.isStart(e, t) }, this.compare = function(e, t) { return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0 }, this.compareStart = function(e, t) { return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t) }, this.compareEnd = function(e, t) { return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t) }, this.compareInside = function(e, t) { return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t) }, this.clipRows = function(e, t) {
            if (this.end.row > t) var n = { row: t + 1, column: 0 };
            else if (this.end.row < e) n = { row: e, column: 0 };
            if (this.start.row > t) var o = { row: t + 1, column: 0 };
            else if (this.start.row < e) o = { row: e, column: 0 };
            return i.fromPoints(o || this.start, n || this.end)
        }, this.extend = function(e, t) {
            var n = this.compare(e, t);
            if (0 == n) return this;
            if (-1 == n) var o = { row: e, column: t };
            else var r = { row: e, column: t };
            return i.fromPoints(o || this.start, r || this.end)
        }, this.isEmpty = function() { return this.start.row === this.end.row && this.start.column === this.end.column }, this.isMultiLine = function() { return this.start.row !== this.end.row }, this.clone = function() { return i.fromPoints(this.start, this.end) }, this.collapseRows = function() { return 0 == this.end.column ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0) }, this.toScreenRange = function(e) {
            var t = e.documentToScreenPosition(this.start),
                n = e.documentToScreenPosition(this.end);
            return new i(t.row, t.column, n.row, n.column)
        }, this.moveBy = function(e, t) { this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t }
    }).call(i.prototype), i.fromPoints = function(e, t) { return new i(e.row, e.column, t.row, t.column) }, i.comparePoints = function(e, t) { return e.row - t.row || e.column - t.column }, i.comparePoints = function(e, t) { return e.row - t.row || e.column - t.column }, t.Range = i
}), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./lib/lang"),
        r = e("./lib/event_emitter").EventEmitter,
        s = e("./range").Range,
        a = function(e) {
            this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
            var t = this;
            this.lead.on("change", function(e) { t._emit("changeCursor"), t.$isEmpty || t._emit("changeSelection"), !t.$keepDesiredColumnOnChange && e.old.column != e.value.column && (t.$desiredColumn = null) }), this.selectionAnchor.on("change", function() { t.$isEmpty || t._emit("changeSelection") })
        };
    (function() {
        i.implement(this, r), this.isEmpty = function() { return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column }, this.isMultiLine = function() { return !this.isEmpty() && this.getRange().isMultiLine() }, this.getCursor = function() { return this.lead.getPosition() }, this.setSelectionAnchor = function(e, t) { this.anchor.setPosition(e, t), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection")) }, this.getSelectionAnchor = function() { return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition() }, this.getSelectionLead = function() { return this.lead.getPosition() }, this.shiftSelection = function(e) {
            if (this.$isEmpty) this.moveCursorTo(this.lead.row, this.lead.column + e);
            else {
                var t = this.getSelectionAnchor(),
                    n = this.getSelectionLead(),
                    i = this.isBackwards();
                (!i || 0 !== t.column) && this.setSelectionAnchor(t.row, t.column + e), (i || 0 !== n.column) && this.$moveSelection(function() { this.moveCursorTo(n.row, n.column + e) })
            }
        }, this.isBackwards = function() {
            var e = this.anchor,
                t = this.lead;
            return e.row > t.row || e.row == t.row && e.column > t.column
        }, this.getRange = function() {
            var e = this.anchor,
                t = this.lead;
            return this.isEmpty() ? s.fromPoints(t, t) : this.isBackwards() ? s.fromPoints(t, e) : s.fromPoints(e, t)
        }, this.clearSelection = function() { this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection")) }, this.selectAll = function() {
            var e = this.doc.getLength() - 1;
            this.setSelectionAnchor(0, 0), this.moveCursorTo(e, this.doc.getLine(e).length)
        }, this.setRange = this.setSelectionRange = function(e, t) { t ? (this.setSelectionAnchor(e.end.row, e.end.column), this.selectTo(e.start.row, e.start.column)) : (this.setSelectionAnchor(e.start.row, e.start.column), this.selectTo(e.end.row, e.end.column)), this.getRange().isEmpty() && (this.$isEmpty = !0), this.$desiredColumn = null }, this.$moveSelection = function(e) {
            var t = this.lead;
            this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
        }, this.selectTo = function(e, t) { this.$moveSelection(function() { this.moveCursorTo(e, t) }) }, this.selectToPosition = function(e) { this.$moveSelection(function() { this.moveCursorToPosition(e) }) }, this.moveTo = function(e, t) { this.clearSelection(), this.moveCursorTo(e, t) }, this.moveToPosition = function(e) { this.clearSelection(), this.moveCursorToPosition(e) }, this.selectUp = function() { this.$moveSelection(this.moveCursorUp) }, this.selectDown = function() { this.$moveSelection(this.moveCursorDown) }, this.selectRight = function() { this.$moveSelection(this.moveCursorRight) }, this.selectLeft = function() { this.$moveSelection(this.moveCursorLeft) }, this.selectLineStart = function() { this.$moveSelection(this.moveCursorLineStart) }, this.selectLineEnd = function() { this.$moveSelection(this.moveCursorLineEnd) }, this.selectFileEnd = function() { this.$moveSelection(this.moveCursorFileEnd) }, this.selectFileStart = function() { this.$moveSelection(this.moveCursorFileStart) }, this.selectWordRight = function() { this.$moveSelection(this.moveCursorWordRight) }, this.selectWordLeft = function() { this.$moveSelection(this.moveCursorWordLeft) }, this.getWordRange = function(e, t) {
            if (void 0 === t) {
                var n = e || this.lead;
                e = n.row, t = n.column
            }
            return this.session.getWordRange(e, t)
        }, this.selectWord = function() { this.setSelectionRange(this.getWordRange()) }, this.selectAWord = function() {
            var e = this.getCursor(),
                t = this.session.getAWordRange(e.row, e.column);
            this.setSelectionRange(t)
        }, this.getLineRange = function(e, t) {
            var n, i = "number" == typeof e ? e : this.lead.row,
                o = this.session.getFoldLine(i);
            return o ? (i = o.start.row, n = o.end.row) : n = i, !0 === t ? new s(i, 0, n, this.session.getLine(n).length) : new s(i, 0, n + 1, 0)
        }, this.selectLine = function() { this.setSelectionRange(this.getLineRange()) }, this.moveCursorUp = function() { this.moveCursorBy(-1, 0) }, this.moveCursorDown = function() { this.moveCursorBy(1, 0) }, this.wouldMoveIntoSoftTab = function(e, t, n) {
            var i = e.column,
                o = e.column + t;
            return n < 0 && (i = e.column - t, o = e.column), this.session.isTabStop(e) && this.doc.getLine(e.row).slice(i, o).split(" ").length - 1 == t
        }, this.moveCursorLeft = function() {
            var e, t = this.lead.getPosition();
            if (e = this.session.getFoldAt(t.row, t.column, -1)) this.moveCursorTo(e.start.row, e.start.column);
            else if (0 === t.column) t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length);
            else {
                var n = this.session.getTabSize();
                this.wouldMoveIntoSoftTab(t, n, -1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, -n) : this.moveCursorBy(0, -1)
            }
        }, this.moveCursorRight = function() {
            var e, t = this.lead.getPosition();
            if (e = this.session.getFoldAt(t.row, t.column, 1)) this.moveCursorTo(e.end.row, e.end.column);
            else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
            else {
                var n = this.session.getTabSize();
                t = this.lead;
                this.wouldMoveIntoSoftTab(t, n, 1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, n) : this.moveCursorBy(0, 1)
            }
        }, this.moveCursorLineStart = function() {
            var e = this.lead.row,
                t = this.lead.column,
                n = this.session.documentToScreenRow(e, t),
                i = this.session.screenToDocumentPosition(n, 0),
                o = this.session.getDisplayLine(e, null, i.row, i.column).match(/^\s*/);
            o[0].length != t && !this.session.$useEmacsStyleLineStart && (i.column += o[0].length), this.moveCursorToPosition(i)
        }, this.moveCursorLineEnd = function() {
            var e = this.lead,
                t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
            if (this.lead.column == t.column) {
                var n = this.session.getLine(t.row);
                if (t.column == n.length) {
                    var i = n.search(/\s+$/);
                    i > 0 && (t.column = i)
                }
            }
            this.moveCursorTo(t.row, t.column)
        }, this.moveCursorFileEnd = function() {
            var e = this.doc.getLength() - 1,
                t = this.doc.getLine(e).length;
            this.moveCursorTo(e, t)
        }, this.moveCursorFileStart = function() { this.moveCursorTo(0, 0) }, this.moveCursorLongWordRight = function() {
            var e = this.lead.row,
                t = this.lead.column,
                n = this.doc.getLine(e),
                i = n.substring(t);
            this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
            var o = this.session.getFoldAt(e, t, 1);
            if (o) this.moveCursorTo(o.end.row, o.end.column);
            else {
                if (this.session.nonTokenRe.exec(i) && (t += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, i = n.substring(t)), t >= n.length) return this.moveCursorTo(e, n.length), this.moveCursorRight(), void(e < this.doc.getLength() - 1 && this.moveCursorWordRight());
                this.session.tokenRe.exec(i) && (t += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(e, t)
            }
        }, this.moveCursorLongWordLeft = function() {
            var e, t = this.lead.row,
                n = this.lead.column;
            if (e = this.session.getFoldAt(t, n, -1)) this.moveCursorTo(e.start.row, e.start.column);
            else {
                var i = this.session.getFoldStringAt(t, n, -1);
                null == i && (i = this.doc.getLine(t).substring(0, n));
                var r = o.stringReverse(i);
                if (this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, this.session.nonTokenRe.exec(r) && (n -= this.session.nonTokenRe.lastIndex, r = r.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), n <= 0) return this.moveCursorTo(t, 0), this.moveCursorLeft(), void(t > 0 && this.moveCursorWordLeft());
                this.session.tokenRe.exec(r) && (n -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(t, n)
            }
        }, this.$shortWordEndIndex = function(e) {
            var t, n = 0,
                i = /\s/,
                o = this.session.tokenRe;
            if (o.lastIndex = 0, this.session.tokenRe.exec(e)) n = this.session.tokenRe.lastIndex;
            else {
                for (;
                    (t = e[n]) && i.test(t);) n++;
                if (n < 1)
                    for (o.lastIndex = 0;
                        (t = e[n]) && !o.test(t);)
                        if (o.lastIndex = 0, n++, i.test(t)) {
                            if (n > 2) { n--; break }
                            for (;
                                (t = e[n]) && i.test(t);) n++;
                            if (n > 2) break
                        }
            }
            return o.lastIndex = 0, n
        }, this.moveCursorShortWordRight = function() {
            var e = this.lead.row,
                t = this.lead.column,
                n = this.doc.getLine(e),
                i = n.substring(t),
                o = this.session.getFoldAt(e, t, 1);
            if (o) return this.moveCursorTo(o.end.row, o.end.column);
            if (t == n.length) { for (var r = this.doc.getLength(); e++, i = this.doc.getLine(e), e < r && /^\s*$/.test(i);); /^\s+/.test(i) || (i = ""), t = 0 }
            var s = this.$shortWordEndIndex(i);
            this.moveCursorTo(e, t + s)
        }, this.moveCursorShortWordLeft = function() {
            var e, t = this.lead.row,
                n = this.lead.column;
            if (e = this.session.getFoldAt(t, n, -1)) return this.moveCursorTo(e.start.row, e.start.column);
            var i = this.session.getLine(t).substring(0, n);
            if (0 === n) {
                for (; t--, i = this.doc.getLine(t), t > 0 && /^\s*$/.test(i););
                n = i.length, /\s+$/.test(i) || (i = "")
            }
            var r = o.stringReverse(i),
                s = this.$shortWordEndIndex(r);
            return this.moveCursorTo(t, n - s)
        }, this.moveCursorWordRight = function() { this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight() }, this.moveCursorWordLeft = function() { this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft() }, this.moveCursorBy = function(e, t) {
            var n = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
            0 === t && (this.$desiredColumn ? n.column = this.$desiredColumn : this.$desiredColumn = n.column);
            var i = this.session.screenToDocumentPosition(n.row + e, n.column);
            0 !== e && 0 === t && i.row === this.lead.row && i.column === this.lead.column && this.session.lineWidgets && this.session.lineWidgets[i.row] && (i.row > 0 || e > 0) && i.row++, this.moveCursorTo(i.row, i.column + t, 0 === t)
        }, this.moveCursorToPosition = function(e) { this.moveCursorTo(e.row, e.column) }, this.moveCursorTo = function(e, t, n) {
            var i = this.session.getFoldAt(e, t, 1);
            i && (e = i.start.row, t = i.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, n || (this.$desiredColumn = null)
        }, this.moveCursorToScreen = function(e, t, n) {
            var i = this.session.screenToDocumentPosition(e, t);
            this.moveCursorTo(i.row, i.column, n)
        }, this.detach = function() { this.lead.detach(), this.anchor.detach(), this.session = this.doc = null }, this.fromOrientedRange = function(e) { this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn }, this.toOrientedRange = function(e) { var t = this.getRange(); return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e }, this.getRangeOfMovements = function(e) { var t = this.getCursor(); try { e(this); var n = this.getCursor(); return s.fromPoints(t, n) } catch (e) { return s.fromPoints(t, t) } finally { this.moveCursorToPosition(t) } }, this.toJSON = function() {
            if (this.rangeCount) var e = this.ranges.map(function(e) { var t = e.clone(); return t.isBackwards = e.cursor == e.start, t });
            else(e = this.getRange()).isBackwards = this.isBackwards();
            return e
        }, this.fromJSON = function(e) {
            if (null == e.start) {
                if (this.rangeList) {
                    this.toSingleRange(e[0]);
                    for (var t = e.length; t--;) {
                        var n = s.fromPoints(e[t].start, e[t].end);
                        e[t].isBackwards && (n.cursor = n.start), this.addRange(n, !0)
                    }
                    return
                }
                e = e[0]
            }
            this.rangeList && this.toSingleRange(e), this.setSelectionRange(e, e.isBackwards)
        }, this.isEqual = function(e) {
            if ((e.length || this.rangeCount) && e.length != this.rangeCount) return !1;
            if (!e.length || !this.ranges) return this.getRange().isEqual(e);
            for (var t = this.ranges.length; t--;)
                if (!this.ranges[t].isEqual(e[t])) return !1;
            return !0
        }
    }).call(a.prototype), t.Selection = a
}), ace.define("ace/tokenizer", ["require", "exports", "module", "ace/config"], function(e, t, n) {
    "use strict";
    var i = e("./config"),
        o = 2e3,
        r = function(e) {
            for (var t in this.states = e, this.regExps = {}, this.matchMappings = {}, this.states) {
                for (var n = this.states[t], i = [], o = 0, r = this.matchMappings[t] = { defaultToken: "text" }, s = "g", a = [], l = 0; l < n.length; l++) {
                    var c = n[l];
                    if (c.defaultToken && (r.defaultToken = c.defaultToken), c.caseInsensitive && (s = "gi"), null != c.regex) {
                        c.regex instanceof RegExp && (c.regex = c.regex.toString().slice(1, -1));
                        var h = c.regex,
                            u = new RegExp("(?:(" + h + ")|(.))").exec("a").length - 2;
                        Array.isArray(c.token) ? 1 == c.token.length || 1 == u ? c.token = c.token[0] : u - 1 != c.token.length ? (this.reportError("number of classes and regexp groups doesn't match", { rule: c, groupCount: u - 1 }), c.token = c.token[0]) : (c.tokenArray = c.token, c.token = null, c.onMatch = this.$arrayTokens) : "function" == typeof c.token && !c.onMatch && (c.onMatch = u > 1 ? this.$applyToken : c.token), u > 1 && (/\\\d/.test(c.regex) ? h = c.regex.replace(/\\([0-9]+)/g, function(e, t) { return "\\" + (parseInt(t, 10) + o + 1) }) : (u = 1, h = this.removeCapturingGroups(c.regex)), !c.splitRegex && "string" != typeof c.token && a.push(c)), r[o] = l, o += u, i.push(h), c.onMatch || (c.onMatch = null)
                    }
                }
                i.length || (r[0] = 0, i.push("$")), a.forEach(function(e) { e.splitRegex = this.createSplitterRegexp(e.regex, s) }, this), this.regExps[t] = new RegExp("(" + i.join(")|(") + ")|($)", s)
            }
        };
    (function() {
        this.$setMaxTokenCount = function(e) { o = 0 | e }, this.$applyToken = function(e) {
            var t = this.splitRegex.exec(e).slice(1),
                n = this.token.apply(this, t);
            if ("string" == typeof n) return [{ type: n, value: e }];
            for (var i = [], o = 0, r = n.length; o < r; o++) t[o] && (i[i.length] = { type: n[o], value: t[o] });
            return i
        }, this.$arrayTokens = function(e) { if (!e) return []; var t = this.splitRegex.exec(e); if (!t) return "text"; for (var n = [], i = this.tokenArray, o = 0, r = i.length; o < r; o++) t[o + 1] && (n[n.length] = { type: i[o], value: t[o + 1] }); return n }, this.removeCapturingGroups = function(e) { return e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function(e, t) { return t ? "(?:" : e }) }, this.createSplitterRegexp = function(e, t) {
            if (-1 != e.indexOf("(?=")) {
                var n = 0,
                    i = !1,
                    o = {};
                e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(e, t, r, s, a, l) { return i ? i = "]" != a : a ? i = !0 : s ? (n == o.stack && (o.end = l + 1, o.stack = -1), n--) : r && (n++, 1 != r.length && (o.stack = n, o.start = l)), e }), null != o.end && /^\)*$/.test(e.substr(o.end)) && (e = e.substring(0, o.start) + e.substr(o.end))
            }
            return "^" != e.charAt(0) && (e = "^" + e), "$" != e.charAt(e.length - 1) && (e += "$"), new RegExp(e, (t || "").replace("g", ""))
        }, this.getLineTokens = function(e, t) {
            if (t && "string" != typeof t) "#tmp" === (t = (n = t.slice(0))[0]) && (n.shift(), t = n.shift());
            else var n = [];
            var i = t || "start",
                r = this.states[i];
            r || (i = "start", r = this.states[i]);
            var s = this.matchMappings[i],
                a = this.regExps[i];
            a.lastIndex = 0;
            for (var l, c = [], h = 0, u = 0, d = { type: null, value: "" }; l = a.exec(e);) {
                var g = s.defaultToken,
                    f = null,
                    p = l[0],
                    m = a.lastIndex;
                if (m - p.length > h) {
                    var v = e.substring(h, m - p.length);
                    d.type == g ? d.value += v : (d.type && c.push(d), d = { type: g, value: v })
                }
                for (var w = 0; w < l.length - 2; w++)
                    if (void 0 !== l[w + 1]) { g = (f = r[s[w]]).onMatch ? f.onMatch(p, i, n, e) : f.token, f.next && (i = "string" == typeof f.next ? f.next : f.next(i, n), (r = this.states[i]) || (this.reportError("state doesn't exist", i), i = "start", r = this.states[i]), s = this.matchMappings[i], h = m, (a = this.regExps[i]).lastIndex = m), f.consumeLineEnd && (h = m); break }
                if (p)
                    if ("string" == typeof g) f && !1 === f.merge || d.type !== g ? (d.type && c.push(d), d = { type: g, value: p }) : d.value += p;
                    else if (g) { d.type && c.push(d), d = { type: null, value: "" }; for (w = 0; w < g.length; w++) c.push(g[w]) }
                if (h == e.length) break;
                if (h = m, u++ > o) {
                    for (u > 2 * e.length && this.reportError("infinite loop with in ace tokenizer", { startState: t, line: e }); h < e.length;) d.type && c.push(d), d = { value: e.substring(h, h += 2e3), type: "overflow" };
                    i = "start", n = [];
                    break
                }
            }
            return d.type && c.push(d), n.length > 1 && n[0] !== i && n.unshift("#tmp", i), { tokens: c, state: n.length ? n : i }
        }, this.reportError = i.reportError
    }).call(r.prototype), t.Tokenizer = r
}), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function(e, t, n) {
    "use strict";
    var i = e("../lib/lang"),
        o = function() { this.$rules = { start: [{ token: "empty_line", regex: "^$" }, { defaultToken: "text" }] } };
    (function() {
        this.addRules = function(e, t) {
            if (t)
                for (var n in e) {
                    for (var i = e[n], o = 0; o < i.length; o++) {
                        var r = i[o];
                        (r.next || r.onMatch) && ("string" == typeof r.next && 0 !== r.next.indexOf(t) && (r.next = t + r.next), r.nextState && 0 !== r.nextState.indexOf(t) && (r.nextState = t + r.nextState))
                    }
                    this.$rules[t + n] = i
                } else
                    for (var n in e) this.$rules[n] = e[n]
        }, this.getRules = function() { return this.$rules }, this.embedRules = function(e, t, n, o, r) {
            var s = "function" == typeof e ? (new e).getRules() : e;
            if (o)
                for (var a = 0; a < o.length; a++) o[a] = t + o[a];
            else
                for (var l in o = [], s) o.push(t + l);
            if (this.addRules(s, t), n) { var c = Array.prototype[r ? "push" : "unshift"]; for (a = 0; a < o.length; a++) c.apply(this.$rules[o[a]], i.deepCopy(n)) }
            this.$embeds || (this.$embeds = []), this.$embeds.push(t)
        }, this.getEmbeds = function() { return this.$embeds };
        var e = function(e, t) { return ("start" != e || t.length) && t.unshift(this.nextState, e), this.nextState },
            t = function(e, t) { return t.shift(), t.shift() || "start" };
        this.normalizeRules = function() {
            var n = 0,
                i = this.$rules;
            Object.keys(i).forEach(function o(r) {
                var s = i[r];
                s.processed = !0;
                for (var a = 0; a < s.length; a++) {
                    var l = s[a],
                        c = null;
                    Array.isArray(l) && (c = l, l = {}), !l.regex && l.start && (l.regex = l.start, l.next || (l.next = []), l.next.push({ defaultToken: l.token }, { token: l.token + ".end", regex: l.end || l.start, next: "pop" }), l.token = l.token + ".start", l.push = !0);
                    var h = l.next || l.push;
                    if (h && Array.isArray(h)) {
                        var u = l.stateName;
                        u || ("string" != typeof(u = l.token) && (u = u[0] || ""), i[u] && (u += n++)), i[u] = h, l.next = u, o(u)
                    } else "pop" == h && (l.next = t);
                    if (l.push && (l.nextState = l.next || l.push, l.next = e, delete l.push), l.rules)
                        for (var d in l.rules) i[d] ? i[d].push && i[d].push.apply(i[d], l.rules[d]) : i[d] = l.rules[d];
                    var g = "string" == typeof l ? l : l.include;
                    if (g && (c = Array.isArray(g) ? g.map(function(e) { return i[e] }) : i[g]), c) {
                        var f = [a, 1].concat(c);
                        l.noEscape && (f = f.filter(function(e) { return !e.next })), s.splice.apply(s, f), a--
                    }
                    l.keywordMap && (l.token = this.createKeywordMapper(l.keywordMap, l.defaultToken || "text", l.caseInsensitive), delete l.defaultToken)
                }
            }, this)
        }, this.createKeywordMapper = function(e, t, n, i) {
            var o = Object.create(null);
            return Object.keys(e).forEach(function(t) {
                var r = e[t];
                n && (r = r.toLowerCase());
                for (var s = r.split(i || "|"), a = s.length; a--;) o[s[a]] = t
            }), Object.getPrototypeOf(o) && (o.__proto__ = null), this.$keywordList = Object.keys(o), e = null, n ? function(e) { return o[e.toLowerCase()] || t } : function(e) { return o[e] || t }
        }, this.getKeywords = function() { return this.$keywords }
    }).call(o.prototype), t.TextHighlightRules = o
}), ace.define("ace/mode/behaviour", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = function() { this.$behaviours = {} };
    (function() {
        this.add = function(e, t, n) {
            switch (void 0) {
                case this.$behaviours:
                    this.$behaviours = {};
                case this.$behaviours[e]:
                    this.$behaviours[e] = {}
            }
            this.$behaviours[e][t] = n
        }, this.addBehaviours = function(e) {
            for (var t in e)
                for (var n in e[t]) this.add(t, n, e[t][n])
        }, this.remove = function(e) { this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e] }, this.inherit = function(e, t) {
            if ("function" == typeof e) var n = (new e).getBehaviours(t);
            else n = e.getBehaviours(t);
            this.addBehaviours(n)
        }, this.getBehaviours = function(e) { if (!e) return this.$behaviours; for (var t = {}, n = 0; n < e.length; n++) this.$behaviours[e[n]] && (t[e[n]] = this.$behaviours[e[n]]); return t }
    }).call(i.prototype), t.Behaviour = i
}), ace.define("ace/token_iterator", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = function(e, t, n) {
        this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
        var i = e.getTokenAt(t, n);
        this.$tokenIndex = i ? i.index : -1
    };
    (function() {
        this.stepBackward = function() {
            for (this.$tokenIndex -= 1; this.$tokenIndex < 0;) {
                if (this.$row -= 1, this.$row < 0) return this.$row = 0, null;
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
            }
            return this.$rowTokens[this.$tokenIndex]
        }, this.stepForward = function() {
            var e;
            for (this.$tokenIndex += 1; this.$tokenIndex >= this.$rowTokens.length;) {
                if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e) return this.$row = e - 1, null;
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
            }
            return this.$rowTokens[this.$tokenIndex]
        }, this.getCurrentToken = function() { return this.$rowTokens[this.$tokenIndex] }, this.getCurrentTokenRow = function() { return this.$row }, this.getCurrentTokenColumn = function() {
            var e = this.$rowTokens,
                t = this.$tokenIndex,
                n = e[t].start;
            if (void 0 !== n) return n;
            for (n = 0; t > 0;) n += e[t -= 1].value.length;
            return n
        }, this.getCurrentTokenPosition = function() { return { row: this.$row, column: this.getCurrentTokenColumn() } }
    }).call(i.prototype), t.TokenIterator = i
}), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t, n) {
    "use strict";
    var i, o = e("../../lib/oop"),
        r = e("../behaviour").Behaviour,
        s = e("../../token_iterator").TokenIterator,
        a = e("../../lib/lang"),
        l = ["text", "paren.rparen", "punctuation.operator"],
        c = ["text", "paren.rparen", "punctuation.operator", "comment"],
        h = {},
        u = { '"': '"', "'": "'" },
        d = function(e) {
            var t = -1;
            if (e.multiSelect && (t = e.selection.index, h.rangeCount != e.multiSelect.rangeCount && (h = { rangeCount: e.multiSelect.rangeCount })), h[t]) return i = h[t];
            i = h[t] = { autoInsertedBrackets: 0, autoInsertedRow: -1, autoInsertedLineEnd: "", maybeInsertedBrackets: 0, maybeInsertedRow: -1, maybeInsertedLineStart: "", maybeInsertedLineEnd: "" }
        },
        g = function(e, t, n, i) { var o = e.end.row - e.start.row; return { text: n + t + i, selection: [0, e.start.column + 1, o, e.end.column + (o ? 0 : 1)] } },
        f = function(e) {
            this.add("braces", "insertion", function(t, n, o, r, s) {
                var l = o.getCursorPosition(),
                    c = r.doc.getLine(l.row);
                if ("{" == s) {
                    d(o);
                    var h = o.getSelectionRange(),
                        u = r.doc.getTextRange(h);
                    if ("" !== u && "{" !== u && o.getWrapBehavioursEnabled()) return g(h, u, "{", "}");
                    if (f.isSaneInsertion(o, r)) return /[\]\}\)]/.test(c[l.column]) || o.inMultiSelectMode || e && e.braces ? (f.recordAutoInsert(o, r, "}"), { text: "{}", selection: [1, 1] }) : (f.recordMaybeInsert(o, r, "{"), { text: "{", selection: [1, 1] })
                } else if ("}" == s) {
                    if (d(o), "}" == c.substring(l.column, l.column + 1))
                        if (null !== r.$findOpeningBracket("}", { column: l.column + 1, row: l.row }) && f.isAutoInsertedClosing(l, c, s)) return f.popAutoInsertedClosing(), { text: "", selection: [1, 1] }
                } else {
                    if ("\n" == s || "\r\n" == s) {
                        d(o);
                        var p = "";
                        if (f.isMaybeInsertedClosing(l, c) && (p = a.stringRepeat("}", i.maybeInsertedBrackets), f.clearMaybeInsertedClosing()), "}" === c.substring(l.column, l.column + 1)) { var m = r.findMatchingBracket({ row: l.row, column: l.column + 1 }, "}"); if (!m) return null; var v = this.$getIndent(r.getLine(m.row)) } else {
                            if (!p) return void f.clearMaybeInsertedClosing();
                            v = this.$getIndent(c)
                        }
                        var w = v + r.getTabString();
                        return { text: "\n" + w + "\n" + v + p, selection: [1, w.length, 1, w.length] }
                    }
                    f.clearMaybeInsertedClosing()
                }
            }), this.add("braces", "deletion", function(e, t, n, o, r) {
                var s = o.doc.getTextRange(r);
                if (!r.isMultiLine() && "{" == s) {
                    if (d(n), "}" == o.doc.getLine(r.start.row).substring(r.end.column, r.end.column + 1)) return r.end.column++, r;
                    i.maybeInsertedBrackets--
                }
            }), this.add("parens", "insertion", function(e, t, n, i, o) {
                if ("(" == o) {
                    d(n);
                    var r = n.getSelectionRange(),
                        s = i.doc.getTextRange(r);
                    if ("" !== s && n.getWrapBehavioursEnabled()) return g(r, s, "(", ")");
                    if (f.isSaneInsertion(n, i)) return f.recordAutoInsert(n, i, ")"), { text: "()", selection: [1, 1] }
                } else if (")" == o) {
                    d(n);
                    var a = n.getCursorPosition(),
                        l = i.doc.getLine(a.row);
                    if (")" == l.substring(a.column, a.column + 1))
                        if (null !== i.$findOpeningBracket(")", { column: a.column + 1, row: a.row }) && f.isAutoInsertedClosing(a, l, o)) return f.popAutoInsertedClosing(), { text: "", selection: [1, 1] }
                }
            }), this.add("parens", "deletion", function(e, t, n, i, o) { var r = i.doc.getTextRange(o); if (!o.isMultiLine() && "(" == r && (d(n), ")" == i.doc.getLine(o.start.row).substring(o.start.column + 1, o.start.column + 2))) return o.end.column++, o }), this.add("brackets", "insertion", function(e, t, n, i, o) {
                if ("[" == o) {
                    d(n);
                    var r = n.getSelectionRange(),
                        s = i.doc.getTextRange(r);
                    if ("" !== s && n.getWrapBehavioursEnabled()) return g(r, s, "[", "]");
                    if (f.isSaneInsertion(n, i)) return f.recordAutoInsert(n, i, "]"), { text: "[]", selection: [1, 1] }
                } else if ("]" == o) {
                    d(n);
                    var a = n.getCursorPosition(),
                        l = i.doc.getLine(a.row);
                    if ("]" == l.substring(a.column, a.column + 1))
                        if (null !== i.$findOpeningBracket("]", { column: a.column + 1, row: a.row }) && f.isAutoInsertedClosing(a, l, o)) return f.popAutoInsertedClosing(), { text: "", selection: [1, 1] }
                }
            }), this.add("brackets", "deletion", function(e, t, n, i, o) { var r = i.doc.getTextRange(o); if (!o.isMultiLine() && "[" == r && (d(n), "]" == i.doc.getLine(o.start.row).substring(o.start.column + 1, o.start.column + 2))) return o.end.column++, o }), this.add("string_dquotes", "insertion", function(e, t, n, i, o) {
                var r = i.$mode.$quotes || u;
                if (1 == o.length && r[o]) {
                    if (this.lineCommentStart && -1 != this.lineCommentStart.indexOf(o)) return;
                    d(n);
                    var s = o,
                        a = n.getSelectionRange(),
                        l = i.doc.getTextRange(a);
                    if ("" !== l && (1 != l.length || !r[l]) && n.getWrapBehavioursEnabled()) return g(a, l, s, s);
                    if (!l) {
                        var c = n.getCursorPosition(),
                            h = i.doc.getLine(c.row),
                            f = h.substring(c.column - 1, c.column),
                            p = h.substring(c.column, c.column + 1),
                            m = i.getTokenAt(c.row, c.column),
                            v = i.getTokenAt(c.row, c.column + 1);
                        if ("\\" == f && m && /escape/.test(m.type)) return null;
                        var w, A = m && /string|escape/.test(m.type),
                            C = !v || /string|escape/.test(v.type);
                        if (p == s)(w = A !== C) && /string\.end/.test(v.type) && (w = !1);
                        else {
                            if (A && !C) return null;
                            if (A && C) return null;
                            var b = i.$mode.tokenRe;
                            b.lastIndex = 0;
                            var y = b.test(f);
                            b.lastIndex = 0;
                            var F = b.test(f);
                            if (y || F) return null;
                            if (p && !/[\s;,.})\]\\]/.test(p)) return null;
                            w = !0
                        }
                        return { text: w ? s + s : "", selection: [1, 1] }
                    }
                }
            }), this.add("string_dquotes", "deletion", function(e, t, n, i, o) { var r = i.doc.getTextRange(o); if (!o.isMultiLine() && ('"' == r || "'" == r) && (d(n), i.doc.getLine(o.start.row).substring(o.start.column + 1, o.start.column + 2) == r)) return o.end.column++, o })
        };
    f.isSaneInsertion = function(e, t) {
        var n = e.getCursorPosition(),
            i = new s(t, n.row, n.column);
        if (!this.$matchTokenType(i.getCurrentToken() || "text", l)) { var o = new s(t, n.row, n.column + 1); if (!this.$matchTokenType(o.getCurrentToken() || "text", l)) return !1 }
        return i.stepForward(), i.getCurrentTokenRow() !== n.row || this.$matchTokenType(i.getCurrentToken() || "text", c)
    }, f.$matchTokenType = function(e, t) { return t.indexOf(e.type || e) > -1 }, f.recordAutoInsert = function(e, t, n) {
        var o = e.getCursorPosition(),
            r = t.doc.getLine(o.row);
        this.isAutoInsertedClosing(o, r, i.autoInsertedLineEnd[0]) || (i.autoInsertedBrackets = 0), i.autoInsertedRow = o.row, i.autoInsertedLineEnd = n + r.substr(o.column), i.autoInsertedBrackets++
    }, f.recordMaybeInsert = function(e, t, n) {
        var o = e.getCursorPosition(),
            r = t.doc.getLine(o.row);
        this.isMaybeInsertedClosing(o, r) || (i.maybeInsertedBrackets = 0), i.maybeInsertedRow = o.row, i.maybeInsertedLineStart = r.substr(0, o.column) + n, i.maybeInsertedLineEnd = r.substr(o.column), i.maybeInsertedBrackets++
    }, f.isAutoInsertedClosing = function(e, t, n) { return i.autoInsertedBrackets > 0 && e.row === i.autoInsertedRow && n === i.autoInsertedLineEnd[0] && t.substr(e.column) === i.autoInsertedLineEnd }, f.isMaybeInsertedClosing = function(e, t) { return i.maybeInsertedBrackets > 0 && e.row === i.maybeInsertedRow && t.substr(e.column) === i.maybeInsertedLineEnd && t.substr(0, e.column) == i.maybeInsertedLineStart }, f.popAutoInsertedClosing = function() { i.autoInsertedLineEnd = i.autoInsertedLineEnd.substr(1), i.autoInsertedBrackets-- }, f.clearMaybeInsertedClosing = function() { i && (i.maybeInsertedBrackets = 0, i.maybeInsertedRow = -1) }, o.inherits(f, r), t.CstyleBehaviour = f
}), ace.define("ace/unicode", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    t.packages = {},
        function(e) { var n = /\w{4}/g; for (var i in e) t.packages[i] = e[i].replace(n, "\\u$&") }({ L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC", Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A", Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A", Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC", Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F", Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC", M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26", Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26", Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC", Me: "0488048906DE20DD-20E020E2-20E4A670-A672", N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19", Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19", Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF", No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835", P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65", Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D", Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62", Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63", Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20", Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21", Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F", Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65", S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD", Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC", Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6", Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3", So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD", Z: "002000A01680180E2000-200A20282029202F205F3000", Zs: "002000A01680180E2000-200A202F205F3000", Zl: "2028", Zp: "2029", C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF", Cc: "0000-001F007F-009F", Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB", Co: "E000-F8FF", Cs: "D800-DFFF", Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF" })
}), ace.define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour/cstyle", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("../tokenizer").Tokenizer,
        o = e("./text_highlight_rules").TextHighlightRules,
        r = e("./behaviour/cstyle").CstyleBehaviour,
        s = e("../unicode"),
        a = e("../lib/lang"),
        l = e("../token_iterator").TokenIterator,
        c = e("../range").Range,
        h = function() { this.HighlightRules = o };
    (function() {
        this.$defaultBehaviour = new r, this.tokenRe = new RegExp("^[" + s.packages.L + s.packages.Mn + s.packages.Mc + s.packages.Nd + s.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + s.packages.L + s.packages.Mn + s.packages.Mc + s.packages.Nd + s.packages.Pc + "\\$_]|\\s])+", "g"), this.getTokenizer = function() { return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules(this.$highlightRuleConfig), this.$tokenizer = new i(this.$highlightRules.getRules())), this.$tokenizer }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(e, t, n, i) {
            function o(e) { for (var t = n; t <= i; t++) e(r.getLine(t), t) }
            var r = t.doc,
                s = !0,
                l = !0,
                c = 1 / 0,
                h = t.getTabSize(),
                u = !1;
            if (this.lineCommentStart) {
                if (Array.isArray(this.lineCommentStart)) m = this.lineCommentStart.map(a.escapeRegExp).join("|"), f = this.lineCommentStart[0];
                else m = a.escapeRegExp(this.lineCommentStart), f = this.lineCommentStart;
                m = new RegExp("^(\\s*)(?:" + m + ") ?"), u = t.getUseSoftTabs();
                A = function(e, t) {
                    var n = e.match(m);
                    if (n) {
                        var i = n[1].length,
                            o = n[0].length;
                        !g(e, i, o) && " " == n[0][o - 1] && o--, r.removeInLine(t, i, o)
                    }
                };
                var d = f + " ",
                    g = (w = function(e, t) { s && !/\S/.test(e) || (g(e, c, c) ? r.insertInLine({ row: t, column: c }, d) : r.insertInLine({ row: t, column: c }, f)) }, C = function(e, t) { return m.test(e) }, function(e, t, n) {
                        for (var i = 0; t-- && " " == e.charAt(t);) i++;
                        if (i % h != 0) return !1;
                        for (i = 0;
                            " " == e.charAt(n++);) i++;
                        return h > 2 ? i % h != h - 1 : i % h == 0
                    })
            } else {
                if (!this.blockComment) return !1;
                var f = this.blockComment.start,
                    p = this.blockComment.end,
                    m = new RegExp("^(\\s*)(?:" + a.escapeRegExp(f) + ")"),
                    v = new RegExp("(?:" + a.escapeRegExp(p) + ")\\s*$"),
                    w = function(e, t) { C(e, t) || s && !/\S/.test(e) || (r.insertInLine({ row: t, column: e.length }, p), r.insertInLine({ row: t, column: c }, f)) },
                    A = function(e, t) {
                        var n;
                        (n = e.match(v)) && r.removeInLine(t, e.length - n[0].length, e.length), (n = e.match(m)) && r.removeInLine(t, n[1].length, n[0].length)
                    },
                    C = function(e, n) {
                        if (m.test(e)) return !0;
                        for (var i = t.getTokens(n), o = 0; o < i.length; o++)
                            if ("comment" === i[o].type) return !0
                    }
            }
            var b = 1 / 0;
            o(function(e, t) { var n = e.search(/\S/); - 1 !== n ? (n < c && (c = n), l && !C(e, t) && (l = !1)) : b > e.length && (b = e.length) }), c == 1 / 0 && (c = b, s = !1, l = !1), u && c % h != 0 && (c = Math.floor(c / h) * h), o(l ? A : w)
        }, this.toggleBlockComment = function(e, t, n, i) {
            var o = this.blockComment;
            if (o) {
                !o.start && o[0] && (o = o[0]);
                var r, s, a = (p = new l(t, i.row, i.column)).getCurrentToken(),
                    h = (t.selection, t.selection.toOrientedRange());
                if (a && /comment/.test(a.type)) {
                    for (var u, d; a && /comment/.test(a.type);) {
                        if (-1 != (m = a.value.indexOf(o.start))) {
                            var g = p.getCurrentTokenRow(),
                                f = p.getCurrentTokenColumn() + m;
                            u = new c(g, f, g, f + o.start.length);
                            break
                        }
                        a = p.stepBackward()
                    }
                    var p;
                    for (a = (p = new l(t, i.row, i.column)).getCurrentToken(); a && /comment/.test(a.type);) {
                        var m;
                        if (-1 != (m = a.value.indexOf(o.end))) {
                            g = p.getCurrentTokenRow(), f = p.getCurrentTokenColumn() + m;
                            d = new c(g, f, g, f + o.end.length);
                            break
                        }
                        a = p.stepForward()
                    }
                    d && t.remove(d), u && (t.remove(u), r = u.start.row, s = -o.start.length)
                } else s = o.start.length, r = n.start.row, t.insert(n.end, o.end), t.insert(n.start, o.start);
                h.start.row == r && (h.start.column += s), h.end.row == r && (h.end.column += s), t.selection.fromOrientedRange(h)
            }
        }, this.getNextLineIndent = function(e, t, n) { return this.$getIndent(t) }, this.checkOutdent = function(e, t, n) { return !1 }, this.autoOutdent = function(e, t, n) {}, this.$getIndent = function(e) { return e.match(/^\s*/)[0] }, this.createWorker = function(e) { return null }, this.createModeDelegates = function(e) {
            for (var t in this.$embeds = [], this.$modes = {}, e) e[t] && (this.$embeds.push(t), this.$modes[t] = new e[t]);
            var n = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"];
            for (t = 0; t < n.length; t++) ! function(e) {
                var i = n[t],
                    o = e[i];
                e[n[t]] = function() { return this.$delegator(i, arguments, o) }
            }(this)
        }, this.$delegator = function(e, t, n) {
            var i = t[0];
            "string" != typeof i && (i = i[0]);
            for (var o = 0; o < this.$embeds.length; o++)
                if (this.$modes[this.$embeds[o]]) { var r = i.split(this.$embeds[o]); if (!r[0] && r[1]) { t[0] = r[1]; var s = this.$modes[this.$embeds[o]]; return s[e].apply(s, t) } }
            var a = n.apply(this, t);
            return n ? a : void 0
        }, this.transformAction = function(e, t, n, i, o) {
            if (this.$behaviour) {
                var r = this.$behaviour.getBehaviours();
                for (var s in r)
                    if (r[s][t]) { var a = r[s][t].apply(this, arguments); if (a) return a }
            }
        }, this.getKeywords = function(e) {
            if (!this.completionKeywords) {
                var t = this.$tokenizer.rules,
                    n = [];
                for (var i in t)
                    for (var o = t[i], r = 0, s = o.length; r < s; r++)
                        if ("string" == typeof o[r].token) /keyword|support|storage/.test(o[r].token) && n.push(o[r].regex);
                        else if ("object" == typeof o[r].token)
                    for (var a = 0, l = o[r].token.length; a < l; a++)
                        if (/keyword|support|storage/.test(o[r].token[a])) {
                            i = o[r].regex.match(/\(.+?\)/g)[a];
                            n.push(i.substr(1, i.length - 2))
                        }
                this.completionKeywords = n
            }
            return e ? n.concat(this.$keywordList || []) : this.$keywordList
        }, this.$createKeywordList = function() { return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || [] }, this.getCompletions = function(e, t, n, i) { return (this.$keywordList || this.$createKeywordList()).map(function(e) { return { name: e, value: e, score: 0, meta: "keyword" } }) }, this.$id = "ace/mode/text"
    }).call(h.prototype), t.Mode = h
}), ace.define("ace/apply_delta", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    t.applyDelta = function(e, t, n) {
        var i = t.start.row,
            o = t.start.column,
            r = e[i] || "";
        switch (t.action) {
            case "insert":
                if (1 === t.lines.length) e[i] = r.substring(0, o) + t.lines[0] + r.substring(o);
                else {
                    var s = [i, 1].concat(t.lines);
                    e.splice.apply(e, s), e[i] = r.substring(0, o) + e[i], e[i + t.lines.length - 1] += r.substring(o)
                }
                break;
            case "remove":
                var a = t.end.column,
                    l = t.end.row;
                i === l ? e[i] = r.substring(0, o) + r.substring(a) : e.splice(i, l - i + 1, r.substring(0, o) + e[l].substring(a))
        }
    }
}), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./lib/event_emitter").EventEmitter,
        r = t.Anchor = function(e, t, n) { this.$onChange = this.onChange.bind(this), this.attach(e), void 0 === n ? this.setPosition(t.row, t.column) : this.setPosition(t, n) };
    (function() {
        function e(e, t, n) { var i = n ? e.column <= t.column : e.column < t.column; return e.row < t.row || e.row == t.row && i }
        i.implement(this, o), this.getPosition = function() { return this.$clipPositionToDocument(this.row, this.column) }, this.getDocument = function() { return this.document }, this.$insertRight = !1, this.onChange = function(t) {
            if (!(t.start.row == t.end.row && t.start.row != this.row || t.start.row > this.row)) {
                var n, i, o, r, s, a, l, c, h = (n = t, i = { row: this.row, column: this.column }, o = this.$insertRight, r = "insert" == n.action, s = (r ? 1 : -1) * (n.end.row - n.start.row), a = (r ? 1 : -1) * (n.end.column - n.start.column), l = n.start, c = r ? l : n.end, e(i, l, o) ? { row: i.row, column: i.column } : e(c, i, !o) ? { row: i.row + s, column: i.column + (i.row == c.row ? a : 0) } : { row: l.row, column: l.column });
                this.setPosition(h.row, h.column, !0)
            }
        }, this.setPosition = function(e, t, n) {
            var i;
            if (i = n ? { row: e, column: t } : this.$clipPositionToDocument(e, t), this.row != i.row || this.column != i.column) {
                var o = { row: this.row, column: this.column };
                this.row = i.row, this.column = i.column, this._signal("change", { old: o, value: i })
            }
        }, this.detach = function() { this.document.removeEventListener("change", this.$onChange) }, this.attach = function(e) { this.document = e || this.document, this.document.on("change", this.$onChange) }, this.$clipPositionToDocument = function(e, t) { var n = {}; return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n }
    }).call(r.prototype)
}), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/apply_delta", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./apply_delta").applyDelta,
        r = e("./lib/event_emitter").EventEmitter,
        s = e("./range").Range,
        a = e("./anchor").Anchor,
        l = function(e) { this.$lines = [""], 0 === e.length ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({ row: 0, column: 0 }, e) : this.insert({ row: 0, column: 0 }, e) };
    (function() {
        i.implement(this, r), this.setValue = function(e) {
            var t = this.getLength() - 1;
            this.remove(new s(0, 0, t, this.getLine(t).length)), this.insert({ row: 0, column: 0 }, e)
        }, this.getValue = function() { return this.getAllLines().join(this.getNewLineCharacter()) }, this.createAnchor = function(e, t) { return new a(this, e, t) }, 0 === "aaa".split(/a/).length ? this.$split = function(e) { return e.replace(/\r\n|\r/g, "\n").split("\n") } : this.$split = function(e) { return e.split(/\r\n|\r|\n/) }, this.$detectNewLine = function(e) {
            var t = e.match(/^.*?(\r\n|\r|\n)/m);
            this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode")
        }, this.getNewLineCharacter = function() {
            switch (this.$newLineMode) {
                case "windows":
                    return "\r\n";
                case "unix":
                    return "\n";
                default:
                    return this.$autoNewLine || "\n"
            }
        }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function(e) { this.$newLineMode !== e && (this.$newLineMode = e, this._signal("changeNewLineMode")) }, this.getNewLineMode = function() { return this.$newLineMode }, this.isNewLine = function(e) { return "\r\n" == e || "\r" == e || "\n" == e }, this.getLine = function(e) { return this.$lines[e] || "" }, this.getLines = function(e, t) { return this.$lines.slice(e, t + 1) }, this.getAllLines = function() { return this.getLines(0, this.getLength()) }, this.getLength = function() { return this.$lines.length }, this.getTextRange = function(e) { return this.getLinesForRange(e).join(this.getNewLineCharacter()) }, this.getLinesForRange = function(e) {
            var t;
            if (e.start.row === e.end.row) t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)];
            else {
                (t = this.getLines(e.start.row, e.end.row))[0] = (t[0] || "").substring(e.start.column);
                var n = t.length - 1;
                e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column))
            }
            return t
        }, this.insertLines = function(e, t) { return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t) }, this.removeLines = function(e, t) { return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t) }, this.insertNewLine = function(e) { return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""]) }, this.insert = function(e, t) { return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t)) }, this.insertInLine = function(e, t) {
            var n = this.clippedPos(e.row, e.column),
                i = this.pos(e.row, e.column + t.length);
            return this.applyDelta({ start: n, end: i, action: "insert", lines: [t] }, !0), this.clonePos(i)
        }, this.clippedPos = function(e, t) {
            var n = this.getLength();
            void 0 === e ? e = n : e < 0 ? e = 0 : e >= n && (e = n - 1, t = void 0);
            var i = this.getLine(e);
            return null == t && (t = i.length), { row: e, column: t = Math.min(Math.max(t, 0), i.length) }
        }, this.clonePos = function(e) { return { row: e.row, column: e.column } }, this.pos = function(e, t) { return { row: e, column: t } }, this.$clipPosition = function(e) { var t = this.getLength(); return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e }, this.insertFullLines = function(e, t) {
            var n = 0;
            (e = Math.min(Math.max(e, 0), this.getLength())) < this.getLength() ? (t = t.concat([""]), n = 0) : (t = [""].concat(t), e--, n = this.$lines[e].length), this.insertMergedLines({ row: e, column: n }, t)
        }, this.insertMergedLines = function(e, t) {
            var n = this.clippedPos(e.row, e.column),
                i = { row: n.row + t.length - 1, column: (1 == t.length ? n.column : 0) + t[t.length - 1].length };
            return this.applyDelta({ start: n, end: i, action: "insert", lines: t }), this.clonePos(i)
        }, this.remove = function(e) {
            var t = this.clippedPos(e.start.row, e.start.column),
                n = this.clippedPos(e.end.row, e.end.column);
            return this.applyDelta({ start: t, end: n, action: "remove", lines: this.getLinesForRange({ start: t, end: n }) }), this.clonePos(t)
        }, this.removeInLine = function(e, t, n) {
            var i = this.clippedPos(e, t),
                o = this.clippedPos(e, n);
            return this.applyDelta({ start: i, end: o, action: "remove", lines: this.getLinesForRange({ start: i, end: o }) }, !0), this.clonePos(i)
        }, this.removeFullLines = function(e, t) {
            e = Math.min(Math.max(0, e), this.getLength() - 1);
            var n = (t = Math.min(Math.max(0, t), this.getLength() - 1)) == this.getLength() - 1 && e > 0,
                i = t < this.getLength() - 1,
                o = n ? e - 1 : e,
                r = n ? this.getLine(o).length : 0,
                a = i ? t + 1 : t,
                l = i ? 0 : this.getLine(a).length,
                c = new s(o, r, a, l),
                h = this.$lines.slice(e, t + 1);
            return this.applyDelta({ start: c.start, end: c.end, action: "remove", lines: this.getLinesForRange(c) }), h
        }, this.removeNewLine = function(e) { e < this.getLength() - 1 && e >= 0 && this.applyDelta({ start: this.pos(e, this.getLine(e).length), end: this.pos(e + 1, 0), action: "remove", lines: ["", ""] }) }, this.replace = function(e, t) { return e instanceof s || (e = s.fromPoints(e.start, e.end)), 0 === t.length && e.isEmpty() ? e.start : t == this.getTextRange(e) ? e.end : (this.remove(e), t ? this.insert(e.start, t) : e.start) }, this.applyDeltas = function(e) { for (var t = 0; t < e.length; t++) this.applyDelta(e[t]) }, this.revertDeltas = function(e) { for (var t = e.length - 1; t >= 0; t--) this.revertDelta(e[t]) }, this.applyDelta = function(e, t) {
            var n = "insert" == e.action;
            (n ? e.lines.length <= 1 && !e.lines[0] : !s.comparePoints(e.start, e.end)) || (n && e.lines.length > 2e4 && this.$splitAndapplyLargeDelta(e, 2e4), o(this.$lines, e, t), this._signal("change", e))
        }, this.$splitAndapplyLargeDelta = function(e, t) {
            for (var n = e.lines, i = n.length, o = e.start.row, r = e.start.column, s = 0, a = 0;;) {
                s = a, a += t - 1;
                var l = n.slice(s, a);
                if (a > i) { e.lines = l, e.start.row = o + s, e.start.column = r; break }
                l.push(""), this.applyDelta({ start: this.pos(o + s, r), end: this.pos(o + a, r = 0), action: e.action, lines: l }, !0)
            }
        }, this.revertDelta = function(e) { this.applyDelta({ start: this.clonePos(e.start), end: this.clonePos(e.end), action: "insert" == e.action ? "remove" : "insert", lines: e.lines.slice() }) }, this.indexToPosition = function(e, t) {
            for (var n = this.$lines || this.getAllLines(), i = this.getNewLineCharacter().length, o = t || 0, r = n.length; o < r; o++)
                if ((e -= n[o].length + i) < 0) return { row: o, column: e + n[o].length + i };
            return { row: r - 1, column: n[r - 1].length }
        }, this.positionToIndex = function(e, t) { for (var n = this.$lines || this.getAllLines(), i = this.getNewLineCharacter().length, o = 0, r = Math.min(e.row, n.length), s = t || 0; s < r; ++s) o += n[s].length + i; return o + e.column }
    }).call(l.prototype), t.Document = l
}), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./lib/event_emitter").EventEmitter,
        r = function(e, t) {
            this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
            var n = this;
            this.$worker = function() {
                if (n.running) {
                    for (var e = new Date, t = n.currentLine, i = -1, o = n.doc, r = t; n.lines[t];) t++;
                    var s = o.getLength(),
                        a = 0;
                    for (n.running = !1; t < s;) { for (n.$tokenizeRow(t), i = t; t++, n.lines[t];); if (++a % 5 == 0 && new Date - e > 20) { n.running = setTimeout(n.$worker, 20); break } }
                    n.currentLine = t, -1 == i && (i = t), r <= i && n.fireUpdateEvent(r, i)
                }
            }
        };
    (function() {
        i.implement(this, o), this.setTokenizer = function(e) { this.tokenizer = e, this.lines = [], this.states = [], this.start(0) }, this.setDocument = function(e) { this.doc = e, this.lines = [], this.states = [], this.stop() }, this.fireUpdateEvent = function(e, t) {
            var n = { first: e, last: t };
            this._signal("update", { data: n })
        }, this.start = function(e) { this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700) }, this.scheduleStart = function() { this.running || (this.running = setTimeout(this.$worker, 700)) }, this.$updateOnChange = function(e) {
            var t = e.start.row,
                n = e.end.row - t;
            if (0 === n) this.lines[t] = null;
            else if ("remove" == e.action) this.lines.splice(t, n + 1, null), this.states.splice(t, n + 1, null);
            else {
                var i = Array(n + 1);
                i.unshift(t, 1), this.lines.splice.apply(this.lines, i), this.states.splice.apply(this.states, i)
            }
            this.currentLine = Math.min(t, this.currentLine, this.doc.getLength()), this.stop()
        }, this.stop = function() { this.running && clearTimeout(this.running), this.running = !1 }, this.getTokens = function(e) { return this.lines[e] || this.$tokenizeRow(e) }, this.getState = function(e) { return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start" }, this.$tokenizeRow = function(e) {
            var t = this.doc.getLine(e),
                n = this.states[e - 1],
                i = this.tokenizer.getLineTokens(t, n, e);
            return this.states[e] + "" != i.state + "" ? (this.states[e] = i.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = i.tokens
        }
    }).call(r.prototype), t.BackgroundTokenizer = r
}), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("./lib/lang"),
        o = (e("./lib/oop"), e("./range").Range),
        r = function(e, t, n) { this.setRegexp(e), this.clazz = t, this.type = n || "text" };
    (function() {
        this.MAX_RANGES = 500, this.setRegexp = function(e) { this.regExp + "" != e + "" && (this.regExp = e, this.cache = []) }, this.update = function(e, t, n, r) {
            if (this.regExp)
                for (var s = r.firstRow, a = r.lastRow, l = s; l <= a; l++) {
                    var c = this.cache[l];
                    null == c && ((c = i.getMatchOffsets(n.getLine(l), this.regExp)).length > this.MAX_RANGES && (c = c.slice(0, this.MAX_RANGES)), c = c.map(function(e) { return new o(l, e.offset, l, e.offset + e.length) }), this.cache[l] = c.length ? c : "");
                    for (var h = c.length; h--;) t.drawSingleLineMarker(e, c[h].toScreenRange(n), this.clazz, r)
                }
        }
    }).call(r.prototype), t.SearchHighlight = r
}), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    "use strict";

    function i(e, t) {
        this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
        var n = t[t.length - 1];
        this.range = new o(t[0].start.row, t[0].start.column, n.end.row, n.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(e) { e.setFoldLine(this) }, this)
    }
    var o = e("../range").Range;
    (function() {
        this.shiftRow = function(e) { this.start.row += e, this.end.row += e, this.folds.forEach(function(t) { t.start.row += e, t.end.row += e }) }, this.addFold = function(e) {
            if (e.sameRow) {
                if (e.start.row < this.startRow || e.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
                this.folds.push(e), this.folds.sort(function(e, t) { return -e.range.compareEnd(t.start.row, t.start.column) }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
            } else if (e.start.row == this.end.row) this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;
            else {
                if (e.end.row != this.start.row) throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
                this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
            }
            e.foldLine = this
        }, this.containsRow = function(e) { return e >= this.start.row && e <= this.end.row }, this.walk = function(e, t, n) {
            var i, o, r = 0,
                s = this.folds,
                a = !0;
            null == t && (t = this.end.row, n = this.end.column);
            for (var l = 0; l < s.length; l++) {
                if (-1 == (o = (i = s[l]).range.compareStart(t, n))) return void e(null, t, n, r, a);
                if (!e(null, i.start.row, i.start.column, r, a) && e(i.placeholder, i.start.row, i.start.column, r) || 0 === o) return;
                a = !i.sameRow, r = i.end.column
            }
            e(null, t, n, r, a)
        }, this.getNextFoldTo = function(e, t) { for (var n, i, o = 0; o < this.folds.length; o++) { if (-1 == (i = (n = this.folds[o]).range.compareEnd(e, t))) return { fold: n, kind: "after" }; if (0 === i) return { fold: n, kind: "inside" } } return null }, this.addRemoveChars = function(e, t, n) {
            var i, o, r = this.getNextFoldTo(e, t);
            if (r)
                if (i = r.fold, "inside" == r.kind && i.start.column != t && i.start.row != e) window.console && window.console.log(e, t, i);
                else if (i.start.row == e) {
                var s = (o = this.folds).indexOf(i);
                for (0 === s && (this.start.column += n); s < o.length; s++) {
                    if ((i = o[s]).start.column += n, !i.sameRow) return;
                    i.end.column += n
                }
                this.end.column += n
            }
        }, this.split = function(e, t) {
            var n = this.getNextFoldTo(e, t);
            if (!n || "inside" == n.kind) return null;
            var o = n.fold,
                r = this.folds,
                s = this.foldData,
                a = r.indexOf(o),
                l = r[a - 1];
            this.end.row = l.end.row, this.end.column = l.end.column;
            var c = new i(s, r = r.splice(a, r.length - a));
            return s.splice(s.indexOf(this) + 1, 0, c), c
        }, this.merge = function(e) {
            for (var t = e.folds, n = 0; n < t.length; n++) this.addFold(t[n]);
            var i = this.foldData;
            i.splice(i.indexOf(e), 1)
        }, this.toString = function() { var e = [this.range.toString() + ": ["]; return this.folds.forEach(function(t) { e.push("  " + t.toString()) }), e.push("]"), e.join("\n") }, this.idxToPosition = function(e) {
            for (var t = 0, n = 0; n < this.folds.length; n++) {
                var i = this.folds[n];
                if ((e -= i.start.column - t) < 0) return { row: i.start.row, column: i.start.column + e };
                if ((e -= i.placeholder.length) < 0) return i.start;
                t = i.end.column
            }
            return { row: this.end.row, column: this.end.column + e }
        }
    }).call(i.prototype), t.FoldLine = i
}), ace.define("ace/range_list", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("./range").Range.comparePoints,
        o = function() { this.ranges = [] };
    (function() {
        this.comparePoints = i, this.pointIndex = function(e, t, n) {
            for (var o = this.ranges, r = n || 0; r < o.length; r++) {
                var s = o[r],
                    a = i(e, s.end);
                if (!(a > 0)) { var l = i(e, s.start); return 0 === a ? t && 0 !== l ? -r - 2 : r : l > 0 || 0 === l && !t ? r : -r - 1 }
            }
            return -r - 1
        }, this.add = function(e) {
            var t = !e.isEmpty(),
                n = this.pointIndex(e.start, t);
            n < 0 && (n = -n - 1);
            var i = this.pointIndex(e.end, t, n);
            return i < 0 ? i = -i - 1 : i++, this.ranges.splice(n, i - n, e)
        }, this.addList = function(e) { for (var t = [], n = e.length; n--;) t.push.apply(t, this.add(e[n])); return t }, this.substractPoint = function(e) { var t = this.pointIndex(e); if (t >= 0) return this.ranges.splice(t, 1) }, this.merge = function() {
            for (var e, t = [], n = this.ranges, o = (n = n.sort(function(e, t) { return i(e.start, t.start) }))[0], r = 1; r < n.length; r++) {
                e = o, o = n[r];
                var s = i(e.end, o.start);
                s < 0 || (0 != s || e.isEmpty() || o.isEmpty()) && (i(e.end, o.end) < 0 && (e.end.row = o.end.row, e.end.column = o.end.column), n.splice(r, 1), t.push(o), o = e, r--)
            }
            return this.ranges = n, t
        }, this.contains = function(e, t) { return this.pointIndex({ row: e, column: t }) >= 0 }, this.containsPoint = function(e) { return this.pointIndex(e) >= 0 }, this.rangeAtPoint = function(e) { var t = this.pointIndex(e); if (t >= 0) return this.ranges[t] }, this.clipRows = function(e, t) {
            var n = this.ranges;
            if (n[0].start.row > t || n[n.length - 1].start.row < e) return [];
            var i = this.pointIndex({ row: e, column: 0 });
            i < 0 && (i = -i - 1);
            var o = this.pointIndex({ row: t, column: 0 }, i);
            o < 0 && (o = -o - 1);
            for (var r = [], s = i; s < o; s++) r.push(n[s]);
            return r
        }, this.removeAll = function() { return this.ranges.splice(0, this.ranges.length) }, this.attach = function(e) { this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange) }, this.detach = function() { this.session && (this.session.removeListener("change", this.onChange), this.session = null) }, this.$onChange = function(e) {
            if ("insert" == e.action) var t = e.start,
                n = e.end;
            else n = e.start, t = e.end;
            for (var i = t.row, o = n.row - i, r = -t.column + n.column, s = this.ranges, a = 0, l = s.length; a < l; a++) {
                if (!((c = s[a]).end.row < i)) {
                    if (c.start.row > i) break;
                    if (c.start.row == i && c.start.column >= t.column && (c.start.column != t.column || !this.$insertRight) && (c.start.column += r, c.start.row += o), c.end.row == i && c.end.column >= t.column) {
                        if (c.end.column == t.column && this.$insertRight) continue;
                        c.end.column == t.column && r > 0 && a < l - 1 && c.end.column > c.start.column && c.end.column == s[a + 1].start.column && (c.end.column -= r), c.end.column += r, c.end.row += o
                    }
                }
            }
            if (0 != o && a < l)
                for (; a < l; a++) {
                    var c;
                    (c = s[a]).start.row += o, c.end.row += o
                }
        }
    }).call(o.prototype), t.RangeList = o
}), ace.define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function(e, t, n) {
    "use strict";

    function i(e, t) { e.row -= t.row, 0 == e.row && (e.column -= t.column) }

    function o(e, t) { 0 == e.row && (e.column += t.column), e.row += t.row }
    e("../range").Range;
    var r = e("../range_list").RangeList,
        s = e("../lib/oop"),
        a = t.Fold = function(e, t) { this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = [] };
    s.inherits(a, r),
        function() {
            this.toString = function() { return '"' + this.placeholder + '" ' + this.range.toString() }, this.setFoldLine = function(e) { this.foldLine = e, this.subFolds.forEach(function(t) { t.setFoldLine(e) }) }, this.clone = function() {
                var e = this.range.clone(),
                    t = new a(e, this.placeholder);
                return this.subFolds.forEach(function(e) { t.subFolds.push(e.clone()) }), t.collapseChildren = this.collapseChildren, t
            }, this.addSubFold = function(e) {
                if (!this.range.isEqual(e)) {
                    if (!this.range.containsRange(e)) throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
                    var t, n;
                    t = e, n = this.start, i(t.start, n), i(t.end, n);
                    for (var o = e.start.row, r = e.start.column, s = 0, a = -1; s < this.subFolds.length && 1 == (a = this.subFolds[s].range.compare(o, r)); s++);
                    var l = this.subFolds[s];
                    if (0 == a) return l.addSubFold(e);
                    o = e.range.end.row, r = e.range.end.column;
                    var c = s;
                    for (a = -1; c < this.subFolds.length && 1 == (a = this.subFolds[c].range.compare(o, r)); c++);
                    this.subFolds[c];
                    if (0 == a) throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
                    this.subFolds.splice(s, c - s, e);
                    return e.setFoldLine(this.foldLine), e
                }
            }, this.restoreRange = function(e) { return t = e, n = this.start, o(t.start, n), void o(t.end, n); var t, n }
        }.call(a.prototype)
}), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function(e, t, n) {
    "use strict";
    var i = e("../range").Range,
        o = e("./fold_line").FoldLine,
        r = e("./fold").Fold,
        s = e("../token_iterator").TokenIterator;
    t.Folding = function() {
        this.getFoldAt = function(e, t, n) { var i = this.getFoldLine(e); if (!i) return null; for (var o = i.folds, r = 0; r < o.length; r++) { var s = o[r]; if (s.range.contains(e, t)) { if (1 == n && s.range.isEnd(e, t)) continue; if (-1 == n && s.range.isStart(e, t)) continue; return s } } }, this.getFoldsInRange = function(e) {
            var t = e.start,
                n = e.end,
                i = this.$foldData,
                o = [];
            t.column += 1, n.column -= 1;
            for (var r = 0; r < i.length; r++) {
                var s = i[r].range.compareRange(e);
                if (2 != s) {
                    if (-2 == s) break;
                    for (var a = i[r].folds, l = 0; l < a.length; l++) {
                        var c = a[l];
                        if (-2 == (s = c.range.compareRange(e))) break;
                        if (2 != s) {
                            if (42 == s) break;
                            o.push(c)
                        }
                    }
                }
            }
            return t.column -= 1, n.column += 1, o
        }, this.getFoldsInRangeList = function(e) {
            if (Array.isArray(e)) {
                var t = [];
                e.forEach(function(e) { t = t.concat(this.getFoldsInRange(e)) }, this)
            } else t = this.getFoldsInRange(e);
            return t
        }, this.getAllFolds = function() {
            for (var e = [], t = this.$foldData, n = 0; n < t.length; n++)
                for (var i = 0; i < t[n].folds.length; i++) e.push(t[n].folds[i]);
            return e
        }, this.getFoldStringAt = function(e, t, n, i) {
            if (!(i = i || this.getFoldLine(e))) return null;
            for (var o, r, s = { end: { column: 0 } }, a = 0; a < i.folds.length; a++) {
                var l = (r = i.folds[a]).range.compareEnd(e, t);
                if (-1 == l) { o = this.getLine(r.start.row).substring(s.end.column, r.start.column); break }
                if (0 === l) return null;
                s = r
            }
            return o || (o = this.getLine(r.start.row).substring(s.end.column)), -1 == n ? o.substring(0, t - s.end.column) : 1 == n ? o.substring(t - s.end.column) : o
        }, this.getFoldLine = function(e, t) {
            var n = this.$foldData,
                i = 0;
            for (t && (i = n.indexOf(t)), -1 == i && (i = 0); i < n.length; i++) { var o = n[i]; if (o.start.row <= e && o.end.row >= e) return o; if (o.end.row > e) return null }
            return null
        }, this.getNextFoldLine = function(e, t) {
            var n = this.$foldData,
                i = 0;
            for (t && (i = n.indexOf(t)), -1 == i && (i = 0); i < n.length; i++) { var o = n[i]; if (o.end.row >= e) return o }
            return null
        }, this.getFoldedRowCount = function(e, t) {
            for (var n = this.$foldData, i = t - e + 1, o = 0; o < n.length; o++) {
                var r = n[o],
                    s = r.end.row,
                    a = r.start.row;
                if (s >= t) { a < t && (a >= e ? i -= t - a : i = 0); break }
                s >= e && (i -= a >= e ? s - a : s - e + 1)
            }
            return i
        }, this.$addFoldLine = function(e) { return this.$foldData.push(e), this.$foldData.sort(function(e, t) { return e.start.row - t.start.row }), e }, this.addFold = function(e, t) {
            var n, i = this.$foldData,
                s = !1;
            e instanceof r ? n = e : (n = new r(t, e)).collapseChildren = t.collapseChildren, this.$clipRangeToDocument(n.range);
            var a = n.start.row,
                l = n.start.column,
                c = n.end.row,
                h = n.end.column;
            if (a < c || a == c && l <= h - 2) {
                var u = this.getFoldAt(a, l, 1),
                    d = this.getFoldAt(c, h, -1);
                if (u && d == u) return u.addSubFold(n);
                u && !u.range.isStart(a, l) && this.removeFold(u), d && !d.range.isEnd(c, h) && this.removeFold(d);
                var g = this.getFoldsInRange(n.range);
                g.length > 0 && (this.removeFolds(g), g.forEach(function(e) { n.addSubFold(e) }));
                for (var f = 0; f < i.length; f++) { var p = i[f]; if (c == p.start.row) { p.addFold(n), s = !0; break } if (a == p.end.row) { if (p.addFold(n), s = !0, !n.sameRow) { var m = i[f + 1]; if (m && m.start.row == c) { p.merge(m); break } } break } if (c <= p.start.row) break }
                return s || (p = this.$addFoldLine(new o(this.$foldData, n))), this.$useWrapMode ? this.$updateWrapData(p.start.row, p.start.row) : this.$updateRowLengthCache(p.start.row, p.start.row), this.$modified = !0, this._signal("changeFold", { data: n, action: "add" }), n
            }
            throw new Error("The range has to be at least 2 characters width")
        }, this.addFolds = function(e) { e.forEach(function(e) { this.addFold(e) }, this) }, this.removeFold = function(e) {
            var t = e.foldLine,
                n = t.start.row,
                i = t.end.row,
                o = this.$foldData,
                r = t.folds;
            if (1 == r.length) o.splice(o.indexOf(t), 1);
            else if (t.range.isEnd(e.end.row, e.end.column)) r.pop(), t.end.row = r[r.length - 1].end.row, t.end.column = r[r.length - 1].end.column;
            else if (t.range.isStart(e.start.row, e.start.column)) r.shift(), t.start.row = r[0].start.row, t.start.column = r[0].start.column;
            else if (e.sameRow) r.splice(r.indexOf(e), 1);
            else {
                var s = t.split(e.start.row, e.start.column);
                (r = s.folds).shift(), s.start.row = r[0].start.row, s.start.column = r[0].start.column
            }
            this.$updating || (this.$useWrapMode ? this.$updateWrapData(n, i) : this.$updateRowLengthCache(n, i)), this.$modified = !0, this._signal("changeFold", { data: e, action: "remove" })
        }, this.removeFolds = function(e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
            t.forEach(function(e) { this.removeFold(e) }, this), this.$modified = !0
        }, this.expandFold = function(e) { this.removeFold(e), e.subFolds.forEach(function(t) { e.restoreRange(t), this.addFold(t) }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = [] }, this.expandFolds = function(e) { e.forEach(function(e) { this.expandFold(e) }, this) }, this.unfold = function(e, t) {
            var n, o;
            if (null == e ? (n = new i(0, 0, this.getLength(), 0), t = !0) : n = "number" == typeof e ? new i(e, 0, e, this.getLine(e).length) : "row" in e ? i.fromPoints(e, e) : e, o = this.getFoldsInRangeList(n), t) this.removeFolds(o);
            else
                for (var r = o; r.length;) this.expandFolds(r), r = this.getFoldsInRangeList(n);
            if (o.length) return o
        }, this.isRowFolded = function(e, t) { return !!this.getFoldLine(e, t) }, this.getRowFoldEnd = function(e, t) { var n = this.getFoldLine(e, t); return n ? n.end.row : e }, this.getRowFoldStart = function(e, t) { var n = this.getFoldLine(e, t); return n ? n.start.row : e }, this.getFoldDisplayLine = function(e, t, n, i, o) {
            null == i && (i = e.start.row), null == o && (o = 0), null == t && (t = e.end.row), null == n && (n = this.getLine(t).length);
            var r = this.doc,
                s = "";
            return e.walk(function(e, t, n, a) {
                if (!(t < i)) {
                    if (t == i) {
                        if (n < o) return;
                        a = Math.max(o, a)
                    }
                    s += null != e ? e : r.getLine(t).substring(a, n)
                }
            }, t, n), s
        }, this.getDisplayLine = function(e, t, n, i) { var o, r = this.getFoldLine(e); return r ? this.getFoldDisplayLine(r, e, t, n, i) : (o = this.doc.getLine(e)).substring(i || 0, t || o.length) }, this.$cloneFoldData = function() { var e = []; return e = this.$foldData.map(function(t) { var n = t.folds.map(function(e) { return e.clone() }); return new o(e, n) }) }, this.toggleFold = function(e) {
            var t, n, i = this.selection.getRange();
            if (i.isEmpty()) {
                var o = i.start;
                if (t = this.getFoldAt(o.row, o.column)) return void this.expandFold(t);
                (n = this.findMatchingBracket(o)) ? 1 == i.comparePoint(n) ? i.end = n : (i.start = n, i.start.column++, i.end.column--): (n = this.findMatchingBracket({ row: o.row, column: o.column + 1 })) ? (1 == i.comparePoint(n) ? i.end = n : i.start = n, i.start.column++) : i = this.getCommentFoldRange(o.row, o.column) || i
            } else {
                var r = this.getFoldsInRange(i);
                if (e && r.length) return void this.expandFolds(r);
                1 == r.length && (t = r[0])
            }
            if (t || (t = this.getFoldAt(i.start.row, i.start.column)), t && t.range.toString() == i.toString()) this.expandFold(t);
            else {
                var s = "...";
                if (!i.isMultiLine()) {
                    if ((s = this.getTextRange(i)).length < 4) return;
                    s = s.trim().substring(0, 2) + ".."
                }
                this.addFold(s, i)
            }
        }, this.getCommentFoldRange = function(e, t, n) {
            var o = new s(this, e, t),
                r = o.getCurrentToken(),
                a = r.type;
            if (r && /^comment|string/.test(a)) {
                "comment" == (a = a.match(/comment|string/)[0]) && (a += "|doc-start");
                var l = new RegExp(a),
                    c = new i;
                if (1 != n) {
                    for (;
                        (r = o.stepBackward()) && l.test(r.type););
                    o.stepForward()
                }
                if (c.start.row = o.getCurrentTokenRow(), c.start.column = o.getCurrentTokenColumn() + 2, o = new s(this, e, t), -1 != n) {
                    var h = -1;
                    do {
                        if (r = o.stepForward(), -1 == h) {
                            var u = this.getState(o.$row);
                            l.test(u) || (h = o.$row)
                        } else if (o.$row > h) break
                    } while (r && l.test(r.type));
                    r = o.stepBackward()
                } else r = o.getCurrentToken();
                return c.end.row = o.getCurrentTokenRow(), c.end.column = o.getCurrentTokenColumn() + r.value.length - 2, c
            }
        }, this.foldAll = function(e, t, n) {
            null == n && (n = 1e5);
            var i = this.foldWidgets;
            if (i) {
                t = t || this.getLength();
                for (var o = e = e || 0; o < t; o++)
                    if (null == i[o] && (i[o] = this.getFoldWidget(o)), "start" == i[o]) {
                        var r = this.getFoldWidgetRange(o);
                        if (r && r.isMultiLine() && r.end.row <= t && r.start.row >= e) {
                            o = r.end.row;
                            try {
                                var s = this.addFold("...", r);
                                s && (s.collapseChildren = n)
                            } catch (e) {}
                        }
                    }
            }
        }, this.$foldStyles = { manual: 1, markbegin: 1, markbeginend: 1 }, this.$foldStyle = "markbegin", this.setFoldStyle = function(e) {
            if (!this.$foldStyles[e]) throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
            if (this.$foldStyle != e) {
                this.$foldStyle = e, "manual" == e && this.unfold();
                var t = this.$foldMode;
                this.$setFolding(null), this.$setFolding(t)
            }
        }, this.$setFolding = function(e) { this.$foldMode != e && (this.$foldMode = e, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation"), e && "manual" != this.$foldStyle ? (this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)) : this.foldWidgets = null) }, this.getParentFoldRangeData = function(e, t) {
            var n = this.foldWidgets;
            if (!n || t && n[e]) return {};
            for (var i, o = e - 1; o >= 0;) {
                var r = n[o];
                if (null == r && (r = n[o] = this.getFoldWidget(o)), "start" == r) { var s = this.getFoldWidgetRange(o); if (i || (i = s), s && s.end.row >= e) break }
                o--
            }
            return { range: -1 !== o && s, firstRange: i }
        }, this.onFoldWidgetClick = function(e, t) {
            var n = { children: (t = t.domEvent).shiftKey, all: t.ctrlKey || t.metaKey, siblings: t.altKey };
            if (!this.$toggleFoldWidget(e, n)) {
                var i = t.target || t.srcElement;
                i && /ace_fold-widget/.test(i.className) && (i.className += " ace_invalid")
            }
        }, this.$toggleFoldWidget = function(e, t) {
            if (this.getFoldWidget) {
                var n = this.getFoldWidget(e),
                    i = this.getLine(e),
                    o = "end" === n ? -1 : 1,
                    r = this.getFoldAt(e, -1 === o ? 0 : i.length, o);
                if (r) return t.children || t.all ? this.removeFold(r) : this.expandFold(r), r;
                var s = this.getFoldWidgetRange(e, !0);
                if (s && !s.isMultiLine() && (r = this.getFoldAt(s.start.row, s.start.column, 1)) && s.isEqual(r.range)) return this.removeFold(r), r;
                if (t.siblings) {
                    var a = this.getParentFoldRangeData(e);
                    if (a.range) var l = a.range.start.row + 1,
                        c = a.range.end.row;
                    this.foldAll(l, c, t.all ? 1e4 : 0)
                } else t.children ? (c = s ? s.end.row : this.getLength(), this.foldAll(e + 1, c, t.all ? 1e4 : 0)) : s && (t.all && (s.collapseChildren = 1e4), this.addFold("...", s));
                return s
            }
        }, this.toggleFoldWidget = function(e) {
            var t = this.selection.getCursor().row;
            t = this.getRowFoldStart(t);
            var n = this.$toggleFoldWidget(t, {});
            if (!n) {
                var i = this.getParentFoldRangeData(t, !0);
                if (n = i.range || i.firstRange) {
                    t = n.start.row;
                    var o = this.getFoldAt(t, this.getLine(t).length, 1);
                    o ? this.removeFold(o) : this.addFold("...", n)
                }
            }
        }, this.updateFoldWidgets = function(e) {
            var t = e.start.row,
                n = e.end.row - t;
            if (0 === n) this.foldWidgets[t] = null;
            else if ("remove" == e.action) this.foldWidgets.splice(t, n + 1, null);
            else {
                var i = Array(n + 1);
                i.unshift(t, 1), this.foldWidgets.splice.apply(this.foldWidgets, i)
            }
        }, this.tokenizerUpdateFoldWidgets = function(e) {
            var t = e.data;
            t.first != t.last && this.foldWidgets.length > t.first && this.foldWidgets.splice(t.first, this.foldWidgets.length)
        }
    }
}), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("../token_iterator").TokenIterator,
        o = e("../range").Range;
    t.BracketMatch = function() {
        this.findMatchingBracket = function(e, t) { if (0 == e.column) return null; var n = t || this.getLine(e.row).charAt(e.column - 1); if ("" == n) return null; var i = n.match(/([\(\[\{])|([\)\]\}])/); return i ? i[1] ? this.$findClosingBracket(i[1], e) : this.$findOpeningBracket(i[2], e) : null }, this.getBracketRange = function(e) {
            var t, n = this.getLine(e.row),
                i = !0,
                r = n.charAt(e.column - 1),
                s = r && r.match(/([\(\[\{])|([\)\]\}])/);
            if (s || (r = n.charAt(e.column), e = { row: e.row, column: e.column + 1 }, s = r && r.match(/([\(\[\{])|([\)\]\}])/), i = !1), !s) return null;
            if (s[1]) {
                if (!(a = this.$findClosingBracket(s[1], e))) return null;
                t = o.fromPoints(e, a), i || (t.end.column++, t.start.column--), t.cursor = t.end
            } else {
                var a;
                if (!(a = this.$findOpeningBracket(s[2], e))) return null;
                t = o.fromPoints(a, e), i || (t.start.column++, t.end.column--), t.cursor = t.start
            }
            return t
        }, this.$brackets = { ")": "(", "(": ")", "]": "[", "[": "]", "{": "}", "}": "{" }, this.$findOpeningBracket = function(e, t, n) {
            var o = this.$brackets[e],
                r = 1,
                s = new i(this, t.row, t.column),
                a = s.getCurrentToken();
            if (a || (a = s.stepForward()), a) {
                n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
                for (var l = t.column - s.getCurrentTokenColumn() - 2, c = a.value;;) {
                    for (; l >= 0;) {
                        var h = c.charAt(l);
                        if (h == o) { if (0 == (r -= 1)) return { row: s.getCurrentTokenRow(), column: l + s.getCurrentTokenColumn() } } else h == e && (r += 1);
                        l -= 1
                    }
                    for (;
                        (a = s.stepBackward()) && !n.test(a.type););
                    if (null == a) break;
                    l = (c = a.value).length - 1
                }
                return null
            }
        }, this.$findClosingBracket = function(e, t, n) {
            var o = this.$brackets[e],
                r = 1,
                s = new i(this, t.row, t.column),
                a = s.getCurrentToken();
            if (a || (a = s.stepForward()), a) {
                n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
                for (var l = t.column - s.getCurrentTokenColumn();;) {
                    for (var c = a.value, h = c.length; l < h;) {
                        var u = c.charAt(l);
                        if (u == o) { if (0 == (r -= 1)) return { row: s.getCurrentTokenRow(), column: l + s.getCurrentTokenColumn() } } else u == e && (r += 1);
                        l += 1
                    }
                    for (;
                        (a = s.stepForward()) && !n.test(a.type););
                    if (null == a) break;
                    l = 0
                }
                return null
            }
        }
    }
}), ace.define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./lib/lang"),
        r = e("./config"),
        s = e("./lib/event_emitter").EventEmitter,
        a = e("./selection").Selection,
        l = e("./mode/text").Mode,
        c = e("./range").Range,
        h = e("./document").Document,
        u = e("./background_tokenizer").BackgroundTokenizer,
        d = e("./search_highlight").SearchHighlight,
        g = function(e, t) { this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.id = "session" + ++g.$uid, this.$foldData.toString = function() { return this.join("\n") }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof e && e.getLine || (e = new h(e)), this.setDocument(e), this.selection = new a(this), r.resetOptions(this), this.setMode(t), r._signal("session", this) };
    g.$uid = 0,
        function() {
            function e(e) { return !(e < 4352) && (e >= 4352 && e <= 4447 || e >= 4515 && e <= 4519 || e >= 4602 && e <= 4607 || e >= 9001 && e <= 9002 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12283 || e >= 12288 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12589 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12730 || e >= 12736 && e <= 12771 || e >= 12784 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 13054 || e >= 13056 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 55216 && e <= 55238 || e >= 55243 && e <= 55291 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510) }
            i.implement(this, s), this.setDocument = function(e) { this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches() }, this.getDocument = function() { return this.doc }, this.$resetRowCache = function(e) {
                if (!e) return this.$docRowCache = [], void(this.$screenRowCache = []);
                var t = this.$docRowCache.length,
                    n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
                t > n && (this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t))
            }, this.$getRowCacheIndex = function(e, t) {
                for (var n = 0, i = e.length - 1; n <= i;) {
                    var o = n + i >> 1,
                        r = e[o];
                    if (t > r) n = o + 1;
                    else {
                        if (!(t < r)) return o;
                        i = o - 1
                    }
                }
                return n - 1
            }, this.resetCaches = function() { this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0) }, this.onChangeFold = function(e) {
                var t = e.data;
                this.$resetRowCache(t.start.row)
            }, this.onChange = function(e) { this.$modified = !0, this.$resetRowCache(e.start.row); var t = this.$updateInternalDataOnChange(e);!this.$fromUndo && this.$undoManager && !e.ignore && (this.$deltasDoc.push(e), t && 0 != t.length && this.$deltasFold.push({ action: "removeFolds", folds: t }), this.$informUndoManager.schedule()), this.bgTokenizer && this.bgTokenizer.$updateOnChange(e), this._signal("change", e) }, this.setValue = function(e) { this.doc.setValue(e), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.setUndoManager(this.$undoManager), this.getUndoManager().reset() }, this.getValue = this.toString = function() { return this.doc.getValue() }, this.getSelection = function() { return this.selection }, this.getState = function(e) { return this.bgTokenizer.getState(e) }, this.getTokens = function(e) { return this.bgTokenizer.getTokens(e) }, this.getTokenAt = function(e, t) {
                var n, i = this.bgTokenizer.getTokens(e),
                    o = 0;
                if (null == t) r = i.length - 1, o = this.getLine(e).length;
                else
                    for (var r = 0; r < i.length && !((o += i[r].value.length) >= t); r++);
                return (n = i[r]) ? (n.index = r, n.start = o - n.value.length, n) : null
            }, this.setUndoManager = function(e) {
                if (this.$undoManager = e, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel(), e) {
                    var t = this;
                    this.$syncInformUndoManager = function() { t.$informUndoManager.cancel(), t.$deltasFold.length && (t.$deltas.push({ group: "fold", deltas: t.$deltasFold }), t.$deltasFold = []), t.$deltasDoc.length && (t.$deltas.push({ group: "doc", deltas: t.$deltasDoc }), t.$deltasDoc = []), t.$deltas.length > 0 && e.execute({ action: "aceupdate", args: [t.$deltas, t], merge: t.mergeUndoDeltas }), t.mergeUndoDeltas = !1, t.$deltas = [] }, this.$informUndoManager = o.delayedCall(this.$syncInformUndoManager)
                }
            }, this.markUndoGroup = function() { this.$syncInformUndoManager && this.$syncInformUndoManager() }, this.$defaultUndoManager = { undo: function() {}, redo: function() {}, reset: function() {} }, this.getUndoManager = function() { return this.$undoManager || this.$defaultUndoManager }, this.getTabString = function() { return this.getUseSoftTabs() ? o.stringRepeat(" ", this.getTabSize()) : "\t" }, this.setUseSoftTabs = function(e) { this.setOption("useSoftTabs", e) }, this.getUseSoftTabs = function() { return this.$useSoftTabs && !this.$mode.$indentWithTabs }, this.setTabSize = function(e) { this.setOption("tabSize", e) }, this.getTabSize = function() { return this.$tabSize }, this.isTabStop = function(e) { return this.$useSoftTabs && e.column % this.$tabSize == 0 }, this.setNavigateWithinSoftTabs = function(e) { this.setOption("navigateWithinSoftTabs", e) }, this.getNavigateWithinSoftTabs = function() { return this.$navigateWithinSoftTabs }, this.$overwrite = !1, this.setOverwrite = function(e) { this.setOption("overwrite", e) }, this.getOverwrite = function() { return this.$overwrite }, this.toggleOverwrite = function() { this.setOverwrite(!this.$overwrite) }, this.addGutterDecoration = function(e, t) { this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._signal("changeBreakpoint", {}) }, this.removeGutterDecoration = function(e, t) { this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._signal("changeBreakpoint", {}) }, this.getBreakpoints = function() { return this.$breakpoints }, this.setBreakpoints = function(e) {
                this.$breakpoints = [];
                for (var t = 0; t < e.length; t++) this.$breakpoints[e[t]] = "ace_breakpoint";
                this._signal("changeBreakpoint", {})
            }, this.clearBreakpoints = function() { this.$breakpoints = [], this._signal("changeBreakpoint", {}) }, this.setBreakpoint = function(e, t) { void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._signal("changeBreakpoint", {}) }, this.clearBreakpoint = function(e) { delete this.$breakpoints[e], this._signal("changeBreakpoint", {}) }, this.addMarker = function(e, t, n, i) {
                var o = this.$markerId++,
                    r = { range: e, type: n || "line", renderer: "function" == typeof n ? n : null, clazz: t, inFront: !!i, id: o };
                return i ? (this.$frontMarkers[o] = r, this._signal("changeFrontMarker")) : (this.$backMarkers[o] = r, this._signal("changeBackMarker")), o
            }, this.addDynamicMarker = function(e, t) { if (e.update) { var n = this.$markerId++; return e.id = n, e.inFront = !!t, t ? (this.$frontMarkers[n] = e, this._signal("changeFrontMarker")) : (this.$backMarkers[n] = e, this._signal("changeBackMarker")), e } }, this.removeMarker = function(e) {
                var t = this.$frontMarkers[e] || this.$backMarkers[e];
                if (t) {
                    var n = t.inFront ? this.$frontMarkers : this.$backMarkers;
                    t && (delete n[e], this._signal(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
                }
            }, this.getMarkers = function(e) { return e ? this.$frontMarkers : this.$backMarkers }, this.highlight = function(e) {
                if (!this.$searchHighlight) {
                    var t = new d(null, "ace_selected-word", "text");
                    this.$searchHighlight = this.addDynamicMarker(t)
                }
                this.$searchHighlight.setRegexp(e)
            }, this.highlightLines = function(e, t, n, i) { "number" != typeof t && (n = t, t = e), n || (n = "ace_step"); var o = new c(e, 0, t, 1 / 0); return o.id = this.addMarker(o, n, "fullLine", i), o }, this.setAnnotations = function(e) { this.$annotations = e, this._signal("changeAnnotation", {}) }, this.getAnnotations = function() { return this.$annotations || [] }, this.clearAnnotations = function() { this.setAnnotations([]) }, this.$detectNewLine = function(e) {
                var t = e.match(/^.*?(\r?\n)/m);
                this.$autoNewLine = t ? t[1] : "\n"
            }, this.getWordRange = function(e, t) {
                var n = this.getLine(e),
                    i = !1;
                if (t > 0 && (i = !!n.charAt(t - 1).match(this.tokenRe)), i || (i = !!n.charAt(t).match(this.tokenRe)), i) var o = this.tokenRe;
                else if (/^\s+$/.test(n.slice(t - 1, t + 1))) o = /\s/;
                else o = this.nonTokenRe;
                var r = t;
                if (r > 0) {
                    for (; --r >= 0 && n.charAt(r).match(o););
                    r++
                }
                for (var s = t; s < n.length && n.charAt(s).match(o);) s++;
                return new c(e, r, e, s)
            }, this.getAWordRange = function(e, t) { for (var n = this.getWordRange(e, t), i = this.getLine(n.end.row); i.charAt(n.end.column).match(/[ \t]/);) n.end.column += 1; return n }, this.setNewLineMode = function(e) { this.doc.setNewLineMode(e) }, this.getNewLineMode = function() { return this.doc.getNewLineMode() }, this.setUseWorker = function(e) { this.setOption("useWorker", e) }, this.getUseWorker = function() { return this.$useWorker }, this.onReloadTokenizer = function(e) {
                var t = e.data;
                this.bgTokenizer.start(t.first), this._signal("tokenizerUpdate", e)
            }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function(e, t) {
                if (e && "object" == typeof e) {
                    if (e.getTokenizer) return this.$onChangeMode(e);
                    var n = e,
                        i = n.path
                } else i = e || "ace/mode/text";
                if (this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new l), this.$modes[i] && !n) return this.$onChangeMode(this.$modes[i]), void(t && t());
                this.$modeId = i, r.loadModule(["mode", i], function(e) {
                    if (this.$modeId !== i) return t && t();
                    this.$modes[i] && !n ? this.$onChangeMode(this.$modes[i]) : e && e.Mode && (e = new e.Mode(n), n || (this.$modes[i] = e, e.$id = i), this.$onChangeMode(e)), t && t()
                }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0)
            }, this.$onChangeMode = function(e, t) {
                if (t || (this.$modeId = e.$id), this.$mode !== e) {
                    this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
                    var n = e.getTokenizer();
                    if (void 0 !== n.addEventListener) {
                        var i = this.onReloadTokenizer.bind(this);
                        n.addEventListener("update", i)
                    }
                    if (this.bgTokenizer) this.bgTokenizer.setTokenizer(n);
                    else {
                        this.bgTokenizer = new u(n);
                        var o = this;
                        this.bgTokenizer.addEventListener("update", function(e) { o._signal("tokenizerUpdate", e) })
                    }
                    this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (e.attachToSession && e.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(e.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode"))
                }
            }, this.$stopWorker = function() { this.$worker && (this.$worker.terminate(), this.$worker = null) }, this.$startWorker = function() { try { this.$worker = this.$mode.createWorker(this) } catch (e) { r.warn("Could not load worker", e), this.$worker = null } }, this.getMode = function() { return this.$mode }, this.$scrollTop = 0, this.setScrollTop = function(e) { this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e)) }, this.getScrollTop = function() { return this.$scrollTop }, this.$scrollLeft = 0, this.setScrollLeft = function(e) { this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e)) }, this.getScrollLeft = function() { return this.$scrollLeft }, this.getScreenWidth = function() { return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth }, this.getLineWidgetMaxWidth = function() { if (null != this.lineWidgetsWidth) return this.lineWidgetsWidth; var e = 0; return this.lineWidgets.forEach(function(t) { t && t.screenWidth > e && (e = t.screenWidth) }), this.lineWidgetWidth = e }, this.$computeWidth = function(e) {
                if (this.$modified || e) {
                    if (this.$modified = !1, this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
                    for (var t = this.doc.getAllLines(), n = this.$rowLengthCache, i = 0, o = 0, r = this.$foldData[o], s = r ? r.start.row : 1 / 0, a = t.length, l = 0; l < a; l++) {
                        if (l > s) {
                            if ((l = r.end.row + 1) >= a) break;
                            s = (r = this.$foldData[o++]) ? r.start.row : 1 / 0
                        }
                        null == n[l] && (n[l] = this.$getStringScreenWidth(t[l])[0]), n[l] > i && (i = n[l])
                    }
                    this.screenWidth = i
                }
            }, this.getLine = function(e) { return this.doc.getLine(e) }, this.getLines = function(e, t) { return this.doc.getLines(e, t) }, this.getLength = function() { return this.doc.getLength() }, this.getTextRange = function(e) { return this.doc.getTextRange(e || this.selection.getRange()) }, this.insert = function(e, t) { return this.doc.insert(e, t) }, this.remove = function(e) { return this.doc.remove(e) }, this.removeFullLines = function(e, t) { return this.doc.removeFullLines(e, t) }, this.undoChanges = function(e, t) { if (e.length) { this.$fromUndo = !0; for (var n = null, i = e.length - 1; - 1 != i; i--) { var o = e[i]; "doc" == o.group ? (this.doc.revertDeltas(o.deltas), n = this.$getUndoSelection(o.deltas, !0, n)) : o.deltas.forEach(function(e) { this.addFolds(e.folds) }, this) } return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), n } }, this.redoChanges = function(e, t) { if (e.length) { this.$fromUndo = !0; for (var n = null, i = 0; i < e.length; i++) { var o = e[i]; "doc" == o.group && (this.doc.applyDeltas(o.deltas), n = this.$getUndoSelection(o.deltas, !1, n)) } return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), n } }, this.setUndoSelect = function(e) { this.$undoSelect = e }, this.$getUndoSelection = function(e, t, n) {
                function i(e) { return t ? "insert" !== e.action : "insert" === e.action }
                var o, r, s = e[0];
                i(s) ? o = c.fromPoints(s.start, s.end) : o = c.fromPoints(s.start, s.start);
                for (var a = 1; a < e.length; a++) i(s = e[a]) ? (r = s.start, -1 == o.compare(r.row, r.column) && o.setStart(r), r = s.end, 1 == o.compare(r.row, r.column) && o.setEnd(r), !0) : (r = s.start, -1 == o.compare(r.row, r.column) && (o = c.fromPoints(s.start, s.start)), !1);
                if (null != n) {
                    0 === c.comparePoints(n.start, o.start) && (n.start.column += o.end.column - o.start.column, n.end.column += o.end.column - o.start.column);
                    var l = n.compareRange(o);
                    1 == l ? o.setStart(n.start) : -1 == l && o.setEnd(n.end)
                }
                return o
            }, this.replace = function(e, t) { return this.doc.replace(e, t) }, this.moveText = function(e, t, n) {
                var i = this.getTextRange(e),
                    o = this.getFoldsInRange(e),
                    r = c.fromPoints(t, t);
                if (!n) {
                    this.remove(e);
                    var s = e.start.row - e.end.row;
                    (h = s ? -e.end.column : e.start.column - e.end.column) && (r.start.row == e.end.row && r.start.column > e.end.column && (r.start.column += h), r.end.row == e.end.row && r.end.column > e.end.column && (r.end.column += h)), s && r.start.row >= e.end.row && (r.start.row += s, r.end.row += s)
                }
                if (r.end = this.insert(r.start, i), o.length) {
                    var a = e.start,
                        l = r.start,
                        h = (s = l.row - a.row, l.column - a.column);
                    this.addFolds(o.map(function(e) { return (e = e.clone()).start.row == a.row && (e.start.column += h), e.end.row == a.row && (e.end.column += h), e.start.row += s, e.end.row += s, e }))
                }
                return r
            }, this.indentRows = function(e, t, n) { n = n.replace(/\t/g, this.getTabString()); for (var i = e; i <= t; i++) this.doc.insertInLine({ row: i, column: 0 }, n) }, this.outdentRows = function(e) {
                for (var t = e.collapseRows(), n = new c(0, 0, 0, 0), i = this.getTabSize(), o = t.start.row; o <= t.end.row; ++o) {
                    var r = this.getLine(o);
                    n.start.row = o, n.end.row = o;
                    for (var s = 0; s < i && " " == r.charAt(s); ++s);
                    s < i && "\t" == r.charAt(s) ? (n.start.column = s, n.end.column = s + 1) : (n.start.column = 0, n.end.column = s), this.remove(n)
                }
            }, this.$moveLines = function(e, t, n) {
                if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), n < 0) { if ((o = this.getRowFoldStart(e + n)) < 0) return 0; var i = o - e } else if (n > 0) {
                    var o;
                    if ((o = this.getRowFoldEnd(t + n)) > this.doc.getLength() - 1) return 0;
                    i = o - t
                } else {
                    e = this.$clipRowToDocument(e);
                    i = (t = this.$clipRowToDocument(t)) - e + 1
                }
                var r = new c(e, 0, t, Number.MAX_VALUE),
                    s = this.getFoldsInRange(r).map(function(e) { return (e = e.clone()).start.row += i, e.end.row += i, e }),
                    a = 0 == n ? this.doc.getLines(e, t) : this.doc.removeFullLines(e, t);
                return this.doc.insertFullLines(e + i, a), s.length && this.addFolds(s), i
            }, this.moveLinesUp = function(e, t) { return this.$moveLines(e, t, -1) }, this.moveLinesDown = function(e, t) { return this.$moveLines(e, t, 1) }, this.duplicateLines = function(e, t) { return this.$moveLines(e, t, 0) }, this.$clipRowToDocument = function(e) { return Math.max(0, Math.min(e, this.doc.getLength() - 1)) }, this.$clipColumnToRow = function(e, t) { return t < 0 ? 0 : Math.min(this.doc.getLine(e).length, t) }, this.$clipPositionToDocument = function(e, t) {
                if (t = Math.max(0, t), e < 0) e = 0, t = 0;
                else {
                    var n = this.doc.getLength();
                    e >= n ? (e = n - 1, t = this.doc.getLine(n - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
                }
                return { row: e, column: t }
            }, this.$clipRangeToDocument = function(e) { e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column); var t = this.doc.getLength() - 1; return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = { min: null, max: null }, this.setUseWrapMode = function(e) {
                if (e != this.$useWrapMode) {
                    if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
                        var t = this.getLength();
                        this.$wrapData = Array(t), this.$updateWrapData(0, t - 1)
                    }
                    this._signal("changeWrapMode")
                }
            }, this.getUseWrapMode = function() { return this.$useWrapMode }, this.setWrapLimitRange = function(e, t) { this.$wrapLimitRange.min === e && this.$wrapLimitRange.max === t || (this.$wrapLimitRange = { min: e, max: t }, this.$modified = !0, this.$useWrapMode && this._signal("changeWrapMode")) }, this.adjustWrapLimit = function(e, t) {
                var n = this.$wrapLimitRange;
                n.max < 0 && (n = { min: t, max: t });
                var i = this.$constrainWrapLimit(e, n.min, n.max);
                return i != this.$wrapLimit && i > 1 && (this.$wrapLimit = i, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), !0)
            }, this.$constrainWrapLimit = function(e, t, n) { return t && (e = Math.max(t, e)), n && (e = Math.min(n, e)), e }, this.getWrapLimit = function() { return this.$wrapLimit }, this.setWrapLimit = function(e) { this.setWrapLimitRange(e, e) }, this.getWrapLimitRange = function() { return { min: this.$wrapLimitRange.min, max: this.$wrapLimitRange.max } }, this.$updateInternalDataOnChange = function(e) {
                var t = this.$useWrapMode,
                    n = e.action,
                    i = e.start,
                    o = e.end,
                    r = i.row,
                    s = o.row,
                    a = s - r,
                    l = null;
                if (this.$updating = !0, 0 != a)
                    if ("remove" === n) {
                        this[t ? "$wrapData" : "$rowLengthCache"].splice(r, a);
                        var c = this.$foldData;
                        l = this.getFoldsInRange(e), this.removeFolds(l);
                        var h = 0;
                        if (p = this.getFoldLine(o.row)) {
                            p.addRemoveChars(o.row, o.column, i.column - o.column), p.shiftRow(-a);
                            var u = this.getFoldLine(r);
                            u && u !== p && (u.merge(p), p = u), h = c.indexOf(p) + 1
                        }
                        for (; h < c.length; h++) {
                            (p = c[h]).start.row >= o.row && p.shiftRow(-a)
                        }
                        s = r
                    } else {
                        var d = Array(a);
                        d.unshift(r, 0);
                        var g = t ? this.$wrapData : this.$rowLengthCache;
                        g.splice.apply(g, d);
                        c = this.$foldData, h = 0;
                        if (p = this.getFoldLine(r)) {
                            var f = p.range.compareInside(i.row, i.column);
                            0 == f ? (p = p.split(i.row, i.column)) && (p.shiftRow(a), p.addRemoveChars(s, 0, o.column - i.column)) : -1 == f && (p.addRemoveChars(r, 0, o.column - i.column), p.shiftRow(a)), h = c.indexOf(p) + 1
                        }
                        for (; h < c.length; h++) {
                            var p;
                            (p = c[h]).start.row >= r && p.shiftRow(a)
                        }
                    }
                else a = Math.abs(e.start.column - e.end.column), "remove" === n && (l = this.getFoldsInRange(e), this.removeFolds(l), a = -a), (p = this.getFoldLine(r)) && p.addRemoveChars(r, i.column, a);
                return t && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, t ? this.$updateWrapData(r, s) : this.$updateRowLengthCache(r, s), l
            }, this.$updateRowLengthCache = function(e, t, n) { this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null }, this.$updateWrapData = function(e, i) {
                var o, r, s = this.doc.getAllLines(),
                    a = this.getTabSize(),
                    l = this.$wrapData,
                    c = this.$wrapLimit,
                    h = e;
                for (i = Math.min(i, s.length - 1); h <= i;)(r = this.getFoldLine(h, r)) ? (o = [], r.walk(function(e, i, r, a) {
                    var l;
                    if (null != e) {
                        (l = this.$getDisplayTokens(e, o.length))[0] = t;
                        for (var c = 1; c < l.length; c++) l[c] = n
                    } else l = this.$getDisplayTokens(s[i].substring(a, r), o.length);
                    o = o.concat(l)
                }.bind(this), r.end.row, s[r.end.row].length + 1), l[r.start.row] = this.$computeWrapSplits(o, c, a), h = r.end.row + 1) : (o = this.$getDisplayTokens(s[h]), l[h] = this.$computeWrapSplits(o, c, a), h++)
            };
            var t = 3,
                n = 4,
                a = 10,
                h = 11,
                g = 12;
            this.$computeWrapSplits = function(e, i, o) {
                function r(t) {
                    var n = e.slice(c, t),
                        i = n.length;
                    n.join("").replace(/12/g, function() { i -= 1 }).replace(/2/g, function() { i -= 1 }), s.length || (m = function() {
                        var t = 0;
                        if (0 === p) return t;
                        if (f)
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                if (i == a) t += 1;
                                else {
                                    if (i != h) { if (i == g) continue; break }
                                    t += o
                                }
                            }
                        return d && !1 !== f && (t += o), Math.min(t, p)
                    }(), s.indent = m), u += i, s.push(u), c = t
                }
                if (0 == e.length) return [];
                for (var s = [], l = e.length, c = 0, u = 0, d = this.$wrapAsCode, f = this.$indentedSoftWrap, p = i <= Math.max(2 * o, 8) || !1 === f ? 0 : Math.floor(i / 2), m = 0; l - c > i - m;) {
                    var v = c + i - m;
                    if (e[v - 1] >= a && e[v] >= a) r(v);
                    else if (e[v] != t && e[v] != n) {
                        for (var w = Math.max(v - (i - (i >> 2)), c - 1); v > w && e[v] < t;) v--;
                        if (d) { for (; v > w && e[v] < t;) v--; for (; v > w && 9 == e[v];) v-- } else
                            for (; v > w && e[v] < a;) v--;
                        v > w ? r(++v) : (2 == e[v = c + i] && v--, r(v - m))
                    } else {
                        for (; v != c - 1 && e[v] != t; v--);
                        if (v > c) { r(v); continue }
                        for (v = c + i; v < e.length && e[v] == n; v++);
                        if (v == e.length) break;
                        r(v)
                    }
                }
                return s
            }, this.$getDisplayTokens = function(t, n) {
                var i, o = [];
                n = n || 0;
                for (var r = 0; r < t.length; r++) { var s = t.charCodeAt(r); if (9 == s) { i = this.getScreenTabSize(o.length + n), o.push(h); for (var l = 1; l < i; l++) o.push(g) } else 32 == s ? o.push(a) : s > 39 && s < 48 || s > 57 && s < 64 ? o.push(9) : s >= 4352 && e(s) ? o.push(1, 2) : o.push(1) }
                return o
            }, this.$getStringScreenWidth = function(t, n, i) { if (0 == n) return [0, 0]; var o, r; for (null == n && (n = 1 / 0), i = i || 0, r = 0; r < t.length && (9 == (o = t.charCodeAt(r)) ? i += this.getScreenTabSize(i) : o >= 4352 && e(o) ? i += 2 : i += 1, !(i > n)); r++); return [i, r] }, this.lineWidgets = null, this.getRowLength = function(e) {
                if (this.lineWidgets) var t = this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0;
                else t = 0;
                return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
            }, this.getRowLineCount = function(e) { return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1 }, this.getRowWrapIndent = function(e) {
                if (this.$useWrapMode) {
                    var t = this.screenToDocumentPosition(e, Number.MAX_VALUE),
                        n = this.$wrapData[t.row];
                    return n.length && n[0] < t.column ? n.indent : 0
                }
                return 0
            }, this.getScreenLastRowColumn = function(e) { var t = this.screenToDocumentPosition(e, Number.MAX_VALUE); return this.documentToScreenColumn(t.row, t.column) }, this.getDocumentLastRowColumn = function(e, t) { var n = this.documentToScreenRow(e, t); return this.getScreenLastRowColumn(n) }, this.getDocumentLastRowColumnPosition = function(e, t) { var n = this.documentToScreenRow(e, t); return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10) }, this.getRowSplitData = function(e) { return this.$useWrapMode ? this.$wrapData[e] : void 0 }, this.getScreenTabSize = function(e) { return this.$tabSize - e % this.$tabSize }, this.screenToDocumentRow = function(e, t) { return this.screenToDocumentPosition(e, t).row }, this.screenToDocumentColumn = function(e, t) { return this.screenToDocumentPosition(e, t).column }, this.screenToDocumentPosition = function(e, t) {
                if (e < 0) return { row: 0, column: 0 };
                var n, i, o = 0,
                    r = 0,
                    s = 0,
                    a = 0,
                    l = this.$screenRowCache,
                    c = this.$getRowCacheIndex(l, e),
                    h = l.length;
                if (h && c >= 0) { s = l[c], o = this.$docRowCache[c]; var u = e > l[h - 1] } else u = !h;
                for (var d = this.getLength() - 1, g = this.getNextFoldLine(o), f = g ? g.start.row : 1 / 0; s <= e && !(s + (a = this.getRowLength(o)) > e || o >= d);) s += a, ++o > f && (o = g.end.row + 1, f = (g = this.getNextFoldLine(o, g)) ? g.start.row : 1 / 0), u && (this.$docRowCache.push(o), this.$screenRowCache.push(s));
                if (g && g.start.row <= o) n = this.getFoldDisplayLine(g), o = g.start.row;
                else {
                    if (s + a <= e || o > d) return { row: d, column: this.getLine(d).length };
                    n = this.getLine(o), g = null
                }
                var p = 0;
                if (this.$useWrapMode) {
                    var m = this.$wrapData[o];
                    if (m) {
                        var v = Math.floor(e - s);
                        i = m[v], v > 0 && m.length && (p = m.indent, r = m[v - 1] || m[m.length - 1], n = n.substring(r))
                    }
                }
                return r += this.$getStringScreenWidth(n, t - p)[1], this.$useWrapMode && r >= i && (r = i - 1), g ? g.idxToPosition(r) : { row: o, column: r }
            }, this.documentToScreenPosition = function(e, t) {
                if (void 0 === t) var n = this.$clipPositionToDocument(e.row, e.column);
                else n = this.$clipPositionToDocument(e, t);
                e = n.row, t = n.column;
                var i, o = 0,
                    r = null;
                (i = this.getFoldAt(e, t, 1)) && (e = i.start.row, t = i.start.column);
                var s, a = 0,
                    l = this.$docRowCache,
                    c = this.$getRowCacheIndex(l, e),
                    h = l.length;
                if (h && c >= 0) { a = l[c], o = this.$screenRowCache[c]; var u = e > l[h - 1] } else u = !h;
                for (var d = this.getNextFoldLine(a), g = d ? d.start.row : 1 / 0; a < e;) {
                    if (a >= g) {
                        if ((s = d.end.row + 1) > e) break;
                        g = (d = this.getNextFoldLine(s, d)) ? d.start.row : 1 / 0
                    } else s = a + 1;
                    o += this.getRowLength(a), a = s, u && (this.$docRowCache.push(a), this.$screenRowCache.push(o))
                }
                var f = "";
                d && a >= g ? (f = this.getFoldDisplayLine(d, e, t), r = d.start.row) : (f = this.getLine(e).substring(0, t), r = e);
                var p = 0;
                if (this.$useWrapMode) {
                    var m = this.$wrapData[r];
                    if (m) {
                        for (var v = 0; f.length >= m[v];) o++, v++;
                        f = f.substring(m[v - 1] || 0, f.length), p = v > 0 ? m.indent : 0
                    }
                }
                return { row: o, column: p + this.$getStringScreenWidth(f)[0] }
            }, this.documentToScreenColumn = function(e, t) { return this.documentToScreenPosition(e, t).column }, this.documentToScreenRow = function(e, t) { return this.documentToScreenPosition(e, t).row }, this.getScreenLength = function() {
                var e = 0,
                    t = null;
                if (this.$useWrapMode)
                    for (var n = this.$wrapData.length, i = 0, o = (a = 0, (t = this.$foldData[a++]) ? t.start.row : 1 / 0); i < n;) {
                        var r = this.$wrapData[i];
                        e += r ? r.length + 1 : 1, ++i > o && (i = t.end.row + 1, o = (t = this.$foldData[a++]) ? t.start.row : 1 / 0)
                    } else { e = this.getLength(); for (var s = this.$foldData, a = 0; a < s.length; a++) e -= (t = s[a]).end.row - t.start.row }
                return this.lineWidgets && (e += this.$getWidgetScreenLength()), e
            }, this.$setFontMetrics = function(e) { this.$enableVarChar && (this.$getStringScreenWidth = function(t, n, i) { if (0 === n) return [0, 0]; var o, r; for (n || (n = 1 / 0), i = i || 0, r = 0; r < t.length && !((i += "\t" === (o = t.charAt(r)) ? this.getScreenTabSize(i) : e.getCharacterWidth(o)) > n); r++); return [i, r] }) }, this.destroy = function() { this.bgTokenizer && (this.bgTokenizer.setDocument(null), this.bgTokenizer = null), this.$stopWorker() }
        }.call(g.prototype), e("./edit_session/folding").Folding.call(g.prototype), e("./edit_session/bracket_match").BracketMatch.call(g.prototype), r.defineOptions(g.prototype, "session", {
            wrap: {
                set: function(e) {
                    if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e)
                        if (this.$wrap = e, e) {
                            var t = "number" == typeof e ? e : null;
                            this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
                        } else this.setUseWrapMode(!1)
                },
                get: function() { return this.getUseWrapMode() ? -1 == this.$wrap ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off" },
                handlesSet: !0
            },
            wrapMethod: {
                set: function(e) {
                    (e = "auto" == e ? "text" != this.$mode.type : "text" != e) != this.$wrapAsCode && (this.$wrapAsCode = e, this.$useWrapMode && (this.$modified = !0, this.$resetRowCache(0), this.$updateWrapData(0, this.getLength() - 1)))
                },
                initialValue: "auto"
            },
            indentedSoftWrap: { initialValue: !0 },
            firstLineNumber: { set: function() { this._signal("changeBreakpoint") }, initialValue: 1 },
            useWorker: { set: function(e) { this.$useWorker = e, this.$stopWorker(), e && this.$startWorker() }, initialValue: !0 },
            useSoftTabs: { initialValue: !0 },
            tabSize: { set: function(e) { isNaN(e) || this.$tabSize === e || (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._signal("changeTabSize")) }, initialValue: 4, handlesSet: !0 },
            navigateWithinSoftTabs: { initialValue: !1 },
            overwrite: { set: function(e) { this._signal("changeOverwrite") }, initialValue: !1 },
            newLineMode: { set: function(e) { this.doc.setNewLineMode(e) }, get: function() { return this.doc.getNewLineMode() }, handlesSet: !0 },
            mode: { set: function(e) { this.setMode(e) }, get: function() { return this.$modeId } }
        }), t.EditSession = g
}), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("./lib/lang"),
        o = e("./lib/oop"),
        r = e("./range").Range,
        s = function() { this.$options = {} };
    (function() {
        this.set = function(e) { return o.mixin(this.$options, e), this }, this.getOptions = function() { return i.copyObject(this.$options) }, this.setOptions = function(e) { this.$options = e }, this.find = function(e) {
            var t = this.$options,
                n = this.$matchIterator(e, t);
            if (!n) return !1;
            var i = null;
            return n.forEach(function(e, n, o, s) { return i = new r(e, n, o, s), !(n == s && t.start && t.start.start && 0 != t.skipCurrent && i.isEqual(t.start)) || (i = null, !1) }), i
        }, this.findAll = function(e) {
            var t = this.$options;
            if (!t.needle) return [];
            this.$assembleRegExp(t);
            var n = t.range,
                o = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines(),
                s = [],
                a = t.re;
            if (t.$isMultiLine) {
                var l, c = a.length,
                    h = o.length - c;
                e: for (var u = a.offset || 0; u <= h; u++) {
                    for (var d = 0; d < c; d++)
                        if (-1 == o[u + d].search(a[d])) continue e;
                    var g = o[u],
                        f = o[u + c - 1],
                        p = g.length - g.match(a[0])[0].length,
                        m = f.match(a[c - 1])[0].length;
                    l && l.end.row === u && l.end.column > p || (s.push(l = new r(u, p, u + c - 1, m)), c > 2 && (u = u + c - 2))
                }
            } else
                for (var v = 0; v < o.length; v++) {
                    var w = i.getMatchOffsets(o[v], a);
                    for (d = 0; d < w.length; d++) {
                        var A = w[d];
                        s.push(new r(v, A.offset, v, A.offset + A.length))
                    }
                }
            if (n) {
                var C = n.start.column,
                    b = n.start.column;
                for (v = 0, d = s.length - 1; v < d && s[v].start.column < C && s[v].start.row == n.start.row;) v++;
                for (; v < d && s[d].end.column > b && s[d].end.row == n.end.row;) d--;
                for (s = s.slice(v, d + 1), v = 0, d = s.length; v < d; v++) s[v].start.row += n.start.row, s[v].end.row += n.start.row
            }
            return s
        }, this.replace = function(e, t) {
            var n = this.$options,
                i = this.$assembleRegExp(n);
            if (n.$isMultiLine) return t;
            if (i) {
                var o = i.exec(e);
                if (!o || o[0].length != e.length) return null;
                if (t = e.replace(i, t), n.preserveCase) {
                    t = t.split("");
                    for (var r = Math.min(e.length, e.length); r--;) {
                        var s = e[r];
                        s && s.toLowerCase() != s ? t[r] = t[r].toUpperCase() : t[r] = t[r].toLowerCase()
                    }
                    t = t.join("")
                }
                return t
            }
        }, this.$assembleRegExp = function(e, t) {
            if (e.needle instanceof RegExp) return e.re = e.needle;
            var n = e.needle;
            if (!e.needle) return e.re = !1;
            e.regExp || (n = i.escapeRegExp(n)), e.wholeWord && (n = function(e, t) {
                function n(e) { return /\w/.test(e) || t.regExp ? "\\b" : "" }
                return n(e[0]) + e + n(e[e.length - 1])
            }(n, e));
            var o = e.caseSensitive ? "gm" : "gmi";
            if (e.$isMultiLine = !t && /[\n\r]/.test(n), e.$isMultiLine) return e.re = this.$assembleMultilineRegExp(n, o);
            try { var r = new RegExp(n, o) } catch (e) { r = !1 }
            return e.re = r
        }, this.$assembleMultilineRegExp = function(e, t) {
            for (var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), i = [], o = 0; o < n.length; o++) try { i.push(new RegExp(n[o], t)) } catch (e) { return !1 }
            return i
        }, this.$matchIterator = function(e, t) {
            var n = this.$assembleRegExp(t);
            if (!n) return !1;
            var i = 1 == t.backwards,
                o = 0 != t.skipCurrent,
                r = t.range,
                s = t.start;
            s || (s = r ? r[i ? "end" : "start"] : e.selection.getRange()), s.start && (s = s[o != i ? "end" : "start"]);
            var a = r ? r.start.row : 0,
                l = r ? r.end.row : e.getLength() - 1;
            if (i) var c = function(e) {
                var n = s.row;
                if (!u(n, s.column, e)) {
                    for (n--; n >= a; n--)
                        if (u(n, Number.MAX_VALUE, e)) return;
                    if (0 != t.wrap)
                        for (n = l, a = s.row; n >= a; n--)
                            if (u(n, Number.MAX_VALUE, e)) return
                }
            };
            else c = function(e) {
                var n = s.row;
                if (!u(n, s.column, e)) {
                    for (n += 1; n <= l; n++)
                        if (u(n, 0, e)) return;
                    if (0 != t.wrap)
                        for (n = a, l = s.row; n <= l; n++)
                            if (u(n, 0, e)) return
                }
            };
            if (t.$isMultiLine) var h = n.length,
                u = function(t, o, r) {
                    var s = i ? t - h + 1 : t;
                    if (!(s < 0)) {
                        var a = e.getLine(s),
                            l = a.search(n[0]);
                        if (!(!i && l < o || -1 === l)) {
                            for (var c = 1; c < h; c++)
                                if (-1 == (a = e.getLine(s + c)).search(n[c])) return;
                            var u = a.match(n[h - 1])[0].length;
                            if (!(i && u > o)) return !!r(s, l, s + h - 1, u) || void 0
                        }
                    }
                };
            else if (i) u = function(t, i, o) {
                var r, s = e.getLine(t),
                    a = [],
                    l = 0;
                for (n.lastIndex = 0; r = n.exec(s);) {
                    var c = r[0].length;
                    if (l = r.index, !c) {
                        if (l >= s.length) break;
                        n.lastIndex = l += 1
                    }
                    if (r.index + c > i) break;
                    a.push(r.index, c)
                }
                for (var h = a.length - 1; h >= 0; h -= 2) { var u = a[h - 1]; if (o(t, u, t, u + (c = a[h]))) return !0 }
            };
            else u = function(t, i, o) {
                var r, s = e.getLine(t),
                    a = i;
                for (n.lastIndex = i; r = n.exec(s);) { var l = r[0].length; if (o(t, a = r.index, t, a + l)) return !0; if (!l && (n.lastIndex = a += 1, a >= s.length)) return !1 }
            };
            return { forEach: c }
        }
    }).call(s.prototype), t.Search = s
}), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(e, t, n) {
    "use strict";

    function i(e, t) { this.platform = t || (s.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(e), this.$singleCommand = !0 }

    function o(e, t) { i.call(this, e, t), this.$singleCommand = !1 }
    var r = e("../lib/keys"),
        s = e("../lib/useragent"),
        a = r.KEY_MODS;
    o.prototype = i.prototype,
        function() {
            function e(e) { return "object" == typeof e && e.bindKey && e.bindKey.position || (e.isDefault ? -100 : 0) }
            this.addCommand = function(e) { this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e) }, this.removeCommand = function(e, t) {
                var n = e && ("string" == typeof e ? e : e.name);
                e = this.commands[n], t || delete this.commands[n];
                var i = this.commandKeyBinding;
                for (var o in i) {
                    var r = i[o];
                    if (r == e) delete i[o];
                    else if (Array.isArray(r)) { var s = r.indexOf(e); - 1 != s && (r.splice(s, 1), 1 == r.length && (i[o] = r[0])) }
                }
            }, this.bindKey = function(e, t, n) {
                if ("object" == typeof e && e && (null == n && (n = e.position), e = e[this.platform]), e) return "function" == typeof t ? this.addCommand({ exec: t, bindKey: e, name: t.name || e }) : void e.split("|").forEach(function(e) {
                    var i = "";
                    if (-1 != e.indexOf(" ")) {
                        var o = e.split(/\s+/);
                        e = o.pop(), o.forEach(function(e) {
                            var t = this.parseKeys(e),
                                n = a[t.hashId] + t.key;
                            i += (i ? " " : "") + n, this._addCommandToBinding(i, "chainKeys")
                        }, this), i += " "
                    }
                    var r = this.parseKeys(e),
                        s = a[r.hashId] + r.key;
                    this._addCommandToBinding(i + s, t, n)
                }, this)
            }, this._addCommandToBinding = function(t, n, i) {
                var o, r = this.commandKeyBinding;
                if (n)
                    if (!r[t] || this.$singleCommand) r[t] = n;
                    else {
                        Array.isArray(r[t]) ? -1 != (o = r[t].indexOf(n)) && r[t].splice(o, 1) : r[t] = [r[t]], "number" != typeof i && (i = e(n));
                        var s = r[t];
                        for (o = 0; o < s.length; o++) { if (e(s[o]) > i) break }
                        s.splice(o, 0, n)
                    }
                else delete r[t]
            }, this.addCommands = function(e) { e && Object.keys(e).forEach(function(t) { var n = e[t]; if (n) { if ("string" == typeof n) return this.bindKey(n, t); "function" == typeof n && (n = { exec: n }), "object" == typeof n && (n.name || (n.name = t), this.addCommand(n)) } }, this) }, this.removeCommands = function(e) { Object.keys(e).forEach(function(t) { this.removeCommand(e[t]) }, this) }, this.bindKeys = function(e) { Object.keys(e).forEach(function(t) { this.bindKey(t, e[t]) }, this) }, this._buildKeyHash = function(e) { this.bindKey(e.bindKey, e) }, this.parseKeys = function(e) {
                var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e) { return e }),
                    n = t.pop(),
                    i = r[n];
                if (r.FUNCTION_KEYS[i]) n = r.FUNCTION_KEYS[i].toLowerCase();
                else { if (!t.length) return { key: n, hashId: -1 }; if (1 == t.length && "shift" == t[0]) return { key: n.toUpperCase(), hashId: -1 } }
                for (var o = 0, s = t.length; s--;) {
                    var a = r.KEY_MODS[t[s]];
                    if (null == a) return "undefined" != typeof console && console.error("invalid modifier " + t[s] + " in " + e), !1;
                    o |= a
                }
                return { key: n, hashId: o }
            }, this.findKeyCommand = function(e, t) { var n = a[e] + t; return this.commandKeyBinding[n] }, this.handleKeyboard = function(e, t, n, i) {
                if (!(i < 0)) {
                    var o = a[t] + n,
                        r = this.commandKeyBinding[o];
                    return e.$keyChain && (e.$keyChain += " " + o, r = this.commandKeyBinding[e.$keyChain] || r), !r || "chainKeys" != r && "chainKeys" != r[r.length - 1] ? (e.$keyChain && (t && 4 != t || 1 != n.length ? (-1 == t || i > 0) && (e.$keyChain = "") : e.$keyChain = e.$keyChain.slice(0, -o.length - 1)), { command: r }) : (e.$keyChain = e.$keyChain || o, { command: "null" })
                }
            }, this.getStatusText = function(e, t) { return t.$keyChain || "" }
        }.call(i.prototype), t.HashHandler = i, t.MultiHashHandler = o
}), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("../keyboard/hash_handler").MultiHashHandler,
        r = e("../lib/event_emitter").EventEmitter,
        s = function(e, t) { o.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", function(e) { return e.command.exec(e.editor, e.args || {}) }) };
    i.inherits(s, o),
        function() {
            i.implement(this, r), this.exec = function(e, t, n) {
                if (Array.isArray(e)) {
                    for (var i = e.length; i--;)
                        if (this.exec(e[i], t, n)) return !0;
                    return !1
                }
                if ("string" == typeof e && (e = this.commands[e]), !e) return !1;
                if (t && t.$readOnly && !e.readOnly) return !1;
                if (e.isAvailable && !e.isAvailable(t)) return !1;
                var o = { editor: t, command: e, args: n };
                return o.returnValue = this._emit("exec", o), this._signal("afterExec", o), !1 !== o.returnValue
            }, this.toggleRecording = function(e) { if (!this.$inReplay) return e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function(e) { this.macro.push([e.command, e.args]) }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0) }, this.replay = function(e) { if (!this.$inReplay && this.macro) { if (this.recording) return this.toggleRecording(e); try { this.$inReplay = !0, this.macro.forEach(function(t) { "string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1]) }, this) } finally { this.$inReplay = !1 } } }, this.trimMacro = function(e) { return e.map(function(e) { return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e }) }
        }.call(s.prototype), t.CommandManager = s
}), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], function(e, t, n) {
    "use strict";

    function i(e, t) { return { win: e, mac: t } }
    var o = e("../lib/lang"),
        r = e("../config"),
        s = e("../range").Range;
    t.commands = [{ name: "showSettingsMenu", bindKey: i("Ctrl-,", "Command-,"), exec: function(e) { r.loadModule("ace/ext/settings_menu", function(t) { t.init(e), e.showSettingsMenu() }) }, readOnly: !0 }, { name: "goToNextError", bindKey: i("Alt-E", "F4"), exec: function(e) { r.loadModule("ace/ext/error_marker", function(t) { t.showErrorMarker(e, 1) }) }, scrollIntoView: "animate", readOnly: !0 }, { name: "goToPreviousError", bindKey: i("Alt-Shift-E", "Shift-F4"), exec: function(e) { r.loadModule("ace/ext/error_marker", function(t) { t.showErrorMarker(e, -1) }) }, scrollIntoView: "animate", readOnly: !0 }, { name: "selectall", bindKey: i("Ctrl-A", "Command-A"), exec: function(e) { e.selectAll() }, readOnly: !0 }, { name: "centerselection", bindKey: i(null, "Ctrl-L"), exec: function(e) { e.centerSelection() }, readOnly: !0 }, {
        name: "gotoline",
        bindKey: i("Ctrl-L", "Command-L"),
        exec: function(e) {
            var t = parseInt(prompt("Enter line number:"), 10);
            isNaN(t) || e.gotoLine(t)
        },
        readOnly: !0
    }, { name: "fold", bindKey: i("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"), exec: function(e) { e.session.toggleFold(!1) }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0 }, { name: "unfold", bindKey: i("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"), exec: function(e) { e.session.toggleFold(!0) }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0 }, { name: "toggleFoldWidget", bindKey: i("F2", "F2"), exec: function(e) { e.session.toggleFoldWidget() }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0 }, { name: "toggleParentFoldWidget", bindKey: i("Alt-F2", "Alt-F2"), exec: function(e) { e.session.toggleFoldWidget(!0) }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0 }, { name: "foldall", bindKey: i(null, "Ctrl-Command-Option-0"), exec: function(e) { e.session.foldAll() }, scrollIntoView: "center", readOnly: !0 }, { name: "foldOther", bindKey: i("Alt-0", "Command-Option-0"), exec: function(e) { e.session.foldAll(), e.session.unfold(e.selection.getAllRanges()) }, scrollIntoView: "center", readOnly: !0 }, { name: "unfoldall", bindKey: i("Alt-Shift-0", "Command-Option-Shift-0"), exec: function(e) { e.session.unfold() }, scrollIntoView: "center", readOnly: !0 }, { name: "findnext", bindKey: i("Ctrl-K", "Command-G"), exec: function(e) { e.findNext() }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0 }, { name: "findprevious", bindKey: i("Ctrl-Shift-K", "Command-Shift-G"), exec: function(e) { e.findPrevious() }, multiSelectAction: "forEach", scrollIntoView: "center", readOnly: !0 }, { name: "selectOrFindNext", bindKey: i("Alt-K", "Ctrl-G"), exec: function(e) { e.selection.isEmpty() ? e.selection.selectWord() : e.findNext() }, readOnly: !0 }, { name: "selectOrFindPrevious", bindKey: i("Alt-Shift-K", "Ctrl-Shift-G"), exec: function(e) { e.selection.isEmpty() ? e.selection.selectWord() : e.findPrevious() }, readOnly: !0 }, { name: "find", bindKey: i("Ctrl-F", "Command-F"), exec: function(e) { r.loadModule("ace/ext/searchbox", function(t) { t.Search(e) }) }, readOnly: !0 }, { name: "overwrite", bindKey: "Insert", exec: function(e) { e.toggleOverwrite() }, readOnly: !0 }, { name: "selecttostart", bindKey: i("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"), exec: function(e) { e.getSelection().selectFileStart() }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "gotostart", bindKey: i("Ctrl-Home", "Command-Home|Command-Up"), exec: function(e) { e.navigateFileStart() }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "selectup", bindKey: i("Shift-Up", "Shift-Up|Ctrl-Shift-P"), exec: function(e) { e.getSelection().selectUp() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "golineup", bindKey: i("Up", "Up|Ctrl-P"), exec: function(e, t) { e.navigateUp(t.times) }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selecttoend", bindKey: i("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"), exec: function(e) { e.getSelection().selectFileEnd() }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "gotoend", bindKey: i("Ctrl-End", "Command-End|Command-Down"), exec: function(e) { e.navigateFileEnd() }, multiSelectAction: "forEach", readOnly: !0, scrollIntoView: "animate", aceCommandGroup: "fileJump" }, { name: "selectdown", bindKey: i("Shift-Down", "Shift-Down|Ctrl-Shift-N"), exec: function(e) { e.getSelection().selectDown() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "golinedown", bindKey: i("Down", "Down|Ctrl-N"), exec: function(e, t) { e.navigateDown(t.times) }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selectwordleft", bindKey: i("Ctrl-Shift-Left", "Option-Shift-Left"), exec: function(e) { e.getSelection().selectWordLeft() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "gotowordleft", bindKey: i("Ctrl-Left", "Option-Left"), exec: function(e) { e.navigateWordLeft() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selecttolinestart", bindKey: i("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"), exec: function(e) { e.getSelection().selectLineStart() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "gotolinestart", bindKey: i("Alt-Left|Home", "Command-Left|Home|Ctrl-A"), exec: function(e) { e.navigateLineStart() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selectleft", bindKey: i("Shift-Left", "Shift-Left|Ctrl-Shift-B"), exec: function(e) { e.getSelection().selectLeft() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "gotoleft", bindKey: i("Links", "Left|Ctrl-B"), exec: function(e, t) { e.navigateLeft(t.times) }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selectwordright", bindKey: i("Ctrl-Shift-Right", "Option-Shift-Right"), exec: function(e) { e.getSelection().selectWordRight() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "gotowordright", bindKey: i("Ctrl-Right", "Option-Right"), exec: function(e) { e.navigateWordRight() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selecttolineend", bindKey: i("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"), exec: function(e) { e.getSelection().selectLineEnd() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "gotolineend", bindKey: i("Alt-Right|End", "Command-Right|End|Ctrl-E"), exec: function(e) { e.navigateLineEnd() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selectright", bindKey: i("Shift-Right", "Shift-Right"), exec: function(e) { e.getSelection().selectRight() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "gotoright", bindKey: i("Rechts", "Right|Ctrl-F"), exec: function(e, t) { e.navigateRight(t.times) }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selectpagedown", bindKey: "Shift-PageDown", exec: function(e) { e.selectPageDown() }, readOnly: !0 }, { name: "pagedown", bindKey: i(null, "Option-PageDown"), exec: function(e) { e.scrollPageDown() }, readOnly: !0 }, { name: "gotopagedown", bindKey: i("PageDown", "PageDown|Ctrl-V"), exec: function(e) { e.gotoPageDown() }, readOnly: !0 }, { name: "selectpageup", bindKey: "Shift-PageUp", exec: function(e) { e.selectPageUp() }, readOnly: !0 }, { name: "pageup", bindKey: i(null, "Option-PageUp"), exec: function(e) { e.scrollPageUp() }, readOnly: !0 }, { name: "gotopageup", bindKey: "PageUp", exec: function(e) { e.gotoPageUp() }, readOnly: !0 }, { name: "scrollup", bindKey: i("Ctrl-Up", null), exec: function(e) { e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight) }, readOnly: !0 }, { name: "scrolldown", bindKey: i("Ctrl-Down", null), exec: function(e) { e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight) }, readOnly: !0 }, { name: "selectlinestart", bindKey: "Shift-Home", exec: function(e) { e.getSelection().selectLineStart() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "selectlineend", bindKey: "Shift-End", exec: function(e) { e.getSelection().selectLineEnd() }, multiSelectAction: "forEach", scrollIntoView: "cursor", readOnly: !0 }, { name: "togglerecording", bindKey: i("Ctrl-Alt-E", "Command-Option-E"), exec: function(e) { e.commands.toggleRecording(e) }, readOnly: !0 }, { name: "replaymacro", bindKey: i("Ctrl-Shift-E", "Command-Shift-E"), exec: function(e) { e.commands.replay(e) }, readOnly: !0 }, { name: "jumptomatching", bindKey: i("Ctrl-P", "Ctrl-P"), exec: function(e) { e.jumpToMatching() }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: !0 }, { name: "selecttomatching", bindKey: i("Ctrl-Shift-P", "Ctrl-Shift-P"), exec: function(e) { e.jumpToMatching(!0) }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: !0 }, { name: "expandToMatching", bindKey: i("Ctrl-Shift-M", "Ctrl-Shift-M"), exec: function(e) { e.jumpToMatching(!0, !0) }, multiSelectAction: "forEach", scrollIntoView: "animate", readOnly: !0 }, { name: "passKeysToBrowser", bindKey: i(null, null), exec: function() {}, passEvent: !0, readOnly: !0 }, { name: "copy", exec: function(e) {}, readOnly: !0 }, {
        name: "cut",
        exec: function(e) {
            var t = e.getSelectionRange();
            e._emit("cut", t), e.selection.isEmpty() || (e.session.remove(t), e.clearSelection())
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
    }, { name: "paste", exec: function(e, t) { e.$handlePaste(t) }, scrollIntoView: "cursor" }, { name: "removeline", bindKey: i("Ctrl-D", "Command-D"), exec: function(e) { e.removeLines() }, scrollIntoView: "cursor", multiSelectAction: "forEachLine" }, { name: "duplicateSelection", bindKey: i("Ctrl-Shift-D", "Command-Shift-D"), exec: function(e) { e.duplicateSelection() }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "sortlines", bindKey: i("Ctrl-Alt-S", "Command-Alt-S"), exec: function(e) { e.sortLines() }, scrollIntoView: "selection", multiSelectAction: "forEachLine" }, { name: "togglecomment", bindKey: i("Ctrl-/", "Command-/"), exec: function(e) { e.toggleCommentLines() }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart" }, { name: "toggleBlockComment", bindKey: i("Ctrl-Shift-/", "Command-Shift-/"), exec: function(e) { e.toggleBlockComment() }, multiSelectAction: "forEach", scrollIntoView: "selectionPart" }, { name: "modifyNumberUp", bindKey: i("Ctrl-Shift-Up", "Alt-Shift-Up"), exec: function(e) { e.modifyNumber(1) }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "modifyNumberDown", bindKey: i("Ctrl-Shift-Down", "Alt-Shift-Down"), exec: function(e) { e.modifyNumber(-1) }, scrollIntoView: "cursor", multiSelectAction: "forEach" }, { name: "replace", bindKey: i("Ctrl-H", "Command-Option-F"), exec: function(e) { r.loadModule("ace/ext/searchbox", function(t) { t.Search(e, !0) }) } }, { name: "undo", bindKey: i("Ctrl-Z", "Command-Z"), exec: function(e) { e.undo() } }, { name: "redo", bindKey: i("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"), exec: function(e) { e.redo() } }, { name: "copylinesup", bindKey: i("Alt-Shift-Up", "Command-Option-Up"), exec: function(e) { e.copyLinesUp() }, scrollIntoView: "cursor" }, { name: "movelinesup", bindKey: i("Alt-Up", "Option-Up"), exec: function(e) { e.moveLinesUp() }, scrollIntoView: "cursor" }, { name: "copylinesdown", bindKey: i("Alt-Shift-Down", "Command-Option-Down"), exec: function(e) { e.copyLinesDown() }, scrollIntoView: "cursor" }, { name: "movelinesdown", bindKey: i("Alt-Down", "Option-Down"), exec: function(e) { e.moveLinesDown() }, scrollIntoView: "cursor" }, { name: "del", bindKey: i("Löschen", "Delete|Ctrl-D|Shift-Delete"), exec: function(e) { e.remove("right") }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "backspace", bindKey: i("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"), exec: function(e) { e.remove("left") }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, {
        name: "cut_or_delete",
        bindKey: i("Shift-Delete", null),
        exec: function(e) {
            if (!e.selection.isEmpty()) return !1;
            e.remove("left")
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, { name: "removetolinestart", bindKey: i("Alt-Backspace", "Command-Backspace"), exec: function(e) { e.removeToLineStart() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removetolineend", bindKey: i("Alt-Delete", "Ctrl-K"), exec: function(e) { e.removeToLineEnd() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removewordleft", bindKey: i("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"), exec: function(e) { e.removeWordLeft() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "removewordright", bindKey: i("Ctrl-Delete", "Alt-Delete"), exec: function(e) { e.removeWordRight() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "outdent", bindKey: i("Shift-Tab", "Shift-Tab"), exec: function(e) { e.blockOutdent() }, multiSelectAction: "forEach", scrollIntoView: "selectionPart" }, { name: "indent", bindKey: i("Tab", "Tab"), exec: function(e) { e.indent() }, multiSelectAction: "forEach", scrollIntoView: "selectionPart" }, { name: "blockoutdent", bindKey: i("Ctrl-[", "Ctrl-["), exec: function(e) { e.blockOutdent() }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart" }, { name: "blockindent", bindKey: i("Ctrl-]", "Ctrl-]"), exec: function(e) { e.blockIndent() }, multiSelectAction: "forEachLine", scrollIntoView: "selectionPart" }, { name: "insertstring", exec: function(e, t) { e.insert(t) }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "inserttext", exec: function(e, t) { e.insert(o.stringRepeat(t.text || "", t.times || 1)) }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "splitline", bindKey: i(null, "Ctrl-O"), exec: function(e) { e.splitLine() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "transposeletters", bindKey: i("Alt-Shift-X", "Ctrl-T"), exec: function(e) { e.transposeLetters() }, multiSelectAction: function(e) { e.transposeSelections(1) }, scrollIntoView: "cursor" }, { name: "touppercase", bindKey: i("Ctrl-U", "Ctrl-U"), exec: function(e) { e.toUpperCase() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, { name: "tolowercase", bindKey: i("Ctrl-Shift-U", "Ctrl-Shift-U"), exec: function(e) { e.toLowerCase() }, multiSelectAction: "forEach", scrollIntoView: "cursor" }, {
        name: "expandtoline",
        bindKey: i("Ctrl-Shift-L", "Command-Shift-L"),
        exec: function(e) {
            var t = e.selection.getRange();
            t.start.column = t.end.column = 0, t.end.row++, e.selection.setRange(t, !1)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: !0
    }, {
        name: "joinlines",
        bindKey: i(null, null),
        exec: function(e) {
            for (var t = e.selection.isBackwards(), n = t ? e.selection.getSelectionLead() : e.selection.getSelectionAnchor(), i = t ? e.selection.getSelectionAnchor() : e.selection.getSelectionLead(), r = e.session.doc.getLine(n.row).length, a = e.session.doc.getTextRange(e.selection.getRange()).replace(/\n\s*/, " ").length, l = e.session.doc.getLine(n.row), c = n.row + 1; c <= i.row + 1; c++) {
                var h = o.stringTrimLeft(o.stringTrimRight(e.session.doc.getLine(c)));
                0 !== h.length && (h = " " + h), l += h
            }
            i.row + 1 < e.session.doc.getLength() - 1 && (l += e.session.doc.getNewLineCharacter()), e.clearSelection(), e.session.doc.replace(new s(n.row, 0, i.row + 2, 0), l), a > 0 ? (e.selection.moveCursorTo(n.row, n.column), e.selection.selectTo(n.row, n.column + a)) : (r = e.session.doc.getLine(n.row).length > r ? r + 1 : r, e.selection.moveCursorTo(n.row, r))
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "invertSelection",
        bindKey: i(null, null),
        exec: function(e) {
            var t = e.session.doc.getLength() - 1,
                n = e.session.doc.getLine(t).length,
                i = e.selection.rangeList.ranges,
                o = [];
            i.length < 1 && (i = [e.selection.getRange()]);
            for (var r = 0; r < i.length; r++) r == i.length - 1 && (i[r].end.row !== t || i[r].end.column !== n) && o.push(new s(i[r].end.row, i[r].end.column, t, n)), 0 === r ? (0 !== i[r].start.row || 0 !== i[r].start.column) && o.push(new s(0, 0, i[r].start.row, i[r].start.column)) : o.push(new s(i[r - 1].end.row, i[r - 1].end.column, i[r].start.row, i[r].start.column));
            e.exitMultiSelectMode(), e.clearSelection();
            for (r = 0; r < o.length; r++) e.selection.addRange(o[r], !1)
        },
        readOnly: !0,
        scrollIntoView: "none"
    }]
}), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator"], function(e, t, n) {
    "use strict";
    e("./lib/fixoldbrowsers");
    var i = e("./lib/oop"),
        o = e("./lib/dom"),
        r = e("./lib/lang"),
        s = e("./lib/useragent"),
        a = e("./keyboard/textinput").TextInput,
        l = e("./mouse/mouse_handler").MouseHandler,
        c = e("./mouse/fold_handler").FoldHandler,
        h = e("./keyboard/keybinding").KeyBinding,
        u = e("./edit_session").EditSession,
        d = e("./search").Search,
        g = e("./range").Range,
        f = e("./lib/event_emitter").EventEmitter,
        p = e("./commands/command_manager").CommandManager,
        m = e("./commands/default_commands").commands,
        v = e("./config"),
        w = e("./token_iterator").TokenIterator,
        A = function(e, t) {
            var n = e.getContainerElement();
            this.container = n, this.renderer = e, this.id = "editor" + ++A.$uid, this.commands = new p(s.isMac ? "mac" : "win", m), "object" == typeof document && (this.textInput = new a(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.$mouseHandler = new l(this), new c(this)), this.keyBinding = new h(this), this.$blockScrolling = 0, this.$search = (new d).set({ wrap: !0 }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = r.delayedCall(function() { this._signal("input", {}), this.session && this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart() }.bind(this)), this.on("change", function(e, t) { t._$emitInputEvent.schedule(31) }), this.setSession(t || new u("")), v.resetOptions(this), v._signal("editor", this)
        };
    A.$uid = 0,
        function() {
            i.implement(this, f), this.$initOperationListeners = function() { this.selections = [], this.commands.on("exec", this.startOperation.bind(this), !0), this.commands.on("afterExec", this.endOperation.bind(this), !0), this.$opResetTimer = r.delayedCall(this.endOperation.bind(this)), this.on("change", function() { this.curOp || this.startOperation(), this.curOp.docChanged = !0 }.bind(this), !0), this.on("changeSelection", function() { this.curOp || this.startOperation(), this.curOp.selectionChanged = !0 }.bind(this), !0) }, this.curOp = null, this.prevOp = {}, this.startOperation = function(e) {
                if (this.curOp) {
                    if (!e || this.curOp.command) return;
                    this.prevOp = this.curOp
                }
                e || (this.previousCommand = null, e = {}), this.$opResetTimer.schedule(), this.curOp = { command: e.command || {}, args: e.args, scrollTop: this.renderer.scrollTop }, this.curOp.command.name && void 0 !== this.curOp.command.scrollIntoView && this.$blockScrolling++
            }, this.endOperation = function(e) {
                if (this.curOp) {
                    if (e && !1 === e.returnValue) return this.curOp = null;
                    this._signal("beforeEndOperation");
                    var t = this.curOp.command;
                    t.name && this.$blockScrolling > 0 && this.$blockScrolling--;
                    var n = t && t.scrollIntoView;
                    if (n) {
                        switch (n) {
                            case "center-animate":
                                n = "animate";
                            case "center":
                                this.renderer.scrollCursorIntoView(null, .5);
                                break;
                            case "animate":
                            case "cursor":
                                this.renderer.scrollCursorIntoView();
                                break;
                            case "selectionPart":
                                var i = this.selection.getRange(),
                                    o = this.renderer.layerConfig;
                                (i.start.row >= o.lastRow || i.end.row <= o.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead)
                        }
                        "animate" == n && this.renderer.animateScrolling(this.curOp.scrollTop)
                    }
                    this.prevOp = this.curOp, this.curOp = null
                }
            }, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function(e) {
                if (this.$mergeUndoDeltas) {
                    var t = this.prevOp,
                        n = this.$mergeableCommands,
                        i = t.command && e.command.name == t.command.name;
                    if ("insertstring" == e.command.name) {
                        var o = e.args;
                        void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), i = i && this.mergeNextCommand && (!/\s/.test(o) || /\s/.test(t.args)), this.mergeNextCommand = !0
                    } else i = i && -1 !== n.indexOf(e.command.name);
                    "always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (i = !1), i ? this.session.mergeUndoDeltas = !0 : -1 !== n.indexOf(e.command.name) && (this.sequenceStartTime = Date.now())
                }
            }, this.setKeyboardHandler = function(e, t) {
                if (e && "string" == typeof e) {
                    this.$keybindingId = e;
                    var n = this;
                    v.loadModule(["keybinding", e], function(i) { n.$keybindingId == e && n.keyBinding.setKeyboardHandler(i && i.handler), t && t() })
                } else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e), t && t()
            }, this.getKeyboardHandler = function() { return this.keyBinding.getKeyboardHandler() }, this.setSession = function(e) {
                if (this.session != e) {
                    this.curOp && this.endOperation(), this.curOp = {};
                    var t = this.session;
                    if (t) {
                        this.session.off("change", this.$onDocumentChange), this.session.off("changeMode", this.$onChangeMode), this.session.off("tokenizerUpdate", this.$onTokenizerUpdate), this.session.off("changeTabSize", this.$onChangeTabSize), this.session.off("changeWrapLimit", this.$onChangeWrapLimit), this.session.off("changeWrapMode", this.$onChangeWrapMode), this.session.off("changeFold", this.$onChangeFold), this.session.off("changeFrontMarker", this.$onChangeFrontMarker), this.session.off("changeBackMarker", this.$onChangeBackMarker), this.session.off("changeBreakpoint", this.$onChangeBreakpoint), this.session.off("changeAnnotation", this.$onChangeAnnotation), this.session.off("changeOverwrite", this.$onCursorChange), this.session.off("changeScrollTop", this.$onScrollTopChange), this.session.off("changeScrollLeft", this.$onScrollLeftChange);
                        var n = this.session.getSelection();
                        n.off("changeCursor", this.$onCursorChange), n.off("changeSelection", this.$onSelectionChange)
                    }
                    this.session = e, e ? (this.$onDocumentChange = this.onDocumentChange.bind(this), e.on("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.on("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.on("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.on("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.on("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.on("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.on("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.on("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.on("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.on("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.on("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.on("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.on("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.on("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.on("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.on("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(e)), this._signal("changeSession", { session: e, oldSession: t }), this.curOp = null, t && t._signal("changeEditor", { oldEditor: this }), e && e._signal("changeEditor", { editor: this }), e && e.bgTokenizer && e.bgTokenizer.scheduleStart()
                }
            }, this.getSession = function() { return this.session }, this.setValue = function(e, t) { return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e }, this.getValue = function() { return this.session.getValue() }, this.getSelection = function() { return this.selection }, this.resize = function(e) { this.renderer.onResize(e) }, this.setTheme = function(e, t) { this.renderer.setTheme(e, t) }, this.getTheme = function() { return this.renderer.getTheme() }, this.setStyle = function(e) { this.renderer.setStyle(e) }, this.unsetStyle = function(e) { this.renderer.unsetStyle(e) }, this.getFontSize = function() { return this.getOption("fontSize") || o.computedStyle(this.container, "fontSize") }, this.setFontSize = function(e) { this.setOption("fontSize", e) }, this.$highlightBrackets = function() {
                if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
                    var e = this;
                    this.$highlightPending = !0, setTimeout(function() {
                        e.$highlightPending = !1;
                        var t = e.session;
                        if (t && t.bgTokenizer) {
                            var n = t.findMatchingBracket(e.getCursorPosition());
                            if (n) var i = new g(n.row, n.column, n.row, n.column + 1);
                            else if (t.$mode.getMatching) i = t.$mode.getMatching(e.session);
                            i && (t.$bracketHighlight = t.addMarker(i, "ace_bracket", "text"))
                        }
                    }, 50)
                }
            }, this.$highlightTags = function() {
                if (!this.$highlightTagPending) {
                    var e = this;
                    this.$highlightTagPending = !0, setTimeout(function() {
                        e.$highlightTagPending = !1;
                        var t = e.session;
                        if (t && t.bgTokenizer) {
                            var n = e.getCursorPosition(),
                                i = new w(e.session, n.row, n.column),
                                o = i.getCurrentToken();
                            if (!o || !/\b(?:tag-open|tag-name)/.test(o.type)) return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
                            if (-1 == o.type.indexOf("tag-open") || (o = i.stepForward())) {
                                var r = o.value,
                                    s = 0,
                                    a = i.stepBackward();
                                if ("<" == a.value)
                                    for (; a = o, (o = i.stepForward()) && o.value === r && -1 !== o.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--), o && s >= 0;);
                                else {
                                    for (; o = a, a = i.stepBackward(), o && o.value === r && -1 !== o.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--), a && s <= 0;);
                                    i.stepForward()
                                }
                                if (!o) return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
                                var l = i.getCurrentTokenRow(),
                                    c = i.getCurrentTokenColumn(),
                                    h = new g(l, c, l, c + o.value.length),
                                    u = t.$backMarkers[t.$tagHighlight];
                                t.$tagHighlight && null != u && 0 !== h.compareRange(u.range) && (t.removeMarker(t.$tagHighlight), t.$tagHighlight = null), h && !t.$tagHighlight && (t.$tagHighlight = t.addMarker(h, "ace_bracket", "text"))
                            }
                        }
                    }, 50)
                }
            }, this.focus = function() {
                var e = this;
                setTimeout(function() { e.textInput.focus() }), this.textInput.focus()
            }, this.isFocused = function() { return this.textInput.isFocused() }, this.blur = function() { this.textInput.blur() }, this.onFocus = function(e) { this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", e)) }, this.onBlur = function(e) { this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", e)) }, this.$cursorChange = function() { this.renderer.updateCursor() }, this.onDocumentChange = function(e) {
                var t = this.session.$useWrapMode,
                    n = e.start.row == e.end.row ? e.end.row : 1 / 0;
                this.renderer.updateLines(e.start.row, n, t), this._signal("change", e), this.$cursorChange(), this.$updateHighlightActiveLine()
            }, this.onTokenizerUpdate = function(e) {
                var t = e.data;
                this.renderer.updateLines(t.first, t.last)
            }, this.onScrollTopChange = function() { this.renderer.scrollToY(this.session.getScrollTop()) }, this.onScrollLeftChange = function() { this.renderer.scrollToX(this.session.getScrollLeft()) }, this.onCursorChange = function() { this.$cursorChange(), this.$blockScrolling || (v.warn("Automatically scrolling cursor into view after selection change", "this will be disabled in the next version", "set editor.$blockScrolling = Infinity to disable this message"), this.renderer.scrollCursorIntoView()), this.$highlightBrackets(), this.$highlightTags(), this.$updateHighlightActiveLine(), this._signal("changeSelection") }, this.$updateHighlightActiveLine = function() {
                var e, t = this.getSession();
                if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (e = this.getCursorPosition()), this.renderer.$maxLines && 1 === this.session.getLength() && !(this.renderer.$minLines > 1) && (e = !1)), t.$highlightLineMarker && !e) t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null;
                else if (!t.$highlightLineMarker && e) {
                    var n = new g(e.row, e.column, e.row, 1 / 0);
                    n.id = t.addMarker(n, "ace_active-line", "screenLine"), t.$highlightLineMarker = n
                } else e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._signal("changeBackMarker"))
            }, this.onSelectionChange = function(e) {
                var t = this.session;
                if (t.$selectionMarker && t.removeMarker(t.$selectionMarker), t.$selectionMarker = null, this.selection.isEmpty()) this.$updateHighlightActiveLine();
                else {
                    var n = this.selection.getRange(),
                        i = this.getSelectionStyle();
                    t.$selectionMarker = t.addMarker(n, "ace_selection", i)
                }
                var o = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
                this.session.highlight(o), this._signal("changeSelection")
            }, this.$getSelectionHighLightRegexp = function() {
                var e = this.session,
                    t = this.getSelectionRange();
                if (!t.isEmpty() && !t.isMultiLine()) {
                    var n = t.start.column - 1,
                        i = t.end.column + 1,
                        o = e.getLine(t.start.row),
                        r = o.length,
                        s = o.substring(Math.max(n, 0), Math.min(i, r));
                    if (!(n >= 0 && /^[\w\d]/.test(s) || i <= r && /[\w\d]$/.test(s)))
                        if (s = o.substring(t.start.column, t.end.column), /^[\w\d]+$/.test(s)) return this.$search.$assembleRegExp({ wholeWord: !0, caseSensitive: !0, needle: s })
                }
            }, this.onChangeFrontMarker = function() { this.renderer.updateFrontMarkers() }, this.onChangeBackMarker = function() { this.renderer.updateBackMarkers() }, this.onChangeBreakpoint = function() { this.renderer.updateBreakpoints() }, this.onChangeAnnotation = function() { this.renderer.setAnnotations(this.session.getAnnotations()) }, this.onChangeMode = function(e) { this.renderer.updateText(), this._emit("changeMode", e) }, this.onChangeWrapLimit = function() { this.renderer.updateFull() }, this.onChangeWrapMode = function() { this.renderer.onResize(!0) }, this.onChangeFold = function() { this.$updateHighlightActiveLine(), this.renderer.updateFull() }, this.getSelectedText = function() { return this.session.getTextRange(this.getSelectionRange()) }, this.getCopyText = function() { var e = this.getSelectedText(); return this._signal("copy", e), e }, this.onCopy = function() { this.commands.exec("copy", this) }, this.onCut = function() { this.commands.exec("cut", this) }, this.onPaste = function(e, t) {
                var n = { text: e, event: t };
                this.commands.exec("paste", this, n)
            }, this.$handlePaste = function(e) {
                "string" == typeof e && (e = { text: e }), this._signal("paste", e);
                var t = e.text;
                if (!this.inMultiSelectMode || this.inVirtualSelectionMode) this.insert(t);
                else {
                    var n = t.split(/\r\n|\r|\n/),
                        i = this.selection.rangeList.ranges;
                    if (n.length > i.length || n.length < 2 || !n[1]) return this.commands.exec("insertstring", this, t);
                    for (var o = i.length; o--;) {
                        var r = i[o];
                        r.isEmpty() || this.session.remove(r), this.session.insert(r.start, n[o])
                    }
                }
            }, this.execCommand = function(e, t) { return this.commands.exec(e, this, t) }, this.insert = function(e, t) {
                var n = this.session,
                    i = n.getMode(),
                    o = this.getCursorPosition();
                if (this.getBehavioursEnabled() && !t) {
                    var r = i.transformAction(n.getState(o.row), "insertion", this, n, e);
                    r && (e !== r.text && (this.session.mergeUndoDeltas = !1, this.$mergeNextCommand = !1), e = r.text)
                }
                if ("\t" == e && (e = this.session.getTabString()), this.selection.isEmpty()) {
                    if (this.session.getOverwrite() && -1 == e.indexOf("\n")) {
                        (s = new g.fromPoints(o, o)).end.column += e.length, this.session.remove(s)
                    }
                } else {
                    var s = this.getSelectionRange();
                    o = this.session.remove(s), this.clearSelection()
                }
                if ("\n" == e || "\r\n" == e) {
                    var a = n.getLine(o.row);
                    if (o.column > a.search(/\S|$/)) {
                        var l = a.substr(o.column).search(/\S|$/);
                        n.doc.removeInLine(o.row, o.column, o.column + l)
                    }
                }
                this.clearSelection();
                var c = o.column,
                    h = n.getState(o.row),
                    u = (a = n.getLine(o.row), i.checkOutdent(h, a, e));
                n.insert(o, e);
                if (r && r.selection && (2 == r.selection.length ? this.selection.setSelectionRange(new g(o.row, c + r.selection[0], o.row, c + r.selection[1])) : this.selection.setSelectionRange(new g(o.row + r.selection[0], r.selection[1], o.row + r.selection[2], r.selection[3]))), n.getDocument().isNewLine(e)) {
                    var d = i.getNextLineIndent(h, a.slice(0, o.column), n.getTabString());
                    n.insert({ row: o.row + 1, column: 0 }, d)
                }
                u && i.autoOutdent(h, n, o.row)
            }, this.onTextInput = function(e) { this.keyBinding.onTextInput(e) }, this.onCommandKey = function(e, t, n) { this.keyBinding.onCommandKey(e, t, n) }, this.setOverwrite = function(e) { this.session.setOverwrite(e) }, this.getOverwrite = function() { return this.session.getOverwrite() }, this.toggleOverwrite = function() { this.session.toggleOverwrite() }, this.setScrollSpeed = function(e) { this.setOption("scrollSpeed", e) }, this.getScrollSpeed = function() { return this.getOption("scrollSpeed") }, this.setDragDelay = function(e) { this.setOption("dragDelay", e) }, this.getDragDelay = function() { return this.getOption("dragDelay") }, this.setSelectionStyle = function(e) { this.setOption("selectionStyle", e) }, this.getSelectionStyle = function() { return this.getOption("selectionStyle") }, this.setHighlightActiveLine = function(e) { this.setOption("highlightActiveLine", e) }, this.getHighlightActiveLine = function() { return this.getOption("highlightActiveLine") }, this.setHighlightGutterLine = function(e) { this.setOption("highlightGutterLine", e) }, this.getHighlightGutterLine = function() { return this.getOption("highlightGutterLine") }, this.setHighlightSelectedWord = function(e) { this.setOption("highlightSelectedWord", e) }, this.getHighlightSelectedWord = function() { return this.$highlightSelectedWord }, this.setAnimatedScroll = function(e) { this.renderer.setAnimatedScroll(e) }, this.getAnimatedScroll = function() { return this.renderer.getAnimatedScroll() }, this.setShowInvisibles = function(e) { this.renderer.setShowInvisibles(e) }, this.getShowInvisibles = function() { return this.renderer.getShowInvisibles() }, this.setDisplayIndentGuides = function(e) { this.renderer.setDisplayIndentGuides(e) }, this.getDisplayIndentGuides = function() { return this.renderer.getDisplayIndentGuides() }, this.setShowPrintMargin = function(e) { this.renderer.setShowPrintMargin(e) }, this.getShowPrintMargin = function() { return this.renderer.getShowPrintMargin() }, this.setPrintMarginColumn = function(e) { this.renderer.setPrintMarginColumn(e) }, this.getPrintMarginColumn = function() { return this.renderer.getPrintMarginColumn() }, this.setReadOnly = function(e) { this.setOption("readOnly", e) }, this.getReadOnly = function() { return this.getOption("readOnly") }, this.setBehavioursEnabled = function(e) { this.setOption("behavioursEnabled", e) }, this.getBehavioursEnabled = function() { return this.getOption("behavioursEnabled") }, this.setWrapBehavioursEnabled = function(e) { this.setOption("wrapBehavioursEnabled", e) }, this.getWrapBehavioursEnabled = function() { return this.getOption("wrapBehavioursEnabled") }, this.setShowFoldWidgets = function(e) { this.setOption("showFoldWidgets", e) }, this.getShowFoldWidgets = function() { return this.getOption("showFoldWidgets") }, this.setFadeFoldWidgets = function(e) { this.setOption("fadeFoldWidgets", e) }, this.getFadeFoldWidgets = function() { return this.getOption("fadeFoldWidgets") }, this.remove = function(e) {
                this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
                var t = this.getSelectionRange();
                if (this.getBehavioursEnabled()) {
                    var n = this.session,
                        i = n.getState(t.start.row),
                        o = n.getMode().transformAction(i, "deletion", this, n, t);
                    if (0 === t.end.column) { var r = n.getTextRange(t); if ("\n" == r[r.length - 1]) { var s = n.getLine(t.end.row); /^\s+$/.test(s) && (t.end.column = s.length) } }
                    o && (t = o)
                }
                this.session.remove(t), this.clearSelection()
            }, this.removeWordRight = function() { this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection() }, this.removeWordLeft = function() { this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection() }, this.removeToLineStart = function() { this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection() }, this.removeToLineEnd = function() {
                this.selection.isEmpty() && this.selection.selectLineEnd();
                var e = this.getSelectionRange();
                e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
            }, this.splitLine = function() {
                this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                var e = this.getCursorPosition();
                this.insert("\n"), this.moveCursorToPosition(e)
            }, this.transposeLetters = function() {
                if (this.selection.isEmpty()) {
                    var e = this.getCursorPosition(),
                        t = e.column;
                    if (0 !== t) {
                        var n, i, o = this.session.getLine(e.row);
                        t < o.length ? (n = o.charAt(t) + o.charAt(t - 1), i = new g(e.row, t - 1, e.row, t + 1)) : (n = o.charAt(t - 1) + o.charAt(t - 2), i = new g(e.row, t - 2, e.row, t)), this.session.replace(i, n), this.session.selection.moveToPosition(i.end)
                    }
                }
            }, this.toLowerCase = function() {
                var e = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var t = this.getSelectionRange(),
                    n = this.session.getTextRange(t);
                this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e)
            }, this.toUpperCase = function() {
                var e = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var t = this.getSelectionRange(),
                    n = this.session.getTextRange(t);
                this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e)
            }, this.indent = function() {
                var e = this.session,
                    t = this.getSelectionRange();
                if (!(t.start.row < t.end.row)) {
                    if (t.start.column < t.end.column) { var n = e.getTextRange(t); if (!/^\s+$/.test(n)) { h = this.$getSelectedRows(); return void e.indentRows(h.first, h.last, "\t") } }
                    var i = e.getLine(t.start.row),
                        o = t.start,
                        s = e.getTabSize(),
                        a = e.documentToScreenColumn(o.row, o.column);
                    if (this.session.getUseSoftTabs()) var l = s - a % s,
                        c = r.stringRepeat(" ", l);
                    else {
                        for (l = a % s;
                            " " == i[t.start.column - 1] && l;) t.start.column--, l--;
                        this.selection.setSelectionRange(t), c = "\t"
                    }
                    return this.insert(c)
                }
                var h = this.$getSelectedRows();
                e.indentRows(h.first, h.last, "\t")
            }, this.blockIndent = function() {
                var e = this.$getSelectedRows();
                this.session.indentRows(e.first, e.last, "\t")
            }, this.blockOutdent = function() {
                var e = this.session.getSelection();
                this.session.outdentRows(e.getRange())
            }, this.sortLines = function() {
                var e = this.$getSelectedRows(),
                    t = this.session,
                    n = [];
                for (o = e.first; o <= e.last; o++) n.push(t.getLine(o));
                n.sort(function(e, t) { return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0 });
                for (var i = new g(0, 0, 0, 0), o = e.first; o <= e.last; o++) {
                    var r = t.getLine(o);
                    i.start.row = o, i.end.row = o, i.end.column = r.length, t.replace(i, n[o - e.first])
                }
            }, this.toggleCommentLines = function() {
                var e = this.session.getState(this.getCursorPosition().row),
                    t = this.$getSelectedRows();
                this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
            }, this.toggleBlockComment = function() {
                var e = this.getCursorPosition(),
                    t = this.session.getState(e.row),
                    n = this.getSelectionRange();
                this.session.getMode().toggleBlockComment(t, this.session, n, e)
            }, this.getNumberAt = function(e, t) {
                var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
                n.lastIndex = 0;
                for (var i = this.session.getLine(e); n.lastIndex < t;) { var o = n.exec(i); if (o.index <= t && o.index + o[0].length >= t) return { value: o[0], start: o.index, end: o.index + o[0].length } }
                return null
            }, this.modifyNumber = function(e) {
                var t = this.selection.getCursor().row,
                    n = this.selection.getCursor().column,
                    i = new g(t, n - 1, t, n),
                    o = this.session.getTextRange(i);
                if (!isNaN(parseFloat(o)) && isFinite(o)) {
                    var r = this.getNumberAt(t, n);
                    if (r) {
                        var s = r.value.indexOf(".") >= 0 ? r.start + r.value.indexOf(".") + 1 : r.end,
                            a = r.start + r.value.length - s,
                            l = parseFloat(r.value);
                        l *= Math.pow(10, a), s !== r.end && n < s ? e *= Math.pow(10, r.end - n - 1) : e *= Math.pow(10, r.end - n), l += e;
                        var c = (l /= Math.pow(10, a)).toFixed(a),
                            h = new g(t, r.start, t, r.end);
                        this.session.replace(h, c), this.moveCursorTo(t, Math.max(r.start + 1, n + c.length - r.value.length))
                    }
                }
            }, this.removeLines = function() {
                var e = this.$getSelectedRows();
                this.session.removeFullLines(e.first, e.last), this.clearSelection()
            }, this.duplicateSelection = function() {
                var e = this.selection,
                    t = this.session,
                    n = e.getRange(),
                    i = e.isBackwards();
                if (n.isEmpty()) {
                    var o = n.start.row;
                    t.duplicateLines(o, o)
                } else {
                    var r = i ? n.start : n.end,
                        s = t.insert(r, t.getTextRange(n), !1);
                    n.start = r, n.end = s, e.setSelectionRange(n, i)
                }
            }, this.moveLinesDown = function() { this.$moveLines(1, !1) }, this.moveLinesUp = function() { this.$moveLines(-1, !1) }, this.moveText = function(e, t, n) { return this.session.moveText(e, t, n) }, this.copyLinesUp = function() { this.$moveLines(-1, !0) }, this.copyLinesDown = function() { this.$moveLines(1, !0) }, this.$moveLines = function(e, t) {
                var n, i, o = this.selection;
                if (!o.inMultiSelectMode || this.inVirtualSelectionMode) {
                    var r = o.toOrientedRange();
                    n = this.$getSelectedRows(r), i = this.session.$moveLines(n.first, n.last, t ? 0 : e), t && -1 == e && (i = 0), r.moveBy(i, 0), o.fromOrientedRange(r)
                } else {
                    var s = o.rangeList.ranges;
                    o.rangeList.detach(this.session), this.inVirtualSelectionMode = !0;
                    for (var a = 0, l = 0, c = s.length, h = 0; h < c; h++) {
                        var u = h;
                        s[h].moveBy(a, 0);
                        for (var d = (n = this.$getSelectedRows(s[h])).first, g = n.last; ++h < c;) {
                            l && s[h].moveBy(l, 0);
                            var f = this.$getSelectedRows(s[h]);
                            if (t && f.first != g) break;
                            if (!t && f.first > g + 1) break;
                            g = f.last
                        }
                        for (h--, a = this.session.$moveLines(d, g, t ? 0 : e), t && -1 == e && (u = h + 1); u <= h;) s[u].moveBy(a, 0), u++;
                        t || (a = 0), l += a
                    }
                    o.fromOrientedRange(o.ranges[0]), o.rangeList.attach(this.session), this.inVirtualSelectionMode = !1
                }
            }, this.$getSelectedRows = function(e) { return e = (e || this.getSelectionRange()).collapseRows(), { first: this.session.getRowFoldStart(e.start.row), last: this.session.getRowFoldEnd(e.end.row) } }, this.onCompositionStart = function(e) { this.renderer.showComposition(this.getCursorPosition()) }, this.onCompositionUpdate = function(e) { this.renderer.setCompositionText(e) }, this.onCompositionEnd = function() { this.renderer.hideComposition() }, this.getFirstVisibleRow = function() { return this.renderer.getFirstVisibleRow() }, this.getLastVisibleRow = function() { return this.renderer.getLastVisibleRow() }, this.isRowVisible = function(e) { return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow() }, this.isRowFullyVisible = function(e) { return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow() }, this.$getVisibleRowCount = function() { return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1 }, this.$moveByPage = function(e, t) {
                var n = this.renderer,
                    i = this.renderer.layerConfig,
                    o = e * Math.floor(i.height / i.lineHeight);
                this.$blockScrolling++, !0 === t ? this.selection.$moveSelection(function() { this.moveCursorBy(o, 0) }) : !1 === t && (this.selection.moveCursorBy(o, 0), this.selection.clearSelection()), this.$blockScrolling--;
                var r = n.scrollTop;
                n.scrollBy(0, o * i.lineHeight), null != t && n.scrollCursorIntoView(null, .5), n.animateScrolling(r)
            }, this.selectPageDown = function() { this.$moveByPage(1, !0) }, this.selectPageUp = function() { this.$moveByPage(-1, !0) }, this.gotoPageDown = function() { this.$moveByPage(1, !1) }, this.gotoPageUp = function() { this.$moveByPage(-1, !1) }, this.scrollPageDown = function() { this.$moveByPage(1) }, this.scrollPageUp = function() { this.$moveByPage(-1) }, this.scrollToRow = function(e) { this.renderer.scrollToRow(e) }, this.scrollToLine = function(e, t, n, i) { this.renderer.scrollToLine(e, t, n, i) }, this.centerSelection = function() {
                var e = this.getSelectionRange(),
                    t = { row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2), column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2) };
                this.renderer.alignCursor(t, .5)
            }, this.getCursorPosition = function() { return this.selection.getCursor() }, this.getCursorPositionScreen = function() { return this.session.documentToScreenPosition(this.getCursorPosition()) }, this.getSelectionRange = function() { return this.selection.getRange() }, this.selectAll = function() { this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1 }, this.clearSelection = function() { this.selection.clearSelection() }, this.moveCursorTo = function(e, t) { this.selection.moveCursorTo(e, t) }, this.moveCursorToPosition = function(e) { this.selection.moveCursorToPosition(e) }, this.jumpToMatching = function(e, t) {
                var n = this.getCursorPosition(),
                    i = new w(this.session, n.row, n.column),
                    o = i.getCurrentToken(),
                    r = o || i.stepForward();
                if (r) {
                    var s, a, l = !1,
                        c = {},
                        h = n.column - r.start,
                        u = { ")": "(", "(": "(", "]": "[", "[": "[", "{": "{", "}": "{" };
                    do {
                        if (r.value.match(/[{}()\[\]]/g)) {
                            for (; h < r.value.length && !l; h++)
                                if (u[r.value[h]]) switch (a = u[r.value[h]] + "." + r.type.replace("rparen", "lparen"), isNaN(c[a]) && (c[a] = 0), r.value[h]) {
                                    case "(":
                                    case "[":
                                    case "{":
                                        c[a]++;
                                        break;
                                    case ")":
                                    case "]":
                                    case "}":
                                        c[a]--, -1 === c[a] && (s = "bracket", l = !0)
                                }
                        } else r && -1 !== r.type.indexOf("tag-name") && (isNaN(c[r.value]) && (c[r.value] = 0), "<" === o.value ? c[r.value]++ : "</" === o.value && c[r.value]--, -1 === c[r.value] && (s = "tag", l = !0));
                        l || (o = r, r = i.stepForward(), h = 0)
                    } while (r && !l);
                    if (s) {
                        var d, f;
                        if ("bracket" === s)(d = this.session.getBracketRange(n)) || (f = (d = new g(i.getCurrentTokenRow(), i.getCurrentTokenColumn() + h - 1, i.getCurrentTokenRow(), i.getCurrentTokenColumn() + h - 1)).start, (t || f.row === n.row && Math.abs(f.column - n.column) < 2) && (d = this.session.getBracketRange(f)));
                        else if ("tag" === s) {
                            if (!r || -1 === r.type.indexOf("tag-name")) return;
                            var p = r.value;
                            if (0 === (d = new g(i.getCurrentTokenRow(), i.getCurrentTokenColumn() - 2, i.getCurrentTokenRow(), i.getCurrentTokenColumn() - 2)).compare(n.row, n.column))
                                for (l = !1; r = o, (o = i.stepBackward()) && (-1 !== o.type.indexOf("tag-close") && d.setEnd(i.getCurrentTokenRow(), i.getCurrentTokenColumn() + 1), r.value === p && -1 !== r.type.indexOf("tag-name") && ("<" === o.value ? c[p]++ : "</" === o.value && c[p]--, 0 === c[p] && (l = !0))), o && !l;);
                            r && r.type.indexOf("tag-name") && ((f = d.start).row == n.row && Math.abs(f.column - n.column) < 2 && (f = d.end))
                        }(f = d && d.cursor || f) && (e ? d && t ? this.selection.setRange(d) : d && d.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(f.row, f.column) : this.selection.moveTo(f.row, f.column))
                    }
                }
            }, this.gotoLine = function(e, t, n) { this.selection.clearSelection(), this.session.unfold({ row: e - 1, column: t || 0 }), this.$blockScrolling += 1, this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e - 1, t || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, n) }, this.navigateTo = function(e, t) { this.selection.moveTo(e, t) }, this.navigateUp = function(e) {
                if (this.selection.isMultiLine() && !this.selection.isBackwards()) { var t = this.selection.anchor.getPosition(); return this.moveCursorToPosition(t) }
                this.selection.clearSelection(), this.selection.moveCursorBy(-e || -1, 0)
            }, this.navigateDown = function(e) {
                if (this.selection.isMultiLine() && this.selection.isBackwards()) { var t = this.selection.anchor.getPosition(); return this.moveCursorToPosition(t) }
                this.selection.clearSelection(), this.selection.moveCursorBy(e || 1, 0)
            }, this.navigateLeft = function(e) {
                if (this.selection.isEmpty())
                    for (e = e || 1; e--;) this.selection.moveCursorLeft();
                else {
                    var t = this.getSelectionRange().start;
                    this.moveCursorToPosition(t)
                }
                this.clearSelection()
            }, this.navigateRight = function(e) {
                if (this.selection.isEmpty())
                    for (e = e || 1; e--;) this.selection.moveCursorRight();
                else {
                    var t = this.getSelectionRange().end;
                    this.moveCursorToPosition(t)
                }
                this.clearSelection()
            }, this.navigateLineStart = function() { this.selection.moveCursorLineStart(), this.clearSelection() }, this.navigateLineEnd = function() { this.selection.moveCursorLineEnd(), this.clearSelection() }, this.navigateFileEnd = function() { this.selection.moveCursorFileEnd(), this.clearSelection() }, this.navigateFileStart = function() { this.selection.moveCursorFileStart(), this.clearSelection() }, this.navigateWordRight = function() { this.selection.moveCursorWordRight(), this.clearSelection() }, this.navigateWordLeft = function() { this.selection.moveCursorWordLeft(), this.clearSelection() }, this.replace = function(e, t) {
                t && this.$search.set(t);
                var n = this.$search.find(this.session),
                    i = 0;
                return n ? (this.$tryReplace(n, e) && (i = 1), null !== n && (this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end)), i) : i
            }, this.replaceAll = function(e, t) {
                t && this.$search.set(t);
                var n = this.$search.findAll(this.session),
                    i = 0;
                if (!n.length) return i;
                this.$blockScrolling += 1;
                var o = this.getSelectionRange();
                this.selection.moveTo(0, 0);
                for (var r = n.length - 1; r >= 0; --r) this.$tryReplace(n[r], e) && i++;
                return this.selection.setSelectionRange(o), this.$blockScrolling -= 1, i
            }, this.$tryReplace = function(e, t) { var n = this.session.getTextRange(e); return null !== (t = this.$search.replace(n, t)) ? (e.end = this.session.replace(e, t), e) : null }, this.getLastSearchOptions = function() { return this.$search.getOptions() }, this.find = function(e, t, n) {
                t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == typeof e && i.mixin(t, e);
                var o = this.selection.getRange();
                null == t.needle && ((e = this.session.getTextRange(o) || this.$search.$options.needle) || (o = this.session.getWordRange(o.start.row, o.start.column), e = this.session.getTextRange(o)), this.$search.set({ needle: e })), this.$search.set(t), t.start || this.$search.set({ start: o });
                var r = this.$search.find(this.session);
                return t.preventScroll ? r : r ? (this.revealRange(r, n), r) : (t.backwards ? o.start = o.end : o.end = o.start, void this.selection.setRange(o))
            }, this.findNext = function(e, t) { this.find({ skipCurrent: !0, backwards: !1 }, e, t) }, this.findPrevious = function(e, t) { this.find(e, { skipCurrent: !0, backwards: !0 }, t) }, this.revealRange = function(e, t) {
                this.$blockScrolling += 1, this.session.unfold(e), this.selection.setSelectionRange(e), this.$blockScrolling -= 1;
                var n = this.renderer.scrollTop;
                this.renderer.scrollSelectionIntoView(e.start, e.end, .5), !1 !== t && this.renderer.animateScrolling(n)
            }, this.undo = function() { this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5) }, this.redo = function() { this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5) }, this.destroy = function() { this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy() }, this.setAutoScrollEditorIntoView = function(e) {
                if (e) {
                    var t, n = this,
                        i = !1;
                    this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
                    var o = this.$scrollAnchor;
                    o.style.cssText = "position:absolute", this.container.insertBefore(o, this.container.firstChild);
                    var r = this.on("changeSelection", function() { i = !0 }),
                        s = this.renderer.on("beforeRender", function() { i && (t = n.renderer.container.getBoundingClientRect()) }),
                        a = this.renderer.on("afterRender", function() {
                            if (i && t && (n.isFocused() || n.searchBox && n.searchBox.isFocused())) {
                                var e = n.renderer,
                                    r = e.$cursorLayer.$pixelPos,
                                    s = e.layerConfig,
                                    a = r.top - s.offset;
                                null != (i = r.top >= 0 && a + t.top < 0 || !(r.top < s.height && r.top + t.top + s.lineHeight > window.innerHeight) && null) && (o.style.top = a + "px", o.style.left = r.left + "px", o.style.height = s.lineHeight + "px", o.scrollIntoView(i)), i = t = null
                            }
                        });
                    this.setAutoScrollEditorIntoView = function(e) { e || (delete this.setAutoScrollEditorIntoView, this.off("changeSelection", r), this.renderer.off("afterRender", a), this.renderer.off("beforeRender", s)) }
                }
            }, this.$resetCursorStyle = function() {
                var e = this.$cursorStyle || "ace",
                    t = this.renderer.$cursorLayer;
                t && (t.setSmoothBlinking(/smooth/.test(e)), t.isBlinking = !this.$readOnly && "wide" != e, o.setCssClass(t.element, "ace_slim-cursors", /slim/.test(e)))
            }
        }.call(A.prototype), v.defineOptions(A.prototype, "editor", { selectionStyle: { set: function(e) { this.onSelectionChange(), this._signal("changeSelectionStyle", { data: e }) }, initialValue: "line" }, highlightActiveLine: { set: function() { this.$updateHighlightActiveLine() }, initialValue: !0 }, highlightSelectedWord: { set: function(e) { this.$onSelectionChange() }, initialValue: !0 }, readOnly: { set: function(e) { this.$resetCursorStyle() }, initialValue: !1 }, cursorStyle: { set: function(e) { this.$resetCursorStyle() }, values: ["ace", "slim", "smooth", "wide"], initialValue: "ace" }, mergeUndoDeltas: { values: [!1, !0, "always"], initialValue: !0 }, behavioursEnabled: { initialValue: !0 }, wrapBehavioursEnabled: { initialValue: !0 }, autoScrollEditorIntoView: { set: function(e) { this.setAutoScrollEditorIntoView(e) } }, keyboardHandler: { set: function(e) { this.setKeyboardHandler(e) }, get: function() { return this.keybindingId }, handlesSet: !0 }, hScrollBarAlwaysVisible: "renderer", vScrollBarAlwaysVisible: "renderer", highlightGutterLine: "renderer", animatedScroll: "renderer", showInvisibles: "renderer", showPrintMargin: "renderer", printMarginColumn: "renderer", printMargin: "renderer", fadeFoldWidgets: "renderer", showFoldWidgets: "renderer", showLineNumbers: "renderer", showGutter: "renderer", displayIndentGuides: "renderer", fontSize: "renderer", fontFamily: "renderer", maxLines: "renderer", minLines: "renderer", scrollPastEnd: "renderer", fixedWidthGutter: "renderer", theme: "renderer", scrollSpeed: "$mouseHandler", dragDelay: "$mouseHandler", dragEnabled: "$mouseHandler", focusTimout: "$mouseHandler", tooltipFollowsMouse: "$mouseHandler", firstLineNumber: "session", overwrite: "session", newLineMode: "session", useWorker: "session", useSoftTabs: "session", tabSize: "session", wrap: "session", indentedSoftWrap: "session", foldStyle: "session", mode: "session" }), t.Editor = A
}), ace.define("ace/undomanager", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = function() { this.reset() };
    (function() {
        function e(e) { return { action: e.action, start: e.start, end: e.end, lines: 1 == e.lines.length ? null : e.lines, text: 1 == e.lines.length ? e.lines[0] : null } }

        function t(e) { return { action: e.action, start: e.start, end: e.end, lines: e.lines || [e.text] } }

        function n(e, t) {
            for (var n = new Array(e.length), i = 0; i < e.length; i++) {
                for (var o = e[i], r = { group: o.group, deltas: new Array(o.length) }, s = 0; s < o.deltas.length; s++) {
                    var a = o.deltas[s];
                    r.deltas[s] = t(a)
                }
                n[i] = r
            }
            return n
        }
        this.execute = function(e) {
            var t = e.args[0];
            this.$doc = e.args[1], e.merge && this.hasUndo() && (this.dirtyCounter--, t = this.$undoStack.pop().concat(t)), this.$undoStack.push(t), this.$redoStack = [], this.dirtyCounter < 0 && (this.dirtyCounter = NaN), this.dirtyCounter++
        }, this.undo = function(e) {
            var t = this.$undoStack.pop(),
                n = null;
            return t && (n = this.$doc.undoChanges(t, e), this.$redoStack.push(t), this.dirtyCounter--), n
        }, this.redo = function(e) {
            var t = this.$redoStack.pop(),
                n = null;
            return t && (n = this.$doc.redoChanges(this.$deserializeDeltas(t), e), this.$undoStack.push(t), this.dirtyCounter++), n
        }, this.reset = function() { this.$undoStack = [], this.$redoStack = [], this.dirtyCounter = 0 }, this.hasUndo = function() { return this.$undoStack.length > 0 }, this.hasRedo = function() { return this.$redoStack.length > 0 }, this.markClean = function() { this.dirtyCounter = 0 }, this.isClean = function() { return 0 === this.dirtyCounter }, this.$serializeDeltas = function(t) { return n(t, e) }, this.$deserializeDeltas = function(e) { return n(e, t) }
    }).call(i.prototype), t.UndoManager = i
}), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("../lib/dom"),
        o = e("../lib/oop"),
        r = e("../lib/lang"),
        s = e("../lib/event_emitter").EventEmitter,
        a = function(e) { this.element = i.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$cells = [] };
    (function() {
        o.implement(this, s), this.setSession = function(e) { this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e && e.on("change", this.$updateAnnotations) }, this.addGutterDecoration = function(e, t) { window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t) }, this.removeGutterDecoration = function(e, t) { window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t) }, this.setAnnotations = function(e) {
            this.$annotations = [];
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    i = n.row,
                    o = this.$annotations[i];
                o || (o = this.$annotations[i] = { text: [] });
                var s = n.text;
                s = s ? r.escapeHTML(s) : n.html || "", -1 === o.text.indexOf(s) && o.text.push(s);
                var a = n.type;
                "error" == a ? o.className = " ace_error" : "warning" == a && " ace_error" != o.className ? o.className = " ace_warning" : "info" == a && !o.className && (o.className = " ace_info")
            }
        }, this.$updateAnnotations = function(e) {
            if (this.$annotations.length) {
                var t = e.start.row,
                    n = e.end.row - t;
                if (0 !== n)
                    if ("remove" == e.action) this.$annotations.splice(t, n + 1, null);
                    else {
                        var i = new Array(n + 1);
                        i.unshift(t, 1), this.$annotations.splice.apply(this.$annotations, i)
                    }
            }
        }, this.update = function(e) {
            for (var t = this.session, n = e.firstRow, o = Math.min(e.lastRow + e.gutterOffset, t.getLength() - 1), r = t.getNextFoldLine(n), s = r ? r.start.row : 1 / 0, a = this.$showFoldWidgets && t.foldWidgets, l = t.$breakpoints, c = t.$decorations, h = t.$firstLineNumber, u = 0, d = t.gutterRenderer || this.$renderer, g = null, f = -1, p = n;;) {
                if (p > s && (p = r.end.row + 1, s = (r = t.getNextFoldLine(p, r)) ? r.start.row : 1 / 0), p > o) { for (; this.$cells.length > f + 1;) g = this.$cells.pop(), this.element.removeChild(g.element); break }(g = this.$cells[++f]) || ((g = { element: null, textNode: null, foldWidget: null }).element = i.createElement("div"), g.textNode = document.createTextNode(""), g.element.appendChild(g.textNode), this.element.appendChild(g.element), this.$cells[f] = g);
                var m = "ace_gutter-cell ";
                if (l[p] && (m += l[p]), c[p] && (m += c[p]), this.$annotations[p] && (m += this.$annotations[p].className), g.element.className != m && (g.element.className = m), (w = t.getRowLength(p) * e.lineHeight + "px") != g.element.style.height && (g.element.style.height = w), a) {
                    var v = a[p];
                    null == v && (v = a[p] = t.getFoldWidget(p))
                }
                if (v) {
                    g.foldWidget || (g.foldWidget = i.createElement("span"), g.element.appendChild(g.foldWidget));
                    m = "ace_fold-widget ace_" + v;
                    "start" == v && p == s && p < r.end.row ? m += " ace_closed" : m += " ace_open", g.foldWidget.className != m && (g.foldWidget.className = m);
                    var w = e.lineHeight + "px";
                    g.foldWidget.style.height != w && (g.foldWidget.style.height = w)
                } else g.foldWidget && (g.element.removeChild(g.foldWidget), g.foldWidget = null);
                var A = u = d ? d.getText(t, p) : p + h;
                A !== g.textNode.data && (g.textNode.data = A), p++
            }
            this.element.style.height = e.minHeight + "px", (this.$fixedWidth || t.$useWrapMode) && (u = t.getLength() + h);
            var C = d ? d.getWidth(t, u, e) : u.toString().length * e.characterWidth,
                b = this.$padding || this.$computePadding();
            (C += b.left + b.right) !== this.gutterWidth && !isNaN(C) && (this.gutterWidth = C, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", C))
        }, this.$fixedWidth = !1, this.$showLineNumbers = !0, this.$renderer = "", this.setShowLineNumbers = function(e) { this.$renderer = !e && { getWidth: function() { return "" }, getText: function() { return "" } } }, this.getShowLineNumbers = function() { return this.$showLineNumbers }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function(e) { e ? i.addCssClass(this.element, "ace_folding-enabled") : i.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null }, this.getShowFoldWidgets = function() { return this.$showFoldWidgets }, this.$computePadding = function() { if (!this.element.firstChild) return { left: 0, right: 0 }; var e = i.computedStyle(this.element.firstChild); return this.$padding = {}, this.$padding.left = parseInt(e.paddingLeft) + 1 || 0, this.$padding.right = parseInt(e.paddingRight) || 0, this.$padding }, this.getRegion = function(e) {
            var t = this.$padding || this.$computePadding(),
                n = this.element.getBoundingClientRect();
            return e.x < t.left + n.left ? "markers" : this.$showFoldWidgets && e.x > n.right - t.right ? "foldWidgets" : void 0
        }
    }).call(a.prototype), t.Gutter = a
}), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function(e, t, n) {
    "use strict";
    var i = e("../range").Range,
        o = e("../lib/dom"),
        r = function(e) { this.element = o.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element) };
    (function() {
        this.$padding = 0, this.setPadding = function(e) { this.$padding = e }, this.setSession = function(e) { this.session = e }, this.setMarkers = function(e) { this.markers = e }, this.update = function(e) {
            if (e) {
                this.config = e;
                var t = [];
                for (var n in this.markers) {
                    var i = this.markers[n];
                    if (i.range) {
                        var o = i.range.clipRows(e.firstRow, e.lastRow);
                        if (!o.isEmpty())
                            if (o = o.toScreenRange(this.session), i.renderer) {
                                var r = this.$getTop(o.start.row, e),
                                    s = this.$padding + o.start.column * e.characterWidth;
                                i.renderer(t, o, s, r, e)
                            } else "fullLine" == i.type ? this.drawFullLineMarker(t, o, i.clazz, e) : "screenLine" == i.type ? this.drawScreenLineMarker(t, o, i.clazz, e) : o.isMultiLine() ? "text" == i.type ? this.drawTextMarker(t, o, i.clazz, e) : this.drawMultiLineMarker(t, o, i.clazz, e) : this.drawSingleLineMarker(t, o, i.clazz + " ace_start ace_br15", e)
                    } else i.update(t, this, this.session, e)
                }
                this.element.innerHTML = t.join("")
            }
        }, this.$getTop = function(e, t) { return (e - t.firstRowScreen) * t.lineHeight }, this.drawTextMarker = function(e, t, n, o, r) { for (var s = this.session, a = t.start.row, l = t.end.row, c = a, h = 0, u = 0, d = s.getScreenLastRowColumn(c), g = new i(c, t.start.column, c, u); c <= l; c++) g.start.row = g.end.row = c, g.start.column = c == a ? t.start.column : s.getRowWrapIndent(c), g.end.column = d, h = u, u = d, d = c + 1 < l ? s.getScreenLastRowColumn(c + 1) : c == l ? 0 : t.end.column, this.drawSingleLineMarker(e, g, n + (c == a ? " ace_start" : "") + " ace_br" + ((c == a || c == a + 1 && t.start.column ? 1 : 0) | (h < u ? 2 : 0) | (u > d ? 4 : 0) | (c == l ? 8 : 0)), o, c == l ? 0 : 1, r) }, this.drawMultiLineMarker = function(e, t, n, i, o) {
            var r = this.$padding,
                s = i.lineHeight,
                a = this.$getTop(t.start.row, i),
                l = r + t.start.column * i.characterWidth;
            o = o || "", e.push("<div class='", n, " ace_br1 ace_start' style='", "height:", s, "px;", "right:0;", "top:", a, "px;", "left:", l, "px;", o, "'></div>"), a = this.$getTop(t.end.row, i);
            var c = t.end.column * i.characterWidth;
            if (e.push("<div class='", n, " ace_br12' style='", "height:", s, "px;", "width:", c, "px;", "top:", a, "px;", "left:", r, "px;", o, "'></div>"), !((s = (t.end.row - t.start.row - 1) * i.lineHeight) <= 0)) {
                a = this.$getTop(t.start.row + 1, i);
                var h = (t.start.column ? 1 : 0) | (t.end.column ? 0 : 8);
                e.push("<div class='", n, h ? " ace_br" + h : "", "' style='", "height:", s, "px;", "right:0;", "top:", a, "px;", "left:", r, "px;", o, "'></div>")
            }
        }, this.drawSingleLineMarker = function(e, t, n, i, o, r) {
            var s = i.lineHeight,
                a = (t.end.column + (o || 0) - t.start.column) * i.characterWidth,
                l = this.$getTop(t.start.row, i),
                c = this.$padding + t.start.column * i.characterWidth;
            e.push("<div class='", n, "' style='", "height:", s, "px;", "width:", a, "px;", "top:", l, "px;", "left:", c, "px;", r || "", "'></div>")
        }, this.drawFullLineMarker = function(e, t, n, i, o) {
            var r = this.$getTop(t.start.row, i),
                s = i.lineHeight;
            t.start.row != t.end.row && (s += this.$getTop(t.end.row, i) - r), e.push("<div class='", n, "' style='", "height:", s, "px;", "top:", r, "px;", "left:0;right:0;", o || "", "'></div>")
        }, this.drawScreenLineMarker = function(e, t, n, i, o) {
            var r = this.$getTop(t.start.row, i),
                s = i.lineHeight;
            e.push("<div class='", n, "' style='", "height:", s, "px;", "top:", r, "px;", "left:0;right:0;", o || "", "'></div>")
        }
    }).call(r.prototype), t.Marker = r
}), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("../lib/dom"),
        r = e("../lib/lang"),
        s = (e("../lib/useragent"), e("../lib/event_emitter").EventEmitter),
        a = function(e) { this.element = o.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this) };
    (function() {
        i.implement(this, s), this.EOF_CHAR = "¶", this.EOL_CHAR_LF = "¬", this.EOL_CHAR_CRLF = "¤", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "—", this.SPACE_CHAR = "·", this.$padding = 0, this.$updateEolChar = function() { var e = "\n" == this.session.doc.getNewLineCharacter() ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF; if (this.EOL_CHAR != e) return this.EOL_CHAR = e, !0 }, this.setPadding = function(e) { this.$padding = e, this.element.style.padding = "0 " + e + "px" }, this.getLineHeight = function() { return this.$fontMetrics.$characterSize.height || 0 }, this.getCharacterWidth = function() { return this.$fontMetrics.$characterSize.width || 0 }, this.$setFontMetrics = function(e) { this.$fontMetrics = e, this.$fontMetrics.on("changeCharacterSize", function(e) { this._signal("changeCharacterSize", e) }.bind(this)), this.$pollSizeChanges() }, this.checkForSizeChanges = function() { this.$fontMetrics.checkForSizeChanges() }, this.$pollSizeChanges = function() { return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges() }, this.setSession = function(e) { this.session = e, e && this.$computeTabString() }, this.showInvisibles = !1, this.setShowInvisibles = function(e) { return this.showInvisibles != e && (this.showInvisibles = e, this.$computeTabString(), !0) }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function(e) { return this.displayIndentGuides != e && (this.displayIndentGuides = e, this.$computeTabString(), !0) }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
            var e = this.session.getTabSize();
            this.tabSize = e;
            for (var t = this.$tabStrings = [0], n = 1; n < e + 1; n++) this.showInvisibles ? t.push("<span class='ace_invisible ace_invisible_tab'>" + r.stringRepeat(this.TAB_CHAR, n) + "</span>") : t.push(r.stringRepeat(" ", n));
            if (this.displayIndentGuides) {
                this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                var i = "ace_indent-guide",
                    o = "",
                    s = "";
                if (this.showInvisibles) {
                    i += " ace_invisible", o = " ace_invisible_space", s = " ace_invisible_tab";
                    var a = r.stringRepeat(this.SPACE_CHAR, this.tabSize),
                        l = r.stringRepeat(this.TAB_CHAR, this.tabSize)
                } else l = a = r.stringRepeat(" ", this.tabSize);
                this.$tabStrings[" "] = "<span class='" + i + o + "'>" + a + "</span>", this.$tabStrings["\t"] = "<span class='" + i + s + "'>" + l + "</span>"
            }
        }, this.updateLines = function(e, t, n) {
            (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) && this.scrollLines(e), this.config = e;
            for (var i = Math.max(t, e.firstRow), o = Math.min(n, e.lastRow), r = this.element.childNodes, s = 0, a = e.firstRow; a < i; a++) {
                if (l = this.session.getFoldLine(a)) {
                    if (l.containsRow(i)) { i = l.start.row; break }
                    a = l.end.row
                }
                s++
            }
            a = i;
            for (var l, c = (l = this.session.getNextFoldLine(a)) ? l.start.row : 1 / 0; a > c && (a = l.end.row + 1, c = (l = this.session.getNextFoldLine(a, l)) ? l.start.row : 1 / 0), !(a > o);) {
                var h = r[s++];
                if (h) {
                    var u = [];
                    this.$renderLine(u, a, !this.$useLineGroups(), a == c && l), h.style.height = e.lineHeight * this.session.getRowLength(a) + "px", h.innerHTML = u.join("")
                }
                a++
            }
        }, this.scrollLines = function(e) {
            var t = this.config;
            if (this.config = e, !t || t.lastRow < e.firstRow) return this.update(e);
            if (e.lastRow < t.firstRow) return this.update(e);
            var n = this.element;
            if (t.firstRow < e.firstRow)
                for (var i = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); i > 0; i--) n.removeChild(n.firstChild);
            if (t.lastRow > e.lastRow)
                for (i = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); i > 0; i--) n.removeChild(n.lastChild);
            if (e.firstRow < t.firstRow) {
                var o = this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1);
                n.firstChild ? n.insertBefore(o, n.firstChild) : n.appendChild(o)
            }
            if (e.lastRow > t.lastRow) {
                o = this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow);
                n.appendChild(o)
            }
        }, this.$renderLinesFragment = function(e, t, n) {
            for (var i = this.element.ownerDocument.createDocumentFragment(), r = t, s = this.session.getNextFoldLine(r), a = s ? s.start.row : 1 / 0; r > a && (r = s.end.row + 1, a = (s = this.session.getNextFoldLine(r, s)) ? s.start.row : 1 / 0), !(r > n);) {
                var l = o.createElement("div"),
                    c = [];
                if (this.$renderLine(c, r, !1, r == a && s), l.innerHTML = c.join(""), this.$useLineGroups()) l.className = "ace_line_group", i.appendChild(l), l.style.height = e.lineHeight * this.session.getRowLength(r) + "px";
                else
                    for (; l.firstChild;) i.appendChild(l.firstChild);
                r++
            }
            return i
        }, this.update = function(e) {
            this.config = e;
            for (var t = [], n = e.firstRow, i = e.lastRow, o = n, r = this.session.getNextFoldLine(o), s = r ? r.start.row : 1 / 0; o > s && (o = r.end.row + 1, s = (r = this.session.getNextFoldLine(o, r)) ? r.start.row : 1 / 0), !(o > i);) this.$useLineGroups() && t.push("<div class='ace_line_group' style='height:", e.lineHeight * this.session.getRowLength(o), "px'>"), this.$renderLine(t, o, !1, o == s && r), this.$useLineGroups() && t.push("</div>"), o++;
            this.element.innerHTML = t.join("")
        }, this.$textToken = { text: !0, rparen: !0, lparen: !0 }, this.$renderToken = function(e, t, n, i) {
            var o = this,
                s = i.replace(/\t|&|<|>|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF\uFFF9-\uFFFC])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g, function(e, n, i, s, a) {
                    if (n) return o.showInvisibles ? "<span class='ace_invisible ace_invisible_space'>" + r.stringRepeat(o.SPACE_CHAR, e.length) + "</span>" : e;
                    if ("&" == e) return "&#38;";
                    if ("<" == e) return "&#60;";
                    if (">" == e) return "&#62;";
                    if ("\t" == e) { var l = o.session.getScreenTabSize(t + s); return t += l - 1, o.$tabStrings[l] }
                    if ("　" == e) {
                        var c = o.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk",
                            h = o.showInvisibles ? o.SPACE_CHAR : "";
                        return t += 1, "<span class='" + c + "' style='width:" + 2 * o.config.characterWidth + "px'>" + h + "</span>"
                    }
                    return i ? "<span class='ace_invisible ace_invisible_space ace_invalid'>" + o.SPACE_CHAR + "</span>" : (t += 1, "<span class='ace_cjk' style='width:" + 2 * o.config.characterWidth + "px'>" + e + "</span>")
                });
            if (this.$textToken[n.type]) e.push(s);
            else {
                var a = "ace_" + n.type.replace(/\./g, " ace_"),
                    l = "";
                "fold" == n.type && (l = " style='width:" + n.value.length * this.config.characterWidth + "px;' "), e.push("<span class='", a, "'", l, ">", s, "</span>")
            }
            return t + i.length
        }, this.renderIndentGuide = function(e, t, n) { var i = t.search(this.$indentGuideRe); return i <= 0 || i >= n ? t : " " == t[0] ? (i -= i % this.tabSize, e.push(r.stringRepeat(this.$tabStrings[" "], i / this.tabSize)), t.substr(i)) : "\t" == t[0] ? (e.push(r.stringRepeat(this.$tabStrings["\t"], i)), t.substr(i)) : t }, this.$renderWrappedLine = function(e, t, n, i) {
            for (var o = 0, s = 0, a = n[0], l = 0, c = 0; c < t.length; c++) {
                var h = t[c],
                    u = h.value;
                if (0 == c && this.displayIndentGuides) {
                    if (o = u.length, !(u = this.renderIndentGuide(e, u, a))) continue;
                    o -= u.length
                }
                if (o + u.length < a) l = this.$renderToken(e, l, h, u), o += u.length;
                else {
                    for (; o + u.length >= a;) l = this.$renderToken(e, l, h, u.substring(0, a - o)), u = u.substring(a - o), o = a, i || e.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), e.push(r.stringRepeat(" ", n.indent)), l = 0, a = n[++s] || Number.MAX_VALUE;
                    0 != u.length && (o += u.length, l = this.$renderToken(e, l, h, u))
                }
            }
        }, this.$renderSimpleLine = function(e, t) {
            var n = 0,
                i = t[0],
                o = i.value;
            this.displayIndentGuides && (o = this.renderIndentGuide(e, o)), o && (n = this.$renderToken(e, n, i, o));
            for (var r = 1; r < t.length; r++) o = (i = t[r]).value, n = this.$renderToken(e, n, i, o)
        }, this.$renderLine = function(e, t, n, i) {
            if (!i && 0 != i && (i = this.session.getFoldLine(t)), i) var o = this.$getFoldLineTokens(t, i);
            else o = this.session.getTokens(t);
            if (n || e.push("<div class='ace_line' style='height:", this.config.lineHeight * (this.$useLineGroups() ? 1 : this.session.getRowLength(t)), "px'>"), o.length) {
                var r = this.session.getRowSplitData(t);
                r && r.length ? this.$renderWrappedLine(e, o, r, n) : this.$renderSimpleLine(e, o)
            }
            this.showInvisibles && (i && (t = i.end.row), e.push("<span class='ace_invisible ace_invisible_eol'>", t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), n || e.push("</div>")
        }, this.$getFoldLineTokens = function(e, t) {
            var n = this.session,
                i = [],
                o = n.getTokens(e);
            return t.walk(function(e, t, r, s, a) {
                null != e ? i.push({ type: "fold", value: e }) : (a && (o = n.getTokens(t)), o.length && function(e, t, n) {
                    for (var o = 0, r = 0; r + e[o].value.length < t;)
                        if (r += e[o].value.length, ++o == e.length) return;
                    for (r != t && ((s = e[o].value.substring(t - r)).length > n - t && (s = s.substring(0, n - t)), i.push({ type: e[o].type, value: s }), r = t + s.length, o += 1); r < n && o < e.length;) {
                        var s;
                        (s = e[o].value).length + r > n ? i.push({ type: e[o].type, value: s.substring(0, n - r) }) : i.push(e[o]), r += s.length, o += 1
                    }
                }(o, s, r))
            }, t.end.row, this.session.getLine(t.end.row).length), i
        }, this.$useLineGroups = function() { return this.session.getUseWrapMode() }, this.destroy = function() { clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode }
    }).call(a.prototype), t.Text = a
}), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
    "use strict";
    var i, o = e("../lib/dom"),
        r = function(e) { this.element = o.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), void 0 === i && (i = !("opacity" in this.element.style)), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), o.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = (i ? this.$updateVisibility : this.$updateOpacity).bind(this) };
    (function() {
        this.$updateVisibility = function(e) { for (var t = this.cursors, n = t.length; n--;) t[n].style.visibility = e ? "" : "hidden" }, this.$updateOpacity = function(e) { for (var t = this.cursors, n = t.length; n--;) t[n].style.opacity = e ? "" : "0" }, this.$padding = 0, this.setPadding = function(e) { this.$padding = e }, this.setSession = function(e) { this.session = e }, this.setBlinking = function(e) { e != this.isBlinking && (this.isBlinking = e, this.restartTimer()) }, this.setBlinkInterval = function(e) { e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer()) }, this.setSmoothBlinking = function(e) { e != this.smoothBlinking && !i && (this.smoothBlinking = e, o.setCssClass(this.element, "ace_smooth-blinking", e), this.$updateCursors(!0), this.$updateCursors = this.$updateOpacity.bind(this), this.restartTimer()) }, this.addCursor = function() { var e = o.createElement("div"); return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e }, this.removeCursor = function() { if (this.cursors.length > 1) { var e = this.cursors.pop(); return e.parentNode.removeChild(e), e } }, this.hideCursor = function() { this.isVisible = !1, o.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer() }, this.showCursor = function() { this.isVisible = !0, o.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer() }, this.restartTimer = function() {
            var e = this.$updateCursors;
            if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking && o.removeCssClass(this.element, "ace_smooth-blinking"), e(!0), this.isBlinking && this.blinkInterval && this.isVisible) {
                this.smoothBlinking && setTimeout(function() { o.addCssClass(this.element, "ace_smooth-blinking") }.bind(this));
                var t = function() { this.timeoutId = setTimeout(function() { e(!1) }, .6 * this.blinkInterval) }.bind(this);
                this.intervalId = setInterval(function() { e(!0), t() }, this.blinkInterval), t()
            }
        }, this.getPixelPosition = function(e, t) {
            if (!this.config || !this.session) return { left: 0, top: 0 };
            e || (e = this.session.selection.getCursor());
            var n = this.session.documentToScreenPosition(e);
            return { left: this.$padding + n.column * this.config.characterWidth, top: (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight }
        }, this.update = function(e) {
            this.config = e;
            var t = this.session.$selectionMarkers,
                n = 0,
                i = 0;
            void 0 !== t && 0 !== t.length || (t = [{ cursor: null }]);
            n = 0;
            for (var o = t.length; n < o; n++) {
                var r = this.getPixelPosition(t[n].cursor, !0);
                if (!((r.top > e.height + e.offset || r.top < 0) && n > 1)) {
                    var s = (this.cursors[i++] || this.addCursor()).style;
                    this.drawCursor ? this.drawCursor(s, r, e, t[n], this.session) : (s.left = r.left + "px", s.top = r.top + "px", s.width = e.characterWidth + "px", s.height = e.lineHeight + "px")
                }
            }
            for (; this.cursors.length > i;) this.removeCursor();
            var a = this.session.getOverwrite();
            this.$setOverwrite(a), this.$pixelPos = r, this.restartTimer()
        }, this.drawCursor = null, this.$setOverwrite = function(e) { e != this.overwrite && (this.overwrite = e, e ? o.addCssClass(this.element, "ace_overwrite-cursors") : o.removeCssClass(this.element, "ace_overwrite-cursors")) }, this.destroy = function() { clearInterval(this.intervalId), clearTimeout(this.timeoutId) }
    }).call(r.prototype), t.Cursor = r
}), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./lib/dom"),
        r = e("./lib/event"),
        s = e("./lib/event_emitter").EventEmitter,
        a = function(e) { this.element = o.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = o.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), e.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, r.addListener(this.element, "scroll", this.onScroll.bind(this)), r.addListener(this.element, "mousedown", r.preventDefault) };
    (function() { i.implement(this, s), this.setVisible = function(e) { this.element.style.display = e ? "" : "none", this.isVisible = e, this.coeff = 1 } }).call(a.prototype);
    var l = function(e, t) { a.call(this, e), this.scrollTop = 0, this.scrollHeight = 0, t.$scrollbarWidth = this.width = o.scrollbarWidth(e.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", this.$minWidth = 0 };
    i.inherits(l, a),
        function() {
            this.classSuffix = "-v", this.onScroll = function() {
                if (!this.skipEvent) {
                    if (this.scrollTop = this.element.scrollTop, 1 != this.coeff) {
                        var e = this.element.clientHeight / this.scrollHeight;
                        this.scrollTop = this.scrollTop * (1 - e) / (this.coeff - e)
                    }
                    this._emit("scroll", { data: this.scrollTop })
                }
                this.skipEvent = !1
            }, this.getWidth = function() { return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0) }, this.setHeight = function(e) { this.element.style.height = e + "px" }, this.setInnerHeight = this.setScrollHeight = function(e) { this.scrollHeight = e, e > 32768 ? (this.coeff = 32768 / e, e = 32768) : 1 != this.coeff && (this.coeff = 1), this.inner.style.height = e + "px" }, this.setScrollTop = function(e) { this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = e, this.element.scrollTop = e * this.coeff) }
        }.call(l.prototype);
    var c = function(e, t) { a.call(this, e), this.scrollLeft = 0, this.height = t.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px" };
    i.inherits(c, a),
        function() { this.classSuffix = "-h", this.onScroll = function() { this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", { data: this.scrollLeft })), this.skipEvent = !1 }, this.getHeight = function() { return this.isVisible ? this.height : 0 }, this.setWidth = function(e) { this.element.style.width = e + "px" }, this.setInnerWidth = function(e) { this.inner.style.width = e + "px" }, this.setScrollWidth = function(e) { this.inner.style.width = e + "px" }, this.setScrollLeft = function(e) { this.scrollLeft != e && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e) } }.call(c.prototype), t.ScrollBar = l, t.ScrollBarV = l, t.ScrollBarH = c, t.VScrollBar = l, t.HScrollBar = c
}), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function(e, t, n) {
    "use strict";
    var i = e("./lib/event"),
        o = function(e, t) { this.onRender = e, this.pending = !1, this.changes = 0, this.window = t || window };
    (function() {
        this.schedule = function(e) {
            if (this.changes = this.changes | e, !this.pending && this.changes) {
                this.pending = !0;
                var t = this;
                i.nextFrame(function() { var e; for (t.pending = !1; e = t.changes;) t.changes = 0, t.onRender(e) }, this.window)
            }
        }
    }).call(o.prototype), t.RenderLoop = o
}), ace.define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function(e, t, n) {
    var i = e("../lib/oop"),
        o = e("../lib/dom"),
        r = e("../lib/lang"),
        s = e("../lib/useragent"),
        a = e("../lib/event_emitter").EventEmitter,
        l = 0,
        c = t.FontMetrics = function(e) { this.el = o.createElement("div"), this.$setMeasureNodeStyles(this.el.style, !0), this.$main = o.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = o.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), e.appendChild(this.el), l || this.$testFractionalRect(), this.$measureNode.innerHTML = r.stringRepeat("X", l), this.$characterSize = { width: 0, height: 0 }, this.checkForSizeChanges() };
    (function() {
        i.implement(this, a), this.$characterSize = { width: 0, height: 0 }, this.$testFractionalRect = function() {
            var e = o.createElement("div");
            this.$setMeasureNodeStyles(e.style), e.style.width = "0.2px", document.documentElement.appendChild(e);
            var t = e.getBoundingClientRect().width;
            l = t > 0 && t < 1 ? 50 : 100, e.parentNode.removeChild(e)
        }, this.$setMeasureNodeStyles = function(e, t) { e.width = e.height = "auto", e.left = e.top = "0px", e.visibility = "hidden", e.position = "absolute", e.whiteSpace = "pre", s.isIE < 8 ? e["font-family"] = "inherit" : e.font = "inherit", e.overflow = t ? "hidden" : "visible" }, this.checkForSizeChanges = function() {
            var e = this.$measureSizes();
            if (e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                this.$measureNode.style.fontWeight = "bold";
                var t = this.$measureSizes();
                this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.charSizes = Object.create(null), this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", { data: e })
            }
        }, this.$pollSizeChanges = function() { if (this.$pollSizeChangesTimer) return this.$pollSizeChangesTimer; var e = this; return this.$pollSizeChangesTimer = setInterval(function() { e.checkForSizeChanges() }, 500) }, this.setPolling = function(e) { e ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0) }, this.$measureSizes = function() { if (50 === l) { var e = null; try { e = this.$measureNode.getBoundingClientRect() } catch (t) { e = { width: 0, height: 0 } } var t = { height: e.height, width: e.width / l } } else t = { height: this.$measureNode.clientHeight, width: this.$measureNode.clientWidth / l }; return 0 === t.width || 0 === t.height ? null : t }, this.$measureCharWidth = function(e) { return this.$main.innerHTML = r.stringRepeat(e, l), this.$main.getBoundingClientRect().width / l }, this.getCharacterWidth = function(e) { var t = this.charSizes[e]; return void 0 === t && (t = this.charSizes[e] = this.$measureCharWidth(e) / this.$characterSize.width), t }, this.destroy = function() { clearInterval(this.$pollSizeChangesTimer), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el) }
    }).call(c.prototype)
}), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/lib/useragent", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter"], function(e, t, n) {
    "use strict";
    var i = e("./lib/oop"),
        o = e("./lib/dom"),
        r = e("./config"),
        s = e("./lib/useragent"),
        a = e("./layer/gutter").Gutter,
        l = e("./layer/marker").Marker,
        c = e("./layer/text").Text,
        h = e("./layer/cursor").Cursor,
        u = e("./scrollbar").HScrollBar,
        d = e("./scrollbar").VScrollBar,
        g = e("./renderloop").RenderLoop,
        f = e("./layer/font_metrics").FontMetrics,
        p = e("./lib/event_emitter").EventEmitter;
    o.importCssString('.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;min-width: 100%;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;text-indent: -1em;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: inherit;color: inherit;z-index: 1000;opacity: 1;text-indent: 0;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-webkit-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-webkit-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-webkit-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_text-input-ios {position: absolute !important;top: -100000px !important;left: -100000px !important;}', "ace_editor.css");
    var m = function(e, t) {
        var n = this;
        this.container = e || o.createElement("div"), this.$keepTextAreaAtCursor = !s.isOldIE, o.addCssClass(this.container, "ace_editor"), this.setTheme(t), this.$gutter = o.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = o.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = o.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new a(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new l(this.content);
        var i = this.$textLayer = new c(this.content);
        this.canvas = i.element, this.$markerFront = new l(this.content), this.$cursorLayer = new h(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new d(this.container, this), this.scrollBarH = new u(this.container, this), this.scrollBarV.addEventListener("scroll", function(e) { n.$scrollAnimation || n.session.setScrollTop(e.data - n.scrollMargin.top) }), this.scrollBarH.addEventListener("scroll", function(e) { n.$scrollAnimation || n.session.setScrollLeft(e.data - n.scrollMargin.left) }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = { row: 0, column: 0 }, this.$fontMetrics = new f(this.container), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.addEventListener("changeCharacterSize", function(e) { n.updateCharacterSize(), n.onResize(!0, n.gutterWidth, n.$size.width, n.$size.height), n._signal("changeCharacterSize", e) }), this.$size = { width: 0, height: 0, scrollerHeight: 0, scrollerWidth: 0, $dirty: !0 }, this.layerConfig = { width: 1, padding: 0, firstRow: 0, firstRowScreen: 0, lastRow: 0, lineHeight: 0, characterWidth: 0, minHeight: 1, maxHeight: 1, offset: 0, height: 1, gutterOffset: 1 }, this.scrollMargin = { left: 0, right: 0, top: 0, bottom: 0, v: 0, h: 0 }, this.$loop = new g(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), r.resetOptions(this), r._emit("renderer", this)
    };
    (function() {
        this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, i.implement(this, p), this.updateCharacterSize = function() { this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin() }, this.setSession = function(e) { this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = e, e && this.scrollMargin.top && e.getScrollTop() <= 0 && e.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), e && (this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null, this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode)) }, this.updateLines = function(e, t, n) {
            if (void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = { firstRow: e, lastRow: t }, this.$changedLines.lastRow < this.layerConfig.firstRow) {
                if (!n) return;
                this.$changedLines.lastRow = this.layerConfig.lastRow
            }
            this.$changedLines.firstRow > this.layerConfig.lastRow || this.$loop.schedule(this.CHANGE_LINES)
        }, this.onChangeNewLineMode = function() { this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar() }, this.onChangeTabSize = function() { this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize() }, this.updateText = function() { this.$loop.schedule(this.CHANGE_TEXT) }, this.updateFull = function(e) { e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL) }, this.updateFontSize = function() { this.$textLayer.checkForSizeChanges() }, this.$changes = 0, this.$updateSizeAsync = function() { this.$loop.pending ? this.$size.$dirty = !0 : this.onResize() }, this.onResize = function(e, t, n, i) {
            if (!(this.resizing > 2)) {
                this.resizing > 0 ? this.resizing++ : this.resizing = e ? 1 : 0;
                var o = this.container;
                i || (i = o.clientHeight || o.scrollHeight), n || (n = o.clientWidth || o.scrollWidth);
                var r = this.$updateCachedSize(e, t, n, i);
                if (!this.$size.scrollerHeight || !n && !i) return this.resizing = 0;
                e && (this.$gutterLayer.$padding = null), e ? this.$renderChanges(r | this.$changes, !0) : this.$loop.schedule(r | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null
            }
        }, this.$updateCachedSize = function(e, t, n, i) {
            i -= this.$extraHeight || 0;
            var o = 0,
                r = this.$size,
                s = { width: r.width, height: r.height, scrollerHeight: r.scrollerHeight, scrollerWidth: r.scrollerWidth };
            return i && (e || r.height != i) && (r.height = i, o |= this.CHANGE_SIZE, r.scrollerHeight = r.height, this.$horizScroll && (r.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", o |= this.CHANGE_SCROLL), n && (e || r.width != n) && (o |= this.CHANGE_SIZE, r.width = n, null == t && (t = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t, this.scrollBarH.element.style.left = this.scroller.style.left = t + "px", r.scrollerWidth = Math.max(0, n - t - this.scrollBarV.getWidth()), this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px", this.scroller.style.bottom = this.scrollBarH.getHeight() + "px", (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (o |= this.CHANGE_FULL)), r.$dirty = !n || !i, o && this._signal("resize", s), o
        }, this.onGutterResize = function() {
            var e = this.$showGutter ? this.$gutter.offsetWidth : 0;
            e != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, e, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : (this.$computeLayerConfig(), this.$loop.schedule(this.CHANGE_MARKER))
        }, this.adjustWrapLimit = function() {
            var e = this.$size.scrollerWidth - 2 * this.$padding,
                t = Math.floor(e / this.characterWidth);
            return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
        }, this.setAnimatedScroll = function(e) { this.setOption("animatedScroll", e) }, this.getAnimatedScroll = function() { return this.$animatedScroll }, this.setShowInvisibles = function(e) { this.setOption("showInvisibles", e) }, this.getShowInvisibles = function() { return this.getOption("showInvisibles") }, this.getDisplayIndentGuides = function() { return this.getOption("displayIndentGuides") }, this.setDisplayIndentGuides = function(e) { this.setOption("displayIndentGuides", e) }, this.setShowPrintMargin = function(e) { this.setOption("showPrintMargin", e) }, this.getShowPrintMargin = function() { return this.getOption("showPrintMargin") }, this.setPrintMarginColumn = function(e) { this.setOption("printMarginColumn", e) }, this.getPrintMarginColumn = function() { return this.getOption("printMarginColumn") }, this.getShowGutter = function() { return this.getOption("showGutter") }, this.setShowGutter = function(e) { return this.setOption("showGutter", e) }, this.getFadeFoldWidgets = function() { return this.getOption("fadeFoldWidgets") }, this.setFadeFoldWidgets = function(e) { this.setOption("fadeFoldWidgets", e) }, this.setHighlightGutterLine = function(e) { this.setOption("highlightGutterLine", e) }, this.getHighlightGutterLine = function() { return this.getOption("highlightGutterLine") }, this.$updateGutterLineHighlight = function() {
            var e = this.$cursorLayer.$pixelPos,
                t = this.layerConfig.lineHeight;
            if (this.session.getUseWrapMode()) {
                var n = this.session.selection.getCursor();
                n.column = 0, e = this.$cursorLayer.getPixelPosition(n, !0), t *= this.session.getRowLength(n.row)
            }
            this.$gutterLineHighlight.style.top = e.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = t + "px"
        }, this.$updatePrintMargin = function() {
            if (this.$showPrintMargin || this.$printMarginEl) {
                if (!this.$printMarginEl) {
                    var e = o.createElement("div");
                    e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = o.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
                }
                var t = this.$printMarginEl.style;
                t.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
            }
        }, this.getContainerElement = function() { return this.container }, this.getMouseEventTarget = function() { return this.scroller }, this.getTextAreaContainer = function() { return this.container }, this.$moveTextAreaToCursor = function() {
            if (this.$keepTextAreaAtCursor) {
                var e = this.layerConfig,
                    t = this.$cursorLayer.$pixelPos.top,
                    n = this.$cursorLayer.$pixelPos.left;
                t -= e.offset;
                var i = this.textarea.style,
                    o = this.lineHeight;
                if (t < 0 || t > e.height - o) i.top = i.left = "0";
                else {
                    var r = this.characterWidth;
                    if (this.$composition) {
                        var s = this.textarea.value.replace(/^\x01+/, "");
                        r *= this.session.$getStringScreenWidth(s)[0] + 2, o += 2
                    }(n -= this.scrollLeft) > this.$size.scrollerWidth - r && (n = this.$size.scrollerWidth - r), n += this.gutterWidth, i.height = o + "px", i.width = r + "px", i.left = Math.min(n, this.$size.scrollerWidth - r) + "px", i.top = Math.min(t, this.$size.height - o) + "px"
                }
            }
        }, this.getFirstVisibleRow = function() { return this.layerConfig.firstRow }, this.getFirstFullyVisibleRow = function() { return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1) }, this.getLastFullyVisibleRow = function() {
            var e = this.layerConfig,
                t = e.lastRow;
            return this.session.documentToScreenRow(t, 0) * e.lineHeight - this.session.getScrollTop() > e.height - e.lineHeight ? t - 1 : t
        }, this.getLastVisibleRow = function() { return this.layerConfig.lastRow }, this.$padding = null, this.setPadding = function(e) { this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin() }, this.setScrollMargin = function(e, t, n, i) {
            var o = this.scrollMargin;
            o.top = 0 | e, o.bottom = 0 | t, o.right = 0 | i, o.left = 0 | n, o.v = o.top + o.bottom, o.h = o.left + o.right, o.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-o.top), this.updateFull()
        }, this.getHScrollBarAlwaysVisible = function() { return this.$hScrollBarAlwaysVisible }, this.setHScrollBarAlwaysVisible = function(e) { this.setOption("hScrollBarAlwaysVisible", e) }, this.getVScrollBarAlwaysVisible = function() { return this.$vScrollBarAlwaysVisible }, this.setVScrollBarAlwaysVisible = function(e) { this.setOption("vScrollBarAlwaysVisible", e) }, this.$updateScrollBarV = function() {
            var e = this.layerConfig.maxHeight,
                t = this.$size.scrollerHeight;
            !this.$maxLines && this.$scrollPastEnd && (e -= (t - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > e - t && (e = this.scrollTop + t, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(e + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
        }, this.$updateScrollBarH = function() { this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left) }, this.$frozen = !1, this.freeze = function() { this.$frozen = !0 }, this.unfreeze = function() { this.$frozen = !1 }, this.$renderChanges = function(e, t) {
            if (this.$changes && (e |= this.$changes, this.$changes = 0), this.session && this.container.offsetWidth && !this.$frozen && (e || t)) {
                if (this.$size.$dirty) return this.$changes |= e, this.onResize(!0);
                this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender");
                var n = this.layerConfig;
                if (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) {
                    if (e |= this.$computeLayerConfig(), n.firstRow != this.layerConfig.firstRow && n.firstRowScreen == this.layerConfig.firstRowScreen) {
                        var i = this.scrollTop + (n.firstRow - this.layerConfig.firstRow) * this.lineHeight;
                        i > 0 && (this.scrollTop = i, e |= this.CHANGE_SCROLL, e |= this.$computeLayerConfig())
                    }
                    n = this.layerConfig, this.$updateScrollBarV(), e & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), this.$gutterLayer.element.style.marginTop = -n.offset + "px", this.content.style.marginTop = -n.offset + "px", this.content.style.width = n.width + 2 * this.$padding + "px", this.content.style.height = n.minHeight + "px"
                }
                return e & this.CHANGE_H_SCROLL && (this.content.style.marginLeft = -this.scrollLeft + "px", this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), e & this.CHANGE_FULL ? (this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), void this._signal("afterRender")) : e & this.CHANGE_SCROLL ? (e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(n) : this.$textLayer.scrollLines(n), this.$showGutter && this.$gutterLayer.update(n), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this.$moveTextAreaToCursor(), void this._signal("afterRender")) : (e & this.CHANGE_TEXT ? (this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(n) : (e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER) && this.$showGutter && this.$gutterLayer.update(n), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(n), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(n), void this._signal("afterRender"))
            }
            this.$changes |= e
        }, this.$autosize = function() {
            var e = this.session.getScreenLength() * this.lineHeight,
                t = this.$maxLines * this.lineHeight,
                n = Math.min(t, Math.max((this.$minLines || 1) * this.lineHeight, e)) + this.scrollMargin.v + (this.$extraHeight || 0);
            this.$horizScroll && (n += this.scrollBarH.getHeight()), this.$maxPixelHeight && n > this.$maxPixelHeight && (n = this.$maxPixelHeight);
            var i = e > t;
            if (n != this.desiredHeight || this.$size.height != this.desiredHeight || i != this.$vScroll) {
                i != this.$vScroll && (this.$vScroll = i, this.scrollBarV.setVisible(i));
                var o = this.container.clientWidth;
                this.container.style.height = n + "px", this.$updateCachedSize(!0, this.$gutterWidth, o, n), this.desiredHeight = n, this._signal("autosize")
            }
        }, this.$computeLayerConfig = function() {
            var e = this.session,
                t = this.$size,
                n = t.height <= 2 * this.lineHeight,
                i = this.session.getScreenLength() * this.lineHeight,
                o = this.$getLongestLine(),
                r = !n && (this.$hScrollBarAlwaysVisible || t.scrollerWidth - o - 2 * this.$padding < 0),
                s = this.$horizScroll !== r;
            s && (this.$horizScroll = r, this.scrollBarH.setVisible(r));
            var a = this.$vScroll;
            this.$maxLines && this.lineHeight > 1 && this.$autosize();
            var l = this.scrollTop % this.lineHeight,
                c = t.scrollerHeight + this.lineHeight,
                h = !this.$maxLines && this.$scrollPastEnd ? (t.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
            i += h;
            var u = this.scrollMargin;
            this.session.setScrollTop(Math.max(-u.top, Math.min(this.scrollTop, i - t.scrollerHeight + u.bottom))), this.session.setScrollLeft(Math.max(-u.left, Math.min(this.scrollLeft, o + 2 * this.$padding - t.scrollerWidth + u.right)));
            var d = !n && (this.$vScrollBarAlwaysVisible || t.scrollerHeight - i + h < 0 || this.scrollTop > u.top),
                g = a !== d;
            g && (this.$vScroll = d, this.scrollBarV.setVisible(d));
            var f, p, m = Math.ceil(c / this.lineHeight) - 1,
                v = Math.max(0, Math.round((this.scrollTop - l) / this.lineHeight)),
                w = v + m,
                A = this.lineHeight;
            v = e.screenToDocumentRow(v, 0);
            var C = e.getFoldLine(v);
            C && (v = C.start.row), f = e.documentToScreenRow(v, 0), p = e.getRowLength(v) * A, w = Math.min(e.screenToDocumentRow(w, 0), e.getLength() - 1), c = t.scrollerHeight + e.getRowLength(w) * A + p, l = this.scrollTop - f * A;
            var b = 0;
            return this.layerConfig.width != o && (b = this.CHANGE_H_SCROLL), (s || g) && (b = this.$updateCachedSize(!0, this.gutterWidth, t.width, t.height), this._signal("scrollbarVisibilityChanged"), g && (o = this.$getLongestLine())), this.layerConfig = { width: o, padding: this.$padding, firstRow: v, firstRowScreen: f, lastRow: w, lineHeight: A, characterWidth: this.characterWidth, minHeight: c, maxHeight: i, offset: l, gutterOffset: A ? Math.max(0, Math.ceil((l + t.height - t.scrollerHeight) / A)) : 0, height: this.$size.scrollerHeight }, b
        }, this.$updateLines = function() {
            if (this.$changedLines) {
                var e = this.$changedLines.firstRow,
                    t = this.$changedLines.lastRow;
                this.$changedLines = null;
                var n = this.layerConfig;
                if (!(e > n.lastRow + 1 || t < n.firstRow)) return t === 1 / 0 ? (this.$showGutter && this.$gutterLayer.update(n), void this.$textLayer.update(n)) : (this.$textLayer.updateLines(n, e, t), !0)
            }
        }, this.$getLongestLine = function() { var e = this.session.getScreenWidth(); return this.showInvisibles && !this.session.$useWrapMode && (e += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth)) }, this.updateFrontMarkers = function() { this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT) }, this.updateBackMarkers = function() { this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK) }, this.addGutterDecoration = function(e, t) { this.$gutterLayer.addGutterDecoration(e, t) }, this.removeGutterDecoration = function(e, t) { this.$gutterLayer.removeGutterDecoration(e, t) }, this.updateBreakpoints = function(e) { this.$loop.schedule(this.CHANGE_GUTTER) }, this.setAnnotations = function(e) { this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER) }, this.updateCursor = function() { this.$loop.schedule(this.CHANGE_CURSOR) }, this.hideCursor = function() { this.$cursorLayer.hideCursor() }, this.showCursor = function() { this.$cursorLayer.showCursor() }, this.scrollSelectionIntoView = function(e, t, n) { this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n) }, this.scrollCursorIntoView = function(e, t, n) {
            if (0 !== this.$size.scrollerHeight) {
                var i = this.$cursorLayer.getPixelPosition(e),
                    o = i.left,
                    r = i.top,
                    s = n && n.top || 0,
                    a = n && n.bottom || 0,
                    l = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
                l + s > r ? (t && l + s > r + this.lineHeight && (r -= t * this.$size.scrollerHeight), 0 === r && (r = -this.scrollMargin.top), this.session.setScrollTop(r)) : l + this.$size.scrollerHeight - a < r + this.lineHeight && (t && l + this.$size.scrollerHeight - a < r - this.lineHeight && (r += t * this.$size.scrollerHeight), this.session.setScrollTop(r + this.lineHeight - this.$size.scrollerHeight));
                var c = this.scrollLeft;
                c > o ? (o < this.$padding + 2 * this.layerConfig.characterWidth && (o = -this.scrollMargin.left), this.session.setScrollLeft(o)) : c + this.$size.scrollerWidth < o + this.characterWidth ? this.session.setScrollLeft(Math.round(o + this.characterWidth - this.$size.scrollerWidth)) : c <= this.$padding && o - c < this.characterWidth && this.session.setScrollLeft(0)
            }
        }, this.getScrollTop = function() { return this.session.getScrollTop() }, this.getScrollLeft = function() { return this.session.getScrollLeft() }, this.getScrollTopRow = function() { return this.scrollTop / this.lineHeight }, this.getScrollBottomRow = function() { return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1) }, this.scrollToRow = function(e) { this.session.setScrollTop(e * this.lineHeight) }, this.alignCursor = function(e, t) {
            "number" == typeof e && (e = { row: e, column: 0 });
            var n = this.$cursorLayer.getPixelPosition(e),
                i = this.$size.scrollerHeight - this.lineHeight,
                o = n.top - i * (t || 0);
            return this.session.setScrollTop(o), o
        }, this.STEPS = 8, this.$calcSteps = function(e, t) {
            var n, i, o = 0,
                r = this.STEPS,
                s = [];
            for (o = 0; o < r; ++o) s.push((n = o / this.STEPS, i = e, (t - e) * (Math.pow(n - 1, 3) + 1) + i));
            return s
        }, this.scrollToLine = function(e, t, n, i) {
            var o = this.$cursorLayer.getPixelPosition({ row: e, column: 0 }).top;
            t && (o -= this.$size.scrollerHeight / 2);
            var r = this.scrollTop;
            this.session.setScrollTop(o), !1 !== n && this.animateScrolling(r, i)
        }, this.animateScrolling = function(e, t) {
            var n = this.scrollTop;
            if (this.$animatedScroll) {
                var i = this;
                if (e != n) {
                    if (this.$scrollAnimation) { var o = this.$scrollAnimation.steps; if (o.length && (e = o[0]) == n) return }
                    var r = i.$calcSteps(e, n);
                    this.$scrollAnimation = { from: e, to: n, steps: r }, clearInterval(this.$timer), i.session.setScrollTop(r.shift()), i.session.$scrollTop = n, this.$timer = setInterval(function() { r.length ? (i.session.setScrollTop(r.shift()), i.session.$scrollTop = n) : null != n ? (i.session.$scrollTop = -1, i.session.setScrollTop(n), n = null) : (i.$timer = clearInterval(i.$timer), i.$scrollAnimation = null, t && t()) }, 10)
                }
            }
        }, this.scrollToY = function(e) { this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e) }, this.scrollToX = function(e) { this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL) }, this.scrollTo = function(e, t) { this.session.setScrollTop(t), this.session.setScrollLeft(t) }, this.scrollBy = function(e, t) { t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e) }, this.isScrollableBy = function(e, t) { return t < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top || (t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom || (e < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left || (e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right || void 0))) }, this.pixelToScreenCoordinates = function(e, t) {
            var n = this.scroller.getBoundingClientRect(),
                i = (e + this.scrollLeft - n.left - this.$padding) / this.characterWidth,
                o = Math.floor((t + this.scrollTop - n.top) / this.lineHeight),
                r = Math.round(i);
            return { row: o, column: r, side: i - r > 0 ? 1 : -1 }
        }, this.screenToTextCoordinates = function(e, t) {
            var n = this.scroller.getBoundingClientRect(),
                i = Math.round((e + this.scrollLeft - n.left - this.$padding) / this.characterWidth),
                o = (t + this.scrollTop - n.top) / this.lineHeight;
            return this.session.screenToDocumentPosition(o, Math.max(i, 0))
        }, this.textToScreenCoordinates = function(e, t) {
            var n = this.scroller.getBoundingClientRect(),
                i = this.session.documentToScreenPosition(e, t),
                o = this.$padding + Math.round(i.column * this.characterWidth),
                r = i.row * this.lineHeight;
            return { pageX: n.left + o - this.scrollLeft, pageY: n.top + r - this.scrollTop }
        }, this.visualizeFocus = function() { o.addCssClass(this.container, "ace_focus") }, this.visualizeBlur = function() { o.removeCssClass(this.container, "ace_focus") }, this.showComposition = function(e) { this.$composition || (this.$composition = { keepTextAreaAtCursor: this.$keepTextAreaAtCursor, cssText: this.textarea.style.cssText }), this.$keepTextAreaAtCursor = !0, o.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor() }, this.setCompositionText = function(e) { this.$moveTextAreaToCursor() }, this.hideComposition = function() { this.$composition && (o.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null) }, this.setTheme = function(e, t) {
            function n(n) {
                if (i.$themeId != e) return t && t();
                if (!n || !n.cssClass) throw new Error("couldn't load module " + e + " or it didn't call define");
                o.importCssString(n.cssText, n.cssClass, i.container.ownerDocument), i.theme && o.removeCssClass(i.container, i.theme.cssClass);
                var r = "padding" in n ? n.padding : "padding" in (i.theme || {}) ? 4 : i.$padding;
                i.$padding && r != i.$padding && i.setPadding(r), i.$theme = n.cssClass, i.theme = n, o.addCssClass(i.container, n.cssClass), o.setCssClass(i.container, "ace_dark", n.isDark), i.$size && (i.$size.width = 0, i.$updateSizeAsync()), i._dispatchEvent("themeLoaded", { theme: n }), t && t()
            }
            var i = this;
            if (this.$themeId = e, i._dispatchEvent("themeChange", { theme: e }), e && "string" != typeof e) n(e);
            else {
                var s = e || this.$options.theme.initialValue;
                r.loadModule(["theme", s], n)
            }
        }, this.getTheme = function() { return this.$themeId }, this.setStyle = function(e, t) { o.setCssClass(this.container, e, !1 !== t) }, this.unsetStyle = function(e) { o.removeCssClass(this.container, e) }, this.setCursorStyle = function(e) { this.scroller.style.cursor != e && (this.scroller.style.cursor = e) }, this.setMouseCursor = function(e) { this.scroller.style.cursor = e }, this.destroy = function() { this.$textLayer.destroy(), this.$cursorLayer.destroy() }
    }).call(m.prototype), r.defineOptions(m.prototype, "renderer", {
        animatedScroll: { initialValue: !1 },
        showInvisibles: { set: function(e) { this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT) }, initialValue: !1 },
        showPrintMargin: { set: function() { this.$updatePrintMargin() }, initialValue: !0 },
        printMarginColumn: { set: function() { this.$updatePrintMargin() }, initialValue: 80 },
        printMargin: { set: function(e) { "number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin() }, get: function() { return this.$showPrintMargin && this.$printMarginColumn } },
        showGutter: { set: function(e) { this.$gutter.style.display = e ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize() }, initialValue: !0 },
        fadeFoldWidgets: { set: function(e) { o.setCssClass(this.$gutter, "ace_fade-fold-widgets", e) }, initialValue: !1 },
        showFoldWidgets: { set: function(e) { this.$gutterLayer.setShowFoldWidgets(e) }, initialValue: !0 },
        showLineNumbers: { set: function(e) { this.$gutterLayer.setShowLineNumbers(e), this.$loop.schedule(this.CHANGE_GUTTER) }, initialValue: !0 },
        displayIndentGuides: { set: function(e) { this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT) }, initialValue: !0 },
        highlightGutterLine: {
            set: function(e) {
                if (!this.$gutterLineHighlight) return this.$gutterLineHighlight = o.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", void this.$gutter.appendChild(this.$gutterLineHighlight);
                this.$gutterLineHighlight.style.display = e ? "" : "none", this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight()
            },
            initialValue: !1,
            value: !0
        },
        hScrollBarAlwaysVisible: {
            set: function(e) {
                (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL)
            },
            initialValue: !1
        },
        vScrollBarAlwaysVisible: {
            set: function(e) {
                (!this.$vScrollBarAlwaysVisible || !this.$vScroll) && this.$loop.schedule(this.CHANGE_SCROLL)
            },
            initialValue: !1
        },
        fontSize: { set: function(e) { "number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize() }, initialValue: 12 },
        fontFamily: { set: function(e) { this.container.style.fontFamily = e, this.updateFontSize() } },
        maxLines: { set: function(e) { this.updateFull() } },
        minLines: { set: function(e) { this.updateFull() } },
        maxPixelHeight: { set: function(e) { this.updateFull() }, initialValue: 0 },
        scrollPastEnd: { set: function(e) { e = +e || 0, this.$scrollPastEnd != e && (this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL)) }, initialValue: 0, handlesSet: !0 },
        fixedWidthGutter: { set: function(e) { this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER) } },
        theme: { set: function(e) { this.setTheme(e) }, get: function() { return this.$themeId || this.theme }, initialValue: "./theme/textmate", handlesSet: !0 }
    }), t.VirtualRenderer = m
}), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], function(e, t, n) {
    "use strict";

    function i(e) {
        var t = function(e) { var t = "importScripts('" + r.qualifyURL(e) + "');"; try { return new Blob([t], { type: "application/javascript" }) } catch (e) { var n = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder); return n.append(t), n.getBlob("application/javascript") } }(e),
            n = (window.URL || window.webkitURL).createObjectURL(t);
        return new Worker(n)
    }
    var o = e("../lib/oop"),
        r = e("../lib/net"),
        s = e("../lib/event_emitter").EventEmitter,
        a = e("../config"),
        l = function(t, n, o, r, s) {
            if (this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), a.get("packaged") || !e.toUrl) r = r || a.moduleUrl(n, "worker");
            else {
                var l = this.$normalizePath;
                r = r || l(e.toUrl("ace/worker/worker.js", null, "_"));
                var c = {};
                t.forEach(function(t) { c[t] = l(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, "")) })
            }
            this.$worker = i(r), s && this.send("importScripts", s), this.$worker.postMessage({ init: !0, tlns: c, module: n, classname: o }), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage
        };
    (function() {
        o.implement(this, s), this.onMessage = function(e) {
            var t = e.data;
            switch (t.type) {
                case "event":
                    this._signal(t.name, { data: t.data });
                    break;
                case "call":
                    var n = this.callbacks[t.id];
                    n && (n(t.data), delete this.callbacks[t.id]);
                    break;
                case "error":
                    this.reportError(t.data);
                    break;
                case "log":
                    window.console && console.log && console.log.apply(console, t.data)
            }
        }, this.reportError = function(e) { window.console && console.error && console.error(e) }, this.$normalizePath = function(e) { return r.qualifyURL(e) }, this.terminate = function() { this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null }, this.send = function(e, t) { this.$worker.postMessage({ command: e, args: t }) }, this.call = function(e, t, n) {
            if (n) {
                var i = this.callbackId++;
                this.callbacks[i] = n, t.push(i)
            }
            this.send(e, t)
        }, this.emit = function(e, t) { try { this.$worker.postMessage({ event: e, data: { data: t.data } }) } catch (e) { console.error(e.stack) } }, this.attachToDocument = function(e) { this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener) }, this.changeListener = function(e) { this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), "insert" == e.action ? this.deltaQueue.push(e.start, e.lines) : this.deltaQueue.push(e.start, e.end) }, this.$sendDeltaQueue = function() {
            var e = this.deltaQueue;
            e && (this.deltaQueue = null, e.length > 50 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", { data: e }))
        }
    }).call(l.prototype);
    var c = function(e, t, n) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
        var i = null,
            o = !1,
            r = Object.create(s),
            l = this;
        this.$worker = {}, this.$worker.terminate = function() {}, this.$worker.postMessage = function(e) { l.messageBuffer.push(e), i && (o ? setTimeout(c) : c()) }, this.setEmitSync = function(e) { o = e };
        var c = function() {
            var e = l.messageBuffer.shift();
            e.command ? i[e.command].apply(i, e.args) : e.event && r._signal(e.event, e.data)
        };
        r.postMessage = function(e) { l.onMessage({ data: e }) }, r.callback = function(e, t) { this.postMessage({ type: "call", id: t, data: e }) }, r.emit = function(e, t) { this.postMessage({ type: "event", name: e, data: t }) }, a.loadModule(["worker", t], function(e) { for (i = new e[n](r); l.messageBuffer.length;) c() })
    };
    c.prototype = l.prototype, t.UIWorkerClient = c, t.WorkerClient = l, t.createWorker = i
}), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function(e, t, n) {
    "use strict";
    var i = e("./range").Range,
        o = e("./lib/event_emitter").EventEmitter,
        r = e("./lib/oop"),
        s = function(e, t, n, i, o, r) {
            var s = this;
            this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = o, this.othersClass = r, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = i, this.$onCursorChange = function() { setTimeout(function() { s.onCursorChange() }) }, this.$pos = n;
            var a = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || { length: -1 };
            this.$undoStackDepth = a.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
        };
    (function() {
        r.implement(this, o), this.setup = function() {
            var e = this,
                t = this.doc,
                n = this.session;
            this.selectionBefore = n.selection.toJSON(), n.selection.inMultiSelectMode && n.selection.toSingleRange(), this.pos = t.createAnchor(this.$pos.row, this.$pos.column);
            var o = this.pos;
            o.$insertRight = !0, o.detach(), o.markerId = n.addMarker(new i(o.row, o.column, o.row, o.column + this.length), this.mainClass, null, !1), this.others = [], this.$others.forEach(function(n) {
                var i = t.createAnchor(n.row, n.column);
                i.$insertRight = !0, i.detach(), e.others.push(i)
            }), n.setUndoSelect(!1)
        }, this.showOtherMarkers = function() {
            if (!this.othersActive) {
                var e = this.session,
                    t = this;
                this.othersActive = !0, this.others.forEach(function(n) { n.markerId = e.addMarker(new i(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1) })
            }
        }, this.hideOtherMarkers = function() { if (this.othersActive) { this.othersActive = !1; for (var e = 0; e < this.others.length; e++) this.session.removeMarker(this.others[e].markerId) } }, this.onUpdate = function(e) {
            if (this.$updating) return this.updateAnchors(e);
            var t = e;
            if (t.start.row === t.end.row && t.start.row === this.pos.row) {
                this.$updating = !0;
                var n = "insert" === e.action ? t.end.column - t.start.column : t.start.column - t.end.column,
                    o = t.start.column >= this.pos.column && t.start.column <= this.pos.column + this.length + 1,
                    r = t.start.column - this.pos.column;
                if (this.updateAnchors(e), o && (this.length += n), o && !this.session.$fromUndo)
                    if ("insert" === e.action)
                        for (var s = this.others.length - 1; s >= 0; s--) {
                            var a = { row: (l = this.others[s]).row, column: l.column + r };
                            this.doc.insertMergedLines(a, e.lines)
                        } else if ("remove" === e.action)
                            for (s = this.others.length - 1; s >= 0; s--) {
                                var l;
                                a = { row: (l = this.others[s]).row, column: l.column + r };
                                this.doc.remove(new i(a.row, a.column, a.row, a.column - n))
                            }
                this.$updating = !1, this.updateMarkers()
            }
        }, this.updateAnchors = function(e) {
            this.pos.onChange(e);
            for (var t = this.others.length; t--;) this.others[t].onChange(e);
            this.updateMarkers()
        }, this.updateMarkers = function() {
            if (!this.$updating) {
                var e = this,
                    t = this.session,
                    n = function(n, o) { t.removeMarker(n.markerId), n.markerId = t.addMarker(new i(n.row, n.column, n.row, n.column + e.length), o, null, !1) };
                n(this.pos, this.mainClass);
                for (var o = this.others.length; o--;) n(this.others[o], this.othersClass)
            }
        }, this.onCursorChange = function(e) {
            if (!this.$updating && this.session) {
                var t = this.session.selection.getCursor();
                t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
            }
        }, this.detach = function() { this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.session.setUndoSelect(!0), this.session = null }, this.cancel = function() {
            if (-1 !== this.$undoStackDepth) {
                for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, n = 0; n < t; n++) e.undo(!0);
                this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore)
            }
        }
    }).call(s.prototype), t.PlaceHolder = s
}), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(e, t, n) {
    function i(e, t) { return e.row == t.row && e.column == t.column }
    var o = e("../lib/event"),
        r = e("../lib/useragent");
    t.onMouseDown = function(e) {
        var t = e.domEvent,
            n = t.altKey,
            s = t.shiftKey,
            a = t.ctrlKey,
            l = e.getAccelKey(),
            c = e.getButton();
        if (a && r.isMac && (c = t.button), e.editor.inMultiSelectMode && 2 == c) e.editor.textInput.onContextMenu(e.domEvent);
        else if (a || n || l) {
            if (0 === c) {
                var h, u = e.editor,
                    d = u.selection,
                    g = u.inMultiSelectMode,
                    f = e.getDocumentPosition(),
                    p = d.getCursor(),
                    m = e.inSelection() || d.isEmpty() && i(f, p),
                    v = e.x,
                    w = e.y,
                    A = u.session,
                    C = u.renderer.pixelToScreenCoordinates(v, w),
                    b = C;
                if (u.$mouseHandler.$enableJumpToDef) a && n || l && n ? h = s ? "block" : "add" : n && u.$blockSelectEnabled && (h = "block");
                else if (l && !n) { if (h = "add", !g && s) return } else n && u.$blockSelectEnabled && (h = "block");
                if (h && r.isMac && t.ctrlKey && u.$mouseHandler.cancelContextMenu(), "add" == h) {
                    if (!g && m) return;
                    if (!g) {
                        var y = d.toOrientedRange();
                        u.addSelectionMarker(y)
                    }
                    var F = d.rangeList.rangeAtPoint(f);
                    u.$blockScrolling++, u.inVirtualSelectionMode = !0, s && (F = null, y = d.ranges[0] || y, u.removeSelectionMarker(y)), u.once("mouseup", function() {
                        var e = d.toOrientedRange();
                        F && e.isEmpty() && i(F.cursor, e.cursor) ? d.substractPoint(e.cursor) : (s ? d.substractPoint(y.cursor) : y && (u.removeSelectionMarker(y), d.addRange(y)), d.addRange(e)), u.$blockScrolling--, u.inVirtualSelectionMode = !1
                    })
                } else if ("block" == h) {
                    e.stop(), u.inVirtualSelectionMode = !0;
                    var E, x = [];
                    u.$blockScrolling++, g && !l ? d.toSingleRange() : !g && l && (E = d.toOrientedRange(), u.addSelectionMarker(E)), s ? C = A.documentToScreenPosition(d.lead) : d.moveToPosition(f), u.$blockScrolling--, b = { row: -1, column: -1 };
                    var $ = function() {
                        var e = u.renderer.pixelToScreenCoordinates(v, w),
                            t = A.screenToDocumentPosition(e.row, e.column);
                        i(b, e) && i(t, d.lead) || (b = e, u.$blockScrolling++, u.selection.moveToPosition(t), u.renderer.scrollCursorIntoView(), u.removeSelectionMarkers(x), x = d.rectangularRangeBlock(b, C), u.$mouseHandler.$clickSelection && 1 == x.length && x[0].isEmpty() && (x[0] = u.$mouseHandler.$clickSelection.clone()), x.forEach(u.addSelectionMarker, u), u.updateSelectionMarkers(), u.$blockScrolling--)
                    };
                    o.capture(u.container, function(e) { v = e.clientX, w = e.clientY }, function(e) {
                        clearInterval(k), u.removeSelectionMarkers(x), x.length || (x = [d.toOrientedRange()]), u.$blockScrolling++, E && (u.removeSelectionMarker(E), d.toSingleRange(E));
                        for (var t = 0; t < x.length; t++) d.addRange(x[t]);
                        u.inVirtualSelectionMode = !1, u.$mouseHandler.$clickSelection = null, u.$blockScrolling--
                    });
                    var k = setInterval(function() { $() }, 20);
                    return e.preventDefault()
                }
            }
        } else 0 === c && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode()
    }
}), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function(e, t, n) {
    t.defaultCommands = [{ name: "addCursorAbove", exec: function(e) { e.selectMoreLines(-1) }, bindKey: { win: "Ctrl-Alt-Up", mac: "Ctrl-Alt-Up" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "addCursorBelow", exec: function(e) { e.selectMoreLines(1) }, bindKey: { win: "Ctrl-Alt-Down", mac: "Ctrl-Alt-Down" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "addCursorAboveSkipCurrent", exec: function(e) { e.selectMoreLines(-1, !0) }, bindKey: { win: "Ctrl-Alt-Shift-Up", mac: "Ctrl-Alt-Shift-Up" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "addCursorBelowSkipCurrent", exec: function(e) { e.selectMoreLines(1, !0) }, bindKey: { win: "Ctrl-Alt-Shift-Down", mac: "Ctrl-Alt-Shift-Down" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "selectMoreBefore", exec: function(e) { e.selectMore(-1) }, bindKey: { win: "Ctrl-Alt-Left", mac: "Ctrl-Alt-Left" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "selectMoreAfter", exec: function(e) { e.selectMore(1) }, bindKey: { win: "Ctrl-Alt-Right", mac: "Ctrl-Alt-Right" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "selectNextBefore", exec: function(e) { e.selectMore(-1, !0) }, bindKey: { win: "Ctrl-Alt-Shift-Left", mac: "Ctrl-Alt-Shift-Left" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "selectNextAfter", exec: function(e) { e.selectMore(1, !0) }, bindKey: { win: "Ctrl-Alt-Shift-Right", mac: "Ctrl-Alt-Shift-Right" }, scrollIntoView: "cursor", readOnly: !0 }, { name: "splitIntoLines", exec: function(e) { e.multiSelect.splitIntoLines() }, bindKey: { win: "Ctrl-Alt-L", mac: "Ctrl-Alt-L" }, readOnly: !0 }, { name: "alignCursors", exec: function(e) { e.alignCursors() }, bindKey: { win: "Ctrl-Alt-A", mac: "Ctrl-Alt-A" }, scrollIntoView: "cursor" }, { name: "findAll", exec: function(e) { e.findAll() }, bindKey: { win: "Ctrl-Alt-K", mac: "Ctrl-Alt-G" }, scrollIntoView: "cursor", readOnly: !0 }], t.multiSelectCommands = [{ name: "singleSelection", bindKey: "esc", exec: function(e) { e.exitMultiSelectMode() }, scrollIntoView: "cursor", readOnly: !0, isAvailable: function(e) { return e && e.inMultiSelectMode } }];
    var i = e("../keyboard/hash_handler").HashHandler;
    t.keyboardHandler = new i(t.multiSelectCommands)
}), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], function(e, t, n) {
    function i(e) {
        e.$multiselectOnSessionChange || (e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$checkMultiselectChange = e.$checkMultiselectChange.bind(e), e.$multiselectOnSessionChange(e), e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", a), e.commands.addCommands(h.defaultCommands), function(e) {
            function t(t) { i && (e.renderer.setMouseCursor(""), i = !1) }
            var n = e.textInput.getElement(),
                i = !1;
            l.addListener(n, "keydown", function(n) {
                var o = 18 == n.keyCode && !(n.ctrlKey || n.shiftKey || n.metaKey);
                e.$blockSelectEnabled && o ? i || (e.renderer.setMouseCursor("crosshair"), i = !0) : i && t()
            }), l.addListener(n, "keyup", t), l.addListener(n, "blur", t)
        }(e))
    }
    var o = e("./range_list").RangeList,
        r = e("./range").Range,
        s = e("./selection").Selection,
        a = e("./mouse/multi_select_handler").onMouseDown,
        l = e("./lib/event"),
        c = e("./lib/lang"),
        h = e("./commands/multi_select_commands");
    t.commands = h.defaultCommands.concat(h.multiSelectCommands);
    var u = new(0, e("./search").Search),
        d = e("./edit_session").EditSession;
    (function() { this.getSelectionMarkers = function() { return this.$selectionMarkers } }).call(d.prototype),
        function() {
            this.ranges = null, this.rangeList = null, this.addRange = function(e, t) {
                if (e) {
                    if (!this.inMultiSelectMode && 0 === this.rangeCount) {
                        var n = this.toOrientedRange();
                        if (this.rangeList.add(n), this.rangeList.add(e), 2 != this.rangeList.ranges.length) return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                        this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n)
                    }
                    e.cursor || (e.cursor = e.end);
                    var i = this.rangeList.add(e);
                    return this.$onAddRange(e), i.length && this.$onRemoveRange(i), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
                }
            }, this.toSingleRange = function(e) {
                e = e || this.ranges[0];
                var t = this.rangeList.removeAll();
                t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
            }, this.substractPoint = function(e) { var t = this.rangeList.substractPoint(e); if (t) return this.$onRemoveRange(t), t[0] }, this.mergeOverlappingRanges = function() {
                var e = this.rangeList.merge();
                e.length ? this.$onRemoveRange(e) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
            }, this.$onAddRange = function(e) { this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._signal("addRange", { range: e }) }, this.$onRemoveRange = function(e) {
                if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                    var t = this.rangeList.ranges.pop();
                    e.push(t), this.rangeCount = 0
                }
                for (var n = e.length; n--;) {
                    var i = this.ranges.indexOf(e[n]);
                    this.ranges.splice(i, 1)
                }
                this._signal("removeRange", { ranges: e }), 0 === this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._signal("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), (t = t || this.ranges[0]) && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
            }, this.$initRangeList = function() { this.rangeList || (this.rangeList = new o, this.ranges = [], this.rangeCount = 0) }, this.getAllRanges = function() { return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()] }, this.splitIntoLines = function() {
                if (this.rangeCount > 1) {
                    var e = this.rangeList.ranges,
                        t = e[e.length - 1],
                        n = r.fromPoints(e[0].start, t.end);
                    this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
                } else {
                    n = this.getRange();
                    var i = this.isBackwards(),
                        o = n.start.row,
                        s = n.end.row;
                    if (o == s) {
                        if (i) var a = n.end,
                            l = n.start;
                        else a = n.start, l = n.end;
                        return this.addRange(r.fromPoints(l, l)), void this.addRange(r.fromPoints(a, a))
                    }
                    var c = [],
                        h = this.getLineRange(o, !0);
                    h.start.column = n.start.column, c.push(h);
                    for (var u = o + 1; u < s; u++) c.push(this.getLineRange(u, !0));
                    (h = this.getLineRange(s, !0)).end.column = n.end.column, c.push(h), c.forEach(this.addRange, this)
                }
            }, this.toggleBlockSelection = function() {
                if (this.rangeCount > 1) {
                    var e = this.rangeList.ranges,
                        t = e[e.length - 1],
                        n = r.fromPoints(e[0].start, t.end);
                    this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
                } else {
                    var i = this.session.documentToScreenPosition(this.selectionLead),
                        o = this.session.documentToScreenPosition(this.selectionAnchor);
                    this.rectangularRangeBlock(i, o).forEach(this.addRange, this)
                }
            }, this.rectangularRangeBlock = function(e, t, n) {
                var i = [],
                    o = e.column < t.column;
                if (o) var s = e.column,
                    a = t.column;
                else s = t.column, a = e.column;
                var l, c, h = e.row < t.row;
                if (h) var u = e.row,
                    d = t.row;
                else u = t.row, d = e.row;
                s < 0 && (s = 0), u < 0 && (u = 0), u == d && (n = !0);
                for (var g = u; g <= d; g++) {
                    var f = r.fromPoints(this.session.screenToDocumentPosition(g, s), this.session.screenToDocumentPosition(g, a));
                    if (f.isEmpty()) { if (p && (l = f.end, c = p, l.row == c.row && l.column == c.column)) break; var p = f.end }
                    f.cursor = o ? f.start : f.end, i.push(f)
                }
                if (h && i.reverse(), !n) {
                    for (var m = i.length - 1; i[m].isEmpty() && m > 0;) m--;
                    if (m > 0)
                        for (var v = 0; i[v].isEmpty();) v++;
                    for (var w = m; w >= v; w--) i[w].isEmpty() && i.splice(w, 1)
                }
                return i
            }
        }.call(s.prototype);
    var g = e("./editor").Editor;
    (function() {
        this.updateSelectionMarkers = function() { this.renderer.updateCursor(), this.renderer.updateBackMarkers() }, this.addSelectionMarker = function(e) { e.cursor || (e.cursor = e.end); var t = this.getSelectionStyle(); return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e }, this.removeSelectionMarker = function(e) { if (e.marker) { this.session.removeMarker(e.marker); var t = this.session.$selectionMarkers.indexOf(e); - 1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length } }, this.removeSelectionMarkers = function(e) {
            for (var t = this.session.$selectionMarkers, n = e.length; n--;) { var i = e[n]; if (i.marker) { this.session.removeMarker(i.marker); var o = t.indexOf(i); - 1 != o && t.splice(o, 1) } }
            this.session.selectionMarkerCount = t.length
        }, this.$onAddRange = function(e) { this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers() }, this.$onRemoveRange = function(e) { this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers() }, this.$onMultiSelect = function(e) { this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(h.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers()) }, this.$onSingleSelect = function(e) { this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(h.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection")) }, this.$onMultiSelectExec = function(e) {
            var t = e.command,
                n = e.editor;
            if (n.multiSelect) {
                if (t.multiSelectAction) "forEach" == t.multiSelectAction ? i = n.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? i = n.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (n.exitMultiSelectMode(), i = t.exec(n, e.args || {})) : i = t.multiSelectAction(n, e.args || {});
                else {
                    var i = t.exec(n, e.args || {});
                    n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges()
                }
                return i
            }
        }, this.forEachSelection = function(e, t, n) {
            if (!this.inVirtualSelectionMode) {
                var i, o = n && n.keepOrder,
                    r = 1 == n || n && n.$byLines,
                    a = this.session,
                    l = this.selection,
                    c = l.rangeList,
                    h = (o ? l : c).ranges;
                if (!h.length) return e.exec ? e.exec(this, t || {}) : e(this, t || {});
                var u = l._eventRegistry;
                l._eventRegistry = {};
                var d = new s(a);
                this.inVirtualSelectionMode = !0;
                for (var g = h.length; g--;) {
                    if (r)
                        for (; g > 0 && h[g].start.row == h[g - 1].end.row;) g--;
                    d.fromOrientedRange(h[g]), d.index = g, this.selection = a.selection = d;
                    var f = e.exec ? e.exec(this, t || {}) : e(this, t || {});
                    !i && void 0 !== f && (i = f), d.toOrientedRange(h[g])
                }
                d.detach(), this.selection = a.selection = l, this.inVirtualSelectionMode = !1, l._eventRegistry = u, l.mergeOverlappingRanges();
                var p = this.renderer.$scrollAnimation;
                return this.onCursorChange(), this.onSelectionChange(), p && p.from == p.to && this.renderer.animateScrolling(p.from), i
            }
        }, this.exitMultiSelectMode = function() { this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange() }, this.getSelectedText = function() {
            var e = "";
            if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                for (var t = this.multiSelect.rangeList.ranges, n = [], i = 0; i < t.length; i++) n.push(this.session.getTextRange(t[i]));
                var o = this.session.getDocument().getNewLineCharacter();
                (e = n.join(o)).length == (n.length - 1) * o.length && (e = "")
            } else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
            return e
        }, this.$checkMultiselectChange = function(e, t) {
            if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                var n = this.multiSelect.ranges[0];
                if (this.multiSelect.isEmpty() && t == this.multiSelect.anchor) return;
                var i = t == this.multiSelect.anchor ? n.cursor == n.start ? n.end : n.start : n.cursor;
                (i.row != t.row || this.session.$clipPositionToDocument(i.row, i.column).column != t.column) && this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange())
            }
        }, this.findAll = function(e, t, n) {
            if ((t = t || {}).needle = e || t.needle, null == t.needle) {
                var i = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
                t.needle = this.session.getTextRange(i)
            }
            this.$search.set(t);
            var o = this.$search.findAll(this.session);
            if (!o.length) return 0;
            this.$blockScrolling += 1;
            var r = this.multiSelect;
            n || r.toSingleRange(o[0]);
            for (var s = o.length; s--;) r.addRange(o[s], !0);
            return i && r.rangeList.rangeAtPoint(i.start) && r.addRange(i, !0), this.$blockScrolling -= 1, o.length
        }, this.selectMoreLines = function(e, t) {
            var n = this.selection.toOrientedRange(),
                i = n.cursor == n.end,
                o = this.session.documentToScreenPosition(n.cursor);
            this.selection.$desiredColumn && (o.column = this.selection.$desiredColumn);
            var s, a = this.session.screenToDocumentPosition(o.row + e, o.column);
            if (n.isEmpty()) c = a;
            else var l = this.session.documentToScreenPosition(i ? n.end : n.start),
                c = this.session.screenToDocumentPosition(l.row + e, l.column);
            i ? (s = r.fromPoints(a, c)).cursor = s.start : (s = r.fromPoints(c, a)).cursor = s.end;
            if (s.desiredColumn = o.column, this.selection.inMultiSelectMode) { if (t) var h = n.cursor } else this.selection.addRange(n);
            this.selection.addRange(s), h && this.selection.substractPoint(h)
        }, this.transposeSelections = function(e) {
            for (var t = this.session, n = t.multiSelect, i = n.ranges, o = i.length; o--;) {
                if ((a = i[o]).isEmpty()) {
                    var r = t.getWordRange(a.start.row, a.start.column);
                    a.start.row = r.start.row, a.start.column = r.start.column, a.end.row = r.end.row, a.end.column = r.end.column
                }
            }
            n.mergeOverlappingRanges();
            var s = [];
            for (o = i.length; o--;) {
                var a = i[o];
                s.unshift(t.getTextRange(a))
            }
            e < 0 ? s.unshift(s.pop()) : s.push(s.shift());
            for (o = i.length; o--;) {
                r = (a = i[o]).clone();
                t.replace(a, s[o]), a.start.row = r.start.row, a.start.column = r.start.column
            }
        }, this.selectMore = function(e, t, n) {
            var i = this.session,
                o = i.multiSelect.toOrientedRange();
            if (!o.isEmpty() || ((o = i.getWordRange(o.start.row, o.start.column)).cursor = -1 == e ? o.start : o.end, this.multiSelect.addRange(o), !n)) {
                var r, s, a, l = i.getTextRange(o),
                    c = (r = i, s = l, a = e, u.$options.wrap = !0, u.$options.needle = s, u.$options.backwards = -1 == a, u.find(r));
                c && (c.cursor = -1 == e ? c.start : c.end, this.$blockScrolling += 1, this.session.unfold(c), this.multiSelect.addRange(c), this.$blockScrolling -= 1, this.renderer.scrollCursorIntoView(null, .5)), t && this.multiSelect.substractPoint(o.cursor)
            }
        }, this.alignCursors = function() {
            var e = this.session,
                t = e.multiSelect,
                n = t.ranges,
                i = -1,
                o = n.filter(function(e) {
                    if (e.cursor.row == i) return !0;
                    i = e.cursor.row
                });
            if (n.length && o.length != n.length - 1) {
                o.forEach(function(e) { t.substractPoint(e.cursor) });
                var s = 0,
                    a = 1 / 0,
                    l = n.map(function(t) {
                        var n = t.cursor,
                            i = e.getLine(n.row).substr(n.column).search(/\S/g);
                        return -1 == i && (i = 0), n.column > s && (s = n.column), i < a && (a = i), i
                    });
                n.forEach(function(t, n) {
                    var i = t.cursor,
                        o = s - i.column,
                        h = l[n] - a;
                    o > h ? e.insert(i, c.stringRepeat(" ", o - h)) : e.remove(new r(i.row, i.column, i.row, i.column - o + h)), t.start.column = t.end.column = s, t.start.row = t.end.row = i.row, t.cursor = t.end
                }), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            } else {
                var h = this.selection.getRange(),
                    u = h.start.row,
                    d = h.end.row,
                    g = u == d;
                if (g) {
                    for (var f, p = this.session.getLength(); f = this.session.getLine(d), /[=:]/.test(f) && ++d < p;);
                    for (; f = this.session.getLine(u), /[=:]/.test(f) && --u > 0;);
                    u < 0 && (u = 0), d >= p && (d = p - 1)
                }
                var m = this.session.removeFullLines(u, d);
                m = this.$reAlignText(m, g), this.session.insert({ row: u, column: 0 }, m.join("\n") + "\n"), g || (h.start.column = 0, h.end.column = m[m.length - 1].length), this.selection.setRange(h)
            }
        }, this.$reAlignText = function(e, t) {
            function n(e) { return c.stringRepeat(" ", e) }

            function i(e) { return e[2] ? n(o) + e[2] + n(r - e[2].length + s) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0] }
            var o, r, s, a = !0,
                l = !0;
            return e.map(function(e) { var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/); return t ? null == o ? (o = t[1].length, r = t[2].length, s = t[3].length, t) : (o + r + s != t[1].length + t[2].length + t[3].length && (l = !1), o != t[1].length && (a = !1), o > t[1].length && (o = t[1].length), r < t[2].length && (r = t[2].length), s > t[3].length && (s = t[3].length), t) : [e] }).map(t ? i : a ? l ? function(e) { return e[2] ? n(o + r - e[2].length) + e[2] + n(s) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0] } : i : function(e) { return e[2] ? n(o) + e[2] + n(s) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0] })
        }
    }).call(g.prototype), t.onSessionChange = function(e) {
        var t = e.session;
        t && !t.multiSelect && (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t && t.multiSelect;
        var n = e.oldSession;
        n && (n.multiSelect.off("addRange", this.$onAddRange), n.multiSelect.off("removeRange", this.$onRemoveRange), n.multiSelect.off("multiSelect", this.$onMultiSelect), n.multiSelect.off("singleSelect", this.$onSingleSelect), n.multiSelect.lead.off("change", this.$checkMultiselectChange), n.multiSelect.anchor.off("change", this.$checkMultiselectChange)), t && (t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), t.multiSelect.lead.on("change", this.$checkMultiselectChange), t.multiSelect.anchor.on("change", this.$checkMultiselectChange)), t && this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
    }, t.MultiSelect = i, e("./config").defineOptions(g.prototype, "editor", { enableMultiselect: { set: function(e) { i(this), e ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", a)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", a)) }, value: !0 }, enableBlockSelect: { set: function(e) { this.$blockSelectEnabled = e }, value: !0 } })
}), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("../../range").Range,
        o = t.FoldMode = function() {};
    (function() {
        this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(e, t, n) { var i = e.getLine(n); return this.foldingStartMarker.test(i) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(i) ? "end" : "" }, this.getFoldWidgetRange = function(e, t, n) { return null }, this.indentationBlock = function(e, t, n) {
            var o = /\S/,
                r = e.getLine(t),
                s = r.search(o);
            if (-1 != s) {
                for (var a = n || r.length, l = e.getLength(), c = t, h = t; ++t < l;) {
                    var u = e.getLine(t).search(o);
                    if (-1 != u) {
                        if (u <= s) break;
                        h = t
                    }
                }
                if (h > c) { var d = e.getLine(h).length; return new i(c, a, h, d) }
            }
        }, this.openingBracketBlock = function(e, t, n, o, r) {
            var s = { row: n, column: o + 1 },
                a = e.$findClosingBracket(t, s, r);
            if (a) { var l = e.foldWidgets[a.row]; return null == l && (l = e.getFoldWidget(a.row)), "start" == l && a.row > s.row && (a.row--, a.column = e.getLine(a.row).length), i.fromPoints(s, a) }
        }, this.closingBracketBlock = function(e, t, n, o, r) {
            var s = { row: n, column: o },
                a = e.$findOpeningBracket(t, s);
            if (a) return a.column++, s.column--, i.fromPoints(a, s)
        }
    }).call(o.prototype)
}), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function(e, t, n) {
    "use strict";
    t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}', e("../lib/dom").importCssString(t.cssText, t.cssClass)
}), ace.define("ace/line_widgets", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/range"], function(e, t, n) {
    "use strict";

    function i(e) { this.session = e, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor) }
    e("./lib/oop");
    var o = e("./lib/dom");
    e("./range").Range;
    (function() {
        this.getRowLength = function(e) { var t; return t = this.lineWidgets && this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0, this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t }, this.$getWidgetScreenLength = function() { var e = 0; return this.lineWidgets.forEach(function(t) { t && t.rowCount && !t.hidden && (e += t.rowCount) }), e }, this.$onChangeEditor = function(e) { this.attach(e.editor) }, this.attach = function(e) { e && e.widgetManager && e.widgetManager != this && e.widgetManager.detach(), this.editor != e && (this.detach(), this.editor = e, e && (e.widgetManager = this, e.renderer.on("beforeRender", this.measureWidgets), e.renderer.on("afterRender", this.renderWidgets))) }, this.detach = function(e) {
            var t = this.editor;
            if (t) {
                this.editor = null, t.widgetManager = null, t.renderer.off("beforeRender", this.measureWidgets), t.renderer.off("afterRender", this.renderWidgets);
                var n = this.session.lineWidgets;
                n && n.forEach(function(e) { e && e.el && e.el.parentNode && (e._inDocument = !1, e.el.parentNode.removeChild(e.el)) })
            }
        }, this.updateOnFold = function(e, t) {
            var n = t.lineWidgets;
            if (n && e.action) {
                for (var i = e.data, o = i.start.row, r = i.end.row, s = "add" == e.action, a = o + 1; a < r; a++) n[a] && (n[a].hidden = s);
                n[r] && (s ? n[o] ? n[r].hidden = s : n[o] = n[r] : (n[o] == n[r] && (n[o] = void 0), n[r].hidden = s))
            }
        }, this.updateOnChange = function(e) {
            var t = this.session.lineWidgets;
            if (t) {
                var n = e.start.row,
                    i = e.end.row - n;
                if (0 !== i)
                    if ("remove" == e.action) { t.splice(n + 1, i).forEach(function(e) { e && this.removeLineWidget(e) }, this), this.$updateRows() } else {
                        var o = new Array(i);
                        o.unshift(n, 0), t.splice.apply(t, o), this.$updateRows()
                    }
            }
        }, this.$updateRows = function() {
            var e = this.session.lineWidgets;
            if (e) {
                var t = !0;
                e.forEach(function(e, n) {
                    if (e)
                        for (t = !1, e.row = n; e.$oldWidget;) e.$oldWidget.row = n, e = e.$oldWidget
                }), t && (this.session.lineWidgets = null)
            }
        }, this.addLineWidget = function(e) {
            this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
            var t = this.session.lineWidgets[e.row];
            t && (e.$oldWidget = t, t.el && t.el.parentNode && (t.el.parentNode.removeChild(t.el), t._inDocument = !1)), this.session.lineWidgets[e.row] = e, e.session = this.session;
            var n = this.editor.renderer;
            e.html && !e.el && (e.el = o.createElement("div"), e.el.innerHTML = e.html), e.el && (o.addCssClass(e.el, "ace_lineWidgetContainer"), e.el.style.position = "absolute", e.el.style.zIndex = 5, n.container.appendChild(e.el), e._inDocument = !0), e.coverGutter || (e.el.style.zIndex = 3), null == e.pixelHeight && (e.pixelHeight = e.el.offsetHeight), null == e.rowCount && (e.rowCount = e.pixelHeight / n.layerConfig.lineHeight);
            var i = this.session.getFoldAt(e.row, 0);
            if (e.$fold = i, i) {
                var r = this.session.lineWidgets;
                e.row != i.end.row || r[i.start.row] ? e.hidden = !0 : r[i.start.row] = e
            }
            return this.session._emit("changeFold", { data: { start: { row: e.row } } }), this.$updateRows(), this.renderWidgets(null, n), this.onWidgetChanged(e), e
        }, this.removeLineWidget = function(e) {
            if (e._inDocument = !1, e.session = null, e.el && e.el.parentNode && e.el.parentNode.removeChild(e.el), e.editor && e.editor.destroy) try { e.editor.destroy() } catch (e) {}
            if (this.session.lineWidgets) {
                var t = this.session.lineWidgets[e.row];
                if (t == e) this.session.lineWidgets[e.row] = e.$oldWidget, e.$oldWidget && this.onWidgetChanged(e.$oldWidget);
                else
                    for (; t;) {
                        if (t.$oldWidget == e) { t.$oldWidget = e.$oldWidget; break }
                        t = t.$oldWidget
                    }
            }
            this.session._emit("changeFold", { data: { start: { row: e.row } } }), this.$updateRows()
        }, this.getWidgetsAtRow = function(e) { for (var t = this.session.lineWidgets, n = t && t[e], i = []; n;) i.push(n), n = n.$oldWidget; return i }, this.onWidgetChanged = function(e) { this.session._changedWidgets.push(e), this.editor && this.editor.renderer.updateFull() }, this.measureWidgets = function(e, t) {
            var n = this.session._changedWidgets,
                i = t.layerConfig;
            if (n && n.length) {
                for (var o = 1 / 0, r = 0; r < n.length; r++) {
                    var s = n[r];
                    if (s && s.el && s.session == this.session) {
                        if (!s._inDocument) {
                            if (this.session.lineWidgets[s.row] != s) continue;
                            s._inDocument = !0, t.container.appendChild(s.el)
                        }
                        s.h = s.el.offsetHeight, s.fixedWidth || (s.w = s.el.offsetWidth, s.screenWidth = Math.ceil(s.w / i.characterWidth));
                        var a = s.h / i.lineHeight;
                        s.coverLine && ((a -= this.session.getRowLineCount(s.row)) < 0 && (a = 0)), s.rowCount != a && (s.rowCount = a, s.row < o && (o = s.row))
                    }
                }
                o != 1 / 0 && (this.session._emit("changeFold", { data: { start: { row: o } } }), this.session.lineWidgetWidth = null), this.session._changedWidgets = []
            }
        }, this.renderWidgets = function(e, t) {
            var n = t.layerConfig,
                i = this.session.lineWidgets;
            if (i) {
                for (var o = Math.min(this.firstRow, n.firstRow), r = Math.max(this.lastRow, n.lastRow, i.length); o > 0 && !i[o];) o--;
                this.firstRow = n.firstRow, this.lastRow = n.lastRow, t.$cursorLayer.config = n;
                for (var s = o; s <= r; s++) {
                    var a = i[s];
                    if (a && a.el)
                        if (a.hidden) a.el.style.top = -100 - (a.pixelHeight || 0) + "px";
                        else {
                            a._inDocument || (a._inDocument = !0, t.container.appendChild(a.el));
                            var l = t.$cursorLayer.getPixelPosition({ row: s, column: 0 }, !0).top;
                            a.coverLine || (l += n.lineHeight * this.session.getRowLineCount(a.row)), a.el.style.top = l - n.offset + "px";
                            var c = a.coverGutter ? 0 : t.gutterWidth;
                            a.fixedWidth || (c -= t.scrollLeft), a.el.style.left = c + "px", a.fullWidth && a.screenWidth && (a.el.style.minWidth = n.width + 2 * n.padding + "px"), a.fixedWidth ? a.el.style.right = t.scrollBar.getWidth() + "px" : a.el.style.right = ""
                        }
                }
            }
        }
    }).call(i.prototype), t.LineWidgets = i
}), ace.define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("../line_widgets").LineWidgets,
        o = e("../lib/dom"),
        r = e("../range").Range;
    t.showErrorMarker = function(e, t) {
        var n = e.session;
        n.widgetManager || (n.widgetManager = new i(n), n.widgetManager.attach(e));
        var s = e.getCursorPosition(),
            a = s.row,
            l = n.widgetManager.getWidgetsAtRow(a).filter(function(e) { return "errorMarker" == e.type })[0];
        l ? l.destroy() : a -= t;
        var c, h = function(e, t, n) {
            var i = e.getAnnotations().sort(r.comparePoints);
            if (i.length) {
                var o = function(e, t, n) {
                    for (var i = 0, o = e.length - 1; i <= o;) {
                        var r = i + o >> 1,
                            s = n(t, e[r]);
                        if (s > 0) i = r + 1;
                        else {
                            if (!(s < 0)) return r;
                            o = r - 1
                        }
                    }
                    return -(i + 1)
                }(i, { row: t, column: -1 }, r.comparePoints);
                o < 0 && (o = -o - 1), o >= i.length ? o = n > 0 ? 0 : i.length - 1 : 0 === o && n < 0 && (o = i.length - 1);
                var s = i[o];
                if (s && n) {
                    if (s.row === t) {
                        for (;
                            (s = i[o += n]) && s.row === t;);
                        if (!s) return i.slice()
                    }
                    var a = [];
                    for (t = s.row; a[n < 0 ? "unshift" : "push"](s), (s = i[o += n]) && s.row == t;);
                    return a.length && a
                }
            }
        }(n, a, t);
        if (h) {
            var u = h[0];
            s.column = (u.pos && "number" != typeof u.column ? u.pos.sc : u.column) || 0, s.row = u.row, c = e.renderer.$gutterLayer.$annotations[s.row]
        } else {
            if (l) return;
            c = { text: ["Looks good!"], className: "ace_ok" }
        }
        e.session.unfold(s.row), e.selection.moveToPosition(s);
        var d = { row: s.row, fixedWidth: !0, coverGutter: !0, el: o.createElement("div"), type: "errorMarker" },
            g = d.el.appendChild(o.createElement("div")),
            f = d.el.appendChild(o.createElement("div"));
        f.className = "error_widget_arrow " + c.className;
        var p = e.renderer.$cursorLayer.getPixelPosition(s).left;
        f.style.left = p + e.renderer.gutterWidth - 5 + "px", d.el.className = "error_widget_wrapper", g.className = "error_widget " + c.className, g.innerHTML = c.text.join("<br>"), g.appendChild(o.createElement("div"));
        var m = function(e, t, n) { if (0 === t && ("esc" === n || "return" === n)) return d.destroy(), { command: "null" } };
        d.destroy = function() { e.$mouseHandler.isMousePressed || (e.keyBinding.removeKeyboardHandler(m), n.widgetManager.removeLineWidget(d), e.off("changeSelection", d.destroy), e.off("changeSession", d.destroy), e.off("mouseup", d.destroy), e.off("change", d.destroy)) }, e.keyBinding.addKeyboardHandler(m), e.on("changeSelection", d.destroy), e.on("changeSession", d.destroy), e.on("mouseup", d.destroy), e.on("change", d.destroy), e.session.widgetManager.addLineWidget(d), d.el.onmousedown = e.focus.bind(e), e.renderer.scrollCursorIntoView(null, .5, { bottom: d.el.offsetHeight })
    }, o.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }", "")
}), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config"], function(e, t, n) {
    "use strict";
    e("./lib/fixoldbrowsers");
    var i = e("./lib/dom"),
        o = e("./lib/event"),
        r = e("./editor").Editor,
        s = e("./edit_session").EditSession,
        a = e("./undomanager").UndoManager,
        l = e("./virtual_renderer").VirtualRenderer;
    e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./multi_select"), e("./mode/folding/fold_mode"), e("./theme/textmate"), e("./ext/error_marker"), t.config = e("./config"), t.require = e, "function" == typeof define && (t.define = define), t.edit = function(e) {
        if ("string" == typeof e) { var n = e; if (!(e = document.getElementById(n))) throw new Error("ace.edit can't find div #" + n) }
        if (e && e.env && e.env.editor instanceof r) return e.env.editor;
        var s = "";
        if (e && /input|textarea/i.test(e.tagName)) {
            var a = e;
            s = a.value, e = i.createElement("pre"), a.parentNode.replaceChild(e, a)
        } else e && (s = i.getInnerText(e), e.innerHTML = "");
        var c = t.createEditSession(s),
            h = new r(new l(e));
        h.setSession(c);
        var u = { document: c, editor: h, onResize: h.resize.bind(h, null) };
        return a && (u.textarea = a), o.addListener(window, "resize", u.onResize), h.on("destroy", function() { o.removeListener(window, "resize", u.onResize), u.editor.container.env = null }), h.container.env = h.env = u, h
    }, t.createEditSession = function(e, t) { var n = new s(e, t); return n.setUndoManager(new a), n }, t.EditSession = s, t.UndoManager = a, t.version = "1.2.8"
}), ace.require(["ace/ace"], function(e) { for (var t in e && (e.config.init(!0), e.define = ace.define), window.ace || (window.ace = e), e) e.hasOwnProperty(t) && (window.ace[t] = e[t]) }), ace.define("ace/mode/css_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = (e("../lib/lang"), e("./text_highlight_rules").TextHighlightRules),
        r = t.supportType = "align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|min-height|min-width|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index",
        s = t.supportFunction = "rgb|rgba|url|attr|counter|counters",
        a = t.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero",
        l = t.supportConstantColor = "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
        c = t.supportConstantFonts = "arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",
        h = t.numRe = "\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))",
        u = t.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",
        d = t.pseudoClasses = "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",
        g = function() {
            var e = this.createKeywordMapper({ "support.function": s, "support.constant": a, "support.type": r, "support.constant.color": l, "support.constant.fonts": c }, "text", !0);
            this.$rules = { start: [{ include: ["strings", "url", "comments"] }, { token: "paren.lparen", regex: "\\{", next: "ruleset" }, { token: "paren.rparen", regex: "\\}" }, { token: "string", regex: "@", next: "media" }, { token: "keyword", regex: "#[a-z0-9-_]+" }, { token: "keyword", regex: "%" }, { token: "variable", regex: "\\.[a-z0-9-_]+" }, { token: "string", regex: ":[a-z0-9-_]+" }, { token: "constant.numeric", regex: h }, { token: "constant", regex: "[a-z0-9-_]+" }, { caseInsensitive: !0 }], media: [{ include: ["strings", "url", "comments"] }, { token: "paren.lparen", regex: "\\{", next: "start" }, { token: "paren.rparen", regex: "\\}", next: "start" }, { token: "string", regex: ";", next: "start" }, { token: "keyword", regex: "(?:media|supports|document|charset|import|namespace|media|supports|document|page|font|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)" }], comments: [{ token: "comment", regex: "\\/\\*", push: [{ token: "comment", regex: "\\*\\/", next: "pop" }, { defaultToken: "comment" }] }], ruleset: [{ regex: "-(webkit|ms|moz|o)-", token: "text" }, { token: "paren.rparen", regex: "\\}", next: "start" }, { include: ["strings", "url", "comments"] }, { token: ["constant.numeric", "keyword"], regex: "(" + h + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)" }, { token: "constant.numeric", regex: h }, { token: "constant.numeric", regex: "#[a-f0-9]{6}" }, { token: "constant.numeric", regex: "#[a-f0-9]{3}" }, { token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"], regex: u }, { token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"], regex: d }, { include: "url" }, { token: e, regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*" }, { caseInsensitive: !0 }], url: [{ token: "support.function", regex: "(?:url(:?-prefix)?|domain|regexp)\\(", push: [{ token: "support.function", regex: "\\)", next: "pop" }, { defaultToken: "string" }] }], strings: [{ token: "string.start", regex: "'", push: [{ token: "string.end", regex: "'|$", next: "pop" }, { include: "escapes" }, { token: "constant.language.escape", regex: /\\$/, consumeLineEnd: !0 }, { defaultToken: "string" }] }, { token: "string.start", regex: '"', push: [{ token: "string.end", regex: '"|$', next: "pop" }, { include: "escapes" }, { token: "constant.language.escape", regex: /\\$/, consumeLineEnd: !0 }, { defaultToken: "string" }] }], escapes: [{ token: "constant.language.escape", regex: /\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/ }] }, this.normalizeRules()
        };
    i.inherits(g, o), t.CssHighlightRules = g
}), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("../range").Range,
        o = function() {};
    (function() {
        this.checkOutdent = function(e, t) { return !!/^\s+$/.test(e) && /^\s*\}/.test(t) }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t).match(/^(\s*\})/);
            if (!n) return 0;
            var o = n[1].length,
                r = e.findMatchingBracket({ row: t, column: o });
            if (!r || r.row == t) return 0;
            var s = this.$getIndent(e.getLine(r.row));
            e.replace(new i(t, 0, t, o - 1), s)
        }, this.$getIndent = function(e) { return e.match(/^\s*/)[0] }
    }).call(o.prototype), t.MatchingBraceOutdent = o
}), ace.define("ace/mode/css_completions", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = { background: { "#$0": 1 }, "background-color": { "#$0": 1, transparent: 1, fixed: 1 }, "background-image": { "url('/$0')": 1 }, "background-repeat": { repeat: 1, "repeat-x": 1, "repeat-y": 1, "no-repeat": 1, inherit: 1 }, "background-position": { bottom: 2, center: 2, left: 2, right: 2, top: 2, inherit: 2 }, "background-attachment": { scroll: 1, fixed: 1 }, "background-size": { cover: 1, contain: 1 }, "background-clip": { "border-box": 1, "padding-box": 1, "content-box": 1 }, "background-origin": { "border-box": 1, "padding-box": 1, "content-box": 1 }, border: { "solid $0": 1, "dashed $0": 1, "dotted $0": 1, "#$0": 1 }, "border-color": { "#$0": 1 }, "border-style": { solid: 2, dashed: 2, dotted: 2, double: 2, groove: 2, hidden: 2, inherit: 2, inset: 2, none: 2, outset: 2, ridged: 2 }, "border-collapse": { collapse: 1, separate: 1 }, bottom: { px: 1, em: 1, "%": 1 }, clear: { left: 1, right: 1, both: 1, none: 1 }, color: { "#$0": 1, "rgb(#$00,0,0)": 1 }, cursor: { default: 1, pointer: 1, move: 1, text: 1, wait: 1, help: 1, progress: 1, "n-resize": 1, "ne-resize": 1, "e-resize": 1, "se-resize": 1, "s-resize": 1, "sw-resize": 1, "w-resize": 1, "nw-resize": 1 }, display: { none: 1, block: 1, inline: 1, "inline-block": 1, "table-cell": 1 }, "empty-cells": { show: 1, hide: 1 }, float: { left: 1, right: 1, none: 1 }, "font-family": { Arial: 2, "Comic Sans MS": 2, Consolas: 2, "Courier New": 2, Courier: 2, Georgia: 2, Monospace: 2, "Sans-Serif": 2, "Segoe UI": 2, Tahoma: 2, "Times New Roman": 2, "Trebuchet MS": 2, Verdana: 1 }, "font-size": { px: 1, em: 1, "%": 1 }, "font-weight": { bold: 1, normal: 1 }, "font-style": { italic: 1, normal: 1 }, "font-variant": { normal: 1, "small-caps": 1 }, height: { px: 1, em: 1, "%": 1 }, left: { px: 1, em: 1, "%": 1 }, "letter-spacing": { normal: 1 }, "line-height": { normal: 1 }, "list-style-type": { none: 1, disc: 1, circle: 1, square: 1, decimal: 1, "decimal-leading-zero": 1, "lower-roman": 1, "upper-roman": 1, "lower-greek": 1, "lower-latin": 1, "upper-latin": 1, georgian: 1, "lower-alpha": 1, "upper-alpha": 1 }, margin: { px: 1, em: 1, "%": 1 }, "margin-right": { px: 1, em: 1, "%": 1 }, "margin-left": { px: 1, em: 1, "%": 1 }, "margin-top": { px: 1, em: 1, "%": 1 }, "margin-bottom": { px: 1, em: 1, "%": 1 }, "max-height": { px: 1, em: 1, "%": 1 }, "max-width": { px: 1, em: 1, "%": 1 }, "min-height": { px: 1, em: 1, "%": 1 }, "min-width": { px: 1, em: 1, "%": 1 }, overflow: { hidden: 1, visible: 1, auto: 1, scroll: 1 }, "overflow-x": { hidden: 1, visible: 1, auto: 1, scroll: 1 }, "overflow-y": { hidden: 1, visible: 1, auto: 1, scroll: 1 }, padding: { px: 1, em: 1, "%": 1 }, "padding-top": { px: 1, em: 1, "%": 1 }, "padding-right": { px: 1, em: 1, "%": 1 }, "padding-bottom": { px: 1, em: 1, "%": 1 }, "padding-left": { px: 1, em: 1, "%": 1 }, "page-break-after": { auto: 1, always: 1, avoid: 1, left: 1, right: 1 }, "page-break-before": { auto: 1, always: 1, avoid: 1, left: 1, right: 1 }, position: { absolute: 1, relative: 1, fixed: 1, static: 1 }, right: { px: 1, em: 1, "%": 1 }, "table-layout": { fixed: 1, auto: 1 }, "text-decoration": { none: 1, underline: 1, "line-through": 1, blink: 1 }, "text-align": { left: 1, right: 1, center: 1, justify: 1 }, "text-transform": { capitalize: 1, uppercase: 1, lowercase: 1, none: 1 }, top: { px: 1, em: 1, "%": 1 }, "vertical-align": { top: 1, bottom: 1 }, visibility: { hidden: 1, visible: 1 }, "white-space": { nowrap: 1, normal: 1, pre: 1, "pre-line": 1, "pre-wrap": 1 }, width: { px: 1, em: 1, "%": 1 }, "word-spacing": { normal: 1 }, filter: { "alpha(opacity=$0100)": 1 }, "text-shadow": { "$02px 2px 2px #777": 1 }, "text-overflow": { "ellipsis-word": 1, clip: 1, ellipsis: 1 }, "-moz-border-radius": 1, "-moz-border-radius-topright": 1, "-moz-border-radius-bottomright": 1, "-moz-border-radius-topleft": 1, "-moz-border-radius-bottomleft": 1, "-webkit-border-radius": 1, "-webkit-border-top-right-radius": 1, "-webkit-border-top-left-radius": 1, "-webkit-border-bottom-right-radius": 1, "-webkit-border-bottom-left-radius": 1, "-moz-box-shadow": 1, "-webkit-box-shadow": 1, transform: { "rotate($00deg)": 1, "skew($00deg)": 1 }, "-moz-transform": { "rotate($00deg)": 1, "skew($00deg)": 1 }, "-webkit-transform": { "rotate($00deg)": 1, "skew($00deg)": 1 } },
        o = function() {};
    (function() {
        this.completionsDefined = !1, this.defineCompletions = function() {
            if (document) {
                var e = document.createElement("c").style;
                for (var t in e)
                    if ("string" == typeof e[t]) {
                        var n = t.replace(/[A-Z]/g, function(e) { return "-" + e.toLowerCase() });
                        i.hasOwnProperty(n) || (i[n] = 1)
                    }
            }
            this.completionsDefined = !0
        }, this.getCompletions = function(e, t, n, i) { if (this.completionsDefined || this.defineCompletions(), !t.getTokenAt(n.row, n.column)) return []; if ("ruleset" === e) { var o = t.getLine(n.row).substr(0, n.column); return /:[^;]+$/.test(o) ? (/([\w\-]+):[^:]*$/.test(o), this.getPropertyValueCompletions(e, t, n, i)) : this.getPropertyCompletions(e, t, n, i) } return [] }, this.getPropertyCompletions = function(e, t, n, o) { return Object.keys(i).map(function(e) { return { caption: e, snippet: e + ": $0", meta: "property", score: Number.MAX_VALUE } }) }, this.getPropertyValueCompletions = function(e, t, n, o) {
            var r = t.getLine(n.row).substr(0, n.column),
                s = (/([\w\-]+):[^:]*$/.exec(r) || {})[1];
            if (!s) return [];
            var a = [];
            return s in i && "object" == typeof i[s] && (a = Object.keys(i[s])), a.map(function(e) { return { caption: e, snippet: e, meta: "property value", score: Number.MAX_VALUE } })
        }
    }).call(o.prototype), t.CssCompletions = o
}), ace.define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t, n) {
    "use strict";
    var i = e("../../lib/oop"),
        o = (e("../behaviour").Behaviour, e("./cstyle").CstyleBehaviour),
        r = e("../../token_iterator").TokenIterator,
        s = function() {
            this.inherit(o), this.add("colon", "insertion", function(e, t, n, i, o) {
                if (":" === o) {
                    var s = n.getCursorPosition(),
                        a = new r(i, s.row, s.column),
                        l = a.getCurrentToken();
                    if (l && l.value.match(/\s+/) && (l = a.stepBackward()), l && "support.type" === l.type) { var c = i.doc.getLine(s.row); if (":" === c.substring(s.column, s.column + 1)) return { text: "", selection: [1, 1] }; if (!c.substring(s.column).match(/^\s*;/)) return { text: ":;", selection: [1, 1] } }
                }
            }), this.add("colon", "deletion", function(e, t, n, i, o) {
                var s = i.doc.getTextRange(o);
                if (!o.isMultiLine() && ":" === s) {
                    var a = n.getCursorPosition(),
                        l = new r(i, a.row, a.column),
                        c = l.getCurrentToken();
                    if (c && c.value.match(/\s+/) && (c = l.stepBackward()), c && "support.type" === c.type)
                        if (";" === i.doc.getLine(o.start.row).substring(o.end.column, o.end.column + 1)) return o.end.column++, o
                }
            }), this.add("semicolon", "insertion", function(e, t, n, i, o) { if (";" === o) { var r = n.getCursorPosition(); if (";" === i.doc.getLine(r.row).substring(r.column, r.column + 1)) return { text: "", selection: [1, 1] } } })
        };
    i.inherits(s, o), t.CssBehaviour = s
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t, n) {
    "use strict";
    var i = e("../../lib/oop"),
        o = e("../../range").Range,
        r = e("./fold_mode").FoldMode,
        s = t.FoldMode = function(e) { e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end))) };
    i.inherits(s, r),
        function() {
            this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function(e, t, n) { var i = e.getLine(n); if (this.singleLineBlockCommentRe.test(i) && !this.startRegionRe.test(i) && !this.tripleStarBlockCommentRe.test(i)) return ""; var o = this._getFoldWidgetBase(e, t, n); return !o && this.startRegionRe.test(i) ? "start" : o }, this.getFoldWidgetRange = function(e, t, n, i) { var o, r = e.getLine(n); if (this.startRegionRe.test(r)) return this.getCommentRegionBlock(e, r, n); if (o = r.match(this.foldingStartMarker)) { var s = o.index; if (o[1]) return this.openingBracketBlock(e, o[1], n, s); var a = e.getCommentFoldRange(n, s + o[0].length, 1); return a && !a.isMultiLine() && (i ? a = this.getSectionRange(e, n) : "all" != t && (a = null)), a } if ("markbegin" !== t && (o = r.match(this.foldingStopMarker))) { s = o.index + o[0].length; return o[1] ? this.closingBracketBlock(e, o[1], n, s) : e.getCommentFoldRange(n, s, -1) } }, this.getSectionRange = function(e, t) {
                for (var n = e.getLine(t), i = n.search(/\S/), r = t, s = n.length, a = t += 1, l = e.getLength(); ++t < l;) {
                    var c = (n = e.getLine(t)).search(/\S/);
                    if (-1 !== c) {
                        if (i > c) break;
                        var h = this.getFoldWidgetRange(e, "all", t);
                        if (h) {
                            if (h.start.row <= r) break;
                            if (h.isMultiLine()) t = h.end.row;
                            else if (i == c) break
                        }
                        a = t
                    }
                }
                return new o(r, s, a, e.getLine(a).length)
            }, this.getCommentRegionBlock = function(e, t, n) { for (var i = t.search(/\s*$/), r = e.getLength(), s = n, a = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, l = 1; ++n < r;) { t = e.getLine(n); var c = a.exec(t); if (c && (c[1] ? l-- : l++, !l)) break } if (n > s) return new o(s, i, n, t.length) }
        }.call(s.prototype)
}), ace.define("ace/mode/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/css_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/css_completions", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("./text").Mode,
        r = e("./css_highlight_rules").CssHighlightRules,
        s = e("./matching_brace_outdent").MatchingBraceOutdent,
        a = e("../worker/worker_client").WorkerClient,
        l = e("./css_completions").CssCompletions,
        c = e("./behaviour/css").CssBehaviour,
        h = e("./folding/cstyle").FoldMode,
        u = function() { this.HighlightRules = r, this.$outdent = new s, this.$behaviour = new c, this.$completer = new l, this.foldingRules = new h };
    i.inherits(u, o),
        function() {
            this.foldingRules = "cStyle", this.blockComment = { start: "/*", end: "*/" }, this.getNextLineIndent = function(e, t, n) {
                var i = this.$getIndent(t),
                    o = this.getTokenizer().getLineTokens(t, e).tokens;
                return o.length && "comment" == o[o.length - 1].type ? i : (t.match(/^.*\{\s*$/) && (i += n), i)
            }, this.checkOutdent = function(e, t, n) { return this.$outdent.checkOutdent(t, n) }, this.autoOutdent = function(e, t, n) { this.$outdent.autoOutdent(t, n) }, this.getCompletions = function(e, t, n, i) { return this.$completer.getCompletions(e, t, n, i) }, this.createWorker = function(e) { var t = new a(["ace"], "ace/mode/css_worker", "Worker"); return t.attachToDocument(e.getDocument()), t.on("annotate", function(t) { e.setAnnotations(t.data) }), t.on("terminate", function() { e.clearAnnotations() }), t }, this.$id = "ace/mode/css"
        }.call(u.prototype), t.Mode = u
}), ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("./text_highlight_rules").TextHighlightRules,
        r = function() { this.$rules = { start: [{ token: "comment.doc.tag", regex: "@[\\w\\d_]+" }, r.getTagRule(), { defaultToken: "comment.doc", caseInsensitive: !0 }] } };
    i.inherits(r, o), r.getTagRule = function(e) { return { token: "comment.doc.tag.storage.type", regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b" } }, r.getStartRule = function(e) { return { token: "comment.doc", regex: "\\/\\*(?=\\*)", next: e } }, r.getEndRule = function(e) { return { token: "comment.doc", regex: "\\*\\/", next: e } }, t.DocCommentHighlightRules = r
}), ace.define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";

    function i(e) { return [{ token: "comment", regex: /\/\*/, next: [r.getTagRule(), { token: "comment", regex: "\\*\\/", next: e || "pop" }, { defaultToken: "comment", caseInsensitive: !0 }] }, { token: "comment", regex: "\\/\\/", next: [r.getTagRule(), { token: "comment", regex: "$|^", next: e || "pop" }, { defaultToken: "comment", caseInsensitive: !0 }] }] }
    var o = e("../lib/oop"),
        r = e("./doc_comment_highlight_rules").DocCommentHighlightRules,
        s = e("./text_highlight_rules").TextHighlightRules,
        a = "[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*",
        l = function(e) {
            var t = this.createKeywordMapper({ "variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document", keyword: "const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static", "storage.type": "const|let|var|function", "constant.language": "null|Infinity|NaN|undefined", "support.function": "alert", "constant.language.boolean": "true|false" }, "identifier"),
                n = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)";
            this.$rules = { no_regex: [r.getStartRule("doc-start"), i("no_regex"), { token: "string", regex: "'(?=.)", next: "qstring" }, { token: "string", regex: '"(?=.)', next: "qqstring" }, { token: "constant.numeric", regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/ }, { token: "constant.numeric", regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/ }, { token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"], regex: "(" + a + ")(\\.)(prototype)(\\.)(" + a + ")(\\s*)(=)", next: "function_arguments" }, { token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + a + ")(\\.)(" + a + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + a + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(" + a + ")(\\.)(" + a + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()", next: "function_arguments" }, { token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(function)(\\s+)(" + a + ")(\\s*)(\\()", next: "function_arguments" }, { token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"], regex: "(" + a + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: ["text", "text", "storage.type", "text", "paren.lparen"], regex: "(:)(\\s*)(function)(\\s*)(\\()", next: "function_arguments" }, { token: "keyword", regex: "from(?=\\s*('|\"))" }, { token: "keyword", regex: "(?:case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void)\\b", next: "start" }, { token: ["support.constant"], regex: /that\b/ }, { token: ["storage.type", "punctuation.operator", "support.function.firebug"], regex: /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/ }, { token: t, regex: a }, { token: "punctuation.operator", regex: /[.](?![.])/, next: "property" }, { token: "storage.type", regex: /=>/, next: "start" }, { token: "keyword.operator", regex: /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/, next: "start" }, { token: "punctuation.operator", regex: /[?:,;.]/, next: "start" }, { token: "paren.lparen", regex: /[\[({]/, next: "start" }, { token: "paren.rparen", regex: /[\])}]/ }, { token: "comment", regex: /^#!.*$/ }], property: [{ token: "text", regex: "\\s+" }, { token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"], regex: "(" + a + ")(\\.)(" + a + ")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()", next: "function_arguments" }, { token: "punctuation.operator", regex: /[.](?![.])/ }, { token: "support.function", regex: /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/ }, { token: "support.function.dom", regex: /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/ }, { token: "support.constant", regex: /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/ }, { token: "identifier", regex: a }, { regex: "", token: "empty", next: "no_regex" }], start: [r.getStartRule("doc-start"), i("start"), { token: "string.regexp", regex: "\\/", next: "regex" }, { token: "text", regex: "\\s+|^$", next: "start" }, { token: "empty", regex: "", next: "no_regex" }], regex: [{ token: "regexp.keyword.operator", regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)" }, { token: "string.regexp", regex: "/[sxngimy]*", next: "no_regex" }, { token: "invalid", regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/ }, { token: "constant.language.escape", regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/ }, { token: "constant.language.delimiter", regex: /\|/ }, { token: "constant.language.escape", regex: /\[\^?/, next: "regex_character_class" }, { token: "empty", regex: "$", next: "no_regex" }, { defaultToken: "string.regexp" }], regex_character_class: [{ token: "regexp.charclass.keyword.operator", regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)" }, { token: "constant.language.escape", regex: "]", next: "regex" }, { token: "constant.language.escape", regex: "-" }, { token: "empty", regex: "$", next: "no_regex" }, { defaultToken: "string.regexp.charachterclass" }], function_arguments: [{ token: "variable.parameter", regex: a }, { token: "punctuation.operator", regex: "[, ]+" }, { token: "punctuation.operator", regex: "$" }, { token: "empty", regex: "", next: "no_regex" }], qqstring: [{ token: "constant.language.escape", regex: n }, { token: "string", regex: "\\\\$", consumeLineEnd: !0 }, { token: "string", regex: '"|$', next: "no_regex" }, { defaultToken: "string" }], qstring: [{ token: "constant.language.escape", regex: n }, { token: "string", regex: "\\\\$", consumeLineEnd: !0 }, { token: "string", regex: "'|$", next: "no_regex" }, { defaultToken: "string" }] }, e && e.noES6 || (this.$rules.no_regex.unshift({
                regex: "[{}]",
                onMatch: function(e, t, n) {
                    if (this.next = "{" == e ? this.nextState : "", "{" == e && n.length) n.unshift("start", t);
                    else if ("}" == e && n.length && (n.shift(), this.next = n.shift(), -1 != this.next.indexOf("string") || -1 != this.next.indexOf("jsx"))) return "paren.quasi.end";
                    return "{" == e ? "paren.lparen" : "paren.rparen"
                },
                nextState: "start"
            }, { token: "string.quasi.start", regex: /`/, push: [{ token: "constant.language.escape", regex: n }, { token: "paren.quasi.start", regex: /\${/, push: "start" }, { token: "string.quasi.end", regex: /`/, next: "pop" }, { defaultToken: "string.quasi" }] }), (!e || 0 != e.jsx) && function() {
                var e = a.replace("\\d", "\\d\\-"),
                    t = { onMatch: function(e, t, n) { var i = "/" == e.charAt(1) ? 2 : 1; return 1 == i ? (t != this.nextState ? n.unshift(this.next, this.nextState, 0) : n.unshift(this.next), n[2]++) : 2 == i && t == this.nextState && (n[1]--, (!n[1] || n[1] < 0) && (n.shift(), n.shift())), [{ type: "meta.tag.punctuation." + (1 == i ? "" : "end-") + "tag-open.xml", value: e.slice(0, i) }, { type: "meta.tag.tag-name.xml", value: e.substr(i) }] }, regex: "</?" + e, next: "jsxAttributes", nextState: "jsx" };
                this.$rules.start.unshift(t);
                var n = { regex: "{", token: "paren.quasi.start", push: "start" };
                this.$rules.jsx = [n, t, { include: "reference" }, { defaultToken: "string" }], this.$rules.jsxAttributes = [{ token: "meta.tag.punctuation.tag-close.xml", regex: "/?>", onMatch: function(e, t, n) { return t == n[0] && n.shift(), 2 == e.length && (n[0] == this.nextState && n[1]--, (!n[1] || n[1] < 0) && n.splice(0, 2)), this.next = n[0] || "start", [{ type: this.token, value: e }] }, nextState: "jsx" }, n, i("jsxAttributes"), { token: "entity.other.attribute-name.xml", regex: e }, { token: "keyword.operator.attribute-equals.xml", regex: "=" }, { token: "text.tag-whitespace.xml", regex: "\\s+" }, { token: "string.attribute-value.xml", regex: "'", stateName: "jsx_attr_q", push: [{ token: "string.attribute-value.xml", regex: "'", next: "pop" }, { include: "reference" }, { defaultToken: "string.attribute-value.xml" }] }, { token: "string.attribute-value.xml", regex: '"', stateName: "jsx_attr_qq", push: [{ token: "string.attribute-value.xml", regex: '"', next: "pop" }, { include: "reference" }, { defaultToken: "string.attribute-value.xml" }] }, t], this.$rules.reference = [{ token: "constant.language.escape.reference.xml", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" }]
            }.call(this)), this.embedRules(r, "doc-", [r.getEndRule("no_regex")]), this.normalizeRules()
        };
    o.inherits(l, s), t.JavaScriptHighlightRules = l
}), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    "use strict";
    var i = e("../range").Range,
        o = function() {};
    (function() {
        this.checkOutdent = function(e, t) { return !!/^\s+$/.test(e) && /^\s*\}/.test(t) }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t).match(/^(\s*\})/);
            if (!n) return 0;
            var o = n[1].length,
                r = e.findMatchingBracket({ row: t, column: o });
            if (!r || r.row == t) return 0;
            var s = this.$getIndent(e.getLine(r.row));
            e.replace(new i(t, 0, t, o - 1), s)
        }, this.$getIndent = function(e) { return e.match(/^\s*/)[0] }
    }).call(o.prototype), t.MatchingBraceOutdent = o
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t, n) {
    "use strict";
    var i = e("../../lib/oop"),
        o = e("../../range").Range,
        r = e("./fold_mode").FoldMode,
        s = t.FoldMode = function(e) { e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end))) };
    i.inherits(s, r),
        function() {
            this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function(e, t, n) { var i = e.getLine(n); if (this.singleLineBlockCommentRe.test(i) && !this.startRegionRe.test(i) && !this.tripleStarBlockCommentRe.test(i)) return ""; var o = this._getFoldWidgetBase(e, t, n); return !o && this.startRegionRe.test(i) ? "start" : o }, this.getFoldWidgetRange = function(e, t, n, i) { var o, r = e.getLine(n); if (this.startRegionRe.test(r)) return this.getCommentRegionBlock(e, r, n); if (o = r.match(this.foldingStartMarker)) { var s = o.index; if (o[1]) return this.openingBracketBlock(e, o[1], n, s); var a = e.getCommentFoldRange(n, s + o[0].length, 1); return a && !a.isMultiLine() && (i ? a = this.getSectionRange(e, n) : "all" != t && (a = null)), a } if ("markbegin" !== t && (o = r.match(this.foldingStopMarker))) { s = o.index + o[0].length; return o[1] ? this.closingBracketBlock(e, o[1], n, s) : e.getCommentFoldRange(n, s, -1) } }, this.getSectionRange = function(e, t) {
                for (var n = e.getLine(t), i = n.search(/\S/), r = t, s = n.length, a = t += 1, l = e.getLength(); ++t < l;) {
                    var c = (n = e.getLine(t)).search(/\S/);
                    if (-1 !== c) {
                        if (i > c) break;
                        var h = this.getFoldWidgetRange(e, "all", t);
                        if (h) {
                            if (h.start.row <= r) break;
                            if (h.isMultiLine()) t = h.end.row;
                            else if (i == c) break
                        }
                        a = t
                    }
                }
                return new o(r, s, a, e.getLine(a).length)
            }, this.getCommentRegionBlock = function(e, t, n) { for (var i = t.search(/\s*$/), r = e.getLength(), s = n, a = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, l = 1; ++n < r;) { t = e.getLine(n); var c = a.exec(t); if (c && (c[1] ? l-- : l++, !l)) break } if (n > s) return new o(s, i, n, t.length) }
        }.call(s.prototype)
}), ace.define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("./text").Mode,
        r = e("./javascript_highlight_rules").JavaScriptHighlightRules,
        s = e("./matching_brace_outdent").MatchingBraceOutdent,
        a = e("../worker/worker_client").WorkerClient,
        l = e("./behaviour/cstyle").CstyleBehaviour,
        c = e("./folding/cstyle").FoldMode,
        h = function() { this.HighlightRules = r, this.$outdent = new s, this.$behaviour = new l, this.foldingRules = new c };
    i.inherits(h, o),
        function() {
            this.lineCommentStart = "//", this.blockComment = { start: "/*", end: "*/" }, this.$quotes = { '"': '"', "'": "'", "`": "`" }, this.getNextLineIndent = function(e, t, n) {
                var i = this.$getIndent(t),
                    o = this.getTokenizer().getLineTokens(t, e),
                    r = o.tokens,
                    s = o.state;
                if (r.length && "comment" == r[r.length - 1].type) return i;
                if ("start" == e || "no_regex" == e)(a = t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/)) && (i += n);
                else if ("doc-start" == e) {
                    if ("start" == s || "no_regex" == s) return "";
                    var a;
                    (a = t.match(/^\s*(\/?)\*/)) && (a[1] && (i += " "), i += "* ")
                }
                return i
            }, this.checkOutdent = function(e, t, n) { return this.$outdent.checkOutdent(t, n) }, this.autoOutdent = function(e, t, n) { this.$outdent.autoOutdent(t, n) }, this.createWorker = function(e) { var t = new a(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker"); return t.attachToDocument(e.getDocument()), t.on("annotate", function(t) { e.setAnnotations(t.data) }), t.on("terminate", function() { e.clearAnnotations() }), t }, this.$id = "ace/mode/javascript"
        }.call(h.prototype), t.Mode = h
}), ace.define("ace/mode/css_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = (e("../lib/lang"), e("./text_highlight_rules").TextHighlightRules),
        r = t.supportType = "align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|max-zoom|min-height|min-width|min-zoom|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|user-zoom|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index",
        s = t.supportFunction = "rgb|rgba|url|attr|counter|counters",
        a = t.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero|zoom",
        l = t.supportConstantColor = "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
        c = t.supportConstantFonts = "arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",
        h = t.numRe = "\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))",
        u = t.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",
        d = t.pseudoClasses = "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",
        g = function() {
            var e = this.createKeywordMapper({ "support.function": s, "support.constant": a, "support.type": r, "support.constant.color": l, "support.constant.fonts": c }, "text", !0);
            this.$rules = { start: [{ include: ["strings", "url", "comments"] }, { token: "paren.lparen", regex: "\\{", next: "ruleset" }, { token: "paren.rparen", regex: "\\}" }, { token: "string", regex: "@(?!viewport)", next: "media" }, { token: "keyword", regex: "#[a-z0-9-_]+" }, { token: "keyword", regex: "%" }, { token: "variable", regex: "\\.[a-z0-9-_]+" }, { token: "string", regex: ":[a-z0-9-_]+" }, { token: "constant.numeric", regex: h }, { token: "constant", regex: "[a-z0-9-_]+" }, { caseInsensitive: !0 }], media: [{ include: ["strings", "url", "comments"] }, { token: "paren.lparen", regex: "\\{", next: "start" }, { token: "paren.rparen", regex: "\\}", next: "start" }, { token: "string", regex: ";", next: "start" }, { token: "keyword", regex: "(?:media|supports|document|charset|import|namespace|media|supports|document|page|font|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)" }], comments: [{ token: "comment", regex: "\\/\\*", push: [{ token: "comment", regex: "\\*\\/", next: "pop" }, { defaultToken: "comment" }] }], ruleset: [{ regex: "-(webkit|ms|moz|o)-", token: "text" }, { token: "punctuation.operator", regex: "[:;]" }, { token: "paren.rparen", regex: "\\}", next: "start" }, { include: ["strings", "url", "comments"] }, { token: ["constant.numeric", "keyword"], regex: "(" + h + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)" }, { token: "constant.numeric", regex: h }, { token: "constant.numeric", regex: "#[a-f0-9]{6}" }, { token: "constant.numeric", regex: "#[a-f0-9]{3}" }, { token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"], regex: u }, { token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"], regex: d }, { include: "url" }, { token: e, regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*" }, { caseInsensitive: !0 }], url: [{ token: "support.function", regex: "(?:url(:?-prefix)?|domain|regexp)\\(", push: [{ token: "support.function", regex: "\\)", next: "pop" }, { defaultToken: "string" }] }], strings: [{ token: "string.start", regex: "'", push: [{ token: "string.end", regex: "'|$", next: "pop" }, { include: "escapes" }, { token: "constant.language.escape", regex: /\\$/, consumeLineEnd: !0 }, { defaultToken: "string" }] }, { token: "string.start", regex: '"', push: [{ token: "string.end", regex: '"|$', next: "pop" }, { include: "escapes" }, { token: "constant.language.escape", regex: /\\$/, consumeLineEnd: !0 }, { defaultToken: "string" }] }], escapes: [{ token: "constant.language.escape", regex: /\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/ }] }, this.normalizeRules()
        };
    i.inherits(g, o), t.CssHighlightRules = g
}), ace.define("ace/mode/css_completions", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var i = { background: { "#$0": 1 }, "background-color": { "#$0": 1, transparent: 1, fixed: 1 }, "background-image": { "url('/$0')": 1 }, "background-repeat": { repeat: 1, "repeat-x": 1, "repeat-y": 1, "no-repeat": 1, inherit: 1 }, "background-position": { bottom: 2, center: 2, left: 2, right: 2, top: 2, inherit: 2 }, "background-attachment": { scroll: 1, fixed: 1 }, "background-size": { cover: 1, contain: 1 }, "background-clip": { "border-box": 1, "padding-box": 1, "content-box": 1 }, "background-origin": { "border-box": 1, "padding-box": 1, "content-box": 1 }, border: { "solid $0": 1, "dashed $0": 1, "dotted $0": 1, "#$0": 1 }, "border-color": { "#$0": 1 }, "border-style": { solid: 2, dashed: 2, dotted: 2, double: 2, groove: 2, hidden: 2, inherit: 2, inset: 2, none: 2, outset: 2, ridged: 2 }, "border-collapse": { collapse: 1, separate: 1 }, bottom: { px: 1, em: 1, "%": 1 }, clear: { left: 1, right: 1, both: 1, none: 1 }, color: { "#$0": 1, "rgb(#$00,0,0)": 1 }, cursor: { default: 1, pointer: 1, move: 1, text: 1, wait: 1, help: 1, progress: 1, "n-resize": 1, "ne-resize": 1, "e-resize": 1, "se-resize": 1, "s-resize": 1, "sw-resize": 1, "w-resize": 1, "nw-resize": 1 }, display: { none: 1, block: 1, inline: 1, "inline-block": 1, "table-cell": 1 }, "empty-cells": { show: 1, hide: 1 }, float: { left: 1, right: 1, none: 1 }, "font-family": { Arial: 2, "Comic Sans MS": 2, Consolas: 2, "Courier New": 2, Courier: 2, Georgia: 2, Monospace: 2, "Sans-Serif": 2, "Segoe UI": 2, Tahoma: 2, "Times New Roman": 2, "Trebuchet MS": 2, Verdana: 1 }, "font-size": { px: 1, em: 1, "%": 1 }, "font-weight": { bold: 1, normal: 1 }, "font-style": { italic: 1, normal: 1 }, "font-variant": { normal: 1, "small-caps": 1 }, height: { px: 1, em: 1, "%": 1 }, left: { px: 1, em: 1, "%": 1 }, "letter-spacing": { normal: 1 }, "line-height": { normal: 1 }, "list-style-type": { none: 1, disc: 1, circle: 1, square: 1, decimal: 1, "decimal-leading-zero": 1, "lower-roman": 1, "upper-roman": 1, "lower-greek": 1, "lower-latin": 1, "upper-latin": 1, georgian: 1, "lower-alpha": 1, "upper-alpha": 1 }, margin: { px: 1, em: 1, "%": 1 }, "margin-right": { px: 1, em: 1, "%": 1 }, "margin-left": { px: 1, em: 1, "%": 1 }, "margin-top": { px: 1, em: 1, "%": 1 }, "margin-bottom": { px: 1, em: 1, "%": 1 }, "max-height": { px: 1, em: 1, "%": 1 }, "max-width": { px: 1, em: 1, "%": 1 }, "min-height": { px: 1, em: 1, "%": 1 }, "min-width": { px: 1, em: 1, "%": 1 }, overflow: { hidden: 1, visible: 1, auto: 1, scroll: 1 }, "overflow-x": { hidden: 1, visible: 1, auto: 1, scroll: 1 }, "overflow-y": { hidden: 1, visible: 1, auto: 1, scroll: 1 }, padding: { px: 1, em: 1, "%": 1 }, "padding-top": { px: 1, em: 1, "%": 1 }, "padding-right": { px: 1, em: 1, "%": 1 }, "padding-bottom": { px: 1, em: 1, "%": 1 }, "padding-left": { px: 1, em: 1, "%": 1 }, "page-break-after": { auto: 1, always: 1, avoid: 1, left: 1, right: 1 }, "page-break-before": { auto: 1, always: 1, avoid: 1, left: 1, right: 1 }, position: { absolute: 1, relative: 1, fixed: 1, static: 1 }, right: { px: 1, em: 1, "%": 1 }, "table-layout": { fixed: 1, auto: 1 }, "text-decoration": { none: 1, underline: 1, "line-through": 1, blink: 1 }, "text-align": { left: 1, right: 1, center: 1, justify: 1 }, "text-transform": { capitalize: 1, uppercase: 1, lowercase: 1, none: 1 }, top: { px: 1, em: 1, "%": 1 }, "vertical-align": { top: 1, bottom: 1 }, visibility: { hidden: 1, visible: 1 }, "white-space": { nowrap: 1, normal: 1, pre: 1, "pre-line": 1, "pre-wrap": 1 }, width: { px: 1, em: 1, "%": 1 }, "word-spacing": { normal: 1 }, filter: { "alpha(opacity=$0100)": 1 }, "text-shadow": { "$02px 2px 2px #777": 1 }, "text-overflow": { "ellipsis-word": 1, clip: 1, ellipsis: 1 }, "-moz-border-radius": 1, "-moz-border-radius-topright": 1, "-moz-border-radius-bottomright": 1, "-moz-border-radius-topleft": 1, "-moz-border-radius-bottomleft": 1, "-webkit-border-radius": 1, "-webkit-border-top-right-radius": 1, "-webkit-border-top-left-radius": 1, "-webkit-border-bottom-right-radius": 1, "-webkit-border-bottom-left-radius": 1, "-moz-box-shadow": 1, "-webkit-box-shadow": 1, transform: { "rotate($00deg)": 1, "skew($00deg)": 1 }, "-moz-transform": { "rotate($00deg)": 1, "skew($00deg)": 1 }, "-webkit-transform": { "rotate($00deg)": 1, "skew($00deg)": 1 } },
        o = function() {};
    (function() {
        this.completionsDefined = !1, this.defineCompletions = function() {
            if (document) {
                var e = document.createElement("c").style;
                for (var t in e)
                    if ("string" == typeof e[t]) {
                        var n = t.replace(/[A-Z]/g, function(e) { return "-" + e.toLowerCase() });
                        i.hasOwnProperty(n) || (i[n] = 1)
                    }
            }
            this.completionsDefined = !0
        }, this.getCompletions = function(e, t, n, i) { if (this.completionsDefined || this.defineCompletions(), !t.getTokenAt(n.row, n.column)) return []; if ("ruleset" === e) { var o = t.getLine(n.row).substr(0, n.column); return /:[^;]+$/.test(o) ? (/([\w\-]+):[^:]*$/.test(o), this.getPropertyValueCompletions(e, t, n, i)) : this.getPropertyCompletions(e, t, n, i) } return [] }, this.getPropertyCompletions = function(e, t, n, o) { return Object.keys(i).map(function(e) { return { caption: e, snippet: e + ": $0;", meta: "property", score: 1e6 } }) }, this.getPropertyValueCompletions = function(e, t, n, o) {
            var r = t.getLine(n.row).substr(0, n.column),
                s = (/([\w\-]+):[^:]*$/.exec(r) || {})[1];
            if (!s) return [];
            var a = [];
            return s in i && "object" == typeof i[s] && (a = Object.keys(i[s])), a.map(function(e) { return { caption: e, snippet: e, meta: "property value", score: 1e6 } })
        }
    }).call(o.prototype), t.CssCompletions = o
}), ace.define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t, n) {
    "use strict";
    var i = e("../../lib/oop"),
        o = (e("../behaviour").Behaviour, e("./cstyle").CstyleBehaviour),
        r = e("../../token_iterator").TokenIterator,
        s = function() {
            this.inherit(o), this.add("colon", "insertion", function(e, t, n, i, o) {
                if (":" === o && n.selection.isEmpty()) {
                    var s = n.getCursorPosition(),
                        a = new r(i, s.row, s.column),
                        l = a.getCurrentToken();
                    if (l && l.value.match(/\s+/) && (l = a.stepBackward()), l && "support.type" === l.type) { var c = i.doc.getLine(s.row); if (":" === c.substring(s.column, s.column + 1)) return { text: "", selection: [1, 1] }; if (/^(\s+[^;]|\s*$)/.test(c.substring(s.column))) return { text: ":;", selection: [1, 1] } }
                }
            }), this.add("colon", "deletion", function(e, t, n, i, o) {
                var s = i.doc.getTextRange(o);
                if (!o.isMultiLine() && ":" === s) {
                    var a = n.getCursorPosition(),
                        l = new r(i, a.row, a.column),
                        c = l.getCurrentToken();
                    if (c && c.value.match(/\s+/) && (c = l.stepBackward()), c && "support.type" === c.type)
                        if (";" === i.doc.getLine(o.start.row).substring(o.end.column, o.end.column + 1)) return o.end.column++, o
                }
            }), this.add("semicolon", "insertion", function(e, t, n, i, o) { if (";" === o && n.selection.isEmpty()) { var r = n.getCursorPosition(); if (";" === i.doc.getLine(r.row).substring(r.column, r.column + 1)) return { text: "", selection: [1, 1] } } }), this.add("!important", "insertion", function(e, t, n, i, o) {
                if ("!" === o && n.selection.isEmpty()) {
                    var r = n.getCursorPosition(),
                        s = i.doc.getLine(r.row);
                    if (/^\s*(;|}|$)/.test(s.substring(r.column))) return { text: "!important", selection: [10, 10] }
                }
            })
        };
    i.inherits(s, o), t.CssBehaviour = s
}), ace.define("ace/mode/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/css_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/css_completions", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("./text").Mode,
        r = e("./css_highlight_rules").CssHighlightRules,
        s = e("./matching_brace_outdent").MatchingBraceOutdent,
        a = e("../worker/worker_client").WorkerClient,
        l = e("./css_completions").CssCompletions,
        c = e("./behaviour/css").CssBehaviour,
        h = e("./folding/cstyle").FoldMode,
        u = function() { this.HighlightRules = r, this.$outdent = new s, this.$behaviour = new c, this.$completer = new l, this.foldingRules = new h };
    i.inherits(u, o),
        function() {
            this.foldingRules = "cStyle", this.blockComment = { start: "/*", end: "*/" }, this.getNextLineIndent = function(e, t, n) {
                var i = this.$getIndent(t),
                    o = this.getTokenizer().getLineTokens(t, e).tokens;
                return o.length && "comment" == o[o.length - 1].type ? i : (t.match(/^.*\{\s*$/) && (i += n), i)
            }, this.checkOutdent = function(e, t, n) { return this.$outdent.checkOutdent(t, n) }, this.autoOutdent = function(e, t, n) { this.$outdent.autoOutdent(t, n) }, this.getCompletions = function(e, t, n, i) { return this.$completer.getCompletions(e, t, n, i) }, this.createWorker = function(e) { var t = new a(["ace"], "ace/mode/css_worker", "Worker"); return t.attachToDocument(e.getDocument()), t.on("annotate", function(t) { e.setAnnotations(t.data) }), t.on("terminate", function() { e.clearAnnotations() }), t }, this.$id = "ace/mode/css"
        }.call(u.prototype), t.Mode = u
}), ace.define("ace/mode/xml_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("./text_highlight_rules").TextHighlightRules,
        r = function(e) {
            var t = "[_:a-zA-ZÀ-￿][-_:.a-zA-Z0-9À-￿]*";
            this.$rules = { start: [{ token: "string.cdata.xml", regex: "<\\!\\[CDATA\\[", next: "cdata" }, { token: ["punctuation.instruction.xml", "keyword.instruction.xml"], regex: "(<\\?)(" + t + ")", next: "processing_instruction" }, { token: "comment.start.xml", regex: "<\\!--", next: "comment" }, { token: ["xml-pe.doctype.xml", "xml-pe.doctype.xml"], regex: "(<\\!)(DOCTYPE)(?=[\\s])", next: "doctype", caseInsensitive: !0 }, { include: "tag" }, { token: "text.end-tag-open.xml", regex: "</" }, { token: "text.tag-open.xml", regex: "<" }, { include: "reference" }, { defaultToken: "text.xml" }], processing_instruction: [{ token: "entity.other.attribute-name.decl-attribute-name.xml", regex: t }, { token: "keyword.operator.decl-attribute-equals.xml", regex: "=" }, { include: "whitespace" }, { include: "string" }, { token: "punctuation.xml-decl.xml", regex: "\\?>", next: "start" }], doctype: [{ include: "whitespace" }, { include: "string" }, { token: "xml-pe.doctype.xml", regex: ">", next: "start" }, { token: "xml-pe.xml", regex: "[-_a-zA-Z0-9:]+" }, { token: "punctuation.int-subset", regex: "\\[", push: "int_subset" }], int_subset: [{ token: "text.xml", regex: "\\s+" }, { token: "punctuation.int-subset.xml", regex: "]", next: "pop" }, { token: ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"], regex: "(<\\!)(" + t + ")", push: [{ token: "text", regex: "\\s+" }, { token: "punctuation.markup-decl.xml", regex: ">", next: "pop" }, { include: "string" }] }], cdata: [{ token: "string.cdata.xml", regex: "\\]\\]>", next: "start" }, { token: "text.xml", regex: "\\s+" }, { token: "text.xml", regex: "(?:[^\\]]|\\](?!\\]>))+" }], comment: [{ token: "comment.end.xml", regex: "--\x3e", next: "start" }, { defaultToken: "comment.xml" }], reference: [{ token: "constant.language.escape.reference.xml", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" }], attr_reference: [{ token: "constant.language.escape.reference.attribute-value.xml", regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)" }], tag: [{ token: ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"], regex: "(?:(<)|(</))((?:" + t + ":)?" + t + ")", next: [{ include: "attributes" }, { token: "meta.tag.punctuation.tag-close.xml", regex: "/?>", next: "start" }] }], tag_whitespace: [{ token: "text.tag-whitespace.xml", regex: "\\s+" }], whitespace: [{ token: "text.whitespace.xml", regex: "\\s+" }], string: [{ token: "string.xml", regex: "'", push: [{ token: "string.xml", regex: "'", next: "pop" }, { defaultToken: "string.xml" }] }, { token: "string.xml", regex: '"', push: [{ token: "string.xml", regex: '"', next: "pop" }, { defaultToken: "string.xml" }] }], attributes: [{ token: "entity.other.attribute-name.xml", regex: t }, { token: "keyword.operator.attribute-equals.xml", regex: "=" }, { include: "tag_whitespace" }, { include: "attribute_value" }], attribute_value: [{ token: "string.attribute-value.xml", regex: "'", push: [{ token: "string.attribute-value.xml", regex: "'", next: "pop" }, { include: "attr_reference" }, { defaultToken: "string.attribute-value.xml" }] }, { token: "string.attribute-value.xml", regex: '"', push: [{ token: "string.attribute-value.xml", regex: '"', next: "pop" }, { include: "attr_reference" }, { defaultToken: "string.attribute-value.xml" }] }] }, this.constructor === r && this.normalizeRules()
        };
    (function() { this.embedTagRules = function(e, t, n) { this.$rules.tag.unshift({ token: ["meta.tag.punctuation.tag-open.xml", "meta.tag." + n + ".tag-name.xml"], regex: "(<)(" + n + "(?=\\s|>|$))", next: [{ include: "attributes" }, { token: "meta.tag.punctuation.tag-close.xml", regex: "/?>", next: t + "start" }] }), this.$rules[n + "-end"] = [{ include: "attributes" }, { token: "meta.tag.punctuation.tag-close.xml", regex: "/?>", next: "start", onMatch: function(e, t, n) { return n.splice(0), this.token } }], this.embedRules(e, t, [{ token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + n + ".tag-name.xml"], regex: "(</)(" + n + "(?=\\s|>|$))", next: n + "-end" }, { token: "string.cdata.xml", regex: "<\\!\\[CDATA\\[" }, { token: "string.cdata.xml", regex: "\\]\\]>" }]) } }).call(o.prototype), i.inherits(r, o), t.XmlHighlightRules = r
}), ace.define("ace/mode/html_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/css_highlight_rules", "ace/mode/javascript_highlight_rules", "ace/mode/xml_highlight_rules"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("../lib/lang"),
        r = e("./css_highlight_rules").CssHighlightRules,
        s = e("./javascript_highlight_rules").JavaScriptHighlightRules,
        a = e("./xml_highlight_rules").XmlHighlightRules,
        l = o.createMap({ a: "anchor", button: "form", form: "form", img: "image", input: "form", label: "form", option: "form", script: "script", select: "form", textarea: "form", style: "style", table: "table", tbody: "table", td: "table", tfoot: "table", th: "table", tr: "table" }),
        c = function() { a.call(this), this.addRules({ attributes: [{ include: "tag_whitespace" }, { token: "entity.other.attribute-name.xml", regex: "[-_a-zA-Z0-9:.]+" }, { token: "keyword.operator.attribute-equals.xml", regex: "=", push: [{ include: "tag_whitespace" }, { token: "string.unquoted.attribute-value.html", regex: "[^<>='\"`\\s]+", next: "pop" }, { token: "empty", regex: "", next: "pop" }] }, { include: "attribute_value" }], tag: [{ token: function(e, t) { var n = l[t]; return ["meta.tag.punctuation." + ("<" == e ? "" : "end-") + "tag-open.xml", "meta.tag" + (n ? "." + n : "") + ".tag-name.xml"] }, regex: "(</?)([-_a-zA-Z0-9:.]+)", next: "tag_stuff" }], tag_stuff: [{ include: "attributes" }, { token: "meta.tag.punctuation.tag-close.xml", regex: "/?>", next: "start" }] }), this.embedTagRules(r, "css-", "style"), this.embedTagRules(new s({ jsx: !1 }).getRules(), "js-", "script"), this.constructor === c && this.normalizeRules() };
    i.inherits(c, a), t.HtmlHighlightRules = c
}), ace.define("ace/mode/behaviour/xml", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t, n) {
    "use strict";

    function i(e, t) { return e && e.type.lastIndexOf(t + ".xml") > -1 }
    var o = e("../../lib/oop"),
        r = e("../behaviour").Behaviour,
        s = e("../../token_iterator").TokenIterator,
        a = (e("../../lib/lang"), function() {
            this.add("string_dquotes", "insertion", function(e, t, n, o, r) {
                if ('"' == r || "'" == r) {
                    var a = r,
                        l = o.doc.getTextRange(n.getSelectionRange());
                    if ("" !== l && "'" !== l && '"' != l && n.getWrapBehavioursEnabled()) return { text: a + l + a, selection: !1 };
                    var c = n.getCursorPosition(),
                        h = o.doc.getLine(c.row).substring(c.column, c.column + 1),
                        u = new s(o, c.row, c.column),
                        d = u.getCurrentToken();
                    if (h == a && (i(d, "attribute-value") || i(d, "string"))) return { text: "", selection: [1, 1] };
                    if (d || (d = u.stepBackward()), !d) return;
                    for (; i(d, "tag-whitespace") || i(d, "whitespace");) d = u.stepBackward();
                    var g = !h || h.match(/\s/);
                    if (i(d, "attribute-equals") && (g || ">" == h) || i(d, "decl-attribute-equals") && (g || "?" == h)) return { text: a + a, selection: [1, 1] }
                }
            }), this.add("string_dquotes", "deletion", function(e, t, n, i, o) { var r = i.doc.getTextRange(o); if (!o.isMultiLine() && ('"' == r || "'" == r) && i.doc.getLine(o.start.row).substring(o.start.column + 1, o.start.column + 2) == r) return o.end.column++, o }), this.add("autoclosing", "insertion", function(e, t, n, o, r) {
                if (">" == r) {
                    var a = n.getSelectionRange().start,
                        l = new s(o, a.row, a.column),
                        c = l.getCurrentToken() || l.stepBackward();
                    if (!c || !(i(c, "tag-name") || i(c, "tag-whitespace") || i(c, "attribute-name") || i(c, "attribute-equals") || i(c, "attribute-value"))) return;
                    if (i(c, "reference.attribute-value")) return;
                    if (i(c, "attribute-value")) {
                        var h = l.getCurrentTokenColumn() + c.value.length;
                        if (a.column < h) return;
                        if (a.column == h) {
                            var u = l.stepForward();
                            if (u && i(u, "attribute-value")) return;
                            l.stepBackward()
                        }
                    }
                    if (/^\s*>/.test(o.getLine(a.row).slice(a.column))) return;
                    for (; !i(c, "tag-name");)
                        if ("<" == (c = l.stepBackward()).value) { c = l.stepForward(); break }
                    var d = l.getCurrentTokenRow(),
                        g = l.getCurrentTokenColumn();
                    if (i(l.stepBackward(), "end-tag-open")) return;
                    var f = c.value;
                    if (d == a.row && (f = f.substring(0, a.column - g)), this.voidElements.hasOwnProperty(f.toLowerCase())) return;
                    return { text: "></" + f + ">", selection: [1, 1] }
                }
            }), this.add("autoindent", "insertion", function(e, t, n, i, o) {
                if ("\n" == o) {
                    var r = n.getCursorPosition(),
                        a = i.getLine(r.row),
                        l = new s(i, r.row, r.column),
                        c = l.getCurrentToken();
                    if (c && -1 !== c.type.indexOf("tag-close")) {
                        if ("/>" == c.value) return;
                        for (; c && -1 === c.type.indexOf("tag-name");) c = l.stepBackward();
                        if (!c) return;
                        var h = c.value,
                            u = l.getCurrentTokenRow();
                        if (!(c = l.stepBackward()) || -1 !== c.type.indexOf("end-tag")) return;
                        if (this.voidElements && !this.voidElements[h]) {
                            var d = i.getTokenAt(r.row, r.column + 1),
                                g = (a = i.getLine(u), this.$getIndent(a)),
                                f = g + i.getTabString();
                            return d && "</" === d.value ? { text: "\n" + f + "\n" + g, selection: [1, f.length, 1, f.length] } : { text: "\n" + f }
                        }
                    }
                }
            })
        });
    o.inherits(a, r), t.XmlBehaviour = a
}), ace.define("ace/mode/folding/mixed", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function(e, t, n) {
    "use strict";
    var i = e("../../lib/oop"),
        o = e("./fold_mode").FoldMode,
        r = t.FoldMode = function(e, t) { this.defaultMode = e, this.subModes = t };
    i.inherits(r, o),
        function() {
            this.$getMode = function(e) {
                for (var t in "string" != typeof e && (e = e[0]), this.subModes)
                    if (0 === e.indexOf(t)) return this.subModes[t];
                return null
            }, this.$tryMode = function(e, t, n, i) { var o = this.$getMode(e); return o ? o.getFoldWidget(t, n, i) : "" }, this.getFoldWidget = function(e, t, n) { return this.$tryMode(e.getState(n - 1), e, t, n) || this.$tryMode(e.getState(n), e, t, n) || this.defaultMode.getFoldWidget(e, t, n) }, this.getFoldWidgetRange = function(e, t, n) { var i = this.$getMode(e.getState(n - 1)); return i && i.getFoldWidget(e, t, n) || (i = this.$getMode(e.getState(n))), i && i.getFoldWidget(e, t, n) || (i = this.defaultMode), i.getFoldWidgetRange(e, t, n) }
        }.call(r.prototype)
}), ace.define("ace/mode/folding/xml", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/range", "ace/mode/folding/fold_mode", "ace/token_iterator"], function(e, t, n) {
    "use strict";

    function i(e, t) { return e.type.lastIndexOf(t + ".xml") > -1 }
    var o = e("../../lib/oop"),
        r = (e("../../lib/lang"), e("../../range").Range),
        s = e("./fold_mode").FoldMode,
        a = e("../../token_iterator").TokenIterator,
        l = t.FoldMode = function(e, t) { s.call(this), this.voidElements = e || {}, this.optionalEndTags = o.mixin({}, this.voidElements), t && o.mixin(this.optionalEndTags, t) };
    o.inherits(l, s);
    var c = function() { this.tagName = "", this.closing = !1, this.selfClosing = !1, this.start = { row: 0, column: 0 }, this.end = { row: 0, column: 0 } };
    (function() {
        this.getFoldWidget = function(e, t, n) { var i = this._getFirstTagInLine(e, n); return i ? i.closing || !i.tagName && i.selfClosing ? "markbeginend" == t ? "end" : "" : !i.tagName || i.selfClosing || this.voidElements.hasOwnProperty(i.tagName.toLowerCase()) ? "" : this._findEndTagInLine(e, n, i.tagName, i.end.column) ? "" : "start" : this.getCommentFoldWidget(e, n) }, this.getCommentFoldWidget = function(e, t) { return /comment/.test(e.getState(t)) && /<!-/.test(e.getLine(t)) ? "start" : "" }, this._getFirstTagInLine = function(e, t) {
            for (var n = e.getTokens(t), o = new c, r = 0; r < n.length; r++) {
                var s = n[r];
                if (i(s, "tag-open")) {
                    if (o.end.column = o.start.column + s.value.length, o.closing = i(s, "end-tag-open"), !(s = n[++r])) return null;
                    for (o.tagName = s.value, o.end.column += s.value.length, r++; r < n.length; r++)
                        if (s = n[r], o.end.column += s.value.length, i(s, "tag-close")) { o.selfClosing = "/>" == s.value; break }
                    return o
                }
                if (i(s, "tag-close")) return o.selfClosing = "/>" == s.value, o;
                o.start.column += s.value.length
            }
            return null
        }, this._findEndTagInLine = function(e, t, n, o) { for (var r = e.getTokens(t), s = 0, a = 0; a < r.length; a++) { var l = r[a]; if (!((s += l.value.length) < o) && i(l, "end-tag-open") && (l = r[a + 1]) && l.value == n) return !0 } return !1 }, this._readTagForward = function(e) {
            var t = e.getCurrentToken();
            if (!t) return null;
            var n = new c;
            do {
                if (i(t, "tag-open")) n.closing = i(t, "end-tag-open"), n.start.row = e.getCurrentTokenRow(), n.start.column = e.getCurrentTokenColumn();
                else if (i(t, "tag-name")) n.tagName = t.value;
                else if (i(t, "tag-close")) return n.selfClosing = "/>" == t.value, n.end.row = e.getCurrentTokenRow(), n.end.column = e.getCurrentTokenColumn() + t.value.length, e.stepForward(), n
            } while (t = e.stepForward());
            return null
        }, this._readTagBackward = function(e) {
            var t = e.getCurrentToken();
            if (!t) return null;
            var n = new c;
            do {
                if (i(t, "tag-open")) return n.closing = i(t, "end-tag-open"), n.start.row = e.getCurrentTokenRow(), n.start.column = e.getCurrentTokenColumn(), e.stepBackward(), n;
                i(t, "tag-name") ? n.tagName = t.value : i(t, "tag-close") && (n.selfClosing = "/>" == t.value, n.end.row = e.getCurrentTokenRow(), n.end.column = e.getCurrentTokenColumn() + t.value.length)
            } while (t = e.stepBackward());
            return null
        }, this._pop = function(e, t) {
            for (; e.length;) {
                var n = e[e.length - 1];
                if (!t || n.tagName == t.tagName) return e.pop();
                if (!this.optionalEndTags.hasOwnProperty(n.tagName)) return null;
                e.pop()
            }
        }, this.getFoldWidgetRange = function(e, t, n) {
            var i = this._getFirstTagInLine(e, n);
            if (!i) return this.getCommentFoldWidget(e, n) && e.getCommentFoldRange(n, e.getLine(n).length);
            var o, s = [];
            if (i.closing || i.selfClosing) {
                c = new a(e, n, i.end.column);
                for (var l = { row: n, column: i.start.column }; o = this._readTagBackward(c);)
                    if (o.selfClosing) { if (!s.length) return o.start.column += o.tagName.length + 2, o.end.column -= 2, r.fromPoints(o.start, o.end) } else if (o.closing) s.push(o);
                else if (this._pop(s, o), 0 == s.length) return o.start.column += o.tagName.length + 2, o.start.row == o.end.row && o.start.column < o.end.column && (o.start.column = o.end.column), r.fromPoints(o.start, l)
            } else {
                var c = new a(e, n, i.start.column),
                    h = { row: n, column: i.start.column + i.tagName.length + 2 };
                for (i.start.row == i.end.row && (h.column = i.end.column); o = this._readTagForward(c);)
                    if (o.selfClosing) { if (!s.length) return o.start.column += o.tagName.length + 2, o.end.column -= 2, r.fromPoints(o.start, o.end) } else if (o.closing) { if (this._pop(s, o), 0 == s.length) return r.fromPoints(h, o.start) } else s.push(o)
            }
        }
    }).call(l.prototype)
}), ace.define("ace/mode/folding/html", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/mixed", "ace/mode/folding/xml", "ace/mode/folding/cstyle"], function(e, t, n) {
    "use strict";
    var i = e("../../lib/oop"),
        o = e("./mixed").FoldMode,
        r = e("./xml").FoldMode,
        s = e("./cstyle").FoldMode,
        a = t.FoldMode = function(e, t) { o.call(this, new r(e, t), { "js-": new s, "css-": new s }) };
    i.inherits(a, o)
}), ace.define("ace/mode/html_completions", ["require", "exports", "module", "ace/token_iterator"], function(e, t, n) {
    "use strict";

    function i(e, t) { return e.type.lastIndexOf(t + ".xml") > -1 }

    function o(e, t) { for (var n = new r(e, t.row, t.column), o = n.getCurrentToken(); o && !i(o, "tag-name");) o = n.stepBackward(); if (o) return o.value }
    var r = e("../token_iterator").TokenIterator,
        s = ["accesskey", "class", "contenteditable", "contextmenu", "dir", "draggable", "dropzone", "hidden", "id", "inert", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "spellcheck", "style", "tabindex", "title", "translate"].concat(["onabort", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "onvolumechange", "onwaiting"]),
        a = { a: { href: 1, target: { _blank: 1, top: 1 }, ping: 1, rel: { nofollow: 1, alternate: 1, author: 1, bookmark: 1, help: 1, license: 1, next: 1, noreferrer: 1, prefetch: 1, prev: 1, search: 1, tag: 1 }, media: 1, hreflang: 1, type: 1 }, abbr: {}, address: {}, area: { shape: 1, coords: 1, href: 1, hreflang: 1, alt: 1, target: 1, media: 1, rel: 1, ping: 1, type: 1 }, article: { pubdate: 1 }, aside: {}, audio: { src: 1, autobuffer: 1, autoplay: { autoplay: 1 }, loop: { loop: 1 }, controls: { controls: 1 }, muted: { muted: 1 }, preload: { auto: 1, metadata: 1, none: 1 } }, b: {}, base: { href: 1, target: 1 }, bdi: {}, bdo: {}, blockquote: { cite: 1 }, body: { onafterprint: 1, onbeforeprint: 1, onbeforeunload: 1, onhashchange: 1, onmessage: 1, onoffline: 1, onpopstate: 1, onredo: 1, onresize: 1, onstorage: 1, onundo: 1, onunload: 1 }, br: {}, button: { autofocus: 1, disabled: { disabled: 1 }, form: 1, formaction: 1, formenctype: 1, formmethod: 1, formnovalidate: 1, formtarget: 1, name: 1, value: 1, type: { button: 1, submit: 1 } }, canvas: { width: 1, height: 1 }, caption: {}, cite: {}, code: {}, col: { span: 1 }, colgroup: { span: 1 }, command: { type: 1, label: 1, icon: 1, disabled: 1, checked: 1, radiogroup: 1, command: 1 }, data: {}, datalist: {}, dd: {}, del: { cite: 1, datetime: 1 }, details: { open: 1 }, dfn: {}, dialog: { open: 1 }, div: {}, dl: {}, dt: {}, em: {}, embed: { src: 1, height: 1, width: 1, type: 1 }, fieldset: { disabled: 1, form: 1, name: 1 }, figcaption: {}, figure: {}, footer: {}, form: { "accept-charset": 1, action: 1, autocomplete: 1, enctype: { "multipart/form-data": 1, "application/x-www-form-urlencoded": 1 }, method: { get: 1, post: 1 }, name: 1, novalidate: 1, target: { _blank: 1, top: 1 } }, h1: {}, h2: {}, h3: {}, h4: {}, h5: {}, h6: {}, head: {}, header: {}, hr: {}, html: { manifest: 1 }, i: {}, iframe: { name: 1, src: 1, height: 1, width: 1, sandbox: { "allow-same-origin": 1, "allow-top-navigation": 1, "allow-forms": 1, "allow-scripts": 1 }, seamless: { seamless: 1 } }, img: { alt: 1, src: 1, height: 1, width: 1, usemap: 1, ismap: 1 }, input: { type: { text: 1, password: 1, hidden: 1, checkbox: 1, submit: 1, radio: 1, file: 1, button: 1, reset: 1, image: 31, color: 1, date: 1, datetime: 1, "datetime-local": 1, email: 1, month: 1, number: 1, range: 1, search: 1, tel: 1, time: 1, url: 1, week: 1 }, accept: 1, alt: 1, autocomplete: { on: 1, off: 1 }, autofocus: { autofocus: 1 }, checked: { checked: 1 }, disabled: { disabled: 1 }, form: 1, formaction: 1, formenctype: { "application/x-www-form-urlencoded": 1, "multipart/form-data": 1, "text/plain": 1 }, formmethod: { get: 1, post: 1 }, formnovalidate: { formnovalidate: 1 }, formtarget: { _blank: 1, _self: 1, _parent: 1, _top: 1 }, height: 1, list: 1, max: 1, maxlength: 1, min: 1, multiple: { multiple: 1 }, name: 1, pattern: 1, placeholder: 1, readonly: { readonly: 1 }, required: { required: 1 }, size: 1, src: 1, step: 1, width: 1, files: 1, value: 1 }, ins: { cite: 1, datetime: 1 }, kbd: {}, keygen: { autofocus: 1, challenge: { challenge: 1 }, disabled: { disabled: 1 }, form: 1, keytype: { rsa: 1, dsa: 1, ec: 1 }, name: 1 }, label: { form: 1, for: 1 }, legend: {}, li: { value: 1 }, link: { href: 1, hreflang: 1, rel: { stylesheet: 1, icon: 1 }, media: { all: 1, screen: 1, print: 1 }, type: { "text/css": 1, "image/png": 1, "image/jpeg": 1, "image/gif": 1 }, sizes: 1 }, main: {}, map: { name: 1 }, mark: {}, math: {}, menu: { type: 1, label: 1 }, meta: { "http-equiv": { "content-type": 1 }, name: { description: 1, keywords: 1 }, content: { "text/html; charset=UTF-8": 1 }, charset: 1 }, meter: { value: 1, min: 1, max: 1, low: 1, high: 1, optimum: 1 }, nav: {}, noscript: { href: 1 }, object: { param: 1, data: 1, type: 1, height: 1, width: 1, usemap: 1, name: 1, form: 1, classid: 1 }, ol: { start: 1, reversed: 1 }, optgroup: { disabled: 1, label: 1 }, option: { disabled: 1, selected: 1, label: 1, value: 1 }, output: { for: 1, form: 1, name: 1 }, p: {}, param: { name: 1, value: 1 }, pre: {}, progress: { value: 1, max: 1 }, q: { cite: 1 }, rp: {}, rt: {}, ruby: {}, s: {}, samp: {}, script: { charset: 1, type: { "text/javascript": 1 }, src: 1, defer: 1, async: 1 }, select: { autofocus: 1, disabled: 1, form: 1, multiple: { multiple: 1 }, name: 1, size: 1, readonly: { readonly: 1 } }, small: {}, source: { src: 1, type: 1, media: 1 }, span: {}, strong: {}, style: { type: 1, media: { all: 1, screen: 1, print: 1 }, scoped: 1 }, sub: {}, sup: {}, svg: {}, table: { summary: 1 }, tbody: {}, td: { headers: 1, rowspan: 1, colspan: 1 }, textarea: { autofocus: { autofocus: 1 }, disabled: { disabled: 1 }, form: 1, maxlength: 1, name: 1, placeholder: 1, readonly: { readonly: 1 }, required: { required: 1 }, rows: 1, cols: 1, wrap: { on: 1, off: 1, hard: 1, soft: 1 } }, tfoot: {}, th: { headers: 1, rowspan: 1, colspan: 1, scope: 1 }, thead: {}, time: { datetime: 1 }, title: {}, tr: {}, track: { kind: 1, src: 1, srclang: 1, label: 1, default: 1 }, section: {}, summary: {}, u: {}, ul: {}, var: {}, video: { src: 1, autobuffer: 1, autoplay: { autoplay: 1 }, loop: { loop: 1 }, controls: { controls: 1 }, width: 1, height: 1, poster: 1, muted: { muted: 1 }, preload: { auto: 1, metadata: 1, none: 1 } }, wbr: {} },
        l = Object.keys(a),
        c = function() {};
    (function() {
        this.getCompletions = function(e, t, n, o) { var r = t.getTokenAt(n.row, n.column); if (!r) return []; if (i(r, "tag-name") || i(r, "tag-open") || i(r, "end-tag-open")) return this.getTagCompletions(e, t, n, o); if (i(r, "tag-whitespace") || i(r, "attribute-name")) return this.getAttributeCompletions(e, t, n, o); if (i(r, "attribute-value")) return this.getAttributeValueCompletions(e, t, n, o); var s = t.getLine(n.row).substr(0, n.column); return /&[a-z]*$/i.test(s) ? this.getHTMLEntityCompletions(e, t, n, o) : [] }, this.getTagCompletions = function(e, t, n, i) { return l.map(function(e) { return { value: e, meta: "tag", score: 1e6 } }) }, this.getAttributeCompletions = function(e, t, n, i) { var r = o(t, n); if (!r) return []; var l = s; return r in a && (l = l.concat(Object.keys(a[r]))), l.map(function(e) { return { caption: e, snippet: e + '="$0"', meta: "attribute", score: 1e6 } }) }, this.getAttributeValueCompletions = function(e, t, n, s) {
            var l = o(t, n),
                c = function(e, t) { for (var n = new r(e, t.row, t.column), o = n.getCurrentToken(); o && !i(o, "attribute-name");) o = n.stepBackward(); if (o) return o.value }(t, n);
            if (!l) return [];
            var h = [];
            return l in a && c in a[l] && "object" == typeof a[l][c] && (h = Object.keys(a[l][c])), h.map(function(e) { return { caption: e, snippet: e, meta: "attribute value", score: 1e6 } })
        }, this.getHTMLEntityCompletions = function(e, t, n, i) { return ["Aacute;", "aacute;", "Acirc;", "acirc;", "acute;", "AElig;", "aelig;", "Agrave;", "agrave;", "alefsym;", "Alpha;", "alpha;", "amp;", "and;", "ang;", "Aring;", "aring;", "asymp;", "Atilde;", "atilde;", "Auml;", "auml;", "bdquo;", "Beta;", "beta;", "brvbar;", "bull;", "cap;", "Ccedil;", "ccedil;", "cedil;", "cent;", "Chi;", "chi;", "circ;", "clubs;", "cong;", "copy;", "crarr;", "cup;", "curren;", "Dagger;", "dagger;", "dArr;", "darr;", "deg;", "Delta;", "delta;", "diams;", "divide;", "Eacute;", "eacute;", "Ecirc;", "ecirc;", "Egrave;", "egrave;", "empty;", "emsp;", "ensp;", "Epsilon;", "epsilon;", "equiv;", "Eta;", "eta;", "ETH;", "eth;", "Euml;", "euml;", "euro;", "exist;", "fnof;", "forall;", "frac12;", "frac14;", "frac34;", "frasl;", "Gamma;", "gamma;", "ge;", "gt;", "hArr;", "harr;", "hearts;", "hellip;", "Iacute;", "iacute;", "Icirc;", "icirc;", "iexcl;", "Igrave;", "igrave;", "image;", "infin;", "int;", "Iota;", "iota;", "iquest;", "isin;", "Iuml;", "iuml;", "Kappa;", "kappa;", "Lambda;", "lambda;", "lang;", "laquo;", "lArr;", "larr;", "lceil;", "ldquo;", "le;", "lfloor;", "lowast;", "loz;", "lrm;", "lsaquo;", "lsquo;", "lt;", "macr;", "mdash;", "micro;", "middot;", "minus;", "Mu;", "mu;", "nabla;", "nbsp;", "ndash;", "ne;", "ni;", "not;", "notin;", "nsub;", "Ntilde;", "ntilde;", "Nu;", "nu;", "Oacute;", "oacute;", "Ocirc;", "ocirc;", "OElig;", "oelig;", "Ograve;", "ograve;", "oline;", "Omega;", "omega;", "Omicron;", "omicron;", "oplus;", "or;", "ordf;", "ordm;", "Oslash;", "oslash;", "Otilde;", "otilde;", "otimes;", "Ouml;", "ouml;", "para;", "part;", "permil;", "perp;", "Phi;", "phi;", "Pi;", "pi;", "piv;", "plusmn;", "pound;", "Prime;", "prime;", "prod;", "prop;", "Psi;", "psi;", "quot;", "radic;", "rang;", "raquo;", "rArr;", "rarr;", "rceil;", "rdquo;", "real;", "reg;", "rfloor;", "Rho;", "rho;", "rlm;", "rsaquo;", "rsquo;", "sbquo;", "Scaron;", "scaron;", "sdot;", "sect;", "shy;", "Sigma;", "sigma;", "sigmaf;", "sim;", "spades;", "sub;", "sube;", "sum;", "sup;", "sup1;", "sup2;", "sup3;", "supe;", "szlig;", "Tau;", "tau;", "there4;", "Theta;", "theta;", "thetasym;", "thinsp;", "THORN;", "thorn;", "tilde;", "times;", "trade;", "Uacute;", "uacute;", "uArr;", "uarr;", "Ucirc;", "ucirc;", "Ugrave;", "ugrave;", "uml;", "upsih;", "Upsilon;", "upsilon;", "Uuml;", "uuml;", "weierp;", "Xi;", "xi;", "Yacute;", "yacute;", "yen;", "Yuml;", "yuml;", "Zeta;", "zeta;", "zwj;", "zwnj;"].map(function(e) { return { caption: e, snippet: e, meta: "html entity", score: 1e6 } }) }
    }).call(c.prototype), t.HtmlCompletions = c
}), ace.define("ace/mode/html", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text", "ace/mode/javascript", "ace/mode/css", "ace/mode/html_highlight_rules", "ace/mode/behaviour/xml", "ace/mode/folding/html", "ace/mode/html_completions", "ace/worker/worker_client"], function(e, t, n) {
    "use strict";
    var i = e("../lib/oop"),
        o = e("../lib/lang"),
        r = e("./text").Mode,
        s = e("./javascript").Mode,
        a = e("./css").Mode,
        l = e("./html_highlight_rules").HtmlHighlightRules,
        c = e("./behaviour/xml").XmlBehaviour,
        h = e("./folding/html").FoldMode,
        u = e("./html_completions").HtmlCompletions,
        d = e("../worker/worker_client").WorkerClient,
        g = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "menuitem", "param", "source", "track", "wbr"],
        f = ["li", "dt", "dd", "p", "rt", "rp", "optgroup", "option", "colgroup", "td", "th"],
        p = function(e) { this.fragmentContext = e && e.fragmentContext, this.HighlightRules = l, this.$behaviour = new c, this.$completer = new u, this.createModeDelegates({ "js-": s, "css-": a }), this.foldingRules = new h(this.voidElements, o.arrayToMap(f)) };
    i.inherits(p, r),
        function() { this.blockComment = { start: "\x3c!--", end: "--\x3e" }, this.voidElements = o.arrayToMap(g), this.getNextLineIndent = function(e, t, n) { return this.$getIndent(t) }, this.checkOutdent = function(e, t, n) { return !1 }, this.getCompletions = function(e, t, n, i) { return this.$completer.getCompletions(e, t, n, i) }, this.createWorker = function(e) { if (this.constructor == p) { var t = new d(["ace"], "ace/mode/html_worker", "Worker"); return t.attachToDocument(e.getDocument()), this.fragmentContext && t.call("setOptions", [{ context: this.fragmentContext }]), t.on("error", function(t) { e.setAnnotations(t.data) }), t.on("terminate", function() { e.clearAnnotations() }), t } }, this.$id = "ace/mode/html" }.call(p.prototype), t.Mode = p
}), ace.require(["ace/mode/html"], function(e) { "object" == typeof module && "object" == typeof exports && module && (module.exports = e) });
var aceSui = void ace.require(["ace/theme/sui"], function(e) { "object" == typeof module && "object" == typeof exports && module && (module.exports = e) });
ace.define("ace/theme/sui", [], function(e, t, n) {
    var i = e("../lib/dom");
    t.isDark = !1, t.cssClass = "ace-sui", t.cssText = '.ace-sui {font-family: "Source Code Pro", "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;line-height: 18px;}.ace-sui .ace_editor {border: 2px solid rgb(159, 159, 159);}.ace-sui .ace_editor.ace_focus {border: 2px solid #327FBD;}.ace-sui .ace_gutter {width: 30px;background: #666666;color: #FFFFFF;overflow: hidden;}.ace-sui .ace_gutter-layer {width: 100%;text-align: right;}.ace-sui .ace_gutter-layer .ace_gutter-cell {width: 30px;padding-right: 9px;padding-left: 3px;text-align: right;}.ace-sui .ace_print_margin {width: 1px;background: #E8E8E8;}.ace-sui .ace_scroller {background-color: #F2F2F2;}.ace-sui .ace_text-layer {cursor: text;color: #666666;}.ace-sui .ace_cursor {border-left: 2px solid #000000;}.ace-sui .ace_cursor.ace_overwrite {border-left: 0;border-bottom: 1px solid #000000;}.ace-sui .ace_marker-layer .ace_selection {background: rgba(130, 139, 201, 0.5);}.ace-sui .ace_marker-layer .ace_step {background: rgb(198, 219, 174);}.ace-sui .ace_marker-layer .ace_bracket {margin: 0;border: 1px solid rgba(147, 161, 161, 0.50);}.ace-sui .ace_marker-layer .ace_active_line {background: #EEE8D5;}.ace-sui .ace_invisible {color: rgba(147, 161, 161, 0.50);}.ace-sui .ace_keyword {color: #859900;}.ace-sui .ace_keyword.ace_operator {}.ace-sui .ace_constant {}.ace-sui .ace_constant.ace_language {color: #B58900;}.ace-sui .ace_constant.ace_library {}.ace-sui .ace_constant.ace_numeric {color: #D33682;}.ace-sui .ace_invalid {}.ace-sui .ace_invalid.ace_illegal {}.ace-sui .ace_invalid.ace_deprecated {}.ace-sui .ace_support {}.ace-sui .ace_support.ace_function {color: #268BD2;}.ace-sui .ace_function.ace_buildin {}.ace-sui .ace_string {color: #2AA198;}.ace-sui .ace_string.ace_regexp {color: #D30102;}.ace-sui .ace_comment {color: #93A1A1;}.ace-sui .ace_comment.ace_doc {}.ace-sui .ace_comment.ace_doc.ace_tag {}.ace-sui .ace_variable {}.ace-sui .ace_variable.ace_language {color: #268BD2;}.ace-sui .ace_xml_pe {}.ace-sui .ace_collab.ace_user1 {}', i.importCssString(t.cssText, t.cssClass)
});