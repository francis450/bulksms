<?php

/**
 * Send WhatsApp template message directly by calling HTTP endpoint.
 *
 * For your convenience, environment variables are already pre-populated with your account data
 * like authentication, base URL and phone number.
 *
 * Send WhatsApp API reference: https://www.infobip.com/docs/api#channels/whatsapp/send-whatsapp-template-message
 *
 * Please find detailed information in the readme file.
 */

require '../../vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;

$client = new Client([
    'base_uri' => "https://vvvzee.api.infobip.com/",
    'headers' => [
        'Authorization' => "App f4d232121357c1f9df03c2f63c6a50a6-0cde7c75-8ba3-4f51-a3d8-29d23b00f35f",
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ]
]);

$response = $client->request(
    'POST',
    'whatsapp/1/message/template',
    [
        RequestOptions::JSON => [
            'messages' => [
                [
                    'from' => '447860099299',
                    'to' => "254757185189",
                    'content' => [
                        'templateName' => 'registration_success',
                        'templateData' => [
                            'body' => [
                                'placeholders' => ['sender', 'message', 'delivered', 'testing']
                            ],
                            'header' => [
                                'type' => 'IMAGE',
                                'mediaUrl' => 'https://api.infobip.com/ott/1/media/infobipLogo',
                            ],
                            'buttons' => [
                                ['type' => 'QUICK_REPLY', 'parameter' => 'yes-payload'],
                                ['type' => 'QUICK_REPLY', 'parameter' => 'no-payload'],
                                ['type' => 'QUICK_REPLY', 'parameter' => 'later-payload']
                            ]
                        ],
                        'language' => 'en',
                    ],
                ]
            ]
        ],
    ]
);

echo("HTTP code: " . $response->getStatusCode() . PHP_EOL);
echo("Response body: " . $response->getBody()->getContents() . PHP_EOL);
