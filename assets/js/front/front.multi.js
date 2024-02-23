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
    var pluginName = "powerformFront",
        defaults = {
            form_type: 'custom-form',
            rules: {},
            messages: {},
            conditions: {},
            inline_validation: false,
            chart_design: 'bar',
            chart_options: {}
        };

    // The actual plugin constructor
    function PowerformFront(element, options) {
        this.element = element;
        this.$el = $(this.element);
        this.powerform_selector = '#' + $(this.element).attr('id') + '[data-powerform-render="' + $(this.element).data('powerform-render') + '"]';
        this.powerform_loader_selector = 'div[data-powerform-render="' + $(this.element).data('powerform-render') + '"]' + '[data-form="' + $(this.element).attr('id') + '"]';

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);

        // special treatment for rules, messages, and conditions
        if (typeof this.settings.messages !== 'undefined') {
            this.settings.messages = this.maybeParseStringToJson(this.settings.messages, 'object');
        }
        if (typeof this.settings.rules !== 'undefined') {
            this.settings.rules = this.maybeParseStringToJson(this.settings.rules, 'object');
        }
        if (typeof this.settings.calendar !== 'undefined') {
            this.settings.calendar = this.maybeParseStringToJson(this.settings.calendar, 'array');
        }

        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(PowerformFront.prototype, {
        init: function() {
            var self = this;

            $(this.powerform_loader_selector).remove();

            // If form from hustle popup, do not show
            if (this.$el.closest('.wph-modal').length === 0) {
                this.$el.show();
            }

            // Show form when popup trigger with click
            $(document).on("hustle:module:displayed", function(e, data) {
                var $modal = $('.wph-modal-active');
                $modal.find('form').css('display', '');
            });

            // Show form when popup trigger
            setTimeout(function() {
                var $modal = $('.wph-modal-active');
                $modal.find('form').css('display', '');
            }, 10);

            //selective activation based on type of form
            switch (this.settings.form_type) {
                case 'custom-form':
                    this.init_custom_form();
                    break;
                case 'poll':
                    this.init_poll_form();
                    break;
                case 'quiz':
                    this.init_quiz_form();
                    break;

            }

            //init submit
            $(this.element).powerformFrontSubmit({
                form_type: self.settings.form_type,
                powerform_selector: self.powerform_selector,
                chart_design: self.settings.chart_design,
                chart_options: self.settings.chart_options,
                fadeout: self.settings.fadeout,
                fadeout_time: self.settings.fadeout_time,
            });


            // TODO: confirm usage on form type
            // Handle field activation classes
            this.activate_field();
            // Handle special classes for material design
            this.material_field();

            // Init small form for all type of form
            this.small_form();

        },
        init_custom_form: function() {

            var self = this;

            //initiate validator
            if (this.settings.inline_validation) {

                this.init_intlTelInput_validation();

                $(this.element).powerformFrontValidate({
                    rules: self.settings.rules,
                    messages: self.settings.messages
                });
            }

            //initiate pagination
            this.init_pagination();

            //initiate condition
            $(this.element).powerformFrontCondition(this.settings.conditions);

            //initiate datepicker
            $(this.element).find('.powerform-datepicker').powerformFrontDatePicker(this.settings.calendar);

            //initiate select2
            this.init_select2();

            // Handle responsive captcha
            this.responsive_captcha();

            // Handle field counter
            this.field_counter();

            // Handle number input
            this.field_number();

            // Handle time fields
            this.field_time();

            // Handle upload field change
            this.upload_field();

            // Handle function on resize
            $(window).on('resize', function() {

                self.responsive_captcha();

            });

        },
        init_poll_form: function() {
            var self = this,
                $selection = this.$el.find('.powerform-radio--field'),
                $input = this.$el.find('.powerform-input');

            if (this.$el.hasClass('powerform-poll-disabled')) {
                this.$el.find('.powerform-radio--field').each(function() {
                    $(this).attr('disabled', true);
                });
            }

            $selection.on('click', function() {
                $input.hide();
                $input.attr('name', '');
                var checked = this.checked,
                    $id = $(this).attr('id'),
                    $name = $(this).attr('name');
                if (self.$el.find('.powerform-input#' + $id + '-extra').length) {
                    var $extra = self.$el.find('.powerform-input#' + $id + '-extra');
                    if (checked) {
                        $extra.attr('name', $name + '-extra');
                        $extra.show();
                    } else {
                        $extra.hide();
                    }
                }
                return true;
            });

        },

        init_quiz_form: function() {
            var self = this;

            this.$el.find('.powerform-button').each(function() {
                $(this).prop("disabled", true);
            });

            this.$el.find('.powerform-answer input').each(function() {
                $(this).attr('checked', false);
            });

            this.$el.find('.powerform-result--info button').on('click', function() {
                location.reload();
            });

            this.$el.find('.powerform-submit-rightaway').click(function() {
                self.$el.submit();
                $(this).closest('.powerform-question').find('.powerform-submit-rightaway').addClass('powerform-has-been-disabled').attr('disabled', 'disabled');
            });


            this.$el.on('click', '.powerform-social--icon a', function(e) {
                e.preventDefault();
                var social = $(this).data('social'),
                    message = $(this).closest('.powerform-social--icons').data('message'),
                    social_shares = {
                        'facebook': 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '&t=' + message,
                        'twitter': 'https://twitter.com/intent/tweet?&url=' + window.location.href + '&text=' + message,
                        'google': 'https://plus.google.com/share?url=' + window.location.href,
                        'linkedin': 'https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href + '&title=' + message
                    };

                if (social_shares[social] !== undefined) {
                    var newwindow = window.open(social_shares[social], social, 'height=' + $(window).height() + ',width=' + $(window).width());
                    if (window.focus) {
                        newwindow.focus();
                    }
                    return false;
                }
            });

            this.$el.on('change', '.powerform-answer input', function(e) {
                var count = 0,
                    amount_answers = self.$el.find('.powerform-question').length;

                self.$el.find('.powerform-answer input').each(function() {
                    if ($(this).prop('checked')) {
                        count++;
                    }

                    if (count === amount_answers) {
                        self.$el.find('.powerform-button').each(function() {
                            $(this).prop("disabled", false);
                        });
                    }
                });

            });

        },

        small_form: function() {

            var form = $(this.element);

            if ($(window).width() > 782) {

                if (form.parent().width() <= 420 && !form.closest('.form-preview-wrapper').length) {
                    form.addClass('powerform-size--small');
                }

            }

        },

        init_intlTelInput_validation: function() {

            var form = $(this.element),
                is_material = form.is('.powerform-design--material'),
                fields = form.find('.powerform-phone--field');

            fields.each(function() {

                // Initialize intlTelInput plugin on each field with "format check" enabled and
                // set to check either "international" or "standard" phones.
                var is_national_phone = $(this).data('national_mode'),
                    country = $(this).data('country');

                if ('undefined' !== typeof(is_national_phone)) {

                    if (is_material) {
                        $(this).unwrap('.powerform-input--wrap');
                    }

                    var args = {
                        nationalMode: ('enabled' === is_national_phone) ? true : false,
                        initialCountry: 'us',
                        utilsScript: window.PowerformFront.cform.intlTelInput_utils_script
                    };

                    if ('undefined' !== typeof(country)) {
                        args.initialCountry = country;
                        args.allowDropdown = false;
                    }

                    $(this).intlTelInput(args);

                    // intlTelInput plugin adds a markup that's not compatible with 'material' theme when 'allowDropdown' is true (default).
                    // If we're going to allow users to disable the dropdown, this should be adjusted accordingly.
                    if (is_material) {
                        $(this).closest('.intl-tel-input.allow-dropdown').addClass('powerform-phone-intl').removeClass('intl-tel-input');
                        $(this).closest('.powerform-field').addClass('intl-tel-input');
                        $(this).wrap('<div class="powerform-input--wrap"></div>');
                    }
                }
            });

        },

        init_select2: function() {

            var form = $(this.element),
                form_id = form.attr('id');

            if (form.hasClass('powerform-design--default')) {

                $(this.element).find(".powerform-select").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-dropdown powerform-dropdown--default powerform-ddfor--" + form_id
                });

                $(this.element).find(".powerform-time").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-droptime powerform-droptime--default powerform-ddfor--" + form_id
                });

            } else if (form.hasClass('powerform-design--material')) {

                $(this.element).find(".powerform-select").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-dropdown powerform-dropdown--material powerform-ddfor--" + form_id
                });

                $(this.element).find(".powerform-time").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-droptime powerform-droptime--material powerform-ddfor--" + form_id
                });

            } else if (form.hasClass('powerform-design--bold')) {

                $(this.element).find(".powerform-select").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-dropdown powerform-dropdown--bold powerform-ddfor--" + form_id
                });

                $(this.element).find(".powerform-time").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-droptime powerform-droptime--bold powerform-ddfor--" + form_id
                });

            } else if (form.hasClass('powerform-design--flat')) {

                $(this.element).find(".powerform-select").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-dropdown powerform-dropdown--flat powerform-ddfor--" + form_id
                });

                $(this.element).find(".powerform-time").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-droptime powerform-droptime--flat powerform-ddfor--" + form_id
                });

            } else {

                $(this.element).find(".powerform-select").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-dropdown powerform-ddfor--" + form_id
                });

                $(this.element).find(".powerform-time").wpmuiSelect({
                    allowClear: false,
                    containerCssClass: "powerform-select2",
                    dropdownCssClass: "powerform-droptime powerform-droptime--flat powerform-ddfor--" + form_id
                });

            }
        },

        responsive_captcha: function() {
            $(this.element).find('.powerform-g-recaptcha').each(function() {
                if ($(this).is(':visible')) {
                    var width = $(this).parent().width(),
                        scale = 1;
                    if (width < 302) {
                        scale = width / 302;
                    }
                    $(this).css('transform', 'scale(' + scale + ')');
                    $(this).css('-webkit-transform', 'scale(' + scale + ')');
                    $(this).css('transform-origin', '0 0');
                    $(this).css('-webkit-transform-origin', '0 0');
                }
            });
        },

        init_pagination: function() {
            var self = this,
                num_pages = $(this.element).find(".powerform-pagination").length,
                hash = window.location.hash,
                hashStep = false,
                step = 0;

            if (num_pages > 0) {
                //find from hash
                if (typeof hash !== "undefined" && hash.indexOf('step-') >= 0) {
                    hashStep = true;
                    step = hash.substr(6, 8);
                }

                $(this.element).powerformFrontPagination({
                    totalSteps: num_pages,
                    hashStep: hashStep,
                    step: step,
                    inline_validation: self.settings.inline_validation
                });
            }
        },

        activate_field: function() {
            var form = $(this.element);

            form.find('.powerform-input, .powerform-textarea').each(function() {

                var $ftype = $(this);

                if ($(this).val().trim() !== "") {
                    $(this).closest('.powerform-field').addClass('powerform-is_filled');
                    $(this).closest('.powerform-poll--answer').addClass('powerform-is_filled');
                } else {
                    $(this).closest('.powerform-field').removeClass('powerform-is_filled');
                    $(this).closest('.powerform-poll--answer').removeClass('powerform-is_filled');
                }

                // Set field active class on hover
                $ftype.mouseover(function(e) {
                    e.stopPropagation();
                    $(this).closest('.powerform-field').addClass('powerform-is_hover');
                    $(this).closest('.powerform-poll--answer').addClass('powerform-is_hover');

                }).mouseout(function(e) {
                    e.stopPropagation();
                    $(this).closest('.powerform-field').removeClass('powerform-is_hover');
                    $(this).closest('.powerform-poll--answer').removeClass('powerform-is_hover');

                });

                // Set field active class on focus
                $ftype.focus(function(e) {
                    e.stopPropagation();
                    $(this).closest('.powerform-field').addClass('powerform-is_active');
                    $(this).closest('.powerform-poll--answer').addClass('powerform-is_active');

                }).blur(function(e) {
                    e.stopPropagation();
                    $(this).closest('.powerform-field').removeClass('powerform-is_active');
                    $(this).closest('.powerform-poll--answer').removeClass('powerform-is_active');

                });

                // Set field filled class on change
                $ftype.change(function(e) {
                    e.stopPropagation();

                    if ($(this).val().trim() !== "") {
                        $(this).closest('.powerform-field').addClass('powerform-is_filled');
                        $(this).closest('.powerform-poll--answer').addClass('powerform-is_filled');
                    } else {
                        $(this).closest('.powerform-field').removeClass('powerform-is_filled');
                        $(this).closest('.powerform-poll--answer').removeClass('powerform-is_filled');
                    }

                    if ($(this).val().trim() !== "" && $(this).find('powerform-label--validation').text() !== "") {
                        $(this).find('.powerform-label--validation').remove();
                        $(this).find('.powerform-field').removeClass('powerform-has_error');
                    }
                });

            });

            form.find('.powerform-select + .select2, .powerform-time + .select2').each(function() {

                var $select = $(this);

                // Set field active class on hover
                $select.mouseover(function(e) {
                    e.stopPropagation();
                    $(this).closest('.powerform-field').addClass('powerform-is_hover');

                }).mouseout(function(e) {
                    e.stopPropagation();
                    $(this).closest('.powerform-field').removeClass('powerform-is_hover');

                });

                // Set field active class on focus
                $select.on('click', function(e) {
                    e.stopPropagation();
                    checkSelectActive();
                    if ($select.hasClass('select2-container--open')) {
                        $(this).closest('.powerform-field').addClass('powerform-is_active');
                    } else {
                        $(this).closest('.powerform-field').removeClass('powerform-is_active');
                    }

                });


            });

            function checkSelectActive() {
                if (form.find('.select2-container').hasClass('select2-container--open')) {
                    setTimeout(checkSelectActive, 300);
                } else {
                    form.find('.select2-container').closest('.powerform-field').removeClass('powerform-is_active');
                }
            }
        },

        field_counter: function() {
            var form = $(this.element);
            form.find('.powerform-input, .powerform-textarea').each(function() {
                var $input = $(this),
                    count = 0;

                $input.on('change keyup', function(e) {
                    e.stopPropagation();
                    var $field = $(this).closest('.powerform-field'),
                        $limit = $field.find('.powerform-field--helper .powerform-label--limit');

                    if ($limit.length) {
                        if ($limit.data('limit')) {
                            if ($limit.data('type') !== "words") {
                                count = $(this).val().trim().length;
                            } else {
                                count = $(this).val().trim().split(/\s+/).length;
                            }
                            $limit.html(count + ' / ' + $limit.data('limit'));
                        }
                    }
                });

            });
        },

        field_number: function() {
            // var form = $(this.element);
            // form.find('input[type=number]').on('change keyup', function () {
            // 	if( ! $(this).val().match(/^\d+$/) ){
            // 		var sanitized = $(this).val().replace(/[^0-9]/g, '');
            // 		$(this).val(sanitized);
            // 	}
            // });
            var form = $(this.element);
            form.find('input[type=number]').each(function() {
                $(this).keypress(function(e) {
                    var i;
                    var allowed = [44, 45, 46];
                    var key = e.which;

                    for (i = 48; i < 58; i++) {
                        allowed.push(i);
                    }

                    if (!(allowed.indexOf(key) >= 0)) {
                        e.preventDefault();
                    }
                });
            });
        },

        field_time: function() {
            $('.powerform-input-time').on('input', function(e) {
                var $this = $(this),
                    value = $this.val();

                // Allow only 2 digits for time fields
                if (value && value.length >= 2) {
                    $this.val(value.substr(0, 2));
                }
            });
        },

        material_field: function() {
            var form = $(this.element);
            if (form.is('.powerform-design--material')) {
                var $input = form.find('.powerform-input--wrap'),
                    $textarea = form.find('.powerform-textarea--wrap'),
                    $date = form.find('.powerform-date'),
                    $product = form.find('.powerform-product');

                var $navigation = form.find('.powerform-pagination--nav'),
                    $navitem = $navigation.find('li');

                $('<span class="powerform-nav-border"></span>').insertAfter($navitem);

                $input.prev('.powerform-field--label').addClass('powerform-floating--input');
                $input.closest('.powerform-phone-intl').prev('.powerform-field--label').addClass('powerform-floating--input');
                $textarea.prev('.powerform-field--label').addClass('powerform-floating--textarea');

                if ($date.hasClass('powerform-has_icon')) {
                    $date.prev('.powerform-field--label').addClass('powerform-floating--date');
                } else {
                    $date.prev('.powerform-field--label').addClass('powerform-floating--input');
                }
            }
        },

        toggle_file_input: function() {

            var form = $(this.element);

            form.find(".powerform-upload").each(function() {

                var $self = $(this),
                    $input = $self.find(".powerform-input"),
                    $remove = $self.find(".powerform-upload--remove");

                // Toggle remove button depend on input value
                if ($input.val() !== "") {
                    // Show remove button
                    $remove.show();
                } else {
                    // Hide remove button
                    $remove.hide();
                }
            });
        },

        upload_field: function() {

            var self = this,
                form = $(this.element);

            // Toggle file remove button
            this.toggle_file_input();

            // Handle remove file button click
            form.find(".powerform-upload--remove").on('click', function(e) {

                e.preventDefault();

                var $self = $(this),
                    $input = $self.siblings('.powerform-input'),
                    $label = $self.siblings('.powerform-label');

                // Cleanup
                $input.val('');
                $label.html('No file chosen');
                $self.hide();

            });

            form.find(".powerform-upload-button").on('click', function(e) {

                e.preventDefault();

                var $id = $(this).attr('data-id'),
                    $target = form.find('input#' + $id),
                    $nameLabel = form.find('label#' + $id);

                $target.trigger('click');

                $target.change(function() {

                    var vals = $(this).val(),
                        val = vals.length ? vals.split('\\').pop() : '';

                    $nameLabel.text(val);

                    self.toggle_file_input();

                });
            });

            form.find('.powerform-input-file').on('change', function(e) {

                e.preventDefault();

                var $file = $(this)[0].files.length,
                    $remove = $(this).find('~ .powerform-upload--remove');

                if ($file === 0) {
                    $remove.hide();
                } else {
                    $remove.show();
                }

            });
        },

        renderCaptcha: function(captcha_field) {
            var self = this;
            //render captcha only if not rendered
            if (typeof $(captcha_field).data('powerform-recapchta-widget') === 'undefined') {
                var size = $(captcha_field).data('size'),
                    data = {
                        sitekey: $(captcha_field).data('sitekey'),
                        theme: $(captcha_field).data('theme'),
                        size: size
                    };

                if (size === 'invisible') {
                    data.badge = 'inline';
                    data.callback = function(token) {
                        $(self.element).trigger('submit.frontSubmit');
                    };
                }

                if (data.sitekey !== "") {
                    // noinspection Annotator
                    var widget = window.grecaptcha.render(captcha_field, data);
                    // mark as rendered
                    $(captcha_field).data('powerform-recapchta-widget', widget);
                    this.responsive_captcha();
                }
            }
        },
        hide: function() {
            this.$el.hide();
        },
        /**
         * Return JSON object if possible
         *
         * We tried our best here
         * if there is an error/exception, it will return empty object/array
         *
         * @param string
         * @param type ('array'/'object')
         */
        maybeParseStringToJson: function(string, type) {
            var object = {};
            // already object
            if (typeof string === 'object') {
                return string;
            }

            if (type === 'object') {
                string = '{' + string.trim() + '}';
            } else if (type === 'array') {
                string = '[' + string.trim() + ']';
            } else {
                return {};
            }

            try {
                // remove trailing comma, duh
                /**
                 * find `,`, after which there is no any new attribute, object or array.
                 * New attribute could start either with quotes (" or ') or with any word-character (\w).
                 * New object could start only with character {.
                 * New array could start only with character [.
                 * New attribute, object or array could be placed after a bunch of space-like symbols (\s).
                 *
                 * Feel free to hack this regex if you got better idea
                 * @type {RegExp}
                 */
                var trailingCommaRegex = /\,(?!\s*?[\{\[\"\'\w])/g;
                string = string.replace(trailingCommaRegex, '');

                object = JSON.parse(string);
            } catch (e) {
                console.error(e.message);
                if (type === 'object') {
                    object = {};
                } else if (type === 'array') {
                    object = [];
                }
            }

            return object;

        },

    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new PowerformFront(this, options));
            }
        });
    };

    // hook from wp_editor tinymce
    $(document).on('tinymce-editor-init', function(event, editor) {
        // trigger editor change to save value to textarea,
        // default wp tinymce textarea update only triggered when submit
        editor.on('change', function() {
            // only powerform
            if (editor.id.indexOf('powerform-wp-editor-') === 0) {
                editor.save();
            }

        });
    });

})(jQuery, window, document);

// noinspection JSUnusedGlobalSymbols
var powerform_render_captcha = function() {
    // TODO: avoid conflict with another plugins that provide recaptcha
    //  notify powerform front that grecaptcha loaded. anc can be used
    jQuery('.powerform-g-recaptcha').each(function() {
        // find closest form
        var form = jQuery(this).closest('form');
        if (form.length > 0) {
            var powerformFront = form.data('powerformFront');
            if (typeof powerformFront !== 'undefined') {
                powerformFront.renderCaptcha(jQuery(this)[0]);
            }
        }
    });
};