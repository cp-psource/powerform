<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Core
 *
 * @since 1.0
 */
class Powerform_Core {

	/**
	 * @var Powerform_Admin
	 */
	public $admin;

	/**
	 * Store modules objects
	 *
	 * @var array
	 */
	public $modules = array();

	/**
	 * Store forms objects
	 *
	 * @var array
	 */
	public $forms = array();

	/**
	 * Store fields objects
	 *
	 * @var array
	 */
	public $fields = array();

	/**
	 * Store PRO fields
	 *
	 * @var array
	 */
	public $pro_fields = array();

	/**
	 * Plugin instance
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Return the plugin instance
	 *
	 * @since 1.0
	 * @return Powerform
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Powerform_Core constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		// Include all necessary files
		$this->includes();

		//First check if upgrade of data is needed
		Powerform_Upgrade::init();

		if ( is_admin() ) {
			// Initialize admin core
			$this->admin = new Powerform_Admin();

			new Powerform_Shortcode_Generator();

			add_action( 'wp_head', array( $this, 'localize_pointers' ) );
		}

		// Get enabled modules
		$modules       = new Powerform_Modules();
		$this->modules = $modules->get_modules();

		// Get enabled fields
		$fields       = new Powerform_Fields();
		$this->fields = $fields->get_fields();

		/**
		 * Filter Pro fields for promotion PRO version
		 *
		 * @since 1.13
		 * @param array $pro_fields Array of PRO fields e.g. [ 'field_type' => 'test', 'name' => 'test, 'icon' => 'sui-icon-pencil' ]
		 */
		$this->pro_fields = apply_filters( 'powerform_pro_fields', [] );

		// HACK: Add settings and entries page at the end of the list
		if ( is_admin() ) {
			$this->admin->add_entries_page();
			if ( Powerform::is_addons_feature_enabled() ) {
				$this->admin->add_integrations_page();
			}
			$this->admin->add_settings_page();

			/*if ( ! POWERFORM_PRO ) {
				$this->admin->add_upgrade_page();
			}*/
		}

		//Protection management
		Powerform_Protection::get_instance();

		//Export management
		Powerform_Export::get_instance();

		//Post meta box
		add_action( 'init', array( &$this, 'post_field_meta_box' ) );
	}

	/**
	 * Includes
	 *
	 * @since 1.0
	 */
	private function includes() {
		// Abstracts
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-field.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-form-result.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-form-template.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-front-action.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-mail.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-payment-gateway.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-spam-protection.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/abstracts/abstract-class-user.php';

		// Classes
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-loader.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-modules.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-form-fields.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-database-tables.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-upgrade.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-geo.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-protection.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-shortcode-generator.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-export-result.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-export.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/render/class-render-form.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/render/class-assets-enqueue.php';
		/* @noinspection PhpIncludeInspection */

		if ( version_compare( PHP_VERSION, '5.3.0', 'ge' ) && file_exists( powerform_plugin_dir() . 'library/gateways/class-paypal-express.php' ) ) {
			include_once powerform_plugin_dir() . 'library/gateways/class-paypal-express.php';
		}

		if ( version_compare( PHP_VERSION, '5.6.0', 'ge' ) && file_exists( powerform_plugin_dir() . 'library/gateways/class-stripe.php' ) ) {
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'library/gateways/class-stripe.php';
		}

		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/render/class-widget.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-recaptcha.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/class-migration.php';

		//Models
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-form-entry-model.php';

		// Helpers
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-core.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-importer.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-modules.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-forms.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-fields.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-google-fonts.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-mail.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-currency.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-autofill.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/helpers/helper-calculator.php';

		if ( version_compare( PHP_VERSION, '5.6.0', 'ge' ) ) {
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'library/helpers/helper-payment.php';
		}

		//Model
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-base-form-model.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-custom-form-model.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-form-field-model.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-poll-form-model.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-quiz-form-model.php';
		/* @noinspection PhpIncludeInspection */
		include_once powerform_plugin_dir() . 'library/model/class-form-views-model.php';
		if ( is_admin() ) {
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'admin/abstracts/class-admin-page.php';
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'admin/abstracts/class-admin-module.php';
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'admin/abstracts/class-admin-import-mediator.php';
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'admin/classes/class-admin.php';
			/* @noinspection PhpIncludeInspection */
			if ( ! class_exists( 'WP_List_Table' ) ) {
				/* @noinspection PhpIncludeInspection */
				require_once ABSPATH . 'wp-admin/includes/class-wp-screen.php';//added
				/* @noinspection PhpIncludeInspection */
				require_once ABSPATH . 'wp-admin/includes/screen.php';//added
				/* @noinspection PhpIncludeInspection */
				require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
				/* @noinspection PhpIncludeInspection */
				require_once ABSPATH . 'wp-admin/includes/template.php';
			}
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'library/model/class-form-entries-list-table.php';
		}

		if ( Powerform::is_internal_page_cache_support_enabled() ) {
			/* @noinspection PhpIncludeInspection */
			include_once powerform_plugin_dir() . 'library/class-page-cache.php';
		}
	}

	/**
	 * Start creating meta box for the posts
	 *
	 * @since 1.0
	 */
	public function post_field_meta_box() {
		add_action( 'add_meta_boxes', array( $this, 'setup_post_meta_box' ) );
	}

	/**
	 * Setup the meta box
	 *
	 * @since 1.0
	 */
	public function setup_post_meta_box() {
		global $post;
		if ( is_object( $post ) ) {
			$is_powerform_meta = get_post_meta( $post->ID, '_has_powerform_meta' );
			if ( $is_powerform_meta ) {
				add_meta_box(
					'powerform-post-meta-box',
					__( 'Benutzerdefinierte Daten veröffentlichen', Powerform::DOMAIN ),
					array( $this, 'render_post_meta_box' ),
					$post->post_type,
					'normal',
					'default'
				);
			}
		}
	}

	public function localize_pointers() {
		?>
        <script type="text/javascript">
            var ajaxurl = '<?php echo admin_url( 'admin-ajax.php' );  // WPCS: XSS ok. ?>';
        </script>
		<?php
	}

	/**
	 * Render Meta box
	 *
	 * @since 1.0
	 */
	public function render_post_meta_box( $post ) {
		$meta_values = get_post_custom( $post->ID );
		?>
        <table class="widefat">
            <tbody>
			<?php
			foreach ( $meta_values as $key => $value ) {
				if ( '_' === $key[0] ) {
					continue;
				}
				$value = $value[0];
				?>
                <tr>
                    <th><?php echo esc_html( $key ); ?></th>
                    <td><?php echo esc_html( $value ); ?></td>
                </tr>
				<?php
			}
			?>
            </tbody>
        </table>
		<?php
	}
}
