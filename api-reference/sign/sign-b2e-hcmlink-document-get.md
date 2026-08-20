# Получить подписанный документ HCM Link sign.b2e.hcmlink.document.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sign.b2e.hcmlink.document.get` возвращает данные подписанного документа КЭДО, который связан с HCM Link.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Метод доступен, если на Битрикс24 доступна интеграция HCM Link.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор участника подписания.

Получить идентификатор можно из поля `data.id` события [OnSignHcmLinkB2eDocumentSigned](./events/on-sign-hcm-link-b2e-document-signed.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3942,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.hcmlink.document.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type HcmLinkDocument = {
      company: string
      employee: string
      document: {
        date: ISODate
        name: string
        fileUrl: string
        fileName: string
        uid: string | null
        documentUid: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<HcmLinkDocument>({
        method: 'sign.b2e.hcmlink.document.get',
        params: {
          id: 3942,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.company, result.employee, result.document.fileName)
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
      async function getHcmLinkDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.hcmlink.document.get',
            params: {
              id: 3942,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.company, result.employee, result.document.fileName)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getHcmLinkDocument)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.hcmlink.document.get',
                [
                    'id' => 3942
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'sign.b2e.hcmlink.document.get',
        {
            id: 3942
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.hcmlink.document.get',
        [
            'id' => 3942
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.hcmlink.document.get", b24.Params{
    	"id": 3942,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.hcmlink.document.get: %w", err)
    }

    var item struct {
    	Company string `json:"company"`
    	Employee string `json:"employee"`
    	Document struct {
    		FileName string `json:"fileName"`
    	} `json:"document"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Company, item.Employee, item.Document.FileName)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "company": "acme-hr",
        "employee": "EMP-001",
        "document": {
            "date": "2026-08-07T10:15:30+03:00",
            "name": "Трудовой договор",
            "fileUrl": "https://test.bitrix24.ru/rest/download.json?auth=***&token=sign.b2e...",
            "fileName": "Трудовой договор.pdf",
            "uid": "TD-2026-001",
            "documentUid": "R-LK-50JI-3AAK-WS1A"
        }
    },
    "time": {
        "start": 1786086930.123,
        "finish": 1786086930.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2026-08-07T10:15:30+03:00",
        "date_finish": "2026-08-07T10:15:30+03:00",
        "operating_reset_at": 1786087530,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Информация о подписанном документе [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **company**
[`string`](../data-types.md) | Код компании HCM Link ||
|| **employee**
[`string`](../data-types.md) | Код сотрудника HCM Link ||
|| **document**
[`object`](../data-types.md) | Данные подписанного документа [(подробное описание)](#document) ||
|#

#### Объект document {#document}

#|
|| **Название**
`тип` | **Описание** ||
|| **date**
[`string`](../data-types.md) | Дата создания документа в формате ISO 8601 ||
|| **name**
[`string`](../data-types.md) | Название документа ||
|| **fileUrl**
[`string`](../data-types.md) | Ссылка для скачивания подписанного файла ||
|| **fileName**
[`string`](../data-types.md) | Название подписанного файла ||
|| **uid**
[`string`](../data-types.md) | Идентификатор документа из HCM Link. Может вернуть `null`, если поле документа не связано с подписанным документом ||
|| **documentUid**
[`string`](../data-types.md) | Уникальный идентификатор документа КЭДО. Может вернуть `null` ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "error": "SIGN_HCMLINK_DOCUMENT_NOT_FOUND",
    "error_description": "Document not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Когда возникает** ||
|| `403` | `ACCESS_DENIED` | Access denied | Недостаточно прав ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Вызов не из контекста приложения ||
|| `200` | Пустое значение | Module humanresources is not available | Модуль `humanresources` недоступен ||
|| `200` | `SIGN_HCMLINK_DOCUMENT_NOT_FOUND` | Document not found | Документ не найден или не связан с HCM Link ||
|| `200` | `SIGN_HCMLINK_DOCUMENT_NOT_LINKED` | No employee or company linked to the document | С документом не связаны сотрудник или компания HCM Link ||
|| `200` | `SIGN_HCMLINK_NO_SIGNED_FILE_EXIST` | Signed file for this document does not exist | Подписанный файл документа не найден ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-send.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./events/on-sign-hcm-link-b2e-document-signed.md)
- [{#T}](./hcm-link/index.md)
