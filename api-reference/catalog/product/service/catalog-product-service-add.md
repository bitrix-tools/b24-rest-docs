# Добавить услугу catalog.product.service.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание товара», одним из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на изменение элементов инфоблока каталога

Метод `catalog.product.service.add` добавляет услугу в торговый каталог.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей для создания услуги ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../../data-types.md#catalog_catalog) | Идентификатор инфоблока торгового каталога.

Идентификатор можно получить методом [catalog.catalog.list](../../catalog/catalog-catalog-list.md). Инфоблок торговых предложений не подходит: метод вернет ошибку `productType is not allowed for this catalog` ||
|| **name***
[`string`](../../../data-types.md) | Название услуги ||
|| **active**
[`string`](../../../data-types.md) | Активность услуги. Возможные значения:
- `Y` — активна
- `N` — неактивна

Любое другое значение метод сохраняет как `N`.

По умолчанию `Y` ||
|| **code**
[`string`](../../../data-types.md) | Символьный код. Уникальность кода метод не проверяет ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код. Используйте его для связи услуги с записью во внешней системе.

Если не передан, метод записывает в поле идентификатор услуги ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок сортировки.

По умолчанию `500` ||
|| **createdBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который создал услугу. Пользователь должен существовать.

Если не передан, метод записывает идентификатор текущего пользователя ||
|| **modifiedBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который последним изменил услугу. Пользователь должен существовать.

Если не передан, метод записывает идентификатор текущего пользователя ||
|| **dateActiveFrom**
[`datetime`](../../../data-types.md) | Дата начала активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты начала активности», число игнорируется. Принимается `null` ||
|| **dateActiveTo**
[`datetime`](../../../data-types.md) | Дата окончания активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты завершения активности», число игнорируется. Принимается `null` ||
|| **iblockSectionId**
[`catalog_section.id`](../../data-types.md#catalog_section) | Идентификатор основного раздела каталога.

Идентификатор можно получить методом [catalog.section.list](../../section/catalog-section-list.md). Для несуществующего раздела метод возвращает ошибку доступа `200040300050` ||
|| **measure**
[`catalog_measure.id`](../../data-types.md#catalog_measure) | Идентификатор единицы измерения.

Идентификатор можно получить методом [catalog.measure.list](../../measure/catalog-measure-list.md). Если не передан, в ответе `measure` равно `null`. Метод не проверяет, что единица измерения существует: несуществующий идентификатор сохраняется без ошибки ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию `text` ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию `text` ||
|| **previewPicture**
[`object`](../../../data-types.md) | Картинка для анонса. Объект в формате `{"fileData": ["имя_файла.png", "содержимое в base64"]}` ||
|| **detailPicture**
[`object`](../../../data-types.md) | Детальная картинка. Объект в формате `{"fileData": ["имя_файла.png", "содержимое в base64"]}` ||
|| **vatId**
[`catalog_vat.id`](../../data-types.md#catalog_vat) | Идентификатор ставки НДС. Ставка должна существовать.

Идентификатор можно получить методом [catalog.vat.list](../../vat/catalog-vat-list.md) ||
|| **vatIncluded**
[`string`](../../../data-types.md) | Включен ли НДС в цену. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **propertyN**
[`any`](../../../data-types.md) | Значение свойства услуги, где `N` — идентификатор свойства, например `property301`.

Значение можно передать строкой, числом или объектом `{"value": "значение"}`. Для множественного свойства передайте массив значений или объектов `{"value": "значение"}`. Массив для одиночного свойства вызывает ошибку `Wrong format value of field`.

Идентификаторы свойств можно получить методом [catalog.product.service.getFieldsByFilter](./catalog-product-service-get-fields-by-filter.md) ||
|#

Поля `id`, `type`, `available`, `bundle`, `dateCreate` и `timestampX` метод заполняет сам: `type` для услуги всегда `7`, даты — время создания. Переданные значения этих полей и неизвестные поля метод пропускает без ошибки. Исключение — `dateCreate`: сейчас переданная дата сохраняется неверно, например `2026-11-01T10:00:00+03:00` сохраняется как `2001-11-30T00:00:00+03:00`, поэтому не передавайте это поле.

{% note warning "Цена услуги" %}

Чтобы указать цену услуги, используйте методы [catalog.price.*](../../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Монтаж кондиционера","code":"ac_installation","xmlId":"srv-ac-01","sort":200,"vatId":9,"vatIncluded":"Y","measure":9,"previewText":"Установка сплит-системы мощностью до 3,5 кВт","detailText":"<p>Монтаж внутреннего и наружного блоков</p>","detailTextType":"html","previewPicture":{"fileData":["ac.png","iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII="]},"property301":"SRV-AC-01","property303":"Климат-Сервис"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Монтаж кондиционера","code":"ac_installation","xmlId":"srv-ac-01","sort":200,"vatId":9,"vatIncluded":"Y","measure":9,"previewText":"Установка сплит-системы мощностью до 3,5 кВт","detailText":"<p>Монтаж внутреннего и наружного блоков</p>","detailTextType":"html","previewPicture":{"fileData":["ac.png","iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII="]},"property301":"SRV-AC-01","property303":"Климат-Сервис"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.service.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PictureInfo = { id: string; url: string; urlMachine: string }
    type PropertyValue = { value: string; valueId: string }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ServiceAddResult = {
      service: {
        id: number
        iblockId: number
        name: string
        active: string
        code: string | null
        xmlId: string
        sort: number
        type: number
        measure: number | null
        vatId: number | null
        vatIncluded: string
        previewText: string | null
        previewPicture: PictureInfo | null
        detailPicture: PictureInfo | null
        dateCreate: ISODate
        timestampX: ISODate
        // Properties come as propertyN: null, a string, an object or an array of objects
        [key: `property${number}`]: PropertyValue | PropertyValue[] | string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ServiceAddResult>({
        method: 'catalog.product.service.add',
        params: {
          fields: {
            iblockId: 25,
            name: 'Монтаж кондиционера',
            code: 'ac_installation',
            xmlId: 'srv-ac-01',
            sort: 200,
            vatId: 9,
            vatIncluded: 'Y',
            measure: 9,
            previewText: 'Установка сплит-системы мощностью до 3,5 кВт',
            detailText: '<p>Монтаж внутреннего и наружного блоков</p>',
            detailTextType: 'html',
            previewPicture: {
              fileData: ['ac.png', 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII='],
            },
            property301: 'SRV-AC-01',
            property303: 'Климат-Сервис',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added service:', result.service.id, result.service.name)
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
      async function addService() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.service.add',
            params: {
              fields: {
                iblockId: 25,
                name: 'Монтаж кондиционера',
                code: 'ac_installation',
                xmlId: 'srv-ac-01',
                sort: 200,
                vatId: 9,
                vatIncluded: 'Y',
                measure: 9,
                previewText: 'Установка сплит-системы мощностью до 3,5 кВт',
                detailText: '<p>Монтаж внутреннего и наружного блоков</p>',
                detailTextType: 'html',
                previewPicture: {
                  fileData: ['ac.png', 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII='],
                },
                property301: 'SRV-AC-01',
                property303: 'Климат-Сервис',
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
          console.info('Added service:', result.service.id, result.service.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addService)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.add(
            fields={
                "iblockId": 25,
                "name": "Монтаж кондиционера",
                "code": "ac_installation",
                "xmlId": "srv-ac-01",
                "sort": 200,
                "vatId": 9,
                "vatIncluded": "Y",
                "measure": 9,
                "previewText": "Установка сплит-системы мощностью до 3,5 кВт",
                "detailText": "<p>Монтаж внутреннего и наружного блоков</p>",
                "detailTextType": "html",
                "previewPicture": {
                    "fileData": ["ac.png", "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII="],
                },
                "property301": "SRV-AC-01",
                "property303": "Климат-Сервис",
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
                'catalog.product.service.add',
                [
                    'fields' => [
                        'iblockId'        => 25,
                        'name'            => 'Монтаж кондиционера',
                        'code'            => 'ac_installation',
                        'xmlId'           => 'srv-ac-01',
                        'sort'            => 200,
                        'vatId'           => 9,
                        'vatIncluded'     => 'Y',
                        'measure'         => 9,
                        'previewText'     => 'Установка сплит-системы мощностью до 3,5 кВт',
                        'detailText'      => '<p>Монтаж внутреннего и наружного блоков</p>',
                        'detailTextType'  => 'html',
                        'previewPicture'  => [
                            'fileData' => ['ac.png', 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII='],
                        ],
                        'property301'     => 'SRV-AC-01',
                        'property303'     => 'Климат-Сервис',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.service.add',
        {
            fields: {
                iblockId: 25,
                name: 'Монтаж кондиционера',
                code: 'ac_installation',
                xmlId: 'srv-ac-01',
                sort: 200,
                vatId: 9,
                vatIncluded: 'Y',
                measure: 9,
                previewText: 'Установка сплит-системы мощностью до 3,5 кВт',
                detailText: '<p>Монтаж внутреннего и наружного блоков</p>',
                detailTextType: 'html',
                previewPicture: {
                    fileData: ['ac.png', 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII='],
                },
                property301: 'SRV-AC-01',
                property303: 'Климат-Сервис',
            },
        },
        function(result)
        {
            if (result.error())
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
        'catalog.product.service.add',
        [
            'fields' => [
                'iblockId' => 25,
                'name' => 'Монтаж кондиционера',
                'code' => 'ac_installation',
                'xmlId' => 'srv-ac-01',
                'sort' => 200,
                'vatId' => 9,
                'vatIncluded' => 'Y',
                'measure' => 9,
                'previewText' => 'Установка сплит-системы мощностью до 3,5 кВт',
                'detailText' => '<p>Монтаж внутреннего и наружного блоков</p>',
                'detailTextType' => 'html',
                'previewPicture' => [
                    'fileData' => ['ac.png', 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII='],
                ],
                'property301' => 'SRV-AC-01',
                'property303' => 'Климат-Сервис',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.service.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId":       25,
    		"name":           "Монтаж кондиционера",
    		"code":           "ac_installation",
    		"xmlId":          "srv-ac-01",
    		"sort":           200,
    		"vatId":          9,
    		"vatIncluded":    "Y",
    		"measure":        9,
    		"previewText":    "Установка сплит-системы мощностью до 3,5 кВт",
    		"detailText":     "<p>Монтаж внутреннего и наружного блоков</p>",
    		"detailTextType": "html",
    		"previewPicture": b24.Params{
    			"fileData": []string{"ac.png", "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGPQqDiBFTEMLQkAAtVaAcSRe60AAAAASUVORK5CYII="},
    		},
    		"property301": "SRV-AC-01",
    		"property303": "Климат-Сервис",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.service.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "service".
    raw, ok := b24.Unwrap(res.Result, "service")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа service")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID          b24.ID  `json:"id"`
    	IblockID    int     `json:"iblockId"`
    	Name        string  `json:"name"`
    	Code        *string `json:"code"`
    	XMLID       string  `json:"xmlId"`
    	Sort        int     `json:"sort"`
    	Type        int     `json:"type"`
    	Measure     *int    `json:"measure"`
    	VatID       *int    `json:"vatId"`
    	VatIncluded string  `json:"vatIncluded"`
    	PreviewPicture *struct {
    		ID  string `json:"id"`
    		URL string `json:"url"`
    	} `json:"previewPicture"`
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
            "code": "ac_installation",
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-05T18:19:49+03:00",
            "detailPicture": null,
            "detailText": "<p>Монтаж внутреннего и наружного блоков</p>",
            "detailTextType": "html",
            "iblockId": 25,
            "iblockSection": null,
            "iblockSectionId": null,
            "id": 7623,
            "measure": 9,
            "modifiedBy": 1269,
            "name": "Монтаж кондиционера",
            "previewPicture": {
                "id": "40035",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40035&fields%5BproductId%5D=7623",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40035&fields%5BproductId%5D=7623"
            },
            "previewText": "Установка сплит-системы мощностью до 3,5 кВт",
            "previewTextType": "text",
            "property293": null,
            "property295": "N",
            "property297": "N",
            "property299": "N",
            "property301": {
                "value": "SRV-AC-01",
                "valueId": "4059"
            },
            "property303": {
                "value": "Климат-Сервис",
                "valueId": "4061"
            },
            "property305": null,
            "property307": null,
            "property309": null,
            "property311": null,
            "property313": null,
            "property315": null,
            "property329": null,
            "property343": null,
            "property359": null,
            "property431": null,
            "property433": null,
            "property435": null,
            "property893": null,
            "property897": null,
            "property901": null,
            "property917": null,
            "property921": null,
            "property931": null,
            "property933": null,
            "property935": null,
            "property1013": null,
            "property1015": null,
            "property1019": null,
            "property1021": null,
            "property1023": null,
            "property1077": null,
            "property1081": null,
            "property1083": null,
            "property1085": null,
            "sort": 200,
            "timestampX": "2026-11-05T18:19:49+03:00",
            "type": 7,
            "vatId": 9,
            "vatIncluded": "Y",
            "xmlId": "srv-ac-01"
        }
    },
    "time": {
        "start": 1793891989,
        "finish": 1793891989.83412,
        "duration": 0.8341200351715088,
        "processing": 0,
        "date_start": "2026-11-05T18:19:49+03:00",
        "date_finish": "2026-11-05T18:19:49+03:00",
        "operating_reset_at": 1793892589,
        "operating": 0
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
[`catalog_product_service`](../../data-types.md#catalog_product_service) | Объект с полями созданной услуги. Метод возвращает все поля, включая пустые со значением `null`, и все свойства каталога в формате `propertyN`.

Значение заполненного свойства приходит объектом `{"value": "...", "valueId": "..."}`, множественного — массивом таких объектов. Картинка приходит объектом с идентификатором файла `id` и ссылками на скачивание `url` и `urlMachine` для метода [catalog.product.service.download](./catalog-product-service-download.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога», «Изменение цены продажи товара» ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права «Создание товара» ||
|| `400` | `200040300043` | Access Denied | У пользователя нет права на изменение элементов инфоблока каталога ||
|| `400` | `200040300050` | Access Denied | Раздел `iblockSectionId` не существует или у пользователя нет права привязывать к нему элементы ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Incorrect fields format | В `fields` передан не объект ||
|| `400` | `0` | Required fields: name | Не передано обязательное поле. В тексте перечислены недостающие поля ||
|| `400` | `0` | iblock is not catalog | Не передан `iblockId`, передан не число или инфоблок не является торговым каталогом ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок торговых предложений ||
|| `400` | `0` | VAT vatId is not exists | Ставка НДС с указанным `vatId` не найдена ||
|| `400` | `0` | User createdBy is not exists | Пользователь `createdBy` не найден ||
|| `400` | `0` | User modifiedBy is not exists | Пользователь `modifiedBy` не найден ||
|| `400` | `0` | Неверный формат даты начала активности.<br> | В `dateActiveFrom` передана строка. Сейчас дату задать нельзя ||
|| `400` | `0` | Неверный формат даты завершения активности.<br> | В `dateActiveTo` передана строка. Сейчас дату задать нельзя ||
|| `400` | `0` | Wrong format value of field `property301`. | В одиночное свойство передан массив. В тексте указано имя свойства ||
|| `400` | `0` | Wrong format of field `name`. | В поле передан массив или объект вместо значения. В тексте указано имя поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-update.md)
- [{#T}](./catalog-product-service-get.md)
- [{#T}](./catalog-product-service-list.md)
- [{#T}](./catalog-product-service-delete.md)
- [{#T}](./catalog-product-service-download.md)
- [{#T}](./catalog-product-service-get-fields-by-filter.md)
