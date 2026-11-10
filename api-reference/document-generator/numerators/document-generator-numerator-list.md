# Получить список нумераторов documentgenerator.numerator.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.numerator.list` возвращает постраничный список нумераторов для генератора документов. В выборку входят доступные нумераторы этого типа, в том числе [CRM нумераторы](../../crm/document-generator/numerator/index.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 элементов.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов, необходимо передавать `100` и так далее.

Формула расчета значения `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

{% note info "" %}

Метод не возвращает общее количество нумераторов и значение `next`. Для последовательной загрузки увеличивайте `start` на 50, пока массив `numerators` не станет пустым или не вернет меньше 50 элементов.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.numerator.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.numerator.list
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type NumeratorItem = {
      id: string
      name: string
      template: string
      settings: {
        Bitrix_Main_Numerator_Generator_SequentNumberGenerator?: {
          start: number
          step: number
          length: number
          padString: string
          periodicBy: string | null
          timezone: string | null
          isDirectNumeration: boolean
        }
      }
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NumeratorListResult = {
      numerators: NumeratorItem[]
    }

    try {
      const response = await $b24.actions.v2.call.make<NumeratorListResult>({
        method: 'documentgenerator.numerator.list',
        params: {
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Numerators:', result.numerators, 'Count:', result.numerators.length)
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
      async function fetchNumeratorList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.numerator.list',
            params: {
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Numerators:', result.numerators, 'Count:', result.numerators.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchNumeratorList)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.documentgenerator.numerator.list(
          start=0,
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
          'documentgenerator.numerator.list',
          [
              'start' => 0,
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
      'documentgenerator.numerator.list',
      {
          start: 0
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
      'documentgenerator.numerator.list',
      [
          'start' => 0,
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.numerator.list", b24.Params{
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("documentgenerator.numerator.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "numerators": [
            {
                "id": "53",
                "name": "Общий номер",
                "template": "{NUMBER}",
                "settings": {
                    "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                        "start": 1,
                        "step": 1,
                        "length": 0,
                        "padString": "0",
                        "periodicBy": null,
                        "timezone": null,
                        "isDirectNumeration": false
                    }
                }
            },
            {
                "id": "55",
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
                        "isDirectNumeration": false
                    }
                }
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1774363478,
        "finish": 1774363478.809978,
        "duration": 0.8099780082702637,
        "processing": 0,
        "date_start": "2026-03-24T17:44:38+03:00",
        "date_finish": "2026-03-24T17:44:38+03:00",
        "operating_reset_at": 1774364078,
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
|| **total**
[`integer`](../../data-types.md) | Количество нумераторов на текущей странице. Поле не содержит общее количество записей во всей выборке ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **numerators**
[`array`](../../data-types.md) | Список нумераторов [(подробное описание)](#numerators) ||
|#

#### Элемент массива numerators {#numerators}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера ||
|| **settings**
[`object`](../../data-types.md) | Настройки генераторов нумератора [(подробное описание)](#numerators-settings) ||
|#

#### Объект settings {#numerators-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации [(подробное описание)](#numerators-settings-sequent) ||
|#

#### Объект Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#numerators-settings-sequent}

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
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Период сброса счетчика. Возвращается `null`, если периодический сброс выключен ||
|| **timezone**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор часового пояса для периодического сброса. Возвращается `null`, если часовой пояс не задан ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to modify templates"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав на изменение шаблонов генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./document-generator-numerator-add.md)
- [{#T}](./document-generator-numerator-update.md)
- [{#T}](./document-generator-numerator-get.md)
- [{#T}](./document-generator-numerator-delete.md)
