<div class="wp-suggested-text">
	<h2><?php esc_html_e( 'Bei welchen Tests werden personenbezogene Daten erhoben?', Powerform::DOMAIN ); ?></h2>
	<p class="privacy-policy-tutorial">
		<?php esc_html_e(
			'Wenn Du Powerformulare zum Erstellen und Einbetten von Tests auf Deiner Webseite verwendest, musst Du dies möglicherweise hier erwähnen, um es von anderen Tests zu unterscheiden.',
			Powerform::DOMAIN
		); ?>
	</p>

	<h2><?php esc_html_e( 'Welche personenbezogenen Daten erheben wir und warum?', Powerform::DOMAIN ); ?></h2>
	<p class="privacy-policy-tutorial">
		<?php _e( 'Standardmäßig erfasst Powerform <strong>KEINE persönlich identifizierbaren Informationen</strong> für jede Test-Einreichung.', Powerform::DOMAIN );// wpcs: xss ok. ?>
	</p>
	<p class="privacy-policy-tutorial">
		<?php esc_html_e(
			'In diesem Abschnitt solltest Du vermerken, welche personenbezogenen Daten Du gesammelt hast, einschließlich der verfügbaren Tests. Du solltest auch erklären, warum diese Daten benötigt werden. Gib die Rechtsgrundlage für Deine Datenerhebung an und beachte die aktive Einwilligung des Nutzers.',
			Powerform::DOMAIN
		); ?>
	</p>
	<p>
		<strong class="privacy-policy-tutorial"><?php esc_html_e( 'Vorgeschlagener Text: ', Powerform::DOMAIN ); ?></strong>
		<?php _e( 'Wenn Besucher oder Nutzer eine Testantwort einreichen, erfassen wir <strong>KEINE personenbezogenen Daten</strong>.', Powerform::DOMAIN );// wpcs: xss
		// ok. ?>
	</p>

	<h2><?php esc_html_e( 'Wie lange wir Deine Daten aufbewahren', Powerform::DOMAIN ); ?></h2>
	<p class="privacy-policy-tutorial">
		<?php _e(
			'Standardmäßig speichert Powerform alle Quizantworten und <strong>für immer</strong>. Du kannst diese Einstellung in <strong>Powerform</strong> &raquo; <strong>Einstellungen</strong> &raquo; <strong>Daten</strong> anpassen', Powerform::DOMAIN
		);// wpcs: xss ok. ?>
	</p>
	<p>
		<strong class="privacy-policy-tutorial"><?php esc_html_e( 'Vorgeschlagener Text: ', Powerform::DOMAIN ); ?></strong>
		<?php _e( 'Wenn Besucher oder Nutzer einen Test beantworten, bewahren wir die <strong>Antwortdaten</strong> 30 Tage lang auf und entfernen sie dann aus unserem System.', Powerform::DOMAIN ); // wpcs: xss ok. ?>
	</p>
	<h2><?php esc_html_e( 'Wohin wir Deine Daten senden', Powerform::DOMAIN ); ?></h2>
	<p>
		<strong class="privacy-policy-tutorial"><?php esc_html_e( 'Vorgeschlagener Text: ', Powerform::DOMAIN ); ?></strong>
		<?php esc_html_e( 'Alle gesammelten Daten können öffentlich angezeigt werden und wir senden sie an unsere Mitarbeiter oder Auftragnehmer, um die erforderlichen Maßnahmen basierend auf den Antworten durchzuführen.', Powerform::DOMAIN ); ?>
	</p>
	<h2><?php esc_html_e( 'Dritte', Powerform::DOMAIN ); ?></h2>
	<p class="privacy-policy-tutorial">
		<?php esc_html_e(
			'Wenn Dein Test entweder integrierte oder externe Dienste von Drittanbietern verwendet, solltest Du in diesem Abschnitt alle Drittanbieter und deren Datenschutzrichtlinien erwähnen.', Powerform::DOMAIN
		); ?>
	</p>
	<p class="privacy-policy-tutorial">
		<?php esc_html_e( 'Standardmäßig können Powerform Tests so konfiguriert werden, dass sie sich mit diesen Drittanbietern verbinden:' ); ?>
	</p>
	<ul class="privacy-policy-tutorial">
		<li><?php esc_html_e( 'Zapier. Aktiviert, wenn Du Zapier in den Integrationseinstellungen aktiviert und eingerichtet hast.' ); ?></li>
		<li><?php esc_html_e( 'Google Drive. Aktiviert, wenn Du Google Drive in den Integrationseinstellungen aktiviert und eingerichtet hast.' ); ?></li>
		<li><?php esc_html_e( 'Trello. Aktiviert, wenn Du Trello in den Integrationseinstellungen aktiviert und eingerichtet hast.' ); ?></li>
		<li><?php esc_html_e( 'Locker. Aktiviert, wenn Du Slack in den Integrationseinstellungen aktiviert und eingerichtet hast.' ); ?></li>
	</ul>
	<p>
		<strong class="privacy-policy-tutorial"><?php esc_html_e( 'Vorgeschlagener Text: ', Powerform::DOMAIN ); ?></strong>
	<p><?php esc_html_e( 'Wir verwenden Zapier, um unsere Integrationsdaten zu verwalten. Ihre Datenschutzerklärung findest Du hier: https://zapier.com/privacy/.', Powerform::DOMAIN ); ?></p>

	<p>
		<?php esc_html_e(
			'Wir verwenden Google Drive und Google Sheet, um unsere Integrationsdaten zu verwalten. Ihre Datenschutzerklärung findest Du hier: https://policies.google.com/privacy?hl=en.', Powerform::DOMAIN
		); ?>
	</p>
	<p><?php esc_html_e( 'Wir verwenden Trello, um unsere Integrationsdaten zu verwalten. Ihre Datenschutzerklärung findest Du hier: https://trello.com/privacy.', Powerform::DOMAIN ); ?></p>
	<p><?php esc_html_e( 'Wir verwenden Slack, um unsere Integrationsdaten zu verwalten. Ihre Datenschutzerklärung findest Du hier: https://slack.com/privacy-policy.', Powerform::DOMAIN ); ?></p>
	</p>
</div>