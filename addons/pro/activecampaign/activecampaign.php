<?php

/**
 * Addon Name: Activecampaign
 * Version: 1.0
 * Plugin URI:  https://premium.wpmudev.org/
 * Description: Integrate Powerform Custom Forms with Activecampaign to get notified in real time.
 * Author: WMS N@W
 * Author URI: http://premium.wpmudev.org
 */

define( 'POWERFORM_ADDON_ACTIVECAMPAIGN_VERSION', '1.0' );

function powerform_addon_activecampaign_url() {
	return trailingslashit( powerform_plugin_url() . 'addons/pro/activecampaign' );
}

function powerform_addon_activecampaign_dir() {
	return trailingslashit( dirname( __FILE__ ) );
}

function powerform_addon_activecampaign_assets_url() {
	return trailingslashit( powerform_addon_activecampaign_url() . 'assets' );
}

require_once dirname( __FILE__ ) . '/powerform-addon-activecampaign.php';
require_once dirname( __FILE__ ) . '/powerform-addon-activecampaign-form-settings.php';
require_once dirname( __FILE__ ) . '/powerform-addon-activecampaign-form-hooks.php';
//Direct Load
Powerform_Addon_Loader::get_instance()->register( 'Powerform_Addon_Activecampaign' );