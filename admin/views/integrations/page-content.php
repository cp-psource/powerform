<?php $path = powerform_plugin_url(); ?>
<p>
	<?php
		esc_html_e( "Powerformulare lässt sich in Deine bevorzugten E-Mail- und Speicher-Apps integrieren. Hier ist eine Liste der derzeit verfügbaren Apps. Du kannst sie in Deinem Bereich Formulare/Integrationen konfigurieren.", Powerform::DOMAIN );
		?>
</p>

<?php
if ( ! empty( $addons['connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Aktiv", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['connected'] as $key => $provider ) : ?>

			<?php echo powerform_addon_row_html_markup( $provider, 0, true, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}

if ( ! empty( $addons['not_connected'] ) ) {
	?>

	<h3 class="sui-table-title"><?php esc_html_e( "Verfügbare Integrationen", Powerform::DOMAIN ); ?></h3>

	<table class="sui-table fui-table--apps">

		<tbody>

		<?php foreach ( $addons['not_connected'] as $key => $provider ) : ?>

			<?php echo powerform_addon_row_html_markup( $provider, 0, true );// wpcs xss ok. ?>

		<?php endforeach; ?>

		</tbody>

	</table>

	<?php
}
?>