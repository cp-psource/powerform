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
    var pluginName = "powerformLoader",
        defaults = {
            action: '',
            type: '',
            id: '',
            render_id: '',
            is_preview: '',
            preview_data: [],
            nonce: false,
            last_submit_data: {},
            extra: {},
        };

    // The actual plugin constructor
    function PowerformLoader(element, options) {
        this.element = element;
        this.$el = $(this.element);

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.frontInitCalled = false;
        this.scriptsQue = [];
        this.frontOptions = null;
        this.leadFrontOptions = null;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(PowerformLoader.prototype, {
        init: function() {
            var param = (document.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
                return n = n.split("="), this[n[0]] = n[1], this
            }.bind({}))[0];

            param.action = this.settings.action;
            param.type = this.settings.type;
            param.id = this.settings.id;
            param.render_id = this.settings.render_id;
            param.is_preview = this.settings.is_preview;
            param.preview_data = JSON.stringify(this.settings.preview_data);
            param.last_submit_data = this.settings.last_submit_data;
            param.extra = this.settings.extra;
            param.nonce = this.settings.nonce;

            if ('undefined' !== typeof this.settings.has_lead) {
                param.has_lead = this.settings.has_lead;
                param.leads_id = this.settings.leads_id;
            }

            this.load_ajax(param);

        },
        load_ajax: function(param) {
            var self = this;
            $.ajax({
                type: 'POST',
                url: window.PowerformFront.ajaxUrl,
                data: param,
                cache: false,
                beforeSend: function() {
                    $(document).trigger('before.load.powerform', param.id);
                },
                success: function(data) {
                    if (data.success) {
                        var response = data.data;

                        $(document).trigger('response.success.load.powerform', param.id, data);

                        if (!response.is_ajax_load) {
                            //not load ajax
                            return false;
                        }

                        var pagination_config = [];

                        if (typeof response.pagination_config === "undefined" && typeof response.options.pagination_config !== "undefined") {
                            pagination_config = response.options.pagination_config;
                        }

                        // response.pagination_config
                        if (pagination_config) {
                            window.Powerform_Cform_Paginations = window.Powerform_Cform_Paginations || [];
                            window.Powerform_Cform_Paginations[param.id] = pagination_config;
                        }

                        self.frontOptions = response.options || null;

                        // Solution for form Preview
                        if (typeof window.Powerform_Cform_Paginations === "undefined" && self.frontOptions.pagination_config) {
                            window.Powerform_Cform_Paginations = window.Powerform_Cform_Paginations || [];
                            window.Powerform_Cform_Paginations[param.id] = self.frontOptions.pagination_config;
                        }

                        if ('undefined' !== typeof response.lead_options) {

                            self.leadFrontOptions = response.lead_options || null;

                            if (typeof window.Powerform_Cform_Paginations === "undefined" && self.leadFrontOptions.pagination_config) {
                                window.Powerform_Cform_Paginations = window.Powerform_Cform_Paginations || [];
                                window.Powerform_Cform_Paginations[param.leads_id] = self.leadFrontOptions.pagination_config;
                            }

                        }

                        //response.html
                        if (response.html) {
                            var style = response.style || null;
                            var script = response.script || null;
                            self.render_html(response.html, style, script);
                        }

                        //response.styles
                        if (response.styles) {
                            self.maybe_append_styles(response.styles);
                        }

                        if (response.scripts) {
                            self.maybe_append_scripts(response.scripts);
                        }

                        if (!response.scripts && self.frontOptions) {
                            // when no additional scripts, direct execute
                            self.init_front();
                        }


                    } else {
                        $(document).trigger('response.error.load.powerform', param.id, data);
                    }

                },
                error: function() {
                    $(document).trigger('request.error.load.powerform', param.id);
                },
            }).always(function() {
                $(document).trigger('after.load.powerform', param.id);
            });
        },

        render_html: function(html, style, script) {
            var id = this.settings.id,
                render_id = this.settings.render_id,
                // save message
                message = '',
                wrapper_message = null;

            wrapper_message = this.$el.find('.powerform-response-message');
            if (wrapper_message.length) {
                message = wrapper_message.get(0).outerHTML;
            }
            wrapper_message = this.$el.find('.powerform-poll-response-message');
            if (wrapper_message.length) {
                message = wrapper_message.get(0).outerHTML;
            }

            if (this.$el.parent().hasClass('powerform-guttenberg')) {
                this.$el.parent()
                    .html(html);
            } else {
                this.$el
                    .replaceWith(html);
            }

            if (message) {
                $('#powerform-module-' + id + '[data-powerform-render=' + render_id + '] .powerform-response-message')
                    .replaceWith(message);
                $('#powerform-module-' + id + '[data-powerform-render=' + render_id + '] .powerform-poll-response-message')
                    .replaceWith(message);
            }

            //response.style
            if (style) {
                if ($('style#powerform-module-' + id).length) {
                    $('style#powerform-module-' + id).remove();
                }
                $('body').append(style);
            }

            if (script) {
                $('body').append(script);

            }
        },

        maybe_append_styles: function(styles) {
            for (var style_id in styles) {
                if (styles.hasOwnProperty(style_id)) {
                    // already loaded?
                    if (!$('link#' + style_id).length) {
                        var link = $('<link>');
                        link.attr('rel', 'stylesheet');
                        link.attr('id', style_id);
                        link.attr('type', 'text/css');
                        link.attr('media', 'all');
                        link.attr('href', styles[style_id].src);
                        $('head').append(link);
                    }
                }
            }
        },

        maybe_append_scripts: function(scripts) {
            var self = this;
            var scripts_to_load = [];
            for (var script_id in scripts) {
                if (scripts.hasOwnProperty(script_id)) {
                    var load_on = scripts[script_id].on;
                    var load_of = scripts[script_id].load;
                    // already loaded?
                    if ('window' === load_on) {
                        if (window[load_of]) {
                            continue;
                        }
                    } else if ('$' === load_on) {
                        if ($.fn[load_of]) {
                            continue;
                        }
                    }

                    var script = {};
                    script.src = scripts[script_id].src;
                    scripts_to_load.push(script);
                    this.scriptsQue.push(script_id);
                }
            }


            if (!this.scriptsQue.length) {
                this.init_front();
                return;
            }


            for (var script_id_to_load in scripts_to_load) {
                if (scripts_to_load.hasOwnProperty(script_id_to_load)) {
                    this.load_script(scripts_to_load[script_id_to_load]);
                }
            }

        },

        load_script: function(script_props) {
            var self = this;
            var script = document.createElement('script');
            var body = document.getElementsByTagName('body')[0];

            script.type = 'text/javascript';
            script.src = script_props.src;
            script.async = true;
            script.defer = true;
            script.onload = function() {
                self.script_on_load();
            };

            body.appendChild(script);
        },

        script_on_load: function() {
            this.scriptsQue.pop();

            if (!this.scriptsQue.length) {
                this.init_front();
            }
        },

        init_front: function() {
            if (this.frontInitCalled) {
                return;
            }


            this.frontInitCalled = true;
            var id = this.settings.id;
            var render_id = this.settings.render_id;
            var options = this.frontOptions || null;
            var lead_options = this.leadFrontOptions || null;

            if (options) {
                $('#powerform-module-' + id + '[data-powerform-render=' + render_id + ']')
                    .powerformFront(options);
            }
            if ('undefined' !== typeof this.settings.has_lead && lead_options) {
                var leads_id = this.settings.leads_id;
                $('#powerform-module-' + leads_id + '[data-powerform-render=' + render_id + ']')
                    .powerformFront(lead_options);
            }

            this.init_window_vars();

        },

        init_window_vars: function() {
            // RELOAD type
            if (typeof PowerformValidationErrors !== 'undefined') {
                var powerformFrontSubmit = jQuery(PowerformValidationErrors.selector).data('powerformFrontSubmit');
                if (typeof powerformFrontSubmit !== 'undefined') {
                    powerformFrontSubmit.show_messages(PowerformValidationErrors.errors);
                }
            }

            if (typeof PowerformFormHider !== 'undefined') {
                var powerformFront = jQuery(PowerformFormHider.selector).data('powerformFront');
                if (typeof powerformFront !== 'undefined') {
                    powerformFront.hide();
                }
            }
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new PowerformLoader(this, options));
            }
        });
    };


})(jQuery, window, document);