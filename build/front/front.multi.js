! function(t, i, o, e) {
    "use strict";

    function r(i, o) { this.element = i, this.$el = t(this.element), this.powerform_selector = "#" + t(this.element).attr("id") + '[data-powerform-render="' + t(this.element).data("powerform-render") + '"]', this.powerform_loader_selector = 'div[data-powerform-render="' + t(this.element).data("powerform-render") + '"][data-form="' + t(this.element).attr("id") + '"]', this.settings = t.extend({}, a, o), void 0 !== this.settings.messages && (this.settings.messages = this.maybeParseStringToJson(this.settings.messages, "object")), void 0 !== this.settings.rules && (this.settings.rules = this.maybeParseStringToJson(this.settings.rules, "object")), void 0 !== this.settings.calendar && (this.settings.calendar = this.maybeParseStringToJson(this.settings.calendar, "array")), this._defaults = a, this._name = n, this.init() }
    var n = "powerformFront",
        a = { form_type: "custom-form", rules: {}, messages: {}, conditions: {}, inline_validation: !1, chart_design: "bar", chart_options: {} };
    t.extend(r.prototype, {
        init: function() {
            var i = this;
            switch (t(this.powerform_loader_selector).remove(), 0 === this.$el.closest(".wph-modal").length && this.$el.show(), t(o).on("hustle:module:displayed", function(i, o) { t(".wph-modal-active").find("form").css("display", "") }), setTimeout(function() { t(".wph-modal-active").find("form").css("display", "") }, 10), this.settings.form_type) {
                case "custom-form":
                    this.init_custom_form();
                    break;
                case "poll":
                    this.init_poll_form();
                    break;
                case "quiz":
                    this.init_quiz_form()
            }
            t(this.element).powerformFrontSubmit({ form_type: i.settings.form_type, powerform_selector: i.powerform_selector, chart_design: i.settings.chart_design, chart_options: i.settings.chart_options, fadeout: i.settings.fadeout, fadeout_time: i.settings.fadeout_time }), this.activate_field(), this.material_field(), this.small_form()
        },
        init_custom_form: function() {
            var o = this;
            this.settings.inline_validation && (this.init_intlTelInput_validation(), t(this.element).powerformFrontValidate({ rules: o.settings.rules, messages: o.settings.messages })), this.init_pagination(), t(this.element).powerformFrontCondition(this.settings.conditions), t(this.element).find(".powerform-datepicker").powerformFrontDatePicker(this.settings.calendar), this.init_select2(), this.responsive_captcha(), this.field_counter(), this.field_number(), this.field_time(), this.upload_field(), t(i).on("resize", function() { o.responsive_captcha() })
        },
        init_poll_form: function() {
            var i = this,
                o = this.$el.find(".powerform-radio--field"),
                e = this.$el.find(".powerform-input");
            this.$el.hasClass("powerform-poll-disabled") && this.$el.find(".powerform-radio--field").each(function() { t(this).attr("disabled", !0) }), o.on("click", function() {
                e.hide(), e.attr("name", "");
                var o = this.checked,
                    r = t(this).attr("id"),
                    n = t(this).attr("name");
                if (i.$el.find(".powerform-input#" + r + "-extra").length) {
                    var a = i.$el.find(".powerform-input#" + r + "-extra");
                    o ? (a.attr("name", n + "-extra"), a.show()) : a.hide()
                }
                return !0
            })
        },
        init_quiz_form: function() {
            var o = this;
            this.$el.find(".powerform-button").each(function() { t(this).prop("disabled", !0) }), this.$el.find(".powerform-answer input").each(function() { t(this).attr("checked", !1) }), this.$el.find(".powerform-result--info button").on("click", function() { location.reload() }), this.$el.find(".powerform-submit-rightaway").click(function() { o.$el.submit(), t(this).closest(".powerform-question").find(".powerform-submit-rightaway").addClass("powerform-has-been-disabled").attr("disabled", "disabled") }), this.$el.on("click", ".powerform-social--icon a", function(o) {
                o.preventDefault();
                var e = t(this).data("social"),
                    r = t(this).closest(".powerform-social--icons").data("message"),
                    n = { facebook: "https://www.facebook.com/sharer/sharer.php?u=" + i.location.href + "&t=" + r, twitter: "https://twitter.com/intent/tweet?&url=" + i.location.href + "&text=" + r, google: "https://plus.google.com/share?url=" + i.location.href, linkedin: "https://www.linkedin.com/shareArticle?mini=true&url=" + i.location.href + "&title=" + r };
                if (void 0 !== n[e]) { var a = i.open(n[e], e, "height=" + t(i).height() + ",width=" + t(i).width()); return i.focus && a.focus(), !1 }
            }), this.$el.on("change", ".powerform-answer input", function(i) {
                var e = 0,
                    r = o.$el.find(".powerform-question").length;
                o.$el.find(".powerform-answer input").each(function() { t(this).prop("checked") && e++, e === r && o.$el.find(".powerform-button").each(function() { t(this).prop("disabled", !1) }) })
            })
        },
        small_form: function() {
            var o = t(this.element);
            t(i).width() > 782 && o.parent().width() <= 420 && !o.closest(".form-preview-wrapper").length && o.addClass("powerform-size--small")
        },
        init_intlTelInput_validation: function() {
            var o = t(this.element),
                e = o.is(".powerform-design--material");
            o.find(".powerform-phone--field").each(function() {
                var o = t(this).data("national_mode"),
                    r = t(this).data("country");
                if (void 0 !== o) {
                    e && t(this).unwrap(".powerform-input--wrap");
                    var n = { nationalMode: "enabled" === o, initialCountry: "us", utilsScript: i.PowerformFront.cform.intlTelInput_utils_script };
                    void 0 !== r && (n.initialCountry = r, n.allowDropdown = !1), t(this).intlTelInput(n), e && (t(this).closest(".intl-tel-input.allow-dropdown").addClass("powerform-phone-intl").removeClass("intl-tel-input"), t(this).closest(".powerform-field").addClass("intl-tel-input"), t(this).wrap('<div class="powerform-input--wrap"></div>'))
                }
            })
        },
        init_select2: function() {
            var i = t(this.element),
                o = i.attr("id");
            i.hasClass("powerform-design--default") ? (t(this.element).find(".powerform-select").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-dropdown powerform-dropdown--default powerform-ddfor--" + o }), t(this.element).find(".powerform-time").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-droptime powerform-droptime--default powerform-ddfor--" + o })) : i.hasClass("powerform-design--material") ? (t(this.element).find(".powerform-select").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-dropdown powerform-dropdown--material powerform-ddfor--" + o }), t(this.element).find(".powerform-time").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-droptime powerform-droptime--material powerform-ddfor--" + o })) : i.hasClass("powerform-design--bold") ? (t(this.element).find(".powerform-select").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-dropdown powerform-dropdown--bold powerform-ddfor--" + o }), t(this.element).find(".powerform-time").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-droptime powerform-droptime--bold powerform-ddfor--" + o })) : i.hasClass("powerform-design--flat") ? (t(this.element).find(".powerform-select").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-dropdown powerform-dropdown--flat powerform-ddfor--" + o }), t(this.element).find(".powerform-time").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-droptime powerform-droptime--flat powerform-ddfor--" + o })) : (t(this.element).find(".powerform-select").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-dropdown powerform-ddfor--" + o }), t(this.element).find(".powerform-time").wpmuiSelect({ allowClear: !1, containerCssClass: "powerform-select2", dropdownCssClass: "powerform-droptime powerform-droptime--flat powerform-ddfor--" + o }))
        },
        responsive_captcha: function() {
            t(this.element).find(".powerform-g-recaptcha").each(function() {
                if (t(this).is(":visible")) {
                    var i = t(this).parent().width(),
                        o = 1;
                    i < 302 && (o = i / 302), t(this).css("transform", "scale(" + o + ")"), t(this).css("-webkit-transform", "scale(" + o + ")"), t(this).css("transform-origin", "0 0"), t(this).css("-webkit-transform-origin", "0 0")
                }
            })
        },
        init_pagination: function() {
            var o = this,
                e = t(this.element).find(".powerform-pagination").length,
                r = i.location.hash,
                n = !1,
                a = 0;
            e > 0 && (void 0 !== r && r.indexOf("step-") >= 0 && (n = !0, a = r.substr(6, 8)), t(this.element).powerformFrontPagination({ totalSteps: e, hashStep: n, step: a, inline_validation: o.settings.inline_validation }))
        },
        activate_field: function() {
            function i() { o.find(".select2-container").hasClass("select2-container--open") ? setTimeout(i, 300) : o.find(".select2-container").closest(".powerform-field").removeClass("powerform-is_active") }
            var o = t(this.element);
            o.find(".powerform-input, .powerform-textarea").each(function() { var i = t(this); "" !== t(this).val().trim() ? (t(this).closest(".powerform-field").addClass("powerform-is_filled"), t(this).closest(".powerform-poll--answer").addClass("powerform-is_filled")) : (t(this).closest(".powerform-field").removeClass("powerform-is_filled"), t(this).closest(".powerform-poll--answer").removeClass("powerform-is_filled")), i.mouseover(function(i) { i.stopPropagation(), t(this).closest(".powerform-field").addClass("powerform-is_hover"), t(this).closest(".powerform-poll--answer").addClass("powerform-is_hover") }).mouseout(function(i) { i.stopPropagation(), t(this).closest(".powerform-field").removeClass("powerform-is_hover"), t(this).closest(".powerform-poll--answer").removeClass("powerform-is_hover") }), i.focus(function(i) { i.stopPropagation(), t(this).closest(".powerform-field").addClass("powerform-is_active"), t(this).closest(".powerform-poll--answer").addClass("powerform-is_active") }).blur(function(i) { i.stopPropagation(), t(this).closest(".powerform-field").removeClass("powerform-is_active"), t(this).closest(".powerform-poll--answer").removeClass("powerform-is_active") }), i.change(function(i) { i.stopPropagation(), "" !== t(this).val().trim() ? (t(this).closest(".powerform-field").addClass("powerform-is_filled"), t(this).closest(".powerform-poll--answer").addClass("powerform-is_filled")) : (t(this).closest(".powerform-field").removeClass("powerform-is_filled"), t(this).closest(".powerform-poll--answer").removeClass("powerform-is_filled")), "" !== t(this).val().trim() && "" !== t(this).find("powerform-label--validation").text() && (t(this).find(".powerform-label--validation").remove(), t(this).find(".powerform-field").removeClass("powerform-has_error")) }) }), o.find(".powerform-select + .select2, .powerform-time + .select2").each(function() {
                var o = t(this);
                o.mouseover(function(i) { i.stopPropagation(), t(this).closest(".powerform-field").addClass("powerform-is_hover") }).mouseout(function(i) { i.stopPropagation(), t(this).closest(".powerform-field").removeClass("powerform-is_hover") }), o.on("click", function(e) { e.stopPropagation(), i(), o.hasClass("select2-container--open") ? t(this).closest(".powerform-field").addClass("powerform-is_active") : t(this).closest(".powerform-field").removeClass("powerform-is_active") })
            })
        },
        field_counter: function() {
            t(this.element).find(".powerform-input, .powerform-textarea").each(function() {
                var i = t(this),
                    o = 0;
                i.on("change keyup", function(i) {
                    i.stopPropagation();
                    var e = t(this).closest(".powerform-field"),
                        r = e.find(".powerform-field--helper .powerform-label--limit");
                    r.length && r.data("limit") && (o = "words" !== r.data("type") ? t(this).val().trim().length : t(this).val().trim().split(/\s+/).length, r.html(o + " / " + r.data("limit")))
                })
            })
        },
        field_number: function() {
            t(this.element).find("input[type=number]").each(function() {
                t(this).keypress(function(t) {
                    var i, o = [44, 45, 46],
                        e = t.which;
                    for (i = 48; i < 58; i++) o.push(i);
                    o.indexOf(e) >= 0 || t.preventDefault()
                })
            })
        },
        field_time: function() {
            t(".powerform-input-time").on("input", function(i) {
                var o = t(this),
                    e = o.val();
                e && e.length >= 2 && o.val(e.substr(0, 2))
            })
        },
        material_field: function() {
            var i = t(this.element);
            if (i.is(".powerform-design--material")) {
                var o = i.find(".powerform-input--wrap"),
                    e = i.find(".powerform-textarea--wrap"),
                    r = i.find(".powerform-date"),
                    n = (i.find(".powerform-product"), i.find(".powerform-pagination--nav")),
                    a = n.find("li");
                t('<span class="powerform-nav-border"></span>').insertAfter(a), o.prev(".powerform-field--label").addClass("powerform-floating--input"), o.closest(".powerform-phone-intl").prev(".powerform-field--label").addClass("powerform-floating--input"), e.prev(".powerform-field--label").addClass("powerform-floating--textarea"), r.hasClass("powerform-has_icon") ? r.prev(".powerform-field--label").addClass("powerform-floating--date") : r.prev(".powerform-field--label").addClass("powerform-floating--input")
            }
        },
        toggle_file_input: function() {
            t(this.element).find(".powerform-upload").each(function() {
                var i = t(this),
                    o = i.find(".powerform-input"),
                    e = i.find(".powerform-upload--remove");
                "" !== o.val() ? e.show() : e.hide()
            })
        },
        upload_field: function() {
            var i = this,
                o = t(this.element);
            this.toggle_file_input(), o.find(".powerform-upload--remove").on("click", function(i) {
                i.preventDefault();
                var o = t(this),
                    e = o.siblings(".powerform-input"),
                    r = o.siblings(".powerform-label");
                e.val(""), r.html("No file chosen"), o.hide()
            }), o.find(".powerform-upload-button").on("click", function(e) {
                e.preventDefault();
                var r = t(this).attr("data-id"),
                    n = o.find("input#" + r),
                    a = o.find("label#" + r);
                n.trigger("click"), n.change(function() {
                    var o = t(this).val(),
                        e = o.length ? o.split("\\").pop() : "";
                    a.text(e), i.toggle_file_input()
                })
            }), o.find(".powerform-input-file").on("change", function(i) {
                i.preventDefault();
                var o = t(this)[0].files.length,
                    e = t(this).find("~ .powerform-upload--remove");
                0 === o ? e.hide() : e.show()
            })
        },
        renderCaptcha: function(o) {
            var e = this;
            if (void 0 === t(o).data("powerform-recapchta-widget")) {
                var r = t(o).data("size"),
                    n = { sitekey: t(o).data("sitekey"), theme: t(o).data("theme"), size: r };
                if ("invisible" === r && (n.badge = "inline", n.callback = function(i) { t(e.element).trigger("submit.frontSubmit") }), "" !== n.sitekey) {
                    var a = i.grecaptcha.render(o, n);
                    t(o).data("powerform-recapchta-widget", a), this.responsive_captcha()
                }
            }
        },
        hide: function() { this.$el.hide() },
        maybeParseStringToJson: function(t, i) {
            var o = {};
            if ("object" == typeof t) return t;
            if ("object" === i) t = "{" + t.trim() + "}";
            else {
                if ("array" !== i) return {};
                t = "[" + t.trim() + "]"
            }
            try {
                var e = /\,(?!\s*?[\{\[\"\'\w])/g;
                t = t.replace(e, ""), o = JSON.parse(t)
            } catch (t) { console.error(t.message), "object" === i ? o = {} : "array" === i && (o = []) }
            return o
        }
    }), t.fn[n] = function(i) { return this.each(function() { t.data(this, n) || t.data(this, n, new r(this, i)) }) }, t(o).on("tinymce-editor-init", function(t, i) { i.on("change", function() { 0 === i.id.indexOf("powerform-wp-editor-") && i.save() }) })
}(jQuery, window, document);
var powerform_render_captcha = function() {
    jQuery(".powerform-g-recaptcha").each(function() {
        var t = jQuery(this).closest("form");
        if (t.length > 0) {
            var i = t.data("powerformFront");
            void 0 !== i && i.renderCaptcha(jQuery(this)[0])
        }
    })
};