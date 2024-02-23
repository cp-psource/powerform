! function(t, e, a, r) {
    "use strict";

    function o(e, a) { this.element = e, this.$el = t(this.element), this.powerformFront = null, this.settings = t.extend({}, i, a), this._defaults = i, this._name = n, this.init() }
    var n = "powerformFrontSubmit",
        i = { form_type: "custom-form", powerformFront: !1, powerform_selector: "", chart_design: "bar", chart_options: {} };
    t.extend(o.prototype, {
        init: function() {
            switch (this.powerformFront = this.$el.data("powerformFront"), this.settings.form_type) {
                case "custom-form":
                    this.settings.powerform_selector && t(this.settings.powerform_selector).length || (this.settings.powerform_selector = ".powerform-custom-form"), this.handle_submit_custom_form();
                    break;
                case "quiz":
                    this.settings.powerform_selector && t(this.settings.powerform_selector).length || (this.settings.powerform_selector = ".powerform-quiz"), this.handle_submit_quiz();
                    break;
                case "poll":
                    this.settings.powerform_selector && t(this.settings.powerform_selector).length || (this.settings.powerform_selector = ".powerform-poll"), this.handle_submit_poll()
            }
        },
        decodeHtmlEntity: function(t) { return t.replace(/&#(\d+);/g, function(t, e) { return String.fromCharCode(e) }) },
        handle_submit_custom_form: function() {
            var a = this;
            t(this.element);
            a.$el.find(".powerform-cform-response-message").find(".powerform-label--success").not(":hidden").length && a.focus_to_element(a.$el.find(".powerform-cform-response-message"), !0), t("body").on("submit.frontSubmit", this.settings.powerform_selector, function(r) {
                var o = t(this),
                    n = new FormData(this),
                    i = o.find(".powerform-cform-response-message"),
                    s = o.find(".powerform-g-recaptcha");
                if (s.length) {
                    s = t(s.get(0));
                    var l = s.data("powerform-recapchta-widget"),
                        f = s.data("size"),
                        d = e.grecaptcha.getResponse(l);
                    if ("invisible" === f && 0 === d.length) return e.grecaptcha.execute(l), !1;
                    if (a.$el.hasClass("powerform_ajax") && e.grecaptcha.reset(l), i.html(""), s.hasClass("error") && s.removeClass("error"), 0 === d.length) return s.hasClass("error") || s.addClass("error"), i.html('<label class="powerform-label--error"><span>' + e.PowerformFront.cform.captcha_error + "</span></label>"), a.focus_to_element(i), !1
                }
                return !a.$el.hasClass("powerform_ajax") || (i.html(""), i.html('<label class="powerform-label--info"><span>' + e.PowerformFront.cform.processing + "</span></label>"), a.focus_to_element(i), a.$el.find("input[type=file]").each(function() { "" === t(this).val() && "function" == typeof e.FormData.prototype.delete && n.delete(t(this).attr("name")) }), r.preventDefault(), t.ajax({
                    type: "POST",
                    url: e.PowerformFront.ajaxUrl,
                    data: n,
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    beforeSend: function() { o.find("button").attr("disabled", !0) },
                    success: function(r) {
                        o.find(".powerform-label--validation").remove(), o.find(".powerform-field").removeClass("powerform-has_error"), o.find("button").removeAttr("disabled"), i.html("");
                        var s = r.success ? "success" : "error";
                        void 0 !== r.message ? (i.html('<div class="powerform-label--' + s + '"><span>' + r.message + "</span></div>"), a.focus_to_element(i, "success" === s)) : void 0 !== r.data && (s = r.data.success ? "success" : "error", i.html('<div class="powerform-label--' + s + '"><span>' + r.data.message + "</span></div>"), a.focus_to_element(i, "success" === s)), !r.data.success && r.data.errors.length && (o.trigger("powerform:form:submit:failed", n), a.show_messages(r.data.errors)), !0 === r.success && (o[0] && (o[0].reset(), o.find(".powerform-upload--remove").hide(), o.find(".powerform-upload .powerform-input").val(""), o.find(".powerform-upload .powerform-label").html(e.PowerformFront.cform.no_file_chosen), o.find(".powerform-select").each(function() {
                            var e = t(this).data("default-value");
                            t(this).val(e).trigger("change")
                        }), o.trigger("powerform:form:submit:success", n), o.trigger("powerform.front.condition.restart")), void 0 !== r.data.url && (e.location.href = a.decodeHtmlEntity(r.data.url)), void 0 !== r.data.behav && "behaviour-hide" === r.data.behav && a.$el.hide())
                    },
                    error: function(t) {
                        o.find("button").removeAttr("disabled"), i.html("");
                        var r = 400 === t.status ? e.PowerformFront.cform.upload_error : e.PowerformFront.cform.error;
                        i.html('<label class="powerform-label--notice"><span>' + r + "</span></label>"), a.focus_to_element(i), o.trigger("powerform:form:submit:failed", n)
                    }
                }), !1)
            })
        },
        handle_submit_quiz: function() {
            var a = this;
            t("body").on("submit.frontSubmit", this.settings.powerform_selector, function(r) {
                var o = t(this),
                    n = [];
                r.preventDefault(), a.$el.find(".powerform-has-been-disabled").removeAttr("disabled"), n = o.serialize(), a.$el.find(".powerform-has-been-disabled").attr("disabled", "disabled");
                var i = a.$el.find(".powerform-button"),
                    s = i.data("loading");
                return "" !== s && i.text(s), t.ajax({
                    type: "POST",
                    url: e.PowerformFront.ajaxUrl,
                    data: n,
                    beforeSend: function() { a.$el.find("button").attr("disabled", "disabled") },
                    success: function(t) {
                        t.success ? "nowrong" === t.data.type ? (e.history.pushState("powerform", "Powerform", t.data.result_url), a.$el.find(".powerform-quiz--result").html(t.data.result), a.$el.find(".powerform-answer input").attr("disabled", "disabled")) : "knowledge" === t.data.type && (e.history.pushState("powerform", "Powerform", t.data.result_url), a.$el.find(".powerform-quiz--result").size() > 0 && a.$el.find(".powerform-quiz--result").html(t.data.finalText), Object.keys(t.data.result).forEach(function(e) {
                            var r = a.$el.find("#" + e);
                            r.find(".powerform-question--result").html("<span>" + t.data.result[e].message + "</span>"), r.find(".powerform-submit-rightaway").attr("disabled", "disabled");
                            var o, n = a.$el.find('[id|="' + t.data.result[e].answer + '"]'),
                                i = n.closest(".powerform-answer");
                            o = t.data.result[e].isCorrect ? "powerform-is_correct" : "powerform-is_incorrect", i.addClass(o)
                        })) : a.$el.find("button").removeAttr("disabled")
                    }
                }), !1
            }), t("body").on("click", ".powerform-result--retake", function() { location.reload() })
        },
        handle_submit_poll: function() {
            var a = this;
            a.$el.find(".powerform-poll-response-message").find(".powerform-label--success").not(":hidden").length && a.focus_to_element(a.$el.find(".powerform-poll-response-message"), !0), t("body").on("submit.frontSubmit", this.settings.powerform_selector, function(r) { var o = (t(this), a.$el.find(".powerform-poll-response-message")); return !a.$el.hasClass("powerform_ajax") || (o.html(""), o.html('<label class="powerform-label--info"><span>' + e.PowerformFront.poll.processing + "</span></label>"), a.focus_to_element(o), r.preventDefault(), t.ajax({ type: "POST", url: e.PowerformFront.ajaxUrl, data: a.$el.serialize(), beforeSend: function() { a.$el.find("button").attr("disabled", !0) }, success: function(t) { a.$el.find("button").removeAttr("disabled"), o.html(""); var r = t.success ? "success" : "error";!1 === t.success ? (o.html('<label class="powerform-label--' + r + '"><span>' + t.data.message + "</span></label>"), a.focus_to_element(o)) : void 0 !== t.data && (r = t.data.success ? "success" : "error", o.html('<label class="powerform-label--' + r + '"><span>' + t.data.message + "</span></label>"), a.focus_to_element(o, "success" === r)), !0 === t.success && (void 0 !== t.data.url ? e.location.href = t.data.url : void 0 !== t.data.chart_data && t.data.chart_data.length > 1 && "undefined" != typeof google && (void 0 === google.visualization ? (google.charts.load("current", { packages: ["corechart", "bar"] }), google.charts.setOnLoadCallback(function() { a.render_poll_chart(t.data.chart_data, t.data.back_button, a) })) : a.render_poll_chart(t.data.chart_data, t.data.back_button, a))) }, error: function() { a.$el.find("button").removeAttr("disabled"), o.html(""), o.html('<label class="powerform-label--notice"><span>' + e.PowerformFront.poll.error + "</span></label>"), a.focus_to_element(o) } }), !1) })
        },
        render_poll_chart: function(e, r, o) {
            o.$el.find(".powerform-poll--chart").remove();
            var n = o.$el.attr("id") + "-" + o.$el.data("powerformRender"),
                i = "powerform-chart-poll-" + n,
                s = t('<div id="' + i + '" class="powerform-poll--chart" style="width: 100%; height: 300px;"></div>'),
                l = google.visualization.arrayToDataTable(e),
                f = t(r),
                d = !1;
            t(s).insertBefore(o.$el.find(".powerform-poll--answers")), o.$el.find(".powerform-poll--answers").hide(), o.$el.find(".powerform-poll--actions").empty(), f.click(function(t) { t.preventDefault(), location.reload() }), o.$el.find(".powerform-poll--actions").append(f), "bar" === o.settings.chart_design ? d = new google.visualization.BarChart(a.getElementById(i)) : "pie" === this.settings.chart_design && (d = new google.visualization.PieChart(a.getElementById(i))), d && d.draw(l, o.settings.chart_options)
        },
        focus_to_element: function(a, r) {
            (r = r || !1) && (r = this.settings.fadeout);
            var o = this.settings.fadeout_time;
            a.show(), t("html,body").animate({ scrollTop: a.offset().top - (t(e).height() - a.outerHeight(!0)) / 2 }, 500, function() { a.attr("tabindex") || a.attr("tabindex", -1), a.focus(), r && a.show().delay(o).fadeOut("slow") })
        },
        show_messages: function(e) {
            var a = this,
                r = a.$el.data("powerformFrontCondition");
            if (void 0 !== r) {
                this.$el.find(".powerform-label--validation").remove();
                var o = 0;
                e.forEach(function(e) {
                    var n = Object.keys(e),
                        i = Object.values(e),
                        s = r.get_form_field(n);
                    if (s.length) {
                        if (0 === o && (a.$el.trigger("powerform.front.pagination.focus.input", [s]), a.focus_to_element(s)), t(s).hasClass("powerform-input-time")) {
                            var l = t(s).closest(".powerform-field:not(.powerform-field--inner)"),
                                f = l.children(".powerform-label--validation");
                            0 === f.length && (l.append('<label class="powerform-label--validation"></label>'), f = l.children(".powerform-label--validation")), f.html(i)
                        }
                        var d = t(s).closest(".powerform-field--inner");
                        0 === d.length && (d = t(s).closest(".powerform-field"), 0 === d.length && (d = t(s).find(".powerform-field"), d.length > 1 && (d = d.first())));
                        var m = d.find(".powerform-label--validation");
                        0 === m.length && (d.append('<label class="powerform-label--validation"></label>'), m = d.find(".powerform-label--validation")), t(s).attr("aria-invalid", "true"), m.html(i), d.addClass("powerform-has_error"), o++
                    }
                })
            }
            return this
        }
    }), t.fn[n] = function(e) { return this.each(function() { t.data(this, n) || t.data(this, n, new o(this, e)) }) }
}(jQuery, window, document);