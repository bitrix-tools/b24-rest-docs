# Установить локализации для валюты crm.currency.localizations.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод обновляет локализации для валюты или добавляет, если локализация для указанного языка не существует.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
||  **Название** /
`тип`| **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](../crm-currency-list.md)
 ||
|| **localizations***
[`object`](../../../data-types.md) | Параметры локализации валюты.
Объект в формате `{"lang_1": "value_1", ... "lang_N": "value_N"}`, где `lang_N` — идентификатор языка, для которого надо добавить/изменить локализацию, а `value` — объект типа [crm_currency_localization](../../data-types.md#crm_currency_localization).

Существующие локализации, которые не переданы в метод, не будут изменены.
  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"CLF","localizations":{"en":{"FULL_NAME":"Unidad de Fomento","FORMAT_STRING":"CLF#VALUE#","DEC_POINT":".","THOUSANDS_VARIANT":"C","DECIMALS":4},"ru":{"FULL_NAME":"Единица развития","FORMAT_STRING":"#VALUE# CLF","DEC_POINT":".","THOUSANDS_VARIANT":"B","DECIMALS":4}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.localizations.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"CLF","localizations":{"en":{"FULL_NAME":"Unidad de Fomento","FORMAT_STRING":"CLF#VALUE#","DEC_POINT":".","THOUSANDS_VARIANT":"C","DECIMALS":4},"ru":{"FULL_NAME":"Единица развития","FORMAT_STRING":"#VALUE# CLF","DEC_POINT":".","THOUSANDS_VARIANT":"B","DECIMALS":4}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.localizations.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.currency.localizations.set',
        params: {
          id: 'CLF',
          localizations: {
            en: {
              FULL_NAME: 'Unidad de Fomento',
              FORMAT_STRING: 'CLF#VALUE#',
              DEC_POINT: '.',
              THOUSANDS_VARIANT: 'C',
              DECIMALS: 4,
            },
            ru: {
              FULL_NAME: 'Unit of Account',
              FORMAT_STRING: '#VALUE# CLF',
              DEC_POINT: '.',
              THOUSANDS_VARIANT: 'B',
              DECIMALS: 4,
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
        console.info('Localizations set:', result)
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
      async function setCurrencyLocalizations() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.currency.localizations.set',
            params: {
              id: 'CLF',
              localizations: {
                en: {
                  FULL_NAME: 'Unidad de Fomento',
                  FORMAT_STRING: 'CLF#VALUE#',
                  DEC_POINT: '.',
                  THOUSANDS_VARIANT: 'C',
                  DECIMALS: 4,
                },
                ru: {
                  FULL_NAME: 'Unit of Account',
                  FORMAT_STRING: '#VALUE# CLF',
                  DEC_POINT: '.',
                  THOUSANDS_VARIANT: 'B',
                  DECIMALS: 4,
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
          console.info('Localizations set:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setCurrencyLocalizations)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.currency.localizations.set',
                [
                    'id' => 'CLF',
                    'localizations' => [
                        'en' => [
                            'FULL_NAME'        => 'Unidad de Fomento',
                            'FORMAT_STRING'    => 'CLF#VALUE#',
                            'DEC_POINT'        => '.',
                            'THOUSANDS_VARIANT' => 'C',
                            'DECIMALS'         => 4,
                        ],
                        'ru' => [
                            'FULL_NAME'        => 'Единица развития',
                            'FORMAT_STRING'    => '#VALUE# CLF',
                            'DEC_POINT'        => '.',
                            'THOUSANDS_VARIANT' => 'B',
                            'DECIMALS'         => 4,
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting currency localizations: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.localizations.set",
        {
            id: 'CLF',
            localizations: {
                en: {
                    FULL_NAME: 'Unidad de Fomento',
                    FORMAT_STRING: 'CLF#VALUE#',
                    DEC_POINT: '.',
                    THOUSANDS_VARIANT: 'C',
                    DECIMALS: 4,
                },
                ru: {
                    FULL_NAME: 'Единица развития',
                    FORMAT_STRING: '#VALUE# CLF',
                    DEC_POINT: '.',
                    THOUSANDS_VARIANT: 'B',
                    DECIMALS: 4,
                }
            }
        },
    )
    .then(
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result);
            }
        },
        function(error)
        {
            console.info(error);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.localizations.set',
        [
            'id' => 'CLF',
            'localizations' => [
                'en' => [
                    'FULL_NAME' => 'Unidad de Fomento',
                    'FORMAT_STRING' => 'CLF#VALUE#',
                    'DEC_POINT' => '.',
                    'THOUSANDS_VARIANT' => 'C',
                    'DECIMALS' => 4,
                ],
                'ru' => [
                    'FULL_NAME' => 'Единица развития',
                    'FORMAT_STRING' => '#VALUE# CLF',
                    'DEC_POINT' => '.',
                    'THOUSANDS_VARIANT' => 'B',
                    'DECIMALS' => 4,
                ]
            ]
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
    "result": true,
    "time": {
        "start": 1718122481.837301,
        "finish": 1718122483.141736,
        "duration": 1.3044350147247314,
        "processing": 0.08866286277770996,
        "date_start": "2024-06-11T18:14:41+02:00",
        "date_finish": "2024-06-11T18:14:43+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает:
- `true` — в случае успеха
- `false` – в случае, когда операцию выполнить не удалось, но ошибки нет, либо ситуация не считается ошибочной. Возможные варианты:
  - отсутствует модуль валют
  - передан пустой объект с локализациями
  - не была добавлена/изменена ни одна локализация
 ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter id is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | The parameter id is invalid or not defined. | Пустой идентификатор валюты ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-localizations-get.md)
- [{#T}](./crm-currency-localizations-delete.md)
- [{#T}](./crm-currency-localizations-fields.md)