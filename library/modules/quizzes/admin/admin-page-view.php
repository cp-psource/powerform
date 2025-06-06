<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Quizz_Page
 *
 * @since 1.0
 */
class Powerform_Quizz_Page extends Powerform_Admin_Page {

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
		$this->processRequest();
	}

	/**
	 * Trigger before render
	 */
	public function before_render() {
		wp_enqueue_script( 'powerform-chart', powerform_plugin_url() . 'assets/js/library/Chart.bundle.min.js', array( 'jquery' ), '2.7.2', false );
	}

	/**
	 * Count modules
	 *
	 * @param $status
	 *
	 * @since 1.0
	 * @return int
	 */
	public function countModules( $status = '' ) {
		$pagenum           = isset( $_REQUEST['paged'] ) ? absint( $_REQUEST['paged'] ) : 0; // WPCS: CSRF OK
		$this->page_number = max( 1, $pagenum );

		return Powerform_Quiz_Form_Model::model()->count_all( $status );
	}

	/**
	 * Return models
	 *
	 * @return Powerform_Base_Form_Model[]
	 *
	 * @since 1.0
	 */
	public function get_models() {
		$data = Powerform_Quiz_Form_Model::model()->get_all_paged( $this->page_number );

		return $data;
	}

	/**
	 * Return admin edit url
	 *
	 * @since 1.0
	 *
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
	 * Process request
	 *
	 * @since 1.0
	 */
	public function processRequest() {
		if ( ! isset( $_POST['powerformNonce'] ) ) {
			return;
		}

		$nonce = $_POST['powerformNonce']; // WPCS: CSRF OK
		if ( ! wp_verify_nonce( $nonce, 'powerformQuizFormRequest' ) ) {
			return;
		}

		$is_redirect = true;
		$action      = sanitize_text_field( $_POST['powerform_action'] );
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

			case 'export':
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				$this->export_module( $id );
				$is_redirect = false;
				break;

			case 'delete-entries' :
				$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				if ( ! empty( $id ) ) {
					$this->delete_module_entries( $id );
				}
				break;

			case 'clone-quizzes' :
				$ids = isset( $_POST['ids'] ) ? powerform_sanitize_field( $_POST['ids'] ) : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->clone_module( $id );
						}
					}
				}
				break;

			case 'delete-quizzes' :
				$ids = isset( $_POST['ids'] ) ? powerform_sanitize_field( $_POST['ids'] ) : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->delete_module( $id );
						}
					}
				}
				break;

			case 'delete-entries-quizzes' :
				$ids = isset( $_POST['ids'] ) ? powerform_sanitize_field( $_POST['ids'] ) : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->delete_module_entries( $id );
						}
					}
				}
				break;

			case 'reset-views-quizzes' :
				$ids = isset( $_POST['ids'] ) ? powerform_sanitize_field( $_POST['ids'] ) : '';
				if ( ! empty( $ids ) ) {
					$form_ids = explode( ',', $ids );
					if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
						foreach ( $form_ids as $id ) {
							$this->reset_module_views( $id );
						}
					}
				}
				break;

			case 'update-status' :
				$id     = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
				$status = isset( $_POST['status'] ) ? sanitize_text_field( $_POST['status'] ) : '';

				if ( ! empty( $id ) && ! empty( $status ) ) {
					// only publish and draft status avail
					if ( in_array( $status, array( 'publish', 'draft' ), true ) ) {
						$model = Powerform_Quiz_Form_Model::model()->load( $id );
						if ( $model instanceof Powerform_Quiz_Form_Model ) {
							$model->status = $status;
							$model->save();
						}
					}
				}
				break;
			case 'update-statuses' :
				$ids    = isset( $_POST['ids'] ) ? powerform_sanitize_field( $_POST['ids'] ) : '';
				$status = isset( $_POST['status'] ) ? sanitize_text_field( $_POST['status'] ) : '';

				if ( ! empty( $ids ) && ! empty( $status ) ) {
					// only publish and draft status avail
					if ( in_array( $status, array( 'publish', 'draft' ), true ) ) {
						$form_ids = explode( ',', $ids );
						if ( is_array( $form_ids ) && count( $form_ids ) > 0 ) {
							foreach ( $form_ids as $id ) {
								$model = Powerform_Quiz_Form_Model::model()->load( $id );
								if ( $model instanceof Powerform_Quiz_Form_Model ) {
									$model->status = $status;
									$model->save();
								}
							}
						}
					}
				}
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

	/**
	 * Get modules
	 *
	 * @since 1.0
	 * @return array
	 */
	public function getModules() {
		$modules   = array();
		$data      = $this->get_models();
		$form_view = Powerform_Form_Views_Model::get_instance();

		if ( ! isset( $data['models'] ) || empty( $data['models'] ) ) {
			return $modules;
		}

		foreach ( $data['models'] as $model ) {
			$modules[] = array(
				"id"              => $model->id,
				"title"           => $model->name,
				"entries"         => Powerform_Form_Entry_Model::count_entries( $model->id ),
				"has_leads"       => $this->has_leads( $model ),
				"leads_id"        => $this->get_leads_id( $model ),
				"leads"           => Powerform_Form_Entry_Model::count_leads( $model->id ),
				"last_entry_time" => powerform_get_latest_entry_time_by_form_id( $model->id ),
				"views"           => $form_view->count_views( $model->id ),
				'type'            => $model->quiz_type,
				"date"            => date( get_option( 'date_format' ), strtotime( $model->raw->post_date ) ),
				'status'          => $model->status,
				'name'            => powerform_get_name_from_model( $model ),
			);
		}

		return $modules;
	}

	/**
	 * Check if quiz has leads
	 *
	 * @param $model
	 *
	 * @return bool
	 */
	public function has_leads( $model ) {
		if ( isset( $model->settings['hasLeads'] ) && "true" === $model->settings['hasLeads'] ) {
			return true;
		}

		return false;
	}

	/**
	 * Check has lead
	 *
	 * @param $model
	 *
	 * @return int
	 */
	public function get_leads_id( $model ) {
		$leadsId = 0;
		if ( $this->has_leads( $model ) && isset( $model->settings['leadsId'] ) ) {
			$leadsId = $model->settings['leadsId'];
		}

		return $leadsId;
	}

	/**
	 * Return rate
	 *
	 * @since 1.0
	 *
	 * @param $module
	 *
	 * @return float|int
	 */
	public function getRate( $module ) {
		if ( $module['views'] > 0 ) {
			$rate = round( ( $module["entries"] * 100 ) / $module["views"], 1 );
		} else {
			$rate = 0;
		}

		return $rate;
	}

	/**
	 * Return leads rate
	 *
	 * @since 1.14
	 *
	 * @param $module
	 *
	 * @return float|int
	 */
	public function getLeadsRate( $module ) {
		if ( $module['views'] > 0 ) {
			$rate = round( ( $module["leads"] * 100 ) / $module["views"], 1 );
		} else {
			$rate = 0;
		}

		return $rate;
	}

	/**
	 * Bulk actions
	 *
	 * @since 1.0
	 * @return array
	 */
	public function bulk_actions() {
		return apply_filters(
			'powerform_quizzes_bulk_actions',
			array(
				//'clone-quizzes'          => __( "Duplicate", Powerform::DOMAIN ),
				'reset-views-quizzes'    => __( "Tracking-Reset", Powerform::DOMAIN ),
				'delete-entries-quizzes' => __( "Einsendungen löschen", Powerform::DOMAIN ),
				'delete-quizzes'         => __( "Löschen", Powerform::DOMAIN ),
			) );
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
		$model = Powerform_Quiz_Form_Model::model()->load( $id );

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
			 * Action called after quiz cloned
			 *
			 * @since 1.11
			 *
			 * @param int    $id - quiz id
			 * @param object $model - quiz model
			 *
			 */
			do_action( 'powerform_quiz_action_clone', $new_id, $model );
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

		$model = Powerform_Quiz_Form_Model::model()->load( $id );
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
		$model = Powerform_Quiz_Form_Model::model()->load( $id );
		if ( is_object( $model ) ) {
			// Delete leads form on quiz delete
			if ( isset( $model->settings['hasLeads'] ) && isset( $model->settings['leadsId'] ) && $model->settings['hasLeads'] ) {
				$leads_id = $model->settings['leadsId'];
				$leads_model = Powerform_Custom_Form_Model::model()->load( $leads_id );

				if ( is_object( $leads_model ) ) {
					wp_delete_post( $leads_id );
				}
			}

			Powerform_Form_Entry_Model::delete_by_form( $id );
			$form_view = Powerform_Form_Views_Model::get_instance();
			$form_view->delete_by_form( $id );
			wp_delete_post( $id );

			/**
			 * Action called after quiz deleted
			 *
			 * @since 1.11
			 *
			 * @param int    $id - quiz id
			 *
			 */
			do_action( 'powerform_quiz_action_delete', $id );
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
		$model = Powerform_Quiz_Form_Model::model()->load( $id );
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
		$model      = Powerform_Quiz_Form_Model::model()->load( $id );
		if ( $model instanceof Powerform_Quiz_Form_Model ) {
			$model_name = $model->name;
			$exportable = $model->to_exportable_data();
		}
		$encoded = wp_json_encode( $exportable );
		$fp      = fopen( 'php://memory', 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fopen
		fwrite( $fp, $encoded ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fwrite
		fseek( $fp, 0 );

		$filename = sanitize_title( __( 'powerform', POWERFORM::DOMAIN ) ) . '-' . sanitize_title( $model_name ) . '-quiz-export' . '.txt';

		header( 'Content-Description: File Transfer' );
		header( 'Content-Type: text/plain' );
		header( 'Content-Disposition: attachment; filename="' . basename( $filename ) . '"' );
		header( 'Cache-Control: must-revalidate' );
		header( 'Content-Length: ' . strlen( $encoded ) );

		// make php send the generated csv lines to the browser
		fpassthru( $fp );
	}

	/**
	 * Override scripts to be loaded
	 *
	 * @since 1.11
	 *
	 * @param $hook
	 */
	public function enqueue_scripts( $hook ) {
		parent::enqueue_scripts( $hook );

		powerform_print_front_styles( POWERFORM_VERSION );
		powerform_print_front_scripts( POWERFORM_VERSION );
	}
}
