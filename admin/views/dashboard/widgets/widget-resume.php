<?php
$path = powerform_plugin_dir();

$total_forms = powerform_cforms_total();
$total_polls = powerform_polls_total();
$total_quizz = powerform_quizzes_total();
$count_active = $this->countModules( 'publish' );

$forms_total_submissions = Powerform_Form_Entry_Model::count_all_entries_by_type( 'custom-forms' ); //powerform_cforms_total();
$poll_total_submissions = Powerform_Form_Entry_Model::count_all_entries_by_type( 'poll' );//powerform_polls_total();
$quiz_total_submissions = Powerform_Form_Entry_Model::count_all_entries_by_type( 'quizzes' );//powerform_quizzes_total();

$total_modules = $total_forms + $total_polls + $total_quizz;

$last_submission = powerform_get_latest_entry_time( 'custom-forms' );
?>

<div class="sui-box sui-summary <?php echo esc_attr( $this->get_box_summary_classes() ); ?>">

	<div class="sui-summary-image-space" aria-hidden="true" style="<?php echo esc_attr( $this->get_box_summary_image_style() ); ?>"></div>

	<div class="sui-summary-segment">

		<div class="sui-summary-details">

			<?php if ( 0 < $total_forms ) { ?>
				<span class="sui-summary-large"><?php echo esc_html( $count_active ); ?></span>
			<?php } else { ?>
				<span class="sui-summary-large">0</span>
			<?php } ?>

			<?php if ( 1 === $total_forms ) { ?>
				<span class="sui-summary-sub"><?php esc_html_e( 'Aktives Formular', Powerform::DOMAIN ); ?></span>
			<?php } else { ?>
				<span class="sui-summary-sub"><?php esc_html_e( 'Aktive Formulare', Powerform::DOMAIN ); ?></span>
			<?php } ?>

			<?php if ( $total_forms > 0 ) { ?>
				<span class="sui-summary-detail"><strong><?php echo esc_html( $last_submission ); ?></strong></span>
			<?php } else { ?>
				<span class="sui-summary-detail"><strong><?php esc_html_e( 'noch keine', Powerform::DOMAIN ); ?></strong></span>
			<?php } ?>

			<span class="sui-summary-sub"><?php esc_html_e( 'Letzte Einreichung', Powerform::DOMAIN ); ?></span>

		</div>

	</div>

	<div class="sui-summary-segment">

		<ul class="sui-list">

			<li>
				<span class="sui-list-label"><?php esc_html_e( 'Formularübermittlung', Powerform::DOMAIN ); ?></span>
				<?php if ( $forms_total_submissions > 0 ) { ?>
					<span class="sui-list-detail"><?php echo esc_html( $forms_total_submissions ); ?></span>
				<?php } else { ?>
					<span class="sui-list-detail">0</span>
				<?php } ?>
			</li>

			<li>
				<span class="sui-list-label"><?php esc_html_e( 'Umfragebeiträge', Powerform::DOMAIN ); ?></span>
				<?php if ( $poll_total_submissions > 0 ) { ?>
					<span class="sui-list-detail"><?php echo esc_html( $poll_total_submissions ); ?></span>
				<?php } else { ?>
					<span class="sui-list-detail">0</span>
				<?php } ?>
			</li>

			<li>
				<span class="sui-list-label"><?php esc_html_e( 'Quizbeiträge', Powerform::DOMAIN ); ?></span>
				<?php if ( $quiz_total_submissions > 0 ) { ?>
					<span class="sui-list-detail"><?php echo esc_html( $quiz_total_submissions ); ?></span>
				<?php } else { ?>
					<span class="sui-list-detail">0</span>
				<?php } ?>
			</li>

		</ul>

	</div>

</div>