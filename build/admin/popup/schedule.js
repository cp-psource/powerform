! function(e) {
    formintorjs.define(["text!tpl/dashboard.html"], function(t) {
        return Backbone.View.extend({
            popupTpl: Powerform.Utils.template(e(t).find("#powerform-exports-schedule-popup-tpl").html()),
            events: { 'change select[name="interval"]': "on_change_interval", "click .sui-toggle-label": "click_label", "click .tab-labels .sui-tab-item": "click_tab_label", "click .psource-action-done": "submit_schedule" },
            render: function() {
                this.$el.html(this.popupTpl({})), Powerform.Utils.sui_delegate_events();
                var e = powerforml10n.exporter,
                    t = { tags: !0, tokenSeparators: [",", " "], language: { searching: function() { return e.searching }, noResults: function() { return e.noResults } }, ajax: { url: powerformData.ajaxUrl, type: "POST", delay: 350, data: function(e) { return { action: "powerform_builder_search_emails", _wpnonce: powerformData.searchNonce, q: e.term } }, processResults: function(e) { return { results: e.data } }, cache: !0 }, createTag: function(e) { const t = jQuery.trim(e.term); return Powerform.Utils.is_email_wp(t) ? { id: t, text: t } : null }, insertTag: function(e, t) { e.push(t) } };
                Powerform.Utils.powerform_select2_tags(this.$el, t), this.$el.find('input[name="if_new"]').prop("checked", e.if_new), this.set_enabled(e.enabled), this.$el.find('select[name="interval"]').change(), null !== e.email && (this.$el.find('select[name="interval"]').val(e.interval), this.$el.find('select[name="day"]').val(e.day), this.$el.find('select[name="month_day"]').val(e.month_day ? e.month_day : 1), this.$el.find('select[name="hour"]').val(e.hour), "weekly" === e.interval ? this.$el.find('select[name="day"]').closest(".sui-form-field").show() : "monthly" === e.interval && this.$el.find('select[name="month_day"]').closest(".sui-form-field").show())
            },
            set_enabled: function(e) { e ? (this.$el.find('input[name="enabled"][value="true"]').prop("checked", !0), this.$el.find('input[name="enabled"][value="false"]').prop("checked", !1), this.$el.find(".tab-label-disable").removeClass("active"), this.$el.find(".tab-label-enable").addClass("active"), this.$el.find(".schedule-enabled").show(), this.$el.find('input[name="email"]').prop("required", !0)) : (this.$el.find('input[name="enabled"][value="false"]').prop("checked", !0), this.$el.find('input[name="enabled"][value="true"]').prop("checked", !1), this.$el.find(".tab-label-disable").addClass("active"), this.$el.find(".tab-label-enable").removeClass("active"), this.$el.find(".schedule-enabled").hide()) },
            on_change_interval: function(e) { this.$el.find('select[name="day"]').closest(".sui-form-field").hide(), this.$el.find('select[name="month_day"]').closest(".sui-form-field").hide(), "weekly" === e.target.value ? (this.$el.find('select[name="month-day"]').closest(".sui-form-field").hide(), this.$el.find('select[name="day"]').closest(".sui-form-field").show()) : "monthly" === e.target.value && (this.$el.find('select[name="month_day"]').closest(".sui-form-field").show(), this.$el.find('select[name="day"]').closest(".sui-form-field").hide()) },
            click_label: function(e) { e.preventDefault(), this.$el.closest(".sui-form-field").find(".sui-toggle input").click() },
            click_tab_label: function(t) {
                var l = e(t.target);
                l.closest(".sui-tab-item").hasClass("tab-label-disable") ? this.set_enabled(!1) : l.closest(".sui-tab-item").hasClass("tab-label-enable") && this.set_enabled(!0)
            },
            submit_schedule: function(e) { this.$el.find("form.schedule-action").trigger("submit") }
        })
    })
}(jQuery);