<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Number
 *
 * @since 1.0
 */
class Powerform_Number extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'number';

	/**
	 * @var string
	 */
	public $type = 'number';

	/**
	 * @var int
	 */
	public $position = 8;

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
	 * @var string
	 */
	public $icon = 'sui-icon-element-number';

	/**
	 * Powerform_Number constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Nummer', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return apply_filters( 'powerform_number_defaults_settings',
			array(
				'limit_min'   => 1,
				'limit_max'   => 150,
				'field_label' => __( 'Nummer', Powerform::DOMAIN ),
				'placeholder' => __( 'Z.B. 10', Powerform::DOMAIN ),
			)
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
			'number' => array(
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

		$min         = 0;
		$max         = '';
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$id          = $id . '-field';
		$required    = self::get_property( 'required', $field, false );
		$placeholder = $this->sanitize_value( self::get_property( 'placeholder', $field ) );
		$value       = self::get_post_data( $name, self::get_property( 'default_value', $field ) );
		$label       = self::get_property( 'field_label', $field, '' );
		$description = self::get_property( 'description', $field, '' );
		$design      = $this->get_form_style( $settings );
		$min         = self::get_property( 'limit_min', $field, false );
		$max         = self::get_property( 'limit_max', $field, false );

		$number_attr = array(
			'type'          => 'number',
			'class'         => 'powerform-number--field powerform-input',
			'data-required' => $required,
			'name'          => $name,
			'placeholder'   => $placeholder,
			'value'         => $value,
			'id'            => $id,
			'step'			=> '0.01'
		);

		if ( false !== $min && is_numeric( $min ) ) {
			$number_attr['min'] = $min;
		}

		if ( false !== $max && is_numeric( $max ) ) {
			$number_attr['max'] = $max;
		}
		$autofill_markup = $this->get_element_autofill_markup_attr( self::get_property( 'element_id', $field ), $this->form_settings );
		$number_attr     = array_merge( $number_attr, $autofill_markup );

		$html = self::create_input( $number_attr, $label, $description, $required, $design );

		return apply_filters( 'powerform_field_number_markup', $html, $id, $required, $placeholder, $value );
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_rules() {
		$field = $this->field;

		$min = self::get_property( 'limit_min', $field, false );
		$max = self::get_property( 'limit_max', $field, false );

		$rules = '"' . $this->get_id( $field ) . '": {';

		if ( $this->is_required( $field ) ) {
			$rules .= '"required": true,';
		}

		$rules .= '"number": true,';

		if ( false !== $min && is_numeric( $min ) ) {
			$rules .= '"min": ' . $min . ',';
		}
		if ( false !== $max && is_numeric( $max ) ) {
			$rules .= '"max": ' . $max . ',';
		}

		$rules .= '},';

		return $rules;
	}

	/**
	 * Return field inline validation errors
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_messages() {
		$field = $this->field;
		$min   = self::get_property( 'limit_min', $field, false );
		$max   = self::get_property( 'limit_max', $field, false );

		$messages = '"' . $this->get_id( $field ) . '": {' . "\n";

		if ( $this->is_required( $field ) ) {
			$required_validation_message = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte gib die Nummer ein', Powerform::DOMAIN ) );
			$required_validation_message = apply_filters(
				'powerform_field_number_required_validation_message',
				$required_validation_message,
				$field
			);
			$messages                    .= '"required": "' . $required_validation_message . '",' . "\n";
		}

		$number_validation_message = apply_filters(
			'powerform_field_number_number_validation_message',
			__( 'Dies ist keine gültige Nummer', Powerform::DOMAIN ),
			$field
		);
		$messages                  .= '"number": "' . $number_validation_message . '",' . "\n";

		if ( $min ) {
			$min_validation_message = apply_filters(
				'powerform_field_number_min_validation_message',
				__( "Bitte geib einen Wert größer oder gleich {0} ein.", Powerform::DOMAIN ),
				$field
			);
			$messages               .= '"min": "' . $min_validation_message . '",' . "\n";
		}
		if ( $max ) {
			$max_validation_message = apply_filters(
				'powerform_field_number_max_validation_message',
				__( "Bitte gib einen Wert kleiner oder gleich {0} ein.", Powerform::DOMAIN ),
				$field
			);
			$messages               .= '"max": "' . $max_validation_message . '",' . "\n";
		}

		$messages .= '},' . "\n";

		return apply_filters( 'powerform_field_number_validation_message', $messages, $field );
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
		$id  = self::get_property( 'element_id', $field );
		$max = self::get_property( 'limit_max', $field, $data );
		$min = self::get_property( 'limit_min', $field, $data );

		if ( $this->is_required( $field ) ) {

			if ( empty( $data ) && '0' !== $data ) {
				$require_message     = self::get_property( 'required_message', $field, '' );
				$required_validation_message = ! empty( $require_message ) ? $require_message : __( 'Dieses Feld wird benötigt. Bitte gib die Nummer ein', Powerform::DOMAIN );
				$this->validation_message[ $id ] = apply_filters(
					'powerform_field_number_required_field_validation_message',
					$required_validation_message,
					$id,
					$field,
					$data,
					$this
				);
			}
		} else if ( ! is_numeric( $data ) && ! empty( $data ) ) {
			$this->validation_message[ $id ] = apply_filters(
				'powerform_field_number_numeric_validation_message',
				__( 'Nur Zahlen erlaubt', Powerform::DOMAIN ),
				$id,
				$field,
				$data,
				$this
			);
		} else {
			$data = intval( $data );
			$min  = intval( $min );
			$max  = intval( $max );
			if ( ( ! empty( $min ) && $data < $min ) || ( ! empty( $max ) && $data > $max ) ) {
				$this->validation_message[ $id ] = sprintf(
					apply_filters(
						'powerform_field_number_max_min_validation_message',
						__( 'Die Nummer sollte kleiner als %1$d und größer als %2$d sein', Powerform::DOMAIN ),
						$id,
						$field,
						$data
					),
					$max,
					$min
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

		return apply_filters( 'powerform_field_number_sanitize', $data, $field, $original_data );
	}
}