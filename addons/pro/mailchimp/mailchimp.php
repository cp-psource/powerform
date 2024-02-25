<?php
/**
 * Addon Name: Mailchimp
 * Version: 1.0
 * Plugin URI:  https://premium.wpmudev.org/
 * Description: Integrate Powerform Custom Forms with Mailchimp email list easily
 * Author: WMS N@W
 * Author URI: http://premium.wpmudev.org
 */

define( 'POWERFORM_ADDON_MAILCHIMP_VERSION', '1.0' );

function powerform_addon_mailchimp_url() {
	return trailingslashit( powerform_plugin_url() . 'addons/pro/mailchimp' );
}

function powerform_addon_mailchimp_assets_url() {
	return trailingslashit( powerform_addon_mailchimp_url() . 'assets' );
}

require_once dirname( __FILE__ ) . '/powerform-addon-mailchimp.php';
require_once dirname( __FILE__ ) . '/powerform-addon-mailchimp-form-settings.php';
require_once dirname( __FILE__ ) . '/powerform-addon-mailchimp-form-hooks.php';
//Direct Load
Powerform_Addon_Loader::get_instance()->register( 'Powerform_Addon_Mailchimp' );