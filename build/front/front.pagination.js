! function(t, i, n, a) {
    "use strict";

    function o(n, a) { this.element = t(n), this.$el = this.element, this.totalSteps = 0, this.step = 0, this.hashStep = !1, this.next_button = i.PowerformFront.cform.pagination_next, this.prev_button = i.PowerformFront.cform.pagination_prev, this.form_id = 0, this.settings = t.extend({}, e, a), this._defaults = e, this._name = s, this.init() }
    var s = "powerformFrontPagination",
        e = { totalSteps: 0, step: 0, hashStep: 0, inline_validation: !1 };
    t.extend(o.prototype, {
        init: function() { this.$el.find("input[name=form_id]").length > 0 && (this.form_id = this.$el.find("input[name=form_id]").val()), this.form_id && "object" == typeof i.Powerform_Cform_Paginations && "object" == typeof i.Powerform_Cform_Paginations[this.form_id] && "custom" === i.Powerform_Cform_Paginations[this.form_id]["pagination-labels"] && (this.prev_button = i.Powerform_Cform_Paginations[this.form_id]["pagination-footer-button-text"], this.next_button = i.Powerform_Cform_Paginations[this.form_id]["pagination-right-button-text"]), this.totalSteps = this.settings.totalSteps, this.step = this.settings.step, this.settings.hashStep && this.step > 0 ? this.go_to(this.step, !0) : this.go_to(0, !1), this.render_navigation(), this.render_bar_navigation(), this.render_footer_navigation(), this.init_events(), this.update_buttons(), this.update_navigation() },
        init_events: function() {
            var t = this;
            this.$el.find(".powerform-pagination-prev").click(function(i) { i.preventDefault(), t.handle_click("prev") }), this.$el.find(".powerform-pagination-next").click(function(i) { i.preventDefault(), t.handle_click("next") }), this.$el.on("reset", function(i) { t.on_form_reset(i) }), this.$el.on("powerform.front.pagination.focus.input", function(i, n) { t.on_focus_input(i, n) })
        },
        on_form_reset: function(t) { this.go_to(0, !0), this.update_buttons() },
        on_focus_input: function(t, i) {
            var n = this.get_page_of_input(i);
            this.go_to(n, !0), this.update_buttons()
        },
        render_footer_navigation: function() { this.$el.hasClass("powerform-design--material") ? this.$el.append('<div class="powerform-pagination--footer"><button class="powerform-button powerform-pagination-prev"><span class="powerform-button--mask" aria-label="hidden"></span><span class="powerform-button--text">' + this.prev_button + '</span></button><button class="powerform-button powerform-pagination-next"><span class="powerform-button--mask" aria-label="hidden"></span><span class="powerform-button--text">' + this.next_button + "</span></button></div>") : this.$el.append('<div class="powerform-pagination--footer"><button class="powerform-button powerform-pagination-prev">' + this.prev_button + '</button><button class="powerform-button powerform-pagination-next">' + this.next_button + "</button></div>") },
        render_bar_navigation: function() {
            var t = this.$el.find(".powerform-pagination--bar");
            t.length && (t.html('<div class="powerform-bar--text powerform-current">0%</div><div class="powerform-bar--progress"><span style="width: 0%"></span></div>'), this.calculate_bar_percentage())
        },
        calculate_bar_percentage: function() {
            var t = this.totalSteps,
                i = this.step + 1,
                n = this.$el;
            if (n.length) {
                var a = Math.round(i / t * 100);
                n.find(".powerform-current").html(a + "%"), n.find(".powerform-bar--progress span").css("width", a + "%")
            }
        },
        render_navigation: function() {
            var i = this.$el.find(".powerform-pagination--nav");
            if (i.length) {
                var n = this.$el.find(".powerform-pagination").not(".powerform-pagination-start"),
                    a = this.$el.find(".powerform-pagination-start");
                this.$el.hasClass("powerform-design--material") ? (n.each(function() {
                    var n = t(this),
                        a = n.data("label"),
                        o = n.data("step") - 1;
                    i.append('<li class="powerform-nav-step powerform-nav-step-' + o + '"><span class="powerform-step-text">' + a + "</span></li>")
                }), a.each(function() {
                    var a = t(this),
                        o = a.data("label"),
                        s = n.length;
                    i.append('<li class="powerform-nav-step powerform-nav-step-' + s + '"><span class="powerform-step-text">' + o + "</span></li>")
                })) : (n.each(function() {
                    var n = t(this),
                        a = n.data("label"),
                        o = n.data("step") - 1;
                    i.append('<li class="powerform-nav-step powerform-nav-step-' + o + '"><span class="powerform-step-text">' + a + '</span><span class="powerform-step-dot" aria-label="hidden"></span></li>')
                }), a.each(function() {
                    var a = t(this),
                        o = a.data("label"),
                        s = n.length;
                    i.append('<li class="powerform-nav-step powerform-nav-step-' + s + '"><span class="powerform-step-text">' + o + '</span><span class="powerform-step-dot" aria-label="hidden"></span></li>')
                }))
            }
        },
        handle_click: function(t) {
            if ("prev" === t && 0 !== this.step) this.go_to(this.step - 1, !0);
            else if ("next" === t) {
                if (this.settings.inline_validation && !this.is_step_inputs_valid()) return;
                this.go_to(this.step + 1, !0)
            }
            this.update_buttons()
        },
        is_step_inputs_valid: function() {
            var t = !0,
                i = 0,
                n = this.$el.data("validator"),
                a = this.$el.find("[data-step=" + this.step + "]");
            return void 0 === n || (a.find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(":hidden:not(.powerform-wp-editor-required, .powerform-input-file-required)").not('[gramm="true"]').each(function(a, o) {
                (t = n.element(o)) || (0 === i && o.focus(), i++)
            }), 0 === i)
        },
        get_page_of_input: function(i) {
            var n = this.step,
                a = t(i).closest(".powerform-pagination");
            if (a.length > 0) {
                var o = t(a).data("step");
                void 0 !== o && (n = +o)
            }
            return n
        },
        update_buttons: function() {
            if (0 === this.step ? this.$el.find(".powerform-pagination-prev").attr("disabled", !0) : this.$el.find(".powerform-pagination-prev").removeAttr("disabled"), this.step === this.totalSteps && (this.step--, this.$el.submit()), this.step === this.totalSteps - 1) {
                var t = this.$el.find(".powerform-pagination-submit").html();
                this.$el.hasClass("powerform-design--material") ? this.$el.find(".powerform-pagination-next").removeClass("powerform-pagination-next").attr("id", "powerform-submit").find(".powerform-button--text").html(t) : this.$el.find(".powerform-pagination-next").removeClass("powerform-pagination-next").attr("id", "powerform-submit").html(t)
            } else this.$el.hasClass("powerform-design--material") ? this.$el.find(".powerform-pagination-next .powerform-button--text").html(this.next_button) : this.$el.find(".powerform-pagination-next").html(this.next_button)
        },
        go_to: function(t, i) {
            if (this.step = t, t === this.totalSteps) return !1;
            this.$el.find(".powerform-pagination").hide(), this.$el.find("[data-step=" + t + "]").show();
            var n = this.$el.data("powerformFront");
            void 0 !== n && n.responsive_captcha(), this.update_navigation(), i && this.scroll_to_top_form()
        },
        update_navigation: function() { this.$el.find(".powerform-step-current").removeClass("powerform-step-current"), this.$el.find(".powerform-nav-step-" + this.step).addClass("powerform-step-current"), this.calculate_bar_percentage() },
        scroll_to_top_form: function() {
            var n = this.$el,
                a = this.$el.find(".powerform-row").not(":hidden").first();
            if (a.length && (n = a), n.length) {
                var o = "html,body";
                this.$el.closest(".sui-dialog").length > 0 && (o = ".sui-dialog"), this.$el.closest(".wph-modal").length > 0 && (o = ".wph-modal"), t(o).animate({ scrollTop: n.offset().top - (t(i).height() - n.outerHeight(!0)) / 2 }, 500, function() { n.attr("tabindex") || n.attr("tabindex", -1), n.focus() })
            }
        }
    }), t.fn[s] = function(i) { return this.each(function() { t.data(this, s) || t.data(this, s, new o(this, i)) }) }
}(jQuery, window, document);