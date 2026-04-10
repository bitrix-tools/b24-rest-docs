# Получить список включаемых областей для сайта landing.template.getSiteRef

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.template.getSiteRef` получает список включаемых областей, которые привязаны к сайту.

В ответ входят только привязки, сохраненные для сайта. Привязки, настроенные у отдельных страниц этого сайта, метод не возвращает. Чтобы получить их, используйте [landing.template.getLandingRef](./landing-template-get-landing-ref.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](../site/landing-site-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 157
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.template.getSiteRef.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 157,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.template.getSiteRef.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.template.getSiteRef',
            {
                id: 157
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
                'landing.template.getSiteRef',
                [
                    'id' => 157,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting site refs: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.template.getSiteRef',
        {
            id: 157
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
        'landing.template.getSiteRef',
        [
            'id' => 157,
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

Если для сайта настроены включаемые области, метод вернет объект со списком этих привязок. В нем для каждой области указан идентификатор страницы, которая к ней привязана.

Если для сайта не сохранены привязки включаемых областей, метод возвращает `true`.

```json
{
    "result": {
        "1": 735,
        "2": 731
    },
    "time": {
        "start": 1774879192,
        "finish": 1774879192.923787,
        "duration": 0.9237871170043945,
        "processing": 0,
        "date_start": "2026-03-30T16:59:52+03:00",
        "date_finish": "2026-03-30T16:59:52+03:00",
        "operating_reset_at": 1774879792,
        "operating": 0
    }
}
```

```json
{
    "result": true,
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
[`object`](../../data-types.md) \| [`boolean`](../../data-types.md) | Привязки включаемых областей сайта в формате `{"<ID_ОБЛАСТИ>": <ID_СТРАНИЦЫ>}`.

Если для сайта сохранены привязки, метод возвращает объект. Если привязок нет, метод возвращает `true` [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **<ID_ОБЛАСТИ>**
[`integer`](../../data-types.md) | Идентификатор включаемой области шаблона. Значение по этому ключу содержит идентификатор страницы, назначенной в эту область ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENTITY_NOT_FOUND",
    "error_description": "Сущность не найдена"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ENTITY_NOT_FOUND` | Сайт не найден или недоступен ||
|| `ACCESS_DENIED` | Недостаточно прав для просмотра сайта ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-template-get-landing-ref.md)
- [{#T}](./landing-template-get-list.md)
- [{#T}](./landing-template-set-landing-ref.md)
- [{#T}](./landing-template-set-site-ref.md)
