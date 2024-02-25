<?php
$section = isset( $_GET['section'] ) ? $_GET['section'] : 'dashboard'; // wpcs csrf ok.

$captcha_key      = get_option( "powerform_captcha_key", "" );
$captcha_secret   = get_option( "powerform_captcha_secret", "" );
$captcha_language = get_option( "powerform_captcha_language", "" );
$captcha_theme    = get_option( "powerform_captcha_theme", "" );
$nonce            = wp_create_nonce( 'powerform_save_popup_captcha' );

$new = true;
?>

<div class="sui-box" data-nav="recaptcha" style="<?php echo esc_attr( 'recaptcha' !== $section ? 'display: none;' : '' ); ?>">

	<div class="sui-box-header">
		<h2 class="sui-box-title"><?php esc_html_e( 'Google reCAPTCHA', Powerform::DOMAIN ); ?></h2>
	</div>

	<form class="powerform-settings-save" action="">

		<div class="sui-box-body">

			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Referenzen', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Du musst hier reCAPTCHA-Anmeldeinformationen eingeben, um das reCAPTCHA-Formularfeld zu verwenden.', Powerform::DOMAIN ); ?></span>
					&nbsp;
					<span class="sui-description"><?php printf( esc_html( __( "Hinweis: Klicke %1\$hier%2\$s, um Deine Webseite bei der reCAPTCHA-API zu registrieren und Anmeldeinformationen zu generieren.", Powerform::DOMAIN ) ), '<a href="https://www.google.com/recaptcha/admin#list" target="_blank">', '</a>' ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">

					<div class="sui-form-field">
						<label for="captcha_key" class="sui-label"><?php esc_html_e( 'Webseite-Schlüssel', Powerform::DOMAIN ); ?></label>
						<input type="text"
							name="captcha_key"
							placeholder="<?php esc_html_e( 'Gib hier Deinen Webseite-Schlüssel ein', Powerform::DOMAIN ); ?>"
							value="<?php echo esc_attr( $captcha_key ); ?>"
							id="captcha_key"
							class="sui-form-control" />
					</div>

					<div class="sui-form-field">
						<label for="captcha_secret" class="sui-label"><?php esc_html_e( 'Geheimer Schlüssel', Powerform::DOMAIN ); ?></label>
						<input type="text"
							name="captcha_secret"
							placeholder="<?php esc_html_e( 'Gib hier Deinen geheimen Schlüssel ein', Powerform::DOMAIN ); ?>"
							value="<?php echo esc_attr( $captcha_secret ); ?>"
							id="captcha_secret"
							class="sui-form-control" />
					</div>

					<div class="sui-form-field">
						<label for="captcha_language" class="sui-label"><?php esc_html_e( 'Sprache', Powerform::DOMAIN ); ?></label>
						<select name="captcha_language" id="captcha_language" class="sui-select">
							<?php $languages = powerform_get_captcha_languages(); ?>
							<?php foreach ( $languages as $key => $lang ): ?>
								<option value="<?php echo $key; ?>" <?php if ( $key === $captcha_language ) { echo ' selected="selected"'; } ?>><?php echo $lang; ?></option>
							<?php endforeach; ?>
						</select>
						<span class="sui-description"><?php esc_html_e( 'Standardmäßig zeigen wir das reCAPTCHA in der Sprache Deiner Webseite an.', Powerform::DOMAIN ); ?></span>
					</div>

					<div class="sui-form-field">
						<label for="captcha_theme" class="sui-label"><?php esc_html_e( 'Theme', Powerform::DOMAIN ); ?></label>
						<select name="captcha_theme" id="captcha_theme">
							<option value="light" <?php if ( 'light' === $captcha_theme ) echo 'selected="selected"'; ?>>Hell</option>
							<option value="dark" <?php if ( 'dark' === $captcha_theme ) echo 'selected="selected"'; ?>>Dunkel</option>
						</select>
					</div>

				</div>

			</div>

			<div class="sui-box-settings-row">

				<div class="sui-box-settings-col-1">
					<span class="sui-settings-label"><?php esc_html_e( 'Verbindungstest', Powerform::DOMAIN ); ?></span>
					<span class="sui-description"><?php esc_html_e( 'Nachdem Du Deine Anmeldeinformationen gespeichert hast, sollte eine Vorschau von reCAPTCHA ohne Fehler zu sehen sein.', Powerform::DOMAIN ); ?></span>
				</div>

				<div class="sui-box-settings-col-2">

					<label class="sui-label"><?php esc_html_e( 'reCAPTCHA Vorschau', Powerform::DOMAIN ); ?></label>

					<div id="recaptcha-preview" class="sui-border-frame">
						<p class="fui-loading-dialog">
							<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>
						</p>
					</div>

					<span class="sui-description"><?php printf( esc_html( __( "Wenn Fehler auftreten, vergewissere Dich, dass die von Dir eingegebenen Schlüssel gültig sind und Du Deinen Domainnamen beim Generieren der Schlüssel angegeben hast. Klicke %1\$hier%2\$s, um das reCAPTCHA-Admin-Panel zu öffnen.", Powerform::DOMAIN ) ), '<a href="https://www.google.com/recaptcha/admin" target="_blank">', '</a>' ); ?></span>

				</div>

			</div>

		</div>

		<div class="sui-box-footer">

			<div class="sui-actions-right">

				<button class="sui-button sui-button-blue wpmudev-action-done" data-title="<?php esc_attr_e( "reCaptcha-Einstellungen", Powerform::DOMAIN ); ?>" data-action="captcha"  data-nonce="<?php echo esc_attr( $nonce ); ?>">
					<span class="sui-loading-text"><?php esc_html_e( 'Einstellungen speichern', Powerform::DOMAIN ); ?></span>
					<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>
				</button>

			</div>

		</div>

	</form>

</div>