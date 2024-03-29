! function(t) {
    formintorjs.define(["text!tpl/popups.html"], function(i) {
        return Backbone.View.extend({
            className: "wpmudev-section--integrations",
            loaderTpl: Powerform.Utils.template(t(i).find("#popup-loader-tpl").html()),
            model: {},
            events: { "click .powerform-addon-connect": "connect_addon", "click .powerform-addon-disconnect": "disconnect_addon", "click .powerform-addon-form-disconnect": "form_disconnect_addon", "click .powerform-addon-next": "submit_next_step", "click .powerform-addon-back": "go_prev_step", "click .powerform-addon-finish": "finish_steps" },
            initialize: function(t) { this.slug = t.slug, this.nonce = t.nonce, this.action = t.action, this.form_id = t.form_id, this.multi_id = t.multi_id, this.step = 0, this.next_step = !1, this.prev_step = !1, this.scrollbar_width = this.get_scrollbar_width(); var i = this; return this.$el.find(".powerform-integration-close, .powerform-addon-close").on("click", function() { i.close(i) }), this.render() },
            render: function() {
                var t = {};
                t.action = this.action, t._ajax_nonce = this.nonce, t.data = {}, t.data.slug = this.slug, t.data.step = this.step, t.data.current_step = this.step, this.form_id && (t.data.form_id = this.form_id), this.multi_id && (t.data.multi_id = this.multi_id), this.request(t, !1, !0)
            },
            request: function(i, e, o) {
                var s = this,
                    n = { data: i, close: e, loader: o };
                o && (this.$el.find(".sui-box-body").html(this.loaderTpl()), this.$el.find(".sui-box-footer").html(""), this.$el.find(".integration-header").html("")), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.ajax = t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: i }).done(function(i) {
                    if (i && i.success) {
                        s.render_body(i), s.render_footer(i);
                        var o = i.data.data;
                        if (s.on_render(o), s.$el.find(".sui-button").removeClass("sui-button-onload"), (e || !_.isUndefined(o.is_close) && o.is_close) && s.close(s), s.$el.find(".powerform-addon-close").on("click", function() { s.close(s) }), _.isUndefined(o.notification) || _.isUndefined(o.notification.type) || _.isUndefined(o.notification.text) || Powerform.Notification.open(o.notification.type, o.notification.text, 4e3), _.isUndefined(o.has_back) ? s.$el.find(".powerform-addon-back").hide() : o.has_back ? s.$el.find(".powerform-addon-back").show() : s.$el.find(".powerform-addon-back").hide(), !_.isUndefined(o.size)) { var a = t("#powerform-integration-popup"); "normal" === o.size && a.removeClass("sui-dialog-sm sui-dialog-lg"), "small" === o.size && (a.addClass("sui-dialog-sm"), a.removeClass("sui-dialog-lg")), "large" === o.size && (a.addClass("sui-dialog-lg"), a.removeClass("sui-dialog-sm")) }
                        o.is_poll && setTimeout(s.request(n.data, n.close, n.loader), 5e3);
                        t("#powerform-integration-popup .sui-box").height() > t(window).height() ? t("#powerform-integration-popup .sui-dialog-overlay").css("right", s.scrollbar_width + "px") : t("#powerform-integration-popup .sui-dialog-overlay").css("right", 0)
                    }
                }), this.ajax.always(function() { s.$el.find(".fui-loading-dialog").remove() })
            },
            render_body: function(t) {
                this.$el.find(".sui-box-body").html(t.data.data.html);
                var i = this.$el.find(".sui-box-body .integration-header").remove();
                i.length > 0 && this.$el.find(".integration-header").html(i.html())
            },
            render_footer: function(t) {
                var i = this,
                    e = t.data.data.buttons;
                i.$el.find(".sui-box-footer").html(""), _.each(e, function(t) { i.$el.find(".sui-box-footer").append(t.markup) })
            },
            on_render: function(t) { this.delegateEvents(), Powerform.Utils.sui_delegate_events(), Powerform.Utils.powerform_select2_tags(this.$el, {}), _.isUndefined(t.powerform_addon_current_step) || (this.step = +t.powerform_addon_current_step), _.isUndefined(t.powerform_addon_has_next_step) || (this.next_step = t.powerform_addon_has_next_step), _.isUndefined(t.powerform_addon_has_prev_step) || (this.prev_step = t.powerform_addon_has_prev_step) },
            get_step: function() { return this.next_step ? this.step + 1 : this.step },
            get_prev_step: function() { return this.prev_step ? this.step - 1 : this.step },
            connect_addon: function(i) {
                var e = {},
                    o = this.$el.find("form"),
                    s = { slug: this.slug, step: this.get_step(), current_step: this.step },
                    n = o.serialize();
                this.form_id && (s.form_id = this.form_id), this.multi_id && (s.multi_id = this.multi_id), n = n + "&" + t.param(s), e.action = this.action, e._ajax_nonce = this.nonce, e.data = n, this.request(e, !1, !1)
            },
            submit_next_step: function(i) {
                var e = {},
                    o = this.$el.find("form"),
                    s = { slug: this.slug, step: this.get_step(), current_step: this.step },
                    n = o.serialize();
                this.form_id && (s.form_id = this.form_id), n = n + "&" + t.param(s), e.action = this.action, e._ajax_nonce = this.nonce, e.data = n, this.request(e, !1, !1)
            },
            go_prev_step: function(t) {
                var i = {},
                    e = { slug: this.slug, step: this.get_prev_step(), current_step: this.step };
                this.form_id && (e.form_id = this.form_id), this.multi_id && (e.multi_id = this.multi_id), i.action = this.action, i._ajax_nonce = this.nonce, i.data = e, this.request(i, !1, !1)
            },
            finish_steps: function(i) {
                var e = {},
                    o = this.$el.find("form"),
                    s = { slug: this.slug, step: this.get_step(), current_step: this.step },
                    n = o.serialize();
                this.form_id && (s.form_id = this.form_id), this.multi_id && (s.multi_id = this.multi_id), n = n + "&" + t.param(s), e.action = this.action, e._ajax_nonce = this.nonce, e.data = n, this.request(e, !1, !1)
            },
            disconnect_addon: function(t) {
                var i = {};
                i.action = "powerform_addon_deactivate", i._ajax_nonce = this.nonce, i.data = {}, i.data.slug = this.slug, this.request(i, !0, !1)
            },
            form_disconnect_addon: function(t) {
                var i = {};
                i.action = "powerform_addon_form_deactivate", i._ajax_nonce = this.nonce, i.data = {}, i.data.slug = this.slug, i.data.form_id = this.form_id, this.multi_id && (i.data.multi_id = this.multi_id), this.request(i, !0, !1)
            },
            close: function(t) { t.ajax.abort(), t.remove(), Powerform.Integrations_Popup.close(), Powerform.Events.trigger("powerform:addons:reload") },
            get_scrollbar_width: function() {
                var i = 0;
                if (t.browser.msie) {
                    var e = t('<textarea cols="10" rows="2"></textarea>').css({ position: "absolute", top: -1e3, left: -1e3 }).appendTo("body"),
                        o = t('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({ position: "absolute", top: -1e3, left: -1e3 }).appendTo("body");
                    i = e.width() - o.width(), e.add(o).remove()
                } else {
                    var s = t("<div />").css({ width: 100, height: 100, overflow: "auto", position: "absolute", top: -1e3, left: -1e3 }).prependTo("body").append("<div />").find("div").css({ width: "100%", height: 200 });
                    i = 100 - s.width(), s.parent().remove()
                }
                return i
            }
        })
    })
}(jQuery);