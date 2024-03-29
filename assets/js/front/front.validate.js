// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; // noinspection JSUnusedLocalSymbols
(function($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "powerformFrontValidate",
        defaults = {
            rules: {},
            messages: {}
        };

    // The actual plugin constructor
    function PowerformFrontValidate(element, options) {
        this.element = element;
        this.$el = $(this.element);

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(PowerformFrontValidate.prototype, {
        init: function() {
            var self = this;

            $(this.element).validate({
                // add support for hidden required fields (uploads, wp_editor) when required
                ignore: ":hidden:not(.do-validate)",
                errorPlacement: function(error, element) {},
                onfocusout: function(element) {
                    //datepicker will be validated when its closed
                    if ($(element).hasClass('hasDatepicker') === false) {
                        $(element).valid();
                    }
                },
                highlight: function(element, errorClass, message) {
                    var errorMessage = this.errorMap[element.name],
                        $field_holder = $(element).closest('.powerform-field--inner');


                    if ($field_holder.length === 0) {
                        $field_holder = $(element).closest('.powerform-field');
                    }

                    var $error_holder = $field_holder.find('.powerform-label--validation');

                    if ($error_holder.length === 0) {
                        $field_holder.append('<label class="powerform-label--validation"></label>');
                        $error_holder = $field_holder.find('.powerform-label--validation');
                    }

                    $(element).attr('aria-invalid', 'true');
                    $error_holder.html(errorMessage);
                    $field_holder.addClass('powerform-has_error');

                    // For time field error message showing up on larger screens
                    if ($(element).hasClass('powerform-input-time')) {
                        var $time_field_holder = $(element).closest('.powerform-field:not(.powerform-field--inner)'),
                            $time_error_holder = $time_field_holder.children('.powerform-label--validation'),
                            $time_normal_error_holder = '',
                            time_error_messages = [];

                        if ($time_error_holder.length === 0) {
                            $time_field_holder.append('<label class="powerform-label--validation"></label>');
                            $time_error_holder = $time_field_holder.children('.powerform-label--validation');
                        }

                        $time_error_holder.html('');
                        $time_field_holder.find('.powerform-input-time').each(function() {
                            $time_normal_error_holder = $(this).siblings('.powerform-label--validation');
                            // So it works for material design markup
                            if ($time_normal_error_holder.length === 0) {
                                $time_normal_error_holder = $(this).closest('.powerform-field').find('.powerform-label--validation');
                            }
                            time_error_messages.push($time_normal_error_holder.html());
                        });
                        $time_error_holder.html(time_error_messages[0] + (time_error_messages[0].length > 0 ? ' <br/> ' : '') + time_error_messages[1]);
                    }
                },

                unhighlight: function(element, errorClass, validClass) {
                    var $field_holder = $(element).closest('.powerform-field--inner');

                    if ($field_holder.length === 0) {
                        $field_holder = $(element).closest('.powerform-field');
                    }

                    var $error_holder = $field_holder.find('.powerform-label--validation');

                    $(element).removeAttr('aria-invalid');
                    $error_holder.remove();
                    $field_holder.removeClass('powerform-has_error');

                    // For time field error message showing up on larger screens
                    if ($(element).hasClass('powerform-input-time')) {
                        var $time_field_holder = $(element).closest('.powerform-field:not(.powerform-field--inner)'),
                            $time_error_holder = $time_field_holder.children('.powerform-label--validation'),
                            invalids = 0,
                            time_error_message = '',
                            $time_normal_error_holder = '';

                        $time_field_holder.find('.powerform-input-time').each(function() {
                            if ($(this).attr('aria-invalid') === 'true') {
                                $time_normal_error_holder = $(this).siblings('.powerform-label--validation');
                                // So it works for material design markup
                                if ($time_normal_error_holder.length === 0) {
                                    $time_normal_error_holder = $(this).closest('.powerform-field').find('.powerform-label--validation');
                                }
                                time_error_message = $time_normal_error_holder.html();
                                invalids++;
                            }
                        });
                        if (invalids === 0) {
                            $time_error_holder.remove();
                        } else {
                            $time_error_holder.html(time_error_message);
                        }
                    }
                },
                rules: self.settings.rules,
                messages: self.settings.messages
            });

        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new PowerformFrontValidate(this, options));
            }
        });
    };
    $.validator.addMethod("validurl", function(value, element) {
        var url = $.validator.methods.url.bind(this);
        return url(value, element) || url('http://' + value, element);
    });
    $.validator.addMethod("powerformPhoneNational", function(value, element) {
        // Uses intlTelInput to check if the number is valid.
        return this.optional(element) || $(element).intlTelInput('isValidNumber');
    });
    $.validator.addMethod("powerformPhoneInternational", function(value, element) {
        // Uses intlTelInput to check if the number is valid.
        return this.optional(element) || $(element).intlTelInput('isValidNumber');
    });
    $.validator.addMethod("dateformat", function(value, element, param) {
        // dateITA method from jQuery Validator additional. Date method is deprecated and doesn't work for all formats
        var check = false,
            re = 'yy-mm-dd' !== param ? /^\d{1,2}\/\d{1,2}\/\d{4}$/ : /^\d{4}-\d{1,2}-\d{1,2}$/,
            adata, gg, mm, aaaa, xdata;

        if (re.test(value)) {
            if ('dd/mm/yy' === param) {
                adata = value.split("/");
                gg = parseInt(adata[0], 10);
                mm = parseInt(adata[1], 10);
                aaaa = parseInt(adata[2], 10);
            } else if ('mm/dd/yy' === param) {
                adata = value.split("/");
                mm = parseInt(adata[0], 10);
                gg = parseInt(adata[1], 10);
                aaaa = parseInt(adata[2], 10);
            } else {
                adata = value.split("-");
                aaaa = parseInt(adata[0], 10);
                mm = parseInt(adata[1], 10);
                gg = parseInt(adata[2], 10);
            }
            xdata = new Date(Date.UTC(aaaa, mm - 1, gg, 12, 0, 0, 0));
            if ((xdata.getUTCFullYear() === aaaa) && (xdata.getUTCMonth() === mm - 1) && (xdata.getUTCDate() === gg)) {
                check = true;
            } else {
                check = false;
            }
        } else {
            check = false;
        }
        return this.optional(element) || check;
    });
    $.validator.addMethod("maxwords", function(value, element, param) {
        return this.optional(element) || jQuery.trim(value).split(/\s+/).length <= param;
    });
    $.validator.addMethod("trim", function(value, element, param) {
        return true === this.optional(element) || 0 !== value.trim().length;
    });
    $.validator.addMethod("emailWP", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }

        // Test for the minimum length the email can be
        if (value.trim().length < 6) {
            return false;
        }

        // Test for an @ character after the first position
        if (value.indexOf('@', 1) < 0) {
            return false;
        }

        // Split out the local and domain parts
        var parts = value.split('@', 2);

        // LOCAL PART
        // Test for invalid characters
        if (!parts[0].match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\.-]+$/)) {
            return false;
        }

        // DOMAIN PART
        // Test for sequences of periods
        if (parts[1].match(/\.{2,}/)) {
            return false;
        }

        var domain = parts[1];
        // Split the domain into subs
        var subs = domain.split('.');
        if (subs.length < 2) {
            return false;
        }

        var subsLen = subs.length;
        for (var i = 0; i < subsLen; i++) {
            // Test for invalid characters
            if (!subs[i].match(/^[a-z0-9-]+$/i)) {
                return false;
            }
        }

        return true;
    });

    // $.validator.methods.required = function(value, element, param) {
    // 	console.log("required", element);
    //
    // 	return someCondition && value != null;
    // }

    // override core jquertvalidation number, to use HTML5 spec
    $.validator.methods.number = function(value, element, param) {
        return this.optional(element) || /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/.test(value);
    };

})(jQuery, window, document);