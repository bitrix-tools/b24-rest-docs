# Получить дополнительные поля страницы landing.landing.getadditionalfields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.landing.getadditionalfields` получает [дополнительные поля](../additional-fields.md) страницы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 349
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.getadditionalfields.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 349,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.getadditionalfields.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.landing.getadditionalfields',
            {
                lid: 349
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
                'landing.landing.getadditionalfields',
                [
                    'lid' => 349,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting additional fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.getadditionalfields',
        {
            lid: 349
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
        'landing.landing.getadditionalfields',
        [
            'lid' => 349,
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

Ниже приведен сокращенный пример ответа. Фактический набор полей зависит от настроек страницы и подключенных для нее дополнительных полей.

```json
{
    "result": {
        "FONTS_CODE": "<noscript><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/...\" data-font=\"g-font-russo-one\"></noscript>",
        "GACOUNTER_USE": "N",
        "METAMAIN_USE": "Y",
        "METAMAIN_TITLE": "Фестиваль в Москве. 20-26 апреля 2022 г. Купить билеты онлайн",
        "METAOG_TITLE": "Фестиваль в Москве. 20-26 апреля 2022 г. Купить билеты онлайн",
        "METAOG_IMAGE": "https://cdn-ru.bitrix24.ru/.../cover_1x.webp",
        "SETTINGS_PRICE_CODE": [
            "BASE"
        ],
        "SETTINGS_SHOW_PRICE_COUNT": 1,
        "THEMEFONTS_LINE_HEIGHT": "1.6",
        "VIEW_TYPE": "no",
        "YACOUNTER_USE": "N"
    },
    "time": {
        "start": 1773722096,
        "finish": 1773722096.682451,
        "duration": 0.6824510097503662,
        "processing": 0,
        "date_start": "2026-03-17T12:34:56+03:00",
        "date_finish": "2026-03-17T12:34:56+03:00",
        "operating_reset_at": 1773722696,
        "operating": 0.11843705177307129
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Набор дополнительных полей страницы в формате `{"<КОД_ПОЛЯ>": "<ЗНАЧЕНИЕ>"}`.

Если у страницы нет доступных непустых дополнительных полей, метод возвращает пустой массив `[]` [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **<КОД_ПОЛЯ>**
[`string`](../../../data-types.md) \| [`integer`](../../../data-types.md) \| [`boolean`](../../../data-types.md) \| [`array`](../../../data-types.md) \| [`object`](../../../data-types.md) | Пара «код поля → значение поля». Метод возвращает только поля с непустыми значениями.  

Доступные коды полей перечислены в разделе [Дополнительные поля страницы](../additional-fields.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена: в `lid` передан идентификатор несуществующей или недоступной страницы ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-update.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-get-preview.md)
- [{#T}](./landing-landing-get-public-url.md)
