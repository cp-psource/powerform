<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Admin
 *
 * @since 1.0
 */
class Powerform_Admin {

	/**
	 * @var array
	 */
	public $pages = array();

	/**
	 * Powerform_Admin constructor.
	 */
	public function __construct() {
		$this->includes();

		// Init admin pages
		add_action( 'admin_menu', array( $this, 'add_dashboard_page' ) );

		// Init Admin AJAX class
		new Powerform_Admin_AJAX();

		/**
		 * Triggered when Admin is loaded
		 */
		do_action( 'powerform_admin_loaded' );
	}

	/**
	 * Include required files
	 *
	 * @since 1.0
	 */
	private function includes() {
		// Admin pages
		include_once powerform_plugin_dir() . 'admin/pages/dashboard-page.php';
		include_once powerform_plugin_dir() . 'admin/pages/entries-page.php';
		include_once powerform_plugin_dir() . 'admin/pages/integrations-page.php';
		include_once powerform_plugin_dir() . 'admin/pages/settings-page.php';

		// Admin AJAX
		include_once powerform_plugin_dir() . 'admin/classes/class-admin-ajax.php';

		// Admin Data
		include_once powerform_plugin_dir() . 'admin/classes/class-admin-data.php';

		// Admin l10n
		include_once powerform_plugin_dir() . 'admin/classes/class-admin-l10n.php';
	}

	/**
	 * Initialize Dashboard page
	 *
	 * @since 1.0
	 */
	public function add_dashboard_page() {
		$title = __( 'Powerformulare', Powerform::DOMAIN );
		if( POWERFORM_PRO ) {
			$title = __( 'Powerformulare', Powerform::DOMAIN );
		}

		$this->pages['powerform'] = new Powerform_Dashboard_Page( 'powerform', 'dashboard', $title, $title, false, false );
		$this->pages['powerform-dashboard'] = new Powerform_Dashboard_Page( 'powerform', 'dashboard', __( 'Powerformulare Dashboard', Powerform::DOMAIN ), __( 'Dashboard', Powerform::DOMAIN ), 'powerform' );
	}

	/**
	 * Add Integrations page
	 *
	 * @since 1.1
	 */
	public function add_integrations_page() {
		add_action( 'admin_menu', array( $this, 'init_integrations_page' ) );
	}

	/**
	 * Initialize Integrations page
	 *
	 * @since 1.1
	 */
	public function init_integrations_page() {
		$this->pages['powerform-integrations'] = new Powerform_Integrations_Page(
			'powerform-integrations',
			'integrations',
			__( 'Integrationen', Powerform::DOMAIN ),
			__( 'Integrationen', Powerform::DOMAIN ),
			'powerform'
		);

		//TODO: remove this after converted to JS
		$addons = Powerform_Addon_Loader::get_instance()->get_addons()->to_array();
		foreach ($addons as $slug => $addon_array) {
			$addon_class = powerform_get_addon($slug);

			if ($addon_class && is_callable( array( $addon_class, 'admin_hook_html_version' ))) {
				call_user_func( array( $addon_class, 'admin_hook_html_version' ));
			}
		}

	}

	/**
	 * Add Settings page
	 *
	 * @since 1.0
	 */
	public function add_settings_page() {
		add_action( 'admin_menu', array( $this, 'init_settings_page' ) );
	}

	/**
	 * Initialize Settings page
	 *
	 * @since 1.0
	 */
	public function init_settings_page() {
		$this->pages['powerform-settings'] = new Powerform_Settings_Page( 'powerform-settings', 'settings', __( 'Globale Einstellungen', Powerform::DOMAIN ), __( 'Einstellungen', Powerform::DOMAIN ), 'powerform' );
	}

	/**
	 * Add Entries page
	 *
	 * @since 1.0.5
	 */
	public function add_entries_page() {
		add_action( 'admin_menu', array( $this, 'init_entries_page' ) );
	}

	/**
	 * Initialize Entries page
	 *
	 * @since 1.0.5
	 */
	public function init_entries_page() {
		$this->pages['powerform-entries'] = new Powerform_Entries_Page(
			'powerform-entries',
			'entries',
			__( 'Powerformulare-Einsendungen', Powerform::DOMAIN ),
			__( 'Einsendungen', Powerform::DOMAIN ),
			'powerform'
		);
	}
}