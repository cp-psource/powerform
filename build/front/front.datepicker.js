! function(t, e, a, r) { "use strict";

    function i(e, a) { this.element = e, this.$el = t(this.element), this.settings = t.extend({}, s, a), this._defaults = s, this._name = n, this.init() } var n = "powerformFrontDatePicker",
        s = {};
    t.extend(i.prototype, { init: function() { var e = this,
                a = this.$el.data("format"),
                r = this.$el.data("restrict-type"),
                i = this.$el.data("restrict"),
                n = this.$el.data("restrict"),
                s = this.$el.data("start-year"),
                o = this.$el.data("end-year");
            n = !isNaN(parseFloat(n)) && isFinite(n) ? [n.toString()] : i.split(","), s || (s = "c-95"), o || (o = "c+95"); var l = function(t) { return "week" === r ? e.restrict_week(n, t) : e.restrict_custom(n, t) },
                d = this.$el.closest(".powerform-custom-form"),
                c = "powerform-calendar";
            d.hasClass("powerform-design--default") ? c = "powerform-calendar--default" : d.hasClass("powerform-design--material") ? c = "powerform-calendar--material" : d.hasClass("powerform-design--flat") ? c = "powerform-calendar--flat" : d.hasClass("powerform-design--bold") && (c = "powerform-calendar--bold"), this.$el.datepicker({ beforeShow: function(t, e) { e.dpDiv.addClass(c + " powerform-calfor--" + d.attr("id")) }, beforeShowDay: l, dayNamesMin: this.settings, changeMonth: !0, changeYear: !0, dateFormat: a, yearRange: s + ":" + o, minDate: new Date(s, 0, 1), maxDate: new Date(o, 11, 31), onClose: function() { t(this).valid() } }) }, restrict_week: function(t, e) { var a = e.getDay(); return -1 !== t.indexOf(a.toString()) ? [!1, "disabledDate"] : [!0, "enabledDate"] }, restrict_custom: function(t, e) { var a = [];
            a[0] = "January", a[1] = "February", a[2] = "March", a[3] = "April", a[4] = "May", a[5] = "June", a[6] = "July", a[7] = "August", a[8] = "September", a[9] = "October", a[10] = "November", a[11] = "December"; var r = e.getMonth(),
                i = e.getDate(),
                n = e.getFullYear(),
                s = i + " " + a[r] + " " + n; return -1 !== t.indexOf(s) ? [!1, "disabledDate"] : [!0, "enabledDate"] } }), t.fn[n] = function(e) { return this.each(function() { t.data(this, n) || t.data(this, n, new i(this, e)) }) } }(jQuery, window, document);