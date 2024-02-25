<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_SingleValue
 *
 * @property  array field
 * @since 1.0
 */
class Powerform_Radio extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'radio';

	/**
	 * @var string
	 */
	public $type = 'radio';

	/**
	 * @var int
	 */
	public $position = 9;

	/**
	 * @var array
	 */
	public $options = array();

	/**
	 * @var string
	 */
	public $category = 'standard';

	/**
	 * @var string
	 */
	public $icon = 'sui-icon-element-radio';

	/**
	 * Powerform_SingleValue constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Radio', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array(
			'value_type'  => 'radio',
			'field_label' => __( 'Radio', Powerform::DOMAIN ),
			'options'     => array(
				array(
					'label' => __( 'Option 1', Powerform::DOMAIN ),
					'value' => '',
				),
				array(
					'label' => __( 'Option 2', Powerform::DOMAIN ),
					'value' => '',
				),
			),
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
			'select' => array(
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
		$this->field = $field;
		$i           = 1;
		$html        = '';
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$id          = $id . '-field';
		$required    = self::get_property( 'required', $field, false );
		$options     = self::get_property( 'options', $field, array() );
		$value_type  = trim( $field['value_type'] ? $field['value_type'] : "multiselect" );
		$post_value  = self::get_post_data( $name, false );
		$description = self::get_property( 'description', $field, '' );
		$label       = self::get_property( 'field_label', $field, '' );
		$design      = $this->get_form_style( $settings );

		$uniq_id = uniqid();

		if ( $label ) {

			if ( $required ) {

				$html .= '<div class="powerform-field--label">';
				$html .= sprintf( '<label id="powerform-label-%s" class="powerform-label">%s %s</label>', $id, $label, powerform_get_required_icon() );
				$html .= '</div>';

			} else {

				$html .= '<div class="powerform-field--label">';
				$html .= sprintf( '<label id="powerform-label-%s" class="powerform-label">%s</label>', $id, $label );
				$html .= '</div>';

			}

		}

		foreach ( $options as $option ) {

			$input_id       = $id . '-' . $i . '-' . $uniq_id;
			$value          = $option['value'] ? $option['value'] : $option['label'];
			$option_default = isset( $option['default'] ) ? filter_var( $option['default'], FILTER_VALIDATE_BOOLEAN ) : false;
			$selected       = ( $value === $post_value || $option_default ) ? 'checked="checked"' : '';

			if ( trim( $this->get_form_style( $settings ) ) === 'clean' ) {

				$html .= sprintf( '<label class="powerform-radio"><input id="%s" name="%s" type="radio" value="%s" %s> %s</label>', $input_id, $name, $value, $selected, $option['label'] );

			} else {

				$html .= '<div class="powerform-radio">';
				$html .= sprintf( '<input id="%s" name="%s" type="radio" value="%s" class="powerform-radio--input" %s>', $input_id, $name, $value, $selected );
				$html .= sprintf( '<label for="%s" class="powerform-radio--design" aria-hidden="true"></label>', $input_id );
				$html .= sprintf( '<label for="%s" class="powerform-radio--label">%s</label>', $input_id, $option['label'] );
				$html .= '</div>';

			}

			$i ++;

		}

		$html .= self::get_description( $description );

		return apply_filters( 'powerform_field_single_markup', $html, $id, $required, $options, $value_type );
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_rules() {
		$rules       = '';
		$field       = $this->field;
		$is_required = $this->is_required( $field );

		if ( $is_required ) {
			$rules .= '"' . $this->get_id( $field ) . '": "required",';
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
		$messages    = '';
		$field       = $this->field;
		$id          = self::get_property( 'element_id', $field );
		$is_required = $this->is_required( $field );


		if ( $is_required ) {
			$required_message = self::get_property( 'required_message', $field, '' );
			$required_message = apply_filters(
				'powerform_single_field_required_validation_message',
				( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte wähle einen Wert', Powerform::DOMAIN ) ),
				$id,
				$field
			);
			$messages         .= '"' . $this->get_id( $field ) . '": "' . $required_message . '",' . "\n";
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
		if ( $this->is_required( $field ) ) {
			$id               = self::get_property( 'element_id', $field );
			$required_message = self::get_property( 'required_message', $field, '' );
			if ( empty( $data ) ) {
				$this->validation_message[ $id ] = apply_filters(
					'powerform_single_field_required_validation_message',
					( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte wähle einen Wert', Powerform::DOMAIN ) ),
					$id,
					$field
				);
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

		return apply_filters( 'powerform_field_single_sanitize', $data, $field, $original_data );
	}
}