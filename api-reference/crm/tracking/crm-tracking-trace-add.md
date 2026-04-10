# Создать трейс сквозной аналитики crm.tracking.trace.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь может создать трейс
> - пользователь с правом на изменение объекта может привязать трейс

Метод `crm.tracking.trace.add` создает трейс сквозной аналитики и возвращает его идентификатор.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TRACE**^*^
[`string`](../../data-types.md) | JSON-строка с данными трейса.

Для получения корректного значения смотрите [туториал](../../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md) ||
|| **ENTITIES**
[`object[]`](../../data-types.md) | Массив объектов, которые нужно связать с трейсом [подробнее](#entities) ||
|#

### Параметр ENTITIES {#entities}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**^*^
[`string`](../../data-types.md) | Тип объекта. Возможные значения:

- `COMPANY`
- `CONTACT`
- `DEAL`
- `LEAD`
- `QUOTE` ||
|| **ID**^*^
[`integer`](../../data-types.md) | Идентификатор элемента.

Для указанного объекта у пользователя должны быть права на изменение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример создания трейса сквозной аналитики, где:
- `TRACE` — JSON-строка с данными трейса
- `ENTITIES` — объекты, которые связываются с трейсом

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "TRACE": "{\"SOURCE_ID\":\"6\",\"SOURCE_DESC\":\"Direct sale\",\"PAGES\":[{\"URL\":\"https://example.com/\",\"DATE\":\"2024-04-03T10:26:32+03:00\"}]}",
        "ENTITIES": [
          {
            "TYPE": "CONTACT",
            "ID": 3215
          },
          {
            "TYPE": "LEAD",
            "ID": 1
          }
        ]
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/crm.tracking.trace.add.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "TRACE": "{\"SOURCE_ID\":\"6\",\"SOURCE_DESC\":\"Direct sale\",\"PAGES\":[{\"URL\":\"https://example.com/\",\"DATE\":\"2024-04-03T10:26:32+03:00\"}]}",
        "ENTITIES": [
          {
            "TYPE": "CONTACT",
            "ID": 3215
          },
          {
            "TYPE": "LEAD",
            "ID": 1
          }
        ],
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/crm.tracking.trace.add.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.tracking.trace.add',
    		{
    			TRACE: '{"SOURCE_ID":"6","SOURCE_DESC":"Direct sale","PAGES":[{"URL":"https://example.com/","DATE":"2024-04-03T10:26:32+03:00"}]}',
    			ENTITIES: [
    				{
    					TYPE: 'CONTACT',
    					ID: 3215
    				},
    				{
    					TYPE: 'LEAD',
    					ID: 1
    				}
    			]
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
                'crm.tracking.trace.add',
                [
                    'TRACE' => '{"SOURCE_ID":"6","SOURCE_DESC":"Direct sale","PAGES":[{"URL":"https://example.com/","DATE":"2024-04-03T10:26:32+03:00"}]}',
                    'ENTITIES' => [
                        [
                            'TYPE' => 'CONTACT',
                            'ID' => 3215,
                        ],
                        [
                            'TYPE' => 'LEAD',
                            'ID' => 1,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding trace: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.tracking.trace.add',
        {
            TRACE: '{"SOURCE_ID":"6","SOURCE_DESC":"Direct sale","PAGES":[{"URL":"https://example.com/","DATE":"2024-04-03T10:26:32+03:00"}]}',
            ENTITIES: [
                {
                    TYPE: 'CONTACT',
                    ID: 3215
                },
                {
                    TYPE: 'LEAD',
                    ID: 1
                }
            ]
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
    $result = CRest::call(
        'crm.tracking.trace.add',
        [
            'TRACE' => '{"SOURCE_ID":"6","SOURCE_DESC":"Direct sale","PAGES":[{"URL":"https://example.com/","DATE":"2024-04-03T10:26:32+03:00"}]}',
            'ENTITIES' => [
                [
                    'TYPE' => 'CONTACT',
                    'ID' => 3215,
                ],
                [
                    'TYPE' => 'LEAD',
                    'ID' => 1,
                ],
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 341,
    "time": {
        "start": 1775117366,
        "finish": 1775117367.080829,
        "duration": 1.0808289051055908,
        "processing": 0,
        "date_start": "2026-04-02T11:09:26+03:00",
        "date_finish": "2026-04-02T11:09:27+03:00",
        "operating_reset_at": 1775117967,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного трейса ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Parameter `TRACE` required."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Parameter `TRACE` required. | Не передан параметр `TRACE` ||
|| `400` | `ERROR_CORE` | Can not parse JSON in parameter `TRACE`. | Значение `TRACE` не является корректной JSON-строкой ||
|| `400` | `ERROR_CORE` | Wrong TYPE in parameter `ENTITIES`. Allowed types: COMPANY,CONTACT,DEAL,LEAD,QUOTE | Передан недопустимый `TYPE` в `ENTITIES` ||
|| `400` | `ERROR_CORE` | Wrong ID in parameter `ENTITIES`. | Передан некорректный `ID` в `ENTITIES` ||
|| `400` | `ERROR_CORE` | You have no access to entity `<TYPE>` with ID `<ID>`. | Нет прав на изменение объекта, указанного в `ENTITIES` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-lead.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-contact.md)




