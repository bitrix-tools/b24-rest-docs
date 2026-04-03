# Получить привязки к меню landing.site.getMenuBindings

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.site.getMenuBindings` возвращает привязки Баз знаний к меню.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **menuCode**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Код меню для фильтрации.

Если не передан, возвращаются привязки для всех меню.

`menuCode` можно получить:
- в интерфейсе через пункт «Выбрать Базу знаний»: в URL открывшегося фрейма параметр `menuId` содержит код меню (например, `menuId=crm_switcher:deal`)
- из результата метода [landing.site.getMenuBindings](./landing-site-get-menu-bindings.md) в поле `BINDING_ID` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения привязок к меню, где:
- `menuCode` — код меню для фильтрации

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "menuCode": "crm_switcher:deal"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getMenuBindings.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "menuCode": "crm_switcher:deal",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getMenuBindings.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getMenuBindings',
    		{
    			menuCode: 'crm_switcher:deal'
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
                'landing.site.getMenuBindings',
                [
                    'menuCode' => 'crm_switcher:deal',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting menu bindings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getMenuBindings',
        {
            menuCode: 'crm_switcher:deal'
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
        'landing.site.getMenuBindings',
        [
            'menuCode' => 'crm_switcher:deal',
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
        {
            "ENTITY_ID": "39",
            "ENTITY_TYPE": "S",
            "BINDING_ID": "socialnetwork:group_notifications",
            "TITLE": "База знаний",
            "PUBLIC_URL": "https://bitrix24.ru/knowledge/baza_znaniy/"
        }
    ],
    "time": {
        "start": 1774956995,
        "finish": 1774956995.125436,
        "duration": 0.12543606758117676,
        "processing": 0,
        "date_start": "2026-03-31T14:36:35+03:00",
        "date_finish": "2026-03-31T14:36:35+03:00",
        "operating_reset_at": 1774957595,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список привязок к меню [подробнее](#menu-binding-item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип элемента result {#menu-binding-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор сайта ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта:

- `S` — сайт
- `L` — лендинг ||
|| **BINDING_ID**
[`string`](../../../data-types.md) | Код меню ||
|| **TITLE**
[`string`](../../../data-types.md) | Название привязанного сайта ||
|| **PUBLIC_URL**
[`string`](../../../data-types.md) | Публичный URL привязанного сайта ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `TYPE_ERROR` | Ошибка типа данных | Параметр `menuCode` передан в несовместимом типе ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-binding-to-menu.md)
- [{#T}](./landing-site-unbinding-from-menu.md)
- [{#T}](./landing-site-get-group-bindings.md)
- [{#T}](./landing-site-binding-to-group.md)
- [{#T}](./index.md)
