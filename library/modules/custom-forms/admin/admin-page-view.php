<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_CForm_Page
 *
 * @since 1.0
 */
class Powerform_CForm_Page extends Powerform_Admin_Page {

	/**
	 * Page number
	 *
	 * @var int
	 */
	protected $page_number = 1;

	/**
	 * Initialize
	 *
	 * @since 1.0
	 */
	public function init() {
		$pagenum           = isset( $_REQUEST['paged'] ) ? absint( $_REQUEST['paged'] ) : 0; // WPCS: CSRF OK
		$this->page_number = max( 1, $pagenum );
		$this->processRequest();
	}

	/**
	 * Trigger before render
	 */
	public function before_render() {
		wp_enqueue_script( 'powerform-chart', powerform_plugin_url() . 'assets/js/library/Chart.bundle.min.js', array( 'jquery' ), '2.7.2', false );
	}

	/**
	 * Process request
	 *
	 * @since 1.0
	 */
	public function processRequest() {
		if ( ! isset( $_POST['powerformNonce'] ) ) {
			return;
		}

		$nonce = $_POST['powerformNonce']; // WPCS: CSRF OK
		if ( ! wp_verify_nonce( $nonce, 'powerformCustomFormRequest' ) ) {
			return;
		}

		$is_redirect = true;
		$action      = $_POST['powerform_action'];
		switch ( $action ) {
			case 'delete':
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				if ( ! empty( $id ) ) {
					$this->delete_module( $id );
				}
				break;

			case 'clone':
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				if ( ! empty( $id ) ) {
					$this->clone_module( $id );
				}
				break;

			case 'reset-views' :
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				if ( ! empty( $id ) ) {
					$this->reset_module_views( $id );
				}
				break;

			case 'delete-entries' :
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				if ( ! empty( $id ) ) {
					$this->delete_module_entries( $id );
				}
				break;

			case 'export':
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				if ( ! empty( $id ) ) {
					$this->export_module( $id );
				}
				$is_redirect = false;
				break;

			case 'update-status' :
				$id     = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				$status = isset( $_POST['status'] ) ? sanitize_text_field( $_POST['status'] ) : '';

				if ( ! empty( $id ) && ! empty( $status ) ) {
					$this->update_module_status( $id, $status );
				}
				break;

			case 'delete-forms' :
				$ids = isset( $_POST['ids'] ) ? $_POST['ids'] : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->delete_module( $id );
						}
					}
				}
				break;

			case 'clone-forms' :
				$ids = isset( $_POST['ids'] ) ? $_POST['ids'] : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $form_id ) {
							$this->clone_module( $form_id );
						}
					}
				}
				break;

			case 'publish-forms' :
				$ids = isset( $_POST['ids'] ) ? $_POST['ids'] : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $form_id ) {
							$this->update_module_status( $form_id, 'publish' );
						}
					}
				}
				break;

			case 'draft-forms' :
				$ids = isset( $_POST['ids'] ) ? $_POST['ids'] : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $form_id ) {
							$this->update_module_status( $form_id, 'draft' );
						}
					}
				}
				break;

			case 'delete-entries-forms' :
				$ids = isset( $_POST['ids'] ) ? $_POST['ids'] : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->delete_module_entries( $id );
						}
					}
				}
				break;

			case 'reset-views-forms' :
				$ids = isset( $_POST['ids'] ) ? $_POST['ids'] : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->reset_module_views( $id );
						}
					}
				}
				break;
			default:
				break;
		}

		if ( $is_redirect ) {
			$to_referer = true;

			if ( isset( $_POST['powerformRedirect' ] ) && "false" === $_POST['powerformRedirect' ] ) {
				$to_referer = false;
			}

			//todo add messaging as flash
			$fallback_redirect = admin_url( 'admin.php' );
			$fallback_redirect = add_query_arg(
				array(
					'page' => $this->get_admin_page(),
				),
				$fallback_redirect
			);

			$this->maybe_redirect_to_referer( $fallback_redirect, $to_referer );
		}

		exit;
	}

	/**
	 * Bulk actions
	 *
	 * @since 1.0
	 * @return array
	 */
	public function bulk_actions() {
		return apply_filters(
			'powerform_cform_bulk_actions',
			array(
				'publish-forms'        => __( "Veröffentlichen", Powerform::DOMAIN ),
				'draft-forms'          => __( "Unveröffentlicht", Powerform::DOMAIN ),
				'clone-forms'          => __( "Duplikat", Powerform::DOMAIN ),
				'reset-views-forms'    => __( "Tracking-Reset", Powerform::DOMAIN ),
				'delete-entries-forms' => __( "Einsendungen löschen", Powerform::DOMAIN ),
				'delete-forms'         => __( "Löschen", Powerform::DOMAIN ),
			) );
	}

	/**
	 * Count modules
	 *
	 * @since 1.0
	 * @return int
	 */
	public function countModules( $status = '' ) {
		return Powerform_Custom_Form_Model::model()->count_all( $status );
	}


	/**
	 * Return modules
	 *
	 * @since 1.0
	 * @return array
	 */
	public function getModules() {
		$modules = array();
		$limit   = null;
		if ( defined( 'POWERFORM_FORMS_LIST_LIMIT' ) && POWERFORM_FORMS_LIST_LIMIT ) {
			$limit = POWERFORM_FORMS_LIST_LIMIT;
		}
		$data      = $this->get_models( $limit );
		$form_view = Powerform_Form_Views_Model::get_instance();

		// Fallback
		if ( ! isset( $data['models'] ) || empty( $data['models'] ) ) {
			return $modules;
		}

		foreach ( $data['models'] as $model ) {
			$modules[] = array(
				"id"              => $model->id,
				"title"           => $model->name,
				"entries"         => Powerform_Form_Entry_Model::count_entries( $model->id ),
				"last_entry_time" => powerform_get_latest_entry_time_by_form_id( $model->id ),
				"views"           => $form_view->count_views( $model->id ),
				"date"            => date( get_option( 'date_format' ), strtotime( $model->raw->post_date ) ),
				'status'          => $model->status,
			);
		}

		return $modules;
	}

	/**
	 * Calculate rate
	 *
	 * @since 1.0
	 *
	 * @param $module
	 *
	 * @return float|int
	 */
	public function getRate( $module ) {
		if ( 0 === $module["views"] ) {
			$rate = 0;
		} else {
			$rate = round( ( $module["entries"] * 100 ) / $module["views"], 1 );
		}

		return $rate;
	}

	/**
	 * Return models
	 *
	 * @since 1.0
	 * @since 1.6 add $limit
	 *
	 * @param int $limit
	 *
	 * @return array
	 */
	public function get_models( $limit = null ) {
		$data = Powerform_Custom_Form_Model::model()->get_all_paged( $this->page_number, $limit );

		return $data;
	}

	/**
	 * Pagination
	 *
	 * @since 1.0
	 */
	public function pagination() {
		$count = $this->countModules();
		powerform_list_pagination( $count );
	}

	/**
	 * Clone Module
	 *
	 * @since 1.6
	 *
	 * @param $id
	 */
	public function clone_module( $id ) {
		//check if this id is valid and the record is exists
		$model = Powerform_Custom_Form_Model::model()->load( $id );
		if ( is_object( $model ) ) {
			//create one
			//reset id
			$model->id = null;

			//update title
			if ( isset( $model->settings['formName'] ) ) {
				$model->settings['formName'] = sprintf( __( "Kopie von %s", Powerform::DOMAIN ), $model->settings['formName'] );
			}

			//save it to create new record
			$new_id = $model->save( true );

			/**
			* Action called after form cloned
			*
			* @since 1.11
			*
			* @param int    $id - form id
			* @param object $model - form model
			*
			*/
			do_action( 'powerform_form_action_clone', $new_id, $model );

			powerform_clone_form_submissions_retention( $id, $new_id );

			// Purge count forms cache
			wp_cache_delete( 'powerform_form_total_entries', 'powerform_form_total' );
			wp_cache_delete( 'powerform_form_total_entries_publish', 'powerform_form_total_entries_publish' );
			wp_cache_delete( 'powerform_form_total_entries_draft', 'powerform_form_total_entries_draft' );
		}
	}

	/**
	 * Reset views data
	 *
	 * @since 1.6
	 *
	 * @param $id
	 */
	public function reset_module_views( $id ) {
		$form_view = Powerform_Form_Views_Model::get_instance();
		$model     = Powerform_Custom_Form_Model::model()->load( $id );
		if ( is_object( $model ) ) {
			$form_view->delete_by_form( $id );
		}
	}

	/**
	 * Delete module
	 *
	 * @since 1.6
	 *
	 * @param $id
	 */
	public function delete_module( $id ) {
		//check if this id is valid and the record is exists
		$model = Powerform_Custom_Form_Model::model()->load( $id );
		if ( is_object( $model ) ) {
			Powerform_Form_Entry_Model::delete_by_form( $id );
			$form_view = Powerform_Form_Views_Model::get_instance();
			$form_view->delete_by_form( $id );
			powerform_update_form_submissions_retention( $id, null, null );
			wp_delete_post( $id );

			// Purge count forms cache
			wp_cache_delete( 'powerform_form_total_entries', 'powerform_form_total_entries' );
			wp_cache_delete( 'powerform_form_total_entries_publish', 'powerform_form_total_entries_publish' );
			wp_cache_delete( 'powerform_form_total_entries_draft', 'powerform_form_total_entries_draft' );

			/**
			 * Action called after quiz deleted
			 *
			 * @since 1.11
			 *
			 * @param int    $id - quiz id
			 *
			 */
			do_action( 'powerform_form_action_delete', $id );
		}
	}

	/**
	 * Delete module entries
	 *
	 * @since 1.6
	 *
	 * @param $id
	 */
	public function delete_module_entries( $id ) {
		//check if this id is valid and the record is exists
		$model = Powerform_Custom_Form_Model::model()->load( $id );
		if ( is_object( $model ) ) {
			Powerform_Form_Entry_Model::delete_by_form( $id );
		}
	}

	/**
	 * Export module
	 *
	 * @since 1.6
	 *
	 * @param $id
	 */
	public function export_module( $id ) {

		$exportable = array();
		$model_name = '';
		$model      = Powerform_Custom_Form_Model::model()->load( $id );
		if ( $model instanceof Powerform_Custom_Form_Model ) {
			$model_name = $model->name;
			$exportable = $model->to_exportable_data();
		}
		$encoded = wp_json_encode( $exportable );
		$fp      = fopen( 'php://memory', 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fopen
		fwrite( $fp, $encoded ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fwrite
		fseek( $fp, 0 );

		$filename = sanitize_title( __( 'powerform', POWERFORM::DOMAIN ) ) . '-' . sanitize_title( $model_name ) . '-form-export' . '.txt';

		header( 'Content-Description: File Transfer' );
		header( 'Content-Type: text/plain' );
		header( 'Content-Disposition: attachment; filename="' . basename( $filename ) . '"' );
		header( 'Cache-Control: must-revalidate' );
		header( 'Content-Length: ' . strlen( $encoded ) );

		// make php send the generated csv lines to the browser
		fpassthru( $fp );
	}

	/**
	 * Update Module Status
	 *
	 * @since 1.6
	 *
	 * @param $id
	 * @param $status
	 */
	public function update_module_status( $id, $status ) {
		// only publish and draft status avail
		if ( in_array( $status, array( 'publish', 'draft' ), true ) ) {
			$model = Powerform_Custom_Form_Model::model()->load( $id );
			if ( $model instanceof Powerform_Custom_Form_Model ) {
				$model->status = $status;
				$model->save();
			}
		}
	}

	/**
	 * Override scripts to be loaded
	 *
	 * @since 1.6.1
	 *
	 * @param $hook
	 */
	public function enqueue_scripts( $hook ) {
		parent::enqueue_scripts( $hook );

		// for preview
		$style_src     = powerform_plugin_url() . 'assets/css/intlTelInput.min.css';
		$style_version = "4.0.3";

		$script_src     = powerform_plugin_url() . 'assets/js/library/intlTelInput.min.js';
		$script_version = POWERFORM_VERSION;
		wp_enqueue_style( 'intlTelInput-powerform-css', $style_src, array(), $style_version ); // intlTelInput
		wp_enqueue_script( 'powerform-intlTelInput', $script_src, array( 'jquery' ), $script_version, false ); // intlTelInput

		powerform_print_forms_admin_styles( POWERFORM_VERSION );
		powerform_print_front_scripts( POWERFORM_VERSION );
	}
}
