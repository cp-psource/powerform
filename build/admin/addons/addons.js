! function(t) {
    formintorjs.define(["admin/addons/view"], function(i) {
        var a = Backbone.View.extend({
            el: ".sui-wrap",
            currentTab: "powerform-integrations",
            events: { "change .powerform-addon-toggle-enabled": "toggle_state", "click .connect-integration": "connect_integration", "click .powerform-integrations-wrapper .sui-vertical-tab a": "go_to_tab", "change .powerform-integrations-wrapper .sui-sidenav-hide-lg select": "go_to_tab", "keyup input.sui-form-control": "required_settings" },
            initialize: function(t) { return this.listenTo(Powerform.Events, "powerform:addons:reload", this.render_addons_page), this.render() },
            render: function() { this.render_addons_page(), this.update_tab() },
            render_addons_page: function() {
                var i = this,
                    a = {};
                this.$el.find("#powerform-integrations-display").html('<div class="sui-notice sui-notice-loading"><p>Integrationsliste wird abgerufen…</p></div>'), a.action = "powerform_addon_get_addons", a._ajax_nonce = Powerform.Data.addonNonce, a.data = {}, t.post({ url: Powerform.Data.ajaxUrl, type: "post", data: a }).done(function(t) { t && t.success && i.$el.find("#powerform-integrations-page").html(t.data.data) }).always(function() { i.$el.find(".sui-notice sui-notice-loading").remove() })
            },
            connect_integration: function(a) {
                a.preventDefault();
                var e = t(a.target);
                e.hasClass("connect-integration") || (e = e.closest(".connect-integration"));
                var n = e.data("nonce"),
                    r = e.data("slug"),
                    o = e.data("title"),
                    s = e.data("image"),
                    d = e.data("imagex2"),
                    l = e.data("action"),
                    u = e.data("form-id"),
                    c = e.data("multi-id");
                Powerform.Integrations_Popup.open(function() { new i({ slug: r, nonce: n, action: l, form_id: u, multi_id: c, el: t(this) }) }, { title: o, image: s, image_x2: d })
            },
            go_to_tab: function(i) {
                i.preventDefault();
                var a = t(i.target),
                    e = a.attr("href"),
                    n = "";
                if (_.isUndefined(e)) { n = a.val() } else n = e.replace("#", "", e);
                _.isEmpty(n) || (this.currentTab = n), this.update_tab(), i.stopPropagation()
            },
            update_tab_select: function() { this.$el.hasClass("wpmudev-powerform-powerform-integrations") && (this.$el.find(".sui-sidenav-hide-lg select").val(this.currentTab), this.$el.find(".sui-sidenav-hide-lg select").trigger("sui:change")) },
            update_tab: function() { this.$el.hasClass("wpmudev-powerform-powerform-integrations") && (this.clear_tabs(), this.$el.find("[data-tab-id=" + this.currentTab + "]").addClass("current"), this.$el.find(".wpmudev-settings--box#" + this.currentTab).show()) },
            clear_tabs: function() { this.$el.hasClass("wpmudev-powerform-powerform-integrations") && (this.$el.find(".sui-vertical-tab ").removeClass("current"), this.$el.find(".wpmudev-settings--box").hide()) },
            required_settings: function(i) {
                var a = t(i.target),
                    e = a.parent(),
                    n = e.find(".sui-error-message"),
                    r = a.closest("div[data-nav]"),
                    o = r.find(".sui-box-footer"),
                    s = o.find(".wpmudev-action-done");
                this.$el.hasClass("wpmudev-powerform-powerform-settings") && (a.hasClass("powerform-required") && !a.val() && e.hasClass("sui-form-field") && (e.addClass("sui-form-field-error"), n.show()), a.hasClass("powerform-required") && a.val() && e.hasClass("sui-form-field") && (e.removeClass("sui-form-field-error"), n.hide()), r.find("input.sui-form-control").hasClass("powerform-required") && (0 === r.find("div.sui-form-field-error").length ? s.prop("disabled", !1) : s.prop("disabled", !0))), i.stopPropagation()
            }
        });
        jQuery(document).ready(function() { new a })
    })
}(jQuery);