! function(o) {
    formintorjs.define([], function(t) {
        return new(Backbone.View.extend({
            el: ".wpmudev-dashboard-section",
            events: { "click .wpmudev-action-close": "dismiss_welcome" },
            initialize: function() {
                var t = Powerform.Utils.get_url_param("notification"),
                    e = Powerform.Utils.get_url_param("title");
                if (setTimeout(function() { o(".powerform-scroll-to").length && o("html, body").animate({ scrollTop: o(".powerform-scroll-to").offset().top }, "slow") }, 100), t) {
                    var i = _.template("<strong>{{ formName }}</strong> {{ Powerform.l10n.options.been_published }}");
                    Powerform.Notification.open("success", i({ formName: Powerform.Utils.sanitize_uri_string(e) }), 4e3)
                }
                return this.render()
            },
            dismiss_welcome: function(t) {
                t.preventDefault();
                var e = o(t.target).closest(".sui-box"),
                    i = o(t.target).data("nonce");
                e.slideToggle(300, function() { o.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: { action: "powerform_dismiss_welcome", _ajax_nonce: i }, complete: function(o) { e.remove() } }) })
            }
        }))
    })
}(jQuery);