<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Admin_L10n
 *
 * @since 1.0
 */
class Powerform_Admin_L10n {

	public $powerform = null;

	public function __construct() {
	}

	public function get_l10n_strings() {
		$l10n = $this->admin_l10n();

		$admin_locale   = require_once powerform_plugin_dir() . 'admin/locale.php';

		$locale         = array(
			'' => array(
				'localeSlug' => 'default',
			),
		);

		$l10n['locale'] = array_merge( $locale, (array) $admin_locale );


		return apply_filters( 'powerform_l10n', $l10n );
	}

	/**
	 * Default Admin properties
	 *
	 * @return array
	 */
	public function admin_l10n() {
		return array(
			"popup"         => array(
				"form_name_label"       => __( "Benenne Dein Formular", Powerform::DOMAIN ),
				"form_name_placeholder" => __( "Z.B. Kontakt Formular", Powerform::DOMAIN ),
				"name"                  => __( "Name", Powerform::DOMAIN ),
				"fields"                => __( "Felder", Powerform::DOMAIN ),
				"date"                  => __( "Datum", Powerform::DOMAIN ),
				"clear_all"             => __( "Alles löschen", Powerform::DOMAIN ),
				"your_exports"          => __( "Deine Exporte", Powerform::DOMAIN ),
				"edit_login_form"       => __( "Anmelde- oder Registrierungsformular bearbeiten", Powerform::DOMAIN ),
				"edit_scheduled_export" => __( "Geplanten Export bearbeiten", Powerform::DOMAIN ),
				"frequency"             => __( "Frequenz", Powerform::DOMAIN ),
				"daily"                 => __( "Täglich", Powerform::DOMAIN ),
				"weekly"                => __( "Wöchentlich", Powerform::DOMAIN ),
				"monthly"               => __( "Monatlich", Powerform::DOMAIN ),
				"week_day"              => __( "Wochentag", Powerform::DOMAIN ),
				"monday"                => __( "Montag", Powerform::DOMAIN ),
				"tuesday"               => __( "Dienstag", Powerform::DOMAIN ),
				"wednesday"             => __( "Mittwoch", Powerform::DOMAIN ),
				"thursday"              => __( "Donnerstag", Powerform::DOMAIN ),
				"friday"                => __( "Freitag", Powerform::DOMAIN ),
				"saturday"              => __( "Samstag", Powerform::DOMAIN ),
				"sunday"                => __( "Sonntag", Powerform::DOMAIN ),
				"day_time"              => __( "Tageszeit", Powerform::DOMAIN ),
				"email_to"              => __( "E-Mail-Exportdaten an", Powerform::DOMAIN ),
				"email_placeholder"     => __( "Z.B. john@doe.com", Powerform::DOMAIN ),
				"schedule_help"         => __( "Lasse das Feld leer, wenn Du keine Exporte per E-Mail erhalten möchtest.", Powerform::DOMAIN ),
				"congratulations"       => __( "Herzliche Glückwünsche!", Powerform::DOMAIN ),
				"is_ready"              => __( "ist bereit!", Powerform::DOMAIN ),
				"new_form_desc"         => __( "Füge es zu jedem Beitrag/jeder Seite hinzu, indem Du auf die Schaltfläche Powerformulare klickst, oder richte es als Widget ein.", Powerform::DOMAIN ),
				"paypal_settings"       => __( "Bearbeite PayPal-Anmeldeinformationen", Powerform::DOMAIN ),
				"preview_cforms"        => __( "Vorschau Formular", Powerform::DOMAIN ),
				"preview_polls"         => __( "Vorschau Umfrage", Powerform::DOMAIN ),
				"preview_quizzes"       => __( "Vorschau Test", Powerform::DOMAIN ),
				"captcha_settings"      => __( "Bearbeite die reCAPTCHA-Anmeldeinformationen", Powerform::DOMAIN ),
				"currency_settings"     => __( "Standardwährung bearbeiten", Powerform::DOMAIN ),
				"pagination_entries"    => __( "Einsendungen | Paginierungseinstellungen", Powerform::DOMAIN ),
				"pagination_listings"   => __( "Listen | Paginierungseinstellungen", Powerform::DOMAIN ),
				"email_settings"        => __( "Email Einstellungen", Powerform::DOMAIN ),
				"uninstall_settings"    => __( "Deinstallieren Einstellungen", Powerform::DOMAIN ),
				"privacy_settings"      => __( "Datenschutzeinstellungen", Powerform::DOMAIN ),
				"validate_form_name"    => __( "Der Formularname darf nicht leer sein! Bitte wähle einen Namen für Dein Formular.", Powerform::DOMAIN ),
				"close"                 => __( "Schließen", Powerform::DOMAIN ),
				"close_label"           => __( "Schließe dieses Dialogfenster", Powerform::DOMAIN ),
				'records'               => __( "Aufzeichnungen", Powerform::DOMAIN ),
				"delete"                => __( "Löschen", Powerform::DOMAIN ),
				"confirm"               => __( "Bestätigen", Powerform::DOMAIN ),
				"are_you_sure"          => __( "Bist du sicher?", Powerform::DOMAIN ),
				"cannot_be_reverted"    => __( "Beachte, dass diese Aktion nicht rückgängig gemacht werden kann.", Powerform::DOMAIN ),
				"are_you_sure_form"     => __( "Möchtest Du dieses Formular wirklich dauerhaft löschen?", Powerform::DOMAIN ),
				"confirm_action"        => __( "Bitte bestätige dass Du diese Aktion ausführen möchtest.", Powerform::DOMAIN ),
				"confirm_title"         => __( "Aktion bestätigen", Powerform::DOMAIN ),
				"confirm_field_delete"  => __( "Bitte bestätige dass Du dieses Feld löschen möchtest", Powerform::DOMAIN ),
				"cancel"                => __( "Abbrechen", Powerform::DOMAIN ),
				"save_alert"            => __( "Die von Dir vorgenommenen Änderungen können verloren gehen, wenn Du von dieser Seite weg navigierst.", Powerform::DOMAIN ),
				"save_changes"          => __( "Änderungen speichern", Powerform::DOMAIN ),
				"export_cform"          => __( "Formular exportieren", Powerform::DOMAIN ),
				"export_poll"           => __( "Umfrage exportieren", Powerform::DOMAIN ),
				"export_quiz"           => __( "Test exportieren", Powerform::DOMAIN ),
				"import_cform"          => __( "Formular importieren", Powerform::DOMAIN ),
				"import_poll"           => __( "Umfrage importieren", Powerform::DOMAIN ),
				"import_quiz"           => __( "Test importieren", Powerform::DOMAIN ),
				'enable_scheduled_export' => __( 'Geplante Exporte aktivieren', Powerform::DOMAIN ),
				'scheduled_export_if_new' => __( 'Sende eine E-Mail nur, wenn neue Beiträge vorliegen', Powerform::DOMAIN ),
				"download_csv"            => __( 'Lade CSV herunter', Powerform::DOMAIN ),
				"scheduled_exports"       => __( 'Geplante Exporte', Powerform::DOMAIN ),
				"manual_exports"          => __( 'Manuelle Exporte', Powerform::DOMAIN ),
				"manual_description"      => __( 'Lade die Einsendungsliste im CSV-Format herunter.', Powerform::DOMAIN ),
				"scheduled_description"   => __( 'Aktiviere geplante Exporte, um die Übermittlungsliste in Deiner E-Mail abzurufen.', Powerform::DOMAIN ),
				"disable"                 => __( 'Deaktivieren', Powerform::DOMAIN ),
				"enable"                  => __( 'Aktivieren', Powerform::DOMAIN ),
				"enter_name"              => __( 'Gib einen Namen ein', Powerform::DOMAIN ),
				"new_form_desc2"          => __( 'Benenne Dein neues Formular und beginne mit dem Erstellen!', Powerform::DOMAIN ),
				"new_poll_desc2"          => __( 'Benenne Deine neue Umfrage und beginne mit dem Aufbau!', Powerform::DOMAIN ),
				"new_quiz_desc2"          => __( 'Wähle aus, ob Du Teilnehmerdaten (z. B. Name, E-Mail usw.) in Deinem Test erfassen möchtest'),
				"input_label"             => __( 'Eingabeetikett', Powerform::DOMAIN ),
				"form_name_validation"    => __( 'Der Formularname darf nicht leer sein.', Powerform::DOMAIN ),
				"poll_name_validation"    => __( 'Der Name der Umfrage darf nicht leer sein.', Powerform::DOMAIN ),
				"quiz_name_validation"    => __( 'Der Test-Name darf nicht leer sein.', Powerform::DOMAIN ),
				"new_form_placeholder"    => __( 'Z.B. Leeres Formular', Powerform::DOMAIN ),
				"new_poll_placeholder"    => __( 'Z.B. Leere Umfrage', Powerform::DOMAIN ),
				"new_quiz_placeholder"    => __( 'Z.B. Mein großartiges Test', Powerform::DOMAIN ),
				"create"                  => __( 'Erstellen', Powerform::DOMAIN ),
				'reset'                   => __( 'ZURÜCKSETZEN', Powerform::DOMAIN ),
			),
			"quiz"          => array(
				"choose_quiz_title"       => __( 'Wähle Test-Typ', Powerform::DOMAIN ),
				"choose_quiz_description" => __( "Beginnen wir damit, Deinem Test einen Namen zu geben und den geeigneten Test-Typ basierend auf Deinem Ziel auszuwählen.", Powerform::DOMAIN ),
				"knowledge_label"         => __( 'Wissens-Test', Powerform::DOMAIN ),
				"knowledge_description"   => __( 'Teste das Wissen Deiner Besucher zu einem Thema und die endgültige Punktzahl wird anhand der Anzahl der richtigen Antworten berechnet. Z.B. Teste Deine Musikkenntnisse.', Powerform::DOMAIN ),
				"nowrong_label"           => __( 'Persönlichkeits-Test', Powerform::DOMAIN ),
				"nowrong_description"     => __( "Zeige je nach den Antworten des Besuchers unterschiedliche Ergebnisse. Es gibt keine falschen Antworten. Z.B. Welcher Superheld bist du?", Powerform::DOMAIN ),
				"continue_button"         => __( 'Fortfahren', Powerform::DOMAIN ),
			),
			"sidebar"       => array(
				"label"         => __( "Etikett", Powerform::DOMAIN ),
				"value"         => __( "Wert", Powerform::DOMAIN ),
				"add_option"    => __( "Option hinzufügen", Powerform::DOMAIN ),
				"delete"        => __( "Löschen", Powerform::DOMAIN ),
				"pick_field"    => __( "Wähle ein Feld", Powerform::DOMAIN ),
				"field_will_be" => __( "Dieses Feld wird", Powerform::DOMAIN ),
				"wenn"            => __( "wenn", Powerform::DOMAIN ),
				"shown"         => __( "Angezeigt", Powerform::DOMAIN ),
				"hidden"        => __( "Versteckt", Powerform::DOMAIN ),
			),
			"colors"        => array(
				"poll_shadow"       => __( "Umfrage Schatten", Powerform::DOMAIN ),
				"title"             => __( "Titeltext", Powerform::DOMAIN ),
				"question"          => __( "Fragetext", Powerform::DOMAIN ),
				"answer"            => __( "Antworttext", Powerform::DOMAIN ),
				"input_background"  => __( "Eingabefeld BG", Powerform::DOMAIN ),
				"input_border"      => __( "Eingabefeldrahmen", Powerform::DOMAIN ),
				"input_placeholder" => __( "Platzhalter für Eingabefelder", Powerform::DOMAIN ),
				"input_text"        => __( "Eingabefeldtext", Powerform::DOMAIN ),
				"btn_background"    => __( "Schaltflächenhintergrund", Powerform::DOMAIN ),
				"btn_text"          => __( "Schaltflächentext", Powerform::DOMAIN ),
				"link_res"          => __( "Ergebnislink", Powerform::DOMAIN ),
			),
			"options"       => array(
				"browse"                => __( "Durchsuche", Powerform::DOMAIN ),
				"clear"                 => __( "Leeren", Powerform::DOMAIN ),
				"no_results"            => __( "Du hast noch keine Ergebnisse.", Powerform::DOMAIN ),
				"select_result"         => __( "Ergebnis auswählen", Powerform::DOMAIN ),
				"no_answers"            => __( "Du hast noch keine Antwort.", Powerform::DOMAIN ),
				"placeholder_image"     => __( "Klicke auf Durchsuchen, um ein Bild hinzuzufügen...", Powerform::DOMAIN ),
				"placeholder_image_alt" => __( "Klicke auf Durchsuchen, um ein Bild hinzuzufügen", Powerform::DOMAIN ),
				"placeholder_answer"    => __( "Füge hier eine Antwort hinzu", Powerform::DOMAIN ),
				"multiqs_empty"         => __( "Du hast noch keine Fragen.", Powerform::DOMAIN ),
				"add_question"          => __( "Frage hinzufügen", Powerform::DOMAIN ),
				"add_new_question"      => __( "Neue Frage hinzufügen", Powerform::DOMAIN ),
				"question_title"        => __( "Fragetitel", Powerform::DOMAIN ),
				"question_title_error"  => __( "Der Titel der Frage darf nicht leer sein! Bitte füge Deiner Frage einige Inhalte hinzu.", Powerform::DOMAIN ),
				"answers"               => __( "Antworten", Powerform::DOMAIN ),
				"add_answer"            => __( "Antwort hinzufügen", Powerform::DOMAIN ),
				"add_new_answer"        => __( "Neue Antwort hinzufügen", Powerform::DOMAIN ),
				"add_result"            => __( "Ergebnis hinzufügen", Powerform::DOMAIN ),
				"delete_result"         => __( "Ergebnis löschen", Powerform::DOMAIN ),
				"title"                 => __( "Titel", Powerform::DOMAIN ),
				"image"                 => __( "Bild (optional)", Powerform::DOMAIN ),
				"description"           => __( "Beschreibung", Powerform::DOMAIN ),
				"trash_answer"          => __( "Lösche diese Antwort", Powerform::DOMAIN ),
				"correct"               => __( "Korrekte Antwort", Powerform::DOMAIN ),
				"no_options"            => __( "Du hast noch keine Optionen.", Powerform::DOMAIN ),
				"delete"                => __( "Löschen", Powerform::DOMAIN ),
				"restricted_dates"      => __( "Eingeschränkte Daten:", Powerform::DOMAIN ),
				"add"                   => __( "Hinzufügen", Powerform::DOMAIN ),
				"custom_date"           => __( "Wähle benutzerdefinierte Daten aus, um Folgendes einzuschränken:", Powerform::DOMAIN ),
				"form_data"             => __( "Formulardaten", Powerform::DOMAIN ),
				"required_form_fields"  => __( "Benötigte Felder", Powerform::DOMAIN ),
				"optional_form_fields"  => __( "Optionale Felder", Powerform::DOMAIN ),
				"all_fields"            => __( "Alle übermittelten Felder", Powerform::DOMAIN ),
				"form_name"             => __( "Formularname", Powerform::DOMAIN ),
				"misc_data"             => __( "Verschiedene Daten", Powerform::DOMAIN ),
				"form_based_data"       => __( "Formulardaten hinzufügen", Powerform::DOMAIN ),
				"been_saved"            => __( "wurde gespeichert.", Powerform::DOMAIN ),
				"been_published"        => __( "wurde veröffentlicht.", Powerform::DOMAIN ),
				"error_saving"          => __( "Fehler! Formular kann nicht gespeichert werden." ),
				"default_value"         => __( "Standardwert", Powerform::DOMAIN ),
				"admin_email"           => get_option( 'admin_email' ),
				"delete_question"       => __( "Lösche diese Frage", Powerform::DOMAIN ),
				"remove_image"          => __( "Entferne Bild", Powerform::DOMAIN ),
				"answer_settings"       => __( "Zusätzliche Einstellungen anzeigen", Powerform::DOMAIN ),
				"add_new_result"        => __( "Neues Ergebnis hinzufügen", Powerform::DOMAIN ),
				"multiorder_validation" => __( "Du musst mindestens ein Ergebnis für dieses Quiz hinzufügen, damit Du die Ergebnispriorität neu anordnen kannst.", Powerform::DOMAIN ),
				"user_ip_address"       => __( "Benutzer-IP-Adresse", Powerform::DOMAIN ),
				"date"                  => __( "Datum", Powerform::DOMAIN ),
				"embed_id"              => __( "Beitrags-/Seiten-ID einbetten", Powerform::DOMAIN ),
				"embed_title"           => __( "Beitrag/Seitentitel einbetten", Powerform::DOMAIN ),
				"embed_url"             => __( "URL einbetten", Powerform::DOMAIN ),
				"user_agent"            => __( "HTTP User Agent", Powerform::DOMAIN ),
				"refer_url"             => __( "HTTP Refer URL", Powerform::DOMAIN ),
				"display_name"          => __( "Benutzer Anzeigename", Powerform::DOMAIN ),
				"user_email"            => __( "Benutzer Email", Powerform::DOMAIN ),
				"user_login"            => __( "Benutzer-Anmeldung", Powerform::DOMAIN ),
				"shortcode_copied"      => __( "Der Shortcode wurde erfolgreich kopiert.", Powerform::DOMAIN )
			),
			"commons"       => array(
				"color"                          => __( "Farbe", Powerform::DOMAIN ),
				"colors"                         => __( "Farben", Powerform::DOMAIN ),
				"border_color"                   => __( "Rahmenfarbe", Powerform::DOMAIN ),
				"border_color_hover"             => __( "Rahmenfarbe (Hover)", Powerform::DOMAIN ),
				"border_color_active"            => __( "Rahmenfarbe (Aktiv)", Powerform::DOMAIN ),
				"border_color_correct"           => __( "Rahmenfarbe (Korrekt)", Powerform::DOMAIN ),
				"border_color_incorrect"         => __( "Rahmenfarbe (Inkorrekt)", Powerform::DOMAIN ),
				"border_width"                   => __( "Rahmenbreite", Powerform::DOMAIN ),
				"border_style"                   => __( "Rahmenstil", Powerform::DOMAIN ),
				"background"                     => __( "Hintergrund", Powerform::DOMAIN ),
				"background_hover"               => __( "Hintergrund (Hover)", Powerform::DOMAIN ),
				"background_active"              => __( "Hintergrund (Aktiv)", Powerform::DOMAIN ),
				"background_correct"             => __( "Hintergrund (Korrekt)", Powerform::DOMAIN ),
				"background_incorrect"           => __( "Hintergrund (Inkorrekt)", Powerform::DOMAIN ),
				"font_color"                     => __( "Schriftfarbe", Powerform::DOMAIN ),
				"font_color_hover"               => __( "Schriftfarbe (Hover)", Powerform::DOMAIN ),
				"font_color_active"              => __( "Schriftfarbe (Aktiv)", Powerform::DOMAIN ),
				"font_color_correct"             => __( "Schriftfarbe (Korrekt)", Powerform::DOMAIN ),
				"font_color_incorrect"           => __( "Schriftfarbe (Inkorrekt)", Powerform::DOMAIN ),
				"font_background"                => __( "Schrift Hintergrund", Powerform::DOMAIN ),
				"font_background"                => __( "Schrift Hintergrund (Hover)", Powerform::DOMAIN ),
				"font_background_active"         => __( "Schrift Hintergrund (Aktiv)", Powerform::DOMAIN ),
				"font_family"                    => __( "Schriftfamilie", Powerform::DOMAIN ),
				"font_family_custom"             => __( "Benutzerdefinierte Schriftfamilie", Powerform::DOMAIN ),
				"font_family_placeholder"        => __( "Z.B. 'Arial', sans-serif", Powerform::DOMAIN ),
				"font_family_custom_description" => __( "Hier kannst Du die Schriftfamilie eingeben, die Du wie in CSS verwenden möchtest.", Powerform::DOMAIN ),
				"icon_size"                      => __( "Symbolgröße", Powerform::DOMAIN ),
				"enable"                         => __( "Aktivieren", Powerform::DOMAIN ),
				"dropdown"                       => __( "Dropdown-Liste", Powerform::DOMAIN ),
				"appearance"                     => __( "Darstellung", Powerform::DOMAIN ),
				"expand"                         => __( "Erweitern", Powerform::DOMAIN ),
				"placeholder"                    => __( "Platzhalter", Powerform::DOMAIN ),
				"preview"                        => __( "Vorschau", Powerform::DOMAIN ),
				"icon_color"                     => __( "Symbolfarbe", Powerform::DOMAIN ),
				"icon_color_hover"               => __( "Symbolfarbe (Hover)", Powerform::DOMAIN ),
				"icon_color_active"              => __( "Symbolfarbe (Aktiv)", Powerform::DOMAIN ),
				"icon_color_correct"             => __( "Symbolfarbe (Korrekt)", Powerform::DOMAIN ),
				"icon_color_incorrect"           => __( "Symbolfarbe (Inkorrekt)", Powerform::DOMAIN ),
				"box_shadow"                     => __( "Box Schatten", Powerform::DOMAIN ),
				"enable_settings"                => __( "Einstellungen aktivieren", Powerform::DOMAIN ),
				"font_size"                      => __( "Schriftgröße", Powerform::DOMAIN ),
				"font_weight"                    => __( "Schriftgewicht", Powerform::DOMAIN ),
				"text_align"                     => __( "Textausrichtung", Powerform::DOMAIN ),
				"regular"                        => __( "Regulär", Powerform::DOMAIN ),
				"medium"                         => __( "Mittel", Powerform::DOMAIN ),
				"large"                          => __( "Groß", Powerform::DOMAIN ),
				"light"                          => __( "Leicht", Powerform::DOMAIN ),
				"normal"                         => __( "Normal", Powerform::DOMAIN ),
				"bold"                           => __( "Fett", Powerform::DOMAIN ),
				"typography"                     => __( "Typografie", Powerform::DOMAIN ),
				"padding_top"                    => __( "Padding oben", Powerform::DOMAIN ),
				"padding_right"                  => __( "Padding rechts", Powerform::DOMAIN ),
				"padding_bottom"                 => __( "Padding unten", Powerform::DOMAIN ),
				"padding_left"                   => __( "Padding links", Powerform::DOMAIN ),
				"border_radius"                  => __( "Rahmenradius", Powerform::DOMAIN ),
				"date_placeholder"               => __( "20 April 2018", Powerform::DOMAIN ),
				"left"                           => __( "Links", Powerform::DOMAIN ),
				"center"                         => __( "Zentriert", Powerform::DOMAIN ),
				"right"                          => __( "Rechts", Powerform::DOMAIN ),
				"none"                           => __( "Nichts", Powerform::DOMAIN ),
				"solid"                          => __( "Solide", Powerform::DOMAIN ),
				"dashed"                         => __( "Gestrichelt", Powerform::DOMAIN ),
				"dotted"                         => __( "Gepunktet", Powerform::DOMAIN ),
				"delete_option"                  => __( "Option löschen", Powerform::DOMAIN ),
				"label"                          => __( "Etikett", Powerform::DOMAIN ),
				"value"                          => __( "Wert", Powerform::DOMAIN ),
				"reorder_option"                 => __( "Bestelle diese Option nach", Powerform::DOMAIN ),
				"powerform_ui"                  => __( "Powerformulare UI", Powerform::DOMAIN ),
				"vanilla_theme"                  => __( "Vanilla Theme", Powerform::DOMAIN ),
				"powerform_bold"                => __( "Powerform Fett", Powerform::DOMAIN ),
				"powerform_flat"                => __( "Powerform Flach", Powerform::DOMAIN ),
				"material_design"                => __( "Material Design", Powerform::DOMAIN ),
				"vanilla_message"                => __( "Vanilla Theme bietet Dir ein klares Design (ohne Stile) und ein einfaches Markup.", Powerform::DOMAIN ),
				"no_file_chosen"                 => __( "Keine Datei ausgewählt", Powerform::DOMAIN ),
				"update_successfully"            => __( "Erfolgreich gespeichert!", Powerform::DOMAIN ),
				"update_unsuccessfull"           => __( "Fehler! Einstellungen wurden nicht gespeichert.", Powerform::DOMAIN )
			),
			"social"        => array(
				"facebook"    => __( "Facebook", Powerform::DOMAIN ),
				"twitter"     => __( "Twitter", Powerform::DOMAIN ),
				"google_plus" => __( "Google+", Powerform::DOMAIN ),
				"linkedin"    => __( "LinkedIn", Powerform::DOMAIN ),
			),
			"calendar"      => array(
				"day_names_min" => array(
					esc_html__( 'So', Powerform::DOMAIN ),
					esc_html__( 'Mo', Powerform::DOMAIN ),
					esc_html__( 'Di', Powerform::DOMAIN ),
					esc_html__( 'Mi', Powerform::DOMAIN ),
					esc_html__( 'Do', Powerform::DOMAIN ),
					esc_html__( 'Fr', Powerform::DOMAIN ),
					esc_html__( 'Sa', Powerform::DOMAIN ),
				),
				"month_names"   => array(
					esc_html__( 'Jänner', Powerform::DOMAIN ),
					esc_html__( 'Februar', Powerform::DOMAIN ),
					esc_html__( 'März', Powerform::DOMAIN ),
					esc_html__( 'April', Powerform::DOMAIN ),
					esc_html__( 'Mai', Powerform::DOMAIN ),
					esc_html__( 'Juni', Powerform::DOMAIN ),
					esc_html__( 'Juli', Powerform::DOMAIN ),
					esc_html__( 'August', Powerform::DOMAIN ),
					esc_html__( 'September', Powerform::DOMAIN ),
					esc_html__( 'Oktober', Powerform::DOMAIN ),
					esc_html__( 'November', Powerform::DOMAIN ),
					esc_html__( 'Dezember', Powerform::DOMAIN ),
				),
				"day_names_min" => self::get_short_days_names(),
				"month_names"   => self::get_months_names(),
			),
			"exporter"      => array(
				"export_nonce" => wp_create_nonce( 'powerform_export' ),
				"form_id"      => powerform_get_form_id_helper(),
				"form_type"    => powerform_get_form_type_helper(),
				"enabled"      => filter_var( powerform_get_exporter_info( 'enabled', powerform_get_form_id_helper() . powerform_get_form_type_helper() ), FILTER_VALIDATE_BOOLEAN ),
				"interval"     => powerform_get_exporter_info( 'interval', powerform_get_form_id_helper() . powerform_get_form_type_helper() ),
				"month_day"    => powerform_get_exporter_info( 'month_day', powerform_get_form_id_helper() . powerform_get_form_type_helper() ),
				"day"          => powerform_get_exporter_info( 'day', powerform_get_form_id_helper() . powerform_get_form_type_helper() ),
				"hour"         => powerform_get_exporter_info( 'hour', powerform_get_form_id_helper() . powerform_get_form_type_helper() ),
				"email"        => powerform_get_exporter_info( 'email', powerform_get_form_id_helper() . powerform_get_form_type_helper() ),
				'if_new'       => powerform_get_exporter_info( 'if_new', powerform_get_form_id_helper() . powerform_get_form_type_helper() ),
			),
			"exporter_logs" => powerform_get_export_logs( powerform_get_form_id_helper() ),
		);
	}

	/**
	 * Get short days names html escaped and translated
	 *
	 * @since 1.5.4
	 * @return array
	 */
	public static function get_short_days_names() {
		return array(
			esc_html__( 'So', Powerform::DOMAIN ),
			esc_html__( 'Mo', Powerform::DOMAIN ),
			esc_html__( 'Di', Powerform::DOMAIN ),
			esc_html__( 'Mi', Powerform::DOMAIN ),
			esc_html__( 'Do', Powerform::DOMAIN ),
			esc_html__( 'Fr', Powerform::DOMAIN ),
			esc_html__( 'Sa', Powerform::DOMAIN ),
		);
	}

	/**
	 * Get months names html escaped and translated
	 *
	 * @since 1.5.4
	 * @return array
	 */
	public static function get_months_names() {
		return array(
			esc_html__( 'Jänner', Powerform::DOMAIN ),
			esc_html__( 'Februar', Powerform::DOMAIN ),
			esc_html__( 'März', Powerform::DOMAIN ),
			esc_html__( 'April', Powerform::DOMAIN ),
			esc_html__( 'Mai', Powerform::DOMAIN ),
			esc_html__( 'Juni', Powerform::DOMAIN ),
			esc_html__( 'Juli', Powerform::DOMAIN ),
			esc_html__( 'August', Powerform::DOMAIN ),
			esc_html__( 'September', Powerform::DOMAIN ),
			esc_html__( 'Oktober', Powerform::DOMAIN ),
			esc_html__( 'November', Powerform::DOMAIN ),
			esc_html__( 'Dezember', Powerform::DOMAIN ),
		);


	}

}