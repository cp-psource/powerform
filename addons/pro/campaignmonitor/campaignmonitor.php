<?php

/**
 * Addon Name: Campaignmonitor
 * Version: 1.0
 * Plugin URI:  https://premium.wpmudev.org/
 * Description: Integrate Powerform Custom Forms with Campaignmonitor to get notified in real time.
 * Author: WMS N@W
 * Author URI: http://premium.wpmudev.org
 */

define( 'POWERFORM_ADDON_CAMPAIGNMONITOR_VERSION', '1.0' );

function powerform_addon_campaignmonitor_url() {
	return trailingslashit( powerform_plugin_url() . 'addons/pro/campaignmonitor' );
}

function powerform_addon_campaignmonitor_dir() {
	return trailingslashit( dirname( __FILE__ ) );
}

function powerform_addon_campaignmonitor_assets_url() {
	return trailingslashit( powerform_addon_campaignmonitor_url() . 'assets' );
}

require_once dirname( __FILE__ ) . '/powerform-addon-campaignmonitor.php';
require_once dirname( __FILE__ ) . '/powerform-addon-campaignmonitor-form-settings.php';
require_once dirname( __FILE__ ) . '/powerform-addon-campaignmonitor-form-hooks.php';
//Direct Load
Powerform_Addon_Loader::get_instance()->register( 'Powerform_Addon_Campaignmonitor' );