# Установить набор контактов, связанных с указанной сделкой crm.deal.contact.items.set

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» сделок

Метод `crm.deal.contact.items.set` устанавливает набор контактов, связанных с указанной сделкой. Контакты, которых нет в переданном списке, будут отвязаны.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сделки

Можно получить с помощью методов [crm.deal.list](../crm-deal-list.md) или [crm.deal.add](../crm-deal-add.md)
||
|| **items***
[`object[]`](../../../data-types.md) | Набор объектов, которые описывают привязанные контакты к сделке [(подробное описание)](#deal_contact_binding) ||
|#

### Структура объекта привязки {#deal_contact_binding}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который будет привязан к сделке

Идентификатор можно получить с помощью методов [crm.contact.list](../../contacts/crm-contact-list.md) или [crm.contact.add](../../contacts/crm-contact-add.md) ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет

Если нет привязки с `IS_PRIMARY = Y`, то она выставляется у первой привязки в `items`.

Если передано несколько привязок с `IS_PRIMARY = Y`, то первичной будет считаться первая привязка с `IS_PRIMARY = Y` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки

По умолчанию `(i + 1) * 10`, где `i` — индекс элемента в массиве `items`, начиная с 0 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить у сделки с `id = 1875` следующие привязанные контакты:
- контакт с `id = 55`, сделать его первичным и установить `SORT = 100`
- контакт с `id = 54`, установить `SORT = 200`
- контакт с `id = 56`, установить `SORT = 400`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"items":[{"CONTACT_ID":55,"IS_PRIMARY":"Y","SORT":100},{"CONTACT_ID":54,"SORT":200},{"CONTACT_ID":56,"SORT":400}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.contact.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"items":[{"CONTACT_ID":55,"IS_PRIMARY":"Y","SORT":100},{"CONTACT_ID":54,"SORT":200},{"CONTACT_ID":56,"SORT":400}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.contact.items.set
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.contact.items.set',
    		{
    			id: 1875,
    			items: [
    				{
    					CONTACT_ID: 55,
    					IS_PRIMARY: "Y",
    					SORT: 100,
    				},
    				{
    					CONTACT_ID: 54,
    					SORT: 200,
    				},
    				{
    					CONTACT_ID: 56,
    					SORT: 400,
    				}
    			],
    		}
    	);

    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result)
    	;
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
                'crm.deal.contact.items.set',
                [
                    'id'    => 1875,
                    'items' => [
                        [
                            'CONTACT_ID' => 55,
                            'IS_PRIMARY' => 'Y',
                            'SORT'       => 100,
                        ],
                        [
                            'CONTACT_ID' => 54,
                            'SORT'       => 200,
                        ],
                        [
                            'CONTACT_ID' => 56,
                            'SORT'       => 400,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            // Нужная вам логика обработки данных
            processData($result->data());
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting deal contact items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.contact.items.set',
        {
            id: 1875,
            items: [
                {
                    CONTACT_ID: 55,
                    IS_PRIMARY: "Y",
                    SORT: 100,
                },
                {
                    CONTACT_ID: 54,
                    SORT: 200,
                },
                {
                    CONTACT_ID: 56,
                    SORT: 400,
                }
            ],
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.contact.items.set',
        [
            'id' => 1875,
            'items' => [
                [
                    'CONTACT_ID' => 55,
                    'IS_PRIMARY' => 'Y',
                    'SORT' => 100,
                ],
                [
                    'CONTACT_ID' => 54,
                    'SORT' => 200,
                ],
                [
                    'CONTACT_ID' => 56,
                    'SORT' => 400,
                ]
            ]
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
    "result": true,
    "time": {
        "start": 1773225418,
        "finish": 1773225418.981286,
        "duration": 0.9812860488891602,
        "processing": 0,
        "date_start": "2026-03-11T13:36:58+03:00",
        "date_finish": "2026-03-11T13:36:58+03:00",
        "operating_reset_at": 1773226018,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `The parameter ownerEntityID is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| `-` | `The parameter items must be array.` | В `items` передан не массив ||
|| `-` | `Access denied.` | У пользователя нет прав на изменение сделок ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на изменение сделки ||
|| `-` | `Not found.` | Сделка с переданным `id` не найдена ||
|| `ERROR_CORE` | `-` | Внутренняя ошибка при нормализации привязок ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-contact-add.md)
- [{#T}](./crm-deal-contact-delete.md)
- [{#T}](./crm-deal-contact-fields.md)
- [{#T}](./crm-deal-contact-items-get.md)
- [{#T}](./crm-deal-contact-items-delete.md)
