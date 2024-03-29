<?php

final class Powerform_Addon_Simple extends Powerform_Addon_Abstract {

	private static $_instance = null;
	/**
	 * Use this trait to mark this addon as PRO
	 */
	protected $_slug                   = 'simple';
	protected $_version                = POWERFORM_ADDON_SIMPLE_VERSION;
	protected $_min_powerform_version = '1.1';
	protected $_short_title            = 'simple';
	protected $_title                  = 'Simple';
	protected $_url                    = 'https://n3rds.work';
	protected $_full_path              = __FILE__;
	protected $_icon                   = '';
	protected $_icon_x2                = '';
	protected $_image                  = '';
	protected $_image_x2               = '';

	public function __construct() {
		// late init to allow translation
		$this->_description                = __( 'Make your form Simple-able', Powerform::DOMAIN );
		$this->_activation_error_message   = __( 'Sorry but we failed to activate Simple Integration, don\'t hesitate to contact us', Powerform::DOMAIN );
		$this->_deactivation_error_message = __( 'Sorry but we failed to deactivate Simple Integration, please try again', Powerform::DOMAIN );

		$this->_update_settings_error_message = __(
			'Sorry, we failed to update settings, please check your form and try again',
			Powerform::DOMAIN
		);
	}

	/**
	 * @return self|null
	 */
	public static function get_instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Flag for check if and addon connected (global settings suchs as api key complete)
	 *
	 * @return bool
	 */
	public function is_connected() {
		return false;
	}

	/**
	 * Flag for check if and addon connected to a form(form settings suchs as list name completed)
	 *
	 * @param $form_id
	 *
	 * @return bool
	 */
	public function is_form_connected( $form_id ) {
		return false;
	}
}