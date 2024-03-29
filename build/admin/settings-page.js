! function(t) {
    formintorjs.define([], function() {
        var a = Backbone.View.extend({
                el: ".wpmudev-powerform-powerform-settings",
                events: { "click .sui-side-tabs label.sui-tab-item input": "sidetabs", "click .sui-sidenav .sui-vertical-tab a": "sidenav", "change .sui-sidenav select.sui-mobile-nav": "sidenav_select" },
                initialize: function() {
                    var a = this;
                    if (t(".wpmudev-powerform-powerform-settings").length) {
                        this.$el.find(".powerform-settings-save").submit(function(e) {
                            e.preventDefault();
                            var i = t(this),
                                n = i.find(".wpmudev-action-done").data("nonce"),
                                s = i.find(".wpmudev-action-done").data("action"),
                                o = i.find(".wpmudev-action-done").data("title"),
                                r = i.find(".wpmudev-action-done").data("isReload");
                            a.submitForm(t(this), s, n, o, r)
                        });
                        var e = window.location.hash;
                        return _.isUndefined(e) || _.isEmpty(e) || this.sidenav_go_to(e.substring(1), !0), this.render()
                    }
                },
                render: function() {
                    var a = this.$el.find("#recaptcha-preview");
                    a.html('<p class="fui-loading-dialog"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>'), t.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: { action: "powerform_load_recaptcha_preview" } }).done(function(t) { t.success && a.html(t.data) })
                },
                submitForm: function(a, e, i, n, s) {
                    var o = {},
                        r = this;
                    o.action = "powerform_save_" + e + "_popup", o._ajax_nonce = i;
                    var d = a.serialize() + "&" + t.param(o);
                    t.ajax({
                        url: Powerform.Data.ajaxUrl,
                        type: "POST",
                        data: d,
                        beforeSend: function() { a.find(".sui-button").addClass("sui-button-onload") },
                        success: function(t) {
                            var a = _.template("<strong>{{ tab }}</strong> {{ Powerform.l10n.commons.update_successfully }}");
                            Powerform.Notification.open("success", a({ tab: n }), 4e3), "captcha" === e && r.render(), s && window.location.reload()
                        },
                        error: function(t) { Powerform.Notification.open("error", Powerform.l10n.commons.update_unsuccessfull, 4e3) }
                    }).always(function() { a.find(".sui-button").removeClass("sui-button-onload") })
                },
                sidetabs: function(t) {
                    var a = this.$(t.target),
                        e = a.parent("label"),
                        i = a.data("tab-menu"),
                        n = a.closest(".sui-side-tabs"),
                        s = n.find(".sui-tabs-menu .sui-tab-item"),
                        o = s.find("input");
                    s.removeClass("active"), o.removeAttr("checked"), n.find(".sui-tabs-content > div").removeClass("active"), e.addClass("active"), a.attr("checked", "checked"), n.find('.sui-tabs-content div[data-tab-content="' + i + '"]').length && n.find('.sui-tabs-content div[data-tab-content="' + i + '"]').addClass("active")
                },
                sidenav: function(a) {
                    var e = t(a.target).data("nav");
                    e && this.sidenav_go_to(e, !0), a.preventDefault()
                },
                sidenav_select: function(a) {
                    var e = t(a.target).val();
                    e && this.sidenav_go_to(e, !0), a.preventDefault()
                },
                sidenav_go_to: function(t, a) {
                    var e = this.$el.find('a[data-nav="' + t + '"]'),
                        i = e.closest(".sui-vertical-tabs"),
                        n = i.find(".sui-vertical-tab"),
                        s = this.$el.find(".sui-box[data-nav]"),
                        o = this.$el.find('.sui-box[data-nav="' + t + '"]');
                    a && history.pushState({ selected_tab: t }, "Global Settings", "admin.php?page=powerform-settings&section=" + t), n.removeClass("current"), s.hide(), e.parent().addClass("current"), o.show()
                }
            }),
            a = new a;
        return a
    })
}(jQuery);
var powerform_render_admin_captcha = function() {
    setTimeout(function() {
        var t = $(".powerform-g-recaptcha"),
            a = t.data("sitekey"),
            e = t.data("theme");
        window.grecaptcha.render(t[0], { sitekey: a, theme: e, size: "normal" })
    }, 100)
};