<?php
$path	= powerform_plugin_url();
$count	= Powerform_Form_Entry_Model::count_entries( $this->form_id );

$poll_question    = $this->get_poll_question();
$poll_description = $this->get_poll_description();

$custom_votes = $this->map_custom_votes();
?>
<?php if ( $this->error_message() ) : ?>
	<span class="sui-notice sui-notice-error"><p><?php echo esc_html( $this->error_message() ); ?></p></span>
<?php endif; ?>
<?php if ( $count > 0 ) : ?>

	<div class="sui-box">

		<div class="sui-box-body sui-block-content-center">

			<?php if ( ! empty( $poll_question ) ) { ?>

				<h2><?php echo $poll_question; // WPCS: XSS ok. ?></h2>

			<?php } ?>

			<?php if ( ! empty( $poll_description ) ) { ?>

				<p><?php echo $poll_description; // WPCS: XSS ok. ?></p>

			<?php } ?>

		</div>

		<div class="sui-box-body">

			<div id="powerform-chart-poll" class="powerform-poll--chart" style="width: 100%; height: 400px;"></div>

		</div>

		<?php if ( ! empty( $custom_votes ) && count( $custom_votes ) > 0 ) { ?>

			<div class="sui-box-footer">

				<div style="min-width: 100%;">

				<?php foreach ( $custom_votes as $element_id => $custom_vote ) {

					echo '<label class="sui-label">' . $this->get_field_title( $element_id ) . '</label>'; // WPCS: XSS ok.

					echo '<div style="margin-top: 10px;">';

						foreach ( $custom_vote as $answer => $vote ) {
							echo '<span class="sui-tag">' . esc_html( sprintf( _n( '%1$s (%2$s) Abstimmung', '%1$s (%2$s) Abstimmungen', $vote, Powerform::DOMAIN ), $answer, $vote ) ) . '</span>';
						}

					echo '</div>';

				} ?>

				</div>

			</div>

		<?php } ?>

	</div>

<?php else : ?>

	<div class="sui-box sui-message">

		<?php if ( powerform_is_show_branding() ): ?>
			<img src="<?php echo $path . 'assets/img/powerform-submissions.png'; // WPCS: XSS ok. ?>"
			     srcset="<?php echo $path . 'assets/img/powerform-submissions.png'; // WPCS: XSS ok. ?> 1x, <?php echo $path . 'assets/img/powerform-submissions@2x.png'; // WPCS: XSS ok. ?> 2x"
			     alt="<?php esc_html_e( 'Powerformulare', Powerform::DOMAIN ); ?>"
			     class="sui-image"
			     aria-hidden="true"/>
		<?php endif; ?>

		<div class="sui-message-content">

			<h2><?php echo powerform_get_form_name( $this->form_id, 'poll'); // WPCS: XSS ok. ?></h2>

			<p><?php esc_html_e( "Du hast noch keine Beiträge für diese Umfrage erhalten. Wenn Du dies tust, kannst Du hier alle Daten anzeigen.", Powerform::DOMAIN ); ?></p>

		</div>

	</div>

<?php
 endif;