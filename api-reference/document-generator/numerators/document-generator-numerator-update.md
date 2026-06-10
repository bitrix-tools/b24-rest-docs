# Изменить нумератор documentgenerator.numerator.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.numerator.update` обновляет нумератор по идентификатору.

{% note warning "" %}

Обновить можно только нумератор, который был создан через REST-метод `documentgenerator.numerator.add`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор нумератора.

Получить идентификатор можно после [создания нумератора](./document-generator-numerator-add.md) или методом [получения списка нумераторов](./document-generator-numerator-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей для обновления [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Новое название нумератора ||
|| **template**
[`string`](../../data-types.md) | Новый шаблон номера с плейсхолдером `{NUMBER}`.

`{NUMBER}` нужно указывать в фигурных скобках, при генерации документа плейсхолдер заменяется на следующее значение счетчика по настройкам `settings`.

Примеры шаблонов:
- `{NUMBER}` → `1000`
- `INV-{NUMBER}` → `INV-1000`
- `DG/{NUMBER}/2026` → `DG/1000/2026` ||
|| **settings**
[`object`](../../data-types.md) | Обновленные настройки генераторов [(подробное описание)](#fields-settings) ||
|#

#### Параметр settings {#fields-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации [(подробное описание)](#fields-settings-sequent) ||
|#

#### Параметры Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#fields-settings-sequent}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Начальное значение счетчика. По умолчанию `1` ||
|| **step**
[`integer`](../../data-types.md) | Шаг увеличения счетчика. По умолчанию `1` ||
|| **length**
[`integer`](../../data-types.md) | Минимальная длина номера. По умолчанию `0` ||
|| **padString**
[`string`](../../data-types.md) | Символ добивки слева при `length > 0`. По умолчанию `0` ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика:
- `''` — без сброса
- `day` — ежедневно
- `month` — ежемесячно
- `year` — ежегодно ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса, например `Europe/Moscow` ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации.

Возможные значения:
- `0` — выключена
- `1` — включена

По умолчанию `0`.

В ответе метода значение возвращается в виде `true` \| `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример обновления нумератора:
- идентификатор — `55`
- новое название — `REST Invoice Numerator Updated`
- новый шаблон — `INV-UPD-{NUMBER}`
- стартовое значение — `2000`
- шаг — `10`
- минимальная длина номера — `8`
- символ добивки — `0`
- сброс номера — ежегодно `year`
- часовой пояс — `Europe/Moscow`
- прямая нумерация — `0`

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "id": 55,
      "fields": {
        "name": "REST Invoice Numerator Updated",
        "template": "INV-UPD-{NUMBER}",
        "settings": {
          "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
            "start": 2000,
            "step": 10,
            "length": 8,
            "padString": "0",
            "periodicBy": "year",
            "timezone": "Europe/Moscow",
            "isDirectNumeration": 0
          }
        }
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.numerator.update
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "id": 55,
      "fields": {
        "name": "REST Invoice Numerator Updated",
        "template": "INV-UPD-{NUMBER}",
        "settings": {
          "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
            "start": 2000,
            "step": 10,
            "length": 8,
            "padString": "0",
            "periodicBy": "year",
            "timezone": "Europe/Moscow",
            "isDirectNumeration": 0
          }
        }
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.numerator.update
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NumeratorUpdateResult = {
      id: string
      name: string
      template: string
      code: string | null
      settings: {
        Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
          start: number
          step: number
          length: number
          padString: string
          periodicBy: string
          timezone: string
          isDirectNumeration: boolean
        }
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<NumeratorUpdateResult>({
        method: 'documentgenerator.numerator.update',
        params: {
          id: 55,
          fields: {
            name: 'REST Invoice Numerator Updated',
            template: 'INV-UPD-{NUMBER}',
            settings: {
              Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                start: 2000,
                step: 10,
                length: 8,
                padString: '0',
                periodicBy: 'year',
                timezone: 'Europe/Moscow',
                isDirectNumeration: 0,
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.name, result.template)
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
      async function updateNumerator() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.numerator.update',
            params: {
              id: 55,
              fields: {
                name: 'REST Invoice Numerator Updated',
                template: 'INV-UPD-{NUMBER}',
                settings: {
                  Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                    start: 2000,
                    step: 10,
                    length: 8,
                    padString: '0',
                    periodicBy: 'year',
                    timezone: 'Europe/Moscow',
                    isDirectNumeration: 0,
                  },
                },
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
          console.info(result.id, result.name, result.template)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateNumerator)
    </script>
    ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.numerator.update',
          [
              'id' => 55,
              'fields' => [
                  'name' => 'REST Invoice Numerator Updated',
                  'template' => 'INV-UPD-{NUMBER}',
                  'settings' => [
                      'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                          'start' => 2000,
                          'step' => 10,
                          'length' => 8,
                          'padString' => '0',
                          'periodicBy' => 'year',
                          'timezone' => 'Europe/Moscow',
                          'isDirectNumeration' => 0,
                      ],
                  ],
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
      'documentgenerator.numerator.update',
      {
          id: 55,
          fields: {
              name: 'REST Invoice Numerator Updated',
              template: 'INV-UPD-{NUMBER}',
              settings: {
                  Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                      start: 2000,
                      step: 10,
                      length: 8,
                      padString: '0',
                      periodicBy: 'year',
                      timezone: 'Europe/Moscow',
                      isDirectNumeration: 0
                  }
              }
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
      'documentgenerator.numerator.update',
      [
          'id' => 55,
          'fields' => [
              'name' => 'REST Invoice Numerator Updated',
              'template' => 'INV-UPD-{NUMBER}',
              'settings' => [
                  'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                      'start' => 2000,
                      'step' => 10,
                      'length' => 8,
                      'padString' => '0',
                      'periodicBy' => 'year',
                      'timezone' => 'Europe/Moscow',
                      'isDirectNumeration' => 0,
                  ],
              ],
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
    },
    "time": {
        "start": 1774362882,
        "finish": 1774362882.472678,
        "duration": 0.47267794609069824,
        "processing": 0,
        "date_start": "2026-03-24T17:34:42+03:00",
        "date_finish": "2026-03-24T17:34:42+03:00",
        "operating_reset_at": 1774363482,
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
|| **id**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера ||
|| **code**
[`string`](../../data-types.md) | Символьный код нумератора. Может быть `null` ||
|| **settings**
[`object`](../../data-types.md) | Настройки генераторов нумератора [(подробное описание)](#result-settings) ||
|#

#### Объект settings {#result-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации [(подробное описание)](#result-settings-sequent) ||
|#

#### Объект Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#result-settings-sequent}

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
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав на изменение шаблонов генератора документов ||
|| `400` | `DOCGEN_ACCESS_ERROR` | Access denied | Нельзя изменить нумератор, который не был создан через REST, или нумератор другого типа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-numerator-add.md)
- [{#T}](./document-generator-numerator-get.md)
- [{#T}](./document-generator-numerator-list.md)
- [{#T}](./document-generator-numerator-delete.md)
