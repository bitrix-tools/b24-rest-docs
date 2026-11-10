# Получить клиентов записи в листе ожидания booking.v1.waitlist.client.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.waitlist.client.list` возвращает список клиентов для указанной записи в листе ожидания.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **waitListId***
[`integer`](../../../data-types.md) | Идентификатор записи в листе ожидания.
Можно получить методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md) и [booking.v1.waitlist.list](../booking-v1-waitlist-list.md) ||
|#

## Примеры кода

Примеры получают клиентов записи `13`. Замените идентификатор значением своего Битрикс24.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":13}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.waitlist.client.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":13,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.waitlist.client.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type WaitListClientListResult = {
      waitListClient: Array<{
        id: number
        type: {
          code: string
          module: string
        }
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<WaitListClientListResult>({
        method: 'booking.v1.waitlist.client.list',
        params: {
          waitListId: 13,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Clients:', result.waitListClient, 'Count:', result.waitListClient.length)
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
      async function listWaitListClients() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.waitlist.client.list',
            params: {
              waitListId: 13,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Clients:', result.waitListClient, 'Count:', result.waitListClient.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listWaitListClients)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.waitlist.client.list(
            wait_list_id=13,
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
                'booking.v1.waitlist.client.list',
                [
                    'waitListId' => 13,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Clients: ' . print_r($result['waitListClient'], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing waitlist clients: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.waitlist.client.list",
        {
            waitListId: 13,
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
        'booking.v1.waitlist.client.list',
        [
            'waitListId' => 13
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.waitlist.client.list", b24.Params{
    	"waitListId": 13,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("booking.v1.waitlist.client.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "waitListClient".
    raw, ok := b24.Unwrap(res.Result, "waitListClient")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа waitListClient")
    }

    var items []struct {
    	ID b24.ID `json:"id"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "waitListClient": [
            {
                "id": 2795,
                "type": {
                    "code": "CONTACT",
                    "module": "crm"
                }
            },
            {
                "id": 3063,
                "type": {
                    "code": "COMPANY",
                    "module": "crm"
                }
            }
        ]
    },
    "total": 0,
    "time": {
        "start": 1790294537,
        "finish": 1790294537.508353,
        "duration": 0.5083529949188232,
        "processing": 0,
        "date_start": "2026-09-25T03:02:17+03:00",
        "date_finish": "2026-09-25T03:02:17+03:00",
        "operating_reset_at": 1790295137,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с массивом `waitListClient`. [Структура объекта](#result) ||
|| **total**
[`integer`](../../../data-types.md) | Служебное поле, возвращает `0`. Чтобы узнать количество клиентов, посчитайте элементы `result.waitListClient` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **waitListClient**
[`array`](../../../data-types.md) | Массив объектов с полями `id` и `type`. Если у записи нет клиентов, возвращает пустой массив `[]`. [Структура элемента](#waitListClient) ||
|#

#### Клиент {#waitListClient}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор контакта или компании CRM. Для получения данных через [crm.item.get](../../../crm/universal/crm-item-get.md) передайте `entityTypeId: 3` для контакта или `entityTypeId: 4` для компании ||
|| **type**
[`object`](../../../data-types.md) | Тип клиента. [Структура объекта](#client-type) ||
|#

#### Объект type {#client-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **module**
[`string`](../../../data-types.md) | Модуль клиента. Для контактов и компаний — `crm` ||
|| **code**
[`string`](../../../data-types.md) | Код типа клиента:
- `CONTACT` — [контакт CRM](../../../crm/contacts/index.md)
- `COMPANY` — [компания CRM](../../../crm/companies/index.md)

Доступные типы клиентов возвращает метод [booking.v1.clienttype.list](../../booking-v1-clienttype-list.md) ||
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
|| `100` | `Could not find value for parameter {waitListId}` | Не передан `waitListId`. Укажите идентификатор записи в листе ожидания ||
|| `1040` | `Wait list not found` | Запись с указанным `waitListId` не найдена. Проверьте идентификатор методом [booking.v1.waitlist.list](../booking-v1-waitlist-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-waitlist-client-unset.md)
- [{#T}](./booking-v1-waitlist-client-set.md)
