<?php
// defaults
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
}
?>
<div class="integration-header">
	<h3 class="sui-box-title" id="dialogTitle2"><?php echo esc_html( sprintf( __( 'Setup %1$s Client', Powerform::DOMAIN ), 'Slack' ) ); ?></h3>
	<?php if ( ! empty( $vars['token'] ) ) : ?>
		<p><?php esc_html_e( 'Your Slack account is already authorized. Edit info below to re-authorize.', Powerform::DOMAIN ); ?> </p>
	<?php else : ?>
		<p><?php esc_html_e( 'Setup Slack to be used by Powerform to communicating with the Slack server.', Powerform::DOMAIN ); ?></p>
		<?php if ( ! empty( $vars['error_message'] ) ) : ?>
			<span class="sui-notice sui-notice-error"><p><?php echo esc_html( $vars['error_message'] ); ?></p></span>
		<?php endif; ?>
	<?php endif ?>
</div>
<form>
	<div class="sui-form-field <?php echo esc_attr( ! empty( $vars['client_id_error'] ) ? 'sui-form-field-error' : '' ); ?>">
		<label class="sui-label"><?php esc_html_e( 'Client ID', Powerform::DOMAIN ); ?></label>
		<input
				class="sui-form-control"
				name="client_id" placeholder="<?php echo esc_attr( __( 'Client ID', Powerform::DOMAIN ) ); ?>"
				value="<?php echo esc_attr( $vars['client_id'] ); ?>">
		<?php if ( ! empty( $vars['client_id_error'] ) ) : ?>
			<span class="sui-error-message"><?php echo esc_html( $vars['client_id_error'] ); ?></span>
		<?php endif; ?>
	</div>
	<div class="sui-form-field <?php echo esc_attr( ! empty( $vars['client_secret_error'] ) ? 'sui-form-field-error' : '' ); ?>">
		<label class="sui-label"><?php esc_html_e( 'Client Secret', Powerform::DOMAIN ); ?></label>
		<input
				class="sui-form-control"
				name="client_secret" placeholder="<?php echo esc_attr( __( 'Client Secret', Powerform::DOMAIN ) ); ?>"
				value="<?php echo esc_attr( $vars['client_secret'] ); ?>">
		<?php if ( ! empty( $vars['client_secret_error'] ) ) : ?>
			<span class="sui-error-message"><?php echo esc_html( $vars['client_secret_error'] ); ?></span>
		<?php endif; ?>
		<span class="sui-description">
				<?php esc_html_e( 'Follow these instructions to retrieve your Client ID and Secret.', Powerform::DOMAIN ); ?>
			<ol class="instructions" id="clientid-instructions">
					<li>
						<?php echo sprintf(
							__( 'Go %1$s to create new Slack App.', Powerform::DOMAIN ),
							'<a href="https://api.slack.com/apps?new_app=1" target="_blank">' . __( 'here', Powerform::DOMAIN ) . '</a>'
						); //wpcs: xss ok?>
					</li>
					<li>
						<?php esc_html_e(
							'You will need to enter App Name and Development Slack Workspace.',
							Powerform::DOMAIN
						); ?>
					</li>
					<li>
						<?php echo sprintf(
							__( 'Once the Project creation is completed go to the %1$s. Then scroll through %2$s, to take a note of %3$s and %4$s.', Powerform::DOMAIN ),
							'<strong>' . __( 'Basic Information', Powerform::DOMAIN ) . '</strong>',
							'<strong>' . __( 'App Credentials', Powerform::DOMAIN ) . '</strong>',
							'<strong>' . __( 'Client ID', Powerform::DOMAIN ) . '</strong>',
							'<strong>' . __( 'Client Secret', Powerform::DOMAIN ) . '</strong>'
						); //wpcs: xss ok?>
					</li>
					<li>
						<?php echo sprintf(
							__( 'Next, go to the %1$s &gt; %2$s &gt; %3$s section.', Powerform::DOMAIN ),
							'<strong>' . __( 'Features', Powerform::DOMAIN ) . '</strong>',
							'<strong>' . __( 'OAuth & Permissions', Powerform::DOMAIN ) . '</strong>',
							'<strong>' . __( 'Redirect URLs', Powerform::DOMAIN ) . '</strong>'
						); //wpcs: xss ok?>
						<ol>
							<li>
								<?php echo sprintf(
									__( 'Click %1$s.', Powerform::DOMAIN ),
									'<strong>' . __( 'Add a new Redirect URL', Powerform::DOMAIN ) . '</strong>'
								); //wpcs: xss ok?>
							</li>
							<li>
								<?php esc_html_e( 'In the shown input field, put this value below', Powerform::DOMAIN ); ?>
								<pre class="sui-code-snippet"><?php echo esc_html( ! empty( $vars['redirect_url'] ) ? $vars['redirect_url'] : '' ); ?></pre>.</li>
							<li>
								<?php echo sprintf(
									__( 'Then click the %1$s button.', Powerform::DOMAIN ),
									'<strong>' . __( 'Add', Powerform::DOMAIN ) . '</strong>'
								); //wpcs: xss ok?>
							</li>
							<li>
								<?php echo sprintf(
									__( 'Then click the %1$s button.', Powerform::DOMAIN ),
									'<strong>' . __( 'Save URLs', Powerform::DOMAIN ) . '</strong>'
								); //wpcs: xss ok?>
							</li>
						</ol>
				</ol>
			</span>
	</div>
</form>