<?php

/**
 * Front render class for custom forms
 *
 * @since 1.0
 */
class Powerform_CForm_Front extends Powerform_Render_Form {

	/**
	 * Class instance
	 *
	 * @var Powerform_Render_Form|null
	 */
	private static $instance = null;

	/**
	 * @var null|Powerform_PayPal_Express
	 */
	private static $paypal = null;

	/**
	 * @var array
	 */
	private static $paypal_forms = array();

	/**
	 * @var string
	 */
	private $inline_rules = '';

	/**
	 * @var string
	 */
	private $inline_messages = '';

	/**
	 * @var array
	 */
	private $forms_properties = array();

	/**
	 * Model data
	 *
	 * @var Powerform_Custom_Form_Model
	 */
	public $model = null;

	/**
	 * Styles to be enqueued
	 *
	 * @var array
	 */
	private $styles = array();

	/**
	 * Scripts to be enqueued
	 *
	 * @var array
	 */
	private $scripts = array();

	/**
	 * Script to be printed
	 *
	 * @var array
	 */
	private $script = '';

	protected $ajax_load_action = 'powerform_load_cform';


	/**
	 * Initialize method
	 *
	 * @since 1.0
	 */
	public function init() {
		add_shortcode( 'powerform_form', array( $this, 'render_shortcode' ) );
	}

	/**
	 * Return class instance
	 *
	 * @since 1.0
	 * @return Powerform_CForm_Front
	 */
	public static function get_instance() {
		return new self();
	}

	/**
	 * Display form method
	 *
	 * @since 1.0
	 *
	 * @param      $id
	 * @param bool $is_preview
	 * @param bool $data
	 * @param bool $hide If true, display: none will be added on the form markup and later removed with JS
	 */
	public function display( $id, $is_preview = false, $data = false, $hide = true ) {

		if ( $data && ! empty( $data ) ) {
			$this->model = Powerform_Custom_Form_Model::model()->load_preview( $id, $data );
			// its preview!
			$this->model->id = $id;
		} else {
			$this->model = Powerform_Custom_Form_Model::model()->load( $id );

			if ( ! $this->model instanceof Powerform_Custom_Form_Model ) {
				return;
			}
		}

		$this->maybe_define_cache_constants();

		// TODO: make preview and ajax load working similar

		// preview force using ajax
		$is_ajax_load = $this->is_ajax_load( $is_preview );

		if ( $is_ajax_load ) {
			$this->generate_render_id( $id );
			$this->get_form_placeholder( $id, true );
			$this->enqueue_form_scripts( $is_preview, $is_ajax_load );

			return;
		}

		if ( $this->is_displayable( $is_preview ) ) {

			echo $this->get_html( $hide, $is_preview );// wpcs xss ok.

			if ( is_admin() || $is_preview ) {
				$this->print_styles();
			} else {
				add_action( 'wp_footer', array( $this, 'print_styles' ), 9999 );
			}

			if ( $is_preview ) {
				$this->powerform_render_front_scripts();
			}

			$this->enqueue_form_scripts( $is_preview );

		}
	}


	/**
	 * Header message to handle error message
	 *
	 * @since 1.0
	 */
	public function render_form_header() {
		//if rendered on Preview, the array is empty and sometimes PHP notices show up
		if ( ! isset( self::$render_ids[ $this->model->id ] ) ) {
			self::$render_ids[ $this->model->id ] = 0;
		}
		$content = '<div class="powerform-cform-response-message">';
		ob_start();
		do_action( 'powerform_cform_post_message', $this->model->id, self::$render_ids[ $this->model->id ] ); //prints html, so we need to capture this
		$content .= ob_get_clean();
		$content .= '</div>';

		return $content;
	}

	/**
	 * Enqueue form scripts
	 *
	 * @since 1.0
	 *
	 * @param      $is_preview
	 * @param bool $is_ajax_load
	 */
	public function enqueue_form_scripts( $is_preview, $is_ajax_load = false ) {
		$is_ajax_load = $is_preview || $is_ajax_load;

		// Core scripts and styles always included!
		powerform_print_front_styles( POWERFORM_VERSION );
		powerform_print_front_scripts( POWERFORM_VERSION );

		// Load reCaptcha scripts
		if ( $this->has_captcha() ) {
			$first_captcha = $this->find_first_captcha();
			$language      = get_option( "powerform_captcha_language", "en" );
			$language      = Powerform_Field::get_property( 'language', $first_captcha, $language );
			$src           = 'https://www.google.com/recaptcha/api.js?hl=' . $language . '&onload=powerform_render_captcha&render=explicit';

			if ( ! $is_ajax_load ) {
				wp_enqueue_script(
					'powerform-google-recaptcha',
					$src,
					array( 'jquery' ),
					POWERFORM_VERSION,
					true
				);
			} else {
				// load later via ajax to avoid cache
				$this->scripts['powerform-google-recaptcha'] = array(
					'src'  => $src,
					'on'   => 'window',
					'load' => 'grecaptcha',
				);
			}

		}

		// todo: solve this
		// load date picker scripts always
		wp_enqueue_script( 'jquery-ui-datepicker' );

		// load int-tels
		if ( $this->has_phone() ) {
			$style_src     = powerform_plugin_url() . 'assets/css/intlTelInput.min.css';
			$style_version = "4.0.3";

			$script_src     = powerform_plugin_url() . 'assets/js/library/intlTelInput.min.js';
			$script_version = POWERFORM_VERSION;

			if ( ! $is_ajax_load ) {
				wp_enqueue_style( 'intlTelInput-powerform-css', $style_src, array(), $style_version ); // intlTelInput
				wp_enqueue_script( 'powerform-intlTelInput', $script_src, array( 'jquery' ), $script_version, false ); // intlTelInput
			} else {
				// load later via ajax to avoid cache
				$this->styles['intlTelInput-powerform-css'] = array( 'src' => add_query_arg( 'ver', $style_version, $style_src ) );
				$this->scripts['powerform-intlTelInput']    = array(
					'src'  => add_query_arg( 'ver', $style_version, $script_src ),
					'on'   => '$',
					'load' => 'intlTelInput',
				);
			}

		}

		// todo: solve this
		// load buttons css
		wp_enqueue_style( 'buttons' );

		if ( $this->has_postdata() ) {
			if ( $is_ajax_load ) {
				if ( class_exists( '_WP_Editors' ) ) {
					ob_start();
					_WP_Editors::enqueue_scripts();
					print_footer_scripts();
					_WP_Editors::editor_js();
					$this->script .= ob_get_clean();
				}

			}
		}

		// Load selected google font
		$fonts        = $this->get_google_fonts();
		$loaded_fonts = array();
		foreach ( $fonts as $setting_name => $font_name ) {
			if ( ! empty( $font_name ) ) {
				if ( in_array( sanitize_title( $font_name ), $loaded_fonts, true ) ) {
					continue;
				}

				$google_font_url = add_query_arg(
					array( 'family' => $font_name ),
					'https://fonts.googleapis.com/css'
				);

				if ( ! $is_ajax_load ) {
					wp_enqueue_style( 'powerform-font-' . sanitize_title( $font_name ), 'https://fonts.googleapis.com/css?family=' . $font_name, array(), '1.0' );
				} else {
					// load later via ajax to avoid cache
					$this->styles[ 'powerform-font-' . sanitize_title( $font_name ) . '-css' ] = array( 'src' => $google_font_url );

				}
				$loaded_fonts[] = sanitize_title( $font_name );
			}
		}

		//Load Front Render Scripts
		//render front script of form front end initialization
		if ( ! $is_ajax_load ) {
			add_action( 'wp_footer', array( $this, 'powerform_render_front_scripts' ), 9999 );
		}

	}

	/**
	 * Render shortcode
	 *
	 * @since 1.0
	 *
	 * @param array $atts
	 *
	 * @return string
	 */
	public function render_shortcode( $atts = array() ) {
		//use already created instance if already available
		$view = self::get_instance();
		if ( ! isset( $atts['id'] ) ) {
			return $view->message_required();
		}

		$is_preview = isset( $atts['is_preview'] ) ? $atts['is_preview'] : false;
		$is_preview = filter_var( $is_preview, FILTER_VALIDATE_BOOLEAN );

		$preview_data = isset( $atts['preview_data'] ) ? $atts['preview_data'] : array();

		ob_start();

		$view->display( $atts['id'], $is_preview, $preview_data );
		$view->ajax_loader( $is_preview, $preview_data );

		return ob_get_clean();
	}

	/**
	 * Return Form ID required message
	 *
	 * @since 1.0
	 * @return mixed
	 */
	public function message_required() {
		return __( "Formular-ID-Attribut ist erforderlich!", Powerform::DOMAIN );
	}

	/**
	 * Return From ID not found message
	 *
	 * @since 1.0
	 * @return mixed
	 */
	public function message_not_found() {
		return __( "Formular ID nicht gefunden!", Powerform::DOMAIN );
	}

	/**
	 * Return form wrappers & fields
	 *
	 * @since 1.0
	 * @return array|mixed
	 */
	public function get_wrappers() {
		if ( is_object( $this->model ) ) {
			return $this->model->get_fields_grouped();
		} else {
			return $this->message_not_found();
		}
	}

	/**
	 * Return form wrappers & fields
	 *
	 * @since 1.0
	 * @return array|mixed
	 */
	public function get_fields() {
		$fields   = array();
		$wrappers = $this->get_wrappers();

		// Fallback
		if ( empty( $wrappers ) ) {
			return $fields;
		}

		foreach ( $wrappers as $key => $wrapper ) {

			if ( ! isset( $wrapper['fields'] ) ) {
				return array();
			}

			foreach ( $wrapper['fields'] as $k => $field ) {
				$fields[] = $field;
			}
		}

		return $fields;
	}

	/**
	 * Get submit field
	 *
	 * @since 1.6
	 *
	 * @return array
	 */
	public function get_submit_field() {
		$settings = $this->get_form_settings();
		if ( ! isset( $settings['submitData'] ) ) {
			$settings['submitData'] = array();
		}
		$defaults = array(
			'element_id' => 'submit',
			'type'       => 'submit',
			'conditions' => array(),
		);

		$submit_data = array_merge( $defaults, $settings['submitData'] );

		return $submit_data;
	}

	/**
	 * Return before wrapper markup
	 *
	 * @since 1.0
	 *
	 * @param $wrapper
	 *
	 * @return mixed
	 */
	public function render_wrapper_before( $wrapper ) {
		$html = '<div class="powerform-row">';

		return apply_filters( 'powerform_before_wrapper_markup', $html, $wrapper );
	}

	/**
	 * Return after wrapper markup
	 *
	 * @since 1.0
	 *
	 * @param $wrapper
	 *
	 * @return mixed
	 */
	public function render_wrapper_after( $wrapper ) {
		$html = '</div>';

		return apply_filters( 'powerform_after_wrapper_markup', $html, $wrapper );
	}

	/**
	 * Extra form classes for ajax
	 *
	 * @since 1.0
	 */
	public function form_extra_classes() {
		$ajax_form = $this->is_ajax_submit();

		if ( $this->is_preview ) {
			$ajax_form = true;
		}

		return $ajax_form ? 'powerform_ajax' : '';
	}

	/**
	 * Return fields markup
	 *
	 * @since 1.0
	 *
	 * @param bool $render
	 *
	 * @return string|void
	 */
	public function render_fields( $render = true ) {
		$html = '';
		$step = 1;

		$wrappers = $this->get_wrappers();

		$html .= $this->do_before_render_form_fields_for_addons();

		// Check if we have pagination field
		if ( $this->has_pagination() ) {
			$html .= $this->pagination_start();
			$html .= $this->pagination_header();
			$html .= $this->pagination_content_start();
		}

		if ( ! empty( $wrappers ) ) {
			foreach ( $wrappers as $key => $wrapper ) {

				//a wrapper with no fields, continue to next wrapper
				if ( ! isset( $wrapper['fields'] ) ) {
					continue;
				}

				$has_pagination = false;

				// Skip row markup if pagination field
				if ( ! $this->is_pagination_row( $wrapper ) ) {
					// Render before wrapper markup
					$html .= $this->render_wrapper_before( $wrapper );
				}

				foreach ( $wrapper['fields'] as $k => $field ) {
					if ( $this->is_pagination( $field ) ) {
						$has_pagination = true;
					}

					// Skip row markup if pagination field
					if ( ! $this->is_pagination_row( $wrapper ) ) {
						$html .= $this->get_field( $field );
					}
				}

				// Skip row markup if pagination field
				if ( ! $this->is_pagination_row( $wrapper ) ) {
					// Render after wrapper markup
					$html .= $this->render_wrapper_after( $wrapper );
				}

				if ( $has_pagination ) {
					$html .= $this->pagination_content_end();
					if ( isset( $field ) ) {
						$html .= $this->pagination_step( $step, $field );
					}
					$html .= $this->pagination_header();
					$html .= $this->pagination_content_start();
					$step ++;
				}
			}
		}

		// Check if we have pagination field
		if ( $this->has_pagination() ) {
			$html .= $this->pagination_content_end();
			$html .= $this->pagination_submit_button();
			$html .= $this->pagination_end();
		}

		$html .= $this->do_after_render_form_fields_for_addons();

		if ( $render ) {
			echo wp_kses_post( $html );// wpcs XSS ok. unescaped html output expected
		} else {
			/** @noinspection PhpInconsistentReturnPointsInspection */
			return apply_filters( 'powerform_render_fields_markup', $html, $wrappers );
		}
	}

	/**
	 * Return if the row is pagination
	 *
	 * @since 1.0
	 *
	 * @param $wrapper
	 *
	 * @return bool
	 */
	public function is_pagination_row( $wrapper ) {
		$is_single = $this->is_single_field( $wrapper );

		if ( $is_single && isset( $wrapper['fields'][0]['type'] ) && "pagination" === $wrapper['fields'][0]['type'] ) {
			return true;
		}

		return false;
	}

	/**
	 * Return if only single field in the wrapper
	 *
	 * @since 1.0
	 *
	 * @param $wrapper
	 *
	 * @return bool
	 */
	public function is_single_field( $wrapper ) {
		if ( isset( $wrapper['fields'] ) && ( count( $wrapper['fields'] ) === 1 ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Return pagination header
	 *
	 * @since 1.0
	 * @return string
	 */
	public function pagination_header() {

		$type           = $this->get_pagination_type();
		$has_pagination = $this->has_pagination_header();

		if ( ! $has_pagination ) {
			return '';
		}

		if ( 'bar' === $type ) {

			$html = '<div class="powerform-pagination--bar"></div>';

		} else {

			$html = '<ol class="powerform-pagination--nav"></ol>';

		}

		return apply_filters( 'powerform_pagination_header_markup', $html );

	}

	/**
	 * Return pagination start markup
	 *
	 * @since 1.0
	 * @return string
	 */
	public function pagination_start() {

		$form_settings = $this->get_form_settings();
		$label         = __( "Fertig", Powerform::DOMAIN );

		if ( isset( $form_settings['pagination-step-label'] ) ) {
			$label = $form_settings['pagination-step-label'];
		}

		$html = sprintf( '<div class="powerform-pagination powerform-pagination-start" data-step="0" data-label="%1$s">', $label );

		return apply_filters( 'powerform_pagination_start_markup', $html, $label );

	}


	/**
	 * Get Pagination Properties as array
	 *
	 * @since 1.1
	 *
	 *
	 * @return array
	 */
	public function get_pagination_properties() {

		$form_settings = $this->get_form_settings();

		$properties = array(
			'has-pagination'                => $this->has_pagination(),
			'pagination-header-design'      => 'off',
			'pagination-step-label'         => __( "Fertig", Powerform::DOMAIN ),
			'pagination-labels'             => 'none',
			'pagination-footer-button-text' => __( "Zurück", Powerform::DOMAIN ),
			'pagination-right-button-text'  => __( "Weiter", Powerform::DOMAIN ),
		);

		foreach ( $properties as $property => $value ) {
			if ( isset( $form_settings[ $property ] ) ) {
				$new_value = $form_settings[ $property ];
				if ( is_bool( $value ) ) {
					// return boolean
					$new_value = filter_var( $new_value, FILTER_VALIDATE_BOOLEAN );
				} elseif ( is_string( $new_value ) ) {
					// if empty string fallback to default
					if ( empty( $new_value ) ) {
						$new_value = $value;
					}
				}
				$properties[ $property ] = $new_value;
			}
		}

		$form_id = $this->model->id;

		/**
		 * Filter pagination properties
		 *
		 * @since 1.1
		 *
		 * @param array $properties
		 * @param int   $form_id Current Form ID
		 */
		$properties = apply_filters( 'powerform_pagination_properties', $properties, $form_id );

		return $properties;

	}

	/**
	 * Return pagination content start markup
	 *
	 * @since 1.0
	 * @return string
	 */
	public function pagination_content_start() {
		$html = '<div class="powerform-pagination--content">';

		return apply_filters( 'powerform_pagination_content_start_markup', $html );
	}

	/**
	 * Return pagination content end markup
	 *
	 * @since 1.0
	 * @return string
	 */
	public function pagination_content_end() {
		$html = '</div>';

		return apply_filters( 'powerform_pagination_content_end_markup', $html );
	}

	/**
	 * Return submit field custom class
	 *
	 * @since 1.6
	 * @return mixed
	 */
	public function get_submit_custom_clas() {
		$settings = $this->get_form_settings();

		// Submit data is missing
		if ( ! isset( $settings['submitData'] ) ) {
			return false;
		}

		if ( isset( $settings['submitData']['custom-class'] ) && ! empty( $settings['submitData']['custom-class'] ) ) {
			return $settings['submitData']['custom-class'];
		}

		return false;
	}

	/**
	 * Return pagination submit button markup
	 *
	 * @since 1.0
	 * @return string
	 */
	public function pagination_submit_button() {
		$button       = $this->get_submit_button_text();
		$custom_class = $this->get_submit_custom_clas();

		$class = 'powerform-button powerform-pagination-submit';

		if ( $custom_class && ! empty( $custom_class ) ) {
			$class .= ' ' . $custom_class;
		}

		if ( $this->get_form_design() !== 'material' ) {

			$html = sprintf( '<button class="' . $class . '" style="display: none;" disabled>%s</button>', $button );
		} else {
			$html
				=
				sprintf( '<button class="' . $class
				         . '" style="display: none;" disabled><span class="powerform-button--mask" aria-label="hidden"></span><span class="powerform-button--text">%s</span></button>',
				         $button );
		}

		return apply_filters( 'powerform_pagination_submit_markup', $html );
	}

	/**
	 * Return pagination end markup
	 *
	 * @since 1.0
	 * @return string
	 */
	public function pagination_end() {
		$html = '</div>';

		return apply_filters( 'powerform_pagination_end_markup', $html );
	}

	/**
	 * Return pagination start markup
	 *
	 * @since 1.0
	 *
	 * @param $step
	 * @param $field
	 *
	 * @return string
	 */
	public function pagination_step( $step, $field ) {
		$label = sprintf( '%s %s', __( "Schritt", Powerform::DOMAIN ), $step );
		if ( isset( $field['pagination-label'] ) ) {
			$label = $field['pagination-label'];
		}

		$html = sprintf( '</div><div class="powerform-pagination" data-step="%1$s" data-label="%2$s">', $step, $label );

		return apply_filters( 'powerform_pagination_step_markup', $html, $step, $label );
	}

	/**
	 * Return field markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function get_field( $field ) {
		$html = '';

		do_action( 'powerform_before_field_render', $field );

		// Get field object
		/** @var Powerform_Field $field_object */
		$field_object = powerform_get_field( $this->get_field_type( $field ) );

		// If bool, abort
		if ( is_bool( $field_object ) ) {
			return $html;
		}

		if ( $field_object->is_available( $field ) ) {
			if ( ! $this->is_hidden( $field ) ) {
				// Render before field markup
				$html .= $this->render_field_before( $field );
			}

			// Render field
			$html .= $this->render_field( $field );

			if ( ! $this->is_hidden( $field ) ) {
				// Render after field markup
				$html .= $this->render_field_after( $field );
			}
		}

		do_action( 'powerform_after_field_render', $field );

		return $html;
	}

	/**
	 * Return field markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function render_field( $field ) {
		$html            = '';
		$type            = $this->get_field_type( $field );
		$field_label     = $this->get_field_label( $field );
		$placeholder     = $this->get_placeholder( $field );
		$is_required     = $this->is_required( $field );
		$has_placeholder = $placeholder ? true : false;

		// deprecated, label should be handled by field class it seld
//		if ( ! $this->is_hidden( $field ) && ! $this->has_label( $field ) ) {
//
//			if ( ! $this->is_multi_name( $field ) ) {
//				$html .= $this->get_field_label_markup( $field_label, $is_required, $has_placeholder, $field );
//			}
//
//			// If field labels are empty
//			if ( ! $field_label ) {
//				if ( $is_required ) {
//					$html .= $this->get_field_label_markup( '', true, true, $field );
//				}
//			}
//		}

		// Get field object
		/** @var Powerform_Field $field_object */
		$field_object = powerform_get_field( $type );

		// Print field markup
		$html .= $field_object->markup( $field, $this->model->settings );

		$this->inline_rules    .= $field_object->get_validation_rules();
		$this->inline_messages .= $field_object->get_validation_messages();

		// Print field description
//		$html .= $this->get_description( $field );

		return apply_filters( 'powerform_field_markup', $html, $field, $this );
	}

	/**
	 * Return field ID
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return string
	 */
	public function get_id( $field ) {
		if ( ! isset( $field['element_id'] ) ) {
			return '';
		}

		return $field['element_id'];
	}

	/**
	 * Return field columns
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return string
	 */
	public function get_cols( $field ) {
		if ( ! isset( $field['cols'] ) ) {
			return '12';
		}

		return $field['cols'];
	}


	/**
	 * Return if field is required
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return bool
	 */
	public function is_required( $field ) {

		$required = Powerform_Field::get_property( 'required', $field, false );
		$required = filter_var( $required, FILTER_VALIDATE_BOOLEAN );

		return $required;
	}

	/**
	 * Return field type
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function get_field_type( $field ) {
		if ( ! isset( $field['type'] ) ) {
			return false;
		}

		return $field['type'];
	}

	/**
	 * Return placeholder
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function get_placeholder( $field ) {
		if ( ! isset( $field['placeholder'] ) ) {
			return '';
		}

		return $this->sanitize_output( $field['placeholder'] );
	}

	/**
	 * Return field label
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function get_field_label( $field ) {
		if ( ! isset( $field['field_label'] ) ) {
			return '';
		}

		return $this->sanitize_output( $field['field_label'] );
	}

	/**
	 * Return field label markup
	 *
	 * @since 1.0
	 *
	 * @param $label
	 * @param $required
	 * @param $placeholder
	 * @param $field
	 *
	 * @return mixed
	 */
	public function get_field_label_markup( $label, $required, $placeholder, $field ) {
		_deprecated_function( __METHOD__, '1.6' );
		// Skip markup if label missing
		if ( empty( $label ) ) {
			return '';
		}

		$container_class = 'powerform-field--label';
		$type            = $this->get_field_type( $field );
		/** @var Powerform_Field $field_object */
		$field_object = powerform_get_field( $type );
		$design       = $this->get_form_design();

		if ( $required ) {
			$asterisk = ' ' . powerform_get_required_icon();
		} else {
			$asterisk = '';
		}

		$html = sprintf( '<div class="%s">', $container_class );
		$html .= sprintf( '<label class="powerform-label" id="%s">%s%s</label>', 'powerform-label-' . $field['element_id'], $label, $asterisk );
		$html .= sprintf( '</div>' );

		return apply_filters( 'powerform_field_get_field_label', $html, $label );
	}

	/**
	 * Return description markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function get_description( $field ) {
		_deprecated_function( __METHOD__, '1.6' );
		$type = $this->get_field_type( $field );
		/** @var Powerform_Field $field_object */
		$field_object              = powerform_get_field( $type );
		$has_phone_character_limit = ( ( isset( $field['phone_validation'] ) && $field['phone_validation'] )
		                               && ( isset( $field['phone_validation_type'] )
		                                    && 'character_limit' === $field['phone_validation_type'] ) );

		if ( ( isset( $field['description'] ) && ! empty( $field['description'] ) ) || isset( $field['text_limit'] ) || $has_phone_character_limit ) {

			$html = sprintf( '<div class="powerform-field--helper">' );

			if ( isset( $field['description'] ) && ! empty( $field['description'] ) ) {
				$description = $this->sanitize_output( $field['description'] );
				if ( "false" === $description ) {
					$description = '';
				}
				$html .= sprintf( '<label class="powerform-label--helper">%s</label>', $description );
			}

			if ( ( isset( $field['text_limit'] ) || isset( $field['phone_limit'] ) ) && isset( $field['limit'] ) && $field_object->has_counter || $has_phone_character_limit ) {
				if ( ( isset( $field['text_limit'] ) && $field['text_limit'] ) || ( isset( $field['phone_limit'] ) && $field['phone_limit'] ) || $has_phone_character_limit ) {
					$limit = isset( $field['limit'] ) ? $field['limit'] : '';
					if ( empty( $limit ) && $has_phone_character_limit ) {
						$limit = 10;
					}
					$limit_type = isset( $field['limit_type'] ) ? $field['limit_type'] : '';
					$html       .= sprintf( '<label class="powerform-label--limit" data-limit="%s" data-type="%s">0 / %s</label>', $limit, $limit_type, $limit );
				}
			}

			$html .= sprintf( '</div>' );
		} else {
			$html = '';
		}

		return apply_filters( 'powerform_field_get_description', $html, $field );
	}

	/**
	 * Return field before markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function render_field_before( $field ) {
		$class = $this->get_classes( $field );
		$cols  = $this->get_cols( $field );
		$id    = $this->get_id( $field );

		$html = sprintf( '<div id="%s" class="powerform-col powerform-col-%s"><div class="%s">', $id, $cols, $class );

		return apply_filters( 'powerform_before_field_markup', $html, $class );
	}

	/**
	 * Return field after markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function render_field_after( $field ) {
		$html = sprintf( '</div></div>' );

		return apply_filters( 'powerform_after_field_markup', $html, $field );
	}

	/**
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_form_type() {
		return 'custom-form';
	}

	/**
	 * Return Form Settins
	 *
	 * @since 1.0
	 * @return mixed
	 */
	public function get_form_settings() {
		// If not using the new "submission-behaviour" setting, set it according to the previous settings
		if ( ! isset( $this->model->settings['submission-behaviour'] ) ) {
			$redirect = ( isset( $this->model->settings['redirect'] ) && filter_var( $this->model->settings['redirect'], FILTER_VALIDATE_BOOLEAN ) );
			$thankyou = ( isset( $this->model->settings['thankyou'] ) && filter_var( $this->model->settings['thankyou'], FILTER_VALIDATE_BOOLEAN ) );

			if ( ! $redirect && ! $thankyou ) {
				$this->model->settings['submission-behaviour'] = 'behaviour-thankyou';
			} elseif ( $thankyou ) {
				$this->model->settings['submission-behaviour'] = 'behaviour-thankyou';
			} elseif ( $redirect ) {
				$this->model->settings['submission-behaviour'] = 'behaviour-redirect';
			}
		}

		return $this->model->settings;
	}

	/**
	 * Return if hidden field
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function is_hidden( $field ) {
		// Array of hidden fields
		$hidden = apply_filters( 'powerform_cform_hidden_fields', array( 'hidden' ) );

		if ( in_array( $field['type'], $hidden, true ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Return if name field
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function is_multi_name( $field ) {
		// Array of hidden fields
		$hidden = apply_filters( 'powerform_cform_hidden_fields', array( 'name' ) );

		if ( ( in_array( $field['type'], $hidden, true ) ) && ( isset( $field['multiple_name'] ) && $field['multiple_name'] ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Return if field has label
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function has_label( $field ) {
		// Array of hidden fields
		$without_label = apply_filters( 'powerform_cform_fields_without_label', array( '' ) );

		if ( in_array( $field['type'], $without_label, true ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Return Form Design
	 *
	 * @since 1.0
	 * @return mixed|string
	 */
	public function get_form_design() {
		$form_settings = $this->get_form_settings();

		if ( ! isset( $form_settings['form-style'] ) ) {
			return 'default';
		}

		return $form_settings['form-style'];
	}

	/**
	 * Return fields style
	 *
	 * @since 1.0
	 * @return mixed
	 */
	public function get_fields_style() {
		$form_settings = $this->get_form_settings();

		if ( ! isset( $form_settings['fields-style'] ) ) {
			return 'open';
		}

		return $form_settings['fields-style'];
	}

	/**
	 * Ajax submit
	 * Check if the form is ajax submit
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function is_ajax_submit() {
		$form_settings = $this->get_form_settings();

		if ( ! isset( $form_settings['enable-ajax'] ) || empty( $form_settings['enable-ajax'] ) ) {
			return false;
		}

		return filter_var( $form_settings['enable-ajax'], FILTER_VALIDATE_BOOLEAN );
	}

	/**
	 * Check if honeypot protection is enabled
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function is_honeypot_enabled() {
		$form_settings = $this->get_form_settings();

		if ( ! isset( $form_settings['honeypot'] ) ) {
			return false;
		}

		return filter_var( $form_settings['honeypot'], FILTER_VALIDATE_BOOLEAN );
	}

	/**
	 * Check if form has a captcha field
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_captcha() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "captcha" === $field["type"] ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Check if form has a date field
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_date() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "date" === $field["type"] ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Check if form has a date field
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_upload() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "upload" === $field["type"] || "postdata" === $field["type"] ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Check if form has a pagination field
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_pagination() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "pagination" === $field["type"] ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Return if field is pagination
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return bool
	 */
	public function is_pagination( $field ) {
		if ( isset( $field["type"] ) && "pagination" === $field["type"] ) {
			return true;
		}

		return false;
	}

	/**
	 * Return field classes
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return string
	 */
	public function get_classes( $field ) {

		$class = 'powerform-field';

		if ( isset( $field['custom-class'] ) && ! empty( $field['custom-class'] ) ) {
			$class .= ' ' . $field['custom-class'];
		}

		return $class;
	}

	/**
	 * Return fields conditions for JS
	 *
	 * @since 1.0
	 *
	 * @param $id
	 *
	 * @return mixed
	 */
	public function get_relations( $id ) {
		$relations = array();
		$fields    = $this->get_fields();

		// Add submit as field
		$fields[] = $this->get_submit_field();

		// Fallback
		if ( empty( $fields ) ) {
			return $relations;
		}

		foreach ( $fields as $field ) {
			if ( $this->is_conditional( $field ) ) {
				$field_conditions = isset( $field['conditions'] ) ? $field['conditions'] : array();

				foreach ( $field_conditions as $condition ) {
					if ( $id === $condition['element_id'] ) {
						$relations[] = $this->get_field_id( $field );
					}
				}
			}
		}

		return $relations;
	}

	/**
	 * Return fields conditions for JS
	 *
	 * @since 1.0
	 * @return mixed
	 */
	public function get_conditions() {
		$conditions = array();
		$relations  = array();
		$fields     = $this->get_fields();

		// Add submit as field
		$fields[] = $this->get_submit_field();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				$id               = $this->get_field_id( $field );
				$relations[ $id ] = $this->get_relations( $id );

				// Check if conditions are enabled
				if ( $this->is_conditional( $field ) ) {
					$field_data       = array();
					$condition_action = isset( $field['condition_action'] ) ? $field['condition_action'] : 'show';
					$condition_rule   = isset( $field['condition_rule'] ) ? $field['condition_rule'] : 'all';
					$field_conditions = isset( $field['conditions'] ) ? $field['conditions'] : array();

					foreach ( $field_conditions as $condition ) {
						$new_condition = array(
							'field'    => $condition['element_id'],
							'operator' => $condition['rule'],
							'value'    => $condition['value'],
						);

						$field_data[] = $new_condition;
					}

					$conditions[ $id ] = array(
						"action"     => $condition_action,
						"rule"       => $condition_rule,
						"conditions" => $field_data,
					);
				}
			}
		}

		return array(
			'fields'    => $conditions,
			'relations' => $relations,
		);
	}

	/**
	 * Check field is conditional
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return bool
	 */
	public function is_conditional( $field ) {
		if ( isset( $field['conditions'] ) && ! empty( $field['conditions'] ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Set the form encryption type if there is an upload
	 *
	 * @since 1.0
	 * @return string
	 */
	public function form_enctype() {
		if ( $this->has_upload() ) {
			return 'enctype="multipart/form-data"';
		} else {
			return '';
		}
	}

	/**
	 * @since 1.0
	 * @return bool
	 */
	public function has_paypal() {
		$is_enabled = powerform_has_paypal_settings();
		$selling    = 0;
		$fields     = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "product" === $field["type"] && ( ! isset( $field["product_free"] ) ) ) {
					$selling ++;
				}
			}
		}

		return ( $is_enabled && $selling > 0 ) ? true : false;
	}

	/**
	 * Return button markup
	 *
	 * @since 1.6
	 * @return mixed
	 */
	public function get_button_markup() {
		$button = $this->get_submit_button_text();

		$custom_class = $this->get_submit_custom_clas();

		$class = 'powerform-button';

		if ( $custom_class && ! empty( $custom_class ) ) {
			$class .= ' ' . $custom_class;
		}

		$html = '<div class="powerform-row">';
		$html .= '<div class="powerform-col powerform-col-12">';
		$html .= '<div id="submit" class="powerform-field">';

		if ( $this->get_form_design() !== 'material' ) {
			$html .= sprintf( '<button id="powerform-submit" class="' . $class . '">%s</button>', $button );
		} else {
			$html .= sprintf( '<button id="powerform-submit" class="' . $class
			                  . '"><span class="powerform-button--mask" aria-label="hidden"></span><span class="powerform-button--text">%s</span></button>',
			                  $button );
		}
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';

		return apply_filters( 'powerform_render_button_markup', $html, $button );
	}

	/**
	 * PayPal button markup
	 *
	 * @since 1.0
	 *
	 * @param $form_id
	 *
	 * @return mixed
	 */
	public function get_paypal_button_markup( $form_id ) {
		$html = '<div class="powerform-row">';
		$html .= '<div class="powerform-col powerform-col-12">';
		$html .= '<div class="powerform-field" id="paypal-button-container-' . $form_id . '">';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';

		return apply_filters( 'powerform_render_button_markup', $html );
	}

	/**
	 * Return form submit button markup
	 *
	 * @since 1.0
	 *
	 * @param        $form_id
	 * @param bool   $render
	 *
	 * @return mixed|void
	 */
	public function get_submit( $form_id, $render = true ) {
		$html       = '';
		$nonce      = $this->nonce_field( 'powerform_submit_form', 'powerform_nonce' );
		$post_id    = $this->get_post_id();
		$has_paypal = $this->has_paypal();

		if ( $has_paypal ) {
			if ( ! ( self::$paypal instanceof Powerform_Paypal_Express ) ) {
				self::$paypal = new Powerform_Paypal_Express();
			}
			self::$paypal_forms[] = $form_id;
		}

		// If we have pagination skip button markup
		if ( ! $this->has_pagination() ) {
			if ( ! $has_paypal ) {
				$html .= $this->get_button_markup();
			} else {
				$html .= '<input type="hidden" name="payment_gateway_total" value="" />';
				$html .= $this->get_paypal_button_markup( $form_id );
			}
		}

		$html .= $nonce;
		$html .= sprintf( '<input type="hidden" name="form_id" value="%s">', $form_id );
		$html .= sprintf( '<input type="hidden" name="page_id" value="%s">', $post_id );
		$html .= sprintf( '<input type="hidden" name="current_url" value="%s">', powerform_get_current_url() );
		if ( isset( self::$render_ids[ $form_id ] ) ) {
			$html .= sprintf( '<input type="hidden" name="render_id" value="%s">', self::$render_ids[ $form_id ] );
		}

		if ( $this->is_preview ) {
			$html .= sprintf( '<input type="hidden" name="action" value="%s">', "powerform_submit_preview_form_custom-forms" );
		} else {
			$html .= sprintf( '<input type="hidden" name="action" value="%s">', "powerform_submit_form_custom-forms" );
		}

		$html .= $this->do_after_render_form_for_addons();

		if ( $render ) {
			echo apply_filters( 'powerform_render_form_submit_markup', wp_kses_post( $html ), $form_id, $post_id, $nonce ); // wpcs XSS ok. unescaped html output expected
		} else {
			/** @noinspection PhpInconsistentReturnPointsInspection */
			return apply_filters( 'powerform_render_form_submit_markup', $html, $form_id, $post_id, $nonce );
		}
	}

	/**
	 * Submit button text
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_submit_button_text() {
		if ( $this->has_custom_submit_text() ) {
			return $this->get_custom_submit_text();
		} else {
			return __( "Einreichen", Powerform::DOMAIN );
		}
	}

	/**
	 * Return custom submit button text
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_custom_submit_text() {
		$settings = $this->get_form_settings();

		return $this->sanitize_output( $settings['submitData']['custom-submit-text'] );
	}

	/**
	 * Return if custom submit button text
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_custom_submit_text() {
		$settings = $this->get_form_settings();

		if ( isset( $settings['submitData']['custom-submit-text'] ) && ! empty( $settings['submitData']['custom-submit-text'] ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Render honeypot field
	 *
	 * @since 1.0
	 *
	 * @param string $html    - the button html
	 * @param int    $form_id - the current form id
	 * @param int    $post_id - the current post id
	 * @param string $nonce   - the nonce field
	 *
	 * @return string $html
	 */
	public function render_honeypot_field(
		$html,
		$form_id,
		/** @noinspection PhpUnusedParameterInspection */
		$post_id,
		/** @noinspection PhpUnusedParameterInspection */
		$nonce
	) {
		if ( $form_id == $this->model->id && $this->is_honeypot_enabled() ) { // WPCS: loose comparison ok
			$fields       = $this->get_fields();
			$total_fields = count( $fields ) + 1;
			//Most bots wont bother with hidden fields, so set to text and hide it
			$html .= sprintf( '<input type="text" style="display:none !important; visibility:hidden !important;" name="%s" value="">', "input_$total_fields" );
		}

		return $html;
	}

	/**
	 * Return styles template path
	 *
	 * @since 1.0
	 * @return bool|string
	 */
	public function styles_template_path() {

		$theme = $this->get_form_design();

		if ( 'bold' === $theme ) {
			return realpath( powerform_plugin_dir() . '/assets/js/front/templates/form/bold.html' );
		}

		if ( 'flat' === $theme ) {
			return realpath( powerform_plugin_dir() . '/assets/js/front/templates/form/flat.html' );
		}

		if ( 'default' === $theme ) {
			return realpath( powerform_plugin_dir() . '/assets/js/front/templates/form/default.html' );
		}

		if ( 'material' === $theme ) {
			return realpath( powerform_plugin_dir() . '/assets/js/front/templates/form/material.html' );
		}

		if ( 'clean' === $theme ) {
			return realpath( powerform_plugin_dir() . '/assets/js/front/templates/form/vanilla.html' );
		}

		if ( 'clean' !== $theme && ( empty( $theme ) || '' !== $theme ) ) {
			return realpath( powerform_plugin_dir() . '/assets/js/front/templates/form/default.html' );
		}
	}

	/**
	 * Get Properties styles of each rendered forms
	 *
	 * @return array
	 */
	public function get_styles_properties() {
		$properties = array();
		if ( ! empty( $this->forms_properties ) ) {
			// avoid same custom style printed
			$style_rendered = array();
			foreach ( $this->forms_properties as $form_properties ) {
				if ( ! in_array( $form_properties['id'], $style_rendered, true ) ) {
					$properties[]     = $form_properties;
					$style_rendered[] = $form_properties['id'];
				}
			}
		}

		return $properties;

	}

	/**
	 * Return font specific front-end styles
	 *
	 * @since 1.0
	 */
	public function print_styles() {

		$style_properties = $this->get_styles_properties();

		if ( ! empty( $style_properties ) ) {

			foreach ( $style_properties as $style_property ) {

				if ( ! isset( $style_property['settings'] ) || empty( $style_property['settings'] ) ) {
					continue;
				}

				$properties = $style_property['settings'];

				// use this to properly check font settings is enabled
				$properties['fonts_settings'] = array();
				if ( isset( $style_property['fonts_settings'] ) ) {
					$properties['fonts_settings'] = $style_property['fonts_settings'];
				}

				// If we don't have a form_id use $model->id
				/** @var array $properties */
				if ( ! isset( $properties['form_id'] ) ) {
					if ( ! isset( $style_property ['id'] ) ) {
						continue;
					}
					$properties['form_id'] = $style_property['id'];
				}

				ob_start();

				if ( isset( $properties['custom_css'] ) && isset( $properties['form_id'] ) ) {

					if ( 'clean' === $properties['form-style'] ) {

						$properties['custom_css'] =
							powerform_prepare_css( $properties['custom_css'], '.powerform-custom-form-' . $properties['form_id'] . '', false, true, 'powerform-custom-form' );

					} else {

						$properties['custom_css'] = powerform_prepare_css( $properties['custom_css'],
						                                                    '.powerform-custom-form-' . $properties['form_id'] . '.powerform-design--' . $properties['form-style'] . ' ',
						                                                    false,
						                                                    true,
						                                                    'powerform-custom-form' );

					}
				}

				/** @noinspection PhpIncludeInspection */
				include $this->styles_template_path();
				$styles         = ob_get_clean();
				$trimmed_styles = trim( $styles );

				if ( isset( $properties['form_id'] ) && strlen( $trimmed_styles ) > 0 ) {
					?>
					<style type="text/css" id="powerform-custom-form-styles-<?php echo esc_attr( $properties['form_id'] ); ?>">
						<?php echo wp_strip_all_tags( $trimmed_styles ); // phpcs:ignore ?>
					</style>

					<?php
				}
			}
		}

	}

	/**
	 * Return if form pagination has header
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_pagination_header() {
		$settings  = $this->get_form_settings();
		$is_active = "off";

		if ( isset( $settings['pagination-header-design'] ) ) {
			$is_active = $settings['pagination-header-design'];
		}

		if ( "show" === $is_active && ( "nav" === $this->get_pagination_type() || "bar" === $this->get_pagination_type() ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Get pagination type
	 *
	 * @since 1.1
	 * @return string
	 */
	public function get_pagination_type() {
		$settings = $this->get_form_settings();

		return $settings['pagination-header'];
	}

	/**
	 * Prints Javascript required for each form with PayPal
	 *
	 * @since 1.0
	 */
	public function print_paypal_scripts() {
		foreach ( self::$paypal_forms as $paypal_form_id ) {
			self::$paypal->render_buttons_script( $paypal_form_id );
		}
	}

	/**
	 * Defines translatable strings to pass to datepicker
	 * Add other strings if required
	 *
	 * @since 1.0.5
	 */
	public function get_strings_for_calendar() {
		$days = array(
			esc_html__( 'So', Powerform::DOMAIN ),
			esc_html__( 'Mo', Powerform::DOMAIN ),
			esc_html__( 'Di', Powerform::DOMAIN ),
			esc_html__( 'Mi', Powerform::DOMAIN ),
			esc_html__( 'Do', Powerform::DOMAIN ),
			esc_html__( 'Fr', Powerform::DOMAIN ),
			esc_html__( 'Sa', Powerform::DOMAIN ),
		);

		return '"' . implode( '","', $days ) . '"';
	}

	/**
	 * Return if form use google font
	 *
	 * @since 1.0
	 * @since 1.2 Deprecate function
	 * @return bool
	 */
	public function has_google_font() {

		/**
		 * Deprecate this function, since `use-fonts-settings` and `font-family` no longer valid on 1.2
		 * Font / typography settings changed to different sections
		 * such as `cform-label-font-family`, `cform-title-font-family` etc
		 *
		 * @since 1.2
		 */
		_deprecated_function( 'has_google_font', '1.2', 'get_google_fonts' );

		$settings = $this->get_form_settings();

		// Check if custom font enabled
		if ( ! isset( $settings['use-fonts-settings'] ) || empty( $settings['use-fonts-settings'] ) ) {
			return false;
		}

		// Check if custom font
		if ( ! isset( $settings['font-family'] ) || empty( $settings['font-family'] ) || "custom" === $settings['font-family'] ) {
			return false;
		}

		return true;
	}

	/**
	 * Return google font
	 *
	 * @since 1.0
	 * @since 1.2 Deprecated Function
	 * @return string
	 */
	public function get_google_font() {

		/**
		 * Deprecate this function, since `use-fonts-settings` and `font-family` no longer valid on 1.2
		 * Font / typography settings changed to different sections
		 * such as `cform-label-font-family`, `cform-title-font-family` etc
		 *
		 * @since 1.2
		 */
		_deprecated_function( 'get_google_font', '1.2', 'get_google_fonts' );

		$settings = $this->get_form_settings();

		return $settings['font-family'];
	}

	/**
	 * Return if form use inline validation
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function has_inline_validation() {
		$settings = $this->get_form_settings();

		if ( isset( $settings['validation-inline'] ) && $settings['validation-inline'] ) {
			return true;
		}

		return false;
	}

	/**
	 * Render Front Script
	 *
	 * @since 1.0
	 * @since 1.1 add pagination properties on `window`
	 */
	public function powerform_render_front_scripts() {
		?>
		<script type="text/javascript">
			jQuery(document).ready(function () {
				window.Powerform_Cform_Paginations = window.Powerform_Cform_Paginations || [];
				<?php
				if ( ! empty( $this->forms_properties ) ) {
				foreach ( $this->forms_properties as $form_properties ) {
				$options = $this->get_front_init_options( $form_properties );
				$pagination_config = $options['pagination_config'];
				unset( $options['pagination_config'] );
				?>
				window.Powerform_Cform_Paginations[<?php echo esc_attr( $form_properties['id'] ); ?>] =
				<?php echo wp_json_encode( $pagination_config ); ?>;
				jQuery('#powerform-module-<?php echo esc_attr( $form_properties['id'] ); ?>[data-powerform-render="<?php echo esc_attr( $form_properties['render_id'] ); ?>"]')
					.powerformFront(<?php echo wp_json_encode( $options ); ?>);
				<?php
				}
				}
				?>
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
			});
		</script>
		<?php

	}

	/**
	 * Get Output of addons after_render_form
	 *
	 * @see   Powerform_Addon_Zapier_Form_Hooks::on_after_render_form()
	 *
	 * @since 1.1
	 * @return string
	 */
	public function do_after_render_form_for_addons() {
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_form( $this->model->id );

		ob_start();
		foreach ( $connected_addons as $connected_addon ) {
			try {
				$form_hooks = $connected_addon->get_addon_form_hooks( $this->model->id );
				if ( $form_hooks instanceof Powerform_Addon_Form_Hooks_Abstract ) {
					$form_hooks->on_after_render_form();
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to on_after_render_form', $e->getMessage() );
			}

		}
		$output = ob_get_clean();

		return $output;
	}

	/**
	 * Get Output of addons before render form fields
	 *
	 * @see   Powerform_Addon_Zapier_Form_Hooks::on_before_render_form_fields()
	 *
	 * @since 1.1
	 * @return string
	 */
	public function do_before_render_form_fields_for_addons() {
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_form( $this->model->id );

		ob_start();
		foreach ( $connected_addons as $connected_addon ) {
			try {
				$form_hooks = $connected_addon->get_addon_form_hooks( $this->model->id );
				if ( $form_hooks instanceof Powerform_Addon_Form_Hooks_Abstract ) {
					$form_hooks->on_before_render_form_fields();
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to on_before_render_form_fields', $e->getMessage() );
			}

		}
		$output = ob_get_clean();

		return $output;

	}

	/**
	 * Get Output of addons after render form fields
	 *
	 * @see   Powerform_Addon_Zapier_Form_Hooks::on_after_render_form_fields()
	 *
	 * @since 1.1
	 * @return string
	 */
	public function do_after_render_form_fields_for_addons() {
		//find is_form_connected
		$connected_addons = powerform_get_addons_instance_connected_with_form( $this->model->id );

		ob_start();
		foreach ( $connected_addons as $connected_addon ) {
			try {
				$form_hooks = $connected_addon->get_addon_form_hooks( $this->model->id );
				if ( $form_hooks instanceof Powerform_Addon_Form_Hooks_Abstract ) {
					$form_hooks->on_after_render_form_fields();
				}
			} catch ( Exception $e ) {
				powerform_addon_maybe_log( $connected_addon->get_slug(), 'failed to on_after_render_form_fields', $e->getMessage() );
			}

		}
		$output = ob_get_clean();

		return $output;
	}

	/**
	 * Get Google Fonts setup on a form
	 *
	 * @since 1.2
	 * @return array
	 */
	public function get_google_fonts() {
		$fonts    = array();
		$settings = $this->get_form_settings();

		$font_settings_enabled = isset( $settings['form-font-family'] ) ? $settings['form-font-family'] : false;
		$font_settings_enabled = ( 'custom' === $font_settings_enabled ) ? true : false;

		// on clean design, disable google fonts
		if ( 'clean' !== $this->get_form_design() && $font_settings_enabled ) {
			$configs = array(
				'label',
				'title',
				'subtitle',
				'input',
				'radio',
				'select',
				'dropdown',
				'calendar',
				'multiselect',
				'timeline',
				'button',
			);

			foreach ( $configs as $font_setting_key ) {
				$font_family_settings_name = 'cform-' . $font_setting_key . '-font-family';

				$font_family_name = '';
				// check if font family selected
				if ( isset( $settings[ $font_family_settings_name ] ) && ! empty( $settings[ $font_family_settings_name ] ) ) {
					$font_family_name = $settings[ $font_family_settings_name ];
				}

				// skip not selected / `custom` is selected
				if ( empty( $font_family_name ) || 'custom' === $font_family_name ) {
					$fonts[ $font_family_settings_name ] = false;
					continue;
				}

				$fonts[ $font_family_settings_name ] = $font_family_name;

			}
		}

		$form_id = $this->model->id;

		/**
		 * Filter google fonts to be loaded for a form
		 *
		 * @since 1.2
		 *
		 * @param array $fonts
		 * @param int   $form_id
		 * @param array $settings form settings
		 */
		$fonts = apply_filters( 'powerform_custom_form_google_fonts', $fonts, $form_id, $settings );

		return $fonts;

	}

	/**
	 * Check if field with type exist on a form, and check if its setting match
	 *
	 * @since 1.2
	 *
	 * @param             $field_type
	 * @param string|null $setting_name
	 * @param string|null $setting_value
	 *
	 * @return bool
	 */
	public function has_field_type_with_setting_value( $field_type, $setting_name = null, $setting_value = null ) {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( $field_type === $field["type"] ) {
					if ( is_null( $setting_name ) ) {
						return true;
					} elseif ( isset( $field[ $setting_name ] ) ) {
						$field_settings_value = $field[ $setting_name ];
						if ( is_bool( $setting_value ) ) {
							// cast to bool
							$field_settings_value = filter_var( $field[ $setting_name ], FILTER_VALIDATE_BOOLEAN );
						}
						if ( $field_settings_value === $field[ $setting_name ] ) {
							return true;
						}

					}
				}
			}
		}

		return false;
	}

	/**
	 * Find last captcha
	 *
	 * @since 1.6
	 * @return array|bool
	 */
	public function find_first_captcha() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "captcha" === $field["type"] ) {
					return $field;
				}
			}
		}

		return false;
	}


	/**
	 * Check if form should be displayed
	 *
	 * @since 1.6.1
	 *
	 * @param $is_preview
	 *
	 * @return bool
	 */
	public function is_displayable( $is_preview ) {

		if ( $this->model instanceof Powerform_Custom_Form_Model && ( $is_preview || Powerform_Custom_Form_Model::STATUS_PUBLISH === $this->model->status ) ) {
			$this->generate_render_id( $this->model->id );

			return true;
		} else {
			return false;
		}
	}

	/**
	 * Get powerformFront js init options to be passed
	 *
	 * @since 1.6.1
	 *
	 * @param $form_properties
	 *
	 * @return array
	 */
	public function get_front_init_options( $form_properties ) {

		if ( empty( $form_properties ) ) {
			return array();
		}

		$autoclose = true;
		$autoclose_time = 5000;

		if( isset( $form_properties['settings']['autoclose'] ) ) {
			$autoclose = $form_properties['settings']['autoclose'];
		}

		if( isset( $form_properties['settings']['autoclose-time'] ) && ! empty( $form_properties['settings']['autoclose-time'] ) ) {
			$autoclose_time = $form_properties['settings']['autoclose-time'] * 1000;
		}

		$options = array(
			'form_type'         => $this->get_form_type(),
			'inline_validation' => filter_var( $form_properties['inline_validation'], FILTER_VALIDATE_BOOLEAN ),
			'rules'             => $form_properties['validation_rules'], // this is string, todo: refactor this to array (ALL FIELDS will be affected) to avoid client JSON.parse
			'messages'          => $form_properties['validation_messages'], // this is string, todo: refactor this to array (ALL FIELDS will be affected)  to avoid client JSON.parse
			'conditions'        => $form_properties['conditions'],
			'calendar'          => $this->get_strings_for_calendar(), // this is string, todo: refactor this to array to (ALL FIELDS will be affected)  avoid client JSON.parse
			'pagination_config' => $form_properties['pagination'],
			'fadeout'           => $autoclose,
			'fadeout_time'      => $autoclose_time,
		);

		return $options;
	}

	/**
	 * Ajax response for displaying form
	 *
	 * @since 1.6.1
	 * @since 1.6.2 add $extra as arg
	 *
	 * @param       $id
	 * @param bool  $is_preview
	 * @param bool  $data
	 * @param bool  $hide
	 * @param array $last_submit_data
	 * @param array $extra
	 *
	 * @return array
	 */
	public function ajax_display( $id, $is_preview = false, $data = false, $hide = true, $last_submit_data = array(), $extra = array() ) {
		if ( $data && ! empty( $data ) ) {
			$this->model = Powerform_Custom_Form_Model::model()->load_preview( $id, $data );
			// its preview!
			$this->model->id = $id;
		} else {
			$this->model = Powerform_Custom_Form_Model::model()->load( $id );
		}

		$response = array(
			'html'         => '',
			'style'        => '',
			'styles'       => array(),
			'scripts'      => array(),
			'callback'     => '',
			'is_ajax_load' => false,
		);

		if ( ! $this->is_displayable( $is_preview ) ) {
			return $response;
		}

		if ( ! $this->model->is_ajax_load( $is_preview ) ) {
			// return nothing
			return $response;
		}

		// setup extra param
		if ( isset( $extra ) && is_array( $extra ) ) {
			if ( isset( $extra['_wp_http_referer'] ) ) {
				$this->_wp_http_referer = $extra['_wp_http_referer'];
			}
			if ( isset( $extra['page_id'] ) ) {
				$this->_page_id = $extra['page_id'];
			}
		}

		if ( ! empty( $last_submit_data ) && is_array( $last_submit_data ) ) {
			$_POST = $last_submit_data;
		}

		$response['is_ajax_load'] = true;
		$response['html']         = $this->get_html( $hide, $is_preview );

		$properties = isset( $this->forms_properties[0] ) ? $this->forms_properties[0] : array();

		ob_start();
		$this->print_styles();
		$styles            = ob_get_clean();
		$response['style'] = $styles;

		$response['options'] = $this->get_front_init_options( $properties );

		$this->enqueue_form_scripts( $is_preview, $this->is_ajax_load() );

		$response['styles']  = $this->styles;
		$response['scripts'] = $this->scripts;
		$response['script']  = $this->script;

		if ( $this->can_track_views() ) {
			$form_view = Powerform_Form_Views_Model::get_instance();
			$post_id   = $this->get_post_id();
			if ( ! $this->is_admin ) {
				$form_view->save_view( $id, $post_id, '' );
			}
		}

		return $response;
	}

	/**
	 * Html markup of form
	 *
	 * @since 1.6.1
	 *
	 * @param bool $hide
	 * @param bool $is_preview
	 *
	 * @return false|string
	 */
	public function get_html( $hide = true, $is_preview = false ) {
		ob_start();
		if ( $this->model->form_is_visible() ) {
			add_filter( 'powerform_render_form_submit_markup', array( $this, 'render_honeypot_field' ), 10, 4 );

			// Render form
			$this->render( $this->model->id, $hide, $is_preview );

			// setup properties for later usage
			$this->forms_properties[] = array(
				'id'                  => $this->model->id,
				'render_id'           => self::$render_ids[ $this->model->id ],
				'inline_validation'   => $this->has_inline_validation() ? 'true' : 'false',
				'conditions'          => $this->get_conditions(),
				'validation_rules'    => $this->inline_rules,
				'validation_messages' => $this->inline_messages,
				'settings'            => $this->get_form_settings(),
				'pagination'          => $this->get_pagination_properties(),
				'fonts_settings'      => $this->get_google_fonts(),
			);
		} else {
			$form_settings = $this->get_form_settings();

			if ( isset( $form_settings['expire_message'] ) && '' !== $form_settings['expire_message'] ) {

				$message = $form_settings['expire_message']; ?>

				<div class="powerform-custom-form"><label class="powerform-label--info"><span><?php echo esc_html( $message ); ?></span></label></div>

				<?php

			}
		}

		$html = ob_get_clean();

		return $html;
	}

	/**
	 * Check if form has a phone field
	 *
	 * @since 1.6.1
	 * @return bool
	 */
	public function has_phone() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "phone" === $field["type"] ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Check if form has a postdata field
	 *
	 * @since 1.6.1
	 * @return bool
	 */
	public function has_postdata() {
		$fields = $this->get_fields();

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				if ( "postdata" === $field["type"] ) {
					return true;
				}
			}
		}

		return false;
	}

}