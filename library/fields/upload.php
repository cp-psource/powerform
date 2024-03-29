<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Upload
 *
 * @since 1.0
 */
class Powerform_Upload extends Powerform_Field {

	/**
	 * @var string
	 */
	public $name = '';

	/**
	 * @var string
	 */
	public $slug = 'upload';

	/**
	 * @var string
	 */
	public $type = 'upload';

	/**
	 * @var int
	 */
	public $position = 14;

	/**
	 * @var array
	 */
	public $options = array();

	/**
	 * @var string
	 */
	public $category = 'standard';

	/**
	 * @var string
	 */
	public $icon = 'sui-icon-download';

	/**
	 * Powerform_Upload constructor.
	 *
	 * @since 1.0
	 */
	public function __construct() {
		parent::__construct();

		$this->name = __( 'Datei-Upload', Powerform::DOMAIN );
	}

	/**
	 * Field defaults
	 *
	 * @since 1.0
	 * @return array
	 */
	public function defaults() {
		$mimes = get_allowed_mime_types();

		return array(
			'field_label' => __( 'Datei hochladen', Powerform::DOMAIN ),
			'filetypes'   => array_keys( $mimes ),
		);
	}

	/**
	 * Autofill Setting
	 *
	 * @since 1.0.5
	 *
	 * @param array $settings
	 *
	 * @return array
	 */
	public function autofill_settings( $settings = array() ) {
		//Unsupported Autofill
		$autofill_settings = array();

		return $autofill_settings;
	}

	/**
	 * Field front-end markup
	 *
	 * @since 1.0
	 *
	 * @param $field
	 * @param $settings
	 *
	 * @return mixed
	 */
	public function markup( $field, $settings = array() ) {
		$this->field = $field;
		$id          = self::get_property( 'element_id', $field );
		$name        = $id;
		$required    = self::get_property( 'required', $field, false );
		$design      = $this->get_form_style( $settings );
		$label       = self::get_property( 'field_label', $field, '' );
		$description = self::get_property( 'description', $field, '' );
		$html        = '';

		if ( $label ) {
			if ( $required ) {
				$html .= '<div class="powerform-field--label">';
				$html .= sprintf( '<label class="powerform-label">%s %s</label>', $label, powerform_get_required_icon() );
				$html .= '</div>';
			} else {
				$html .= sprintf( '<div class="powerform-field--label"><label class="powerform-label">%s</label></div>', $label );
			}
		}

		$html .= self::create_file_upload( $id, $name, $description, $required, $design );

		return apply_filters( 'powerform_field_file_markup', $html, $field );
	}

	/**
	 * Field back-end validation
	 *
	 * @since 1.0
	 *
	 * @param array        $field
	 * @param array|string $data
	 */
	public function validate( $field, $data ) {
		if ( $this->is_required( $field ) ) {
			$id               = self::get_property( 'element_id', $field );
			$required_message = self::get_property( 'required_message', $field, '' );
			if ( empty( $data ) ) {
				$this->validation_message[ $id ] = apply_filters(
					'powerform_upload_field_required_validation_message',
					( ! empty( $required_message ) ? $required_message : __( 'Dieses Feld wird benötigt. Bitte lade eine Datei hoch', Powerform::DOMAIN ) ),
					$id,
					$field
				);
			}
		}
	}

	/**
	 * Return field inline validation rules
	 * Workaround for actually input file is hidden, so its not accessible via standar html5 `required` attribute
	 *
	 * @since 1.1
	 * @return string
	 */
	public function get_validation_rules() {
		$field       = $this->field;
		$is_required = $this->is_required( $field );
		$rules       = '';

		if ( $is_required ) {
			$rules = '"' . $this->get_id( $field ) . '": {';
			if ( $is_required ) {
				$rules .= '"required": true,';
			}
			$rules .= '},';
		}

		return $rules;
	}

	/**
	 * Return field inline validation messages
	 *
	 * @since 1.1
	 * @return string
	 */
	public function get_validation_messages() {
		$field       = $this->field;
		$id          = $this->get_id( $field );
		$is_required = $this->is_required( $field );
		$messages    = '"' . $id . '": {' . "\n";

		if ( $is_required ) {
			$settings_required_message = self::get_property( 'required_message', $field, '' );
			$required_message          = apply_filters(
				'powerform_upload_field_required_validation_message',
				( ! empty( $settings_required_message ) ? $settings_required_message : __( 'Dieses Feld wird benötigt. Bitte lade eine Datei hoch', Powerform::DOMAIN ) ),
				$id,
				$field
			);
			$messages                  = $messages . '"required": "' . $required_message . '",' . "\n";
		}
		$messages .= '},' . "\n";

		return $messages;
	}

	/**
	 * Handle file uplload
	 *
	 * @since 1.6 copied from Powerform_Front_Action
	 *
	 * @param array field settings
	 *
	 * @return bool|array
	 */
	public function handle_file_upload( $field ) {
		$this->field       = $field;
		$id                = self::get_property( 'element_id', $field );
		$field_name        = $id;
		$custom_limit_size = true;
		$upload_limit      = self::get_property( 'upload-limit', $field, self::FIELD_PROPERTY_VALUE_NOT_EXIST );
		$custom_file_type  = self::get_property( 'custom-files', $field, false );
		$mime_types        = array();

		if ( self::FIELD_PROPERTY_VALUE_NOT_EXIST === $upload_limit || empty( $upload_limit ) ) {
			$custom_limit_size = false;
		}

		$custom_file_type = filter_var( $custom_file_type, FILTER_VALIDATE_BOOLEAN );
		if ( $custom_file_type ) {
			// check custom mime
			$filetypes = self::get_property( 'filetypes', $field, array(), 'array' );
			foreach ( $filetypes as $filetype ) {
				// Mime type format = Key is the file extension with value as the mime type.
				$mime_types[ $filetype ] = $filetype;
			}
		}

		if ( isset( $_FILES[ $field_name ] ) ) {
			if ( isset( $_FILES[ $field_name ]['name'] ) && ! empty( $_FILES[ $field_name ]['name'] ) ) {
				$file_name = $_FILES[ $field_name ]['name'];

				/**
				 * Filter mime types to be used as validation
				 *
				 * @since 1.6
				 *
				 * @param array $mime_types return null/empty array to use default WP file types @see https://codex.wordpress.org/Plugin_API/Filter_Reference/upload_mimes
				 * @param array $field
				 */
				$mime_types = apply_filters( 'powerform_upload_field_mime_types', $mime_types, $field );
				$valid      = wp_check_filetype( $file_name, $mime_types );

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


				$max_size = wp_max_upload_size();
				if ( $custom_limit_size ) {
					$max_size = $upload_limit * 1000000; // convert to byte
				}
				if ( 0 === $_FILES[ $field_name ]['size'] || $_FILES[ $field_name ]['size'] > $max_size ) {

					$rounded_max_size = round( $max_size / 1000000 );

					if ( $rounded_max_size <= 0 ) {
						// go to KB
						$rounded_max_size = round( $max_size / 1000 );

						if ( $rounded_max_size <= 0 ) {
							// go to B
							$rounded_max_size = round( $max_size ) . ' B';
						} else {
							$rounded_max_size .= ' KB';
						}
					} else {
						$rounded_max_size .= ' MB';
					}

					return array(
						'success' => false,
						'message' => sprintf( __( 'Fehler beim Speichern des Formulars. Die Größe der hochgeladenen Datei überschreitet das Upload-Limit von %1$s. ', Powerform::DOMAIN ), $rounded_max_size ),
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

}