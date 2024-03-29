<?php

/**
 * Class Powerform_Addon_Abstract
 * Any change(s) to this file is subject to:
 * - Properly Written DocBlock! (what is this, why is that, how to be like those, etc, as long as you want!)
 * - Properly Written Changelog!
 *
 * If you override any of these method, please add necessary hooks in it,
 * Which you can see below, as a reference and keep the arguments signature.
 * If needed you can call these method, as parent::method_name(),
 * and add your specific hooks.
 *
 * @since 1.1
 */
abstract class Powerform_Addon_Form_Hooks_Abstract {

	/**
	 * Addon Instance
	 *
	 * @since 1.1
	 * @var Powerform_Addon_Abstract
	 */
	protected $addon;

	/**
	 * Current Form ID
	 *
	 * @since 1.1
	 * @var int
	 */
	protected $form_id;

	/**
	 * Customizable submit form error message
	 *
	 * @since 1.1
	 * @var string
	 */
	protected $_submit_form_error_message = '';

	/**
	 * Form settings instance
	 *
	 * @since 1.1
	 * @var Powerform_Addon_Form_Settings_Abstract|null
	 *
	 */
	protected $form_settings_instance;

	/**
	 * Custom Form Model
	 *
	 * @since 1.2
	 * @var Powerform_Custom_Form_Model
	 */
	protected $custom_form;

	/**
	 * Powerform_Addon_Form_Hooks_Abstract constructor.
	 *
	 * @param Powerform_Addon_Abstract $addon
	 * @param int                       $form_id
	 *
	 * @since 1.1
	 * @since 1.2 Add `custom_form` as class property
	 * @throws Powerform_Addon_Exception
	 */
	public function __construct( Powerform_Addon_Abstract $addon, $form_id ) {
		$this->addon       = $addon;
		$this->form_id     = $form_id;
		$this->custom_form = Powerform_Custom_Form_Model::model()->load( $this->form_id );
		if ( ! $this->custom_form ) {
			throw new Powerform_Addon_Exception( sprintf( __( 'Formular mit der ID %d konnte nicht gefunden werden', Powerform::DOMAIN ), $this->form_id ) );
		}

		$this->_submit_form_error_message = __( 'Das Formular konnte aufgrund eines Addons nicht gesendet werden. Überprüfe Dein Formular und versuche es erneut' );

		// get form settings instance to be available throughout cycle
		$this->form_settings_instance = $this->addon->get_addon_form_settings( $this->form_id );
	}

	/**
	 * Override this function to execute action before fields rendered
	 *
	 * If function generate output, it will output-ed,
	 * race condition between addon probably happen.
	 * Its void function, so return value will be ignored, and powerform process will always continue,
	 * unless it generates unrecoverable error, so please be careful on extending this function.
	 * If you want to `wp_enqueue_script` this might be the best place.
	 *
	 * @since 1.1
	 */
	public function on_before_render_form_fields() {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Fires before form fields rendered by powerform
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this action won't be triggered.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		do_action(
			'powerform_addon_' . $addon_slug . '_on_before_render_form_fields',
			$form_id,
			$form_settings_instance
		);
	}

	/**
	 * Override this function to execute action after all form fields rendered
	 *
	 * If function generate output, it will output-ed
	 * race condition between addon probably happen
	 * its void function, so return value will be ignored, and powerform process will always continue
	 * unless it generates unrecoverable error, so please be careful on extending this function
	 *
	 * @since 1.1
	 */
	public function on_after_render_form_fields() {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Fires when addon rendering extra output after connected form fields rendered
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this action won't be triggered.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		do_action(
			'powerform_addon_' . $addon_slug . '_on_after_render_form_fields',
			$form_id,
			$form_settings_instance
		);
	}

	/**
	 * Override this function to execute action after html markup form rendered completely
	 *
	 * If function generate output, it will output-ed
	 * race condition between addon probably happen
	 * its void function, so return value will be ignored, and powerform process will always continue
	 * unless it generates unrecoverable error, so please be careful on extending this function
	 *
	 * @since 1.1
	 */
	public function on_after_render_form() {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Fires when connected form completely rendered
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this action won't be triggered.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		do_action(
			'powerform_addon_' . $addon_slug . '_on_after_render_form',
			$form_id,
			$form_settings_instance
		);
	}

	/**
	 * Override this function to execute action on submit form
	 *
	 * Return true will continue powerform process,
	 * return false will stop powerform process,
	 * and display error message to user @see Powerform_Addon_Form_Hooks_Abstract::get_submit_form_error_message()
	 *
	 * @since 1.1
	 *
	 * @param $submitted_data
	 *
	 * @return bool
	 */
	public function on_form_submit( $submitted_data ) {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Filter submitted form data to be processed by addon
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $submitted_data
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance Addon Form Settings instance
		 */
		$submitted_data = apply_filters(
			'powerform_addon_' . $addon_slug . '_form_submitted_data',
			$submitted_data,
			$form_id,
			$form_settings_instance
		);


		$is_success = true;
		/**
		 * Filter result of form submit
		 *
		 * Return `true` if success, or **(string) error message** on fail
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param bool                                         $is_success
		 * @param int                                          $form_id                current Form ID
		 * @param array                                        $submitted_data
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance Addon Form Settings instance
		 */
		$is_success = apply_filters(
			'powerform_addon_' . $addon_slug . '_on_form_submit_result',
			$is_success,
			$form_id,
			$submitted_data,
			$form_settings_instance
		);

		// process filter
		if ( true !== $is_success ) {
			// only update `_submit_form_error_message` when not empty
			if ( ! empty( $is_success ) ) {
				$this->_submit_form_error_message = (string) $is_success;
			}

			return $is_success;
		}

		return $is_success;
	}

	/**
	 * Override this function to add another entry field to storage
	 *
	 * Return an multi array with format (at least, or it will be skipped)
	 * [
	 *  'name' => NAME,
	 *  'value' => VALUE', => can be array/object/scalar, it will serialized on storage
	 * ],
	 * [
	 *  'name' => NAME,
	 *  'value' => VALUE'
	 * ]
	 *
	 * @since          1.1
	 * @since          1.2 Add `$current_entry_fields` as optional param on inherit
	 *
	 * @param array $submitted_data
	 *
	 * @optional_param array $form_entry_fields default entry fields that will be saved,
	 *                                    its here for reference, this function doesnt need to return it
	 *                                    only return new entry fields.
	 *
	 * @return array
	 */
	public function add_entry_fields( $submitted_data ) {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Filter submitted form data to be processed by addon
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $submitted_data
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance Addon Form Settings instance
		 */
		$submitted_data = apply_filters(
			'powerform_addon_' . $addon_slug . '_form_submitted_data',
			$submitted_data,
			$form_id,
			$form_settings_instance
		);

		// get second optional param `$form_entry_fields`
		$form_entry_fields = array();
		$func_args         = func_get_args();
		if ( isset( $func_args[1] ) ) {
			$form_entry_fields = $func_args[1];
		}

		/**
		 * Filter current entry fields of form to be processed by addon
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.2
		 *
		 * @param array                                        $form_entry_fields
		 * @param array                                        $submitted_data
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance Addon Form Settings instance
		 */
		$form_entry_fields = apply_filters(
			'powerform_addon_' . $addon_slug . '_form_entry_fields',
			$form_entry_fields,
			$submitted_data,
			$form_id,
			$form_settings_instance
		);


		$entry_fields = array();
		/**
		 * Filter addon entry fields to be saved to entry model
		 *
		 * @since 1.1
		 * @since 1.2 Add `$form_entry_fields` as param
		 *
		 * @param array                                        $entry_fields
		 * @param int                                          $form_id                current Form ID
		 * @param array                                        $submitted_data
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance Addon Form Settings instance
		 * @param array                                        $form_entry_fields      Current entry fields of the form
		 */
		$entry_fields = apply_filters(
			'powerform_addon_' . $addon_slug . '_entry_fields',
			$entry_fields,
			$form_id,
			$submitted_data,
			$form_settings_instance,
			$form_entry_fields
		);

		return $entry_fields;
	}

	/**
	 * Override this function to execute action after entry saved
	 *
	 * Its void function, so return value will be ignored, and powerform process will always continue
	 * unless it generates unrecoverable error, so please be careful on extending this function
	 *
	 * @since 1.1
	 *
	 * @param Powerform_Form_Entry_Model $entry_model
	 */
	public function after_entry_saved( Powerform_Form_Entry_Model $entry_model ) {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 * Fires when entry already saved on db
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Powerform Entry Model
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		do_action(
			'powerform_addon_' . $addon_slug . '_after_entry_saved',
			$form_id,
			$entry_model,
			$form_settings_instance
		);
	}

	/**
	 * Override this function to display another sub-row on entry detail
	 *
	 * Return a multi array with this format (at least, or it will skipped)
	 * [
	 *  'label' => LABEL,
	 *  'value' => VALUE (string) => its output is on html mode, so you can do styling, but please don't forgot to escape its html when needed
	 * ],
	 * [
	 *  'label' => LABEL,
	 *  'value' => VALUE
	 * ]
	 *
	 * @since 1.1
	 *
	 * @param Powerform_Form_Entry_Model $entry_model
	 * @param     array                   $addon_meta_data specific meta_data that added by current addon from @see: add_entry_fields()
	 *
	 * @return array
	 */
	public function on_render_entry( Powerform_Form_Entry_Model $entry_model, $addon_meta_data ) {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 *
		 * Filter addon metadata that previously saved on db to be processed
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $addon_meta_data
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Powerform Entry Model
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$addon_meta_data = apply_filters(
			'powerform_addon_' . $addon_slug . '_metadata',
			$addon_meta_data,
			$form_id,
			$entry_model,
			$form_settings_instance
		);


		$entry_items = array();
		/**
		 * Filter mailchimp row(s) to be displayed on entries page
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $entry_items            row(s) to be displayed on entries page
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Form Entry Model
		 * @param array                                        $addon_meta_data        meta data saved by addon on entry fields
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$entry_items = apply_filters(
			'powerform_addon_' . $addon_slug . '_entry_items',
			$entry_items,
			$form_id,
			$entry_model,
			$addon_meta_data,
			$form_settings_instance
		);


		return $entry_items;
	}

	/**
	 * Override this function to Add another Column on title Row
	 *
	 * This TITLE_ID will be referenced on @see Powerform_Addon_Form_Hooks_Abstract::on_export_render_entry_row()
	 *
	 * @example
	 * {
	 *         TITLE_ID_1 => 'TITLE 1',
	 *         TITLE_ID_2 => 'TITLE 2',
	 *         TITLE_ID_3 => 'TITLE 3',
	 * }
	 *
	 * @since 1.1
	 * @return array
	 */
	public function on_export_render_title_row() {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		$export_headers = array();
		/**
		 * Filter mailchimp headers on export file
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $export_headers         headers to be displayed on export file
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$export_headers = apply_filters(
			'powerform_addon_' . $addon_slug . '_export_headers',
			$export_headers,
			$form_id,
			$form_settings_instance
		);

		return $export_headers;
	}

	/**
	 * Add Additional Column on entry row,
	 *
	 * Use TITLE_ID from @see Powerform_Addon_Form_Hooks_Abstract::on_export_render_title_row()
	 *
	 * @example
	 * {
	 *   'TITLE_ID_1' => 'VALUE OF TITLE_1',
	 *   'TITLE_ID_2' => 'VALUE OF TITLE_2',
	 *   'TITLE_ID_3' => 'VALUE OF TITLE_3',
	 * }
	 *
	 * @since 1.1
	 *
	 * @param Powerform_Form_Entry_Model $entry_model
	 * @param                             $addon_meta_data
	 *
	 * @return array
	 */
	public function on_export_render_entry( Powerform_Form_Entry_Model $entry_model, $addon_meta_data ) {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 *
		 * Filter addon metadata that previously saved on db to be processed
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $addon_meta_data
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Powerform Entry Model
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$addon_meta_data = apply_filters(
			'powerform_addon_' . $addon_slug . '_metadata',
			$addon_meta_data,
			$form_id,
			$entry_model,
			$form_settings_instance
		);

		$export_columns = array();
		/**
		 * Filter addon columns to be displayed on export submissions
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $export_columns         column to be exported
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Form Entry Model
		 * @param array                                        $addon_meta_data        meta data saved by addon on entry fields
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$export_columns = apply_filters(
			'powerform_addon_' . $addon_slug . '_export_columns',
			$export_columns,
			$form_id,
			$entry_model,
			$addon_meta_data,
			$form_settings_instance
		);

		return $export_columns;
	}

	/**
	 * Get Submit form error message
	 *
	 * @since 1.1
	 * @return string
	 */
	public function get_submit_form_error_message() {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		$error_message = $this->_submit_form_error_message;
		/**
		 * Filter addon columns to be displayed on export submissions
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $export_columns         column to be exported
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$error_message = apply_filters(
			'powerform_addon_' . $addon_slug . '_submit_form_error_message',
			$error_message,
			$form_id,
			$form_settings_instance
		);

		return $error_message;
	}

	/**
	 * Override this function to execute action before submission deleted
	 *
	 * If function generate output, it will output-ed
	 * race condition between addon probably happen
	 * its void function, so return value will be ignored, and powerform process will always continue
	 * unless it generates unrecoverable error, so please be careful on extending this function
	 *
	 * @since 1.1
	 *
	 * @param Powerform_Form_Entry_Model $entry_model
	 * @param                             $addon_meta_data
	 */
	public function on_before_delete_entry( Powerform_Form_Entry_Model $entry_model, $addon_meta_data ) {
		$addon_slug             = $this->addon->get_slug();
		$form_id                = $this->form_id;
		$form_settings_instance = $this->form_settings_instance;

		/**
		 *
		 * Filter addon metadata that previously saved on db to be processed
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this filter probably won't be applied.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param array                                        $addon_meta_data
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Powerform Entry Model
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		$addon_meta_data = apply_filters(
			'powerform_addon_' . $addon_slug . '_metadata',
			$addon_meta_data,
			$form_id,
			$entry_model,
			$form_settings_instance
		);

		/**
		 * Fires when connected form delete a submission
		 *
		 * Although it can be used for all addon.
		 * Please keep in mind that if the addon override this method,
		 * then this action won't be triggered.
		 * To be sure please check individual addon documentations.
		 *
		 * @since 1.1
		 *
		 * @param int                                          $form_id                current Form ID
		 * @param Powerform_Form_Entry_Model                  $entry_model            Powerform Entry Model
		 * @param array                                        $addon_meta_data        addon meta data
		 * @param Powerform_Addon_Form_Settings_Abstract|null $form_settings_instance of Addon Form Settings
		 */
		do_action(
			'powerform_addon_' . $addon_slug . '_on_before_delete_submission',
			$form_id,
			$entry_model,
			$addon_meta_data,
			$form_settings_instance
		);
	}

}