# Получить список полей документа documentgenerator.document.getfields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение документов

Метод `documentgenerator.document.getfields` возвращает поля документа, их текущие и базовые значения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор документа.

Получить идентификатор документа можно после [создания документа](./document-generator-document-add.md) или методом [получения списка документов](./document-generator-document-list.md) ||
|| **values**
[`object`](../data-types.md) | Необязательный параметр.

Значения полей, которые метод временно подставляет перед формированием `documentFields`.

Используйте `values`, чтобы заранее проверить, как значения будут интерпретированы и отображены при [создании](./document-generator-document-add.md) или [обновлении](./document-generator-document-update.md) документа.

Если `values` не передавать, метод вернет структуру полей с текущими и базовыми значениями ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"2026-03-18T00:00:00+03:00","ClientName":"ООО Ромашка","ClientPhone":"+7 999 123-45-67","Total":"51000","Comment":"Оплата в течение 5 рабочих дней после подписания","UserName":"Иван Петров"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.getfields
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"2026-03-18T00:00:00+03:00","ClientName":"ООО Ромашка","ClientPhone":"+7 999 123-45-67","Total":"51000","Comment":"Оплата в течение 5 рабочих дней после подписания","UserName":"Иван Петров"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.document.getfields
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetFieldsResult = {
      documentFields: Record<string, FieldInfo>
    }

    type FieldInfo = {
      title?: string
      value?: string
      default?: string
      group?: string[]
      chain?: string | unknown[]
      required?: 'Y' | 'N'
      type?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<GetFieldsResult>({
        method: 'documentgenerator.document.getfields',
        params: {
          id: 51,
          values: {
            DocumentNumber: 'DG-2026-001',
            CurrentDate: '2026-03-18T00:00:00+03:00',
            ClientName: 'LLC Romashka',
            ClientPhone: '+7 999 123-45-67',
            Total: '51000',
            Comment: 'Payment within 5 business days after signing',
            UserName: 'Ivan Petrov',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document fields:', Object.keys(result.documentFields))
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
      async function getDocumentFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.document.getfields',
            params: {
              id: 51,
              values: {
                DocumentNumber: 'DG-2026-001',
                CurrentDate: '2026-03-18T00:00:00+03:00',
                ClientName: 'LLC Romashka',
                ClientPhone: '+7 999 123-45-67',
                Total: '51000',
                Comment: 'Payment within 5 business days after signing',
                UserName: 'Ivan Petrov',
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
          console.info('Document fields:', Object.keys(result.documentFields))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDocumentFields)
    </script>
    ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.document.getfields',
          [
              'id' => 51,
              'values' => [
                  'DocumentNumber' => 'ДГ-2026-001',
                  'CurrentDate' => '2026-03-18T00:00:00+03:00',
                  'ClientName' => 'ООО Ромашка',
                  'ClientPhone' => '+7 999 123-45-67',
                  'Total' => '51000',
                  'Comment' => 'Оплата в течение 5 рабочих дней после подписания',
                  'UserName' => 'Иван Петров',
              ],
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
      'documentgenerator.document.getfields',
      {
          id: 51,
          values: {
              DocumentNumber: 'ДГ-2026-001',
              CurrentDate: '2026-03-18T00:00:00+03:00',
              ClientName: 'ООО Ромашка',
              ClientPhone: '+7 999 123-45-67',
              Total: '51000',
              Comment: 'Оплата в течение 5 рабочих дней после подписания',
              UserName: 'Иван Петров'
          }
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
      'documentgenerator.document.getfields',
      [
          'id' => 51,
          'values' => [
              'DocumentNumber' => 'ДГ-2026-001',
              'CurrentDate' => '2026-03-18T00:00:00+03:00',
              'ClientName' => 'ООО Ромашка',
              'ClientPhone' => '+7 999 123-45-67',
              'Total' => '51000',
              'Comment' => 'Оплата в течение 5 рабочих дней после подписания',
              'UserName' => 'Иван Петров',
          ],
      ]
  );

  print_r($result);
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "documentFields": {
            "DocumentNumber": {
                "title": "Номер",
                "value": "ДГ-2026-001",
                "required": "Y",
                "group": [
                    "Документ"
                ],
                "chain": "this.DOCUMENT.DOCUMENT_NUMBER",
                "default": "ДГ-2026-001"
            },
            "CurrentDate": {
                "value": "2026-03-18T00:00:00+03:00",
                "default": ""
            },
            "ClientName": {
                "value": "ООО Ромашка",
                "default": ""
            },
            "ClientPhone": {
                "value": "+7 999 123-45-67",
                "default": ""
            },
            "Total": {
                "value": "51000",
                "default": ""
            },
            "Comment": {
                "value": "Оплата в течение 5 рабочих дней после подписания",
                "default": ""
            },
            "UserName": {
                "value": "Иван Петров",
                "default": ""
            },
            "DocumentTitle": {
                "title": "Название документа",
                "value": "SUPPLY_CONTRACT Template 1773843147554 ДГ-2026-001",
                "group": [
                    "Документ"
                ],
                "chain": [
                    {},
                    "getTitle"
                ],
                "required": "Y",
                "default": "SUPPLY_CONTRACT Template 1773843147554 ДГ-2026-001"
            }
        }
    },
    "time": {
        "start": 1773931419,
        "finish": 1773931419.57404,
        "duration": 0.5740399360656738,
        "processing": 0,
        "date_start": "2026-03-19T17:43:39+03:00",
        "date_finish": "2026-03-19T17:43:39+03:00",
        "operating_reset_at": 1773932019,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentFields**
[`object`](../data-types.md) | Набор полей документа по коду поля [(подробное описание)](#document-fields) ||
|#

#### Объект documentFields {#document-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../data-types.md) | Название поля ||
|| **value**
[`string`](../data-types.md) | Текущее значение поля ||
|| **default**
[`string`](../data-types.md) | Базовое значение поля ||
|| **group**
[`array`](../data-types.md) | Группа поля в шаблоне ||
|| **chain**
[`string`](../data-types.md) \| [`array`](../data-types.md) | Цепочка поля, если она доступна.

Может быть строкой (например, `this.DOCUMENT.DOCUMENT_NUMBER`) или массивом (например, `[{}, "getTitle"]`) ||
|| **required**
[`string`](../data-types.md) | Признак обязательности поля

Возможные значения:
- `Y` — поле обязательное
- `N` — поле необязательное ||
|| **type**
[`string`](../data-types.md) | Тип поля, если он задан ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to view documents"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\DocumentGenerator\Document constructor must be is public | Не передан обязательный параметр `id` ||
|| `400` | `0` | Документ не найден | Документ с указанным `id` не найден ||
|| `400` | `0` | You do not have permissions to view documents | Недостаточно прав на изменение документа ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-document-add.md)
- [{#T}](./document-generator-document-update.md)
- [{#T}](./document-generator-document-get.md)
- [{#T}](./document-generator-document-list.md)
- [{#T}](./document-generator-document-delete.md)
- [{#T}](./document-generator-document-enable-public-url.md)
