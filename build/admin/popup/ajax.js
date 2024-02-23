! function(a) {
    formintorjs.define(["text!tpl/dashboard.html"], function(t) {
        return Backbone.View.extend({
            className: "sui-box-body",
            events: { "click .wpmudev-action-done": "save", "click .wpmudev-action-ajax-done": "ajax_save", "click .wpmudev-button-clear-exports": "clear_exports", "click .powerform-radio--field": "show_poll_custom_input" },
            initialize: function(a) { return a = _.extend({ action: "", nonce: "", data: "", id: "", enable_loader: !0 }, a), this.action = a.action, this.nonce = a.nonce, this.data = a.data, this.id = a.id, this.enable_loader = a.enable_loader, this.render() },
            render: function() {
                var t = this,
                    e = {};
                if (e.action = "powerform_load_" + this.action + "_popup", e._ajax_nonce = this.nonce, e.data = this.data, this.id && (e.id = this.id), this.enable_loader) { var o = ""; "sui-box-body" !== this.className && (o += '<div class="sui-box-body">'), o += '<p class="fui-loading-dialog" aria-label="Loading content"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>', "sui-box-body" !== this.className && (o += "</div>"), t.$el.html(o) }
                a.post({ url: Powerform.Data.ajaxUrl, type: "post", data: e }).done(function(a) {
                    if (a && a.success) {
                        t.$el.html(a.data), t.$el.find(".wpmudev-hidden-popup").show(400), Powerform.Utils.sui_delegate_events();
                        t.$el.find(".powerform-custom-form");
                        t.delegateEvents()
                    }
                }).always(function() { t.$el.find(".fui-loading-dialog").remove() })
            },
            save: function(t) {
                t.preventDefault();
                var e = {},
                    o = a(t.target).data("nonce");
                e.action = "powerform_save_" + this.action + "_popup", e._ajax_nonce = o, a(".wpmudev-popup-form input, .wpmudev-popup-form select").each(function() {
                    var t = a(this);
                    e[t.attr("name")] = t.val()
                }), a.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: e, success: function(a) { Powerform.Popup.close(!1, function() { window.location.reload() }) } })
            },
            ajax_save: function(t) {
                var e = this;
                t.preventDefault();
                var o = {},
                    i = a(t.target).data("nonce");
                o.action = "powerform_save_" + this.action + "_popup", o._ajax_nonce = i, a(".wpmudev-popup-form input, .wpmudev-popup-form select, .wpmudev-popup-form textarea").each(function() {
                    var t = a(this);
                    o[t.attr("name")] = t.val()
                }), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.$el.find(".wpmudev-ajax-error-placeholder").addClass("sui-hidden"), a.ajax({
                    url: Powerform.Data.ajaxUrl,
                    type: "POST",
                    data: o,
                    success: function(a) {
                        if (!0 === a.success) {
                            var t = !1;
                            _.isUndefined(a.data.url) || (t = a.data.url), Powerform.Popup.close(!1, function() { t && (location.href = t) })
                        } else _.isUndefined(a.data) || e.$el.find(".wpmudev-ajax-error-placeholder").removeClass("sui-hidden").find("p").text(a.data)
                    }
                }).always(function() { e.$el.find(".sui-button:not(.disable-loader)").removeClass("sui-button-onload") })
            },
            clear_exports: function(t) {
                t.preventDefault();
                var e = {},
                    o = this,
                    i = a(t.target).data("nonce"),
                    n = a(t.target).data("form-id");
                e.action = "powerform_clear_" + this.action + "_popup", e._ajax_nonce = i, e.id = n, a.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: e, success: function() { o.render() } })
            },
            show_poll_custom_input: function(t) {
                var e = this,
                    o = this.$el.find(".powerform-input"),
                    i = t.target.checked,
                    n = a(t.target).attr("id");
                if (o.hide(), e.$el.find(".powerform-input#" + n + "-extra").length) {
                    var r = e.$el.find(".powerform-input#" + n + "-extra");
                    i ? r.show() : r.hide()
                }
            }
        })
    })
}(jQuery);