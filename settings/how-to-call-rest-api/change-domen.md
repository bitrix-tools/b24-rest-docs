# Особенности вызовов REST при изменении адреса Битрикс24

Новые облачные Битрикс24 создаются по сгенерированным адресам вида `b24-xxx.bitrix24.yy`. В дальнейшем пользователи в любой момент могут изменить этот адрес с некоторыми ограничениями. Ограничения зависят от используемого тарифного плана.

## Почему это важно иметь в виду 

Если ваше приложение делает вызов REST Битрикс24 и при этом использует сохраненный на стороне приложения адрес, то может возникнуть ситуация, когда этот адрес уже не актуален.

При обращении по неактуальному адресу Битрикс24 делает редирект на новый, но такой редирект нужно корректно обрабатывать в своем коде.

Скорее всего, при использовании GET-параметров в вызовах REST вы ничего не заметите, но с POST-запросами все несколько сложнее.

В частности, если вы используете PHP и curl, то в зависимости от настроек POST-запрос при редиректе может «магическим образом» превратиться в GET-запрос. При этом параметры, передававшиеся в POST-запросе, попросту теряются.

{% note info %}

Эти особенности работы с REST API уже учтены в [SDK Битрикс](../../first-steps/how-to-use-examples.md).

{% endnote %}

## Подход 1

Выполняя POST-запрос, запретите редирект. Получите статус запроса 302, возьмите из результата новый адрес и повторите POST-запрос, но уже по новому адресу. 

{% list tabs %}

- Python

    ```python
    response = requests.post(url, allow_redirects=False)
    if response.status_code == 302:
        response = requests.post(response.headers['Location'])
    ```

- PHP

    ```php
    <?php

    $options = [
        'http' => [
            'method' => 'POST',
            'follow_location' => false
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    $headers = $http_response_header;
    $status_line = $headers[0];
    preg_match('{HTTP\/\S*\s(\d{3})}', $status_line, $match);
    $status_code = $match[1];

    if ($status_code == 302) {
        foreach ($headers as $header) {
            if (stripos($header, 'Location:') === 0) {
                $location = trim(substr($header, 9));
                $response = file_get_contents($location, false, $context);
                break;
            }
        }
    }

    ?>
    ```

{% endlist %}

## Подход 2

Используйте опцию `curl_setopt($ch, CURLOPT_POSTREDIR, 3)`, которая позволит обработать ситуацию с редиректом.