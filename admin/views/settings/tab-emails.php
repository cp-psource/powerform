<?php
$section = isset( $_GET['section'] ) ? $_GET['section'] : 'dashboard'; // wpcs csrf ok.

$sender_email_address = get_global_sender_email_address();
$sender_name = get_global_sender_name();
?>

<div class="sui-box" data-nav="emails" style="<?php echo esc_attr( 'emails' !== $section ? 'display: none;' : '' ); ?>">

	<div class="sui-box-header">
		<h2 class="sui-box-title"><?php esc_html_e( 'Emails', Powerform::DOMAIN ); ?></h2>
	</div>

	<form class="powerform-settings-save" action="">

		<div class="sui-box-body">

			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Von Kopfzeilen', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Wähle den Standard-Absendernamen und die Absender-E-Mail-Adresse für alle Deine ausgehenden E-Mails von Powerform.', Powerform::DOMAIN ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">

					<div class="sui-form-field">

						<label for="powerform-settings--sender-email" class="sui-label"><?php esc_html_e( 'E-Mail-Adresse des Absenders', Powerform::DOMAIN ); ?></label>
						<input type="email"
							name="sender_email"
							placeholder="<?php esc_html_e( 'Email eingeben', Powerform::DOMAIN ); ?>"
							value="<?php echo esc_html( $sender_email_address ); ?>"
							id="powerform-settings--sender-email"
							class="sui-form-control powerform-required" />
						<span class="sui-error-message" style="display: none;"><?php esc_html_e( 'Bitte gib eine gültige E-Mail-Adresse ein.', Powerform::DOMAIN ); ?></span>

					</div>

					<div class="sui-form-field">

						<label for="powerform-settings--sender-name" class="sui-label"><?php esc_html_e( 'Absender', Powerform::DOMAIN ); ?></label>
						<input type="text"
							name="sender_name"
							placeholder="<?php esc_html_e( 'Name eingeben', Powerform::DOMAIN ); ?>"
							value="<?php echo esc_html( $sender_name ); ?>"
							id="powerform-settings--sender-name"
							class="sui-form-control powerform-required" />
						<span class="sui-error-message" style="display: none;"><?php esc_html_e( 'Die Absender-E-Mail darf nicht leer sein.', Powerform::DOMAIN ); ?></span>

					</div>

				</div>

			</div>

		</div>

		<div class="sui-box-footer">

			<div class="sui-actions-right">

				<button type="submit" class="sui-button sui-button-blue wpmudev-action-done" data-title="<?php esc_attr_e( "Email Einstellungen", Powerform::DOMAIN ); ?>" data-action="email_settings" data-nonce="<?php echo wp_create_nonce( 'powerform_save_popup_email_settings' ); // WPCS: XSS ok. ?>">
					<span class="sui-loading-text"><?php esc_html_e( 'Einstellungen speichern', Powerform::DOMAIN ); ?></span>
					<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>
				</button>

			</div>

		</div>

	</form>

</div>