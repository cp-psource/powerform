! function(t, i, r, e) {
    "use strict";

    function n(i, r) { this.element = i, this.$el = t(this.element), this.settings = t.extend({}, o, r), this._defaults = o, this._name = s, this.frontInitCalled = !1, this.scriptsQue = [], this.frontOptions = null, this.init() }
    var s = "powerformLoader",
        o = { action: "", type: "", id: "", render_id: "", is_preview: "", preview_data: [], last_submit_data: {}, extra: {} };
    t.extend(n.prototype, {
        init: function() {
            var t = r.location.search.replace(/(^\?)/, "").split("&").map(function(t) { return t = t.split("="), this[t[0]] = t[1], this }.bind({}))[0];
            t.action = this.settings.action, t.type = this.settings.type, t.id = this.settings.id, t.render_id = this.settings.render_id, t.is_preview = this.settings.is_preview, t.preview_data = JSON.stringify(this.settings.preview_data), t.last_submit_data = this.settings.last_submit_data, t.extra = this.settings.extra, this.load_ajax(t)
        },
        load_ajax: function(e) {
            var n = this;
            t.ajax({
                type: "POST",
                url: i.PowerformFront.ajaxUrl,
                data: e,
                cache: !1,
                beforeSend: function() { t(r).trigger("before.load.powerform", e.id) },
                success: function(s) {
                    if (s.success) {
                        var o = s.data;
                        if (t(r).trigger("response.success.load.powerform", e.id, s), !o.is_ajax_load) return !1;
                        if (o.pagination_config && (i.Powerform_Cform_Paginations = i.Powerform_Cform_Paginations || [], i.Powerform_Cform_Paginations[e.id] = o.pagination_config), n.frontOptions = o.options || null, o.html) {
                            var a = o.style || null,
                                d = o.script || null;
                            n.render_html(o.html, a, d)
                        }
                        o.styles && n.maybe_append_styles(o.styles), o.scripts && n.maybe_append_scripts(o.scripts), !o.scripts && n.frontOptions && n.init_front()
                    } else t(r).trigger("response.error.load.powerform", e.id, s)
                },
                error: function() { t(r).trigger("request.error.load.powerform", e.id) }
            }).always(function() { t(r).trigger("after.load.powerform", e.id) })
        },
        render_html: function(i, r, e) {
            var n = this.settings.id,
                s = this.settings.render_id,
                o = "",
                a = null;
            a = this.$el.find(".powerform-cform-response-message"), a.length && (o = a.get(0).outerHTML), a = this.$el.find(".powerform-poll-response-message"), a.length && (o = a.get(0).outerHTML), this.$el.replaceWith(i), o && (t("#powerform-module-" + n + "[data-powerform-render=" + s + "] .powerform-cform-response-message").replaceWith(o), t("#powerform-module-" + n + "[data-powerform-render=" + s + "] .powerform-poll-response-message").replaceWith(o)), r && (t("style#powerform-module-" + n).length && t("style#powerform-module-" + n).remove(), t("body").append(r)), e && t("body").append(e)
        },
        maybe_append_styles: function(i) {
            for (var r in i)
                if (i.hasOwnProperty(r) && !t("link#" + r).length) {
                    var e = t("<link>");
                    e.attr("rel", "stylesheet"), e.attr("id", r), e.attr("type", "text/css"), e.attr("media", "all"), e.attr("href", i[r].src), t("head").append(e)
                }
        },
        maybe_append_scripts: function(r) {
            var e = [];
            for (var n in r)
                if (r.hasOwnProperty(n)) {
                    var s = r[n].on,
                        o = r[n].load;
                    if ("window" === s) { if (i[o]) continue } else if ("$" === s && t.fn[o]) continue;
                    var a = {};
                    a.src = r[n].src, e.push(a), this.scriptsQue.push(n)
                }
            if (!this.scriptsQue.length) return void this.init_front();
            for (var d in e) e.hasOwnProperty(d) && this.load_script(e[d])
        },
        load_script: function(t) {
            var i = this,
                e = r.createElement("script"),
                n = r.getElementsByTagName("body")[0];
            e.type = "text/javascript", e.src = t.src, e.async = !0, e.defer = !0, e.onload = function() { i.script_on_load() }, n.appendChild(e)
        },
        script_on_load: function() { this.scriptsQue.pop(), this.scriptsQue.length || this.init_front() },
        init_front: function() {
            if (!this.frontInitCalled) {
                this.frontInitCalled = !0;
                var i = this.settings.id,
                    r = this.settings.render_id,
                    e = this.frontOptions || null;
                e && t("#powerform-module-" + i + "[data-powerform-render=" + r + "]").powerformFront(e), this.init_window_vars()
            }
        },
        init_window_vars: function() {
            if ("undefined" != typeof PowerformValidationErrors) {
                var t = jQuery(PowerformValidationErrors.selector).data("powerformFrontSubmit");
                void 0 !== t && t.show_messages(PowerformValidationErrors.errors)
            }
            if ("undefined" != typeof PowerformFormHider) {
                var i = jQuery(PowerformFormHider.selector).data("powerformFront");
                void 0 !== i && i.hide()
            }
        }
    }), t.fn[s] = function(i) { return this.each(function() { t.data(this, s) || t.data(this, s, new n(this, i)) }) }
}(jQuery, window, document);