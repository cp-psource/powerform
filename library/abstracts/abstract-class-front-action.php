<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Front_Action
 *
 * Abstract class for front functions
 *
 * @since 1.0
 */
abstract class Powerform_Front_Action {

	/**
	 * Entry type
	 *
	 * @var string
	 */
	public $entry_type = '';

	public function __construct() {
		//Save entries
		if ( ! empty( $this->entry_type ) ) {
			add_action( 'wp', array( $this, 'maybe_handle_submit' ), 9 );
			add_action( "wp_ajax_powerform_submit_form_" . $this->entry_type, array( $this, "save_entry" ) );
			add_action( "wp_ajax_nopriv_powerform_submit_form_" . $this->entry_type, array( $this, "save_entry" ) );

			add_action( "wp_ajax_powerform_submit_preview_form_" . $this->entry_type, array( $this, "save_entry_preview" ) );
			add_action( "wp_ajax_nopriv_powerform_submit_preview_form_" . $this->entry_type, array( $this, "save_entry_preview" ) );
		}
	}

	/**
	 * Returns last
	 *
	 * @since 1.1
	 */
	public function get_last_entry( $form_id ) {

		$entries = Powerform_Form_Entry_Model::get_entries( $form_id );

		if ( 0 < count( $entries ) ) {
			return $entries[0]->entry_id;
		}

		return false;

	}

	/**
	 * Maybe handle form submit
	 *
	 * @since 1.0
	 */
	public function maybe_handle_submit() {
		if ( $this->is_force_validate_submissions_nonce() ) {
			if (
				isset( $_POST['powerform_nonce'] )
				&& wp_verify_nonce( $_POST['powerform_nonce'], 'powerform_submit_form' )
			) {
				$this->handle_submit();
			}
		} else {
			if ( isset( $_REQUEST['action'] ) && 'powerform_submit_form_' . $this->entry_type === $_REQUEST['action'] ) {
				$this->handle_submit();
			}
		}

	}

	/**
	 * Handle submit
	 *
	 * @since 1.0
	 */
	abstract public function handle_submit();

	/**
	 * Validate ajax
	 *
	 * @since 1.0
	 *
	 * @param string|null $action - the HTTP action
	 * @param string      $request_method
	 * @param string      $nonce_field
	 *
	 * @return bool
	 */
	public function validate_ajax( $action = null, $request_method = 'POST', $nonce_field = '_wpnonce' ) {
		if ( ! $this->is_force_validate_submissions_nonce() ) {
			if ( isset( $_REQUEST['action'] ) && $action === $_REQUEST['action'] ) { // wpcs csrf ok.
				return true;
			}
		}

		if ( isset( $_REQUEST[ $nonce_field ] ) && wp_verify_nonce( $_REQUEST[ $nonce_field ], $action ) ) {
			return true;
		} else {
			// if default nonce verifier fail, check other $request_method and auto detect action
			switch ( $request_method ) {
				case 'GET':
					$request_fields = $_GET;
					break;

				case 'REQUEST':
				case 'any':
					$request_fields = $_REQUEST;
					break;

				case 'POST':
				default:
					$request_fields = $_POST;
					break;
			}

			if ( empty( $action ) ) {
				$action = ! empty( $request_fields['action'] ) ? $request_fields['action'] : '';
			}

			if ( ! empty( $request_fields[ $nonce_field ] )
			     && wp_verify_nonce( $request_fields[ $nonce_field ], $action )
			) {
				return true;
			}
		}

		// make sure its invalidated if all other above failed
		return false;
	}

	/**
	 * Save Entry
	 *
	 * @since 1.0
	 */
	abstract public function save_entry();

	/**
	 * Save Entry for Preview
	 *
	 * @since 1.6
	 */
	abstract public function save_entry_preview();

	/**
	 * Handle file uplload
	 *
	 * @since 1.0
	 * @since 1.1 Bugfix filter `powerform_file_upload_allow` `$file_name` passed arg
	 *
	 * @param string $field_name - the input file name
	 *
	 * @return bool|array
	 */
	public function handle_file_upload( $field_name ) {
		if ( isset( $_FILES[ $field_name ] ) ) {
			if ( isset( $_FILES[ $field_name ]['name'] ) && ! empty( $_FILES[ $field_name ]['name'] ) ) {
				$file_name = $_FILES[ $field_name ]['name'];
				$valid     = wp_check_filetype( $file_name );

				if ( false === $valid["ext"] ) {
					return array(
						'success' => false,
						'message' => __( 'Fehler beim Speichern des Formulars. Eine hochgeladene Dateierweiterung ist nicht zulässig.', Powerform::DOMAIN ),
					);
				}

				$allow = apply_filters( 'powerform_file_upload_allow', true, $field_name, $file_name, $valid );
				if ( false === $allow ) {
					return array(
						'success' => false,
						'message' => __( 'Fehler beim Speichern des Formulars. Eine hochgeladene Dateierweiterung ist nicht zulässig.', Powerform::DOMAIN ),
					);
				}

				require_once ABSPATH . 'wp-admin/includes/file.php';
				WP_Filesystem();
				/** @var WP_Filesystem_Base $wp_filesystem */
				global $wp_filesystem;
				if ( ! is_uploaded_file( $_FILES[ $field_name ]['tmp_name'] ) ) {
					return array(
						'success' => false,
						'message' => __( 'Fehler beim Speichern des Formulars. Hochgeladene Datei konnte nicht gelesen werden.', Powerform::DOMAIN ),
					);
				}

				$upload_dir       = wp_upload_dir(); // Set upload folder
				$unique_file_name = wp_unique_filename( $upload_dir['path'], $file_name );
				$filename         = basename( $unique_file_name ); // Create base file name


				if ( 0 === $_FILES[ $field_name ]['size'] || $_FILES[ $field_name ]['size'] > wp_max_upload_size() ) {

					$max_size = wp_max_upload_size();
					$max_size = round( $max_size / 1000000 ) . ' MB';

					return array(
						'success' => false,
						'message' => sprintf( __( 'Fehler beim Speichern des Formulars. Die Größe der hochgeladenen Datei überschreitet das Upload-Limit von %1$. ', Powerform::DOMAIN ), $max_size ),
					);
				}

				if ( UPLOAD_ERR_OK !== $_FILES[ $field_name ]['error'] ) {
					return array(
						'success' => false,
						'message' => __( 'Fehler beim Speichern des Formulars. Upload-Fehler. ', Powerform::DOMAIN ),
					);
				}

				if ( ! $wp_filesystem->is_dir( $upload_dir['path'] ) ) {
					$wp_filesystem->mkdir( $upload_dir['path'] );
				}

				if ( $wp_filesystem->is_writable( $upload_dir['path'] ) ) {
					$file_path = $upload_dir['path'] . '/' . $filename;
					$file_url  = $upload_dir['url'] . '/' . $filename;
				} else {
					$file_path = $upload_dir['basedir'] . '/' . $filename;
					$file_url  = $upload_dir['baseurl'] . '/' . $filename;
				}

				// use move_uploaded_file instead of $wp_filesystem->put_contents
				// increase performance, and avoid permission issues
				if ( false !== move_uploaded_file( $_FILES[ $field_name ]['tmp_name'], $file_path ) ) {
					return array(
						'success'   => true,
						'file_url'  => $file_url,
						'file_path' => $file_path,
					);
				} else {
					return array(
						'success' => false,
						'message' => __( 'Fehler beim Speichern des Formulars. Upload-Fehler. ', Powerform::DOMAIN ),
					);
				}

			}
		}

		return false;
	}

	/**
	 * Get $_POST data
	 *
	 * @since 1.1
	 *
	 * @param array $nonce_args         {
	 *                                  nonce validation options, its numeric array
	 *                                  0 => 'action' string of action name to be validated,
	 *                                  2 => 'nonce_field' string of field name on $_POST contains nonce value
	 *                                  }
	 *
	 * @param array $sanitize_callbacks {
	 *                                  custom sanitize options, its assoc array
	 *                                  'field_name_1' => 'function_to_call_1' function will called with `call_user_func_array`,
	 *                                  'field_name_2' => 'function_to_call_2',
	 *                                  }
	 *
	 * @return array
	 */
	protected function get_post_data( $nonce_args = array(), $sanitize_callbacks = array() ) {
		// do nonce / caps check when requested
		$nonce_action = '';
		$nonce_field  = '';
		if ( isset( $nonce_args[0] ) && ! empty( $nonce_args[0] ) ) {
			$nonce_action = $nonce_args[0];
		}
		if ( isset( $nonce_args[1] ) && ! empty( $nonce_args[1] ) ) {
			$nonce_field = $nonce_args[1];
		}
		if ( ! empty( $nonce_action ) && ! empty( $nonce_field ) ) {
			$validated = $this->validate_ajax( $nonce_action, 'POST', $nonce_field );
			if ( ! $validated ) {
				// return empty data when its not validated
				return array();
			}
		}

		$post_data = $_POST; // WPCS: CSRF ok

		// do some sanitize
		foreach ( $sanitize_callbacks as $field => $sanitize_func ) {
			if ( isset( $post_data[ $field ] ) ) {
				if ( is_callable( $sanitize_func ) ) {
					$post_data[ $field ] = call_user_func_array( array( $sanitize_func ), array( $post_data[ $field ] ) );
				}
			}
		}

		// do some validation

		return $post_data;
	}


	/**
	 * Formatting additional fields from addon
	 * Format used is `powerform_addon_{$slug}_{$field_name}`
	 *
	 * @since 1.6.1
	 *
	 * @param Powerform_Addon_Abstract $addon
	 * @param                           $additional_fields
	 *
	 * @return array
	 */
	protected static function format_addon_additional_fields( Powerform_Addon_Abstract $addon, $additional_fields ) {
		//to `name` and `value` basis
		$formatted_additional_fields = array();
		if ( ! is_array( $additional_fields ) ) {
			return array();
		}

		foreach ( $additional_fields as $additional_field ) {
			if ( ! isset( $additional_field['name'] ) || ! isset( $additional_field['value'] ) ) {
				continue;
			}
			$formatted_additional_fields[] = array(
				'name'  => 'powerform_addon_' . $addon->get_slug() . '_' . $additional_field['name'],
				'value' => $additional_field['value'],
			);
		}

		return $formatted_additional_fields;
	}

	/**
	 * Check if validate nonce should be executed
	 *
	 * @return bool
	 */
	protected function is_force_validate_submissions_nonce() {
		// default is disabled unless `POWERFORM_FORCE_VALIDATE_SUBMISSIONS_NONCE` = true,
		// this behaviour is to support full page cache
		$enabled = ( defined( 'POWERFORM_FORCE_VALIDATE_SUBMISSIONS_NONCE' ) && POWERFORM_FORCE_VALIDATE_SUBMISSIONS_NONCE );

		/**
		 * Filter the status of nonce submissions
		 *
		 * @since 1.6.1
		 *
		 * @param bool $enabled current status of nonce submissions
		 */
		$enabled = apply_filters( 'powerform_is_force_validate_submissions_nonce', $enabled );

		return $enabled;
	}
}