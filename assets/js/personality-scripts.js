! function(e) {
    function t(r) { if (n[r]) return n[r].exports; var a = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 527)
}([function(e, t) { e.exports = React }, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a() { return Math.floor(9999 * Math.random()) }

    function o() { return "wrapper-" + a() + "-" + a() }

    function i(e, t) { var n = void 0; return t.map(function(t) { t.wrapper_id === e && (n = t) }), n }

    function s(e, t) { var n = 0; return t.map(function(t) { t.fields.map(function(t) { t.type === e && n++ }) }), n }

    function l(e, t) {
        var n = [];
        t.map(function(t) {
            t.fields.map(function(t) {
                if (t.type === e) {
                    var r = t.element_id,
                        a = r.split("-");
                    "page-break" === t.type ? n.push(parseInt(a[2])) : n.push(parseInt(a[1]))
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

    function f(e, t) { var n = 0; return t.map(function(t) { t.fields.map(function(t) { t.type === e && n++ }) }), n > 0 }

    function p(e, t) { var n = []; return t.map(function(t) { t.fields.map(function(t) { t.type === e && n.push(t) }) }), n }

    function d(e, t) { var n = []; return p(e, t).map(function(t) { var r = t.field_label; "address" === e && (r = t.element_id), n.push({ value: t.element_id, label: r, element_id: t.element_id }) }), n }

    function h(e, t) { var n = ""; return t.map(function(t) { t.fields.map(function(t) { t.element_id === e && (n = t.field_label) }) }), n }

    function m(e, t) { var n = 0; return t.map(function(t) { t.fields.map(function(t) { t.element_id === e && n++ }) }), n > 0 }

    function y(e, t, n, r) { var a = l(e.type, r); return _.extend(e, { element_id: e.type + "-" + a, formID: t, cols: n }) }

    function b(e, t, n) {
        var r = powerformData.fields.find(function(t) { return t.slug === e }),
            a = l(r.type, t);
        return _.extend({ element_id: r.type + "-" + a, type: r.type, options: r.options, cols: 12, conditions: {}, wrapper_id: n }, JSON.parse(JSON.stringify(r.defaults)))
    }

    function v(e) { return e.type }

    function g(e) { return powerformData.fields.find(function(t) { return t.type === e.type }) }

    function E(e, t, n) { return [].concat(r(e.slice(0, t)), [n], r(e.slice(t))) }

    function w(e, t, n) { return [].concat(r(e.slice(0, t)), [n], r(e.slice(t + 1))) }

    function O() { return G.default.translate.apply(null, arguments) }

    function j(e, t) { var n = _.filter(t, function(t) { return t.family === e }); return _.isUndefined(n[0]) || _.isUndefined(n[0].variants) ? [O("None")] : n[0].variants }

    function P(e) { return e.charAt(0).toUpperCase() + e.slice(1) }

    function x(e, t, n) {
        var r = [];
        _.isUndefined(t) && (t = ["page-break", "postdata", "total", "product", "captcha"]);
        var a = !1;
        return _.isUndefined(n) || _.isUndefined(n.main_date_field) || !0 !== n.main_date_field || (a = !0), e.map(function(e) {
            e.fields.map(function(e) {
                if (!_.contains(t, e.type)) {
                    var n = void 0;
                    _.isUndefined(e.field_label) || _.isEmpty(e.field_label) ? (n = e.type, n = P(n)) : n = e.field_label, "name" === e.type ? r = r.concat(k(e, n)) : "address" === e.type ? r = r.concat(F(e, n)) : "time" === e.type ? r = r.concat(R(e, n)) : "date" === e.type && "picker" !== e.field_type && !1 === a || r.push({ element_id: e.element_id, required: e.required, field_type: e.type, field_slug: e.type, label: n, values: A(e), hasOptions: T(e), hasCalcs: S(e), formula: M(e), isNumber: C(e), fieldData: e }), "date" === e.type && "picker" !== e.field_type && (r = r.concat(N(e, n)))
                }
            })
        }), r
    }

    function N(e, t) {
        var n = [],
            r = void 0;
        r = _.isUndefined(e.day_label) || _.isEmpty(e.day_label) ? t + " - " + O("Day") : t + " - " + e.day_label;
        var a = void 0;
        a = _.isUndefined(e.month_label) || _.isEmpty(e.month_label) ? t + " - " + O("Month") : t + " - " + e.month_label;
        var o = void 0;
        return o = _.isUndefined(e.year_label) || _.isEmpty(e.year_label) ? t + " - " + O("Year") : t + " - " + e.year_label, "input" === e.field_type ? n.push({ element_id: e.element_id + "-day", required: e.required, field_type: e.type, field_slug: e.type + "-day", label: r, values: !1, hasOptions: !1, isNumber: !0 }, { element_id: e.element_id + "-month", required: e.required, field_type: e.type, field_slug: e.type + "-month", label: a, values: !1, hasOptions: !1, isNumber: !0 }, { element_id: e.element_id + "-year", required: e.required, field_type: e.type, field_slug: e.type + "-year", label: o, values: !1, hasOptions: !1, isNumber: !0 }) : n.push({ element_id: e.element_id + "-day", required: e.required, field_type: e.type, field_slug: e.type + "-day", label: r, values: A(e), hasOptions: T(e), isNumber: C(e) }, { element_id: e.element_id + "-month", required: e.required, field_type: e.type, field_slug: e.type + "-month", label: a, values: A(e), hasOptions: T(e), isNumber: C(e) }, { element_id: e.element_id + "-year", required: e.required, field_type: e.type, field_slug: e.type + "-year", label: o, values: A(e), hasOptions: T(e), isNumber: C(e) }), n
    }

    function k(e, t) {
        var n = [];
        return "true" === e.multiple_name || !0 === e.multiple_name ? [{ attr: "prefix", label: "prefix_label", element_suffix: "prefix", hasOptions: !0, values: [{ label: "Mr.", value: "Mr" }, { label: "Mrs.", value: "Mrs" }, { label: "Ms.", value: "Ms" }, { label: "Miss", value: "Miss" }, { label: "Dr.", value: "Dr" }, { label: "Prof.", value: "Prof" }], isNumber: !1 }, { attr: "fname", label: "fname_label", element_suffix: "first-name", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "mname", label: "mname_label", element_suffix: "middle-name", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "lname", label: "lname_label", element_suffix: "last-name", hasOptions: !1, values: !1, isNumber: !1 }].map(function(r) {
            if ("true" === e[r.attr] || !0 === e[r.attr]) {
                var a = void 0;
                a = _.isUndefined(e[r.label]) || _.isEmpty(e[r.label]) ? t + " - " : t + " - " + e[r.label], n.push({ element_id: e.element_id + "-" + r.element_suffix, required: e.required, field_type: e.type, field_slug: e.type + "-" + r.element_suffix, label: a, values: r.values, hasOptions: r.hasOptions, isNumber: r.isNumber })
            }
        }) : n.push({ element_id: e.element_id, required: e.required, field_type: e.type, field_slug: e.type, label: t, values: A(e), hasOptions: T(e), isNumber: C(e) }), n
    }

    function C(e) { return "number" === e.type || "phone" === e.type || "calculation" === e.type }

    function S(e) { return "true" === e.calculations || !0 === e.calculations }

    function M(e) { return !!e.formula && e.formula }

    function T(e) { return "select" === e.type || "checkbox" === e.type || "radio" === e.type }

    function A(e) { var t = e.type; return ("select" === t || "checkbox" === t || "radio" === t) && e.options }

    function F(e, t) {
        var n = [];
        return [{ attr: "street_address", label: "street_address_label", element_suffix: "street_address", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_line", label: "address_line_label", element_suffix: "address_line", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_city", label: "address_city_label", element_suffix: "city", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_state", label: "address_state_label", element_suffix: "state", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_zip", label: "address_zip_label", element_suffix: "zip", hasOptions: !1, values: !1, isNumber: !1 }, { attr: "address_country", label: "address_country_label", element_suffix: "country", hasOptions: !1, values: !1, isNumber: !1 }].map(function(r) {
            if ("true" === e[r.attr] || !0 === e[r.attr]) {
                var a = void 0;
                a = _.isUndefined(e[r.label]) || _.isEmpty(e[r.label]) ? t + " - " : t + " - " + e[r.label], n.push({ element_id: e.element_id + "-" + r.element_suffix, required: e.required, field_type: e.type, field_slug: e.type + "-" + r.element_suffix, label: a, values: r.values, hasOptions: r.hasOptions, isNumber: r.isNumber })
            }
        }), n
    }

    function R(e, t) {
        var n = [],
            r = void 0;
        r = _.isUndefined(e.hh_label) || _.isEmpty(e.hh_label) ? t + " - " + O("Hour") : t + " - " + e.hh_label;
        var a = void 0;
        return a = _.isUndefined(e.mm_label) || _.isEmpty(e.mm_label) ? t + " - " + O("Minute") : t + " - " + e.mm_label, n.push({ element_id: e.element_id + "-hours", required: e.required, field_type: e.type, field_slug: e.type + "-hours", label: r, values: !1, hasOptions: !1, isNumber: !0 }, { element_id: e.element_id + "-minutes", required: e.required, field_type: e.type, field_slug: e.type + "-minutes", label: a, values: !1, hasOptions: !1, isNumber: !0 }), "twelve" === e.time_type && n.push({ element_id: e.element_id + "-ampm", required: e.required, field_type: e.type, field_slug: e.type + "-ampm", label: t + "-AM/PM", values: [{ label: "AM", value: "am" }, { label: "PM", value: "pm" }], hasOptions: !0, isNumber: !1 }), n
    }

    function D(e) {
        var t = [],
            n = powerformData.fields.filter(function(t) { return t.type === e });
        return n.length < 1 ? [] : (n = n[0], _.isUndefined(n.autofill_settings) || (t = n.autofill_settings), t)
    }

    function q(e, t, n) {
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

    function U(e) {
        if (e.length < 6) return !1;
        if (e.indexOf("@", 1) < 0) return !1;
        var t = e.split("@", 2);
        if (!t[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) return !1;
        if (t[1].match(/\.{2,}/)) return !1;
        var n = t[1],
            r = n.split(".");
        if (r.length < 2) return !1;
        for (var a = r.length, o = 0; o < a; o++)
            if (!r[o].match(/^[a-z0-9-]+$/i)) return !1;
        return !0
    }

    function I() { "object" === H(window.SUI) && setTimeout(function() { SUI.suiAccordion(jQuery(".sui-accordion")), SUI.suiTabs(jQuery(".sui-tabs")), jQuery("select").not(".sui-select").not(".powerform-select").not(".powerform-time").not(".fui-multi-select").each(function() { SUI.suiSelect(jQuery(this)) }), jQuery("select.sui-select").not(".fui-multi-select").not(".custom-select2").each(function() { jQuery(this).SUIselect2({ dropdownCssClass: "sui-select-dropdown" }) }), SUI.loadCircleScore(jQuery(".sui-circle-score")), SUI.showHidePassword() }, 50) }

    function z(e) { var t = "none"; return H(e["results-behav"]) && H(e["results-style"]) && ("link_on" !== e["results-behav"] && "show_after" !== e["results-behav"] || (t = e["results-style"])), t }

    function L(e) { var t = []; return _.each(powerformData.fields, function(e) { "calculation" !== e.type && t.push(e.type) }), x(e, t) }

    function V(e, t) {
        t = _.defaults(t, { allowClear: !0, dropdownCssClass: "sui-select-dropdown" }), e.find("select.sui-select.fui-multi-select").each(function() {
            jQuery(this).attr("data-reorder") && jQuery(this).on("select2:select", function(e) {
                var t = e.params.data.element,
                    n = jQuery(t),
                    r = jQuery(this);
                r.append(n), r.trigger("change.select2")
            }), jQuery(this).SUIselect2(t)
        })
    }

    function B(e) { return "name" !== e.type || "true" !== e.multiple_name && !0 !== e.multiple_name ? "address" === e.type ? !!(e.street_address_required || e.address_line_required || e.address_city_required || e.address_state_required || e.address_zip_required || e.address_country_required) : e.required : !!(e.prefix_required || e.fname_required || e.mname_required || e.lname_required) }

    function Q(e, t, n, r) { var a = 0; return e.map(function(e) { e.fields.map(function(e) { t === e.type && r === e[n] && a++ }) }), a > 0 }

    function $(e) {
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

    function W(e, t) {
        var n = e.slug,
            r = [];
        return _.isEmpty(t) || (_.each(t, function(e, t) { _.isEmpty(e.answers) || _.each(e.answers, function(t, a) { t.result === n && r.push({ title: e.title, slug: e.slug, question: e }) }) }), r = _.uniq(r, "slug")), r
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
    t.randNumber = a, t.generateWrapperId = o, t.getWrapper = i, t.countFieldsByType = s, t.getMaxIDByType = l, t.getMaxID = u, t.generateValue = c, t.hasFieldType = f, t.getFieldsByType = p, t.mapFieldsByType = d, t.getFieldLabel = h, t.fieldExist = m, t.buildFieldObject = y, t.buildFieldObjectFromSlug = b, t.getFieldType = v, t.getPowerformField = g, t.insertInPosition = E, t.replaceInPosition = w, t.translate = O, t.getFontVariants = j, t.ucfirst = P, t.getFields = x, t.getDateFields = N, t.getNameFields = k, t.fieldHasNumber = C, t.fieldHasCalcs = S, t.fieldFormula = M, t.fieldHasOptions = T, t.getFieldValues = A, t.getAddressFields = F, t.getTimeFields = R, t.getFieldAutofillProviders = D, t.getRuleLabel = q, t.isEmailWp = U, t.suiDelegateEvents = I, t.getChartType = z, t.getCalculationFields = L, t.select2Tags = V, t.isFieldRequired = B, t.hasFieldWithAttribute = Q, t.hasPostdataFieldWithMultiselect = $, t.getPersonalityQuestions = W;
    var Y = n(60),
        G = function(e) { return e && e.__esModule ? e : { default: e } }(Y)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
        f = function(e) {
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return o(t, e), s(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, { key: "isValid", value: function(e) { return this.props.isRequired ? this.props.isRequired && !_.isEmpty(e) : !!_.isUndefined(this.props.isPositive) || (_.isEmpty(e) || e >= 0) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.type) ? "text" : this.props.type,
                        r = _.isUndefined(this.props.requiredError) ? (0, c.translate)("This field is required!") : this.props.requiredError,
                        a = this.isValid(t) ? "" : "sui-form-field-error",
                        o = _.isUndefined(this.props.fieldClass) ? "sui-form-field" : "sui-form-field " + this.props.fieldClass,
                        s = _.isUndefined(this.props.inputClass) ? "sui-form-control" : "sui-form-control " + this.props.inputClass,
                        l = _.isUndefined(this.props.inputId) ? this.props.property : this.props.inputId,
                        f = void 0;
                    this.props.label && (f = u.default.createElement("label", { htmlFor: "powerform-field-" + l, className: this.props.darkLabel ? "sui-settings-label sui-dark" : "sui-label" }, this.props.label, this.props.isRequired && u.default.createElement(u.default.Fragment, null, " ", u.default.createElement("span", { className: "sui-error" }, "*")), this.props.note && u.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var p = u.default.createElement("input", i({ type: n, placeholder: this.props.placeholder, value: t || "", id: "powerform-field-" + l, className: s }, this.props.notWritable && { readonly: "" }, this.props.minValue && { min: this.props.minValue }, this.props.maxValue && { max: this.props.maxValue }, this.props.maxLength && { maxlength: this.props.maxLength }, this.props.inputStyles && { style: this.props.inputStyles }, { disabled: !!this.props.disabled, onChange: function(t) { e.updateValue(t.target.value) } })),
                        d = u.default.createElement("div", { className: o + " " + a }, f, this.props.canTrash ? u.default.createElement("div", { className: "sui-with-button sui-with-button-icon" }, p, u.default.createElement("button", { className: "sui-button-icon sui-tooltip sui-tooltip-top-right", "data-tooltip": (0, c.translate)("Delete") }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }))) : p, this.props.suffix && u.default.createElement("span", { className: "sui-field-suffix" }, this.props.suffix), this.props.isRequired && !this.isValid(t) && u.default.createElement("span", { className: "sui-error-message" }, r), !_.isUndefined(this.props.isPositive) && !this.isValid(t) && u.default.createElement("span", { className: "sui-error-message" }, (0, c.translate)("Please enter valid number.")), this.props.description && u.default.createElement("span", { className: "sui-description" }, this.props.description));
                    return this.props.simple ? p : d
                }
            }]), t
        }(l.Component);
    t.default = f
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { var e = l.default.Children.map(this.props.children, function(e) { return e }); return l.default.createElement("div", null, e) } }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{
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

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "toggleValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, { key: "getDefaultValue", value: function() { var e = this.props.default ? this.props.default : ""; return _.isUndefined(this.props.settings[this.props.property]) ? e : this.props.settings[this.props.property] } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.getDefaultValue(),
                        n = l.default.Children.map(this.props.children, function(n) { if (!n) return l.default.createElement(l.default.Fragment, null); var r = _.isUndefined(n.props.label) ? n.props.children : n.props.label; return l.default.createElement("div", { className: "sui-tab-item" + (n.props.value === t ? " active" : ""), onClick: e.toggleValue.bind(e, n.props.value) }, r) }),
                        r = _.isUndefined(this.props.divClass) ? "sui-tabs-content" : "sui-tabs-content " + this.props.divClass,
                        a = l.default.Children.map(this.props.children, function(e) { if (!e) return l.default.createElement(l.default.Fragment, null); var n = _.isUndefined(e.props.boxClass) ? "" : e.props.boxClass; return "Empty" !== e.type.name ? l.default.createElement("div", { className: n + " sui-tab-content" + (e.props.value === t ? " active" : "") }, e.props.value === t && e) : l.default.createElement(l.default.Fragment, null) }),
                        o = "";
                    this.props.label && "" !== this.props.label && (o = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, this.props.note && l.default.createElement("span", { className: "sui-label-note" }, " ", this.props.note)));
                    var i = "";
                    this.props.settingsLabel && "" !== this.props.settingsLabel && (i = l.default.createElement("label", { className: "sui-settings-label" }, this.props.settingsLabel));
                    var s = "";
                    !this.props.label && this.props.settingsDesc && (s = l.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.settingsDesc));
                    var u = l.default.createElement("div", { className: "sui-side-tabs" }, l.default.createElement("div", { className: "sui-tabs-menu" }, n), l.default.createElement("div", { className: r }, a));
                    return this.props.simple || (u = l.default.createElement("div", { className: "sui-form-field" }, i, o, s, l.default.createElement("div", { className: "sui-side-tabs" }, l.default.createElement("div", { className: "sui-tabs-menu" }, n), l.default.createElement("div", { className: r }, a)))), u
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(83),
        a = n(48),
        o = n(87);
    n.d(t, "Provider", function() { return r.b }), n.d(t, "createProvider", function() { return r.a }), n.d(t, "connectAdvanced", function() { return a.a }), n.d(t, "connect", function() { return o.a })
}, function(e, t, n) {
    "use strict";

    function r(e) { if ("object" !== (void 0 === e ? "undefined" : h(e)) || null === e) return !1; for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t); return Object.getPrototypeOf(e) === t }

    function a(e, t, n) {
        function o() { v === b && (v = b.slice()) }

        function i() { if (g) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."); return y }

        function s(e) {
            if ("function" != typeof e) throw new Error("Expected the listener to be a function.");
            if (g) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
            var t = !0;
            return o(), v.push(e),
                function() {
                    if (t) {
                        if (g) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                        t = !1, o();
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
            }, e[p.a] = function() { return this }, e
        }
        var f;
        if ("function" == typeof t && void 0 === n && (n = t, t = void 0), void 0 !== n) { if ("function" != typeof n) throw new Error("Expected the enhancer to be a function."); return n(a)(e, t) }
        if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
        var m = e,
            y = t,
            b = [],
            v = b,
            g = !1;
        return l({ type: d.INIT }), f = { dispatch: l, subscribe: s, getState: i, replaceReducer: u }, f[p.a] = c, f
    }

    function o(e, t) { var n = t && t.type; return "Given " + (n && 'action "' + String(n) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.' }

    function i(e) { Object.keys(e).forEach(function(t) { var n = e[t]; if (void 0 === n(void 0, { type: d.INIT })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."); if (void 0 === n(void 0, { type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".") })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + d.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.') }) }

    function s(e) {
        for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) { var a = t[r]; "function" == typeof e[a] && (n[a] = e[a]) }
        var s = Object.keys(n),
            l = void 0;
        try { i(n) } catch (e) { l = e }
        return function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1];
            if (l) throw l;
            for (var r = !1, a = {}, i = 0; i < s.length; i++) {
                var u = s[i],
                    c = n[u],
                    f = e[u],
                    p = c(f, t);
                if (void 0 === p) { var d = o(u, t); throw new Error(d) }
                a[u] = p, r = r || p !== f
            }
            return r ? a : e
        }
    }

    function l(e, t) { return function() { return t(e.apply(this, arguments)) } }

    function u(e, t) {
        if ("function" == typeof e) return l(e, t);
        if ("object" !== (void 0 === e ? "undefined" : h(e)) || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : void 0 === e ? "undefined" : h(e)) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        for (var n = Object.keys(e), r = {}, a = 0; a < n.length; a++) {
            var o = n[a],
                i = e[o];
            "function" == typeof i && (r[o] = l(i, t))
        }
        return r
    }

    function c() { for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n]; return 0 === t.length ? function(e) { return e } : 1 === t.length ? t[0] : t.reduce(function(e, t) { return function() { return e(t.apply(void 0, arguments)) } }) }

    function f() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return function(e) {
            return function() {
                for (var n = arguments.length, r = Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                var o = e.apply(void 0, r),
                    i = function() { throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.") },
                    s = { getState: o.getState, dispatch: function() { return i.apply(void 0, arguments) } },
                    l = t.map(function(e) { return e(s) });
                return i = c.apply(void 0, l)(o.dispatch), m({}, o, { dispatch: i })
            }
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), n.d(t, "createStore", function() { return a }), n.d(t, "combineReducers", function() { return s }), n.d(t, "bindActionCreators", function() { return u }), n.d(t, "applyMiddleware", function() { return f }), n.d(t, "compose", function() { return c }), n.d(t, "__DO_NOT_USE__ActionTypes", function() { return d });
    var p = n(90),
        d = { INIT: "@@redux/INIT" + Math.random().toString(36).substring(7).split("").join("."), REPLACE: "@@redux/REPLACE" + Math.random().toString(36).substring(7).split("").join(".") },
        h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        m = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { var e = l.default.Children.map(this.props.children, function(e) { return e }); return l.default.createElement("div", { className: "sui-row" + (_.isUndefined(this.props.class) ? "" : " " + this.props.class) }, e) } }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return o(t, e), i(t, [{
                key: "componentDidMount",
                value: function() {
                    this.$el = jQuery(this.el), this.$el.wpColorPicker({ change: function(e, t) { jQuery(this).val(t.color.toCSS()).trigger("change") }, palettes: ["#333333", "#FFFFFF", "#17A8E3", "#E1F6FF", "#666666", "#AAAAAA", "#E6E6E6"] });
                    var e = this.$el,
                        t = e.closest(".sui-colorpicker-wrap"),
                        n = t.find(".sui-colorpicker-value span[role=button]"),
                        r = t.find(".sui-colorpicker-value"),
                        a = r.find("button"),
                        o = e.closest(".wp-picker-container"),
                        i = o.find(".wp-color-result"),
                        s = i.find(".color-alpha"),
                        l = o.find(".wp-picker-clear"),
                        u = s;
                    u = !0 === e.data("alpha") ? s : i, e.bind("change", function() { n.find("span").css({ "background-color": u.css("background-color") }), r.find("input").val(e.val()) }), t.find(".sui-button, span[role=button]").on("click", function(e) { e.preventDefault(), e.stopPropagation(), i.click() }), a.on("click", function(e) { e.preventDefault(), e.stopPropagation(), l.click(), r.find("input").val(""), n.find("span").css({ "background-color": "" }) }), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue)
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

    function a(e) { return "[object ArrayBuffer]" === j.call(e) }

    function o(e) { return "undefined" != typeof FormData && e instanceof FormData }

    function i(e) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer }

    function s(e) { return "string" == typeof e }

    function l(e) { return "number" == typeof e }

    function u(e) { return void 0 === e }

    function c(e) { return null !== e && "object" == typeof e }

    function f(e) { return "[object Date]" === j.call(e) }

    function p(e) { return "[object File]" === j.call(e) }

    function d(e) { return "[object Blob]" === j.call(e) }

    function h(e) { return "[object Function]" === j.call(e) }

    function m(e) { return c(e) && h(e.pipe) }

    function y(e) { return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams }

    function b(e) { return e.replace(/^\s*/, "").replace(/\s*$/, "") }

    function v() { return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document) }

    function g(e, t) {
        if (null !== e && void 0 !== e)
            if ("object" != typeof e && (e = [e]), r(e))
                for (var n = 0, a = e.length; n < a; n++) t.call(null, e[n], n, e);
            else
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
    }

    function _() {
        function e(e, n) { "object" == typeof t[n] && "object" == typeof e ? t[n] = _(t[n], e) : t[n] = e }
        for (var t = {}, n = 0, r = arguments.length; n < r; n++) g(arguments[n], e);
        return t
    }

    function E(e, t, n) { return g(t, function(t, r) { e[r] = n && "function" == typeof t ? w(t, n) : t }), e }
    var w = n(69),
        O = n(151),
        j = Object.prototype.toString;
    e.exports = { isArray: r, isArrayBuffer: a, isBuffer: O, isFormData: o, isArrayBufferView: i, isString: s, isNumber: l, isObject: c, isUndefined: u, isDate: f, isFile: p, isBlob: d, isFunction: h, isStream: m, isURLSearchParams: y, isStandardBrowserEnv: v, forEach: g, merge: _, extend: E, trim: b }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return o(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), SUI.suiSelect(this.$el), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue) } }, { key: "updateValue", value: function(e) { var t = e.target.value; "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, t) : this.props.actions.settingsActions.updateSetting(this.props.property, t) } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.fieldClass) ? "sui-form-field" : "sui-form-field " + this.props.fieldClass,
                        r = _.isUndefined(this.props.elementClass) ? "" : this.props.elementClass,
                        a = _.isUndefined(this.props.elementId) ? this.props.property : this.props.elementId,
                        o = "";
                    this.props.label && (o = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, id: "powerform-field-" + this.props.property + "-label", className: "sui-label" }, this.props.label, " ", this.props.required && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var i = l.default.createElement("select", { defaultValue: t, id: "powerform-field-" + a, className: r, "aria-labelledby": "powerform-field-" + a + "-label", ref: function(t) { return e.el = t } }, this.props.children),
                        s = i;
                    "md" === this.props.fieldSize || "medium" === this.props.fieldSize ? s = l.default.createElement("div", { class: "sui-form-field sui-input-md" }, i) : "sm" === this.props.fieldSize || "small" === this.props.fieldSize ? s = l.default.createElement("div", { class: "sui-form-field sui-input-sm" }, i) : "" !== this.props.fieldSize && (s = l.default.createElement("div", { style: { width: "100%", maxWidth: this.props.fieldSize + "px" } }, i));
                    var u = s;
                    return this.props.simple || (u = l.default.createElement("div", { className: n }, o, s, this.props.description && l.default.createElement("span", { className: "sui-description", style: { marginTop: "10px" } }, this.props.description))), u
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r() { return "" }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;
    var a = n(0);
    ! function(e) { e && e.__esModule }(a)
}, function(e, t, n) {
    "use strict";
    var r = function(e, t, n, r, a, o, i, s) {
        if (!e) {
            var l;
            if (void 0 === t) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var u = [n, r, a, o, i, s],
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

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { active: n.props.default ? n.props.default : "" }, n }
            return o(t, e), i(t, [{ key: "toggleValue", value: function(e) { this.setState({ active: e }) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = (this.props.default && this.props.default, this.props.type ? this.props.type : "side-tabs"),
                        n = this.props.extraClass ? this.props.extraClass : "",
                        r = l.default.Children.map(this.props.children, function(t) { if (!_.isUndefined(t) && !_.isNull(t)) return l.default.createElement("div", { className: "powerform-toggle sui-tab-item" + (t.props.value === e.state.active ? " active" : ""), onClick: e.toggleValue.bind(e, t.props.value) }, t.props.label, " ", t.props.required && l.default.createElement("span", { className: "sui-error" }, "*")) }),
                        a = l.default.Children.map(this.props.children, function(t) { if (!_.isUndefined(t) && !_.isNull(t)) { var n = _.isUndefined(t.props.boxClass) ? "sui-tab-content" : t.props.boxClass; return l.default.createElement("div", { className: n + (t.props.value === e.state.active ? " active" : "") }, t.props.value === e.state.active && t) } });
                    return l.default.createElement("div", { className: "sui-" + t + " " + n }, l.default.createElement("div", { className: "sui-tabs-menu" }, r), l.default.createElement("div", { className: "sui-tabs-content" }, a))
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{
                key: "render",
                value: function() {
                    var e = l.default.Children.map(this.props.children, function(e) { return e }),
                        t = "";
                    this.props.label && "" !== this.props.label && (t = l.default.createElement("span", { className: "sui-settings-label" }, this.props.label));
                    var n = "";
                    this.props.description && "" !== this.props.description && (n = l.default.createElement("span", { className: "sui-description" }, this.props.description));
                    var r = "";
                    return (this.props.label && "" !== this.props.label || this.props.description && "" !== this.props.description) && (r = l.default.createElement("div", { className: "sui-box-settings-col-1" }, t, n)), l.default.createElement("div", { className: "sui-box-settings-row" }, r, l.default.createElement("div", { className: "sui-box-settings-col-2" }, e))
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";
    var r = function() {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), s(t, [{
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
                    var a = "";
                    this.props.description && "" !== this.props.description && (a = u.default.createElement("span", { className: "sui-description" }, this.props.description));
                    var o = "";
                    !this.props.label && this.props.settingsLabel && (o = u.default.createElement("label", { className: "sui-settings-label" }, this.props.settingsLabel));
                    var s = "";
                    !this.props.label && this.props.settingsDesc && (s = u.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.settingsDesc));
                    var l = u.default.createElement("div", { className: "sui-side-tabs", style: this.props.description && { marginBottom: "5px" } }, u.default.createElement("div", { className: "sui-tabs-menu", role: "tablist" }, n)),
                        c = u.default.createElement(u.default.Fragment, null, r, l);
                    return this.props.noWrapper || (c = u.default.createElement("div", { className: "sui-form-field" }, r, o, s, l, a)), c
                }
            }]), t
        }(l.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(106);
    n.d(t, "BrowserRouter", function() { return r.a });
    var a = n(112);
    n.d(t, "HashRouter", function() { return a.a });
    var o = n(55);
    n.d(t, "Link", function() { return o.a });
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
    var f = n(36);
    n.d(t, "Router", function() { return f.a });
    var p = n(121);
    n.d(t, "StaticRouter", function() { return p.a });
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
    var a = n(110);
    n.d(t, "b", function() { return a.a });
    var o = n(111);
    n.d(t, "d", function() { return o.a });
    var i = n(29);
    n.d(t, "c", function() { return i.a }), n.d(t, "f", function() { return i.b });
    var s = n(25);
    n.d(t, "e", function() { return s.b })
}, , function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.afterSave = n.afterSave.bind(n), n }
            return o(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el); var e = Object.assign({ dropdownCssClass: "sui-select-dropdown" }, this.props.options); "function" == typeof this.$el.SUIselect2 ? this.$el.SUIselect2(e) : "function" == typeof this.$el.FUIselect2 ? this.$el.FUIselect2(e) : console.log("select2 not intiated"), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue) } }, { key: "updateValue", value: function(e) { var t = jQuery(e.target).val(); "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, t) : this.props.actions.settingsActions.updateSetting(this.props.property, t), this.afterSave(t) } }, { key: "afterSave", value: function() { return !1 } }, { key: "componentWillUnmount", value: function() { this.$el.off("change", this.updateValue), this.$el.unbind().removeData() } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.fieldClass) ? "sui-form-field" : "sui-form-field " + this.props.fieldClass,
                        r = void 0;
                    this.props.label && (r = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, " ", this.props.required && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var a = this.props.multiple,
                        o = l.default.createElement("select", { id: "powerform-field-" + this.props.property, className: "sui-select", ref: function(t) { return e.el = t }, defaultValue: t, multiple: a }, this.props.children),
                        i = l.default.createElement("select", { id: "powerform-field-" + this.props.property, className: "sui-select", ref: function(t) { return e.el = t }, defaultValue: t, multiple: a }, this.props.children);
                    return "md" === this.props.fieldSize || "medium" === this.props.fieldSize ? i = l.default.createElement("div", { className: "sui-form-field sui-input-md" }, o) : "sm" === this.props.fieldSize || "small" === this.props.fieldSize ? i = l.default.createElement("div", { className: "sui-form-field sui-input-sm" }, o) : "" === this.props.fieldSize && (i = l.default.createElement("div", { style: { width: "100%", maxWidth: this.props.fieldSize + "px" } }, o)), this.props.noWrapper ? o : l.default.createElement("div", { className: n }, r, i, this.props.description && l.default.createElement("span", { className: "sui-description", style: { marginTop: "10px" } }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = u
}, , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.showModal = function(e, t) { return function(n) { n({ type: "SHOW_MODAL", modalProps: e, modalType: t }) } }, t.hideModal = function() { return function(e) { e({ type: "HIDE_MODAL" }) } }
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() { return r }), n.d(t, "f", function() { return a }), n.d(t, "c", function() { return o }), n.d(t, "e", function() { return i }), n.d(t, "g", function() { return s }), n.d(t, "d", function() { return l }), n.d(t, "b", function() { return u });
    var r = function(e) { return "/" === e.charAt(0) ? e : "/" + e },
        a = function(e) { return "/" === e.charAt(0) ? e.substr(1) : e },
        o = function(e, t) { return new RegExp("^" + t + "(\\/|\\?|#|$)", "i").test(e) },
        i = function(e, t) { return o(e, t) ? e.substr(t.length) : e },
        s = function(e) { return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e },
        l = function(e) {
            var t = e || "/",
                n = "",
                r = "",
                a = t.indexOf("#"); - 1 !== a && (r = t.substr(a), t = t.substr(0, a));
            var o = t.indexOf("?");
            return -1 !== o && (n = t.substr(o), t = t.substr(0, o)), { pathname: t, search: "?" === n ? "" : n, hash: "#" === r ? "" : r }
        },
        u = function(e) {
            var t = e.pathname,
                n = e.search,
                r = e.hash,
                a = t || "/";
            return n && "?" !== n && (a += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (a += "#" === r.charAt(0) ? r : "#" + r), a
        }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return o(t, e), i(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? "" : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.customClass) ? "sui-form-control" : this.props.customClass,
                        r = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-toggle" }, l.default.createElement("input", { type: "checkbox", value: "true", id: "powerform-field-" + this.props.property, className: n, checked: t ? "checked" : "", onChange: function(t) { e.updateValue(t.target.checked) } }), l.default.createElement("span", { className: "sui-toggle-slider" }), this.props.label && l.default.createElement("span", { className: "sui-screen-reader-text" }, (0, u.translate)("Enable"), " ", this.props.label)),
                        a = "";
                    return this.props.label && (a = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property }, this.props.label)), this.props.unWrap ? l.default.createElement(l.default.Fragment, null, r, a, this.props.description && l.default.createElement("span", { className: "sui-description sui-toggle-description" }, this.props.description)) : this.props.unWrap ? void 0 : l.default.createElement("div", { className: "sui-form-field" }, r, a, this.props.description && l.default.createElement("span", { className: "sui-description sui-toggle-description" }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.updateSetting = function(e, t) { return function(n) { window.powerformChanges.settings = !0, n({ type: "UPDATE_SETTING", setting: e, value: t }) } }, t.updateSettings = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_SETTINGS", settings: e }) } }, t.saveBuilder = function(e, t) { return function(n) { window.powerformChanges = { fields: [], settings: !1, saved: !0 }, n({ type: "UPDATE_SETTING", setting: e, value: t }) } }
}, function(e, t, n) {
    "use strict";
    var r = function() {};
    e.exports = r
}, function(e, t, n) {
    "use strict";
    n.d(t, "a", function() { return s }), n.d(t, "b", function() { return l });
    var r = n(108),
        a = n(109),
        o = n(25),
        i = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        s = function(e, t, n, a) { var s = void 0; "string" == typeof e ? (s = Object(o.d)(e), s.state = t) : (s = i({}, e), void 0 === s.pathname && (s.pathname = ""), s.search ? "?" !== s.search.charAt(0) && (s.search = "?" + s.search) : s.search = "", s.hash ? "#" !== s.hash.charAt(0) && (s.hash = "#" + s.hash) : s.hash = "", void 0 !== t && void 0 === s.state && (s.state = t)); try { s.pathname = decodeURI(s.pathname) } catch (e) { throw e instanceof URIError ? new URIError('Pathname "' + s.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e } return n && (s.key = n), a ? s.pathname ? "/" !== s.pathname.charAt(0) && (s.pathname = Object(r.a)(s.pathname, a.pathname)) : s.pathname = a.pathname : s.pathname || (s.pathname = "/"), s },
        l = function(e, t) { return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Object(a.a)(e.state, t.state) }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "initialize", value: function() { jQuery("#powerform-notification").length ? (jQuery("#powerform-notification").remove(), this.initialize()) : jQuery("main.sui-wrap").append('<div id="powerform-notification" class="sui-notice-top sui-notice-' + this.props.type + ' sui-can-dismiss"><div class="sui-notice-content"><p>' + this.props.text + '</p></div><span class="sui-notice-dismiss"><a role="button" href="#" aria-label="Dismiss" class="sui-icon-check"></a></span></div>'), this.$notification = jQuery("#powerform-notification") } }, {
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

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.updateEditor = n.updateEditor.bind(n), n.toggleOptions = n.toggleOptions.bind(n), n.state = { editorOptionsOpen: !1 }, n }
            return o(t, e), i(t, [{
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
                        a = _.map(t, function(t, n) { if (!t.required && r !== t.field_type) return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, t.element_id) }, t.label)) });
                    return l.default.createElement(l.default.Fragment, null, n && l.default.createElement(l.default.Fragment, null, l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, (0, u.translate)("Required Fields"))), l.default.createElement(l.default.Fragment, null, n)), !_.isUndefined(a[0]) && a && l.default.createElement(l.default.Fragment, null, l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, (0, u.translate)("Optional Fields"))), l.default.createElement(l.default.Fragment, null, a)))
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
                        a = this.props.mainOptions ? this.props.mainOptions : { form_name: (0, u.translate)("Form Name") };
                    return l.default.createElement("ul", { className: this.state.editorOptionsOpen ? "sui-active" : "" }, this.props.enableAllFormFields && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("a", { className: "psource-insert-content", onClick: this.insertContent.bind(this, "all_fields") }, (0, u.translate)("All Form Fields"))), this.props.enableAllNonFormFields && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("a", { className: "psource-insert-content", onClick: this.insertContent.bind(this, "all_non_empty_fields") }, (0, u.translate)("All Non Empty Fields"))), r, l.default.createElement(l.default.Fragment, null, this.props.mainOptionsLabel && l.default.createElement("li", { className: "psource-dropdown--option" }, l.default.createElement("strong", null, this.props.mainOptionsLabel)), _.map(a, function(t, n) { return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("a", { className: "psource-insert-content", onClick: e.insertContent.bind(e, n) }, t)) })), t, n)
                }
            }, { key: "isValid", value: function(e) { return this.props.isRequired ? this.props.isRequired && !_.isEmpty(e) : !!_.isUndefined(this.props.isPositive) || (_.isEmpty(e) || e >= 0) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? "" : this.props.settings[this.props.property],
                        n = this.getEditorOptions(),
                        r = _.isUndefined(this.props.requiredError) ? (0, u.translate)("This field is required!") : this.props.requiredError,
                        a = this.isValid(t) ? "" : "sui-form-field-error",
                        o = void 0;
                    _.isEmpty(n) || (o = l.default.createElement("div", { className: "sui-editor-options" }, l.default.createElement("button", { className: this.state.editorOptionsOpen ? "sui-tooltip sui-active" : "sui-tooltip", "data-tooltip": (0, u.translate)("Add form data"), onClick: this.toggleOptions }, l.default.createElement("i", { className: "sui-icon-layout sui-sm", "aria-hidden": "true" })), n));
                    var i = "";
                    return this.props.label && (i = l.default.createElement("label", { htmlFor: "powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : ""), className: "sui-label" }, this.props.label, " ", this.props.isRequired && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note))), l.default.createElement("div", { className: "sui-form-field " + a }, i, this.props.descriptionTop && l.default.createElement("span", { className: "sui-description", style: { marginBottom: "20px" } }, this.props.descriptionTop), l.default.createElement("div", { className: "sui-editor" + (_.isEmpty(n) ? "" : " sui-editor-with-options") }, o, l.default.createElement("textarea", { id: "powerform-field-" + (this.props.property + !_.isUndefined(this.props.extraId) ? this.props.extraId : ""), placeholder: this.props.placeholder, defaultValue: t, onChange: function(t) { e.updateValue(t.target.value) } })), this.props.isRequired && !this.isValid(t) && l.default.createElement("span", { className: "sui-error-message" }, r), this.props.description && l.default.createElement("span", { className: "sui-description" }, this.props.description))
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(9),
        d = r(p),
        h = n(4),
        m = r(h),
        y = n(2),
        b = r(y),
        v = n(22),
        g = r(v),
        E = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "backwardsCompat", value: function(e, t) { return _.contains(t, e) || t.push(e), t } }, {
                key: "render",
                value: function() {
                    var e = _.isUndefined(this.props.settings[this.props.prefix + "-font-family"]) ? this.props.defaultFont : this.props.settings[this.props.prefix + "-font-family"],
                        t = _.isUndefined(this.props.settings[this.props.prefix + "-font-size"]) ? this.props.defaultSize : this.props.settings[this.props.prefix + "-font-size"],
                        n = _.isUndefined(this.props.settings[this.props.prefix + "-font-weight"]) ? this.props.defaultWeight : this.props.settings[this.props.prefix + "-font-weight"],
                        r = (0, f.getFontVariants)(e, window.powerformFonts),
                        a = this.backwardsCompat(n, r),
                        o = "";
                    return "custom" === e && (o = c.default.createElement(d.default, null, c.default.createElement(m.default, { cols: "12" }, c.default.createElement(b.default, s({}, this.props, { type: "text", label: (0, f.translate)("Custom font family"), placeholder: (0, f.translate)("E.g. Arial, sans-serif"), property: this.props.prefix + "-custom-family" }))))), c.default.createElement(c.default.Fragment, null, c.default.createElement(d.default, null, c.default.createElement(m.default, { cols: "12" }, c.default.createElement(g.default, s({}, this.props, { label: (0, f.translate)("Font Family"), placeholder: (0, f.translate)("Roboto"), property: this.props.prefix + "-font-family", defaultValue: e }), _.map(window.powerformFonts, function(e) { return c.default.createElement("option", { value: e.family, key: e.family }, e.family) }), c.default.createElement("option", { value: "custom", key: "custom" }, (0, f.translate)("Custom user font"))))), o, c.default.createElement(d.default, null, c.default.createElement(m.default, { cols: "6" }, c.default.createElement(b.default, s({}, this.props, { type: "number", label: (0, f.translate)("Font Size"), placeholder: (0, f.translate)("e.g. 0.75em"), property: this.props.prefix + "-font-size", defaultValue: t }))), c.default.createElement(m.default, { cols: "6" }, c.default.createElement(g.default, s({}, this.props, { label: (0, f.translate)("Font Weight"), placeholder: (0, f.translate)("Select font weight"), property: this.props.prefix + "-font-weight", defaultValue: n }), _.map(a, function(e) { return c.default.createElement("option", { value: e, key: e }, e) })))))
                }
            }]), t
        }(u.Component);
    t.default = E
}, function(e, t, n) {
    "use strict";

    function r(e) { "undefined" != typeof console && "function" == typeof console.error && console.error(e); try { throw new Error(e) } catch (e) {} }
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        a = n.n(r),
        o = function() {
            var e = null,
                t = function(t) {
                    return a()(null == e, "A history supports only one prompt at a time"), e = t,
                        function() { e === t && (e = null) }
                },
                n = function(t, n, r, o) { if (null != e) { var i = "function" == typeof e ? e(t, n) : e; "string" == typeof i ? "function" == typeof r ? r(i, o) : (a()(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), o(!0)) : o(!1 !== i) } else o(!0) },
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
    t.a = o
}, function(e, t, n) {
    "use strict";
    var r = n(37);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(14),
        u = n.n(l),
        c = n(0),
        f = n.n(c),
        p = n(5),
        d = n.n(p),
        h = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        m = function(e) {
            function t() {
                var n, o, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = o = a(this, e.call.apply(e, [this].concat(l))), o.state = { match: o.computeMatch(o.props.history.location.pathname) }, i = n, a(o, i)
            }
            return o(t, e), t.prototype.getChildContext = function() { return { router: h({}, this.context.router, { history: this.props.history, route: { location: this.props.history.location, match: this.state.match } }) } }, t.prototype.computeMatch = function(e) { return { path: "/", url: "/", params: {}, isExact: "/" === e } }, t.prototype.componentWillMount = function() {
                var e = this,
                    t = this.props,
                    n = t.children,
                    r = t.history;
                u()(null == n || 1 === f.a.Children.count(n), "A <Router> may have only one child element"), this.unlisten = r.listen(function() { e.setState({ match: e.computeMatch(r.location.pathname) }) })
            }, t.prototype.componentWillReceiveProps = function(e) { s()(this.props.history === e.history, "You cannot change <Router history>") }, t.prototype.componentWillUnmount = function() { this.unlisten() }, t.prototype.render = function() { var e = this.props.children; return e ? f.a.Children.only(e) : null }, t
        }(f.a.Component);
    m.propTypes = { history: d.a.object.isRequired, children: d.a.node }, m.contextTypes = { router: d.a.object }, m.childContextTypes = { router: d.a.object.isRequired }, t.a = m
}, function(e, t, n) {
    "use strict";
    var r = n(58),
        a = n.n(r),
        o = {},
        i = 0,
        s = function(e, t) {
            var n = "" + t.end + t.strict + t.sensitive,
                r = o[n] || (o[n] = {});
            if (r[e]) return r[e];
            var s = [],
                l = a()(e, s, t),
                u = { re: l, keys: s };
            return i < 1e4 && (r[e] = u, i++), u
        },
        l = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = arguments[2];
            "string" == typeof t && (t = { path: t });
            var r = t,
                a = r.path,
                o = r.exact,
                i = void 0 !== o && o,
                l = r.strict,
                u = void 0 !== l && l,
                c = r.sensitive,
                f = void 0 !== c && c;
            if (null == a) return n;
            var p = s(a, { end: i, strict: u, sensitive: f }),
                d = p.re,
                h = p.keys,
                m = d.exec(e);
            if (!m) return null;
            var y = m[0],
                b = m.slice(1),
                v = e === y;
            return i && !v ? null : { path: a, url: "/" === a && "" === y ? "/" : y, isExact: v, params: h.reduce(function(e, t, n) { return e[t.name] = b[n], e }, {}) }
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
                    var a = e.charCodeAt(r),
                        o = a >> 8,
                        i = 255 & a;
                    o ? n.push(o, i) : n.push(i)
                } else
                    for (r = 0; r < e.length; r++) n[r] = 0 | e[r];
        return n
    }

    function a(e) { for (var t = "", n = 0; n < e.length; n++) t += s(e[n].toString(16)); return t }

    function o(e) { return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0 }

    function i(e, t) { for (var n = "", r = 0; r < e.length; r++) { var a = e[r]; "little" === t && (a = o(a)), n += l(a.toString(16)) } return n }

    function s(e) { return 1 === e.length ? "0" + e : e }

    function l(e) { return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e }

    function u(e, t, n, r) {
        var a = n - t;
        k(a % 4 == 0);
        for (var o = new Array(a / 4), i = 0, s = t; i < o.length; i++, s += 4) {
            var l;
            l = "big" === r ? e[s] << 24 | e[s + 1] << 16 | e[s + 2] << 8 | e[s + 3] : e[s + 3] << 24 | e[s + 2] << 16 | e[s + 1] << 8 | e[s], o[i] = l >>> 0
        }
        return o
    }

    function c(e, t) { for (var n = new Array(4 * e.length), r = 0, a = 0; r < e.length; r++, a += 4) { var o = e[r]; "big" === t ? (n[a] = o >>> 24, n[a + 1] = o >>> 16 & 255, n[a + 2] = o >>> 8 & 255, n[a + 3] = 255 & o) : (n[a + 3] = o >>> 24, n[a + 2] = o >>> 16 & 255, n[a + 1] = o >>> 8 & 255, n[a] = 255 & o) } return n }

    function f(e, t) { return e >>> t | e << 32 - t }

    function p(e, t) { return e << t | e >>> 32 - t }

    function d(e, t) { return e + t >>> 0 }

    function h(e, t, n) { return e + t + n >>> 0 }

    function m(e, t, n, r) { return e + t + n + r >>> 0 }

    function y(e, t, n, r, a) { return e + t + n + r + a >>> 0 }

    function b(e, t, n, r) {
        var a = e[t],
            o = e[t + 1],
            i = r + o >>> 0,
            s = (i < r ? 1 : 0) + n + a;
        e[t] = s >>> 0, e[t + 1] = i
    }

    function v(e, t, n, r) { return (t + r >>> 0 < t ? 1 : 0) + e + n >>> 0 }

    function g(e, t, n, r) { return t + r >>> 0 }

    function _(e, t, n, r, a, o, i, s) {
        var l = 0,
            u = t;
        return u = u + r >>> 0, l += u < t ? 1 : 0, u = u + o >>> 0, l += u < o ? 1 : 0, u = u + s >>> 0, l += u < s ? 1 : 0, e + n + a + i + l >>> 0
    }

    function E(e, t, n, r, a, o, i, s) { return t + r + o + s >>> 0 }

    function w(e, t, n, r, a, o, i, s, l, u) {
        var c = 0,
            f = t;
        return f = f + r >>> 0, c += f < t ? 1 : 0, f = f + o >>> 0, c += f < o ? 1 : 0, f = f + s >>> 0, c += f < s ? 1 : 0, f = f + u >>> 0, c += f < u ? 1 : 0, e + n + a + i + l + c >>> 0
    }

    function O(e, t, n, r, a, o, i, s, l, u) { return t + r + o + s + u >>> 0 }

    function j(e, t, n) { return (t << 32 - n | e >>> n) >>> 0 }

    function P(e, t, n) { return (e << 32 - n | t >>> n) >>> 0 }

    function x(e, t, n) { return e >>> n }

    function N(e, t, n) { return (e << 32 - n | t >>> n) >>> 0 }
    var k = n(62),
        C = n(63);
    t.inherits = C, t.toArray = r, t.toHex = a, t.htonl = o, t.toHex32 = i, t.zero2 = s, t.zero8 = l, t.join32 = u, t.split32 = c, t.rotr32 = f, t.rotl32 = p, t.sum32 = d, t.sum32_3 = h, t.sum32_4 = m, t.sum32_5 = y, t.sum64 = b, t.sum64_hi = v, t.sum64_lo = g, t.sum64_4_hi = _, t.sum64_4_lo = E, t.sum64_5_hi = w, t.sum64_5_lo = O, t.rotr64_hi = j, t.rotr64_lo = P, t.shr64_hi = x, t.shr64_lo = N
}, function(e, t, n) {
    "use strict";
    (function(t) {
        function r(e, t) {!a.isUndefined(e) && a.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t) }
        var a = n(11),
            o = n(153),
            i = { "Content-Type": "application/x-www-form-urlencoded" },
            s = {
                adapter: function() { var e; return "undefined" != typeof XMLHttpRequest ? e = n(70) : void 0 !== t && (e = n(70)), e }(),
                transformRequest: [function(e, t) { return o(t, "Content-Type"), a.isFormData(e) || a.isArrayBuffer(e) || a.isBuffer(e) || a.isStream(e) || a.isFile(e) || a.isBlob(e) ? e : a.isArrayBufferView(e) ? e.buffer : a.isURLSearchParams(e) ? (r(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : a.isObject(e) ? (r(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e }],
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
        s.headers = { common: { Accept: "application/json, text/plain, */*" } }, a.forEach(["delete", "get", "head"], function(e) { s.headers[e] = {} }), a.forEach(["post", "put", "patch"], function(e) { s.headers[e] = a.merge(i) }), e.exports = s
    }).call(t, n(61))
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
                var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                n.updateValue = n.updateValue.bind(n);
                var o = _.isUndefined(n.props.defaultValue) ? "" : n.props.defaultValue,
                    i = _.isUndefined(n.props.settings[n.props.property]) ? o : n.props.settings[n.props.property];
                return n.state = { value: i }, n
            }
            return o(t, e), i(t, [{
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
                        a = this.isValid(n) ? "" : "sui-form-field-error",
                        o = "",
                        i = "input";
                    return "textarea" === this.props.type && (i = "textarea"), this.props.label && (o = l.default.createElement("label", { htmlFor: "powerform-field-" + this.props.property, className: "sui-label" }, this.props.label, " ", (this.props.isRequired || this.props.required) && l.default.createElement("span", { className: "sui-error" }, " *"), this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note))), l.default.createElement("div", { className: "sui-form-field " + a }, o, l.default.createElement("div", { className: "sui-insert-variables" }, "input" === i && l.default.createElement("input", { type: "text", value: this.state.value, placeholder: this.props.placeholder, className: "sui-form-control", onChange: function(t) { e.updateValue(t.target.value) } }), "textarea" === i && l.default.createElement("textarea", { value: this.state.value, placeholder: this.props.placeholder, className: "sui-form-control", onChange: function(t) { e.updateValue(t.target.value) }, rows: this.state.rows }), l.default.createElement("select", { ref: function(t) { return e.el = t } }, this.props.children), this.props.isRequired && !this.isValid(n) && l.default.createElement("span", { className: "sui-error-message" }, r), this.props.description && l.default.createElement("span", { className: "sui-description" }, this.props.description)))
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.showModal = function(e, t) { return function(n) { n({ type: "SHOW_MODAL", modalProps: e, modalType: t }) } }, t.hideModal = function() { return function(e) { e({ type: "HIDE_MODAL" }) } }
}, , function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { open: !1 }, n.toggleState = n.toggleState.bind(n), n }
            return o(t, e), i(t, [{ key: "toggleState", value: function() { this.setState({ open: !this.state.open }) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.props.label,
                        n = this.state.open,
                        r = "";
                    n && (r = "sui-accordion-item--open");
                    var a = !(!_.isUndefined(this.props.boxedContent) && "" !== this.props.boxedContent) || this.props.boxedContent,
                        o = l.default.Children.map(this.props.children, function(e) { return e });
                    return l.default.createElement("div", { className: "sui-accordion-item " + r }, l.default.createElement("div", { className: "sui-accordion-item-header", onClick: function() { return e.toggleState() } }, l.default.createElement("div", { className: "sui-accordion-item-title" }, l.default.createElement("span", null, t), l.default.createElement("button", { className: "sui-button-icon sui-accordion-open-indicator", onClick: function() { return e.toggleState() } }, l.default.createElement("i", { className: "sui-icon-chevron-down", "aria-hidden": "true" }), l.default.createElement("span", { class: "sui-screen-reader-text" }, !1 === this.state.open ? "Open" : "Close")))), l.default.createElement("div", { className: "sui-accordion-item-body" }, !1 === a ? n && o : l.default.createElement("div", { className: "sui-box" }, l.default.createElement("div", { className: "sui-box-body" }, n && o), a)))
                }
            }]), t
        }(s.Component));
    t.default = u
}, function(e, t) { e.exports = ReactDOM }, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return o(t, e), i(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        n = _.isUndefined(this.props.fieldId) ? this.props.property : this.props.fieldId,
                        r = !(_.isUndefined(this.props.disabled) || !this.props.disabled),
                        a = "";
                    return this.props.itemClass && "" !== this.props.itemClass && (a = " " + this.props.itemClass), l.default.createElement("label", { htmlFor: "powerform-field-" + n, className: "sui-checkbox" + a }, l.default.createElement("input", { type: "checkbox", id: "powerform-field-" + n, value: "true", checked: t ? "checked" : "", disabled: r, onChange: function(t) { e.updateValue(t.target.checked) } }), l.default.createElement("span", { "aria-hidden": "true" }), this.props.label && l.default.createElement("span", null, this.props.label))
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", function() { return o }), n.d(t, "a", function() { return i });
    var r = n(5),
        a = n.n(r),
        o = a.a.shape({ trySubscribe: a.a.func.isRequired, tryUnsubscribe: a.a.func.isRequired, notifyNestedSubs: a.a.func.isRequired, isSubscribed: a.a.func.isRequired }),
        i = a.a.shape({ subscribe: a.a.func.isRequired, dispatch: a.a.func.isRequired, getState: a.a.func.isRequired })
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function i(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function s() {}

    function l(e, t) {
        var n = {
            run: function(r) {
                try {
                    var a = e(t.getState(), r);
                    (a !== n.props || n.error) && (n.shouldComponentUpdate = !0, n.props = a, n.error = null)
                } catch (e) { n.shouldComponentUpdate = !0, n.error = e }
            }
        };
        return n
    }

    function u(e) {
        var t, n, u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            c = u.getDisplayName,
            p = void 0 === c ? function(e) { return "ConnectAdvanced(" + e + ")" } : c,
            _ = u.methodName,
            E = void 0 === _ ? "connectAdvanced" : _,
            w = u.renderCountProp,
            O = void 0 === w ? void 0 : w,
            j = u.shouldHandleStateChanges,
            P = void 0 === j || j,
            x = u.storeKey,
            N = void 0 === x ? "store" : x,
            k = u.withRef,
            C = void 0 !== k && k,
            S = i(u, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]),
            M = N + "Subscription",
            T = v++,
            A = (t = {}, t[N] = y.a, t[M] = y.b, t),
            F = (n = {}, n[M] = y.b, n);
        return function(t) {
            d()("function" == typeof t, "You must pass a component to the function returned by " + E + ". Instead received " + JSON.stringify(t));
            var n = t.displayName || t.name || "Component",
                i = p(n),
                u = b({}, S, { getDisplayName: p, methodName: E, renderCountProp: O, shouldHandleStateChanges: P, storeKey: N, withRef: C, displayName: i, wrappedComponentName: n, WrappedComponent: t }),
                c = function(n) {
                    function c(e, t) { r(this, c); var o = a(this, n.call(this, e, t)); return o.version = T, o.state = {}, o.renderCount = 0, o.store = e[N] || t[N], o.propsMode = Boolean(e[N]), o.setWrappedInstance = o.setWrappedInstance.bind(o), d()(o.store, 'Could not find "' + N + '" in either the context or props of "' + i + '". Either wrap the root component in a <Provider>, or explicitly pass "' + N + '" as a prop to "' + i + '".'), o.initSelector(), o.initSubscription(), o }
                    return o(c, n), c.prototype.getChildContext = function() { var e, t = this.propsMode ? null : this.subscription; return e = {}, e[M] = t || this.context[M], e }, c.prototype.componentDidMount = function() { P && (this.subscription.trySubscribe(), this.selector.run(this.props), this.selector.shouldComponentUpdate && this.forceUpdate()) }, c.prototype.componentWillReceiveProps = function(e) { this.selector.run(e) }, c.prototype.shouldComponentUpdate = function() { return this.selector.shouldComponentUpdate }, c.prototype.componentWillUnmount = function() { this.subscription && this.subscription.tryUnsubscribe(), this.subscription = null, this.notifyNestedSubs = s, this.store = null, this.selector.run = s, this.selector.shouldComponentUpdate = !1 }, c.prototype.getWrappedInstance = function() { return d()(C, "To access the wrapped instance, you need to specify { withRef: true } in the options argument of the " + E + "() call."), this.wrappedInstance }, c.prototype.setWrappedInstance = function(e) { this.wrappedInstance = e }, c.prototype.initSelector = function() {
                        var t = e(this.store.dispatch, u);
                        this.selector = l(t, this.store), this.selector.run(this.props)
                    }, c.prototype.initSubscription = function() {
                        if (P) {
                            var e = (this.propsMode ? this.props : this.context)[M];
                            this.subscription = new m.a(this.store, e, this.onStateChange.bind(this)), this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
                        }
                    }, c.prototype.onStateChange = function() { this.selector.run(this.props), this.selector.shouldComponentUpdate ? (this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate, this.setState(g)) : this.notifyNestedSubs() }, c.prototype.notifyNestedSubsOnComponentDidUpdate = function() { this.componentDidUpdate = void 0, this.notifyNestedSubs() }, c.prototype.isSubscribed = function() { return Boolean(this.subscription) && this.subscription.isSubscribed() }, c.prototype.addExtraProps = function(e) { if (!(C || O || this.propsMode && this.subscription)) return e; var t = b({}, e); return C && (t.ref = this.setWrappedInstance), O && (t[O] = this.renderCount++), this.propsMode && this.subscription && (t[M] = this.subscription), t }, c.prototype.render = function() { var e = this.selector; if (e.shouldComponentUpdate = !1, e.error) throw e.error; return Object(h.createElement)(t, this.addExtraProps(e.props)) }, c
                }(h.Component);
            return c.WrappedComponent = t, c.displayName = i, c.childContextTypes = F, c.contextTypes = A, c.propTypes = A, f()(c, t)
        }
    }
    t.a = u;
    var c = n(49),
        f = n.n(c),
        p = n(14),
        d = n.n(p),
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
            if (f) {
                var p = c(t);
                p && p !== f && r(e, p, n)
            }
            var d = s(t);
            l && (d = d.concat(l(t)));
            for (var h = 0; h < d.length; ++h) { var m = d[h]; if (!(a[m] || o[m] || n && n[m])) { var y = u(t, m); try { i(e, m, y) } catch (e) {} } }
            return e
        }
        return e
    }
    var a = { childContextTypes: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 },
        o = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 },
        i = Object.defineProperty,
        s = Object.getOwnPropertyNames,
        l = Object.getOwnPropertySymbols,
        u = Object.getOwnPropertyDescriptor,
        c = Object.getPrototypeOf,
        f = c && c(Object);
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
            function r() { return a }
            var a = e(t, n);
            return r.dependsOnOwnProps = !1, r
        }
    }

    function a(e) { return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length }

    function o(e, t) { return function(t, n) { var r = (n.displayName, function(e, t) { return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e) }); return r.dependsOnOwnProps = !0, r.mapToProps = function(t, n) { r.mapToProps = e, r.dependsOnOwnProps = a(e); var o = r(t, n); return "function" == typeof o && (r.mapToProps = o, r.dependsOnOwnProps = a(o), o = r(t, n)), o }, r } }
    t.a = r, t.b = o;
    n(52)
}, function(e, t, n) {
    "use strict";
    n(93), n(34)
}, function(e, t, n) {
    "use strict";
    var r = n(95),
        a = r.a.Symbol;
    t.a = a
}, function(e, t, n) {
    "use strict";
    n.d(t, "b", function() { return r }), n.d(t, "a", function() { return a }), n.d(t, "e", function() { return o }), n.d(t, "c", function() { return i }), n.d(t, "g", function() { return s }), n.d(t, "h", function() { return l }), n.d(t, "f", function() { return u }), n.d(t, "d", function() { return c });
    var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
        a = function(e, t, n) { return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n) },
        o = function(e, t, n) { return e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n) },
        i = function(e, t) { return t(window.confirm(e)) },
        s = function() { var e = window.navigator.userAgent; return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && (window.history && "pushState" in window.history) },
        l = function() { return -1 === window.navigator.userAgent.indexOf("Trident") },
        u = function() { return -1 === window.navigator.userAgent.indexOf("Firefox") },
        c = function(e) { return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS") }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var s = n(0),
        l = n.n(s),
        u = n(5),
        c = n.n(u),
        f = n(14),
        p = n.n(f),
        d = n(20),
        h = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        m = function(e) { return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) },
        y = function(e) {
            function t() {
                var n, r, i;
                a(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = r = o(this, e.call.apply(e, [this].concat(l))), r.handleClick = function(e) {
                    if (r.props.onClick && r.props.onClick(e), !e.defaultPrevented && 0 === e.button && !r.props.target && !m(e)) {
                        e.preventDefault();
                        var t = r.context.router.history,
                            n = r.props,
                            a = n.replace,
                            o = n.to;
                        a ? t.replace(o) : t.push(o)
                    }
                }, i = n, o(r, i)
            }
            return i(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = (e.replace, e.to),
                    n = e.innerRef,
                    a = r(e, ["replace", "to", "innerRef"]);
                p()(this.context.router, "You should not use <Link> outside a <Router>"), p()(void 0 !== t, 'You must specify the "to" property');
                var o = this.context.router.history,
                    i = "string" == typeof t ? Object(d.c)(t, null, null, o.location) : t,
                    s = o.createHref(i);
                return l.a.createElement("a", h({}, a, { onClick: this.handleClick, href: s, ref: n }))
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

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(14),
        u = n.n(l),
        c = n(0),
        f = n.n(c),
        p = n(5),
        d = n.n(p),
        h = n(38),
        m = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        y = function(e) { return 0 === f.a.Children.count(e) },
        b = function(e) {
            function t() {
                var n, o, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = o = a(this, e.call.apply(e, [this].concat(l))), o.state = { match: o.computeMatch(o.props, o.context.router) }, i = n, a(o, i)
            }
            return o(t, e), t.prototype.getChildContext = function() { return { router: m({}, this.context.router, { route: { location: this.props.location || this.context.router.route.location, match: this.state.match } }) } }, t.prototype.computeMatch = function(e, t) {
                var n = e.computedMatch,
                    r = e.location,
                    a = e.path,
                    o = e.strict,
                    i = e.exact,
                    s = e.sensitive;
                if (n) return n;
                u()(t, "You should not use <Route> or withRouter() outside a <Router>");
                var l = t.route,
                    c = (r || l.location).pathname;
                return Object(h.a)(c, { path: a, strict: o, exact: i, sensitive: s }, l.match)
            }, t.prototype.componentWillMount = function() { s()(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"), s()(!(this.props.component && this.props.children && !y(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored"), s()(!(this.props.render && this.props.children && !y(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored") }, t.prototype.componentWillReceiveProps = function(e, t) { s()(!(e.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'), s()(!(!e.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'), this.setState({ match: this.computeMatch(e, t.router) }) }, t.prototype.render = function() {
                var e = this.state.match,
                    t = this.props,
                    n = t.children,
                    r = t.component,
                    a = t.render,
                    o = this.context.router,
                    i = o.history,
                    s = o.route,
                    l = o.staticContext,
                    u = this.props.location || s.location,
                    c = { match: e, location: u, history: i, staticContext: l };
                return r ? e ? f.a.createElement(r, c) : null : a ? e ? a(c) : null : "function" == typeof n ? n(c) : n && !y(n) ? f.a.Children.only(n) : null
            }, t
        }(f.a.Component);
    b.propTypes = { computedMatch: d.a.object, path: d.a.string, exact: d.a.bool, strict: d.a.bool, sensitive: d.a.bool, component: d.a.func, render: d.a.func, children: d.a.oneOfType([d.a.func, d.a.node]), location: d.a.object }, b.contextTypes = { router: d.a.shape({ history: d.a.object.isRequired, route: d.a.object.isRequired, staticContext: d.a.object }) }, b.childContextTypes = { router: d.a.object.isRequired }, t.a = b
}, function(e, t, n) {
    function r(e, t) {
        for (var n, r = [], a = 0, o = 0, i = "", s = t && t.delimiter || "/"; null != (n = v.exec(e));) {
            var c = n[0],
                f = n[1],
                p = n.index;
            if (i += e.slice(o, p), o = p + c.length, f) i += f[1];
            else {
                var d = e[o],
                    h = n[2],
                    m = n[3],
                    y = n[4],
                    b = n[5],
                    g = n[6],
                    _ = n[7];
                i && (r.push(i), i = "");
                var E = null != h && null != d && d !== h,
                    w = "+" === g || "*" === g,
                    O = "?" === g || "*" === g,
                    j = n[2] || s,
                    P = y || b;
                r.push({ name: m || a++, prefix: h || "", delimiter: j, optional: O, repeat: w, partial: E, asterisk: !!_, pattern: P ? u(P) : _ ? ".*" : "[^" + l(j) + "]+?" })
            }
        }
        return o < e.length && (i += e.substr(o)), i && r.push(i), r
    }

    function a(e, t) { return s(r(e, t)) }

    function o(e) { return encodeURI(e).replace(/[\/?#]/g, function(e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) }

    function i(e) { return encodeURI(e).replace(/[?#]/g, function(e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) }

    function s(e) {
        for (var t = new Array(e.length), n = 0; n < e.length; n++) "object" == typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$"));
        return function(n, r) {
            for (var a = "", s = n || {}, l = r || {}, u = l.pretty ? o : encodeURIComponent, c = 0; c < e.length; c++) {
                var f = e[c];
                if ("string" != typeof f) {
                    var p, d = s[f.name];
                    if (null == d) { if (f.optional) { f.partial && (a += f.prefix); continue } throw new TypeError('Expected "' + f.name + '" to be defined') }
                    if (b(d)) {
                        if (!f.repeat) throw new TypeError('Expected "' + f.name + '" to not repeat, but received `' + JSON.stringify(d) + "`");
                        if (0 === d.length) { if (f.optional) continue; throw new TypeError('Expected "' + f.name + '" to not be empty') }
                        for (var h = 0; h < d.length; h++) {
                            if (p = u(d[h]), !t[c].test(p)) throw new TypeError('Expected all "' + f.name + '" to match "' + f.pattern + '", but received `' + JSON.stringify(p) + "`");
                            a += (0 === h ? f.prefix : f.delimiter) + p
                        }
                    } else {
                        if (p = f.asterisk ? i(d) : u(d), !t[c].test(p)) throw new TypeError('Expected "' + f.name + '" to match "' + f.pattern + '", but received "' + p + '"');
                        a += f.prefix + p
                    }
                } else a += f
            }
            return a
        }
    }

    function l(e) { return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1") }

    function u(e) { return e.replace(/([=!:$\/()])/g, "\\$1") }

    function c(e, t) { return e.keys = t, e }

    function f(e) { return e.sensitive ? "" : "i" }

    function p(e, t) {
        var n = e.source.match(/\((?!\?)/g);
        if (n)
            for (var r = 0; r < n.length; r++) t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null });
        return c(e, t)
    }

    function d(e, t, n) { for (var r = [], a = 0; a < e.length; a++) r.push(y(e[a], t, n).source); return c(new RegExp("(?:" + r.join("|") + ")", f(n)), t) }

    function h(e, t, n) { return m(r(e, n), t, n) }

    function m(e, t, n) {
        b(t) || (n = t || n, t = []), n = n || {};
        for (var r = n.strict, a = !1 !== n.end, o = "", i = 0; i < e.length; i++) {
            var s = e[i];
            if ("string" == typeof s) o += l(s);
            else {
                var u = l(s.prefix),
                    p = "(?:" + s.pattern + ")";
                t.push(s), s.repeat && (p += "(?:" + u + p + ")*"), p = s.optional ? s.partial ? u + "(" + p + ")?" : "(?:" + u + "(" + p + "))?" : u + "(" + p + ")", o += p
            }
        }
        var d = l(n.delimiter || "/"),
            h = o.slice(-d.length) === d;
        return r || (o = (h ? o.slice(0, -d.length) : o) + "(?:" + d + "(?=$))?"), o += a ? "$" : r && h ? "" : "(?=" + d + "|$)", c(new RegExp("^" + o, f(n)), t)
    }

    function y(e, t, n) { return b(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? p(e, t) : b(e) ? d(e, t, n) : h(e, t, n) }
    var b = n(116);
    e.exports = y, e.exports.parse = r, e.exports.compile = a, e.exports.tokensToFunction = s, e.exports.tokensToRegExp = m;
    var v = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
}, function(e, t, n) {
    "use strict";
    var r = n(58),
        a = n.n(r),
        o = {},
        i = 0,
        s = function(e) {
            var t = e,
                n = o[t] || (o[t] = {});
            if (n[e]) return n[e];
            var r = a.a.compile(e);
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
        a = new r;
    e.exports = { numberFormat: a.numberFormat.bind(a), translate: a.translate.bind(a), configure: a.configure.bind(a), setLocale: a.setLocale.bind(a), getLocale: a.getLocale.bind(a), getLocaleSlug: a.getLocaleSlug.bind(a), addTranslations: a.addTranslations.bind(a), reRenderTranslations: a.reRenderTranslations.bind(a), registerComponentUpdateHook: a.registerComponentUpdateHook.bind(a), registerTranslateHook: a.registerTranslateHook.bind(a), state: a.state, stateObserver: a.stateObserver, on: a.stateObserver.on.bind(a.stateObserver), off: a.stateObserver.removeListener.bind(a.stateObserver), emit: a.stateObserver.emit.bind(a.stateObserver), localize: n(144)(a), $this: a, I18N: r }
}, function(e, t) {
    function n() { throw new Error("setTimeout has not been defined") }

    function r() { throw new Error("clearTimeout has not been defined") }

    function a(e) { if (c === setTimeout) return setTimeout(e, 0); if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0); try { return c(e, 0) } catch (t) { try { return c.call(null, e, 0) } catch (t) { return c.call(this, e, 0) } } }

    function o(e) { if (f === clearTimeout) return clearTimeout(e); if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e); try { return f(e) } catch (t) { try { return f.call(null, e) } catch (t) { return f.call(this, e) } } }

    function i() { m && d && (m = !1, d.length ? h = d.concat(h) : y = -1, h.length && s()) }

    function s() {
        if (!m) {
            var e = a(i);
            m = !0;
            for (var t = h.length; t;) {
                for (d = h, h = []; ++y < t;) d && d[y].run();
                y = -1, t = h.length
            }
            d = null, m = !1, o(e)
        }
    }

    function l(e, t) { this.fun = e, this.array = t }

    function u() {}
    var c, f, p = e.exports = {};
    ! function() { try { c = "function" == typeof setTimeout ? setTimeout : n } catch (e) { c = n } try { f = "function" == typeof clearTimeout ? clearTimeout : r } catch (e) { f = r } }();
    var d, h = [],
        m = !1,
        y = -1;
    p.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        h.push(new l(e, t)), 1 !== h.length || m || a(s)
    }, l.prototype.run = function() { this.fun.apply(null, this.array) }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = u, p.addListener = u, p.once = u, p.off = u, p.removeListener = u, p.removeAllListeners = u, p.emit = u, p.prependListener = u, p.prependOnceListener = u, p.listeners = function(e) { return [] }, p.binding = function(e) { throw new Error("process.binding is not supported") }, p.cwd = function() { return "/" }, p.chdir = function(e) { throw new Error("process.chdir is not supported") }, p.umask = function() { return 0 }
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

    function a(e) { return "number" == typeof e }

    function o(e) { return "object" == typeof e && null !== e }

    function i(e) { return void 0 === e }
    e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) { if (!a(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number"); return this._maxListeners = e, this }, n.prototype.emit = function(e) {
        var t, n, a, s, l, u;
        if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) { if ((t = arguments[1]) instanceof Error) throw t; var c = new Error('Uncaught, unspecified "error" event. (' + t + ")"); throw c.context = t, c }
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
            } else if (o(n))
                for (s = Array.prototype.slice.call(arguments, 1), u = n.slice(), a = u.length, l = 0; l < a; l++) u[l].apply(this, s);
        return !0
    }, n.prototype.addListener = function(e, t) { var a; if (!r(t)) throw TypeError("listener must be a function"); return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned && (a = i(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[e].length > a && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
        function n() { this.removeListener(e, n), a || (a = !0, t.apply(this, arguments)) }
        if (!r(t)) throw TypeError("listener must be a function");
        var a = !1;
        return n.listener = t, this.on(e, n), this
    }, n.prototype.removeListener = function(e, t) {
        var n, a, i, s;
        if (!r(t)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[e]) return this;
        if (n = this._events[e], i = n.length, a = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
        else if (o(n)) {
            for (s = i; s-- > 0;)
                if (n[s] === t || n[s].listener && n[s].listener === t) { a = s; break }
            if (a < 0) return this;
            1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(a, 1), this._events.removeListener && this.emit("removeListener", e, t)
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
    var a = function() {};
    a.thatReturns = r, a.thatReturnsFalse = r(!1), a.thatReturnsTrue = r(!0), a.thatReturnsNull = r(null), a.thatReturnsThis = function() { return this }, a.thatReturnsArgument = function(e) { return e }, e.exports = a
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, o, i, s, l) {
        if (a(t), !e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [n, r, o, i, s, l],
                    f = 0;
                u = new Error(t.replace(/%s/g, function() { return c[f++] })), u.name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    }
    var a = function(e) {};
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

    function a(e, t) {
        var n = A(e) || d(e) ? r(e.length, String) : [],
            a = n.length,
            o = !!a;
        for (var i in e) !t && !N.call(e, i) || o && ("length" == i || u(i, a)) || n.push(i);
        return n
    }

    function o(e, t, n) {
        var r = e[t];
        N.call(e, t) && p(r, n) && (void 0 !== n || t in e) || (e[t] = n)
    }

    function i(e) { if (!f(e)) return S(e); var t = []; for (var n in Object(e)) N.call(e, n) && "constructor" != n && t.push(n); return t }

    function s(e, t) {
        return t = M(void 0 === t ? e.length - 1 : t, 0),
            function() {
                for (var r = arguments, a = -1, o = M(r.length - t, 0), i = Array(o); ++a < o;) i[a] = r[t + a];
                a = -1;
                for (var s = Array(t + 1); ++a < t;) s[a] = r[a];
                return s[t] = i, n(e, this, s)
            }
    }

    function l(e, t, n, r) {
        n || (n = {});
        for (var a = -1, i = t.length; ++a < i;) {
            var s = t[a],
                l = r ? r(n[s], e[s], s, n, e) : void 0;
            o(n, s, void 0 === l ? e[s] : l)
        }
        return n
    }

    function u(e, t) { return !!(t = null == t ? E : t) && ("number" == typeof e || P.test(e)) && e > -1 && e % 1 == 0 && e < t }

    function c(e, t, n) { if (!v(n)) return !1; var r = typeof t; return !!("number" == r ? h(n) && u(t, n.length) : "string" == r && t in n) && p(n[t], e) }

    function f(e) { var t = e && e.constructor; return e === ("function" == typeof t && t.prototype || x) }

    function p(e, t) { return e === t || e !== e && t !== t }

    function d(e) { return m(e) && N.call(e, "callee") && (!C.call(e, "callee") || k.call(e) == w) }

    function h(e) { return null != e && b(e.length) && !y(e) }

    function m(e) { return g(e) && h(e) }

    function y(e) { var t = v(e) ? k.call(e) : ""; return t == O || t == j }

    function b(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= E }

    function v(e) { var t = typeof e; return !!e && ("object" == t || "function" == t) }

    function g(e) { return !!e && "object" == typeof e }

    function _(e) { return h(e) ? a(e) : i(e) }
    var E = 9007199254740991,
        w = "[object Arguments]",
        O = "[object Function]",
        j = "[object GeneratorFunction]",
        P = /^(?:0|[1-9]\d*)$/,
        x = Object.prototype,
        N = x.hasOwnProperty,
        k = x.toString,
        C = x.propertyIsEnumerable,
        S = function(e, t) { return function(n) { return e(t(n)) } }(Object.keys, Object),
        M = Math.max,
        T = !C.call({ valueOf: 1 }, "valueOf"),
        A = Array.isArray,
        F = function(e) {
            return s(function(t, n) {
                var r = -1,
                    a = n.length,
                    o = a > 1 ? n[a - 1] : void 0,
                    i = a > 2 ? n[2] : void 0;
                for (o = e.length > 3 && "function" == typeof o ? (a--, o) : void 0, i && c(n[0], n[1], i) && (o = a < 3 ? void 0 : o, a = 1), t = Object(t); ++r < a;) {
                    var s = n[r];
                    s && e(t, s, r, o)
                }
                return t
            })
        }(function(e, t) { if (T || f(t) || h(t)) return void l(t, _(t), e); for (var n in t) N.call(t, n) && o(e, n, t[n]) });
    e.exports = F
}, function(e, t, n) { e.exports = n(150) }, function(e, t, n) {
    "use strict";
    e.exports = function(e, t) { return function() { for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r]; return e.apply(t, n) } }
}, function(e, t, n) {
    "use strict";
    var r = n(11),
        a = n(154),
        o = n(156),
        i = n(157),
        s = n(158),
        l = n(71),
        u = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || n(159);
    e.exports = function(e) {
        return new Promise(function(t, c) {
            var f = e.data,
                p = e.headers;
            r.isFormData(f) && delete p["Content-Type"];
            var d = new XMLHttpRequest,
                h = "onreadystatechange",
                m = !1;
            if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in d || s(e.url) || (d = new window.XDomainRequest, h = "onload", m = !0, d.onprogress = function() {}, d.ontimeout = function() {}), e.auth) {
                var y = e.auth.username || "",
                    b = e.auth.password || "";
                p.Authorization = "Basic " + u(y + ":" + b)
            }
            if (d.open(e.method.toUpperCase(), o(e.url, e.params, e.paramsSerializer), !0), d.timeout = e.timeout, d[h] = function() {
                    if (d && (4 === d.readyState || m) && (0 !== d.status || d.responseURL && 0 === d.responseURL.indexOf("file:"))) {
                        var n = "getAllResponseHeaders" in d ? i(d.getAllResponseHeaders()) : null,
                            r = e.responseType && "text" !== e.responseType ? d.response : d.responseText,
                            o = { data: r, status: 1223 === d.status ? 204 : d.status, statusText: 1223 === d.status ? "No Content" : d.statusText, headers: n, config: e, request: d };
                        a(t, c, o), d = null
                    }
                }, d.onerror = function() { c(l("Network Error", e, null, d)), d = null }, d.ontimeout = function() { c(l("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", d)), d = null }, r.isStandardBrowserEnv()) {
                var v = n(160),
                    g = (e.withCredentials || s(e.url)) && e.xsrfCookieName ? v.read(e.xsrfCookieName) : void 0;
                g && (p[e.xsrfHeaderName] = g)
            }
            if ("setRequestHeader" in d && r.forEach(p, function(e, t) { void 0 === f && "content-type" === t.toLowerCase() ? delete p[t] : d.setRequestHeader(t, e) }), e.withCredentials && (d.withCredentials = !0), e.responseType) try { d.responseType = e.responseType } catch (t) { if ("json" !== e.responseType) throw t }
            "function" == typeof e.onDownloadProgress && d.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && d.upload && d.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function(e) { d && (d.abort(), c(e), d = null) }), void 0 === f && (f = null), d.send(f)
        })
    }
}, function(e, t, n) {
    "use strict";
    var r = n(155);
    e.exports = function(e, t, n, a, o) { var i = new Error(e); return r(i, t, n, a, o) }
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
        a = n(169),
        o = n(76);
    e.exports = { formats: o, parse: a, stringify: r }
}, function(e, t, n) {
    "use strict";
    var r = Object.prototype.hasOwnProperty,
        a = function() { for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase()); return e }(),
        o = function(e) {
            for (var t; e.length;) {
                var n = e.pop();
                if (t = n.obj[n.prop], Array.isArray(t)) {
                    for (var r = [], a = 0; a < t.length; ++a) void 0 !== t[a] && r.push(t[a]);
                    n.obj[n.prop] = r
                }
            }
            return t
        },
        i = function(e, t) { for (var n = t && t.plainObjects ? Object.create(null) : {}, r = 0; r < e.length; ++r) void 0 !== e[r] && (n[r] = e[r]); return n },
        s = function e(t, n, a) {
            if (!n) return t;
            if ("object" != typeof n) {
                if (Array.isArray(t)) t.push(n);
                else {
                    if ("object" != typeof t) return [t, n];
                    (a.plainObjects || a.allowPrototypes || !r.call(Object.prototype, n)) && (t[n] = !0)
                }
                return t
            }
            if ("object" != typeof t) return [t].concat(n);
            var o = t;
            return Array.isArray(t) && !Array.isArray(n) && (o = i(t, a)), Array.isArray(t) && Array.isArray(n) ? (n.forEach(function(n, o) { r.call(t, o) ? t[o] && "object" == typeof t[o] ? t[o] = e(t[o], n, a) : t.push(n) : t[o] = n }), t) : Object.keys(n).reduce(function(t, o) { var i = n[o]; return r.call(t, o) ? t[o] = e(t[o], i, a) : t[o] = i, t }, o)
        },
        l = function(e, t) { return Object.keys(t).reduce(function(e, n) { return e[n] = t[n], e }, e) },
        u = function(e) { try { return decodeURIComponent(e.replace(/\+/g, " ")) } catch (t) { return e } },
        c = function(e) {
            if (0 === e.length) return e;
            for (var t = "string" == typeof e ? e : String(e), n = "", r = 0; r < t.length; ++r) {
                var o = t.charCodeAt(r);
                45 === o || 46 === o || 95 === o || 126 === o || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 ? n += t.charAt(r) : o < 128 ? n += a[o] : o < 2048 ? n += a[192 | o >> 6] + a[128 | 63 & o] : o < 55296 || o >= 57344 ? n += a[224 | o >> 12] + a[128 | o >> 6 & 63] + a[128 | 63 & o] : (r += 1, o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(r)), n += a[240 | o >> 18] + a[128 | o >> 12 & 63] + a[128 | o >> 6 & 63] + a[128 | 63 & o])
            }
            return n
        },
        f = function(e) {
            for (var t = [{ obj: { o: e }, prop: "o" }], n = [], r = 0; r < t.length; ++r)
                for (var a = t[r], i = a.obj[a.prop], s = Object.keys(i), l = 0; l < s.length; ++l) {
                    var u = s[l],
                        c = i[u];
                    "object" == typeof c && null !== c && -1 === n.indexOf(c) && (t.push({ obj: i, prop: u }), n.push(c))
                }
            return o(t)
        },
        p = function(e) { return "[object RegExp]" === Object.prototype.toString.call(e) },
        d = function(e) { return null !== e && void 0 !== e && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e)) };
    e.exports = { arrayToObject: i, assign: l, compact: f, decode: u, encode: c, isBuffer: d, isRegExp: p, merge: s }
}, function(e, t, n) {
    "use strict";
    var r = String.prototype.replace,
        a = /%20/g;
    e.exports = { default: "RFC3986", formatters: { RFC1738: function(e) { return r.call(e, a, "+") }, RFC3986: function(e) { return e } }, RFC1738: "RFC1738", RFC3986: "RFC3986" }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "clearImage", value: function() { "function" == typeof this.props.updateProperty ? (this.props.updateProperty(this.props.property, ""), this.props.updateProperty(this.props.property + "_filename", "")) : (this.props.actions.settingsActions.updateSetting(this.props.property, ""), this.props.actions.settingsActions.updateSetting(this.props.property + "_filename", "")) } }, {
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
                    var a = "";
                    this.props.description && (a = l.default.createElement("span", { className: "sui-description" }, this.props.description));
                    var o = "";
                    if ("image" === this.props.type) {
                        var i = "";
                        e && (i = "url(" + e + ")"), o = l.default.createElement("div", { className: "sui-upload-image", "aria-hidden": "true" }, l.default.createElement("div", { className: "sui-image-mask" }), l.default.createElement("div", { role: "button", onClick: this.openMedia.bind(this), className: "sui-image-preview", style: { backgroundImage: i } }))
                    }
                    var s = this.props.fieldClass ? " " + this.props.fieldClass : "";
                    return l.default.createElement("div", { className: "sui-form-field" + s }, r, l.default.createElement("div", { className: "sui-upload " + n }, l.default.createElement("input", { type: "file", value: "", readOnly: "readonly" }), o, l.default.createElement("button", { className: "sui-upload-button", onClick: this.openMedia.bind(this) }, l.default.createElement("i", { className: "sui-icon-upload-cloud", "aria-hidden": "true" }), "image" === this.props.type ? "" + (0, u.translate)("Upload image") : "" + (0, u.translate)("Upload file")), l.default.createElement("div", { className: "sui-upload-file" }, l.default.createElement("span", null, t), l.default.createElement("button", { className: "sui-upload-button--remove", onClick: this.clearImage.bind(this) }, l.default.createElement("i", { className: "sui-icon-close", "aria-hidden": "true" }), l.default.createElement("span", { className: "sui-screen-reader-text" }, "image" === this.props.type ? "" + (0, u.translate)("Remove uploaded image") : "" + (0, u.translate)("Remove uploaded file"))))), a)
                }
            }]), t
        }(s.Component);
    t.default = c
}, , , , , function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.updateQuestions = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_QUESTIONS", questions: e }) } }, t.updateQuestion = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_QUESTION", question: e }) } }, t.updateResults = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_RESULTS", results: e }) } }, t.updateResult = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_RESULT", result: e }) } }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function i() {
        var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "store",
            n = arguments[1],
            i = n || t + "Subscription",
            l = function(e) {
                function n(o, i) { r(this, n); var s = a(this, e.call(this, o, i)); return s[t] = o.store, s }
                return o(n, e), n.prototype.getChildContext = function() { var e; return e = {}, e[t] = this[t], e[i] = null, e }, n.prototype.render = function() { return s.Children.only(this.props.children) }, n
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
    var a = n(85);
    e.exports = function() {
        function e(e, t, n, r, o, i) { if (i !== a) { var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"); throw s.name = "Invariant Violation", s } }

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

    function a() {
        var e = [],
            t = [];
        return {
            clear: function() { t = o, e = o },
            notify: function() { for (var n = e = t, r = 0; r < n.length; r++) n[r]() },
            get: function() { return t },
            subscribe: function(n) {
                var r = !0;
                return t === e && (t = e.slice()), t.push(n),
                    function() { r && e !== o && (r = !1, t === e && (t = e.slice()), t.splice(t.indexOf(n), 1)) }
            }
        }
    }
    n.d(t, "a", function() { return s });
    var o = null,
        i = { notify: function() {} },
        s = function() {
            function e(t, n, a) { r(this, e), this.store = t, this.parentSub = n, this.onStateChange = a, this.unsubscribe = null, this.listeners = i }
            return e.prototype.addNestedSub = function(e) { return this.trySubscribe(), this.listeners.subscribe(e) }, e.prototype.notifyNestedSubs = function() { this.listeners.notify() }, e.prototype.isSubscribed = function() { return Boolean(this.unsubscribe) }, e.prototype.trySubscribe = function() { this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange), this.listeners = a()) }, e.prototype.tryUnsubscribe = function() { this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null, this.listeners.clear(), this.listeners = i) }, e
        }()
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function a(e, t, n) { for (var r = t.length - 1; r >= 0; r--) { var a = t[r](e); if (a) return a } return function(t, r) { throw new Error("Invalid value of type " + typeof e + " for " + n + " argument when connecting component " + r.wrappedComponentName + ".") } }

    function o(e, t) { return e === t }
    var i = n(48),
        s = n(88),
        l = n(89),
        u = n(102),
        c = n(103),
        f = n(104),
        p = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e };
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
            _ = void 0 === g ? f.a : g;
        return function(e, t, i) {
            var l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                u = l.pure,
                c = void 0 === u || u,
                f = l.areStatesEqual,
                d = void 0 === f ? o : f,
                m = l.areOwnPropsEqual,
                b = void 0 === m ? s.a : m,
                g = l.areStatePropsEqual,
                E = void 0 === g ? s.a : g,
                w = l.areMergedPropsEqual,
                O = void 0 === w ? s.a : w,
                j = r(l, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]),
                P = a(e, h, "mapStateToProps"),
                x = a(t, y, "mapDispatchToProps"),
                N = a(i, v, "mergeProps");
            return n(_, p({ methodName: "connect", getDisplayName: function(e) { return "Connect(" + e + ")" }, shouldHandleStateChanges: Boolean(e), initMapStateToProps: P, initMapDispatchToProps: x, initMergeProps: N, pure: c, areStatesEqual: d, areOwnPropsEqual: b, areStatePropsEqual: E, areMergedPropsEqual: O }, j))
        }
    }()
}, function(e, t, n) {
    "use strict";

    function r(e, t) { return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e !== e && t !== t }

    function a(e, t) {
        if (r(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var n = Object.keys(e),
            a = Object.keys(t);
        if (n.length !== a.length) return !1;
        for (var i = 0; i < n.length; i++)
            if (!o.call(t, n[i]) || !r(e[n[i]], t[n[i]])) return !1;
        return !0
    }
    t.a = a;
    var o = Object.prototype.hasOwnProperty
}, function(e, t, n) {
    "use strict";

    function r(e) { return "function" == typeof e ? Object(s.b)(e, "mapDispatchToProps") : void 0 }

    function a(e) { return e ? void 0 : Object(s.a)(function(e) { return { dispatch: e } }) }

    function o(e) { return e && "object" == typeof e ? Object(s.a)(function(t) { return Object(i.bindActionCreators)(e, t) }) : void 0 }
    var i = n(8),
        s = n(51);
    t.a = [r, a, o]
}, function(e, t, n) {
    "use strict";
    (function(e, r) {
        var a, o = n(92);
        a = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : r;
        var i = Object(o.a)(a);
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

    function r(e) { if (!Object(i.a)(e) || Object(a.a)(e) != s) return !1; var t = Object(o.a)(e); if (null === t) return !0; var n = f.call(t, "constructor") && t.constructor; return "function" == typeof n && n instanceof n && c.call(n) == p }
    var a = n(94),
        o = n(99),
        i = n(101),
        s = "[object Object]",
        l = Function.prototype,
        u = Object.prototype,
        c = l.toString,
        f = u.hasOwnProperty,
        p = c.call(Object);
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return null == e ? void 0 === e ? l : s : u && u in Object(e) ? Object(o.a)(e) : Object(i.a)(e) }
    var a = n(53),
        o = n(97),
        i = n(98),
        s = "[object Null]",
        l = "[object Undefined]",
        u = a.a ? a.a.toStringTag : void 0;
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(96),
        a = "object" == typeof self && self && self.Object === Object && self,
        o = r.a || a || Function("return this")();
    t.a = o
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
        var a = s.call(e);
        return r && (t ? e[l] = n : delete e[l]), a
    }
    var a = n(53),
        o = Object.prototype,
        i = o.hasOwnProperty,
        s = o.toString,
        l = a.a ? a.a.toStringTag : void 0;
    t.a = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return o.call(e) }
    var a = Object.prototype,
        o = a.toString;
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(100),
        a = Object(r.a)(Object.getPrototypeOf, Object);
    t.a = a
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

    function r(e) { return "function" == typeof e ? Object(o.b)(e, "mapStateToProps") : void 0 }

    function a(e) { return e ? void 0 : Object(o.a)(function() { return {} }) }
    var o = n(51);
    t.a = [r, a]
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) { return s({}, n, e, t) }

    function a(e) {
        return function(t, n) {
            var r = (n.displayName, n.pure),
                a = n.areMergedPropsEqual,
                o = !1,
                i = void 0;
            return function(t, n, s) { var l = e(t, n, s); return o ? r && a(l, i) || (i = l) : (o = !0, i = l), i }
        }
    }

    function o(e) { return "function" == typeof e ? a(e) : void 0 }

    function i(e) { return e ? void 0 : function() { return r } }
    var s = (n(52), Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e });
    t.a = [o, i]
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }

    function a(e, t, n, r) { return function(a, o) { return n(e(a, o), t(r, o), o) } }

    function o(e, t, n, r, a) {
        function o(a, o) { return h = a, m = o, y = e(h, m), b = t(r, m), v = n(y, b, m), d = !0, v }

        function i() { return y = e(h, m), t.dependsOnOwnProps && (b = t(r, m)), v = n(y, b, m) }

        function s() { return e.dependsOnOwnProps && (y = e(h, m)), t.dependsOnOwnProps && (b = t(r, m)), v = n(y, b, m) }

        function l() {
            var t = e(h, m),
                r = !p(t, y);
            return y = t, r && (v = n(y, b, m)), v
        }

        function u(e, t) {
            var n = !f(t, m),
                r = !c(e, h);
            return h = e, m = t, n && r ? i() : n ? s() : r ? l() : v
        }
        var c = a.areStatesEqual,
            f = a.areOwnPropsEqual,
            p = a.areStatePropsEqual,
            d = !1,
            h = void 0,
            m = void 0,
            y = void 0,
            b = void 0,
            v = void 0;
        return function(e, t) { return d ? u(e, t) : o(e, t) }
    }

    function i(e, t) {
        var n = t.initMapStateToProps,
            i = t.initMapDispatchToProps,
            s = t.initMergeProps,
            l = r(t, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]),
            u = n(e, l),
            c = i(e, l),
            f = s(e, l);
        return (l.pure ? o : a)(u, c, f, e, l)
    }
    t.a = i;
    n(105)
}, function(e, t, n) {
    "use strict";
    n(34)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(0),
        u = n.n(l),
        c = n(5),
        f = n.n(c),
        p = n(20),
        d = n(36),
        h = function(e) {
            function t() {
                var n, o, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = o = a(this, e.call.apply(e, [this].concat(l))), o.history = Object(p.a)(o.props), i = n, a(o, i)
            }
            return o(t, e), t.prototype.componentWillMount = function() { s()(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { BrowserRouter as Router }`.") }, t.prototype.render = function() { return u.a.createElement(d.a, { history: this.history, children: this.props.children }) }, t
        }(u.a.Component);
    h.propTypes = { basename: f.a.string, forceRefresh: f.a.bool, getUserConfirmation: f.a.func, keyLength: f.a.number, children: f.a.node }, t.a = h
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        a = n.n(r),
        o = n(14),
        i = n.n(o),
        s = n(29),
        l = n(25),
        u = n(35),
        c = n(54),
        f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        p = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        d = function() { try { return window.history.state || {} } catch (e) { return {} } },
        h = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            i()(c.b, "Browser history needs a DOM");
            var t = window.history,
                n = Object(c.g)(),
                r = !Object(c.h)(),
                o = e.forceRefresh,
                h = void 0 !== o && o,
                m = e.getUserConfirmation,
                y = void 0 === m ? c.c : m,
                b = e.keyLength,
                v = void 0 === b ? 6 : b,
                g = e.basename ? Object(l.g)(Object(l.a)(e.basename)) : "",
                _ = function(e) {
                    var t = e || {},
                        n = t.key,
                        r = t.state,
                        o = window.location,
                        i = o.pathname,
                        u = o.search,
                        c = o.hash,
                        f = i + u + c;
                    return a()(!g || Object(l.c)(f, g), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + f + '" to begin with "' + g + '".'), g && (f = Object(l.e)(f, g)), Object(s.a)(f, r, n)
                },
                E = function() { return Math.random().toString(36).substr(2, v) },
                w = Object(u.a)(),
                O = function(e) { p(V, e), V.length = t.length, w.notifyListeners(V.location, V.action) },
                j = function(e) { Object(c.d)(e) || N(_(e.state)) },
                P = function() { N(_(d())) },
                x = !1,
                N = function(e) {
                    if (x) x = !1, O();
                    else { w.confirmTransitionTo(e, "POP", y, function(t) { t ? O({ action: "POP", location: e }) : k(e) }) }
                },
                k = function(e) {
                    var t = V.location,
                        n = S.indexOf(t.key); - 1 === n && (n = 0);
                    var r = S.indexOf(e.key); - 1 === r && (r = 0);
                    var a = n - r;
                    a && (x = !0, F(a))
                },
                C = _(d()),
                S = [C.key],
                M = function(e) { return g + Object(l.b)(e) },
                T = function(e, r) {
                    a()(!("object" === (void 0 === e ? "undefined" : f(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
                    var o = Object(s.a)(e, r, E(), V.location);
                    w.confirmTransitionTo(o, "PUSH", y, function(e) {
                        if (e) {
                            var r = M(o),
                                i = o.key,
                                s = o.state;
                            if (n)
                                if (t.pushState({ key: i, state: s }, null, r), h) window.location.href = r;
                                else {
                                    var l = S.indexOf(V.location.key),
                                        u = S.slice(0, -1 === l ? 0 : l + 1);
                                    u.push(o.key), S = u, O({ action: "PUSH", location: o })
                                }
                            else a()(void 0 === s, "Browser history cannot push state in browsers that do not support HTML5 history"), window.location.href = r
                        }
                    })
                },
                A = function(e, r) {
                    a()(!("object" === (void 0 === e ? "undefined" : f(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
                    var o = Object(s.a)(e, r, E(), V.location);
                    w.confirmTransitionTo(o, "REPLACE", y, function(e) {
                        if (e) {
                            var r = M(o),
                                i = o.key,
                                s = o.state;
                            if (n)
                                if (t.replaceState({ key: i, state: s }, null, r), h) window.location.replace(r);
                                else { var l = S.indexOf(V.location.key); - 1 !== l && (S[l] = o.key), O({ action: "REPLACE", location: o }) }
                            else a()(void 0 === s, "Browser history cannot replace state in browsers that do not support HTML5 history"), window.location.replace(r)
                        }
                    })
                },
                F = function(e) { t.go(e) },
                R = function() { return F(-1) },
                D = function() { return F(1) },
                q = 0,
                U = function(e) { q += e, 1 === q ? (Object(c.a)(window, "popstate", j), r && Object(c.a)(window, "hashchange", P)) : 0 === q && (Object(c.e)(window, "popstate", j), r && Object(c.e)(window, "hashchange", P)) },
                I = !1,
                z = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = w.setPrompt(e);
                    return I || (U(1), I = !0),
                        function() { return I && (I = !1, U(-1)), t() }
                },
                L = function(e) {
                    var t = w.appendListener(e);
                    return U(1),
                        function() { U(-1), t() }
                },
                V = { length: t.length, action: "POP", location: C, createHref: M, push: T, replace: A, go: F, goBack: R, goForward: D, block: z, listen: L };
            return V
        };
    t.a = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return "/" === e.charAt(0) }

    function a(e, t) {
        for (var n = t, r = n + 1, a = e.length; r < a; n += 1, r += 1) e[n] = e[r];
        e.pop()
    }

    function o(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = e && e.split("/") || [],
            o = t && t.split("/") || [],
            i = e && r(e),
            s = t && r(t),
            l = i || s;
        if (e && r(e) ? o = n : n.length && (o.pop(), o = o.concat(n)), !o.length) return "/";
        var u = void 0;
        if (o.length) {
            var c = o[o.length - 1];
            u = "." === c || ".." === c || "" === c
        } else u = !1;
        for (var f = 0, p = o.length; p >= 0; p--) { var d = o[p]; "." === d ? a(o, p) : ".." === d ? (a(o, p), f++) : f && (a(o, p), f--) }
        if (!l)
            for (; f--; f) o.unshift("..");
        !l || "" === o[0] || o[0] && r(o[0]) || o.unshift("");
        var h = o.join("/");
        return u && "/" !== h.substr(-1) && (h += "/"), h
    }
    t.a = o
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (e === t) return !0;
        if (null == e || null == t) return !1;
        if (Array.isArray(e)) return Array.isArray(t) && e.length === t.length && e.every(function(e, n) { return r(e, t[n]) });
        var n = void 0 === e ? "undefined" : a(e);
        if (n !== (void 0 === t ? "undefined" : a(t))) return !1;
        if ("object" === n) {
            var o = e.valueOf(),
                i = t.valueOf();
            if (o !== e || i !== t) return r(o, i);
            var s = Object.keys(e),
                l = Object.keys(t);
            return s.length === l.length && s.every(function(n) { return r(e[n], t[n]) })
        }
        return !1
    }
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
    t.a = r
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        a = n.n(r),
        o = n(14),
        i = n.n(o),
        s = n(29),
        l = n(25),
        u = n(35),
        c = n(54),
        f = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        p = { hashbang: { encodePath: function(e) { return "!" === e.charAt(0) ? e : "!/" + Object(l.f)(e) }, decodePath: function(e) { return "!" === e.charAt(0) ? e.substr(1) : e } }, noslash: { encodePath: l.f, decodePath: l.a }, slash: { encodePath: l.a, decodePath: l.a } },
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
                o = void 0 === r ? c.c : r,
                y = e.hashType,
                b = void 0 === y ? "slash" : y,
                v = e.basename ? Object(l.g)(Object(l.a)(e.basename)) : "",
                g = p[b],
                _ = g.encodePath,
                E = g.decodePath,
                w = function() { var e = E(d()); return a()(!v || Object(l.c)(e, v), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + e + '" to begin with "' + v + '".'), v && (e = Object(l.e)(e, v)), Object(s.a)(e) },
                O = Object(u.a)(),
                j = function(e) { f($, e), $.length = t.length, O.notifyListeners($.location, $.action) },
                P = !1,
                x = null,
                N = function() {
                    var e = d(),
                        t = _(e);
                    if (e !== t) m(t);
                    else {
                        var n = w(),
                            r = $.location;
                        if (!P && Object(s.b)(r, n)) return;
                        if (x === Object(l.b)(n)) return;
                        x = null, k(n)
                    }
                },
                k = function(e) {
                    if (P) P = !1, j();
                    else { O.confirmTransitionTo(e, "POP", o, function(t) { t ? j({ action: "POP", location: e }) : C(e) }) }
                },
                C = function(e) {
                    var t = $.location,
                        n = A.lastIndexOf(Object(l.b)(t)); - 1 === n && (n = 0);
                    var r = A.lastIndexOf(Object(l.b)(e)); - 1 === r && (r = 0);
                    var a = n - r;
                    a && (P = !0, q(a))
                },
                S = d(),
                M = _(S);
            S !== M && m(M);
            var T = w(),
                A = [Object(l.b)(T)],
                F = function(e) { return "#" + _(v + Object(l.b)(e)) },
                R = function(e, t) {
                    a()(void 0 === t, "Hash history cannot push state; it is ignored");
                    var n = Object(s.a)(e, void 0, void 0, $.location);
                    O.confirmTransitionTo(n, "PUSH", o, function(e) {
                        if (e) {
                            var t = Object(l.b)(n),
                                r = _(v + t);
                            if (d() !== r) {
                                x = t, h(r);
                                var o = A.lastIndexOf(Object(l.b)($.location)),
                                    i = A.slice(0, -1 === o ? 0 : o + 1);
                                i.push(t), A = i, j({ action: "PUSH", location: n })
                            } else a()(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), j()
                        }
                    })
                },
                D = function(e, t) {
                    a()(void 0 === t, "Hash history cannot replace state; it is ignored");
                    var n = Object(s.a)(e, void 0, void 0, $.location);
                    O.confirmTransitionTo(n, "REPLACE", o, function(e) {
                        if (e) {
                            var t = Object(l.b)(n),
                                r = _(v + t);
                            d() !== r && (x = t, m(r));
                            var a = A.indexOf(Object(l.b)($.location)); - 1 !== a && (A[a] = t), j({ action: "REPLACE", location: n })
                        }
                    })
                },
                q = function(e) { a()(n, "Hash history go(n) causes a full page reload in this browser"), t.go(e) },
                U = function() { return q(-1) },
                I = function() { return q(1) },
                z = 0,
                L = function(e) { z += e, 1 === z ? Object(c.a)(window, "hashchange", N) : 0 === z && Object(c.e)(window, "hashchange", N) },
                V = !1,
                B = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = O.setPrompt(e);
                    return V || (L(1), V = !0),
                        function() { return V && (V = !1, L(-1)), t() }
                },
                Q = function(e) {
                    var t = O.appendListener(e);
                    return L(1),
                        function() { L(-1), t() }
                },
                $ = { length: t.length, action: "POP", location: T, createHref: F, push: R, replace: D, go: q, goBack: U, goForward: I, block: B, listen: Q };
            return $
        };
    t.a = y
}, function(e, t, n) {
    "use strict";
    var r = n(28),
        a = n.n(r),
        o = n(25),
        i = n(29),
        s = n(35),
        l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        u = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        c = function(e, t, n) { return Math.min(Math.max(e, t), n) },
        f = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.getUserConfirmation,
                n = e.initialEntries,
                r = void 0 === n ? ["/"] : n,
                f = e.initialIndex,
                p = void 0 === f ? 0 : f,
                d = e.keyLength,
                h = void 0 === d ? 6 : d,
                m = Object(s.a)(),
                y = function(e) { u(C, e), C.length = C.entries.length, m.notifyListeners(C.location, C.action) },
                b = function() { return Math.random().toString(36).substr(2, h) },
                v = c(p, 0, r.length - 1),
                g = r.map(function(e) { return "string" == typeof e ? Object(i.a)(e, void 0, b()) : Object(i.a)(e, void 0, e.key || b()) }),
                _ = o.b,
                E = function(e, n) {
                    a()(!("object" === (void 0 === e ? "undefined" : l(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
                    var r = Object(i.a)(e, n, b(), C.location);
                    m.confirmTransitionTo(r, "PUSH", t, function(e) {
                        if (e) {
                            var t = C.index,
                                n = t + 1,
                                a = C.entries.slice(0);
                            a.length > n ? a.splice(n, a.length - n, r) : a.push(r), y({ action: "PUSH", location: r, index: n, entries: a })
                        }
                    })
                },
                w = function(e, n) {
                    a()(!("object" === (void 0 === e ? "undefined" : l(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
                    var r = Object(i.a)(e, n, b(), C.location);
                    m.confirmTransitionTo(r, "REPLACE", t, function(e) { e && (C.entries[C.index] = r, y({ action: "REPLACE", location: r })) })
                },
                O = function(e) {
                    var n = c(C.index + e, 0, C.entries.length - 1),
                        r = C.entries[n];
                    m.confirmTransitionTo(r, "POP", t, function(e) { e ? y({ action: "POP", location: r, index: n }) : y() })
                },
                j = function() { return O(-1) },
                P = function() { return O(1) },
                x = function(e) { var t = C.index + e; return t >= 0 && t < C.entries.length },
                N = function() { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; return m.setPrompt(e) },
                k = function(e) { return m.appendListener(e) },
                C = { length: g.length, action: "POP", location: g[v], index: v, entries: g, createHref: _, push: E, replace: w, go: O, goBack: j, goForward: P, canGo: x, block: N, listen: k };
            return C
        };
    t.a = f
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(0),
        u = n.n(l),
        c = n(5),
        f = n.n(c),
        p = n(20),
        d = n(36),
        h = function(e) {
            function t() {
                var n, o, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = o = a(this, e.call.apply(e, [this].concat(l))), o.history = Object(p.b)(o.props), i = n, a(o, i)
            }
            return o(t, e), t.prototype.componentWillMount = function() { s()(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { HashRouter as Router }`.") }, t.prototype.render = function() { return u.a.createElement(d.a, { history: this.history, children: this.props.children }) }, t
        }(u.a.Component);
    h.propTypes = { basename: f.a.string, getUserConfirmation: f.a.func, hashType: f.a.oneOf(["hashbang", "noslash", "slash"]), children: f.a.node }, t.a = h
}, function(e, t, n) {
    "use strict";
    var r = n(114);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(17),
        s = n.n(i),
        l = n(0),
        u = n.n(l),
        c = n(5),
        f = n.n(c),
        p = n(20),
        d = n(37),
        h = function(e) {
            function t() {
                var n, o, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = o = a(this, e.call.apply(e, [this].concat(l))), o.history = Object(p.d)(o.props), i = n, a(o, i)
            }
            return o(t, e), t.prototype.componentWillMount = function() { s()(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { MemoryRouter as Router }`.") }, t.prototype.render = function() { return u.a.createElement(d.a, { history: this.history, children: this.props.children }) }, t
        }(u.a.Component);
    h.propTypes = { initialEntries: f.a.array, initialIndex: f.a.number, getUserConfirmation: f.a.func, keyLength: f.a.number, children: f.a.node }, t.a = h
}, function(e, t, n) {
    "use strict";

    function r(e, t) { var n = {}; for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]); return n }
    var a = n(0),
        o = n.n(a),
        i = n(5),
        s = n.n(i),
        l = n(56),
        u = n(55),
        c = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        p = function(e) {
            var t = e.to,
                n = e.exact,
                a = e.strict,
                i = e.location,
                s = e.activeClassName,
                p = e.className,
                d = e.activeStyle,
                h = e.style,
                m = e.isActive,
                y = e["aria-current"],
                b = r(e, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]),
                v = "object" === (void 0 === t ? "undefined" : f(t)) ? t.pathname : t,
                g = v && v.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
            return o.a.createElement(l.a, {
                path: g,
                exact: n,
                strict: a,
                location: i,
                children: function(e) {
                    var n = e.location,
                        r = e.match,
                        a = !!(m ? m(r, n) : r);
                    return o.a.createElement(u.a, c({ to: t, className: a ? [p, s].filter(function(e) { return e }).join(" ") : p, style: a ? c({}, h, d) : h, "aria-current": a && y || null }, b))
                }
            })
        };
    p.propTypes = { to: u.a.propTypes.to, exact: s.a.bool, strict: s.a.bool, location: s.a.object, activeClassName: s.a.string, className: s.a.string, activeStyle: s.a.object, style: s.a.object, isActive: s.a.func, "aria-current": s.a.oneOf(["page", "step", "location", "date", "time", "true"]) }, p.defaultProps = { activeClassName: "active", "aria-current": "page" }, t.a = p
}, function(e, t) { e.exports = Array.isArray || function(e) { return "[object Array]" == Object.prototype.toString.call(e) } }, function(e, t, n) {
    "use strict";
    var r = n(118);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(0),
        s = n.n(i),
        l = n(5),
        u = n.n(l),
        c = n(14),
        f = n.n(c),
        p = function(e) {
            function t() { return r(this, t), a(this, e.apply(this, arguments)) }
            return o(t, e), t.prototype.enable = function(e) { this.unblock && this.unblock(), this.unblock = this.context.router.history.block(e) }, t.prototype.disable = function() { this.unblock && (this.unblock(), this.unblock = null) }, t.prototype.componentWillMount = function() { f()(this.context.router, "You should not use <Prompt> outside a <Router>"), this.props.when && this.enable(this.props.message) }, t.prototype.componentWillReceiveProps = function(e) { e.when ? this.props.when && this.props.message === e.message || this.enable(e.message) : this.disable() }, t.prototype.componentWillUnmount = function() { this.disable() }, t.prototype.render = function() { return null }, t
        }(s.a.Component);
    p.propTypes = { when: u.a.bool, message: u.a.oneOfType([u.a.func, u.a.string]).isRequired }, p.defaultProps = { when: !0 }, p.contextTypes = { router: u.a.shape({ history: u.a.shape({ block: u.a.func.isRequired }).isRequired }).isRequired }, t.a = p
}, function(e, t, n) {
    "use strict";
    var r = n(120);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(0),
        s = n.n(i),
        l = n(5),
        u = n.n(l),
        c = n(17),
        f = n.n(c),
        p = n(14),
        d = n.n(p),
        h = n(20),
        m = n(59),
        y = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        b = function(e) {
            function t() { return r(this, t), a(this, e.apply(this, arguments)) }
            return o(t, e), t.prototype.isStatic = function() { return this.context.router && this.context.router.staticContext }, t.prototype.componentWillMount = function() { d()(this.context.router, "You should not use <Redirect> outside a <Router>"), this.isStatic() && this.perform() }, t.prototype.componentDidMount = function() { this.isStatic() || this.perform() }, t.prototype.componentDidUpdate = function(e) {
                var t = Object(h.c)(e.to),
                    n = Object(h.c)(this.props.to);
                if (Object(h.f)(t, n)) return void f()(!1, "You tried to redirect to the same route you're currently on: \"" + n.pathname + n.search + '"');
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

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var s = n(17),
        l = n.n(s),
        u = n(14),
        c = n.n(u),
        f = n(0),
        p = n.n(f),
        d = n(5),
        h = n.n(d),
        m = n(20),
        y = n(37),
        b = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        v = function(e) { return "/" === e.charAt(0) ? e : "/" + e },
        g = function(e, t) { return e ? b({}, t, { pathname: v(e) + t.pathname }) : t },
        _ = function(e, t) { if (!e) return t; var n = v(e); return 0 !== t.pathname.indexOf(n) ? t : b({}, t, { pathname: t.pathname.substr(n.length) }) },
        E = function(e) { return "string" == typeof e ? e : Object(m.e)(e) },
        w = function(e) { return function() { c()(!1, "You cannot %s with <StaticRouter>", e) } },
        O = function() {},
        j = function(e) {
            function t() {
                var n, r, i;
                a(this, t);
                for (var s = arguments.length, l = Array(s), u = 0; u < s; u++) l[u] = arguments[u];
                return n = r = o(this, e.call.apply(e, [this].concat(l))), r.createHref = function(e) { return v(r.props.basename + E(e)) }, r.handlePush = function(e) {
                    var t = r.props,
                        n = t.basename,
                        a = t.context;
                    a.action = "PUSH", a.location = g(n, Object(m.c)(e)), a.url = E(a.location)
                }, r.handleReplace = function(e) {
                    var t = r.props,
                        n = t.basename,
                        a = t.context;
                    a.action = "REPLACE", a.location = g(n, Object(m.c)(e)), a.url = E(a.location)
                }, r.handleListen = function() { return O }, r.handleBlock = function() { return O }, i = n, o(r, i)
            }
            return i(t, e), t.prototype.getChildContext = function() { return { router: { staticContext: this.props.context } } }, t.prototype.componentWillMount = function() { l()(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { StaticRouter as Router }`.") }, t.prototype.render = function() {
                var e = this.props,
                    t = e.basename,
                    n = (e.context, e.location),
                    a = r(e, ["basename", "context", "location"]),
                    o = { createHref: this.createHref, action: "POP", location: _(t, Object(m.c)(n)), push: this.handlePush, replace: this.handleReplace, go: w("go"), goBack: w("goBack"), goForward: w("goForward"), listen: this.handleListen, block: this.handleBlock };
                return p.a.createElement(y.a, b({}, a, { history: o }))
            }, t
        }(p.a.Component);
    j.propTypes = { basename: h.a.string, context: h.a.object.isRequired, location: h.a.oneOfType([h.a.string, h.a.object]) }, j.defaultProps = { basename: "", location: "/" }, j.childContextTypes = { router: h.a.object.isRequired }, t.a = j
}, function(e, t, n) {
    "use strict";
    var r = n(124);
    t.a = r.a
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var i = n(0),
        s = n.n(i),
        l = n(5),
        u = n.n(l),
        c = n(17),
        f = n.n(c),
        p = n(14),
        d = n.n(p),
        h = n(38),
        m = function(e) {
            function t() { return r(this, t), a(this, e.apply(this, arguments)) }
            return o(t, e), t.prototype.componentWillMount = function() { d()(this.context.router, "You should not use <Switch> outside a <Router>") }, t.prototype.componentWillReceiveProps = function(e) { f()(!(e.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'), f()(!(!e.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') }, t.prototype.render = function() {
                var e = this.context.router.route,
                    t = this.props.children,
                    n = this.props.location || e.location,
                    r = void 0,
                    a = void 0;
                return s.a.Children.forEach(t, function(t) {
                    if (null == r && s.a.isValidElement(t)) {
                        var o = t.props,
                            i = o.path,
                            l = o.exact,
                            u = o.strict,
                            c = o.sensitive,
                            f = o.from,
                            p = i || f;
                        a = t, r = Object(h.a)(n.pathname, { path: p, exact: l, strict: u, sensitive: c }, e.match)
                    }
                }), r ? s.a.cloneElement(a, { location: n, computedMatch: r }) : null
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
    var a = n(0),
        o = n.n(a),
        i = n(5),
        s = n.n(i),
        l = n(49),
        u = n.n(l),
        c = n(57),
        f = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        p = function(e) {
            var t = function(t) {
                var n = t.wrappedComponentRef,
                    a = r(t, ["wrappedComponentRef"]);
                return o.a.createElement(c.a, { children: function(t) { return o.a.createElement(e, f({}, a, t, { ref: n })) } })
            };
            return t.displayName = "withRouter(" + (e.displayName || e.name) + ")", t.WrappedComponent = e, t.propTypes = { wrappedComponentRef: s.a.func }, u()(t, e)
        };
    t.a = p
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return function(t) {
            var n = t.dispatch,
                r = t.getState;
            return function(t) { return function(a) { return "function" == typeof a ? a(n, r, e) : t(a) } }
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = r();
    a.withExtraArgument = r, t.default = a
}, function(e, t, n) {
    function r() { u.throwErrors && "undefined" != typeof window && window.console && window.console.warn && window.console.warn.apply(window.console, arguments) }

    function a(e) { return Array.prototype.slice.call(e) }

    function o(e) {
        var t, n = e[0],
            o = {};
        for (("string" != typeof n || e.length > 3 || e.length > 2 && "object" == typeof e[1] && "object" == typeof e[2]) && r("Deprecated Invocation: `translate()` accepts ( string, [string], [object] ). These arguments passed:", a(e), ". See https://github.com/pentatonicfunk/i18n-wp-plugin#translate-method"), 2 === e.length && "string" == typeof n && "string" == typeof e[1] && r("Invalid Invocation: `translate()` requires an options object for plural translations, but passed:", a(e)), t = 0; t < e.length; t++) "object" == typeof e[t] && (o = e[t]);
        if ("string" == typeof n ? o.original = n : "object" == typeof o.original && (o.plural = o.original.plural, o.count = o.original.count, o.original = o.original.single), "string" == typeof e[1] && (o.plural = e[1]), void 0 === o.original) throw new Error("Translate called without a `string` value as first argument.");
        return o
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
        f = n(134),
        p = n(135),
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
            a = t.thousandsSep || this.state.numberFormatSettings.thousands_sep || ",";
        return b(e, n, r, a)
    }, u.prototype.configure = function(e) { y(this, e || {}), this.setLocale() }, u.prototype.setLocale = function(e) {
        if (e && e[""] && e[""]["key-hash"]) {
            var t, n, r, a = e[""]["key-hash"],
                i = function(e, t) { const n = !1 === t ? "" : String(t); if (void 0 !== g[n + e]) return g[n + e]; var r = p().update(e).digest("hex"); return g[n + e] = t ? r.substr(0, t) : r },
                l = function(e) { return function(t) { return t.context ? (t.original = i(t.context + String.fromCharCode(4) + t.original, e), delete t.context) : t.original = i(t.original, e), t } };
            if ("sha1" === a.substr(0, 4))
                if (4 === a.length) v.push(l(!1));
                else {
                    var u = a.substr(5).indexOf("-");
                    if (u < 0) t = Number(a.substr(5)), v.push(l(t));
                    else
                        for (n = Number(a.substr(5, u)), r = Number(a.substr(6 + u)), t = n; t <= r; t++) v.push(l(t))
                }
        }
        if (e && e[""].localeSlug)
            if (e[""].localeSlug === this.state.localeSlug) {
                if (e === this.state.locale) return;
                y(this.state.locale, e)
            } else this.state.locale = y({}, e);
        else this.state.locale = { "": { localeSlug: this.defaultLocaleSlug } };
        this.state.localeSlug = this.state.locale[""].localeSlug, this.state.jed = new f({ locale_data: { messages: this.state.locale } }), this.state.numberFormatSettings.decimal_point = s(this.state.jed, o(["number_format_decimals"])), this.state.numberFormatSettings.thousands_sep = s(this.state.jed, o(["number_format_thousands_sep"])), "number_format_decimals" === this.state.numberFormatSettings.decimal_point && (this.state.numberFormatSettings.decimal_point = "."), "number_format_thousands_sep" === this.state.numberFormatSettings.thousands_sep && (this.state.numberFormatSettings.thousands_sep = ","), this.state.translations.clear(), this.stateObserver.emit("change")
    }, u.prototype.getLocale = function() { return this.state.locale }, u.prototype.getLocaleSlug = function() { return this.state.localeSlug }, u.prototype.addTranslations = function(e) {
        for (var t in e) "" !== t && (this.state.jed.options.locale_data.messages[t] = e[t]);
        this.state.translations.clear(), this.stateObserver.emit("change")
    }, u.prototype.hasTranslation = function() { return !!l(this, o(arguments)) }, u.prototype.translate = function() {
        var e, t, n, r, a, i;
        if (e = o(arguments), i = !e.components) { try { a = JSON.stringify(e) } catch (e) { i = !1 } if (a && (t = this.state.translations.get(a))) return t }
        if (t = l(this, e), t || (t = s(this.state.jed, e)), e.args) {
            n = Array.isArray(e.args) ? e.args.slice(0) : [e.args], n.unshift(t);
            try { t = f.sprintf.apply(f, n) } catch (e) {
                if (!window || !window.console) return;
                r = this.throwErrors ? "error" : "warn", "string" != typeof e ? window.console[r](e) : window.console[r]("i18n sprintf error:", n)
            }
        }
        return e.components && (t = h({ mixedString: t, components: e.components, throwErrors: this.throwErrors })), this.translateHooks.forEach(function(n) { t = n(t, e) }), i && this.state.translations.set(a, t), t
    }, u.prototype.reRenderTranslations = function() { c("Re-rendering all translations due to external request"), this.state.translations.clear(), this.stateObserver.emit("change") }, u.prototype.registerComponentUpdateHook = function(e) { this.componentUpdateHooks.push(e) }, u.prototype.registerTranslateHook = function(e) { this.translateHooks.push(e) }, e.exports = u
}, function(e, t, n) {
    (function(r) {
        function a() { return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)) }

        function o(e) {
            var n = this.useColors;
            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), n) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var a = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) { "%%" !== e && (a++, "%c" === e && (o = a)) }), e.splice(o, 0, r)
            }
        }

        function i() { return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments) }

        function s(e) { try { null == e ? t.storage.removeItem("debug") : t.storage.debug = e } catch (e) {} }

        function l() { var e; try { e = t.storage.debug } catch (e) {} return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e }
        t = e.exports = n(132), t.log = i, t.formatArgs = o, t.save = s, t.load = l, t.useColors = a, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() { try { return window.localStorage } catch (e) {} }(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.formatters.j = function(e) { try { return JSON.stringify(e) } catch (e) { return "[UnexpectedJSONParseError]: " + e.message } }, t.enable(l())
    }).call(t, n(61))
}, function(e, t, n) {
    function r(e) { var n, r = 0; for (n in e) r = (r << 5) - r + e.charCodeAt(n), r |= 0; return t.colors[Math.abs(r) % t.colors.length] }

    function a(e) {
        function n() {
            if (n.enabled) {
                var e = n,
                    r = +new Date,
                    o = r - (a || r);
                e.diff = o, e.prev = a, e.curr = r, a = r;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = t.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var l = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(n, r) {
                    if ("%%" === n) return n;
                    l++;
                    var a = t.formatters[r];
                    if ("function" == typeof a) {
                        var o = i[l];
                        n = a.call(e, o), i.splice(l, 1), l--
                    }
                    return n
                }), t.formatArgs.call(e, i);
                (n.log || t.log || console.log.bind(console)).apply(e, i)
            }
        }
        var a;
        return n.namespace = e, n.enabled = t.enabled(e), n.useColors = t.useColors(), n.color = r(e), n.destroy = o, "function" == typeof t.init && t.init(n), t.instances.push(n), n
    }

    function o() { var e = t.instances.indexOf(this); return -1 !== e && (t.instances.splice(e, 1), !0) }

    function i(e) {
        t.save(e), t.names = [], t.skips = [];
        var n, r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            a = r.length;
        for (n = 0; n < a; n++) r[n] && (e = r[n].replace(/\*/g, ".*?"), "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
        for (n = 0; n < t.instances.length; n++) {
            var o = t.instances[n];
            o.enabled = t.enabled(o.namespace)
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
    t = e.exports = a.debug = a.default = a, t.coerce = u, t.disable = s, t.enable = i, t.enabled = l, t.humanize = n(133), t.instances = [], t.names = [], t.skips = [], t.formatters = {}
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

    function a(e) { return o(e, u, "day") || o(e, l, "hour") || o(e, s, "minute") || o(e, i, "second") || e + " ms" }

    function o(e, t, n) { if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s" }
    var i = 1e3,
        s = 60 * i,
        l = 60 * s,
        u = 24 * l,
        c = 365.25 * u;
    e.exports = function(e, t) { t = t || {}; var o = typeof e; if ("string" === o && e.length > 0) return n(e); if ("number" === o && !1 === isNaN(e)) return t.long ? a(e) : r(e); throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e)) }
}, function(e, t, n) {
    /**
     * @preserve jed.js v0.5.0beta https://github.com/SlexAxton/Jed
     */
    ! function(n, r) {
        function a(e) { return d.PF.compile(e || "nplurals=2; plural=(n != 1);") }

        function o(e, t) { this._key = e, this._i18n = t }
        var i = Array.prototype,
            s = Object.prototype,
            l = i.slice,
            u = s.hasOwnProperty,
            c = i.forEach,
            f = {},
            p = {
                forEach: function(e, t, n) {
                    var r, a, o;
                    if (null !== e)
                        if (c && e.forEach === c) e.forEach(t, n);
                        else if (e.length === +e.length) {
                        for (r = 0, a = e.length; r < a; r++)
                            if (r in e && t.call(n, e[r], r, e) === f) return
                    } else
                        for (o in e)
                            if (u.call(e, o) && t.call(n, e[o], o, e) === f) return
                },
                extend: function(e) { return this.forEach(l.call(arguments, 1), function(t) { for (var n in t) e[n] = t[n] }), e }
            },
            d = function(e) { if (this.defaults = { locale_data: { messages: { "": { domain: "messages", lang: "en", plural_forms: "nplurals=2; plural=(n != 1);" } } }, domain: "messages", debug: !1 }, this.options = p.extend({}, this.defaults, e), this.textdomain(this.options.domain), e.domain && !this.options.locale_data[this.options.domain]) throw new Error("Text domain set to non-existent domain: `" + e.domain + "`") };
        d.context_delimiter = String.fromCharCode(4), p.extend(o.prototype, { onDomain: function(e) { return this._domain = e, this }, withContext: function(e) { return this._context = e, this }, ifPlural: function(e, t) { return this._val = e, this._pkey = t, this }, fetch: function(e) { return "[object Array]" != {}.toString.call(e) && (e = [].slice.call(arguments, 0)), (e && e.length ? d.sprintf : function(e) { return e })(this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val), e) } }), p.extend(d.prototype, {
            translate: function(e) { return new o(e, this) },
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
            dnpgettext: function(e, t, n, r, a) { return this.dcnpgettext.call(this, e, t, n, r, a) },
            dcnpgettext: function(e, t, n, r, o) {
                r = r || n, e = e || this._textdomain;
                var i;
                if (!this.options) return i = new d, i.dcnpgettext.call(i, void 0, void 0, n, r, o);
                if (!this.options.locale_data) throw new Error("No locale data provided.");
                if (!this.options.locale_data[e]) throw new Error("Domain `" + e + "` was not found.");
                if (!this.options.locale_data[e][""]) throw new Error("No locale meta information provided.");
                if (!n) throw new Error("No translation key found.");
                var s, l, u, c = t ? t + d.context_delimiter + n : n,
                    f = this.options.locale_data,
                    p = f[e],
                    h = (f.messages || this.defaults.locale_data.messages)[""],
                    m = p[""].plural_forms || p[""]["Plural-Forms"] || p[""]["plural-forms"] || h.plural_forms || h["Plural-Forms"] || h["plural-forms"];
                if (void 0 === o) u = 1;
                else {
                    if ("number" != typeof o && (o = parseInt(o, 10), isNaN(o))) throw new Error("The number that was passed in is not a number.");
                    u = a(m)(o) + 1
                }
                if (!p) throw new Error("No domain named `" + e + "` could be found.");
                return !(s = p[c]) || u >= s.length ? (this.options.missing_key_callback && this.options.missing_key_callback(c, e), l = [null, n, r], !0 === this.options.debug && console.log(l[a(m)(o) + 1]), l[a()(o) + 1]) : (l = s[u]) || (l = [null, n, r], l[a()(o) + 1])
            }
        });
        var h = function() {
                function e(e) { return Object.prototype.toString.call(e).slice(8, -1).toLowerCase() }

                function t(e, t) { for (var n = []; t > 0; n[--t] = e); return n.join("") }
                var n = function() { return n.cache.hasOwnProperty(arguments[0]) || (n.cache[arguments[0]] = n.parse(arguments[0])), n.format.call(null, n.cache[arguments[0]], arguments) };
                return n.format = function(n, r) {
                    var a, o, i, s, l, u, c, f = 1,
                        p = n.length,
                        d = "",
                        m = [];
                    for (o = 0; o < p; o++)
                        if ("string" === (d = e(n[o]))) m.push(n[o]);
                        else if ("array" === d) {
                        if (s = n[o], s[2])
                            for (a = r[f], i = 0; i < s[2].length; i++) {
                                if (!a.hasOwnProperty(s[2][i])) throw h('[sprintf] property "%s" does not exist', s[2][i]);
                                a = a[s[2][i]]
                            } else a = s[1] ? r[s[1]] : r[f++];
                        if (/[^s]/.test(s[8]) && "number" != e(a)) throw h("[sprintf] expecting number but found %s", e(a));
                        switch (void 0 !== a && null !== a || (a = ""), s[8]) {
                            case "b":
                                a = a.toString(2);
                                break;
                            case "c":
                                a = String.fromCharCode(a);
                                break;
                            case "d":
                                a = parseInt(a, 10);
                                break;
                            case "e":
                                a = s[7] ? a.toExponential(s[7]) : a.toExponential();
                                break;
                            case "f":
                                a = s[7] ? parseFloat(a).toFixed(s[7]) : parseFloat(a);
                                break;
                            case "o":
                                a = a.toString(8);
                                break;
                            case "s":
                                a = (a = String(a)) && s[7] ? a.substring(0, s[7]) : a;
                                break;
                            case "u":
                                a = Math.abs(a);
                                break;
                            case "x":
                                a = a.toString(16);
                                break;
                            case "X":
                                a = a.toString(16).toUpperCase()
                        }
                        a = /[def]/.test(s[8]) && s[3] && a >= 0 ? "+" + a : a, u = s[4] ? "0" == s[4] ? "0" : s[4].charAt(1) : " ", c = s[6] - String(a).length, l = s[6] ? t(u, c) : "", m.push(s[5] ? a + l : l + a)
                    }
                    return m.join("")
                }, n.cache = {}, n.parse = function(e) {
                    for (var t = e, n = [], r = [], a = 0; t;) {
                        if (null !== (n = /^[^\x25]+/.exec(t))) r.push(n[0]);
                        else if (null !== (n = /^\x25{2}/.exec(t))) r.push("%");
                        else {
                            if (null === (n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))) throw "[sprintf] huh?";
                            if (n[2]) {
                                a |= 1;
                                var o = [],
                                    i = n[2],
                                    s = [];
                                if (null === (s = /^([a-z_][a-z_\d]*)/i.exec(i))) throw "[sprintf] huh?";
                                for (o.push(s[1]);
                                    "" !== (i = i.substring(s[0].length));)
                                    if (null !== (s = /^\.([a-z_][a-z_\d]*)/i.exec(i))) o.push(s[1]);
                                    else {
                                        if (null === (s = /^\[(\d+)\]/.exec(i))) throw "[sprintf] huh?";
                                        o.push(s[1])
                                    }
                                n[2] = o
                            } else a |= 2;
                            if (3 === a) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
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
                a = e.match(n),
                o = {};
            if (!(a.length > 1)) throw new Error("nplurals not found in plural_forms string: " + e);
            if (o.nplurals = a[1], e = e.replace(n, ""), !((t = e.match(r)) && t.length > 1)) throw new Error("`plural` expression not found: " + e);
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
                    performAction: function(e, t, n, r, a, o, i) {
                        var s = o.length - 1;
                        switch (a) {
                            case 1:
                                return { type: "GROUP", expr: o[s - 1] };
                            case 2:
                                this.$ = { type: "TERNARY", expr: o[s - 4], truthy: o[s - 2], falsey: o[s] };
                                break;
                            case 3:
                                this.$ = { type: "OR", left: o[s - 2], right: o[s] };
                                break;
                            case 4:
                                this.$ = { type: "AND", left: o[s - 2], right: o[s] };
                                break;
                            case 5:
                                this.$ = { type: "LT", left: o[s - 2], right: o[s] };
                                break;
                            case 6:
                                this.$ = { type: "LTE", left: o[s - 2], right: o[s] };
                                break;
                            case 7:
                                this.$ = { type: "GT", left: o[s - 2], right: o[s] };
                                break;
                            case 8:
                                this.$ = { type: "GTE", left: o[s - 2], right: o[s] };
                                break;
                            case 9:
                                this.$ = { type: "NEQ", left: o[s - 2], right: o[s] };
                                break;
                            case 10:
                                this.$ = { type: "EQ", left: o[s - 2], right: o[s] };
                                break;
                            case 11:
                                this.$ = { type: "MOD", left: o[s - 2], right: o[s] };
                                break;
                            case 12:
                                this.$ = { type: "GROUP", expr: o[s - 1] };
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
                            a = [null],
                            o = [],
                            i = this.table,
                            s = "",
                            l = 0,
                            u = 0,
                            c = 0,
                            f = 2;
                        this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, void 0 === this.lexer.yylloc && (this.lexer.yylloc = {});
                        var p = this.lexer.yylloc;
                        o.push(p), "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                        for (var d, h, m, y, b, v, g, _, E, w = {};;) {
                            if (m = r[r.length - 1], this.defaultActions[m] ? y = this.defaultActions[m] : (null == d && (d = t()), y = i[m] && i[m][d]), void 0 === y || !y.length || !y[0]) {
                                if (!c) {
                                    E = [];
                                    for (v in i[m]) this.terminals_[v] && v > 2 && E.push("'" + this.terminals_[v] + "'");
                                    var O = "";
                                    O = this.lexer.showPosition ? "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + E.join(", ") + ", got '" + this.terminals_[d] + "'" : "Parse error on line " + (l + 1) + ": Unexpected " + (1 == d ? "end of input" : "'" + (this.terminals_[d] || d) + "'"), this.parseError(O, { text: this.lexer.match, token: this.terminals_[d] || d, line: this.lexer.yylineno, loc: p, expected: E })
                                }
                                if (3 == c) {
                                    if (1 == d) throw new Error(O || "Parsing halted.");
                                    u = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, p = this.lexer.yylloc, d = t()
                                }
                                for (;;) { if (f.toString() in i[m]) break; if (0 == m) throw new Error(O || "Parsing halted.");! function(e) { r.length = r.length - 2 * e, a.length = a.length - e, o.length = o.length - e }(1), m = r[r.length - 1] }
                                h = d, d = f, m = r[r.length - 1], y = i[m] && i[m][f], c = 3
                            }
                            if (y[0] instanceof Array && y.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + d);
                            switch (y[0]) {
                                case 1:
                                    r.push(d), a.push(this.lexer.yytext), o.push(this.lexer.yylloc), r.push(y[1]), d = null, h ? (d = h, h = null) : (u = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, p = this.lexer.yylloc, c > 0 && c--);
                                    break;
                                case 2:
                                    if (g = this.productions_[y[1]][1], w.$ = a[a.length - g], w._$ = { first_line: o[o.length - (g || 1)].first_line, last_line: o[o.length - 1].last_line, first_column: o[o.length - (g || 1)].first_column, last_column: o[o.length - 1].last_column }, void 0 !== (b = this.performAction.call(w, s, u, l, this.yy, y[1], a, o))) return b;
                                    g && (r = r.slice(0, -1 * g * 2), a = a.slice(0, -1 * g), o = o.slice(0, -1 * g)), r.push(this.productions_[y[1]][0]), a.push(w.$), o.push(w._$), _ = i[r[r.length - 2]][r[r.length - 1]], r.push(_);
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
        f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
    }
    var a = n(39),
        o = n(136),
        i = n(137),
        s = a.rotl32,
        l = a.sum32,
        u = a.sum32_5,
        c = i.ft_1,
        f = o.BlockHash,
        p = [1518500249, 1859775393, 2400959708, 3395469782];
    a.inherits(r, f), e.exports = r, r.blockSize = 512, r.outSize = 160, r.hmacStrength = 80, r.padLength = 64, r.prototype._update = function(e, t) {
        for (var n = this.W, r = 0; r < 16; r++) n[r] = e[t + r];
        for (; r < n.length; r++) n[r] = s(n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16], 1);
        var a = this.h[0],
            o = this.h[1],
            i = this.h[2],
            f = this.h[3],
            d = this.h[4];
        for (r = 0; r < n.length; r++) {
            var h = ~~(r / 20),
                m = u(s(a, 5), c(h, o, i, f), d, n[r], p[h]);
            d = f, f = i, i = s(o, 30), o = a, a = m
        }
        this.h[0] = l(this.h[0], a), this.h[1] = l(this.h[1], o), this.h[2] = l(this.h[2], i), this.h[3] = l(this.h[3], f), this.h[4] = l(this.h[4], d)
    }, r.prototype._digest = function(e) { return "hex" === e ? a.toHex32(this.h, "big") : a.split32(this.h, "big") }
}, function(e, t, n) {
    "use strict";

    function r() { this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32 }
    var a = n(39),
        o = n(62);
    t.BlockHash = r, r.prototype.update = function(e, t) {
        if (e = a.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
            e = this.pending;
            var n = e.length % this._delta8;
            this.pending = e.slice(e.length - n, e.length), 0 === this.pending.length && (this.pending = null), e = a.join32(e, 0, e.length - n, this.endian);
            for (var r = 0; r < e.length; r += this._delta32) this._update(e, r, r + this._delta32)
        }
        return this
    }, r.prototype.digest = function(e) { return this.update(this._pad()), o(null === this.pending), this._digest(e) }, r.prototype._pad = function() {
        var e = this.pendingTotal,
            t = this._delta8,
            n = t - (e + this.padLength) % t,
            r = new Array(n + this.padLength);
        r[0] = 128;
        for (var a = 1; a < n; a++) r[a] = 0;
        if (e <<= 3, "big" === this.endian) {
            for (var o = 8; o < this.padLength; o++) r[a++] = 0;
            r[a++] = 0, r[a++] = 0, r[a++] = 0, r[a++] = 0, r[a++] = e >>> 24 & 255, r[a++] = e >>> 16 & 255, r[a++] = e >>> 8 & 255, r[a++] = 255 & e
        } else
            for (r[a++] = 255 & e, r[a++] = e >>> 8 & 255, r[a++] = e >>> 16 & 255, r[a++] = e >>> 24 & 255, r[a++] = 0, r[a++] = 0, r[a++] = 0, r[a++] = 0, o = 8; o < this.padLength; o++) r[a++] = 0;
        return r
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) { return 0 === e ? a(t, n, r) : 1 === e || 3 === e ? i(t, n, r) : 2 === e ? o(t, n, r) : void 0 }

    function a(e, t, n) { return e & t ^ ~e & n }

    function o(e, t, n) { return e & t ^ e & n ^ t & n }

    function i(e, t, n) { return e ^ t ^ n }

    function s(e) { return p(e, 2) ^ p(e, 13) ^ p(e, 22) }

    function l(e) { return p(e, 6) ^ p(e, 11) ^ p(e, 25) }

    function u(e) { return p(e, 7) ^ p(e, 18) ^ e >>> 3 }

    function c(e) { return p(e, 17) ^ p(e, 19) ^ e >>> 10 }
    var f = n(39),
        p = f.rotr32;
    t.ft_1 = r, t.ch32 = a, t.maj32 = o, t.p32 = i, t.s0_256 = s, t.s1_256 = l, t.g0_256 = u, t.g1_256 = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) {
        var n, r, a = t[e],
            o = 0;
        for (r = e + 1; r < t.length; r++)
            if (n = t[r], n.value === a.value) {
                if ("componentOpen" === n.type) { o++; continue }
                if ("componentClose" === n.type) {
                    if (0 === o) return r;
                    o--
                }
            }
        throw new Error("Missing closing component token `" + a.value + "`")
    }

    function o(e, t) {
        var n, r, i, l, c, p, d, m, y, b, v = [],
            g = {};
        for (p = 0; p < e.length; p++)
            if (c = e[p], "string" !== c.type) {
                if (!t.hasOwnProperty(c.value) || void 0 === t[c.value]) throw new Error("Invalid interpolation, missing component node: `" + c.value + "`");
                if ("object" !== s(t[c.value])) throw new Error("Invalid interpolation, component node must be a ReactElement or null: `" + c.value + "`", "\n> " + h);
                if ("componentClose" === c.type) throw new Error("Missing opening component token: `" + c.value + "`");
                if ("componentOpen" === c.type) { n = t[c.value], i = p; break }
                v.push(t[c.value])
            } else v.push(c.value);
        return n && (l = a(i, e), d = e.slice(i + 1, l), m = o(d, t), r = u.default.cloneElement(n, {}, m), v.push(r), l < e.length - 1 && (y = e.slice(l + 1), b = o(y, t), v = v.concat(b))), 1 === v.length ? v[0] : (v.forEach(function(e, t) { e && (g["interpolation-child-" + t] = e) }), (0, f.default)(g))
    }

    function i(e) {
        var t = e.mixedString,
            n = e.components,
            r = e.throwErrors;
        if (h = t, !n) return t;
        if ("object" !== (void 0 === n ? "undefined" : s(n))) { if (r) throw new Error("Interpolation Error: unable to process `" + t + "` because components is not an object"); return t }
        var a = (0, d.default)(t);
        try { return o(a, n) } catch (e) { if (r) throw new Error("Interpolation Error: unable to process `" + t + "` because of error `" + e.message + "`"); return t }
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        l = n(0),
        u = r(l),
        c = n(139),
        f = r(c),
        p = n(141),
        d = r(p),
        h = void 0;
    t.default = i
}, function(e, t, n) {
    "use strict";

    function r(e) { var t = e && (E && e[E] || e[w]); if ("function" == typeof t) return t }

    function a(e) { var t = { "=": "=0", ":": "=2" }; return "$" + ("" + e).replace(/[=:]/g, function(e) { return t[e] }) }

    function o(e, t) { return e && "object" == typeof e && null != e.key ? a(e.key) : t.toString(36) }

    function i(e, t, n, a) {
        var s = typeof e;
        if ("undefined" !== s && "boolean" !== s || (e = null), null === e || "string" === s || "number" === s || "object" === s && e.$$typeof === m) return n(a, e, "" === t ? g + o(e, 0) : t), 1;
        var l, u, c = 0,
            f = "" === t ? g : t + _;
        if (Array.isArray(e))
            for (var p = 0; p < e.length; p++) l = e[p], u = f + o(l, p), c += i(l, u, n, a);
        else {
            var d = r(e);
            if (d)
                for (var h, y = d.call(e), v = 0; !(h = y.next()).done;) l = h.value, u = f + o(l, v++), c += i(l, u, n, a);
            else if ("object" === s) {
                var E = "",
                    w = "" + e;
                b(!1, "Objects are not valid as a React child (found: %s).%s", "[object Object]" === w ? "object with keys {" + Object.keys(e).join(", ") + "}" : w, E)
            }
        }
        return c
    }

    function s(e, t, n) { return null == e ? 0 : i(e, "", t, n) }

    function l(e) { return ("" + e).replace(O, "$&/") }

    function u(e, t) { return h.cloneElement(e, { key: t }, void 0 !== e.props ? e.props.children : void 0) }

    function c(e, t, n, r) { this.result = e, this.keyPrefix = t, this.func = n, this.context = r, this.count = 0 }

    function f(e, t, n) {
        var r = e.result,
            a = e.keyPrefix,
            o = e.func,
            i = e.context,
            s = o.call(i, t, e.count++);
        Array.isArray(s) ? p(s, r, n, y.thatReturnsArgument) : null != s && (h.isValidElement(s) && (s = u(s, a + (!s.key || t && t.key === s.key ? "" : l(s.key) + "/") + n)), r.push(s))
    }

    function p(e, t, n, r, a) {
        var o = "";
        null != n && (o = l(n) + "/");
        var i = c.getPooled(t, o, r, a);
        s(e, f, i), c.release(i)
    }

    function d(e) {
        if ("object" != typeof e || !e || Array.isArray(e)) return v(!1, "React.addons.createFragment only accepts a single object. Got: %s", e), e;
        if (h.isValidElement(e)) return v(!1, "React.addons.createFragment does not accept a ReactElement without a wrapper object."), e;
        b(1 !== e.nodeType, "React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.");
        var t = [];
        for (var n in e) p(e[n], t, n, y.thatReturnsArgument);
        return t
    }
    var h = n(0),
        m = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
        y = n(65),
        b = n(66),
        v = n(140),
        g = ".",
        _ = ":",
        E = "function" == typeof Symbol && Symbol.iterator,
        w = "@@iterator",
        O = /\/+/g,
        j = P,
        P = function(e) { var t = this; if (t.instancePool.length) { var n = t.instancePool.pop(); return t.call(n, e), n } return new t(e) },
        x = function(e) {
            var t = this;
            b(e instanceof t, "Trying to release an instance into a pool of a different type."), e.destructor(), t.instancePool.length < t.poolSize && t.instancePool.push(e)
        },
        N = function(e, t, n, r) { var a = this; if (a.instancePool.length) { var o = a.instancePool.pop(); return a.call(o, e, t, n, r), o } return new a(e, t, n, r) };
    c.prototype.destructor = function() { this.result = null, this.keyPrefix = null, this.func = null, this.context = null, this.count = 0 },
        function(e, t) {
            var n = e;
            n.instancePool = [], n.getPooled = t || j, n.poolSize || (n.poolSize = 10), n.release = x
        }(c, N);
    e.exports = d
}, function(e, t, n) {
    "use strict";
    var r = n(65),
        a = r;
    e.exports = a
}, function(e, t, n) {
    "use strict";

    function r(e) { return e.match(/^\{\{\//) ? { type: "componentClose", value: e.replace(/\W/g, "") } : e.match(/\/\}\}$/) ? { type: "componentSelfClosing", value: e.replace(/\W/g, "") } : e.match(/^\{\{/) ? { type: "componentOpen", value: e.replace(/\W/g, "") } : { type: "string", value: e } }
    e.exports = function(e) { return e.split(/(\{\{\/?\s*\w+\s*\/?\}\})/g).map(r) }
}, function(e, t, n) {
    function r(e) { if (!(this instanceof r)) return new r(e); "number" == typeof e && (e = { max: e }), e || (e = {}), a.EventEmitter.call(this), this.cache = {}, this.head = this.tail = null, this.length = 0, this.max = e.max || 1e3, this.maxAge = e.maxAge || 0 }
    var a = n(64),
        o = n(63);
    e.exports = r, o(r, a.EventEmitter), Object.defineProperty(r.prototype, "keys", { get: function() { return Object.keys(this.cache) } }), r.prototype.clear = function() { this.cache = {}, this.head = this.tail = null, this.length = 0 }, r.prototype.remove = function(e) { if ("string" != typeof e && (e = "" + e), this.cache.hasOwnProperty(e)) { var t = this.cache[e]; return delete this.cache[e], this._unlink(e, t.prev, t.next), t.value } }, r.prototype._unlink = function(e, t, n) { this.length--, 0 === this.length ? this.head = this.tail = null : this.head === e ? (this.head = t, this.cache[this.head].next = null) : this.tail === e ? (this.tail = n, this.cache[this.tail].prev = null) : (this.cache[t].next = n, this.cache[n].prev = t) }, r.prototype.peek = function(e) { if (this.cache.hasOwnProperty(e)) { var t = this.cache[e]; if (this._checkAge(e, t)) return t.value } }, r.prototype.set = function(e, t) {
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
        var a = isFinite(+e) ? +e : 0,
            o = isFinite(+t) ? Math.abs(t) : 0,
            i = void 0 === r ? "," : r,
            s = void 0 === n ? "." : n,
            l = "";
        return l = (o ? function(e, t) { var n = Math.pow(10, t); return "" + (Math.round(e * n) / n).toFixed(t) }(a, o) : "" + Math.round(a)).split("."), l[0].length > 3 && (l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)), (l[1] || "").length < o && (l[1] = l[1] || "", l[1] += new Array(o - l[1].length + 1).join("0")), l.join(s)
    }
    e.exports = n
}, function(e, t, n) {
    var r = n(0),
        a = n(67),
        o = n(145);
    e.exports = function(e) {
        var t = { numberFormat: e.numberFormat.bind(e), translate: e.translate.bind(e) };
        return function(n) {
            var i = n.displayName || n.name || "",
                s = o({ displayName: "Localized(" + i + ")", componentDidMount: function() { this.boundForceUpdate = this.forceUpdate.bind(this), e.stateObserver.addListener("change", this.boundForceUpdate) }, componentWillUnmount: function() { this.boundForceUpdate && e.stateObserver.removeListener("change", this.boundForceUpdate) }, render: function() { var e = a({}, this.props, t); return r.createElement(n, e) } });
            return s._composedComponent = n, s
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(0),
        a = n(146);
    if (void 0 === r) throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");
    var o = (new r.Component).updater;
    e.exports = a(r.Component, r.isValidElement, o)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e }

    function a(e, t, n) {
        function a(e, t) {
            var n = v.hasOwnProperty(t) ? v[t] : null;
            O.hasOwnProperty(t) && s("OVERRIDE_BASE" === n, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", t), e && s("DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", t)
        }

        function u(e, n) {
            if (n) {
                s("function" != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."), s(!t(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
                var r = e.prototype,
                    o = r.__reactAutoBindPairs;
                n.hasOwnProperty(l) && _.mixins(e, n.mixins);
                for (var i in n)
                    if (n.hasOwnProperty(i) && i !== l) {
                        var u = n[i],
                            c = r.hasOwnProperty(i);
                        if (a(c, i), _.hasOwnProperty(i)) _[i](e, u);
                        else {
                            var f = v.hasOwnProperty(i),
                                h = "function" == typeof u,
                                m = h && !f && !c && !1 !== n.autobind;
                            if (m) o.push(i, u), r[i] = u;
                            else if (c) {
                                var y = v[i];
                                s(f && ("DEFINE_MANY_MERGED" === y || "DEFINE_MANY" === y), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", y, i), "DEFINE_MANY_MERGED" === y ? r[i] = p(r[i], u) : "DEFINE_MANY" === y && (r[i] = d(r[i], u))
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
                        var a = n in _;
                        s(!a, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', n);
                        var o = n in e;
                        if (o) { var i = g.hasOwnProperty(n) ? g[n] : null; return s("DEFINE_MANY_MERGED" === i, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", n), void(e[n] = p(e[n], r)) }
                        e[n] = r
                    }
                }
        }

        function f(e, t) { s(e && t && "object" == typeof e && "object" == typeof t, "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."); for (var n in t) t.hasOwnProperty(n) && (s(void 0 === e[n], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", n), e[n] = t[n]); return e }

        function p(e, t) {
            return function() {
                var n = e.apply(this, arguments),
                    r = t.apply(this, arguments);
                if (null == n) return r;
                if (null == r) return n;
                var a = {};
                return f(a, n), f(a, r), a
            }
        }

        function d(e, t) { return function() { e.apply(this, arguments), t.apply(this, arguments) } }

        function h(e, t) { var n = t.bind(e); return n }

        function m(e) {
            for (var t = e.__reactAutoBindPairs, n = 0; n < t.length; n += 2) {
                var r = t[n],
                    a = t[n + 1];
                e[r] = h(e, a)
            }
        }

        function y(e) {
            var t = r(function(e, r, a) {
                this.__reactAutoBindPairs.length && m(this), this.props = e, this.context = r, this.refs = i, this.updater = a || n, this.state = null;
                var o = this.getInitialState ? this.getInitialState() : null;
                s("object" == typeof o && !Array.isArray(o), "%s.getInitialState(): must return an object or null", t.displayName || "ReactCompositeComponent"), this.state = o
            });
            t.prototype = new j, t.prototype.constructor = t, t.prototype.__reactAutoBindPairs = [], b.forEach(u.bind(null, t)), u(t, E), u(t, e), u(t, w), t.getDefaultProps && (t.defaultProps = t.getDefaultProps()), s(t.prototype.render, "createClass(...): Class specification must implement a `render` method.");
            for (var a in v) t.prototype[a] || (t.prototype[a] = null);
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
                childContextTypes: function(e, t) { e.childContextTypes = o({}, e.childContextTypes, t) },
                contextTypes: function(e, t) { e.contextTypes = o({}, e.contextTypes, t) },
                getDefaultProps: function(e, t) { e.getDefaultProps ? e.getDefaultProps = p(e.getDefaultProps, t) : e.getDefaultProps = t },
                propTypes: function(e, t) { e.propTypes = o({}, e.propTypes, t) },
                statics: function(e, t) { c(e, t) },
                autobind: function() {}
            },
            E = { componentDidMount: function() { this.__isMounted = !0 } },
            w = { componentWillUnmount: function() { this.__isMounted = !1 } },
            O = { replaceState: function(e, t) { this.updater.enqueueReplaceState(this, e, t) }, isMounted: function() { return !!this.__isMounted } },
            j = function() {};
        return o(j.prototype, e.prototype, O), y
    }
    var o = n(147),
        i = n(148),
        s = n(66),
        l = "mixins";
    e.exports = a
}, function(e, t, n) {
    "use strict";

    function r(e) { if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined"); return Object(e) }
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    var a = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        i = Object.prototype.propertyIsEnumerable;
    e.exports = function() { try { if (!Object.assign) return !1; var e = new String("abc"); if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1; for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n; if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) { return t[e] }).join("")) return !1; var r = {}; return "abcdefghijklmnopqrst".split("").forEach(function(e) { r[e] = e }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("") } catch (e) { return !1 } }() ? Object.assign : function(e, t) { for (var n, s, l = r(e), u = 1; u < arguments.length; u++) { n = Object(arguments[u]); for (var c in n) o.call(n, c) && (l[c] = n[c]); if (a) { s = a(n); for (var f = 0; f < s.length; f++) i.call(n, s[f]) && (l[s[f]] = n[s[f]]) } } return l }
}, function(e, t, n) {
    "use strict";
    var r = {};
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(30),
        p = r(f),
        d = function(e) {
            function t(e) {
                a(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                    r = { form: { shortcode: "powerform_form", type: "custom_form", processAction: powerformData.adminUrl + "admin.php?page=powerform-cform", processNonce: powerformData.formProcessNonce, exportNonce: powerformData.formExportNonce, submissions: powerformData.adminUrl + "admin.php?page=powerform-entries&form_type=powerform_forms&form_id=" + n.props.id, dropdownLabel: (0, c.translate)("Open form options") }, poll: { shortcode: "powerform_poll", type: "poll", processAction: powerformData.adminUrl + "admin.php?page=powerform-poll", processNonce: powerformData.pollProcessNonce, exportNonce: powerformData.pollExportNonce, submissions: powerformData.adminUrl + "admin.php?page=powerform-entries&form_type=powerform_polls&form_id=" + n.props.id, dropdownLabel: (0, c.translate)("Open poll options") }, quiz: { shortcode: "powerform_quiz", type: "quiz", processAction: powerformData.adminUrl + "admin.php?page=powerform-quiz", processNonce: powerformData.quizProcessNonce, exportNonce: powerformData.quizExportNonce, submissions: powerformData.adminUrl + "admin.php?page=powerform-entries&form_type=powerform_quizzes&form_id=" + n.props.id, dropdownLabel: (0, c.translate)("Open quiz options") } };
                return n.copyToClipboard = n.copyToClipboard.bind(n), n.data = r[n.props.type], n
            }
            return i(t, e), s(t, [{ key: "copyToClipboard", value: function() { this.input.select(), document.execCommand("copy"), new p.default({ type: "success", text: (0, c.translate)("Shortcode has been copied successfully."), time: 4e3 }).open() } }, {
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
            n = o(i.prototype.request, t);
        return a.extend(n, i.prototype, t), a.extend(n, t), n
    }
    var a = n(11),
        o = n(69),
        i = n(152),
        s = n(40),
        l = r(s);
    l.Axios = i, l.create = function(e) { return r(a.merge(s, e)) }, l.Cancel = n(73), l.CancelToken = n(166), l.isCancel = n(72), l.all = function(e) { return Promise.all(e) }, l.spread = n(167), e.exports = l, e.exports.default = l
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
    var a = n(40),
        o = n(11),
        i = n(161),
        s = n(162);
    r.prototype.request = function(e) {
        "string" == typeof e && (e = o.merge({ url: arguments[0] }, arguments[1])), e = o.merge(a, { method: "get" }, this.defaults, e), e.method = e.method.toLowerCase();
        var t = [s, void 0],
            n = Promise.resolve(e);
        for (this.interceptors.request.forEach(function(e) { t.unshift(e.fulfilled, e.rejected) }), this.interceptors.response.forEach(function(e) { t.push(e.fulfilled, e.rejected) }); t.length;) n = n.then(t.shift(), t.shift());
        return n
    }, o.forEach(["delete", "get", "head", "options"], function(e) { r.prototype[e] = function(t, n) { return this.request(o.merge(n || {}, { method: e, url: t })) } }), o.forEach(["post", "put", "patch"], function(e) { r.prototype[e] = function(t, n, r) { return this.request(o.merge(r || {}, { method: e, url: t, data: n })) } }), e.exports = r
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = function(e, t) { r.forEach(e, function(n, r) { r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]) }) }
}, function(e, t, n) {
    "use strict";
    var r = n(71);
    e.exports = function(e, t, n) {
        var a = n.config.validateStatus;
        n.status && a && !a(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t, n, r, a) { return e.config = t, n && (e.code = n), e.request = r, e.response = a, e }
}, function(e, t, n) {
    "use strict";

    function r(e) { return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") }
    var a = n(11);
    e.exports = function(e, t, n) {
        if (!t) return e;
        var o;
        if (n) o = n(t);
        else if (a.isURLSearchParams(t)) o = t.toString();
        else {
            var i = [];
            a.forEach(t, function(e, t) { null !== e && void 0 !== e && (a.isArray(e) ? t += "[]" : e = [e], a.forEach(e, function(e) { a.isDate(e) ? e = e.toISOString() : a.isObject(e) && (e = JSON.stringify(e)), i.push(r(t) + "=" + r(e)) })) }), o = i.join("&")
        }
        return o && (e += (-1 === e.indexOf("?") ? "?" : "&") + o), e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(11),
        a = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    e.exports = function(e) {
        var t, n, o, i = {};
        return e ? (r.forEach(e.split("\n"), function(e) {
            if (o = e.indexOf(":"), t = r.trim(e.substr(0, o)).toLowerCase(), n = r.trim(e.substr(o + 1)), t) {
                if (i[t] && a.indexOf(t) >= 0) return;
                i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([n]) : i[t] ? i[t] + ", " + n : n
            }
        }), i) : i
    }
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = r.isStandardBrowserEnv() ? function() {
        function e(e) { var t = e; return n && (a.setAttribute("href", t), t = a.href), a.setAttribute("href", t), { href: a.href, protocol: a.protocol ? a.protocol.replace(/:$/, "") : "", host: a.host, search: a.search ? a.search.replace(/^\?/, "") : "", hash: a.hash ? a.hash.replace(/^#/, "") : "", hostname: a.hostname, port: a.port, pathname: "/" === a.pathname.charAt(0) ? a.pathname : "/" + a.pathname } }
        var t, n = /(msie|trident)/i.test(navigator.userAgent),
            a = document.createElement("a");
        return t = e(window.location.href),
            function(n) { var a = r.isString(n) ? e(n) : n; return a.protocol === t.protocol && a.host === t.host }
    }() : function() { return function() { return !0 } }()
}, function(e, t, n) {
    "use strict";

    function r() { this.message = "String contains an invalid character" }

    function a(e) {
        for (var t, n, a = String(e), i = "", s = 0, l = o; a.charAt(0 | s) || (l = "=", s % 1); i += l.charAt(63 & t >> 8 - s % 1 * 8)) {
            if ((n = a.charCodeAt(s += .75)) > 255) throw new r;
            t = t << 8 | n
        }
        return i
    }
    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    r.prototype = new Error, r.prototype.code = 5, r.prototype.name = "InvalidCharacterError", e.exports = a
}, function(e, t, n) {
    "use strict";
    var r = n(11);
    e.exports = r.isStandardBrowserEnv() ? function() {
        return {
            write: function(e, t, n, a, o, i) {
                var s = [];
                s.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), r.isString(a) && s.push("path=" + a), r.isString(o) && s.push("domain=" + o), !0 === i && s.push("secure"), document.cookie = s.join("; ")
            },
            read: function(e) { var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")); return t ? decodeURIComponent(t[3]) : null },
            remove: function(e) { this.write(e, "", Date.now() - 864e5) }
        }
    }() : function() { return { write: function() {}, read: function() { return null }, remove: function() {} } }()
}, function(e, t, n) {
    "use strict";

    function r() { this.handlers = [] }
    var a = n(11);
    r.prototype.use = function(e, t) { return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1 }, r.prototype.eject = function(e) { this.handlers[e] && (this.handlers[e] = null) }, r.prototype.forEach = function(e) { a.forEach(this.handlers, function(t) { null !== t && e(t) }) }, e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) { e.cancelToken && e.cancelToken.throwIfRequested() }
    var a = n(11),
        o = n(163),
        i = n(72),
        s = n(40),
        l = n(164),
        u = n(165);
    e.exports = function(e) { return r(e), e.baseURL && !l(e.url) && (e.url = u(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = o(e.data, e.headers, e.transformRequest), e.headers = a.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), a.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(t) { delete e.headers[t] }), (e.adapter || s.adapter)(e).then(function(t) { return r(e), t.data = o(t.data, t.headers, e.transformResponse), t }, function(t) { return i(t) || (r(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t) }) }
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
        e(function(e) { n.reason || (n.reason = new a(e), t(n.reason)) })
    }
    var a = n(73);
    r.prototype.throwIfRequested = function() { if (this.reason) throw this.reason }, r.source = function() { var e; return { token: new r(function(t) { e = t }), cancel: e } }, e.exports = r
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) { return function(t) { return e.apply(null, t) } }
}, function(e, t, n) {
    "use strict";
    var r = n(75),
        a = n(76),
        o = { brackets: function(e) { return e + "[]" }, indices: function(e, t) { return e + "[" + t + "]" }, repeat: function(e) { return e } },
        i = Date.prototype.toISOString,
        s = { delimiter: "&", encode: !0, encoder: r.encode, encodeValuesOnly: !1, serializeDate: function(e) { return i.call(e) }, skipNulls: !1, strictNullHandling: !1 },
        l = function e(t, n, a, o, i, l, u, c, f, p, d, h) {
            var m = t;
            if ("function" == typeof u) m = u(n, m);
            else if (m instanceof Date) m = p(m);
            else if (null === m) {
                if (o) return l && !h ? l(n, s.encoder) : n;
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
                i && null === m[_] || (y = Array.isArray(m) ? y.concat(e(m[_], a(n, _), a, o, i, l, u, c, f, p, d, h)) : y.concat(e(m[_], n + (f ? "." + _ : "[" + _ + "]"), a, o, i, l, u, c, f, p, d, h)))
            }
            return y
        };
    e.exports = function(e, t) {
        var n = e,
            i = t ? r.assign({}, t) : {};
        if (null !== i.encoder && void 0 !== i.encoder && "function" != typeof i.encoder) throw new TypeError("Encoder has to be a function.");
        var u = void 0 === i.delimiter ? s.delimiter : i.delimiter,
            c = "boolean" == typeof i.strictNullHandling ? i.strictNullHandling : s.strictNullHandling,
            f = "boolean" == typeof i.skipNulls ? i.skipNulls : s.skipNulls,
            p = "boolean" == typeof i.encode ? i.encode : s.encode,
            d = "function" == typeof i.encoder ? i.encoder : s.encoder,
            h = "function" == typeof i.sort ? i.sort : null,
            m = void 0 !== i.allowDots && i.allowDots,
            y = "function" == typeof i.serializeDate ? i.serializeDate : s.serializeDate,
            b = "boolean" == typeof i.encodeValuesOnly ? i.encodeValuesOnly : s.encodeValuesOnly;
        if (void 0 === i.format) i.format = a.default;
        else if (!Object.prototype.hasOwnProperty.call(a.formatters, i.format)) throw new TypeError("Unknown format option provided.");
        var v, g, _ = a.formatters[i.format];
        "function" == typeof i.filter ? (g = i.filter, n = g("", n)) : Array.isArray(i.filter) && (g = i.filter, v = g);
        var E = [];
        if ("object" != typeof n || null === n) return "";
        var w;
        w = i.arrayFormat in o ? i.arrayFormat : "indices" in i ? i.indices ? "indices" : "repeat" : "indices";
        var O = o[w];
        v || (v = Object.keys(n)), h && v.sort(h);
        for (var j = 0; j < v.length; ++j) {
            var P = v[j];
            f && null === n[P] || (E = E.concat(l(n[P], P, O, c, f, p ? d : null, g, h, m, y, _, b)))
        }
        var x = E.join(u),
            N = !0 === i.addQueryPrefix ? "?" : "";
        return x.length > 0 ? N + x : ""
    }
}, function(e, t, n) {
    "use strict";
    var r = n(75),
        a = Object.prototype.hasOwnProperty,
        o = { allowDots: !1, allowPrototypes: !1, arrayLimit: 20, decoder: r.decode, delimiter: "&", depth: 5, parameterLimit: 1e3, plainObjects: !1, strictNullHandling: !1 },
        i = function(e, t) {
            for (var n = {}, r = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, i = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, s = r.split(t.delimiter, i), l = 0; l < s.length; ++l) {
                var u, c, f = s[l],
                    p = f.indexOf("]="),
                    d = -1 === p ? f.indexOf("=") : p + 1; - 1 === d ? (u = t.decoder(f, o.decoder), c = t.strictNullHandling ? null : "") : (u = t.decoder(f.slice(0, d), o.decoder), c = t.decoder(f.slice(d + 1), o.decoder)), a.call(n, u) ? n[u] = [].concat(n[u]).concat(c) : n[u] = c
            }
            return n
        },
        s = function(e, t, n) {
            for (var r = t, a = e.length - 1; a >= 0; --a) {
                var o, i = e[a];
                if ("[]" === i) o = [], o = o.concat(r);
                else {
                    o = n.plainObjects ? Object.create(null) : {};
                    var s = "[" === i.charAt(0) && "]" === i.charAt(i.length - 1) ? i.slice(1, -1) : i,
                        l = parseInt(s, 10);
                    !isNaN(l) && i !== s && String(l) === s && l >= 0 && n.parseArrays && l <= n.arrayLimit ? (o = [], o[l] = r) : o[s] = r
                }
                r = o
            }
            return r
        },
        l = function(e, t, n) {
            if (e) {
                var r = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                    o = /(\[[^[\]]*])/,
                    i = /(\[[^[\]]*])/g,
                    l = o.exec(r),
                    u = l ? r.slice(0, l.index) : r,
                    c = [];
                if (u) {
                    if (!n.plainObjects && a.call(Object.prototype, u) && !n.allowPrototypes) return;
                    c.push(u)
                }
                for (var f = 0; null !== (l = i.exec(r)) && f < n.depth;) {
                    if (f += 1, !n.plainObjects && a.call(Object.prototype, l[1].slice(1, -1)) && !n.allowPrototypes) return;
                    c.push(l[1])
                }
                return l && c.push("[" + r.slice(l.index) + "]"), s(c, t, n)
            }
        };
    e.exports = function(e, t) {
        var n = t ? r.assign({}, t) : {};
        if (null !== n.decoder && void 0 !== n.decoder && "function" != typeof n.decoder) throw new TypeError("Decoder has to be a function.");
        if (n.ignoreQueryPrefix = !0 === n.ignoreQueryPrefix, n.delimiter = "string" == typeof n.delimiter || r.isRegExp(n.delimiter) ? n.delimiter : o.delimiter, n.depth = "number" == typeof n.depth ? n.depth : o.depth, n.arrayLimit = "number" == typeof n.arrayLimit ? n.arrayLimit : o.arrayLimit, n.parseArrays = !1 !== n.parseArrays, n.decoder = "function" == typeof n.decoder ? n.decoder : o.decoder, n.allowDots = "boolean" == typeof n.allowDots ? n.allowDots : o.allowDots, n.plainObjects = "boolean" == typeof n.plainObjects ? n.plainObjects : o.plainObjects, n.allowPrototypes = "boolean" == typeof n.allowPrototypes ? n.allowPrototypes : o.allowPrototypes, n.parameterLimit = "number" == typeof n.parameterLimit ? n.parameterLimit : o.parameterLimit, n.strictNullHandling = "boolean" == typeof n.strictNullHandling ? n.strictNullHandling : o.strictNullHandling, "" === e || null === e || void 0 === e) return n.plainObjects ? Object.create(null) : {};
        for (var a = "string" == typeof e ? i(e, n) : e, s = n.plainObjects ? Object.create(null) : {}, u = Object.keys(a), c = 0; c < u.length; ++c) {
            var f = u[c],
                p = l(f, a[f], n);
            s = r.merge(s, p, n)
        }
        return r.compact(s)
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "updateValue", value: function(e) { "function" == typeof this.props.updateProperty ? this.props.updateProperty(this.props.property, e) : this.props.actions.settingsActions.updateSetting(this.props.property, e) } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.radioClass) ? "sui-radio" : "sui-radio " + this.props.radioClass,
                        n = _.isUndefined(this.props.settings[this.props.property]) ? this.props.defaultValue : this.props.settings[this.props.property],
                        r = l.default.Children.map(this.props.children, function(r) {
                            var a = "",
                                o = _.isUndefined(r.props.label) ? r.props.children : r.props.label;
                            return r.props.image1x && r.props.image2x && (a = l.default.createElement("img", { src: powerformData.imagesUrl + "/" + r.props.image1x, srcSet: powerformData.imagesUrl + "/" + r.props.image1x + " 1x,\n\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/" + r.props.image2x + " 2x", "aria-hidden": "true" })), r.props.image1x && !r.props.image2x && (a = l.default.createElement("img", { src: powerformData.imagesUrl + "/" + r.props.image1x, "aria-hidden": "true" })), r.props.image2x && !r.props.image1x && (a = l.default.createElement("img", { src: powerformData.imagesUrl + "/" + r.props.image2x, srcSet: powerformData.imagesUrl + "/" + r.props.image2x + " 2x", "aria-hidden": "true" })), r.props.hasImage ? l.default.createElement("label", { htmlFor: "powerform-field-" + r.props.value, className: "sui-radio-image" }, a, l.default.createElement("span", { className: t }, l.default.createElement("input", { type: "radio", name: "powerform-" + e.props.value, value: r.props.value, id: "powerform-field-" + r.props.value, checked: n === r.props.value, onChange: e.updateValue.bind(e, r.props.value) }), l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, o))) : r.props.hasImage ? void 0 : l.default.createElement("label", { htmlFor: "powerform-field-" + r.props.value, className: t }, l.default.createElement("input", { type: "radio", name: "powerform-" + e.props.value, id: "powerform-field-" + r.props.value, value: r.props.value, checked: n === r.props.value, onChange: e.updateValue.bind(e, r.props.value) }), l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, o))
                        }),
                        a = l.default.Children.map(this.props.children, function(t) { return "true" === e.props.radioContent && "Empty" !== t.type.name ? l.default.createElement("div", { className: "sui-border-frame" + (t.props.value === n ? "" : " sui-hidden"), style: { marginLeft: "0" } }, t.props.value === n && t) : l.default.createElement(l.default.Fragment, null) }),
                        o = "";
                    this.props.label && "" !== this.props.label && (o = l.default.createElement("label", { className: "sui-label" }, this.props.label, this.props.note && l.default.createElement("span", { className: "sui-label-note" }, this.props.note)));
                    var i = "";
                    this.props.description && "" !== this.props.description && (i = l.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.description));
                    var s = "";
                    this.props.settingsLabel && "" !== this.props.settingsLabel && (s = l.default.createElement("label", { className: "sui-settings-label" }, this.props.settingsLabel));
                    var u = "";
                    return this.props.settingsDesc && "" !== this.props.settingsDesc && (u = l.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, this.props.settingsDesc)), this.props.noWrapper ? r : l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { role: "radiogroup", className: "sui-form-field" }, o, s, i, u, r, a))
                }
            }]), t
        }(s.Component);
    t.default = u
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n.insertSelector = n.insertSelector.bind(n), n }
            return o(t, e), i(t, [{ key: "componentDidMount", value: function() { this.editor = ace.edit("powerform-field-" + this.props.property), this.session = this.editor.getSession(), this.session.setUseWorker(!1), this.editor.setShowPrintMargin(!1), this.session.setMode("ace/mode/css"), this.editor.setTheme("ace/theme/sui"), this.editor.renderer.setShowGutter(!0), this.editor.setHighlightActiveLine(!0), this.editor.focus(), this.editor.on("change", this.updateValue) } }, { key: "componentWillUnmount", value: function() { this.editor.destroy(), this.editor = null } }, {
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
                        a = l.default.createElement(l.default.Fragment, null, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Basic selectors")), l.default.createElement("div", { className: "sui-ace-selectors" }, l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" ") } }, (0, u.translate)("Poll")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-poll--question ") } }, (0, u.translate)("Question")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-radio--design ") } }, (0, u.translate)("Answer Input")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-radio--label ") } }, (0, u.translate)("Answer Label")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-button ") } }, (0, u.translate)("Submit Button")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" .powerform-poll-footer a.powerform-link, .powerform-poll-footer a.powerform-link:visited ") } }, (0, u.translate)("View Results Link")))),
                        o = l.default.createElement(l.default.Fragment, null, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Basic selectors")), l.default.createElement("div", { className: "sui-ace-selectors" }, l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(" ") } }, (0, u.translate)("Quiz")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-quiz--title ") } }, (0, u.translate)("Title")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-quiz--description p ") } }, (0, u.translate)("Description")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-question .powerform-legend ") } }, (0, u.translate)("Question")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-answer .powerform-answer--design ") } }, (0, u.translate)("Answer Container")), l.default.createElement("a", { className: "sui-selector sui-insert-selector", onClick: function() { return e.insertSelector(".powerform-answer .powerform-answer--name ") } }, (0, u.translate)("Answer Text"))));
                    return l.default.createElement(l.default.Fragment, null, "form" === n && r, "poll" === n && a, "quiz" === n && o, l.default.createElement("div", { id: "powerform-field-" + this.props.property, "data-value": t, style: { height: "210px" } }, t))
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";
    var r = n(173),
        a = function(e) { return e && e.__esModule ? e : { default: e } }(r);
    ! function(e, t, n, r) {
        function o(e, t) { this.$popup = {}, this._deferred = {}, this.el = e, this.$el = jQuery(this.el), this.options = _.extend(i, t), this.init() }
        var i = { type: "form" };
        jQuery.extend(o.prototype, {
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
                    o = n.data("nonce"),
                    i = n.data("slug"),
                    s = n.data("title"),
                    l = n.data("image"),
                    u = n.data("imagex2"),
                    c = n.data("action"),
                    f = n.data("form-id"),
                    p = n.data("multi-id"),
                    d = n.data("poll-id"),
                    h = n.data("quiz-id"),
                    m = _.template('<div class="sui-dialog sui-dialog-alt sui-dialog-sm" id="powerform-integration-popup"><div class="sui-dialog-overlay sui-fade-in" tabindex="-1" data-a11y-dialog-hide=""></div><div class="sui-dialog-content sui-fade-in" aria-labelledby="dialogTitle" aria-describedby="dialogDescription" role="dialog"><div class="sui-box" role="document"><div class="sui-box-header sui-block-content-center"><div class="sui-dialog-image" aria-hidden="true"><img src="<%= image %>" srcset="<%= image %> 1x, <%= image_x2 %> 2x" alt="<%= title %>" class="sui-image sui-image-center" /></div><div class="integration-header"></div><button class="sui-dialog-back powerform-addon-back" aria-label="Back" style="display: none;"></button><button class="sui-dialog-close powerform-integration-close" aria-label="Close"></button></div><div class="sui-box-body"></div><div class="sui-box-footer sui-box-footer-center"></div></div></div></div>');
                jQuery("main.sui-wrap").append(m({ image: l, image_x2: u, title: s })), this.$popup = jQuery("#powerform-integration-popup");
                var y = { slug: i, nonce: o, action: c, multi_id: p, el: this.$popup, type: t.options.type };
                return "form" === t.options.type ? y.form_id = f : "poll" === t.options.type ? y.poll_id = d : "quiz" === t.options.type && (y.quiz_id = h), new a.default(y).on("modal:closed", function() { t.close() }), this.$popup.find(".powerform-popup-action").remove(), this.$popup.find(".sui-dialog-close").on("click", r), this.$popup.find(".sui-dialog-overlay").on("click", r), this.$popup.on("click", ".powerform-popup-cancel", r), this.$popup.find(".sui-dialog-overlay").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.find(".sui-dialog-content").removeClass("sui-fade-out").addClass("sui-fade-in"), this.$popup.removeAttr("aria-hidden"), jQuery("body").css("overflow", "hidden"), this._deferred = new jQuery.Deferred, this._deferred.promise()
            },
            close: function(e) {
                var t = jQuery("#powerform-integration-popup");
                t.find(".sui-dialog-overlay").removeClass("sui-fade-in").addClass("sui-fade-out"), t.find(".sui-dialog-content").removeClass("sui-fade-in").addClass("sui-fade-out"), jQuery("body").css("overflow", "auto"), setTimeout(function() { t.attr("aria-hidden", "true") }, 300), this.$el.trigger("reload"), this._deferred.resolve(this.$popup, e)
            }
        }), jQuery.fn.PowerformIntegrationsModal = function(e) { return this.each(function() { new o(this, e) }) }
    }(jQuery, window, document)
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
                var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, { el: e.el, tagName: "div", events: { "click .powerform-addon-connect": "connectAddon", "click .powerform-addon-disconnect": "disconnectAddon", "click .powerform-addon-form-disconnect": "formDisconnectAddon", "click .powerform-addon-next": "submitNextStep", "click .powerform-addon-back": "goPrevStep", "click .powerform-addon-finish": "finishSteps" } }));
                return o.slug = e.slug, o.nonce = e.nonce, o.action = e.action, o.multi_id = e.multi_id, o.type = e.type, o.step = 0, o.next_step = !1, o.prev_step = !1, o.scrollbar_width = o.getScrollbarWidth(), "form" === o.type ? o.form_id = e.form_id : "poll" === o.type ? o.poll_id = e.poll_id : "quiz" === o.type && (o.quiz_id = e.quiz_id), n = o.render(), a(o, n)
            }
            return o(t, e), i(t, [{
                key: "render",
                value: function() {
                    var e = {};
                    e.action = this.action, e._ajax_nonce = this.nonce, e.data = {}, e.data.slug = this.slug, e.data.step = this.step, e.data.current_step = this.step, e.data = this.getAjaxModuleData(e.data, !0), this.request(e, !1, !0)
                }
            }, {
                key: "request",
                value: function(e, t, n) {
                    var r = this,
                        a = { data: e, close: t, loader: n };
                    n && (this.$el.find(".sui-box-body").html('<p class="fui-loading-dialog" aria-label="Loading content"><i class="sui-icon-loader sui-loading" aria-hidden="true"></i></p>'), this.$el.find(".sui-box-footer").html(""), this.$el.find(".integration-header").html("")), this.$el.find(".sui-button:not(.disable-loader)").addClass("sui-button-onload"), this.ajax = jQuery.post({ url: powerformData.ajaxUrl, type: "post", data: e }).done(function(e) {
                        if (e && e.success) {
                            r.renderBody(e), r.renderFooter(e);
                            var n = e.data.data;
                            if (r.onRender(n), r.$el.find(".sui-button").removeClass("sui-button-onload"), (t || !_.isUndefined(n.is_close) && n.is_close) && r.close(r), r.$el.find(".powerform-addon-close").on("click", function() { r.close(r) }), !_.isUndefined(n.notification) && !_.isUndefined(n.notification.type) && !_.isUndefined(n.notification.text)) { new l.default({ type: n.notification.type, text: n.notification.text, time: 4e3 }).open() }
                            if (_.isUndefined(n.has_back) ? r.$el.find(".powerform-addon-back").hide() : n.has_back ? r.$el.find(".powerform-addon-back").show() : r.$el.find(".powerform-addon-back").hide(), !_.isUndefined(n.size)) { var o = jQuery("#powerform-integration-popup"); "normal" === n.size && o.removeClass("sui-dialog-sm sui-dialog-lg"), "small" === n.size && (o.addClass("sui-dialog-sm"), o.removeClass("sui-dialog-lg sui-dialog-reduced")), "reduced" === n.size && (o.addClass("sui-dialog-reduced"), o.removeClass("sui-dialog-lg sui-dialog-sm")), "large" === n.size && (o.addClass("sui-dialog-lg"), o.removeClass("sui-dialog-sm sui-dialog-reduced")) }
                            n.is_poll && setTimeout(r.request(a.data, a.close, a.loader), 5e3), setTimeout(function() { SUI.suiAccordion(jQuery(".sui-accordion")), SUI.suiTabs(jQuery(".sui-tabs")), jQuery("select").not(".sui-select").not(".powerform-select").not(".powerform-time").not(".fui-multi-select").each(function() { SUI.suiSelect(jQuery(this)) }), jQuery("select.sui-select").not(".fui-multi-select").not(".custom-select2").each(function() { jQuery(this).SUIselect2({ dropdownCssClass: "sui-select-dropdown" }) }), SUI.loadCircleScore(jQuery(".sui-circle-score")), SUI.showHidePassword() }, 10);
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
                        a = n.serialize();
                    r = this.getAjaxModuleData(r, !1), a = a + "&" + jQuery.param(r), t.action = this.action, t._ajax_nonce = this.nonce, t.data = a, this.request(t, !1, !1)
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
                        a = n.serialize();
                    r = this.getAjaxModuleData(r, !0), a = a + "&" + jQuery.param(r), t.action = this.action, t._ajax_nonce = this.nonce, t.data = a, this.request(t, !1, !1)
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

    function a(e) { if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name"); return e.toLowerCase() }

    function o(e) { return "string" != typeof e && (e = String(e)), e }

    function i(e) { var t = { next: function() { var t = e.shift(); return { done: void 0 === t, value: t } } }; return E.iterable && (t[Symbol.iterator] = function() { return t }), t }

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

    function f(e) {
        var t = new FileReader,
            n = u(t);
        return t.readAsText(e), n
    }

    function p(e) { for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]); return n.join("") }

    function d(e) { if (e.slice) return e.slice(0); var t = new Uint8Array(e.byteLength); return t.set(new Uint8Array(e)), t.buffer }

    function h() { return this.bodyUsed = !1, this._initBody = function(e) { this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : E.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : E.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : E.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : E.arrayBuffer && E.blob && r(e) ? (this._bodyArrayBuffer = d(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : E.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || O(e)) ? this._bodyArrayBuffer = d(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : E.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8")) }, E.blob && (this.blob = function() { var e = l(this); if (e) return e; if (this._bodyBlob) return Promise.resolve(this._bodyBlob); if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer])); if (this._bodyFormData) throw new Error("could not read FormData body as blob"); return Promise.resolve(new Blob([this._bodyText])) }, this.arrayBuffer = function() { return this._bodyArrayBuffer ? l(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(c) }), this.text = function() { var e = l(this); if (e) return e; if (this._bodyBlob) return f(this._bodyBlob); if (this._bodyArrayBuffer) return Promise.resolve(p(this._bodyArrayBuffer)); if (this._bodyFormData) throw new Error("could not read FormData body as text"); return Promise.resolve(this._bodyText) }, E.formData && (this.formData = function() { return this.text().then(b) }), this.json = function() { return this.text().then(JSON.parse) }, this }

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
                    a = n.join("=").replace(/\+/g, " ");
                t.append(decodeURIComponent(r), decodeURIComponent(a))
            }
        }), t
    }

    function v(e) {
        var t = new s;
        return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
            var n = e.split(":"),
                r = n.shift().trim();
            if (r) {
                var a = n.join(":").trim();
                t.append(r, a)
            }
        }), t
    }

    function g(e, t) { t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new s(t.headers), this.url = t.url || "", this._initBody(e) }

    function _(e, t) {
        return new Promise(function(n, r) {
            function a() { i.abort() }
            var o = new y(e, t);
            if (o.signal && o.signal.aborted) return r(new x("Aborted", "AbortError"));
            var i = new XMLHttpRequest;
            i.onload = function() {
                var e = { status: i.status, statusText: i.statusText, headers: v(i.getAllResponseHeaders() || "") };
                e.url = "responseURL" in i ? i.responseURL : e.headers.get("X-Request-URL");
                var t = "response" in i ? i.response : i.responseText;
                n(new g(t, e))
            }, i.onerror = function() { r(new TypeError("Network request failed")) }, i.ontimeout = function() { r(new TypeError("Network request failed")) }, i.onabort = function() { r(new x("Aborted", "AbortError")) }, i.open(o.method, o.url, !0), "include" === o.credentials ? i.withCredentials = !0 : "omit" === o.credentials && (i.withCredentials = !1), "responseType" in i && E.blob && (i.responseType = "blob"), o.headers.forEach(function(e, t) { i.setRequestHeader(t, e) }), o.signal && (o.signal.addEventListener("abort", a), i.onreadystatechange = function() { 4 === i.readyState && o.signal.removeEventListener("abort", a) }), i.send(void 0 === o._bodyInit ? null : o._bodyInit)
        })
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Headers = s, t.Request = y, t.Response = g, n.d(t, "DOMException", function() { return x }), t.fetch = _;
    var E = { searchParams: "URLSearchParams" in self, iterable: "Symbol" in self && "iterator" in Symbol, blob: "FileReader" in self && "Blob" in self && function() { try { return new Blob, !0 } catch (e) { return !1 } }(), formData: "FormData" in self, arrayBuffer: "ArrayBuffer" in self };
    if (E.arrayBuffer) var w = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        O = ArrayBuffer.isView || function(e) { return e && w.indexOf(Object.prototype.toString.call(e)) > -1 };
    s.prototype.append = function(e, t) {
        e = a(e), t = o(t);
        var n = this.map[e];
        this.map[e] = n ? n + ", " + t : t
    }, s.prototype.delete = function(e) { delete this.map[a(e)] }, s.prototype.get = function(e) { return e = a(e), this.has(e) ? this.map[e] : null }, s.prototype.has = function(e) { return this.map.hasOwnProperty(a(e)) }, s.prototype.set = function(e, t) { this.map[a(e)] = o(t) }, s.prototype.forEach = function(e, t) { for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this) }, s.prototype.keys = function() { var e = []; return this.forEach(function(t, n) { e.push(n) }), i(e) }, s.prototype.values = function() { var e = []; return this.forEach(function(t) { e.push(t) }), i(e) }, s.prototype.entries = function() { var e = []; return this.forEach(function(t, n) { e.push([n, t]) }), i(e) }, E.iterable && (s.prototype[Symbol.iterator] = s.prototype.entries);
    var j = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
    y.prototype.clone = function() { return new y(this, { body: this._bodyInit }) }, h.call(y.prototype), h.call(g.prototype), g.prototype.clone = function() { return new g(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new s(this.headers), url: this.url }) }, g.error = function() { var e = new g(null, { status: 0, statusText: "" }); return e.type = "error", e };
    var P = [301, 302, 303, 307, 308];
    g.redirect = function(e, t) { if (-1 === P.indexOf(t)) throw new RangeError("Invalid status code"); return new g(null, { status: t, headers: { location: e } }) };
    var x = self.DOMException;
    try { new x } catch (e) {
        x = function(e, t) {
            this.message = e, this.name = t;
            var n = Error(e);
            this.stack = n.stack
        }, x.prototype = Object.create(Error.prototype), x.prototype.constructor = x
    }
    _.polyfill = !0, self.fetch || (self.fetch = _, self.Headers = s, self.Request = y, self.Response = g)
}, , , function(e, t, n) {
    "use strict";

    function r(e) { return window.powerformChanges.settings = !0, { type: a, title: e } }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.updateTitle = r;
    var a = t.UPDATE_TITLE = "UPDATE_TITLE"
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.updateNotifications = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_NOTIFICATIONS", notifications: e }) } }, t.updateNotification = function(e) { return function(t) { window.powerformChanges.settings = !0, t({ type: "UPDATE_NOTIFICATION", notification: e }) } }
}, , , , , , , , , function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { return c(u.default, e) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
    var o = n(8),
        i = n(129),
        s = r(i),
        l = n(188),
        u = r(l),
        c = (0, o.compose)((0, o.applyMiddleware)(s.default))(o.createStore)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = n(8),
        o = n(189),
        i = r(o),
        s = n(190),
        l = r(s),
        u = n(191),
        c = r(u),
        f = n(192),
        p = r(f),
        d = n(193),
        h = r(d),
        m = (0, a.combineReducers)({ questions: i.default, results: l.default, settings: c.default, modal: p.default, notifications: h.default });
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) {
        var n = t.question,
            r = e.findIndex(function(e) { return e.slug === n.slug });
        return e = (0, i.replaceInPosition)(e, r, n)
    }

    function o() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
        switch (t.type) {
            case "UPDATE_QUESTIONS":
                return t.questions;
            case "UPDATE_QUESTION":
                return a([].concat(r(e)), t);
            default:
                return e
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) {
        var n = t.result,
            r = e.findIndex(function(e) { return e.slug === n.slug });
        return e = (0, i.replaceInPosition)(e, r, n)
    }

    function o() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
        switch (t.type) {
            case "UPDATE_RESULTS":
                return t.results;
            case "UPDATE_RESULT":
                return a([].concat(r(e)), t);
            default:
                return e
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = t.setting,
            r = t.value;
        return e[n] = r, e
    }

    function a(e, t) { var n = t.settings; return s({}, e, n) }

    function o(e, t) { var n = t.title; return e.formName = n, e }

    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1],
            n = Object.assign({}, e);
        switch (t.type) {
            case "UPDATE_SETTINGS":
                return a(n, t);
            case "UPDATE_SETTING":
                return r(n, t);
            case "UPDATE_TITLE":
                return o(n, t);
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

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) {
        var n = t.notification,
            r = e.findIndex(function(e) { return e.slug === n.slug });
        return e = (0, i.replaceInPosition)(e, r, n)
    }

    function o() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
        switch (t.type) {
            case "UPDATE_NOTIFICATIONS":
                return t.notifications;
            case "UPDATE_NOTIFICATION":
                return a([].concat(r(e)), t);
            default:
                return e
        }
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { return i.default.createElement("div", { className: "sui-header fui-header-with-settings" }, i.default.createElement("div", { className: "fui-header-title" }, i.default.createElement("h1", { className: "sui-header-title" }, (0, s.translate)("Edit Quiz")), i.default.createElement("div", { className: "sui-actions-right" }, i.default.createElement(u.default, e))), i.default.createElement("div", { className: "fui-header-settings" }, i.default.createElement("div", { className: "sui-actions-left" }, i.default.createElement(f.default, e)), i.default.createElement("div", { className: "sui-actions-right" }, i.default.createElement(u.default, e)))) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
    var o = n(0),
        i = r(o),
        s = n(1),
        l = n(195),
        u = r(l),
        c = n(196),
        f = r(c)
}, function(e, t, n) {
    "use strict";

    function r(e) { return powerformData.showDocLink ? o.default.createElement("a", { href: "https://n3rds.work/docs/wpmu-dev-plugins/powerform/#quizzes", target: "_blank", className: "sui-button sui-button-ghost" }, o.default.createElement("span", { className: "sui-icon-academy" }), " ", (0, i.translate)("View Documentation")) : "" }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;
    var a = n(0),
        o = function(e) { return e && e.__esModule ? e : { default: e } }(a),
        i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(149),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
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
                    return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-form-field " + n }, c.default.createElement("label", { htmlFor: "powerform-set-title", id: "powerform-set-title-label", className: "sui-screen-reader-text" }, (0, f.translate)("Name your form")), c.default.createElement("input", { type: "text", value: t, placeholder: (0, f.translate)("Give your quiz a name"), id: "powerform-set-title", className: "sui-form-control", "aria-labelledby": "powerform-set-title-label", "aria-describedby": "powerform-set-title-message", "aria-required": "true", accessKey: "t", onChange: function(t) { return e.props.actions.navigationActions.updateTitle(t.target.value) } }), c.default.createElement("p", { role: "alert", id: "powerform-set-title-message", className: "sui-error-message", style: { display: _.isEmpty(t) ? "block" : "none", marginBottom: 0 } }, _.isEmpty(t) && (0, f.translate)("Please, enter a valid name."))), c.default.createElement(d.default, s({ type: "quiz" }, this.props)))
                }
            }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = r(c),
        p = n(198),
        d = r(p),
        h = { preview: d.default.previewModal, publish: d.default.publishModal, delete: d.default.deleteModal, shortcode: d.default.shortcodeModal, question: d.default.questionModal, submit: d.default.submitModal, personality: d.default.personalityModal, deletePersonality: d.default.deletePersonalityModal, notification: d.default.notificationModal, deleteNotification: d.default.deleteNotificationModal },
        m = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{
                key: "componentDidUpdate",
                value: function(e) {
                    var t = this;
                    if (e.modal.modalProps.open !== this.props.modal.modalProps.open) {
                        var n = f.default.findDOMNode(this);
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
                    return "publish" !== this.props.modal.modalType && "shortcode" !== this.props.modal.modalType || (e = " sui-dialog-sm fui-dialog-publish"), "delete" !== this.props.modal.modalType && "deleteNotification" !== this.props.modal.modalType || (e = " sui-dialog-sm sui-dialog-alt"), u.default.createElement("div", { id: "powerform-modal", className: "sui-dialog" + e, tabIndex: "-1" }, u.default.createElement("div", { className: "" + t.join(" "), onClick: this.props.modal.modalProps.closeModal }), u.default.createElement("div", { className: "" + n.join(" "), "aria-labelledby": "dialogTitle", "aria-describedby": "dialogDescription", role: "dialog" }, u.default.createElement("div", { className: "sui-box", role: "document" }, u.default.createElement(r, this.props))))
                }
            }]), t
        }(l.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = n(199),
        o = r(a),
        i = n(200),
        s = r(i),
        l = n(201),
        u = r(l),
        c = n(202),
        f = r(c),
        p = n(203),
        d = r(p),
        h = n(204),
        m = r(h),
        y = n(207),
        b = r(y),
        v = n(208),
        g = r(v),
        _ = n(209),
        E = r(_),
        w = n(214),
        O = r(w),
        j = { previewModal: o.default, publishModal: s.default, deleteModal: u.default, shortcodeModal: d.default, questionModal: m.default, submitModal: b.default, personalityModal: g.default, deletePersonalityModal: f.default, notificationModal: E.default, deleteNotificationModal: O.default };
    t.default = j
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.previewLoaded = n.previewLoaded.bind(n), n }
            return o(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), this.$body = jQuery(this.body), this.mounted = !0, this.load(), jQuery(document).off("after.load.powerform"), jQuery(document).on("after.load.powerform", this.previewLoaded) } }, { key: "componentWillUnmount", value: function() { this.mounted = !1 } }, { key: "previewLoaded", value: function() { this.$body.find(".sui-notice-loading").remove() } }, {
                key: "load",
                value: function() {
                    var e = { questions: this.props.questions, settings: this.props.settings, type: this.props.type },
                        t = { id: this.props.id, action: "powerform_load_quiz", type: "powerform_quizzes", nonce: powerformData.previewNonce, render_id: 0, is_preview: 1, preview_data: e, last_submit_data: {} };
                    if (this.props.settings.hasLeads) {
                        var n = { wrappers: this.props.settings.wrappers, settings: this.props.settings.lead_settings };
                        t.has_lead = this.props.settings.hasLeads, t.leads_id = this.props.settings.leadsId, t.lead_preview_data = n
                    }
                    this.$el.powerformLoader(t)
                }
            }, { key: "render", value: function() { var e = this; return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, "Preview"), l.default.createElement("div", { className: "sui-actions-right" }, l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": "Close this dialog window", onClick: this.closeModal }))), l.default.createElement("div", { ref: function(t) { return e.body = t }, className: "sui-box-body" }, l.default.createElement("div", { className: "sui-notice sui-notice-loading" }, l.default.createElement("p", null, (0, u.translate)("Loading preview…"))), l.default.createElement("form", { ref: function(t) { return e.el = t }, id: "powerform-module-" + this.props.id, "data-powerform-render": "0", className: "sui-hidden" }))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n }
            return o(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" }), l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("Publishing quiz…"))), l.default.createElement("div", { className: "sui-box-body" }, l.default.createElement("p", null, (0, u.translate)("Great work! Please hold tight a few moments while we publish your quiz to the world."))), powerformData.showBranding && l.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-visibility.png", srcSet: powerformData.imagesUrl + "/powerform-visibility.png 1x,\n\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-visibility@2x.png 2x", className: "sui-image sui-image-center" })) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.trashField = n.trashField.bind(n), n }
            return o(t, e), i(t, [{ key: "trashField", value: function() { this.props.modal.modalProps.trashField(), this.closeModal() } }, { key: "render", value: function() { return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("Delete Question")), l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, u.translate)("Close this dialog window"), onClick: this.closeModal })), l.default.createElement("div", { className: "sui-box-body" }, l.default.createElement("p", null, (0, u.translate)("Deleting this question will remove its value from the existing submissions as well."))), l.default.createElement("div", { className: "sui-box-footer" }, l.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, (0, u.translate)("Cancel")), l.default.createElement("button", { className: "sui-button sui-button-ghost sui-button-red", onClick: this.trashField }, l.default.createElement("span", { className: "sui-loading-text" }, l.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, u.translate)("DELETE"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.trashField = n.trashField.bind(n), n }
            return o(t, e), i(t, [{ key: "trashField", value: function() { this.props.modal.modalProps.trashField(), this.closeModal() } }, { key: "editQuestion", value: function(e) { this.closeModal(), this.props.actions.modalActions.showModal({ open: !0, new: !1, type: "personality", results: this.props.results || {}, question: e.question, closeModal: this.closeModal }, "question") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.props.modal.modalProps.result.title,
                        n = (0, u.getPersonalityQuestions)(this.props.modal.modalProps.result, this.props.questions);
                    if (_.isEmpty(n)) return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("Delete personality %s", { args: [t] })), l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, u.translate)("Close this dialog window"), onClick: this.closeModal })), l.default.createElement("div", { className: "sui-box-body" }, l.default.createElement("p", null, (0, u.translate)("Are you sure you wish to delete this personality?"))), l.default.createElement("div", { className: "sui-box-footer" }, l.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, (0, u.translate)("Cancel")), l.default.createElement("button", { className: "sui-button sui-button-ghost sui-button-red", onClick: this.trashField }, l.default.createElement("span", { className: "sui-loading-text" }, l.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, u.translate)("Delete")))));
                    if (!_.isEmpty(n)) { var r = _.map(n, function(t, n) { return l.default.createElement("li", { className: "psource-dropdown--option", key: n }, l.default.createElement("span", { className: "fui-list-label" }, t.title), l.default.createElement("button", { className: "sui-button-icon", onClick: e.editQuestion.bind(e, t) }, l.default.createElement("i", { className: "sui-icon-pencil", "aria-hidden": "true" }), l.default.createElement("span", { className: "sui-screen-reader-text" }, (0, u.translate)("Edit Question")))) }); return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("%s can't be deleted", { args: [t] })), l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, u.translate)("Close this dialog window"), onClick: this.closeModal })), l.default.createElement("div", { className: "sui-box-body" }, l.default.createElement("p", null, (0, u.translate)("Please remove the reference of this Personality from the questions in your quiz and then delete this.")), l.default.createElement("div", { className: "sui-form-field" }, l.default.createElement("label", { className: "sui-label" }, (0, u.translate)("Questions")), l.default.createElement("ul", { className: "fui-list-fields" }, r))), l.default.createElement("div", { className: "sui-box-footer sui-box-footer-right", style: { paddingTop: "0" } }, l.default.createElement("button", { className: "sui-button powerform-discard-field-settings", onClick: this.closeModal }, (0, u.translate)("Got It")))) }
                }
            }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(30),
        p = r(f),
        d = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.copyToClipboard = n.copyToClipboard.bind(n), n }
            return i(t, e), s(t, [{ key: "copyToClipboard", value: function() { this.input.select(), document.execCommand("copy"), new p.default({ type: "success", text: (0, c.translate)("Shortcode has been copied successfully."), time: 4e3 }).open() } }, { key: "render", value: function() { var e = this; return u.default.createElement(u.default.Fragment, null, u.default.createElement("div", { className: "sui-box-header sui-block-content-center" }, u.default.createElement("i", { className: "sui-icon-check sui-lg", "aria-hidden": "true" }), u.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, c.translate)("Ready to go!")), u.default.createElement("button", { className: "sui-dialog-close powerform-cancel-create-form", "aria-label": (0, c.translate)("Close this dialog window"), onClick: this.closeModal })), u.default.createElement("div", { className: "sui-box-body sui-block-content-center" }, u.default.createElement("p", null, u.default.createElement("small", null, (0, c.translate)("Your quiz is now ready to be embedded into a page or template of your choice. Simply copy and paste the shortcode below to display it!"))), u.default.createElement("div", { id: "powerform-form-name-input", className: "sui-form-field" }, u.default.createElement("label", { htmlFor: "powerform-form-name", className: "sui-label" }, (0, c.translate)("Shortcode")), u.default.createElement("div", { className: "sui-with-button sui-with-button-icon" }, u.default.createElement("input", { type: "text", id: "powerform-form-shortcode", ref: function(t) { return e.input = t }, className: "sui-form-control", defaultValue: '[powerform_quiz id="' + this.props.id + '"]' }), u.default.createElement("button", { className: "sui-button-icon", onClick: this.copyToClipboard }, u.default.createElement("i", { "aria-hidden": "true", className: "sui-icon-copy" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Copy shortcode")))))), powerformData.showBranding && u.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-visibility.png", srcSet: powerformData.imagesUrl + "/powerform-visibility.png 1x,\n\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-visibility@2x.png 2x", className: "sui-image sui-image-center" })) } }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }

    function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function s(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function l(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var u = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        f = n(0),
        p = r(f),
        d = n(1),
        h = n(9),
        m = (r(h), n(4)),
        y = (r(m), n(2)),
        b = r(y),
        v = n(77),
        g = r(v),
        E = n(205),
        w = r(E),
        O = function(e) {
            function t(e) { i(this, t); var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.updateProperty = n.updateProperty.bind(n), n.applyChanges = n.applyChanges.bind(n), n.data = Object.assign({}, n.props.modal.modalProps), n.state = n.data.question, (_.isUndefined(n.state.type) || _.isEmpty(n.state.type)) && (n.state.type = n.props.type), n }
            return l(t, e), c(t, [{ key: "updateProperty", value: function(e, t) { this.setState(o({}, e, t)) } }, {
                key: "applyChanges",
                value: function() {
                    if (this.data.new) {
                        var e = Object.assign({}, this.state),
                            t = [].concat(a(this.data.questions), [e]);
                        this.props.actions.builderActions.updateQuestions(t)
                    }
                    this.data.new || this.props.actions.builderActions.updateQuestion(this.state), this.closeModal()
                }
            }, { key: "isValid", value: function() { var e = { isValid: !0, error: "" }; if (_.isUndefined(this.state.title) || _.isEmpty(this.state.title)) return e.isValid = !1, e.error = "", e; if (_.isUndefined(this.state.answers) || _.isEmpty(this.state.answers)) return e.isValid = !1, e.error = "", e; var t = _.filter(this.state.answers, function(e) { return !(!_.isEmpty(e.title) || !_.isEmpty(e.image)) }); if (!_.isEmpty(t)) return e.isValid = !1, e.error = (0, d.translate)("Options cannot be empty. You either need to enter answer text or upload an image for the empty options."), e; if ("knowledge" === this.state.type) { if (!_.some(this.state.answers, function(e) { return e.toggle })) return e.isValid = !1, e.error = (0, d.translate)("You need to select at least one correct answer before you can add this question."), e } if ("nowrong" === this.state.type) { if (_.some(this.state.answers, function(e) { return _.isEmpty(e.result) })) return e.isValid = !1, e.error = (0, d.translate)("You need to select an associated personality for every option."), e } return e } }, {
                key: "render",
                value: function() {
                    var e = !0 === this.data.new ? (0, d.translate)("Add Question") : (0, d.translate)("Edit Question"),
                        t = !0 === this.data.new ? (0, d.translate)("Cancel") : (0, d.translate)("Discard Changes"),
                        n = !0 === this.data.new ? (0, d.translate)("Add Question") : (0, d.translate)("Apply"),
                        r = this.isValid();
                    return p.default.createElement(p.default.Fragment, null, p.default.createElement("div", { className: "sui-box-header" }, p.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, e), p.default.createElement("div", { className: "sui-actions-right" }, p.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, d.translate)("Close this dialog window"), onClick: this.closeModal }))), p.default.createElement("div", { className: "sui-box-body" }, p.default.createElement(b.default, u({}, this.props, { settings: this.state, label: (0, d.translate)("Question"), placeholder: (0, d.translate)("E.g. Why did the chicken cross the road?"), updateProperty: this.updateProperty, property: "title", darkLabel: !0, isRequired: !0 })), p.default.createElement(g.default, u({}, this.props, { settings: this.state, type: "image", label: (0, d.translate)("Image"), fieldClass: "sui-auto", property: "image", updateProperty: this.updateProperty, darkLabel: !0 })), p.default.createElement("div", { className: "sui-form-field" }, p.default.createElement("label", { className: "sui-settings-label sui-dark" }, (0, d.translate)("Answers"), " ", p.default.createElement("span", { className: "sui-error" }, "*")), p.default.createElement("span", { className: "sui-description" }, (0, d.translate)("You can choose multiple correct answers if that applies to this question. Note that the user's selection will be considered as right when any one of the correct answers is selected.")), !r.isValid && !_.isEmpty(r.error) && p.default.createElement("span", { className: "sui-notice sui-notice-error" }, p.default.createElement("p", null, r.error)))), p.default.createElement(w.default, u({}, this.props, { state: this.state, type: this.data.type, results: this.data.results, updateProperty: this.updateProperty })), p.default.createElement("div", { className: "sui-box-footer" }, p.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, p.default.createElement("i", { className: "sui-icon-undo", "aria-hidden": "true" }), t), p.default.createElement("div", { className: "sui-actions-right" }, r.isValid && p.default.createElement("button", { className: "sui-button powerform-save-field-settings", onClick: this.applyChanges }, p.default.createElement("span", { className: "sui-loading-text" }, p.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), n), p.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })), !r.isValid && p.default.createElement("button", { className: "sui-button powerform-save-field-settings sui-tooltip", disabled: "disabled", "data-tooltip": (0, d.translate)("Please validate your fields!") }, p.default.createElement("span", { className: "sui-loading-text" }, p.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), n), p.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })))))
                }
            }]), t
        }(f.Component);
    t.default = O
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

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
        f = r(c),
        p = n(1),
        d = n(206),
        h = r(d),
        m = function(e) {
            function t(e) { o(this, t); var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.addAnswer = n.addAnswer.bind(n), n.removeAnswer = n.removeAnswer.bind(n), n.updateTitle = n.updateTitle.bind(n), n.updateImage = n.updateImage.bind(n), n.updateCheckbox = n.updateCheckbox.bind(n), n.updateResult = n.updateResult.bind(n), n.state = { answers: [].concat(a(n.props.state.answers)) }, n }
            return s(t, e), u(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.$el = jQuery(this.el), this.moveOption = this.moveOption.bind(this);
                    var t = !0;
                    this.$el.find(".sui-builder-fields").sortable({
                        start: function(n, r) { t && (e.$el.find(".sui-builder-fields").sortable("refreshPositions"), t = !1) },
                        stop: function(t, n) {
                            var r = n.item.index();
                            e.$el.find(".sui-builder-fields").sortable("cancel");
                            var a = n.item.index();
                            e.moveOption(a, r)
                        }
                    })
                }
            }, { key: "componentWillUnmount", value: function() { this.$el.unbind().removeData() } }, {
                key: "moveOption",
                value: function(e, t) {
                    var n = this.state.answers;
                    n.splice(t, 0, n.splice(e, 1)[0]), this.updateState(n)
                }
            }, { key: "updateState", value: function(e) { this.setState({ answers: e }), this.props.updateProperty("answers", e) } }, {
                key: "removeAnswer",
                value: function(e) {
                    var t = this.state.answers;
                    t.splice(e, 1), this.updateState(t)
                }
            }, {
                key: "addAnswer",
                value: function() {
                    var e = this.state.answers;
                    e.push({ title: "", image: "", default: !1 }), this.updateState(e)
                }
            }, {
                key: "updateTitle",
                value: function(e, t) {
                    var n = this.state.answers;
                    n[e].title = t, this.updateState(n)
                }
            }, { key: "updateImage", value: function(e, t, n) { var r = this.state.answers; "image" === n && (r[e].image = t), "image" !== n && (r[e].image_filename = t), this.updateState(r) } }, {
                key: "updateCheckbox",
                value: function(e, t) {
                    var n = this.state.answers;
                    n[e].toggle = t, this.updateState(n)
                }
            }, {
                key: "updateResult",
                value: function(e, t) {
                    var n = this.state.answers;
                    n[e].result = t, this.updateState(n)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.state.answers;
                    return f.default.createElement("div", { className: "sui-box-body", style: { paddingBottom: "0" }, ref: function(t) { return e.el = t } }, f.default.createElement("div", { className: "sui-box-builder sui-flushed" }, f.default.createElement("div", { className: "sui-box-builder-body" }, f.default.createElement("div", { className: "sui-builder-fields" }, _.map(t, function(t, n) { return f.default.createElement(h.default, l({ key: n, counter: n, answer: t, removeAnswer: e.removeAnswer, updateTitle: e.updateTitle, updateImage: e.updateImage, updateCheckbox: e.updateCheckbox, updateResult: e.updateResult }, e.props)) })), f.default.createElement("button", { className: "sui-button sui-button-dashed", onClick: this.addAnswer }, f.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, p.translate)("Add Answer")))))
                }
            }]), t
        }(c.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(2),
        d = r(p),
        h = n(77),
        m = r(h),
        y = n(46),
        b = r(y),
        v = n(12),
        g = (r(v), function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateTitle = n.updateTitle.bind(n), n.updateImage = n.updateImage.bind(n), n.updateCheckbox = n.updateCheckbox.bind(n), n.updateResult = n.updateResult.bind(n), n.updateValue = n.updateValue.bind(n), n }
            return i(t, e), l(t, [{ key: "removeAnswer", value: function() { this.props.removeAnswer(this.props.counter) } }, { key: "updateTitle", value: function(e, t) { this.props.updateTitle(this.props.counter, t) } }, { key: "updateImage", value: function(e, t) { this.props.updateImage(this.props.counter, t, e) } }, { key: "updateCheckbox", value: function(e, t) { this.props.updateCheckbox(this.props.counter, t) } }, { key: "updateResult", value: function(e, t) { this.props.updateResult(this.props.counter, t) } }, {
                key: "updateValue",
                value: function(e) {
                    var t = e.target.value;
                    this.updateResult("result", t)
                }
            }, { key: "isValid", value: function() { return (!_.isEmpty(this.props.answer.title) || !_.isEmpty(this.props.answer.image)) && ("personality" !== this.props.type || !_.isEmpty(this.props.answer.result)) } }, { key: "render", value: function() { var e = this.isValid() ? "" : "fui-error"; return c.default.createElement("div", { className: "sui-builder-field sui-can_move sui-react " + e }, c.default.createElement("div", { className: "sui-field-info", style: { overflow: "inherit" } }, c.default.createElement("i", { className: "sui-icon-drag sui-align_top", "aria-hidden": "true" }), c.default.createElement("div", { className: "sui-builder-field-form" }, c.default.createElement("div", { className: "sui-form-field-row" }, c.default.createElement(d.default, s({}, this.props, { settings: this.props.answer, property: "title", updateProperty: this.updateTitle }))), c.default.createElement("div", { className: "sui-form-field-row" }, c.default.createElement(m.default, s({}, this.props, { settings: this.props.answer, type: "image", fieldClass: "sui-auto", property: "image", updateProperty: this.updateImage })), "knowledge" === this.props.type && c.default.createElement(b.default, s({}, this.props, { settings: this.props.answer, property: "toggle", fieldId: "answer-checkbox-" + this.props.counter, label: (0, f.translate)("Correct Answer"), updateProperty: this.updateCheckbox })), "personality" === this.props.type && c.default.createElement("select", { value: this.props.answer.result, className: "fui-select", onChange: this.updateValue }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select Personality")), _.map(this.props.results, function(e) { return c.default.createElement("option", { value: e.slug, key: e.slug }, e.title) }))))), c.default.createElement("div", { className: "sui-field-actions sui-align_top" }, c.default.createElement("button", { className: "sui-button-icon sui-button-red", onClick: this.removeAnswer.bind(this) }, c.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), c.default.createElement("span", { className: "sui-screen-reader-text" }, (0, f.translate)("Delete answer"))))) } }]), t
        }(u.Component));
    t.default = g
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }

    function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

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
        f = r(c),
        p = n(1),
        d = n(9),
        h = r(d),
        m = n(4),
        y = r(m),
        b = n(2),
        v = r(b),
        g = function(e) {
            function t(e) { o(this, t); var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.updateProperty = n.updateProperty.bind(n), n.applyChanges = n.applyChanges.bind(n), n.state = n.props.settings.submitData || {}, n }
            return s(t, e), u(t, [{ key: "updateProperty", value: function(e, t) { this.setState(a({}, e, t)) } }, { key: "applyChanges", value: function() { this.props.actions.settingsActions.updateSetting("submitData", this.state), this.closeModal() } }, { key: "render", value: function() { return f.default.createElement(f.default.Fragment, null, f.default.createElement("div", { className: "sui-box-header" }, f.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, p.translate)("Submit Button")), f.default.createElement("div", { className: "sui-actions-right" }, f.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, p.translate)("Close this dialog window"), onClick: this.closeModal }))), f.default.createElement("div", { className: "sui-box-body" }, f.default.createElement(h.default, null, f.default.createElement(y.default, { cols: "6" }, f.default.createElement(v.default, l({}, this.props, { settings: this.state, label: (0, p.translate)("Button Text"), placeholder: (0, p.translate)("Enter text"), property: "button-text", updateProperty: this.updateProperty }))), f.default.createElement(y.default, { cols: "6" }, f.default.createElement(v.default, l({}, this.props, { settings: this.state, label: (0, p.translate)("Button Processing Text"), placeholder: (0, p.translate)("Sending..."), property: "button-processing-text", description: (0, p.translate)("This text will appear as button text while the quiz is being submitted."), updateProperty: this.updateProperty })))), f.default.createElement(h.default, null, f.default.createElement(y.default, { cols: "12" }, f.default.createElement(v.default, l({}, this.props, { settings: this.state, label: (0, p.translate)("Custom CSS Classes"), placeholder: (0, p.translate)("E.g. form-submit-btn"), property: "custom-class", description: (0, p.translate)('These will be output as you see them here. To add multiple classes, separate them with a space. For example, "form-submit-btn button" will add two classes "form-submit-btn" and "button".'), updateProperty: this.updateProperty }))))), f.default.createElement("div", { className: "sui-box-footer" }, f.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, f.default.createElement("i", { className: "sui-icon-undo", "aria-hidden": "true" }), (0, p.translate)("Discard Changes")), f.default.createElement("div", { className: "sui-actions-right" }, f.default.createElement("button", { className: "sui-button powerform-save-field-settings", onClick: this.applyChanges }, f.default.createElement("span", { className: "sui-loading-text" }, f.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), (0, p.translate)("Apply")), f.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" }))))) } }]), t
        }(c.Component);
    t.default = g
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }

    function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function s(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function l(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var u = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        f = n(0),
        p = r(f),
        d = n(1),
        h = n(9),
        m = r(h),
        y = n(4),
        b = r(y),
        v = n(2),
        g = r(v),
        E = n(77),
        w = r(E),
        O = n(32),
        j = r(O),
        P = function(e) {
            function t(e) { i(this, t); var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.updateProperty = n.updateProperty.bind(n), n.applyChanges = n.applyChanges.bind(n), n.data = Object.assign({}, n.props.modal.modalProps), n.state = n.data.result, n }
            return l(t, e), c(t, [{ key: "updateProperty", value: function(e, t) { this.setState(o({}, e, t)) } }, {
                key: "applyChanges",
                value: function() {
                    if (this.data.new) {
                        var e = Object.assign({}, this.state),
                            t = [].concat(a(this.data.results), [e]);
                        this.props.actions.builderActions.updateResults(t)
                    }
                    this.data.new || this.props.actions.builderActions.updateResult(this.state), this.closeModal()
                }
            }, { key: "isValid", value: function() { return !_.isUndefined(this.state.title) && !_.isEmpty(this.state.title) } }, {
                key: "render",
                value: function() {
                    var e = !0 === this.data.new ? (0, d.translate)("Add Personality") : (0, d.translate)("Edit Personality"),
                        t = !0 === this.data.new ? (0, d.translate)("Cancel") : (0, d.translate)("Discard Changes"),
                        n = !0 === this.data.new ? (0, d.translate)("Add Personality") : (0, d.translate)("Apply");
                    return p.default.createElement(p.default.Fragment, null, p.default.createElement("div", { className: "sui-box-header" }, p.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, e), p.default.createElement("div", { className: "sui-actions-right" }, p.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, d.translate)("Close this dialog window"), onClick: this.closeModal }))), p.default.createElement("div", { className: "sui-box-body" }, p.default.createElement(m.default, null, p.default.createElement(b.default, { cols: "12" }, p.default.createElement(g.default, u({}, this.props, { settings: this.state, label: (0, d.translate)("Title"), placeholder: (0, d.translate)("E.g. Iron Man"), updateProperty: this.updateProperty, property: "title", isRequired: !0 })))), p.default.createElement(m.default, null, p.default.createElement(b.default, { cols: "12" }, p.default.createElement(w.default, u({}, this.props, { settings: this.state, type: "image", label: (0, d.translate)("Image"), fieldClass: "sui-auto", property: "image", updateProperty: this.updateProperty })))), p.default.createElement(m.default, null, p.default.createElement(b.default, { cols: "12" }, p.default.createElement(j.default, u({}, this.props, { settings: this.state, label: (0, d.translate)("Description"), property: "description", updateProperty: this.updateProperty, disableMiscData: !0, enableFormData: !1, mainOptions: { quiz_name: (0, d.translate)("Quiz Name"), quiz_answer: (0, d.translate)("Quiz Answer"), quiz_result: (0, d.translate)("Quiz Result") } }))))), p.default.createElement("div", { className: "sui-box-footer" }, p.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, p.default.createElement("i", { className: "sui-icon-undo", "aria-hidden": "true" }), t), p.default.createElement("div", { className: "sui-actions-right" }, this.isValid() && p.default.createElement("button", { className: "sui-button powerform-save-field-settings", onClick: this.applyChanges }, p.default.createElement("span", { className: "sui-loading-text" }, p.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), n), p.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })), !this.isValid() && p.default.createElement("button", { className: "sui-button powerform-save-field-settings sui-tooltip", disabled: "disabled", "data-tooltip": (0, d.translate)("Please validate your fields!") }, p.default.createElement("span", { className: "sui-loading-text" }, p.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), n), p.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })))))
                }
            }]), t
        }(f.Component);
    t.default = P
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function o(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }

    function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function s(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function l(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var u = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]) } return e },
        c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
        }(),
        f = n(0),
        p = r(f),
        d = n(19),
        h = n(1),
        m = n(9),
        y = r(m),
        b = n(4),
        v = r(b),
        g = n(2),
        E = r(g),
        w = n(32),
        O = r(w),
        j = n(41),
        P = r(j),
        x = n(6),
        N = r(x),
        k = n(3),
        C = r(k),
        S = n(210),
        M = r(S),
        T = n(212),
        A = r(T),
        F = n(18),
        R = r(F),
        D = function(e) {
            function t(e) { i(this, t); var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.updateProperty = n.updateProperty.bind(n), n.applyChanges = n.applyChanges.bind(n), n.data = Object.assign({}, n.props.modal.modalProps), n.state = n.data.notification, n }
            return l(t, e), c(t, [{ key: "updateProperty", value: function(e, t) { this.setState(o({}, e, t)) } }, { key: "componentWillUnmount", value: function() { this.props.history.push({ pathname: "/notifications/" }) } }, { key: "getNameOptions", value: function() { var e = []; return _.map(powerformData.variables, function(t, n) { e.push({ label: t, value: "{" + n + "}" }) }), e } }, { key: "getEmailOptions", value: function() { var e = []; return _.map(powerformData.variables, function(t, n) { e.push({ label: t, value: "{" + n + "}" }) }), e } }, { key: "getRoutingEmailOptions", value: function() { var e = []; return (0, h.getFields)(this.props.settings.wrappers, ["address", "captcha", "date", "gdprcheckbox", "html", "name", "number", "page-break", "phone", "postdata", "section", "time", "upload", "website", "textarea", "text", "paypal", "stripe", "currency", "calculation", "password", "signature"]).map(function(t) { e.push({ value: "{" + t.element_id + "}", label: t.label }) }), e } }, { key: "getRoutingSubjectOptions", value: function() { var e = []; return (0, h.getFields)(this.props.settings.wrappers, ["address", "captcha", "gdprcheckbox", "html", "page-break", "postdata", "section", "upload", "textarea", "paypal", "stripe", "currency", "calculation", "password", "signature"]).map(function(t) { e.push({ value: "{" + t.element_id + "}", label: t.label }) }), e } }, { key: "getRecipientTagsOptions", value: function() { return { tags: !0, tokenSeparators: [",", " "], language: { searching: function() { return (0, h.translate)("Searching") }, noResults: function() { return (0, h.translate)("No Result Found") } }, placeholder: (0, h.translate)("Recipient(s)"), ajax: { url: powerformData.ajaxUrl, type: "POST", delay: 350, data: function(e) { return { action: "powerform_builder_search_emails", _wpnonce: powerformData.searchNonce, q: e.term } }, processResults: function(e) { return { results: e.data } }, cache: !0 }, templateResult: function(e) { return _.isUndefined(e.id) || _.isUndefined(e.text) || _.isUndefined(e.display_name) ? e.text : jQuery("<span><b>" + e.text + "</b> - <small>" + e.display_name + "</small></span>") }, createTag: function(e) { var t = jQuery.trim(e.term); return (0, h.isEmailWp)(t) ? { id: t, text: t } : null } } } }, {
                key: "applyChanges",
                value: function() {
                    if (this.data.new) {
                        var e = Object.assign({}, this.state),
                            t = [].concat(a(this.data.notifications), [e]);
                        this.props.actions.notificationsActions.updateNotifications(t)
                    }
                    this.data.new || this.props.actions.notificationsActions.updateNotification(this.state), this.closeModal()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = _.isUndefined(this.props.settings.wrappers) ? [] : this.props.settings.wrappers,
                        n = !_.isEmpty(t) && (0, h.hasFieldType)("upload", t),
                        r = _.isUndefined(this.state["email-recipients"]) ? "default" : this.state["email-recipients"],
                        a = !0,
                        o = "";
                    "default" === r && _.isEmpty(this.state.recipients) && (a = !1, o = (0, h.translate)("Please enter recipients")), "routing" === r && (_.isUndefined(this.state.routing) || _.isEmpty(this.state.routing) ? (o = (0, h.translate)("Please add email routing"), a = !1) : _.each(this.state.routing, function(e) { _.isEmpty(e.email) && (o = (0, h.translate)("Please enter recipients"), a = !1), _.isEmpty(e.rule) && (o = (0, h.translate)("Please select rule"), a = !1) })), (_.isUndefined(this.state["email-editor"]) || _.isEmpty(this.state["email-editor"])) && (a = !1, o = (0, h.translate)("Please fix the error(s) in the EMAIL tab.")), (_.isUndefined(this.state["email-subject"]) || _.isEmpty(this.state["email-subject"])) && (a = !1, o = (0, h.translate)("Please fix the error(s) in the EMAIL tab."));
                    var i = !(_.isUndefined(this.props.settings.hasLeads) || !this.props.settings.hasLeads) && "true";
                    return p.default.createElement(p.default.Fragment, null, p.default.createElement("div", { className: "sui-box-header" }, p.default.createElement("h3", { id: "dialogTitle", className: "sui-box-title" }, (0, h.translate)("Add Email Notification")), p.default.createElement("div", { className: "sui-actions-right" }, p.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, h.translate)("Close this dialog window"), onClick: this.closeModal }))), p.default.createElement("div", { className: "sui-box-body" }, p.default.createElement("div", { className: "sui-tabs sui-tabs-flushed" }, p.default.createElement("div", { className: "sui-tabs-menu" }, p.default.createElement(d.NavLink, { to: "/notifications/email/", exact: !0, className: "sui-tab-item", activeClassName: "active" }, (0, h.translate)("Email")), p.default.createElement(d.NavLink, { to: "/notifications/recipients/", exact: !0, className: "sui-tab-item", activeClassName: "active" }, (0, h.translate)("Recipients")), p.default.createElement(d.NavLink, { to: "/notifications/advanced/", exact: !0, className: "sui-tab-item", activeClassName: "active" }, (0, h.translate)("Advanced")), p.default.createElement(d.NavLink, { to: "/notifications/conditions/", exact: !0, className: "sui-tab-item", activeClassName: "active" }, (0, h.translate)("Conditions"))), p.default.createElement(d.Route, { exact: !0, path: "/notifications/", render: function() { return p.default.createElement(d.Redirect, { to: "/notifications/email" }) } }), p.default.createElement("div", { className: "sui-tabs-content" }, p.default.createElement("div", { className: "sui-tab-content active" }, p.default.createElement(d.Route, { path: "/notifications/email", render: function() { return p.default.createElement(p.default.Fragment, null, p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(E.default, u({}, e.props, { settings: e.state, label: (0, h.translate)("Label"), description: (0, h.translate)("The label is to help you identify this email and won't appear anywhere in the email."), placeholder: (0, h.translate)("E.g. Sales Team Notification"), property: "label", updateProperty: e.updateProperty })))), p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "email-subject", placeholder: (0, h.translate)("E.g. New Form Submission"), label: (0, h.translate)("Subject"), required: "true", isRequired: "true", requiredError: (0, h.translate)("Email subject can't be empty"), updateProperty: e.updateProperty }), p.default.createElement("optgroup", { label: (0, h.translate)("Quiz data") }, p.default.createElement("option", { value: "{quiz_name}" }, (0, h.translate)("Quiz Name")), p.default.createElement("option", { value: "{quiz_answer}" }, (0, h.translate)("Quiz Answer")), p.default.createElement("option", { value: "{quiz_result}" }, (0, h.translate)("Quiz Result"))), p.default.createElement("optgroup", { label: (0, h.translate)("Lead data") }, e.getRoutingSubjectOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })), p.default.createElement("optgroup", { label: (0, h.translate)("Misc data") }, e.getNameOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) }))))), p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(O.default, u({}, e.props, { settings: e.state, property: "email-editor", editorOptions: powerformData.variables, enableFormData: i, enableAllFormFields: i, enableAllNonFormFields: i, boxClass: "sui-tab-boxed", mainOptionsLabel: (0, h.translate)("Quiz Data"), mainOptions: { quiz_name: (0, h.translate)("Quiz Name"), quiz_answer: (0, h.translate)("Quiz Answer"), quiz_result: (0, h.translate)("Quiz Result") }, wrappers: t, label: (0, h.translate)("Body"), requiredError: (0, h.translate)("Email body can't be empty"), updateProperty: e.updateProperty })))), n && p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(R.default, u({}, e.props, { settings: e.state, property: "email-attachment", defaultValue: "false", label: (0, h.translate)("Attachments"), description: (0, h.translate)("Choose whether you want to attach the files uploaded via the File Upload fields to this email."), updateProperty: e.updateProperty }), p.default.createElement("div", { value: "false" }, (0, h.translate)("None")), p.default.createElement("div", { value: "true" }, (0, h.translate)("Uploaded files")))))) } }), p.default.createElement(d.Route, { path: "/notifications/recipients", render: function() { return p.default.createElement(p.default.Fragment, null, p.default.createElement("span", { className: "sui-description", style: { marginTop: "0", marginBottom: "10px" } }, (0, h.translate)("The default behavior is to send the email to the same recipients. If you want to send this email to different recipients conditionally, you can enable the email routing and change the recipients of this email based on the user input.")), p.default.createElement("div", { className: "sui-form-field", style: { marginTop: "0" } }, p.default.createElement(N.default, u({}, e.props, { property: "email-recipients", default: "default", settings: e.state, updateProperty: e.updateProperty, simple: !0 }), p.default.createElement(C.default, u({}, e.props, { value: "default", label: (0, h.translate)("Default"), boxClass: "sui-tab-boxed" }), p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "recipients", placeholder: (0, h.translate)("E.g. sales@website.com"), label: (0, h.translate)("Recipients"), required: "true", updateProperty: e.updateProperty, note: (0, h.translate)("Separate multiple emails with a comma") }), e.getRoutingEmailOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) }))), p.default.createElement(C.default, u({}, e.props, { value: "routing", label: (0, h.translate)("Email Routing") }), p.default.createElement(A.default, u({}, e.props, { updateProperty: e.updateProperty, state: e.state })))))) } }), p.default.createElement(d.Route, { path: "/notifications/advanced", render: function() { return p.default.createElement(p.default.Fragment, null, p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "from-name", placeholder: (0, h.translate)("Enter from name here"), label: (0, h.translate)("From Name"), updateProperty: e.updateProperty }), p.default.createElement("optgroup", { label: (0, h.translate)("Quiz data") }, p.default.createElement("option", { value: "{quiz_name}" }, (0, h.translate)("Quiz Name")), p.default.createElement("option", { value: "{quiz_answer}" }, (0, h.translate)("Quiz Answer")), p.default.createElement("option", { value: "{quiz_result}" }, (0, h.translate)("Quiz Result"))), p.default.createElement("optgroup", { label: (0, h.translate)("Lead data") }, e.getRoutingSubjectOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })), p.default.createElement("optgroup", { label: (0, h.translate)("Misc data") }, e.getNameOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) }))))), p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "form-email", placeholder: (0, h.translate)("Enter from email here"), label: (0, h.translate)("From Email"), updateProperty: e.updateProperty }), e.getRoutingEmailOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })))), p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "replyto-email", placeholder: (0, h.translate)("Enter reply-to email here"), label: (0, h.translate)("Reply-to Email"), updateProperty: e.updateProperty }), e.getRoutingEmailOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })))), p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "cc-email", placeholder: (0, h.translate)("Enter CC email here"), label: (0, h.translate)("CC Emails"), updateProperty: e.updateProperty }), e.getRoutingEmailOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })))), p.default.createElement(y.default, null, p.default.createElement(v.default, { cols: "12" }, p.default.createElement(P.default, u({}, e.props, { settings: e.state, property: "bcc-email", placeholder: (0, h.translate)("Enter BCC email here"), label: (0, h.translate)("BCC Emails"), updateProperty: e.updateProperty }), e.getRoutingEmailOptions().map(function(e, t) { return p.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) }))))) } }), p.default.createElement(d.Route, { path: "/notifications/conditions", render: function() { return p.default.createElement(M.default, u({}, e.props, { updateProperty: e.updateProperty, state: e.state })) } }))))), p.default.createElement("div", { className: "sui-box-footer" }, p.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, p.default.createElement("i", { className: "sui-icon-undo", "aria-hidden": "true" }), (0, h.translate)("Discard Changes")), p.default.createElement("div", { className: "sui-actions-right" }, a && p.default.createElement("button", { className: "sui-button powerform-save-field-settings", onClick: this.applyChanges }, p.default.createElement("span", { className: "sui-loading-text" }, p.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), (0, h.translate)("Add")), p.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })), !a && p.default.createElement("div", { className: "sui-tooltip", "data-tooltip": o }, p.default.createElement("button", { className: "sui-button powerform-save-field-settings sui-tooltip", disabled: "disabled", "data-tooltip": o }, p.default.createElement("span", { className: "sui-loading-text" }, p.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), (0, h.translate)("Add")), p.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" }))))))
                }
            }]), t
        }(f.Component);
    t.default = D
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(211),
        d = r(p),
        h = n(18),
        m = r(h),
        y = function(e) {
            function t(e) {
                a(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                n.addRule = n.addRule.bind(n), n.removeRule = n.removeRule.bind(n), n.updateField = n.updateField.bind(n), n.updateRule = n.updateRule.bind(n), n.updateValue = n.updateValue.bind(n), n.updateInputValue = n.updateInputValue.bind(n), n.fields = _.isUndefined(n.props.settings.wrappers) ? [] : n.props.settings.wrappers, n.fields = (0, f.getFields)(n.fields);
                var r = [];
                return _.each(n.props.questions, function(e) {
                    var t = Object.assign({}, e);
                    r.push(t)
                }), n.questions = r, n.fields = _.filter(n.fields, function(e) { return "gdprcheckbox" !== e.field_type && "html" !== e.field_type }), n
            }
            return i(t, e), l(t, [{ key: "updateState", value: function(e) { this.props.updateProperty("conditions", e) } }, {
                key: "getPropState",
                value: function() {
                    var e = [];
                    return _.each(this.props.state.conditions, function(t) {
                        var n = Object.assign({}, t);
                        e.push(n)
                    }), e
                }
            }, {
                key: "updateField",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].element_id = t, n[e].rule = "is", n[e].value = "", this.updateState(n)
                }
            }, {
                key: "updateRule",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].rule = t, this.updateState(n)
                }
            }, {
                key: "updateValue",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].value = t, this.updateState(n)
                }
            }, {
                key: "updateInputValue",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].value = t, this.updateState(n)
                }
            }, {
                key: "removeRule",
                value: function(e) {
                    var t = this.getPropState();
                    t.splice(e, 1), this.updateState(t)
                }
            }, {
                key: "addRule",
                value: function() {
                    var e = "",
                        t = this.getPropState(),
                        n = _.isUndefined(this.fields[0]) ? "" : this.fields[0].element_id,
                        r = _.isUndefined(this.questions[0]) ? "" : this.questions[0].slug;
                    _.isEmpty(this.fields) || (e = n), _.isEmpty(this.questions) || (e = r), t.push({ element_id: e, rule: "is", value: "" }), this.updateState(t)
                }
            }, {
                key: "removeCondition",
                value: function(e) {
                    var t = this.getPropState(),
                        n = _.filter(t, function(t) { return !_.contains(e, t.element_id) });
                    this.updateState(n)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = c.default.createElement("div", { className: "fui-visibility-options" }, c.default.createElement("div", { className: "fui-visibility-option" }, c.default.createElement(m.default, s({}, this.props, { settings: this.props.state, property: "condition_action", defaultValue: "send", noWrapper: !0 }), c.default.createElement("span", { value: "send" }, (0, f.translate)("Send")), c.default.createElement("span", { value: "dont-send" }, (0, f.translate)("Don't Send"))), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("this email if"))), c.default.createElement("div", { className: "fui-visibility-option" }, c.default.createElement(m.default, s({}, this.props, { settings: this.props.state, property: "condition_rule", defaultValue: "all", noWrapper: !0 }), c.default.createElement("span", { value: "all" }, (0, f.translate)("All")), c.default.createElement("span", { value: "any" }, (0, f.translate)("Any"))), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("of the following rules match:")))),
                        n = c.default.createElement("div", { className: "fui-visibility-group" }, (!_.isEmpty(this.fields) || !_.isEmpty(this.questions)) && c.default.createElement("div", { className: "fui-visibility-header" }, t, c.default.createElement("label", { className: "sui-label" }, (0, f.translate)("Conditions"))), c.default.createElement("div", { className: "fui-visibility" }, c.default.createElement("div", { className: "fui-visibility-empty-message" }, (!_.isEmpty(this.fields) || !_.isEmpty(this.questions)) && c.default.createElement("button", { accessKey: "a", onClick: this.addRule }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Conditions")), c.default.createElement("p", null, (0, f.translate)("By default, this email is always sent on form submission. You can add conditions to send this email conditionally based on user input.")), powerformData.showBranding && c.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-visibility.png", srcSet: powerformData.imagesUrl + "/powerform-visibility.png 1x,\n\t\t\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-visibility@2x.png 2x", className: "sui-image sui-image-center" }))));
                    return (_.isUndefined(this.props.state.conditions) || 0 === this.props.state.conditions.length) && c.default.createElement(c.default.Fragment, null, n), _.isUndefined(this.props.state.conditions) || !(this.props.state.conditions.length > 0) || _.isEmpty(this.fields) && _.isEmpty(this.questions) ? c.default.createElement(c.default.Fragment, null, n) : c.default.createElement("div", { className: "fui-visibility-group" }, (!_.isEmpty(this.fields) || !_.isEmpty(this.questions)) && c.default.createElement("div", { className: "fui-visibility-header" }, t, c.default.createElement("label", { className: "sui-label" }, (0, f.translate)("Conditions"))), c.default.createElement("div", { className: "fui-visibility" }, c.default.createElement("div", { className: "fui-visibility-rules" }, _.map(this.props.state.conditions, function(t, n) { return c.default.createElement(d.default, s({}, e.props, { rule: t, key: n, counter: n, removeRule: e.removeRule, updateField: e.updateField, updateRule: e.updateRule, updateValue: e.updateValue, updateInputValue: e.updateInputValue, fields: e.fields, questions: e.questions })) }))), c.default.createElement("button", { className: "sui-button sui-button-blue", accessKey: "a", onClick: this.addRule }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Rule")))
                }
            }]), t
        }(u.Component);
    t.default = y
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(9),
        d = r(p),
        h = n(4),
        m = r(h),
        y = n(2),
        b = r(y),
        v = n(12),
        g = r(v),
        E = n(22),
        w = r(E),
        O = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.toggleState = n.toggleState.bind(n), n.updateField = n.updateField.bind(n), n.updateRule = n.updateRule.bind(n), n.updateValue = n.updateValue.bind(n), n.updateInputValue = n.updateInputValue.bind(n), n.state = { open: !1 }, n.fields = n.props.fields, n.questions = n.props.questions, n }
            return i(t, e), l(t, [{ key: "removeRule", value: function() { this.props.removeRule(this.props.counter) } }, { key: "updateField", value: function(e, t) { this.props.updateField(this.props.counter, t) } }, { key: "updateRule", value: function(e, t) { this.props.updateRule(this.props.counter, t) } }, { key: "updateValue", value: function(e) { this.props.updateValue(this.props.counter, e.target.value) } }, { key: "updateInputValue", value: function(e, t) { this.props.updateInputValue(this.props.counter, t) } }, { key: "toggleState", value: function() { this.setState({ open: !this.state.open }) } }, { key: "disableSearch", value: function() { return { minimumResultsForSearch: -1 } } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = "condition-" + this.props.counter,
                        n = _.where(this.fields, { element_id: this.props.rule.element_id })[0] || {},
                        r = _.where(this.questions, { slug: this.props.rule.element_id })[0] || {},
                        a = _.isEmpty(n) ? r.title : n.label,
                        o = _.isUndefined(this.props.rule.element_id) || "final_result" !== this.props.rule.element_id ? a : (0, f.translate)("Final Score"),
                        i = _.isEmpty(this.props.rule.value) ? (0, f.translate)("null") : this.props.rule.value,
                        l = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        u = ["day_is", "day_is_not", "month_is", "month_is_not"],
                        p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
                    return c.default.createElement("div", { className: "sui-box fui-visibility-rule" + (!0 === this.state.open ? " fui-open" : "") }, c.default.createElement("h4", { className: "fui-visibility-rule-header" }, c.default.createElement("button", { id: "powerform-field-" + t, className: "sui-box-header", "aria-controls": "powerform-field-" + t + "-content", "aria-expanded": this.state.open, onClick: function() { return e.toggleState() } }, c.default.createElement("i", { className: "sui-icon-link fui-visibility-rule-icon", "aria-hidden": "true" }), c.default.createElement("span", { className: "fui-visibility-rule-text" }, c.default.createElement("strong", null, o), " ", (0, f.getRuleLabel)(this.props.rule.rule, n.field_type), " ", c.default.createElement("strong", null, i)), c.default.createElement("i", { className: "sui-icon-chevron-down fui-visibility-rule-arrow", "aria-hidden": "true" }))), c.default.createElement("div", { role: "region", id: "powerform-field-" + t + "-content", className: "sui-box-body fui-visibility-rule-body", "aria-labelledby": "powerform-field-" + t, "aria-hidden": !0 !== this.state.open }, c.default.createElement(g.default, s({}, this.props, { elementId: t + "-field", property: "element_id", updateProperty: this.updateField, settings: this.props.rule, label: (0, f.translate)("Field") }), !_.isEmpty(this.fields) && c.default.createElement("optgroup", { label: (0, f.translate)("Form Data") }, _.map(this.fields, function(e, t) { return c.default.createElement("option", { value: e.element_id, key: t }, e.label, " | ", e.element_id) })), !_.isEmpty(this.questions) && c.default.createElement("optgroup", { label: (0, f.translate)("Quiz Data") }, _.map(this.questions, function(e, t) { return c.default.createElement("option", { value: e.slug, key: t }, e.title, " | ", e.slug) }), c.default.createElement("option", { value: "final_result" }, (0, f.translate)("Final Score")))), c.default.createElement(d.default, null, c.default.createElement(m.default, { cols: "6" }, c.default.createElement(w.default, s({}, this.props, { elementId: t + "-condrule", settings: this.props.rule, property: "rule", updateProperty: this.updateRule, label: (0, f.translate)("Condition (required)"), options: this.disableSearch() }), c.default.createElement("option", { value: "" }, (0, f.translate)("Select rule")), !_.isEmpty(r) && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is_correct" }, (0, f.translate)("Is correct")), c.default.createElement("option", { value: "is_incorrect" }, (0, f.translate)("Is incorrect"))), "final_result" === this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "contains" }, (0, f.translate)("Contains")), c.default.createElement("option", { value: "is_great" }, (0, f.translate)("greater than")), c.default.createElement("option", { value: "is_less" }, (0, f.translate)("less than"))), "checkbox" === n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is" }, (0, f.translate)("Having")), c.default.createElement("option", { value: "is_not" }, (0, f.translate)("Not having"))), "signature" === n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is" }, (0, f.translate)("Is null")), c.default.createElement("option", { value: "is_not" }, (0, f.translate)("Is not null"))), "checkbox" !== n.field_type && "signature" !== n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is" }, (0, f.translate)("Is")), c.default.createElement("option", { value: "is_not" }, (0, f.translate)("Is not"))), n.isNumber && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is_great" }, (0, f.translate)("Is great")), c.default.createElement("option", { value: "is_less" }, (0, f.translate)("Is less"))), !n.isNumber && !n.hasOptions && "signature" !== n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "contains" }, (0, f.translate)("Contains")), c.default.createElement("option", { value: "starts" }, (0, f.translate)("Starts")), c.default.createElement("option", { value: "ends" }, (0, f.translate)("Ends"))), "date" === n.field_type && ("date-day" === n.field_slug || "date" === n.field_slug) && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "day_is" }, (0, f.translate)("Day is")), c.default.createElement("option", { value: "day_is_not" }, (0, f.translate)("Day is not"))), "date" === n.field_type && "signature" !== n.field_type && ("date-month" === n.field_slug || "date" === n.field_slug) && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "month_is" }, (0, f.translate)("Month is")), c.default.createElement("option", { value: "month_is_not" }, (0, f.translate)("Month is not"))))), c.default.createElement(m.default, { cols: "6" }, n.hasOptions && c.default.createElement(c.default.Fragment, null, c.default.createElement("label", { className: "sui-label" }, " "), c.default.createElement("select", { className: "fui-select", value: this.props.rule.value, onChange: this.updateValue.bind(this) }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select option")), _.map(n.values, function(e, t) { return c.default.createElement("option", { value: e.value, key: t }, e.label) }))), !n.hasOptions && "signature" !== n.field_type && (!u.includes(this.props.rule.rule) || "date" !== n.field_type) && _.isEmpty(r) && c.default.createElement(b.default, s({}, this.props, { settings: this.props.rule, inputId: t + "-value", property: "value", updateProperty: this.updateInputValue, label: (0, f.translate)("Value") })), !n.hasOptions && "date" === n.field_type && ("month_is" === this.props.rule.rule === "month_is" || "month_is_not" === this.props.rule.rule) && c.default.createElement(c.default.Fragment, null, c.default.createElement("label", { className: "sui-label" }, " "), c.default.createElement("select", { className: "fui-select", value: this.props.rule.value, onChange: this.updateValue.bind(this) }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select month")), _.map(l, function(e) { return c.default.createElement("option", { value: e, key: e }, e) }))), !n.hasOptions && "date" === n.field_type && ("day_is" === this.props.rule.rule || "day_is_not" === this.props.rule.rule) && c.default.createElement(c.default.Fragment, null, c.default.createElement("label", { className: "sui-label" }, " "), c.default.createElement("select", { className: "fui-select", value: this.props.rule.value, onChange: this.updateValue.bind(this) }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select day")), _.map(p, function(e) { return c.default.createElement("option", { value: e, key: e }, e) }))))), c.default.createElement("div", { className: "fui-visibility-rule-footer" }, c.default.createElement("button", { className: "sui-button sui-button-red sui-button-ghost", onClick: this.removeRule.bind(this) }, c.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, f.translate)("Delete")), c.default.createElement("button", { className: "sui-button sui-button-ghost", onClick: function() { return e.toggleState() } }, (0, f.translate)("Done")))))
                }
            }]), t
        }(u.Component);
    t.default = O
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(213),
        d = r(p),
        h = function(e) {
            function t(e) {
                a(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                n.addRule = n.addRule.bind(n), n.removeRule = n.removeRule.bind(n), n.updateValue = n.updateValue.bind(n), n.updateField = n.updateField.bind(n), n.updateRule = n.updateRule.bind(n), n.updateRuleValue = n.updateRuleValue.bind(n), n.updateInputValue = n.updateInputValue.bind(n), n.fields = _.isUndefined(n.props.settings.wrappers) ? [] : n.props.settings.wrappers, n.fields = (0, f.getFields)(n.fields), n.fields = _.filter(n.fields, function(e) { return "gdprcheckbox" !== e.field_type && "html" !== e.field_type });
                var r = [];
                return _.each(n.props.questions, function(e) {
                    var t = Object.assign({}, e);
                    r.push(t)
                }), n.questions = r, n
            }
            return i(t, e), l(t, [{ key: "updateState", value: function(e) { this.props.updateProperty("routing", e) } }, {
                key: "getPropState",
                value: function() {
                    var e = [];
                    return _.each(this.props.state.routing, function(t) {
                        var n = Object.assign({}, t);
                        e.push(n)
                    }), e
                }
            }, {
                key: "updateField",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].element_id = t, n[e].rule = "is", n[e].value = "", this.updateState(n)
                }
            }, {
                key: "updateValue",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].email = t, this.updateState(n)
                }
            }, {
                key: "updateRule",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].rule = t, this.updateState(n)
                }
            }, {
                key: "updateRuleValue",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].value = t, this.updateState(n)
                }
            }, {
                key: "updateInputValue",
                value: function(e, t) {
                    var n = this.getPropState();
                    n[e].value = t, this.updateState(n)
                }
            }, {
                key: "removeRule",
                value: function(e) {
                    var t = this.getPropState();
                    t.splice(e, 1), this.updateState(t)
                }
            }, {
                key: "addRule",
                value: function() {
                    var e = "",
                        t = this.getPropState(),
                        n = _.isUndefined(this.fields[0]) ? "" : this.fields[0].element_id,
                        r = _.isUndefined(this.questions[0]) ? "" : this.questions[0].slug;
                    _.isEmpty(this.fields) || (e = n), _.isEmpty(this.questions) || (e = r), t.push({ email: "", element_id: e, rule: "is", value: "" }), this.updateState(t)
                }
            }, {
                key: "removeCondition",
                value: function(e) {
                    var t = this.getPropState(),
                        n = _.filter(t, function(t) { return !_.contains(e, t.element_id) });
                    this.updateState(n)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = c.default.createElement("div", { className: "fui-visibility-group" }, c.default.createElement("div", { className: "fui-visibility", style: { marginTop: "0" } }, c.default.createElement("div", { className: "fui-visibility-empty-message" }, (!_.isEmpty(this.fields) || !_.isEmpty(this.questions)) && c.default.createElement("button", { accessKey: "a", onClick: this.addRule }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Rule")), c.default.createElement("p", null, (0, f.translate)('You haven\'t defined any email routing rules yet. Click on the "+ Add Rule" button to add the recipients along with the routing rules.')), powerformData.showBranding && c.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-visibility.png", srcSet: powerformData.imagesUrl + "/powerform-visibility.png 1x,\n\t\t\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-visibility@2x.png 2x", className: "sui-image sui-image-center" }))));
                    return (_.isUndefined(this.props.state.routing) || 0 === this.props.state.routing.length) && c.default.createElement(c.default.Fragment, null, t), _.isUndefined(this.props.state.routing) || !(this.props.state.routing.length > 0) || _.isEmpty(this.fields) && _.isEmpty(this.questions) ? c.default.createElement(c.default.Fragment, null, t) : c.default.createElement("div", { className: "fui-visibility-group" }, c.default.createElement("div", { className: "fui-visibility", style: { marginTop: "0" } }, c.default.createElement("div", { className: "fui-visibility-rules" }, _.map(this.props.state.routing, function(t, n) { return c.default.createElement(d.default, s({}, e.props, { rule: t, key: n, counter: n, removeRule: e.removeRule, updateValue: e.updateValue, updateField: e.updateField, updateRule: e.updateRule, updateRuleValue: e.updateRuleValue, updateInputValue: e.updateInputValue, fields: e.fields, questions: e.questions })) }))), c.default.createElement("button", { className: "sui-button sui-button-blue", accessKey: "a", onClick: this.addRule }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Rule")))
                }
            }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(9),
        d = r(p),
        h = n(4),
        m = r(h),
        y = n(2),
        b = r(y),
        v = n(12),
        g = r(v),
        E = n(22),
        w = r(E),
        O = n(41),
        j = r(O),
        P = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.toggleState = n.toggleState.bind(n), n.updateValue = n.updateValue.bind(n), n.updateField = n.updateField.bind(n), n.updateRule = n.updateRule.bind(n), n.updateRuleValue = n.updateRuleValue.bind(n), n.updateInputValue = n.updateInputValue.bind(n), n.state = { open: !1 }, n.fields = n.props.fields, n.questions = n.props.questions, n }
            return i(t, e), l(t, [{ key: "removeRule", value: function() { this.props.removeRule(this.props.counter) } }, { key: "updateValue", value: function(e, t) { this.props.updateValue(this.props.counter, t) } }, { key: "updateField", value: function(e, t) { this.props.updateField(this.props.counter, t) } }, { key: "updateRule", value: function(e, t) { this.props.updateRule(this.props.counter, t) } }, { key: "updateRuleValue", value: function(e) { this.props.updateRuleValue(this.props.counter, e.target.value) } }, { key: "updateInputValue", value: function(e, t) { this.props.updateInputValue(this.props.counter, t) } }, { key: "toggleState", value: function() { this.setState({ open: !this.state.open }) } }, { key: "disableSearch", value: function() { return { minimumResultsForSearch: -1 } } }, { key: "getEmailOptions", value: function() { var e = []; return _.map(powerformData.variables, function(t, n) { e.push({ label: t, value: n }) }), e } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = "routing-" + this.props.counter,
                        n = _.where(this.fields, { element_id: this.props.rule.element_id })[0] || {},
                        r = _.where(this.questions, { slug: this.props.rule.element_id })[0] || {},
                        a = _.isEmpty(n) ? r.title : n.label,
                        o = _.isUndefined(this.props.rule.element_id) || "final_result" !== this.props.rule.element_id ? a : (0, f.translate)("Final Score"),
                        i = _.isEmpty(this.props.rule.value) ? (0, f.translate)("null") : this.props.rule.value,
                        l = _.isEmpty(this.props.rule.email) ? "" : this.props.rule.email,
                        u = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        p = ["day_is", "day_is_not", "month_is", "month_is_not"],
                        h = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
                    return c.default.createElement("div", { className: "sui-box fui-visibility-rule" + (!0 === this.state.open ? " fui-open" : "") }, c.default.createElement("h4", { className: "fui-visibility-rule-header" }, c.default.createElement("button", { id: "powerform-field-" + t, className: "sui-box-header", "aria-controls": "powerform-field-" + t + "-content", "aria-expanded": this.state.open, onClick: function() { return e.toggleState() } }, c.default.createElement("i", { className: "sui-icon-sitemap fui-visibility-rule-icon", "aria-hidden": "true" }), c.default.createElement("span", { className: "fui-visibility-rule-text" }, (0, f.translate)('Send to {{strong}}"%(label)s"{{/strong}} if {{strong}}%(field)s{{/strong}} %(rule)s {{strong}}%(value)s{{/strong}}', { args: { label: l, field: o, rule: (0, f.getRuleLabel)(this.props.rule.rule, n.field_type), value: i }, components: { strong: c.default.createElement("strong", null) } })), c.default.createElement("i", { className: "sui-icon-chevron-down fui-visibility-rule-arrow", "aria-hidden": "true" }))), c.default.createElement("div", { role: "region", id: "powerform-field-" + t + "-content", className: "sui-box-body fui-visibility-rule-body", "aria-labelledby": "powerform-field-" + t, "aria-hidden": !0 !== this.state.open }, c.default.createElement(j.default, s({}, this.props, { property: "email", placeholder: (0, f.translate)("E.g. sales@website.com"), label: (0, f.translate)("Recipients"), settings: this.props.rule, value: this.props.rule.email, required: "true", note: (0, f.translate)("Separate multiple emails with a comma"), onChange: this.updateValue.bind(this) }), this.getEmailOptions().map(function(e, t) { return c.default.createElement("option", { key: t, value: e.value, "data-content": e.value }, e.label) })), c.default.createElement(d.default, { class: "sui-align-bottom sui-spacing-10" }, c.default.createElement(m.default, { cols: "6", customClass: "sui-padding-right-10" }, c.default.createElement(g.default, s({}, this.props, { elementId: t + "-field", property: "element_id", updateProperty: this.updateField, settings: this.props.rule, label: (0, f.translate)("Routing Condition") }), !_.isEmpty(this.fields) && c.default.createElement("optgroup", { label: (0, f.translate)("Form Data") }, _.map(this.fields, function(e, t) { return c.default.createElement("option", { value: e.element_id, key: t }, e.label, " | ", e.element_id) })), !_.isEmpty(this.questions) && c.default.createElement("optgroup", { label: (0, f.translate)("Quiz Data") }, _.map(this.questions, function(e, t) { return c.default.createElement("option", { value: e.slug, key: t }, e.title, " | ", e.slug) }), c.default.createElement("option", { value: "final_result" }, (0, f.translate)("Final Score"))))), c.default.createElement(m.default, { cols: "6", customClass: "sui-padding-left-10" }, c.default.createElement(w.default, s({}, this.props, { elementId: t + "-condrule", settings: this.props.rule, property: "rule", updateProperty: this.updateRule, options: this.disableSearch() }), c.default.createElement("option", { value: "" }, (0, f.translate)("Select rule")), !_.isEmpty(r) && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is_correct" }, (0, f.translate)("Is correct")), c.default.createElement("option", { value: "is_incorrect" }, (0, f.translate)("Is incorrect"))), "final_result" === this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "contains" }, (0, f.translate)("Contains")), c.default.createElement("option", { value: "is_great" }, (0, f.translate)("greater than")), c.default.createElement("option", { value: "is_less" }, (0, f.translate)("less than"))), "checkbox" === n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is" }, (0, f.translate)("Having")), c.default.createElement("option", { value: "is_not" }, (0, f.translate)("Not having"))), "signature" === n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is" }, (0, f.translate)("Is null")), c.default.createElement("option", { value: "is_not" }, (0, f.translate)("Is not null"))), "checkbox" !== n.field_type && "signature" !== n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is" }, (0, f.translate)("Is")), c.default.createElement("option", { value: "is_not" }, (0, f.translate)("Is not"))), n.isNumber && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "is_great" }, (0, f.translate)("Is great")), c.default.createElement("option", { value: "is_less" }, (0, f.translate)("Is less"))), !n.isNumber && !n.hasOptions && "signature" !== n.field_type && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "contains" }, (0, f.translate)("Contains")), c.default.createElement("option", { value: "starts" }, (0, f.translate)("Starts")), c.default.createElement("option", { value: "ends" }, (0, f.translate)("Ends"))), "date" === n.field_type && ("date-day" === n.field_slug || "date" === n.field_slug) && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "day_is" }, (0, f.translate)("Day is")), c.default.createElement("option", { value: "day_is_not" }, (0, f.translate)("Day is not"))), "date" === n.field_type && "signature" !== n.field_type && ("date-month" === n.field_slug || "date" === n.field_slug) && _.isEmpty(r) && "final_result" !== this.props.rule.element_id && c.default.createElement(c.default.Fragment, null, c.default.createElement("option", { value: "month_is" }, (0, f.translate)("Month is")), c.default.createElement("option", { value: "month_is_not" }, (0, f.translate)("Month is not")))))), c.default.createElement(d.default, null, c.default.createElement(m.default, { cols: "12" }, n.hasOptions && c.default.createElement(c.default.Fragment, null, c.default.createElement("label", { className: "sui-label" }, " "), c.default.createElement("select", { className: "fui-select", value: this.props.rule.value, onChange: this.updateRuleValue.bind(this) }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select option")), _.map(n.values, function(e, t) { return c.default.createElement("option", { value: e.value, key: t }, e.label) }))), !n.hasOptions && "signature" !== n.field_type && (!p.includes(this.props.rule.rule) || "date" !== n.field_type) && _.isEmpty(r) && c.default.createElement(b.default, s({}, this.props, { settings: this.props.rule, inputId: t + "-value", property: "value", updateProperty: this.updateInputValue, label: (0, f.translate)("Value") })), !n.hasOptions && "date" === n.field_type && ("month_is" === this.props.rule.rule === "month_is" || "month_is_not" === this.props.rule.rule) && c.default.createElement(c.default.Fragment, null, c.default.createElement("label", { className: "sui-label" }, " "), c.default.createElement("select", { className: "fui-select", value: this.props.rule.value, onChange: this.updateRuleValue.bind(this) }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select month")), _.map(u, function(e) { return c.default.createElement("option", { value: e, key: e }, e) }))), !n.hasOptions && "date" === n.field_type && ("day_is" === this.props.rule.rule || "day_is_not" === this.props.rule.rule) && c.default.createElement(c.default.Fragment, null, c.default.createElement("label", { className: "sui-label" }, " "), c.default.createElement("select", { className: "fui-select", value: this.props.rule.value, onChange: this.updateRuleValue.bind(this) }, c.default.createElement("option", { value: "" }, (0, f.translate)("Select day")), _.map(h, function(e) { return c.default.createElement("option", { value: e, key: e }, e) }))))), c.default.createElement("div", { className: "fui-visibility-rule-footer" }, c.default.createElement("button", { className: "sui-button sui-button-red sui-button-ghost", onClick: this.removeRule.bind(this) }, c.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, f.translate)("Delete")), c.default.createElement("button", { className: "sui-button sui-button-ghost", onClick: function() { return e.toggleState() } }, (0, f.translate)("Done")))))
                }
            }]), t
        }(u.Component);
    t.default = P
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.props.modal.modalProps.closeModal.bind(n), n.trashField = n.trashField.bind(n), n }
            return o(t, e), i(t, [{ key: "trashField", value: function() { this.props.modal.modalProps.trashField(), this.closeModal() } }, { key: "render", value: function() { return l.default.createElement(l.default.Fragment, null, l.default.createElement("div", { className: "sui-box-header sui-block-content-center" }, l.default.createElement("h3", { className: "sui-box-title", id: "dialogTitle" }, (0, u.translate)("Delete Notification")), l.default.createElement("button", { className: "sui-dialog-close powerform-builder-fields-close", "aria-label": (0, u.translate)("Close this dialog window"), onClick: this.closeModal })), l.default.createElement("div", { className: "sui-box-body sui-box-body-slim sui-block-content-center" }, l.default.createElement("p", { className: "sui-description" }, (0, u.translate)("Are you sure you wish to delete this Notification?"))), l.default.createElement("div", { className: "sui-box-footer sui-box-footer-center", style: { paddingTop: "0" } }, l.default.createElement("button", { className: "sui-button sui-button-ghost powerform-discard-field-settings", onClick: this.closeModal }, (0, u.translate)("Cancel")), l.default.createElement("button", { className: "sui-button sui-button-ghost sui-button-red", onClick: this.trashField }, l.default.createElement("span", { className: "sui-loading-text" }, l.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, u.translate)("DELETE"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.updateValue = n.updateValue.bind(n), n }
            return o(t, e), i(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), SUI.suiSelect(this.$el), this.updateValue = this.updateValue.bind(this), this.$el.on("change", this.updateValue) } }, {
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

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(68),
        d = r(p),
        h = n(74),
        m = r(h),
        y = n(30),
        b = r(y),
        v = n(217),
        g = r(v),
        E = n(218),
        w = r(E),
        O = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { publishLoading: !1, draftLoading: !1 }, n.publish = n.publish.bind(n), n.draft = n.draft.bind(n), n }
            return i(t, e), l(t, [{
                key: "publish",
                value: function() {
                    var e = this,
                        t = this.props,
                        n = t.state,
                        r = t.type,
                        a = n.settings,
                        o = a.form_id,
                        i = a.formName,
                        s = _.isUndefined(i) ? "" : i,
                        l = _.isUndefined(o) ? -1 : o;
                    this.setState({ publishLoading: !0 });
                    var u = { action: "powerform_save_quiz_" + r, _wpnonce: powerformData.formNonce, formName: s, form_id: l, status: "publish", version: powerformData.version, data: JSON.stringify(n) };
                    setTimeout(function() { e.save(u, "publish") }, 1500)
                }
            }, {
                key: "draft",
                value: function() {
                    var e = this,
                        t = this.props,
                        n = t.state,
                        r = t.type,
                        a = n.settings,
                        o = a.form_id,
                        i = a.formName,
                        s = _.isUndefined(i) ? "" : i,
                        l = _.isUndefined(o) ? -1 : o;
                    this.setState({ draftLoading: !0 });
                    var u = { action: "powerform_save_quiz_" + r, _wpnonce: powerformData.formNonce, formName: s, form_id: l, status: "draft", version: powerformData.version, data: JSON.stringify(n) };
                    setTimeout(function() { e.save(u, "draft") }, 1500)
                }
            }, {
                key: "save",
                value: function(e, t) {
                    var n = this,
                        r = this,
                        a = this.props,
                        o = a.status,
                        i = a.type;
                    d.default.post(powerformData.ajaxUrl, m.default.stringify(e)).then(function(a) {
                        if (a.data.success) - 1 === e.form_id && (n.props.actions.settingsActions.updateSetting("form_id", a.data.data), powerformData.currentForm.settings.form_id = a.data.data, "knowledge" === i ? window.history.pushState({}, "Edit Knowledge Quiz", powerformData.knowledgeEditUrl + "&id=" + a.data.data) : window.history.pushState({}, "Edit No Wrong Quiz", powerformData.noWrongEditUrl + "&id=" + a.data.data)), n.props.actions.settingsActions.saveBuilder("form_status", t), ("draft" === o && "publish" === t || _.isUndefined(o) && "publish" === t) && setTimeout(function() {
                            var e = function(e) { r.props.actions.modalActions.showModal({ open: !1 }, "shortcode") };
                            r.props.actions.modalActions.showModal({ open: !0, closeModal: e }, "shortcode")
                        }, 50);
                        else { new b.default({ type: "error", text: (0, f.translate)("Something went wrong while saving your form. Please try again.") }).open() }
                        n.setState({ publishLoading: !1, draftLoading: !1 })
                    }).catch(function(e) { new b.default({ type: "error", text: (0, f.translate)("Something went wrong while saving your form. Please try again.") }).open(), console.log(e), n.setState({ publishLoading: !1, draftLoading: !1 }) })
                }
            }, { key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-status" }, c.default.createElement(g.default, s({}, this.props, { state: this.state })), c.default.createElement(w.default, s({}, this.props, { publish: this.publish, draft: this.draft, state: this.state }))) } }]), t
        }(u.Component);
    t.default = O
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.status,
            n = "publish" === t ? "sui-tag-published" : "sui-tag-draft",
            r = !(!e.state.draftLoading && !e.state.publishLoading);
        return o.default.createElement("div", { className: "sui-status" }, o.default.createElement("div", { className: "sui-status-module" }, "Status", o.default.createElement("span", { className: "sui-tag " + n }, function() {
            switch (t) {
                case "publish":
                    return (0, i.translate)("Published");
                default:
                    return (0, i.translate)("Draft")
            }
        }())), r && o.default.createElement("div", { className: "sui-status-changes" }, o.default.createElement("i", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" }), (0, i.translate)("Saving...")), !r && e.changed.settings && o.default.createElement("div", { className: "sui-status-changes" }, o.default.createElement("i", { className: "sui-icon-update", "aria-hidden": "true" }), (0, i.translate)("Unsaved changes")), !r && !e.changed.settings && e.changed.saved && o.default.createElement("div", { className: "sui-status-changes" }, o.default.createElement("i", { className: "sui-icon-check-tick", "aria-hidden": "true" }), (0, i.translate)("Saved")))
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r;
    var a = n(0),
        o = function(e) { return e && e.__esModule ? e : { default: e } }(a),
        i = n(1)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(219),
        d = r(p),
        h = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.publish = n.publish.bind(n), n.draft = n.draft.bind(n), n }
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
                    return c.default.createElement("div", { className: "sui-actions" }, c.default.createElement("button", { id: "powerform-module-save", className: "sui-button sui-button-ghost", style: { borderColor: "transparent" }, disabled: !!n || r, onClick: this.draft }, "publish" === e && c.default.createElement(u.Fragment, null, c.default.createElement("span", { className: "sui-icon-unpublish", "aria-hidden": "true" }), (0, f.translate)("Unpublish")), "publish" !== e && c.default.createElement(u.Fragment, null, c.default.createElement("span", { className: "sui-icon-save", "aria-hidden": "true" }), (0, f.translate)("Save Draft"))), c.default.createElement(d.default, s({}, this.props, { disabled: !(!n && !r) })), c.default.createElement("button", { id: "powerform-module-publish", className: "sui-button sui-button-blue", disabled: !(!n && !r), onClick: this.publish }, c.default.createElement("span", { className: "sui-loading-text" }, c.default.createElement("span", { className: "sui-icon-web-globe-world", "aria-hidden": "true" }), c.default.createElement("span", { className: "button-text" }, function() {
                        switch (e) {
                            case "publish":
                                return (0, f.translate)("Update");
                            default:
                                return (0, f.translate)("Publish")
                        }
                    }())), c.default.createElement("span", { className: "sui-icon-loader sui-loading", "aria-hidden": "true" })))
                }
            }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.closeModal.bind(n), n.openModal = n.openModal.bind(n), n }
            return o(t, e), i(t, [{ key: "closeModal", value: function(e) { this.props.actions.modalActions.showModal({ open: !1, title: (0, u.translate)("Preview") }, "preview"), jQuery("#powerform-quiz-styles-" + this.props.id).remove() } }, { key: "openModal", value: function(e) { this.props.actions.modalActions.showModal({ open: !0, title: "Preview", closeModal: this.closeModal }, "preview") } }, { key: "render", value: function() { return l.default.createElement("button", { id: "powerform-preview-button", className: "sui-button sui-sidenav-hide-md", accessKey: "p", onClick: this.openModal, disabled: this.props.disabled }, l.default.createElement("i", { className: "sui-icon-eye", "aria-hidden": "true" }), " ", (0, u.translate)("Preview")) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(2),
        d = r(p),
        h = n(77),
        m = r(h),
        y = n(32),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return c.default.createElement("div", { id: "powerform-form-fields", className: "sui-box" }, c.default.createElement("div", { className: "sui-box-header" }, c.default.createElement("h2", { className: "sui-box-title" }, (0, f.translate)("Intro"))), c.default.createElement("div", { className: "sui-box-body" }, c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, f.translate)("Title")), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Start by adding a title for your quiz to let your visitors know what this quiz is all about."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Title"), type: "text", placeholder: (0, f.translate)("Which superhero are you?"), description: (0, f.translate)("Choose a title to grab the attention of your visitors."), property: "quiz_name" })))), c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, f.translate)("Feature Image")), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Upload a nice feature image for your quiz."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(m.default, s({}, this.props, { type: "image", label: (0, f.translate)("Upload Feature Image"), property: "quiz_feat_image", imageSize: "large" })))), c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, f.translate)("Description")), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Provide your visitors with more information about your quiz."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(b.default, s({}, this.props, { property: "quiz_description", editorOptions: powerformData.variables, enableFormData: !1, boxClass: "sui-tab-boxed", label: "", mainOptions: { quiz_name: (0, f.translate)("Quiz Name") } })))))), c.default.createElement("div", { className: "sui-box-footer" }, c.default.createElement("div", { className: "sui-actions-right" }, "knowledge" === this.props.type && c.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("questions") } }, (0, f.translate)("Questions"), c.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })), "personality" === this.props.type && c.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("personalities") } }, (0, f.translate)("Personalities"), c.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(222),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-fields", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Questions"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(p.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, "knowledge" === this.props.type && u.default.createElement("button", { className: "sui-button", onClick: function() { return t("") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Intro")), "personality" === this.props.type && u.default.createElement("button", { className: "sui-button", onClick: function() { return t("personalities") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Personalities")), u.default.createElement("div", { className: "sui-actions-right" }, this.props.hasLead && u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("leads") } }, (0, c.translate)("Leads"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })), !this.props.hasLead && u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("appearance") } }, (0, c.translate)("Appearance"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(223),
        d = r(p),
        h = n(224),
        m = r(h),
        y = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.addQuestion = n.addQuestion.bind(n), n.closeModal = n.closeModal.bind(n), n }
            return i(t, e), l(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), this.moveOption = this.moveOption.bind(this), this.initSortable() } }, { key: "componentDidUpdate", value: function(e) { _.isEmpty(e.questions) && !_.isEmpty(this.props.questions) && this.initSortable() } }, {
                key: "initSortable",
                value: function() {
                    var e = this;
                    this.$el.find(".sui-builder-fields").sortable({
                        stop: function(t, n) {
                            var r = n.item.index();
                            e.$el.find(".sui-builder-fields").sortable("cancel");
                            var a = n.item.index();
                            e.moveOption(a, r)
                        }
                    })
                }
            }, { key: "componentWillUnmount", value: function() { this.$el.unbind().removeData() } }, {
                key: "moveOption",
                value: function(e, t) {
                    var n = this.props.questions;
                    n.splice(t, 0, n.splice(e, 1)[0]), this.props.actions.builderActions.updateQuestions(n), this.forceUpdate()
                }
            }, { key: "closeModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "question") } }, {
                key: "addQuestion",
                value: function() {
                    var e = { slug: "question-" + (0, f.randNumber)() + "-" + (0, f.randNumber)(), answers: [] };
                    this.props.actions.modalActions.showModal({ open: !0, new: !0, type: this.props.type, results: this.props.results || {}, question: e, questions: this.props.questions, closeModal: this.closeModal }, "question")
                }
            }, { key: "render", value: function() { var e = this; return c.default.createElement("div", { className: "sui-box-builder sui-flushed", ref: function(t) { return e.el = t } }, c.default.createElement("div", { className: "sui-box-builder-body" }, this.props.questions.length > 0 && c.default.createElement("div", { className: "sui-builder-fields" }, _.map(this.props.questions, function(t, n) { return c.default.createElement(d.default, s({ key: t.slug, question: t }, e.props, { counter: n })) })), c.default.createElement("button", { className: "sui-button sui-button-dashed", onClick: this.addQuestion }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Question")), 0 === this.props.questions.length && c.default.createElement("div", { className: "sui-builder-empty-message sui-block-content-center" }, c.default.createElement("p", { className: "sui-description" }, (0, f.translate)("A quiz without questions is not going to be very useful… Add your questions above!")), powerformData.showBranding && c.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-create-modal.png", srcSet: powerformData.imagesUrl + "/powerform-create-modal.png 1x,\n\t\t\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-create-modal@2x.png 2x", className: "sui-image sui-image-center" }))), c.default.createElement(m.default, this.props)) } }]), t
        }(u.Component);
    t.default = y
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.trashQuestion = n.trashQuestion.bind(n), n.deleteQuestion = n.deleteQuestion.bind(n), n.closeDeleteField = n.closeDeleteField.bind(n), n.editModal = n.editModal.bind(n), n.closeEditModal = n.closeEditModal.bind(n), n.duplicateQuestion = n.duplicateQuestion.bind(n), n }
            return i(t, e), s(t, [{ key: "closeMenu", value: function() { jQuery(".sui-dropdown").removeClass("open") } }, { key: "getQuestionsWithoutCurrent", value: function(e) { var t = this; return e.filter(function(e) { return e.slug !== t.props.question.slug }) } }, { key: "deleteQuestion", value: function() { this.closeMenu(), this.props.actions.modalActions.showModal({ open: !0, question: this.props.question, closeModal: this.closeDeleteField, trashField: this.trashQuestion }, "delete") } }, { key: "closeDeleteField", value: function() { this.props.actions.modalActions.showModal({ open: !1, question: this.props.question, closeModal: this.closeDeleteField, trashField: this.trashQuestion }, "delete") } }, {
                key: "trashQuestion",
                value: function() {
                    var e = [].concat(r(this.props.questions)),
                        t = this.getQuestionsWithoutCurrent(e);
                    this.closeMenu(), this.props.actions.builderActions.updateQuestions(t)
                }
            }, { key: "closeEditModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "question") } }, { key: "editModal", value: function() { this.props.actions.modalActions.showModal({ open: !0, new: !1, type: this.props.type, results: this.props.results || {}, question: this.props.question, closeModal: this.closeEditModal }, "question") } }, {
                key: "duplicateQuestion",
                value: function() {
                    var e = Object.assign({}, this.props.question);
                    e.slug = "question-" + (0, c.randNumber)() + "-" + (0, c.randNumber)();
                    var t = [].concat(r(this.props.questions), [e]);
                    this.props.actions.builderActions.updateQuestions(t)
                }
            }, { key: "render", value: function() { var e = ""; return _.isUndefined(this.props.question.image) || _.isEmpty(this.props.question.image) || (e = "url(" + this.props.question.image + ")"), u.default.createElement("div", { className: "sui-builder-field sui-react sui-can_move" }, u.default.createElement("div", { className: "sui-field-info", onClick: this.editModal }, u.default.createElement("i", { className: "sui-icon-drag", "aria-hidden": "true" }), u.default.createElement("div", { className: "sui-builder-field-label" }, u.default.createElement("div", { className: "sui-builder-field-image", "aria-hidden": "true" }, u.default.createElement("span", { style: { backgroundImage: e } })), u.default.createElement("span", null, this.props.question.title))), u.default.createElement("div", { className: "sui-field-actions" }, u.default.createElement("div", { className: "sui-dropdown" }, u.default.createElement("button", { className: "sui-button-icon sui-dropdown-anchor" }, u.default.createElement("i", { className: "sui-icon-widget-settings-config", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Open field settings"))), u.default.createElement("ul", null, u.default.createElement("li", null, u.default.createElement("button", { onClick: this.editModal }, u.default.createElement("i", { className: "sui-icon-pencil", "aria-hidden": "true" }), (0, c.translate)("Edit"))), u.default.createElement("li", null, u.default.createElement("button", { onClick: this.duplicateQuestion }, u.default.createElement("i", { className: "sui-icon-copy", "aria-hidden": "true" }), (0, c.translate)("Duplicate"))), u.default.createElement("li", null, u.default.createElement("button", { className: "sui-option-red", onClick: this.deleteQuestion }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, c.translate)("Delete"))))))) } }]), t
        }(l.Component);
    t.default = f
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { r(this, t); var n = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.closeModal = n.closeModal.bind(n), n.editSettings = n.editSettings.bind(n), n }
            return o(t, e), i(t, [{ key: "closeModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "submit") } }, { key: "editSettings", value: function() { this.props.actions.modalActions.showModal({ open: !0, closeModal: this.closeModal }, "submit") } }, { key: "render", value: function() { var e = _.isUndefined(this.props.settings.submitData) || _.isUndefined(this.props.settings.submitData["button-text"]) || !this.props.settings.submitData["button-text"] ? (0, u.translate)("Submit") : this.props.settings.submitData["button-text"]; return l.default.createElement("div", { className: "sui-box-builder-footer sui-fields-boxed" }, l.default.createElement("div", { className: "sui-builder-field sui-react sui-can_open" }, l.default.createElement("div", { onClick: this.editSettings, className: "sui-field-info" }, l.default.createElement("div", { className: "sui-builder-field-label" }, l.default.createElement("i", { className: "sui-icon-check", "aria-hidden": "true" }), l.default.createElement("span", null, e))), l.default.createElement("div", { className: "sui-field-actions" }, l.default.createElement("div", { className: "sui-dropdown" }, l.default.createElement("button", { className: "sui-button-icon", onClick: this.editSettings }, l.default.createElement("i", { className: "sui-icon-widget-settings-config", "aria-hidden": "true" }), l.default.createElement("span", { className: "sui-screen-reader-text" }, (0, u.translate)("Open field settings"))))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(13),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(16),
        b = r(y),
        v = n(6),
        g = r(v),
        _ = n(2),
        E = r(_),
        w = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return c.default.createElement("div", { id: "powerform-form-fields", className: "sui-box" }, c.default.createElement("div", { className: "sui-box-header" }, c.default.createElement("h2", { className: "sui-box-title" }, (0, f.translate)("Leads"))), c.default.createElement("div", { className: "sui-box-body" }, c.default.createElement(b.default, { label: (0, f.translate)("Capture Leads"), description: (0, f.translate)("Collect participants' details (e.g., name, email, etc.) by integrating a lead generation form in your quiz.") }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("h4", { className: "sui-settings-label" }, (0, f.translate)("Lead generation form")), c.default.createElement("p", { className: "sui-description", style: { marginBottom: "10px" } }, (0, f.translate)("Customize the default lead generation form using the edit button below. Note that this lead generation form has limited settings only, and the rest of them are either automatically set by this quiz or they are shared between this quiz and the lead generation form (such as Email Notifications, Integrations, etc.).")), c.default.createElement("div", { className: "fui-recipient" }, c.default.createElement("span", { className: "sui-icon-clipboard-notes sui-lg", "aria-hidden": "true" }), c.default.createElement("p", null, (0, f.translate)("%s - Leads form", { args: [this.props.settings.formName] })), c.default.createElement("div", { className: "sui-tooltip", "data-tooltip": (0, f.translate)("Edit Form") }, c.default.createElement("a", { href: powerformData.formEditUrl + "&id=" + this.props.leadsForm, target: "_blank", className: "sui-icon-button" }, c.default.createElement("span", { className: "sui-icon-pencil", "aria-hidden": "true" }), c.default.createElement("span", { className: "sui-screen-reader-text" }, (0, f.translate)("Edit")))))), c.default.createElement(g.default, s({}, this.props, { property: "form-placement", default: "beginning", settingsLabel: (0, f.translate)("Form Placement"), settingsDesc: (0, f.translate)("Where do you want to embed the lead generation form in your quiz?") }), c.default.createElement(d.default, { value: "beginning" }, (0, f.translate)("Beginning of quiz")), c.default.createElement(d.default, { value: "end" }, (0, f.translate)("Before showing results"))), c.default.createElement(g.default, s({}, this.props, { property: "skip-form", default: "", settingsLabel: (0, f.translate)("Skip Form"), settingsDesc: (0, f.translate)("Enable this option if you want to allow your participants to skip the form.") }), c.default.createElement(m.default, { value: "true", boxClass: "sui-tab-boxed", label: (0, f.translate)("Enable") }, c.default.createElement(E.default, s({}, this.props, { label: (0, f.translate)("Link text"), placeholder: (0, f.translate)("Skip and continue"), property: "skip-text" }))), c.default.createElement(d.default, { value: "" }, (0, f.translate)("Disable"))))), c.default.createElement("div", { className: "sui-box-footer" }, c.default.createElement("button", { className: "sui-button", onClick: function() { return t("questions") } }, c.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, f.translate)("Questions")), c.default.createElement("div", { className: "sui-actions-right" }, c.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("appearance") } }, (0, f.translate)("Appearance"), c.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(u.Component);
    t.default = w
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(6),
        m = r(h),
        y = n(227),
        b = r(y),
        v = n(228),
        g = r(v),
        _ = n(229),
        E = r(_),
        w = n(230),
        O = r(w),
        j = n(231),
        P = r(j),
        x = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { label: (0, f.translate)("Design Style"), description: (0, f.translate)("Choose a pre-made style for your quiz and further customize it's appearance below.") }, c.default.createElement(m.default, s({}, this.props, { property: "powerform-quiz-theme", default: "default" }), c.default.createElement(b.default, { value: "default", boxClass: "sui-tab-content sui-tab-boxed" }, (0, f.translate)("Default")), c.default.createElement(g.default, { value: "flat", boxClass: "sui-tab-content sui-tab-boxed" }, (0, f.translate)("Flat")), c.default.createElement(E.default, { value: "bold", boxClass: "sui-tab-content sui-tab-boxed" }, (0, f.translate)("Bold")), c.default.createElement(O.default, { value: "material", boxClass: "sui-tab-content sui-tab-boxed" }, (0, f.translate)("Material")), c.default.createElement(P.default, { value: "none", boxClass: "sui-tab-content" }, (0, f.translate)("None")))) } }]), t
        }(u.Component);
    t.default = x
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--quiz fui-demo--default" }, l.default.createElement("span", null, (0, u.translate)("Question text?")), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Unselected")))), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", checked: "checked", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Selected"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--quiz fui-demo--flat" }, l.default.createElement("span", null, (0, u.translate)("Question text?")), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Unselected")))), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", checked: "checked", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Selected"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--quiz fui-demo--bold" }, l.default.createElement("span", null, (0, u.translate)("Question text?")), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Unselected")))), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", checked: "checked", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Selected"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "fui-demo fui-demo--quiz fui-demo--material" }, l.default.createElement("span", null, (0, u.translate)("Question text?")), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Unselected")))), l.default.createElement("label", null, l.default.createElement("input", { type: "radio", checked: "checked", readOnly: !0 }), l.default.createElement("span", null, l.default.createElement("span", { "aria-hidden": "true" }), l.default.createElement("span", null, (0, u.translate)("Option Selected"))))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function a(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

    function o(e, t) {
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
            function t(e) { return r(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return o(t, e), i(t, [{ key: "render", value: function() { return l.default.createElement("div", { className: "sui-notice" }, l.default.createElement("p", null, (0, u.translate)("You have opted for no stylesheet to be enqueued. The quiz will inherit styles from your theme's CSS."))) } }]), t
        }(s.Component);
    t.default = c
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(170),
        m = r(h),
        y = n(6),
        b = r(y),
        v = n(13),
        g = r(v),
        _ = n(12),
        E = r(_),
        w = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { label: (0, f.translate)("Layout"), description: (0, f.translate)("Customize your quiz layout by adjusting the answers layout and overall quiz alignment.") }, c.default.createElement(m.default, s({}, this.props, { property: "visual_style", settingsLabel: (0, f.translate)("Answers"), settingsDesc: (0, f.translate)("Choose whether the quiz answers should appear in a list or a grid."), radioClass: "sui-radio-sm", radioContent: "true" }), c.default.createElement(g.default, { value: "list", hasImage: !0, image1x: "quiz-list.png", image2x: "quiz-list@2x.png", label: (0, f.translate)("List") }), c.default.createElement("div", { value: "grid", hasImage: !0, image1x: "quiz-grid.png", image2x: "quiz-grid@2x.png", label: (0, f.translate)("Grid") }, c.default.createElement("p", { className: "sui-description", style: { marginBottom: "20px" } }, (0, f.translate)("Choose the number of columns to fit in one row. Note that grid layout changes to list on smaller screens so this won't affect the smaller screens.")), c.default.createElement(E.default, s({}, this.props, { property: "quiz-grid-cols", defaultValue: "3", label: (0, f.translate)("Columns per row"), fieldSize: "100" }), c.default.createElement("option", { value: "2" }, "2"), c.default.createElement("option", { value: "3" }, "3"), c.default.createElement("option", { value: "4" }, "4"), c.default.createElement("option", { value: "5" }, "5"), c.default.createElement("option", { value: "6" }, "6")))), "none" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { property: "quiz-alignment", default: "grid" === this.props.quizLayout ? "center" : "left", settingsLabel: (0, f.translate)("Quiz Alignment"), settingsDesc: (0, f.translate)("Choose the overall alignment of your quiz. This setting affects everything, including title, description, questions and answers, buttons, and social share message.") }), c.default.createElement(g.default, { value: "left" }, (0, f.translate)("Left")), c.default.createElement(g.default, { value: "center" }, (0, f.translate)("Center")), c.default.createElement(g.default, { value: "right" }, (0, f.translate)("Right")))) } }]), t
        }(u.Component);
    t.default = w
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(6),
        m = r(h),
        y = n(13),
        b = r(y),
        v = n(234),
        g = r(v),
        _ = n(235),
        E = r(_),
        w = n(236),
        O = r(w),
        j = n(237),
        P = r(j),
        x = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { label: (0, f.translate)("Quiz Container"), description: (0, f.translate)("Customize the quiz container as per your liking.") }, c.default.createElement(m.default, s({}, this.props, { property: "quiz-padding", default: "none", settingsLabel: (0, f.translate)("Padding"), settingsDesc: (0, f.translate)("By default the quiz will fill the available space where you insert it. You can add some padding here to better suit your theme.") }), c.default.createElement(b.default, { value: "none" }, (0, f.translate)("None")), c.default.createElement(g.default, s({}, this.props, { value: "custom", label: (0, f.translate)("Custom"), boxClass: "sui-border-frame" }))), c.default.createElement(m.default, s({}, this.props, { property: "quiz-border", default: "none", settingsLabel: (0, f.translate)("Border"), settingsDesc: (0, f.translate)("Add an optional border around the quiz.") }), c.default.createElement(b.default, { value: "none" }, (0, f.translate)("None")), c.default.createElement(E.default, s({}, this.props, { value: "custom", label: (0, f.translate)("Custom"), boxClass: "sui-border-frame" }))), c.default.createElement(m.default, s({}, this.props, { property: "quiz-spacing", default: "default", settingsLabel: (0, f.translate)("Spacing"), settingsDesc: (0, f.translate)("Choose how much spacing you want between each quiz question.") }), c.default.createElement(b.default, { value: "default" }, (0, f.translate)("Comfortable")), c.default.createElement(b.default, { value: "enclosed" }, (0, f.translate)("Compact")), c.default.createElement(O.default, s({}, this.props, { value: "custom", label: (0, f.translate)("Custom"), boxClass: "sui-border-frame" }))), c.default.createElement(m.default, s({}, this.props, { property: "quiz-size", default: "custom", settingsLabel: (0, f.translate)("Maximum Width"), settingsDesc: (0, f.translate)("Choose the maximum container width for your quiz. Full Width means quiz container will fill the 100% available space where you insert it, and the Custom option lets you define a maximum container width.") }), c.default.createElement(b.default, { value: "default" }, (0, f.translate)("Full Width")), c.default.createElement(P.default, s({}, this.props, { value: "custom", label: (0, f.translate)("Custom"), boxClass: "sui-border-frame" })))) } }]), t
        }(u.Component);
    t.default = x
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(4),
        d = r(p),
        h = n(2),
        m = r(h),
        y = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-padding-top", label: (0, f.translate)("Top") }))), c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-padding-bottom", label: (0, f.translate)("Bottom") }))), c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-padding-left", label: (0, f.translate)("Left") }))), c.default.createElement(d.default, { cols: "3" }, c.default.createElement(m.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-padding-right", label: (0, f.translate)("Right") })))), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Set your custom padding in pixels."))) } }]), t
        }(u.Component);
    t.default = y
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(4),
        d = r(p),
        h = n(2),
        m = r(h),
        y = n(12),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(d.default, { cols: "4" }, c.default.createElement(m.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-border-radius", label: (0, f.translate)("Radius"), note: (0, f.translate)("in px") }))), c.default.createElement(d.default, { cols: "4" }, c.default.createElement(m.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-border-width", label: (0, f.translate)("Thickness"), note: (0, f.translate)("in px") }))), c.default.createElement(d.default, { cols: "4" }, c.default.createElement(b.default, s({}, this.props, { property: "quiz-border-style", defaultValue: "none", label: (0, f.translate)("Style") }), c.default.createElement("option", { value: "solid" }, (0, f.translate)("Solid")), c.default.createElement("option", { value: "dashed" }, (0, f.translate)("Dashed")), c.default.createElement("option", { value: "dotted" }, (0, f.translate)("Dotted")), c.default.createElement("option", { value: "none" }, (0, f.translate)("None"))))), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Note: Set the color of the border in the Colors settings area above."))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(2),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", property: "quiz-custom-spacing", label: (0, f.translate)("Spacing"), note: (0, f.translate)("in pixels") })) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(2),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, s({}, this.props, { type: "number", minValue: "0", placeholder: "0", defaultValue: "600", label: (0, f.translate)("Maximum width"), suffix: "px", property: "quiz-custom-size", inputClass: "sui-field-has-suffix", inputStyles: { maxWidth: "110px" } })) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(26),
        m = r(h),
        y = n(171),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { var e = ""; return !_.isUndefined(this.props.settings["use-custom-css"]) && this.props.settings["use-custom-css"] && (e = c.default.createElement("div", { className: "sui-toggle-content" }, c.default.createElement(b.default, s({}, this.props, { property: "custom_css", type: "quiz" })))), c.default.createElement(d.default, { label: (0, f.translate)("Custom CSS"), description: (0, f.translate)("For more advanced customization options use custom CSS.") }, c.default.createElement(m.default, s({}, this.props, { label: (0, f.translate)("Enable custom CSS"), property: "use-custom-css" })), e) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(26),
        d = r(p),
        h = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, f.translate)("Rendering")), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Choose how you want your quiz to be rendered for users."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "use_ajax_load", label: (0, f.translate)("Load quiz using AJAX"), description: (0, f.translate)("Enabling this feature will load the quiz via AJAX after the page has loaded up, effectively speeding up your page load time. This method can also (in most cases) avoid page caching issues with your quiz.") })), c.default.createElement(d.default, s({}, this.props, { property: "use_donotcachepage", label: (0, f.translate)("Prevent page caching on quiz pages"), description: (0, f.translate)("Page caching plugins serve a static HTML version of the page which can cause issues to your dynamic quizzes. By enabling this, we'll use {{strong}}DONOTCACHEPAGE{{/strong}} constant to prevent pages with this quiz on it from being cached.", { components: { strong: c.default.createElement("strong", null) } }) })))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(6),
        m = r(h),
        y = n(241),
        b = r(y),
        v = n(13),
        g = r(v),
        _ = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { label: (0, f.translate)("Social Sharing"), description: (0, f.translate)("Choose whether you want to allow the quiz participants to share their results on social media.") }, c.default.createElement(m.default, s({}, this.props, { property: "enable-share", default: "on" }), c.default.createElement(b.default, s({}, this.props, { value: "on", boxClass: "", label: (0, f.translate)("Enable") })), c.default.createElement(g.default, { value: "off", label: (0, f.translate)("Disable") }))) } }]), t
        }(u.Component);
    t.default = _
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(46),
        d = r(p),
        h = n(41),
        m = r(h),
        y = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement("div", { className: "sui-border-frame", style: { marginBottom: "10px" } }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("span", { className: "sui-label" }, (0, f.translate)("Social Sharing Platforms")), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Facebook"), fieldId: "share-facebook", property: "facebook", itemClass: "sui-checkbox-stacked sui-checkbox-sm" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Twitter"), fieldId: "share-twitter", property: "twitter", itemClass: "sui-checkbox-stacked sui-checkbox-sm" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("LinkedIn"), fieldId: "share-linkedin", property: "linkedin", itemClass: "sui-checkbox-stacked sui-checkbox-sm" }))), c.default.createElement(m.default, s({}, this.props, { property: "social-share-message", defaultValue: "I got {quiz_result} on {quiz_name} quiz!", label: (0, f.translate)("Social Share Message"), type: "textarea", rows: "5" }), c.default.createElement("option", { value: "{quiz_result}", "data-content": "quiz_result" }, (0, f.translate)("Quiz Result")), c.default.createElement("option", { value: "{quiz_name}", "data-content": "quiz_name" }, (0, f.translate)("Quiz Name")), c.default.createElement("option", { value: "{embed_title}", "data-content": "embed_title" }, (0, f.translate)("Page/Post Title")), c.default.createElement("option", { value: "{embed_url}", "data-content": "embed_url" }, (0, f.translate)("Page/Post URL")), c.default.createElement("option", { value: "{site_url}", "data-content": "{site_url}" }, (0, f.translate)("Site URL")))), c.default.createElement("div", { className: "sui-notice sui-notice-info", style: { marginTop: "10px" } }, c.default.createElement("p", null, (0, f.translate)("Want to enhance how the result will look when shared on Social Media? {{link}}SmartCrawl{{/link}} OpenGraph and Twitter Card support lets you choose how your content looks when it's shared on social media.", { components: { link: c.default.createElement("a", { href: "https://n3rds.work/project/smartcrawl-wordpress-seo/" }) } })))) } }]), t
        }(u.Component);
    t.default = y
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(243),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-notifications", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Email Notifications"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement("p", { className: "sui-description" }, (0, c.translate)("You can send customized email notifications to your site admins and participant on successful quiz submission. Use advanced features such as email routing, and conditions to have granular control over them."))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(p.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("behaviour") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Behaviour")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("integrations") } }, (0, c.translate)("Integrations"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(244),
        d = r(p),
        h = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.addNotification = n.addNotification.bind(n), n.closeModal = n.closeModal.bind(n), n }
            return i(t, e), l(t, [{ key: "closeModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "notification") } }, {
                key: "addNotification",
                value: function() {
                    var e = { slug: "notification-" + (0, f.randNumber)() + "-" + (0, f.randNumber)() };
                    this.props.actions.modalActions.showModal({ open: !0, new: !0, notification: e, field: this.props.field, notifications: this.props.notifications, closeModal: this.closeModal }, "notification")
                }
            }, { key: "render", value: function() { var e = this; return c.default.createElement("div", { className: "sui-box-builder sui-flushed", ref: function(t) { return e.el = t } }, c.default.createElement("div", { className: "sui-box-builder-body" }, this.props.notifications.length > 0 && c.default.createElement("div", { className: "sui-builder-fields" }, _.map(this.props.notifications, function(t, n) { return c.default.createElement(d.default, s({ key: t.slug, notification: t }, e.props, { counter: n })) })), c.default.createElement("button", { className: "sui-button sui-button-dashed", onClick: this.addNotification }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Email Notification")))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.trashNotification = n.trashNotification.bind(n), n.deleteNotification = n.deleteNotification.bind(n), n.closeDeleteField = n.closeDeleteField.bind(n), n.editModal = n.editModal.bind(n), n.closeEditModal = n.closeEditModal.bind(n), n.duplicateNotification = n.duplicateNotification.bind(n), n }
            return i(t, e), s(t, [{ key: "closeMenu", value: function() { jQuery(".sui-dropdown").removeClass("open") } }, { key: "getNotificationsWithoutCurrent", value: function(e) { var t = this; return e.filter(function(e) { return e.slug !== t.props.notification.slug }) } }, { key: "deleteNotification", value: function() { this.closeMenu(), this.props.actions.modalActions.showModal({ open: !0, notification: this.props.notification, closeModal: this.closeDeleteField, trashField: this.trashNotification }, "deleteNotification") } }, { key: "closeDeleteField", value: function() { this.props.actions.modalActions.showModal({ open: !1, notification: this.props.notification, closeModal: this.closeDeleteField, trashField: this.trashNotification }, "deleteNotification") } }, {
                key: "trashNotification",
                value: function() {
                    var e = [].concat(r(this.props.notifications)),
                        t = this.getNotificationsWithoutCurrent(e);
                    this.closeMenu(), this.props.actions.notificationsActions.updateNotifications(t)
                }
            }, { key: "closeEditModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "notification") } }, { key: "editModal", value: function() { this.props.actions.modalActions.showModal({ open: !0, new: !1, notification: this.props.notification, field: this.props.field, notifications: this.props.notifications, closeModal: this.closeEditModal }, "notification") } }, {
                key: "duplicateNotification",
                value: function() {
                    var e = Object.assign({}, this.props.notification);
                    e.slug = "notification-" + (0, c.randNumber)() + "-" + (0, c.randNumber)();
                    var t = [].concat(r(this.props.notifications), [e]);
                    this.props.actions.notificationsActions.updateNotifications(t)
                }
            }, {
                key: "getConditionLabel",
                value: function(e, t) {
                    var n = void 0;
                    if (e.hasOptions && e.values.length > 0) {
                        var r = void 0;
                        if (r = _.where(e.values, { value: t })[0], r || (r = _.where(e.values, { label: t })[0]), !r) return;
                        n = r.label
                    } else n = t;
                    return _.isEmpty(n) ? (0, c.translate)("null") : n
                }
            }, {
                key: "conditionMarkup",
                value: function() {
                    var e = _.isUndefined(this.props.settings.wrappers) ? [] : this.props.settings.wrappers,
                        t = (0, c.getFields)(e),
                        n = [];
                    _.each(this.props.questions, function(e) {
                        var t = Object.assign({}, e);
                        n.push(t)
                    }), n.push({ slug: "final_result", title: "Final Score" });
                    var r = "hide" === this.props.notification.condition_action ? (0, c.translate)("Hide") : (0, c.translate)("Show");
                    if (!_.isUndefined(this.props.notification.conditions)) {
                        var a = this.props.notification.conditions[0];
                        if (!_.isUndefined(a)) {
                            var o = _.filter(t, function(e) { return e.element_id === a.element_id }),
                                i = _.filter(n, function(e) { return e.slug === a.element_id });
                            if (!(_.isUndefined(o) && _.isUndefined(i) || _.isUndefined(o[0]) && _.isUndefined(i[0]))) {
                                var s = "",
                                    l = "",
                                    f = "";
                                _.isUndefined(o[0]) ? _.isUndefined(i[0]) || (s = i.field_type, l = i[0], f = i[0].title) : (s = o.field_type, l = o[0], f = o[0].label);
                                var p = f,
                                    d = (0, c.getRuleLabel)(a.rule, s),
                                    h = this.getConditionLabel(l, a.value),
                                    m = this.props.notification.conditions.length,
                                    y = "";
                                return m - 1 > 0 && (y = "+ " + (m - 1) + " " + (0, c.translate)("more condition(s)")), u.default.createElement("span", { className: "fui-conditions sui-tooltip sui-tooltip-left sui-tooltip-top-right-mobile", "data-tooltip": r + " " + (0, c.translate)("if") + " " + p + " " + d + " " + h + " " + y, "aria-hidden": "true" }, u.default.createElement("i", { className: "sui-icon-link sui-sm" }))
                            }
                        }
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e = "";
                    if (_.isUndefined(this.props.notification["email-recipients"]) || "routing" !== this.props.notification["email-recipients"]) {
                        var t = "";
                        if (!_.isUndefined(this.props.notification.recipients) && !_.isEmpty(this.props.notification.recipients)) {
                            var n = this.props.notification.recipients.split(","),
                                r = n.length;
                            t = r > 2 ? n[0] + ", " + n[1] + " + " + (r - 2) + " " + (0, c.translate)("more recipient(s)") : this.props.notification.recipients, e = t
                        }
                    } else e = (0, c.translate)("Email routing is enabled");
                    var a = this.conditionMarkup();
                    return u.default.createElement("div", { className: "sui-builder-field sui-react sui-can_open" }, !_.isUndefined(this.props.notification.conditions) && this.props.notification.conditions.length > 0 && u.default.createElement(u.default.Fragment, null, a), u.default.createElement("div", { className: "sui-field-info fui-notifications-info", onClick: this.editModal }, u.default.createElement("div", { className: "sui-builder-field-label fui-notifications-label" }, u.default.createElement("i", { className: "sui-icon-mail", "aria-hidden": "true" }), u.default.createElement("span", null, this.props.notification.label)), u.default.createElement("div", { className: "sui-builder-field-label fui-notifications-recipient" }, u.default.createElement("span", null, e))), u.default.createElement("div", { className: "sui-field-actions" }, u.default.createElement("div", { className: "sui-dropdown" }, u.default.createElement("button", { className: "sui-button-icon sui-dropdown-anchor" }, u.default.createElement("i", { className: "sui-icon-widget-settings-config", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Open field settings"))), u.default.createElement("ul", null, u.default.createElement("li", null, u.default.createElement("button", { onClick: this.editModal }, u.default.createElement("i", { className: "sui-icon-pencil", "aria-hidden": "true" }), (0, c.translate)("Edit"))), u.default.createElement("li", null, u.default.createElement("button", { onClick: this.duplicateNotification }, u.default.createElement("i", { className: "sui-icon-copy", "aria-hidden": "true" }), (0, c.translate)("Duplicate"))), u.default.createElement("li", null, u.default.createElement("button", { className: "sui-option-red", onClick: this.deleteNotification }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, c.translate)("Delete")))))))
                }
            }]), t
        }(l.Component);
    t.default = f
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(172);
    r(f);
    n(174);
    var p = function(e) {
        function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.state = { loading: !1, markup: "" }, n.loadIntegrations = n.loadIntegrations.bind(n), n }
        return i(t, e), s(t, [{ key: "componentDidMount", value: function() { this.mounted = !0, this.loadIntegrations(), jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, { key: "componentWillUnmount", value: function() { this.mounted = !1 } }, {
            key: "loadIntegrations",
            value: function() {
                var e = this,
                    t = powerformData.currentForm.settings.form_id;
                _.isUndefined(t) || +t <= 0 || this.state.loading || (this.setState({ markup: "", loading: !0 }), window.fetch(powerformData.ajaxUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" }, body: "action=powerform_addon_get_quiz_addons&_ajax_nonce=" + powerformData.addonNonce + "&data[quiz_id]=" + t }).then(function(e) { return e.json() }).then(function(t) {
                    if (t.success && e.mounted) {
                        var n = e;
                        e.setState({ markup: t.data.data }), setTimeout(function() {
                            var e = window.jQuery(".form-integrations-wrapper");
                            e.PowerformIntegrationsModal({ type: "quiz" }), e.on("reload", function() { e.unbind(), n.loadIntegrations() })
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
                    a = function(t) { e.props.history.push("/" + t) },
                    o = "";
                return o = t ? u.default.createElement("div", { className: "sui-notice sui-notice-loading" }, u.default.createElement("p", null, (0, c.translate)("Fetching integration list…"))) : _.isUndefined(r) || +r <= 0 ? u.default.createElement("div", { className: "sui-notice sui-notice-warning" }, u.default.createElement("p", null, (0, c.translate)("You need to save this quiz before using integrations.")), u.default.createElement("div", { className: "sui-notice-buttons" }, u.default.createElement("a", { className: "sui-button", onClick: this.loadIntegrations }, (0, c.translate)("TRY AGAIN")))) : u.default.createElement("span", { className: "form-integrations-wrapper", dangerouslySetInnerHTML: { __html: n } }), u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Integrations"))), u.default.createElement("div", { className: "sui-box-body" }, o), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return a("notifications") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Email Notifications")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return a("settings") } }, (0, c.translate)("Settings"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
            }
        }]), t
    }(l.Component);
    t.default = p
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(247),
        p = r(f),
        d = n(248),
        h = r(d),
        m = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Settings"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(p.default, this.props), u.default.createElement(h.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("integrations") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), " ", (0, c.translate)("Integrations"))))
                }
            }]), t
        }(l.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(26),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, f.translate)("Data Storage")), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("By default we'll store all submissions in your database."))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement(d.default, s({}, this.props, { property: "store", label: (0, f.translate)("Disable store submissions in my database"), description: (0, f.translate)("If you don't want to store submissions in your database you can disable this feature. Alternately you can also schedule automatic deletion of submissions after a period of time below.") })))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(6),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(4),
        b = r(y),
        v = n(2),
        g = r(v),
        E = n(12),
        w = r(E),
        O = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{
                key: "render",
                value: function() {
                    var e = _.isEmpty(powerformData.submissions_quiz_retain_number) || "0" === powerformData.submissions_quiz_retain_number,
                        t = (0, f.translate)("forever");
                    return e || (t = powerformData.submissions_quiz_retain_number + " " + powerformData.submissions_quiz_retain_unit), c.default.createElement("div", { className: "sui-box-settings-row" }, c.default.createElement("div", { className: "sui-box-settings-col-1" }, c.default.createElement("span", { className: "sui-settings-label" }, (0, f.translate)("Privacy")), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Choose how you want to handle this quiz's data storage. By default we'll use the configuration you've set in your {{link}}global privacy settings{{/link}}.", { components: { link: c.default.createElement("a", { href: powerformData.settingsUrl + "&section=submissions", target: "_blank" }) } }))), c.default.createElement("div", { className: "sui-box-settings-col-2" }, c.default.createElement("div", { className: "sui-form-field" }, c.default.createElement("label", { className: "sui-settings-label" }, (0, f.translate)("Submissions")), c.default.createElement("span", { className: "sui-description", style: { marginBottom: "10px" } }, (0, f.translate)("How long do you want to retain this quiz's submissions for?")), c.default.createElement(d.default, s({}, this.props, { default: "false", property: "enable-submissions-retention" }), c.default.createElement(m.default, { value: "false", label: (0, f.translate)("Use default") }, c.default.createElement("div", { className: "sui-notice" }, c.default.createElement("p", null, (0, f.translate)("Your default setting value is to keep the submissions %s.", { args: [t] })))), c.default.createElement(m.default, s({}, this.props, { value: "true", label: (0, f.translate)("Custom"), boxClass: "sui-tab-boxed" }), c.default.createElement("div", { className: "sui-row", style: { marginBottom: "10px" } }, c.default.createElement(b.default, { cols: "6" }, c.default.createElement(g.default, s({}, this.props, { type: "number", defaultValue: "0", property: "submissions-retention-number", placeholder: "10" }))), c.default.createElement(b.default, { cols: "6" }, c.default.createElement(w.default, s({}, this.props, { defaultValue: "days", property: "submissions-retention-unit" }), c.default.createElement("option", { value: "days" }, (0, f.translate)("day(s)")), c.default.createElement("option", { value: "weeks" }, (0, f.translate)("week(s)")), c.default.createElement("option", { value: "months" }, (0, f.translate)("month(s)")), c.default.createElement("option", { value: "years" }, (0, f.translate)("year(s)"))))), c.default.createElement("span", { className: "sui-description" }, (0, f.translate)("Leave the field blank to retain submissions forever.")))))))
                }
            }]), t
        }(u.Component);
    t.default = O
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }
    var a = n(0),
        o = r(a),
        i = n(45),
        s = n(7),
        l = n(19),
        u = n(187),
        c = r(u),
        f = n(60),
        p = r(f),
        d = n(528),
        h = r(d),
        m = (0, c.default)(powerformData.currentForm);
    p.default.setLocale(powerforml10n.locale), window.powerformChanges = { questions: [], results: [], settings: !1 }, (0, i.render)(o.default.createElement(s.Provider, { store: m }, o.default.createElement(l.MemoryRouter, null, o.default.createElement(l.Route, { component: h.default }))), document.getElementById("powerform-personality-builder"))
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = (n(7), n(1)),
        p = n(529),
        d = r(p),
        h = n(530),
        m = r(h),
        y = n(531),
        b = r(y),
        v = n(534),
        g = r(v),
        _ = n(535),
        E = r(_),
        w = n(536),
        O = r(w),
        j = n(540),
        P = r(j),
        x = n(541),
        N = r(x),
        k = n(542),
        C = r(k),
        S = n(565),
        M = r(S),
        T = n(567),
        A = r(T),
        F = n(568),
        R = r(F),
        D = n(569),
        q = r(D),
        U = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { window.addEventListener("beforeunload", this.handleBeforeunload), window.addEventListener("scroll", this.applySticky.bind(this)) } }, { key: "componentWillUnmount", value: function() { window.removeEventListener("beforeunload", this.handleBeforeunload) } }, {
                key: "applySticky",
                value: function() {
                    var e = this.refs.StickyHeader;
                    e.getBoundingClientRect().top <= parseInt(window.getComputedStyle(e).top.replace("px", "")) ? e.classList.add("sui-is-sticky") : e.classList.remove("sui-is-sticky")
                }
            }, { key: "handleBeforeunload", value: function(e) { if (window.powerformChanges.length > 0 || !0 === window.powerformChanges.settings) return e.preventDefault(), e.returnValue = (0, f.translate)("You have unsaved changes, are you sure want to leave this page"), (0, f.translate)("You have unsaved changes, are you sure want to leave this page") } }, { key: "render", value: function() { return u.default.createElement("div", null, u.default.createElement(d.default, null), u.default.createElement("div", { className: "sui-row-with-sidenav" }, u.default.createElement(b.default, this.props), u.default.createElement("div", null, u.default.createElement("div", { id: "powerform-builder-status", className: "sui-box sui-box-sticky", ref: "StickyHeader" }, u.default.createElement(g.default, null)), u.default.createElement(c.Route, { exact: !0, path: "/", render: function() { return u.default.createElement(c.Redirect, { to: "/intro" }) } }), u.default.createElement(c.Route, { path: "/intro", component: E.default }), u.default.createElement(c.Route, { path: "/personalities", component: O.default }), u.default.createElement(c.Route, { path: "/questions", component: P.default }), u.default.createElement(c.Route, { path: "/leads", component: N.default }), u.default.createElement(c.Route, { path: "/appearance", component: C.default }), u.default.createElement(c.Route, { path: "/behaviour", component: M.default }), u.default.createElement(c.Route, { path: "/notifications", component: A.default }), u.default.createElement(c.Route, { path: "/integrations", component: R.default }), u.default.createElement(c.Route, { path: "/settings", component: q.default }))), u.default.createElement(m.default, this.props)) } }]), t
        }(l.Component);
    t.default = U
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return { id: e.settings.form_id, title: e.settings.formName || "", hasLead: e.settings.hasLeads || !1 } }

    function o(e) { return { actions: { navigationActions: (0, s.bindActionCreators)(d, e), modalActions: (0, s.bindActionCreators)(f, e), settingsActions: (0, s.bindActionCreators)(u, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(27),
        u = r(l),
        c = n(24),
        f = r(c),
        p = n(177),
        d = r(p),
        h = n(194),
        m = function(e) { return e && e.__esModule ? e : { default: e } }(h);
    t.default = (0, i.connect)(a, o)(m.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return { modal: e.modal, questions: e.questions, results: e.results, type: "nowrong", settings: e.settings, notifications: e.notifications, id: e.settings.form_id || -1 } }

    function o(e) { return { actions: { modalActions: (0, s.bindActionCreators)(b, e), builderActions: (0, s.bindActionCreators)(f, e), settingsActions: (0, s.bindActionCreators)(d, e), notificationsActions: (0, s.bindActionCreators)(m, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(197),
        u = function(e) { return e && e.__esModule ? e : { default: e } }(l),
        c = n(82),
        f = r(c),
        p = n(27),
        d = r(p),
        h = n(178),
        m = r(h),
        y = n(42),
        b = r(y);
    t.default = (0, i.connect)(a, o)(u.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return { id: e.settings.form_id, title: e.settings.formName || "", hasLead: e.settings.hasLeads || !1 } }

    function o(e) { return { actions: { navigationActions: (0, s.bindActionCreators)(f, e), modalActions: (0, s.bindActionCreators)(u, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(24),
        u = r(l),
        c = n(177),
        f = r(c),
        p = n(532),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(p);
    t.default = (0, i.connect)(a, o)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e) { return i.default.createElement("div", { className: "sui-sidenav fui-sidenav" }, i.default.createElement(l.default, e)) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
    var o = n(0),
        i = r(o),
        s = n(533),
        l = r(s)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(215),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "render", value: function() { return u.default.createElement(u.default.Fragment, null, u.default.createElement("ul", { className: "sui-vertical-tabs sui-sidenav-sticky sui-sidenav-hide-md fui-sidenav" }, u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/intro", activeClassName: "current" }, (0, f.translate)("Intro"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/personalities", activeClassName: "current" }, (0, f.translate)("Personalities"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/questions", activeClassName: "current" }, (0, f.translate)("Questions"))), this.props.hasLead && u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/leads", activeClassName: "current" }, (0, f.translate)("Leads"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/appearance", activeClassName: "current" }, (0, f.translate)("Appearance"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/behaviour", activeClassName: "current" }, (0, f.translate)("Behaviour"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/notifications", activeClassName: "current" }, (0, f.translate)("Email Notifications"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/integrations", activeClassName: "current" }, (0, f.translate)("Integrations"))), u.default.createElement("li", { className: "sui-vertical-tab" }, u.default.createElement(c.NavLink, { to: "/settings", activeClassName: "current" }, (0, f.translate)("Settings")))), u.default.createElement(d.default, this.props, u.default.createElement("option", { value: "" }, (0, f.translate)("Intro")), u.default.createElement("option", { value: "personalities" }, (0, f.translate)("Personalities")), u.default.createElement("option", { value: "questions" }, (0, f.translate)("Questions")), "true" === this.props.hasLead && u.default.createElement("option", { value: "leads" }, (0, f.translate)("Leads")), u.default.createElement("option", { value: "appearance" }, (0, f.translate)("Appearance")), u.default.createElement("option", { value: "behaviour" }, (0, f.translate)("Behaviour")), u.default.createElement("option", { value: "notifications" }, (0, f.translate)("Email Notifications")), u.default.createElement("option", { value: "integrations" }, (0, f.translate)("Integrations")), u.default.createElement("option", { value: "settings" }, (0, f.translate)("Settings")))) } }]), t
        }(l.Component);
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

    function a(e) { return { id: e.settings.form_id, status: e.settings.form_status, state: e, title: e.settings.formName || "", changed: window.powerformChanges, type: "nowrong" } }

    function o(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), modalActions: (0, s.bindActionCreators)(f, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(27),
        u = r(l),
        c = n(24),
        f = r(c),
        p = n(216),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(p);
    t.default = (0, i.connect)(a, o)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return { settings: e.settings, type: "personality" } }

    function i(e) { return { actions: { settingsActions: (0, u.bindActionCreators)(f, e), modalActions: (0, u.bindActionCreators)(d, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(0),
        l = (a(s), n(7)),
        u = n(8),
        c = n(27),
        f = r(c),
        p = n(24),
        d = r(p),
        h = n(220),
        m = a(h);
    t.default = (0, l.connect)(o, i)(m.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return { questions: e.questions, results: e.results, settings: e.settings } }

    function i(e) { return { actions: { settingsActions: (0, u.bindActionCreators)(d, e), builderActions: (0, u.bindActionCreators)(f, e), modalActions: (0, u.bindActionCreators)(m, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(0),
        l = (a(s), n(7)),
        u = n(8),
        c = n(82),
        f = r(c),
        p = n(27),
        d = r(p),
        h = n(24),
        m = r(h),
        y = n(537),
        b = a(y);
    t.default = (0, l.connect)(o, i)(b.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(538),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-fields", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Personalities"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement("p", { className: "sui-description" }, (0, c.translate)("Let's add the different personalities. Each of the following personality is a possible outcome of your quiz. In case of a tie, the personality is chosen as per their order below."))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(p.default, this.props)), u.default.createElement("div", { className: "sui-box-body", style: { paddingTop: "10px" } }, u.default.createElement("p", { className: "sui-description" }, (0, c.translate)("Reorder the personalities to set the priority order."))), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Intro")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("questions") } }, (0, c.translate)("Questions"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(539),
        d = r(p),
        h = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.addItem = n.addItem.bind(n), n.closeModal = n.closeModal.bind(n), n }
            return i(t, e), l(t, [{ key: "componentDidMount", value: function() { this.$el = jQuery(this.el), this.moveOption = this.moveOption.bind(this), this.initSortable() } }, { key: "componentDidUpdate", value: function(e) { _.isEmpty(e.results) && !_.isEmpty(this.props.results) && this.initSortable() } }, {
                key: "initSortable",
                value: function() {
                    var e = this;
                    this.$el.find(".sui-builder-fields").sortable({
                        stop: function(t, n) {
                            var r = n.item.index();
                            e.$el.find(".sui-builder-fields").sortable("cancel");
                            var a = n.item.index();
                            e.moveOption(a, r)
                        }
                    })
                }
            }, { key: "componentWillUnmount", value: function() { this.$el.unbind().removeData() } }, {
                key: "moveOption",
                value: function(e, t) {
                    var n = this.props.results;
                    n.splice(t, 0, n.splice(e, 1)[0]), this.props.actions.builderActions.updateResults(n), this.forceUpdate()
                }
            }, { key: "closeModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "personality") } }, {
                key: "addItem",
                value: function() {
                    var e = { slug: "result-" + (0, f.randNumber)() + "-" + (0, f.randNumber)() };
                    this.props.actions.modalActions.showModal({ open: !0, new: !0, result: e, results: this.props.results, closeModal: this.closeModal }, "personality")
                }
            }, { key: "render", value: function() { var e = this; return c.default.createElement("div", { className: "sui-box-builder sui-flushed", ref: function(t) { return e.el = t } }, c.default.createElement("div", { className: "sui-box-builder-body" }, this.props.results.length > 0 && c.default.createElement("div", { className: "sui-builder-fields" }, _.map(this.props.results, function(t, n) { return c.default.createElement(d.default, s({ key: t.slug, result: t }, e.props, { counter: n })) })), c.default.createElement("button", { className: "sui-button sui-button-dashed", onClick: this.addItem }, c.default.createElement("i", { className: "sui-icon-plus", "aria-hidden": "true" }), (0, f.translate)("Add Personality")), 0 === this.props.results.length && c.default.createElement("div", { className: "sui-builder-empty-message sui-block-content-center" }, c.default.createElement("p", { className: "sui-description" }, (0, f.translate)("Define the different personalities possible as the outcome of your quiz here.")), powerformData.showBranding && c.default.createElement("img", { src: powerformData.imagesUrl + "/powerform-create-modal.png", srcSet: powerformData.imagesUrl + "/powerform-create-modal.png 1x,\n\t\t\t\t\t\t\t\t\t" + powerformData.imagesUrl + "/powerform-create-modal@2x.png 2x", className: "sui-image sui-image-center" })))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { if (Array.isArray(e)) { for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]; return n } return Array.from(e) }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = function(e) {
            function t(e) { a(this, t); var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)); return n.trashResult = n.trashResult.bind(n), n.deleteResult = n.deleteResult.bind(n), n.closeDeleteField = n.closeDeleteField.bind(n), n.editModal = n.editModal.bind(n), n.closeEditModal = n.closeEditModal.bind(n), n.duplicateResult = n.duplicateResult.bind(n), n }
            return i(t, e), s(t, [{ key: "closeMenu", value: function() { jQuery(".sui-dropdown").removeClass("open") } }, { key: "getResultsWithoutCurrent", value: function(e) { var t = this; return e.filter(function(e) { return e.slug !== t.props.result.slug }) } }, { key: "deleteResult", value: function() { this.closeMenu(), this.props.actions.modalActions.showModal({ open: !0, result: this.props.result, closeModal: this.closeDeleteField, trashField: this.trashResult }, "deletePersonality") } }, { key: "closeDeleteField", value: function() { this.props.actions.modalActions.showModal({ open: !1, result: this.props.result, closeModal: this.closeDeleteField, trashField: this.trashResult }, "deletePersonality") } }, {
                key: "trashResult",
                value: function() {
                    var e = [].concat(r(this.props.results)),
                        t = this.getResultsWithoutCurrent(e);
                    this.closeMenu(), this.props.actions.builderActions.updateResults(t)
                }
            }, { key: "closeEditModal", value: function() { this.props.actions.modalActions.showModal({ open: !1 }, "personality") } }, { key: "editModal", value: function() { this.props.actions.modalActions.showModal({ open: !0, new: !1, result: this.props.result, closeModal: this.closeEditModal }, "personality") } }, {
                key: "duplicateResult",
                value: function() {
                    var e = Object.assign({}, this.props.result);
                    e.slug = "result-" + (0, c.randNumber)() + "-" + (0, c.randNumber)();
                    var t = [].concat(r(this.props.results), [e]);
                    this.props.actions.builderActions.updateResults(t)
                }
            }, { key: "render", value: function() { var e = ""; return _.isUndefined(this.props.result.image) || _.isEmpty(this.props.result.image) || (e = "url(" + this.props.result.image + ")"), u.default.createElement("div", { className: "sui-builder-field sui-react sui-can_move" }, u.default.createElement("div", { className: "sui-field-info", onClick: this.editModal }, u.default.createElement("i", { className: "sui-icon-drag", "aria-hidden": "true" }), u.default.createElement("div", { className: "sui-builder-field-label" }, u.default.createElement("div", { className: "sui-builder-field-image", "aria-hidden": "true" }, u.default.createElement("span", { style: { backgroundImage: e } })), u.default.createElement("span", null, this.props.result.title))), u.default.createElement("div", { className: "sui-field-actions" }, u.default.createElement("div", { className: "sui-dropdown" }, u.default.createElement("button", { className: "sui-button-icon sui-dropdown-anchor" }, u.default.createElement("i", { className: "sui-icon-widget-settings-config", "aria-hidden": "true" }), u.default.createElement("span", { className: "sui-screen-reader-text" }, (0, c.translate)("Open field settings"))), u.default.createElement("ul", null, u.default.createElement("li", null, u.default.createElement("button", { onClick: this.editModal }, u.default.createElement("i", { className: "sui-icon-pencil", "aria-hidden": "true" }), (0, c.translate)("Edit"))), u.default.createElement("li", null, u.default.createElement("button", { onClick: this.duplicateResult }, u.default.createElement("i", { className: "sui-icon-copy", "aria-hidden": "true" }), (0, c.translate)("Duplicate"))), u.default.createElement("li", null, u.default.createElement("button", { className: "sui-option-red", onClick: this.deleteResult }, u.default.createElement("i", { className: "sui-icon-trash", "aria-hidden": "true" }), (0, c.translate)("Delete"))))))) } }]), t
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

    function a(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return { settings: e.settings, questions: e.questions, results: e.results, hasLead: e.settings.hasLeads || !1, type: "personality" } }

    function i(e) { return { actions: { settingsActions: (0, u.bindActionCreators)(d, e), builderActions: (0, u.bindActionCreators)(f, e), modalActions: (0, u.bindActionCreators)(m, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(0),
        l = (a(s), n(7)),
        u = n(8),
        c = n(82),
        f = r(c),
        p = n(27),
        d = r(p),
        h = n(24),
        m = r(h),
        y = n(221),
        b = a(y);
    t.default = (0, l.connect)(o, i)(b.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return { settings: e.settings, hasLead: e.settings.hasLeads || !1, leadsForm: e.settings.leadsId || !1, type: "personality" } }

    function i(e) { return { actions: { settingsActions: (0, u.bindActionCreators)(d, e), builderActions: (0, u.bindActionCreators)(f, e), modalActions: (0, u.bindActionCreators)(m, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(0),
        l = (a(s), n(7)),
        u = n(8),
        c = n(82),
        f = r(c),
        p = n(27),
        d = r(p),
        h = n(24),
        m = r(h),
        y = n(225),
        b = a(y);
    t.default = (0, l.connect)(o, i)(b.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return { settings: e.settings, quizDesign: e.settings["powerform-quiz-theme"] || "default", quizLayout: e.settings.visual_style || "list", hasLead: e.settings.hasLeads || !1 } }

    function o(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), modalActions: (0, s.bindActionCreators)(f, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(27),
        u = r(l),
        c = n(24),
        f = r(c),
        p = n(543),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(p);
    t.default = (0, i.connect)(a, o)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(68),
        p = r(f),
        d = n(74),
        h = r(d),
        m = n(226),
        y = r(m),
        b = n(544),
        v = r(b),
        g = n(554),
        E = r(g),
        w = n(232),
        O = r(w),
        j = n(233),
        P = r(j),
        x = n(238),
        N = r(x),
        k = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { this.loadFonts(), jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, { key: "componentDidUpdate", value: function() { this.loadFonts() } }, {
                key: "loadFonts",
                value: function() {
                    if (_.isUndefined(window.powerformFonts)) {
                        var e = { isObject: !0 },
                            t = { action: "powerform_load_google_fonts", data: e, _wpnonce: powerformData.gFontNonce };
                        p.default.post(powerformData.ajaxUrl, h.default.stringify(t)).then(function(e) { window.powerformFonts = e.data.data }).catch(function(e) { console.log(e) })
                    }
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-appearance", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Appearance"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(y.default, this.props), "none" !== this.props.quizDesign && u.default.createElement(u.default.Fragment, null, u.default.createElement(v.default, this.props), u.default.createElement(E.default, this.props), u.default.createElement(O.default, this.props), u.default.createElement(P.default, this.props)), u.default.createElement(N.default, this.props)), u.default.createElement("div", { className: "sui-box-footer" }, this.props.hasLead && u.default.createElement("button", { className: "sui-button", onClick: function() { return t("leads") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Leads")), !this.props.hasLead && u.default.createElement("button", { className: "sui-button", onClick: function() { return t("questions") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Questions")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("behaviour") } }, (0, c.translate)("Behaviour"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = k
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(6),
        m = r(h),
        y = n(13),
        b = r(y),
        v = n(545),
        g = r(v),
        _ = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { label: (0, f.translate)("Colors"), description: (0, f.translate)("Adjust the default color combinations to match your theme styling.") }, c.default.createElement(m.default, s({}, this.props, { property: "nowrong-toggle-palette", default: "" }), c.default.createElement(b.default, { value: "", boxClass: "" }, (0, f.translate)("Default")), c.default.createElement(g.default, s({}, this.props, { value: "true", boxClass: "" }), (0, f.translate)("Custom")))) } }]), t
        }(u.Component);
    t.default = _
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(44),
        d = r(p),
        h = n(546),
        m = r(h),
        y = n(547),
        b = r(y),
        v = n(548),
        g = r(v),
        _ = n(549),
        E = r(_),
        w = n(550),
        O = r(w),
        j = n(551),
        P = r(j),
        x = n(552),
        N = r(x),
        k = n(553),
        C = r(k),
        S = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-accordion" }, c.default.createElement("div", { className: "sui-accordion-header" }, c.default.createElement("div", null, (0, f.translate)("Element"))), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Basic") }), c.default.createElement(m.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Answer - Container") }), c.default.createElement(b.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Answer - Checkbox") }), c.default.createElement(g.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Answer - Text") }), c.default.createElement(E.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Submit Button") }), c.default.createElement(O.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Quiz Result") }), c.default.createElement(N.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Retake Button") }), c.default.createElement(C.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Social Share") }), c.default.createElement(P.default, this.props))) } }]), t
        }(u.Component);
    t.default = S
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(10),
        d = r(p),
        h = n(15),
        m = r(h),
        y = n(3),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, this.props.settings.hasLeads && c.default.createElement(m.default, { default: "default", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(b.default, { value: "default", label: (0, f.translate)("Default") }, c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Main Container"), property: "nowrong-container-color", defaultValue: "rgba(0,0,0,0)", isAlpha: !0 })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Title color"), property: "nowrong-title-color", defaultValue: "#000000" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Description color"), property: "nowrong-description-color", defaultValue: "#000000" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Question color"), property: "nowrong-question-color", defaultValue: "#000000" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Quiz result color"), property: "nowrong-summary-color", defaultValue: "#000000" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Skip form button"), property: "nowrong-skip-default-color", defaultValue: "#888888" }))), c.default.createElement(b.default, { value: "hover", label: (0, f.translate)("Hover") }, c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Skip form button"), property: "nowrong-skip-hover-color", defaultValue: "#333333" }))), c.default.createElement(b.default, { value: "focus", label: (0, f.translate)("Focus") }, c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Skip form button"), property: "nowrong-skip-focus-color", defaultValue: "#333333" })))), !this.props.settings.hasLeads && c.default.createElement(c.default.Fragment, null, c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Main Container"), property: "nowrong-container-color", defaultValue: "rgba(0,0,0,0)", isAlpha: !0 })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Title color"), property: "nowrong-title-color", defaultValue: "#333333" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Description color"), property: "nowrong-description-color", defaultValue: "#8C8C8C" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Question color"), property: "nowrong-question-color", defaultValue: "#333333" })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(15),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { default: "default", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, f.translate)("Default") }, "flat" !== this.props.quizDesign && "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Border color"), property: "nowrong-answer-border-static", defaultValue: "#EBEDEB", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-answer-background-static", defaultValue: "#FAFAFA", isAlpha: !0 }))), c.default.createElement(m.default, { value: "hover", label: (0, f.translate)("Hover") }, "flat" !== this.props.quizDesign && "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Border color"), property: "nowrong-answer-border-hover", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-answer-background-hover", defaultValue: "#F3FBFE", isAlpha: !0 }))), c.default.createElement(m.default, { value: "active", label: (0, f.translate)("Active") }, "flat" !== this.props.quizDesign && "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Border color"), property: "nowrong-answer-border-active", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-answer-background-active", defaultValue: "#F3FBFE", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(15),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { default: "default", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, f.translate)("Default") }, "flat" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Border color"), property: "nowrong-answer-chkbo-static", defaultValue: "#BFBFBF", isAlpha: !0 })), "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-answer-chkbg-static", defaultValue: "#FFFFFF", isAlpha: !0 }))), c.default.createElement(m.default, { value: "active", label: (0, f.translate)("Checked") }, "flat" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Border color"), property: "nowrong-answer-chkbo-active", defaultValue: "#17A8E3", isAlpha: !0 })), "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-answer-chkbg-active", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Icon color"), property: "nowrong-answer-chck-icon", defaultValue: "material" !== this.props.quizDesign ? "#FFFFFF" : "#17A8E3", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(15),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { default: "default", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, f.translate)("Default") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Answer text color"), property: "nowrong-answer-color-static", defaultValue: "#888888" }))), c.default.createElement(m.default, { value: "active", label: (0, f.translate)("Active") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Answer text color"), property: "nowrong-answer-color-active", defaultValue: "#333333" })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(15),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { default: "default", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, f.translate)("Default") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-submit-background-static", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Label color"), property: "nowrong-submit-color-static", defaultValue: "#FFFFFF", isAlpha: !0 }))), c.default.createElement(m.default, { value: "hover", label: (0, f.translate)("Hover") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-submit-background-hover", defaultValue: "#008FCA", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Label color"), property: "nowrong-submit-color-hover", defaultValue: "#FFFFFF", isAlpha: !0 }))), c.default.createElement(m.default, { value: "active", label: (0, f.translate)("Active") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-submit-background-active", defaultValue: "#008FCA", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Label color"), property: "nowrong-submit-color-active", defaultValue: "#FFFFFF", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(10),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(c.default.Fragment, null, c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Title color"), property: "nowrong-sshare-color", defaultValue: "#4D4D4D" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Facebook"), property: "nowrong-social-facebook", defaultValue: "#0084BF" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Twitter"), property: "nowrong-social-twitter", defaultValue: "#1DA1F2" })), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("LinkedIn"), property: "nowrong-social-linkedin", defaultValue: "#0084BF" }))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(15),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { default: "main", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "main", label: (0, f.translate)("Main") }, "flat" !== this.props.quizDesign && "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Container border"), property: "nowrong-result-border-color", defaultValue: "#EBEDEB", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Container background"), property: "nowrong-result-background-main", defaultValue: "#FAFAFA", isAlpha: !0 }))), "material" !== this.props.quizDesign && c.default.createElement(m.default, { value: "header", label: (0, f.translate)("Header") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Title color"), property: "nowrong-result-quiz-color", defaultValue: "#888888" })), "default" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-result-background-head", defaultValue: "#FAFAFA", isAlpha: !0 }))), c.default.createElement(m.default, { value: "body", label: (0, f.translate)("Body") }, c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Title color"), property: "nowrong-result-title-color", defaultValue: "#000000" })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Description color"), property: "nowrong-result-description-color", defaultValue: "#000000" })), "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Content background"), property: "nowrong-result-background-body", defaultValue: "#EBEDEB", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(15),
        d = r(p),
        h = n(3),
        m = r(h),
        y = n(10),
        b = r(y),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { default: "default", type: "tabs", extraClass: "sui-tabs-flushed" }, c.default.createElement(m.default, { value: "default", label: (0, f.translate)("Default") }, "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-result-retake-background-static", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Label color"), property: "nowrong-result-retake-color-static", defaultValue: "material" === this.props.quizDesign ? "#17A8E3" : "#FFFFFF", isAlpha: !0 }))), c.default.createElement(m.default, { value: "hover", label: (0, f.translate)("Hover") }, "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-result-retake-background-hover", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Label color"), property: "nowrong-result-retake-color-hover", defaultValue: "material" === this.props.quizDesign ? "#17A8E3" : "#FFFFFF", isAlpha: !0 }))), c.default.createElement(m.default, { value: "active", label: (0, f.translate)("Active") }, "material" !== this.props.quizDesign && c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Background color"), property: "nowrong-result-retake-background-active", defaultValue: "#17A8E3", isAlpha: !0 })), c.default.createElement(b.default, s({}, this.props, { label: (0, f.translate)("Label color"), property: "nowrong-result-retake-color-active", defaultValue: "material" === this.props.quizDesign ? "#17A8E3" : "#FFFFFF", isAlpha: !0 })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(16),
        d = r(p),
        h = n(6),
        m = r(h),
        y = n(13),
        b = r(y),
        v = n(555),
        g = r(v),
        _ = function(e) {
            function t() { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, { label: (0, f.translate)("Fonts"), description: (0, f.translate)("By default this quiz will inherit the fonts your theme uses. You can override these fonts with custom ones from Google Fonts.") }, c.default.createElement(m.default, s({}, this.props, { property: "nowrong-toggle-typography", default: "" }), c.default.createElement(b.default, { value: "", boxClass: "" }, (0, f.translate)("Use Theme Fonts")), c.default.createElement(g.default, s({}, this.props, { value: "true", boxClass: "" }), (0, f.translate)("Custom")))) } }]), t
        }(u.Component);
    t.default = _
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(44),
        d = r(p),
        h = n(556),
        m = r(h),
        y = n(557),
        b = r(y),
        v = n(558),
        g = r(v),
        _ = n(559),
        E = r(_),
        w = n(560),
        O = r(w),
        j = n(561),
        P = r(j),
        x = n(562),
        N = r(x),
        k = n(563),
        C = r(k),
        S = n(564),
        M = r(S),
        T = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement("div", { className: "sui-accordion" }, c.default.createElement("div", { className: "sui-accordion-header" }, c.default.createElement("div", null, (0, f.translate)("Element"))), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Quiz Title") }), c.default.createElement(m.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Quiz Description") }), c.default.createElement(b.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Question") }), c.default.createElement(g.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Answer") }), c.default.createElement(E.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Submit Button") }), c.default.createElement(O.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Quiz Result") }), c.default.createElement(P.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Social Share Title") }), c.default.createElement(N.default, this.props)), c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Social Share Icons") }), c.default.createElement(C.default, this.props)), this.props.settings.hasLeads && c.default.createElement(d.default, s({}, this.props, { label: (0, f.translate)("Skip Form Button") }), c.default.createElement(M.default, this.props))) } }]), t
        }(u.Component);
    t.default = T
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-title", defaultFont: "Roboto", defaultSize: "42", defaultWeight: "500" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-description", defaultFont: "Roboto", defaultSize: "20", defaultWeight: "400" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-question", defaultFont: "Roboto", defaultSize: "24", defaultWeight: "500" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-answer", defaultFont: "Roboto", defaultSize: "14", defaultWeight: "500" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-submit", defaultFont: "Roboto", defaultSize: "14", defaultWeight: "500" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = n(15),
        h = r(d),
        m = n(3),
        y = r(m),
        b = n(1),
        v = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(h.default, { default: "quiz-name", type: "tabs", extraClass: "sui-tabs-flushed" }, "material" !== this.props.quizDesign && c.default.createElement(y.default, { value: "quiz-name", label: (0, b.translate)("Quiz Name") }, c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-result-quiz", defaultFont: "Roboto", defaultSize: "14", defaultWeight: "700" }))), c.default.createElement(y.default, { value: "retake", label: (0, b.translate)("Retake") }, c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-result-retake", defaultFont: "Roboto", defaultSize: "15", defaultWeight: "500" }))), c.default.createElement(y.default, { value: "title", label: (0, b.translate)("Title") }, c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-result-title", defaultFont: "Roboto", defaultSize: "16", defaultWeight: "500" }))), c.default.createElement(y.default, { value: "description", label: (0, b.translate)("Content") }, c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-result-description", defaultFont: "Roboto", defaultSize: "14", defaultWeight: "400" })))) } }]), t
        }(u.Component);
    t.default = v
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-sshare", defaultFont: "Roboto", defaultSize: "20", defaultWeight: "400" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(1),
        p = n(18),
        d = r(p),
        h = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(d.default, s({}, this.props, { property: "nowrong-social-size", defaultValue: "36", label: (0, f.translate)("Icon size"), description: (0, f.translate)("Choose one of the pre-defined sizes we have for social share icons.") }), c.default.createElement("div", { value: "24" }, (0, f.translate)("Regular")), c.default.createElement("div", { value: "30" }, (0, f.translate)("Medium")), c.default.createElement("div", { value: "36" }, (0, f.translate)("Large"))) } }]), t
        }(u.Component);
    t.default = h
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(33),
        p = r(f),
        d = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), l(t, [{ key: "render", value: function() { return c.default.createElement(p.default, s({}, this.props, { prefix: "nowrong-skip", defaultFont: "Roboto", defaultSize: "15", defaultWeight: "400" })) } }]), t
        }(u.Component);
    t.default = d
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return { settings: e.settings, notifications: e.notifications } }

    function o(e) { return { actions: { settingsActions: (0, s.bindActionCreators)(u, e), modalActions: (0, s.bindActionCreators)(f, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(27),
        u = r(l),
        c = n(24),
        f = r(c),
        p = n(566),
        d = function(e) { return e && e.__esModule ? e : { default: e } }(p);
    t.default = (0, i.connect)(a, o)(d.default)
}, function(e, t, n) {
    "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

    function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

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
        f = n(239),
        p = r(f),
        d = n(240),
        h = r(d),
        m = function(e) {
            function t(e) { return a(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)) }
            return i(t, e), s(t, [{ key: "componentDidMount", value: function() { jQuery("html, body").animate({ scrollTop: 0 }, "fast") } }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = function(t) { e.props.history.push("/" + t) };
                    return u.default.createElement("div", { id: "powerform-form-fields", className: "sui-box" }, u.default.createElement("div", { className: "sui-box-header" }, u.default.createElement("h2", { className: "sui-box-title" }, (0, c.translate)("Behaviour"))), u.default.createElement("div", { className: "sui-box-body" }, u.default.createElement(u.default.Fragment, null, u.default.createElement(h.default, this.props), u.default.createElement(p.default, this.props))), u.default.createElement("div", { className: "sui-box-footer" }, u.default.createElement("button", { className: "sui-button", onClick: function() { return t("appearance") } }, u.default.createElement("i", { className: "sui-icon-arrow-left", "aria-hidden": "true" }), (0, c.translate)("Appearance")), u.default.createElement("div", { className: "sui-actions-right" }, u.default.createElement("button", { className: "sui-button sui-button-icon-right", onClick: function() { return t("notifications") } }, (0, c.translate)("Notifications"), u.default.createElement("i", { className: "sui-icon-arrow-right", "aria-hidden": "true" })))))
                }
            }]), t
        }(l.Component);
    t.default = m
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return { settings: e.settings, notifications: e.notifications, questions: e.questions } }

    function o(e) { return { actions: { notificationsActions: (0, s.bindActionCreators)(u, e), settingsActions: (0, s.bindActionCreators)(f, e), modalActions: (0, s.bindActionCreators)(d, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(7),
        s = n(8),
        l = n(178),
        u = r(l),
        c = n(27),
        f = r(c),
        p = n(24),
        d = r(p),
        h = n(242),
        m = function(e) { return e && e.__esModule ? e : { default: e } }(h);
    t.default = (0, i.connect)(a, o)(m.default)
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(7),
        a = n(24),
        o = n(245),
        i = function(e) { return e && e.__esModule ? e : { default: e } }(o),
        s = function(e) { return { hideModal: function() { return e((0, a.hideModal)()) }, showModal: function(t, n) { e((0, a.showModal)({ modalProps: t, modalType: n })) } } };
    t.default = (0, r.connect)(null, s)(i.default)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    }

    function a(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return { settings: e.settings } }

    function i(e) { return { actions: { settingsActions: (0, u.bindActionCreators)(f, e), modalActions: (0, u.bindActionCreators)(d, e) } } }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(0),
        l = (a(s), n(7)),
        u = n(8),
        c = n(27),
        f = r(c),
        p = n(24),
        d = r(p),
        h = n(246),
        m = a(h);
    t.default = (0, l.connect)(o, i)(m.default)
}]);