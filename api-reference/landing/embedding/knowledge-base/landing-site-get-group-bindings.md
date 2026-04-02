# Получить привязки к группам landing.site.getGroupBindings

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.site.getGroupBindings` возвращает привязки Баз знаний к группам.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId**
[`integer`](../../../data-types.md) \| [`null`](../../../data-types.md) | Идентификатор группы для фильтрации.

Если не передан, возвращаются привязки ко всем группам.

`groupId` можно получить из интерфейса группы или из результата текущего метода в поле `BINDING_ID` для уже существующих привязок ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения привязок к группам, где:
- `groupId` — идентификатор группы для фильтрации

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "groupId": 174
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getGroupBindings.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "groupId": 174,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getGroupBindings.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getGroupBindings',
    		{
    			groupId: 174
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
                'landing.site.getGroupBindings',
                [
                    'groupId' => 174,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting group bindings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getGroupBindings',
        {
            groupId: 174
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
        'landing.site.getGroupBindings',
        [
            'groupId' => 174,
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
            "ENTITY_ID": "65",
            "ENTITY_TYPE": "S",
            "BINDING_ID": "5",
            "TITLE": "База знаний в темной теме",
            "PUBLIC_URL": "https://bitrix24.ru/knowledge/group/baza_znaniy_v_temnoy_teme/"
        },
        {
            "ENTITY_ID": "41",
            "ENTITY_TYPE": "S",
            "BINDING_ID": "119",
            "TITLE": "База знаний",
            "PUBLIC_URL": "https://bitrix24.ru/knowledge/group/baza_znaniy/"
        }
    ],
    "time": {
        "start": 1774956574,
        "finish": 1774956574.718824,
        "duration": 0.7188239097595215,
        "processing": 0,
        "date_start": "2026-03-31T14:29:34+03:00",
        "date_finish": "2026-03-31T14:29:34+03:00",
        "operating_reset_at": 1774957174,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список привязок к группам [подробнее](#group-binding-item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип элемента result {#group-binding-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор сайта ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта:

- `S` — сайт ||
|| **BINDING_ID**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор группы ||
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
|| `TYPE_ERROR` | Ошибка типа данных | Параметр `groupId` передан в несовместимом типе ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-binding-to-group.md)
- [{#T}](./landing-site-unbinding-from-group.md)
- [{#T}](./landing-site-get-menu-bindings.md)
- [{#T}](./landing-site-binding-to-menu.md)
- [{#T}](./index.md)
