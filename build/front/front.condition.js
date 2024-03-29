! function(i, t, e, n) {
    "use strict";

    function s(t, e) { this.element = t, this.$el = i(this.element), this.settings = i.extend({}, a, e), this._defaults = a, this._name = r, this.init() }
    var r = "powerformFrontCondition",
        a = { fields: {}, relations: {} };
    i.extend(s.prototype, {
        init: function() {
            var t = this;
            this.add_missing_relations(), this.$el.find(".powerform-field input, .powerform-field select").change(function(e) {
                var n = i(this),
                    s = n.closest(".powerform-col").attr("id");
                if (void 0 === s && (s = n.attr("id")), !t.has_relations(s)) return !1;
                t.get_relations(s).forEach(function(i) {
                    var e = t.get_field_logic(i),
                        n = e.action,
                        s = e.rule,
                        r = e.conditions,
                        a = 0;
                    r.forEach(function(i) { t.is_applicable_rule(i) && a++ }), "all" === s && a === r.length || "any" === s && a > 0 ? t.toggle_field(i, n, "valid") : t.toggle_field(i, n, "invalid")
                })
            }), this.$el.find(".powerform-field input, .powerform-field select").change(), this.init_events()
        },
        init_events: function() {
            var i = this;
            this.$el.on("powerform.front.condition.restart", function(t) { i.on_restart(t) })
        },
        on_restart: function(i) { this.$el.find(".powerform-field input, .powerform-field select").change() },
        add_missing_relations: function() {
            var i = this,
                t = {};
            if (void 0 !== this.settings.fields) {
                var e = this.settings.fields;
                Object.keys(e).forEach(function(n) {
                    e[n].conditions.forEach(function(e) {
                        var s = e.field;
                        i.has_relations(s) || (void 0 === t[s] && (t[s] = []), t[s].push(n))
                    })
                })
            }
            Object.keys(t).forEach(function(e) { i.settings.relations[e] = t[e] })
        },
        get_field_logic: function(i) { return void 0 === this.settings.fields[i] ? [] : this.settings.fields[i] },
        has_relations: function(i) { return void 0 !== this.settings.relations[i] },
        get_relations: function(i) { return this.has_relations(i) ? this.settings.relations[i] : [] },
        get_field_value: function(t) {
            var e = this.get_form_field(t),
                n = e.val();
            return this.field_is_radio(e) ? n = e.filter(":checked").val() : this.field_is_checkbox(e) && (n = [], e.each(function() { i(this).is(":checked") && n.push(i(this).val().toLowerCase()) })), n || ""
        },
        field_is_radio: function(t) { var e = !1; return t.each(function() { if ("radio" === i(this).attr("type")) return e = !0, !1 }), e },
        field_is_checkbox: function(t) { var e = !1; return t.each(function() { if ("checkbox" === i(this).attr("type")) return e = !0, !1 }), e },
        get_form_field: function(i) { var t = this.$el.find("#" + i + "-field"); return 0 === t.length && (t = this.$el.find("input[name=" + i + "]"), 0 === t.length && (t = this.$el.find("textarea[name=" + i + "]"), 0 === t.length && (t = this.$el.find('input[name="' + i + '[]"]'), 0 === t.length && (t = this.$el.find("#" + i))))), t },
        is_numeric: function(i) { return !isNaN(parseFloat(i)) && isFinite(i) },
        is_applicable_rule: function(i) {
            if (void 0 === i) return !1;
            var t = this.get_field_value(i.field),
                e = i.value,
                n = i.operator;
            return this.is_matching(t, e, n)
        },
        is_matching: function(t, e, n) {
            var s = Array.isArray(t);
            switch (s || (t = t ? t.toLowerCase() : ""), e = e ? e.toLowerCase() : "", n) {
                case "ist":
                    return s ? i.inArray(e, t) > -1 : t === e;
                case "is_not":
                    return s ? -1 === i.inArray(e, t) : t !== e;
                case "is_great":
                    return t = +t, e = +e, !(!this.is_numeric(t) || !this.is_numeric(e)) && t > e;
                case "is_less":
                    return t = +t, e = +e, !(!this.is_numeric(t) || !this.is_numeric(e)) && t < e;
                case "enthält":
                    return this.contains(t, e);
                case "starts":
                    return t.startsWith(e);
                case "ends":
                    return t.endsWith(e)
            }
            return !1
        },
        contains: function(i, t) { return i.toLowerCase().indexOf(t) >= 0 },
        toggle_field: function(i, t, e) {
            var n = this.get_form_field(i),
                s = n.closest(".powerform-col"),
                r = s.find(".powerform-input-file-required"),
                a = s.find(".powerform-wp-editor-required"),
                o = s.closest(".powerform-row");
            "show" === t && ("valid" === e ? (o.removeClass("powerform-hidden"), s.removeClass("powerform-hidden"), r.length > 0 && r.addClass("do-validate"), a.length > 0 && a.addClass("do-validate")) : (s.addClass("powerform-hidden"), r.length > 0 && r.removeClass("do-validate"), a.length > 0 && a.removeClass("do-validate"), 0 === o.find("> .powerform-col:not(.powerform-hidden)").length && o.addClass("powerform-hidden"))), "hide" === t && ("valid" === e ? (s.addClass("powerform-hidden"), r.length > 0 && r.removeClass("do-validate"), a.length > 0 && a.removeClass("do-validate")) : (s.removeClass("powerform-hidden"), r.length > 0 && r.addClass("do-validate"), a.length > 0 && a.addClass("do-validate")))
        }
    }), i.fn[r] = function(t) { return this.each(function() { i.data(this, r) || i.data(this, r, new s(this, t)) }) }
}(jQuery, window, document);