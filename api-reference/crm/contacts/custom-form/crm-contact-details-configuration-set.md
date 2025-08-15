# Установить параметры индивидуальной карточки crm.contact.details.configuration.set

> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод:
>  - Любой пользователь имеет право получать свои и общие настройки
>  - Только администратор имеет право получать чужие настройки

Метод устанавливает настройки карточки контактов: записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. 

Возможные значения:
- **P** — личные настройки
- **C** — общие настройки

По умолчанию — `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при установке личных настроек.

Если не задан — берется `id` текущего пользователя
||
|| **data***
[`section[]`](#section) | Список `section` описывает конфигурацию разделов полей в карточке элемента.

Структура описана [ниже](#section) ||
|#

### section

Описывает отдельно взятый раздел с полями внутри карточки контакта.

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

Список доступных полей можно узнать с помощью [`crm.contact.fields`](../crm-contact-fields.md) ||
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
|| **isPayButtonVisible**
[`boolean`](../../../data-types.md) | `OPPORTUNITY_WITH_CURRENCY` | Показана ли кнопка принятия оплаты.

Возможные значения:
- `'true'` — показана
- `'false'` — скрыта

По умолчанию — `true` ||
|| **isPaymentDocumentsVisible**
[`boolean`](../../../data-types.md) | `OPPORTUNITY_WITH_CURRENCY` | Показан ли блок «Оплата и доставка».

Возможные значения:
- `'true'` — показан
- `'false'` — скрыт

По умолчанию — `true`
||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Для пользователя с `id = 1` в контактах установить следующую конфигурацию карточки элементов:

- Раздел 1 — **Личные данные**
    - **Имя**
        - Показывать всегда
    - **Фамилия**
        - Показывать всегда
    - **Отчество**
    - **Дата рождения**
    - **Телефон**
        - Показывать всегда
        - Страна по умолчанию: **Великобритания(+44)**
    - **Адрес**
        - Показывать всегда
        - Тип адреса по умолчанию: **Адрес регистрации** (смотрите [`crm.enum.addresstype`](../../auxiliary/enum/crm-enum-address-type.md))
- Раздел 2 — **Основная информация**
    - **Тип контакта**
    - **Источник**
    - **Должность**
- Раздел 3 — **Дополнительная информация**
    - **Фотография**
    - **Комментарий**
    - **Пользовательское поле #1**


{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1,"data":[{"name":"section_1","title":"Личные данные","type":"section","elements":[{"name":"NAME","optionFlags":1},{"name":"LAST_NAME","optionFlags":1},{"name":"SECOND_NAME"},{"name":"BIRTHDATE"},{"name":"PHONE","optionFlags":1,"options":{"defaultCountry":"GB"}},{"name":"ADDRESS","optionFlags":1,"options":{"defaultAddressType":4}}]},{"name":"section_2","title":"Основная информация","type":"section","elements":[{"name":"TYPE_ID"},{"name":"SOURCE_ID"},{"name":"POST"}]},{"name":"section_3","title":"Дополнительная информация","type":"section","elements":[{"name":"PHOTO"},{"name":"COMMENTS"},{"name":"UF_CRM_1720697698689"}]}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.details.configuration.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1,"data":[{"name":"section_1","title":"Личные данные","type":"section","elements":[{"name":"NAME","optionFlags":1},{"name":"LAST_NAME","optionFlags":1},{"name":"SECOND_NAME"},{"name":"BIRTHDATE"},{"name":"PHONE","optionFlags":1,"options":{"defaultCountry":"GB"}},{"name":"ADDRESS","optionFlags":1,"options":{"defaultAddressType":4}}]},{"name":"section_2","title":"Основная информация","type":"section","elements":[{"name":"TYPE_ID"},{"name":"SOURCE_ID"},{"name":"POST"}]},{"name":"section_3","title":"Дополнительная информация","type":"section","elements":[{"name":"PHOTO"},{"name":"COMMENTS"},{"name":"UF_CRM_1720697698689"}]}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.contact.details.configuration.set',
    		{
    			userId: 1,
    			data: [
    				{
    					name: "section_1",
    					title: "Личные данные",
    					type: "section",
    					elements: [
    						{
    							name: "NAME",
    							optionFlags: 1,
    						},
    						{
    							name: "LAST_NAME",
    							optionFlags: 1,
    						},
    						{
    							name: "SECOND_NAME",
    						},
    						{
    							name: "BIRTHDATE",
    						},
    						{
    							name: "PHONE",
    							optionFlags: 1,
    							options: {
    								defaultCountry: "GB",
    							},
    						},
    						{
    							name: "ADDRESS",
    							optionFlags: 1,
    							options: {
    								defaultAddressType: 4,
    							},
    						},
    					],
    				},
    				{
    					name: "section_2",
    					title: "Основная информация",
    					type: "section",
    					elements: [
    						{ name: "TYPE_ID" },
    						{ name: "SOURCE_ID" },
    						{ name: "POST" },
    					],
    				},
    				{
    					name: "section_3",
    					title: "Дополнительная информация",
    					type: "section",
    					elements: [
    						{ name: "PHOTO" },
    						{ name: "COMMENTS" },
    						{ name: "UF_CRM_1720697698689" },
    					],
    				},
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
                'crm.contact.details.configuration.set',
                [
                    'userId' => 1,
                    'data'   => [
                        [
                            'name'     => "section_1",
                            'title'    => "Личные данные",
                            'type'     => "section",
                            'elements' => [
                                [
                                    'name'        => "NAME",
                                    'optionFlags' => 1,
                                ],
                                [
                                    'name'        => "LAST_NAME",
                                    'optionFlags' => 1,
                                ],
                                [
                                    'name' => "SECOND_NAME",
                                ],
                                [
                                    'name' => "BIRTHDATE",
                                ],
                                [
                                    'name'    => "PHONE",
                                    'optionFlags' => 1,
                                    'options' => [
                                        'defaultCountry' => "GB",
                                    ],
                                ],
                                [
                                    'name'    => "ADDRESS",
                                    'optionFlags' => 1,
                                    'options' => [
                                        'defaultAddressType' => 4,
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name'     => "section_2",
                            'title'    => "Основная информация",
                            'type'     => "section",
                            'elements' => [
                                ['name' => "TYPE_ID"],
                                ['name' => "SOURCE_ID"],
                                ['name' => "POST"],
                            ],
                        ],
                        [
                            'name'     => "section_3",
                            'title'    => "Дополнительная информация",
                            'type'     => "section",
                            'elements' => [
                                ['name' => "PHOTO"],
                                ['name' => "COMMENTS"],
                                ['name' => "UF_CRM_1720697698689"],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($response->getError()) {
            echo 'Error: ' . $response->getError();
        } else {
            echo 'Success: ' . print_r($result, true);
            // Нужная вам логика обработки данных
            processData($result);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting contact details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.details.configuration.set',
        {
            userId: 1,
            data: [
                {
                    name: "section_1",
                    title: "Личные данные",
                    type: "section",
                    elements: [
                        {
                            name: "NAME",
                            optionFlags: 1,
                        },
                        {
                            name: "LAST_NAME",
                            optionFlags: 1,
                        },
                        {
                            name: "SECOND_NAME",
                        },
                        {
                            name: "BIRTHDATE",
                        },
                        {
                            name: "PHONE",
                            optionFlags: 1,
                            options: {
                                defaultCountry: "GB",
                            },
                        },
                        {
                            name: "ADDRESS",
                            optionFlags: 1,
                            options: {
                                defaultAddressType: 4,
                            },
                        },
                    ],
                },
                {
                    name: "section_2",
                    title: "Основная информация",
                    type: "section",
                    elements: [
                        { name: "TYPE_ID" },
                        { name: "SOURCE_ID" },
                        { name: "POST" },
                    ],
                },
                {
                    name: "section_3",
                    title: "Дополнительная информация",
                    type: "section",
                    elements: [
                        { name: "PHOTO" },
                        { name: "COMMENTS" },
                        { name: "UF_CRM_1720697698689" },
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
        'crm.contact.details.configuration.set',
        [
            'userId' => 1,
            'data' => [
                [
                    'name' => 'section_1',
                    'title' => 'Личные данные',
                    'type' => 'section',
                    'elements' => [
                        [
                            'name' => 'NAME',
                            'optionFlags' => 1,
                        ],
                        [
                            'name' => 'LAST_NAME',
                            'optionFlags' => 1,
                        ],
                        [
                            'name' => 'SECOND_NAME',
                        ],
                        [
                            'name' => 'BIRTHDATE',
                        ],
                        [
                            'name' => 'PHONE',
                            'optionFlags' => 1,
                            'options' => [
                                'defaultCountry' => 'GB',
                            ],
                        ],
                        [
                            'name' => 'ADDRESS',
                            'optionFlags' => 1,
                            'options' => [
                                'defaultAddressType' => 4,
                            ],
                        ],
                    ],
                ],
                [
                    'name' => 'section_2',
                    'title' => 'Основная информация',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'TYPE_ID'],
                        ['name' => 'SOURCE_ID'],
                        ['name' => 'POST'],
                    ],
                ],
                [
                    'name' => 'section_3',
                    'title' => 'Дополнительная информация',
                    'type' => 'section',
                    'elements' => [
                        ['name' => 'PHOTO'],
                        ['name' => 'COMMENTS'],
                        ['name' => 'UF_CRM_1720697698689'],
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
        "start": 1724677217.639681,
        "finish": 1724677217.986853,
        "duration": 0.3471717834472656,
        "processing": 0.01840806007385254,
        "date_start": "2024-08-26T15:00:17+02:00",
        "date_finish": "2024-08-26T15:00:17+02:00",
        "operating": 0
    }
}
```

### Возвращаемые значения

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа.

Возвращает `true` в случае успеха ||
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
|| Пустое значение | Access denied. | У пользователя нет административных прав ||
|| Пустое значение | Parameter 'data' must be array. | В `data` передан не массив ||
|| Пустое значение | The data must be indexed array. | В `data` передан не индексированный массив ||
|| Пустое значение | There are no data to write. | В `data` передан пустой массив ||
|| Пустое значение | Section at index `i` have type `data[i].type`. The expected type is 'section'. | В `data[i].type` находится значение отличное от `'section'` ||
|| Пустое значение | Section at index `i` does not have name. | В `data[i].name` передано пустое значение ||
|| Пустое значение | Section at index `i` does not have title. | В `data[i].title` передано пустое значение ||
|| Пустое значение | Element at index `j` in section at index `i` does not have name. | В `data[i].elements[j].name` передано пустое значение ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-contact-details-configuration-get.md)
- [{#T}](./crm-contact-details-configuration-force-common-scope-for-all.md)
- [{#T}](./crm-contact-details-configuration-reset.md)
