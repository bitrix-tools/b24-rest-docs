# Получить нумератор по идентификатору documentgenerator.numerator.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.numerator.get` возвращает данные нумератора по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор нумератора.

Получить идентификатор можно после [создания нумератора](./document-generator-numerator-add.md) или методом [получения списка нумераторов](./document-generator-numerator-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":55}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.numerator.get
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":55,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.numerator.get
  ```

- JS (TS)

  ```ts
  // This snippet is an ES module: top-level await requires type="module" or a bundler.
  // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
  import { Text } from '@bitrix24/b24jssdk'
  import type { B24Frame } from '@bitrix24/b24jssdk'

  declare const $b24: B24Frame

  // Shape of the payload returned in result (match the "response handling" section of the page)
  type NumeratorGetResult = {
    numerator: {
      id: string
      name: string
      template: string
      code: string | null
      settings: Record<string, {
        start: number
        step: number
        length: number
        padString: string
        periodicBy: string
        timezone: string
        isDirectNumeration: boolean
      }>
    }
  }

  try {
    const response = await $b24.actions.v2.call.make<NumeratorGetResult>({
      method: 'documentgenerator.numerator.get',
      params: {
        id: 55,
      },
      requestId: Text.getUuidRfc4122()
    })

    // The payload is available only on a successful response
    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      const result = response.getData()!.result
      console.info(result.numerator.id, result.numerator.name, result.numerator.template)
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
    async function getNumerator() {
      try {
        // Initialize the SDK inside a Bitrix24 frame
        const $b24 = await B24Js.initializeB24Frame()

        const response = await $b24.actions.v2.call.make({
          method: 'documentgenerator.numerator.get',
          params: {
            id: 55,
          },
          requestId: B24Js.Text.getUuidRfc4122()
        })

        // The payload is available only on a successful response
        if (!response.isSuccess) {
          console.error(response.getErrorMessages().join('; '))
          return
        }

        const result = response.getData().result
        console.info(result.numerator.id, result.numerator.name, result.numerator.template)
      } catch (error) {
        // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
        console.error(error)
      }
    }

    document.addEventListener('DOMContentLoaded', getNumerator)
  </script>
  ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.numerator.get',
          [
              'id' => 55,
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
      'documentgenerator.numerator.get',
      {
          id: 55
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
      'documentgenerator.numerator.get',
      [
          'id' => 55,
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
        "numerator": {
            "name": "REST Invoice Numerator Updated",
            "template": "INV-UPD-{NUMBER}",
            "id": "55",
            "code": null,
            "settings": {
                "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                    "start": 2000,
                    "step": 10,
                    "length": 8,
                    "padString": "0",
                    "periodicBy": "year",
                    "timezone": "Europe/Moscow",
                    "isDirectNumeration": false
                }
            }
        }
    },
    "time": {
        "start": 1774363151,
        "finish": 1774363151.551318,
        "duration": 0.5513179302215576,
        "processing": 0,
        "date_start": "2026-03-24T17:39:11+03:00",
        "date_finish": "2026-03-24T17:39:11+03:00",
        "operating_reset_at": 1774363751,
        "operating": 0
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
|| **numerator**
[`object`](../../data-types.md) | Данные нумератора [(подробное описание)](#result-numerator) ||
|#

#### Объект numerator {#result-numerator}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера ||
|| **code**
[`string`](../../data-types.md) | Символьный код нумератора. Может быть `null` ||
|| **settings**
[`object`](../../data-types.md) | Настройки генераторов нумератора [(подробное описание)](#result-numerator-settings) ||
|#

#### Объект settings {#result-numerator-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации [(подробное описание)](#result-numerator-settings-sequent) ||
|#

#### Объект Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#result-numerator-settings-sequent}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Начальное значение счетчика ||
|| **step**
[`integer`](../../data-types.md) | Шаг увеличения счетчика ||
|| **length**
[`integer`](../../data-types.md) | Минимальная длина номера ||
|| **padString**
[`string`](../../data-types.md) | Символ добивки слева при `length > 0` ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DOCGEN_ACCESS_ERROR",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\Main\Numerator\Numerator constructor must be is public | Не передан обязательный параметр `id` ||
|| `400` | `100` | Could not construct parameter {numerator} | Передан несуществующий или некорректный идентификатор нумератора ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав на изменение шаблонов генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-numerator-add.md)
- [{#T}](./document-generator-numerator-update.md)
- [{#T}](./document-generator-numerator-list.md)
- [{#T}](./document-generator-numerator-delete.md)
