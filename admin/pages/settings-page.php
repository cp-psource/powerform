<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Settings_Page
 *
 * @since 1.0
 */
class Powerform_Settings_Page extends Powerform_Admin_Page {

	/**
	 * Addons data that will be sent to settings page
	 *
	 * @var array
	 */
	private $addons_data = array();
	public  $addons_list = array();

	public function init() {
		$this->process_request();
	}

	public function enqueue_scripts( $hook ) {
		parent::enqueue_scripts( $hook );
		wp_localize_script( 'powerform-admin', 'powerform_addons_data', $this->addons_data );
	}

	public function before_render() {
		if ( Powerform::is_addons_feature_enabled() ) {
			$this->prepare_addons();
		}
	}

	private function prepare_addons() {
		// cleanup activated addons
		Powerform_Addon_Loader::get_instance()->cleanup_activated_addons();

		Powerform_Addon_Admin_Ajax::get_instance()->generate_nonce();

		$addons_list = powerform_get_registered_addons_list();

		$this->addons_data = array(
			'addons_list' => $addons_list,
			'nonce'       => Powerform_Addon_Admin_Ajax::get_instance()->get_nonce(),
		);

		$this->addons_list = powerform_get_registered_addons_list();
	}

	public function process_request() {
		if ( ! isset( $_POST['powerformNonce'] ) ) {
			return;
		}

		$nonce = $_POST['powerformNonce']; // WPCS: CSRF OK
		if ( ! wp_verify_nonce( $nonce, 'powerformSettingsRequest' ) ) {
			return;
		}

		$is_redirect = true;
		$action      = isset( $_POST['powerform_action'] ) ? $_POST['powerform_action'] : '';
		switch ( $action ) {
			case 'reset_plugin_settings':
				powerform_reset_settings();
				break;
			default:
				break;
		}

		if ( $is_redirect ) {
			//todo add messaging as flash
			$fallback_redirect = admin_url( 'admin.php' );
			$fallback_redirect = add_query_arg(
				array(
					'page' => $this->get_admin_page(),
				),
				$fallback_redirect
			);
			$this->maybe_redirect_to_referer( $fallback_redirect );
		}

		exit;
	}
}