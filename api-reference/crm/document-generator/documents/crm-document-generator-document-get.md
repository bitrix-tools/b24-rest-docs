# Получить документ crm.documentgenerator.document.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра документов генератора документов и доступом к указанному документу

Метод `crm.documentgenerator.document.get` возвращает данные документа по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../../data-types.md) | Идентификатор документа. Можно получить методом [crm.documentgenerator.document.list](./crm-document-generator-document-list.md) ||
|#

{% note info "Особенность метода" %}

Если PDF или изображение еще не сформированы, метод может запустить конвертацию документа.

Конвертация выполняется асинхронно. Если ссылки нужны сразу, повторите запрос через 30–40 секунд после создания или обновления документа.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения документа с идентификатором `61`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":61}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":61,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentGetResult = {
      document: {
        id: string
        title: string
        number: string
        createTime: ISODate
        updateTime: ISODate
        createdBy: string
        updatedBy: string | null
        changeStampsEnabled: boolean
        changeStampsDisabledReason?: string
        changeQrCodeEnabled: boolean
        qrCodeEnabled: boolean
        changeQrCodeDisabledReason?: string
        products?: {
          currencyId: string | null
          totalSum: number | string | null
          totalRows: number | string | null
        }
        stampsEnabled: boolean
        downloadUrl: string
        downloadUrlMachine: string
        imageUrl?: string
        imageUrlMachine: string
        pdfUrl?: string
        pdfUrlMachine: string
        publicUrl: string | null
        isTransformationError: boolean
        templateId?: string
        pullTag?: string
        emailDiskFile: number
        entityTypeId: string
        entityId: string
        values: Record<string, unknown>
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentGetResult>({
        method: 'crm.documentgenerator.document.get',
        params: {
          id: 61,
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
      async function getDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.documentgenerator.document.get',
            params: {
              id: 61,
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

      document.addEventListener('DOMContentLoaded', getDocument)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.documentgenerator.document.get(bitrix_id=61).response
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
                'crm.documentgenerator.document.get',
                [
                    'id' => 61,
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
        echo 'Error getting document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.get',
        {
            id: 61,
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
        'crm.documentgenerator.document.get',
        [
            'id' => 61,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.documentgenerator.document.get", b24.Params{
    	"id": 61,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.documentgenerator.document.get: %w", err)
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
            "publicUrl": null,
            "title": "Демонстрационная реализация товара 2026-001",
            "number": "2026-001",
            "id": "61",
            "createTime": "2026-03-20T13:51:45+03:00",
            "createdBy": "577",
            "updateTime": "2026-03-20T13:51:45+03:00",
            "updatedBy": null,
            "stampsEnabled": true,
            "isTransformationError": false,
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true
            },
            "templateId": "39",
            "pullTag": "TRANSFORMDOCUMENT61",
            "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=61",
            "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=61",
            "emailDiskFile": 5609,
            "entityId": "101",
            "entityTypeId": "2",
            "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?...",
            "imageUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getImage.json?...",
            "pdfUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getPdf.json?..."
        }
    },
    "time": {
        "start": 1774006578,
        "finish": 1774006578.790473,
        "duration": 0.7904729843139648,
        "processing": 0,
        "date_start": "2026-03-20T14:36:18+03:00",
        "date_finish": "2026-03-20T14:36:18+03:00",
        "operating_reset_at": 1774007178,
        "operating": 0.23765993118286133
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
[`object`](../../../data-types.md) | Данные документа. Структура описана в типе [`document`](#document) ||
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
[`datetime`](../../../data-types.md) | Дата создания документа ||
|| **updateTime**
[`datetime`](../../../data-types.md) | Дата обновления документа ||
|| **createdBy**
```integer | string``` | Идентификатор пользователя, создавшего документ ||
|| **updatedBy**
```integer | string | null``` | Идентификатор пользователя, обновившего документ ||
|| **changeStampsEnabled**
[`boolean`](../../../data-types.md) | Можно ли изменить признак подстановки печати и подписи ||
|| **changeStampsDisabledReason**
[`string`](../../../data-types.md) | Причина, почему нельзя изменить признак подстановки печати и подписи ||
|| **changeQrCodeEnabled**
[`boolean`](../../../data-types.md) | Можно ли включить или выключить QR-код ||
|| **qrCodeEnabled**
[`boolean`](../../../data-types.md) | Текущее состояние QR-кода ||
|| **changeQrCodeDisabledReason**
[`string`](../../../data-types.md) | Причина, почему нельзя изменить QR-код ||
|| **products**
[`object`](../../../data-types.md) | Сводная информация по товарам документа [(подробное описание)](#products). Поле присутствует, если есть данные хотя бы по одному из показателей ||
|| **stampsEnabled**
[`boolean`](../../../data-types.md) | Признак подстановки печати и подписи ||
|| **downloadUrl**
[`string`](../../../data-types.md) | Ссылка на скачивание документа ||
|| **downloadUrlMachine**
[`string`](../../../data-types.md) | Ссылка на скачивание документа для машинного доступа ||
|| **imageUrl**
[`string`](../../../data-types.md) | Ссылка на изображение документа. Поле присутствует, когда изображение сформировано ||
|| **imageUrlMachine**
[`string`](../../../data-types.md) | Ссылка на изображение документа для машинного доступа ||
|| **pdfUrl**
[`string`](../../../data-types.md) | Ссылка на PDF-документ. Поле присутствует, когда PDF сформирован ||
|| **pdfUrlMachine**
[`string`](../../../data-types.md) | Ссылка на PDF-документ для машинного доступа ||
|| **publicUrl**
```string | null``` | Публичная ссылка на документ ||
|| **publicUrlView**
[`object`](../../../data-types.md) | Информация о просмотре публичной ссылки. Поле присутствует при наличии публичной ссылки; содержит поле `time` — дату и время просмотра ||
|| **isTransformationError**
[`boolean`](../../../data-types.md) | В успешном ответе — `false` ||
|| **transformationCancelReason**
[`object`](../../../data-types.md) | Причина отмены конвертации с полями `message`, `code` и `customData`. Поле присутствует, если причина задана ||
|| **templateId**
```integer | string``` | Идентификатор шаблона документа. Поле присутствует, если шаблон найден ||
|| **pullTag**
[`string`](../../../data-types.md) | Тег события трансформации документа. Поле присутствует, если тег задан ||
|| **emailDiskFile**
[`integer`](../../../data-types.md) | Идентификатор файла на Диске для отправки по email. Если подходящий файл на Диске не найден, возвращается `0` ||
|| **entityTypeId**
```integer | string``` | Идентификатор типа CRM-объекта ||
|| **entityId**
```integer | string``` | Идентификатор CRM-объекта ||
|| **values**
[`object`](../../../data-types.md) | Значения полей документа ||
|#

#### Тип products {#products}

#|
|| **Название**
`тип` | **Описание** ||
|| **currencyId**
```string | null``` | Код валюты ||
|| **totalSum**
```number | string | null``` | Общая сумма товаров ||
|| **totalRows**
```number | string | null``` | Количество товарных позиций ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DOCGEN_ACCESS_ERROR",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к документу ||
|| `0` | Документ не найден | Документ с указанным `id` не найден ||
|| `0` | Document not found | Документ не относится к модулю `crm` ||
|| `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `0` | You do not have permissions to view documents | Недостаточно прав для просмотра документов генератора ||
|| `0` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-add.md)
- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](./crm-document-generator-document-get-fields.md)
- [{#T}](../templates/crm-document-generator-template-get.md)
