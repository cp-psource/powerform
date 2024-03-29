<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Phone
 *
 * @since 1.0
 */
class Powerform_Phone extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'phone';

	/**
	 * @var int
	 */
	public $position = 3;

	/**
	 * @var string
	 */
	public $type = 'phone';

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
	public $icon = 'sui-icon-phone';

	/**
	 * Powerform_Phone constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Phone', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return apply_filters( 'powerform_phone_defaults_settings',
		                      array(
			                      'required'              => false,
			                      'limit'                 => 10,
			                      'limit_type'            => 'characters',
			                      'phone_validation_type' => "standard",
			                      'field_label'           => __( 'Telefon', Powerform::DOMAIN ),
			                      'placeholder'           => __( 'Z.B. +1 300 400 5000', Powerform::DOMAIN ),
		                      ) );
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
			'phone' => array(
				'values' => powerform_build_autofill_providers( $providers ),
			),
		);

		return $autofill_settings;
	}

	/**
	 * Phone formats
	 *
	 * @since 1.0
	 * @since 1.5.1 add regex for international phone number
	 * @return array
	 */
	public function get_phone_formats() {
		$phone_formats = array(
			'standard'      => array(
				'label'       => '(###) ###-####',
				'mask'        => '(999) 999-9999',
				/**
				 * match jquery-validation phoneUS validation
				 * https://github.com/jquery-validation/jquery-validation/blob/1.17.0/src/additional/phoneUS.js#L20
				 */
				//'regex'       => '/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/',
				'regex'       => '/^(\d|\s|\(|\)|\-){5,20}$/',
				'instruction' => __( 'Bitte stelle sicher, dass die Nummer ein nationales Format hat.', Powerform::DOMAIN ),
			),
			'international' => array(
				'label'       => __( 'International', Powerform::DOMAIN ),
				'mask'        => '(123) 456-789',
				/**
				 * allowed `+`, but only on first character
				 * allowed `{`, `)`, `_space_`, `-` and `digits`
				 * allowed 10-20 in total characters
				 */
				'regex'       => '/^(\+){0,1}(\d|\s|\(|\)|\-){10,20}$/',
				'instruction' => __( 'Bitte stelle sicher, dass die Nummer ein internationales Format hat.', Powerform::DOMAIN ),
			),
		);

		return apply_filters( 'powerform_phone_formats', $phone_formats );
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
		$this->field  = $field;
		$id           = self::get_property( 'element_id', $field );
		$name         = $id;
		$ariaid       = $id;
		$id           = $id . '-field';
		$required     = self::get_property( 'required', $field, false, 'bool' );
		$design       = $this->get_form_style( $settings );
		$placeholder  = $this->sanitize_value( self::get_property( 'placeholder', $field ) );
		$value        = self::get_property( 'value', $field );
		$phone_format = self::get_property( 'phone_validation_type', $field );
		$country      = self::get_property( 'phone_national_country', $field, false );
		$limit        = self::get_property( 'limit', $field, 10 );
		$label        = self::get_property( 'field_label', $field, '' );
		$description  = self::get_property( 'description', $field, '' );
		$format_check = self::get_property( 'validation', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $format_check ) {
			// read old attribute
			$format_check = self::get_property( 'phone_validation', $field, false, 'bool' );
		} else {
			$format_check = powerform_var_type_cast( $format_check, 'bool' );
		}

		$html = '';

		$phone_attr = array(
			'type'          => 'text',
			'class'         => 'powerform-phone--field powerform-input',
			'text'          => 'powerform-phone--field powerform-input',
			'data-required' => $required,
			'name'          => $name,
			'placeholder'   => $placeholder,
			'value'         => $value,
			'id'            => $id,
		);

		if ( $format_check ) {
			if ( 'character_limit' === $phone_format && 0 < $limit ) {
				$phone_attr['maxlength'] = $limit;
			} elseif ( 'standard' === $phone_format ) {
				$phone_attr['data-national_mode'] = 'enabled';
				if ( $country ) {
					$phone_attr['data-country'] = $country;
				}
			} elseif ( 'international' === $phone_format ) {
				$phone_attr['data-national_mode'] = 'disabled';
			}
		}

		$html .= self::create_input( $phone_attr, $label, '', $required, $design );

		// counter
		if ( ! empty( $description ) || ( $format_check && 'character_limit' === $phone_format && 0 < $limit ) ) {
			$html .= '<div class="powerform-field--helper">';
			if ( ! empty( $description ) ) {
				$html .= sprintf( '<label class="powerform-label--helper">%s</label>', $description );
			}
			if ( ( ! empty( $limit ) ) ) {
				$html .= sprintf( '<label class="powerform-label--limit" data-limit="%s" data-type="%s">0 / %s</label>', $limit, '', $limit );
			}
			$html .= '</div>';
		}

		return apply_filters( 'powerform_field_phone_markup', $html, $id, $required, $placeholder, $value );
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0
	 * @since 1.5.1 add powerformPhoneInternational for jQueryValidation
	 * @return string
	 */
	public function get_validation_rules() {
		$field        = $this->field;
		$phone_format = self::get_property( 'phone_validation_type', $field );
		$limit        = self::get_property( 'limit', $field, 10 );
		$format_check = self::get_property( 'validation', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $format_check ) {
			// read old attribute
			$format_check = self::get_property( 'phone_validation', $field, false, 'bool' );
		} else {
			$format_check = powerform_var_type_cast( $format_check, 'bool' );
		}
		$rules = '"' . $this->get_id( $field ) . '": {';

		if ( $this->is_required( $field ) ) {
			$rules .= '"required": true,';
			$rules .= '"trim": true,';
		}

		//standard means phoneUS
		if ( $format_check ) {
			if ( 'standard' === $phone_format ) {
				$rules .= '"powerformPhoneNational": true,';
			} elseif ( 'character_limit' === $phone_format ) {
				$limit = isset( $field['limit'] ) ? intval( $field['limit'] ) : 10;
				$rules .= '"maxlength": ' . $limit . ',';
			} elseif ( 'international' === $phone_format ) {
				$rules .= '"powerformPhoneInternational": true,';
			}
		}

		$rules .= '},';

		return $rules;
	}

	/**
	 * Return field inline validation errors
	 *
	 * @since 1.0
	 * @since 1.5.1 add `international` phone
	 * @return string
	 */
	public function get_validation_messages() {
		$field        = $this->field;
		$format_check = self::get_property( 'validation', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $format_check ) {
			// read old attribute
			$format_check = self::get_property( 'phone_validation', $field, false, 'bool' );
		} else {
			$format_check = powerform_var_type_cast( $format_check, 'bool' );
		}
		$validation_message = self::get_property( 'validation_message', $field, '' );
		$phone_format       = self::get_property( 'phone_validation_type', $field );
		$messages           = '"' . $this->get_id( $field ) . '": {' . "\n";

		if ( $this->is_required( $field ) ) {
			$required_message = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte gib eine Telefonnummer ein', Powerform::DOMAIN ) );
			$required_message = apply_filters(
				'powerform_field_phone_required_validation_message',
				$required_message,
				$field,
				$format_check,
				$phone_format,
				$this
			);
			$messages         .= '"required": "' . $required_message . '",' . "\n";
			$messages         .= '"trim": "' . apply_filters(
					'powerform_field_phone_trim_validation_message',
					$required_message,
					$field,
					$format_check,
					$phone_format,
					$this
				) . '",' . "\n";
		}

		if ( $format_check ) {
			if ( 'standard' === $phone_format ) {
				$messages .= '"powerformPhoneNational": "' . apply_filters( // phpcs:ignore
						'powerform_field_phone_phoneUS_validation_message',
						( ! empty( $validation_message ) ? $validation_message : __( 'Bitte gib eine gültige Telefonnummer ein', Powerform::DOMAIN ) ) . '",',
						$field,
						$format_check,
						$phone_format,
						$this
					);
			} elseif ( 'character_limit' === $phone_format ) {
				$messages .= '"maxlength": "' . apply_filters(
						'powerform_field_phone_maxlength_validation_message',
						( ! empty( $validation_message ) ? $validation_message : __( 'Du hast die zulässige Anzahl von Zahlen überschritten. Bitte überprüfe die Nummer noch einmal', Powerform::DOMAIN ) ) . '",' . "\n",
						$field,
						$format_check,
						$phone_format,
						$this
					);
			} elseif ( 'international' === $phone_format ) {
				$messages .= '"powerformPhoneInternational": "' . apply_filters(
						'powerform_field_phone_internation_validation_message',
						( ! empty( $validation_message ) ? $validation_message : __( 'Bitte gib eine gültige internationale Telefonnummer ein', Powerform::DOMAIN ) ) . '",' . "\n",
						$field,
						$format_check,
						$phone_format,
						$this
					);
			}
		}

		$phone_message = apply_filters(
			'powerform_field_phone_invalid_validation_message',
			( ! empty( $validation_message ) ? $validation_message : __( 'Bitte gib eine gültige Telefonnummer ein.', Powerform::DOMAIN ) ) . '",' . "\n",
			$field,
			$format_check,
			$phone_format,
			$this
		);
		$messages      .= '"phone": "' . $phone_message;

		$messages .= '},' . "\n";

		return $messages;

	}

	/**
	 * Field back-end validation
	 *
	 * @since 1.0
	 *
	 * @param array        $field
	 * @param array|string $data
	 *
	 * @return bool
	 */
	public function validate( $field, $data ) {
		$id = self::get_property( 'element_id', $field );

		if ( $this->is_required( $field ) ) {
			if ( empty( $data ) ) {
				$required_message                = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte gib eine Telefonnummer ein', Powerform::DOMAIN ) );
				$this->validation_message[ $id ] = apply_filters(
					'powerform_field_phone_required_field_validation_message',
					$required_message,
					$id,
					$field,
					$data,
					$this
				);

				return false;
			}
		}

		//if data is empty, no need to `$format_check`
		if ( empty( $data ) ) {
			return true;
		}

		//enable phone validation if `phone_validation` property enabled and data not empty, even the field is not required
		$format_check = self::get_property( 'validation', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $format_check ) {
			// read old attribute
			$format_check = self::get_property( 'phone_validation', $field, false, 'bool' );
		} else {
			$format_check = powerform_var_type_cast( $format_check, 'bool' );
		}
		$phone_format       = self::get_property( 'phone_validation_type', $field );
		$validation_message = self::get_property( 'validation_message', $field, '' );

		if ( $format_check ) {
			if ( 'character_limit' === $phone_format ) {
				$limit = isset( $field['limit'] ) ? intval( $field['limit'] ) : 10;

				if ( strlen( $data ) > $limit ) {
					$this->validation_message[ $id ] = apply_filters(
						'powerform_field_phone_limit_validation_message',
						( ! empty( $validation_message ) ? $validation_message : __( 'Du hast die zulässige Anzahl von Zahlen überschritten. Bitte überprüfe die Nummer noch einmal', Powerform::DOMAIN ) ),
						$id,
						$field,
						$data,
						$this
					);

					return false;
				}
			} else {
				$formats = $this->get_phone_formats();
				if ( isset( $formats[ $phone_format ] ) ) {
					$validation_type = $formats[ $phone_format ];
					if ( $validation_type['regex'] && ! preg_match( $validation_type['regex'], $data ) ) {
						$this->validation_message[ $id ] =
							apply_filters(
								'powerform_field_phone_format_validation_message',
								( ! empty( $validation_message )
									? $validation_message
									: sprintf(
										__( 'Ungültige Telefonnummer. %s', Powerform::DOMAIN ),
										$validation_type['instruction']
									) ),
								$validation_type['instruction']
							);

						return false;
					}
				}
			}
		}

		if ( preg_match( '/[a-z]|[^\w\-()+ ]|[\-()+]{2,}/i', $data ) ) {
			$this->validation_message[ $id ] = apply_filters(
				'powerform_field_phone_invalid_validation_message',
				( ! empty( $validation_message ) ? $validation_message : __( 'Bitte gib eine gültige Telefonnummer ein.', Powerform::DOMAIN ) ),
				$id,
				$field,
				$data,
				$this
			);

			return false;
		}

		return true;
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

		return apply_filters( 'powerform_field_phone_sanitize', $data, $field, $original_data );
	}
}