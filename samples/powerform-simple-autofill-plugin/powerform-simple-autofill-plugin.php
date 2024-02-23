<?php
/**
 * Plugin Name: Powerform Autofill Simple
 * Version: 1
 * Description: Simple Addon Autofill Provider.
 * Author: WPMU DEV
 * Author URI: http://premium.wpmudev.org
 * Text Domain: powerform
 * Domain Path: /languages/
 */

add_action( 'powerform_register_autofill_provider', 'load_powerform_autofill_simple' );
function load_powerform_autofill_simple() {
	if ( class_exists( 'Powerform_Autofill_Provider_Abstract' ) ) {
		include_once plugin_dir_path( __FILE__ ) . 'powerform-autofill-simple.php';
		if ( class_exists( 'Powerform_Autofill_Loader' ) ) {
			Powerform_Autofill_Loader::get_instance()->register( 'Powerform_Autofill_Simple' );
		}
	}
}