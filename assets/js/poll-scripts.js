! function(e) {
    function t(r) { if (n[r]) return n[r].exports; var o = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 411)
}([function(e, t) { e.exports = React }, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o() { return Math.floor(9999 * Math.random()) }

    function a() { return "wrapper-" + o() + "-" + o() }

    function i(e, t) { var n = void 0; return t.map(function(t) { t.wrapper_id === e && (n = t) }), n }

    function s(e, t) { var n = 0; return t.map(function(t) { t.fields.map(function(t) { t.type === e && n++ }) }), n }

    function l(e, t) {
        var n = [];
        t.map(function(t) {
            t.fields.map(function(t) {
                if (t.type === e) {
                    var r = t.element_id,
                        o = r.split("-");
                    "page-break" === t.type ? n.push(parseInt(o[2])) : n.push(parseInt(o[1]))
                }
            })
        });
        var r = 0;
        return _.isEmpty(n) || (r = _.max(n)), parseInt(r) + 1
    }

    function u(e, t) {
        var n = [];
        _.map(t, function(e) {
            var t = e.element_id,
                r = t.split("-");
            n.push(parseInt(r[1]))
        });
        var r = 0;
        return _.isEmpty(n) || (r = _.max(n)), parseInt(r) + 1
    }

    function c(e) { return e = e.toLowerCase(), e = e.replace(/[^a-zA-Z0-9 ]/g, "").trim(), e = e.replace(/\s+/g, "-") }

    function p(e, t) { var n = 0; return t.map(function(t) { t.fields.map(function(t) { t.type === e && n++ }) }), n > 0 }

    function f(e, t) { var n = []; return t.map(function(t) { t.fields.map(function(t) { t.type === e && n.push(t) }) }), n }

    function d(e, t) { var n = []; return f(e, t).map(function(t) { var r = t.field_label; "address" === e && (r = t.element_id), n.push({ value: t.element_id, label: r, element_id: t.element_id }) }), n }

    function h(e, t) { var n = ""; return t.map(function(t) { t.fields.map(function(t) { t.element_id === e && (n = t.field_label) }) }), n }

    function m(e, t) { var n = 0; return t.map(function(t) { t.fields.map(function(t) { t.element_id === e && n++ }) }), n > 0 }

    function y(e, t, n, r) { var o = l(e.type, r); return _.extend(e, { element_id: e.type + "-" + o, formID: t, cols: n }) }

    function b(e, t, n) {
        var r = powerformData.fields.find(function(t) { return t.slug === e }),
            o = l(r.type, t);
        return _.extend({ element_id: r.type + "-" + o, type: r.type, options: r.options, cols: 12, conditions: {}, wrapper_id: n }, JSON.parse(JSON.stringify(r.defaults)))
    }

    function v(e) { return e.type }

    function g(e) { return powerformData.fields.find(function(t) { return t.type === e.type }) }

    function w(e, t, n) { return [].concat(r(e.slice(0, t)), [n], r(e.slice(t))) }

    function E(e, t, n) { return [].concat(r(e.slice(0, t)), [n], r(e.slice(t + 1))) }

    function O() { return G.default.translate.apply(null, arguments) }

    function j(e, t) { var n = _.filter(t, function(t) { return t.family === e }); return _.isUndefined(n[0]) || _.isUndefined(n[0].variants) ? [O("None")] : n[0].variants }

    function x(e) { return e.charAt(0).toUpperCase() + e.slice(1) }

    function P(e, t, n) {
        var r = [];
        _.isUndefined(t) && (t = ["page-break", "postdata", "total", "product", "captcha"]);
        var o = !1;
        return _.isUndefined(n) || _.isUndefined(n.main_date_field) || !0 !== n.main_date_field || (o = !0), e.map(function(e) {
            e.fields.map(function(e) {
                if (!_.contains(t, e.type)) {
                    var n = void 0;
                    _.isUndefined(e.field_label) || _.isEmpty(e.field_label) ? (n = e.type, n = x(n)) : n = e.field_label, "name" === e.type ? r = r.concat(N(e, n)) : "address" === e.type ? r = r.concat(R(e, n)) : "time" === e.type ? r = r.concat(F(e, n)) : "date" === e.type && "picker" !== e.field_type && !1 === o || r.push({ element_id: e.element_id, required: e.required, field_type: e.type, field_slug: e.type, label: n, values: M(e), hasOptions: A(e), hasCalcs: S(e), formula: T(e), isNumber: k(e), fieldData: e }), "date" === e.type && "picker" !== e.field_type && (r = r.concat(C(e, n)))
                }
            })
        }), r
    }

    function C(e, t) {
        var n = [],
            r = void 0;
        r = _.isUndefined(e.day_label) || _.isEmpty(e.day_label) ? t + " - " + O("Day") : t + " - " + e.day_label;
        var o = void 0;
        o = _.isUndefined(e.month_label) || _.isEmpty(e.month_label) ? t + " - " + O("Month") : t + " - " + e.month_label;
        var a = void 0;
        return a = _.isUndefined(e.year_label) || _.isEmpty(e.year_label) ? t + " - " + O("Year") : t + " - " + e.year_label, "input" === e.field_type ? n.push({ element_id: e.element_id + "-day", required: e.required, field_type: e.type, field_slug: e.type + "-day", label: r, values: !1, hasOptions: !1, isNumber: !0 }, { element_id: e.element_id + "-month", required: e.required, field_type: e.type, field_slug: e.type + "-month", label: o, values: !1, hasOptions: !1, isNumber: !0 }, { element_id: e.element_id + "-year", required: e.required, field_type: e.type, field_slug: e.type + "-year", label: a, values: !1, hasOptions: !1, isNumber: !0 }) : n.push({ element_id: e.element_id + "-day", required: e.required, field_type: e.type, field_slug: e.type + "-day", label: r, values: M(e), hasOptions: A(e), isNumber: k(e) }, { element_id: e.element_id + "-month", required: e.required, field_type: e.type, field_slug: e.type + "-month", label: o, values: M(e), hasOptions: A(e), isNumber: k(e) }, { element_id: e.element_id + "-year", required: e.required, field_type: e.type, field_slug: e.type + "-year", label: a, values: M(e), hasOptions: A(e), isNumber: k(e) }), n
    }

    function N(e, t) {
        var n = [];
        return "true" === e.multiple_name || !0 === e.multiple_name ? [{ attr: "prefix", label: "prefix_label", element_suffix: "prefix", hasOptions: !0, values: [{ label: "Mr.", value: "Mr" }, { label: "Mrs.", value: "Mrs" }, { label: "Ms.", value: "Ms" }, { label: "Miss", value: "Miss" }, { label: "Dr.", value: "Dr" }, { label: "Prof.", value: "Prof" }], isNumber: !1 }, { attr: "fname", label: "fname_label", element_suffix: "first-name", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "mname", label: "mname_label", element_suffix: "middle-name", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "lname", label: "lname_label", element_suffix: "last-name", hasOptions: !1, values: !1, isNumber: !1 }].map(function(r) {
            if ("true" === e[r.attr] || !0 === e[r.attr]) {
                var o = void 0;
                o = _.isUndefined(e[r.label]) || _.isEmpty(e[r.label]) ? t + " - " : t + " - " + e[r.label], n.push({ element_id: e.element_id + "-" + r.element_suffix, required: e.required, field_type: e.type, field_slug: e.type + "-" + r.element_suffix, label: o, values: r.values, hasOptions: r.hasOptions, isNumber: r.isNumber })
            }
        }) : n.push({ element_id: e.element_id, required: e.required, field_type: e.type, field_slug: e.type, label: t, values: M(e), hasOptions: A(e), isNumber: k(e) }), n
    }

    function k(e) { return "number" === e.type || "phone" === e.type || "calculation" === e.type }

    function S(e) { return "true" === e.calculations || !0 === e.calculations }

    function T(e) { return !!e.formula && e.formula }

    function A(e) { return "select" === e.type || "checkbox" === e.type || "radio" === e.type }

    function M(e) { var t = e.type; return ("select" === t || "checkbox" === t || "radio" === t) && e.options }

    function R(e, t) {
        var n = [];
        return [{ attr: "street_address", label: "street_address_label", element_suffix: "street_address", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_line", label: "address_line_label", element_suffix: "address_line", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_city", label: "address_city_label", element_suffix: "city", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_state", label: "address_state_label", element_suffix: "state", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_zip", label: "address_zip_label", element_suffix: "zip", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_country", label: "address_country_label", element_suffix: "country", hasOptions: !1, values: !1, isNumber: !1 }].map(function(r) {
            if ("true" === e[r.attr] || !0 === e[r.attr]) {
                var o = void 0;
                o = _.isUndefined(e[r.label]) || _.isEmpty(e[r.label]) ? t + " - " : t + " - " + e[r.label], n.push({ element_id: e.element_id + "-" + r.element_suffix, required: e.required, field_type: e.type, field_slug: e.type + "-" + r.element_suffix, label: o, values: r.values, hasOptions: r.hasOptions, isNumber: r.isNumber })
            }
        }), n
    }

    function F(e, t) {
        var n = [],
            r = void 0;
        r = _.isUndefined(e.hh_label) || _.isEmpty(e.hh_label) ? t + " - " + O("Hour") : t + " - " + e.hh_label;
        var o = void 0;
        return o = _.isUndefined(e.mm_label) || _.isEmpty(e.mm_label) ? t + " - " + O("Minute") : t + " - " + e.mm_label, n.push({ element_id: e.element_id + "-hours", required: e.required, field_type: e.type, field_slug: e.type + "-hours", label: r, values: !1, hasOptions: !1, isNumber: !0 }, { element_id: e.element_id + "-minutes", required: e.required, field_type: e.type, field_slug: e.type + "-minutes", label: o, values: !1, hasOptions: !1, isNumber: !0 }), "twelve" === e.time_type && n.push({ element_id: e.element_id + "-ampm", required: e.required, field_type: e.type, field_slug: e.type + "-ampm", label: t + "-AM/PM", values: [{ label: "AM", value: "am" }, { label: "PM", value: "pm" }], hasOptions: !0, isNumber: !1 }), n
    }

    function D(e) {
        var t = [],
            n = powerformData.fields.filter(function(t) { return t.type === e });
        return n.length < 1 ? [] : (n = n[0], _.isUndefined(n.autofill_settings) || (t = n.autofill_settings), t)
    }

    function U(e, t, n) {
        var r = _.isUndefined(n) ? "" : n;
        switch (e) {
            case "is":
                if ("checkbox" === t) return O("is having");
                if ("checkbox" !== t) return O("is");
            case "is_not":
                if ("checkbox" === t) return O("is not having");
                if ("checkbox" !== t) return O("is not");
            case "day_is":
                return O("day is");
            case "day_is_not":
                return O("day is not");
            case "month_is_not":
                return O("month is not");
            case "month_is":
                return O("month is");
            case "is_before":
                return O("is before");
            case "is_after":
                return O("is after");
            case "is_before_n_or_more_days":
                return O("is before %s or more days from current date").replace("%s", r);
            case "is_before_less_than_n_days":
                return O("is before less than %s days from current date").replace("%s", r);
            case "is_after_n_or_more_days":
                return O("is after %s or more days from current date").replace("%s", r);
            case "is_after_less_than_n_days":
                return O("is after less than %s days from current date").replace("%s", r);
            case "is_great":
                return O("is greater than");
            case "is_less":
                return O("is less than");
            case "contains":
                return O("contains");
            case "starts":
                return O("starts with");
            case "ends":
                return O("ends with");
            case "is_correct":
                return O("is correct");
            case "is_incorrect":
                return O("is incorrect");
            default:
                return "-"
        }
    }

    function I(e) {
        if (e.length < 6) return !1;
        if (e.indexOf("@", 1) < 0) return !1;
        var t = e.split("@", 2);
        if (!t[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) return !1;
        if (t[1].match(/\.{2,}/)) return !1;
        var n = t[1],
            r = n.split(".");
        if (r.length < 2) return !1;
        for (var o = r.length, a = 0; a < o; a++)
            if (!r[a].match(/^[a-z0-9-]+$/i)) return !1;
        return !0
    }

    function L() { "object" === W(window.SUI) && setTimeout(function() { SUI.suiAccordion(jQuery(".sui-accordion")), SUI.suiTabs(jQuery(".sui-tabs")), jQuery("select").not(".sui-select").not(".powerform-select").not(".powerform-time").not(".fui-multi-select").each(function() { SUI.suiSelect(jQuery(this)) }), jQuery("select.sui-select").not(".fui-multi-select").not(".custom-select2").each(function() { jQuery(this).SUIselect2({ dropdownCssClass: "sui-select-dropdown" }) }), SUI.loadCircleScore(jQuery(".sui-circle-score")), SUI.showHidePassword() }, 50) }

    function V(e) { var t = "none"; return W(e["results-behav"]) && W(e["results-style"]) && ("link_on" !== e["results-behav"] && "show_after" !== e["results-behav"] || (t = e["results-style"])), t }

    function q(e) { var t = []; return _.each(powerformData.fields, function(e) { "calculation" !== e.type && t.push(e.type) }), P(e, t) }

    function B(e, t) {
        t = _.defaults(t, { allowClear: !0, dropdownCssClass: "sui-select-dropdown" }), e.find("select.sui-select.fui-multi-select").each(function() {
            jQuery(this).attr("data-reorder") && jQuery(this).on("select2:select", function(e) {
                var t = e.params.data.element,
                    n = jQuery(t),
                    r = jQuery(this);
                r.append(n), r.trigger("change.select2")
            }), jQuery(this).SUIselect2(t)
        })
    }

    function $(e) { return "name" !== e.type || "true" !== e.multiple_name && !0 !== e.multiple_name ? "address" === e.type ? !!(e.street_address_required || e.address_line_required || e.address_city_required || e.address_state_required || e.address_zip_required || e.address_country_required) : e.required : !!(e.prefix_required || e.fname_required || e.mname_required || e.lname_required) }

    function z(e, t, n, r) { var o = 0; return e.map(function(e) { e.fields.map(function(e) { t === e.type && r === e[n] && o++ }) }), o > 0 }

    function H(e) {
        var t = 0;
        return e.map(function(e) {
            e.fields.map(function(e) {
                var n = powerformData.postCategories[e.post_type];
                void 0 !== n && n.map(function(n) {
                    var r = n.value + "_multiple";
                    1 === parseInt(e[r]) && t++
                })
            })
        }), t > 0
    }

    function Q(e, t) {
        var n = e.slug,
            r = [];
        return _.isEmpty(t) || (_.each(t, function(e, t) { _.isEmpty(e.answers) || _.each(e.answers, function(t, o) { t.result === n && r.push({ title: e.title, slug: e.slug, question: e }) }) }), r = _.uniq(r, "slug")), r
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var W = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
    t.randNumber = o, t.generateWrapperId = a, t.getWrapper = i, t.countFieldsByType = s, t.getMaxIDByType = l, t.getMaxID = u, t.generateValue = c, t.hasFieldType = p, t.getFieldsByType = f, t.mapFieldsByType = d, t.getFieldLabel = h, t.fieldExist = m, t.buildFieldObject = y, t.buildFieldObjectFromSlug = b, t.getFieldType = v, t.getPowerformField = g, t.insertInPosition = w, t.replaceInPosition = E, t.translate = O, t.getFontVariants = j, t.ucfirst = x, t.getFields = P, t.getDateFields = C, t.getNameFields = N, t.fieldHasNumber = k, t.fieldHasCalcs = S, t.fieldFormula = T, t.fieldHasOptions = A, t.getFieldValues = M, t.getAddressFields = R, t.getTimeFields = F, t.getFieldAutofillProviders = D, t.getRuleLabel = U, t.isEmailWp = I, t.suiDelegateEvents = L, t.getChartType = V, t.getCalculationFields = q, t.select2Tags = B, t.isFieldRequired = $, t.hasFieldWithAttribute = z, t.hasPostdataFieldWithMultiselect = H, t.getPersonalityQuestions = Q;
    var Y = n(60),
        G = function(e) { return e && e.__esModule ? e : { default: e } }(Y)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = function(e) { return e && e.__esModule ? e : { default: e } }(l),
        c = n(1),
        p = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return a(t, e), s(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, { key: "isValid", value: function(e) { return this.props.isRequired ? this.props.isRequired && !_.isEmpty(e) : !!_.isUndefined(this.props.isPositive) || (_.isEmpty(e) || e >= 0) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.type) ? "text" : this.props.type,
                        r = _.isUndefined(this.props.requiredError) ? (0, c.translate)("This field is required!") : this.props.requiredError,
                        o = this.isValid(t) ? "" : "sui-form-field-error",
                        a = _.isUndefined(this.props.fieldClass) ? "sui-form-field" : "sui-form-field " + this.props.fieldClass,
                        s = _.isUndefined(this.props.inputClass) ? "sui-form-control" : "sui-form-control " + this.props.inputClass,
                        l = _.isUndefined(this.props.inputId) ? this.props.property : this.props.inputId,
                        p = void 0;
                    this.props.label && (p = u.default.createElement("label", { htmlFor: "powerform-field-" + l, className: this.props.darkLabel ? "sui-settings-label sui-dark" : "sui-label" }, this.props.label, this.props.isRequired && u.default.createElement(u.default.Fragment, null, " ", u.default.createElement("span", { className: "sui-error" }, "*")), this.props.note && u.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var f = u.default.createElement("input", i({ type: n, placeholder: this.props.placeholder, value: t || "", id: "powerform-field-" + l, className: s }, this.props.notWritable && { readonly: "" }, this.props.minValue && { min: this.props.minValue }, this.props.maxValue && { max: this.props.maxValue }, this.props.maxLength && { maxlength: this.props.maxLength }, this.props.inputStyles && { style: this.props.inputStyles }, { disabled: !!this.props.disabled, onChange: function(t) { e.updateValue(t.target.value) } })),
                        d = u.default.createElement("div", { className: a + " " + o }, p, this.props.canTrash ? u.default.createElement("div", { className: "sui-with-button sui-with-button-icon" }, f, u.default.createElement("button", { className: "sui-button-icon sui-tooltip sui-tooltip-top-right", "data-tooltip": (0, c.translate)("Delete") }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }))) : f, this.props.suffix && u.default.createElement("span", { className: "sui-field-suffix" }, this.props.suffix), this.props.isRequired && !this.isValid(t) && u.default.createElement("span", { className: "sui-error-message" }, r), !_.isUndefined(this.props.isPositive) && !this.isValid(t) && u.default.createElement("span", { className: "sui-error-message" }, (0, c.translate)("Please enter valid number.")), this.props.description && u.default.createElement("span", { className: "sui-description" }, this.props.description));
                    return this.props.simple ? f : d
                }
            }]), t
        }(l.Component);
    t.default = p
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{ key: "render", value: function() { var e = l.default.Children.map(this.props.children, function(e) { return e }); return l.default.createElement("div", null, e) } }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{
                key: "render",
                value: function() {
                    var e = l.default.Children.map(this.props.children, function(e) { return e }),
                        t = this.props.customClass ? this.props.customClass : "";
                    return l.default.createElement("div", { className: "sui-col-md-" + this.props.cols + " " + t }, e)
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) { e.exports = n(84)() }, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{ key: "toggleValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, { key: "getDefaultValue", value: function() { var e = this.props.default ? this.props.default : ""; return _.isUndefined(this.props.settings[this.props.property]) ? e : this.props.settings[this.props.property] } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.getDefaultValue(),
                        n = l.default.Children.map(this.props.children, function(n) { if (!n) return l.default.createElement(l.default.Fragment, null); var r = _.isUndefined(n.props.label) ? n.props.children : n.props.label; return l.default.createElement("div", { className: "sui-tab-item" + (n.props.value === t ? " active" : ""), onClick: e.toggleValue.bind(e, n.props.value) }, r) }),
                        r = _.isUndefined(this.props.divClass) ? "sui-tabs-content" : "sui-tabs-content " + this.props.divClass,
                        o = l.default.Children.map(this.props.children, function(e) { if (!e) return l.default.createElement(l.default.Fragment, null); var n = _.isUndefined(e.props.boxClass) ? "" : e.props.boxClass; return "Empty" !== e.type.name ? l.default.createElement("div", { className: n + " sui-tab-content" + (e.props.value === t ? " active" : "") }, e.props.value === t && e) : l.default.createElement(l.default.Fragment, null) }),
                        a = "";
                    this.props.label && "" !== this.props.label && (a = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, this.props.note && l.default.createElement("span", { className: "sui-label-note" }, " ", this.props.note)));
                    var i = "";
                    this.props.settingsLabel && "" !== this.props.settingsLabel && (i = l.default.createElement("label", { className: "sui-settings-label" }, this.props.settingsLabel));
                    var s = "";
                    !this.props.label && this.props.settingsDesc && (s = l.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.settingsDesc));
                    var u = l.default.createElement("div", { className: "sui-side-tabs" }, l.default.createElement("div", { className: "sui-tabs-menu" }, n), l.default.createElement("div", { className: r }, o));
                    return this.props.simple || (u = l.default.createElement("div", { className: "sui-form-field" }, i, a, s, l.default.createElement("div", { className: "sui-side-tabs" }, l.default.createElement("div", { className: "sui-tabs-menu" }, n), l.default.createElement("div", { className: r }, o)))), u
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(83),
        o = n(48),
        a = n(87);
    n.d(t, "Provider", function() { return r.b }), n.d(t, "createProvider", function() { return r.a }), n.d(t, "connectAdvanced", function() { return o.a }), n.d(t, "connect", function() { return a.a })
}, function(e, t, n) {
    "use strict";

    function r(e) { if ("object" !== (void 0 === e ? "undefined" : h(e)) || null === e) return !1; for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t); return Object.getPrototypeOf(e) === t }

    function o(e, t, n) {
        function a() { v === b && (v = b.slice()) }

        function i() { if (g) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."); return y }

        function s(e) {
            if ("function" != typeof e) throw new Error("Expected the listener to be a function.");
            if (g) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
            var t = !0;
            return a(), v.push(e),
                function() {
                    if (t) {
                        if (g) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                        t = !1, a();
                        var n = v.indexOf(e);
                        v.splice(n, 1)
                    }
                }
        }

        function l(e) {
            if (!r(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (g) throw new Error("Reducers may not dispatch actions.");
            try { g = !0, y = m(y, e) } finally { g = !1 }
            for (var t = b = v, n = 0; n < t.length; n++) {
                (0, t[n])()
            }
            return e
        }

        function u(e) {
            if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
            m = e, l({ type: d.REPLACE })
        }

        function c() {
            var e, t = s;
            return e = {
                subscribe: function(e) {
                    function n() { e.next && e.next(i()) }
                    if ("object" !== (void 0 === e ? "undefined" : h(e)) || null === e) throw new TypeError("Expected the observer to be an object.");
                    return n(), { unsubscribe: t(n) }
                }
            }, e[f.a] = function() { return this }, e
        }
        var p;
        if ("function" == typeof t && void 0 === n && (n = t, t = void 0), void 0 !== n) { if ("function" != typeof n) throw new Error("Expected the enhancer to be a function."); return n(o)(e, t) }
        if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
        var m = e,
            y = t,
            b = [],
            v = b,
            g = !1;
        return l({ type: d.INIT }), p = { dispatch: l, subscribe: s, getState: i, replaceReducer: u }, p[f.a] = c, p
    }

    function a(e, t) { var n = t && t.type; return "Given " + (n && 'action "' + String(n) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.' }

    function i(e) { Object.keys(e).forEach(function(t) { var n = e[t]; if (void 0 === n(void 0, { type: d.INIT })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."); if (void 0 === n(void 0, { type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".") })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + d.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.') }) }

    function s(e) {
        for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) { var o = t[r]; "function" == typeof e[o] && (n[o] = e[o]) }
        var s = Object.keys(n),
            l = void 0;
        try { i(n) } catch (e) { l = e }
        return function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            if (l) throw l;
            for (var r = !1, o = {}, i = 0; i < s.length; i++) {
                var u = s[i],
                    c = n[u],
                    p = e[u],
                    f = c(p, t);
                if (void 0 === f) { var d = a(u, t); throw new Error(d) }
                o[u] = f, r = r || f !== p
            }
            return r ? o : e
        }
    }

    function l(e, t) { return function() { return t(e.apply(this, arguments)) } }

    function u(e, t) {
        if ("function" == typeof e) return l(e, t);
        if ("object" !== (void 0 === e ? "undefined" : h(e)) || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : void 0 === e ? "undefined" : h(e)) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        for (var n = Object.keys(e), r = {}, o = 0; o < n.length; o++) {
            var a = n[o],
                i = e[a];
            "function" == typeof i && (r[a] = l(i, t))
        }
        return r
    }

    function c() { for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n]; return 0 === t.length ? function(e) { return e } : 1 === t.length ? t[0] : t.reduce(function(e, t) { return function() { return e(t.apply(void 0, arguments)) } }) }

    function p() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return function(e) {
            return function() {
                for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                var a = e.apply(void 0, r),
                    i = function() { throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.") },
                    s = { getState: a.getState, dispatch: function() { return i.apply(void 0, arguments) } },
                    l = t.map(function(e) { return e(s) });
                return i = c.apply(void 0, l)(a.dispatch), m({}, a, { dispatch: i })
            }
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), n.d(t, "createStore", function() { return o }), n.d(t, "combineReducers", function() { return s }), n.d(t, "bindActionCreators", function() { return u }), n.d(t, "applyMiddleware", function() { return p }), n.d(t, "compose", function() { return c }), n.d(t, "__DO_NOT_USE__ActionTypes", function() { return d });
    var f = n(90),
        d = { INIT: "@@redux/INIT" + Math.random().toString(36).substring(7).split("").join("."), REPLACE: "@@redux/REPLACE" + Math.random().toString(36).substring(7).split("").join(".") },
        h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        m = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{ key: "render", value: function() { var e = l.default.Children.map(this.props.children, function(e) { return e }); return l.default.createElement("div", { className: "sui-row" + (_.isUndefined(this.props.class) ? "" : " " + this.props.class) }, e) } }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return a(t, e), i(t, [{
                key: "componentDidMount",
                value: function() {
                    this.$el = jQuery(this.el), this.$el.wpColorPicker({ change: function(e, t) { jQuery(this).val(t.color.toCSS()).trigger("change") }, palettes: ["#333333", "#FFFFFF", "#17A8E3", "#E1F6FF", "#666666", "#AAAAAA", "#E6E6E6"] });
                    var e = this.$el,
                        t = e.closest(".sui-colorpicker-wrap"),
                        n = t.find(".sui-colorpicker-value span[role=button]"),
                        r = t.find(".sui-colorpicker-value"),
                        o = r.find("button"),
                        a = e.closest(".wp-picker-container"),
                        i = a.find(".wp-color-result"),
                        s = i.find(".color-alpha"),
                        l = a.find(".wp-picker-clear"),
                        u = s;
                    u = !0 === e.data("alpha") ? s : i, e.bind("change", function() { n.find("span").css({ "background-color": u.css("background-color") }), r.find("input").val(e.val()) }), t.find(".sui-button, span[role=button]").on("click", function(e) { e.preventDefault(), e.stopPropagation(), i.click() }), o.on("click", function(e) { e.preventDefault(), e.stopPropagation(), l.click(), r.find("input").val(""), n.find("span").css({ "background-color": "" }) }), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue)
                }
            }, { key: "updateValue", value: function(e) { var t = e.target.value; "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, t) : this.props.actions.settingsActions.updateSetting(this.props.property, t) } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) || null === this.props.settings[this.props.property] ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = "";
                    return this.props.label && (n = l.default.createElement("label", { className: "sui-label", htmlFor: "powerform-color-" + this.props.property }, this.props.label, this.props.note && l.default.createElement("span", { className: "sui-label-note" }, " ", this.props.note))), l.default.createElement("div", { className: "sui-form-field" }, n, l.default.createElement("div", { className: "sui-colorpicker-wrap" }, l.default.createElement("div", { className: "sui-colorpicker sui-colorpicker-" + (this.props.isAlpha ? "rgba" : "hex"), "aria-hidden": "true" }, l.default.createElement("div", { className: "sui-colorpicker-value" }, l.default.createElement("span", { role: "button" }, l.default.createElement("span", { style: { backgroundColor: t } })), l.default.createElement("input", { type: "text", defaultValue: t, readOnly: "readonly" }), l.default.createElement("button", null, l.default.createElement("i", { className: "sui-icon-close", "aria-hidden": "true" }))), l.default.createElement("button", { className: "sui-button" }, (0, u.translate)("Select"))), l.default.createElement("input", { ref: function(t) { return e.el = t }, defaultValue: t, id: "powerform-color-" + this.props.property, className: "sui-colorpicker-input", "data-alpha": this.props.isAlpha ? "true" : "false" })), this.props.description && "" !== this.props.description && l.default.createElement("span", { className: "sui-description" }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return "[object Array]" === j.call(e) }

    function o(e) { return "[object ArrayBuffer]" === j.call(e) }

    function a(e) { return "undefined" != typeof FormData && e instanceof FormData }

    function i(e) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer }

    function s(e) { return "string" == typeof e }

    function l(e) { return "number" == typeof e }

    function u(e) { return void 0 === e }

    function c(e) { return null !== e && "object" == typeof e }

    function p(e) { return "[object Date]" === j.call(e) }

    function f(e) { return "[object File]" === j.call(e) }

    function d(e) { return "[object Blob]" === j.call(e) }

    function h(e) { return "[object Function]" === j.call(e) }

    function m(e) { return c(e) && h(e.pipe) }

    function y(e) { return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams }

    function b(e) { return e.replace(/^\s*/, "").replace(/\s*$/, "") }

    function v() { return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document) }

    function g(e, t) {
        if (null !== e && void 0 !== e)
            if ("object" != typeof e && (e = [e]), r(e))
                for (var n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
            else
                for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.call(null, e[a], a, e)
    }

    function _() {
        function e(e, n) { "object" == typeof t[n] && "object" == typeof e ? t[n] = _(t[n], e) : t[n] = e }
        for (var t = {}, n = 0, r = arguments.length; n < r; n++) g(arguments[n], e);
        return t
    }

    function w(e, t, n) { return g(t, function(t, r) { e[r] = n && "function" == typeof t ? E(t, n) : t }), e }
    var E = n(69),
        O = n(151),
        j = Object.prototype.toString;
    e.exports = { isArray: r, isArrayBuffer: o, isBuffer: O, isFormData: a, isArrayBufferView: i, isString: s, isNumber: l, isObject: c, isUndefined: u, isDate: p, isFile: f, isBlob: d, isFunction: h, isStream: m, isURLSearchParams: y, isStandardBrowserEnv: v, forEach: g, merge: _, extend: w, trim: b }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return a(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), SUI.suiSelect(this.$el), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue) } }, { key: "updateValue", value: function(e) { var t = e.target.value; "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, t) : this.props.actions.settingsActions.updateSetting(this.props.property, t) } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.fieldClass) ? "sui-form-field" : "sui-form-field " + this.props.fieldClass,
                        r = _.isUndefined(this.props.elementClass) ? "" : this.props.elementClass,
                        o = _.isUndefined(this.props.elementId) ? this.props.property : this.props.elementId,
                        a = "";
                    this.props.label && (a = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, id: "powerform-field-" + this.props.property + "-label", className: "sui-label" }, this.props.label, " ", this.props.required && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var i = l.default.createElement("select", { defaultValue: t, id: "powerform-field-" + o, className: r, "aria-labelledby": "powerform-field-" + o + "-label", ref: function(t) { return e.el = t } }, this.props.children),
                        s = i;
                    "md" === this.props.fieldSize || "medium" === this.props.fieldSize ? s = l.default.createElement("div", { class: "sui-form-field sui-input-md" }, i) : "sm" === this.props.fieldSize || "small" === this.props.fieldSize ? s = l.default.createElement("div", { class: "sui-form-field sui-input-sm" }, i) : "" !== this.props.fieldSize && (s = l.default.createElement("div", { style: { width: "100%", maxWidth: this.props.fieldSize + "px" } }, i));
                    var u = s;
                    return this.props.simple || (u = l.default.createElement("div", { className: n }, a, s, this.props.description && l.default.createElement("span", { className: "sui-description", style: { marginTop: "10px" } }, this.props.description))), u
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r() { return "" }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;
    var o = n(0);
    ! function(e) { e && e.__esModule }(o)
}, function(e, t, n) {
    "use strict";
    var r = function(e, t, n, r, o, a, i, s) {
        if (!e) {
            var l;
            if (void 0 === t) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var u = [n, r, o, a, i, s],
                    c = 0;
                l = new Error(t.replace(/%s/g, function() { return u[c++] })), l.name = "Invariant Violation"
            }
            throw l.framesToPop = 1, l
        }
    };
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { active: n.props.default ? n.props.default : "" }, n }
            return a(t, e), i(t, [{ key: "toggleValue", value: function(e) { this.setState({ active: e }) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = (this.props.default && this.props.default, this.props.type ? this.props.type : "side-tabs"),
                        n = this.props.extraClass ? this.props.extraClass : "",
                        r = l.default.Children.map(this.props.children, function(t) { if (!_.isUndefined(t) && !_.isNull(t)) return l.default.createElement("div", { className: "powerform-toggle sui-tab-item" + (t.props.value === e.state.active ? " active" : ""), onClick: e.toggleValue.bind(e, t.props.value) }, t.props.label, " ", t.props.required && l.default.createElement("span", { className: "sui-error" }, "*")) }),
                        o = l.default.Children.map(this.props.children, function(t) { if (!_.isUndefined(t) && !_.isNull(t)) { var n = _.isUndefined(t.props.boxClass) ? "sui-tab-content" : t.props.boxClass; return l.default.createElement("div", { className: n + (t.props.value === e.state.active ? " active" : "") }, t.props.value === e.state.active && t) } });
                    return l.default.createElement("div", { className: "sui-" + t + " " + n }, l.default.createElement("div", { className: "sui-tabs-menu" }, r), l.default.createElement("div", { className: "sui-tabs-content" }, o))
                }
            }]), t
        }(s.Component);
    t.default = u
}, , function(e, t, n) {
    "use strict";
    var r = function() {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = function(e) { return e && e.__esModule ? e : { default: e } }(l),
        c = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), s(t, [{
                key: "updateValue",
                value: function(e) {
                    if ("function" == typeof this.props.updateProperty) {
                        if (this.props.updateProperty(this.props.property, e), "true" === this.props.clearOptions && "single" === e) {
                            var t = [];
                            _.each(this.props.state.options, function(e) { e.default = !1, t.push(e) }), this.props.updateProperty("options", t)
                        }
                    } else this.props.actions.settingsActions.updateSetting(this.props.property, e)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = u.default.Children.map(this.props.children, function(n) { return u.default.createElement("button", i({ id: "tab-option-" + n.props.value, role: "tab", className: "powerform-toggle sui-tab-item " + (n.props.value === t ? "active" : ""), "aria-selected": n.props.value === t ? "true" : "false" }, n.props.value !== t && { tabIndex: "-1" }, { onClick: e.updateValue.bind(e, n.props.value) }), n.props.children) }),
                        r = "";
                    this.props.label && "" !== this.props.label && (r = u.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, this.props.note && u.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var o = "";
                    this.props.description && "" !== this.props.description && (o = u.default.createElement("span", { className: "sui-description" }, this.props.description));
                    var a = "";
                    !this.props.label && this.props.settingsLabel && (a = u.default.createElement("label", { className: "sui-settings-label" }, this.props.settingsLabel));
                    var s = "";
                    !this.props.label && this.props.settingsDesc && (s = u.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.settingsDesc));
                    var l = u.default.createElement("div", { className: "sui-side-tabs", style: this.props.description && { marginBottom: "5px" } }, u.default.createElement("div", { className: "sui-tabs-menu", role: "tablist" }, n)),
                        c = u.default.createElement(u.default.Fragment, null, r, l);
                    return this.props.noWrapper || (c = u.default.createElement("div", { className: "sui-form-field" }, r, a, s, l, o)), c
                }
            }]), t
        }(l.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(106);
    n.d(t, "BrowserRouter", function() { return r.a });
    var o = n(112);
    n.d(t, "HashRouter", function() { return o.a });
    var a = n(55);
    n.d(t, "Link", function() { return a.a });
    var i = n(113);
    n.d(t, "MemoryRouter", function() { return i.a });
    var s = n(115);
    n.d(t, "NavLink", function() { return s.a });
    var l = n(117);
    n.d(t, "Prompt", function() { return l.a });
    var u = n(119);
    n.d(t, "Redirect", function() { return u.a });
    var c = n(56);
    n.d(t, "Route", function() { return c.a });
    var p = n(36);
    n.d(t, "Router", function() { return p.a });
    var f = n(121);
    n.d(t, "StaticRouter", function() { return f.a });
    var d = n(123);
    n.d(t, "Switch", function() { return d.a });
    var h = n(125);
    n.d(t, "generatePath", function() { return h.a });
    var m = n(126);
    n.d(t, "matchPath", function() { return m.a });
    var y = n(127);
    n.d(t, "withRouter", function() { return y.a })
}, function(e, t, n) {
    "use strict";
    var r = n(107);
    n.d(t, "a", function() { return r.a });
    var o = n(110);
    n.d(t, "b", function() { return o.a });
    var a = n(111);
    n.d(t, "d", function() { return a.a });
    var i = n(29);
    n.d(t, "c", function() { return i.a }), n.d(t, "f", function() { return i.b });
    var s = n(25);
    n.d(t, "e", function() { return s.b })
}, , function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.afterSave = n.afterSave.bind(n), n }
            return a(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el); var e = Object.assign({ dropdownCssClass: "sui-select-dropdown" }, this.props.options); "function" == typeof this.$el.SUIselect2 ? this.$el.SUIselect2(e) : "function" == typeof this.$el.FUIselect2 ? this.$el.FUIselect2(e) : console.log("select2 not intiated"), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue) } }, { key: "updateValue", value: function(e) { var t = jQuery(e.target).val(); "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, t) : this.props.actions.settingsActions.updateSetting(this.props.property, t), this.afterSave(t) } }, { key: "afterSave", value: function() { return !1 } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.fieldClass) ? "sui-form-field" : "sui-form-field " + this.props.fieldClass,
                        r = void 0;
                    this.props.label && (r = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, " ", this.props.required && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var o = this.props.multiple,
                        a = l.default.createElement("select", { id: "powerform-field-" + this.props.property, className: "sui-select", ref: function(t) { return e.el = t }, defaultValue: t, multiple: o }, this.props.children),
                        i = l.default.createElement("select", { id: "powerform-field-" + this.props.property, className: "sui-select", ref: function(t) { return e.el = t }, defaultValue: t, multiple: o }, this.props.children);
                    return "md" === this.props.fieldSize || "medium" === this.props.fieldSize ? i = l.default.createElement("div", { className: "sui-form-field sui-input-md" }, a) : "sm" === this.props.fieldSize || "small" === this.props.fieldSize ? i = l.default.createElement("div", { className: "sui-form-field sui-input-sm" }, a) : "" === this.props.fieldSize && (i = l.default.createElement("div", { style: { width: "100%", maxWidth: this.props.fieldSize + "px" } }, a)), this.props.noWrapper ? a : l.default.createElement("div", { className: n }, r, i, this.props.description && l.default.createElement("span", { className: "sui-description", style: { marginTop: "10px" } }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = u
}, , , function(e, t, n) {
    "use strict";
    n.d(t, "a", function() { return r }), n.d(t, "f", function() { return o }), n.d(t, "c", function() { return a }), n.d(t, "e", function() { return i }), n.d(t, "g", function() { return s }), n.d(t, "d", function() { return l }), n.d(t, "b", function() { return u });
    var r = function(e) { return "/" === e.charAt(0) ? e : "/" + e },
        o = function(e) { return "/" === e.charAt(0) ? e.substr(1) : e },
        a = function(e, t) { return new RegExp("^" + t + "(\\/|\\?|#|$)", "i").test(e) },
        i = function(e, t) { return a(e, t) ? e.substr(t.length) : e },
        s = function(e) { return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e },
        l = function(e) {
            var t = e || "/",
                n = "",
                r = "",
                o = t.indexOf("#"); - 1 !== o && (r = t.substr(o), t = t.substr(0, o));
            var a = t.indexOf("?");
            return -1 !== a && (n = t.substr(a), t = t.substr(0, a)), { pathname: t, search: "?" === n ? "" : n, hash: "#" === r ? "" : r }
        },
        u = function(e) {
            var t = e.pathname,
                n = e.search,
                r = e.hash,
                o = t || "/";
            return n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r), o
        }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return a(t, e), i(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? "" : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.customClass) ? "sui-form-control" : this.props.customClass,
                        r = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-toggle" }, l.default.createElement("input", { type: "checkbox", value: "true", id: "powerform-field-" + this.props.property, className: n, checked: t ? "checked" : "", onChange: function(t) { e.updateValue(t.target.checked) } }), l.default.createElement("span", { className: "sui-toggle-slider" }), this.props.label && l.default.createElement("span", { className: "sui-screen-reader-text" }, (0, u.translate)("Enable"), " ", this.props.label)),
                        o = "";
                    return this.props.label && (o = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property }, this.props.label)), this.props.unWrap ? l.default.createElement(l.default.Fragment, null, r, o, this.props.description && l.default.createElement("span", { className: "sui-description sui-toggle-description" }, this.props.description)) : this.props.unWrap ? void 0 : l.default.createElement("div", { className: "sui-form-field" }, r, o, this.props.description && l.default.createElement("span", { className: "sui-description sui-toggle-description" }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = c
}, , function(e, t, n) {
    "use strict";
    var r = function() {};
    e.exports = r
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() { return s }), n.d(t, "b", function() { return l });
    var r = n(108),
        o = n(109),
        a = n(25),
        i = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        s = function(e, t, n, o) { var s = void 0; "string" == typeof e ? (s = Object(a.d)(e), s.state = t) : (s = i({}, e), void 0 === s.pathname && (s.pathname = ""), s.search ? "?" !== s.search.charAt(0) && (s.search = "?" + s.search) : s.search = "", s.hash ? "#" !== s.hash.charAt(0) && (s.hash = "#" + s.hash) : s.hash = "", void 0 !== t && void 0 === s.state && (s.state = t)); try { s.pathname = decodeURI(s.pathname) } catch (e) { throw e instanceof URIError ? new URIError('Pathname "' + s.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e } return n && (s.key = n), o ? s.pathname ? "/" !== s.pathname.charAt(0) && (s.pathname = Object(r.a)(s.pathname, o.pathname)) : s.pathname = o.pathname : s.pathname || (s.pathname = "/"), s },
        l = function(e, t) { return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Object(o.a)(e.state, t.state) }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = (function(e) { e && e.__esModule }(s), function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{ key: "initialize", value: function() { jQuery("#powerform-notification").length ? (jQuery("#powerform-notification").remove(), this.initialize()) : jQuery("main.sui-wrap").append('<div id="powerform-notification" class="sui-notice-top sui-notice-' + this.props.type + ' sui-can-dismiss"><div class="sui-notice-content"><p>' + this.props.text + '</p></div><span class="sui-notice-dismiss"><a role="button" href="#" aria-label="Dismiss" class="sui-icon-check"></a></span></div>'), this.$notification = jQuery("#powerform-notification") } }, {
                key: "open",
                value: function() {
                    this.initialize();
                    var e = this;
                    jQuery(".sui-notice-dismiss a").click(function(t) { return t.preventDefault(), e.close(), !1 }), _.isUndefined(this.props.time) || setTimeout(function() { e.close() }, this.props.time)
                }
            }, { key: "close", value: function() { jQuery("#powerform-notification").stop().slideUp("slow") } }]), t
        }(s.Component));
    t.default = l
}, , function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.updateEditor = n.updateEditor.bind(n), n.toggleOptions = n.toggleOptions.bind(n), n.state = { editorOptionsOpen: !1 }, n }
            return a(t, e), i(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.$el = jQuery(this.el), setTimeout(function() { e.initEditor() }, 50)
                }
            }, {
                key: "initEditor",
                value: function() {
                    var e = this;
                    if (_.isUndefined(wp.editor) || "undefined" == typeof tinyMCE) return void setTimeout(function() { e.initEditor() }, 50);
                    _.isUndefined(this.props.cutomTinymce) ? wp.editor.initialize("powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : ""), { tinymce: !0, quicktags: !0 }) : wp.editor.initialize("powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : ""), { tinymce: { toolbar1: this.props.cutomTinymce }, quicktags: !0 }), this.bindEvents()
                }
            }, {
                key: "bindEvents",
                value: function() {
                    var e = this;
                    if (this.editor = tinyMCE.get("powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : "")), null === this.editor) return void setTimeout(function() { e.bindEvents() }, 50);
                    this.editor.on("keyup", this.updateEditor), this.editor.on("change", this.updateEditor)
                }
            }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateEditor), wp.editor.remove("powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : "")), this.$el.unbind().removeData() } }, {
                key: "updateEditor",
                value: function() {
                    var e = this.editor.getContent();
                    this.updateValue(e)
                }
            }, { key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, { key: "toggleOptions", value: function() { this.state.editorOptionsOpen ? this.setState({ editorOptionsOpen: !1 }) : this.setState({ editorOptionsOpen: !0 }) } }, { key: "insertContent", value: function(e) { this.editor.insertContent("{" + e + "}"), this.toggleOptions() } }, { key: "getDisabledFields", value: function() { var e = ["captcha", "product", "hidden", "page-break", "postdata", "total", "upload", "stripe", "paypal", "password"]; return !_.isUndefined(this.props.enablePostData) && this.props.enablePostData && !_.isUndefined(this.props.enableUpload) && this.props.enableUpload && (e = ["captcha", "product", "hidden", "page-break", "total", "stripe", "paypal", "password"]), e } }, { key: "getFields", value: function() { var e = this.getDisabledFields(); return (0, u.getFields)(this.props.wrappers, e) } }, {
                key: "getFormData",
                value: function() {
                    var e = this,
                        t = this.getFields(),
                        n = _.map(t, function(t, n) { if (t.required) return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, t.element_id) }, t.label)) }),
                        r = _.isUndefined(this.props.settings.type) ? "" : this.props.settings.type,
                        o = _.map(t, function(t, n) { if (!t.required && r !== t.field_type) return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, t.element_id) }, t.label)) });
                    return l.default.createElement(l.default.Fragment, null, n && l.default.createElement(l.default.Fragment, null, l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, (0, u.translate)("Required Fields"))), l.default.createElement(l.default.Fragment, null, n)), !_.isUndefined(o[0]) && o && l.default.createElement(l.default.Fragment, null, l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, (0, u.translate)("Optional Fields"))), l.default.createElement(l.default.Fragment, null, o)))
                }
            }, {
                key: "getMiscData",
                value: function() {
                    var e = this,
                        t = _.isEmpty(this.props.editorOptions) ? [] : this.props.editorOptions;
                    return l.default.createElement(l.default.Fragment, null, l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, (0, u.translate)("Misc Data"))), _.map(t, function(t, n) { return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, n) }, t)) }))
                }
            }, {
                key: "getPaymentData",
                value: function() {
                    var e = this,
                        t = (0, u.getFieldsByType)("paypal", this.props.wrappers),
                        n = (0, u.getFieldsByType)("stripe", this.props.wrappers),
                        r = _.isEmpty(this.props.paymentOptions) ? [] : this.props.paymentOptions;
                    if (!_.isEmpty(t) || !_.isEmpty(n)) return l.default.createElement(l.default.Fragment, null, this.props.paymentOptions && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, (0, u.translate)("Payment Data"))), _.map(r, function(t, n) { return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, n) }, t)) }))
                }
            }, {
                key: "getEditorOptions",
                value: function() {
                    var e = this;
                    if (this.props.hideEditorOptions) return "";
                    var t = this.props.disableMiscData ? "" : this.getMiscData(),
                        n = this.props.enableFormData ? this.getPaymentData() : "",
                        r = this.props.enableFormData ? this.getFormData() : "",
                        o = this.props.mainOptions ? this.props.mainOptions : { form_name: (0, u.translate)("Form Name") };
                    return l.default.createElement("ul", { className: this.state.editorOptionsOpen ? "sui-active" : "" }, this.props.enableAllFormFields && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("a", { className: "psource-insert-content", onClick: this.insertContent.bind(this, "all_fields") }, (0, u.translate)("All Form Fields"))), this.props.enableAllNonFormFields && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("a", { className: "psource-insert-content", onClick: this.insertContent.bind(this, "all_non_empty_fields") }, (0, u.translate)("All Non Empty Fields"))), r, l.default.createElement(l.default.Fragment, null, this.props.mainOptionsLabel && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, this.props.mainOptionsLabel)), _.map(o, function(t, n) { return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, n) }, t)) })), t, n)
                }
            }, { key: "isValid", value: function(e) { return this.props.isRequired ? this.props.isRequired && !_.isEmpty(e) : !!_.isUndefined(this.props.isPositive) || (_.isEmpty(e) || e >= 0) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? "" : this.props.settings[this.props.property],
                        n = this.getEditorOptions(),
                        r = _.isUndefined(this.props.requiredError) ? (0, u.translate)("This field is required!") : this.props.requiredError,
                        o = this.isValid(t) ? "" : "sui-form-field-error",
                        a = void 0;
                    _.isEmpty(n) || (a = l.default.createElement("div", { className: "sui-editor-options" }, l.default.createElement("button", { className: this.state.editorOptionsOpen ? "sui-tooltip sui-active" : "sui-tooltip", "data-tooltip": (0, u.translate)("Add form data"), onClick: this.toggleOptions }, l.default.createElement("i", { className: "sui-icon-layout sui-sm", "aria-hidden": "true" })), n));
                    var i = "";
                    return this.props.label && (i = l.default.createElement("label", { htmlFor: "powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : ""), className: "sui-label" }, this.props.label, " ", this.props.isRequired && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note))), l.default.createElement("div", { className: "sui-form-field " + o }, i, this.props.descriptionTop && l.default.createElement("span", { className: "sui-description", style: { marginBottom: "20px" } }, this.props.descriptionTop), l.default.createElement("div", { className: "sui-editor" + (_.isEmpty(n) ? "" : " sui-editor-with-options") }, a, l.default.createElement("textarea", { id: "powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : ""), placeholder: this.props.placeholder, defaultValue: t, onChange: function(t) { e.updateValue(t.target.value) } })), this.props.isRequired && !this.isValid(t) && l.default.createElement("span", { className: "sui-error-message" }, r), this.props.description && l.default.createElement("span", { className: "sui-description" }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = c
}, , function(e, t, n) {
    "use strict";

    function r(e) { "undefined" != typeof console && "function" == typeof console.error && console.error(e); try { throw new Error(e) } catch (e) {} }
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        o = n.n(r),
        a = function() {
            var e = null,
                t = function(t) {
                    return o()(null == e, "A history supports only one prompt at a time"), e = t,
                        function() { e === t && (e = null) }
                },
                n = function(t, n, r, a) { if (null != e) { var i = "function" == typeof e ? e(t, n) : e; "string" == typeof i ? "function" == typeof r ? r(i, a) : (o()(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), a(!0)) : a(!1 !== i) } else a(!0) },
                r = [];
            return {
                setPrompt: t,
                confirmTransitionTo: n,
                appendListener: function(e) {
                    var t = !0,
                        n = function() { t && e.apply(void 0, arguments) };
                    return r.push(n),
                        function() { t = !1, r = r.filter(function(e) { return e !== n }) }
                },
                notifyListeners: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    r.forEach(function(e) { return e.apply(void 0, t) })
                }
            }
        };
    t.a = a
}, function(e, t, n) {
    "use strict";
    var r = n(37);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(14),
        u = n.n(l),
        c = n(0),
        p = n.n(c),
        f = n(5),
        d = n.n(f),
        h = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        m = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = a = o(this, e.call.apply(e, [this].concat(l))), a.state = { match: a.computeMatch(a.props.history.location.pathname) }, i = n, o(a, i)
            }
            return a(t, e), t.prototype.getChildContext = function() { return { router: h({}, this.context.router, { history: this.props.history, route: { location: this.props.history.location, match: this.state.match } }) } }, t.prototype.computeMatch = function(e) { return { path: "/", url: "/", params: {}, isExact: "/" === e } }, t.prototype.componentWillMount = function() {
                var e = this,
                    t = this.props,
                    n = t.children,
                    r = t.history;
                u()(null == n || 1 === p.a.Children.count(n), "A <Router> may have only one child element"), this.unlisten = r.listen(function() { e.setState({ match: e.computeMatch(r.location.pathname) }) })
            }, t.prototype.componentWillReceiveProps = function(e) { s()(this.props.history === e.history, "You cannot change <Router history>") }, t.prototype.componentWillUnmount = function() { this.unlisten() }, t.prototype.render = function() { var e = this.props.children; return e ? p.a.Children.only(e) : null }, t
        }(p.a.Component);
    m.propTypes = { history: d.a.object.isRequired, children: d.a.node }, m.contextTypes = { router: d.a.object }, m.childContextTypes = { router: d.a.object.isRequired }, t.a = m
}, function(e, t, n) {
    "use strict";
    var r = n(58),
        o = n.n(r),
        a = {},
        i = 0,
        s = function(e, t) {
            var n = "" + t.end + t.strict + t.sensitive,
                r = a[n] || (a[n] = {});
            if (r[e]) return r[e];
            var s = [],
                l = o()(e, s, t),
                u = { re: l, keys: s };
            return i < 1e4 && (r[e] = u, i++), u
        },
        l = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments[2];
            "string" == typeof t && (t = { path: t });
            var r = t,
                o = r.path,
                a = r.exact,
                i = void 0 !== a && a,
                l = r.strict,
                u = void 0 !== l && l,
                c = r.sensitive,
                p = void 0 !== c && c;
            if (null == o) return n;
            var f = s(o, { end: i, strict: u, sensitive: p }),
                d = f.re,
                h = f.keys,
                m = d.exec(e);
            if (!m) return null;
            var y = m[0],
                b = m.slice(1),
                v = e === y;
            return i && !v ? null : { path: o, url: "/" === o && "" === y ? "/" : y, isExact: v, params: h.reduce(function(e, t, n) { return e[t.name] = b[n], e }, {}) }
        };
    t.a = l
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (Array.isArray(e)) return e.slice();
        if (!e) return [];
        var n = [];
        if ("string" == typeof e)
            if (t) {
                if ("hex" === t)
                    for (e = e.replace(/[^a-z0-9]+/gi, ""), e.length % 2 != 0 && (e = "0" + e), r = 0; r < e.length; r += 2) n.push(parseInt(e[r] + e[r + 1], 16))
            } else
                for (var r = 0; r < e.length; r++) {
                    var o = e.charCodeAt(r),
                        a = o >> 8,
                        i = 255 & o;
                    a ? n.push(a, i) : n.push(i)
                } else
                    for (r = 0; r < e.length; r++) n[r] = 0 | e[r];
        return n
    }

    function o(e) { for (var t = "", n = 0; n < e.length; n++) t += s(e[n].toString(16)); return t }

    function a(e) { return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0 }

    function i(e, t) { for (var n = "", r = 0; r < e.length; r++) { var o = e[r]; "little" === t && (o = a(o)), n += l(o.toString(16)) } return n }

    function s(e) { return 1 === e.length ? "0" + e : e }

    function l(e) { return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e }

    function u(e, t, n, r) {
        var o = n - t;
        N(o % 4 == 0);
        for (var a = new Array(o / 4), i = 0, s = t; i < a.length; i++, s += 4) {
            var l;
            l = "big" === r ? e[s] << 24 | e[s + 1] << 16 | e[s + 2] << 8 | e[s + 3] : e[s + 3] << 24 | e[s + 2] << 16 | e[s + 1] << 8 | e[s], a[i] = l >>> 0
        }
        return a
    }

    function c(e, t) { for (var n = new Array(4 * e.length), r = 0, o = 0; r < e.length; r++, o += 4) { var a = e[r]; "big" === t ? (n[o] = a >>> 24, n[o + 1] = a >>> 16 & 255, n[o + 2] = a >>> 8 & 255, n[o + 3] = 255 & a) : (n[o + 3] = a >>> 24, n[o + 2] = a >>> 16 & 255, n[o + 1] = a >>> 8 & 255, n[o] = 255 & a) } return n }

    function p(e, t) { return e >>> t | e << 32 - t }

    function f(e, t) { return e << t | e >>> 32 - t }

    function d(e, t) { return e + t >>> 0 }

    function h(e, t, n) { return e + t + n >>> 0 }

    function m(e, t, n, r) { return e + t + n + r >>> 0 }

    function y(e, t, n, r, o) { return e + t + n + r + o >>> 0 }

    function b(e, t, n, r) {
        var o = e[t],
            a = e[t + 1],
            i = r + a >>> 0,
            s = (i < r ? 1 : 0) + n + o;
        e[t] = s >>> 0, e[t + 1] = i
    }

    function v(e, t, n, r) { return (t + r >>> 0 < t ? 1 : 0) + e + n >>> 0 }

    function g(e, t, n, r) { return t + r >>> 0 }

    function _(e, t, n, r, o, a, i, s) {
        var l = 0,
            u = t;
        return u = u + r >>> 0, l += u < t ? 1 : 0, u = u + a >>> 0, l += u < a ? 1 : 0, u = u + s >>> 0, l += u < s ? 1 : 0, e + n + o + i + l >>> 0
    }

    function w(e, t, n, r, o, a, i, s) { return t + r + a + s >>> 0 }

    function E(e, t, n, r, o, a, i, s, l, u) {
        var c = 0,
            p = t;
        return p = p + r >>> 0, c += p < t ? 1 : 0, p = p + a >>> 0, c += p < a ? 1 : 0, p = p + s >>> 0, c += p < s ? 1 : 0, p = p + u >>> 0, c += p < u ? 1 : 0, e + n + o + i + l + c >>> 0
    }

    function O(e, t, n, r, o, a, i, s, l, u) { return t + r + a + s + u >>> 0 }

    function j(e, t, n) { return (t << 32 - n | e >>> n) >>> 0 }

    function x(e, t, n) { return (e << 32 - n | t >>> n) >>> 0 }

    function P(e, t, n) { return e >>> n }

    function C(e, t, n) { return (e << 32 - n | t >>> n) >>> 0 }
    var N = n(62),
        k = n(63);
    t.inherits = k, t.toArray = r, t.toHex = o, t.htonl = a, t.toHex32 = i, t.zero2 = s, t.zero8 = l, t.join32 = u, t.split32 = c, t.rotr32 = p, t.rotl32 = f, t.sum32 = d, t.sum32_3 = h, t.sum32_4 = m, t.sum32_5 = y, t.sum64 = b, t.sum64_hi = v, t.sum64_lo = g, t.sum64_4_hi = _, t.sum64_4_lo = w, t.sum64_5_hi = E, t.sum64_5_lo = O, t.rotr64_hi = j, t.rotr64_lo = x, t.shr64_hi = P, t.shr64_lo = C
}, function(e, t, n) {
    "use strict";
    (function(t) {
        function r(e, t) {!o.isUndefined(e) && o.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t) }
        var o = n(11),
            a = n(153),
            i = { "Content-Type": "application/x-www-form-urlencoded" },
            s = {
                adapter: function() { var e; return "undefined" != typeof XMLHttpRequest ? e = n(70) : void 0 !== t && (e = n(70)), e }(),
                transformRequest: [function(e, t) { return a(t, "Content-Type"), o.isFormData(e) || o.isArrayBuffer(e) || o.isBuffer(e) || o.isStream(e) || o.isFile(e) || o.isBlob(e) ? e : o.isArrayBufferView(e) ? e.buffer : o.isURLSearchParams(e) ? (r(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : o.isObject(e) ? (r(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e }],
                transformResponse: [function(e) {
                    if ("string" == typeof e) try { e = JSON.parse(e) } catch (e) {}
                    return e
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                validateStatus: function(e) { return e >= 200 && e < 300 }
            };
        s.headers = { common: { Accept: "application/json, text/plain, */*" } }, o.forEach(["delete", "get", "head"], function(e) { s.headers[e] = {} }), o.forEach(["post", "put", "patch"], function(e) { s.headers[e] = o.merge(i) }), e.exports = s
    }).call(t, n(61))
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) {
                r(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                n.updateValue = n.updateValue.bind(n);
                var a = _.isUndefined(n.props.defaultValue) ? "" : n.props.defaultValue,
                    i = _.isUndefined(n.props.settings[n.props.property]) ? a : n.props.settings[n.props.property];
                return n.state = { value: i }, n
            }
            return a(t, e), i(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.$el = jQuery(this.el), SUI.suiSelect(this.$el), this.updateValue = this.updateValue.bind(this), this.$el.on("change", function(t) {
                        var n = e.state.value + " " + t.target.value;
                        e.updateValue(n)
                    })
                }
            }, { key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e), "function" == typeof this.props.updateValue && this.props.updateValue(this.props.counter, e), this.setState({ value: e }) } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, { key: "isValid", value: function(e) { return this.props.isRequired ? this.props.isRequired && !_.isEmpty(e) : !!_.isUndefined(this.props.isPositive) || (_.isEmpty(e) || e >= 0) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.defaultValue) ? "" : this.props.defaultValue,
                        n = _.isUndefined(this.props.settings[this.props.property]) ? t : this.props.settings[this.props.property],
                        r = _.isUndefined(this.props.requiredError) ? (0, u.translate)("This field is required!") : this.props.requiredError,
                        o = this.isValid(n) ? "" : "sui-form-field-error",
                        a = "",
                        i = "input";
                    return "textarea" === this.props.type && (i = "textarea"), this.props.label && (a = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, " ", (this.props.isRequired || this.props.required) && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note))), l.default.createElement("div", { className: "sui-form-field " + o }, a, l.default.createElement("div", { className: "sui-insert-variables" }, "input" === i && l.default.createElement("input", { type: "text", value: this.state.value, placeholder: this.props.placeholder, className: "sui-form-control", onChange: function(t) { e.updateValue(t.target.value) } }), "textarea" === i && l.default.createElement("textarea", { value: this.state.value, placeholder: this.props.placeholder, className: "sui-form-control", onChange: function(t) { e.updateValue(t.target.value) }, rows: this.state.rows }), l.default.createElement("select", { ref: function(t) { return e.el = t } }, this.props.children), this.props.isRequired && !this.isValid(n) && l.default.createElement("span", { className: "sui-error-message" }, r), this.props.description && l.default.createElement("span", { className: "sui-description" }, this.props.description)))
                }
            }]), t
        }(s.Component);
    t.default = c
}, , , function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = (n(1), function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { open: !1 }, n.toggleState = n.toggleState.bind(n), n }
            return a(t, e), i(t, [{ key: "toggleState", value: function() { this.setState({ open: !this.state.open }) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.props.label,
                        n = this.state.open,
                        r = "";
                    n && (r = "sui-accordion-item--open");
                    var o = !(!_.isUndefined(this.props.boxedContent) && "" !== this.props.boxedContent) || this.props.boxedContent,
                        a = l.default.Children.map(this.props.children, function(e) { return e });
                    return l.default.createElement("div", { className: "sui-accordion-item " + r }, l.default.createElement("div", { className: "sui-accordion-item-header", onClick: function() { return e.toggleState() } }, l.default.createElement("div", { className: "sui-accordion-item-title" }, l.default.createElement("span", null, t), l.default.createElement("button", { className: "sui-button-icon sui-accordion-open-indicator", onClick: function() { return e.toggleState() } }, l.default.createElement("i", { className: "sui-icon-chevron-down", "aria-hidden": "true" }), l.default.createElement("span", { class: "sui-screen-reader-text" }, !1 === this.state.open ? "Open" : "Close")))), l.default.createElement("div", { className: "sui-accordion-item-body" }, !1 === o ? n && a : l.default.createElement("div", { className: "sui-box" }, l.default.createElement("div", { className: "sui-box-body" }, n && a), o)))
                }
            }]), t
        }(s.Component));
    t.default = u
}, function(e, t) { e.exports = ReactDOM }, , function(e, t, n) {
    "use strict";
    n.d(t, "b", function() { return a }), n.d(t, "a", function() { return i });
    var r = n(5),
        o = n.n(r),
        a = o.a.shape({ trySubscribe: o.a.func.isRequired, tryUnsubscribe: o.a.func.isRequired, notifyNestedSubs: o.a.func.isRequired, isSubscribed: o.a.func.isRequired }),
        i = o.a.shape({ subscribe: o.a.func.isRequired, dispatch: o.a.func.isRequired, getState: o.a.func.isRequired })
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function i(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function s() {}

    function l(e, t) {
        var n = {
            run: function(r) {
                try {
                    var o = e(t.getState(), r);
                    (o !== n.props || n.error) && (n.shouldComponentUpdate = !0, n.props = o, n.error = null)
                } catch (e) { n.shouldComponentUpdate = !0, n.error = e }
            }
        };
        return n
    }

    function u(e) {
        var t, n, u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            c = u.getDisplayName,
            f = void 0 === c ? function(e) { return "ConnectAdvanced(" + e + ")" } : c,
            _ = u.methodName,
            w = void 0 === _ ? "connectAdvanced" : _,
            E = u.renderCountProp,
            O = void 0 === E ? void 0 : E,
            j = u.shouldHandleStateChanges,
            x = void 0 === j || j,
            P = u.storeKey,
            C = void 0 === P ? "store" : P,
            N = u.withRef,
            k = void 0 !== N && N,
            S = i(u, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]),
            T = C + "Subscription",
            A = v++,
            M = (t = {}, t[C] = y.a, t[T] = y.b, t),
            R = (n = {}, n[T] = y.b, n);
        return function(t) {
            d()("function" == typeof t, "You must pass a component to the function returned by " + w + ". Instead received " + JSON.stringify(t));
            var n = t.displayName || t.name || "Component",
                i = f(n),
                u = b({}, S, { getDisplayName: f, methodName: w, renderCountProp: O, shouldHandleStateChanges: x, storeKey: C, withRef: k, displayName: i, wrappedComponentName: n, WrappedComponent: t }),
                c = function(n) {
                    function c(e, t) { r(this, c); var a = o(this, n.call(this, e, t)); return a.version = A, a.state = {}, a.renderCount = 0, a.store = e[C] || t[C], a.propsMode = Boolean(e[C]), a.setWrappedInstance = a.setWrappedInstance.bind(a), d()(a.store, 'Could not find "' + C + '" in either the context or props of "' + i + '". Either wrap the root component in a <Provider>, or explicitly pass "' + C + '" as a prop to "' + i + '".'), a.initSelector(), a.initSubscription(), a }
                    return a(c, n), c.prototype.getChildContext = function() { var e, t = this.propsMode ? null : this.subscription; return e = {}, e[T] = t || this.context[T], e }, c.prototype.componentDidMount = function() { x && (this.subscription.trySubscribe(), this.selector.run(this.props), this.selector.shouldComponentUpdate && this.forceUpdate()) }, c.prototype.componentWillReceiveProps = function(e) { this.selector.run(e) }, c.prototype.shouldComponentUpdate = function() { return this.selector.shouldComponentUpdate }, c.prototype.componentWillUnmount = function() { this.subscription && this.subscription.tryUnsubscribe(), this.subscription = null, this.notifyNestedSubs = s, this.store = null, this.selector.run = s, this.selector.shouldComponentUpdate = !1 }, c.prototype.getWrappedInstance = function() { return d()(k, "To access the wrapped instance, you need to specify { withRef: true } in the options argument of the " + w + "() call."), this.wrappedInstance }, c.prototype.setWrappedInstance = function(e) { this.wrappedInstance = e }, c.prototype.initSelector = function() {
                        var t = e(this.store.dispatch, u);
                        this.selector = l(t, this.store), this.selector.run(this.props)
                    }, c.prototype.initSubscription = function() {
                        if (x) {
                            var e = (this.propsMode ? this.props : this.context)[T];
                            this.subscription = new m.a(this.store, e, this.onStateChange.bind(this)), this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
                        }
                    }, c.prototype.onStateChange = function() { this.selector.run(this.props), this.selector.shouldComponentUpdate ? (this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate, this.setState(g)) : this.notifyNestedSubs() }, c.prototype.notifyNestedSubsOnComponentDidUpdate = function() { this.componentDidUpdate = void 0, this.notifyNestedSubs() }, c.prototype.isSubscribed = function() { return Boolean(this.subscription) && this.subscription.isSubscribed() }, c.prototype.addExtraProps = function(e) { if (!(k || O || this.propsMode && this.subscription)) return e; var t = b({}, e); return k && (t.ref = this.setWrappedInstance), O && (t[O] = this.renderCount++), this.propsMode && this.subscription && (t[T] = this.subscription), t }, c.prototype.render = function() { var e = this.selector; if (e.shouldComponentUpdate = !1, e.error) throw e.error; return Object(h.createElement)(t, this.addExtraProps(e.props)) }, c
                }(h.Component);
            return c.WrappedComponent = t, c.displayName = i, c.childContextTypes = R, c.contextTypes = M, c.propTypes = M, p()(c, t)
        }
    }
    t.a = u;
    var c = n(49),
        p = n.n(c),
        f = n(14),
        d = n.n(f),
        h = n(0),
        m = (n.n(h), n(86)),
        y = n(47),
        b = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        v = 0,
        g = {}
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        if ("string" != typeof t) {
            if (p) {
                var f = c(t);
                f && f !== p && r(e, f, n)
            }
            var d = s(t);
            l && (d = d.concat(l(t)));
            for (var h = 0; h < d.length; ++h) { var m = d[h]; if (!(o[m] || a[m] || n && n[m])) { var y = u(t, m); try { i(e, m, y) } catch (e) {} } }
            return e
        }
        return e
    }
    var o = { childContextTypes: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 },
        a = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },
        i = Object.defineProperty,
        s = Object.getOwnPropertyNames,
        l = Object.getOwnPropertySymbols,
        u = Object.getOwnPropertyDescriptor,
        c = Object.getPrototypeOf,
        p = c && c(Object);
    e.exports = r
}, function(e, t) {
    var n;
    n = function() { return this }();
    try { n = n || Function("return this")() || (0, eval)("this") } catch (e) { "object" == typeof window && (n = window) }
    e.exports = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return function(t, n) {
            function r() { return o }
            var o = e(t, n);
            return r.dependsOnOwnProps = !1, r
        }
    }

    function o(e) { return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length }

    function a(e, t) { return function(t, n) { var r = (n.displayName, function(e, t) { return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e) }); return r.dependsOnOwnProps = !0, r.mapToProps = function(t, n) { r.mapToProps = e, r.dependsOnOwnProps = o(e); var a = r(t, n); return "function" == typeof a && (r.mapToProps = a, r.dependsOnOwnProps = o(a), a = r(t, n)), a }, r } }
    t.a = r, t.b = a;
    n(52)
}, function(e, t, n) {
    "use strict";
    n(93), n(34)
}, function(e, t, n) {
    "use strict";
    var r = n(95),
        o = r.a.Symbol;
    t.a = o
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", function() { return r }), n.d(t, "a", function() { return o }), n.d(t, "e", function() { return a }), n.d(t, "c", function() { return i }), n.d(t, "g", function() { return s }), n.d(t, "h", function() { return l }), n.d(t, "f", function() { return u }), n.d(t, "d", function() { return c });
    var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
        o = function(e, t, n) { return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n) },
        a = function(e, t, n) { return e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n) },
        i = function(e, t) { return t(window.confirm(e)) },
        s = function() { var e = window.navigator.userAgent; return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && (window.history && "pushState" in window.history) },
        l = function() { return -1 === window.navigator.userAgent.indexOf("Trident") },
        u = function() { return -1 === window.navigator.userAgent.indexOf("Firefox") },
        c = function(e) { return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS") }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var s = n(0),
        l = n.n(s),
        u = n(5),
        c = n.n(u),
        p = n(14),
        f = n.n(p),
        d = n(20),
        h = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        m = function(e) { return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) },
        y = function(e) {
            function t() {
                var n, r, i;
                o(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = r = a(this, e.call.apply(e, [this].concat(l))), r.handleClick = function(e) {
                    if (r.props.onClick && r.props.onClick(e), !e.defaultPrevented && 0 === e.button && !r.props.target && !m(e)) {
                        e.preventDefault();
                        var t = r.context.router.history,
                            n = r.props,
                            o = n.replace,
                            a = n.to;
                        o ? t.replace(a) : t.push(a)
                    }
                }, i = n, a(r, i)
            }
            return i(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = (e.replace, e.to),
                    n = e.innerRef,
                    o = r(e, ["replace", "to", "innerRef"]);
                f()(this.context.router, "You should not use <Link> outside a <Router>"), f()(void 0 !== t, 'You must specify the "to" property');
                var a = this.context.router.history,
                    i = "string" == typeof t ? Object(d.c)(t, null, null, a.location) : t,
                    s = a.createHref(i);
                return l.a.createElement("a", h({}, o, { onClick: this.handleClick, href: s, ref: n }))
            }, t
        }(l.a.Component);
    y.propTypes = { onClick: c.a.func, target: c.a.string, replace: c.a.bool, to: c.a.oneOfType([c.a.string, c.a.object]).isRequired, innerRef: c.a.oneOfType([c.a.string, c.a.func]) }, y.defaultProps = { replace: !1 }, y.contextTypes = { router: c.a.shape({ history: c.a.shape({ push: c.a.func.isRequired, replace: c.a.func.isRequired, createHref: c.a.func.isRequired }).isRequired }).isRequired }, t.a = y
}, function(e, t, n) {
    "use strict";
    var r = n(57);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(14),
        u = n.n(l),
        c = n(0),
        p = n.n(c),
        f = n(5),
        d = n.n(f),
        h = n(38),
        m = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        y = function(e) { return 0 === p.a.Children.count(e) },
        b = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = a = o(this, e.call.apply(e, [this].concat(l))), a.state = { match: a.computeMatch(a.props, a.context.router) }, i = n, o(a, i)
            }
            return a(t, e), t.prototype.getChildContext = function() { return { router: m({}, this.context.router, { route: { location: this.props.location || this.context.router.route.location, match: this.state.match } }) } }, t.prototype.computeMatch = function(e, t) {
                var n = e.computedMatch,
                    r = e.location,
                    o = e.path,
                    a = e.strict,
                    i = e.exact,
                    s = e.sensitive;
                if (n) return n;
                u()(t, "You should not use <Route> or withRouter() outside a <Router>");
                var l = t.route,
                    c = (r || l.location).pathname;
                return Object(h.a)(c, { path: o, strict: a, exact: i, sensitive: s }, l.match)
            }, t.prototype.componentWillMount = function() { s()(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"), s()(!(this.props.component && this.props.children && !y(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"), s()(!(this.props.render && this.props.children && !y(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored") }, t.prototype.componentWillReceiveProps = function(e, t) { s()(!(e.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'), s()(!(!e.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'), this.setState({ match: this.computeMatch(e, t.router) }) }, t.prototype.render = function() {
                var e = this.state.match,
                    t = this.props,
                    n = t.children,
                    r = t.component,
                    o = t.render,
                    a = this.context.router,
                    i = a.history,
                    s = a.route,
                    l = a.staticContext,
                    u = this.props.location || s.location,
                    c = { match: e, location: u, history: i, staticContext: l };
                return r ? e ? p.a.createElement(r, c) : null : o ? e ? o(c) : null : "function" == typeof n ? n(c) : n && !y(n) ? p.a.Children.only(n) : null
            }, t
        }(p.a.Component);
    b.propTypes = { computedMatch: d.a.object, path: d.a.string, exact: d.a.bool, strict: d.a.bool, sensitive: d.a.bool, component: d.a.func, render: d.a.func, children: d.a.oneOfType([d.a.func, d.a.node]), location: d.a.object }, b.contextTypes = { router: d.a.shape({ history: d.a.object.isRequired, route: d.a.object.isRequired, staticContext: d.a.object }) }, b.childContextTypes = { router: d.a.object.isRequired }, t.a = b
}, function(e, t, n) {
    function r(e, t) {
        for (var n, r = [], o = 0, a = 0, i = "", s = t && t.delimiter || "/"; null != (n = v.exec(e));) {
            var c = n[0],
                p = n[1],
                f = n.index;
            if (i += e.slice(a, f), a = f + c.length, p) i += p[1];
            else {
                var d = e[a],
                    h = n[2],
                    m = n[3],
                    y = n[4],
                    b = n[5],
                    g = n[6],
                    _ = n[7];
                i && (r.push(i), i = "");
                var w = null != h && null != d && d !== h,
                    E = "+" === g || "*" === g,
                    O = "?" === g || "*" === g,
                    j = n[2] || s,
                    x = y || b;
                r.push({ name: m || o++, prefix: h || "", delimiter: j, optional: O, repeat: E, partial: w, asterisk: !!_, pattern: x ? u(x) : _ ? ".*" : "[^" + l(j) + "]+?" })
            }
        }
        return a < e.length && (i += e.substr(a)), i && r.push(i), r
    }

    function o(e, t) { return s(r(e, t)) }

    function a(e) { return encodeURI(e).replace(/[\/?#]/g, function(e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) }

    function i(e) { return encodeURI(e).replace(/[?#]/g, function(e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) }

    function s(e) {
        for (var t = new Array(e.length), n = 0; n < e.length; n++) "object" == typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$"));
        return function(n, r) {
            for (var o = "", s = n || {}, l = r || {}, u = l.pretty ? a : encodeURIComponent, c = 0; c < e.length; c++) {
                var p = e[c];
                if ("string" != typeof p) {
                    var f, d = s[p.name];
                    if (null == d) { if (p.optional) { p.partial && (o += p.prefix); continue } throw new TypeError('Expected "' + p.name + '" to be defined') }
                    if (b(d)) {
                        if (!p.repeat) throw new TypeError('Expected "' + p.name + '" to not repeat, but received `' + JSON.stringify(d) + "`");
                        if (0 === d.length) { if (p.optional) continue; throw new TypeError('Expected "' + p.name + '" to not be empty') }
                        for (var h = 0; h < d.length; h++) {
                            if (f = u(d[h]), !t[c].test(f)) throw new TypeError('Expected all "' + p.name + '" to match "' + p.pattern + '", but received `' + JSON.stringify(f) + "`");
                            o += (0 === h ? p.prefix : p.delimiter) + f
                        }
                    } else {
                        if (f = p.asterisk ? i(d) : u(d), !t[c].test(f)) throw new TypeError('Expected "' + p.name + '" to match "' + p.pattern + '", but received "' + f + '"');
                        o += p.prefix + f
                    }
                } else o += p
            }
            return o
        }
    }

    function l(e) { return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1") }

    function u(e) { return e.replace(/([=!:$\/()])/g, "\\$1") }

    function c(e, t) { return e.keys = t, e }

    function p(e) { return e.sensitive ? "" : "i" }

    function f(e, t) {
        var n = e.source.match(/\((?!\?)/g);
        if (n)
            for (var r = 0; r < n.length; r++) t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });
        return c(e, t)
    }

    function d(e, t, n) { for (var r = [], o = 0; o < e.length; o++) r.push(y(e[o], t, n).source); return c(new RegExp("(?:" + r.join("|") + ")", p(n)), t) }

    function h(e, t, n) { return m(r(e, n), t, n) }

    function m(e, t, n) {
        b(t) || (n = t || n, t = []), n = n || {};
        for (var r = n.strict, o = !1 !== n.end, a = "", i = 0; i < e.length; i++) {
            var s = e[i];
            if ("string" == typeof s) a += l(s);
            else {
                var u = l(s.prefix),
                    f = "(?:" + s.pattern + ")";
                t.push(s), s.repeat && (f += "(?:" + u + f + ")*"), f = s.optional ? s.partial ? u + "(" + f + ")?" : "(?:" + u + "(" + f + "))?" : u + "(" + f + ")", a += f
            }
        }
        var d = l(n.delimiter || "/"),
            h = a.slice(-d.length) === d;
        return r || (a = (h ? a.slice(0, -d.length) : a) + "(?:" + d + "(?=$))?"), a += o ? "$" : r && h ? "" : "(?=" + d + "|$)", c(new RegExp("^" + a, p(n)), t)
    }

    function y(e, t, n) { return b(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? f(e, t) : b(e) ? d(e, t, n) : h(e, t, n) }
    var b = n(116);
    e.exports = y, e.exports.parse = r, e.exports.compile = o, e.exports.tokensToFunction = s, e.exports.tokensToRegExp = m;
    var v = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
}, function(e, t, n) {
    "use strict";
    var r = n(58),
        o = n.n(r),
        a = {},
        i = 0,
        s = function(e) {
            var t = e,
                n = a[t] || (a[t] = {});
            if (n[e]) return n[e];
            var r = o.a.compile(e);
            return i < 1e4 && (n[e] = r, i++), r
        },
        l = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return "/" === e ? e : s(e)(t, { pretty: !0 })
        };
    t.a = l
}, function(e, t, n) {
    var r = n(130),
        o = new r;
    e.exports = { numberFormat: o.numberFormat.bind(o), translate: o.translate.bind(o), configure: o.configure.bind(o), setLocale: o.setLocale.bind(o), getLocale: o.getLocale.bind(o), getLocaleSlug: o.getLocaleSlug.bind(o), addTranslations: o.addTranslations.bind(o), reRenderTranslations: o.reRenderTranslations.bind(o), registerComponentUpdateHook: o.registerComponentUpdateHook.bind(o), registerTranslateHook: o.registerTranslateHook.bind(o), state: o.state, stateObserver: o.stateObserver, on: o.stateObserver.on.bind(o.stateObserver), off: o.stateObserver.removeListener.bind(o.stateObserver), emit: o.stateObserver.emit.bind(o.stateObserver), localize: n(144)(o), $this: o, I18N: r }
}, function(e, t) {
    function n() { throw new Error("setTimeout has not been defined") }

    function r() { throw new Error("clearTimeout has not been defined") }

    function o(e) { if (c === setTimeout) return setTimeout(e, 0); if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0); try { return c(e, 0) } catch (t) { try { return c.call(null, e, 0) } catch (t) { return c.call(this, e, 0) } } }

    function a(e) { if (p === clearTimeout) return clearTimeout(e); if ((p === r || !p) && clearTimeout) return p = clearTimeout, clearTimeout(e); try { return p(e) } catch (t) { try { return p.call(null, e) } catch (t) { return p.call(this, e) } } }

    function i() { m && d && (m = !1, d.length ? h = d.concat(h) : y = -1, h.length && s()) }

    function s() {
        if (!m) {
            var e = o(i);
            m = !0;
            for (var t = h.length; t;) {
                for (d = h, h = []; ++y < t;) d && d[y].run();
                y = -1, t = h.length
            }
            d = null, m = !1, a(e)
        }
    }

    function l(e, t) { this.fun = e, this.array = t }

    function u() {}
    var c, p, f = e.exports = {};
    ! function() { try { c = "function" == typeof setTimeout ? setTimeout : n } catch (e) { c = n } try { p = "function" == typeof clearTimeout ? clearTimeout : r } catch (e) { p = r } }();
    var d, h = [],
        m = !1,
        y = -1;
    f.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        h.push(new l(e, t)), 1 !== h.length || m || o(s)
    }, l.prototype.run = function() { this.fun.apply(null, this.array) }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {}, f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, f.listeners = function(e) { return [] }, f.binding = function(e) { throw new Error("process.binding is not supported") }, f.cwd = function() { return "/" }, f.chdir = function(e) { throw new Error("process.chdir is not supported") }, f.umask = function() { return 0 }
}, function(e, t) {
    function n(e, t) { if (!e) throw new Error(t || "Assertion failed") }
    e.exports = n, n.equal = function(e, t, n) { if (e != t) throw new Error(n || "Assertion failed: " + e + " != " + t) }
}, function(e, t) {
    "function" == typeof Object.create ? e.exports = function(e, t) { e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }) } : e.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
    }
}, function(e, t) {
    function n() { this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0 }

    function r(e) { return "function" == typeof e }

    function o(e) { return "number" == typeof e }

    function a(e) { return "object" == typeof e && null !== e }

    function i(e) { return void 0 === e }
    e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) { if (!o(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number"); return this._maxListeners = e, this }, n.prototype.emit = function(e) {
        var t, n, o, s, l, u;
        if (this._events || (this._events = {}), "error" === e && (!this._events.error || a(this._events.error) && !this._events.error.length)) { if ((t = arguments[1]) instanceof Error) throw t; var c = new Error('Uncaught, unspecified "error" event. (' + t + ")"); throw c.context = t, c }
        if (n = this._events[e], i(n)) return !1;
        if (r(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    s = Array.prototype.slice.call(arguments, 1), n.apply(this, s)
            } else if (a(n))
                for (s = Array.prototype.slice.call(arguments, 1), u = n.slice(), o = u.length, l = 0; l < o; l++) u[l].apply(this, s);
        return !0
    }, n.prototype.addListener = function(e, t) { var o; if (!r(t)) throw TypeError("listener must be a function"); return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? a(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, a(this._events[e]) && !this._events[e].warned && (o = i(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[e].length > o && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
        function n() { this.removeListener(e, n), o || (o = !0, t.apply(this, arguments)) }
        if (!r(t)) throw TypeError("listener must be a function");
        var o = !1;
        return n.listener = t, this.on(e, n), this
    }, n.prototype.removeListener = function(e, t) {
        var n, o, i, s;
        if (!r(t)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[e]) return this;
        if (n = this._events[e], i = n.length, o = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
        else if (a(n)) {
            for (s = i; s-- > 0;)
                if (n[s] === t || n[s].listener && n[s].listener === t) { o = s; break }
            if (o < 0) return this;
            1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t)
        }
        return this
    }, n.prototype.removeAllListeners = function(e) {
        var t, n;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
        if (0 === arguments.length) { for (t in this._events) "removeListener" !== t && this.removeAllListeners(t); return this.removeAllListeners("removeListener"), this._events = {}, this }
        if (n = this._events[e], r(n)) this.removeListener(e, n);
        else if (n)
            for (; n.length;) this.removeListener(e, n[n.length - 1]);
        return delete this._events[e], this
    }, n.prototype.listeners = function(e) { return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [] }, n.prototype.listenerCount = function(e) { if (this._events) { var t = this._events[e]; if (r(t)) return 1; if (t) return t.length } return 0 }, n.listenerCount = function(e, t) { return e.listenerCount(t) }
}, function(e, t, n) {
    "use strict";

    function r(e) { return function() { return e } }
    var o = function() {};
    o.thatReturns = r, o.thatReturnsFalse = r(!1), o.thatReturnsTrue = r(!0), o.thatReturnsNull = r(null), o.thatReturnsThis = function() { return this }, o.thatReturnsArgument = function(e) { return e }, e.exports = o
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a, i, s, l) {
        if (o(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [n, r, a, i, s, l],
                    p = 0;
                u = new Error(t.replace(/%s/g, function() { return c[p++] })), u.name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
    var o = function(e) {};
    e.exports = r
}, function(e, t) {
    function n(e, t, n) {
        switch (n.length) {
            case 0:
                return e.call(t);
            case 1:
                return e.call(t, n[0]);
            case 2:
                return e.call(t, n[0], n[1]);
            case 3:
                return e.call(t, n[0], n[1], n[2])
        }
        return e.apply(t, n)
    }

    function r(e, t) { for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n); return r }

    function o(e, t) {
        var n = M(e) || d(e) ? r(e.length, String) : [],
            o = n.length,
            a = !!o;
        for (var i in e) !t && !C.call(e, i) || a && ("length" == i || u(i, o)) || n.push(i);
        return n
    }

    function a(e, t, n) {
        var r = e[t];
        C.call(e, t) && f(r, n) && (void 0 !== n || t in e) || (e[t] = n)
    }

    function i(e) { if (!p(e)) return S(e); var t = []; for (var n in Object(e)) C.call(e, n) && "constructor" != n && t.push(n); return t }

    function s(e, t) {
        return t = T(void 0 === t ? e.length - 1 : t, 0),
            function() {
                for (var r = arguments, o = -1, a = T(r.length - t, 0), i = Array(a); ++o < a;) i[o] = r[t + o];
                o = -1;
                for (var s = Array(t + 1); ++o < t;) s[o] = r[o];
                return s[t] = i, n(e, this, s)
            }
    }

    function l(e, t, n, r) {
        n || (n = {});
        for (var o = -1, i = t.length; ++o < i;) {
            var s = t[o],
                l = r ? r(n[s], e[s], s, n, e) : void 0;
            a(n, s, void 0 === l ? e[s] : l)
        }
        return n
    }

    function u(e, t) { return !!(t = null == t ? w : t) && ("number" == typeof e || x.test(e)) && e > -1 && e % 1 == 0 && e < t }

    function c(e, t, n) { if (!v(n)) return !1; var r = typeof t; return !!("number" == r ? h(n) && u(t, n.length) : "string" == r && t in n) && f(n[t], e) }

    function p(e) { var t = e && e.constructor; return e === ("function" == typeof t && t.prototype || P) }

    function f(e, t) { return e === t || e !== e && t !== t }

    function d(e) { return m(e) && C.call(e, "callee") && (!k.call(e, "callee") || N.call(e) == E) }

    function h(e) { return null != e && b(e.length) && !y(e) }

    function m(e) { return g(e) && h(e) }

    function y(e) { var t = v(e) ? N.call(e) : ""; return t == O || t == j }

    function b(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= w }

    function v(e) { var t = typeof e; return !!e && ("object" == t || "function" == t) }

    function g(e) { return !!e && "object" == typeof e }

    function _(e) { return h(e) ? o(e) : i(e) }
    var w = 9007199254740991,
        E = "[object Arguments]",
        O = "[object Function]",
        j = "[object GeneratorFunction]",
        x = /^(?:0|[1-9]\d*)$/,
        P = Object.prototype,
        C = P.hasOwnProperty,
        N = P.toString,
        k = P.propertyIsEnumerable,
        S = function(e, t) { return function(n) { return e(t(n)) } }(Object.keys, Object),
        T = Math.max,
        A = !k.call({ valueOf: 1 }, "valueOf"),
        M = Array.isArray,
        R = function(e) {
            return s(function(t, n) {
                var r = -1,
                    o = n.length,
                    a = o > 1 ? n[o - 1] : void 0,
                    i = o > 2 ? n[2] : void 0;
                for (a = e.length > 3 && "function" == typeof a ? (o--, a) : void 0, i && c(n[0], n[1], i) && (a = o < 3 ? void 0 : a, o = 1), t = Object(t); ++r < o;) {
                    var s = n[r];
                    s && e(t, s, r, a)
                }
                return t
            })
        }(function(e, t) { if (A || p(t) || h(t)) return void l(t, _(t), e); for (var n in t) C.call(t, n) && a(e, n, t[n]) });
    e.exports = R
}, function(e, t, n) { e.exports = n(150) }, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) { return function() { for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r]; return e.apply(t, n) } }
}, function(e, t, n) {
    "use strict";
    var r = n(11),
        o = n(154),
        a = n(156),
        i = n(157),
        s = n(158),
        l = n(71),
        u = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || n(159);
    e.exports = function(e) {
        return new Promise(function(t, c) {
            var p = e.data,
                f = e.headers;
            r.isFormData(p) && delete f["Content-Type"];
            var d = new XMLHttpRequest,
                h = "onreadystatechange",
                m = !1;
            if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in d || s(e.url) || (d = new window.XDomainRequest, h = "onload", m = !0, d.onprogress = function() {}, d.ontimeout = function() {}), e.auth) {
                var y = e.auth.username || "",
                    b = e.auth.password || "";
                f.Authorization = "Basic " + u(y + ":" + b)
            }
            if (d.open(e.method.toUpperCase(), a(e.url, e.params, e.paramsSerializer), !0), d.timeout = e.timeout, d[h] = function() {
                    if (d && (4 === d.readyState || m) && (0 !== d.status || d.responseURL && 0 === d.responseURL.indexOf("file:"))) {
                        var n = "getAllResponseHeaders" in d ? i(d.getAllResponseHeaders()) : null,
                            r = e.responseType && "text" !== e.responseType ? d.response : d.responseText,
                            a = { data: r, status: 1223 === d.status ? 204 : d.status, statusText: 1223 === d.status ? "No Content" : d.statusText, headers: n, config: e, request: d };
                        o(t, c, a), d = null
                    }
                }, d.onerror = function() { c(l("Network Error", e, null, d)), d = null }, d.ontimeout = function() { c(l("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", d)), d = null }, r.isStandardBrowserEnv()) {
                var v = n(160),
                    g = (e.withCredentials || s(e.url)) && e.xsrfCookieName ? v.read(e.xsrfCookieName) : void 0;
                g && (f[e.xsrfHeaderName] = g)
            }
            if ("setRequestHeader" in d && r.forEach(f, function(e, t) { void 0 === p && "content-type" === t.toLowerCase() ? delete f[t] : d.setRequestHeader(t, e) }), e.withCredentials && (d.withCredentials = !0), e.responseType) try { d.responseType = e.responseType } catch (t) { if ("json" !== e.responseType) throw t }
            "function" == typeof e.onDownloadProgress && d.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && d.upload && d.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function(e) { d && (d.abort(), c(e), d = null) }), void 0 === p && (p = null), d.send(p)
        })
    }
}, function(e, t, n) {
    "use strict";
    var r = n(155);
    e.exports = function(e, t, n, o, a) { var i = new Error(e); return r(i, t, n, o, a) }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) { return !(!e || !e.__CANCEL__) }
}, function(e, t, n) {
    "use strict";

    function r(e) { this.message = e }
    r.prototype.toString = function() { return "Cancel" + (this.message ? ": " + this.message : "") }, r.prototype.__CANCEL__ = !0, e.exports = r
}, function(e, t, n) {
    "use strict";
    var r = n(168),
        o = n(169),
        a = n(76);
    e.exports = { formats: a, parse: o, stringify: r }
}, function(e, t, n) {
    "use strict";
    var r = Object.prototype.hasOwnProperty,
        o = function() { for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase()); return e }(),
        a = function(e) {
            for (var t; e.length;) {
                var n = e.pop();
                if (t = n.obj[n.prop], Array.isArray(t)) {
                    for (var r = [], o = 0; o < t.length; ++o) void 0 !== t[o] && r.push(t[o]);
                    n.obj[n.prop] = r
                }
            }
            return t
        },
        i = function(e, t) { for (var n = t && t.plainObjects ? Object.create(null) : {}, r = 0; r < e.length; ++r) void 0 !== e[r] && (n[r] = e[r]); return n },
        s = function e(t, n, o) {
            if (!n) return t;
            if ("object" != typeof n) {
                if (Array.isArray(t)) t.push(n);
                else {
                    if ("object" != typeof t) return [t, n];
                    (o.plainObjects || o.allowPrototypes || !r.call(Object.prototype, n)) && (t[n] = !0)
                }
                return t
            }
            if ("object" != typeof t) return [t].concat(n);
            var a = t;
            return Array.isArray(t) && !Array.isArray(n) && (a = i(t, o)), Array.isArray(t) && Array.isArray(n) ? (n.forEach(function(n, a) { r.call(t, a) ? t[a] && "object" == typeof t[a] ? t[a] = e(t[a], n, o) : t.push(n) : t[a] = n }), t) : Object.keys(n).reduce(function(t, a) { var i = n[a]; return r.call(t, a) ? t[a] = e(t[a], i, o) : t[a] = i, t }, a)
        },
        l = function(e, t) { return Object.keys(t).reduce(function(e, n) { return e[n] = t[n], e }, e) },
        u = function(e) { try { return decodeURIComponent(e.replace(/\+/g, " ")) } catch (t) { return e } },
        c = function(e) {
            if (0 === e.length) return e;
            for (var t = "string" == typeof e ? e : String(e), n = "", r = 0; r < t.length; ++r) {
                var a = t.charCodeAt(r);
                45 === a || 46 === a || 95 === a || 126 === a || a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 ? n += t.charAt(r) : a < 128 ? n += o[a] : a < 2048 ? n += o[192 | a >> 6] + o[128 | 63 & a] : a < 55296 || a >= 57344 ? n += o[224 | a >> 12] + o[128 | a >> 6 & 63] + o[128 | 63 & a] : (r += 1, a = 65536 + ((1023 & a) << 10 | 1023 & t.charCodeAt(r)), n += o[240 | a >> 18] + o[128 | a >> 12 & 63] + o[128 | a >> 6 & 63] + o[128 | 63 & a])
            }
            return n
        },
        p = function(e) {
            for (var t = [{ obj: { o: e }, prop: "o" }], n = [], r = 0; r < t.length; ++r)
                for (var o = t[r], i = o.obj[o.prop], s = Object.keys(i), l = 0; l < s.length; ++l) {
                    var u = s[l],
                        c = i[u];
                    "object" == typeof c && null !== c && -1 === n.indexOf(c) && (t.push({ obj: i, prop: u }), n.push(c))
                }
            return a(t)
        },
        f = function(e) { return "[object RegExp]" === Object.prototype.toString.call(e) },
        d = function(e) { return null !== e && void 0 !== e && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e)) };
    e.exports = { arrayToObject: i, assign: l, compact: p, decode: u, encode: c, isBuffer: d, isRegExp: f, merge: s }
}, function(e, t, n) {
    "use strict";
    var r = String.prototype.replace,
        o = /%20/g;
    e.exports = { default: "RFC3986", formatters: { RFC1738: function(e) { return r.call(e, o, "+") }, RFC3986: function(e) { return e } }, RFC1738: "RFC1738", RFC3986: "RFC3986" }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{ key: "clearImage", value: function() { "function" == typeof this.props.updateProperty ? (this.props.updateProperty(this.props.property, ""), this.props.updateProperty(this.props.property + "_filename", "")) : (this.props.actions.settingsActions.updateSetting(this.props.property, ""), this.props.actions.settingsActions.updateSetting(this.props.property + "_filename", "")) } }, {
                key: "openMedia",
                value: function() {
                    var e = this,
                        t = wp.media({ title: (0, u.translate)("Select image"), button: { text: (0, u.translate)("Select") }, multiple: !1 }).on("select", function() {
                            var n = void 0,
                                r = t.state().get("selection").first().toJSON();
                            n = _.isUndefined(e.props.imageSize) ? r.url : "thumbnail" === e.props.imageSize ? r.sizes.thumbnail.url : "medium" === e.props.imageSize ? _.isUndefined(r.sizes.medium) ? r.sizes.full.url : r.sizes.medium.url : "large" === e.props.imageSize ? _.isUndefined(r.sizes.large) ? r.sizes.full.url : r.sizes.large.url : r.sizes.full.url, "function" == typeof e.props.updateProperty ? (e.props.updateProperty(e.props.property, n), e.props.updateProperty(e.props.property + "_filename", r.filename)) : (e.props.actions.settingsActions.updateSetting(e.props.property, n), e.props.actions.settingsActions.updateSetting(e.props.property + "_filename", r.filename))
                        });
                    t.open()
                }
            }, {
                key: "render",
                value: function() {
                    var e = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        t = _.isUndefined(this.props.settings[this.props.property + "_filename"]) ? e : this.props.settings[this.props.property + "_filename"],
                        n = _.isEmpty(e) ? "" : "sui-has_file",
                        r = "";
                    this.props.label && (r = l.default.createElement("label", { className: "sui-label" }, this.props.label));
                    var o = "";
                    this.props.description && (o = l.default.createElement("span", { className: "sui-description" }, this.props.description));
                    var a = "";
                    if ("image" === this.props.type) {
                        var i = "";
                        e && (i = "url(" + e + ")"), a = l.default.createElement("div", { className: "sui-upload-image", "aria-hidden": "true" }, l.default.createElement("div", { className: "sui-image-mask" }), l.default.createElement("div", { role: "button", onClick: this.openMedia.bind(this), className: "sui-image-preview", style: { backgroundImage: i } }))
                    }
                    var s = this.props.fieldClass ? " " + this.props.fieldClass : "";
                    return l.default.createElement("div", { className: "sui-form-field" + s }, r, l.default.createElement("div", { className: "sui-upload " + n }, l.default.createElement("input", { type: "file", value: "", readOnly: "readonly" }), a, l.default.createElement("button", { className: "sui-upload-button", onClick: this.openMedia.bind(this) }, l.default.createElement("i", { className: "sui-icon-upload-cloud", "aria-hidden": "true" }), "image" === this.props.type ? "" + (0, u.translate)("Upload image") : "" + (0, u.translate)("Upload file")), l.default.createElement("div", { className: "sui-upload-file" }, l.default.createElement("span", null, t), l.default.createElement("button", { className: "sui-upload-button--remove", onClick: this.clearImage.bind(this) }, l.default.createElement("i", { className: "sui-icon-close", "aria-hidden": "true" }), l.default.createElement("span", { className: "sui-screen-reader-text" }, "image" === this.props.type ? "" + (0, u.translate)("Remove uploaded image") : "" + (0, u.translate)("Remove uploaded file"))))), o)
                }
            }]), t
        }(s.Component);
    t.default = c
}, , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.showModal = function(e, t) { return function(n) { n({ type: "SHOW_MODAL", modalProps: e, modalType: t }) } }, t.hideModal = function() { return function(e) { e({ type: "HIDE_MODAL" }) } }
}, , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.updateSetting = function(e, t) { return function(n) { window.powerformChanges.settings = !0, n({ type: "UPDATE_SETTING", setting: e, value: t }) } }, t.updateSettings = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_SETTINGS", settings: e }) } }, t.saveBuilder = function(e, t) { return function(n) { window.powerformChanges = { answers: [], settings: !1, saved: !0 }, n({ type: "UPDATE_SETTING", setting: e, value: t }) } }
}, , function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function i() {
        var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "store",
            n = arguments[1],
            i = n || t + "Subscription",
            l = function(e) {
                function n(a, i) { r(this, n); var s = o(this, e.call(this, a, i)); return s[t] = a.store, s }
                return a(n, e), n.prototype.getChildContext = function() { var e; return e = {}, e[t] = this[t], e[i] = null, e }, n.prototype.render = function() { return s.Children.only(this.props.children) }, n
            }(s.Component);
        return l.propTypes = { store: c.a.isRequired, children: u.a.element.isRequired }, l.childContextTypes = (e = {}, e[t] = c.a.isRequired, e[i] = c.b, e), l
    }
    t.a = i;
    var s = n(0),
        l = (n.n(s), n(5)),
        u = n.n(l),
        c = n(47);
    n(34);
    t.b = i()
}, function(e, t, n) {
    "use strict";

    function r() {}
    var o = n(85);
    e.exports = function() {
        function e(e, t, n, r, a, i) { if (i !== o) { var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"); throw s.name = "Invariant Violation", s } }

        function t() { return e }
        e.isRequired = e;
        var n = { array: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: t, element: e, instanceOf: t, node: e, objectOf: t, oneOf: t, oneOfType: t, shape: t, exact: t };
        return n.checkPropTypes = r, n.PropTypes = n, n
    }
}, function(e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o() {
        var e = [],
            t = [];
        return {
            clear: function() { t = a, e = a },
            notify: function() { for (var n = e = t, r = 0; r < n.length; r++) n[r]() },
            get: function() { return t },
            subscribe: function(n) {
                var r = !0;
                return t === e && (t = e.slice()), t.push(n),
                    function() { r && e !== a && (r = !1, t === e && (t = e.slice()), t.splice(t.indexOf(n), 1)) }
            }
        }
    }
    n.d(t, "a", function() { return s });
    var a = null,
        i = { notify: function() {} },
        s = function() {
            function e(t, n, o) { r(this, e), this.store = t, this.parentSub = n, this.onStateChange = o, this.unsubscribe = null, this.listeners = i }
            return e.prototype.addNestedSub = function(e) { return this.trySubscribe(), this.listeners.subscribe(e) }, e.prototype.notifyNestedSubs = function() { this.listeners.notify() }, e.prototype.isSubscribed = function() { return Boolean(this.unsubscribe) }, e.prototype.trySubscribe = function() { this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange), this.listeners = o()) }, e.prototype.tryUnsubscribe = function() { this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null, this.listeners.clear(), this.listeners = i) }, e
        }()
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function o(e, t, n) { for (var r = t.length - 1; r >= 0; r--) { var o = t[r](e); if (o) return o } return function(t, r) { throw new Error("Invalid value of type " + typeof e + " for " + n + " argument when connecting component " + r.wrappedComponentName + ".") } }

    function a(e, t) { return e === t }
    var i = n(48),
        s = n(88),
        l = n(89),
        u = n(102),
        c = n(103),
        p = n(104),
        f = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e };
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.connectHOC,
            n = void 0 === t ? i.a : t,
            d = e.mapStateToPropsFactories,
            h = void 0 === d ? u.a : d,
            m = e.mapDispatchToPropsFactories,
            y = void 0 === m ? l.a : m,
            b = e.mergePropsFactories,
            v = void 0 === b ? c.a : b,
            g = e.selectorFactory,
            _ = void 0 === g ? p.a : g;
        return function(e, t, i) {
            var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                u = l.pure,
                c = void 0 === u || u,
                p = l.areStatesEqual,
                d = void 0 === p ? a : p,
                m = l.areOwnPropsEqual,
                b = void 0 === m ? s.a : m,
                g = l.areStatePropsEqual,
                w = void 0 === g ? s.a : g,
                E = l.areMergedPropsEqual,
                O = void 0 === E ? s.a : E,
                j = r(l, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]),
                x = o(e, h, "mapStateToProps"),
                P = o(t, y, "mapDispatchToProps"),
                C = o(i, v, "mergeProps");
            return n(_, f({ methodName: "connect", getDisplayName: function(e) { return "Connect(" + e + ")" }, shouldHandleStateChanges: Boolean(e), initMapStateToProps: x, initMapDispatchToProps: P, initMergeProps: C, pure: c, areStatesEqual: d, areOwnPropsEqual: b, areStatePropsEqual: w, areMergedPropsEqual: O }, j))
        }
    }()
}, function(e, t, n) {
    "use strict";

    function r(e, t) { return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e !== e && t !== t }

    function o(e, t) {
        if (r(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var n = Object.keys(e),
            o = Object.keys(t);
        if (n.length !== o.length) return !1;
        for (var i = 0; i < n.length; i++)
            if (!a.call(t, n[i]) || !r(e[n[i]], t[n[i]])) return !1;
        return !0
    }
    t.a = o;
    var a = Object.prototype.hasOwnProperty
}, function(e, t, n) {
    "use strict";

    function r(e) { return "function" == typeof e ? Object(s.b)(e, "mapDispatchToProps") : void 0 }

    function o(e) { return e ? void 0 : Object(s.a)(function(e) { return { dispatch: e } }) }

    function a(e) { return e && "object" == typeof e ? Object(s.a)(function(t) { return Object(i.bindActionCreators)(e, t) }) : void 0 }
    var i = n(8),
        s = n(51);
    t.a = [r, o, a]
}, function(e, t, n) {
    "use strict";
    (function(e, r) {
        var o, a = n(92);
        o = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : r;
        var i = Object(a.a)(o);
        t.a = i
    }).call(t, n(50), n(91)(e))
}, function(e, t) {
    e.exports = function(e) {
        if (!e.webpackPolyfill) {
            var t = Object.create(e);
            t.children || (t.children = []), Object.defineProperty(t, "loaded", { enumerable: !0, get: function() { return t.l } }), Object.defineProperty(t, "id", { enumerable: !0, get: function() { return t.i } }), Object.defineProperty(t, "exports", { enumerable: !0 }), t.webpackPolyfill = 1
        }
        return t
    }
}, function(e, t, n) {
    "use strict";

    function r(e) { var t, n = e.Symbol; return "function" == typeof n ? n.observable ? t = n.observable : (t = n("observable"), n.observable = t) : t = "@@observable", t }
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { if (!Object(i.a)(e) || Object(o.a)(e) != s) return !1; var t = Object(a.a)(e); if (null === t) return !0; var n = p.call(t, "constructor") && t.constructor; return "function" == typeof n && n instanceof n && c.call(n) == f }
    var o = n(94),
        a = n(99),
        i = n(101),
        s = "[object Object]",
        l = Function.prototype,
        u = Object.prototype,
        c = l.toString,
        p = u.hasOwnProperty,
        f = c.call(Object);
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return null == e ? void 0 === e ? l : s : u && u in Object(e) ? Object(a.a)(e) : Object(i.a)(e) }
    var o = n(53),
        a = n(97),
        i = n(98),
        s = "[object Null]",
        l = "[object Undefined]",
        u = o.a ? o.a.toStringTag : void 0;
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(96),
        o = "object" == typeof self && self && self.Object === Object && self,
        a = r.a || o || Function("return this")();
    t.a = a
}, function(e, t, n) {
    "use strict";
    (function(e) {
        var n = "object" == typeof e && e && e.Object === Object && e;
        t.a = n
    }).call(t, n(50))
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = i.call(e, l),
            n = e[l];
        try { e[l] = void 0; var r = !0 } catch (e) {}
        var o = s.call(e);
        return r && (t ? e[l] = n : delete e[l]), o
    }
    var o = n(53),
        a = Object.prototype,
        i = a.hasOwnProperty,
        s = a.toString,
        l = o.a ? o.a.toStringTag : void 0;
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return a.call(e) }
    var o = Object.prototype,
        a = o.toString;
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(100),
        o = Object(r.a)(Object.getPrototypeOf, Object);
    t.a = o
}, function(e, t, n) {
    "use strict";

    function r(e, t) { return function(n) { return e(t(n)) } }
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return null != e && "object" == typeof e }
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return "function" == typeof e ? Object(a.b)(e, "mapStateToProps") : void 0 }

    function o(e) { return e ? void 0 : Object(a.a)(function() { return {} }) }
    var a = n(51);
    t.a = [r, o]
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) { return s({}, n, e, t) }

    function o(e) {
        return function(t, n) {
            var r = (n.displayName, n.pure),
                o = n.areMergedPropsEqual,
                a = !1,
                i = void 0;
            return function(t, n, s) { var l = e(t, n, s); return a ? r && o(l, i) || (i = l) : (a = !0, i = l), i }
        }
    }

    function a(e) { return "function" == typeof e ? o(e) : void 0 }

    function i(e) { return e ? void 0 : function() { return r } }
    var s = (n(52), Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e });
    t.a = [a, i]
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function o(e, t, n, r) { return function(o, a) { return n(e(o, a), t(r, a), a) } }

    function a(e, t, n, r, o) {
        function a(o, a) { return h = o, m = a, y = e(h, m), b = t(r, m), v = n(y, b, m), d = !0, v }

        function i() { return y = e(h, m), t.dependsOnOwnProps && (b = t(r, m)), v = n(y, b, m) }

        function s() { return e.dependsOnOwnProps && (y = e(h, m)), t.dependsOnOwnProps && (b = t(r, m)), v = n(y, b, m) }

        function l() {
            var t = e(h, m),
                r = !f(t, y);
            return y = t, r && (v = n(y, b, m)), v
        }

        function u(e, t) {
            var n = !p(t, m),
                r = !c(e, h);
            return h = e, m = t, n && r ? i() : n ? s() : r ? l() : v
        }
        var c = o.areStatesEqual,
            p = o.areOwnPropsEqual,
            f = o.areStatePropsEqual,
            d = !1,
            h = void 0,
            m = void 0,
            y = void 0,
            b = void 0,
            v = void 0;
        return function(e, t) { return d ? u(e, t) : a(e, t) }
    }

    function i(e, t) {
        var n = t.initMapStateToProps,
            i = t.initMapDispatchToProps,
            s = t.initMergeProps,
            l = r(t, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]),
            u = n(e, l),
            c = i(e, l),
            p = s(e, l);
        return (l.pure ? a : o)(u, c, p, e, l)
    }
    t.a = i;
    n(105)
}, function(e, t, n) {
    "use strict";
    n(34)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(0),
        u = n.n(l),
        c = n(5),
        p = n.n(c),
        f = n(20),
        d = n(36),
        h = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = a = o(this, e.call.apply(e, [this].concat(l))), a.history = Object(f.a)(a.props), i = n, o(a, i)
            }
            return a(t, e), t.prototype.componentWillMount = function() { s()(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { BrowserRouter as Router }`.") }, t.prototype.render = function() { return u.a.createElement(d.a, { history: this.history, children: this.props.children }) }, t
        }(u.a.Component);
    h.propTypes = { basename: p.a.string, forceRefresh: p.a.bool, getUserConfirmation: p.a.func, keyLength: p.a.number, children: p.a.node }, t.a = h
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        o = n.n(r),
        a = n(14),
        i = n.n(a),
        s = n(29),
        l = n(25),
        u = n(35),
        c = n(54),
        p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        f = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        d = function() { try { return window.history.state || {} } catch (e) { return {} } },
        h = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            i()(c.b, "Browser history needs a DOM");
            var t = window.history,
                n = Object(c.g)(),
                r = !Object(c.h)(),
                a = e.forceRefresh,
                h = void 0 !== a && a,
                m = e.getUserConfirmation,
                y = void 0 === m ? c.c : m,
                b = e.keyLength,
                v = void 0 === b ? 6 : b,
                g = e.basename ? Object(l.g)(Object(l.a)(e.basename)) : "",
                _ = function(e) {
                    var t = e || {},
                        n = t.key,
                        r = t.state,
                        a = window.location,
                        i = a.pathname,
                        u = a.search,
                        c = a.hash,
                        p = i + u + c;
                    return o()(!g || Object(l.c)(p, g), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + p + '" to begin with "' + g + '".'), g && (p = Object(l.e)(p, g)), Object(s.a)(p, r, n)
                },
                w = function() { return Math.random().toString(36).substr(2, v) },
                E = Object(u.a)(),
                O = function(e) { f(B, e), B.length = t.length, E.notifyListeners(B.location, B.action) },
                j = function(e) { Object(c.d)(e) || C(_(e.state)) },
                x = function() { C(_(d())) },
                P = !1,
                C = function(e) {
                    if (P) P = !1, O();
                    else { E.confirmTransitionTo(e, "POP", y, function(t) { t ? O({ action: "POP", location: e }) : N(e) }) }
                },
                N = function(e) {
                    var t = B.location,
                        n = S.indexOf(t.key); - 1 === n && (n = 0);
                    var r = S.indexOf(e.key); - 1 === r && (r = 0);
                    var o = n - r;
                    o && (P = !0, R(o))
                },
                k = _(d()),
                S = [k.key],
                T = function(e) { return g + Object(l.b)(e) },
                A = function(e, r) {
                    o()(!("object" === (void 0 === e ? "undefined" : p(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
                    var a = Object(s.a)(e, r, w(), B.location);
                    E.confirmTransitionTo(a, "PUSH", y, function(e) {
                        if (e) {
                            var r = T(a),
                                i = a.key,
                                s = a.state;
                            if (n)
                                if (t.pushState({ key: i, state: s }, null, r), h) window.location.href = r;
                                else {
                                    var l = S.indexOf(B.location.key),
                                        u = S.slice(0, -1 === l ? 0 : l + 1);
                                    u.push(a.key), S = u, O({ action: "PUSH", location: a })
                                }
                            else o()(void 0 === s, "Browser history cannot push state in browsers that do not support HTML5 history"), window.location.href = r
                        }
                    })
                },
                M = function(e, r) {
                    o()(!("object" === (void 0 === e ? "undefined" : p(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
                    var a = Object(s.a)(e, r, w(), B.location);
                    E.confirmTransitionTo(a, "REPLACE", y, function(e) {
                        if (e) {
                            var r = T(a),
                                i = a.key,
                                s = a.state;
                            if (n)
                                if (t.replaceState({ key: i, state: s }, null, r), h) window.location.replace(r);
                                else { var l = S.indexOf(B.location.key); - 1 !== l && (S[l] = a.key), O({ action: "REPLACE", location: a }) }
                            else o()(void 0 === s, "Browser history cannot replace state in browsers that do not support HTML5 history"), window.location.replace(r)
                        }
                    })
                },
                R = function(e) { t.go(e) },
                F = function() { return R(-1) },
                D = function() { return R(1) },
                U = 0,
                I = function(e) { U += e, 1 === U ? (Object(c.a)(window, "popstate", j), r && Object(c.a)(window, "hashchange", x)) : 0 === U && (Object(c.e)(window, "popstate", j), r && Object(c.e)(window, "hashchange", x)) },
                L = !1,
                V = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = E.setPrompt(e);
                    return L || (I(1), L = !0),
                        function() { return L && (L = !1, I(-1)), t() }
                },
                q = function(e) {
                    var t = E.appendListener(e);
                    return I(1),
                        function() { I(-1), t() }
                },
                B = { length: t.length, action: "POP", location: k, createHref: T, push: A, replace: M, go: R, goBack: F, goForward: D, block: V, listen: q };
            return B
        };
    t.a = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return "/" === e.charAt(0) }

    function o(e, t) {
        for (var n = t, r = n + 1, o = e.length; r < o; n += 1, r += 1) e[n] = e[r];
        e.pop()
    }

    function a(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = e && e.split("/") || [],
            a = t && t.split("/") || [],
            i = e && r(e),
            s = t && r(t),
            l = i || s;
        if (e && r(e) ? a = n : n.length && (a.pop(), a = a.concat(n)), !a.length) return "/";
        var u = void 0;
        if (a.length) {
            var c = a[a.length - 1];
            u = "." === c || ".." === c || "" === c
        } else u = !1;
        for (var p = 0, f = a.length; f >= 0; f--) { var d = a[f]; "." === d ? o(a, f) : ".." === d ? (o(a, f), p++) : p && (o(a, f), p--) }
        if (!l)
            for (; p--; p) a.unshift("..");
        !l || "" === a[0] || a[0] && r(a[0]) || a.unshift("");
        var h = a.join("/");
        return u && "/" !== h.substr(-1) && (h += "/"), h
    }
    t.a = a
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (e === t) return !0;
        if (null == e || null == t) return !1;
        if (Array.isArray(e)) return Array.isArray(t) && e.length === t.length && e.every(function(e, n) { return r(e, t[n]) });
        var n = void 0 === e ? "undefined" : o(e);
        if (n !== (void 0 === t ? "undefined" : o(t))) return !1;
        if ("object" === n) {
            var a = e.valueOf(),
                i = t.valueOf();
            if (a !== e || i !== t) return r(a, i);
            var s = Object.keys(e),
                l = Object.keys(t);
            return s.length === l.length && s.every(function(n) { return r(e[n], t[n]) })
        }
        return !1
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        o = n.n(r),
        a = n(14),
        i = n.n(a),
        s = n(29),
        l = n(25),
        u = n(35),
        c = n(54),
        p = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        f = { hashbang: { encodePath: function(e) { return "!" === e.charAt(0) ? e : "!/" + Object(l.f)(e) }, decodePath: function(e) { return "!" === e.charAt(0) ? e.substr(1) : e } }, noslash: { encodePath: l.f, decodePath: l.a }, slash: { encodePath: l.a, decodePath: l.a } },
        d = function() {
            var e = window.location.href,
                t = e.indexOf("#");
            return -1 === t ? "" : e.substring(t + 1)
        },
        h = function(e) { return window.location.hash = e },
        m = function(e) {
            var t = window.location.href.indexOf("#");
            window.location.replace(window.location.href.slice(0, t >= 0 ? t : 0) + "#" + e)
        },
        y = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            i()(c.b, "Hash history needs a DOM");
            var t = window.history,
                n = Object(c.f)(),
                r = e.getUserConfirmation,
                a = void 0 === r ? c.c : r,
                y = e.hashType,
                b = void 0 === y ? "slash" : y,
                v = e.basename ? Object(l.g)(Object(l.a)(e.basename)) : "",
                g = f[b],
                _ = g.encodePath,
                w = g.decodePath,
                E = function() { var e = w(d()); return o()(!v || Object(l.c)(e, v), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + e + '" to begin with "' + v + '".'), v && (e = Object(l.e)(e, v)), Object(s.a)(e) },
                O = Object(u.a)(),
                j = function(e) { p(H, e), H.length = t.length, O.notifyListeners(H.location, H.action) },
                x = !1,
                P = null,
                C = function() {
                    var e = d(),
                        t = _(e);
                    if (e !== t) m(t);
                    else {
                        var n = E(),
                            r = H.location;
                        if (!x && Object(s.b)(r, n)) return;
                        if (P === Object(l.b)(n)) return;
                        P = null, N(n)
                    }
                },
                N = function(e) {
                    if (x) x = !1, j();
                    else { O.confirmTransitionTo(e, "POP", a, function(t) { t ? j({ action: "POP", location: e }) : k(e) }) }
                },
                k = function(e) {
                    var t = H.location,
                        n = M.lastIndexOf(Object(l.b)(t)); - 1 === n && (n = 0);
                    var r = M.lastIndexOf(Object(l.b)(e)); - 1 === r && (r = 0);
                    var o = n - r;
                    o && (x = !0, U(o))
                },
                S = d(),
                T = _(S);
            S !== T && m(T);
            var A = E(),
                M = [Object(l.b)(A)],
                R = function(e) { return "#" + _(v + Object(l.b)(e)) },
                F = function(e, t) {
                    o()(void 0 === t, "Hash history cannot push state; it is ignored");
                    var n = Object(s.a)(e, void 0, void 0, H.location);
                    O.confirmTransitionTo(n, "PUSH", a, function(e) {
                        if (e) {
                            var t = Object(l.b)(n),
                                r = _(v + t);
                            if (d() !== r) {
                                P = t, h(r);
                                var a = M.lastIndexOf(Object(l.b)(H.location)),
                                    i = M.slice(0, -1 === a ? 0 : a + 1);
                                i.push(t), M = i, j({ action: "PUSH", location: n })
                            } else o()(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), j()
                        }
                    })
                },
                D = function(e, t) {
                    o()(void 0 === t, "Hash history cannot replace state; it is ignored");
                    var n = Object(s.a)(e, void 0, void 0, H.location);
                    O.confirmTransitionTo(n, "REPLACE", a, function(e) {
                        if (e) {
                            var t = Object(l.b)(n),
                                r = _(v + t);
                            d() !== r && (P = t, m(r));
                            var o = M.indexOf(Object(l.b)(H.location)); - 1 !== o && (M[o] = t), j({ action: "REPLACE", location: n })
                        }
                    })
                },
                U = function(e) { o()(n, "Hash history go(n) causes a full page reload in this browser"), t.go(e) },
                I = function() { return U(-1) },
                L = function() { return U(1) },
                V = 0,
                q = function(e) { V += e, 1 === V ? Object(c.a)(window, "hashchange", C) : 0 === V && Object(c.e)(window, "hashchange", C) },
                B = !1,
                $ = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = O.setPrompt(e);
                    return B || (q(1), B = !0),
                        function() { return B && (B = !1, q(-1)), t() }
                },
                z = function(e) {
                    var t = O.appendListener(e);
                    return q(1),
                        function() { q(-1), t() }
                },
                H = { length: t.length, action: "POP", location: A, createHref: R, push: F, replace: D, go: U, goBack: I, goForward: L, block: $, listen: z };
            return H
        };
    t.a = y
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        o = n.n(r),
        a = n(25),
        i = n(29),
        s = n(35),
        l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        u = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        c = function(e, t, n) { return Math.min(Math.max(e, t), n) },
        p = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.getUserConfirmation,
                n = e.initialEntries,
                r = void 0 === n ? ["/"] : n,
                p = e.initialIndex,
                f = void 0 === p ? 0 : p,
                d = e.keyLength,
                h = void 0 === d ? 6 : d,
                m = Object(s.a)(),
                y = function(e) { u(k, e), k.length = k.entries.length, m.notifyListeners(k.location, k.action) },
                b = function() { return Math.random().toString(36).substr(2, h) },
                v = c(f, 0, r.length - 1),
                g = r.map(function(e) { return "string" == typeof e ? Object(i.a)(e, void 0, b()) : Object(i.a)(e, void 0, e.key || b()) }),
                _ = a.b,
                w = function(e, n) {
                    o()(!("object" === (void 0 === e ? "undefined" : l(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
                    var r = Object(i.a)(e, n, b(), k.location);
                    m.confirmTransitionTo(r, "PUSH", t, function(e) {
                        if (e) {
                            var t = k.index,
                                n = t + 1,
                                o = k.entries.slice(0);
                            o.length > n ? o.splice(n, o.length - n, r) : o.push(r), y({ action: "PUSH", location: r, index: n, entries: o })
                        }
                    })
                },
                E = function(e, n) {
                    o()(!("object" === (void 0 === e ? "undefined" : l(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
                    var r = Object(i.a)(e, n, b(), k.location);
                    m.confirmTransitionTo(r, "REPLACE", t, function(e) { e && (k.entries[k.index] = r, y({ action: "REPLACE", location: r })) })
                },
                O = function(e) {
                    var n = c(k.index + e, 0, k.entries.length - 1),
                        r = k.entries[n];
                    m.confirmTransitionTo(r, "POP", t, function(e) { e ? y({ action: "POP", location: r, index: n }) : y() })
                },
                j = function() { return O(-1) },
                x = function() { return O(1) },
                P = function(e) { var t = k.index + e; return t >= 0 && t < k.entries.length },
                C = function() { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; return m.setPrompt(e) },
                N = function(e) { return m.appendListener(e) },
                k = { length: g.length, action: "POP", location: g[v], index: v, entries: g, createHref: _, push: w, replace: E, go: O, goBack: j, goForward: x, canGo: P, block: C, listen: N };
            return k
        };
    t.a = p
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(0),
        u = n.n(l),
        c = n(5),
        p = n.n(c),
        f = n(20),
        d = n(36),
        h = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = a = o(this, e.call.apply(e, [this].concat(l))), a.history = Object(f.b)(a.props), i = n, o(a, i)
            }
            return a(t, e), t.prototype.componentWillMount = function() { s()(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { HashRouter as Router }`.") }, t.prototype.render = function() { return u.a.createElement(d.a, { history: this.history, children: this.props.children }) }, t
        }(u.a.Component);
    h.propTypes = { basename: p.a.string, getUserConfirmation: p.a.func, hashType: p.a.oneOf(["hashbang", "noslash", "slash"]), children: p.a.node }, t.a = h
}, function(e, t, n) {
    "use strict";
    var r = n(114);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(0),
        u = n.n(l),
        c = n(5),
        p = n.n(c),
        f = n(20),
        d = n(37),
        h = function(e) {
            function t() {
                var n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = a = o(this, e.call.apply(e, [this].concat(l))), a.history = Object(f.d)(a.props), i = n, o(a, i)
            }
            return a(t, e), t.prototype.componentWillMount = function() { s()(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { MemoryRouter as Router }`.") }, t.prototype.render = function() { return u.a.createElement(d.a, { history: this.history, children: this.props.children }) }, t
        }(u.a.Component);
    h.propTypes = { initialEntries: p.a.array, initialIndex: p.a.number, getUserConfirmation: p.a.func, keyLength: p.a.number, children: p.a.node }, t.a = h
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }
    var o = n(0),
        a = n.n(o),
        i = n(5),
        s = n.n(i),
        l = n(56),
        u = n(55),
        c = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        f = function(e) {
            var t = e.to,
                n = e.exact,
                o = e.strict,
                i = e.location,
                s = e.activeClassName,
                f = e.className,
                d = e.activeStyle,
                h = e.style,
                m = e.isActive,
                y = e["aria-current"],
                b = r(e, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]),
                v = "object" === (void 0 === t ? "undefined" : p(t)) ? t.pathname : t,
                g = v && v.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
            return a.a.createElement(l.a, {
                path: g,
                exact: n,
                strict: o,
                location: i,
                children: function(e) {
                    var n = e.location,
                        r = e.match,
                        o = !!(m ? m(r, n) : r);
                    return a.a.createElement(u.a, c({ to: t, className: o ? [f, s].filter(function(e) { return e }).join(" ") : f, style: o ? c({}, h, d) : h, "aria-current": o && y || null }, b))
                }
            })
        };
    f.propTypes = { to: u.a.propTypes.to, exact: s.a.bool, strict: s.a.bool, location: s.a.object, activeClassName: s.a.string, className: s.a.string, activeStyle: s.a.object, style: s.a.object, isActive: s.a.func, "aria-current": s.a.oneOf(["page", "step", "location", "date", "time", "true"]) }, f.defaultProps = { activeClassName: "active", "aria-current": "page" }, t.a = f
}, function(e, t) { e.exports = Array.isArray || function(e) { return "[object Array]" == Object.prototype.toString.call(e) } }, function(e, t, n) {
    "use strict";
    var r = n(118);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(0),
        s = n.n(i),
        l = n(5),
        u = n.n(l),
        c = n(14),
        p = n.n(c),
        f = function(e) {
            function t() { return r(this, t), o(this, e.apply(this, arguments)) }
            return a(t, e), t.prototype.enable = function(e) { this.unblock && this.unblock(), this.unblock = this.context.router.history.block(e) }, t.prototype.disable = function() { this.unblock && (this.unblock(), this.unblock = null) }, t.prototype.componentWillMount = function() { p()(this.context.router, "You should not use <Prompt> outside a <Router>"), this.props.when && this.enable(this.props.message) }, t.prototype.componentWillReceiveProps = function(e) { e.when ? this.props.when && this.props.message === e.message || this.enable(e.message) : this.disable() }, t.prototype.componentWillUnmount = function() { this.disable() }, t.prototype.render = function() { return null }, t
        }(s.a.Component);
    f.propTypes = { when: u.a.bool, message: u.a.oneOfType([u.a.func, u.a.string]).isRequired }, f.defaultProps = { when: !0 }, f.contextTypes = { router: u.a.shape({ history: u.a.shape({ block: u.a.func.isRequired }).isRequired }).isRequired }, t.a = f
}, function(e, t, n) {
    "use strict";
    var r = n(120);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(0),
        s = n.n(i),
        l = n(5),
        u = n.n(l),
        c = n(17),
        p = n.n(c),
        f = n(14),
        d = n.n(f),
        h = n(20),
        m = n(59),
        y = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        b = function(e) {
            function t() { return r(this, t), o(this, e.apply(this, arguments)) }
            return a(t, e), t.prototype.isStatic = function() { return this.context.router && this.context.router.staticContext }, t.prototype.componentWillMount = function() { d()(this.context.router, "You should not use <Redirect> outside a <Router>"), this.isStatic() && this.perform() }, t.prototype.componentDidMount = function() { this.isStatic() || this.perform() }, t.prototype.componentDidUpdate = function(e) {
                var t = Object(h.c)(e.to),
                    n = Object(h.c)(this.props.to);
                if (Object(h.f)(t, n)) return void p()(!1, "You tried to redirect to the same route you're currently on: \"" + n.pathname + n.search + '"');
                this.perform()
            }, t.prototype.computeTo = function(e) {
                var t = e.computedMatch,
                    n = e.to;
                return t ? "string" == typeof n ? Object(m.a)(n, t.params) : y({}, n, { pathname: Object(m.a)(n.pathname, t.params) }) : n
            }, t.prototype.perform = function() {
                var e = this.context.router.history,
                    t = this.props.push,
                    n = this.computeTo(this.props);
                t ? e.push(n) : e.replace(n)
            }, t.prototype.render = function() { return null }, t
        }(s.a.Component);
    b.propTypes = { computedMatch: u.a.object, push: u.a.bool, from: u.a.string, to: u.a.oneOfType([u.a.string, u.a.object]).isRequired }, b.defaultProps = { push: !1 }, b.contextTypes = { router: u.a.shape({ history: u.a.shape({ push: u.a.func.isRequired, replace: u.a.func.isRequired }).isRequired, staticContext: u.a.object }).isRequired }, t.a = b
}, function(e, t, n) {
    "use strict";
    var r = n(122);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var s = n(17),
        l = n.n(s),
        u = n(14),
        c = n.n(u),
        p = n(0),
        f = n.n(p),
        d = n(5),
        h = n.n(d),
        m = n(20),
        y = n(37),
        b = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        v = function(e) { return "/" === e.charAt(0) ? e : "/" + e },
        g = function(e, t) { return e ? b({}, t, { pathname: v(e) + t.pathname }) : t },
        _ = function(e, t) { if (!e) return t; var n = v(e); return 0 !== t.pathname.indexOf(n) ? t : b({}, t, { pathname: t.pathname.substr(n.length) }) },
        w = function(e) { return "string" == typeof e ? e : Object(m.e)(e) },
        E = function(e) { return function() { c()(!1, "You cannot %s with <StaticRouter>", e) } },
        O = function() {},
        j = function(e) {
            function t() {
                var n, r, i;
                o(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = r = a(this, e.call.apply(e, [this].concat(l))), r.createHref = function(e) { return v(r.props.basename + w(e)) }, r.handlePush = function(e) {
                    var t = r.props,
                        n = t.basename,
                        o = t.context;
                    o.action = "PUSH", o.location = g(n, Object(m.c)(e)), o.url = w(o.location)
                }, r.handleReplace = function(e) {
                    var t = r.props,
                        n = t.basename,
                        o = t.context;
                    o.action = "REPLACE", o.location = g(n, Object(m.c)(e)), o.url = w(o.location)
                }, r.handleListen = function() { return O }, r.handleBlock = function() { return O }, i = n, a(r, i)
            }
            return i(t, e), t.prototype.getChildContext = function() { return { router: { staticContext: this.props.context } } }, t.prototype.componentWillMount = function() { l()(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { StaticRouter as Router }`.") }, t.prototype.render = function() {
                var e = this.props,
                    t = e.basename,
                    n = (e.context, e.location),
                    o = r(e, ["basename", "context", "location"]),
                    a = { createHref: this.createHref, action: "POP", location: _(t, Object(m.c)(n)), push: this.handlePush, replace: this.handleReplace, go: E("go"), goBack: E("goBack"), goForward: E("goForward"), listen: this.handleListen, block: this.handleBlock };
                return f.a.createElement(y.a, b({}, o, { history: a }))
            }, t
        }(f.a.Component);
    j.propTypes = { basename: h.a.string, context: h.a.object.isRequired, location: h.a.oneOfType([h.a.string, h.a.object]) }, j.defaultProps = { basename: "", location: "/" }, j.childContextTypes = { router: h.a.object.isRequired }, t.a = j
}, function(e, t, n) {
    "use strict";
    var r = n(124);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(0),
        s = n.n(i),
        l = n(5),
        u = n.n(l),
        c = n(17),
        p = n.n(c),
        f = n(14),
        d = n.n(f),
        h = n(38),
        m = function(e) {
            function t() { return r(this, t), o(this, e.apply(this, arguments)) }
            return a(t, e), t.prototype.componentWillMount = function() { d()(this.context.router, "You should not use <Switch> outside a <Router>") }, t.prototype.componentWillReceiveProps = function(e) { p()(!(e.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'), p()(!(!e.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') }, t.prototype.render = function() {
                var e = this.context.router.route,
                    t = this.props.children,
                    n = this.props.location || e.location,
                    r = void 0,
                    o = void 0;
                return s.a.Children.forEach(t, function(t) {
                    if (null == r && s.a.isValidElement(t)) {
                        var a = t.props,
                            i = a.path,
                            l = a.exact,
                            u = a.strict,
                            c = a.sensitive,
                            p = a.from,
                            f = i || p;
                        o = t, r = Object(h.a)(n.pathname, { path: f, exact: l, strict: u, sensitive: c }, e.match)
                    }
                }), r ? s.a.cloneElement(o, { location: n, computedMatch: r }) : null
            }, t
        }(s.a.Component);
    m.contextTypes = { router: u.a.shape({ route: u.a.object.isRequired }).isRequired }, m.propTypes = { children: u.a.node, location: u.a.object }, t.a = m
}, function(e, t, n) {
    "use strict";
    var r = n(59);
    t.a = r.a
}, function(e, t, n) {
    "use strict";
    var r = n(38);
    t.a = r.a
}, function(e, t, n) {
    "use strict";
    var r = n(128);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }
    var o = n(0),
        a = n.n(o),
        i = n(5),
        s = n.n(i),
        l = n(49),
        u = n.n(l),
        c = n(57),
        p = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        f = function(e) {
            var t = function(t) {
                var n = t.wrappedComponentRef,
                    o = r(t, ["wrappedComponentRef"]);
                return a.a.createElement(c.a, { children: function(t) { return a.a.createElement(e, p({}, o, t, { ref: n })) } })
            };
            return t.displayName = "withRouter(" + (e.displayName || e.name) + ")", t.WrappedComponent = e, t.propTypes = { wrappedComponentRef: s.a.func }, u()(t, e)
        };
    t.a = f
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return function(t) {
            var n = t.dispatch,
                r = t.getState;
            return function(t) { return function(o) { return "function" == typeof o ? o(n, r, e) : t(o) } }
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = r();
    o.withExtraArgument = r, t.default = o
}, function(e, t, n) {
    function r() { u.throwErrors && "undefined" != typeof window && window.console && window.console.warn && window.console.warn.apply(window.console, arguments) }

    function o(e) { return Array.prototype.slice.call(e) }

    function a(e) {
        var t, n = e[0],
            a = {};
        for (("string" != typeof n || e.length > 3 || e.length > 2 && "object" == typeof e[1] && "object" == typeof e[2]) && r("Deprecated Invocation: `translate()` accepts ( string, [string], [object] ). These arguments passed:", o(e), ". See https://github.com/pentatonicfunk/i18n-wp-plugin#translate-method"), 2 === e.length && "string" == typeof n && "string" == typeof e[1] && r("Invalid Invocation: `translate()` requires an options object for plural translations, but passed:", o(e)), t = 0; t < e.length; t++) "object" == typeof e[t] && (a = e[t]);
        if ("string" == typeof n ? a.original = n : "object" == typeof a.original && (a.plural = a.original.plural, a.count = a.original.count, a.original = a.original.single), "string" == typeof e[1] && (a.plural = e[1]), void 0 === a.original) throw new Error("Translate called without a `string` value as first argument.");
        return a
    }

    function i(e, t) {
        switch (e) {
            case "gettext":
                return [t.original];
            case "ngettext":
                return [t.original, t.plural, t.count];
            case "npgettext":
                return [t.context, t.original, t.plural, t.count];
            case "pgettext":
                return [t.context, t.original]
        }
        return []
    }

    function s(e, t) { var n, r = "gettext"; return t.context && (r = "p" + r), "string" == typeof t.original && "string" == typeof t.plural && (r = "n" + r), n = i(r, t), e[r].apply(e, n) }

    function l(e, t) {
        var n, r;
        for (n = v.length - 1; n >= 0; n--)
            if (r = v[n](y({}, t)), e.state.locale[r.original]) return s(e.state.jed, r);
        return null
    }

    function u() {
        if (!(this instanceof u)) return new u;
        this.defaultLocaleSlug = "en", this.state = { numberFormatSettings: {}, jed: void 0, locale: void 0, localeSlug: void 0, translations: m({ max: 100 }) }, this.componentUpdateHooks = [], this.translateHooks = [], this.stateObserver = new d, this.stateObserver.setMaxListeners(0), this.configure()
    }
    var c = n(131)("i18n-wp-plugin"),
        p = n(134),
        f = n(135),
        d = n(64).EventEmitter,
        h = n(138).default,
        m = n(142),
        y = n(67),
        b = n(143),
        v = [function(e) { return e }],
        g = {};
    u.throwErrors = !1, u.prototype.numberFormat = function(e) {
        var t = arguments[1] || {},
            n = "number" == typeof t ? t : t.decimals || 0,
            r = t.decPoint || this.state.numberFormatSettings.decimal_point || ".",
            o = t.thousandsSep || this.state.numberFormatSettings.thousands_sep || ",";
        return b(e, n, r, o)
    }, u.prototype.configure = function(e) { y(this, e || {}), this.setLocale() }, u.prototype.setLocale = function(e) {
        if (e && e[""] && e[""]["key-hash"]) {
            var t, n, r, o = e[""]["key-hash"],
                i = function(e, t) { const n = !1 === t ? "" : String(t); if (void 0 !== g[n + e]) return g[n + e]; var r = f().update(e).digest("hex"); return g[n + e] = t ? r.substr(0, t) : r },
                l = function(e) { return function(t) { return t.context ? (t.original = i(t.context + String.fromCharCode(4) + t.original, e), delete t.context) : t.original = i(t.original, e), t } };
            if ("sha1" === o.substr(0, 4))
                if (4 === o.length) v.push(l(!1));
                else {
                    var u = o.substr(5).indexOf("-");
                    if (u < 0) t = Number(o.substr(5)), v.push(l(t));
                    else
                        for (n = Number(o.substr(5, u)), r = Number(o.substr(6 + u)), t = n; t <= r; t++) v.push(l(t))
                }
        }
        if (e && e[""].localeSlug)
            if (e[""].localeSlug === this.state.localeSlug) {
                if (e === this.state.locale) return;
                y(this.state.locale, e)
            } else this.state.locale = y({}, e);
        else this.state.locale = { "": { localeSlug: this.defaultLocaleSlug } };
        this.state.localeSlug = this.state.locale[""].localeSlug, this.state.jed = new p({ locale_data: { messages: this.state.locale } }), this.state.numberFormatSettings.decimal_point = s(this.state.jed, a(["number_format_decimals"])), this.state.numberFormatSettings.thousands_sep = s(this.state.jed, a(["number_format_thousands_sep"])), "number_format_decimals" === this.state.numberFormatSettings.decimal_point && (this.state.numberFormatSettings.decimal_point = "."), "number_format_thousands_sep" === this.state.numberFormatSettings.thousands_sep && (this.state.numberFormatSettings.thousands_sep = ","), this.state.translations.clear(), this.stateObserver.emit("change")
    }, u.prototype.getLocale = function() { return this.state.locale }, u.prototype.getLocaleSlug = function() { return this.state.localeSlug }, u.prototype.addTranslations = function(e) {
        for (var t in e) "" !== t && (this.state.jed.options.locale_data.messages[t] = e[t]);
        this.state.translations.clear(), this.stateObserver.emit("change")
    }, u.prototype.hasTranslation = function() { return !!l(this, a(arguments)) }, u.prototype.translate = function() {
        var e, t, n, r, o, i;
        if (e = a(arguments), i = !e.components) { try { o = JSON.stringify(e) } catch (e) { i = !1 } if (o && (t = this.state.translations.get(o))) return t }
        if (t = l(this, e), t || (t = s(this.state.jed, e)), e.args) {
            n = Array.isArray(e.args) ? e.args.slice(0) : [e.args], n.unshift(t);
            try { t = p.sprintf.apply(p, n) } catch (e) {
                if (!window || !window.console) return;
                r = this.throwErrors ? "error" : "warn", "string" != typeof e ? window.console[r](e) : window.console[r]("i18n sprintf error:", n)
            }
        }
        return e.components && (t = h({ mixedString: t, components: e.components, throwErrors: this.throwErrors })), this.translateHooks.forEach(function(n) { t = n(t, e) }), i && this.state.translations.set(o, t), t
    }, u.prototype.reRenderTranslations = function() { c("Re-rendering all translations due to external request"), this.state.translations.clear(), this.stateObserver.emit("change") }, u.prototype.registerComponentUpdateHook = function(e) { this.componentUpdateHooks.push(e) }, u.prototype.registerTranslateHook = function(e) { this.translateHooks.push(e) }, e.exports = u
}, function(e, t, n) {
    (function(r) {
        function o() { return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)) }

        function a(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), n) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var o = 0,
                    a = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) { "%%" !== e && (o++, "%c" === e && (a = o)) }), e.splice(a, 0, r)
            }
        }

        function i() { return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments) }

        function s(e) { try { null == e ? t.storage.removeItem("debug") : t.storage.debug = e } catch (e) {} }

        function l() { var e; try { e = t.storage.debug } catch (e) {} return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e }
        t = e.exports = n(132), t.log = i, t.formatArgs = a, t.save = s, t.load = l, t.useColors = o, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() { try { return window.localStorage } catch (e) {} }(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.formatters.j = function(e) { try { return JSON.stringify(e) } catch (e) { return "[UnexpectedJSONParseError]: " + e.message } }, t.enable(l())
    }).call(t, n(61))
}, function(e, t, n) {
    function r(e) { var n, r = 0; for (n in e) r = (r << 5) - r + e.charCodeAt(n), r |= 0; return t.colors[Math.abs(r) % t.colors.length] }

    function o(e) {
        function n() {
            if (n.enabled) {
                var e = n,
                    r = +new Date,
                    a = r - (o || r);
                e.diff = a, e.prev = o, e.curr = r, o = r;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = t.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var l = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(n, r) {
                    if ("%%" === n) return n;
                    l++;
                    var o = t.formatters[r];
                    if ("function" == typeof o) {
                        var a = i[l];
                        n = o.call(e, a), i.splice(l, 1), l--
                    }
                    return n
                }), t.formatArgs.call(e, i);
                (n.log || t.log || console.log.bind(console)).apply(e, i)
            }
        }
        var o;
        return n.namespace = e, n.enabled = t.enabled(e), n.useColors = t.useColors(), n.color = r(e), n.destroy = a, "function" == typeof t.init && t.init(n), t.instances.push(n), n
    }

    function a() { var e = t.instances.indexOf(this); return -1 !== e && (t.instances.splice(e, 1), !0) }

    function i(e) {
        t.save(e), t.names = [], t.skips = [];
        var n, r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            o = r.length;
        for (n = 0; n < o; n++) r[n] && (e = r[n].replace(/\*/g, ".*?"), "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
        for (n = 0; n < t.instances.length; n++) {
            var a = t.instances[n];
            a.enabled = t.enabled(a.namespace)
        }
    }

    function s() { t.enable("") }

    function l(e) {
        if ("*" === e[e.length - 1]) return !0;
        var n, r;
        for (n = 0, r = t.skips.length; n < r; n++)
            if (t.skips[n].test(e)) return !1;
        for (n = 0, r = t.names.length; n < r; n++)
            if (t.names[n].test(e)) return !0;
        return !1
    }

    function u(e) { return e instanceof Error ? e.stack || e.message : e }
    t = e.exports = o.debug = o.default = o, t.coerce = u, t.disable = s, t.enable = i, t.enabled = l, t.humanize = n(133), t.instances = [], t.names = [], t.skips = [], t.formatters = {}
}, function(e, t) {
    function n(e) {
        if (e = String(e), !(e.length > 100)) {
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (t) {
                var n = parseFloat(t[1]);
                switch ((t[2] || "ms").toLowerCase()) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return n * c;
                    case "days":
                    case "day":
                    case "d":
                        return n * u;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return n * l;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return n * s;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return n * i;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return n;
                    default:
                        return
                }
            }
        }
    }

    function r(e) { return e >= u ? Math.round(e / u) + "d" : e >= l ? Math.round(e / l) + "h" : e >= s ? Math.round(e / s) + "m" : e >= i ? Math.round(e / i) + "s" : e + "ms" }

    function o(e) { return a(e, u, "day") || a(e, l, "hour") || a(e, s, "minute") || a(e, i, "second") || e + " ms" }

    function a(e, t, n) { if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s" }
    var i = 1e3,
        s = 60 * i,
        l = 60 * s,
        u = 24 * l,
        c = 365.25 * u;
    e.exports = function(e, t) { t = t || {}; var a = typeof e; if ("string" === a && e.length > 0) return n(e); if ("number" === a && !1 === isNaN(e)) return t.long ? o(e) : r(e); throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e)) }
}, function(e, t, n) {
    /**
     * @preserve jed.js v0.5.0beta https://github.com/SlexAxton/Jed
     */
    ! function(n, r) {
        function o(e) { return d.PF.compile(e || "nplurals=2; plural=(n != 1);") }

        function a(e, t) { this._key = e, this._i18n = t }
        var i = Array.prototype,
            s = Object.prototype,
            l = i.slice,
            u = s.hasOwnProperty,
            c = i.forEach,
            p = {},
            f = {
                forEach: function(e, t, n) {
                    var r, o, a;
                    if (null !== e)
                        if (c && e.forEach === c) e.forEach(t, n);
                        else if (e.length === +e.length) {
                        for (r = 0, o = e.length; r < o; r++)
                            if (r in e && t.call(n, e[r], r, e) === p) return
                    } else
                        for (a in e)
                            if (u.call(e, a) && t.call(n, e[a], a, e) === p) return
                },
                extend: function(e) { return this.forEach(l.call(arguments, 1), function(t) { for (var n in t) e[n] = t[n] }), e }
            },
            d = function(e) { if (this.defaults = { locale_data: { messages: { "": { domain: "messages", lang: "en", plural_forms: "nplurals=2; plural=(n != 1);" } } }, domain: "messages", debug: !1 }, this.options = f.extend({}, this.defaults, e), this.textdomain(this.options.domain), e.domain && !this.options.locale_data[this.options.domain]) throw new Error("Text domain set to non-existent domain: `" + e.domain + "`") };
        d.context_delimiter = String.fromCharCode(4), f.extend(a.prototype, { onDomain: function(e) { return this._domain = e, this }, withContext: function(e) { return this._context = e, this }, ifPlural: function(e, t) { return this._val = e, this._pkey = t, this }, fetch: function(e) { return "[object Array]" != {}.toString.call(e) && (e = [].slice.call(arguments, 0)), (e && e.length ? d.sprintf : function(e) { return e })(this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val), e) } }), f.extend(d.prototype, {
            translate: function(e) { return new a(e, this) },
            textdomain: function(e) {
                if (!e) return this._textdomain;
                this._textdomain = e
            },
            gettext: function(e) {
                /**
                 * @preserve jed.js v0.5.0beta https://github.com/SlexAxton/Jed
                 */
                return this.dcnpgettext.call(this, void 0, void 0, e)
            },
            dgettext: function(e, t) { return this.dcnpgettext.call(this, e, void 0, t) },
            dcgettext: function(e, t) { return this.dcnpgettext.call(this, e, void 0, t) },
            ngettext: function(e, t, n) { return this.dcnpgettext.call(this, void 0, void 0, e, t, n) },
            dngettext: function(e, t, n, r) { return this.dcnpgettext.call(this, e, void 0, t, n, r) },
            dcngettext: function(e, t, n, r) { return this.dcnpgettext.call(this, e, void 0, t, n, r) },
            pgettext: function(e, t) { return this.dcnpgettext.call(this, void 0, e, t) },
            dpgettext: function(e, t, n) { return this.dcnpgettext.call(this, e, t, n) },
            dcpgettext: function(e, t, n) { return this.dcnpgettext.call(this, e, t, n) },
            npgettext: function(e, t, n, r) { return this.dcnpgettext.call(this, void 0, e, t, n, r) },
            dnpgettext: function(e, t, n, r, o) { return this.dcnpgettext.call(this, e, t, n, r, o) },
            dcnpgettext: function(e, t, n, r, a) {
                r = r || n, e = e || this._textdomain;
                var i;
                if (!this.options) return i = new d, i.dcnpgettext.call(i, void 0, void 0, n, r, a);
                if (!this.options.locale_data) throw new Error("No locale data provided.");
                if (!this.options.locale_data[e]) throw new Error("Domain `" + e + "` was not found.");
                if (!this.options.locale_data[e][""]) throw new Error("No locale meta information provided.");
                if (!n) throw new Error("No translation key found.");
                var s, l, u, c = t ? t + d.context_delimiter + n : n,
                    p = this.options.locale_data,
                    f = p[e],
                    h = (p.messages || this.defaults.locale_data.messages)[""],
                    m = f[""].plural_forms || f[""]["Plural-Forms"] || f[""]["plural-forms"] || h.plural_forms || h["Plural-Forms"] || h["plural-forms"];
                if (void 0 === a) u = 1;
                else {
                    if ("number" != typeof a && (a = parseInt(a, 10), isNaN(a))) throw new Error("The number that was passed in is not a number.");
                    u = o(m)(a) + 1
                }
                if (!f) throw new Error("No domain named `" + e + "` could be found.");
                return !(s = f[c]) || u >= s.length ? (this.options.missing_key_callback && this.options.missing_key_callback(c, e), l = [null, n, r], !0 === this.options.debug && console.log(l[o(m)(a) + 1]), l[o()(a) + 1]) : (l = s[u]) || (l = [null, n, r], l[o()(a) + 1])
            }
        });
        var h = function() {
                function e(e) { return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() }

                function t(e, t) { for (var n = []; t > 0; n[--t] = e); return n.join("") }
                var n = function() { return n.cache.hasOwnProperty(arguments[0]) || (n.cache[arguments[0]] = n.parse(arguments[0])), n.format.call(null, n.cache[arguments[0]], arguments) };
                return n.format = function(n, r) {
                    var o, a, i, s, l, u, c, p = 1,
                        f = n.length,
                        d = "",
                        m = [];
                    for (a = 0; a < f; a++)
                        if ("string" === (d = e(n[a]))) m.push(n[a]);
                        else if ("array" === d) {
                        if (s = n[a], s[2])
                            for (o = r[p], i = 0; i < s[2].length; i++) {
                                if (!o.hasOwnProperty(s[2][i])) throw h('[sprintf] property "%s" does not exist', s[2][i]);
                                o = o[s[2][i]]
                            } else o = s[1] ? r[s[1]] : r[p++];
                        if (/[^s]/.test(s[8]) && "number" != e(o)) throw h("[sprintf] expecting number but found %s", e(o));
                        switch (void 0 !== o && null !== o || (o = ""), s[8]) {
                            case "b":
                                o = o.toString(2);
                                break;
                            case "c":
                                o = String.fromCharCode(o);
                                break;
                            case "d":
                                o = parseInt(o, 10);
                                break;
                            case "e":
                                o = s[7] ? o.toExponential(s[7]) : o.toExponential();
                                break;
                            case "f":
                                o = s[7] ? parseFloat(o).toFixed(s[7]) : parseFloat(o);
                                break;
                            case "o":
                                o = o.toString(8);
                                break;
                            case "s":
                                o = (o = String(o)) && s[7] ? o.substring(0, s[7]) : o;
                                break;
                            case "u":
                                o = Math.abs(o);
                                break;
                            case "x":
                                o = o.toString(16);
                                break;
                            case "X":
                                o = o.toString(16).toUpperCase()
                        }
                        o = /[def]/.test(s[8]) && s[3] && o >= 0 ? "+" + o : o, u = s[4] ? "0" == s[4] ? "0" : s[4].charAt(1) : " ", c = s[6] - String(o).length, l = s[6] ? t(u, c) : "", m.push(s[5] ? o + l : l + o)
                    }
                    return m.join("")
                }, n.cache = {}, n.parse = function(e) {
                    for (var t = e, n = [], r = [], o = 0; t;) {
                        if (null !== (n = /^[^\x25]+/.exec(t))) r.push(n[0]);
                        else if (null !== (n = /^\x25{2}/.exec(t))) r.push("%");
                        else {
                            if (null === (n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))) throw "[sprintf] huh?";
                            if (n[2]) {
                                o |= 1;
                                var a = [],
                                    i = n[2],
                                    s = [];
                                if (null === (s = /^([a-z_][a-z_\d]*)/i.exec(i))) throw "[sprintf] huh?";
                                for (a.push(s[1]);
                                    "" !== (i = i.substring(s[0].length));)
                                    if (null !== (s = /^\.([a-z_][a-z_\d]*)/i.exec(i))) a.push(s[1]);
                                    else {
                                        if (null === (s = /^\[(\d+)\]/.exec(i))) throw "[sprintf] huh?";
                                        a.push(s[1])
                                    }
                                n[2] = a
                            } else o |= 2;
                            if (3 === o) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                            r.push(n)
                        }
                        t = t.substring(n[0].length)
                    }
                    return r
                }, n
            }(),
            m = function(e, t) { return t.unshift(e), h.apply(null, t) };
        d.parse_plural = function(e, t) { return e = e.replace(/n/g, t), d.parse_expression(e) }, d.sprintf = function(e, t) { return "[object Array]" == {}.toString.call(t) ? m(e, [].slice.call(t)) : h.apply(this, [].slice.call(arguments)) }, d.prototype.sprintf = function() { return d.sprintf.apply(this, arguments) }, d.PF = {}, d.PF.parse = function(e) { var t = d.PF.extractPluralExpr(e); return d.PF.parser.parse.call(d.PF.parser, t) }, d.PF.compile = function(e) {
            function t(e) { return !0 === e ? 1 : e || 0 }
            var n = d.PF.parse(e);
            return function(e) { return t(d.PF.interpreter(n)(e)) }
        }, d.PF.interpreter = function(e) {
            return function(t) {
                switch (e.type) {
                    case "GROUP":
                        return d.PF.interpreter(e.expr)(t);
                    case "TERNARY":
                        return d.PF.interpreter(e.expr)(t) ? d.PF.interpreter(e.truthy)(t) : d.PF.interpreter(e.falsey)(t);
                    case "OR":
                        return d.PF.interpreter(e.left)(t) || d.PF.interpreter(e.right)(t);
                    case "AND":
                        return d.PF.interpreter(e.left)(t) && d.PF.interpreter(e.right)(t);
                    case "LT":
                        return d.PF.interpreter(e.left)(t) < d.PF.interpreter(e.right)(t);
                    case "GT":
                        return d.PF.interpreter(e.left)(t) > d.PF.interpreter(e.right)(t);
                    case "LTE":
                        return d.PF.interpreter(e.left)(t) <= d.PF.interpreter(e.right)(t);
                    case "GTE":
                        return d.PF.interpreter(e.left)(t) >= d.PF.interpreter(e.right)(t);
                    case "EQ":
                        return d.PF.interpreter(e.left)(t) == d.PF.interpreter(e.right)(t);
                    case "NEQ":
                        return d.PF.interpreter(e.left)(t) != d.PF.interpreter(e.right)(t);
                    case "MOD":
                        return d.PF.interpreter(e.left)(t) % d.PF.interpreter(e.right)(t);
                    case "VAR":
                        return t;
                    case "NUM":
                        return e.val;
                    default:
                        throw new Error("Invalid Token found.")
                }
            }
        }, d.PF.extractPluralExpr = function(e) {
            e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), /;\s*$/.test(e) || (e = e.concat(";"));
            var t, n = /nplurals\=(\d+);/,
                r = /plural\=(.*);/,
                o = e.match(n),
                a = {};
            if (!(o.length > 1)) throw new Error("nplurals not found in plural_forms string: " + e);
            if (a.nplurals = o[1], e = e.replace(n, ""), !((t = e.match(r)) && t.length > 1)) throw new Error("`plural` expression not found: " + e);
            return t[1]
        }, d.PF.parser = function() {
            var e = {
                    trace: function() {},
                    yy: {},
                    symbols_: { error: 2, expressions: 3, e: 4, EOF: 5, "?": 6, ":": 7, "||": 8, "&&": 9, "<": 10, "<=": 11, ">": 12, ">=": 13, "!=": 14, "==": 15, "%": 16, "(": 17, ")": 18, n: 19, NUMBER: 20, $accept: 0, $end: 1 },
                    terminals_: { 2: "error", 5: "EOF", 6: "?", 7: ":", 8: "||", 9: "&&", 10: "<", 11: "<=", 12: ">", 13: ">=", 14: "!=", 15: "==", 16: "%", 17: "(", 18: ")", 19: "n", 20: "NUMBER" },
                    productions_: [0, [3, 2],
                        [4, 5],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 3],
                        [4, 1],
                        [4, 1]
                    ],
                    performAction: function(e, t, n, r, o, a, i) {
                        var s = a.length - 1;
                        switch (o) {
                            case 1:
                                return { type: "GROUP", expr: a[s - 1] };
                            case 2:
                                this.$ = { type: "TERNARY", expr: a[s - 4], truthy: a[s - 2], falsey: a[s] };
                                break;
                            case 3:
                                this.$ = { type: "OR", left: a[s - 2], right: a[s] };
                                break;
                            case 4:
                                this.$ = { type: "AND", left: a[s - 2], right: a[s] };
                                break;
                            case 5:
                                this.$ = { type: "LT", left: a[s - 2], right: a[s] };
                                break;
                            case 6:
                                this.$ = { type: "LTE", left: a[s - 2], right: a[s] };
                                break;
                            case 7:
                                this.$ = { type: "GT", left: a[s - 2], right: a[s] };
                                break;
                            case 8:
                                this.$ = { type: "GTE", left: a[s - 2], right: a[s] };
                                break;
                            case 9:
                                this.$ = { type: "NEQ", left: a[s - 2], right: a[s] };
                                break;
                            case 10:
                                this.$ = { type: "EQ", left: a[s - 2], right: a[s] };
                                break;
                            case 11:
                                this.$ = { type: "MOD", left: a[s - 2], right: a[s] };
                                break;
                            case 12:
                                this.$ = { type: "GROUP", expr: a[s - 1] };
                                break;
                            case 13:
                                this.$ = { type: "VAR" };
                                break;
                            case 14:
                                this.$ = { type: "NUM", val: Number(e) }
                        }
                    },
                    table: [{ 3: 1, 4: 2, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 1: [3] }, { 5: [1, 6], 6: [1, 7], 8: [1, 8], 9: [1, 9], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16] }, { 4: 17, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 5: [2, 13], 6: [2, 13], 7: [2, 13], 8: [2, 13], 9: [2, 13], 10: [2, 13], 11: [2, 13], 12: [2, 13], 13: [2, 13], 14: [2, 13], 15: [2, 13], 16: [2, 13], 18: [2, 13] }, { 5: [2, 14], 6: [2, 14], 7: [2, 14], 8: [2, 14], 9: [2, 14], 10: [2, 14], 11: [2, 14], 12: [2, 14], 13: [2, 14], 14: [2, 14], 15: [2, 14], 16: [2, 14], 18: [2, 14] }, { 1: [2, 1] }, { 4: 18, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 19, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 20, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 21, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 22, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 23, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 24, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 25, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 26, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 4: 27, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 6: [1, 7], 8: [1, 8], 9: [1, 9], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16], 18: [1, 28] }, { 6: [1, 7], 7: [1, 29], 8: [1, 8], 9: [1, 9], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16] }, { 5: [2, 3], 6: [2, 3], 7: [2, 3], 8: [2, 3], 9: [1, 9], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16], 18: [2, 3] }, { 5: [2, 4], 6: [2, 4], 7: [2, 4], 8: [2, 4], 9: [2, 4], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16], 18: [2, 4] }, { 5: [2, 5], 6: [2, 5], 7: [2, 5], 8: [2, 5], 9: [2, 5], 10: [2, 5], 11: [2, 5], 12: [2, 5], 13: [2, 5], 14: [2, 5], 15: [2, 5], 16: [1, 16], 18: [2, 5] }, { 5: [2, 6], 6: [2, 6], 7: [2, 6], 8: [2, 6], 9: [2, 6], 10: [2, 6], 11: [2, 6], 12: [2, 6], 13: [2, 6], 14: [2, 6], 15: [2, 6], 16: [1, 16], 18: [2, 6] }, { 5: [2, 7], 6: [2, 7], 7: [2, 7], 8: [2, 7], 9: [2, 7], 10: [2, 7], 11: [2, 7], 12: [2, 7], 13: [2, 7], 14: [2, 7], 15: [2, 7], 16: [1, 16], 18: [2, 7] }, { 5: [2, 8], 6: [2, 8], 7: [2, 8], 8: [2, 8], 9: [2, 8], 10: [2, 8], 11: [2, 8], 12: [2, 8], 13: [2, 8], 14: [2, 8], 15: [2, 8], 16: [1, 16], 18: [2, 8] }, { 5: [2, 9], 6: [2, 9], 7: [2, 9], 8: [2, 9], 9: [2, 9], 10: [2, 9], 11: [2, 9], 12: [2, 9], 13: [2, 9], 14: [2, 9], 15: [2, 9], 16: [1, 16], 18: [2, 9] }, { 5: [2, 10], 6: [2, 10], 7: [2, 10], 8: [2, 10], 9: [2, 10], 10: [2, 10], 11: [2, 10], 12: [2, 10], 13: [2, 10], 14: [2, 10], 15: [2, 10], 16: [1, 16], 18: [2, 10] }, { 5: [2, 11], 6: [2, 11], 7: [2, 11], 8: [2, 11], 9: [2, 11], 10: [2, 11], 11: [2, 11], 12: [2, 11], 13: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 18: [2, 11] }, { 5: [2, 12], 6: [2, 12], 7: [2, 12], 8: [2, 12], 9: [2, 12], 10: [2, 12], 11: [2, 12], 12: [2, 12], 13: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 18: [2, 12] }, { 4: 30, 17: [1, 3], 19: [1, 4], 20: [1, 5] }, { 5: [2, 2], 6: [1, 7], 7: [2, 2], 8: [1, 8], 9: [1, 9], 10: [1, 10], 11: [1, 11], 12: [1, 12], 13: [1, 13], 14: [1, 14], 15: [1, 15], 16: [1, 16], 18: [2, 2] }],
                    defaultActions: { 6: [2, 1] },
                    parseError: function(e, t) { throw new Error(e) },
                    parse: function(e) {
                        function t() { var e; return e = n.lexer.lex() || 1, "number" != typeof e && (e = n.symbols_[e] || e), e }
                        var n = this,
                            r = [0],
                            o = [null],
                            a = [],
                            i = this.table,
                            s = "",
                            l = 0,
                            u = 0,
                            c = 0,
                            p = 2;
                        this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, void 0 === this.lexer.yylloc && (this.lexer.yylloc = {});
                        var f = this.lexer.yylloc;
                        a.push(f), "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                        for (var d, h, m, y, b, v, g, _, w, E = {};;) {
                            if (m = r[r.length - 1], this.defaultActions[m] ? y = this.defaultActions[m] : (null == d && (d = t()), y = i[m] && i[m][d]), void 0 === y || !y.length || !y[0]) {
                                if (!c) {
                                    w = [];
                                    for (v in i[m]) this.terminals_[v] && v > 2 && w.push("'" + this.terminals_[v] + "'");
                                    var O = "";
                                    O = this.lexer.showPosition ? "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + w.join(", ") + ", got '" + this.terminals_[d] + "'" : "Parse error on line " + (l + 1) + ": Unexpected " + (1 == d ? "end of input" : "'" + (this.terminals_[d] || d) + "'"), this.parseError(O, { text: this.lexer.match, token: this.terminals_[d] || d, line: this.lexer.yylineno, loc: f, expected: w })
                                }
                                if (3 == c) {
                                    if (1 == d) throw new Error(O || "Parsing halted.");
                                    u = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, f = this.lexer.yylloc, d = t()
                                }
                                for (;;) { if (p.toString() in i[m]) break; if (0 == m) throw new Error(O || "Parsing halted.");! function(e) { r.length = r.length - 2 * e, o.length = o.length - e, a.length = a.length - e }(1), m = r[r.length - 1] }
                                h = d, d = p, m = r[r.length - 1], y = i[m] && i[m][p], c = 3
                            }
                            if (y[0] instanceof Array && y.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + d);
                            switch (y[0]) {
                                case 1:
                                    r.push(d), o.push(this.lexer.yytext), a.push(this.lexer.yylloc), r.push(y[1]), d = null, h ? (d = h, h = null) : (u = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, f = this.lexer.yylloc, c > 0 && c--);
                                    break;
                                case 2:
                                    if (g = this.productions_[y[1]][1], E.$ = o[o.length - g], E._$ = { first_line: a[a.length - (g || 1)].first_line, last_line: a[a.length - 1].last_line, first_column: a[a.length - (g || 1)].first_column, last_column: a[a.length - 1].last_column }, void 0 !== (b = this.performAction.call(E, s, u, l, this.yy, y[1], o, a))) return b;
                                    g && (r = r.slice(0, -1 * g * 2), o = o.slice(0, -1 * g), a = a.slice(0, -1 * g)), r.push(this.productions_[y[1]][0]), o.push(E.$), a.push(E._$), _ = i[r[r.length - 2]][r[r.length - 1]], r.push(_);
                                    break;
                                case 3:
                                    return !0
                            }
                        }
                        return !0
                    }
                },
                t = function() {
                    var e = {
                        EOF: 1,
                        parseError: function(e, t) {
                            if (!this.yy.parseError) throw new Error(e);
                            this.yy.parseError(e, t)
                        },
                        setInput: function(e) { return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this },
                        input: function() { var e = this._input[0]; return this.yytext += e, this.yyleng++, this.match += e, this.matched += e, e.match(/\n/) && this.yylineno++, this._input = this._input.slice(1), e },
                        unput: function(e) { return this._input = e + this._input, this },
                        more: function() { return this._more = !0, this },
                        pastInput: function() { var e = this.matched.substr(0, this.matched.length - this.match.length); return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "") },
                        upcomingInput: function() { var e = this.match; return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "") },
                        showPosition: function() {
                            var e = this.pastInput(),
                                t = new Array(e.length + 1).join("-");
                            return e + this.upcomingInput() + "\n" + t + "^"
                        },
                        next: function() {
                            if (this.done) return this.EOF;
                            this._input || (this.done = !0);
                            var e, t;
                            this._more || (this.yytext = "", this.match = "");
                            for (var n = this._currentRules(), r = 0; r < n.length; r++)
                                if (e = this._input.match(this.rules[n[r]])) return t = e[0].match(/\n.*/g), t && (this.yylineno += t.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: t ? t[t.length - 1].length - 1 : this.yylloc.last_column + e[0].length }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], this.performAction.call(this, this.yy, this, n[r], this.conditionStack[this.conditionStack.length - 1]) || void 0;
                            if ("" === this._input) return this.EOF;
                            this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno })
                        },
                        lex: function() { var e = this.next(); return void 0 !== e ? e : this.lex() },
                        begin: function(e) { this.conditionStack.push(e) },
                        popState: function() { return this.conditionStack.pop() },
                        _currentRules: function() { return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules },
                        topState: function() { return this.conditionStack[this.conditionStack.length - 2] },
                        pushState: function(e) { this.begin(e) }
                    };
                    return e.performAction = function(e, t, n, r) {
                        switch (n) {
                            case 0:
                                break;
                            case 1:
                                return 20;
                            case 2:
                                return 19;
                            case 3:
                                return 8;
                            case 4:
                                return 9;
                            case 5:
                                return 6;
                            case 6:
                                return 7;
                            case 7:
                                return 11;
                            case 8:
                                return 13;
                            case 9:
                                return 10;
                            case 10:
                                return 12;
                            case 11:
                                return 14;
                            case 12:
                                return 15;
                            case 13:
                                return 16;
                            case 14:
                                return 17;
                            case 15:
                                return 18;
                            case 16:
                                return 5;
                            case 17:
                                return "INVALID"
                        }
                    }, e.rules = [/^\s+/, /^[0-9]+(\.[0-9]+)?\b/, /^n\b/, /^\|\|/, /^&&/, /^\?/, /^:/, /^<=/, /^>=/, /^</, /^>/, /^!=/, /^==/, /^%/, /^\(/, /^\)/, /^$/, /^./], e.conditions = { INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], inclusive: !0 } }, e
                }();
            return e.lexer = t, e
        }(), void 0 !== e && e.exports && (t = e.exports = d), t.Jed = d
    }()
}, function(e, t, n) {
    "use strict";

    function r() {
        if (!(this instanceof r)) return new r;
        p.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
    }
    var o = n(39),
        a = n(136),
        i = n(137),
        s = o.rotl32,
        l = o.sum32,
        u = o.sum32_5,
        c = i.ft_1,
        p = a.BlockHash,
        f = [1518500249, 1859775393, 2400959708, 3395469782];
    o.inherits(r, p), e.exports = r, r.blockSize = 512, r.outSize = 160, r.hmacStrength = 80, r.padLength = 64, r.prototype._update = function(e, t) {
        for (var n = this.W, r = 0; r < 16; r++) n[r] = e[t + r];
        for (; r < n.length; r++) n[r] = s(n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16], 1);
        var o = this.h[0],
            a = this.h[1],
            i = this.h[2],
            p = this.h[3],
            d = this.h[4];
        for (r = 0; r < n.length; r++) {
            var h = ~~(r / 20),
                m = u(s(o, 5), c(h, a, i, p), d, n[r], f[h]);
            d = p, p = i, i = s(a, 30), a = o, o = m
        }
        this.h[0] = l(this.h[0], o), this.h[1] = l(this.h[1], a), this.h[2] = l(this.h[2], i), this.h[3] = l(this.h[3], p), this.h[4] = l(this.h[4], d)
    }, r.prototype._digest = function(e) { return "hex" === e ? o.toHex32(this.h, "big") : o.split32(this.h, "big") }
}, function(e, t, n) {
    "use strict";

    function r() { this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32 }
    var o = n(39),
        a = n(62);
    t.BlockHash = r, r.prototype.update = function(e, t) {
        if (e = o.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
            e = this.pending;
            var n = e.length % this._delta8;
            this.pending = e.slice(e.length - n, e.length), 0 === this.pending.length && (this.pending = null), e = o.join32(e, 0, e.length - n, this.endian);
            for (var r = 0; r < e.length; r += this._delta32) this._update(e, r, r + this._delta32)
        }
        return this
    }, r.prototype.digest = function(e) { return this.update(this._pad()), a(null === this.pending), this._digest(e) }, r.prototype._pad = function() {
        var e = this.pendingTotal,
            t = this._delta8,
            n = t - (e + this.padLength) % t,
            r = new Array(n + this.padLength);
        r[0] = 128;
        for (var o = 1; o < n; o++) r[o] = 0;
        if (e <<= 3, "big" === this.endian) {
            for (var a = 8; a < this.padLength; a++) r[o++] = 0;
            r[o++] = 0, r[o++] = 0, r[o++] = 0, r[o++] = 0, r[o++] = e >>> 24 & 255, r[o++] = e >>> 16 & 255, r[o++] = e >>> 8 & 255, r[o++] = 255 & e
        } else
            for (r[o++] = 255 & e, r[o++] = e >>> 8 & 255, r[o++] = e >>> 16 & 255, r[o++] = e >>> 24 & 255, r[o++] = 0, r[o++] = 0, r[o++] = 0, r[o++] = 0, a = 8; a < this.padLength; a++) r[o++] = 0;
        return r
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) { return 0 === e ? o(t, n, r) : 1 === e || 3 === e ? i(t, n, r) : 2 === e ? a(t, n, r) : void 0 }

    function o(e, t, n) { return e & t ^ ~e & n }

    function a(e, t, n) { return e & t ^ e & n ^ t & n }

    function i(e, t, n) { return e ^ t ^ n }

    function s(e) { return f(e, 2) ^ f(e, 13) ^ f(e, 22) }

    function l(e) { return f(e, 6) ^ f(e, 11) ^ f(e, 25) }

    function u(e) { return f(e, 7) ^ f(e, 18) ^ e >>> 3 }

    function c(e) { return f(e, 17) ^ f(e, 19) ^ e >>> 10 }
    var p = n(39),
        f = p.rotr32;
    t.ft_1 = r, t.ch32 = o, t.maj32 = a, t.p32 = i, t.s0_256 = s, t.s1_256 = l, t.g0_256 = u, t.g1_256 = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) {
        var n, r, o = t[e],
            a = 0;
        for (r = e + 1; r < t.length; r++)
            if (n = t[r], n.value === o.value) {
                if ("componentOpen" === n.type) { a++; continue }
                if ("componentClose" === n.type) {
                    if (0 === a) return r;
                    a--
                }
            }
        throw new Error("Missing closing component token `" + o.value + "`")
    }

    function a(e, t) {
        var n, r, i, l, c, f, d, m, y, b, v = [],
            g = {};
        for (f = 0; f < e.length; f++)
            if (c = e[f], "string" !== c.type) {
                if (!t.hasOwnProperty(c.value) || void 0 === t[c.value]) throw new Error("Invalid interpolation, missing component node: `" + c.value + "`");
                if ("object" !== s(t[c.value])) throw new Error("Invalid interpolation, component node must be a ReactElement or null: `" + c.value + "`", "\n> " + h);
                if ("componentClose" === c.type) throw new Error("Missing opening component token: `" + c.value + "`");
                if ("componentOpen" === c.type) { n = t[c.value], i = f; break }
                v.push(t[c.value])
            } else v.push(c.value);
        return n && (l = o(i, e), d = e.slice(i + 1, l), m = a(d, t), r = u.default.cloneElement(n, {}, m), v.push(r), l < e.length - 1 && (y = e.slice(l + 1), b = a(y, t), v = v.concat(b))), 1 === v.length ? v[0] : (v.forEach(function(e, t) { e && (g["interpolation-child-" + t] = e) }), (0, p.default)(g))
    }

    function i(e) {
        var t = e.mixedString,
            n = e.components,
            r = e.throwErrors;
        if (h = t, !n) return t;
        if ("object" !== (void 0 === n ? "undefined" : s(n))) { if (r) throw new Error("Interpolation Error: unable to process `" + t + "` because components is not an object"); return t }
        var o = (0, d.default)(t);
        try { return a(o, n) } catch (e) { if (r) throw new Error("Interpolation Error: unable to process `" + t + "` because of error `" + e.message + "`"); return t }
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        l = n(0),
        u = r(l),
        c = n(139),
        p = r(c),
        f = n(141),
        d = r(f),
        h = void 0;
    t.default = i
}, function(e, t, n) {
    "use strict";

    function r(e) { var t = e && (w && e[w] || e[E]); if ("function" == typeof t) return t }

    function o(e) { var t = { "=": "=0", ":": "=2" }; return "$" + ("" + e).replace(/[=:]/g, function(e) { return t[e] }) }

    function a(e, t) { return e && "object" == typeof e && null != e.key ? o(e.key) : t.toString(36) }

    function i(e, t, n, o) {
        var s = typeof e;
        if ("undefined" !== s && "boolean" !== s || (e = null), null === e || "string" === s || "number" === s || "object" === s && e.$$typeof === m) return n(o, e, "" === t ? g + a(e, 0) : t), 1;
        var l, u, c = 0,
            p = "" === t ? g : t + _;
        if (Array.isArray(e))
            for (var f = 0; f < e.length; f++) l = e[f], u = p + a(l, f), c += i(l, u, n, o);
        else {
            var d = r(e);
            if (d)
                for (var h, y = d.call(e), v = 0; !(h = y.next()).done;) l = h.value, u = p + a(l, v++), c += i(l, u, n, o);
            else if ("object" === s) {
                var w = "",
                    E = "" + e;
                b(!1, "Objects are not valid as a React child (found: %s).%s", "[object Object]" === E ? "object with keys {" + Object.keys(e).join(", ") + "}" : E, w)
            }
        }
        return c
    }

    function s(e, t, n) { return null == e ? 0 : i(e, "", t, n) }

    function l(e) { return ("" + e).replace(O, "$&/") }

    function u(e, t) { return h.cloneElement(e, { key: t }, void 0 !== e.props ? e.props.children : void 0) }

    function c(e, t, n, r) { this.result = e, this.keyPrefix = t, this.func = n, this.context = r, this.count = 0 }

    function p(e, t, n) {
        var r = e.result,
            o = e.keyPrefix,
            a = e.func,
            i = e.context,
            s = a.call(i, t, e.count++);
        Array.isArray(s) ? f(s, r, n, y.thatReturnsArgument) : null != s && (h.isValidElement(s) && (s = u(s, o + (!s.key || t && t.key === s.key ? "" : l(s.key) + "/") + n)), r.push(s))
    }

    function f(e, t, n, r, o) {
        var a = "";
        null != n && (a = l(n) + "/");
        var i = c.getPooled(t, a, r, o);
        s(e, p, i), c.release(i)
    }

    function d(e) {
        if ("object" != typeof e || !e || Array.isArray(e)) return v(!1, "React.addons.createFragment only accepts a single object. Got: %s", e), e;
        if (h.isValidElement(e)) return v(!1, "React.addons.createFragment does not accept a ReactElement without a wrapper object."), e;
        b(1 !== e.nodeType, "React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.");
        var t = [];
        for (var n in e) f(e[n], t, n, y.thatReturnsArgument);
        return t
    }
    var h = n(0),
        m = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
        y = n(65),
        b = n(66),
        v = n(140),
        g = ".",
        _ = ":",
        w = "function" == typeof Symbol && Symbol.iterator,
        E = "@@iterator",
        O = /\/+/g,
        j = x,
        x = function(e) { var t = this; if (t.instancePool.length) { var n = t.instancePool.pop(); return t.call(n, e), n } return new t(e) },
        P = function(e) {
            var t = this;
            b(e instanceof t, "Trying to release an instance into a pool of a different type."), e.destructor(), t.instancePool.length < t.poolSize && t.instancePool.push(e)
        },
        C = function(e, t, n, r) { var o = this; if (o.instancePool.length) { var a = o.instancePool.pop(); return o.call(a, e, t, n, r), a } return new o(e, t, n, r) };
    c.prototype.destructor = function() { this.result = null, this.keyPrefix = null, this.func = null, this.context = null, this.count = 0 },
        function(e, t) {
            var n = e;
            n.instancePool = [], n.getPooled = t || j, n.poolSize || (n.poolSize = 10), n.release = P
        }(c, C);
    e.exports = d
}, function(e, t, n) {
    "use strict";
    var r = n(65),
        o = r;
    e.exports = o
}, function(e, t, n) {
    "use strict";

    function r(e) { return e.match(/^\{\{\//) ? { type: "componentClose", value: e.replace(/\W/g, "") } : e.match(/\/\}\}$/) ? { type: "componentSelfClosing", value: e.replace(/\W/g, "") } : e.match(/^\{\{/) ? { type: "componentOpen", value: e.replace(/\W/g, "") } : { type: "string", value: e } }
    e.exports = function(e) { return e.split(/(\{\{\/?\s*\w+\s*\/?\}\})/g).map(r) }
}, function(e, t, n) {
    function r(e) { if (!(this instanceof r)) return new r(e); "number" == typeof e && (e = { max: e }), e || (e = {}), o.EventEmitter.call(this), this.cache = {}, this.head = this.tail = null, this.length = 0, this.max = e.max || 1e3, this.maxAge = e.maxAge || 0 }
    var o = n(64),
        a = n(63);
    e.exports = r, a(r, o.EventEmitter), Object.defineProperty(r.prototype, "keys", { get: function() { return Object.keys(this.cache) } }), r.prototype.clear = function() { this.cache = {}, this.head = this.tail = null, this.length = 0 }, r.prototype.remove = function(e) { if ("string" != typeof e && (e = "" + e), this.cache.hasOwnProperty(e)) { var t = this.cache[e]; return delete this.cache[e], this._unlink(e, t.prev, t.next), t.value } }, r.prototype._unlink = function(e, t, n) { this.length--, 0 === this.length ? this.head = this.tail = null : this.head === e ? (this.head = t, this.cache[this.head].next = null) : this.tail === e ? (this.tail = n, this.cache[this.tail].prev = null) : (this.cache[t].next = n, this.cache[n].prev = t) }, r.prototype.peek = function(e) { if (this.cache.hasOwnProperty(e)) { var t = this.cache[e]; if (this._checkAge(e, t)) return t.value } }, r.prototype.set = function(e, t) {
        "string" != typeof e && (e = "" + e);
        var n;
        if (this.cache.hasOwnProperty(e)) {
            if (n = this.cache[e], n.value = t, this.maxAge && (n.modified = Date.now()), e === this.head) return t;
            this._unlink(e, n.prev, n.next)
        } else n = { value: t, modified: 0, next: null, prev: null }, this.maxAge && (n.modified = Date.now()), this.cache[e] = n, this.length === this.max && this.evict();
        return this.length++, n.next = null, n.prev = this.head, this.head && (this.cache[this.head].next = e), this.head = e, this.tail || (this.tail = e), t
    }, r.prototype._checkAge = function(e, t) { return !(this.maxAge && Date.now() - t.modified > this.maxAge) || (this.remove(e), this.emit("evict", { key: e, value: t.value }), !1) }, r.prototype.get = function(e) { if ("string" != typeof e && (e = "" + e), this.cache.hasOwnProperty(e)) { var t = this.cache[e]; if (this._checkAge(e, t)) return this.head !== e && (e === this.tail ? (this.tail = t.next, this.cache[this.tail].prev = null) : this.cache[t.prev].next = t.next, this.cache[t.next].prev = t.prev, this.cache[this.head].next = e, t.prev = this.head, t.next = null, this.head = e), t.value } }, r.prototype.evict = function() {
        if (this.tail) {
            var e = this.tail,
                t = this.remove(this.tail);
            this.emit("evict", { key: e, value: t })
        }
    }
}, function(e, t) {
    /**
     * Exposes number format capability
     *
     * @copyright Copyright (c) 2013 Kevin van Zonneveld (http://kvz.io) and Contributors (http://phpjs.org/authors).
     * @license See CREDITS.md
     * @see https://github.com/kvz/phpjs/blob/ffe1356af23a6f2512c84c954dd4e828e92579fa/functions/strings/number_format.js
     */
    function n(e, t, n, r) {
        e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
        var o = isFinite(+e) ? +e : 0,
            a = isFinite(+t) ? Math.abs(t) : 0,
            i = void 0 === r ? "," : r,
            s = void 0 === n ? "." : n,
            l = "";
        return l = (a ? function(e, t) { var n = Math.pow(10, t); return "" + (Math.round(e * n) / n).toFixed(t) }(o, a) : "" + Math.round(o)).split("."), l[0].length > 3 && (l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)), (l[1] || "").length < a && (l[1] = l[1] || "", l[1] += new Array(a - l[1].length + 1).join("0")), l.join(s)
    }
    e.exports = n
}, function(e, t, n) {
    var r = n(0),
        o = n(67),
        a = n(145);
    e.exports = function(e) {
        var t = { numberFormat: e.numberFormat.bind(e), translate: e.translate.bind(e) };
        return function(n) {
            var i = n.displayName || n.name || "",
                s = a({ displayName: "Localized(" + i + ")", componentDidMount: function() { this.boundForceUpdate = this.forceUpdate.bind(this), e.stateObserver.addListener("change", this.boundForceUpdate) }, componentWillUnmount: function() { this.boundForceUpdate && e.stateObserver.removeListener("change", this.boundForceUpdate) }, render: function() { var e = o({}, this.props, t); return r.createElement(n, e) } });
            return s._composedComponent = n, s
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n(146);
    if (void 0 === r) throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");
    var a = (new r.Component).updater;
    e.exports = o(r.Component, r.isValidElement, a)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e }

    function o(e, t, n) {
        function o(e, t) {
            var n = v.hasOwnProperty(t) ? v[t] : null;
            O.hasOwnProperty(t) && s("OVERRIDE_BASE" === n, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", t), e && s("DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", t)
        }

        function u(e, n) {
            if (n) {
                s("function" != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."), s(!t(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
                var r = e.prototype,
                    a = r.__reactAutoBindPairs;
                n.hasOwnProperty(l) && _.mixins(e, n.mixins);
                for (var i in n)
                    if (n.hasOwnProperty(i) && i !== l) {
                        var u = n[i],
                            c = r.hasOwnProperty(i);
                        if (o(c, i), _.hasOwnProperty(i)) _[i](e, u);
                        else {
                            var p = v.hasOwnProperty(i),
                                h = "function" == typeof u,
                                m = h && !p && !c && !1 !== n.autobind;
                            if (m) a.push(i, u), r[i] = u;
                            else if (c) {
                                var y = v[i];
                                s(p && ("DEFINE_MANY_MERGED" === y || "DEFINE_MANY" === y), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", y, i), "DEFINE_MANY_MERGED" === y ? r[i] = f(r[i], u) : "DEFINE_MANY" === y && (r[i] = d(r[i], u))
                            } else r[i] = u
                        }
                    }
            } else;
        }

        function c(e, t) {
            if (t)
                for (var n in t) {
                    var r = t[n];
                    if (t.hasOwnProperty(n)) {
                        var o = n in _;
                        s(!o, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', n);
                        var a = n in e;
                        if (a) { var i = g.hasOwnProperty(n) ? g[n] : null; return s("DEFINE_MANY_MERGED" === i, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", n), void(e[n] = f(e[n], r)) }
                        e[n] = r
                    }
                }
        }

        function p(e, t) { s(e && t && "object" == typeof e && "object" == typeof t, "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."); for (var n in t) t.hasOwnProperty(n) && (s(void 0 === e[n], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", n), e[n] = t[n]); return e }

        function f(e, t) {
            return function() {
                var n = e.apply(this, arguments),
                    r = t.apply(this, arguments);
                if (null == n) return r;
                if (null == r) return n;
                var o = {};
                return p(o, n), p(o, r), o
            }
        }

        function d(e, t) { return function() { e.apply(this, arguments), t.apply(this, arguments) } }

        function h(e, t) { var n = t.bind(e); return n }

        function m(e) {
            for (var t = e.__reactAutoBindPairs, n = 0; n < t.length; n += 2) {
                var r = t[n],
                    o = t[n + 1];
                e[r] = h(e, o)
            }
        }

        function y(e) {
            var t = r(function(e, r, o) {
                this.__reactAutoBindPairs.length && m(this), this.props = e, this.context = r, this.refs = i, this.updater = o || n, this.state = null;
                var a = this.getInitialState ? this.getInitialState() : null;
                s("object" == typeof a && !Array.isArray(a), "%s.getInitialState(): must return an object or null", t.displayName || "ReactCompositeComponent"), this.state = a
            });
            t.prototype = new j, t.prototype.constructor = t, t.prototype.__reactAutoBindPairs = [], b.forEach(u.bind(null, t)), u(t, w), u(t, e), u(t, E), t.getDefaultProps && (t.defaultProps = t.getDefaultProps()), s(t.prototype.render, "createClass(...): Class specification must implement a `render` method.");
            for (var o in v) t.prototype[o] || (t.prototype[o] = null);
            return t
        }
        var b = [],
            v = { mixins: "DEFINE_MANY", statics: "DEFINE_MANY", propTypes: "DEFINE_MANY", contextTypes: "DEFINE_MANY", childContextTypes: "DEFINE_MANY", getDefaultProps: "DEFINE_MANY_MERGED", getInitialState: "DEFINE_MANY_MERGED", getChildContext: "DEFINE_MANY_MERGED", render: "DEFINE_ONCE", componentWillMount: "DEFINE_MANY", componentDidMount: "DEFINE_MANY", componentWillReceiveProps: "DEFINE_MANY", shouldComponentUpdate: "DEFINE_ONCE", componentWillUpdate: "DEFINE_MANY", componentDidUpdate: "DEFINE_MANY", componentWillUnmount: "DEFINE_MANY", UNSAFE_componentWillMount: "DEFINE_MANY", UNSAFE_componentWillReceiveProps: "DEFINE_MANY", UNSAFE_componentWillUpdate: "DEFINE_MANY", updateComponent: "OVERRIDE_BASE" },
            g = { getDerivedStateFromProps: "DEFINE_MANY_MERGED" },
            _ = {
                displayName: function(e, t) { e.displayName = t },
                mixins: function(e, t) {
                    if (t)
                        for (var n = 0; n < t.length; n++) u(e, t[n])
                },
                childContextTypes: function(e, t) { e.childContextTypes = a({}, e.childContextTypes, t) },
                contextTypes: function(e, t) { e.contextTypes = a({}, e.contextTypes, t) },
                getDefaultProps: function(e, t) { e.getDefaultProps ? e.getDefaultProps = f(e.getDefaultProps, t) : e.getDefaultProps = t },
                propTypes: function(e, t) { e.propTypes = a({}, e.propTypes, t) },
                statics: function(e, t) { c(e, t) },
                autobind: function() {}
            },
            w = { componentDidMount: function() { this.__isMounted = !0 } },
            E = { componentWillUnmount: function() { this.__isMounted = !1 } },
            O = { replaceState: function(e, t) { this.updater.enqueueReplaceState(this, e, t) }, isMounted: function() { return !!this.__isMounted } },
            j = function() {};
        return a(j.prototype, e.prototype, O), y
    }
    var a = n(147),
        i = n(148),
        s = n(66),
        l = "mixins";
    e.exports = o
}, function(e, t, n) {
    "use strict";

    function r(e) { if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined"); return Object(e) }
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    var o = Object.getOwnPropertySymbols,
        a = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
    e.exports = function() { try { if (!Object.assign) return !1; var e = new String("abc"); if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1; for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n; if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) { return t[e] }).join("")) return !1; var r = {}; return "abcdefghijklmnopqrst".split("").forEach(function(e) { r[e] = e }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("") } catch (e) { return !1 } }() ? Object.assign : function(e, t) { for (var n, s, l = r(e), u = 1; u < arguments.length; u++) { n = Object(arguments[u]); for (var c in n) a.call(n, c) && (l[c] = n[c]); if (o) { s = o(n); for (var p = 0; p < s.length; p++) i.call(n, s[p]) && (l[s[p]] = n[s[p]]) } } return l }
}, function(e, t, n) {
    "use strict";
    var r = {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(30),
        f = r(p),
        d = function(e) {
            function t(e) {
                o(this, t);
                var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                    r = { form: { shortcode: "powerform_form", type: "custom_form", processAction: powerformData.adminUrl + "admin.php?page=powerform-cform", processNonce: powerformData.formProcessNonce, exportNonce: powerformData.formExportNonce, submissions: powerformData.adminUrl + "admin.php?page=powerform-entries&form_type=powerform_forms&form_id=" + n.props.id, dropdownLabel: (0, c.translate)("Open form options") }, poll: { shortcode: "powerform_poll", type: "poll", processAction: powerformData.adminUrl + "admin.php?page=powerform-poll", processNonce: powerformData.pollProcessNonce, exportNonce: powerformData.pollExportNonce, submissions: powerformData.adminUrl + "admin.php?page=powerform-entries&form_type=powerform_polls&form_id=" + n.props.id, dropdownLabel: (0, c.translate)("Open poll options") }, quiz: { shortcode: "powerform_quiz", type: "quiz", processAction: powerformData.adminUrl + "admin.php?page=powerform-quiz", processNonce: powerformData.quizProcessNonce, exportNonce: powerformData.quizExportNonce, submissions: powerformData.adminUrl + "admin.php?page=powerform-entries&form_type=powerform_quizzes&form_id=" + n.props.id, dropdownLabel: (0, c.translate)("Open quiz options") } };
                return n.copyToClipboard = n.copyToClipboard.bind(n), n.data = r[n.props.type], n
            }
            return i(t, e), s(t, [{ key: "copyToClipboard", value: function() { this.input.select(), document.execCommand("copy"), new f.default({ type: "success", text: (0, c.translate)("Shortcode has been copied successfully."), time: 4e3 }).open() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.data.processAction + "&export=true&module_id=" + this.props.id + "&exportnonce=" + this.data.exportNonce + "&module_type=" + this.data.type,
                        n = this.data.processAction + "&delete=true&module_id=" + this.props.id + "&nonce=" + this.data.processNonce + "&module_type=" + this.data.type,
                        r = (0, c.translate)("Create New Form");
                    return "poll" === this.props.type && (r = (0, c.translate)("Create New Poll")), "quiz" === this.props.type && (r = (0, c.translate)("Create New Quiz")), u.default.createElement(u.default.Fragment, null, u.default.createElement("input", { type: "text", defaultValue: "[" + this.data.shortcode + ' id="' + this.props.id + '"]', id: "powerform-form-shortcode", style: { position: "absolute", top: "-1500px" }, "aria-hidden": "true", ref: function(t) { return e.input = t } }), u.default.createElement("div", { className: "true" === this.props.hasLead ? "sui-dropdown fui-dropdown-soon" : "sui-dropdown" }, u.default.createElement("button", { className: "sui-button-icon sui-dropdown-anchor", "aria-label": "Dropdown" }, u.default.createElement("span", { className: "sui-icon-widget-settings-config sui-md", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, this.data.dropdownLabel)), u.default.createElement("ul", null, u.default.createElement("li", null, u.default.createElement("button", { className: "powerform-field-edit", onClick: this.copyToClipboard }, u.default.createElement("span", { className: "sui-icon-code", "aria-hidden": "true" }), (0, c.translate)("Copy Shortcode"))), u.default.createElement("li", null, u.default.createElement("a", { className: "powerform-field-edit", href: this.data.submissions }, u.default.createElement("span", { className: "sui-icon-community-people", "aria-hidden": "true" }), (0, c.translate)("View Submissions"))), u.default.createElement("li", null, u.default.createElement("form", { method: "post", action: this.data.processAction }, u.default.createElement("input", { type: "hidden", name: "powerform_action", value: "clone" }), u.default.createElement("input", { type: "hidden", name: "id", value: this.props.id }), u.default.createElement("input", { type: "hidden", id: "powerformNonce", name: "powerformNonce", value: this.data.processNonce }), u.default.createElement("input", { type: "hidden", name: "powerformRedirect", value: "false" }), "true" === this.props.hasLead && u.default.createElement("button", { type: "submit", disabled: "disabled", className: "fui-button-with-tag sui-tooltip sui-tooltip-left sui-constrained", "data-tooltip": (0, c.translate)("Duplicate isn't supported at the moment for the quizzes with lead capturing enabled.") }, u.default.createElement("span", { className: "sui-icon-page-multiple", "aria-hidden": "true" }), u.default.createElement("span", { className: "fui-button-label" }, (0, c.translate)("Duplicate")), u.default.createElement("span", { className: "sui-tag sui-tag-blue sui-tag-sm" }, (0, c.translate)("Coming soon"))), "true" !== this.props.hasLead && u.default.createElement("button", { type: "submit" }, u.default.createElement("span", { className: "sui-icon-page-multiple", "aria-hidden": "true" }), (0, c.translate)("Duplicate")))), u.default.createElement("li", null, u.default.createElement("a", { className: "powerform-field-edit" }, u.default.createElement("span", { className: "sui-icon-update", "aria-hidden": "true" }), (0, c.translate)("Reset Tracking Data"))), u.default.createElement("li", null, "true" === this.props.hasLead && u.default.createElement("a", { href: "#", className: "fui-button-with-tag sui-tooltip sui-tooltip-left", "data-tooltip": (0, c.translate)("Export isn't supported at the moment for the quizzes with lead capturing enabled.") }, u.default.createElement("span", { className: "sui-icon-cloud-migration", "aria-hidden": "true" }), u.default.createElement("span", { className: "fui-button-label" }, (0, c.translate)("Export")), u.default.createElement("span", { className: "sui-tag sui-tag-blue sui-tag-sm" }, (0, c.translate)("Coming soon"))), "true" !== this.props.hasLead && u.default.createElement("a", { className: "powerform-field-edit", href: t }, u.default.createElement("span", { className: "sui-icon-cloud-migration", "aria-hidden": "true" }), (0, c.translate)("Export"))), u.default.createElement("li", null, u.default.createElement("a", { className: "powerform-field-edit sui-option-red", href: n }, u.default.createElement("span", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, c.translate)("Delete"))))), u.default.createElement("a", { href: powerformData.dashboardUrl + "&createnew=" + this.props.type, className: "sui-button-icon sui-tooltip sui-tooltip-bottom", "data-tooltip": r }, u.default.createElement("span", { className: "sui-icon-plus sui-md", "aria-hidden": "true" })))
                }
            }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = new i(e),
            n = a(i.prototype.request, t);
        return o.extend(n, i.prototype, t), o.extend(n, t), n
    }
    var o = n(11),
        a = n(69),
        i = n(152),
        s = n(40),
        l = r(s);
    l.Axios = i, l.create = function(e) { return r(o.merge(s, e)) }, l.Cancel = n(73), l.CancelToken = n(166), l.isCancel = n(72), l.all = function(e) { return Promise.all(e) }, l.spread = n(167), e.exports = l, e.exports.default = l
}, function(e, t) {
    function n(e) { return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e) }

    function r(e) { return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0)) }
    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    e.exports = function(e) { return null != e && (n(e) || r(e) || !!e._isBuffer) }
}, function(e, t, n) {
    "use strict";

    function r(e) { this.defaults = e, this.interceptors = { request: new i, response: new i } }
    var o = n(40),
        a = n(11),
        i = n(161),
        s = n(162);
    r.prototype.request = function(e) {
        "string" == typeof e && (e = a.merge({ url: arguments[0] }, arguments[1])), e = a.merge(o, { method: "get" }, this.defaults, e), e.method = e.method.toLowerCase();
        var t = [s, void 0],
            n = Promise.resolve(e);
        for (this.interceptors.request.forEach(function(e) { t.unshift(e.fulfilled, e.rejected) }), this.interceptors.response.forEach(function(e) { t.push(e.fulfilled, e.rejected) }); t.length;) n = n.then(t.shift(), t.shift());
        return n
    }, a.forEach(["delete", "get", "head", "options"], function(e) { r.prototype[e] = function(t, n) { return this.request(a.merge(n || {}, { method: e, url: t })) } }), a.forEach(["post", "put", "patch"], function(e) { r.prototype[e] = function(t, n, r) { return this.request(a.merge(r || {}, { method: e, url: t, data: n })) } }), e.exports = r
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = function(e, t) { r.forEach(e, function(n, r) { r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]) }) }
}, function(e, t, n) {
    "use strict";
    var r = n(71);
    e.exports = function(e, t, n) {
        var o = n.config.validateStatus;
        n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t, n, r, o) { return e.config = t, n && (e.code = n), e.request = r, e.response = o, e }
}, function(e, t, n) {
    "use strict";

    function r(e) { return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") }
    var o = n(11);
    e.exports = function(e, t, n) {
        if (!t) return e;
        var a;
        if (n) a = n(t);
        else if (o.isURLSearchParams(t)) a = t.toString();
        else {
            var i = [];
            o.forEach(t, function(e, t) { null !== e && void 0 !== e && (o.isArray(e) ? t += "[]" : e = [e], o.forEach(e, function(e) { o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), i.push(r(t) + "=" + r(e)) })) }), a = i.join("&")
        }
        return a && (e += (-1 === e.indexOf("?") ? "?" : "&") + a), e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(11),
        o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    e.exports = function(e) {
        var t, n, a, i = {};
        return e ? (r.forEach(e.split("\n"), function(e) {
            if (a = e.indexOf(":"), t = r.trim(e.substr(0, a)).toLowerCase(), n = r.trim(e.substr(a + 1)), t) {
                if (i[t] && o.indexOf(t) >= 0) return;
                i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([n]) : i[t] ? i[t] + ", " + n : n
            }
        }), i) : i
    }
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = r.isStandardBrowserEnv() ? function() {
        function e(e) { var t = e; return n && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname } }
        var t, n = /(msie|trident)/i.test(navigator.userAgent),
            o = document.createElement("a");
        return t = e(window.location.href),
            function(n) { var o = r.isString(n) ? e(n) : n; return o.protocol === t.protocol && o.host === t.host }
    }() : function() { return function() { return !0 } }()
}, function(e, t, n) {
    "use strict";

    function r() { this.message = "String contains an invalid character" }

    function o(e) {
        for (var t, n, o = String(e), i = "", s = 0, l = a; o.charAt(0 | s) || (l = "=", s % 1); i += l.charAt(63 & t >> 8 - s % 1 * 8)) {
            if ((n = o.charCodeAt(s += .75)) > 255) throw new r;
            t = t << 8 | n
        }
        return i
    }
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    r.prototype = new Error, r.prototype.code = 5, r.prototype.name = "InvalidCharacterError", e.exports = o
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = r.isStandardBrowserEnv() ? function() {
        return {
            write: function(e, t, n, o, a, i) {
                var s = [];
                s.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), r.isString(o) && s.push("path=" + o), r.isString(a) && s.push("domain=" + a), !0 === i && s.push("secure"), document.cookie = s.join("; ")
            },
            read: function(e) { var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")); return t ? decodeURIComponent(t[3]) : null },
            remove: function(e) { this.write(e, "", Date.now() - 864e5) }
        }
    }() : function() { return { write: function() {}, read: function() { return null }, remove: function() {} } }()
}, function(e, t, n) {
    "use strict";

    function r() { this.handlers = [] }
    var o = n(11);
    r.prototype.use = function(e, t) { return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1 }, r.prototype.eject = function(e) { this.handlers[e] && (this.handlers[e] = null) }, r.prototype.forEach = function(e) { o.forEach(this.handlers, function(t) { null !== t && e(t) }) }, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) { e.cancelToken && e.cancelToken.throwIfRequested() }
    var o = n(11),
        a = n(163),
        i = n(72),
        s = n(40),
        l = n(164),
        u = n(165);
    e.exports = function(e) { return r(e), e.baseURL && !l(e.url) && (e.url = u(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = a(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(t) { delete e.headers[t] }), (e.adapter || s.adapter)(e).then(function(t) { return r(e), t.data = a(t.data, t.headers, e.transformResponse), t }, function(t) { return i(t) || (r(e), t && t.response && (t.response.data = a(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t) }) }
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = function(e, t, n) { return r.forEach(n, function(n) { e = n(e, t) }), e }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e) }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) { return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if ("function" != typeof e) throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function(e) { t = e });
        var n = this;
        e(function(e) { n.reason || (n.reason = new o(e), t(n.reason)) })
    }
    var o = n(73);
    r.prototype.throwIfRequested = function() { if (this.reason) throw this.reason }, r.source = function() { var e; return { token: new r(function(t) { e = t }), cancel: e } }, e.exports = r
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) { return function(t) { return e.apply(null, t) } }
}, function(e, t, n) {
    "use strict";
    var r = n(75),
        o = n(76),
        a = { brackets: function(e) { return e + "[]" }, indices: function(e, t) { return e + "[" + t + "]" }, repeat: function(e) { return e } },
        i = Date.prototype.toISOString,
        s = { delimiter: "&", encode: !0, encoder: r.encode, encodeValuesOnly: !1, serializeDate: function(e) { return i.call(e) }, skipNulls: !1, strictNullHandling: !1 },
        l = function e(t, n, o, a, i, l, u, c, p, f, d, h) {
            var m = t;
            if ("function" == typeof u) m = u(n, m);
            else if (m instanceof Date) m = f(m);
            else if (null === m) {
                if (a) return l && !h ? l(n, s.encoder) : n;
                m = ""
            }
            if ("string" == typeof m || "number" == typeof m || "boolean" == typeof m || r.isBuffer(m)) { if (l) { return [d(h ? n : l(n, s.encoder)) + "=" + d(l(m, s.encoder))] } return [d(n) + "=" + d(String(m))] }
            var y = [];
            if (void 0 === m) return y;
            var b;
            if (Array.isArray(u)) b = u;
            else {
                var v = Object.keys(m);
                b = c ? v.sort(c) : v
            }
            for (var g = 0; g < b.length; ++g) {
                var _ = b[g];
                i && null === m[_] || (y = Array.isArray(m) ? y.concat(e(m[_], o(n, _), o, a, i, l, u, c, p, f, d, h)) : y.concat(e(m[_], n + (p ? "." + _ : "[" + _ + "]"), o, a, i, l, u, c, p, f, d, h)))
            }
            return y
        };
    e.exports = function(e, t) {
        var n = e,
            i = t ? r.assign({}, t) : {};
        if (null !== i.encoder && void 0 !== i.encoder && "function" != typeof i.encoder) throw new TypeError("Encoder has to be a function.");
        var u = void 0 === i.delimiter ? s.delimiter : i.delimiter,
            c = "boolean" == typeof i.strictNullHandling ? i.strictNullHandling : s.strictNullHandling,
            p = "boolean" == typeof i.skipNulls ? i.skipNulls : s.skipNulls,
            f = "boolean" == typeof i.encode ? i.encode : s.encode,
            d = "function" == typeof i.encoder ? i.encoder : s.encoder,
            h = "function" == typeof i.sort ? i.sort : null,
            m = void 0 !== i.allowDots && i.allowDots,
            y = "function" == typeof i.serializeDate ? i.serializeDate : s.serializeDate,
            b = "boolean" == typeof i.encodeValuesOnly ? i.encodeValuesOnly : s.encodeValuesOnly;
        if (void 0 === i.format) i.format = o.default;
        else if (!Object.prototype.hasOwnProperty.call(o.formatters, i.format)) throw new TypeError("Unknown format option provided.");
        var v, g, _ = o.formatters[i.format];
        "function" == typeof i.filter ? (g = i.filter, n = g("", n)) : Array.isArray(i.filter) && (g = i.filter, v = g);
        var w = [];
        if ("object" != typeof n || null === n) return "";
        var E;
        E = i.arrayFormat in a ? i.arrayFormat : "indices" in i ? i.indices ? "indices" : "repeat" : "indices";
        var O = a[E];
        v || (v = Object.keys(n)), h && v.sort(h);
        for (var j = 0; j < v.length; ++j) {
            var x = v[j];
            p && null === n[x] || (w = w.concat(l(n[x], x, O, c, p, f ? d : null, g, h, m, y, _, b)))
        }
        var P = w.join(u),
            C = !0 === i.addQueryPrefix ? "?" : "";
        return P.length > 0 ? C + P : ""
    }
}, function(e, t, n) {
    "use strict";
    var r = n(75),
        o = Object.prototype.hasOwnProperty,
        a = { allowDots: !1, allowPrototypes: !1, arrayLimit: 20, decoder: r.decode, delimiter: "&", depth: 5, parameterLimit: 1e3, plainObjects: !1, strictNullHandling: !1 },
        i = function(e, t) {
            for (var n = {}, r = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, i = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, s = r.split(t.delimiter, i), l = 0; l < s.length; ++l) {
                var u, c, p = s[l],
                    f = p.indexOf("]="),
                    d = -1 === f ? p.indexOf("=") : f + 1; - 1 === d ? (u = t.decoder(p, a.decoder), c = t.strictNullHandling ? null : "") : (u = t.decoder(p.slice(0, d), a.decoder), c = t.decoder(p.slice(d + 1), a.decoder)), o.call(n, u) ? n[u] = [].concat(n[u]).concat(c) : n[u] = c
            }
            return n
        },
        s = function(e, t, n) {
            for (var r = t, o = e.length - 1; o >= 0; --o) {
                var a, i = e[o];
                if ("[]" === i) a = [], a = a.concat(r);
                else {
                    a = n.plainObjects ? Object.create(null) : {};
                    var s = "[" === i.charAt(0) && "]" === i.charAt(i.length - 1) ? i.slice(1, -1) : i,
                        l = parseInt(s, 10);
                    !isNaN(l) && i !== s && String(l) === s && l >= 0 && n.parseArrays && l <= n.arrayLimit ? (a = [], a[l] = r) : a[s] = r
                }
                r = a
            }
            return r
        },
        l = function(e, t, n) {
            if (e) {
                var r = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                    a = /(\[[^[\]]*])/,
                    i = /(\[[^[\]]*])/g,
                    l = a.exec(r),
                    u = l ? r.slice(0, l.index) : r,
                    c = [];
                if (u) {
                    if (!n.plainObjects && o.call(Object.prototype, u) && !n.allowPrototypes) return;
                    c.push(u)
                }
                for (var p = 0; null !== (l = i.exec(r)) && p < n.depth;) {
                    if (p += 1, !n.plainObjects && o.call(Object.prototype, l[1].slice(1, -1)) && !n.allowPrototypes) return;
                    c.push(l[1])
                }
                return l && c.push("[" + r.slice(l.index) + "]"), s(c, t, n)
            }
        };
    e.exports = function(e, t) {
        var n = t ? r.assign({}, t) : {};
        if (null !== n.decoder && void 0 !== n.decoder && "function" != typeof n.decoder) throw new TypeError("Decoder has to be a function.");
        if (n.ignoreQueryPrefix = !0 === n.ignoreQueryPrefix, n.delimiter = "string" == typeof n.delimiter || r.isRegExp(n.delimiter) ? n.delimiter : a.delimiter, n.depth = "number" == typeof n.depth ? n.depth : a.depth, n.arrayLimit = "number" == typeof n.arrayLimit ? n.arrayLimit : a.arrayLimit, n.parseArrays = !1 !== n.parseArrays, n.decoder = "function" == typeof n.decoder ? n.decoder : a.decoder, n.allowDots = "boolean" == typeof n.allowDots ? n.allowDots : a.allowDots, n.plainObjects = "boolean" == typeof n.plainObjects ? n.plainObjects : a.plainObjects, n.allowPrototypes = "boolean" == typeof n.allowPrototypes ? n.allowPrototypes : a.allowPrototypes, n.parameterLimit = "number" == typeof n.parameterLimit ? n.parameterLimit : a.parameterLimit, n.strictNullHandling = "boolean" == typeof n.strictNullHandling ? n.strictNullHandling : a.strictNullHandling, "" === e || null === e || void 0 === e) return n.plainObjects ? Object.create(null) : {};
        for (var o = "string" == typeof e ? i(e, n) : e, s = n.plainObjects ? Object.create(null) : {}, u = Object.keys(o), c = 0; c < u.length; ++c) {
            var p = u[c],
                f = l(p, o[p], n);
            s = r.merge(s, f, n)
        }
        return r.compact(s)
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return a(t, e), i(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.radioClass) ? "sui-radio" : "sui-radio " + this.props.radioClass,
                        n = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        r = l.default.Children.map(this.props.children, function(r) {
                            var o = "",
                                a = _.isUndefined(r.props.label) ? r.props.children : r.props.label;
                            return r.props.image1x && r.props.image2x && (o = l.default.createElement("img", { src: powerformData.imagesUrl + "/" + r.props.image1x, srcSet: powerformData.imagesUrl + "/" + r.props.image1x + " 1x,\n\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/" + r.props.image2x + " 2x", "aria-hidden": "true" })), r.props.image1x && !r.props.image2x && (o = l.default.createElement("img", { src: powerformData.imagesUrl + "/" + r.props.image1x, "aria-hidden": "true" })), r.props.image2x && !r.props.image1x && (o = l.default.createElement("img", { src: powerformData.imagesUrl + "/" + r.props.image2x, srcSet: powerformData.imagesUrl + "/" + r.props.image2x + " 2x", "aria-hidden": "true" })), r.props.hasImage ? l.default.createElement("label", { htmlFor: "powerform-field-" + r.props.value, className: "sui-radio-image" }, o, l.default.createElement("span", { className: t }, l.default.createElement("input", { type: "radio", name: "powerform-" + e.props.value, value: r.props.value, id: "powerform-field-" + r.props.value, checked: n === r.props.value, onChange: e.updateValue.bind(e, r.props.value) }), l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, a))) : r.props.hasImage ? void 0 : l.default.createElement("label", { htmlFor: "powerform-field-" + r.props.value, className: t }, l.default.createElement("input", { type: "radio", name: "powerform-" + e.props.value, id: "powerform-field-" + r.props.value, value: r.props.value, checked: n === r.props.value, onChange: e.updateValue.bind(e, r.props.value) }), l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, a))
                        }),
                        o = l.default.Children.map(this.props.children, function(t) { return "true" === e.props.radioContent && "Empty" !== t.type.name ? l.default.createElement("div", { className: "sui-border-frame" + (t.props.value === n ? "" : " sui-hidden"), style: { marginLeft: "0" } }, t.props.value === n && t) : l.default.createElement(l.default.Fragment, null) }),
                        a = "";
                    this.props.label && "" !== this.props.label && (a = l.default.createElement("label", { className: "sui-label" }, this.props.label, this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var i = "";
                    this.props.description && "" !== this.props.description && (i = l.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.description));
                    var s = "";
                    this.props.settingsLabel && "" !== this.props.settingsLabel && (s = l.default.createElement("label", { className: "sui-settings-label" }, this.props.settingsLabel));
                    var u = "";
                    return this.props.settingsDesc && "" !== this.props.settingsDesc && (u = l.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.settingsDesc)), this.props.noWrapper ? r : l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { role: "radiogroup", className: "sui-form-field" }, a, s, i, u, r, o))
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.insertSelector = n.insertSelector.bind(n), n }
            return a(t, e), i(t, [{ key: "componentDidMount", value: function() { this.editor = ace.edit("powerform-field-" + this.props.property), this.session = this.editor.getSession(), this.session.setUseWorker(!1), this.editor.setShowPrintMargin(!1), this.session.setMode("ace/mode/css"), this.editor.setTheme("ace/theme/sui"), this.editor.renderer.setShowGutter(!0), this.editor.setHighlightActiveLine(!0), this.editor.focus(), this.editor.on("change", this.updateValue) } }, { key: "componentWillUnmount", value: function() { this.editor.destroy(), this.editor = null } }, {
                key: "insertSelector",
                value: function(e) {
                    var t = e + "{}";
                    this.editor.navigateFileEnd(), this.editor.insert(t), this.editor.navigateLeft(1), this.editor.focus()
                }
            }, { key: "shouldComponentUpdate", value: function() { return !1 } }, { key: "updateValue", value: function() { this.props.actions.settingsActions.updateSetting(this.props.property, this.editor.getValue()) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? "" : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.type) ? "form" : this.props.type,
                        r = l.default.createElement(l.default.Fragment, null, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Basic selectors")), l.default.createElement("div", { className: "sui-ace-selectors" }, l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" ") } }, (0, u.translate)("Form")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-break .powerform-title ") } }, (0, u.translate)("Section Title")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-break .powerform-subtitle ") } }, (0, u.translate)("Section Subtitle")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-label ") } }, (0, u.translate)("Field Label")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-label--helper ") } }, (0, u.translate)("Field Description")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-input ") } }, (0, u.translate)("Input")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-textarea ") } }, (0, u.translate)("Textarea")))),
                        o = l.default.createElement(l.default.Fragment, null, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Basic selectors")), l.default.createElement("div", { className: "sui-ace-selectors" }, l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" ") } }, (0, u.translate)("Poll")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-poll--question ") } }, (0, u.translate)("Question")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-radio--design ") } }, (0, u.translate)("Answer Input")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-radio--label ") } }, (0, u.translate)("Answer Label")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-button ") } }, (0, u.translate)("Submit Button")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-poll-footer a.powerform-link, .powerform-poll-footer a.powerform-link:visited ") } }, (0, u.translate)("View Results Link")))),
                        a = l.default.createElement(l.default.Fragment, null, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Basic selectors")), l.default.createElement("div", { className: "sui-ace-selectors" }, l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" ") } }, (0, u.translate)("Quiz")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-quiz--title ") } }, (0, u.translate)("Title")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-quiz--description p ") } }, (0, u.translate)("Description")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-question .powerform-legend ") } }, (0, u.translate)("Question")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-answer .powerform-answer--design ") } }, (0, u.translate)("Answer Container")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-answer .powerform-answer--name ") } }, (0, u.translate)("Answer Text"))));
                    return l.default.createElement(l.default.Fragment, null, "form" === n && r, "poll" === n && o, "quiz" === n && a, l.default.createElement("div", { id: "powerform-field-" + this.props.property, "data-value": t, style: { height: "210px" } }, t))
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";
    var r = n(173),
        o = function(e) { return e && e.__esModule ? e : { default: e } }(r);
    ! function(e, t, n, r) {
        function a(e, t) { this.$popup = {}, this._deferred = {}, this.el = e, this.$el = jQuery(this.el), this.options = _.extend(i, t), this.init() }
        var i = { type: "form" };
        jQuery.extend(a.prototype, {
            init: function() {
                var e = this;
                this.$el.find(".connect-integration").on("click", function(t) { e.open(t) })
            },
            open: function(e) {
                var t = this;
                jQuery("#powerform-integration-popup").remove();
                var n = jQuery(e.target);
                n.hasClass("connect-integration") || (n = n.closest(".connect-integration"));
                var r = function() { return t.close(), !1 },
                    a = n.data("nonce"),
                    i = n.data("slug"),
                    s = n.data("title"),
                    l = n.data("image"),
                    u = n.data("imagex2"),
                    c = n.data("action"),
                    p = n.data("form-id"),
                    f = n.data("multi-id"),
                    d = n.data("poll-id"),
                    h = n.data("quiz-id"),
                    m = _.template('<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-integration-popup"><div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div><div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog"><div class="sui-box" role="document"><div class="sui-box-header sui-block-content-center"><div class="sui-dialog-image" aria-hidden="true"><img src="<%= image %>" srcset="<%= image %> 1x, <%= image_x2 %> 2x" alt="<%= title %>" class="sui-image sui-image-center" /></div><div class="integration-header"></div><button class="sui-dialog-back powerform-addon-back" aria-label="Back" style="display: none;"></button><button class="sui-dialog-close powerform-integration-close" aria-label="Close"></button></div><div class="sui-box-body"></div><div class="sui-box-footer sui-box-footer-center"></div></div></div></div>');
                jQuery("main.sui-wrap").append(m({ image: l, image_x2: u, title: s })), this.$popup = jQuery("#powerform-integration-popup");
                var y = { slug: i, nonce: a, action: c, multi_id: f, el: this.$popup, type: t.options.type };
                return "form" === t.options.type ? y.form_id = p : "poll" === t.options.type ? y.poll_id = d : "quiz" === t.options.type && (y.quiz_id = h), new o.default(y).on("modal:closed", function() { t.close() }), this.$popup.find(".powerform-popup-action").remove(), this.$popup.find(".sui-dialog-close").on("click", r), this.$popup.find(".sui-dialog-overlay").on("click", r), this.$popup.on("click", ".powerform-popup-cancel", r), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.removeAttr("aria-hidden"), jQuery("body").css("overflow", "hidden"), this._deferred = new jQuery.Deferred, this._deferred.promise()
            },
            close: function(e) {
                var t = jQuery("#powerform-integration-popup");
                t.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), t.find(".sui-dialog-content").removeClass("sui-fade-in").addClass("sui-fade-out"), jQuery("body").css("overflow", "auto"), setTimeout(function() { t.attr("aria-hidden", "true") }, 300), this.$el.trigger("reload"), this._deferred.resolve(this.$popup, e)
            }
        }), jQuery.fn.PowerformIntegrationsModal = function(e) { return this.each(function() { new a(this, e) }) }
    }(jQuery, window, document)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(30),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) {
                var n;
                r(this, t);
                var a = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, { el: e.el, tagName: "div", events: { "click .powerform-addon-connect": "connectAddon", "click .powerform-addon-disconnect": "disconnectAddon", "click .powerform-addon-form-disconnect": "formDisconnectAddon", "click .powerform-addon-next": "submitNextStep", "click .powerform-addon-back": "goPrevStep", "click .powerform-addon-finish": "finishSteps" } }));
                return a.slug = e.slug, a.nonce = e.nonce, a.action = e.action, a.multi_id = e.multi_id, a.type = e.type, a.step = 0, a.next_step = !1, a.prev_step = !1, a.scrollbar_width = a.getScrollbarWidth(), "form" === a.type ? a.form_id = e.form_id : "poll" === a.type ? a.poll_id = e.poll_id : "quiz" === a.type && (a.quiz_id = e.quiz_id), n = a.render(), o(a, n)
            }
            return a(t, e), i(t, [{
                key: "render",
                value: function() {
                    var e = {};
                    e.action = this.action, e._ajax_nonce = this.nonce, e.data = {}, e.data.slug = this.slug, e.data.step = this.step, e.data.current_step = this.step, e.data = this.getAjaxModuleData(e.data, !0), this.request(e, !1, !0)
                }
            }, {
                key: "request",
                value: function(e, t, n) {
                    var r = this,
                        o = { data: e, close: t, loader: n };
                    n && (this.$el.find(".sui-box-body").html('<p class="fui-loading-dialog" aria-label="Loading content"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>'), this.$el.find(".sui-box-footer").html(""), this.$el.find(".integration-header").html("")), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.ajax = jQuery.post({ url: powerformData.ajaxUrl, type: "post", data: e }).done(function(e) {
                        if (e && e.success) {
                            r.renderBody(e), r.renderFooter(e);
                            var n = e.data.data;
                            if (r.onRender(n), r.$el.find(".sui-button").removeClass("sui-button-onload"), (t || !_.isUndefined(n.is_close) && n.is_close) && r.close(r), r.$el.find(".powerform-addon-close").on("click", function() { r.close(r) }), !_.isUndefined(n.notification) && !_.isUndefined(n.notification.type) && !_.isUndefined(n.notification.text)) { new l.default({ type: n.notification.type, text: n.notification.text, time: 4e3 }).open() }
                            if (_.isUndefined(n.has_back) ? r.$el.find(".powerform-addon-back").hide() : n.has_back ? r.$el.find(".powerform-addon-back").show() : r.$el.find(".powerform-addon-back").hide(), !_.isUndefined(n.size)) { var a = jQuery("#powerform-integration-popup"); "normal" === n.size && a.removeClass("sui-dialog-sm sui-dialog-lg"), "small" === n.size && (a.addClass("sui-dialog-sm"), a.removeClass("sui-dialog-lg sui-dialog-reduced")), "reduced" === n.size && (a.addClass("sui-dialog-reduced"), a.removeClass("sui-dialog-lg sui-dialog-sm")), "large" === n.size && (a.addClass("sui-dialog-lg"), a.removeClass("sui-dialog-sm sui-dialog-reduced")) }
                            n.is_poll && setTimeout(r.request(o.data, o.close, o.loader), 5e3), setTimeout(function() { SUI.suiAccordion(jQuery(".sui-accordion")), SUI.suiTabs(jQuery(".sui-tabs")), jQuery("select").not(".sui-select").not(".powerform-select").not(".powerform-time").not(".fui-multi-select").each(function() { SUI.suiSelect(jQuery(this)) }), jQuery("select.sui-select").not(".fui-multi-select").not(".custom-select2").each(function() { jQuery(this).SUIselect2({ dropdownCssClass: "sui-select-dropdown" }) }), SUI.loadCircleScore(jQuery(".sui-circle-score")), SUI.showHidePassword() }, 10);
                            jQuery("#powerform-integration-popup .sui-box").height() > jQuery(window).height() ? jQuery("#powerform-integration-popup .sui-dialog-overlay").css("right", r.scrollbar_width + "px") : jQuery("#powerform-integration-popup .sui-dialog-overlay").css("right", 0)
                        }
                    }), this.ajax.always(function() { r.$el.find(".fui-loading-dialog").remove() })
                }
            }, {
                key: "renderBody",
                value: function(e) {
                    this.$el.find(".sui-box-body").html(e.data.data.html);
                    var t = this.$el.find(".sui-box-body .integration-header").remove();
                    t.length > 0 && this.$el.find(".integration-header").html(t.html())
                }
            }, {
                key: "renderFooter",
                value: function(e) {
                    var t = this,
                        n = e.data.data.buttons;
                    t.$el.find(".sui-box-footer").html(""), _.each(n, function(e) { t.$el.find(".sui-box-footer").append(e.markup) })
                }
            }, {
                key: "onRender",
                value: function(e) {
                    (0, u.suiDelegateEvents)(), (0, u.select2Tags)(this.$el, {}), _.isUndefined(e.powerform_addon_current_step) || (this.step = +e.powerform_addon_current_step), _.isUndefined(e.powerform_addon_has_next_step) || (this.next_step = e.powerform_addon_has_next_step), _.isUndefined(e.powerform_addon_has_prev_step) || (this.prev_step = e.powerform_addon_has_prev_step)
                }
            }, { key: "close", value: function(e) { e.ajax.abort(), e.remove(), this.trigger("modal:closed") } }, {
                key: "submitNextStep",
                value: function(e) {
                    var t = {},
                        n = this.$el.find("form"),
                        r = { slug: this.slug, step: this.getStep(), current_step: this.step },
                        o = n.serialize();
                    r = this.getAjaxModuleData(r, !1), o = o + "&" + jQuery.param(r), t.action = this.action, t._ajax_nonce = this.nonce, t.data = o, this.request(t, !1, !1)
                }
            }, {
                key: "goPrevStep",
                value: function(e) {
                    var t = {},
                        n = { slug: this.slug, step: this.getPrevStep(), current_step: this.step };
                    n = this.getAjaxModuleData(n, !0), t.action = this.action, t._ajax_nonce = this.nonce, t.data = n, this.request(t, !1, !1)
                }
            }, {
                key: "finishSteps",
                value: function(e) {
                    var t = {},
                        n = this.$el.find("form"),
                        r = { slug: this.slug, step: this.getStep(), current_step: this.step },
                        o = n.serialize();
                    r = this.getAjaxModuleData(r, !0), o = o + "&" + jQuery.param(r), t.action = this.action, t._ajax_nonce = this.nonce, t.data = o, this.request(t, !1, !1)
                }
            }, { key: "getStep", value: function() { return this.next_step ? this.step + 1 : this.step } }, { key: "getPrevStep", value: function() { return this.prev_step ? this.step - 1 : this.step } }, {
                key: "connectAddon",
                value: function() {
                    var e = {},
                        t = this.$el.find("form"),
                        n = { slug: this.slug, step: this.getStep(), current_step: this.step },
                        r = t.serialize();
                    n = this.getAjaxModuleData(n, !0), r = r + "&" + jQuery.param(n), e.action = this.action, e._ajax_nonce = this.nonce, e.data = r, this.request(e, !1, !1)
                }
            }, {
                key: "disconnectAddon",
                value: function() {
                    var e = {};
                    e.action = "powerform_addon_deactivate", e._ajax_nonce = this.nonce, e.data = {}, e.data.slug = this.slug, this.request(e, !0, !1)
                }
            }, {
                key: "formDisconnectAddon",
                value: function() {
                    var e = {};
                    e.action = this.getAjaxModuleAction("deactivate"), e._ajax_nonce = this.nonce, e.data = {}, e.data.slug = this.slug, e.data = this.getAjaxModuleData(e.data, !0), this.request(e, !0, !1)
                }
            }, {
                key: "getScrollbarWidth",
                value: function() {
                    var e = 0;
                    if (navigator.userAgent.match("MSIE")) {
                        var t = jQuery('<textarea cols="10" rows="2"></textarea>').css({ position: "absolute", top: -1e3, left: -1e3 }).appendTo("body"),
                            n = jQuery('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({ position: "absolute", top: -1e3, left: -1e3 }).appendTo("body");
                        e = t.width() - n.width(), t.add(n).remove()
                    } else {
                        var r = jQuery("<div />").css({ width: 100, height: 100, overflow: "auto", position: "absolute", top: -1e3, left: -1e3 }).prependTo("body").append("<div />").find("div").css({ width: "100%", height: 200 });
                        e = 100 - r.width(), r.parent().remove()
                    }
                    return e
                }
            }, { key: "getAjaxModuleData", value: function(e, t) { return "form" === this.type && this.form_id ? e.form_id = this.form_id : "poll" === this.type && this.poll_id ? e.poll_id = this.poll_id : "quiz" === this.type && this.quiz_id && (e.quiz_id = this.quiz_id), t && this.multi_id && (e.multi_id = this.multi_id), e } }, {
                key: "getAjaxModuleAction",
                value: function(e) {
                    switch (e) {
                        case "deactivate":
                            "form" === this.type ? e = "powerform_addon_form_deactivate" : "poll" === this.type ? e = "powerform_addon_poll_deactivate" : "quiz" === this.type && (e = "powerform_addon_quiz_deactivate")
                    }
                    return e
                }
            }]), t
        }(Backbone.View);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && DataView.prototype.isPrototypeOf(e) }

    function o(e) { if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name"); return e.toLowerCase() }

    function a(e) { return "string" != typeof e && (e = String(e)), e }

    function i(e) { var t = { next: function() { var t = e.shift(); return { done: void 0 === t, value: t } } }; return w.iterable && (t[Symbol.iterator] = function() { return t }), t }

    function s(e) { this.map = {}, e instanceof s ? e.forEach(function(e, t) { this.append(t, e) }, this) : Array.isArray(e) ? e.forEach(function(e) { this.append(e[0], e[1]) }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) { this.append(t, e[t]) }, this) }

    function l(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
    }

    function u(e) { return new Promise(function(t, n) { e.onload = function() { t(e.result) }, e.onerror = function() { n(e.error) } }) }

    function c(e) {
        var t = new FileReader,
            n = u(t);
        return t.readAsArrayBuffer(e), n
    }

    function p(e) {
        var t = new FileReader,
            n = u(t);
        return t.readAsText(e), n
    }

    function f(e) { for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]); return n.join("") }

    function d(e) { if (e.slice) return e.slice(0); var t = new Uint8Array(e.byteLength); return t.set(new Uint8Array(e)), t.buffer }

    function h() { return this.bodyUsed = !1, this._initBody = function(e) { this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : w.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : w.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : w.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : w.arrayBuffer && w.blob && r(e) ? (this._bodyArrayBuffer = d(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : w.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || O(e)) ? this._bodyArrayBuffer = d(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : w.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8")) }, w.blob && (this.blob = function() { var e = l(this); if (e) return e; if (this._bodyBlob) return Promise.resolve(this._bodyBlob); if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer])); if (this._bodyFormData) throw new Error("could not read FormData body as blob"); return Promise.resolve(new Blob([this._bodyText])) }, this.arrayBuffer = function() { return this._bodyArrayBuffer ? l(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(c) }), this.text = function() { var e = l(this); if (e) return e; if (this._bodyBlob) return p(this._bodyBlob); if (this._bodyArrayBuffer) return Promise.resolve(f(this._bodyArrayBuffer)); if (this._bodyFormData) throw new Error("could not read FormData body as text"); return Promise.resolve(this._bodyText) }, w.formData && (this.formData = function() { return this.text().then(b) }), this.json = function() { return this.text().then(JSON.parse) }, this }

    function m(e) { var t = e.toUpperCase(); return j.indexOf(t) > -1 ? t : e }

    function y(e, t) {
        t = t || {};
        var n = t.body;
        if (e instanceof y) {
            if (e.bodyUsed) throw new TypeError("Already read");
            this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new s(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new s(t.headers)), this.method = m(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(n)
    }

    function b(e) {
        var t = new FormData;
        return e.trim().split("&").forEach(function(e) {
            if (e) {
                var n = e.split("="),
                    r = n.shift().replace(/\+/g, " "),
                    o = n.join("=").replace(/\+/g, " ");
                t.append(decodeURIComponent(r), decodeURIComponent(o))
            }
        }), t
    }

    function v(e) {
        var t = new s;
        return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
            var n = e.split(":"),
                r = n.shift().trim();
            if (r) {
                var o = n.join(":").trim();
                t.append(r, o)
            }
        }), t
    }

    function g(e, t) { t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new s(t.headers), this.url = t.url || "", this._initBody(e) }

    function _(e, t) {
        return new Promise(function(n, r) {
            function o() { i.abort() }
            var a = new y(e, t);
            if (a.signal && a.signal.aborted) return r(new P("Aborted", "AbortError"));
            var i = new XMLHttpRequest;
            i.onload = function() {
                var e = { status: i.status, statusText: i.statusText, headers: v(i.getAllResponseHeaders() || "") };
                e.url = "responseURL" in i ? i.responseURL : e.headers.get("X-Request-URL");
                var t = "response" in i ? i.response : i.responseText;
                n(new g(t, e))
            }, i.onerror = function() { r(new TypeError("Network request failed")) }, i.ontimeout = function() { r(new TypeError("Network request failed")) }, i.onabort = function() { r(new P("Aborted", "AbortError")) }, i.open(a.method, a.url, !0), "include" === a.credentials ? i.withCredentials = !0 : "omit" === a.credentials && (i.withCredentials = !1), "responseType" in i && w.blob && (i.responseType = "blob"), a.headers.forEach(function(e, t) { i.setRequestHeader(t, e) }), a.signal && (a.signal.addEventListener("abort", o), i.onreadystatechange = function() { 4 === i.readyState && a.signal.removeEventListener("abort", o) }), i.send(void 0 === a._bodyInit ? null : a._bodyInit)
        })
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Headers = s, t.Request = y, t.Response = g, n.d(t, "DOMException", function() { return P }), t.fetch = _;
    var w = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function() { try { return new Blob, !0 } catch (e) { return !1 } }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };
    if (w.arrayBuffer) var E = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        O = ArrayBuffer.isView || function(e) { return e && E.indexOf(Object.prototype.toString.call(e)) > -1 };
    s.prototype.append = function(e, t) {
        e = o(e), t = a(t);
        var n = this.map[e];
        this.map[e] = n ? n + ", " + t : t
    }, s.prototype.delete = function(e) { delete this.map[o(e)] }, s.prototype.get = function(e) { return e = o(e), this.has(e) ? this.map[e] : null }, s.prototype.has = function(e) { return this.map.hasOwnProperty(o(e)) }, s.prototype.set = function(e, t) { this.map[o(e)] = a(t) }, s.prototype.forEach = function(e, t) { for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this) }, s.prototype.keys = function() { var e = []; return this.forEach(function(t, n) { e.push(n) }), i(e) }, s.prototype.values = function() { var e = []; return this.forEach(function(t) { e.push(t) }), i(e) }, s.prototype.entries = function() { var e = []; return this.forEach(function(t, n) { e.push([n, t]) }), i(e) }, w.iterable && (s.prototype[Symbol.iterator] = s.prototype.entries);
    var j = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
    y.prototype.clone = function() { return new y(this, { body: this._bodyInit }) }, h.call(y.prototype), h.call(g.prototype), g.prototype.clone = function() { return new g(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new s(this.headers), url: this.url }) }, g.error = function() { var e = new g(null, { status: 0, statusText: "" }); return e.type = "error", e };
    var x = [301, 302, 303, 307, 308];
    g.redirect = function(e, t) { if (-1 === x.indexOf(t)) throw new RangeError("Invalid status code"); return new g(null, { status: t, headers: { location: e } }) };
    var P = self.DOMException;
    try { new P } catch (e) {
        P = function(e, t) {
            this.message = e, this.name = t;
            var n = Error(e);
            this.stack = n.stack
        }, P.prototype = Object.create(Error.prototype), P.prototype.constructor = P
    }
    _.polyfill = !0, self.fetch || (self.fetch = _, self.Headers = s, self.Request = y, self.Response = g)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = function(e) { return e && e.__esModule ? e : { default: e } }(l),
        c = n(1),
        p = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return a(t, e), s(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.$el = jQuery(this.el);
                    var t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = this.props.dateFormat ? this.props.dateFormat : "d MM yy";
                    this.$el.val(t), this.$el.datepicker({ beforeShow: function(t, n) { jQuery("#ui-datepicker-div").addClass("sui-calendar"), "powerform-field-date" === e.$el.attr("id") && ("disable" === e.props.state.past_dates ? e.$el.datepicker("option", "minDate", e.$el.datepicker("getDate")) : "enable" === e.props.state.past_dates && e.$el.datepicker("option", "minDate", null)) }, dateFormat: n, dayNamesMin: powerforml10n.calendar.day_names_min, monthNames: powerforml10n.calendar.month_names, onSelect: function(t) { e.updateValue(t) } }), this.updateValue = this.updateValue.bind(this)
                }
            }, { key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, { key: "componentWillUnmount", value: function() { this.$el.datepicker("destroy"), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.customClass) ? "sui-form-control" : this.props.customClass,
                        n = _.isUndefined(this.props.calendarIcon) ? "right" : this.props.calendarIcon,
                        r = void 0,
                        o = void 0;
                    this.props.label && (r = u.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, this.props.note && u.default.createElement("span", { className: "sui-label-note" }, this.props.note))), this.props.canTrash && (o = u.default.createElement("button", { className: "sui-button-icon" }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Remove this date range")))), this.props.canAdd && (o = u.default.createElement("button", { className: "sui-button-icon" }, u.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Add selected date"))));
                    var a = _.isUndefined(this.props.id) ? "powerform-field-" + this.props.property : "powerform-field-" + this.props.id,
                        s = u.default.createElement("input", i({ ref: function(t) { return e.el = t }, id: a, className: t, placeholder: this.props.placeholder, type: "text", autoComplete: "off" }, this.props.onlyRead && { 'readonly="readonly"': "" })),
                        l = u.default.createElement("div", { className: "sui-form-field" + (this.props.mediumSize ? " sui-input-md" : "") }, r, this.props.noCalendar ? s : u.default.createElement("div", { className: "sui-date" }, "left" === n && u.default.createElement("i", { className: "sui-icon-calendar", "aria-hidden": "true" }), s, "right" === n && u.default.createElement("i", { className: "sui-icon-calendar", "aria-hidden": "true" })), u.default.createElement("div", { className: "sui-date" }), this.props.description && u.default.createElement("span", { className: "sui-description" }, this.props.description));
                    return this.props.multiDate && (l = u.default.createElement("div", { className: "sui-multi-date" }, u.default.createElement("div", { className: "sui-form-field" + (this.props.mediumSize ? " sui-input-md" : "") }, r, this.props.noCalendar ? s : u.default.createElement("div", { className: "sui-date" }, s, u.default.createElement("i", { className: "sui-icon-calendar", "aria-hidden": "true" })), this.props.description && u.default.createElement("span", { className: "sui-description" }, this.props.description)), o)), l
                }
            }]), t
        }(l.Component);
    t.default = p
}, , , , , , , , , , , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.updateAnswers = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_ANSWERS", answers: e }) } }, t.updateAnswer = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_ANSWER", answer: e }) } }
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    "use strict";

    function r(e) { return window.powerformChanges.settings = !0, { type: o, title: e } }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.updateTitle = r;
    var o = t.UPDATE_TITLE = "UPDATE_TITLE"
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }
    var o = n(0),
        a = r(o),
        i = n(45),
        s = n(7),
        l = n(19),
        u = n(412),
        c = r(u),
        p = n(60),
        f = r(p),
        d = n(417),
        h = r(d),
        m = (0, c.default)(powerformData.currentForm);
    f.default.setLocale(powerforml10n.locale), window.powerformChanges = { answers: [], settings: !1 }, (0, i.render)(a.default.createElement(s.Provider, { store: m }, a.default.createElement(l.MemoryRouter, null, a.default.createElement(l.Route, { component: h.default }))), document.getElementById("powerform-poll-builder"))
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return c(u.default, e) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var a = n(8),
        i = n(129),
        s = r(i),
        l = n(413),
        u = r(l),
        c = (0, a.compose)((0, a.applyMiddleware)(s.default))(a.createStore)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(8),
        a = n(414),
        i = r(a),
        s = n(415),
        l = r(s),
        u = n(416),
        c = r(u),
        p = (0, o.combineReducers)({ answers: i.default, settings: l.default, modal: c.default });
    t.default = p
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o(e, t) {
        var n = t.answer,
            r = e.findIndex(function(e) { return e.element_id === n.element_id });
        return e = (0, i.replaceInPosition)(e, r, n)
    }

    function a() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
        switch (t.type) {
            case "UPDATE_ANSWERS":
                return t.answers;
            case "UPDATE_ANSWER":
                return o([].concat(r(e)), t);
            default:
                return e
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
    var i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = t.setting,
            r = t.value;
        return e[n] = r, e
    }

    function o(e, t) { var n = t.settings; return s({}, e, n) }

    function a(e, t) { var n = t.title; return e.formName = n, e }

    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1],
            n = Object.assign({}, e);
        switch (t.type) {
            case "UPDATE_SETTINGS":
                return o(n, t);
            case "UPDATE_SETTING":
                return r(n, t);
            case "UPDATE_TITLE":
                return a(n, t);
            default:
                return e
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e };
    t.default = i
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = { modalType: null, modalProps: {} };
    t.default = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
            t = arguments[1];
        switch (t.type) {
            case "SHOW_MODAL":
                return { modalProps: t.modalProps, modalType: t.modalType, type: t.type };
            case "HIDE_MODAL":
                return r;
            default:
                return e
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(45),
        p = (r(c), n(19)),
        f = (n(7), n(1)),
        d = n(418),
        h = r(d),
        m = n(422),
        y = r(m),
        b = n(429),
        v = r(b),
        g = n(434),
        _ = r(g),
        w = n(438),
        E = r(w),
        O = n(443),
        j = r(O),
        x = n(466),
        P = r(x),
        C = n(475),
        N = r(C),
        k = n(479),
        S = r(k),
        T = n(481),
        A = r(T),
        M = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { window.addEventListener("beforeunload", this.handleBeforeunload), window.addEventListener("scroll", this.applySticky.bind(this)) } }, { key: "componentWillUnmount", value: function() { window.removeEventListener("beforeunload", this.handleBeforeunload) } }, {
                key: "applySticky",
                value: function() {
                    var e = this.refs.StickyHeader;
                    e.getBoundingClientRect().top <= parseInt(window.getComputedStyle(e).top.replace("px", "")) ? e.classList.add("sui-is-sticky") : e.classList.remove("sui-is-sticky")
                }
            }, { key: "handleBeforeunload", value: function(e) { if (window.powerformChanges.length > 0 || !0 === window.powerformChanges.settings) return e.preventDefault(), e.returnValue = (0, f.translate)("You have unsaved changes, are you sure want to leave this page"), (0, f.translate)("You have unsaved changes, are you sure want to leave this page") } }, { key: "render", value: function() { return u.default.createElement("div", null, u.default.createElement(h.default, null), u.default.createElement("div", { className: "sui-row-with-sidenav" }, u.default.createElement(_.default, this.props), u.default.createElement("div", null, u.default.createElement("div", { id: "powerform-builder-status", className: "sui-box sui-box-sticky", ref: "StickyHeader" }, u.default.createElement(v.default, null)), u.default.createElement(p.Route, { exact: !0, path: "/", render: function() { return u.default.createElement(p.Redirect, { to: "/builder" }) } }), u.default.createElement(p.Route, { path: "/builder", component: E.default }), u.default.createElement(p.Route, { path: "/appearance", component: j.default }), u.default.createElement(p.Route, { path: "/behaviour", component: P.default }), u.default.createElement(p.Route, { path: "/notifications", component: N.default }), u.default.createElement(p.Route, { path: "/integrations", component: S.default }), u.default.createElement(p.Route, { path: "/settings", component: A.default }))), u.default.createElement(y.default, this.props)) } }]), t
        }(l.Component);
    t.default = M
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { id: e.settings.form_id, title: e.settings.formName || "" } }

    function a(e) { return { actions: { navigationActions: (0, s.bindActionCreators)(d, e), modalActions: (0, s.bindActionCreators)(p, e), settingsActions: (0, s.bindActionCreators)(u, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(81),
        u = r(l),
        c = n(79),
        p = r(c),
        f = n(256),
        d = r(f),
        h = n(419),
        m = function(e) { return e && e.__esModule ? e : { default: e } }(h);
    t.default = (0, i.connect)(o, a)(m.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return i.default.createElement("div", { className: "sui-header fui-header-with-settings" }, i.default.createElement("div", { className: "fui-header-title" }, i.default.createElement("h1", { className: "sui-header-title" }, (0, s.translate)("Edit Poll")), i.default.createElement("div", { className: "sui-actions-right" }, i.default.createElement(u.default, e))), i.default.createElement("div", { className: "fui-header-settings" }, i.default.createElement("div", { className: "sui-actions-left" }, i.default.createElement(p.default, e)), i.default.createElement("div", { className: "sui-actions-right" }, i.default.createElement(u.default, e)))) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var a = n(0),
        i = r(a),
        s = n(1),
        l = n(420),
        u = r(l),
        c = n(421),
        p = r(c)
}, function(e, t, n) {
    "use strict";

    function r(e) { return powerformData.showDocLink ? a.default.createElement("a", { href: "https://n3rds.work/docs/wpmu-dev-plugins/powerform/#polls", target: "_blank", className: "sui-button sui-button-ghost" }, a.default.createElement("span", { className: "sui-icon-academy" }), " ", (0, i.translate)("View Documentation")) : "" }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;
    var o = n(0),
        a = function(e) { return e && e.__esModule ? e : { default: e } }(o),
        i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(149),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = jQuery(".sui-sidenav .sui-with-floating-input"),
                        t = jQuery(".sui-header"),
                        n = t.find(".sui-header-title"),
                        r = n.width();
                    r > t.next().find(".sui-sidenav").width() && e.css({ left: r + 20 + "px" })
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.props.title,
                        n = _.isEmpty(t) ? "sui-form-field-error" : "";
                    return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-form-field " + n }, c.default.createElement("label", { htmlFor: "powerform-set-title", id: "powerform-set-title-label", className: "sui-screen-reader-text" }, (0, p.translate)("Name your poll")), c.default.createElement("input", { type: "text", value: t, placeholder: (0, p.translate)("Give your poll a name"), id: "powerform-set-title", className: "sui-form-control", "aria-labelledby": "powerform-set-title-label", "aria-describedby": "powerform-set-title-message", "aria-required": "true", accessKey: "t", onChange: function(t) { return e.props.actions.navigationActions.updateTitle(t.target.value) } }), c.default.createElement("p", { role: "alert", id: "powerform-set-title-message", className: "sui-error-message", style: { display: _.isEmpty(t) ? "block" : "none", marginBottom: 0 } }, _.isEmpty(t) && (0, p.translate)("Please, enter a valid name."))), c.default.createElement(d.default, s({}, this.props, { type: "poll" })))
                }
            }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { modal: e.modal, answers: e.answers, settings: e.settings, id: e.settings.form_id } }

    function a(e) { return { actions: { builderActions: (0, s.bindActionCreators)(p, e), settingsActions: (0, s.bindActionCreators)(d, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(423),
        u = function(e) { return e && e.__esModule ? e : { default: e } }(l),
        c = n(186),
        p = r(c),
        f = n(81),
        d = r(f);
    t.default = (0, i.connect)(o, a)(u.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(45),
        p = r(c),
        f = n(424),
        d = r(f),
        h = { preview: d.default.previewModal, publish: d.default.publishModal, shortcode: d.default.shortcodeModal, delete: d.default.deleteModal },
        m = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{
                key: "componentDidUpdate",
                value: function(e) {
                    var t = this;
                    if (e.modal.modalProps.open !== this.props.modal.modalProps.open) {
                        var n = p.default.findDOMNode(this);
                        this.props.modal.modalProps.open ? n.removeAttribute("aria-hidden") : this.hideModalTimeout = setTimeout(function() { n.setAttribute("aria-hidden", "true"), t.props.modal.modalType = null, t.forceUpdate() }, 300)
                    }
                }
            }, { key: "componentWillUnmount", value: function() { clearTimeout(this.hideModalTimeout) } }, {
                key: "render",
                value: function() {
                    if (!this.props.modal.modalType) return null;
                    var e = "",
                        t = ["sui-dialog-overlay", "sui-fade-in"],
                        n = ["sui-dialog-content", "sui-fade-in"];
                    this.props.modal.modalProps.open || (t = ["sui-dialog-overlay", "sui-fade-out"], n = ["sui-dialog-content", "sui-fade-out"]);
                    var r = h[this.props.modal.modalType];
                    return "publish" !== this.props.modal.modalType && "shortcode" !== this.props.modal.modalType || (e = " sui-dialog-sm fui-dialog-publish"), "delete" === this.props.modal.modalType && (e = " sui-dialog-sm"), u.default.createElement("div", { id: "powerform-modal", className: "sui-dialog" + e, tabIndex: "-1" }, u.default.createElement("div", { className: "" + t.join(" "), onClick: this.props.modal.modalProps.closeModal }), u.default.createElement("div", { className: "" + n.join(" "), "aria-labelledby": "dialogTitle", "aria-describedby": "dialogDescription", role: "dialog" }, u.default.createElement("div", { className: "sui-box", role: "document" }, u.default.createElement(r, this.props))))
                }
            }]), t
        }(l.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(425),
        a = r(o),
        i = n(426),
        s = r(i),
        l = n(427),
        u = r(l),
        c = n(428),
        p = r(c),
        f = { previewModal: a.default, publishModal: s.default, shortcodeModal: u.default, deleteModal: p.default };
    t.default = f
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.previewLoaded = n.previewLoaded.bind(n), n }
            return a(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), this.$body = jQuery(this.body), this.mounted = !0, this.load(), jQuery(document).off("after.load.powerform"), jQuery(document).on("after.load.powerform", this.previewLoaded) } }, { key: "componentWillUnmount", value: function() { this.mounted = !1 } }, { key: "previewLoaded", value: function() { this.$body.find(".sui-notice-loading").remove() } }, {
                key: "load",
                value: function() {
                    var e = { answers: this.props.answers, settings: this.props.settings },
                        t = { id: this.props.id, action: "powerform_load_poll", type: "powerform_polls", nonce: powerformData.previewNonce, render_id: 0, is_preview: 1, preview_data: e, last_submit_data: {} };
                    this.$el.powerformLoader(t)
                }
            }, { key: "render", value: function() { var e = this; return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, "Preview"), l.default.createElement("div", { className: "sui-actions-right" }, l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": "Close this dialog window", onClick: this.closeModal }))), l.default.createElement("div", { ref: function(t) { return e.body = t }, className: "sui-box-body" }, l.default.createElement("div", { className: "sui-notice sui-notice-loading" }, l.default.createElement("p", null, (0, u.translate)("Loading preview…"))), l.default.createElement("form", { ref: function(t) { return e.el = t }, id: "powerform-module-" + this.props.id, "data-powerform-render": "0", className: "sui-hidden" }))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n }
            return a(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" }), l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("Publishing poll…"))), l.default.createElement("div", { className: "sui-box-body" }, l.default.createElement("p", null, (0, u.translate)("Great work! Please hold tight a few moments while we publish your form to the world."))), powerformData.showBranding && l.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-visibility.png", srcSet: powerformData.imagesUrl + "/powerform-visibility.png 1x,\n\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-visibility@2x.png 2x", className: "sui-image sui-image-center" })) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(30),
        f = r(p),
        d = function(e) {
            function t(e) { o(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.copyToClipboard = n.copyToClipboard.bind(n), n }
            return i(t, e), s(t, [{ key: "copyToClipboard", value: function() { this.input.select(), document.execCommand("copy"), new f.default({ type: "success", text: (0, c.translate)("Shortcode has been copied successfully."), time: 4e3 }).open() } }, { key: "render", value: function() { var e = this; return u.default.createElement(u.default.Fragment, null, u.default.createElement("div", { className: "sui-box-header sui-block-content-center" }, u.default.createElement("i", { className: "sui-icon-check sui-lg", "aria-hidden": "true" }), u.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, c.translate)("Ready to go!")), u.default.createElement("button", { className: "sui-dialog-close powerform-cancel-create-form", "aria-label": (0, c.translate)("Close this dialog window"), onClick: this.closeModal })), u.default.createElement("div", { className: "sui-box-body sui-block-content-center" }, u.default.createElement("p", null, u.default.createElement("small", null, (0, c.translate)("Your poll is now ready to be embedded into a page or template of your choice. Simply copy and paste the shortcode below to display it!"))), u.default.createElement("div", { id: "powerform-form-name-input", className: "sui-form-field" }, u.default.createElement("label", { htmlFor: "powerform-form-name", className: "sui-label" }, (0, c.translate)("Shortcode")), u.default.createElement("div", { className: "sui-with-button sui-with-button-icon" }, u.default.createElement("input", { type: "text", id: "powerform-form-shortcode", ref: function(t) { return e.input = t }, className: "sui-form-control", defaultValue: '[powerform_poll id="' + this.props.id + '"]' }), u.default.createElement("button", { className: "sui-button-icon", onClick: this.copyToClipboard }, u.default.createElement("i", { "aria-hidden": "true", className: "sui-icon-copy" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Copy shortcode")))))), powerformData.showBranding && u.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-visibility.png", srcSet: powerformData.imagesUrl + "/powerform-visibility.png 1x,\n\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-visibility@2x.png 2x", className: "sui-image sui-image-center" })) } }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = (n(19), n(1)),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.trashField = n.trashField.bind(n), n }
            return a(t, e), i(t, [{ key: "trashField", value: function() { this.props.modal.modalProps.trashField(), this.closeModal() } }, { key: "render", value: function() { var e = this.props.modal.modalProps.answer.title; return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("Delete answer"), " ", e), l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, u.translate)("Close this dialog window"), onClick: this.closeModal })), l.default.createElement("div", { className: "sui-box-body" }, l.default.createElement("p", null, (0, u.translate)("Deleting this answer"), (0, u.translate)("will remove its value from the existing submissions as well."))), l.default.createElement("div", { className: "sui-box-footer" }, l.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, (0, u.translate)("Cancel")), l.default.createElement("button", { className: "sui-button sui-button-ghost sui-button-red", onClick: this.trashField }, l.default.createElement("span", { className: "sui-loading-text" }, l.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, u.translate)("DELETE"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { id: e.settings.form_id, status: e.settings.form_status, state: e, title: e.settings.formName || "", changed: window.powerformChanges } }

    function a(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), modalActions: (0, s.bindActionCreators)(p, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(81),
        u = r(l),
        c = n(79),
        p = r(c),
        f = n(430),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(f);
    t.default = (0, i.connect)(o, a)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(68),
        d = r(f),
        h = n(74),
        m = r(h),
        y = n(30),
        b = r(y),
        v = n(431),
        g = r(v),
        w = n(432),
        E = r(w),
        O = function(e) {
            function t(e) { o(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { publishLoading: !1, draftLoading: !1 }, n.publish = n.publish.bind(n), n.draft = n.draft.bind(n), n }
            return i(t, e), l(t, [{
                key: "publish",
                value: function() {
                    var e = this,
                        t = this.props.state,
                        n = t.settings,
                        r = n.form_id,
                        o = n.formName,
                        a = _.isUndefined(o) ? "" : o,
                        i = _.isUndefined(r) ? -1 : r;
                    this.setState({ publishLoading: !0 });
                    var s = { action: "powerform_save_poll", _wpnonce: powerformData.formNonce, formName: a, form_id: i, status: "publish", version: powerformData.version, data: JSON.stringify(t) };
                    setTimeout(function() { e.save(s, "publish") }, 1500)
                }
            }, {
                key: "draft",
                value: function() {
                    var e = this,
                        t = this.props.state,
                        n = t.settings,
                        r = n.form_id,
                        o = n.formName,
                        a = _.isUndefined(o) ? "" : o,
                        i = _.isUndefined(r) ? -1 : r;
                    this.setState({ draftLoading: !0 });
                    var s = { action: "powerform_save_poll", _wpnonce: powerformData.formNonce, formName: a, form_id: i, status: "draft", version: powerformData.version, data: JSON.stringify(t) };
                    setTimeout(function() { e.save(s, "draft") }, 1500)
                }
            }, { key: "isValid", value: function() { var e = this.props.state.answers; return 0 !== e.length && !_.some(e, function(e) { return _.isEmpty(e.title) }) } }, {
                key: "save",
                value: function(e, t) {
                    var n = this,
                        r = this,
                        o = this.props.status,
                        a = this.props.state.settings.vote_limit_input;
                    if (!this.isValid()) { return new b.default({ type: "error", text: (0, p.translate)("Poll answers can not be empty."), time: 4e3 }).open(), this.setState({ publishLoading: !1, draftLoading: !1 }), !1 }
                    if (!_.isUndefined(a) && a < 0) { return new b.default({ type: "error", text: (0, p.translate)("Please enter valid voting limit."), time: 4e3 }).open(), this.setState({ publishLoading: !1, draftLoading: !1 }), !1 }
                    d.default.post(powerformData.ajaxUrl, m.default.stringify(e)).then(function(a) {
                        if (a.data.success) - 1 === e.form_id && (n.props.actions.settingsActions.updateSetting("form_id", a.data.data), powerformData.currentForm.settings.form_id = a.data.data, window.history.pushState({}, "Edit Poll", powerformData.pollEditUrl + "&id=" + a.data.data)), n.props.actions.settingsActions.saveBuilder("form_status", t), ("draft" === o && "publish" === t || _.isUndefined(o) && "publish" === t) && setTimeout(function() {
                            var e = function(e) { r.props.actions.modalActions.showModal({ open: !1 }, "shortcode") };
                            r.props.actions.modalActions.showModal({ open: !0, closeModal: e }, "shortcode")
                        }, 50);
                        else { new b.default({ type: "error", text: (0, p.translate)("Something went wrong while saving your form. Please try again.") }).open() }
                        n.setState({ publishLoading: !1, draftLoading: !1 })
                    }).catch(function(e) { new b.default({ type: "error", text: (0, p.translate)("Something went wrong while saving your form. Please try again.") }).open(), console.log(e), n.setState({ publishLoading: !1, draftLoading: !1 }) })
                }
            }, { key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-status" }, c.default.createElement(g.default, s({}, this.props, { state: this.state })), c.default.createElement(E.default, s({}, this.props, { publish: this.publish, draft: this.draft, state: this.state }))) } }]), t
        }(u.Component);
    t.default = O
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.status,
            n = "publish" === t ? "sui-tag-published" : "sui-tag-draft",
            r = !(!e.state.draftLoading && !e.state.publishLoading);
        return a.default.createElement("div", { className: "sui-status" }, a.default.createElement("div", { className: "sui-status-module" }, "Status", a.default.createElement("span", { className: "sui-tag " + n }, function() {
            switch (t) {
                case "publish":
                    return (0, i.translate)("Published");
                default:
                    return (0, i.translate)("Draft")
            }
        }())), r && a.default.createElement("div", { className: "sui-status-changes" }, a.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" }), (0, i.translate)("Saving...")), !r && e.changed.settings && a.default.createElement("div", { className: "sui-status-changes" }, a.default.createElement("i", { className: "sui-icon-update", "aria-hidden": "true" }), (0, i.translate)("Unsaved changes")), !r && !e.changed.settings && e.changed.saved && a.default.createElement("div", { className: "sui-status-changes" }, a.default.createElement("i", { className: "sui-icon-check-tick", "aria-hidden": "true" }), (0, i.translate)("Saved")))
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;
    var o = n(0),
        a = function(e) { return e && e.__esModule ? e : { default: e } }(o),
        i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(433),
        d = r(f),
        h = function(e) {
            function t(e) { o(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.publish = n.publish.bind(n), n.draft = n.draft.bind(n), n }
            return i(t, e), l(t, [{ key: "closeModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "publish") } }, {
                key: "publish",
                value: function() {
                    var e = this,
                        t = this.props,
                        n = t.status,
                        r = t.title;
                    _.isEmpty(r) || (this.props.publish(), ("draft" === n || _.isEmpty(n)) && (this.props.actions.modalActions.showModal({ open: !0, closeModal: this.closeModal }, "publish"), setTimeout(function() { e.closeModal() }, 1500)))
                }
            }, {
                key: "draft",
                value: function() {
                    var e = this.props.title;
                    _.isEmpty(e) || this.props.draft()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props.status,
                        t = this.props.state,
                        n = t.draftLoading,
                        r = t.publishLoading;
                    return c.default.createElement("div", { className: "sui-actions" }, c.default.createElement("button", { id: "powerform-module-save", className: "sui-button sui-button-ghost", style: { borderColor: "transparent" }, disabled: !!n || r, onClick: this.draft }, "publish" === e && c.default.createElement(u.Fragment, null, c.default.createElement("span", { className: "sui-icon-unpublish", "aria-hidden": "true" }), (0, p.translate)("Unpublish")), "publish" !== e && c.default.createElement(u.Fragment, null, c.default.createElement("span", { className: "sui-icon-save", "aria-hidden": "true" }), (0, p.translate)("Save Draft"))), c.default.createElement(d.default, s({}, this.props, { disabled: !(!n && !r) })), c.default.createElement("button", { id: "powerform-module-publish", className: "sui-button sui-button-blue", disabled: !(!n && !r), onClick: this.publish }, c.default.createElement("span", { className: "sui-loading-text" }, c.default.createElement("span", { className: "sui-icon-web-globe-world", "aria-hidden": "true" }), c.default.createElement("span", { className: "button-text" }, function() {
                        switch (e) {
                            case "publish":
                                return (0, p.translate)("Update");
                            default:
                                return (0, p.translate)("Publish")
                        }
                    }())), c.default.createElement("span", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })))
                }
            }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.closeModal.bind(n), n.openModal = n.openModal.bind(n), n }
            return a(t, e), i(t, [{ key: "closeModal", value: function(e) { this.props.actions.modalActions.showModal({ open: !1, title: (0, u.translate)("Preview") }, "preview"), jQuery("#powerform-poll-styles-" + this.props.id).remove() } }, { key: "openModal", value: function(e) { this.props.actions.modalActions.showModal({ open: !0, title: "Preview", closeModal: this.closeModal }, "preview") } }, { key: "render", value: function() { return l.default.createElement("button", { id: "powerform-preview-button", className: "sui-button sui-sidenav-hide-md", accessKey: "p", onClick: this.openModal, disabled: this.props.disabled }, l.default.createElement("i", { className: "sui-icon-eye", "aria-hidden": "true" }), " ", (0, u.translate)("Preview")) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { id: e.settings.form_id, title: e.settings.formName || "" } }

    function a(e) { return { actions: { navigationActions: (0, s.bindActionCreators)(p, e), modalActions: (0, s.bindActionCreators)(u, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(79),
        u = r(l),
        c = n(256),
        p = r(c),
        f = n(435),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(f);
    t.default = (0, i.connect)(o, a)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return i.default.createElement("div", { className: "sui-sidenav fui-sidenav" }, i.default.createElement(l.default, e)) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var a = n(0),
        i = r(a),
        s = n(436),
        l = r(s)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(19),
        p = n(1),
        f = n(437),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "render", value: function() { return u.default.createElement(u.default.Fragment, null, u.default.createElement("ul", { className: "sui-vertical-tabs sui-sidenav-sticky sui-sidenav-hide-md fui-sidenav" }, u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/builder", activeClassName: "current" }, (0, p.translate)("Details"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/appearance", activeClassName: "current" }, (0, p.translate)("Appearance"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/behaviour", activeClassName: "current" }, (0, p.translate)("Behaviour"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/notifications", activeClassName: "current" }, (0, p.translate)("Notifications"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/integrations", activeClassName: "current" }, (0, p.translate)("Integrations"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/settings", activeClassName: "current" }, (0, p.translate)("Settings")))), u.default.createElement(d.default, this.props, u.default.createElement("option", { value: "" }, (0, p.translate)("Details")), u.default.createElement("option", { value: "appearance" }, (0, p.translate)("Appearance")), u.default.createElement("option", { value: "behaviour" }, (0, p.translate)("Behaviour")), u.default.createElement("option", { value: "notifications" }, (0, p.translate)("Email Notifications")), u.default.createElement("option", { value: "integrations" }, (0, p.translate)("Integrations")), u.default.createElement("option", { value: "settings" }, (0, p.translate)("Settings")))) } }]), t
        }(l.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return a(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), SUI.suiSelect(this.$el), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue) } }, {
                key: "updateValue",
                value: function(e) {
                    var t = e.target.value;
                    this.props.history.push("/" + t)
                }
            }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, { key: "render", value: function() { var e = this; return l.default.createElement("div", { className: "sui-form-field sui-sidenav-hide-lg" }, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Navigate")), l.default.createElement("select", { className: "sui-mobile-nav", ref: function(t) { return e.el = t } }, this.props.children)) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { answers: e.answers, settings: e.settings, submitData: e.settings.submitData || {}, changed: window.powerformChanges } }

    function a(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), builderActions: (0, s.bindActionCreators)(d, e), modalActions: (0, s.bindActionCreators)(p, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(81),
        u = r(l),
        c = n(79),
        p = r(c),
        f = n(186),
        d = r(f),
        h = n(439),
        m = function(e) { return e && e.__esModule ? e : { default: e } }(h);
    t.default = (0, i.connect)(o, a)(m.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(440),
        f = r(p),
        d = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-fields", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Details"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(f.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("appearance") } }, (0, c.translate)("Appearance"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(2),
        d = r(f),
        h = n(77),
        m = r(h),
        y = n(441),
        b = r(y),
        v = function(e) {
            function t() { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Question")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Start by adding the question you will be asking poll visitors to vote on."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("What is your main question?"), type: "text", placeholder: (0, p.translate)("E.g. Why did the chicken cross the road?"), property: "poll-question" })), c.default.createElement(m.default, s({}, this.props, { type: "image", label: (0, p.translate)("Feature Image (optional)"), property: "poll-image", imageSize: "large", description: (0, p.translate)("This image will appear under your main question and can be used to create polls based on an image.") })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Description (optional)"), type: "text", placeholder: (0, p.translate)("Enter an optional description"), property: "poll-description", description: (0, p.translate)("This will appear below the main question and can be used to further explain the main question.") })))), c.default.createElement("div", { className: "sui-box-settings-row sui-flushed", style: { borderBottom: "0" } }, c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("label", { className: "sui-settings-label sui-dark" }, (0, p.translate)("Answers")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Now add answers to your question that you users will use to vote with. Add as many as you like, just be careful to make sure each one is unique!")), c.default.createElement(b.default, this.props))), c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Button")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Customize the button label used for submitting the users answer."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Button Text"), type: "text", placeholder: (0, p.translate)("E.g. Vote"), property: "poll-button-label" }))))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function i(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var l = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        u = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        c = n(0),
        p = r(c),
        f = n(1),
        d = n(442),
        h = r(d),
        m = function(e) {
            function t(e) { a(this, t); var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.addAnswer = n.addAnswer.bind(n), n }
            return s(t, e), u(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.$el = jQuery(this.el), this.moveOption = this.moveOption.bind(this), this.$el.find(".fui-answers").sortable({
                        stop: function(t, n) {
                            var r = n.item.index();
                            e.$el.find(".fui-answers").sortable("cancel");
                            var o = n.item.index();
                            e.moveOption(o, r)
                        }
                    })
                }
            }, { key: "componentWillUnmount", value: function() { this.$el.unbind().removeData() } }, {
                key: "moveOption",
                value: function(e, t) {
                    var n = this.props.answers;
                    n.splice(t, 0, n.splice(e, 1)[0]), this.props.actions.builderActions.updateAnswers(n), this.forceUpdate()
                }
            }, {
                key: "addAnswer",
                value: function() {
                    var e = [].concat(o(this.props.answers)),
                        t = [{ element_id: "answer-" + (0, f.getMaxID)("answer", this.props.answers) }],
                        n = [].concat(o(e), t);
                    this.props.actions.builderActions.updateAnswers(n)
                }
            }, { key: "render", value: function() { var e = this; return p.default.createElement("div", { className: "fui-multi-answers", ref: function(t) { return e.el = t } }, p.default.createElement("ul", { className: "fui-answers" }, _.map(this.props.answers, function(t, n) { return p.default.createElement(h.default, l({ key: t.element_id, answer: t }, e.props, { counter: n })) })), p.default.createElement("button", { className: "sui-button sui-button-dashed", onClick: this.addAnswer }, p.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Answer")), 0 === this.props.answers.length && p.default.createElement("div", { className: "fui-empty-message" }, p.default.createElement("span", { className: "sui-description" }, (0, f.translate)("A poll without answers isn’t going to be very useful… Add your answers above!")), powerformData.showBranding && p.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-create-modal.png", srcSet: powerformData.imagesUrl + "/powerform-create-modal.png 1x,\n\t\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-create-modal@2x.png 2x", className: "sui-image sui-image-center" }))) } }]), t
        }(c.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = function(e) { return e && e.__esModule ? e : { default: e } }(l),
        c = n(1),
        p = function(e) {
            function t(e) { o(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.trashField = n.trashField.bind(n), n.deleteField = n.deleteField.bind(n), n.closeDeleteField = n.closeDeleteField.bind(n), n }
            return i(t, e), s(t, [{
                key: "updateTitle",
                value: function(e) {
                    var t = Object.assign({}, this.props.answer);
                    t.title = e.target.value, this.props.actions.builderActions.updateAnswer(t)
                }
            }, {
                key: "updateExtra",
                value: function(e) {
                    var t = Object.assign({}, this.props.answer);
                    t.extra = e.target.value, this.props.actions.builderActions.updateAnswer(t)
                }
            }, {
                key: "addExtra",
                value: function() {
                    var e = Object.assign({}, this.props.answer);
                    e.use_extra = !0, this.props.actions.builderActions.updateAnswer(e)
                }
            }, {
                key: "removeExtra",
                value: function() {
                    var e = Object.assign({}, this.props.answer);
                    e.use_extra = !1, e.extra = "", this.props.actions.builderActions.updateAnswer(e)
                }
            }, { key: "getAnswersWithoutCurrent", value: function(e) { var t = this; return e.filter(function(e) { return e.element_id !== t.props.answer.element_id }) } }, { key: "closeMenu", value: function() { jQuery(".sui-dropdown").removeClass("open") } }, { key: "deleteField", value: function() { this.closeMenu(), this.props.actions.modalActions.showModal({ open: !0, answer: this.props.answer, closeModal: this.closeDeleteField, trashField: this.trashField }, "delete") } }, { key: "closeDeleteField", value: function() { this.props.actions.modalActions.showModal({ open: !1, answer: this.props.answer, closeModal: this.closeDeleteField, trashField: this.trashField }, "delete") } }, {
                key: "trashField",
                value: function() {
                    var e = [].concat(r(this.props.answers)),
                        t = this.getAnswersWithoutCurrent(e);
                    this.closeMenu(), this.props.actions.builderActions.updateAnswers(t)
                }
            }, {
                key: "render",
                value: function() {
                    var e = !!this.props.answer.title,
                        t = e ? "" : "fui-error";
                    return u.default.createElement("li", { "data-index": this.props.counter, className: "answer-row " + t }, u.default.createElement("span", { className: "fui-answer--move" }, u.default.createElement("i", { className: "sui-icon-drag", "aria-hidden": "true" })), u.default.createElement("span", { className: "fui-answer--fields" }, u.default.createElement("div", { className: "sui-form-field" }, u.default.createElement("input", { className: "sui-form-control", defaultValue: this.props.answer.title, onChange: this.updateTitle.bind(this) })), !0 === this.props.answer.use_extra && u.default.createElement("div", { className: "sui-form-field" }, u.default.createElement("input", { className: "sui-form-control", placeholder: (0, c.translate)("Enter Placeholder"), defaultValue: this.props.answer.extra, onChange: this.updateExtra.bind(this) }))), u.default.createElement("span", { className: "fui-answer--actions" }, u.default.createElement("button", { onClick: this.deleteField, className: "sui-button-icon sui-button-red sui-tooltip", "data-tooltip": (0, c.translate)("Delete") }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Delete answer"))), u.default.createElement("span", { className: "sui-dropdown" }, u.default.createElement("button", { className: "sui-button-icon sui-dropdown-anchor" }, u.default.createElement("i", { className: "sui-icon-widget-settings-config", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Answer options"))), u.default.createElement("ul", null, !0 !== this.props.answer.use_extra && u.default.createElement("li", null, u.default.createElement("button", { onClick: this.addExtra.bind(this) }, (0, c.translate)("Enable custom input"))), !0 === this.props.answer.use_extra && u.default.createElement("li", null, u.default.createElement("button", { onClick: this.removeExtra.bind(this) }, (0, c.translate)("Remove custom input")))))))
                }
            }]), t
        }(l.Component);
    t.default = p
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { answers: e.answers, settings: e.settings } }

    function a(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), builderActions: (0, s.bindActionCreators)(p, e), modalActions: (0, s.bindActionCreators)(d, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(81),
        u = r(l),
        c = n(186),
        p = r(c),
        f = n(79),
        d = r(f),
        h = n(444),
        m = function(e) { return e && e.__esModule ? e : { default: e } }(h);
    t.default = (0, i.connect)(o, a)(m.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(68),
        f = (r(p), n(74)),
        d = (r(f), n(445)),
        h = r(d),
        m = n(451),
        y = r(m),
        b = n(462),
        v = r(b),
        g = n(465),
        _ = r(g),
        w = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Appearance"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(h.default, this.props), u.default.createElement(y.default, this.props), u.default.createElement(v.default, this.props), u.default.createElement(_.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Details")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("behaviour") } }, (0, c.translate)("Behaviour"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = w
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(6),
        d = r(f),
        h = n(446),
        m = r(h),
        y = n(447),
        b = r(y),
        v = n(448),
        g = r(v),
        _ = n(449),
        w = r(_),
        E = n(450),
        O = r(E),
        j = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Design Style")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose a pre-made style for your poll and further customize it's appearance below."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "powerform-poll-design", default: "default" }), c.default.createElement(m.default, { value: "default", boxClass: "sui-tab-content sui-tab-boxed" }, (0, p.translate)("Default")), c.default.createElement(b.default, { value: "flat", boxClass: "sui-tab-content sui-tab-boxed" }, (0, p.translate)("Flat")), c.default.createElement(g.default, { value: "bold", boxClass: "sui-tab-content sui-tab-boxed" }, (0, p.translate)("Bold")), c.default.createElement(w.default, { value: "material", boxClass: "sui-tab-content sui-tab-boxed" }, (0, p.translate)("Material")), c.default.createElement(O.default, { value: "none", boxClass: "sui-tab-content" }, (0, p.translate)("None"))))) } }]), t
        }(u.Component);
    t.default = j
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t() { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return a(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--poll fui-demo--default" }, l.default.createElement("label", { htmlFor: "powerform-poll-preview--default-default" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--default-default" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Default")), l.default.createElement("label", { htmlFor: "powerform-poll-preview--default-checked" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--default-checked" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Checked")), l.default.createElement("button", null, (0, u.translate)("Button"))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t() { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return a(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--poll fui-demo--flat" }, l.default.createElement("label", { htmlFor: "powerform-poll-preview--flat-default" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--flat-default" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Default")), l.default.createElement("label", { htmlFor: "powerform-poll-preview--flat-checked" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--flat-checked" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Checked")), l.default.createElement("button", null, (0, u.translate)("Button"))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t() { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return a(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--poll fui-demo--bold" }, l.default.createElement("label", { htmlFor: "powerform-poll-preview--bold-default" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--bold-default" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Default")), l.default.createElement("label", { htmlFor: "powerform-poll-preview--bold-checked" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--bold-checked" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Checked")), l.default.createElement("button", null, (0, u.translate)("Button"))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t() { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return a(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--poll fui-demo--material" }, l.default.createElement("label", { htmlFor: "powerform-poll-preview--material-default" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--material-default" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Default")), l.default.createElement("label", { htmlFor: "powerform-poll-preview--material-checked" }, l.default.createElement("input", { type: "radio", id: "powerform-poll-preview--material-checked" }), l.default.createElement("span", { "aria-hidden": "true" }), (0, u.translate)("Checked")), l.default.createElement("button", null, (0, u.translate)("Button"))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = n(1),
        c = function(e) {
            function t() { return r(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return a(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "sui-notice" }, l.default.createElement("p", null, (0, u.translate)("You have opted for no stylesheet to be enqueued. The form will inherit styles from your theme's CSS."))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(6),
        d = r(f),
        h = n(13),
        m = r(h),
        y = n(3),
        b = r(y),
        v = n(44),
        g = r(v),
        _ = n(452),
        w = r(_),
        E = n(453),
        O = r(E),
        j = n(454),
        x = r(j),
        P = n(455),
        C = r(P),
        N = n(456),
        k = r(N),
        S = n(457),
        T = r(S),
        A = n(458),
        M = r(A),
        R = n(459),
        F = r(R),
        D = n(460),
        U = r(D),
        I = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Colors")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Adjust the default color combinations to match your theme styling."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "poll-colors", default: "" }), c.default.createElement(m.default, { value: "" }, (0, p.translate)("Use default colors")), c.default.createElement(b.default, { value: "true", label: (0, p.translate)("Custom") }, c.default.createElement("div", { className: "sui-accordion" }, c.default.createElement("div", { className: "sui-accordion-header" }, c.default.createElement("div", null, (0, p.translate)("Element"))), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Poll Container") }), c.default.createElement(w.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Poll Basics") }), c.default.createElement(C.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Radio Options") }), c.default.createElement(k.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Custom Answer Input") }), c.default.createElement(T.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Submit Button") }), c.default.createElement(M.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("View Results Link") }), c.default.createElement(F.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Response Success") }), c.default.createElement(O.default, this.props)), c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Response Error") }), c.default.createElement(x.default, this.props)), "none" !== (0, p.getChartType)(this.props.settings) && c.default.createElement(g.default, s({}, this.props, { label: (0, p.translate)("Results Chart") }), c.default.createElement(U.default, this.props))))))) } }]), t
        }(u.Component);
    t.default = I
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(10),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "box_border", defaultValue: "rgba(0,0,0,0)", isAlpha: !0 })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "box_background", defaultValue: "rgba(255,255,255,0)", isAlpha: !0 })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Box shadow"), property: "box_shadow", defaultValue: "rgba(230,230,230,0)", isAlpha: !0 }))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(10),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("p", { className: "sui-description" }, (0, p.translate)("Successful response message will be displayed after poll submission succeeds.")), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "success_border", defaultValue: "#1ABCA1" })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "success_background", defaultValue: "#BCEEE6" })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "success_text", defaultValue: "#333333" }))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(10),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("p", { className: "sui-description" }, (0, p.translate)("Error response message will be displayed after poll vote submission fails.")), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "error_border", defaultValue: "#E04562" })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "error_background", defaultValue: "#F9E4E8" })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "error_text", defaultValue: "#333333" }))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(10),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Question color"), property: "poll_question", defaultValue: "#333333" })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Description color"), property: "poll_description", defaultValue: "#777771" })), c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)('"No votes yet" text color'), property: "novotes_text", defaultValue: "#333333", description: (0, p.translate)('Users see this text next to submit button when "link on poll" submission is enabled.') }))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(15),
        d = r(f),
        h = n(10),
        m = r(h),
        y = n(3),
        b = r(y),
        v = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { type: "tabs", default: "default", extraClass: "sui-tabs-flushed" }, c.default.createElement(b.default, { value: "default", label: (0, p.translate)("Default") }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "inputbo", defaultValue: "rgba(119,119,113,1)", isAlpha: !0 })), c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Background"), property: "inputbg", defaultValue: "rgba(237,237,237,1)", isAlpha: !0 })), c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "poll_answers", defaultValue: "#000000" }))), c.default.createElement(b.default, { value: "checked", label: (0, p.translate)("Checked") }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "inputbo_active", defaultValue: "rgba(23,168,227,1)", isAlpha: !0 })), c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Background"), property: "inputbg_active", defaultValue: "rgba(237,237,237,1)", isAlpha: !0 })), c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Icon color"), property: "radio_dot", defaultValue: "rgba(23,168,227,1)", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(15),
        d = r(f),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { type: "tabs", default: "default", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, p.translate)("Default") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "powerform-poll-input-border_static", defaultValue: "rgba(119,119,113,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "powerform-poll-input-background_static", defaultValue: "rgba(237,237,237,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Placeholder"), property: "input_placeholder", defaultValue: "#888888" })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "input_text", defaultValue: "#000000" }))), c.default.createElement(m.default, { value: "hover", label: (0, p.translate)("Hover") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "powerform-poll-input-border_hover", defaultValue: "rgba(23,168,227,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "powerform-poll-input-background_hover", defaultValue: "rgba(230,230,230,1)", isAlpha: !0 }))), c.default.createElement(m.default, { value: "focus", label: (0, p.translate)("Focus") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Border color"), property: "powerform-poll-input-border_active", defaultValue: "rgba(23,168,227,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "powerform-poll-input-background_active", defaultValue: "rgba(230,230,230,1)", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(15),
        d = r(f),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { type: "tabs", default: "default", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, p.translate)("Default") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "buttonbg", defaultValue: "rgba(23,168,227,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "buttontxt", defaultValue: "rgba(255,255,255,1)", isAlpha: !0 }))), c.default.createElement(m.default, { value: "hover", label: (0, p.translate)("Hover") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "buttonbg_hover", defaultValue: "rgba(0,143,202,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "buttontxt_hover", defaultValue: "rgba(255,255,255,1)", isAlpha: !0 }))), c.default.createElement(m.default, { value: "active", label: (0, p.translate)("Active") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "buttonbg_active", defaultValue: "rgba(0,143,202,1)", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "buttontxt_active", defaultValue: "rgba(255,255,255,1)", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(15),
        d = r(f),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { type: "tabs", default: "default", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, p.translate)("Default") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Link color"), property: "color_link", defaultValue: "rgba(23,168,227, 1)", isAlpha: !0 }))), c.default.createElement(m.default, { value: "hover", label: (0, p.translate)("Hover") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Link color"), property: "color_link_hover", defaultValue: "rgba(0,143,202, 1)", isAlpha: !0 }))), c.default.createElement(m.default, { value: "active", label: (0, p.translate)("Active") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Link color"), property: "color_link_active", defaultValue: "rgba(0,143,202, 1)", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(15),
        d = r(f),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = n(461),
        g = r(v),
        w = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { var e = this; return c.default.createElement(d.default, { type: "tabs", default: "basics", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "basics", label: (0, p.translate)("Basics") }, "bar" === (0, p.getChartType)(this.props.settings) && c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Chart grid lines"), property: "grid_lines", defaultValue: "#E5E5E5" })), c.default.createElement(b.default, s({}, this.props, { label: "pie" === (0, p.getChartType)(this.props.settings) ? (0, p.translate)("Legend text color") : (0, p.translate)("Chart labels color"), description: "pie" === (0, p.getChartType)(this.props.settings) ? (0, p.translate)("Legends are always displayed on top of the chart.") : "", property: "grid_labels", defaultValue: "#777771" })), "bar" === (0, p.getChartType)(this.props.settings) && c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Votes count"), property: "onbar_votes", description: (0, p.translate)("Text displayed inside bars."), defaultValue: "#333333", isAlpha: !0 }))), c.default.createElement(m.default, { value: "tooltips", label: (0, p.translate)("Tooltips") }, c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Background color"), property: "tooltips_background", defaultValue: "#333333", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, p.translate)("Text color"), property: "tooltips_text", defaultValue: "#FFFFFF" }))), c.default.createElement(m.default, { value: "votes", label: (0, p.translate)("Answers") }, c.default.createElement("p", { class: "sui-description" }, (0, p.translate)("Choose the graph colors for each poll answers below.")), _.map(this.props.answers, function(t, n) { return c.default.createElement(g.default, s({}, e.props, { key: t.element_id, answer: t, counter: n })) }))) } }]), t
        }(u.Component);
    t.default = w
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = (n(1), n(10)),
        f = r(p),
        d = function(e) {
            function t(e) { o(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateProperty = n.updateProperty.bind(n), n }
            return i(t, e), l(t, [{
                key: "updateProperty",
                value: function(e, t) {
                    var n = Object.assign({}, this.props.answer);
                    n.color = t, this.props.actions.builderActions.updateAnswer(n)
                }
            }, { key: "render", value: function() { var e = powerformData.pollAnswerColors[this.props.counter] || "#E5E5E5"; return c.default.createElement(f.default, s({}, this.props, { label: this.props.answer.title, property: "color", defaultValue: e, settings: this.props.answer, updateProperty: this.updateProperty, isAlpha: !0 })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(13),
        d = r(f),
        h = n(463),
        m = r(h),
        y = n(464),
        b = r(y),
        v = n(6),
        g = r(v),
        _ = function(e) {
            function t() { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Form Container")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Customize the form container's padding and border."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(g.default, s({}, this.props, { property: "poll-padding", settingsLabel: (0, p.translate)("Padding"), settingsDesc: (0, p.translate)("By default the form will fill the available space where you insert it. You can add some padding here to better suit your theme.") }), c.default.createElement(d.default, { value: "" }, (0, p.translate)("None")), c.default.createElement(m.default, s({}, this.props, { value: "custom", boxClass: "sui-tab-boxed" }), (0, p.translate)("Custom"))), c.default.createElement(g.default, s({}, this.props, { property: "poll-border", settingsLabel: (0, p.translate)("Border"), settingsDesc: (0, p.translate)("Add an optional border around the form.") }), c.default.createElement(d.default, { value: "" }, (0, p.translate)("None")), c.default.createElement(b.default, s({}, this.props, { value: "custom", boxClass: "sui-tab-boxed" }), (0, p.translate)("Custom"))))) } }]), t
        }(u.Component);
    t.default = _
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(4),
        d = r(f),
        h = n(2),
        m = r(h),
        y = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Top"), type: "number", placeholder: "0", defaultValue: "20", property: "powerform-poll-padding-top" }))), c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Bottom"), type: "number", placeholder: "0", defaultValue: "20", property: "powerform-poll-padding-bottom" }))), c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Left"), type: "number", placeholder: "0", defaultValue: "20", property: "powerform-poll-padding-left" }))), c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Right"), type: "number", placeholder: "0", defaultValue: "20", property: "powerform-poll-padding-right" })))), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Set your custom padding in pixels."))) } }]), t
        }(u.Component);
    t.default = y
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(4),
        d = r(f),
        h = n(2),
        m = r(h),
        y = n(12),
        b = r(y),
        v = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(d.default, { cols: "4" }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Radius"), note: (0, p.translate)("in px"), type: "number", placeholder: "0", defaultValue: "4", property: "powerform-poll-border-radius" }))), c.default.createElement(d.default, { cols: "4" }, c.default.createElement(m.default, s({}, this.props, { label: (0, p.translate)("Thickness"), note: (0, p.translate)("in px"), type: "number", placeholder: "0", defaultValue: "1", property: "powerform-poll-border-width" }))), c.default.createElement(d.default, { cols: "4" }, c.default.createElement(b.default, s({ property: "powerform-poll-border-style", label: (0, p.translate)("Style") }, this.props), c.default.createElement("option", { value: "solid" }, (0, p.translate)("Solid")), c.default.createElement("option", { value: "dashed" }, (0, p.translate)("Dashed")), c.default.createElement("option", { value: "dotted" }, (0, p.translate)("Dotted")), c.default.createElement("option", { value: "none" }, (0, p.translate)("None"))))), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Note: Set the color of the border in the Colors settings area above."))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(26),
        d = r(f),
        h = n(171),
        m = r(h),
        y = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Custom CSS")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("For more advanced customization options use custom CSS."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("div", { style: { marginBottom: "10px" } }, c.default.createElement(d.default, s({}, this.props, { label: (0, p.translate)("Enable custom CSS"), property: "use-custom-css", unWrap: !0 }))), !_.isUndefined(this.props.settings["use-custom-css"]) && this.props.settings["use-custom-css"] && c.default.createElement(m.default, s({}, this.props, { property: "custom_css", type: "poll" }))))) } }]), t
        }(u.Component);
    t.default = y
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { settings: e.settings } }

    function a(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), modalActions: (0, s.bindActionCreators)(p, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(81),
        u = r(l),
        c = n(79),
        p = r(c),
        f = n(467),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(f);
    t.default = (0, i.connect)(o, a)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(468),
        f = r(p),
        d = n(469),
        h = r(d),
        m = n(470),
        y = r(m),
        b = n(471),
        v = r(b),
        g = n(473),
        _ = r(g),
        w = n(474),
        E = r(w),
        O = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Behaviour"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(f.default, this.props), u.default.createElement(h.default, this.props), u.default.createElement(y.default, this.props), u.default.createElement(v.default, this.props), u.default.createElement(_.default, this.props), u.default.createElement(E.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("appearance") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Appearance")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("notifications") } }, (0, c.translate)("Email Notifications"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = O
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(13),
        d = r(f),
        h = n(3),
        m = r(h),
        y = n(18),
        b = (r(y), n(6)),
        v = r(b),
        g = n(170),
        _ = r(g),
        w = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) },
                        n = c.default.createElement(_.default, s({}, this.props, { defaultValue: "bar", property: "results-style", radioClass: "sui-radio-sm" }), c.default.createElement("div", { value: "pie", image1x: "graph-pie.png", image2x: "graph-pie@2x.png", hasImage: !0 }, (0, p.translate)("Pie Chart")), c.default.createElement("div", { value: "bar", image1x: "graph-bar.png", image2x: "graph-bar@2x.png", hasImage: !0 }, (0, p.translate)("Bar Graph")));
                    return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Results Display")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose how you want to display poll results to new submissions. You can customise colors in the {{link}}Appearance{{/link}} tab.", { components: { link: c.default.createElement("a", { href: "#", onClick: function() { return t("appearance") } }) } }))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(v.default, s({}, this.props, { property: "results-behav", default: "not_show" }), c.default.createElement(m.default, s({}, this.props, { value: "link_on", label: (0, p.translate)("Link on poll"), boxClass: "sui-tab-boxed" }), n), c.default.createElement(m.default, s({}, this.props, { value: "show_after", label: (0, p.translate)("Show after voted"), boxClass: "sui-tab-boxed" }), n), c.default.createElement(d.default, { value: "not_show", label: (0, p.translate)("Do not show") }))))
                }
            }]), t
        }(u.Component);
    t.default = w
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(18),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Vote Count")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Display the numbers of votes on bar chart results"))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "show-votes-count", defaultValue: "false" }), c.default.createElement("div", { value: "false" }, (0, p.translate)("Hide")), c.default.createElement("div", { value: "true" }, (0, p.translate)("Show"))))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(18),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Submission Method")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("By default, submissions don't require the page to reload. If you are having issues you might want use the traditional method of reloading the page."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "enable-ajax", defaultValue: "" }), c.default.createElement("div", { value: "" }, (0, p.translate)("Reload Page")), c.default.createElement("div", { value: "true" }, (0, p.translate)("Ajax"))))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(6),
        d = r(f),
        h = n(13),
        m = r(h),
        y = n(9),
        b = r(y),
        v = n(4),
        g = r(v),
        _ = n(2),
        w = r(_),
        E = n(12),
        O = (r(E), n(18)),
        j = (r(O), n(472)),
        x = r(j),
        P = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Vote Opening")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose when you want to open and close voting"))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Status")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose the status of voting")), c.default.createElement(d.default, s({}, this.props, { property: "opening_status", default: "open", simple: !0 }), c.default.createElement(m.default, { value: "open", label: (0, p.translate)("Open") }), c.default.createElement(m.default, { value: "pause", label: (0, p.translate)("Pause") }), c.default.createElement(m.default, { value: "close", label: (0, p.translate)("Close") }))), c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Open from")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose when voting will be opened")), c.default.createElement(d.default, s({}, this.props, { property: "opening_open_from", default: "now", simple: !0 }), c.default.createElement(m.default, { value: "now", label: (0, p.translate)("Now") }), c.default.createElement(b.default, s({}, this.props, { value: "specific_date_time", label: (0, p.translate)("Specific DateTime"), boxClass: "sui-tab-boxed" }), c.default.createElement(g.default, { cols: "12" }, c.default.createElement(x.default, s({}, this.props, { property: "opening_open_from_date_time" })))))), c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Open until")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose how long voting will remain open")), c.default.createElement(d.default, s({}, this.props, { property: "opening_open_until", default: "forever", simple: !0 }), c.default.createElement(m.default, { value: "forever", label: (0, p.translate)("Forever") }), c.default.createElement(b.default, s({}, this.props, { value: "specific_date_time", label: (0, p.translate)("Specific DateTime"), boxClass: "sui-tab-boxed" }), c.default.createElement(g.default, { cols: "12" }, c.default.createElement(x.default, s({}, this.props, { property: "opening_open_until_date_time" })))))), c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Custom messages")), c.default.createElement(w.default, s({}, this.props, { label: (0, p.translate)("Message when voting is closed"), type: "text", property: "opening_close_msg", placeholder: (0, p.translate)("E.g. Voting is closed") })), c.default.createElement(w.default, s({}, this.props, { label: (0, p.translate)("Message when voting is paused"), type: "text", property: "opening_pause_msg", placeholder: (0, p.translate)("E.g. Voting is paused, check again later") })), c.default.createElement(w.default, s({}, this.props, { label: (0, p.translate)("Message before voting open from time"), type: "text", property: "opening_before_open_from_msg", placeholder: (0, p.translate)("E.g. Voting has not been started yet") }))))) } }]), t
        }(u.Component);
    t.default = P
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function i(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var l = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        u = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        c = n(0),
        p = r(c),
        f = n(1),
        d = n(175),
        h = r(d),
        m = n(12),
        y = r(m),
        b = function(e) {
            function t(e) { a(this, t); var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.updateDateValue = n.updateDateValue.bind(n), n.updateHourValue = n.updateHourValue.bind(n), n.updateMinuteValue = n.updateMinuteValue.bind(n), n.updateAmPmValue = n.updateAmPmValue.bind(n), n.data = {}, n.value = "", n.timeType = "twelve", n.dateFormat = "d MM yy", n.init(), n }
            return s(t, e), u(t, [{
                key: "init",
                value: function() {
                    this.value = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property], _.isUndefined(this.props.timeType) || "twelve" !== this.props.timeType && "twentyfour" !== this.props.timeType || (this.timeType = this.props.timeType), _.isUndefined(this.props.dateFormat) || (this.dateFormat = this.props.dateFormat);
                    var e = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        t = new Date(this.value);
                    if (t instanceof Date && !isNaN(t)) {
                        var n = t.getHours();
                        if (this.setData("date", t.getDate() + " " + e[t.getMonth()] + " " + t.getFullYear()), this.setData("hour", this.leadingZero(n)), this.setData("minute", this.leadingZero(t.getMinutes())), "twelve" === this.timeType) {
                            var r = n >= 12 ? "pm" : "am";
                            0 === n && this.setData("hour", 12), this.setData("ampm", r), "pm" === r && n > 12 && this.setData("hour", this.leadingZero(n - 12))
                        }
                    } else t = new Date, this.setData("date", t.getDate() + " " + e[t.getMonth()] + " " + t.getFullYear()), this.setData("hour", "00"), this.setData("minute", "00"), this.setData("ampm", ""), "twelve" === this.timeType && (this.setData("ampm", "am"), this.setData("hour", "12"))
                }
            }, { key: "updateValue", value: function(e) { this.value = e, "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, {
                key: "setData",
                value: function(e, t) {
                    var n = this.props.property + "_" + e;
                    this.data[n] = t
                }
            }, { key: "getData", value: function(e) { var t = this.props.property + "_" + e; return _.isUndefined(this.data[t]) ? "" : this.data[t] } }, { key: "updateData", value: function(e, t) { this.setData(e, t); var n = this.getData("date") + " " + this.getData("hour") + ":" + this.getData("minute"); "twelve" === this.timeType && (n += " " + this.getData("ampm")), this.updateValue(n) } }, { key: "updateDateValue", value: function(e, t) { this.updateData("date", t) } }, { key: "updateHourValue", value: function(e, t) { this.updateData("hour", t) } }, { key: "updateMinuteValue", value: function(e, t) { this.updateData("minute", t) } }, { key: "updateAmPmValue", value: function(e, t) { this.updateData("ampm", t) } }, { key: "leadingZero", value: function(e) { var t = e + ""; return t.length < 2 ? "0" + t : t } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = "twelve" === this.timeType ? 12 : 24,
                        n = 12 === t ? 1 : 0,
                        r = this.props.property;
                    return p.default.createElement("div", { className: "sui-form-field-inline" }, p.default.createElement(h.default, l({}, this.props, { label: (0, f.translate)("Date"), settings: this.data, property: r + "_date", placeholder: (0, f.translate)("10 January 2020"), updateProperty: this.updateDateValue, dateFormat: this.dateFormat })), p.default.createElement(y.default, l({}, this.props, { settings: this.data, label: (0, f.translate)("Hour"), property: r + "_hour", updateProperty: this.updateHourValue }), [].concat(o(Array(t))).map(function(t, r) { return p.default.createElement("option", { value: e.leadingZero(r + n), key: e.leadingZero(r + n) }, e.leadingZero(r + n)) })), p.default.createElement(y.default, l({}, this.props, { settings: this.data, label: (0, f.translate)("Minute"), property: r + "_minute", updateProperty: this.updateMinuteValue }), [].concat(o(Array(60))).map(function(t, n) { return p.default.createElement("option", { value: e.leadingZero(n), key: e.leadingZero(n) }, e.leadingZero(n)) })), "twelve" === this.timeType && p.default.createElement(y.default, l({}, this.props, { settings: this.data, label: (0, f.translate)("AM/PM"), property: r + "_ampm", updateProperty: this.updateAmPmValue }), p.default.createElement("option", { value: "am", key: "am" }, "AM"), p.default.createElement("option", { value: "pm", key: "pm" }, "PM")))
                }
            }]), t
        }(c.Component);
    t.default = b
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(6),
        d = r(f),
        h = n(13),
        m = r(h),
        y = n(9),
        b = r(y),
        v = n(4),
        g = r(v),
        _ = n(2),
        w = r(_),
        E = n(12),
        O = r(E),
        j = n(18),
        x = r(j),
        P = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Voting Limit")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose whether you want to limit the number of votes per users and how do you want to impose that limit. "))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Votes per user")), c.default.createElement("span", { className: "sui-description", style: { marginBottom: "20px" } }, (0, p.translate)("By default, a user can only vote once on a poll. However, you can allow the users to vote multiple times and also specify the time after which a user can vote again.")), c.default.createElement(d.default, s({}, this.props, { property: "enable-votes-limit", default: "false", simple: !0 }), c.default.createElement(m.default, { value: "false", label: (0, p.translate)("Once") }), c.default.createElement(b.default, s({}, this.props, { value: "true", label: (0, p.translate)("Allow Multiple"), boxClass: "sui-tab-boxed" }), c.default.createElement(g.default, { cols: "6" }, c.default.createElement(w.default, s({}, this.props, { type: "number", property: "vote_limit_input", placeholder: "10", minValue: "0", isPositive: !0 }))), c.default.createElement(g.default, { cols: "6" }, c.default.createElement(O.default, s({}, this.props, { property: "vote_limit_options", defaultValue: "m" }), c.default.createElement("option", { value: "m" }, (0, p.translate)("minute(s)")), c.default.createElement("option", { value: "h" }, (0, p.translate)("hour(s)")), c.default.createElement("option", { value: "d" }, (0, p.translate)("day(s)")), c.default.createElement("option", { value: "W" }, (0, p.translate)("week(s)")), c.default.createElement("option", { value: "M" }, (0, p.translate)("month(s)")), c.default.createElement("option", { value: "Y" }, (0, p.translate)("year(s)"))))))), c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Method")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose the method you want to use to limit the number of votes.")), c.default.createElement(x.default, s({}, this.props, { property: "enable-votes-method", defaultValue: "user_ip" }), c.default.createElement("div", { value: "user_ip" }, (0, p.translate)("User IP")), c.default.createElement("div", { value: "browser_cookie" }, (0, p.translate)("Browser Cookie")))))) } }]), t
        }(u.Component);
    t.default = P
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(26),
        d = r(f),
        h = function(e) {
            function t() { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Rendering")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose how you want your poll to be rendered for users."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "use_ajax_load", label: (0, p.translate)("Load poll using AJAX"), description: (0, p.translate)("Enabling this feature will load the poll via AJAX after the page has loaded up, effectively speeding up your page load time. This method can also (in most cases) avoid page caching issues with your poll.") })), c.default.createElement(d.default, s({}, this.props, { property: "use_donotcachepage", label: (0, p.translate)("Prevent page caching on poll pages"), description: (0, p.translate)("Page caching plugins serve a static HTML version of the page which can cause issues to your dynamic polls. By enabling this, we'll use {{strong}}DONOTCACHEPAGE{{/strong}} constant to prevent pages with this poll on it from being cached.", { components: { strong: c.default.createElement("strong", null) } }) })))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return { settings: e.settings } }

    function a(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), modalActions: (0, s.bindActionCreators)(p, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(81),
        u = r(l),
        c = n(79),
        p = r(c),
        f = n(476),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(f);
    t.default = (0, i.connect)(o, a)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(477),
        f = r(p),
        d = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-notifications", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Email Notifications"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(f.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("behaviour") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Behaviour")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("integrations") } }, (0, c.translate)("Integrations"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(2),
        d = r(f),
        h = n(26),
        m = r(h),
        y = n(478),
        b = r(y),
        v = n(32),
        g = r(v),
        w = n(41),
        E = r(w),
        O = n(22),
        j = r(O),
        x = function(e) {
            function t() { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "getNameOptions", value: function() { var e = []; return _.map(powerformData.variables, function(t, n) { e.push({ label: t, value: n }) }), e } }, { key: "getEmailOptions", value: function() { return [] } }, { key: "getRecipientTagsOptions", value: function() { return { tags: !0, tokenSeparators: [",", " "], language: { searching: function() { return (0, p.translate)("Searching") }, noResults: function() { return (0, p.translate)("No Result Found") } }, placeholder: (0, p.translate)("Recipient(s)"), ajax: { url: powerformData.ajaxUrl, type: "POST", delay: 350, data: function(e) { return { action: "powerform_builder_search_emails", _wpnonce: powerformData.searchNonce, q: e.term } }, processResults: function(e) { return { results: e.data } }, cache: !0 }, templateResult: function(e) { return _.isUndefined(e.id) || _.isUndefined(e.text) || _.isUndefined(e.display_name) ? e.text : jQuery("<span><b>" + e.text + "</b> - <small>" + e.display_name + "</small></span>") }, createTag: function(e) { var t = jQuery.trim(e.term); return (0, p.isEmailWp)(t) ? { id: t, text: t } : null } } } }, { key: "getCcBccOptions", value: function() { return { tags: !0, placeholder: (0, p.translate)("None"), createTag: function(e) { var t = jQuery.trim(e.term); return (0, p.isEmailWp)(t) ? { id: t, text: t } : null } } } }, {
                key: "getCcAddressesOptions",
                value: function() {
                    var e = this.getEmailOptions(),
                        t = [];
                    return e.map(function(e) { t.push(e.value) }), (_.isUndefined(this.props.settings["admin-email-cc-address"]) || !_.isArray(this.props.settings["admin-email-cc-address"]) ? [] : this.props.settings["admin-email-cc-address"]).filter(function(e) { return t.indexOf(e) < 0 }).map(function(t) { e.push({ value: t, label: t }) }), e
                }
            }, {
                key: "getBccAddressesOptions",
                value: function() {
                    var e = this.getEmailOptions(),
                        t = [];
                    return e.map(function(e) { t.push(e.value) }), (_.isUndefined(this.props.settings["admin-email-bcc-address"]) || !_.isArray(this.props.settings["admin-email-bcc-address"]) ? [] : this.props.settings["admin-email-bcc-address"]).filter(function(e) { return t.indexOf(e) < 0 }).map(function(t) { e.push({ value: t, label: t }) }), e
                }
            }, { key: "getAutoCreateEmailAddressOptions", value: function() { return { tags: !0, createTag: function(e) { var t = jQuery.trim(e.term); return (0, p.isEmailWp)(t) ? { id: t, text: t } : null }, insertTag: function(e, t) { e.push(t) } } } }, {
                key: "getFromAddressOptions",
                value: function() {
                    var e = this.getEmailOptions();
                    e.unshift({ value: "", label: (0, p.translate)("Default") });
                    var t = [];
                    e.map(function(e) { t.push(e.value) });
                    var n = _.isUndefined(this.props.settings["admin-email-from-address"]) ? "" : this.props.settings["admin-email-from-address"];
                    return t.indexOf(n) < 0 && e.push({ value: n, label: n }), e
                }
            }, {
                key: "getReplyToAddressOptions",
                value: function() {
                    var e = this.getEmailOptions();
                    e.unshift({ value: "", label: (0, p.translate)("None") });
                    var t = [];
                    e.map(function(e) { t.push(e.value) });
                    var n = _.isUndefined(this.props.settings["admin-email-reply-to-address"]) ? "" : this.props.settings["admin-email-reply-to-address"];
                    return t.indexOf(n) < 0 && e.push({ value: n, label: n }), e
                }
            }, { key: "render", value: function() { return this.getEmailOptions().unshift({ value: "", label: (0, p.translate)("Default") }), this.getEmailOptions().unshift({ value: "", label: (0, p.translate)("None") }), c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Admin Email")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Optionally, you can send a notification email to nominated email accounts when poll submissions come in."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("div", { className: "sui-form-field", style: { marginBottom: "10px" } }, c.default.createElement(m.default, s({}, this.props, { property: "use-admin-email", label: (0, p.translate)("Send an email to admin users"), unWrap: !0 }))), !_.isUndefined(this.props.settings["use-admin-email"]) && this.props.settings["use-admin-email"] && c.default.createElement("div", { className: "sui-border-frame sui-toggle-content" }, c.default.createElement(E.default, s({}, this.props, { property: "admin-email-from-name", placeholder: (0, p.translate)("Default"), label: (0, p.translate)("From Name") }), this.getNameOptions().map(function(e, t) { return c.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })), c.default.createElement(j.default, s({}, this.props, { property: "admin-email-from-address", label: (0, p.translate)("From Address"), defaultValue: "", options: this.getAutoCreateEmailAddressOptions() }), this.getFromAddressOptions().map(function(e, t) { return c.default.createElement("option", { key: t, value: e.value }, e.label) })), c.default.createElement(b.default, s({}, this.props, { property: "admin-email-recipients", placeholder: (0, p.translate)("Recipient(s)"), options: this.getRecipientTagsOptions(), label: (0, p.translate)("Recipients") })), c.default.createElement(j.default, s({}, this.props, { property: "admin-email-reply-to-address", label: (0, p.translate)("Reply To Address"), defaultValue: "", options: this.getAutoCreateEmailAddressOptions() }), this.getReplyToAddressOptions().map(function(e, t) { return c.default.createElement("option", { key: t, value: e.value }, e.label) })), c.default.createElement(j.default, s({}, this.props, { property: "admin-email-cc-address", label: (0, p.translate)("CC Addresses"), options: this.getCcBccOptions(), defaultValue: [], multiple: "true" }), this.getCcAddressesOptions().map(function(e, t) { return c.default.createElement("option", { key: t, value: e.value }, e.label) })), c.default.createElement(j.default, s({}, this.props, { property: "admin-email-bcc-address", label: (0, p.translate)("BCC Addresses"), options: this.getCcBccOptions(), defaultValue: [], multiple: "true" }), this.getBccAddressesOptions().map(function(e, t) { return c.default.createElement("option", { key: t, value: e.value }, e.label) })), c.default.createElement(d.default, s({}, this.props, { property: "admin-email-title", placeholder: (0, p.translate)("Enter subject"), label: (0, p.translate)("Subject"), defaultValue: "" })), c.default.createElement(g.default, s({}, this.props, { property: "admin-email-editor", editorOptions: powerformData.variables, enableFormData: !1, boxClass: "sui-tab-boxed", mainOptions: { poll_name: (0, p.translate)("Poll Name"), poll_answer: (0, p.translate)("Poll Answer"), poll_result: (0, p.translate)("Poll Result") }, label: (0, p.translate)("Body") }))))) } }]), t
        }(u.Component);
    t.default = x
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function a(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        s = n(0),
        l = function(e) { return e && e.__esModule ? e : { default: e } }(s),
        u = function(e) {
            function t(e) { r(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.handleChange = n.handleChange.bind(n), n }
            return a(t, e), i(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? [] : this.props.settings[this.props.property];
                    this.$el = jQuery(this.el);
                    var n = Object.assign({ allowClear: !0, dropdownCssClass: "sui-select-dropdown" }, this.props.options);
                    "function" == typeof this.$el.SUIselect2 ? this.$el.SUIselect2(n) : "function" == typeof this.$el.FUIselect2 ? this.$el.FUIselect2(n) : console.log("select2 not intiated"), this.$el.on("change.select2", this.handleChange), _.each(t, function(t) { e.$el.append(jQuery('<option value="' + t + '">' + t + "</option>")) }), this.$el.val(t).trigger("change.select2")
                }
            }, { key: "handleChange", value: function(e) { var t = jQuery(e.target).val(); "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, t) : this.props.actions.settingsActions.updateSetting(this.props.property, t) } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.handleChange), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? [] : this.props.settings[this.props.property],
                        n = "";
                    return this.props.label && (n = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note))), l.default.createElement("div", { className: "sui-form-field" }, n, l.default.createElement("select", { ref: function(t) { return e.el = t }, className: "sui-select", defaultValue: t, multiple: "multiple" }, this.props.children))
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(7),
        o = n(79),
        a = n(480),
        i = function(e) { return e && e.__esModule ? e : { default: e } }(a),
        s = function(e) { return { hideModal: function() { return e((0, o.hideModal)()) }, showModal: function(t, n) { e((0, o.showModal)({ modalProps: t, modalType: n })) } } };
    t.default = (0, r.connect)(null, s)(i.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(172);
    r(p);
    n(174);
    var f = function(e) {
        function t(e) { o(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { loading: !1, markup: "" }, n.loadIntegrations = n.loadIntegrations.bind(n), n }
        return i(t, e), s(t, [{ key: "componentDidMount", value: function() { this.mounted = !0, this.loadIntegrations(), jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, { key: "componentWillUnmount", value: function() { this.mounted = !1 } }, {
            key: "loadIntegrations",
            value: function() {
                var e = this,
                    t = powerformData.currentForm.settings.form_id;
                _.isUndefined(t) || +t <= 0 || this.state.loading || (this.setState({ markup: "", loading: !0 }), window.fetch(powerformData.ajaxUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" }, body: "action=powerform_addon_get_poll_addons&_ajax_nonce=" + powerformData.addonNonce + "&data[poll_id]=" + t }).then(function(e) { return e.json() }).then(function(t) {
                    if (t.success && e.mounted) {
                        var n = e;
                        e.setState({ markup: t.data.data }), setTimeout(function() {
                            var e = window.jQuery(".form-integrations-wrapper");
                            e.PowerformIntegrationsModal({ type: "poll" }), e.on("reload", function() { e.unbind(), n.loadIntegrations() })
                        }, 10), e.setState({ loading: !1 })
                    }
                }).catch(function(e) { console.log(e) }))
            }
        }, {
            key: "render",
            value: function() {
                var e = this,
                    t = this.state.loading,
                    n = this.state.markup,
                    r = powerformData.currentForm.settings.form_id,
                    o = function(t) { e.props.history.push("/" + t) },
                    a = "";
                return a = t ? u.default.createElement("div", { className: "sui-notice sui-notice-loading" }, u.default.createElement("p", null, (0, c.translate)("Fetching integration list…"))) : _.isUndefined(r) || +r <= 0 ? u.default.createElement("div", { className: "sui-notice sui-notice-warning" }, u.default.createElement("p", null, (0, c.translate)("You need to save this poll before using integrations.")), u.default.createElement("div", { className: "sui-notice-buttons" }, u.default.createElement("a", { className: "sui-button", onClick: this.loadIntegrations }, (0, c.translate)("TRY AGAIN")))) : u.default.createElement("span", { className: "form-integrations-wrapper", dangerouslySetInnerHTML: { __html: n } }), u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Integrations"))), u.default.createElement("div", { className: "sui-box-body" }, a), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return o("notifications") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Email Notifications")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return o("settings") } }, (0, c.translate)("Settings"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
            }
        }]), t
    }(l.Component);
    t.default = f
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function o(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { return { settings: e.settings } }

    function i(e) { return { actions: { settingsActions: (0, u.bindActionCreators)(p, e), modalActions: (0, u.bindActionCreators)(d, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(0),
        l = (o(s), n(7)),
        u = n(8),
        c = n(81),
        p = r(c),
        f = n(79),
        d = r(f),
        h = n(482),
        m = o(h);
    t.default = (0, l.connect)(a, i)(m.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        l = n(0),
        u = r(l),
        c = n(1),
        p = n(483),
        f = r(p),
        d = n(484),
        h = r(d),
        m = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Settings"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(f.default, this.props), u.default.createElement(h.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("integrations") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), " ", (0, c.translate)("Integrations"))))
                }
            }]), t
        }(l.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(26),
        d = r(f),
        h = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Data Storage")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("By default we'll store all submissions in your database."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "store", label: (0, p.translate)("Disable store submissions in my database"), description: (0, p.translate)("If you don't want to store submissions in your database you can disable this feature. Alternately you can also schedule automatic deletion of submissions after a period of time below.") })))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        u = n(0),
        c = r(u),
        p = n(1),
        f = n(6),
        d = r(f),
        h = n(3),
        m = r(h),
        y = n(4),
        b = r(y),
        v = n(2),
        g = r(v),
        w = n(12),
        E = r(w),
        O = function(e) {
            function t(e) { return o(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{
                key: "render",
                value: function() {
                    var e = _.isEmpty(powerformData.poll_ip_retain_number) || "0" === powerformData.poll_ip_retain_number,
                        t = (0, p.translate)("forever");
                    e || (t = powerformData.poll_ip_retain_number + " " + powerformData.poll_ip_retain_unit);
                    var n = _.isEmpty(powerformData.submissions_ip_retain_number) || "0" === powerformData.submissions_ip_retain_number,
                        r = (0, p.translate)("forever");
                    return n || (r = powerformData.submissions_ip_retain_number + " " + powerformData.submissions_ip_retain_unit), c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, p.translate)("Privacy")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose how you want to handle this poll's data storage. By default we'll use the configuration you've set in your {{link}}global privacy settings{{/link}}.", { components: { link: c.default.createElement("a", { href: powerformData.settingsUrl + "&section=submissions", target: "_blank" }) } }))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("Submissions")), c.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, (0, p.translate)("How long do you want to retain this poll's submissions for?")), c.default.createElement("div", { style: { marginTop: "10px" } }, c.default.createElement(d.default, s({}, this.props, { default: "false", property: "enable-submissions-retention", simple: !0 }), c.default.createElement(m.default, { value: "false", label: (0, p.translate)("Use default") }, c.default.createElement("div", { className: "sui-notice" }, c.default.createElement("p", null, (0, p.translate)("Your default setting value is to keep the submissions %s.", { args: [r] })))), c.default.createElement(m.default, s({}, this.props, { value: "true", label: (0, p.translate)("Custom"), boxClass: "sui-tab-boxed" }), c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(b.default, { cols: "6" }, c.default.createElement(g.default, s({}, this.props, { type: "number", defaultValue: "0", property: "submissions-retention-number", placeholder: "10" }))), c.default.createElement(b.default, { cols: "6" }, c.default.createElement(E.default, s({}, this.props, { defaultValue: "days", property: "submissions-retention-unit" }), c.default.createElement("option", { value: "days" }, (0, p.translate)("day(s)")), c.default.createElement("option", { value: "weeks" }, (0, p.translate)("week(s)")), c.default.createElement("option", { value: "months" }, (0, p.translate)("month(s)")), c.default.createElement("option", { value: "years" }, (0, p.translate)("year(s)"))))), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Leave the field blank to retain submissions forever.")))))), c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, p.translate)("IP Retention")), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Choose how long to retain IP address before a submission is anonymized. Keep in mind that the IP address is being used in checking multiple votes from same user.")), c.default.createElement("div", { style: { marginTop: "10px" } }, c.default.createElement(d.default, s({}, this.props, { default: "false", property: "enable-ip-address-retention", simple: !0 }), c.default.createElement(m.default, s({}, this.props, { value: "false", label: (0, p.translate)("Use default") }), c.default.createElement("div", { className: "sui-notice" }, c.default.createElement("p", null, (0, p.translate)("Your default setting keep the IPs %s.", { args: [t] })))), c.default.createElement(m.default, s({}, this.props, { value: "true", label: (0, p.translate)("Custom"), boxClass: "sui-tab-boxed" }), c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(b.default, { cols: "6" }, c.default.createElement(g.default, s({}, this.props, { type: "number", defaultValue: "0", property: "ip-address-retention-number", placeholder: "10" }))), c.default.createElement(b.default, { cols: "6" }, c.default.createElement(E.default, s({}, this.props, { defaultValue: "days", property: "ip-address-retention-unit" }), c.default.createElement("option", { value: "days" }, (0, p.translate)("day(s)")), c.default.createElement("option", { value: "weeks" }, (0, p.translate)("week(s)")), c.default.createElement("option", { value: "months" }, (0, p.translate)("month(s)")), c.default.createElement("option", { value: "years" }, (0, p.translate)("year(s)"))))), c.default.createElement("span", { className: "sui-description" }, (0, p.translate)("Leave the field blank to keep IPs forever."))))))))
                }
            }]), t
        }(u.Component);
    t.default = O
}]);