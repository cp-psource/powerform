<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Fields
 *
 * @since 1.0
 */
class Powerform_Fields {
	/**
	 * Store fields objects
	 *
	 * @var array
	 */
	public $fields = array();

	/**
	 * Powerform_Fields constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {

		$this->load_powerform_autofill_providers();
		$this->maybe_load_external_autofill_providers();

		$loader = new Powerform_Loader();

		$fields = $loader->load_files( 'library/fields' );

		/**
		 * Filters the form fields
		 */
		$this->fields = apply_filters( 'powerform_fields', $fields );
	}

	/**
	 * Retrieve fields objects
	 *
	 * @since 1.0
	 * @return array
	 */
	public function get_fields() {
		return $this->fields;
	}

	/**
	 * Load autofill providers requirements
	 *
	 * @since 1.0.5
	 */
	public function load_powerform_autofill_providers() {
		include_once powerform_plugin_dir() . 'library/class-autofill-loader.php';
		$required_files = array(
			// load contracts
			powerform_plugin_dir() . 'library/field-autofill-providers/contracts/class-autofill-provider-interface.php',
			powerform_plugin_dir() . 'library/field-autofill-providers/contracts/class-autofill-provider-abstract.php',
			//load Powerform provider autoload
			powerform_plugin_dir() . 'library/field-autofill-providers/autoload.php',
		);

		$required_files_exists = true;
		foreach ( $required_files as $required_file ) {
			if ( ! file_exists( $required_file ) ) {
				$required_files_exists = false;
				break;
			}
		}

		if ( $required_files_exists ) {
			foreach ( $required_files as $required_file ) {
				/** @noinspection PhpIncludeInspection */
				include_once $required_file;
			}
		}

	}

	/**
	 * Load member's autofill provider
	 *
	 * @since 1.0.5
	 */
	public function maybe_load_external_autofill_providers() {
		/**
		 * see samples/powerform-simple-autofill-plugin for example how to use it
		 */
		do_action( 'powerform_register_autofill_provider' );
	}
}