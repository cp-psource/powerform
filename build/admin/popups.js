! function(o) { formintorjs.define(["admin/popup/templates", "admin/popup/login", "admin/popup/quizzes", "admin/popup/schedule", "admin/popup/new-form", "admin/popup/ajax", "admin/popup/delete", "admin/popup/preview", "admin/popup/reset-plugin-settings"], function(e, p, n, i, t, a, s, r, l) { var u = Backbone.View.extend({ el: "main.sui-wrap", events: { "click .wpmudev-open-modal": "open_modal", "click .wpmudev-button-open-modal": "open_modal" }, initialize: function() { var o = Powerform.Utils.get_url_param("new"),
                    e = Powerform.Utils.get_url_param("title"); if (o) { var p = new t({ title: e });
                    p.render(), this.open_popup(p, Powerform.l10n.popup.congratulations) } return this.render() }, render: function() { return this }, open_modal: function(e) { e.preventDefault(); var p = o(e.target);
                o(e.target).closest(".wpmudev-split--item");
                p.hasClass("wpmudev-open-modal") || p.hasClass("wpmudev-button-open-modal") || (p = p.closest(".wpmudev-open-modal")); var n = p.data("modal"),
                    i = p.data("nonce"),
                    t = p.data("form-id"),
                    a = p.data("modal-title"),
                    s = p.data("modal-content"); switch (n) {
                    case "custom_forms":
                        this.open_cform_popup(); break;
                    case "login_registration_forms":
                        this.open_login_popup(); break;
                    case "polls":
                        this.open_polls_popup(); break;
                    case "quizzes":
                        this.open_quizzes_popup(); break;
                    case "exports":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.your_exports); break;
                    case "exports-schedule":
                        this.open_exports_schedule_popup(); break;
                    case "delete-module":
                        this.open_delete_popup(t, i, a, s); break;
                    case "paypal":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.paypal_settings); break;
                    case "preview_cforms":
                        _.isUndefined(a) && (a = Powerform.l10n.popup.preview_cforms), this.open_preview_popup(t, a, "powerform_load_cform", "powerform_forms"); break;
                    case "preview_polls":
                        _.isUndefined(a) && (a = Powerform.l10n.popup.preview_polls), this.open_preview_popup(t, a, "powerform_load_poll", "powerform_polls"); break;
                    case "preview_quizzes":
                        _.isUndefined(a) && (a = Powerform.l10n.popup.preview_quizzes), this.open_preview_popup(t, a, "powerform_load_quiz", "powerform_quizzes"); break;
                    case "captcha":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.captcha_settings, !1, !0, "wpmudev-ajax-popup"); break;
                    case "currency":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.currency_settings, !1, !0, "wpmudev-ajax-popup"); break;
                    case "pagination_entries":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.pagination_entries, !1, !0, "wpmudev-ajax-popup"); break;
                    case "pagination_listings":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.pagination_listings, !1, !0, "wpmudev-ajax-popup"); break;
                    case "email_settings":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.email_settings, !1, !0, "wpmudev-ajax-popup"); break;
                    case "uninstall_settings":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.uninstall_settings, !1, !0, "wpmudev-ajax-popup"); break;
                    case "privacy_settings":
                        this.open_settings_modal(n, i, t, Powerform.l10n.popup.privacy_settings, !1, !0, "wpmudev-ajax-popup"); break;
                    case "export_cform":
                        this.open_export_module_modal("custom_form", i, t, Powerform.l10n.popup.export_cform, !1, !0, "wpmudev-ajax-popup"); break;
                    case "export_poll":
                        this.open_export_module_modal("poll", i, t, Powerform.l10n.popup.export_poll, !1, !0, "wpmudev-ajax-popup"); break;
                    case "export_quiz":
                        this.open_export_module_modal("quiz", i, t, Powerform.l10n.popup.export_quiz, !1, !0, "wpmudev-ajax-popup"); break;
                    case "import_cform":
                        this.open_import_module_modal("custom_form", i, t, Powerform.l10n.popup.import_cform, !1, !0, "wpmudev-ajax-popup"); break;
                    case "import_poll":
                        this.open_import_module_modal("poll", i, t, Powerform.l10n.popup.import_poll, !1, !0, "wpmudev-ajax-popup"); break;
                    case "import_quiz":
                        this.open_import_module_modal("quiz", i, t, Powerform.l10n.popup.import_quiz, !1, !0, "wpmudev-ajax-popup"); break;
                    case "reset-plugin-settings":
                        this.open_reset_plugin_settings_popup(i, a, s) } }, open_popup: function(e, p, n, i, t, a, s) { _.isUndefined(p) && (p = Powerform.l10n.custom_form.popup_label); var r = { title: p };
                _.isUndefined(n) || (r.has_custom_box = n), _.isUndefined(i) || (r.action_text = i), _.isUndefined(t) || (r.action_css_class = t), _.isUndefined(a) || (r.action_callback = a), Powerform.Popup.open(function() { _.isUndefined(e.el) ? o(this).append(e) : o(this).append(e.el), "function" == typeof s && s.apply(this) }, r) }, open_ajax_popup: function(e, p, n, i, t, s, r) { _.isUndefined(i) && (i = Powerform.l10n.custom_form.popup_label), _.isUndefined(t) && (t = !0), _.isUndefined(s) && (s = !1), _.isUndefined(r) && (r = "sui-box-body"); var l = new a({ action: e, nonce: p, id: n, enable_loader: !0, className: r }),
                    u = { title: i, has_custom_box: s };
                Powerform.Popup.open(function() { o(this).append(l.el) }, u) }, open_cform_popup: function() { var p = new e({ type: "form" });
                p.render(); var n = p;
                Powerform.New_Popup.open(function() { _.isUndefined(n.el) ? o(this).append(n) : o(this).append(n.el) }, { title: "" }) }, open_delete_popup: function(e, p, n, i) { var t = new s({ id: e, nonce: p, referrer: window.location.pathname + window.location.search, content: i });
                t.render(); var a = t;
                Powerform.Popup.open(function() { _.isUndefined(a.el) ? o(this).append(a) : o(this).append(a.el), o(this).closest(".sui-dialog").addClass("sui-dialog-alt sui-dialog-sm"), o(this).closest(".sui-dialog").find(".sui-box-header, .sui-box-body").addClass("sui-block-content-center"), o(this).closest(".sui-dialog").find(".sui-box-body").css({ "padding-top": "10px" }), o(this).closest(".sui-dialog").find(".sui-box-footer").css({ "padding-top": "0", "padding-bottom": "40px", "justify-content": "center" }) }, { title: n, has_custom_box: !0 }) }, open_login_popup: function() { var o = new p;
                o.render(), this.open_popup(o, Powerform.l10n.popup.edit_login_form) }, open_polls_popup: function() { var p = new e({ type: "poll" });
                p.render(); var n = p;
                Powerform.New_Popup.open(function() { _.isUndefined(n.el) ? o(this).append(n) : o(this).append(n.el) }, { title: "" }) }, open_quizzes_popup: function() { var e = new n;
                e.render(); var p = e;
                Powerform.New_Popup.open(function() { _.isUndefined(p.el) ? o(this).append(p) : o(this).append(p.el), o(this).closest(".sui-dialog").removeClass("sui-dialog-sm"), o(this).closest(".sui-dialog").addClass("sui-dialog-alt"), o(this).closest(".sui-dialog").find(".sui-box-header").addClass("sui-block-content-center") }, { title: Powerform.l10n.quiz.choose_quiz_title, has_custom_box: !0 }) }, open_exports_schedule_popup: function() { var o = new i;
                o.render(), this.open_popup(o, Powerform.l10n.popup.edit_scheduled_export, !0) }, open_settings_modal: function(o, e, p, n, i, t, a) { this.open_ajax_popup(o, e, p, n, i, t, a) }, open_export_module_modal: function(o, e, p, n, i, t, a) { var s = ""; switch (o) {
                    case "custom_form":
                        s = "export_custom_form"; break;
                    case "poll":
                        s = "export_poll"; break;
                    case "quiz":
                        s = "export_quiz" }
                this.open_ajax_popup(s, e, p, n, i, t, a) }, open_import_module_modal: function(o, e, p, n, i, t, a) { var s = ""; switch (o) {
                    case "custom_form":
                        s = "import_custom_form"; break;
                    case "poll":
                        s = "import_poll"; break;
                    case "quiz":
                        s = "import_quiz" }
                this.open_ajax_popup(s, e, p, n, i, t, a) }, open_preview_popup: function(e, p, n, i) { _.isUndefined(p) && (p = Powerform.l10n.custom_form.popup_label); var t = new r({ action: n, type: i, id: e, enable_loader: !0, className: "sui-box-body" }),
                    a = { title: p, has_custom_box: !0 };
                Powerform.Popup.open(function() { o(this).append(t.el) }, a) }, open_reset_plugin_settings_popup: function(e, p, n) { var i = new l({ nonce: e, referrer: window.location.pathname + window.location.search, content: n });
                i.render(); var t = i;
                Powerform.Popup.open(function() { _.isUndefined(t.el) ? o(this).append(t) : o(this).append(t.el), o(this).closest(".sui-dialog").addClass("sui-dialog-alt sui-dialog-sm"), o(this).closest(".sui-dialog").find(".sui-box-header, .sui-box-body").addClass("sui-block-content-center"), o(this).closest(".sui-dialog").find(".sui-box-body").css({ "padding-top": "10px" }), o(this).closest(".sui-dialog").find(".sui-box-footer").css({ "padding-top": "0", "padding-bottom": "40px", "justify-content": "center" }) }, { title: p, has_custom_box: !0 }) } });
        jQuery(document).ready(function() { new u }) }) }(jQuery);