# Обновить поля услуги catalog.product.service.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование товара», одним из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на изменение элементов инфоблока каталога

Метод `catalog.product.service.update` изменяет поля услуги.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_service.id`](../../data-types.md#catalog_product_service) | Идентификатор услуги. Идентификатор можно получить методом [catalog.product.service.list](./catalog-product-service-list.md).

Метод не проверяет тип элемента: если передать идентификатор товара, метод изменит его поля и вернет `service: []` ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями услуги, которые нужно изменить [(подробное описание)](#fields).

Если передать пустой объект, метод вернет услугу без изменений ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название услуги. Пустое значение вызывает ошибку «Не введено название» ||
|| **active**
[`string`](../../../data-types.md) | Активность услуги.

Возможные значения:

- `Y` — активна
- `N` — неактивна

Другие значения сохраняются как `N` ||
|| **code**
[`string`](../../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который создал услугу. Идентификатор можно получить методом [user.get](../../../user/user-get.md) ||
|| **modifiedBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который изменил услугу ||
|| **dateActiveFrom**
[`datetime`](../../../data-types.md) | Дата начала активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты начала активности», число игнорируется. Принимается `null` ||
|| **dateActiveTo**
[`datetime`](../../../data-types.md) | Дата окончания активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты завершения активности», число игнорируется. Принимается `null` ||
|| **dateCreate**
[`datetime`](../../../data-types.md) | Дата создания. Поле заполняется автоматически, передавать его не нужно: сейчас переданная дата сохраняется неверно, например `2026-11-01T10:00:00+03:00` сохраняется как `2001-11-30T00:00:00+03:00` ||
|| **iblockSectionId**
[`catalog_section.id`](../../data-types.md#catalog_section) | Идентификатор основного раздела. Идентификатор можно получить методом [catalog.section.list](../../section/catalog-section-list.md).

Для несуществующего раздела метод возвращает ошибку `200040300050`. Чтобы отвязать услугу от разделов, передайте `0` ||
|| **iblockSection**
[`catalog_section.id[]`](../../data-types.md#catalog_section) | Массив идентификаторов разделов, к которым нужно привязать услугу, например `[41, 39]`. Основной раздел задайте в `iblockSectionId`.

Массив заменяет текущие привязки к разделам ||
|| **measure**
[`catalog_measure.id`](../../data-types.md#catalog_measure) | Идентификатор единицы измерения. Идентификатор можно получить методом [catalog.measure.list](../../measure/catalog-measure-list.md).

Метод не проверяет, что единица измерения существует: несуществующий идентификатор сохраняется без ошибки ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса.

Возможные значения:

- `text` — текст
- `html` — HTML ||
|| **previewPicture**
[`object`](../../../data-types.md) | Картинка для анонса. Объект в формате `{"fileData": ["photo.png", "base64"]}`: первый элемент — название файла с расширением, второй — содержимое файла в кодировке [Base64](../../../files/how-to-upload-files.md).

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания.

Возможные значения:

- `text` — текст
- `html` — HTML ||
|| **detailPicture**
[`object`](../../../data-types.md) | Детальная картинка. Объект в формате `{"fileData": ["photo.png", "base64"]}`: первый элемент — название файла с расширением, второй — содержимое файла в кодировке [Base64](../../../files/how-to-upload-files.md).

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **vatId**
[`catalog_vat.id`](../../data-types.md#catalog_vat) | Идентификатор ставки НДС. Идентификатор можно получить методом [catalog.vat.list](../../vat/catalog-vat-list.md).

Метод не проверяет, что ставка существует: несуществующий идентификатор сохраняется без ошибки ||
|| **vatIncluded**
[`string`](../../../data-types.md) | НДС включен в цену.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **propertyN**
[`object`\|`array`](../../../data-types.md) | Значение свойства услуги, где `N` — идентификатор свойства. Свойств может быть несколько.

Значение одиночного свойства — объект `{"valueId": 4159, "value": "SRV-AC-03"}`, множественного — массив таких объектов. `valueId` — идентификатор значения свойства, его можно получить методом [catalog.product.service.get](./catalog-product-service-get.md).

Если не указать `valueId`, существующее значение удаляется и заменяется новым из `value`. У множественного свойства удаляются все значения, для которых не передан `valueId`. Исключение — свойства типа «Файл»: значения, не переданные в запросе, сохраняются, но их `valueId` меняются ||
|#

{% note warning "Работа с ценой услуг" %}

Чтобы изменить цену услуги, используйте методы [catalog.price.*](../../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7697,"fields":{"name":"Монтаж кондиционера с выездом","previewText":"Установка сплит-системы с выездом мастера","detailPicture":{"fileData":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="]},"property301":{"valueId":4159,"value":"SRV-AC-03"},"property305":[{"valueId":4161,"value":"Выезд мастера"},{"value":"Демонтаж старого блока"}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7697,"fields":{"name":"Монтаж кондиционера с выездом","previewText":"Установка сплит-системы с выездом мастера","detailPicture":{"fileData":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="]},"property301":{"valueId":4159,"value":"SRV-AC-03"},"property305":[{"valueId":4161,"value":"Выезд мастера"},{"value":"Демонтаж старого блока"}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.service.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ServiceResult = {
      service: {
        id: number,
        iblockId: number,
        iblockSectionId: number | null,
        iblockSection: number[] | null,
        name: string,
        code: string | null,
        active: string,
        xmlId: string,
        dateCreate: ISODate,
        timestampX: ISODate,
        previewPicture: { id: string, url: string, urlMachine: string } | null,
        detailPicture: { id: string, url: string, urlMachine: string } | null,
        property301: { value: string, valueId: string } | null,
        property305: Array<{ value: string, valueId: string }> | null,
        [key: string]: unknown,
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ServiceResult>({
        method: 'catalog.product.service.update',
        params: {
          id: 7697,
          fields: {
            name: 'Монтаж кондиционера с выездом',
            previewText: 'Установка сплит-системы с выездом мастера',
            detailPicture: {
              fileData: ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
            },
            property301: {
              valueId: 4159,
              value: 'SRV-AC-03',
            },
            property305: [
              {
                valueId: 4161,
                value: 'Выезд мастера',
              },
              {
                value: 'Демонтаж старого блока',
              },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated service id:', result.service.id, 'name:', result.service.name)
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
      async function updateService() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.service.update',
            params: {
              id: 7697,
              fields: {
                name: 'Монтаж кондиционера с выездом',
                previewText: 'Установка сплит-системы с выездом мастера',
                detailPicture: {
                  fileData: ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                },
                property301: {
                  valueId: 4159,
                  value: 'SRV-AC-03',
                },
                property305: [
                  {
                    valueId: 4161,
                    value: 'Выезд мастера',
                  },
                  {
                    value: 'Демонтаж старого блока',
                  },
                ],
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated service id:', result.service.id, 'name:', result.service.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateService)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.update(
            id=7697,
            fields={
                "name": "Монтаж кондиционера с выездом",
                "previewText": "Установка сплит-системы с выездом мастера",
                "detailPicture": {
                    "fileData": ["photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="],
                },
                "property301": {
                    "valueId": 4159,
                    "value": "SRV-AC-03",
                },
                "property305": [
                    {
                        "valueId": 4161,
                        "value": "Выезд мастера",
                    },
                    {
                        "value": "Демонтаж старого блока",
                    },
                ],
            },
        ).response

        result = bitrix_response.result
        print(result)

    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.service.update',
                [
                    'id'     => 7697,
                    'fields' => [
                        'name'          => 'Монтаж кондиционера с выездом',
                        'previewText'   => 'Установка сплит-системы с выездом мастера',
                        'detailPicture' => [
                            'fileData' => ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                        ],
                        'property301'   => [
                            'valueId' => 4159,
                            'value'   => 'SRV-AC-03',
                        ],
                        'property305'   => [
                            [
                                'valueId' => 4161,
                                'value'   => 'Выезд мастера',
                            ],
                            [
                                'value' => 'Демонтаж старого блока',
                            ],
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
        echo 'Error updating service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.service.update',
        {
            'id': 7697,
            'fields': {
                'name': 'Монтаж кондиционера с выездом',
                'previewText': 'Установка сплит-системы с выездом мастера',
                'detailPicture': {
                    'fileData': ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==']
                },
                'property301': {
                    'valueId': 4159,
                    'value': 'SRV-AC-03'
                },
                'property305': [
                    {
                        'valueId': 4161,
                        'value': 'Выезд мастера'
                    },
                    {
                        'value': 'Демонтаж старого блока'
                    }
                ]
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.service.update',
        [
            'id'     => 7697,
            'fields' => [
                'name'          => 'Монтаж кондиционера с выездом',
                'previewText'   => 'Установка сплит-системы с выездом мастера',
                'detailPicture' => [
                    'fileData' => ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                ],
                'property301'   => [
                    'valueId' => 4159,
                    'value'   => 'SRV-AC-03',
                ],
                'property305'   => [
                    [
                        'valueId' => 4161,
                        'value'   => 'Выезд мастера',
                    ],
                    [
                        'value' => 'Демонтаж старого блока',
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
    res, err := client.Core().Call(ctx, "catalog.product.service.update", b24.Params{
    	"id":     7697,
    	"fields": b24.Params{
    		"name":          "Монтаж кондиционера с выездом",
    		"previewText":   "Установка сплит-системы с выездом мастера",
    		"detailPicture": b24.Params{
    			"fileData": []string{"photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="},
    		},
    		"property301":   b24.Params{
    			"valueId": 4159,
    			"value":   "SRV-AC-03",
    		},
    		"property305":   []b24.Params{
    			b24.Params{
    				"valueId": 4161,
    				"value":   "Выезд мастера",
    			},
    			b24.Params{
    				"value": "Демонтаж старого блока",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.service.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "service".
    raw, ok := b24.Unwrap(res.Result, "service")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа service")
    }

    var item struct {
    	ID              int    `json:"id"`
    	IblockID        int    `json:"iblockId"`
    	IblockSectionID int    `json:"iblockSectionId"`
    	Name            string `json:"name"`
    	Code            string `json:"code"`
    	Active          string `json:"active"`
    	XMLID           string `json:"xmlId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "service": {
            "active": "Y",
            "available": "N",
            "bundle": "N",
            "code": null,
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-06T14:21:47+03:00",
            "detailPicture": {
                "id": "40065",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=detailPicture&fields%5BfileId%5D=40065&fields%5BproductId%5D=7697",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=detailPicture&fields%5BfileId%5D=40065&fields%5BproductId%5D=7697"
            },
            "detailText": null,
            "detailTextType": "text",
            "iblockId": 25,
            "iblockSection": null,
            "iblockSectionId": null,
            "id": 7697,
            "measure": null,
            "modifiedBy": 1269,
            "name": "Монтаж кондиционера с выездом",
            "previewPicture": null,
            "previewText": "Установка сплит-системы с выездом мастера",
            "previewTextType": "text",
            "property301": {
                "value": "SRV-AC-03",
                "valueId": "4159"
            },
            "property303": null,
            "property305": [
                {
                    "value": "Выезд мастера",
                    "valueId": "4161"
                },
                {
                    "value": "Демонтаж старого блока",
                    "valueId": "4163"
                }
            ],
            "sort": 500,
            "timestampX": "2026-11-06T14:21:59+03:00",
            "type": 7,
            "vatId": null,
            "vatIncluded": "N",
            "xmlId": "7697"
        }
    },
    "time": {
        "start": 1793964118,
        "finish": 1793964119.417712,
        "duration": 1.4177119731903076,
        "processing": 0,
        "date_start": "2026-11-06T14:21:58+03:00",
        "date_finish": "2026-11-06T14:21:59+03:00",
        "operating_reset_at": 1793964660,
        "operating": 0.6042139530181885
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.service**
[`catalog_product_service`](../../data-types.md#catalog_product_service) | Объект с полями услуги после изменения. Пустые поля приходят со значением `null`.

В ответе приходят все свойства инфоблока в виде ключей `propertyN`. В примере показаны только свойства `property301`, `property303` и `property305` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"200040300010",
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога», «Изменение цены продажи товара» ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права «Редактирование товара» ||
|| `400` | `200040300043` | Access Denied | У пользователя нет права на изменение элементов инфоблока каталога ||
|| `400` | `200040300050` | Access Denied | Раздел `iblockSectionId` не существует или у пользователя нет права привязывать к нему элементы ||
|| `400` | Пустое значение | service does not exist. | Услуга с указанным `id` не найдена. Ту же ошибку метод возвращает, если в `id` передана строка, которая не является числом ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | В `fields` передан не объект ||
|| `400` | `0` | productType is not allowed for this catalog | В `fields.iblockId` передан другой инфоблок. Перенести услугу в другой каталог нельзя ||
|| `400` | `0` | Неверный формат даты начала активности.<br> | В `dateActiveFrom` передана строка. Сейчас дату задать нельзя ||
|| `400` | `0` | Неверный формат даты завершения активности.<br> | В `dateActiveTo` передана строка. Сейчас дату задать нельзя ||
|| `400` | `0` | Не введено название.<br> | В `name` передана пустая строка ||
|| `400` | `0` | User createdBy is not exists | Пользователь `createdBy` не найден ||
|| `400` | `0` | User modifiedBy is not exists | Пользователь `modifiedBy` не найден ||
|| `400` | `0` | Wrong format of field `name`. | В поле передан массив или объект вместо значения. В тексте указано имя поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-add.md)
- [{#T}](./catalog-product-service-get.md)
- [{#T}](./catalog-product-service-list.md)
- [{#T}](./catalog-product-service-delete.md)
- [{#T}](./catalog-product-service-download.md)
- [{#T}](./catalog-product-service-get-fields-by-filter.md)
