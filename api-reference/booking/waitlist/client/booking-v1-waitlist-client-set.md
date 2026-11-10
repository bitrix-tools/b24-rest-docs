# Установить клиентов записи в листе ожидания booking.v1.waitlist.client.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.waitlist.client.set` устанавливает список клиентов для указанной записи в листе ожидания. Клиентами могут быть контакты и компании CRM.

{% note warning "" %}

Метод заменяет весь список клиентов записи. Чтобы сохранить текущих клиентов, получите их методом [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md) и передайте в `clients` вместе с новыми.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **waitListId***
[`integer`](../../../data-types.md) | Идентификатор записи в листе ожидания.
Можно получить методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md) и [booking.v1.waitlist.list](../booking-v1-waitlist-list.md) ||
|| **clients***
[`array`](../../../data-types.md) | Полный список клиентов записи. Каждый элемент — объект с полями `id` и `type`. [Структура элемента](#clients), [поведение пустого массива](#empty-clients) ||
|#

### Параметр clients {#clients}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор контакта или компании CRM. Получить можно методом [crm.item.list](../../../crm/universal/crm-item-list.md): `entityTypeId: 3` для контактов, `entityTypeId: 4` для компаний ||
|| **type***
[`object`](../../../data-types.md) | Тип клиента. Например, `{"module": "crm", "code": "CONTACT"}`. [Структура объекта](#client-type) ||
|#

### Объект type {#client-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **module***
[`string`](../../../data-types.md) | Модуль клиента. Для контактов и компаний — `crm` ||
|| **code***
[`string`](../../../data-types.md) | Код типа клиента:
- `CONTACT` — [контакт CRM](../../../crm/contacts/index.md)
- `COMPANY` — [компания CRM](../../../crm/companies/index.md)

Доступные типы клиентов возвращает метод [booking.v1.clienttype.list](../../booking-v1-clienttype-list.md) ||
|#

### Пустой массив clients {#empty-clients}

Чтобы удалить текущие связи с клиентами, передайте `clients: []`.

{% note warning "Связанная сделка" %}

Если у записи уже нет клиентов, но к ней привязана сделка методом [booking.v1.waitlist.externalData.set](../external-data/booking-v1-waitlist-externaldata-set.md), вызов с `clients: []` привяжет к записи контакты и компанию этой сделки. Поэтому повторный вызов может заполнить список заново. Проверьте результат методом [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md).

{% endnote %}

## Примеры кода

Примеры связывают запись `13` с контактом `2795` и компанией `3063`. Замените идентификаторы значениями своего Битрикс24.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":13,"clients":[{"id":2795,"type":{"module":"crm","code":"CONTACT"}},{"id":3063,"type":{"module":"crm","code":"COMPANY"}}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.waitlist.client.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":13,"clients":[{"id":2795,"type":{"module":"crm","code":"CONTACT"}},{"id":3063,"type":{"module":"crm","code":"COMPANY"}}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.waitlist.client.set
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
        method: 'booking.v1.waitlist.client.set',
        params: {
          waitListId: 13,
          clients: [
            {
              id: 2795,
              type: {
                module: 'crm',
                code: 'CONTACT',
              },
            },
            {
              id: 3063,
              type: {
                module: 'crm',
                code: 'COMPANY',
              },
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
        console.info('Clients set successfully:', result)
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
      async function setWaitlistClients() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.waitlist.client.set',
            params: {
              waitListId: 13,
              clients: [
                {
                  id: 2795,
                  type: {
                    module: 'crm',
                    code: 'CONTACT',
                  },
                },
                {
                  id: 3063,
                  type: {
                    module: 'crm',
                    code: 'COMPANY',
                  },
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
          console.info('Clients set successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setWaitlistClients)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.waitlist.client.set(
            wait_list_id=13,
            clients=[
                {
                    "id": 2795,
                    "type": {
                        "module": "crm",
                        "code": "CONTACT",
                    },
                },
                {
                    "id": 3063,
                    "type": {
                        "module": "crm",
                        "code": "COMPANY",
                    },
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
        $response = $b24Service
            ->core
            ->call(
                'booking.v1.waitlist.client.set',
                [
                    'waitListId' => 13,
                    'clients'    => [
                        [
                            'id'   => 2795,
                            'type' => [
                                'module' => 'crm',
                                'code'   => 'CONTACT',
                            ],
                        ],
                        [
                            'id'   => 3063,
                            'type' => [
                                'module' => 'crm',
                                'code'   => 'COMPANY',
                            ],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result[0] === true) {
            echo 'Success';
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting waitlist clients: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.waitlist.client.set",
        {
            waitListId: 13,
            clients: [
                {
                    id: 2795,
                    type: {
                        module: "crm",
                        code: "CONTACT"
                    }
                },
                {
                    id: 3063,
                    type: {
                        module: "crm",
                        code: "COMPANY"
                    }
                }
            ]
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.waitlist.client.set',
        [
            'waitListId' => 13,
            'clients' => [
                [
                    'id' => 2795,
                    'type' => [
                        'module' => 'crm',
                        'code' => 'CONTACT'
                    ]
                ],
                [
                    'id' => 3063,
                    'type' => [
                        'module' => 'crm',
                        'code' => 'COMPANY'
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.waitlist.client.set", b24.Params{
    	"waitListId": 13,
    	"clients": []b24.Params{
    		{
    			"id": 2795,
    			"type": b24.Params{
    				"module": "crm",
    				"code":   "CONTACT",
    			},
    		},
    		{
    			"id": 3063,
    			"type": b24.Params{
    				"module": "crm",
    				"code":   "COMPANY",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("booking.v1.waitlist.client.set: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1790294535,
        "finish": 1790294535.315704,
        "duration": 0.3157041072845459,
        "processing": 0,
        "date_start": "2026-09-25T03:02:15+03:00",
        "date_finish": "2026-09-25T03:02:15+03:00",
        "operating_reset_at": 1790295135,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "1040",
    "error_description": "Wait list not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields: id` | В элементе `clients` не передан `id`. Укажите идентификатор контакта или компании ||
|| `0` | `Required fields: type` | В элементе `clients` не передан объект `type` ||
|| `0` | `Required fields: module` | В объекте `type` не передан `module`. Для CRM укажите `crm` ||
|| `0` | `Required fields: code` | В объекте `type` не передан `code`. Укажите `CONTACT` или `COMPANY` ||
|| `100` | `Could not find value for parameter {waitListId}` | Не передан `waitListId`. Укажите идентификатор записи в листе ожидания ||
|| `100` | `Could not find value for parameter {clients}` | Не передан массив `clients` ||
|| `1025` | `Client type not found` | Передан неизвестный тип клиента. Проверьте сочетание `module` и `code` по методу [booking.v1.clienttype.list](../../booking-v1-clienttype-list.md) ||
|| `1040` | `Wait list not found` | Запись с указанным `waitListId` не найдена. Проверьте идентификатор методом [booking.v1.waitlist.list](../booking-v1-waitlist-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-waitlist-client-unset.md)
- [{#T}](./booking-v1-waitlist-client-list.md)
