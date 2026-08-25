# Создать трейс сквозной аналитики crm.tracking.trace.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь может создать трейс
> - пользователь с правом на изменение объекта может привязать трейс

Метод `crm.tracking.trace.add` создает трейс сквозной аналитики и возвращает его идентификатор.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TRACE**^*^
[`string`](../../data-types.md) | JSON-строка с данными трейса.

Готовое значение можно получить на сайте через `b24Tracker.guest.getTrace()`. Практический сценарий описан в [туториале](../../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md).

Если формируете `TRACE` вручную, передайте UTM-метки в объекте `tags.list`:

```json
{"tags":{"list":{"utm_source":"yandex-maps"}}}
```

В этом примере в трейс передается только одна UTM-метка: `utm_source` со значением `yandex-maps`. Чтобы передать другие UTM-метки, добавьте их в `tags.list`, например `utm_medium`, `utm_campaign`, `utm_content` или `utm_term` ||
|| **ENTITIES**
[`object[]`](../../data-types.md) | Массив объектов, которые нужно связать с трейсом [(подробное описание)](#entities)

Если не передать `ENTITIES`, метод создаст трейс без привязки к объектам CRM ||
|#

### Параметр ENTITIES {#entities}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**^*^
[`string`](../../data-types.md) | Тип объекта CRM.

Возможные значения:

- `COMPANY` — компания, `entityTypeId = 4`
- `CONTACT` — контакт, `entityTypeId = 3`
- `DEAL` — сделка, `entityTypeId = 2`
- `LEAD` — лид, `entityTypeId = 1`
- `QUOTE` — коммерческое предложение, `entityTypeId = 7`
||
|| **ID**^*^
[`integer`](../../data-types.md) | Идентификатор элемента CRM.

Идентификатор можно получить методом [crm.item.list](../universal/crm-item-list.md) с `entityTypeId` нужного типа объекта.

Для указанного объекта у пользователя должны быть права на изменение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример создания трейса сквозной аналитики, где:
- `TRACE` — JSON-строка с UTM-меткой `utm_source` и значением `yandex-maps`
- `ENTITIES` — контакт и лид, которые связываются с трейсом

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "TRACE": "{\"tags\":{\"list\":{\"utm_source\":\"yandex-maps\"}}}",
        "ENTITIES": [
          {
            "TYPE": "CONTACT",
            "ID": 17
          },
          {
            "TYPE": "LEAD",
            "ID": 1000739
          }
        ]
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/crm.tracking.trace.add.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "TRACE": "{\"tags\":{\"list\":{\"utm_source\":\"yandex-maps\"}}}",
        "ENTITIES": [
          {
            "TYPE": "CONTACT",
            "ID": 17
          },
          {
            "TYPE": "LEAD",
            "ID": 1000739
          }
        ],
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/crm.tracking.trace.add.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.tracking.trace.add',
        params: {
          TRACE: '{"tags":{"list":{"utm_source":"yandex-maps"}}}',
          ENTITIES: [
            {
              TYPE: 'CONTACT',
              ID: 17,
            },
            {
              TYPE: 'LEAD',
              ID: 1000739,
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
        console.info('Created trace ID:', result)
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
      async function addTrackingTrace() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.tracking.trace.add',
            params: {
              TRACE: '{"tags":{"list":{"utm_source":"yandex-maps"}}}',
              ENTITIES: [
                {
                  TYPE: 'CONTACT',
                  ID: 17,
                },
                {
                  TYPE: 'LEAD',
                  ID: 1000739,
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
          console.info('Created trace ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTrackingTrace)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.tracking.trace.add(
            trace='{"SOURCE_ID":"6","SOURCE_DESC":"Direct sale","PAGES":[{"URL":"https://example.com/","DATE":"2024-04-03T10:26:32+03:00"}]}',
            entities=[
                {
                    "TYPE": "CONTACT",
                    "ID": 3215,
                },
                {
                    "TYPE": "LEAD",
                    "ID": 1,
                },
            trace="{\"tags\":{\"list\":{\"utm_source\":\"yandex-maps\"}}}",
            entities=[
                {
                    "TYPE": "CONTACT",
                    "ID": 17
                },
                {
                    "TYPE": "LEAD",
                    "ID": 1000739
                }
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
        $response = $b24Service
            ->core
            ->call(
                'crm.tracking.trace.add',
                [
                    'TRACE' => '{"tags":{"list":{"utm_source":"yandex-maps"}}}',
                    'ENTITIES' => [
                        [
                            'TYPE' => 'CONTACT',
                            'ID' => 17,
                        ],
                        [
                            'TYPE' => 'LEAD',
                            'ID' => 1000739,
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
        echo 'Error adding trace: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.tracking.trace.add',
        {
            TRACE: '{"tags":{"list":{"utm_source":"yandex-maps"}}}',
            ENTITIES: [
                {
                    TYPE: 'CONTACT',
                    ID: 17
                },
                {
                    TYPE: 'LEAD',
                    ID: 1000739
                }
            ]
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'crm.tracking.trace.add',
        [
            'TRACE' => '{"tags":{"list":{"utm_source":"yandex-maps"}}}',
            'ENTITIES' => [
                [
                    'TYPE' => 'CONTACT',
                    'ID' => 17,
                ],
                [
                    'TYPE' => 'LEAD',
                    'ID' => 1000739,
                ],
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.tracking.trace.add", b24.Params{
        "TRACE": "{\"tags\":{\"list\":{\"utm_source\":\"yandex-maps\"}}}",
    	"ENTITIES": []b24.Params{
    		{
    			"TYPE": "CONTACT",
                "ID":   17,
    		},
    		{
    			"TYPE": "LEAD",
                "ID":   1000739,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.tracking.trace.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1581,
    "time": {
        "start": 1786711683,
        "finish": 1786711683.296598,
        "duration": 0.296597957611084,
        "processing": 0,
        "date_start": "2026-08-14T15:48:03+03:00",
        "date_finish": "2026-08-14T15:48:03+03:00",
        "operating_reset_at": 1786712283,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного трейса ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Parameter `TRACE` required."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Parameter `TRACE` required. | Не передан параметр `TRACE` ||
|| `400` | `ERROR_CORE` | Can not parse JSON in parameter `TRACE`. | Значение `TRACE` не является корректной JSON-строкой ||
|| `400` | `ERROR_CORE` | Wrong TYPE in parameter `ENTITIES`. Allowed types: COMPANY,CONTACT,DEAL,LEAD,QUOTE | Передан недопустимый `TYPE` в `ENTITIES` ||
|| `400` | `ERROR_CORE` | Wrong ID in parameter `ENTITIES`. | Передан некорректный `ID` в `ENTITIES` ||
|| `400` | `ERROR_CORE` | You have no access to entity `<TYPE>` with ID `<ID>`. | Нет прав на изменение объекта, указанного в `ENTITIES` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-lead.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-contact.md)




