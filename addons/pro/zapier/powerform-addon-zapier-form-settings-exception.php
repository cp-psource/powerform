<?php

/**
 * Class Powerform_Addon_Zapier_Form_Settings_Exception
 * Wrapper of Form Settings Zapier Exception
 *
 * @since 1.0 Zapier Addon
 */
class Powerform_Addon_Zapier_Form_Settings_Exception extends Powerform_Addon_Zapier_Exception {

	/**
	 * Holder of input exceptions
	 *
	 * @since 1.0 Zapier Addon
	 * @var array
	 */
	protected $input_exceptions = array();

	/**
	 * Powerform_Addon_Zapier_Form_Settings_Exception constructor.
	 *
	 * Useful if input_id is needed for later.
	 * If no input_id needed, use @see Powerform_Addon_Zapier_Exception
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param string $message
	 * @param string $input_id
	 */
	public function __construct( $message = '', $input_id = '' ) {
		parent::__construct( $message, 0 );
		if ( ! empty( $input_id ) ) {
			$this->add_input_exception( $message, $input_id );
		}
	}

	/**
	 * Set exception message for an input
	 *
	 * @since 1.0 Zapier Addon
	 *
	 * @param $message
	 * @param $input_id
	 */
	public function add_input_exception( $message, $input_id ) {
		$this->input_exceptions[ $input_id ] = $message;
	}

	/**
	 * Get all input exceptions
	 *
	 * @since 1.0 Zapier Addon
	 * @return array
	 */
	public function get_input_exceptions() {
		return $this->input_exceptions;
	}

	/**
	 * Check if there is input_exceptions_is_available
	 *
	 * @since 1.0 Zapier Addon
	 * @return bool
	 */
	public function input_exceptions_is_available() {
		return count( $this->input_exceptions ) > 0;
	}
}