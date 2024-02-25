<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Website
 *
 * @since 1.0
 */
class Powerform_Website extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'url';

	/**
	 * @var int
	 */
	public $position = 5;

	/**
	 * @var string
	 */
	public $type = 'url';

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
	public $icon = 'sui-icon-web-globe-world';

	/**
	 * Powerform_Website constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Webseite', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array(
			'field_label' => __( 'Webseite', Powerform::DOMAIN ),
			'placeholder' => __( 'Z.B. https://www.example.com', Powerform::DOMAIN ),
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
			'website' => array(
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
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$ariaid      = $id;
		$id          = $id . '-field';
		$required    = $this->get_property( 'required', $field, false );
		$placeholder = $this->sanitize_value( $this->get_property( 'placeholder', $field ) );
		$value       = self::get_post_data( $name, $this->get_property( 'default', $field ) );
		$label       = $this->get_property( 'field_label', $field, '' );
		$description = $this->get_property( 'description', $field, '' );
		$design      = $this->get_form_style( $settings );

		$website = array(
			'class'         => 'powerform-website--field powerform-input',
			'type'          => 'url',
			'data-required' => $required,
			'name'          => $name,
			'placeholder'   => $placeholder,
			'value'         => $value,
			'id'            => $id,
		);

		$html = self::create_input( $website, $label, $description, $required, $design );

		return apply_filters( 'powerform_field_website_markup', $html, $id, $required, $placeholder, $value );
	}

	/**
	 * Return string with scheme part if needed
	 *
	 * @since 1.1
	 *
	 * @param string $url
	 *
	 * @return string
	 */
	public function add_scheme_url( $url ) {
		if ( empty( $url ) ) {
			return $url;
		}
		$parts = wp_parse_url( $url );
		if ( false !== $parts ) {
			if ( ! isset( $parts['scheme'] ) ) {
				$url = 'http://' . $url;
			}
		}

		return $url;
	}

	/**
	 * Return field inline validation rules
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_rules() {
		$field              = $this->field;
		$rules              = '"' . $this->get_id( $field ) . '": {' . "\n";
		$validation_enabled = self::get_property( 'validation', $field, false, 'bool' );

		if ( $this->is_required( $field ) ) {
			$rules .= '"required": true,';
		}

		if ( $validation_enabled ) {
			$rules .= '"validurl": true,';
		}

		$rules .= '"url": false,';
		$rules .= '},' . "\n";

		return $rules;
	}

	/**
	 * Return field inline validation errors
	 *
	 * @since 1.0
	 * @return string
	 */
	public function get_validation_messages() {
		$field              = $this->field;
		$id                 = $this->get_id( $field );
		$validation_enabled = self::get_property( 'validation', $field, false, 'bool' );
		$validation_message = self::get_property( 'validation_message', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		$required_message   = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte gib eine gültige URL ein', Powerform::DOMAIN ) );
		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $validation_message ) {
			$validation_message = self::get_property( 'validation_text', $field, '' );
		}

		$validation_message = htmlentities( $validation_message );

		$messages = '"' . $id . '": {' . "\n";

		if ( $this->is_required( $field ) ) {

			$required_message = apply_filters(
				'powerform_website_field_required_validation_message',
				$required_message,
				$field,
				$id
			);
			$messages         .= '"required": "' . $required_message . '",' . "\n";
		}

		$validation_message = ! empty( $validation_message ) ? $validation_message : __( 'Bitte gib eine gültige Webseiten-URL ein (e.g. https://n3rds.work/).', Powerform::DOMAIN );
		if ( $validation_enabled ) {

			$validation_message = apply_filters(
				'powerform_website_field_custom_validation_message',
				$validation_message,
				$id,
				$field,
				$validation_enabled
			);
		}
		$messages .= '"validurl": "' . $validation_message . '",' . "\n";
		$messages .= '},' . "\n";

		$messages = apply_filters(
			'powerform_website_field_validation_message',
			$messages,
			$id,
			$field,
			$validation_enabled
		);

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
		$id                 = self::get_property( 'element_id', $field );
		$validation_enabled = self::get_property( 'validation', $field, false, 'bool' );
		$validation_message = self::get_property( 'validation_message', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		$required_message   = self::get_property( 'required_message', $field, __( 'Dieses Feld wird benötigt. Bitte gib eine gültige URL ein', Powerform::DOMAIN ) );
		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $validation_message ) {
			$validation_message = self::get_property( 'validation_text', $field, '' );
		}

		$validation_message = htmlentities( $validation_message );

		if ( $this->is_required( $field ) ) {

			if ( empty( $data ) ) {

				$this->validation_message[ $id ] = apply_filters(
					'powerform_website_field_required_validation_message',
					$required_message,
					$id,
					$field
				);
			}
		}
		if ( $validation_enabled ) {
			if ( ! filter_var( $data, FILTER_VALIDATE_URL ) ) {
				$this->validation_message[ $id ] = apply_filters(
					'powerform_website_field_custom_validation_message',
					$validation_message,
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

		return apply_filters( 'powerform_field_website_sanitize', $data, $field, $original_data );
	}
}