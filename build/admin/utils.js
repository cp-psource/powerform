! function(i) {
    window.empty = function(i) { return void 0 === i || !i }, window.count = function(i) { return void 0 === i ? 0 : i && i.length ? i.length : 0 }, window.stripslashes = function(i) {
        return (i + "").replace(/\\(.?)/g, function(i, t) {
            switch (t) {
                case "\\":
                    return "\\";
                case "0":
                    return "\0";
                case "":
                    return "";
                default:
                    return t
            }
        })
    }, window.powerform_array_value_exists = function(i, t) { return !_.isUndefined(i[t]) && !_.isEmpty(i[t]) }, window.decodeHtmlEntity = function(i) { return void 0 === i ? i : i.replace(/&#(\d+);/g, function(i, t) { return String.fromCharCode(t) }) }, window.encodeHtmlEntity = function(i) { if (void 0 === i) return i; for (var t = [], e = i.length - 1; e >= 0; e--) t.unshift(["&#", i[e].charCodeAt(), ";"].join("")); return t.join("") }, formintorjs.define(["text!admin/templates/popups.html"], function(t) {
        var e = {
                fields_ids: [],
                google_font_families: [],
                is_touch: function() { return Powerform.Data.is_touch },
                is_mobile_size: function() { return window.screen.width <= 782 },
                is_mobile: function() { return !(!Powerform.Utils.is_touch() && !Powerform.Utils.is_mobile_size()) },
                template: function(i) { return _.templateSettings = { evaluate: /\{\[([\s\S]+?)\]\}/g, interpolate: /\{\{([\s\S]+?)\}\}/g }, _.template(i) },
                template_php: function(i) {
                    var t = _.templateSettings,
                        e = !1;
                    return _.templateSettings = { interpolate: /<\?php echo (.+?) \?>/g, evaluate: /<\?php (.+?) \?>/g }, e = _.template(i), _.templateSettings = t,
                        function(i) { return _.each(i, function(t, e) { i["$" + e] = t }), e(i) }
                },
                ucfirst: function(i) { return i.charAt(0).toUpperCase() + i.slice(1) },
                get_slug: function(i) { return i = i.replace(" ", "-"), i = i.replace(/[^-a-zA-Z0-9]/, "") },
                sanitize_uri_string: function(i) { var t = decodeURIComponent(i); return t = t.replace(/-/g, " ") },
                get_url_param: function(i) { for (var t = window.location.search.substring(1), e = t.split("&"), o = 0; o < e.length; o++) { var s = e[o].split("="); if (s[0] === i) return s[1] } return !1 },
                is_email_wp: function(i) {
                    if (i.length < 6) return !1;
                    if (i.indexOf("@", 1) < 0) return !1;
                    var t = i.split("@", 2);
                    if (!t[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) return !1;
                    if (t[1].match(/\.{2,}/)) return !1;
                    var e = t[1],
                        o = e.split(".");
                    if (o.length < 2) return !1;
                    for (var s = o.length, n = 0; n < s; n++)
                        if (!o[n].match(/^[a-z0-9-]+$/i)) return !1;
                    return !0
                },
                powerform_select2_tags: function(t, e) {
                    e = _.defaults(e, { allowClear: !0, dropdownCssClass: "sui-select-dropdown" }), t.find("select.sui-select.fui-multi-select").each(function() {
                        i(this).attr("data-reorder") && i(this).on("select2:select", function(t) {
                            var e = t.params.data.element,
                                o = i(e),
                                s = i(this);
                            s.append(o), s.trigger("change.select2")
                        }), i(this).SUIselect2(e)
                    })
                },
                powerform_select2_custom: function(t, e) {
                    e = _.defaults(e, { dropdownCssClass: "sui-select-dropdown" }), t.find("select.sui-select.custom-select2").each(function() {
                        i(this).attr("data-reorder") && i(this).on("select2:select", function(t) {
                            var e = t.params.data.element,
                                o = i(e),
                                s = i(this);
                            s.append(o), s.trigger("change.select2")
                        }), i(this).SUIselect2(e)
                    })
                },
                init_select2: function() { window.SUI },
                load_google_fonts: function(t) {
                    var e = this;
                    i.ajax({ url: Powerform.Data.ajaxUrl, type: "POST", data: { action: "powerform_load_google_fonts", _wpnonce: Powerform.Data.gFontNonce } }).done(function(i) {!0 === i.success && (e.google_font_families = i.data), t.apply(i, [e.google_font_families]) })
                },
                sui_delegate_events: function() { "object" == typeof window.SUI && setTimeout(function() { SUI.suiAccordion(i(".sui-accordion")), SUI.suiTabs(i(".sui-tabs")), i("select").not(".sui-select").not(".powerform-select").not(".powerform-time").not(".fui-multi-select").each(function() { SUI.suiSelect(i(this)) }), i("select.sui-select").not(".fui-multi-select").not(".custom-select2").each(function() { i(this).SUIselect2({ dropdownCssClass: "sui-select-dropdown" }) }), SUI.loadCircleScore(i(".sui-circle-score")), SUI.showHidePassword() }, 50) }
            },
            o = {
                $popup: {},
                _deferred: {},
                initialize: function() {
                    var e = Powerform.Utils.template(i(t).find("#popup-tpl").html());
                    i("#powerform-popup").length ? (i("#powerform-popup").remove(), this.initialize()) : i("main.sui-wrap").append(e({})), this.$popup = i("#powerform-popup")
                },
                open: function(e, o, s) {
                    this.data = o, this.title = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0;
                    var n = Powerform.Utils.template(i(t).find("#popup-header-tpl").html());
                    _.isUndefined(this.data) || (_.isUndefined(this.data.title) || (this.title = this.data.title), _.isUndefined(this.data.has_footer) || (this.has_footer = this.data.has_footer), _.isUndefined(this.data.action_callback) || _.isUndefined(this.data.action_text) || (this.action_callback = this.data.action_callback, this.action_text = this.data.action_text, _.isUndefined(this.data.action_css_class) || (this.action_css_class = this.data.action_css_class)), _.isUndefined(this.data.has_custom_box) || (this.has_custom_box = this.data.has_custom_box)), this.initialize(), this.$popup.find(".sui-box").html(n({ title: this.title }));
                    var a = this,
                        r = function() { return a.close(), !1 };
                    if (s && this.$popup.addClass(s), this.has_custom_box) e.apply(this.$popup.find(".sui-box").get(), o);
                    else {
                        var p = '<div class="sui-box-body"></div>';
                        this.has_footer && (p += '<div class="sui-box-footer"><button class="sui-button powerform-popup-cancel" data-a11y-dialog-hide="powerform-popup">' + Powerform.l10n.popup.cancel + "</button></div>"), this.$popup.find(".sui-box").append(p), e.apply(this.$popup.find(".sui-box-body").get(), o)
                    }
                    if (this.action_text && this.action_callback) {
                        var u = this.action_callback;
                        this.$popup.find(".sui-box-footer").append('<div class="sui-actions-right"><button class="powerform-popup-action sui-button ' + this.action_css_class + '">' + this.action_text + "</button></div>"), this.$popup.find(".powerform-popup-action").on("click", function() { u && u.apply(), a.close() })
                    } else this.$popup.find(".powerform-popup-action").remove();
                    return this.$popup.find(".sui-dialog-close").on("click", r), this.$popup.find(".sui-dialog-overlay").on("click", r), this.$popup.on("click", ".powerform-popup-cancel", r), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new i.Deferred, this._deferred.promise()
                },
                close: function(t, e) {
                    var o = i("#powerform-popup");
                    o.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), o.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), setTimeout(function() { o.attr("aria-hidden", "true"), e && e.apply() }, 300), this._deferred.resolve(this.$popup, t)
                }
            },
            s = {
                $popup: {},
                _deferred: {},
                initialize: function() {
                    var e = Powerform.Utils.template(i(t).find("#popup-new-tpl").html());
                    i("#powerform-popup").length ? (i("#powerform-popup").remove(), this.initialize()) : i("main.sui-wrap").append(e({})), this.$popup = i("#powerform-popup")
                },
                open: function(t, e, o) {
                    this.data = e, this.title = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0, this.initialize(), t.apply(this.$popup.find(".sui-box").get(), e);
                    var s = this,
                        n = function() { return s.close(), !1 };
                    return this.$popup.find(".sui-dialog-close").on("click", n), this.$popup.find(".sui-dialog-overlay").on("click", n), this.$popup.on("click", ".powerform-popup-cancel", n), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new i.Deferred, this._deferred.promise()
                },
                close: function(t, e) {
                    var o = i("#powerform-popup");
                    o.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), o.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), setTimeout(function() { o.attr("aria-hidden", "true"), e && e.apply() }, 300), this._deferred.resolve(this.$popup, t)
                }
            },
            n = {
                $notification: {},
                _deferred: {},
                initialize: function() { i("#powerform-notification").length ? (i("#powerform-notification").remove(), this.initialize()) : i("main.sui-wrap").append('<div id="powerform-notification" class="sui-notice-top sui-notice-' + this.type + ' sui-can-dismiss"><div class="sui-notice-content"><p>' + this.text + '</p></div><span class="sui-notice-dismiss"><a role="button" href="#" aria-label="Dismiss" class="sui-icon-check"></a></span></div>'), this.$notification = i("#powerform-notification") },
                open: function(t, e, o) { var s = this; return this.type = t || "notice", this.text = e, this.initialize(), i(".sui-notice-dismiss a").click(function(i) { return i.preventDefault(), s.close(), !1 }), _.isUndefined(o) || setTimeout(function() { s.close() }, o), this._deferred = new i.Deferred, this._deferred.promise() },
                close: function(t) {
                    var e = i("#powerform-notification");
                    e.stop().slideUp("slow"), this._deferred.resolve(e, t)
                }
            };
        return {
            Utils: e,
            Popup: o,
            New_Popup: s,
            Integrations_Popup: {
                $popup: {},
                _deferred: {},
                initialize: function() {
                    var e = Powerform.Utils.template(i(t).find("#popup-integration-tpl").html());
                    i("#powerform-integration-popup").length ? (i("#powerform-integration-popup").remove(), this.initialize()) : i("main.sui-wrap").append(e({ provider_image: "", provider_image2: "", provider_title: "" })), this.$popup = i("#powerform-integration-popup")
                },
                open: function(e, o, s) {
                    this.data = o, this.title = "", this.image = "", this.image_x2 = "", this.action_text = "", this.action_callback = !1, this.action_css_class = "", this.has_custom_box = !1, this.has_footer = !0, _.isUndefined(this.data) || (_.isUndefined(this.data.title) || (this.title = this.data.title), _.isUndefined(this.data.image) || (this.image = this.data.image), _.isUndefined(this.data.image_x2) || (this.image_x2 = this.data.image_x2)), this.initialize();
                    var n = Powerform.Utils.template(i(t).find("#popup-integration-content-tpl").html());
                    this.$popup.find(".sui-box").html(n({ image: this.image, image_x2: this.image_x2, title: this.title }));
                    var a = this,
                        r = function() { return a.close(), !1 };
                    if (s && this.$popup.addClass(s), e.apply(this.$popup.get(), o), this.action_text && this.action_callback) {
                        var p = this.action_callback;
                        this.$popup.find(".sui-box-footer").append('<div class="sui-actions-right"><button class="powerform-popup-action sui-button ' + this.action_css_class + '">' + this.action_text + "</button></div>"), this.$popup.find(".powerform-popup-action").on("click", function() { p && p.apply(), a.close() })
                    } else this.$popup.find(".powerform-popup-action").remove();
                    return this.$popup.find(".sui-dialog-close").on("click", r), this.$popup.find(".sui-dialog-overlay").on("click", r), this.$popup.on("click", ".powerform-popup-cancel", r), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-bounce-out").addClass("sui-bounce-in"), this.$popup.removeAttr("aria-hidden"), i("body").css("overflow", "hidden"), Powerform.Utils.sui_delegate_events(), this._deferred = new i.Deferred, this._deferred.promise()
                },
                close: function(t, e) {
                    var o = i("#powerform-integration-popup");
                    o.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), o.find(".sui-dialog-content").removeClass("sui-bounce-in").addClass("sui-bounce-out"), i("body").css("overflow", "auto"), setTimeout(function() { o.attr("aria-hidden", "true"), e && e.apply() }, 300), this._deferred.resolve(this.$popup, t)
                }
            },
            Notification: n
        }
    })
}(jQuery);