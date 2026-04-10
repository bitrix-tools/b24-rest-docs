# Обновить SIP-линию voximplant.sip.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.update` обновляет существующую SIP-линию, созданную текущим приложением.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../../data-types.md) | Идентификатор настройки SIP-линии.

Получить идентификатор можно с помощью метода [voximplant.sip.get](./voximplant-sip-get.md) ||
|| **TITLE**
[`string`](../../../data-types.md) | Новое название подключения ||
|| **SERVER**
[`string`](../../../data-types.md) | Новый адрес сервера SIP-регистрации ||
|| **LOGIN**
[`string`](../../../data-types.md) | Новый логин для подключения к серверу ||
|| **PASSWORD**
[`string`](../../../data-types.md) | Новый пароль для подключения к серверу. Максимальная длина — 100 символов ||
|#

{% note info "" %}

Для изменения нужно передать хотя бы одно из полей: `TITLE`, `SERVER`, `LOGIN`, `PASSWORD`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":5,"TITLE":"SIP line 1 (updated)"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":5,"TITLE":"SIP line 1 (updated)","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.sip.update',
            {
                CONFIG_ID: 5,
                TITLE: 'SIP line 1 (updated)'
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
                'voximplant.sip.update',
                [
                    'CONFIG_ID' => 5,
                    'TITLE' => 'SIP line 1 (updated)',
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
        'voximplant.sip.update',
        {
            CONFIG_ID: 5,
            TITLE: 'SIP line 1 (updated)'
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
        'voximplant.sip.update',
        [
            'CONFIG_ID' => 5,
            'TITLE' => 'SIP line 1 (updated)',
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
        "start": 1773657589,
        "finish": 1773657589.659046,
        "duration": 0.659045934677124,
        "processing": 0,
        "date_start": "2026-03-16T13:39:49+03:00",
        "date_finish": "2026-03-16T13:39:49+03:00",
        "operating_reset_at": 1773658189,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Результат обновления.

`1` — обновление выполнено успешно ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **404**

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
|| `CHECK_FIELDS_ERROR` | `Не указан адрес сервера` | Передано пустое или некорректное значение параметра `SERVER` ||
|| `CHECK_FIELDS_ERROR` | `Не указан логин для подключения к серверу` | Передано пустое или некорректное значение параметра `LOGIN` ||
|| `CHECK_FIELDS_ERROR` | `Пароль для подключения к серверу не может быть более 100 символов` | Превышен лимит значения для параметра `PASSWORD` ||
|| `TITLE_EXISTS` | `Указанное название подключения уже зарегистрировано в системе` | Линия с таким названием уже существует ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для обновления SIP-линии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-update.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-status.md)
- [{#T}](./voximplant-sip-connector-status.md)
