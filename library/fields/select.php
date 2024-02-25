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
class Powerform_Select extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'select';

	/**
	 * @var string
	 */
	public $type = 'select';

	/**
	 * @var int
	 */
	public $position = 11;

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
	public $icon = 'sui-icon-element-select';

	/**
	 * Powerform_SingleValue constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Wählen', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array(
			'value_type'  => 'single',
			'field_label' => __( 'Wähle', Powerform::DOMAIN ),
			'options'     => array(
				array(
					'label' => __( 'Option 1', Powerform::DOMAIN ),
					'value' => 'eins',
				),
				array(
					'label' => __( 'Option 2', Powerform::DOMAIN ),
					'value' => 'zwei',
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
		$required    = self::get_property( 'required', $field, false, 'bool' );
		$options     = self::get_property( 'options', $field, array() );
		$post_value  = self::get_post_data( $name, false );
		$uniq_id     = uniqid();
		$description = self::get_property( 'description', $field, '' );
		$label       = self::get_property( 'field_label', $field, '' );
		$design      = $this->get_form_style( $settings );
		$field_type  = self::get_property( 'value_type', $field, '' );

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

		if ( "multiselect" === $field_type ) {
			$post_value = self::get_post_data( $name, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
			$name       = $name . '[]';
			$html       .= '<ul class="powerform-multiselect">';

			foreach ( $options as $option ) {
				$value          = $option['value'] ? $option['value'] : $option['label'];
				$input_id       = $id . '-' . $i;
				$option_default = isset( $option['default'] ) ? filter_var( $option['default'], FILTER_VALIDATE_BOOLEAN ) : false;

				$selected = false;
				if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST !== $post_value ) {
					if ( is_array( $post_value ) ) {
						$selected = in_array( $value, $post_value );// phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
					}
				} else {
					$selected = $option_default;
				}
				$selected = $selected ? 'checked="checked"' : '';

				if ( trim( $this->get_form_style( $settings ) ) === 'clean' ) {
					$html .= '<li class="powerform-multiselect--item">';
					$html .= sprintf( '<input id="%s" type="checkbox" name="%s" value="%s" %s> %s', $input_id . '-' . $uniq_id, $name, $value, $selected, $option['label'] );
					$html .= '</li>';
				} else {
					$html .= sprintf( '<li class="powerform-multiselect--item">' );
					$html .= sprintf( '<input id="%s" name="%s" type="checkbox" value="%s" %s>', $input_id . '-' . $uniq_id, $name, $value, $selected );
					$html .= sprintf( '<label for="%s">%s</label>', $input_id . '-' . $uniq_id, $option['label'] );
					$html .= sprintf( '</li>' );
				}

				$i ++;
			}

			$html .= '</ul>';
		} else {
			$options_markup = '';
			$default = '';

			foreach ( $options as $option ) {
				$value          = $option['value'] ? $option['value'] : '';
				$option_default = isset( $option['default'] ) ? filter_var( $option['default'], FILTER_VALIDATE_BOOLEAN ) : false;

				if( $option_default ) {
					$default = $value;
				}

				$selected       = ( $value === $post_value || $option_default ) ? 'selected="selected"' : '';

				$options_markup .= sprintf( '<option value="%s" %s>%s</option>', $value, $selected, $option['label'] );
			}

			$html .= sprintf( '<select class="powerform-select--field powerform-select" id="%s" data-required="%s" name="%s" data-default-value="%s">', $id, $required, $name, $default );

			$html .= $options_markup;

			$html .= sprintf( '</select>' );
		}

		$html .= self::get_description( $description );

		return apply_filters( 'powerform_field_single_markup', $html, $id, $required, $options );
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
			$required_message = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte wähle einen Wert', Powerform::DOMAIN ) );
			$required_message = apply_filters(
				'powerform_single_field_required_validation_message',
				$required_message,
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
			$id = self::get_property( 'element_id', $field );
			if ( empty( $data ) ) {
				$required_message                = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte wähle einen Wert', Powerform::DOMAIN ) );
				$this->validation_message[ $id ] = apply_filters(
					'powerform_single_field_required_validation_message',
					$required_message,
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