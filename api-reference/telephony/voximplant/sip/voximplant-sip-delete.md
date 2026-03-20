# Удалить SIP-линию voximplant.sip.delete

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.delete` удаляет существующую SIP-линию, созданную текущим приложением.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../../data-types.md) | Идентификатор настройки SIP-линии.

Получить идентификатор можно с помощью метода [voximplant.sip.get](./voximplant-sip-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":5}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":5,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.sip.delete',
            {
                CONFIG_ID: 5
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
                'voximplant.sip.delete',
                [
                    'CONFIG_ID' => 5,
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
        'voximplant.sip.delete',
        {
            CONFIG_ID: 5
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
        'voximplant.sip.delete',
        [
            'CONFIG_ID' => 5,
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
        "start": 1773663532,
        "finish": 1773663532.48429,
        "duration": 0.48428988456726074,
        "processing": 0,
        "date_start": "2026-03-16T15:18:52+03:00",
        "date_finish": "2026-03-16T15:18:52+03:00",
        "operating_reset_at": 1773664132,
        "operating": 0.22906804084777832
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Результат удаления.

`1` — удаление выполнено успешно ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_NOT_FOUND",
    "error_description": "Specified CONFIG_ID is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_NOT_FOUND` | `Specified CONFIG_ID is not found` | SIP-линия с указанным `CONFIG_ID` не найдена среди линий текущего приложения ||
|| `REG_ID_NOT_FOUND` | `Настройки не найдены` | Не найдена SIP-регистрация, связанная с удаляемой линией ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для удаления SIP-линии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-update.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-status.md)
- [{#T}](./voximplant-sip-connector-status.md)
