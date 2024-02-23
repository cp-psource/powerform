<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Text
 *
 * @since 1.6
 */
class Powerform_Textarea extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'textarea';

	/**
	 * @var string
	 */
	public $type = 'textarea';

	/**
	 * @var int
	 */
	public $position = 7;

	/**
	 * @var array
	 */
	public $options = array();

	/**
	 * @var string
	 */
	public $category = 'standard';

	/**
	 * @var bool
	 */
	public $is_input = true;

	/**
	 * @var bool
	 */
	public $has_counter = true;

	/**
	 * @var string
	 */
	public $icon = 'sui-icon-blog';

	/**
	 * Powerform_Text constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Textarea', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array(
			'input_type'  => 'line',
			'limit_type'  => 'characters',
			'field_label' => __( 'Text', Powerform::DOMAIN ),
			'placeholder' => __( 'Z.B. Textplatzhalter', Powerform::DOMAIN ),
		);
	}

	/**
	 * Autofill Setting
	 *
	 * @since 1.0.5
	 *
	 * @param array $settings
	 *
	 * @return array
	 */
	public function autofill_settings( $settings = array() ) {
		$providers = apply_filters( 'powerform_field_' . $this->slug . '_autofill', array(), $this->slug );

		$autofill_settings = array(
			'text' => array(
				'values' => powerform_build_autofill_providers( $providers ),
			),
		);

		return $autofill_settings;
	}

	/**
	 * Field front-end markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 * @param $settings
	 *
	 * @return mixed
	 */
	public function markup( $field, $settings = array() ) {
		$this->field         = $field;
		$this->form_settings = $settings;

		$this->init_autofill( $settings );

		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$ariaid      = $id;
		$id          = $id . '-field';
		$required    = self::get_property( 'required', $field, false, 'bool' );
		$default     = self::get_property( 'default', $field, false );
		$placeholder = $this->sanitize_value( self::get_property( 'placeholder', $field ) );
		$design      = $this->get_form_style( $settings );
		$label       = self::get_property( 'field_label', $field, '' );
		$description = self::get_property( 'description', $field, '' );
		$limit       = self::get_property( 'limit', $field, 0, 'num' );
		$limit_type  = self::get_property( 'limit_type', $field, '', 'str' );

		$html = '';

		$autofill_markup = $this->get_element_autofill_markup_attr( self::get_property( 'element_id', $field ), $this->form_settings );


		$textarea = array(
			'class'           => 'powerform-textarea',
			'name'            => $name,
			'placeholder'     => $placeholder,
			'id'              => $id,
			'aria-labelledby' => 'powerform-label-' . $ariaid,
		);
		if ( ! empty( $default ) ) {
			$textarea['content'] = $default;
		} elseif ( isset( $autofill_markup['value'] ) ) {
			$textarea['content'] = $autofill_markup['value'];
			unset( $autofill_markup['value'] );
		}
		$textarea = array_merge( $textarea, $autofill_markup );

		$html .= self::create_textarea( $textarea, $label, '', $required, $design );

		// counter
		if ( ! empty( $description ) || ( ! empty( $limit ) && ! empty( $limit_type ) ) ) {
			$html .= '<div class="powerform-field--helper">';
			if ( ! empty( $description ) ) {
				$html .= sprintf( '<label class="powerform-label--helper">%s</label>', $description );
			}
			if ( ( ! empty( $limit ) && ! empty( $limit_type ) ) ) {
				$html .= sprintf( '<label class="powerform-label--limit" data-limit="%s" data-type="%s">0 / %s</label>', $limit, $limit_type, $limit );
			}
			$html .= '</div>';
		}


		return apply_filters( 'powerform_field_text_markup', $html, $field );
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_rules() {
		$field       = $this->field;
		$is_required = $this->is_required( $field );
		$has_limit   = $this->has_limit( $field );
		$rules       = '';

		if ( ! isset( $field['limit'] ) ) {
			$field['limit'] = 0;
		}

		if ( $is_required || $has_limit ) {
			$rules = '"' . $this->get_id( $field ) . '": {';
			if ( $is_required ) {
				$rules .= '"required": true,';
			}

			if ( $has_limit ) {
				if ( isset( $field['limit_type'] ) && 'characters' === trim( $field['limit_type'] ) ) {
					$rules .= '"maxlength": ' . $field['limit'] . ',';
				} else {
					$rules .= '"maxwords": ' . $field['limit'] . ',';
				}
			}
			$rules .= '},';
		}

		return $rules;
	}

	/**
	 * Return field inline validation errors
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_messages() {
		$field            = $this->field;
		$id               = self::get_property( 'element_id', $field );
		$is_required      = $this->is_required( $field );
		$has_limit        = $this->has_limit( $field );
		$messages         = '';
		$required_message = self::get_property( 'required_message', $field, '' );

		if ( $is_required || $has_limit ) {
			$messages .= '"' . $this->get_id( $field ) . '": {';

			if ( $is_required ) {
				$required_error = apply_filters(
					'powerform_text_field_required_validation_message',
					( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte gib Text ein', Powerform::DOMAIN ) ),
					$id,
					$field
				);
				$messages       .= '"required": "' . $required_error . '",' . "\n";
			}

			if ( $has_limit ) {
				if ( isset( $field['limit_type'] ) && 'characters' === trim( $field['limit_type'] ) ) {
					$max_length_error = apply_filters(
						'powerform_text_field_characters_validation_message',
						__( 'Du hast die zulässige Anzahl von Zeichen überschritten. Bitte überprüfe noch einmal', Powerform::DOMAIN ),
						$id,
						$field
					);
					$messages         .= '"maxlength": "' . $max_length_error . '",' . "\n";
				} else {
					$max_words_error = apply_filters(
						'powerform_text_field_words_validation_message',
						__( 'Du hast die zulässige Anzahl von Wörtern überschritten. Bitte überprüfe noch einmal', Powerform::DOMAIN ),
						$id,
						$field
					);
					$messages        .= '"maxwords": "' . $max_words_error . '",' . "\n";
				}
			}

			$messages .= '},';
		}

		return $messages;
	}

	/**
	 * Field back-end validation
	 *
	 * @since 1.0
	 *
	 * @param array        $field
	 * @param array|string $data
	 */
	public function validate( $field, $data ) {
		$id = self::get_property( 'element_id', $field );

		if ( ! isset( $field['limit'] ) ) {
			$field['limit'] = 0;
		}

		if ( $this->is_required( $field ) ) {
			$required_message = self::get_property( 'required_message', $field, '' );
			if ( empty( $data ) ) {
				$this->validation_message[ $id ] = apply_filters(
					'powerform_text_field_required_validation_message',
					( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte gib Text ein', Powerform::DOMAIN ) ),
					$id,
					$field
				);
			}
		}
		if ( $this->has_limit( $field ) ) {
			if ( ( isset( $field['limit_type'] ) && 'characters' === trim( $field['limit_type'] ) ) && ( strlen( $data ) > $field['limit'] ) ) {
				$this->validation_message[ $id ] = apply_filters(
					'powerform_text_field_characters_validation_message',
					__( 'Du hast die zulässige Anzahl von Zeichen überschritten. Bitte überprüfe noch einmal', Powerform::DOMAIN ),
					$id,
					$field
				);
			} elseif ( ( isset( $field['limit_type'] ) && 'words' === trim( $field['limit_type'] ) ) ) {
				$words = preg_split( "/[\s]+/", $data );
				if ( is_array( $words ) && count( $words ) > $field['limit'] ) {
					$this->validation_message[ $id ] = apply_filters(
						'powerform_text_field_words_validation_message',
						__( 'Du hast die zulässige Anzahl von Wörtern überschritten. Bitte überprüfe noch einmal', Powerform::DOMAIN ),
						$id,
						$field
					);
				}

			}
		}
	}

	/**
	 * Sanitize data
	 *
	 * @since 1.0.2
	 *
	 * @param array        $field
	 * @param array|string $data - the data to be sanitized
	 *
	 * @return array|string $data - the data after sanitization
	 */
	public function sanitize( $field, $data ) {
		$original_data = $data;
		// Sanitize
		$data = powerform_sanitize_field( $data );

		return apply_filters( 'powerform_field_text_sanitize', $data, $field, $original_data );
	}
}