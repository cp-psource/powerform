<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Hidden
 *
 * @since 1.0
 */
class Powerform_Hidden extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'hidden';

	/**
	 * @var string
	 */
	public $type = 'hidden';

	/**
	 * @var int
	 */
	public $position = 19;

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
	public $hide_advanced = "true";

	/**
	 * @var string
	 */
	public $icon = 'sui-icon-eye-hide';

	/**
	 * Powerform_Hidden constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Verstecktes Feld', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		return array(
			'field_label'   => '',
			'default_value' => 'user_ip',
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
		//Unsupported Autofill
		$autofill_settings = array();

		return $autofill_settings;
	}

	/**
	 * Field front-end markup
	 *
	 * @since 1.0
	 * @param $field
	 * @param $settings
	 *
	 * @return mixed
	 */
	public function markup( $field, $settings = array() ) {
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$required    = self::get_property( 'required', $field, false );
		$placeholder = self::get_property( 'placeholder', $field );
		$value       = $this->get_value( $field );

		return sprintf( '<input type="hidden" id="%s" name="%s" value="%s" />', $id, $name, $value );
	}

	/**
	 * Return replaced value
	 *
	 * @since 1.0
	 * @since 1.5 add user_id value getter
	 * @param $field
	 *
	 * @return mixed|string
	 */
	public function get_value( $field ) {
		$value       = '';
		$saved_value = self::get_property( 'default_value', $field );
		$embed_url   = powerform_get_current_url();

		switch( $saved_value ) {
			case "user_ip":
				$value = Powerform_Geo::get_user_ip();
				break;
			case "date_mdy":
				$value = date_i18n( 'm/d/Y', powerform_local_timestamp(), true );
				break;
			case "date_dmy":
				$value = date_i18n( 'd/m/Y', powerform_local_timestamp(), true );
				break;
			case "embed_id":
				$value = powerform_get_post_data( 'ID' );
				break;
			case "embed_title":
				$value = powerform_get_post_data( 'post_title' );
				break;
			case "embed_url":
				$value = $embed_url;
				break;
			case "user_agent":
				$value = $_SERVER[ 'HTTP_USER_AGENT' ];
				break;
			case "refer_url":
				$value = isset ( $_SERVER['HTTP_REFERER'] ) ? $_SERVER['HTTP_REFERER'] : $embed_url;
				break;
			case "user_id":
				$value = powerform_get_user_data( 'ID' );
				break;
			case "user_name":
				$value = powerform_get_user_data( 'display_name' );
				break;
			case "user_email":
				$value = powerform_get_user_data( 'user_email' );
				break;
			case "user_login":
				$value = powerform_get_user_data( 'user_login' );
				break;
			case "custom_value":
				$value = self::get_property( 'custom_value', $field );
				break;
			default:
				break;
		}

		return apply_filters( 'powerform_field_hidden_field_value', $value, $saved_value, $field, $this );
	}

	/**
	 * Sanitize data
	 *
	 * @since 1.0.2
	 *
	 * @param array $field
	 * @param array|string $data - the data to be sanitized
	 *
	 * @return array|string $data - the data after sanitization
	 */
	public function sanitize( $field, $data ) {
		$original_data = $data;
		// Sanitize
		$data = powerform_sanitize_field( $data );

		return apply_filters( 'powerform_field_hidden_sanitize', $data, $field, $original_data );
	}
}