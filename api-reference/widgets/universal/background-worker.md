# Невидимый виджет на каждой странице PAGE_BACKGROUND_WORKER

> Scope: [`placement`](../../scopes/permissions.md)

Вы можете добавить "невидимый" виджет, который будет выводиться на всех страницах Битрикс24. Именно этот виджет позволяет реализовывать сценарий с внешним [WebRTC-клиентом](../ui-interaction/page-background-worker/index.md) в интеграциях с телефониями, однако это не единственный возможный сценарий использования.

Например, с помощью механизма [интерактивного взаимодействия](../../../settings/interactivity/index.md) backend- и frontend-приложения, можно отправлять "сигнал" в виджет `PAGE_BACKGROUND_WORKER`, а по получении "сигнала", открывать слайдер приложения с помощью метода [openApplication](../open-application.md).

Код места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Особенности регистрации обработчика виджета

В отличие от других типов виджетов, для `PAGE_BACKGROUND_WORKER` приложение может зарегистрировать только один обработчик.

Поскольку загрузка этого виджета происходит всегда и на всех страницах, обработчик, который грузится дольше 3-5 секунд, может вызывать задержки в формировании пользовательского интерфейса Битрикс24. Если это происходит более 10 раз в течение суток на одном и том же Битрикс24, то обработчик будет автоматически отключен.

Битрикс24 проинформирует приложение об отключении обработчика. Для этого, в методе [placement.bind](../placement-bind.md), необходимо указать URL в параметре `OPTIONS[errorHandlerUrl]`. Битрикс24 будет вызывать этот URL в случае отключения обработчика виджета `PAGE_BACKGROUND_WORKER`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"PAGE_BACKGROUND_WORKER","HANDLER":"http://myapp.com/handler/?type=1","OPTIONS":{"errorHandlerUrl":"http://myapp.com/error/"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/placement.bind
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"PAGE_BACKGROUND_WORKER","HANDLER":"http://myapp.com/handler/?type=1","OPTIONS":{"errorHandlerUrl":"http://myapp.com/error/"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/placement.bind
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"placement.bind",
    		{ 
    			PLACEMENT: "PAGE_BACKGROUND_WORKER",
    			HANDLER: "http://myapp.com/handler/?type=1",
    			OPTIONS: {
    				errorHandlerUrl: "http://myapp.com/error/"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'PAGE_BACKGROUND_WORKER',
                    'HANDLER'   => 'http://myapp.com/handler/?type=1',
                    'OPTIONS'   => [
                        'errorHandlerUrl' => 'http://myapp.com/error/'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "placement.bind",
        { 
            PLACEMENT: "PAGE_BACKGROUND_WORKER",
            HANDLER: "http://myapp.com/handler/?type=1",
            OPTIONS: {
                errorHandlerUrl: "http://myapp.com/error/"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'PAGE_BACKGROUND_WORKER',
            'HANDLER' => 'http://myapp.com/handler/?type=1',
            'OPTIONS' => [
                'errorHandlerUrl' => 'http://myapp.com/error/'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php

Array
(
    [handler] => 1
    [DOMAIN] => restapi.bitrix24.ru
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 588b8a98e848778a4ffb38fbcf70f2b9
    [AUTH_ID] => 4172bb6600705a0700005a4b00000001f0f107c42ca5bd5f61030c5d9c3e4d60d11b5a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 31f1e26600705a0700005a4b00000001f0f107b1918506d8a2ed9ecf76e8fdac962471
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => PAGE_BACKGROUND_WORKER
    [PLACEMENT_OPTIONS] => {"ID":"PAGE_BACKGROUND_WORKER","URI":"\/company\/personal\/user\/1\/blog\/"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значением `PLACEMENT_OPTIONS` является JSON-строка, содержащая массив из одного и более ключей.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **ID***
[`string`](../../data-types.md) | Всегда равен `PAGE_BACKGROUND_WORKER` и используется для внутренних нужд

||
|| **URI***
[`string`](../../data-types.md) | Экранированный с помощью urlencode адрес текущей страницы, на которой был открыт виджет.

||
|#

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../ui-interaction/page-background-worker/index.md)

{% endnote %}

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)
