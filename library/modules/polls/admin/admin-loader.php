<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Poll_Admin
 *
 * @property Powerform_Polls module
 * @since 1.0
 */
class Powerform_Poll_Admin extends Powerform_Admin_Module {

	/**
     * @var Powerform_Custom_Form
     */
    public $module;
	
	/**
	 * Init
	 *
	 * @since 1.0
	 */
	public function init() {
		$this->module       = Powerform_Polls::get_instance();
		$this->page         = 'powerform-poll';
		$this->page_edit    = 'powerform-poll-wizard';
		$this->page_entries = 'powerform-poll-view';
	}

	/**
	 * Include files
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
		new Powerform_Poll_Page( 'powerform-poll', 'poll/list', __( 'Umfragen', Powerform::DOMAIN ), __( 'Umfragen', Powerform::DOMAIN ), 'powerform' );
		new Powerform_Poll_New_Page( 'powerform-poll-wizard', 'poll/wizard', __( 'Neue Umfrage', Powerform::DOMAIN ), __( 'Neue Umfrage', Powerform::DOMAIN ), 'powerform' );
		new Powerform_Poll_View_Page( 'powerform-poll-view', 'poll/entries', __( 'Einreichungen:', Powerform::DOMAIN ), __( 'Umfrage ansehen', Powerform::DOMAIN ), 'powerform' );
	}

	/**
	 * Remove necessary pages from menu
	 *
	 * @since 1.0
	 */
	public function hide_menu_pages() {
		remove_submenu_page( 'powerform', 'powerform-poll-wizard' );
		remove_submenu_page( 'powerform', 'powerform-poll-view' );
	}

	/**
	 * Pass module defaults to JS
	 *
	 * @since 1.0
	 * @param $data
	 *
	 * @return mixed
	 */
	public function add_js_defaults( $data ) {
		$model = null;
		if ( $this->is_admin_wizard() ) {
			$data['application'] = 'poll';
			$data['formNonce'] = wp_create_nonce( 'powerform_save_poll' );
			if ( ! self::is_edit() ) {
				$name     = '';
				if ( isset( $_GET['name'] ) ) { // WPCS: CSRF ok.
					$name = sanitize_text_field( $_GET['name'] );
				}

				$data['currentForm'] = array(
					'answers'  => array(),
					'settings' => array(
						'formName'               => $name,
						'admin-email-recipients' => array(
							get_option( 'admin_email' ),
						),
						'admin-email-title'      => __( "Neue Umfrage-Einreichung für {poll_name}", Powerform::DOMAIN ),
						'admin-email-editor'     => __(
							"Du hast einen neuen Umfragebeitrag: <br/><br/>{poll_answer}<br/><br/>Aktuelle Ergebnisse: <br/>{poll_result} <br/>---<br/> Diese Nachricht wurde von {site_url} gesendet.",
							Powerform::DOMAIN
						),
					),
				);

			} else {
				$id    = isset( $_GET['id'] ) ? intval( $_GET['id'] ) : null; // WPCS: CSRF ok.
				if ( ! is_null( $id ) ) {
					$model = Powerform_Poll_Form_Model::model()->load( $id );
				}
				$answers = array();
				if ( is_object( $model ) ) {
					foreach ( (array) $model->get_fields() as $field ) {
						$a = array(
							'title'      => $field->title,
							'element_id' => $field->element_id,
						);
						if ( filter_var( $field->use_extra, FILTER_VALIDATE_BOOLEAN ) === true ) {
							$a['use_extra'] = true;
							$a['extra']     = $field->extra;
						}
						$answers[] = $a;
					}
				}

				// Load stored record
				$settings = apply_filters( 'powerform_poll_settings', $model->settings, $model, $data, $this );

				$data['currentForm'] = array(
					'answers'  => $answers,
					'settings' => array_merge(
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

		$data['modules']['polls'] = array(
			'new_form_url'  => menu_page_url( $this->page_edit, false ),
			'form_list_url' => menu_page_url( $this->page, false ),
			'preview_nonce' => wp_create_nonce( 'powerform_popup_preview_polls' )
		);

		return apply_filters( 'powerform_poll_admin_data', $data, $model, $this );
	}

	/**
	 * Localize modules
	 *
	 * @since 1.0
	 * @param $data
	 *
	 * @return mixed
	 */
	public function add_l10n_strings( $data ) {

		$data['polls'] = array(
			'poll'								=> __( 'Umfrage', Powerform::DOMAIN ),

			// Appearance » Poll results behaviour
			'poll_results_behav'				=> __( 'Verhalten der Umfrageergebnisse', Powerform::DOMAIN ),
			'link_on'							=> __( 'Link zur Umfrage', Powerform::DOMAIN ),
			'show_after'						=> __( 'Zeige nach Abstimmung', Powerform::DOMAIN ),
			'not_show'							=> __( 'Zeig nicht', Powerform::DOMAIN ),

			// Appearance » Poll results style
			'poll_results_style'				=> __( 'Stil der Umfrageergebnisse', Powerform::DOMAIN ),
			"chart_bar"							=> __( "Balkendiagramm", Powerform::DOMAIN ),
			"chart_pie"							=> __( "Kuchendiagramm", Powerform::DOMAIN ),

			// Appearance » Submission
			'submission'						=> __( 'Einreichung', Powerform::DOMAIN ),
			'submission_notice'					=> __( 'Aktiviere AJAX, um eine Aktualisierung beim Senden von Umfragedaten zu verhindern.', Powerform::DOMAIN ),
			'enable_ajax'						=> __( 'Aktiviere AJAX', Powerform::DOMAIN ),

			// Appearance » Poll votes count
			'poll_votes_count'					=> __( 'Umfragestimmen zählen', Powerform::DOMAIN ),
			'show_votes'						=> __( 'Anzahl der Stimmen anzeigen', Powerform::DOMAIN ),
			'poll_votes_count_description'		=> __( 'Aktiviere diese Option, um die Anzahl der Stimmen in den Balkendiagrammergebnissen anzuzeigen.', Powerform::DOMAIN ),

			// Appearance » Poll votes limit
			'poll_votes_limit'					=> __( 'Umfragestimmenlimit', Powerform::DOMAIN ),
			'enable_limit'						=> __( 'Erlaube demselben Besucher, mehr als einmal abzustimmen', Powerform::DOMAIN ),
			'how_long'							=> __( 'Wie lange dauert es, bis der Benutzer erneut abstimmen kann?', Powerform::DOMAIN ),

			// Appearance » Poll privacy
			'poll_privacy'						=> __( 'Umfrage Datenschutz', Powerform::DOMAIN ),
			'how_long_privacy'					=> __( 'Wie lange behältst Du die IP-Adresse des Benutzers?', Powerform::DOMAIN ),
			'enable_ip_address_retention'		=> __( "Aktiviere die Beibehaltung der IP-Adresse", Powerform::DOMAIN ),

			// Appearance » Poll design
			'poll_design'						=> __( 'Umfragedesign', Powerform::DOMAIN ),
			'poll_design_description'			=> __( "Wähle einen vorgefertigten Stil für Deine Umfrage und passe das Erscheinungsbild weiter an", Powerform::DOMAIN ),
			'vanilla_message'					=> __( 'Vanilla Theme bietet ein klares Design (ohne Stile) und ein einfaches Markup.', Powerform::DOMAIN ),
			'customize_poll_colors'				=> __( 'Passe Umfragefarben an', Powerform::DOMAIN ),
			'customize_poll_container'			=> __( 'Passe Umfragecontainer an', Powerform::DOMAIN ),
			'enable_box_shadow'					=> __( 'Füge Umfragecontainer einen Boxschatten hinzu', Powerform::DOMAIN ),

			// Appearance » Customize poll colors
			'poll_container'					=> __( 'Abfragecontainer', Powerform::DOMAIN ),
			'poll_content'						=> __( 'Inhalt der Umfrage', Powerform::DOMAIN ),
			'description_color'					=> __( 'Beschreibung Farbe', Powerform::DOMAIN ),
			'question_color'					=> __( 'Frage Farbe', Powerform::DOMAIN ),
			'poll_answer'						=> __( 'Umfrageantwort', Powerform::DOMAIN ),
			'custom_answer'						=> __( 'Benutzerdefinierte Antwort', Powerform::DOMAIN ),
			'poll_button'						=> __( 'Umfrageschaltfläche', Powerform::DOMAIN ),
			'poll_link'							=> __( 'Umfrage-Link', Powerform::DOMAIN ),

			// CLEAN-UP (OLD)
			"add_answer"					 => __( "Antwort hinzufügen", Powerform::DOMAIN ),
			"answer_placeholder"             => __( "Umfrageantwort eingeben", Powerform::DOMAIN ),
			"custom_input_placeholder_label" => __( "Platzhalter für benutzerdefinierte Eingabe", Powerform::DOMAIN ),
			"custom_input_placeholder"       => __( "Gib einen Platzhalter ein...", Powerform::DOMAIN ),
			"add_custom_field"               => __( "Benutzerdefiniertes Eingabefeld hinzufügen", Powerform::DOMAIN ),
			"remove_custom_field"            => __( "Benutzerdefiniertes Eingabefeld entfernen", Powerform::DOMAIN ),
			"delete_answer"                  => __( "Antwort löschen", Powerform::DOMAIN ),
			"details"                        => __( "Details", Powerform::DOMAIN ),
			"appearance"                     => __( "Darstellung", Powerform::DOMAIN ),
			"preview"                        => __( "Vorschau", Powerform::DOMAIN ),
			"details_title"                  => __( "Details", Powerform::DOMAIN ),
			"poll_title"                     => __( "Titel", Powerform::DOMAIN ),
			"poll_desc"                      => __( "Beschreibung", Powerform::DOMAIN ),
			"poll_question"                  => __( "Frage", Powerform::DOMAIN ),
			"poll_button"                    => __( "Schaltflächenbeschriftung", Powerform::DOMAIN ),
			"poll_title_placeholder"         => __( "Titel eingeben", Powerform::DOMAIN ),
			"poll_desc_placeholder"          => __( "Beschreibung eingeben", Powerform::DOMAIN ),
			"poll_question_placeholder"      => __( "Gib den Fragentitel ein", Powerform::DOMAIN ),
			"poll_button_placeholder"			=> __( "Z.B. Abstimmung", Powerform::DOMAIN ),
			"appearance_title"					=> __( "Umfrage-Darstellung", Powerform::DOMAIN ),

			"validate_form_name"				=> __( "Der Formularname darf nicht leer sein! Bitte wähle einen Namen für Deine Umfrage.", Powerform::DOMAIN ),
			"validate_form_question"			=> __( "Umfragefrage darf nicht leer sein! Bitte füge Fragen für Deine Umfrage hinzu.", Powerform::DOMAIN ),
			"validate_form_answers"				=> __( "Umfrageantworten dürfen nicht leer sein! Bitte füge Deiner Umfrage Antworten hinzu.", Powerform::DOMAIN ),
			"back"								=> __( "Zurück", Powerform::DOMAIN ),
			"cancel"							=> __( "Abbrechen", Powerform::DOMAIN ),
			"continue"							=> __( "Fortsetzen", Powerform::DOMAIN ),
			"finish"							=> __( "Fertig", Powerform::DOMAIN ),

			"poll_title_desc"					=> __( "Dieser Name wird in Deiner Umfrage nicht angezeigt, hilft Dir jedoch bei der Identifizierung.", Powerform::DOMAIN ),
			"poll_question_desc"				=> __( "Dies ist die Frage, die Du den Benutzern stellen wirst.", Powerform::DOMAIN ),

			"answer_color"						=> __( "Antwort (Schriftfarbe)", Powerform::DOMAIN ),
			"button_styles"						=> __( "Schaltflächenstile", Powerform::DOMAIN ),
			"results_link"						=> __( "Ergebnislink", Powerform::DOMAIN ),
			"results_link_hover"				=> __( "Ergebnislink (Hover)", Powerform::DOMAIN ),
			"results_link_active"				=> __( "Ergebnislink (aktiv)", Powerform::DOMAIN ),
		);

		return $data;
	}
}