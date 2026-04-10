# Проверить, включена ли ролевая модель прав landing.role.isEnabled

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.isEnabled` проверяет, включена ли ролевая модель прав для раздела «Сайты и магазины».

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{}' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.isEnabled.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.isEnabled.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.role.isEnabled',
            {}
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
                'landing.role.isEnabled',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking role model: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.isEnabled',
        {},
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
        'landing.role.isEnabled',
        []
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
        "start": 1774988172,
        "finish": 1774988172.261264,
        "duration": 0.2612640857696533,
        "processing": 0,
        "date_start": "2026-03-31T23:16:12+03:00",
        "date_finish": "2026-03-31T23:16:12+03:00",
        "operating_reset_at": 1774988772,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Признак того, включена ли ролевая модель прав.

`true` - используется ролевая модель прав. Для настройки прав используйте [landing.role.getList](./role-model/landing-role-get-list.md), [landing.role.getRights](./role-model/landing-role-get-rights.md), [landing.role.setAccessCodes](./role-model/landing-role-set-access-codes.md) и [landing.role.setRights](./role-model/landing-role-set-rights.md)

`false` - используется расширенная модель прав. Для настройки прав конкретного сайта используйте [landing.site.getRights](./extended-model/landing-site-get-rights.md) и [landing.site.setRights](./extended-model/landing-site-set-rights.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "IS_NOT_ADMIN",
    "error_description": "Для совершения действия необходимо быть администратором."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для доступа к разделу «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Метод доступен только пользователю с правом «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | Управление правами в разделе «Сайты и магазины» недоступно на текущем тарифе ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-enable.md)
- [{#T}](./extended-model/landing-site-get-rights.md)
- [{#T}](./extended-model/landing-site-set-rights.md)
- [{#T}](./role-model/landing-role-get-list.md)
- [{#T}](./role-model/landing-role-get-rights.md)
- [{#T}](./role-model/landing-role-set-access-codes.md)
- [{#T}](./role-model/landing-role-set-rights.md)
