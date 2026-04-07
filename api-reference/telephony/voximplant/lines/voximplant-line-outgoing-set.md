# Установить исходящую линию voximplant.line.outgoing.set

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.line.outgoing.set` устанавливает исходящую линию по умолчанию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LINE_ID***
[`string`](../../../data-types.md) | Идентификатор линии.

Получить доступные идентификаторы можно методом [voximplant.line.get](./voximplant-line-get.md) ||
|#

{% note info "" %}

Метод изменяет исходящую линию только если переданный `LINE_ID` существует среди доступных линий. Если `LINE_ID` не указан или не найден, метод вернет `1`, но настройка исходящей линии не изменится

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"LINE_ID":"reg150907"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.line.outgoing.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"LINE_ID":"reg150907","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.line.outgoing.set
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.line.outgoing.set',
            {
                LINE_ID: 'reg150907'
            }
        );

        const result = response.getData().result;
        console.log('Data:', result);
    }
    catch (error)
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
                'voximplant.line.outgoing.set',
                [
                    'LINE_ID' => 'reg150907',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.line.outgoing.set',
        {
            LINE_ID: 'reg150907'
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
        'voximplant.line.outgoing.set',
        [
            'LINE_ID' => 'reg150907',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1,
    "time": {
        "start": 1773664560,
        "finish": 1773664560.138283,
        "duration": 0.13828301429748535,
        "processing": 0,
        "date_start": "2026-03-16T15:36:00+03:00",
        "date_finish": "2026-03-16T15:36:00+03:00",
        "operating_reset_at": 1773665160,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Результат выполнения метода.

`1` — запрос обработан.
Проверьте фактическую линию через [voximplant.line.outgoing.get](./voximplant-line-outgoing-get.md), так как при невалидном `LINE_ID` метод также возвращает `1` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для изменения исходящей линии по умолчанию ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-line-get.md)
- [{#T}](./voximplant-line-outgoing-get.md)
- [{#T}](./voximplant-line-outgoing-set.md)
- [{#T}](./voximplant-line-outgoing-sip-set.md)
