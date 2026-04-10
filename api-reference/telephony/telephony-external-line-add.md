# Добавить внешнюю линию telephony.externalLine.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalLine.add` добавляет внешнюю линию приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NUMBER***
[`string`](../data-types.md) | Номер внешней линии ||
|| **NAME**
[`string`](../data-types.md) | Название внешней линии ||
|| **CRM_AUTO_CREATE**
[`string`](../data-types.md) | Автосоздание объекта CRM при исходящих звонках.

Возможные значения:

 `Y` — включено
 `N` — выключено
 
По умолчанию — `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NUMBER":"74951234567","NAME":"Основная внешняя линия","CRM_AUTO_CREATE":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalLine.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.externalLine.add',
            {
                NUMBER: '74951234567',
                NAME: 'Основная внешняя линия',
                CRM_AUTO_CREATE: 'Y'
            }
        );
        
        const result = response.getData().result;
        console.log('Added external line with ID:', result);
        
        processResult(result);
    }
    catch( error )
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
                'telephony.externalLine.add',
                [
                    'NUMBER' => '74951234567',
                    'NAME' => 'Основная внешняя линия',
                    'CRM_AUTO_CREATE' => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding external line: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalLine.add",
        {
            NUMBER: '74951234567',
            NAME: 'Основная внешняя линия',
            CRM_AUTO_CREATE: 'Y'
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
        'telephony.externalLine.add',
        [
            'NUMBER' => '74951234567',
            'NAME' => 'Основная внешняя линия',
            'CRM_AUTO_CREATE' => 'Y'
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
    "result": {
        "ID": 7
    },
    "time": {
        "start": 1772801648,
        "finish": 1772801648.420551,
        "duration": 0.420551061630249,
        "processing": 0,
        "date_start": "2026-03-06T15:54:08+03:00",
        "date_finish": "2026-03-06T15:54:08+03:00",
        "operating_reset_at": 1772802248,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор созданной внешней линии ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван вне контекста приложения ||
|| `ERROR_CORE` | NUMBER should not be empty | Не передан обязательный параметр `NUMBER` ||
|| `ERROR_CORE` | Line already exists | Линия с указанным номером уже существует ||
|| `ERROR_CORE` | DB error | Ошибка базы данных при добавлении линии ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-line-update.md)
- [{#T}](./telephony-external-line-get.md)
- [{#T}](./telephony-external-line-delete.md)
- [{#T}](./telephony-external-call-register.md)

