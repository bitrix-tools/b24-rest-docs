# Установить параметры карточки crm.company.details.configuration.set

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может установить свои настройки,
>  - пользователь с правом «Разрешить изменять настройки» в CRM может установить чужие и общие настройки

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.details.configuration.set` продолжает работать, но у него есть более актуальный аналог [crm.item.details.configuration.set](../../universal/item-details-configuration/crm-item-details-configuration-set.md).

{% endnote %}

Метод `crm.company.details.configuration.set` устанавливает настройки карточки компаний: записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

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
[`user`](../../../data-types.md) |  Идентификатор пользователя, получить можно методом [user.get](../../../user/user-get.md). Нужен только при установке личных настроек.

Если не задан — берется `id` текущего пользователя
||
|| **data***
[`section[]`](#section) | Список `section` описывает конфигурацию разделов полей в карточке компании.

Структура описана [ниже](#section) ||
|#

### section

Описывает отдельно взятый раздел с полями внутри карточки компании.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Уникальное название раздела ||
|| **title***
[`string`](../../../data-types.md) | Название раздела.

Отображается в карточке элемента ||
|| **type***
[`string`](../../../data-types.md) | Тип раздела.

На данный момент доступно только значение `'section'` ||
|| **elements**
[`section_element[]`](#section_element) | Массив `section_element` описывает конфигурацию полей в разделе.

Структура описана [ниже](#section_element) ||
|#

#### section_element

Конфигурация отдельно взятого поля внутри раздела.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Идентификатор поля.

Список доступных полей можно узнать с помощью [`crm.company.fields`](../crm-company-fields.md) ||
|| **optionFlags**
[`integer`](../../../data-types.md) | Нужно ли показывать поле всегда:
- `1` — да
- `0` — нет

По умолчанию — `0` ||
|| **options**
[`object`](../../../data-types.md) | Дополнительный [список опций](#options) для поля ||
|#

#### section_element.options {#options}

#|
|| **Название**
`тип` | **Поля, где доступна опция** | **Описание** ||
|| **defaultAddressType**
[`integer`](../../../data-types.md) | `ADDRESS` | Идентификатор типа адреса по умолчанию. Чтобы узнать возможные типы адресов, используйте [`crm.enum.addresstype`](../../auxiliary/enum/crm-enum-address-type.md) ||
|| **defaultCountry**
[`string`](../../../data-types.md) | 
`PHONE`
`CLIENT`
`COMPANY`
`CONTACT`
`MYCOMPANY_ID` | Код страны для формата телефонного номера по умолчанию — строка из двух латинских букв.

Например `"RU"` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Для пользователя с `id = 1` в компаниях установить конфигурацию карточки:

- Раздел 1 — **О компании**
    - Название
    - Логотип
    - Тип компании
    - Должность
    - Телефон
        - Страна по умолчанию: **Россия(+7)**
    - E-mail
    - Контакт
- Раздел 2 — **Дополнительно**
    - Сфера деятельности
    - Доступна ли компания для всех
    - Ответственный**
    - Комментарий


{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1,"data":[{"name":"main","title":"О компании","type":"section","elements":[{"name":"TITLE"},{"name":"LOGO"},{"name":"COMPANY_TYPE"},{"name":"POST"},{"name":"PHONE","options":{"defaultCountry":"RU"}},{"name":"EMAIL"},{"name":"CONTACT"}]},{"name":"additional","title":"Дополнительно","type":"section","elements":[{"name":"INDUSTRY"},{"name":"OPENED"},{"name":"ASSIGNED_BY_ID"},{"name":"COMMENTS"}]}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.details.configuration.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1,"data":[{"name":"main","title":"О компании","type":"section","elements":[{"name":"TITLE"},{"name":"LOGO"},{"name":"COMPANY_TYPE"},{"name":"POST"},{"name":"PHONE","options":{"defaultCountry":"RU"}},{"name":"EMAIL"},{"name":"CONTACT"}]},{"name":"additional","title":"Дополнительно","type":"section","elements":[{"name":"INDUSTRY"},{"name":"OPENED"},{"name":"ASSIGNED_BY_ID"},{"name":"COMMENTS"}]}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.details.configuration.set
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.company.details.configuration.set",
    		{
    			userId: 1,
    			data:
    			[
    				{
    					name: "main",
    					title: "О компании",
    					type: "section",
    					elements:
    					[
    						{ name: "TITLE" },
    						{ name: "LOGO" },
    						{ name: "COMPANY_TYPE" },
    						{ name: "POST" },
    					{
    						name: "PHONE",
    						options: {
    							defaultCountry: "RU",
    						},
    					},
    						{ name: "EMAIL" },
    						{ name: "CONTACT" }
    					]
    				},
    				{
    					name: "additional",
    					title: "Дополнительно",
    					type: "section",
    					elements:
    					[
    						{ name: "INDUSTRY" },
    						{ name: "OPENED" },
    						{ name: "ASSIGNED_BY_ID" },
    						{ name: "COMMENTS" }
    					]
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch(error)
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
                'crm.company.details.configuration.set',
                [
                    'userId' => 1,
                    'data' => [
                        [
                            'name' => 'main',
                            'title' => 'О компании',
                            'type' => 'section',
                            'elements' => [
                                ['name' => 'TITLE'],
                                ['name' => 'LOGO'],
                                ['name' => 'COMPANY_TYPE'],
                                ['name' => 'POST'],
                                [
                                    'name' => 'PHONE',
                                    'options' => [
                                        'defaultCountry' => 'RU',
                                    ],
                                ],
                                ['name' => 'EMAIL'],
                                ['name' => 'CONTACT']
                            ]
                        ],
                        [
                            'name' => 'additional',
                            'title' => 'Дополнительно',
                            'type' => 'section',
                            'elements' => [
                                ['name' => 'INDUSTRY'],
                                ['name' => 'OPENED'],
                                ['name' => 'ASSIGNED_BY_ID'],
                                ['name' => 'COMMENTS']
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting company details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.details.configuration.set",
        {
            userId: 1,
            data:
            [
                {
                    name: "main",
                    title: "О компании",
                    type: "section",
                    elements:
                    [
                        { name: "TITLE" },
                        { name: "LOGO" },
                        { name: "COMPANY_TYPE" },
                        { name: "POST" },
                        {
                            name: "PHONE",
                            options: {
                                defaultCountry: "RU",
                            },
                        },
                        { name: "EMAIL" },
                        { name: "CONTACT" }
                    ]
                },
                {
                    name: "additional",
                    title: "Дополнительно",
                    type: "section",
                    elements:
                    [
                        { name: "INDUSTRY" },
                        { name: "OPENED" },
                        { name: "ASSIGNED_BY_ID" },
                        { name: "COMMENTS" }
                    ]
                }
            ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.details.configuration.set',
        [
            'userId' => 1,
            'data' => [
                [
                    'name' => 'main',
                    'title' => 'О компании',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'TITLE'],
                        ['name' => 'LOGO'],
                        ['name' => 'COMPANY_TYPE'],
                        ['name' => 'POST'],
                        [
                            'name' => 'PHONE',
                            'options' => [
                                'defaultCountry' => 'RU',
                            ],
                        ],
                        ['name' => 'EMAIL'],
                        ['name' => 'CONTACT'],
                    ]
                ],
                [
                    'name' => 'additional',
                    'title' => 'Дополнительно',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'INDUSTRY'],
                        ['name' => 'OPENED'],
                        ['name' => 'ASSIGNED_BY_ID'],
                        ['name' => 'COMMENTS'],
                    ]
                ],
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
        "start": 1769419970,
        "finish": 1769419970.57774,
        "duration": 0.577739953994751,
        "processing": 0,
        "date_start": "2026-01-26T12:32:50+03:00",
        "date_finish": "2026-01-26T12:32:50+03:00",
        "operating_reset_at": 1769420570,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Element at index 0 in section at index 1 does not have name."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Access denied | У пользователя нет прав изменять настройки CRM ||
|| `-` | Parameter 'data' must be array | В `data` передан не массив ||
|| `-` | The data must be indexed array | В `data` передан не индексированный массив ||
|| `-` | There are no data to write | В `data` передан пустой массив ||
|| `-` | Section at index `#` have type `data[i].type`. The expected type is 'section' | В `data[i].type` находится значение отличное от `'section'` ||
|| `-` | Section at index `#` does not have name | В `data[i].name` передано пустое значение ||
|| `-` | Section at index `#` does not have title | В `data[i].title` передано пустое значение ||
|| `-` | Element at index `#` in section at index `#` does not have name | В `data[i].elements[j].name` передано пустое значение ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-company-details-configuration-get.md)
- [{#T}](./crm-company-details-configuration-force-common-scope-for-all.md)
- [{#T}](./crm-company-details-configuration-reset.md)
