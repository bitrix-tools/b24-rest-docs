# Получить права доступа к сайту landing.site.getRights

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» раздела «Сайты и магазины»

Метод `landing.site.getRights` получает список прав текущего пользователя для указанного сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 645
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getRights.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 645,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getRights.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.site.getRights',
            {
                id: 645
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
                'landing.site.getRights',
                [
                    'id' => 645,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting site rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getRights',
        {
            id: 645
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
        'landing.site.getRights',
        [
            'id' => 645,
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
    "result": [
        "read",
        "edit",
        "sett"
    ],
    "time": {
        "start": 1774765200,
        "finish": 1774765200.411258,
        "duration": 0.4112579822540283,
        "processing": 0,
        "date_start": "2026-03-29T10:00:00+03:00",
        "date_finish": "2026-03-29T10:00:00+03:00",
        "operating_reset_at": 1774765800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string[]`](../../../data-types.md) | Коды прав текущего пользователя для указанного сайта.

Массив может содержать одно или несколько значений:
`denied` - для текущего пользователя или одной из его групп доступа запрещен доступ к сайту
`read` - просмотр сайта
`edit` - изменение страниц сайта
`sett` - изменение настроек сайта
`public` - публикация сайта
`delete` - перемещение сайта в корзину и восстановление из корзины

Если для пользователя настроены разные права, `denied` может возвращаться вместе с разрешающими кодами.

Если сайт не найден или недоступен текущему пользователю, метод возвращает пустой массив ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | У пользователя нет доступа к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | Настройка прав недоступна на текущем тарифе. Чтобы работать с правами, перейдите на другой тариф ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-set-rights.md)
- [{#T}](../landing-role-is-enabled.md)
- [{#T}](../landing-role-enable.md)
