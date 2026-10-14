# Импортировать группу записей crm.item.batchImport

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на импорт элементов CRM

Метод `crm.item.batchImport` импортирует до 20 элементов одного типа CRM.

Поля каждого элемента передавайте по тем же правилам, что и в методе [crm.item.import](crm-item-import.md). Особенности импорта описаны в [обзоре методов](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип`          | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [системного](../../data-types.md#object_type) или [пользовательского типа CRM](../user-defined-object-types/index.md), в который нужно импортировать элементы.

Числовые значения системных типов, например лид — `1`, сделка — `2`, контакт — `3`, компания — `4`, счет — `31`, приведены в [справочнике типов объектов CRM](../../data-types.md#object_type). Идентификатор смарт-процесса можно получить методом [crm.type.list](../user-defined-object-types/crm-type-list.md) ||
|| **data***
[`array`](../../../data-types.md) | Массив объектов с полями импортируемых элементов [(подробное описание)](#data) ||
|| **useOriginalUfNames**
[`boolean`](../../../data-types.md) | Параметр для управления форматом имен пользовательских полей в запросе.
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

### Параметр data {#data}

Каждый элемент массива `data` — объект с полями одного элемента CRM:

```js
[
    {
        field_1: value_1,
        field_2: value_2
    },
    {
        field_1: value_1,
        field_2: value_2
    }
]
```

Названия, типы и форматы полей описаны в параметре [`fields`](crm-item-import.md#fields) метода `crm.item.import`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Как импортировать сделки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"data":[{"title":"Первая импортируемая сделка","isRecurring":"N","opportunity":999.99,"currencyId":"RUB"},{"title":"Вторая импортируемая сделка","isRecurring":"N","opportunity":1499.99,"currencyId":"RUB"}]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.batchImport
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"data":[{"title":"Первая импортируемая сделка","isRecurring":"N","opportunity":999.99,"currencyId":"RUB"},{"title":"Вторая импортируемая сделка","isRecurring":"N","opportunity":1499.99,"currencyId":"RUB"}],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.item.batchImport
        ```

    - JS (TS)

        ```ts
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'
        declare const $b24: B24Frame

        const response = await $b24.actions.v2.call.make({
          method: 'crm.item.batchImport',
          params: {
            entityTypeId: 2,
            data: [
              { title: 'Первая импортируемая сделка', isRecurring: 'N', opportunity: 999.99, currencyId: 'RUB' },
              { title: 'Вторая импортируемая сделка', isRecurring: 'N', opportunity: 1499.99, currencyId: 'RUB' },
            ],
          },
          requestId: Text.getUuidRfc4122()
        })
        console.info(response.getData()?.result)
        ```

    - JS (UMD)

        ```html
        <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
        <script>
          async function batchImportDeals() {
            const $b24 = await B24Js.initializeB24Frame()
            const response = await $b24.actions.v2.call.make({
              method: 'crm.item.batchImport',
              params: {
                entityTypeId: 2,
                data: [
                  { title: 'Первая импортируемая сделка', isRecurring: 'N', opportunity: 999.99, currencyId: 'RUB' },
                  { title: 'Вторая импортируемая сделка', isRecurring: 'N', opportunity: 1499.99, currencyId: 'RUB' },
                ],
              },
              requestId: B24Js.Text.getUuidRfc4122()
            })
            console.info(response.getData()?.result)
          }
          document.addEventListener('DOMContentLoaded', batchImportDeals)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.item.batch_import(
                entity_type_id=2,
                data=[
                    {
                        "title": "Первая импортируемая сделка",
                        "isRecurring": "N",
                        "opportunity": 999.99,
                        "currencyId": "RUB",
                    },
                    {
                        "title": "Вторая импортируемая сделка",
                        "isRecurring": "N",
                        "opportunity": 1499.99,
                        "currencyId": "RUB",
                    },
                ],
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
                'crm.item.batchImport',
                [
                    'entityTypeId' => 2,
                    'data' => [
                        ['title' => 'Первая импортируемая сделка', 'isRecurring' => 'N', 'opportunity' => 999.99, 'currencyId' => 'RUB'],
                        ['title' => 'Вторая импортируемая сделка', 'isRecurring' => 'N', 'opportunity' => 1499.99, 'currencyId' => 'RUB'],
                    ],
                ]
            );
            echo 'Success: ' . print_r($response->getResponseData()->getResult()->data(), true);
        } catch (Throwable $e) {
            echo 'Error: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'crm.item.batchImport',
            {
                entityTypeId: 2,
                data: [
                    {
                        title: 'Первая импортируемая сделка',
                        isRecurring: 'N',
                        opportunity: 999.99,
                        currencyId: 'RUB',
                    },
                    {
                        title: 'Вторая импортируемая сделка',
                        isRecurring: 'N',
                        opportunity: 1499.99,
                        currencyId: 'RUB',
                    },
                ],
            },
            result => result.error() ? console.error(result.error()) : console.info(result.data())
        );
        ```
    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.item.batchImport',
            [
                'entityTypeId' => 2,
                'data' => [
                    [
                        'title' => 'Первая импортируемая сделка',
                        'isRecurring' => 'N',
                        'opportunity' => 999.99,
                        'currencyId' => 'RUB',
                    ],
                    [
                        'title' => 'Вторая импортируемая сделка',
                        'isRecurring' => 'N',
                        'opportunity' => 1499.99,
                        'currencyId' => 'RUB',
                    ],
                ],
            ]
        );

        print_r($result);
        ```
    - Go

        ```go
        res, err := client.Core().Call(ctx, "crm.item.batchImport", b24.Params{
            "entityTypeId": 2,
            "data": []b24.Params{
                {
                    "title":       "Первая импортируемая сделка",
                    "isRecurring": "N",
                    "opportunity": 999.99,
                    "currencyId":  "RUB",
                },
                {
                    "title":       "Вторая импортируемая сделка",
                    "isRecurring": "N",
                    "opportunity": 1499.99,
                    "currencyId":  "RUB",
                },
            },
        })
        if err != nil {
            return fmt.Errorf("crm.item.batchImport: %w", err)
        }

        fmt.Printf("%v\n", res.Result)
        ```

    {% endlist %}


2. Как создать элемент смарт-процесса с набором пользовательских полей

    {% cut "Пользовательские поля, участвующие в примере" %}

    {% include [Набор пользовательских полей](../../_include/user-fields-for-examples-cut.md) %}

    {% endcut %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
            "entityTypeId": 1302,
            "data": [{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 81,
                "ufCrm44_1721812853419": "2024-08-21",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "300|RUB",
                "ufCrm44_1721812935209": "Y",
                "ufCrm44_1721812948498": 9999.9
            },{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 45,
                "ufCrm44_1721812853419": "2024-08-21",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel2.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "600|RUB",
                "ufCrm44_1721812935209": "N",
                "ufCrm44_1721812948498": 9999.9
            }]
        }' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.batchImport
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
            "entityTypeId": 1302,
            "data": [{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 81,
                "ufCrm44_1721812853419": "2024-08-21",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "300|RUB",
                "ufCrm44_1721812935209": "Y",
                "ufCrm44_1721812948498": 9999.9
            },{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 45,
                "ufCrm44_1721812853419": "2024-08-21",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel2.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "600|RUB",
                "ufCrm44_1721812935209": "N",
                "ufCrm44_1721812948498": 9999.9
            }],
            "auth": "**put_access_token_here**"
        }' \
        https://**put_your_bitrix24_address**/rest/crm.item.batchImport
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type BatchImportResult = {
          items: Array<
            | { item: { id: number } }
            | { error: string; error_description: string }
          >
        }

        const greenPixelInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="

        try {
          const response = await $b24.actions.v2.call.make<BatchImportResult>({
            method: 'crm.item.batchImport',
            params: {
              entityTypeId: 1302,
              data: [
                {
                  ufCrm44_1721812760630: "Строка для пользовательского поля типа Строка",
                  ufCrm44_1721812814433: 81,
                  ufCrm44_1721812853419: "2024-08-21",
                  ufCrm44_1721812885588: [
                    "example.com",
                    "second-example.com",
                  ],
                  ufCrm44_1721812898903: [
                    "green_pixel.png",
                    greenPixelInBase64,
                  ],
                  ufCrm44_1721812915476: "300|RUB",
                  ufCrm44_1721812935209: "Y",
                  ufCrm44_1721812948498: 9999.9,
                },
                {
                  ufCrm44_1721812760630: "Строка для пользовательского поля типа Строка",
                  ufCrm44_1721812814433: 45,
                  ufCrm44_1721812853419: "2024-08-21",
                  ufCrm44_1721812885588: [
                    "example.com",
                    "second-example.com",
                  ],
                  ufCrm44_1721812898903: [
                    "green_pixel2.png",
                    greenPixelInBase64,
                  ],
                  ufCrm44_1721812915476: "600|RUB",
                  ufCrm44_1721812935209: "N",
                  ufCrm44_1721812948498: 9999.9,
                },
              ],
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('Imported items:', result.items)
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
          async function batchImportItems() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const greenPixelInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="

              const response = await $b24.actions.v2.call.make({
                method: 'crm.item.batchImport',
                params: {
                  entityTypeId: 1302,
                  data: [
                    {
                      ufCrm44_1721812760630: "Строка для пользовательского поля типа Строка",
                      ufCrm44_1721812814433: 81,
                      ufCrm44_1721812853419: "2024-08-21",
                      ufCrm44_1721812885588: [
                        "example.com",
                        "second-example.com",
                      ],
                      ufCrm44_1721812898903: [
                        "green_pixel.png",
                        greenPixelInBase64,
                      ],
                      ufCrm44_1721812915476: "300|RUB",
                      ufCrm44_1721812935209: "Y",
                      ufCrm44_1721812948498: 9999.9,
                    },
                    {
                      ufCrm44_1721812760630: "Строка для пользовательского поля типа Строка",
                      ufCrm44_1721812814433: 45,
                      ufCrm44_1721812853419: "2024-08-21",
                      ufCrm44_1721812885588: [
                        "example.com",
                        "second-example.com",
                      ],
                      ufCrm44_1721812898903: [
                        "green_pixel2.png",
                        greenPixelInBase64,
                      ],
                      ufCrm44_1721812915476: "600|RUB",
                      ufCrm44_1721812935209: "N",
                      ufCrm44_1721812948498: 9999.9,
                    },
                  ],
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info('Imported items:', result.items)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', batchImportItems)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.item.batch_import(
                entity_type_id=1302,
                data=[
                    {
                    "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                    "ufCrm44_1721812814433": 81,
                    "ufCrm44_1721812853419": "2024-08-21",
                    "ufCrm44_1721812885588": [
                        "example.com",
                        "second-example.com",
                    ],
                    "ufCrm44_1721812898903": [
                        "green_pixel.png",
                        "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==",
                    ],
                    "ufCrm44_1721812915476": "300|RUB",
                    "ufCrm44_1721812935209": "Y",
                    "ufCrm44_1721812948498": 9999.9,
                },
                    {
                    "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                    "ufCrm44_1721812814433": 45,
                    "ufCrm44_1721812853419": "2024-08-21",
                    "ufCrm44_1721812885588": [
                        "example.com",
                        "second-example.com",
                    ],
                    "ufCrm44_1721812898903": [
                        "green_pixel2.png",
                        "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==",
                    ],
                    "ufCrm44_1721812915476": "600|RUB",
                    "ufCrm44_1721812935209": "N",
                    "ufCrm44_1721812948498": 9999.9,
                },
                ],
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
        require_once('crest.php');

        $result = CRest::call(
            'crm.item.batchImport',
            [
                'entityTypeId' => 1302,
                'data' => [
                    [
                        'ufCrm44_1721812760630' => "Строка для пользовательского поля типа Строка",
                        'ufCrm44_1721812814433' => 81,
                        'ufCrm44_1721812853419' => '2024-08-21',
                        'ufCrm44_1721812885588' => [
                            "example.com",
                            "second-example.com",
                        ],
                        'ufCrm44_1721812898903' => [
                            "green_pixel.png",
                            "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==",
                        ],
                        'ufCrm44_1721812915476' => "300|RUB",
                        'ufCrm44_1721812935209' => "Y",
                        'ufCrm44_1721812948498' => 9999.9,
                    ],
                    [
                        'ufCrm44_1721812760630' => "Строка для пользовательского поля типа Строка",
                        'ufCrm44_1721812814433' => 45,
                        'ufCrm44_1721812853419' => '2024-08-21',
                        'ufCrm44_1721812885588' => [
                            "example.com",
                            "second-example.com",
                        ],
                        'ufCrm44_1721812898903' => [
                            "green_pixel2.png",
                            "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==",
                        ],
                        'ufCrm44_1721812915476' => "600|RUB",
                        'ufCrm44_1721812935209' => "N",
                        'ufCrm44_1721812948498' => 9999.9,
                    ],
                ],
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'crm.item.batchImport',
            {
                entityTypeId: 1302,
                data: [
                    {
                        ufCrm44_1721812760630: 'Строка для пользовательского поля типа Строка',
                        ufCrm44_1721812814433: 81,
                        ufCrm44_1721812853419: '2024-08-21',
                        ufCrm44_1721812885588: ['example.com', 'second-example.com'],
                        ufCrm44_1721812898903: ['green_pixel.png', 'iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=='],
                        ufCrm44_1721812915476: '300|RUB',
                        ufCrm44_1721812935209: 'Y',
                        ufCrm44_1721812948498: 9999.9,
                    },
                    {
                        ufCrm44_1721812760630: 'Строка для пользовательского поля типа Строка',
                        ufCrm44_1721812814433: 45,
                        ufCrm44_1721812853419: '2024-08-21',
                        ufCrm44_1721812885588: ['example.com', 'second-example.com'],
                        ufCrm44_1721812898903: ['green_pixel2.png', 'iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=='],
                        ufCrm44_1721812915476: '600|RUB',
                        ufCrm44_1721812935209: 'N',
                        ufCrm44_1721812948498: 9999.9,
                    },
                ],
            },
            result => result.error() ? console.error(result.error()) : console.info(result.data())
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.item.batchImport',
            [
                'entityTypeId' => 1302,
                'data' => [
                    [
                        'ufCrm44_1721812760630' => 'Строка для пользовательского поля типа Строка',
                        'ufCrm44_1721812814433' => 81,
                        'ufCrm44_1721812853419' => '2024-08-21',
                        'ufCrm44_1721812885588' => ['example.com', 'second-example.com'],
                        'ufCrm44_1721812898903' => ['green_pixel.png', 'iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=='],
                        'ufCrm44_1721812915476' => '300|RUB',
                        'ufCrm44_1721812935209' => 'Y',
                        'ufCrm44_1721812948498' => 9999.9,
                    ],
                    [
                        'ufCrm44_1721812760630' => 'Строка для пользовательского поля типа Строка',
                        'ufCrm44_1721812814433' => 45,
                        'ufCrm44_1721812853419' => '2024-08-21',
                        'ufCrm44_1721812885588' => ['example.com', 'second-example.com'],
                        'ufCrm44_1721812898903' => ['green_pixel2.png', 'iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=='],
                        'ufCrm44_1721812915476' => '600|RUB',
                        'ufCrm44_1721812935209' => 'N',
                        'ufCrm44_1721812948498' => 9999.9,
                    ],
                ],
            ]
        );
        print_r($result);
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "crm.item.batchImport", b24.Params{
            "entityTypeId": 1302,
            "data": []b24.Params{
                {
                    "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                    "ufCrm44_1721812814433": 81,
                    "ufCrm44_1721812853419": "2024-08-21",
                    "ufCrm44_1721812885588": []string{"example.com", "second-example.com"},
                    "ufCrm44_1721812898903": []string{"green_pixel.png", "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="},
                    "ufCrm44_1721812915476": "300|RUB",
                    "ufCrm44_1721812935209": "Y",
                    "ufCrm44_1721812948498": 9999.9,
                },
                {
                    "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                    "ufCrm44_1721812814433": 45,
                    "ufCrm44_1721812853419": "2024-08-21",
                    "ufCrm44_1721812885588": []string{"example.com", "second-example.com"},
                    "ufCrm44_1721812898903": []string{"green_pixel2.png", "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="},
                    "ufCrm44_1721812915476": "600|RUB",
                    "ufCrm44_1721812935209": "N",
                    "ufCrm44_1721812948498": 9999.9,
                },
            },
        })
        if err != nil {
            return fmt.Errorf("crm.item.batchImport: %w", err)
        }

        // Метод заворачивает ответ в объект с ключом "items".
        raw, ok := b24.Unwrap(res.Result, "items")
        if !ok {
            return fmt.Errorf("в ответе нет ключа items")
        }

        fmt.Printf("%s\n", raw)
        ```

    {% endlist %}

## Обработка ответа

Метод возвращает массив `items`. Каждый элемент массива содержит объект `item` с идентификатором созданного элемента или поля `error` и `error_description` с данными об ошибке импорта.

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "item": {
                    "id": 15
                }
            },
            {
                "error": "CRM_FIELD_ERROR_REQUIRED",
                "error_description": "Поле \"Название\" обязательно для заполнения"
            }
        ]
    },
    "time": {
        "start": 1723414961.913589,
        "finish": 1723414964.652124,
        "duration": 2.738534927368164,
        "processing": 2.376383066177368,
        "date_start": "2024-08-11T22:22:41+00:00",
        "date_finish": "2024-08-11T22:22:44+00:00",
        "operating": 2.3762991428375244
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит результаты импорта [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **items**
[`array`](../../../data-types.md) | Результаты импорта элементов [(подробное описание)](#items) ||
|#

#### Элемент массива items {#items}

Каждый элемент массива содержит либо объект `item` при успешном импорте, либо пару полей `error` и `error_description`, если импорт завершился ошибкой.

#|
|| **Название**
`тип` | **Описание** ||
|| **item**
[`object`](../../../data-types.md) | Результат успешного импорта [(подробное описание)](#item) ||
|| **error**
[`string`](../../../data-types.md) | Код ошибки импорта элемента ||
|| **error_description**
[`string`](../../../data-types.md) | Описание ошибки импорта элемента ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор созданного элемента ||
|#

## Обработка ошибок

HTTP-статус: **400**, **401**, **403**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `NOT_FOUND` | Смарт-процесс не найден | Передан неизвестный `entityTypeId` ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет права на импорт элементов типа `entityTypeId` ||
|| `400` | `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля `field` | Передано недопустимое значение поля `field`.

Для системных полей, например `createdTime`, ошибка также возникает, если запрос выполняет не администратор ||
|| `400` | `100` | Expected iterable value for multiple field, but got `type` instead | В одно из множественных полей передано значение типа `type`, хотя ожидалось перебираемое значение. Ошибка также может возникнуть из-за некорректного JSON или заголовков запроса ||
|| `400` | `CREATE_DYNAMIC_ITEM_RESTRICTED` | Вы не можете создать новый элемент из-за ограничений вашего тарифа | Ограничения тарифа не позволяют создавать элементы смарт-процессов ||
|| `400` | `MAX_IMPORT_BATCH_SIZE_EXCEEDED` | Вы не можете импортировать больше 20 элементов | В массиве `data` передано более 20 элементов ||
|| `401` | `INVALID_CREDENTIALS` | Неверные данные авторизации для запроса | Неверный идентификатор пользователя или код вебхука в URL запроса ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Пользователь не является интранет-пользователем ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-import.md)
