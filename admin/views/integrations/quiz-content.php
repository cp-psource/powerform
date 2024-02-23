<?php
if ( empty( $quiz_id ) ) {
	$quiz_id = 0;
}
?>

<?php

if ( ! empty( $addons['quiz_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Aktiv", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['quiz_connected'] as $key => $provider ) : ?>

			<?php echo powerform_addon_quiz_row_html_markup( $provider, $quiz_id, true, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}

if ( ! empty( $addons['not_quiz_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Verfügbare Integrationen", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['not_quiz_connected'] as $key => $provider ) : ?>

			<?php if ( ! $provider['is_quiz_settings_available'] ) {
				continue;
			}
			?>

			<?php echo powerform_addon_quiz_row_html_markup( $provider, $quiz_id, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}
?>