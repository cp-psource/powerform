! function(t, i, a, n) { "use strict";

    function r(i, a) { this.element = i, this.$el = t(this.element), this.settings = t.extend({}, o, a), this._defaults = o, this._name = e, this.init() } var e = "powerformFrontValidate",
        o = { rules: {}, messages: {} };
    t.extend(r.prototype, { init: function() { var i = this;
            t(this.element).validate({ ignore: ":hidden:not(.do-validate)", errorPlacement: function(t, i) {}, onfocusout: function(i) {!1 === t(i).hasClass("hasDatepicker") && t(i).valid() }, highlight: function(i, a, n) { var r = this.errorMap[i.name],
                        e = t(i).closest(".powerform-field--inner");
                    0 === e.length && (e = t(i).closest(".powerform-field")); var o = e.find(".powerform-label--validation"); if (0 === o.length && (e.append('<label class="powerform-label--validation"></label>'), o = e.find(".powerform-label--validation")), t(i).attr("aria-invalid", "true"), o.html(r), e.addClass("powerform-has_error"), t(i).hasClass("powerform-input-time")) { var l = t(i).closest(".powerform-field:not(.powerform-field--inner)"),
                            s = l.children(".powerform-label--validation"),
                            d = "",
                            f = [];
                        0 === s.length && (l.append('<label class="powerform-label--validation"></label>'), s = l.children(".powerform-label--validation")), s.html(""), l.find(".powerform-input-time").each(function() { d = t(this).siblings(".powerform-label--validation"), 0 === d.length && (d = t(this).closest(".powerform-field").find(".powerform-label--validation")), f.push(d.html()) }), s.html(f[0] + (f[0].length > 0 ? " <br/> " : "") + f[1]) } }, unhighlight: function(i, a, n) { var r = t(i).closest(".powerform-field--inner");
                    0 === r.length && (r = t(i).closest(".powerform-field")); var e = r.find(".powerform-label--validation"); if (t(i).removeAttr("aria-invalid"), e.remove(), r.removeClass("powerform-has_error"), t(i).hasClass("powerform-input-time")) { var o = t(i).closest(".powerform-field:not(.powerform-field--inner)"),
                            l = o.children(".powerform-label--validation"),
                            s = 0,
                            d = "",
                            f = "";
                        o.find(".powerform-input-time").each(function() { "true" === t(this).attr("aria-invalid") && (f = t(this).siblings(".powerform-label--validation"), 0 === f.length && (f = t(this).closest(".powerform-field").find(".powerform-label--validation")), d = f.html(), s++) }), 0 === s ? l.remove() : l.html(d) } }, rules: i.settings.rules, messages: i.settings.messages }) } }), t.fn[e] = function(i) { return this.each(function() { t.data(this, e) || t.data(this, e, new r(this, i)) }) }, t.validator.addMethod("validurl", function(i, a) { var n = t.validator.methods.url.bind(this); return n(i, a) || n("http://" + i, a) }), t.validator.addMethod("powerformPhoneNational", function(i, a) { return this.optional(a) || t(a).intlTelInput("isValidNumber") }), t.validator.addMethod("powerformPhoneInternational", function(i, a) { return this.optional(a) || t(a).intlTelInput("isValidNumber") }), t.validator.addMethod("dateformat", function(t, i, a) { var n, r, e, o, l, s = !1,
            d = "yy-mm-dd" !== a ? /^\d{1,2}\/\d{1,2}\/\d{4}$/ : /^\d{4}-\d{1,2}-\d{1,2}$/; return d.test(t) ? ("dd/mm/yy" === a ? (n = t.split("/"), r = parseInt(n[0], 10), e = parseInt(n[1], 10), o = parseInt(n[2], 10)) : "mm/dd/yy" === a ? (n = t.split("/"), e = parseInt(n[0], 10), r = parseInt(n[1], 10), o = parseInt(n[2], 10)) : (n = t.split("-"), o = parseInt(n[0], 10), e = parseInt(n[1], 10), r = parseInt(n[2], 10)), l = new Date(Date.UTC(o, e - 1, r, 12, 0, 0, 0)), s = l.getUTCFullYear() === o && l.getUTCMonth() === e - 1 && l.getUTCDate() === r) : s = !1, this.optional(i) || s }), t.validator.addMethod("maxwords", function(t, i, a) { return this.optional(i) || jQuery.trim(t).split(/\s+/).length <= a }), t.validator.addMethod("trim", function(t, i, a) { return !0 === this.optional(i) || 0 !== t.trim().length }), t.validator.addMethod("emailWP", function(t, i, a) { if (this.optional(i)) return !0; if (t.trim().length < 6) return !1; if (t.indexOf("@", 1) < 0) return !1; var n = t.split("@", 2); if (!n[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) return !1; if (n[1].match(/\.{2,}/)) return !1; var r = n[1],
            e = r.split("."); if (e.length < 2) return !1; for (var o = e.length, l = 0; l < o; l++)
            if (!e[l].match(/^[a-z0-9-]+$/i)) return !1;
        return !0 }), t.validator.methods.number = function(t, i, a) { return this.optional(i) || /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/.test(t) } }(jQuery, window, document);