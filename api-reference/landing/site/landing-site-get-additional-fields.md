# Получить дополнительные поля сайта landing.site.getadditionalfields

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.site.getadditionalfields` получает дополнительные поля сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 205
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getadditionalfields.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 205,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getadditionalfields.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getadditionalfields',
    		{
    			id: 205
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
                'landing.site.getadditionalfields',
                [
                    'id' => 205,
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
        'landing.site.getadditionalfields',
        {
            id: 205
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
        'landing.site.getadditionalfields',
        [
            'id' => 205,
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

Ниже приведен сокращенный пример ответа. Фактический набор полей зависит от настроек конкретного сайта.

```json
{
    "result": {
        "COOKIES_USE": "Y",
        "COOKIES_AGREEMENT_ID": "19",
        "COOKIES_COLOR_BG": "#03c1fe",
        "COOKIES_COLOR_TEXT": "#fff",
        "COOKIES_POSITION": "bottom_left",
        "COOKIES_MODE": "I",
        "B24BUTTON_CODE": "https://cdn-ru.bitrix24.ru/b13743910/crm/site_button/loader_1_68znkz.js",
        "B24BUTTON_COLOR": "site",
        "B24BUTTON_COLOR_VALUE": "#03c1fe",
        "COPYRIGHT_SHOW": "Y",
        "COPYRIGHT_CODE": "6",
        "SETTINGS_PRICE_CODE": [
            "BASE"
        ],
        "SETTINGS_SHOW_PRICE_COUNT": 1,
        "SETTINGS_CURRENCY_ID": "RUB",
        "SPEED_USE_LAZY": "Y",
        "THEME_CODE": "1construction",
        "THEME_COLOR": "#f7b70b",
        "YACOUNTER_USE": "Y",
        "YACOUNTER_COUNTER": "73521121",
        "ROBOTS_USE": "Y",
        "ROBOTS_CONTENT": "Disallow: /preview/*",
        "CSSBLOCK_USE": "N",
        "HEADBLOCK_USE": "N"
    },
    "time": {
        "start": 1773278929,
        "finish": 1773278929.806224,
        "duration": 0.8062241077423096,
        "processing": 0,
        "date_start": "2026-03-12T04:28:49+03:00",
        "date_finish": "2026-03-12T04:28:49+03:00",
        "operating_reset_at": 1773279529,
        "operating": 0.11928892135620117
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) \| `null` | Набор дополнительных полей сайта в формате `{"<КОД_ПОЛЯ>": "<ЗНАЧЕНИЕ>"}`. 

Если доступных полей нет, метод может вернуть `null` или пустой массив `[]` [(подробное описание)](#result-fields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **<КОД_ПОЛЯ>**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) \| [`boolean`](../../data-types.md) \| [`array`](../../data-types.md) \| [`object`](../../data-types.md) | Пара «код поля → значение поля». 

Значение может быть строкой (`"Y"`, `"#03c1fe"`), числом (`1`) или массивом (например, `["BASE"]`). 

Состав и тип значения зависят от конкретного дополнительного поля. Доступные коды полей описаны в [списке дополнительных полей сайта](./additional-fields.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-folders.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-get-preview.md)
- [{#T}](./landing-site-get-public-url.md)
