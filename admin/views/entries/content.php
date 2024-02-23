<?php
$count = Powerform_Form_Entry_Model::count_all_entries();
?>

<?php if ( $count > 0 ) { ?>

	<?php $markup = $this->render_entries(); ?>

	<form method="get"
		name="bulk-action-form"
		class="sui-box">

		<div class="fui-entries-bar">

			<div class="fui-bar-selectors">

				<input type="hidden" name="page" value="powerform-entries" />

				<select name="form_type"
					onchange="submit()"
					class="sui-select-sm">

					<?php foreach ( $this->get_form_types() as $post_type => $name ) { ?>
						<option value="<?php echo esc_attr( $post_type ); ?>" <?php echo selected( $post_type, $this->get_current_form_type() ); ?>><?php echo esc_html( $name ); ?></option>
					<?php } ?>

				</select>

				<?php echo $this->render_form_switcher(); // phpcs:ignore ?>

			</div>

			<button class="sui-button sui-button-blue" onclick="submit()"><?php esc_html_e( 'Einreichungen anzeigen', Powerform::DOMAIN ); ?></button>

			<?php if ( $markup ) : ?>
				<a href="/" class="sui-button sui-button-ghost wpmudev-open-modal" data-modal="exports-schedule"><i class="sui-icon-paperclip" aria-hidden="true"></i> <?php esc_html_e( 'Exportieren', Powerform::DOMAIN ); ?></a>
			<?php endif; ?>

		</div>

	</form>

	<?php if( $markup ) : ?>

		<?php echo $markup; // phpcs:ignore ?>

	<?php else: ?>

		<div class="sui-box sui-message">

			<?php if ( powerform_is_show_branding() ): ?>
				<img src="<?php echo esc_url( powerform_plugin_url() . 'assets/img/powerform-disabled.png' ); ?>"
				     srcset="<?php echo esc_url( powerform_plugin_url() . 'assets/img/powerform-disabled.png' ); ?> 1x, <?php echo esc_url( powerform_plugin_url() . 'assets/img/powerform-disabled@2x.png' ); ?> 2x"
				     alt="<?php esc_html_e( 'Powerformulare', Powerform::DOMAIN ); ?>"
				     class="sui-image"/>
			<?php endif; ?>

			<div class="sui-message-content">

				<h2><?php esc_html_e( 'Fast dort!', Powerform::DOMAIN ); ?></h2>

				<p><?php esc_html_e( 'Wähle das Formular-, Umfrage- oder Quizmodul aus, um die entsprechenden Beiträge anzuzeigen.', Powerform::DOMAIN ); ?></p>

			</div>

		</div>

	<?php endif; ?>

<?php } else { ?>

	<div class="sui-box sui-message">

		<?php if ( powerform_is_show_branding() ): ?>
			<img src="<?php echo esc_url( powerform_plugin_url() . 'assets/img/powerform-submissions.png' ); ?>"
			     srcset="<?php echo esc_url( powerform_plugin_url() . 'assets/img/powerform-submissions.png' ); ?> 1x, <?php echo esc_url( powerform_plugin_url() . 'assets/img/powerform-submissions@2x.png' ); ?> 2x"
			     alt="<?php esc_html_e( 'Powerformulare', Powerform::DOMAIN ); ?>"
			     class="sui-image"/>
		<?php endif; ?>

		<div class="sui-message-content">

			<h2><?php esc_html_e( 'Einsendungen', Powerform::DOMAIN ); ?></h2>

			<p><?php esc_html_e( 'Du hast noch keine Formular-, Umfrage- oder Quizbeiträge erhalten. Wenn Du dies tust, kannst Du hier alle Daten anzeigen.', Powerform::DOMAIN ); ?></p>

		</div>

	</div>

<?php } ?>