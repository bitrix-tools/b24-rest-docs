# Создать новый документ crm.documentgenerator.document.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами просмотра и создания документов генератора документов и доступом к CRM-объекту, по данным которого создается документ

Метод `crm.documentgenerator.document.add` создает документ по шаблону для CRM-объекта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId**^*^
[`integer`](../../../data-types.md) | Идентификатор шаблона документа ||
|| **entityTypeId**^*^
[`integer`](../../../data-types.md) | Идентификатор [типа CRM-объекта](../../data-types.md#object_type), для которого создается документ ||
|| **entityId**^*^
[`integer`](../../../data-types.md) | Идентификатор CRM-объекта, по данным которого создается документ ||
|| **values**
[`object`](../../../data-types.md) | Объект со значениями полей документа.

Формат:

```json
{
    "field_1": "value_1",
    "field_2": "value_2"
}
```

где:
- `field_n` — код поля документа
- `value_n` — значение поля

Набор ключей зависит от шаблона и провайдера данных. Посмотреть доступные поля шаблона можно методом [crm.documentgenerator.template.getfields](../templates/crm-document-generator-template-get-fields.md) ||
|| **stampsEnabled**
[`integer`](../../../data-types.md) | Подставлять печать и подпись:
- `1` — подставлять
- `0` — не подставлять

По умолчанию `0` ||
|| **fields**
[`object`](../../../data-types.md) | Дополнительные описания полей документа. Доступные поля можно получить методами [crm.documentgenerator.template.getfields](../templates/crm-document-generator-template-get-fields.md) и [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md). Поля `SOURCE` и `DOCUMENT` игнорируются ||
|#

{% note info "Особенность метода" %}

`pdfUrl` и `imageUrl` могут отсутствовать сразу после создания, так как конвертация выполняется асинхронно. Для проверки результата используйте [crm.documentgenerator.document.get](./crm-document-generator-document-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример создания документа, где:
- `templateId` — `39`
- `entityTypeId` — `2` (сделка)
- `entityId` — `101`
- номер документа подставляется через `values.DocumentNumber`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":39,"entityTypeId":2,"entityId":101,"values":{"DocumentNumber":"2026-001"},"stampsEnabled":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":39,"entityTypeId":2,"entityId":101,"values":{"DocumentNumber":"2026-001"},"stampsEnabled":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.add
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
        id: number | string
        title: string
        number: string
        createTime: ISODate
        updateTime: ISODate
        createdBy: number
        updatedBy: number | null
        changeStampsEnabled: boolean
        changeStampsDisabledReason?: string
        changeQrCodeEnabled: boolean
        qrCodeEnabled: boolean
        changeQrCodeDisabledReason?: string
        products?: {
          currencyId: string | null
          totalSum: string | number | null
          totalRows: string | number | null
        }
        stampsEnabled: boolean
        downloadUrl: string
        downloadUrlMachine: string
        publicUrl: string | null
        isTransformationError: boolean
        transformationErrorMessage?: string
        transformationErrorCode?: number | string
        templateId: number | string
        pullTag?: string
        emailDiskFile: number
        entityTypeId: number | string
        entityId: number | string
        values: Record<string, unknown>
        imageUrl?: string
        pdfUrl?: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentAddResult>({
        method: 'crm.documentgenerator.document.add',
        params: {
          templateId: 39,
          entityTypeId: 2,
          entityId: 101,
          values: {
            DocumentNumber: '2026-001',
          },
          stampsEnabled: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.document.id, result.document.title, result.document.downloadUrl)
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
            method: 'crm.documentgenerator.document.add',
            params: {
              templateId: 39,
              entityTypeId: 2,
              entityId: 101,
              values: {
                DocumentNumber: '2026-001',
              },
              stampsEnabled: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.document.id, result.document.title, result.document.downloadUrl)
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
        bitrix_response = client.crm.documentgenerator.document.add(
            template_id=39,
            entity_type_id=2,
            entity_id=101,
            values={
                "DocumentNumber": "2026-001",
            },
            stamps_enabled=1,
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
                'crm.documentgenerator.document.add',
                [
                    'templateId' => 39,
                    'entityTypeId' => 2,
                    'entityId' => 101,
                    'values' => [
                        'DocumentNumber' => '2026-001',
                    ],
                    'stampsEnabled' => 1,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.add',
        {
            templateId: 39,
            entityTypeId: 2,
            entityId: 101,
            values: {
                DocumentNumber: '2026-001',
            },
            stampsEnabled: 1,
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
        'crm.documentgenerator.document.add',
        [
            'templateId' => 39,
            'entityTypeId' => 2,
            'entityId' => 101,
            'values' => [
                'DocumentNumber' => '2026-001',
            ],
            'stampsEnabled' => 1,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.documentgenerator.document.add", b24.Params{
    	"templateId":   39,
    	"entityTypeId": 2,
    	"entityId":     101,
    	"values": b24.Params{
    		"DocumentNumber": "2026-001",
    	},
    	"stampsEnabled": 1,
    })
    if err != nil {
    	return fmt.Errorf("crm.documentgenerator.document.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "document".
    raw, ok := b24.Unwrap(res.Result, "document")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа document")
    }

    var item struct {
    	ChangeStampsEnabled        bool   `json:"changeStampsEnabled"`
    	ChangeStampsDisabledReason string `json:"changeStampsDisabledReason"`
    	ChangeQrCodeEnabled        bool   `json:"changeQrCodeEnabled"`
    	QrCodeEnabled              bool   `json:"qrCodeEnabled"`
    	ChangeQrCodeDisabledReason string `json:"changeQrCodeDisabledReason"`
    	DownloadUrl                string `json:"downloadUrl"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ChangeStampsEnabled, item.ChangeStampsDisabledReason)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "document": {
            "changeStampsEnabled": false,
            "changeStampsDisabledReason": "В шаблоне нет печатей и подписей",
            "changeQrCodeEnabled": false,
            "qrCodeEnabled": false,
            "changeQrCodeDisabledReason": "В шаблоне нет QR-кода",
            "products": {
                "currencyId": "UAH",
                "totalSum": "0.00",
                "totalRows": 0
            },
            "downloadUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.download&SITE_ID=s1&id=61",
            "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?...",
            "publicUrl": null,
            "id": 61,
            "title": "Демонстрационная реализация товара 2026-001",
            "number": "2026-001",
            "createTime": "2026-03-20T13:51:45+03:00",
            "createdBy": 577,
            "updateTime": "2026-03-20T13:51:45+03:00",
            "updatedBy": null,
            "stampsEnabled": true,
            "isTransformationError": false,
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true,
                "DocumentNumber": "2026-001"
            },
            "templateId": "39",
            "pullTag": "TRANSFORMDOCUMENT61",
            "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=61",
            "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=61",
            "emailDiskFile": 5605,
            "entityId": "101",
            "entityTypeId": "2"
        }
    },
    "time": {
        "start": 1774003904,
        "finish": 1774003905.448804,
        "duration": 1.4488039016723633,
        "processing": 1,
        "date_start": "2026-03-20T13:51:44+03:00",
        "date_finish": "2026-03-20T13:51:45+03:00",
        "operating_reset_at": 1774004504,
        "operating": 0.9240179061889648
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Возвращает объект [`result`](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **document**
[`object`](../../../data-types.md) | Данные созданного документа. Структура описана в типе [`document`](#document) ||
|#

#### Тип document {#document}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
```integer | string``` | Идентификатор документа ||
|| **title**
[`string`](../../../data-types.md) | Название документа ||
|| **number**
[`string`](../../../data-types.md) | Номер документа ||
|| **createTime**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **updateTime**
[`datetime`](../../../data-types.md) | Дата обновления ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего документ ||
|| **updatedBy**
```integer | null``` | Идентификатор пользователя, обновившего документ ||
|| **changeStampsEnabled**
[`boolean`](../../../data-types.md) | Можно ли изменить признак подстановки печати и подписи ||
|| **changeStampsDisabledReason**
[`string`](../../../data-types.md) | Причина, почему нельзя изменить признак подстановки печати и подписи. Поле может отсутствовать ||
|| **changeQrCodeEnabled**
[`boolean`](../../../data-types.md) | Можно ли включить или выключить QR-код ||
|| **qrCodeEnabled**
[`boolean`](../../../data-types.md) | Текущее состояние QR-кода ||
|| **changeQrCodeDisabledReason**
[`string`](../../../data-types.md) | Причина, почему нельзя изменить QR-код. Поле может отсутствовать ||
|| **products**
[`object`](../../../data-types.md) | Сводная информация по товарам документа: `currencyId` — код валюты, строка или `null`; `totalSum` — сумма, число, числовая строка или `null`; `totalRows` — количество строк, число, числовая строка или `null`. Поле может отсутствовать ||
|| **stampsEnabled**
[`boolean`](../../../data-types.md) | Признак подстановки печати и подписи ||
|| **downloadUrl**
[`string`](../../../data-types.md) | Ссылка на скачивание документа ||
|| **downloadUrlMachine**
[`string`](../../../data-types.md) | Ссылка на скачивание документа для машинного доступа ||
|| **publicUrl**
```string | null``` | Публичная ссылка на документ ||
|| **isTransformationError**
[`boolean`](../../../data-types.md) | Признак ошибки конвертации документа ||
|| **transformationErrorMessage**
[`string`](../../../data-types.md) | Текст ошибки конвертации, если `isTransformationError = true` ||
|| **transformationErrorCode**
```integer | string``` | Код ошибки конвертации, если `isTransformationError = true` ||
|| **templateId**
```integer | string``` | Идентификатор шаблона ||
|| **pullTag**
[`string`](../../../data-types.md) | Тег события трансформации документа. Поле может отсутствовать ||
|| **emailDiskFile**
[`integer`](../../../data-types.md) | Идентификатор файла в Диске для отправки по email ||
|| **entityTypeId**
```integer | string``` | Идентификатор типа CRM-объекта ||
|| **entityId**
```integer | string``` | Идентификатор CRM-объекта ||
|| **values**
[`object`](../../../data-types.md) | Значения полей документа, включая переданные при создании и служебные значения ||
|| **imageUrl**
[`string`](../../../data-types.md) | Ссылка на изображение документа, если уже создано ||
|| **pdfUrl**
[`string`](../../../data-types.md) | Ссылка на PDF-файл документа, если уже создан ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "No provider for entityTypeId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | No provider for entityTypeId | Не найден провайдер данных для переданного `entityTypeId` ||
|| `400` | `0` | Empty required parameter "value" | Не передан или передан пустой `entityId` ||
|| `400` | `0` | Cannot create document on deleted template | Нельзя создать документ по удаленному шаблону ||
|| `400` | `0` | Cannot create document | Ошибка при создании документа по шаблону ||
|| `400` | `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к созданию документа ||
|| `400` | `DOCGEN_LIMIT_ERROR` | Maximum count of documents has been reached | Превышен лимит количества документов в тарифе ||
|| `400` | `0` | Error getting next number | Не удалось получить следующий номер документа из нумератора ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `0` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|| `400` | `0` | Шаблон не найден | Шаблон с указанным `templateId` не найден ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-get.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](./crm-document-generator-document-get-fields.md)
- [{#T}](../templates/crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
