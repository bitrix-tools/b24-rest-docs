# Включить или выключить ролевую модель прав landing.role.enable

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.enable` включает или выключает ролевую модель прав для раздела «Сайты и магазины».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **mode***
[`integer`](../../data-types.md) | Режим модели прав. Проверить текущую модель можно методом [landing.role.isEnabled](./landing-role-is-enabled.md). Возможные значения:
- `1` - включить ролевую модель прав
- `0` - выключить ролевую модель прав и использовать расширенную модель ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "mode": 1
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.enable.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "mode": 1,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.enable.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.role.enable',
            {
                mode: 1
            }
        );

        const result = response.getData().result;
        console.info(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.role.enable',
                [
                    'mode' => 1,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error enabling role model: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.enable',
        {
            mode: 1
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.role.enable',
        [
            'mode' => 1,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1775073692,
        "finish": 1775073692.6858,
        "duration": 0.6858000755310059,
        "processing": 0,
        "date_start": "2026-04-01T23:01:32+03:00",
        "date_finish": "2026-04-01T23:01:32+03:00",
        "operating_reset_at": 1775074292,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Признак успешного выполнения метода.

Метод возвращает `true`, если вызов выполнен без ошибок. Если нужная модель уже была включена, ответ все равно останется `true` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: mode"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для доступа к разделу «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Для метода нужны права администратора или право «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` |Управление правами в разделе «Сайты и магазины» недоступно на текущем тарифе ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `mode` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-is-enabled.md)
- [{#T}](./extended-model/landing-site-get-rights.md)
- [{#T}](./extended-model/landing-site-set-rights.md)
- [{#T}](./role-model/landing-role-get-list.md)
- [{#T}](./role-model/landing-role-get-rights.md)
- [{#T}](./role-model/landing-role-set-access-codes.md)
- [{#T}](./role-model/landing-role-set-rights.md)
