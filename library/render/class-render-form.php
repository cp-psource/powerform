<?php

/**
 * Class Powerform_Render_Form
 *
 * @since 1.0
 */
abstract class Powerform_Render_Form {

	/**
	 * Model data
	 *
	 * @var Powerform_Base_Form_Model
	 */
	public $model = null;

	/**
	 * Checks if is admin
	 *
	 * @var bool
	 */
	protected $is_admin = false;

	/**
	 * Track Views
	 *
	 * @var bool
	 */
	protected $track_views = true;

	/**
	 * Mapper form with its instance, handling multiple same form rendered
	 *
	 * @var array
	 */
	protected static $render_ids = array();

	/**
	 * Checks if is preview
	 *
	 * @var bool
	 */
	protected $is_preview = false;

	/**
	 * Action to be used to load ajax
	 *
	 * @var string
	 */
	protected $ajax_load_action = 'powerform_load_module';

	/**
	 * Last submitted data
	 * useful when rendering via ajax and need older data for markup
	 *
	 * @since 1.6.1
	 * @var array
	 */
	protected $last_submitted_data = array();

	/**
	 * Original wp http referer
	 * When ajax load enabled wp_http_referer is replaced with admin-ajax
	 * This var will make it persistent for next render
	 *
	 * @since 1.6.2
	 * @var string
	 */
	protected $_wp_http_referer = '';

	/**
	 * Original page_id
	 * When ajax load enabled page_id cant be found
	 * This var will make it persistent for next render
	 *
	 * @since 1.6.2
	 * @var int
	 */
	protected $_page_id = 0;

	/**
	 * Powerform_Render_Form constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		$this->is_admin = is_admin();
		$this->init();
	}

	/**
	 * Init method
	 *
	 * @since 1.0
	 */
	public function init() {
	}

	/**
	 * Display form method
	 * Must be implemented by class that extend it
	 *
	 * @since 1.0
	 *
	 * @param      $id
	 * @param bool $is_preview
	 *
	 * @return mixed
	 */
	abstract public function display( $id, $is_preview = false );

	/**
	 * Generate render_id for current form
	 * represented as integer, start from 0
	 *
	 * @param $id
	 */
	public function generate_render_id( $id ) {
		// set render_id for mapping Front End with its form.
		if ( ! isset( self::$render_ids[ $id ] ) ) {
			self::$render_ids[ $id ] = 0;
		} else {
			self::$render_ids[ $id ] ++;
		}
	}

	/**
	 * Render form markup
	 *
	 * @since 1.0
	 *
	 * @param      $id
	 * @param bool $hide If true, display: none will be added on the form markup and later removed with JS
	 * @param bool $is_preview
	 */
	public function render( $id, $hide = true, $is_preview = false ) {
		$form_type        = $this->get_form_type();
		$form_fields      = $this->get_fields();
		$form_settings    = $this->get_form_settings();
		$post_id          = $this->get_post_id();
		$this->is_preview = $is_preview;

		do_action( 'powerform_before_form_render', $id, $form_type, $post_id, $form_fields, $form_settings );

		$this->get_form( $id, true, $hide );

		do_action( 'powerform_after_form_render', $id, $form_type, $post_id, $form_fields, $form_settings );
	}

	/**
	 * Return form markup
	 *
	 * @since 1.0
	 *
	 * @param      $id
	 * @param bool $render
	 *
	 * @return mixed|void
	 */
	public function get_form( $id, $render = true, $hide = true ) {
		$html          = '';
		$form_type     = $this->get_form_type();
		$form_fields   = $this->get_fields();
		$form_settings = $this->get_form_settings();
		$form_design   = $this->get_form_design();
		$form_enctype  = $this->form_enctype();
		$extra_classes = $this->form_extra_classes();
		$track_views   = $this->can_track_views();
		//if rendered on Preview, the array is empty and sometimes PHP notices show up
		if ( $this->is_admin && ( empty( self::$render_ids ) || ! $id ) ) {
			self::$render_ids[ $id ] = 0;
		}

		$render_id = self::$render_ids[ $id ];

		$fields_type_class = $this->get_fields_type_class();
		$design_class      = $this->get_form_design_class();

		// Markup Loader.
		$loader = sprintf(
			'<div class="powerform-%s powerform-%s-%s %s %s %s" data-powerform-render="%s" data-form="powerform-module-%s"><br/></div>',
			$form_type,
			$form_type,
			$id,
			$design_class,
			$fields_type_class,
			$extra_classes,
			$render_id,
			$id
		);

		// To-Do: Remove when live preview for Poll & Quiz implemented
		if( "poll" === $form_type || "quiz" === $form_type ) {
			$loader = '';
		}

		$html .= $loader;

		$hidden = $hide ? 'style="display: none;"' : '';

		if ( $this->is_preview || is_admin() ) {
			$hidden = '';
		}


		$html .= sprintf(
			'<form id="powerform-module-%s" class="powerform-%s powerform-%s-%s %s %s %s" action="" method="post" data-powerform-render="%s" %s %s>',
			$id,
			$form_type,
			$form_type,
			$id,
			$design_class,
			$fields_type_class,
			$extra_classes,
			$render_id,
			$form_enctype,
			$hidden
		);

		$html .= $this->render_form_header();
		$html .= $this->render_fields( false );
		$html .= $this->get_submit( $id, false );

		$html .= sprintf( '</form>' );

		if ( $track_views ) {
			$form_view = Powerform_Form_Views_Model::get_instance();
			$post_id   = $this->get_post_id();
			if ( ! $this->is_admin ) {
				$form_view->save_view( $id, $post_id, '' );
			}
		}

		if ( $render ) {
			echo apply_filters( 'powerform_render_form_markup', $html, $form_fields, $form_type, $form_settings, $form_design, $render_id ); // WPCS: XSS ok.
		} else {
			/** @noinspection PhpInconsistentReturnPointsInspection */
			return apply_filters( 'powerform_render_form_markup', $html, $form_fields, $form_type, $form_settings, $form_design, $render_id );
		}
	}

	/**
	 * Return form placeholder markup
	 *
	 * @since 1.6.1
	 *
	 * @param      $id
	 * @param bool $render
	 *
	 * @return mixed|void
	 */
	public function get_form_placeholder( $id, $render = true ) {
		$html      = '';
		$form_type = $this->get_form_type();
		//if rendered on Preview, the array is empty and sometimes PHP notices show up
		if ( $this->is_admin && ( empty( self::$render_ids ) || ! $id ) ) {
			self::$render_ids[ $id ] = 0;
		}

		$render_id = self::$render_ids[ $id ];

		$html .= sprintf(
			'<form id="powerform-module-%s" class="powerform-%s powerform-%s-%s" action="" method="post" data-powerform-render="%s">',
			$id,
			$form_type,
			$form_type,
			$id,
			$render_id
		);

		$html .= $this->render_form_header();
		$html .= '</form>';

		if ( $render ) {
			echo apply_filters( 'powerform_render_form_placeholder_markup', $html, $form_type, $render_id ); // WPCS: XSS ok.
		} else {
			/** @noinspection PhpInconsistentReturnPointsInspection */
			return apply_filters( 'powerform_render_form_placeholder_markup', $html, $form_type, $render_id );
		}
	}

	/**
	 * Get Additional CSS class to be aplied based on fields style (enclosed or not)
	 *
	 * @since 1.0.5
	 * @return string
	 */
	public function get_fields_type_class() {
		$form_type    = $this->get_form_type();
		$fields_style = $this->get_fields_style();
		if ( 'custom-form' === $form_type ) {
			if ( 'enclosed' === $fields_style ) {
				$fields_type = 'powerform-enclosed';
			} else {
				$fields_type = '';
			}
		} else {
			$fields_type = '';
		}

		/**
		 * Filter CSS of fields_type that will be added on user
		 *
		 * @since 1.0.5
		 *
		 * @param string $fields_type  current fields type CSS class that aplied
		 * @param string $form_type    (custom-form / poll / quiz)
		 * @param string $fields_style (enclosed ?)
		 */
		return apply_filters( 'powerform_render_fields_type_class', $fields_type, $form_type, $fields_style );
	}

	/**
	 * Get Additional CSS class to be aplied based on get_form_design
	 *
	 * @since 1.0.5
	 * @return string
	 */
	public function get_form_design_class() {
		$form_design = $this->get_form_design();
		if ( 'clean' === $form_design ) {
			$design_class = '';
		} else {
			$design_class = 'powerform-design--' . $form_design;
		}

		/**
		 * Filter design CSS class that will be aplied on <form
		 *
		 * @since 1.0.5
		 *
		 * @param string $design_class current design CSS class applied
		 * @param string $form_design  (clean/material, etc)
		 */
		return apply_filters( 'powerform_render_form_design_class', $design_class, $form_design );
	}

	/**
	 * Return form submit button markup
	 *
	 * @since 1.0
	 *
	 * @param      $form_id
	 * @param bool $render
	 *
	 * @return mixed|void
	 */
	public function get_submit( $form_id, $render = true ) {
		$nonce     = $this->nonce_field( 'powerform_submit_form', 'powerform_nonce' );
		$post_id   = $this->get_post_id();
		$html      = $this->get_button_markup();
		$form_type = $this->get_form_type();
		$html      .= $nonce;
		$html      .= sprintf( '<input type="hidden" name="form_id" value="%s">', $form_id );
		$html      .= sprintf( '<input type="hidden" name="page_id" value="%s">', $post_id );
		if ( isset( self::$render_ids[ $form_id ] ) ) {
			$html .= sprintf( '<input type="hidden" name="render_id" value="%s">', self::$render_ids[ $form_id ] );
		}

		if ( $this->is_preview ) {
			$html .= sprintf( '<input type="hidden" name="action" value="%s">', "powerform_submit_preview_form_" . $form_type );
		} else {
			$html .= sprintf( '<input type="hidden" name="action" value="%s">', "powerform_submit_form_" . $form_type );
		}
		if ( $render ) {
			echo apply_filters( 'powerform_render_form_submit_markup', $html, $form_id, $post_id, $nonce ); // WPCS: XSS ok.
		} else {
			/** @noinspection PhpInconsistentReturnPointsInspection */
			return apply_filters( 'powerform_render_form_submit_markup', $html, $form_id, $post_id, $nonce );
		}
	}

	/**
	 * Return button markup
	 *
	 * @since 1.0
	 * @return mixed
	 */
	public function get_button_markup() {
		// https://app.asana.com/0/385581670491499/789649735369091/f

		$button = $this->get_submit_button_text();
		$html   = '<div class="powerform-row">';
		$html   .= '<div class="powerform-col powerform-col-12">';
		$html   .= '<div id="submit" class="powerform-field">';

		if ( $this->get_form_design() !== 'material' ) {
			$html .= sprintf( '<button id="powerform-submit" class="powerform-button">%s</button>', $button );
		} else {
			$html .= sprintf( '<button id="powerform-submit" class="powerform-button"><span class="powerform-button--mask" aria-label="hidden"></span><span class="powerform-button--text">%s</span></button>',
			                  $button );
		}
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';

		return apply_filters( 'powerform_render_button_markup', $html, $button );
	}

	/**
	 * Submit button text
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_submit_button_text() {
		return __( "Einreichen", Powerform::DOMAIN );
	}

	/**
	 * Return form fields
	 *
	 * @since 1.0
	 * @return array
	 */
	public function get_fields() {
		// That function will be overwritten by form class
		return array();
	}


	/**
	 * Return form fields markup
	 *
	 * @since 1.0
	 *
	 * @param bool $render
	 *
	 * @return mixed|void
	 */
	public function render_fields( $render = true ) {
		$html = '';

		$fields = $this->get_fields();
		foreach ( $fields as $key => $field ) {
			do_action( 'powerform_before_field_render', $field );

			// Render before field markup
			$html .= $this->render_field_before( $field );

			// Render field
			$html .= $this->render_field( $field );

			do_action( 'powerform_after_field_render', $field );

			// Render after field markup
			$html .= $this->render_field_after( $field );
		}

		if ( $render ) {
			echo wp_kses_post( $html ); // WPCS: XSS ok.
		} else {
			/** @noinspection PhpInconsistentReturnPointsInspection */
			return apply_filters( 'powerform_render_fields_markup', $html, $fields );
		}
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
	public function get_classes(
		/** @noinspection PhpUnusedParameterInspection */
		$field
	) {
		return 'powerform-field';
	}

	/**
	 * Return markup before field
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function render_field_before( $field ) {
		$class = $this->get_classes( $field );
		$html  = sprintf( '<div class="%s">', $class );

		return apply_filters( 'powerform_before_field_markup', $html, $class );
	}

	/**
	 * Return markup after field
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed
	 */
	public function render_field_after( $field ) {
		$html = sprintf( '</div>' );

		return apply_filters( 'powerform_after_field_markup', $html, $field );
	}

	/**
	 * Return sanitized form data
	 *
	 * @since 1.0
	 *
	 * @param $content
	 *
	 * @return mixed
	 */
	public function sanitize_output( $content ) {
		return htmlentities( $content, ENT_QUOTES );
	}

	/**
	 * Return field markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 *
	 * @return mixed|void
	 */
	public function render_field( $field ) {
	}

	/**
	 * Return form settings
	 *
	 * @since 1.0
	 * @return array
	 */
	public function get_form_settings() {
		return array();
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
	public function get_field_id( $field ) {
		return isset( $field['element_id'] ) ? $field['element_id'] : '0';
	}

	/**
	 * Return post ID
	 *
	 * @since 1.0
	 * @return int|string|bool
	 */
	public function get_post_id() {
		$post_id = $this->_page_id;
		if ( empty( $post_id ) ) {
			$post_id = get_post() ? get_the_ID() : '0';
		}

		return $post_id;
	}

	/**
	 * Return form type
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_form_type() {
		return '';
	}

	/**
	 * Return form design
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_form_design() {
		return '';
	}

	/**
	 * Return fields style
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_fields_style() {
		return '';
	}

	/**
	 * Render form header
	 *
	 * @since 1.0
	 */
	public function render_form_header() {
		return '';
	}

	/**
	 * Form enctype
	 *
	 * @since 1.0
	 * @return string
	 */
	public function form_enctype() {
		return '';
	}

	/**
	 * Form extra classes
	 *
	 * @since 1.0
	 */
	public function form_extra_classes() {
		return '';
	}

	/**
	 * Check if can track views
	 *
	 * @since 1.0
	 * @return bool
	 */
	public function can_track_views() {
		return $this->track_views;
	}

	/**
	 * Define cache constants
	 *
	 * @since 1.6.1
	 */
	public function maybe_define_cache_constants() {
		if ( $this->model instanceof Powerform_Base_Form_Model ) {
			if ( $this->model->is_use_donotcachepage_constant() ) {
				if ( ! defined( 'DONOTCACHEPAGE' ) ) {
					define( 'DONOTCACHEPAGE', 1 );
				}
			}
		}
	}

	/**
	 * Get load ajax status
	 *
	 * @since 1.6.1
	 *
	 * @param $force
	 *
	 * @return bool
	 */
	public function is_ajax_load( $force = false ) {

		// somehow, it could be incompatible model,
		// lets return as false when it happens
		if ( $this->model instanceof Powerform_Base_Form_Model ) {
			return $this->model->is_ajax_load( $force );
		}

		return false;

	}

	/**
	 * Script loader module via ajax
	 *
	 * @since 1.6.1
	 *
	 * @param       $is_preview
	 * @param array $preview_data
	 */
	public function ajax_loader( $is_preview, $preview_data = array() ) {

		if ( ! $this->model instanceof Powerform_Base_Form_Model ) {
			return;
		}

		$id                        = $this->model->id;
		$this->last_submitted_data = $_POST; // wpcs csrf ok.
		//if rendered on Preview, the array is empty and sometimes PHP notices show up
		if ( $this->is_admin && ( empty( self::$render_ids ) || ! $id ) ) {
			self::$render_ids[ $id ] = 0;
		}

		$this->_wp_http_referer = esc_attr( wp_unslash( $_SERVER['REQUEST_URI'] ) );
		$this->_page_id         = $this->get_post_id();

		$front_loader_config = wp_json_encode(
			array(
				'action'           => $this->ajax_load_action,
				'type'             => $this->model->get_post_type(),
				'id'               => $id,
				'render_id'        => self::$render_ids[ $id ],
				'is_preview'       => $is_preview,
				'preview_data'     => $preview_data,
				'last_submit_data' => $this->last_submitted_data,
				'extra'            => array(
					'_wp_http_referer' => wp_unslash( $_SERVER['REQUEST_URI'] ),
					'page_id'          => $this->get_post_id(),
				),
			)
		);

		$powerform_loader_script = '
		(function ($, document, window) {
				"use strict";
				(function () {
					$(document).ready(function () {
						if (typeof ($.fn.powerformLoader) === \'undefined\') {
							console.log(\'powerform scripts not loaded\');
						} else {
							$(\'#powerform-module-' . $id . '[data-powerform-render="' . self::$render_ids[ $id ] . '"]\')
								.powerformLoader(' . $front_loader_config . ');
						}
					});
				})();
			}(jQuery, document, window));';

		// on real render use add_inline_script to avoid late initialization
		if ( ! $is_preview ) {
			wp_add_inline_script( 'powerform-front-scripts', $powerform_loader_script );
		} else {
			// we are on preview, and its ajax called, so scripts need to be output-ed rather than add it on enqueued script
			?>
			<script type="text/javascript">
				<?php echo $powerform_loader_script;// wpcs XSS ok, should be escaped prior ?>
			</script>
			<?php
		}
	}

	/**
	 * Ajax handler to load module
	 *
	 * @since 1.6.1
	 */
	public static function ajax_load_module() {
		if ( isset( $_REQUEST['nonce'] ) ) {
			if ( ! wp_verify_nonce( $_REQUEST['nonce'], 'powerform_load_module' ) ) {
				wp_send_json_error( new WP_Error( 'invalid_code' ) );
			}
		}

		$response         = array();
		$data             = $_REQUEST;
		$id               = isset( $data['id'] ) ? $data['id'] : 0;
		$type             = isset( $data['type'] ) ? $data['type'] : 0;
		$is_preview       = isset( $data['is_preview'] ) ? $data['is_preview'] : 0;
		$preview_data     = isset( $data['preview_data'] ) ? $data['preview_data'] : 0;
		$last_submit_data = isset( $data['last_submit_data'] ) ? $data['last_submit_data'] : array();
		$extra            = isset( $data['extra'] ) ? $data['extra'] : array();

		$is_preview = filter_var( $is_preview, FILTER_VALIDATE_BOOLEAN );

		if ( empty( $id ) && ! $is_preview ) {
			wp_send_json_error( new WP_Error( 'invalid_id' ) );
		}

		if ( empty( $type ) ) {
			wp_send_json_error( new WP_Error( 'invalid_type' ) );
		}


		if ( ! empty( $preview_data ) ) {
			if ( ! is_array( $preview_data ) ) {
				$preview_data = stripslashes( $preview_data );
				$preview_data = json_decode( $preview_data, true );
			}
		}

		$view = null;
		if ( 'powerform_forms' === $type ) {
			$view = Powerform_CForm_Front::get_instance();
			if ( ! empty( $preview_data ) ) {
				$preview_data = powerform_data_to_model_form( $preview_data );
			}
		} elseif ( 'powerform_polls' === $type ) {
			if ( ! empty( $preview_data ) && is_array( $preview_data ) ) {
				$preview_data = powerform_data_to_model_poll( $preview_data );
			}
			$view = Powerform_Poll_Front::get_instance();
		} elseif ( 'powerform_quizzes' === $type ) {
			$view = Powerform_QForm_Front::get_instance();
			if ( ! empty( $preview_data ) && is_array( $preview_data ) ) {
				$preview_data = powerform_data_to_model_quiz( $preview_data );
			}
		}

		if ( ! $view instanceof Powerform_Render_Form ) {
			wp_send_json_error( new WP_Error( 'invalid_module' ) );
		}

		$response = $view->ajax_display( $id, $is_preview, $preview_data, true, $last_submit_data, $extra );
		wp_send_json_success( $response );
	}

	/**
	 * Display ajax render
	 *
	 * @since 1.6.1
	 * @since 1.6.2 add $extra args
	 *
	 * @param       $id
	 * @param bool  $is_preview
	 * @param bool  $data
	 * @param bool  $hide
	 * @param array $last_submit_data
	 * @param array $extra extra config to display
	 *
	 * @return array
	 */
	abstract public function ajax_display( $id, $is_preview = false, $data = false, $hide = true, $last_submit_data = array(), $extra = array() );

	/**
	 * Generate nonce field
	 * Respect _wp_http_referer to avoid being replaced when ajax load enabled
	 *
	 * @since 1.6.2
	 *
	 * @param $action
	 * @param $name
	 *
	 * @return string
	 */
	protected function nonce_field( $action, $name ) {
		$with_referer = ! empty( $this->_wp_http_referer ) ? false : true;
		$nonce        = wp_nonce_field( $action, $name, $with_referer, false );

		if ( ! $with_referer ) {
			$nonce .= sprintf( '<input type="hidden" name="_wp_http_referer" value="%s" />', esc_attr( $this->_wp_http_referer ) );
		}

		return $nonce;
	}
}