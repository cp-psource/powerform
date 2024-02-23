<?php
// Defaults
$vars = array(
	'token'               => '',
	'error_message'       => '',
	'client_id'           => '',
	'client_secret'       => '',
	'client_secret_error' => '',
	'client_id_error'     => '',
	'redirect_url'        => '',
);

/** @var array $template_vars */
foreach ( $template_vars as $key => $val ) {
	$vars[ $key ] = $val;
} ?>

<div class="integration-header">

	<h3 class="sui-box-title" id="dialogTitle2"><?php echo esc_html( sprintf( __( 'Setup %1$s Client', Powerform::DOMAIN ), 'Google Sheets' ) ); ?></h3>

	<?php if ( ! empty( $vars['token'] ) ) : ?>
		<span class="sui-description" style="margin-top: 20px;"><?php esc_html_e( 'Your Google Sheets account is already authorized. Edit info below to re-authorize.', Powerform::DOMAIN ); ?></span>
	<?php else : ?>
		<span class="sui-description" style="margin-top: 20px;">
			<?php esc_html_e( 'Setup Google Client to be used by Powerform to communicating with the Google Sheets server.', Powerform::DOMAIN ); ?>
		</span>
		<?php if ( ! empty( $vars['error_message'] ) ) : ?>
			<div class="sui-notice sui-notice-error">
				<p><?php echo esc_html( $vars['error_message'] ); ?></p>
			</div>
		<?php endif; ?>
	<?php endif ?>

</div>

<form>

	<div class="sui-form-field<?php echo esc_attr( ! empty( $vars['client_id_error'] ) ? ' sui-form-field-error' : '' ); ?>">

		<label class="sui-label"><?php esc_html_e( 'Client ID', Powerform::DOMAIN ); ?></label>

		<div class="sui-control-with-icon">

			<input name="client_id"
				placeholder="<?php echo esc_attr( __( 'Client ID', Powerform::DOMAIN ) ); ?>"
				value="<?php echo esc_attr( $vars['client_id'] ); ?>"
				class="sui-form-control" />

			<i class="sui-icon-profile-male" aria-hidden="true"></i>

		</div>

		<?php if ( ! empty( $vars['client_id_error'] ) ) : ?>
			<span class="sui-error-message"><?php echo esc_html( $vars['client_id_error'] ); ?></span>
		<?php endif; ?>

	</div>

	<div class="sui-form-field<?php echo esc_attr( ! empty( $vars['client_secret_error'] ) ? ' sui-form-field-error' : '' ); ?>">

		<label class="sui-label"><?php esc_html_e( 'Client Secret', Powerform::DOMAIN ); ?></label>

		<div class="sui-control-with-icon">

			<input name="client_secret"
				placeholder="<?php echo esc_attr( __( 'Client Secret', Powerform::DOMAIN ) ); ?>"
				value="<?php echo esc_attr( $vars['client_secret'] ); ?>"
				class="sui-form-control" />

			<i class="sui-icon-key" aria-hidden="true"></i>

		</div>

		<?php if ( ! empty( $vars['client_secret_error'] ) ) : ?>
			<span class="sui-error-message"><?php echo esc_html( $vars['client_secret_error'] ); ?></span>
		<?php endif; ?>

	</div>

	<div class="sui-border-frame sui-description">

		<span style="display: block;"><?php esc_html_e( 'Follow these instructions to retrieve your Client ID and Secret.', Powerform::DOMAIN ); ?></span>

		<ol class="instructions" id="clientid-instructions">

			<li><?php echo sprintf( __( 'Go to the %1$s', Powerform::DOMAIN ), '<a href="https://console.developers.google.com/cloud-resource-manager" target="_blank">' . __( 'Google API Console', Powerform::DOMAIN ) . '</a>' ); //wpcs: xss ok ?></li>

			<li><?php esc_html_e( 'Select an existing project or create a new one. If creating a new project, you will need to enter a name, but the ID is not important and can be ignored.', Powerform::DOMAIN ); ?></li>

			<li><?php echo sprintf( __( 'Once the Project creation is completed go to the %1$s. Here you need to enable the %2$s and %3$s.', Powerform::DOMAIN ), '<strong>' . __( 'API Manager', Powerform::DOMAIN ) . '</strong>', '<strong>' . __( 'Google Drive API', Powerform::DOMAIN ) . '</strong>', '<strong>' . __( 'Google Sheets API', Powerform::DOMAIN ) . '</strong>' ); //wpcs: xss ok ?></li>

			<li><?php echo sprintf( __( 'Next, go to the %1$s section.', Powerform::DOMAIN ), '<strong>' . __( 'API Manager &gt; Credentials', Powerform::DOMAIN ) . '</strong>' ); //wpcs: xss ok ?>

				<ol style="margin-top: 15px; margin-bottom: 15px;">

					<li><?php echo sprintf( __( 'Click %1$s.', Powerform::DOMAIN ), '<strong>' . __( 'Create Credentials &gt; OAuth 2.0 client ID', Powerform::DOMAIN ) . '</strong>' ); //wpcs: xss ok ?></li>

					<li><?php echo sprintf( __( 'In the popup select the %1$s as %2$s.', Powerform::DOMAIN ), '<strong>' . __( 'Application Type', Powerform::DOMAIN ) . '</strong>', '<strong>' . __( 'Web application', Powerform::DOMAIN ) . '</strong>' ); //wpcs: xss ok ?></li>

					<li><?php echo sprintf( __( 'In the field %1$s, put this value below:', Powerform::DOMAIN ), '<strong>' . __( 'Authorized redirect URI', Powerform::DOMAIN ) . '</strong>' ); //wpcs: xss ok ?><pre class="sui-code-snippet"><?php echo esc_html( ! empty( $vars['redirect_url'] ) ? $vars['redirect_url'] : '' ); ?></pre></li>

					<li><?php echo sprintf( __( 'Then click the %1$s button.', Powerform::DOMAIN ), '<strong>' . __( 'Create Client ID', Powerform::DOMAIN ) . '</strong>' ); //wpcs: xss ok ?></li>

				</ol>

			</li>

			<li><?php esc_html_e( 'After the popup closes copy the Client ID and Client Secret from the Google page and paste into the form fields.', Powerform::DOMAIN ); ?></li>

		</ol>

	</div>

</form>