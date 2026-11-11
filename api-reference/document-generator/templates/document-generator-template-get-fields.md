# Получить список полей шаблона documentgenerator.template.getfields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.getfields` возвращает поля шаблона: плейсхолдеры из файла шаблона и служебные поля документа.

{% note info "" %}

Метод работает только с шаблонами, загруженными через REST API, — у них `moduleId` равен `rest`. Для шаблонов CRM и других модулей метод вернет ошибку `DOCGEN_ACCESS_ERROR`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона.

Получить идентификатор шаблона можно после [создания шаблона](./document-generator-template-add.md) или методом [получения списка шаблонов](./document-generator-template-list.md).

Шаблон не должен быть помечен как удаленный. Проверить это можно по полю `isDeleted` в ответе метода [documentgenerator.template.get](./document-generator-template-get.md) ||
|#

{% note info "" %}

Вместо `id` можно передать параметр `templateId` с тем же значением. Если не передан ни один из них, метод вернет ошибку с кодом `100`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":57}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.getfields
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":57,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.getfields
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TemplateField = {
      title?: string
      value: string
      default: string
      required?: 'Y'
      type?: 'IMAGE' | 'STAMP' | 'DATE' | 'TEXT' | 'NAME' | 'PHONE'
      group?: string[]
      chain?: string | unknown[]
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateGetFieldsResult = {
      templateFields: Record<string, TemplateField>
    }

    try {
      const response = await $b24.actions.v2.call.make<TemplateGetFieldsResult>({
        method: 'documentgenerator.template.getfields',
        params: {
          id: 57,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result.templateFields))
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
      async function getTemplateFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.template.getfields',
            params: {
              id: 57,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result.templateFields))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplateFields)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.documentgenerator.template.getfields(
          bitrix_id=57,
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
      $response = $b24Service->core->call(
          'documentgenerator.template.getfields',
          [
              'id' => 57,
          ]
      );

      $result = $response->getResponseData()->getResult();
      print_r($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.template.getfields',
      {
          id: 57
      },
      function(result)
      {
          if (result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.log(result.data());
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'documentgenerator.template.getfields',
      [
          'id' => 57,
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.template.getfields", b24.Params{
    	"id": 57,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("documentgenerator.template.getfields: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "templateFields".
    raw, ok := b24.Unwrap(res.Result, "templateFields")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа templateFields")
    }

    fmt.Printf("%s\n", raw)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "templateFields": {
            "DocumentNumber": {
                "title": "Номер",
                "value": "А015//11/2026",
                "required": "Y",
                "group": [
                    "Документ"
                ],
                "chain": "this.DOCUMENT.DOCUMENT_NUMBER",
                "default": "А015//11/2026"
            },
            "DocumentCreateTime": {
                "title": "Дата генерации",
                "value": "2026-11-11",
                "type": "DATE",
                "group": [
                    "Документ"
                ],
                "chain": "this.DOCUMENT.DOCUMENT_CREATE_TIME",
                "default": "2026-11-11"
            },
            "ClientName": {
                "value": "",
                "default": ""
            },
            "Total": {
                "value": "",
                "default": ""
            },
            "DocumentTitle": {
                "title": "Название документа",
                "value": "Supply contract А015//11/2026",
                "group": [
                    "Документ"
                ],
                "chain": [
                    {},
                    "getTitle"
                ],
                "required": "Y",
                "default": "Supply contract А015//11/2026"
            }
        }
    },
    "time": {
        "start": 1794393620,
        "finish": 1794393620.625241,
        "duration": 0.6252410411834717,
        "processing": 0,
        "date_start": "2026-11-11T13:40:20+03:00",
        "date_finish": "2026-11-11T13:40:20+03:00",
        "operating_reset_at": 1794394080,
        "operating": 0.3588840961456299
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateFields**
[`object`](../../data-types.md) | Поля шаблона. Ключ — имя плейсхолдера без фигурных скобок, например `DocumentNumber` для `{DocumentNumber}`, значение — описание поля [(подробное описание)](#templatefield).

Состав ключей:
- `DocumentTitle` — название документа, возвращается всегда
- `DocumentNumber` — номер документа, возвращается, если в файле шаблона есть плейсхолдер `{DocumentNumber}`
- `DocumentCreateTime` — дата создания документа, возвращается, если в файле шаблона есть плейсхолдер `{DocumentCreateTime}`
- остальные плейсхолдеры из файла шаблона, например `{ClientName}`. Для них возвращаются только поля `value` и `default` с пустой строкой — значения передаются при создании документа методом [documentgenerator.document.add](../document-generator-document-add.md)
||
|#

#### Объект templateField {#templatefield}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля. Возвращается только для полей `DocumentTitle`, `DocumentNumber` и `DocumentCreateTime` ||
|| **value**
[`string`](../../data-types.md) | Значение поля, которое будет подставлено в новый документ. Для `DocumentNumber` — следующий номер по нумератору шаблона, для `DocumentCreateTime` — текущая дата в формате `YYYY-MM-DD`, для `DocumentTitle` — название шаблона и номер документа через пробел. Для остальных плейсхолдеров — пустая строка ||
|| **default**
[`string`](../../data-types.md) | Значение поля по умолчанию. В ответе метода совпадает с `value` ||
|| **required**
[`char`](../../data-types.md) | Признак обязательного поля. Возвращается со значением `Y` для полей `DocumentTitle` и `DocumentNumber`. Если поле необязательное, ключ отсутствует ||
|| **type**
[`string`](../../data-types.md) | Тип поля. Возвращается не для всех полей, например для `DocumentCreateTime` — `DATE`.

Возможные значения:
- `DATE` — дата
- `TEXT` — текст
- `NAME` — имя
- `PHONE` — телефон
- `IMAGE` — изображение
- `STAMP` — печать или подпись
||
|| **group**
[`array`](../../data-types.md) | Названия групп, к которым относится поле, например `["Документ"]` ||
|| **chain**
[`string`](../../data-types.md) \| [`array`](../../data-types.md) | Путь к значению поля в провайдере данных, например `this.DOCUMENT.DOCUMENT_NUMBER`.

Для поля `DocumentTitle` возвращается массив `[{}, "getTitle"]` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Cannot get fields from deleted template"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `id` или `templateId` ||
|| `400` | `0` | Шаблон не найден | Шаблон с указанным `id` не существует или в `id` передано не положительное целое число, например `0` или `"abc"` ||
|| `400` | `0` | Cannot get fields from deleted template | Шаблон помечен как удаленный: поле `isDeleted` равно `Y` ||
|| `400` | `DOCGEN_ACCESS_ERROR` | Access denied | Шаблон относится не к модулю `rest`, например это шаблон CRM ||
|| `400` | `0` | You do not have permissions to modify templates | У пользователя нет права на изменение шаблонов генератора документов ||
|| `400` | `0` | You do not have permissions to modify this template | У пользователя нет права на изменение этого шаблона ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-add.md)
- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-list.md)
- [{#T}](./document-generator-template-delete.md)
