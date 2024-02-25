<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Custom_Form_Admin
 *
 * @property Powerform_Custom_Form module
 * @since 1.0
 */
class Powerform_Custom_Form_Admin extends Powerform_Admin_Module {

	/**
     * @var Powerform_Custom_Form
     */
    public $module;

	/**
	 * Init module admin
	 *
	 * @since 1.0
	 */
	public function init() {
		$this->module       = Powerform_Custom_Form::get_instance();
		$this->page         = 'powerform-cform';
		$this->page_edit    = 'powerform-cform-wizard';
		$this->page_entries = 'powerform-cform-view';
	}

	/**
	 * Include required files
	 *
	 * @since 1.0
	 */
	public function includes() {
		include_once dirname( __FILE__ ) . '/admin-page-new.php';
		include_once dirname( __FILE__ ) . '/admin-page-view.php';
		include_once dirname( __FILE__ ) . '/admin-page-entries.php';
		include_once dirname( __FILE__ ) . '/admin-renderer-entries.php';
	}

	/**
	 * Add module pages to Admin
	 *
	 * @since 1.0
	 */
	public function add_menu_pages() {
		new Powerform_CForm_Page( $this->page, 'custom-form/list', __( 'Formulare', Powerform::DOMAIN ), __( 'Formulare', Powerform::DOMAIN ), 'powerform' );
		new Powerform_CForm_New_Page( $this->page_edit, 'custom-form/wizard', __( 'Formular bearbeiten', Powerform::DOMAIN ), __( 'Neues benutzerdefiniertes Formular', Powerform::DOMAIN ), 'powerform' );
		new Powerform_CForm_View_Page( $this->page_entries, 'custom-form/entries', __( 'Einreichungen:', Powerform::DOMAIN ), __( 'Benutzerdefiniertes Formular anzeigen', Powerform::DOMAIN ), 'powerform' );
	}

	/**
	 * Remove necessary pages from menu
	 *
	 * @since 1.0
	 */
	public function hide_menu_pages() {
		remove_submenu_page( 'powerform', $this->page_edit );
		remove_submenu_page( 'powerform', $this->page_entries );
	}

	/**
	 * Pass module defaults to JS
	 *
	 * @since 1.0
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	public function add_js_defaults( $data ) {
		$model = null;
		if ( $this->is_admin_wizard() ) {
			$data['application'] = 'builder';

			if ( ! self::is_edit() ) {
				$data['formNonce'] = wp_create_nonce( 'powerform_save_builder_fields' );
				// Load settings from template
				$template = $this->get_template();
				$name     = '';
				if ( isset( $_GET['name'] ) ) { // WPCS: CSRF ok.
					$name = sanitize_text_field( $_GET['name'] );
				}

				if ( $template ) {
					$data['currentForm'] = array(
						'wrappers' => $template->fields,
						'settings' => array_merge(
							array(
								'formName' => $name,
								'pagination-header' => 'bar',
								'version'      => POWERFORM_VERSION,
								'form-border-style' => 'solid',
								'form-padding' => '',
								'form-border'  => '',
								'fields-style' => 'open',
								'validation'   => 'on_submit',
								'form-style'   => 'default',
								'enable-ajax'  => 'true'
							),
							$template->settings
						),
					);
				} else {
					$data['currentForm'] = array(
						'fields'   => array(),
						'settings' => array_merge(
							array( 'formName' => $name ),
							array(
								'pagination-header' => 'bar',
								'version'      => POWERFORM_VERSION,
								'form-padding' => 'none',
								'form-border'  => 'none',
								'fields-style' => 'open',
								'form-style'   => 'default',
							) ),
					);
				}
			} else {
				$id = isset( $_GET['id'] ) ? intval( $_GET['id'] ) : null; // WPCS: CSRF ok.
				if ( ! is_null( $id ) ) {
					$data['formNonce'] = wp_create_nonce( 'powerform_save_builder_fields' );
					$model             = Powerform_Custom_Form_Model::model()->load( $id );
				}

				$wrappers = array();
				if ( is_object( $model ) ) {
					$wrappers = $model->get_fields_grouped();
				}

				// Load stored record
				$settings = apply_filters( 'powerform_form_settings', $this->get_form_settings( $model ), $model, $data, $this );

				$data['currentForm'] = array(
					'wrappers' => $wrappers,
					'settings' => array_merge(
						array(
							'pagination-header' => 'bar'
						),
						$settings,
						array(
							'form_id'     => $model->id,
							'form_name'   => $model->name,
							'form_status' => $model->status,
						)
					),
				);
			}
		}

		$data['modules']['custom_form'] = array(
			'templates'     => $this->module->get_templates(),
			'new_form_url'  => menu_page_url( $this->page_edit, false ),
			'form_list_url' => menu_page_url( $this->page, false ),
			'preview_nonce' => wp_create_nonce( 'powerform_popup_preview_cforms' ),
		);

		return apply_filters( 'powerform_form_admin_data', $data, $model, $this );
	}

	/**
	 * Localize module
	 *
	 * @since 1.0
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	public function add_l10n_strings( $data ) {
		$data['custom_form'] = array(
			'popup_label' => __( 'Formulartyp auswählen', Powerform::DOMAIN ),
		);

		$data['builder'] = array(
			"save" => __( "Save", Powerform::DOMAIN ),
		);

		$data['product'] = array(
			"add_variations" => __( "Füge einige Variationen Deines Produkts hinzu.", Powerform::DOMAIN ),
			"use_list"       => __( "In Liste anzeigen?", Powerform::DOMAIN ),
			"add_variation"  => __( "Variante hinzufügen", Powerform::DOMAIN ),
			"image"          => __( "Bild", Powerform::DOMAIN ),
			"name"           => __( "Name", Powerform::DOMAIN ),
			"price"          => __( "Preis", Powerform::DOMAIN ),
		);

		$data['appearance'] = array(
			"customize_typography"        => __( "Typografie anpassen", Powerform::DOMAIN ),
			"custom_font_family"          => __( "Gib den Familiennamen der benutzerdefinierten Schriftart ein", Powerform::DOMAIN ),
			"custom_font_placeholder"     => __( "Z.B. 'Arial', sans-serif", Powerform::DOMAIN ),
			"custom_font_description"     => __( "Gib den Namen der Schriftfamilie wie in CSS ein", Powerform::DOMAIN ),
			"font_family"                 => __( "Schriftfamilie", Powerform::DOMAIN ),
			"font_size"                   => __( "Schriftgröße", Powerform::DOMAIN ),
			"font_weight"                 => __( "Schriftstärke", Powerform::DOMAIN ),
			"select_font"                 => __( "Schriftart auswählen", Powerform::DOMAIN ),
			"custom_font"                 => __( "Benutzerdefinierte Benutzerschriftart", Powerform::DOMAIN ),
			"minutes"                     => __( "Minute(n)", Powerform::DOMAIN ),
			"hours"                       => __( "Stunde(n)", Powerform::DOMAIN ),
			"days"                        => __( "Tag(e)", Powerform::DOMAIN ),
			"weeks"                       => __( "Woche(n)", Powerform::DOMAIN ),
			"months"                      => __( "Monat(e)", Powerform::DOMAIN ),
			"years"                       => __( "Jahr(e)", Powerform::DOMAIN ),
		);

		$data['tab_appearance'] = array(
			"basic_selectors"                => __( "Basis Selektoren", Powerform::DOMAIN ),
			"advanced_selectors"             => __( "Erweiterte Selektoren", Powerform::DOMAIN ),
			"pagination_selectors"           => __( "Paginierungsselektoren", Powerform::DOMAIN ),
		);

		return $data;
	}

	/**
	 * Return template
	 *
	 * @since 1.0
	 * @return Powerform_Template|false
	 */
	private function get_template() {
		//$id = $_GET['template']; // TODO: if enabled use sanitize and trim
		$id = 'contact_form';

		foreach ( $this->module->templates as $key => $template ) {
			if ( $template->options['id'] === $id ) {
				return $template;
			}
		}

		return false;
	}

	/**
	 * Return Form Settins
	 *
	 * @since 1.1
	 *
	 * @param Powerform_Custom_Form_Model $form
	 *
	 * @return mixed
	 */
	public function get_form_settings( $form ) {
		// If not using the new "submission-behaviour" setting, set it according to the previous settings
		if ( ! isset( $form->settings['submission-behaviour'] ) ) {
			$redirect = ( isset( $form->settings['redirect'] ) && filter_var( $form->settings['redirect'], FILTER_VALIDATE_BOOLEAN ) );
			$thankyou = ( isset( $form->settings['thankyou'] ) && filter_var( $form->settings['thankyou'], FILTER_VALIDATE_BOOLEAN ) );

			if ( ! $redirect && ! $thankyou ) {
				$form->settings['submission-behaviour'] = 'behaviour-thankyou';
			} elseif ( $thankyou ) {
				$form->settings['submission-behaviour'] = 'behaviour-thankyou';
			} elseif ( $redirect ) {
				$form->settings['submission-behaviour'] = 'behaviour-redirect';
			}
		}

		return $form->settings;
	}
}