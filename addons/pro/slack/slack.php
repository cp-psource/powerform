<?php

/**
 * Addon Name: Slack
 * Version: 1.0
 * Plugin URI:  https://premium.wpmudev.org/
 * Description: Integrate Powerform Custom Forms with Slack to get notified in real time.
 * Author: WMS N@W
 * Author URI: http://premium.wpmudev.org
 */

define( 'POWERFORM_ADDON_SLACK_VERSION', '1.1' );

function powerform_addon_slack_url() {
	return trailingslashit( powerform_plugin_url() . 'addons/pro/slack' );
}

function powerform_addon_slack_dir() {
	return trailingslashit( dirname( __FILE__ ) );
}

function powerform_addon_slack_assets_url() {
	return trailingslashit( powerform_addon_slack_url() . 'assets' );
}

require_once dirname( __FILE__ ) . '/powerform-addon-slack.php';

require_once dirname( __FILE__ ) . '/powerform-addon-slack-form-settings.php';
require_once dirname( __FILE__ ) . '/powerform-addon-slack-form-hooks.php';

require_once dirname( __FILE__ ) . '/powerform-addon-slack-poll-settings.php';
require_once dirname( __FILE__ ) . '/powerform-addon-slack-poll-hooks.php';

require_once dirname( __FILE__ ) . '/powerform-addon-slack-quiz-settings.php';
require_once dirname( __FILE__ ) . '/powerform-addon-slack-quiz-hooks.php';

//Direct Load
Powerform_Addon_Loader::get_instance()->register( 'Powerform_Addon_Slack' );