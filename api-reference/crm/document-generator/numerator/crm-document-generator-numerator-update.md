# Изменить нумератор crm.documentgenerator.numerator.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.numerator.update` обновляет существующий нумератор.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор нумератора ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями для обновления в формате:

```json
{
    "field_1": "value_1",
    "field_2": "value_2",
    "...": "..."
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список полей — [ниже](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера, например `{NUMBER}` ||
|| **settings**
[`object`](../../data-types.md) | Настройки генераторов. Описание параметров — [ниже](#parameter-settings) ||
|#

### Параметр settings {#parameter-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации. Описание параметров — [ниже](#parameter-sequent-settings) ||
|#

#### Параметры Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#parameter-sequent-settings}

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
[`string`](../../data-types.md) | Символ добивки слева при `length > 0`. По умолчанию `'0'` ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика:
- `''` — без сброса
- `day` — ежедневно
- `month` — ежемесячно
- `year` — ежегодно ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса, например `Europe/Moscow` ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации. По умолчанию `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример обновления нумератора:
- новый шаблон — `INV-{NUMBER}`
- старт последовательности — `100`
- шаг — `1`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"fields":{"name":"Нумератор из REST (обновлен)","template":"INV-{NUMBER}","settings":{"Bitrix_Main_Numerator_Generator_SequentNumberGenerator":{"start":100,"step":1,"length":6,"padString":"0","periodicBy":"","timezone":"","isDirectNumeration":false}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.numerator.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"fields":{"name":"Нумератор из REST (обновлен)","template":"INV-{NUMBER}","settings":{"Bitrix_Main_Numerator_Generator_SequentNumberGenerator":{"start":100,"step":1,"length":6,"padString":"0","periodicBy":"","timezone":"","isDirectNumeration":false}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.numerator.update
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
          periodicBy: string | null
          timezone: string | null
          isDirectNumeration: boolean
        }
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<NumeratorUpdateResult>({
        method: 'crm.documentgenerator.numerator.update',
        params: {
          id: 45,
          fields: {
            name: 'Numerator from REST (updated)',
            template: 'INV-{NUMBER}',
            settings: {
              Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                start: 100,
                step: 1,
                length: 6,
                padString: '0',
                periodicBy: '',
                timezone: '',
                isDirectNumeration: false,
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
            method: 'crm.documentgenerator.numerator.update',
            params: {
              id: 45,
              fields: {
                name: 'Numerator from REST (updated)',
                template: 'INV-{NUMBER}',
                settings: {
                  Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                    start: 100,
                    step: 1,
                    length: 6,
                    padString: '0',
                    periodicBy: '',
                    timezone: '',
                    isDirectNumeration: false,
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
        $response = $b24Service
            ->core
            ->call(
                'crm.documentgenerator.numerator.update',
                [
                    'id' => 45,
                    'fields' => [
                        'name' => 'Нумератор из REST (обновлен)',
                        'template' => 'INV-{NUMBER}',
                        'settings' => [
                            'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                                'start' => 100,
                                'step' => 1,
                                'length' => 6,
                                'padString' => '0',
                                'periodicBy' => '',
                                'timezone' => '',
                                'isDirectNumeration' => false,
                            ],
                        ],
                    ],
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
        echo 'Error updating numerator: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.numerator.update',
        {
            id: 45,
            fields: {
                name: 'Нумератор из REST (обновлен)',
                template: 'INV-{NUMBER}',
                settings: {
                    Bitrix_Main_Numerator_Generator_SequentNumberGenerator: {
                        start: 100,
                        step: 1,
                        length: 6,
                        padString: '0',
                        periodicBy: '',
                        timezone: '',
                        isDirectNumeration: false,
                    },
                },
            },
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
        'crm.documentgenerator.numerator.update',
        [
            'id' => 45,
            'fields' => [
                'name' => 'Нумератор из REST (обновлен)',
                'template' => 'INV-{NUMBER}',
                'settings' => [
                    'Bitrix_Main_Numerator_Generator_SequentNumberGenerator' => [
                        'start' => 100,
                        'step' => 1,
                        'length' => 6,
                        'padString' => '0',
                        'periodicBy' => '',
                        'timezone' => '',
                        'isDirectNumeration' => false,
                    ],
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "name": "Нумератор из REST (обновлен)",
        "template": "INV-{NUMBER}",
        "id": "45",
        "code": null,
        "settings": {
            "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                "start": 100,
                "step": 1,
                "length": 0,
                "padString": "0",
                "periodicBy": null,
                "timezone": null,
                "isDirectNumeration": false
            }
        }
    },
    "time": {
        "start": 1773743992,
        "finish": 1773743992.664487,
        "duration": 0.6644868850708008,
        "processing": 0,
        "date_start": "2026-03-17T13:39:52+03:00",
        "date_finish": "2026-03-17T13:39:52+03:00",
        "operating_reset_at": 1773744592,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит данные нумератора напрямую в формате [`result`](#result), без дополнительной обёртки `numerator` — в отличие от методов [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md) и [crm.documentgenerator.numerator.get](./crm-document-generator-numerator-get.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

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
[`object`](../../data-types.md) | Сохраненные настройки последовательной нумерации типа [`settings`](#settings) ||
|#

#### Тип settings {#settings}

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
[`string`](../../data-types.md) | Символ добивки слева ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика: `null`, `day`, `month` или `year` ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса. Может быть `null` ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not construct parameter {numerator}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Could not find value for parameter {fields}` | Не передан обязательный параметр `fields` ||
|| `100` | `Bitrix\Main\Numerator\Numerator constructor must be is public` | Внутренняя ошибка при создании объекта нумератора ||
|| `100` | Invalid value {...} to match with parameter {fields}. Should be value of type array. | Параметр `fields` передан не как массив/объект ||
|| `100` | `Could not construct parameter {numerator}` | Нумератор с указанным `id` не найден ||
|| `DOCGEN_ACCESS_ERROR` | `Access denied` | Нет доступа к нумератору. Метод обновляет только нумераторы, созданные через REST ||
|| `Пустое значение` | `You do not have permissions to modify templates` | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | `Module documentgenerator is not installed` | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-numerator-add.md)
- [{#T}](./crm-document-generator-numerator-get.md)
- [{#T}](./crm-document-generator-numerator-list.md)
- [{#T}](./crm-document-generator-numerator-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

