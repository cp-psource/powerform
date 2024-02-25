<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Dashboard_Page
 *
 * @since 1.0
 */
class Powerform_Dashboard_Page extends Powerform_Admin_Page {

	/**
	 * Register content boxes
	 *
	 * @since 1.0
	 */
	public function register_content_boxes() {
		$this->add_box(
			'dashboard/create',
			__( 'Module erstellen', Powerform::DOMAIN ),
			'dashboard-create',
			null,
			array( $this, 'dashboard_create_screen' ),
			null
		);
	}

	/**
	 * Print Dashboard box
	 *
	 * @since 1.0
	 */
	public function dashboard_create_screen() {
		$modules = powerform_get_modules();
		$this->template('dashboard/create-content', array(
			'modules' => $modules
		) );
	}

	/**
	 * Return admin edit url
	 *
	 * @since 1.6
	 * @param $type
	 * @param $id
	 *
	 * @return mixed
	 */
	public function getAdminEditUrl( $type, $id ) {
		if ( 'nowrong' === $type ) {
			return admin_url( 'admin.php?page=powerform-nowrong-wizard&id=' . $id );
		} else {
			return admin_url( 'admin.php?page=powerform-knowledge-wizard&id=' . $id );
		}
	}

	/**
	 * Count modules
	 *
	 * @since 1.6
	 * @return int
	 */
	public function countModules( $status = '' ) {
		return Powerform_Custom_Form_Model::model()->count_all( $status );
	}
}