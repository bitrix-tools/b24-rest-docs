# Создать документ складского учета catalog.document.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр и выбор склада» и правом «Создание и редактирование» на документы нужного типа

Метод `catalog.document.add` создает документ складского учета в статусе черновика.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания документа ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **docType***
[`string`](../../data-types.md) | Тип документа. Возможные значения:
- `A` — приход товара на склад
- `S` — оприходование товара
- `M` — перемещение товара между складами
- `R` — возврат товара
- `D` — списание товара

Значение чувствительно к регистру: `a` и другие значения метод отклоняет с ошибкой `DOC_TYPE isn't available`.

Названия типов можно получить методом [catalog.enum.getStoreDocumentTypes](../enum/catalog-enum-get-store-document-types.md) ||
|| **currency***
[`string`](../../data-types.md) | Код валюты документа, например `RUB`. Метод не проверяет, что валюта существует. После создания валюту изменить нельзя.

Список валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|| **responsibleId***
[`user.id`](../../data-types.md) | Идентификатор ответственного. Метод не проверяет, что пользователь существует. Значение, которое не является числом, метод сохраняет как `null`.

Идентификаторы пользователей можно получить методом [user.get](../../user/user-get.md) ||
|| **title**
[`string`](../../data-types.md) | Название документа. Если не передано, в ответе `title` равно `null` ||
|| **docNumber**
[`string`](../../data-types.md) | Номер документа. Если не передан, в ответе `docNumber` равно `null`: номер автоматически не создается ||
|| **dateDocument**
[`datetime`](../../data-types.md) | Дата документа, например `2026-11-05T10:00:00+03:00`. Можно передать дату без времени, например `2026-11-05`.

Строку, которую нельзя разобрать как дату, метод пропускает без ошибки ||
|| **commentary**
[`string`](../../data-types.md) | Комментарий к документу ||
|| **total**
[`double`](../../data-types.md) | Сумма документа. Метод не пересчитывает ее по товарам, в том числе при проведении. Значение, которое не является числом, метод сохраняет как `null` ||
|| **siteId**
[`string`](../../data-types.md) | Код сайта. По умолчанию `s1`. Метод не проверяет, что сайт существует ||
|| **statusBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который изменил статус документа. При проведении и отмене проведения в поле записывается идентификатор текущего пользователя ||
|#

Поля `id`, `status`, `createdBy`, `modifiedBy`, `dateCreate`, `dateModify` и `dateStatus` метод заполняет сам: `status` — `N`, `createdBy` и `modifiedBy` — идентификатор текущего пользователя, даты — время создания. Переданные значения этих полей и неизвестные поля метод пропускает без ошибки.

Товары в документ добавляйте методом [catalog.document.element.add](./document-element/catalog-document-element-add.md), поставщика — методом [catalog.documentcontractor.add](../documentcontractor/catalog-documentcontractor-add.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docType":"S","currency":"RUB","responsibleId":1269,"docNumber":"OP-00042","title":"Оприходование излишков","commentary":"Излишки по итогам инвентаризации","dateDocument":"2026-11-05T10:00:00+03:00"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docType":"S","currency":"RUB","responsibleId":1269,"docNumber":"OP-00042","title":"Оприходование излишков","commentary":"Излишки по итогам инвентаризации","dateDocument":"2026-11-05T10:00:00+03:00"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentAddResult = {
      document: {
        commentary: string | null
        createdBy: number
        currency: string
        dateCreate: ISODate
        dateDocument: ISODate | null
        dateModify: ISODate
        dateStatus: ISODate
        docNumber: string | null
        docType: string
        id: number
        modifiedBy: number
        responsibleId: number | null
        siteId: string
        status: string
        statusBy: number | null
        title: string | null
        total: number | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentAddResult>({
        method: 'catalog.document.add',
        params: {
          fields: {
            docType: 'S',
            currency: 'RUB',
            responsibleId: 1269,
            docNumber: 'OP-00042',
            title: 'Оприходование излишков',
            commentary: 'Излишки по итогам инвентаризации',
            dateDocument: '2026-11-05T10:00:00+03:00',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created document:', result.document.id, result.document.status)
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
      async function addDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.add',
            params: {
              fields: {
                docType: 'S',
                currency: 'RUB',
                responsibleId: 1269,
                docNumber: 'OP-00042',
                title: 'Оприходование излишков',
                commentary: 'Излишки по итогам инвентаризации',
                dateDocument: '2026-11-05T10:00:00+03:00',
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
          console.info('Created document:', result.document.id, result.document.status)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDocument)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.add(
            fields={
                "docType": "S",
                "currency": "RUB",
                "responsibleId": 1269,
                "docNumber": "OP-00042",
                "title": "Оприходование излишков",
                "commentary": "Излишки по итогам инвентаризации",
                "dateDocument": "2026-11-05T10:00:00+03:00",
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
                'catalog.document.add',
                [
                    'fields' => [
                        'docType'       => 'S',
                        'currency'      => 'RUB',
                        'responsibleId' => 1269,
                        'docNumber'     => 'OP-00042',
                        'title'         => 'Оприходование излишков',
                        'commentary'    => 'Излишки по итогам инвентаризации',
                        'dateDocument'  => '2026-11-05T10:00:00+03:00',
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
        'catalog.document.add',
        {
            fields: {
                docType: 'S',
                currency: 'RUB',
                responsibleId: 1269,
                docNumber: 'OP-00042',
                title: 'Оприходование излишков',
                commentary: 'Излишки по итогам инвентаризации',
                dateDocument: '2026-11-05T10:00:00+03:00',
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
        'catalog.document.add',
        [
            'fields' => [
                'docType' => 'S',
                'currency' => 'RUB',
                'responsibleId' => 1269,
                'docNumber' => 'OP-00042',
                'title' => 'Оприходование излишков',
                'commentary' => 'Излишки по итогам инвентаризации',
                'dateDocument' => '2026-11-05T10:00:00+03:00',
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
    res, err := client.Core().Call(ctx, "catalog.document.add", b24.Params{
    	"fields": b24.Params{
    		"docType":       "S",
    		"currency":      "RUB",
    		"responsibleId": 1269,
    		"docNumber":     "OP-00042",
    		"title":         "Оприходование излишков",
    		"commentary":    "Излишки по итогам инвентаризации",
    		"dateDocument":  "2026-11-05T10:00:00+03:00",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "document".
    raw, ok := b24.Unwrap(res.Result, "document")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа document")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID            b24.ID   `json:"id"`
    	DocType       string   `json:"docType"`
    	Status        string   `json:"status"`
    	Currency      string   `json:"currency"`
    	Title         *string  `json:"title"`
    	DocNumber     *string  `json:"docNumber"`
    	Commentary    *string  `json:"commentary"`
    	ResponsibleID *int     `json:"responsibleId"`
    	DateDocument  *string  `json:"dateDocument"`
    	DateCreate    string   `json:"dateCreate"`
    	Total         *float64 `json:"total"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Status)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "document": {
            "commentary": "Излишки по итогам инвентаризации",
            "createdBy": 1269,
            "currency": "RUB",
            "dateCreate": "2026-11-05T15:58:42+03:00",
            "dateDocument": "2026-11-05T10:00:00+03:00",
            "dateModify": "2026-11-05T15:58:42+03:00",
            "dateStatus": "2026-11-05T15:58:42+03:00",
            "docNumber": "OP-00042",
            "docType": "S",
            "id": 381,
            "modifiedBy": 1269,
            "responsibleId": 1269,
            "siteId": "s1",
            "status": "N",
            "statusBy": null,
            "title": "Оприходование излишков",
            "total": null
        }
    },
    "time": {
        "start": 1793883522,
        "finish": 1793883522.271001,
        "duration": 0.27100110054016113,
        "processing": 0,
        "date_start": "2026-11-05T15:58:42+03:00",
        "date_finish": "2026-11-05T15:58:42+03:00",
        "operating_reset_at": 1793884080,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.document**
[`catalog_document`](../data-types.md#catalog_document) | Объект с полями созданного документа. Метод возвращает все поля документа, включая пустые со значением `null`.

Документ создается в статусе `N` — черновик. Провести документ можно методом [catalog.document.conduct](./catalog-document-conduct.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: docType, responsibleId, currency"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Не удалось завершить действие, так как у вас недостаточно прав для просмотра и выбора складов | У пользователя нет права «Просмотр и выбор склада» ||
|| `400` | `0` | Недостаточно прав для сохранения документа | У пользователя нет права «Создание и редактирование» на документы этого типа или нет прав на каталог ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | В `fields` передан не объект ||
|| `400` | `0` | Required fields: docType, responsibleId, currency | Не переданы обязательные поля. В тексте перечислены только отсутствующие поля ||
|| `400` | `0` | DOC_TYPE isn't available | В `docType` передан тип, которого нет в списке, например `U` или `a` ||
|| `400` | `0` | Wrong format of field `title`. | В поле передан массив или объект вместо значения. В тексте указано имя поля ||
|| `400` | `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на тарифе портала ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-update.md)
- [{#T}](./catalog-document-list.md)
- [{#T}](./catalog-document-conduct.md)
- [{#T}](./catalog-document-get-fields.md)
- [{#T}](./document-element/catalog-document-element-add.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-add.md)
