<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Time
 *
 * @property  array field
 * @since 1.0
 */
class Powerform_Time extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'time';

	/**
	 * @var string
	 */
	public $type = 'time';

	/**
	 * @var int
	 */
	public $position = 13;

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
	public $icon = 'sui-icon-clock';

	/**
	 * Powerform_Time constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Zeitauswahl', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array(
			'field_type'     => 'input',
			'time_type'      => 'twelve',
			'field_label'    => '',
			'hh_label'       => __( 'Stunden', Powerform::DOMAIN ),
			'hh_placeholder' => __( 'Z.B. 08', Powerform::DOMAIN ),
			'mm_label'       => __( 'Minuten', Powerform::DOMAIN ),
			'mm_placeholder' => __( 'Z.B. 00', Powerform::DOMAIN ),
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
		$hours_providers   = apply_filters( 'powerform_field_' . $this->slug . '_hours_autofill', array(), $this->slug . '_hours' );
		$minutes_providers = apply_filters( 'powerform_field_' . $this->slug . '_minutes_autofill', array(), $this->slug . '_minutes' );
		$ampm_providers    = apply_filters( 'powerform_field_' . $this->slug . '_ampm_autofill', array(), $this->slug . '_ampm' );

		$autofill_settings = array(
			'time-hours'   => array(
				'values' => powerform_build_autofill_providers( $hours_providers ),
			),
			'time-minutes' => array(
				'values' => powerform_build_autofill_providers( $minutes_providers ),
			),
			'time-ampm'    => array(
				'values' => powerform_build_autofill_providers( $ampm_providers ),
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
		$html        = '';
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$required    = self::get_property( 'required', $field, false, 'bool' );
		$design      = $this->get_form_style( $settings );
		// backward compatibilty when time doesnt have field_type
		$field_type       = trim( self::get_property( 'field_type', $field, 'input' ) );
		$type             = trim( self::get_property( 'time_type', $field ) );
		$field_label      = self::get_property( 'field_label', $field );
		$description      = self::get_property( 'description', $field, '' );
		$default_time     = self::get_property( 'default_time', $field, '' );
		$increment_hour   = self::get_property( 'increment_hour', $field, 0 );
		$increment_minute = self::get_property( 'increment_minute', $field, 0 );

		$default_time_hour   = '';
		$default_time_minute = '';
		$default_time_ampm = '';
		if ( 'default' === $default_time ) {
			$default_time_hour   = self::get_property( 'default_time_hour', $field, '' );
			$default_time_minute = self::get_property( 'default_time_minute', $field, '' );
			$default_time_ampm = self::get_property( 'default_time_ampm', $field, '' );
		}

		if ( ! empty( $field_label ) ) {

			if ( $required ) {

				$html .= '<div class="powerform-field--label">';
				$html .= sprintf( '<label id="powerform-label-%s" class="powerform-label">%s %s</label>', $id, $field_label, powerform_get_required_icon() );
				$html .= '</div>';

			} else {

				$html .= '<div class="powerform-field--label">';
				$html .= sprintf( '<label id="powerform-label-%s" class="powerform-label">%s</label>', $id, $field_label );
				$html .= '</div>';

			}

			//mark hours and minutes required markup as false
			$required = false;
		}

		$html .= '<div class="powerform-row powerform-row--time powerform-row--inner">';

		// Determinate field cols
		$cols = ( "twelve" === $type ) ? 4 : 6;

		/**
		 * Create hours field
		 */
		$hours = array(
			'type'        => 'number',
			'class'       => 'powerform-input powerform-input-time',
			'name'        => $id . '-hours',
			'id'          => $id . '-hours',
			'placeholder' => $this->sanitize_value( self::get_property( 'hh_placeholder', $field ) ),
			'min'         => ( "twelve" === $type ) ? '1' : '0',
			'max'         => ( "twelve" === $type ) ? '12' : '23',
		);

		if ( ! empty( $default_time_hour ) ) {
			$hours ['value'] = $default_time_hour;
		}

		if ( ! empty( $increment_hour ) ) {
			$hours ['step'] = (int) $increment_hour;
		}

		$html .= sprintf( '<div class="powerform-col powerform-col-%s">', $cols );
		$html .= sprintf( '<div class="powerform-field powerform-field--inner">', $cols );

		if ( $required ) {
			$label = self::get_property( 'hh_label', $field );
			if ( ! empty( $label ) ) {
				$html .= '<div class="powerform-field--label">';
				$html .= '<label class="powerform-label">' . $label . ' <span class="wpdui-icon wpdui-icon-asterisk"></span></label>';
				$html .= '</div>';
			}
			if ( 'input' === $field_type ) {
				$html .= self::create_input( $hours, false, '', $required, $design );
			}
		} else {
			if ( 'input' === $field_type ) {
				$html .= self::create_input( $hours, self::get_property( 'hh_label', $field ), '', $required, $design );
			}
		}
		if ( 'select' === $field_type ) {
			$hours_data = array(
				'class' => 'powerform-time',
				'name'  => $id . '-hours',
				'id'    => $id . '-hours',
			);

			$html .= self::create_select( $hours_data, '', $this->get_hours( $type ), $default_time_hour, '', $required );
		}

		$html .= '</div>';
		$html .= '</div>';

		/**
		 * Create mintues field
		 */
		$minutes = array(
			'type'        => 'number',
			'class'       => 'powerform-input powerform-input-time',
			'name'        => $id . '-minutes',
			'id'          => $id . '-minutes',
			'placeholder' => $this->sanitize_value( self::get_property( 'mm_placeholder', $field ) ),
			'min'         => 0,
			'max'         => 59,
		);

		if ( ! empty( $default_time_minute ) ) {
			$minutes ['value'] = $default_time_minute;
		}

		if ( ! empty( $increment_minute ) ) {
			$minutes ['step'] = (int) $increment_minute;
		}

		$html .= sprintf( '<div class="powerform-col powerform-col-%s">', $cols );
		$html .= sprintf( '<div class="powerform-field powerform-field--inner">', $cols );

		if ( $required ) {
			$label = self::get_property( 'mm_label', $field );
			if ( ! empty( $label ) ) {
				$html .= '<div class="powerform-field--label">';
				$html .= '<label class="powerform-label">' . $label . ' <span class="wpdui-icon wpdui-icon-asterisk"></span></label>';
				$html .= '</div>';
			}

			if ( 'input' === $field_type ) {
				$html .= self::create_input( $minutes, false, '', $required, $design );
			}
		} else {
			if ( 'input' === $field_type ) {
				$html .= self::create_input( $minutes, self::get_property( 'mm_label', $field ), '', $required, $design );
			}
		}
		if ( 'select' === $field_type ) {
			$minutes_data = array(
				'class' => 'powerform-time',
				'name'  => $id . '-minutes',
				'id'    => $id . '-minutes',
			);

			$html .= self::create_select( $minutes_data, '', $this->get_minutes(), $default_time_minute, '', $required );
		}

		$html .= '</div>';
		$html .= '</div>';

		if ( "twelve" === $type ) {
			/**
			 * Create AM/PM field
			 */
			$ampm = array(
				'class' => 'powerform-time',
				'name'  => $id . '-ampm',
				'id'    => $id . '-ampm',
			);

			$options = array(
				array(
					'value' => 'am',
					'label' => __( 'AM', Powerform::DOMAIN ),
				),
				array(
					'value' => 'pm',
					'label' => __( 'PM', Powerform::DOMAIN ),
				),
			);

			$ampm_value = '';
			if ( ! empty( $default_time_ampm ) ) {
				$ampm_value = $default_time_ampm;
			}

			$html .= sprintf( '<div class="powerform-col powerform-col-%s">', $cols );
			$html .= sprintf( '<div class="powerform-field powerform-field--inner">', $cols );
			$html .= self::create_select( $ampm, '', $options, $ampm_value );
			$html .= '</div>';
			$html .= '</div>';
		}

		// Close row div
		$html .= '</div>';

		$html .= self::get_description( $description );

		return apply_filters( 'powerform_field_time_markup', $html, $field );
	}

	/**
	 * Return hours
	 *
	 * @since 1.0.5
	 *
	 * @param $type
	 *
	 * @return array
	 */
	public function get_hours( $type ) {
		$array = array();
		if ( 'twelve' === $type ) {
			$min = 1;
			$max = 12;
		} else {
			$min = 0;
			$max = 23;
		}

		for ( $i = $min; $i <= $max; $i ++ ) {
			$array[] = array(
				'label' => $i,
				'value' => $i,
			);
		}

		return apply_filters( 'powerform_field_time_get_hours', $array, $this );
	}

	/**
	 * Return minutes
	 *
	 * @since 1.0.5
	 * @return array
	 */
	public function get_minutes() {
		$array = array();

		for ( $i = 0; $i < 60; $i ++ ) {
			$array[] = array(
				'label' => $i,
				'value' => $i,
			);
		}

		return apply_filters( 'powerform_field_time_get_minutes', $array, $this );
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_rules() {
		$field = $this->field;
		$rules = '';

		if ( $this->is_required( $field ) ) {
			$rules .= '"' . $this->get_id( $field ) . '-hours": { "required": true },' . "\n";
			$rules .= '"' . $this->get_id( $field ) . '-minutes": { "required": true },' . "\n";
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
		$required_message = self::get_property( 'required_message', $field, '' );
		$type             = trim( self::get_property( 'time_type', $field, 'twelve' ) );
		$messages         = '';
		$hours_label      = self::get_property( 'hh_label', $field, 'Hours' );
		$minutes_label    = self::get_property( 'mm_label', $field, 'Minutes' );

		$messages .= '"' . $this->get_id( $field ) . '-hours": {' . "\n";
		$min_hour = ( "twelve" === $type ) ? '1' : '0';
		$max_hour = ( "twelve" === $type ) ? '12' : '23';
		$messages .= '"min": "' . sprintf(
				apply_filters(
					'powerform_time_field_hours_min_validation_message',
					__( 'Bitte gib einen Wert größer oder gleich %1$s für %2$s ein.', Powerform::DOMAIN )
				),
				$min_hour,
				$hours_label
			) . '",' . "\n";
		$messages .= '"max": "' . sprintf(
				apply_filters( 'powerform_time_field_hours_max_validation_message', __( 'Bitte gib einen Wert kleiner oder gleich %1$s für %2$s ein.', Powerform::DOMAIN ) ),
				$max_hour,
				$hours_label
			) . '",' . "\n";
		$messages .= '"number": "' . sprintf(
				apply_filters(
					'powerform_time_field_hours_number_validation_message',
					__( 'Bitte geben Sie eine gültige Nummer für %1$s ein.', Powerform::DOMAIN )
				),
				$hours_label
			) . '",' . "\n";
		if ( $this->is_required( $field ) ) {
			// Hours validation
			$hours_message = apply_filters(
				'powerform_time_field_hours_required_validation_message',
				( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte gib eine gültige Stunde ein', Powerform::DOMAIN ) ),
				$id,
				$field
			);

			$messages .= '"required": "' . $hours_message . '",' . "\n";
		}
		$messages .= '},' . "\n";

		// minutes
		$messages .= '"' . $this->get_id( $field ) . '-minutes": {' . "\n";
		$messages .= '"min": "' . sprintf(
				apply_filters( 'powerform_time_field_minutes_min_validation_message', __( 'Bitte gib für %1$s einen Wert größer oder gleich 0 ein.', Powerform::DOMAIN ) ),
				$minutes_label
			) . '",' . "\n";
		$messages .= '"max": "' . sprintf(
				apply_filters(
					'powerform_time_field_minutes_max_validation_message',
					__( 'Bitte gib für %1$s einen Wert kleiner oder gleich 59 ein.', Powerform::DOMAIN )
				),
				$minutes_label
			) . '",' . "\n";
		$messages .= '"number": "' . sprintf(
				apply_filters(
					'powerform_time_field_minutes_number_validation_message',
					__( 'Bitte gib eine gültige Nummer für %1$s ein.', Powerform::DOMAIN )
				),
				$minutes_label
			) . '",' . "\n";
		if ( $this->is_required( $field ) ) {
			// Minutes validation
			$minutes_message = apply_filters(
				'powerform_time_field_minutes_required_validation_message',
				( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte gib eine gültige Minute ein', Powerform::DOMAIN ) ),
				$id,
				$field
			);

			$messages .= '"required": "' . $minutes_message . '",' . "\n";
		}
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
	 */
	public function validate( $field, $data ) {
		if ( $this->is_required( $field ) ) {
			$required_message = self::get_property( 'required_message', $field, '' );
			$id               = self::get_property( 'element_id', $field );

			if ( empty( $data ) ) {
				$this->validation_message[ $id . '-hours' ]   = apply_filters(
					'powerform_time_field_hours_required_validation_message',
					( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte gib eine gültige Stunde ein', Powerform::DOMAIN ) ),
					$id,
					$field
				);
				$this->validation_message[ $id . '-minutes' ] = apply_filters(
					'powerform_time_field_minutes_required_validation_message',
					( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte gib eine gültige Minute ein', Powerform::DOMAIN ) ),
					$id,
					$field
				);
			} else {
				$hour                  = isset( $data['hours'] ) ? $data['hours'] : '';
				$minute                = isset( $data['minutes'] ) ? $data['minutes'] : '';
				$type                  = self::get_property( 'time_type', $field );
				$hours_error_message   = apply_filters(
					'powerform_time_field_minutes_validation_message',
					__( 'Bitte gib eine gültige Stunde ein', Powerform::DOMAIN ),
					$id,
					$field
				);
				$minutes_error_message = apply_filters(
					'powerform_time_field_minutes_validation_message',
					__( 'Bitte gib eine gültige Minute ein', Powerform::DOMAIN ),
					$id,
					$field
				);
				if ( ! is_numeric( $hour ) || ! is_numeric( $minute ) ) {
					if ( ! is_numeric( $hour ) ) {
						$this->validation_message[ $id . '-hours' ] = $hours_error_message;
					}
					if ( ! is_numeric( $minute ) ) {
						$this->validation_message[ $id . '-minutes' ] = $minutes_error_message;
					}
				} else {
					// possible hour is string, because its sent from form data
					$hour       = (int) $hour;
					$min_hour   = 'twelve' === $type ? 1 : 0;
					$max_hour   = 'twelve' === $type ? 12 : 23;
					$max_minute = $hour >= 23 ? 0 : 59;

					if ( 0 === $hour ) {
						$max_minute = 0;
					}
					if ( $hour < $min_hour || $hour > $max_hour ) {
						$this->validation_message[ $id . '-hours' ] = $hours_error_message;
					}
					if ( $minute > $max_minute ) {
						$this->validation_message[ $id . '-minutes' ] = $minutes_error_message;
					}
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

		return apply_filters( 'powerform_field_time_sanitize', $data, $field, $original_data );
	}
}