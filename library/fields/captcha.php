<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Captcha
 *
 * @since 1.0
 */
class Powerform_Captcha extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'captcha';

	/**
	 * @var string
	 */
	public $type = 'captcha';

	/**
	 * @var int
	 */
	public $position = 16;

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
	public $icon = 'sui-icon-recaptcha';

	/**
	 * Powerform_Captcha constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'reCaptcha', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {

		return array(
			// 'field_label'  => __( 'Are you a human?', Powerform::DOMAIN )
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

	public function is_invisible_recaptcha( $field ) {
		// backward
		$is_invisible = self::get_property( 'invisible_captcha', $field );
		$is_invisible = filter_var( $is_invisible, FILTER_VALIDATE_BOOLEAN );
		if ( ! $is_invisible ) {
			$type = self::get_property( 'captcha_type', $field, '' );
			if ( 'invisible' === $type ) {
				$is_invisible = true;
			}
		}

		return $is_invisible;
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
		$key           = get_option( "powerform_captcha_key", false );
		$theme         = get_option( "powerform_captcha_theme", false );
		$captcha_size  = self::get_property( 'captcha_type', $field, '' );
		$captcha_theme = self::get_property( 'captcha_theme', $field, $theme );

		if ( 'full' === $captcha_size ) {
			$captcha_size = 'normal';
		}

		$captcha_class = 'powerform-g-recaptcha';

		if ( $this->is_invisible_recaptcha( $field ) ) {
			$captcha_size  = 'invisible';
			$captcha_class .= ' recaptcha-invisible';
		}

		// dont use .g-recaptcha class as it will rendered automatically when other plugin load recaptcha with default render
		return sprintf( '<div class="%s" data-theme="%s" data-sitekey="%s" data-size="%s"></div>', $captcha_class, $captcha_theme, $key, $captcha_size );
	}


	/**
	 * Mark Captcha unavailable when captcha key not available
	 *
	 * @since 1.0.3
	 *
	 * @param $field
	 *
	 * @return bool
	 */
	public function is_available( $field ) {
		$key = get_option( "powerform_captcha_key", false );

		if ( ! $key ) {
			return false;
		}

		return true;
	}

	/**
	 * Validate captcha
	 *
	 * @since 1.5.3
	 *
	 * @param array        $field
	 * @param array|string $data
	 *
	 * @return bool
	 */
	public function validate( $field, $data ) {
		$secret     = get_option( 'powerform_captcha_secret', false );
		$element_id = self::get_property( 'element_id', $field );

		$recaptcha = new Powerform_Recaptcha( $secret );
		$verify    = $recaptcha->verify( $data );
		if ( is_wp_error( $verify ) ) {
			$invalid_captcha_message = __( 'Ungültiges Captcha. Bitte überprüfe die Captcha-Eingabe.', Powerform::DOMAIN );

			/**
			 * Filter message displayed for invalid captcha
			 *
			 * @since 1.5.3
			 *
			 * @param string   $invalid_captcha_message
			 * @param string   $element_id
			 * @param array    $field
			 * @param WP_Error $verify
			 */
			$invalid_captcha_message = apply_filters( 'powerform_invalid_captcha_message', $invalid_captcha_message, $element_id, $field, $verify );

			$this->validation_message[ $element_id ] = $invalid_captcha_message;
		}
	}
}