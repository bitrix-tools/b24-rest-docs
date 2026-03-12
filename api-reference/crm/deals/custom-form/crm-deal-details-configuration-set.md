# Установить параметры карточки сделки crm.deal.details.configuration.set

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - пользователь может устанавливать свои личные настройки
> - установить личные настройки другого пользователя можно при наличии прав на редактирование персонального вида для пользователя
> - установить общие настройки можно при наличии прав на редактирование общего вида

{% note warning "Развитие метода остановлено" %}

Метод `crm.deal.details.configuration.set` продолжает работать, но у него есть более актуальный аналог [crm.item.details.configuration.set](../../universal/item-details-configuration/crm-item-details-configuration-set.md).

{% endnote %}

Метод `crm.deal.details.configuration.set` устанавливает настройки карточки сделки. Метод записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

{% note info %}

Настройки карточки сделок в разных воронках могут отличаться. Для выбора воронки используйте параметр `extras.dealCategoryId`.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек.

Возможные значения:
- `P` — личные настройки
- `C` — общие настройки

По умолчанию — `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при установке личных настроек другого пользователя.

Если не задан, берется текущий
||
|| **data***
[`section[]`](#section) | Список `section`, описывающий конфигурацию разделов карточки сделки. Структура `section` описана ниже ||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры [(подробное описание)](#parameter-extras) ||
|#

### Параметр extras {#parameter-extras}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dealCategoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки сделок. Можно получить с помощью [crm.category.list](../../universal/category/crm-category-list.md)

Если не указан, используется воронка по умолчанию для сделок
||
|#

### Параметр section {#section}

Описывает отдельный раздел с полями внутри карточки сделки

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Уникальное название раздела ||
|| **title***
[`string`](../../../data-types.md) | Название раздела ||
|| **type***
[`string`](../../../data-types.md) | Тип раздела

На данный момент доступно только значение `section`
||
|| **elements**
[`section_element[]`](#section_element) | Список выводимых в карточке полей с дополнительными настройками ||
|#

### Параметр section_element {#section_element}

Конфигурация отдельного поля внутри раздела

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Идентификатор поля. Список доступных полей можно узнать с помощью [`crm.deal.fields`](../crm-deal-fields.md) ||
|| **optionFlags**
[`integer`](../../../data-types.md) | Нужно ли показывать поле всегда:
- `1` — да
- `0` — нет

По умолчанию — `0`
||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля. Состав зависит от поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить личную конфигурацию карточки сделки для пользователя с `id = 1` в воронке с `id = 32`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"P","userId":1,"extras":{"dealCategoryId":32},"data":[{"name":"main","title":"О сделке","type":"section","elements":[{"name":"TITLE"},{"name":"OPPORTUNITY_WITH_CURRENCY"},{"name":"STAGE_ID"},{"name":"CLOSEDATE"},{"name":"CLIENT"}]},{"name":"additional","title":"Дополнительно","type":"section","elements":[{"name":"TYPE_ID"},{"name":"SOURCE_ID"},{"name":"SOURCE_DESCRIPTION"},{"name":"OPENED"},{"name":"ASSIGNED_BY_ID"},{"name":"COMMENTS"}]},{"name":"products","title":"Товары","type":"section","elements":[{"name":"PRODUCT_ROW_SUMMARY"}]}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.details.configuration.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"P","userId":1,"extras":{"dealCategoryId":32},"data":[{"name":"main","title":"О сделке","type":"section","elements":[{"name":"TITLE"},{"name":"OPPORTUNITY_WITH_CURRENCY"},{"name":"STAGE_ID"},{"name":"CLOSEDATE"},{"name":"CLIENT"}]},{"name":"additional","title":"Дополнительно","type":"section","elements":[{"name":"TYPE_ID"},{"name":"SOURCE_ID"},{"name":"SOURCE_DESCRIPTION"},{"name":"OPENED"},{"name":"ASSIGNED_BY_ID"},{"name":"COMMENTS"}]},{"name":"products","title":"Товары","type":"section","elements":[{"name":"PRODUCT_ROW_SUMMARY"}]}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.details.configuration.set
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.details.configuration.set',
    		{
    			scope: "P",
    			userId: 1,
    			extras: {
    				dealCategoryId: 32,
    			},
    			data: [
    				{
    					name: "main",
    					title: "О сделке",
    					type: "section",
    					elements: [
    						{ name: "TITLE" },
    						{ name: "OPPORTUNITY_WITH_CURRENCY" },
    						{ name: "STAGE_ID" },
    						{ name: "CLOSEDATE" },
    						{ name: "CLIENT" },
    					],
    				},
    				{
    					name: "additional",
    					title: "Дополнительно",
    					type: "section",
    					elements: [
    						{ name: "TYPE_ID" },
    						{ name: "SOURCE_ID" },
    						{ name: "SOURCE_DESCRIPTION" },
    						{ name: "OPENED" },
    						{ name: "ASSIGNED_BY_ID" },
    						{ name: "COMMENTS" },
    					],
    				},
    				{
    					name: "products",
    					title: "Товары",
    					type: "section",
    					elements: [
    						{ name: "PRODUCT_ROW_SUMMARY" },
    					],
    				},
    			],
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
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
                'crm.deal.details.configuration.set',
                [
                    'scope'  => 'P',
                    'userId' => 1,
                    'extras' => [
                        'dealCategoryId' => 32,
                    ],
                    'data' => [
                        [
                            'name'     => 'main',
                            'title'    => 'О сделке',
                            'type'     => 'section',
                            'elements' => [
                                ['name' => 'TITLE'],
                                ['name' => 'OPPORTUNITY_WITH_CURRENCY'],
                                ['name' => 'STAGE_ID'],
                                ['name' => 'CLOSEDATE'],
                                ['name' => 'CLIENT'],
                            ],
                        ],
                        [
                            'name'     => 'additional',
                            'title'    => 'Дополнительно',
                            'type'     => 'section',
                            'elements' => [
                                ['name' => 'TYPE_ID'],
                                ['name' => 'SOURCE_ID'],
                                ['name' => 'SOURCE_DESCRIPTION'],
                                ['name' => 'OPENED'],
                                ['name' => 'ASSIGNED_BY_ID'],
                                ['name' => 'COMMENTS'],
                            ],
                        ],
                        [
                            'name'     => 'products',
                            'title'    => 'Товары',
                            'type'     => 'section',
                            'elements' => [
                                ['name' => 'PRODUCT_ROW_SUMMARY'],
                            ],
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
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting deal details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.details.configuration.set',
        {
            scope: "P",
            userId: 1,
            extras: {
                dealCategoryId: 32,
            },
            data: [
                {
                    name: "main",
                    title: "О сделке",
                    type: "section",
                    elements: [
                        { name: "TITLE" },
                        { name: "OPPORTUNITY_WITH_CURRENCY" },
                        { name: "STAGE_ID" },
                        { name: "CLOSEDATE" },
                        { name: "CLIENT" },
                    ],
                },
                {
                    name: "additional",
                    title: "Дополнительно",
                    type: "section",
                    elements: [
                        { name: "TYPE_ID" },
                        { name: "SOURCE_ID" },
                        { name: "SOURCE_DESCRIPTION" },
                        { name: "OPENED" },
                        { name: "ASSIGNED_BY_ID" },
                        { name: "COMMENTS" },
                    ],
                },
                {
                    name: "products",
                    title: "Товары",
                    type: "section",
                    elements: [
                        { name: "PRODUCT_ROW_SUMMARY" },
                    ],
                },
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
        'crm.deal.details.configuration.set',
        [
            'scope' => 'P',
            'userId' => 1,
            'extras' => [
                'dealCategoryId' => 32,
            ],
            'data' => [
                [
                    'name' => 'main',
                    'title' => 'О сделке',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'TITLE'],
                        ['name' => 'OPPORTUNITY_WITH_CURRENCY'],
                        ['name' => 'STAGE_ID'],
                        ['name' => 'CLOSEDATE'],
                        ['name' => 'CLIENT'],
                    ],
                ],
                [
                    'name' => 'additional',
                    'title' => 'Дополнительно',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'TYPE_ID'],
                        ['name' => 'SOURCE_ID'],
                        ['name' => 'SOURCE_DESCRIPTION'],
                        ['name' => 'OPENED'],
                        ['name' => 'ASSIGNED_BY_ID'],
                        ['name' => 'COMMENTS'],
                    ],
                ],
                [
                    'name' => 'products',
                    'title' => 'Товары',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'PRODUCT_ROW_SUMMARY'],
                    ],
                ],
            ],
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
        "start": 1773311825,
        "finish": 1773311825.969825,
        "duration": 0.969825029373169,
        "processing": 0,
        "date_start": "2026-03-12T13:37:05+03:00",
        "date_finish": "2026-03-12T13:37:05+03:00",
        "operating_reset_at": 1773312425,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true` в случае успешной записи настроек ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied | Нет прав на установку настроек карточки сделки ||
|| `400` | Пустое значение | Parameter 'data' must be array | В `data` передан не массив ||
|| `400` | Пустое значение | There are no data to write | В `data` передан пустой массив ||
|| `400` | Пустое значение | The data must be indexed array | В `data` передан не индексированный массив ||
|| `400` | Пустое значение | Section at index `i` have type `data[i].type`. The expected type is 'section' | В `data[i].type` находится значение, отличное от `section` ||
|| `400` | Пустое значение | Section at index `i` does not have name | В `data[i].name` передано пустое значение ||
|| `400` | Пустое значение | Section at index `i` does not have title | В `data[i].title` передано пустое значение ||
|| `400` | Пустое значение | Element at index `j` in section at index `i` does not have name | В `data[i].elements[j].name` передано пустое значение ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-deal-details-configuration-get.md)
- [{#T}](./crm-deal-details-configuration-reset.md)
- [{#T}](./crm-deal-details-configuration-force-common-scope-for-all.md)
