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
		add_action( 'admin_notices', array( $this, 'show_cf7_importer_notice' ) );

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

		if ( powerform_is_import_plugin_enabled( 'cf7' ) ) {
			//CF7 Import
			include_once powerform_plugin_dir() . 'admin/classes/thirdparty-importers/class-importer-cf7.php';
		}

		if ( powerform_is_import_plugin_enabled( 'ninjaforms' ) ) {
			//Ninjaforms Import
			include_once powerform_plugin_dir() . 'admin/classes/thirdparty-importers/class-importer-ninja.php';
		}

		if ( powerform_is_import_plugin_enabled( 'gravityforms' ) ) {
			//Gravityforms CF7 Import
			include_once powerform_plugin_dir() . 'admin/classes/thirdparty-importers/class-importer-gravity.php';
		}

	}

	/**
	 * Initialize Dashboard page
	 *
	 * @since 1.0
	 */
	public function add_dashboard_page() {
		$title = __( 'Powerform', Powerform::DOMAIN );
		if ( POWERFORM_PRO ) {
			$title = __( 'Powerform', Powerform::DOMAIN );
		}

		$this->pages['powerform']           = new Powerform_Dashboard_Page( 'powerform', 'dashboard', $title, $title, false, false );
		$this->pages['powerform-dashboard'] = new Powerform_Dashboard_Page( 'powerform', 'dashboard', __( 'Powerform Dashboard', Powerform::DOMAIN ), __( 'Dashboard', Powerform::DOMAIN ), 'powerform' );
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
		foreach ( $addons as $slug => $addon_array ) {
			$addon_class = powerform_get_addon( $slug );

			if ( $addon_class && is_callable( array( $addon_class, 'admin_hook_html_version' ) ) ) {
				call_user_func( array( $addon_class, 'admin_hook_html_version' ) );
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
			__( 'Powerform-Einsendungen', Powerform::DOMAIN ),
			__( 'Einsendungen', Powerform::DOMAIN ),
			'powerform'
		);
	}

	/**
	 * Show CF7 importer notice
	 *
	 * @since 1.11
	 */
	public function show_cf7_importer_notice() {
		$notice_dismissed = get_option( 'powerform_cf7_notice_dismissed', false );

		if ( $notice_dismissed ) {
			return;
		}

		if ( ! powerform_is_import_plugin_enabled( 'cf7' ) ) {
			return;
		}

		?>
        <div class="powerform-notice-cf7 powerform-notice notice notice-info"
             data-prop="powerform_cf7_notice_dismissed"
             data-nonce="<?php echo esc_attr( wp_create_nonce( 'powerform_dismiss_notification' ) ); ?>">
            <p style="color: #1A2432; font-size: 14px; font-weight: bold;"><?php echo esc_html__( 'Powerform - Importiere Deine Contact Form 7-Formulare automatisch', Powerform::DOMAIN ); ?></p>

            <p style="color: #72777C; line-height: 22px;"><?php echo esc_html__( 'Wir haben festgestellt, dass das Contact Form 7 auf Deiner Webseite aktiv ist. Mit unserem integrierten Contact Form 7-Importer kannst Du Deine vorhandenen Formulare und die entsprechenden Plugin-Einstellungen von Contact Form 7 in Powerform importieren. Der Importeur unterstützt auch die am häufigsten verwendeten Add-Ons.', Powerform::DOMAIN ); ?></p>

            <p>
                <a href="<?php echo esc_url( menu_page_url( 'powerform-settings', false ) . '&section=import' ); ?>"
                   class="button button-primary"><?php esc_html_e( 'Importiere Contact Form 7 Formulare', Powerform::DOMAIN ); ?></a>
                <a href="#" class="dismiss-notice"
                   style="margin-left: 10px; text-decoration: none; color: #555; font-weight: 500;"><?php esc_html_e( 'Verwerfen', Powerform::DOMAIN ); ?></a>
            </p>

        </div>

        <script type="text/javascript">
            jQuery('.powerform-notice-cf7 .button-primary').on('click', function (e) {
                e.preventDefault();

                var $self = jQuery(this);
                var $notice = jQuery(e.currentTarget).closest('.powerform-notice');
                var ajaxUrl = '<?php echo powerform_ajax_url(); ?>';

                jQuery.post(
                    ajaxUrl,
                    {
                        action: 'powerform_dismiss_notification',
                        prop: $notice.data('prop'),
                        _ajax_nonce: $notice.data('nonce')
                    }
                ).always(function () {
                    location.href = $self.attr('href');
                });
            });

            jQuery('.powerform-notice-cf7 .dismiss-notice').on('click', function (e) {
                e.preventDefault();

                var $notice = jQuery(e.currentTarget).closest('.powerform-notice');
                var ajaxUrl = '<?php echo powerform_ajax_url(); ?>';

                jQuery.post(
                    ajaxUrl,
                    {
                        action: 'powerform_dismiss_notification',
                        prop: $notice.data('prop'),
                        _ajax_nonce: $notice.data('nonce')
                    }
                ).always(function () {
                    $notice.hide();
                });
            });
        </script>
		<?php
	}
	
}
