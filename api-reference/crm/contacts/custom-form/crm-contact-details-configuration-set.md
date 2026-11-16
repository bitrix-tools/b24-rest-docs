# Установить параметры карточки crm.contact.details.configuration.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может установить свои личные настройки
>  - пользователь с правом «Управление общим видом карточки» или «Разрешить изменять настройки» в CRM может установить общие настройки
>  - пользователь с правом «Разрешить изменять настройки» в CRM может установить чужие личные настройки

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.detailpagelayout.update](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-update-rest-v3.md).

{% endnote %}

Метод `crm.contact.details.configuration.set` устанавливает настройки карточки контакта: записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

{% note warning "" %}

Переданная конфигурация полностью заменяет настройки выбранного вида карточки. Разделы и поля, которых нет в `data`, удаляются из этой конфигурации. Перед изменением получите текущую конфигурацию методом [crm.contact.details.configuration.get](./crm-contact-details-configuration-get.md).

{% endnote %}

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

По умолчанию — `P`. Любое значение, кроме `C`, выбирает личные настройки `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при установке личных настроек.

Если параметр не задан или его значение после преобразования в целое число меньше либо равно нулю, используется идентификатор текущего пользователя
||
|| **data***
[`section[]`](#section) | Список `section` описывает конфигурацию разделов полей в карточке контакта ||
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

Отображается в карточке контакта ||
|| **type**
[`string`](../../../data-types.md) | Тип раздела. Допустимое значение — `section`. Если параметр не передан или передана пустая строка, в том числе из одних пробелов, используется `section` ||
|| **elements**
[`section_element[]`](#section_element) | Массив `section_element` описывает конфигурацию полей в разделе ||
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
`COMPANY` | Код страны для формата телефонного номера по умолчанию — строка из двух латинских букв.

Например, `"RU"` ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример устанавливает пользователю с `id = 1` личную конфигурацию карточки контакта:

- Раздел 1 — **Личные данные**
    - **Имя** — показывать всегда
    - **Фамилия** — показывать всегда
    - **Отчество**
    - **Дата рождения**
    - **Телефон** — показывать всегда, страна по умолчанию: **Великобритания (+44)**
    - **Адрес** — показывать всегда, тип адреса по умолчанию: **Адрес регистрации** (типы адресов возвращает метод [`crm.enum.addresstype`](../../auxiliary/enum/crm-enum-address-type.md))
- Раздел 2 — **Основная информация**
    - **Тип контакта**
    - **Источник**
    - **Должность**
- Раздел 3 — **Дополнительная информация**
    - **Фотография**
    - **Комментарий**
    - **Пользовательское поле #1** — в примере `UF_CRM_1720697698689`, замените на код пользовательского поля контакта в вашем Битрикс24


{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1,"data":[{"name":"section_1","title":"Личные данные","type":"section","elements":[{"name":"NAME","optionFlags":1},{"name":"LAST_NAME","optionFlags":1},{"name":"SECOND_NAME"},{"name":"BIRTHDATE"},{"name":"PHONE","optionFlags":1,"options":{"defaultCountry":"GB"}},{"name":"ADDRESS","optionFlags":1,"options":{"defaultAddressType":4}}]},{"name":"section_2","title":"Основная информация","type":"section","elements":[{"name":"TYPE_ID"},{"name":"SOURCE_ID"},{"name":"POST"}]},{"name":"section_3","title":"Дополнительная информация","type":"section","elements":[{"name":"PHOTO"},{"name":"COMMENTS"},{"name":"UF_CRM_1720697698689"}]}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.details.configuration.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1,"data":[{"name":"section_1","title":"Личные данные","type":"section","elements":[{"name":"NAME","optionFlags":1},{"name":"LAST_NAME","optionFlags":1},{"name":"SECOND_NAME"},{"name":"BIRTHDATE"},{"name":"PHONE","optionFlags":1,"options":{"defaultCountry":"GB"}},{"name":"ADDRESS","optionFlags":1,"options":{"defaultAddressType":4}}]},{"name":"section_2","title":"Основная информация","type":"section","elements":[{"name":"TYPE_ID"},{"name":"SOURCE_ID"},{"name":"POST"}]},{"name":"section_3","title":"Дополнительная информация","type":"section","elements":[{"name":"PHOTO"},{"name":"COMMENTS"},{"name":"UF_CRM_1720697698689"}]}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.contact.details.configuration.set',
        params: {
          userId: 1,
          data: [
            {
              name: 'section_1',
              title: 'Личные данные',
              type: 'section',
              elements: [
                {
                  name: 'NAME',
                  optionFlags: 1,
                },
                {
                  name: 'LAST_NAME',
                  optionFlags: 1,
                },
                {
                  name: 'SECOND_NAME',
                },
                {
                  name: 'BIRTHDATE',
                },
                {
                  name: 'PHONE',
                  optionFlags: 1,
                  options: {
                    defaultCountry: 'GB',
                  },
                },
                {
                  name: 'ADDRESS',
                  optionFlags: 1,
                  options: {
                    defaultAddressType: 4,
                  },
                },
              ],
            },
            {
              name: 'section_2',
              title: 'Основная информация',
              type: 'section',
              elements: [
                { name: 'TYPE_ID' },
                { name: 'SOURCE_ID' },
                { name: 'POST' },
              ],
            },
            {
              name: 'section_3',
              title: 'Дополнительная информация',
              type: 'section',
              elements: [
                { name: 'PHOTO' },
                { name: 'COMMENTS' },
                { name: 'UF_CRM_1720697698689' },
              ],
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Configuration saved:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function setContactDetailsConfiguration() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.details.configuration.set',
            params: {
              userId: 1,
              data: [
                {
                  name: 'section_1',
                  title: 'Личные данные',
                  type: 'section',
                  elements: [
                    {
                      name: 'NAME',
                      optionFlags: 1,
                    },
                    {
                      name: 'LAST_NAME',
                      optionFlags: 1,
                    },
                    {
                      name: 'SECOND_NAME',
                    },
                    {
                      name: 'BIRTHDATE',
                    },
                    {
                      name: 'PHONE',
                      optionFlags: 1,
                      options: {
                        defaultCountry: 'GB',
                      },
                    },
                    {
                      name: 'ADDRESS',
                      optionFlags: 1,
                      options: {
                        defaultAddressType: 4,
                      },
                    },
                  ],
                },
                {
                  name: 'section_2',
                  title: 'Основная информация',
                  type: 'section',
                  elements: [
                    { name: 'TYPE_ID' },
                    { name: 'SOURCE_ID' },
                    { name: 'POST' },
                  ],
                },
                {
                  name: 'section_3',
                  title: 'Дополнительная информация',
                  type: 'section',
                  elements: [
                    { name: 'PHOTO' },
                    { name: 'COMMENTS' },
                    { name: 'UF_CRM_1720697698689' },
                  ],
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Configuration saved:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setContactDetailsConfiguration)
    </script>
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.details.configuration.set", b24.Params{
    	"userId": 1,
    	"data": []b24.Params{
    		{
    			"name":  "section_1",
    			"title": "Личные данные",
    			"type":  "section",
    			"elements": []b24.Params{
    				{
    					"name":        "NAME",
    					"optionFlags": 1,
    				},
    				{
    					"name":        "LAST_NAME",
    					"optionFlags": 1,
    				},
    				{
    					"name": "SECOND_NAME",
    				},
    				{
    					"name": "BIRTHDATE",
    				},
    				{
    					"name":        "PHONE",
    					"optionFlags": 1,
    					"options": b24.Params{
    						"defaultCountry": "GB",
    					},
    				},
    				{
    					"name":        "ADDRESS",
    					"optionFlags": 1,
    					"options": b24.Params{
    						"defaultAddressType": 4,
    					},
    				},
    			},
    		},
    		{
    			"name":  "section_2",
    			"title": "Основная информация",
    			"type":  "section",
    			"elements": []b24.Params{
    				{
    					"name": "TYPE_ID",
    				},
    				{
    					"name": "SOURCE_ID",
    				},
    				{
    					"name": "POST",
    				},
    			},
    		},
    		{
    			"name":  "section_3",
    			"title": "Дополнительная информация",
    			"type":  "section",
    			"elements": []b24.Params{
    				{
    					"name": "PHOTO",
    				},
    				{
    					"name": "COMMENTS",
    				},
    				{
    					"name": "UF_CRM_1720697698689",
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.details.configuration.set: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
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

### Возвращаемые данные

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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied. | У пользователя нет права установить выбранные настройки карточки ||
|| `400` | Пустое значение | Parameter 'data' must be array. | Параметр `data` не передан или передан не массивом ||
|| `400` | Пустое значение | The data must be indexed array. | В `data` передан не индексированный массив ||
|| `400` | Пустое значение | There are no data to write. | В `data` передан пустой массив ||
|| `400` | Пустое значение | Section at index `i` have type '`data[i].type`'. The expected type is 'section'. | В `data[i].type` находится значение, отличное от `'section'` ||
|| `400` | Пустое значение | Section at index `i` does not have name. | В `data[i].name` передано пустое значение ||
|| `400` | Пустое значение | Section at index `i` does not have title. | В `data[i].title` не передана строка ||
|| `400` | Пустое значение | Element at index `j` in section at index `i` does not have name. | В `data[i].elements[j].name` передано пустое значение ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-contact-details-configuration-get.md)
- [{#T}](./crm-contact-details-configuration-reset.md)
- [{#T}](./crm-contact-details-configuration-force-common-scope-for-all.md)
