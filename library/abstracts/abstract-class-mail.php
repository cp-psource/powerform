<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class Powerform_Mail
 *
 * Handle mail sending
 *
 * @since 1.0
 */
abstract class Powerform_Mail {

	/**
	 * Mail recipient
	 * The email to receive the mail
	 *
	 * @var string
	 */
	protected $recipient = '';

	/**
	 * Mail recipients
	 * The emails to receive the mail
	 *
	 * @var array
	 */
	protected $recipients = array();

	/**
	 * Mail message
	 *
	 * @var string
	 */
	protected $message = '';

	/**
	 * Mail subject
	 *
	 * @var string
	 */
	protected $subject = '';

	/**
	 * Mail from email
	 *
	 * @var string
	 */
	protected $sender_email = '';

	/**
	 * Mail from name
	 *
	 * @var string
	 */
	protected $sender_name = '';

	/**
	 * Mail headers
	 *
	 * @var array
	 */
	protected $headers = array();

	/**
	 * Main constructor
	 *
	 * @since 1.0
	 *
	 * @param string $recipient - mail recipient email
	 * @param string $message   - mail message
	 * @param string $subject   - mail subject
	 */
	public function __construct( $recipient = '', $message = '', $subject = '' ) {
		if ( ! empty( $recipient ) && filter_var( $recipient, FILTER_VALIDATE_EMAIL ) ) {
			$this->recipient = $recipient;
		}
		if ( ! empty( $message ) ) {
			$this->message = $message;
		}
		if ( ! empty( $subject ) ) {
			$this->subject = $subject;
		}
		$this->sender_email = get_global_sender_email_address();
		$this->sender_name  = get_global_sender_name();
		$this->set_headers();
	}

	/**
	 * Set recipeint
	 *
	 * @since 1.0
	 *
	 * @param string $recipient - recipient email
	 */
	public function set_recipient( $recipient ) {
		if ( filter_var( $recipient, FILTER_VALIDATE_EMAIL ) ) {
			$this->recipient = $recipient;
		}
	}


	/**
	 * Set Recipients as array
	 *
	 * @since 1.0.3
	 *
	 * @param array $recipients
	 */
	public function set_recipients( $recipients ) {
		$this->recipients = array();
		if ( ! empty( $recipients ) ) {
			foreach ( $recipients as $recipient ) {
				if ( filter_var( $recipient, FILTER_VALIDATE_EMAIL ) ) {
					$this->recipients[] = $recipient;
				}
			}
		}
	}

	/**
	 * Set message
	 *
	 * @since 1.0
	 *
	 * @param string $message - the mail message
	 */
	public function set_message( $message ) {
		$this->message = $message;
	}

	/**
	 * Set message with vars
	 *
	 * @since 1.0
	 *
	 * @param array  $message_vars - the mail message array variables
	 * @param string $message      - the mail message
	 */
	public function set_message_with_vars( $message_vars, $message ) {
		$this->message = str_replace(
			array_keys( $message_vars ),
			array_values( $message_vars ),
			stripslashes( $message )
		);
	}

	/**
	 * Set subject
	 *
	 * @since 1.0
	 *
	 * @param string $subject - the mail subject
	 */
	public function set_subject( $subject ) {
		$this->subject = $subject;
	}

	/**
	 * Set headers
	 *
	 * @since 1.0
	 *
	 * @param array $headers - the mail headers
	 */
	public function set_headers( $headers = array() ) {
		if ( ! empty( $headers ) ) {
			$this->headers = $headers;
		} else {
			$this->headers   = array(
				'From: ' . $this->sender_name . ' <' . $this->sender_email . '>',
			);
			$this->headers[] = 'Content-Type: text/html; charset=UTF-8';
		}
	}

	/**
	 * Set sender details
	 *
	 * @since 1.0
	 *
	 * @param array $sender_details - the sender details
	 *                              ( 'email' => 'email', 'name' => 'name' )
	 */
	public function set_sender( $sender_details = array() ) {
		if ( ! empty( $sender_details ) ) {
			$this->sender_email = $sender_details['email'];
			$this->sender_name  = $sender_details['name'];
		}
	}

	/**
	 * Clean mail variables
	 *
	 * @since 1.0
	 */
	private function clean() {
		$subject       = stripslashes( $this->subject );
		$subject       = wp_strip_all_tags( $subject );
		$this->subject = $subject;

		$message       = stripslashes( $this->message );
		$message       = wpautop( $message );
		$message       = make_clickable( $message );
		$this->message = $message;
	}

	/**
	 * Get Powerform mailer headers
	 *
	 * @since 1.5
	 * @return array
	 */
	public function get_headers() {
		$headers = $this->headers;

		/**
		 * Filter headers that will be sent by Powerform Mailer
		 *
		 * @since 1.5
		 *
		 * @param array $headers
		 */
		$headers = apply_filters( 'powerform_mailer_headers', $headers );

		return $headers;
	}

	/**
	 * Send mail
	 *
	 * @since 1.0
	 * @since 1.5 use `get_headers`
	 * @return bool
	 */
	public function send() {
		$sent    = false;
		$headers = $this->get_headers();
		if ( ! empty( $this->recipient ) && ! empty( $this->subject ) && ! empty( $this->message ) ) {
			$this->clean();
			$sent = wp_mail( $this->recipient, $this->subject, $this->message, $headers );
		}

		return $sent;
	}

	/**
	 * Send mail for multiple recipients
	 *
	 * @since 1.0.3
	 * @since 1.5 use `get_headers`
	 *
	 * @return bool
	 */
	public function send_multiple() {
		$sent    = false;
		$headers = $this->get_headers();
		if ( ! empty( $this->recipients ) && ! empty( $this->subject ) && ! empty( $this->message ) ) {
			$this->clean();
			$sent = wp_mail( $this->recipients, $this->subject, $this->message, $headers );
		}

		return $sent;
	}
}