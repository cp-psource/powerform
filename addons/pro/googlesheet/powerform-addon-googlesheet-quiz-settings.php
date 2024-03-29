<?php

require_once dirname( __FILE__ ) . '/powerform-addon-googlesheet-quiz-settings-exception.php';

/**
 * Class Powerform_Addon_Googlesheet_Quiz_Settings
 * Handle how quiz settings displayed and saved
 *
 * @since 1.6.2
 */
class Powerform_Addon_Googlesheet_Quiz_Settings extends Powerform_Addon_Quiz_Settings_Abstract {

	/**
	 * @var Powerform_Addon_Googlesheet
	 * @since 1.0 Googlesheet Addon
	 */
	protected $addon;

	/**
	 * Powerform_Addon_Googlesheet_Form_Settings constructor.
	 *
	 * @since 1.6.2
	 *
	 * @param Powerform_Addon_Abstract $addon
	 * @param                           $quiz_id
	 *
	 * @throws Powerform_Addon_Exception
	 */
	public function __construct( Powerform_Addon_Abstract $addon, $quiz_id ) {
		parent::__construct( $addon, $quiz_id );

		$this->_update_quiz_settings_error_message = __(
			'The update to your settings for this quiz failed, check the form input and try again.',
			Powerform::DOMAIN
		);
	}

	/**
	 * Wizard configuration
	 *
	 * @since 1.6.2
	 * @return array
	 */
	public function quiz_settings_wizards() {
		// numerical array steps
		return array(
			array(
				'callback'     => array( $this, 'pick_name' ),
				'is_completed' => array( $this, 'pick_name_is_completed' ),
			),
			array(
				'callback'     => array( $this, 'setup_sheet' ),
				'is_completed' => array( $this, 'setup_sheet_is_completed' ),
			),
		);
	}

	/**
	 * Setup Connection Name
	 *
	 * @since 1.6.2
	 *
	 * @param $submitted_data
	 *
	 * @return array
	 */
	public function pick_name( $submitted_data ) {
		$template = powerform_addon_googlesheet_dir() . 'views/quiz-settings/pick-name.php';

		$multi_id = $this->generate_multi_id();
		if ( isset( $submitted_data['multi_id'] ) ) {
			$multi_id = $submitted_data['multi_id'];
		}

		$template_params = array(
			'name'       => $this->get_multi_id_quiz_settings_value( $multi_id, 'name', '' ),
			'file_id'    => $this->get_multi_id_quiz_settings_value( $multi_id, 'file_id', '' ),
			'name_error' => '',
			'multi_id'   => $multi_id,
		);

		unset( $submitted_data['multi_id'] );

		$is_submit  = ! empty( $submitted_data );
		$has_errors = false;
		if ( $is_submit ) {
			$name                    = isset( $submitted_data['name'] ) ? $submitted_data['name'] : '';
			$template_params['name'] = $name;

			try {
				if ( empty( $name ) ) {
					throw new Powerform_Addon_Googlesheet_Exception( __( 'Please pick valid name' ) );
				}

				$time_added = $this->get_multi_id_quiz_settings_value( $multi_id, 'time_added', time() );
				$this->save_multi_id_quiz_setting_values(
					$multi_id,
					array(
						'name'       => $name,
						'time_added' => $time_added,
					)
				);

			} catch ( Powerform_Addon_Googlesheet_Exception $e ) {
				$template_params['name_error'] = $e->getMessage();
				$has_errors                    = true;
			}
		}

		$buttons = array();
		if ( $this->pick_name_is_completed( array( 'multi_id' => $multi_id ) ) ) {
			$buttons['disconnect']['markup'] = Powerform_Addon_Abstract::get_button_markup(
				esc_html__( 'DISCONNECT', Powerform::DOMAIN ),
				'sui-button-ghost sui-tooltip sui-tooltip-top-center powerform-addon-form-disconnect',
				esc_html__( 'Disconnect Google Sheets Integration from this Quiz.', Powerform::DOMAIN )
			);
		}

		$buttons['next']['markup'] = '<div class="sui-actions-right">' .
		                             Powerform_Addon_Abstract::get_button_markup( esc_html__( 'Next', Powerform::DOMAIN ), 'powerform-addon-next' ) .
		                             '</div>';

		return array(
			'html'       => Powerform_Addon_Abstract::get_template( $template, $template_params ),
			'buttons'    => $buttons,
			'redirect'   => false,
			'has_errors' => $has_errors,
		);
	}

	/**
	 * Setup sheet
	 *
	 * @since 1.6.2
	 *
	 * @param $submitted_data
	 *
	 * @return array
	 * @throws Exception
	 */
	public function setup_sheet( $submitted_data ) {
		$template = powerform_addon_googlesheet_dir() . 'views/quiz-settings/setup-sheet.php';

		if ( ! isset( $submitted_data['multi_id'] ) ) {
			return $this->get_force_closed_wizard( __( 'Please pick valid connection', Powerform::DOMAIN ) );
		}

		$multi_id = $submitted_data['multi_id'];
		unset( $submitted_data['multi_id'] );

		$template_params = array(
			'folder_id'      => $this->get_multi_id_quiz_settings_value( $multi_id, 'folder_id', '' ),
			'file_name'      => $this->get_multi_id_quiz_settings_value( $multi_id, 'file_name', '' ),
			'spreadsheet_id' => $this->get_multi_id_quiz_settings_value( $multi_id, 'spreadsheet_id', '' ),
			'file_id'        => $this->get_multi_id_quiz_settings_value( $multi_id, 'file_id', '' ),
			'error_message'  => '',
			'multi_id'       => $multi_id,
		);


		$is_submit    = ! empty( $submitted_data );
		$has_errors   = false;
		$notification = array();
		$is_close     = false;

		if ( $is_submit ) {
			$folder_id                    = isset( $submitted_data['folder_id'] ) ? $submitted_data['folder_id'] : '';
			$template_params['folder_id'] = $folder_id;
			$file_name                    = isset( $submitted_data['file_name'] ) ? $submitted_data['file_name'] : '';
			$template_params['file_name'] = $file_name;

			try {
				$input_exceptions = new Powerform_Addon_Googlesheet_Quiz_Settings_Exception();
				if ( empty( $file_name ) ) {
					$input_exceptions->add_input_exception( __( 'Please put valid spread sheet name', Powerform::DOMAIN ), 'file_name_error' );
				}

				$google_client = $this->addon->get_google_client();
				$google_client->setAccessToken( $this->addon->get_client_access_token() );


				if ( ! empty( $folder_id ) ) {
					$drive = new Google_Service_Drive( $google_client );
					try {
						$folder = $drive->files->get( $folder_id );

						// its from API var
						// phpcs:ignore WordPress.NamingConventions.ValidVariableName.NotSnakeCaseMemberVar
						if ( Powerform_Addon_Googlesheet::MIME_TYPE_GOOGLE_DRIVE_FOLDER !== $folder->mimeType ) {
							$input_exceptions->add_input_exception( __( 'This is not a folder, please use a valid Folder ID.', Powerform::DOMAIN ), 'folder_id_error' );
						}

					} catch ( Google_Exception $google_exception ) {
						// catch 404
						if ( false !== stripos( $google_exception->getMessage(), 'File not found' ) ) {
							$input_exceptions->add_input_exception( __( 'Folder not found, please put Folder ID.', Powerform::DOMAIN ), 'folder_id_error' );
						} else {
							throw $google_exception;
						}
					}
				}

				if ( $input_exceptions->input_exceptions_is_available() ) {
					throw $input_exceptions;
				}

				$file = new Google_Service_Drive_DriveFile();
				$file->setMimeType( Powerform_Addon_Googlesheet::MIME_TYPE_GOOGLE_SPREADSHEET );
				$file->setName( $file_name );


				if ( ! empty( $folder_id ) ) {
					$file->setParents( array( $folder_id ) );
				}

				$drive     = new Google_Service_Drive( $google_client );
				$new_sheet = $drive->files->create( $file );

				$this->save_multi_id_quiz_setting_values(
					$multi_id,
					array(
						'folder_id' => $folder_id,
						'file_name' => $file_name,
						'file_id'   => $new_sheet->getId(),
					)
				);

				$notification = array(
					'type' => 'success',
					'text' => '<strong>' . $this->addon->get_title() . '</strong> ' . __( 'Successfully created spreadsheet and connected to your quiz' ),
				);
				$is_close     = true;


			} catch ( Powerform_Addon_Googlesheet_Quiz_Settings_Exception $e ) {
				$input_errors    = $e->get_input_exceptions();
				$template_params = array_merge( $template_params, $input_errors );
				$has_errors      = true;
			} catch ( Powerform_Addon_Googlesheet_Exception $e ) {
				$template_params['error_message'] = $e->getMessage();
				$has_errors                       = true;
			} catch ( Google_Exception $e ) {
				$template_params['error_message'] = $e->getMessage();
				$has_errors                       = true;
			}
		}

		$buttons = array();
		if ( $this->pick_name_is_completed( array( 'multi_id' => $multi_id ) ) ) {
			$buttons['disconnect']['markup'] = Powerform_Addon_Abstract::get_button_markup(
				esc_html__( 'DISCONNECT', Powerform::DOMAIN ),
				'sui-button-ghost sui-tooltip sui-tooltip-top-center powerform-addon-form-disconnect',
				esc_html__( 'Disconnect Google Sheets Integration from this quiz.', Powerform::DOMAIN )
			);
		}

		$buttons['next']['markup'] = '<div class="sui-actions-right">' .
		                             Powerform_Addon_Abstract::get_button_markup( esc_html__( 'Create', Powerform::DOMAIN ), 'powerform-addon-next' ) .
		                             '</div>';

		return array(
			'html'         => Powerform_Addon_Abstract::get_template( $template, $template_params ),
			'buttons'      => $buttons,
			'redirect'     => false,
			'has_errors'   => $has_errors,
			'has_back'     => true,
			'notification' => $notification,
			'is_close'     => $is_close,
			'size'         => 'normal',
		);
	}

	/**
	 * Check if setup sheet completed
	 *
	 * @since 1.6.2
	 *
	 * @param $submitted_data
	 *
	 * @return bool
	 */
	public function setup_sheet_is_completed( $submitted_data ) {
		$multi_id = '';
		if ( isset( $submitted_data['multi_id'] ) ) {
			$multi_id = $submitted_data['multi_id'];
		}

		if ( empty( $multi_id ) ) {
			return false;
		}

		$file_name = $this->get_multi_id_quiz_settings_value( $multi_id, 'file_name', '' );

		if ( empty( $file_name ) ) {
			return false;
		}

		$file_id = $this->get_multi_id_quiz_settings_value( $multi_id, 'file_id', '' );

		if ( empty( $file_id ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Check if pick name step completed
	 *
	 * @since 1.6.2
	 *
	 * @param $submitted_data
	 *
	 * @return bool
	 */
	public function pick_name_is_completed( $submitted_data ) {
		$multi_id = '';
		if ( isset( $submitted_data['multi_id'] ) ) {
			$multi_id = $submitted_data['multi_id'];
		}

		if ( empty( $multi_id ) ) {
			return false;
		}

		$name = $this->get_multi_id_quiz_settings_value( $multi_id, 'name', '' );

		if ( empty( $name ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Generate multi id for multiple connection
	 *
	 * @since 1.6.2
	 * @return string
	 */
	public function generate_multi_id() {
		return uniqid( 'googlesheet_', true );
	}


	/**
	 * Override how multi connection displayed
	 *
	 * @since 1.6.2
	 * @return array
	 */
	public function get_multi_ids() {
		$multi_ids = array();
		foreach ( $this->get_quiz_settings_values() as $key => $value ) {
			$multi_ids[] = array(
				'id'    => $key,
				// use name that was added by user on creating connection
				'label' => isset( $value['name'] ) ? $value['name'] : $key,
			);
		}

		return $multi_ids;
	}

	/**
	 * Disconnect a connection from current quiz
	 *
	 * @since 1.6.2
	 *
	 * @param array $submitted_data
	 */
	public function disconnect_quiz( $submitted_data ) {
		// only execute if multi_id provided on submitted data
		if ( isset( $submitted_data['multi_id'] ) && ! empty( $submitted_data['multi_id'] ) ) {
			$addon_quiz_settings = $this->get_quiz_settings_values();
			unset( $addon_quiz_settings[ $submitted_data['multi_id'] ] );
			$this->save_quiz_settings_values( $addon_quiz_settings );
		}
	}

	/**
	 * Check if multi_id quiz settings values completed
	 *
	 * Override when needed
	 *
	 * @since 1.6.2
	 *
	 * @param $multi_id
	 *
	 * @return bool
	 */
	public function is_multi_quiz_settings_complete( $multi_id ) {
		$data = array( 'multi_id' => $multi_id );

		if ( ! $this->pick_name_is_completed( $data ) ) {
			return false;
		}

		if ( ! $this->setup_sheet_is_completed( $data ) ) {
			return false;
		}

		return true;
	}
}