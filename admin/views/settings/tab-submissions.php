<?php
$section = isset( $_GET['section'] ) ? $_GET['section'] : 'dashboard'; // wpcs csrf ok.

$nonce = wp_create_nonce( 'powerform_save_privacy_settings' );
?>

<div class="sui-box" data-nav="submissions" style="<?php echo esc_attr( 'submissions' !== $section ? 'display: none;' : '' ); ?>">

	<div class="sui-box-header">
		<h2 class="sui-box-title"><?php esc_html_e( 'Einreichungen', Powerform::DOMAIN ); ?></h2>
	</div>

	<form class="powerform-settings-save" action="">

		<div class="sui-box-body">

			<?php $this->template( 'settings/data/forms-privacy' ); ?>

			<?php $this->template( 'settings/data/polls-privacy' ); ?>

			<?php $this->template( 'settings/data/quizzes-privacy' ); ?>

		</div>

		<div class="sui-box-footer">

			<div class="sui-actions-right">

				<button class="sui-button sui-button-blue wpmudev-action-done" data-title="<?php esc_attr_e( "Einstellungen für Einsendungen", Powerform::DOMAIN ); ?>" data-action="privacy_settings"
				        data-nonce="<?php echo esc_attr( $nonce ); ?>">
					<span class="sui-loading-text"><?php esc_html_e( 'Einstellungen speichern', Powerform::DOMAIN ); ?></span>
					<i class="sui-icon-loader sui-loading" aria-hidden="true"></i>
				</button>

			</div>

		</div>

	</form>

</div>