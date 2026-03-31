# При оценке качества связи BackgroundCallCard::qualityMeterClick

> Scope: [`telephony`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `BackgroundCallCard::qualityMeterClick` возникает при выборе оценки качества связи.

{% note info "" %}

Событие работает в контексте приложения в плейсменте `PAGE_BACKGROUND_WORKER`.

{% endnote %}

## Что получает обработчик

Данные передаются в callback `BX24.placement.bindEvent` {.b24-info}

```js
callback("5");
```

## Параметры обработчика события

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **eventData***
[`string`](../../../../data-types.md) | Оценка качества связи: значение от `1` до `5` ||
|#

## Параметры подписки на событие

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../../../../data-types.md) | Имя события интерфейса.

Для данного события — `BackgroundCallCard::qualityMeterClick` ||
|| **HANDLER***
[`string`](../../../../data-types.md) | URL обработчика события для вызова `placement.bindEvent` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"BackgroundCallCard::qualityMeterClick","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/placement.bindEvent?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.bindEvent('BackgroundCallCard::qualityMeterClick', function (eventData) {
        console.log(eventData);
    });
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bindEvent',
                [
                    'PLACEMENT' => 'BackgroundCallCard::qualityMeterClick',
                    'HANDLER' => '**your_handler_url_here**'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bindEvent',
        {
            PLACEMENT: 'BackgroundCallCard::qualityMeterClick',
            HANDLER: '**your_handler_url_here**'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bindEvent',
        [
            'PLACEMENT' => 'BackgroundCallCard::qualityMeterClick',
            'HANDLER' => '**your_handler_url_here**'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../card.md)