<?php
$section = isset( $_GET['section'] ) ? $_GET['section'] : 'dashboard'; // wpcs csrf ok.
?>
<div class="sui-row-with-sidenav">

	<div class="sui-sidenav">

		<ul class="sui-vertical-tabs sui-sidenav-hide-md">

			<li class="sui-vertical-tab <?php echo esc_attr( 'dashboard' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="dashboard"><?php esc_html_e( 'Dashboard', Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab <?php echo esc_attr( 'emails' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="emails"><?php esc_html_e( 'Emails', Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab <?php echo esc_attr( 'recaptcha' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="recaptcha"><?php esc_html_e( 'Google reCAPTCHA', Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab <?php echo esc_attr( 'data' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="data"><?php esc_html_e( 'Daten', Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab <?php echo esc_attr( 'submissions' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="submissions"><?php esc_html_e( 'Einreichungen', Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab <?php echo esc_attr( 'accessibility' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="accessibility"><?php esc_html_e( 'Barrierefreiheit', Powerform::DOMAIN ); ?></a>
			</li>

			<li class="sui-vertical-tab <?php echo esc_attr( 'pagination' === $section ? 'current' : '' ); ?>">
				<a href="#" data-nav="pagination"><?php esc_html_e( 'Pagination', Powerform::DOMAIN ); ?></a>
			</li>

		</ul>

		<select class="sui-mobile-nav sui-sidenav-hide-lg">
			<option value="dashboard"><?php esc_html_e( 'Dashboard', Powerform::DOMAIN ); ?></option>
			<option value="emails"><?php esc_html_e( 'Emails', Powerform::DOMAIN ); ?></option>
			<option value="recaptcha"><?php esc_html_e( 'Google reCAPTCHA', Powerform::DOMAIN ); ?></option>
			<option value="data"><?php esc_html_e( 'Daten', Powerform::DOMAIN ); ?></option>
			<option value="submissions"><?php esc_html_e( 'Einreichungen', Powerform::DOMAIN ); ?></option>
			<option value="pagination"><?php esc_html_e( 'Seitennummerierung', Powerform::DOMAIN ); ?></option>
			<option value="accessibility"><?php esc_html_e( 'Barrierefreiheit', Powerform::DOMAIN ); ?></option>
		</select>

	</div>

	<?php $this->template( 'settings/tab-dashboard' ); ?>
	<?php $this->template( 'settings/tab-emails' ); ?>
	<?php $this->template( 'settings/tab-recaptcha' ); ?>
	<?php $this->template( 'settings/tab-data' ); ?>
	<?php $this->template( 'settings/tab-submissions' ); ?>
	<?php $this->template( 'settings/tab-pagination' ); ?>
	<?php $this->template( 'settings/tab-accessibility' ); ?>

</div>