# Добавить привязку контакта к лиду crm.lead.contact.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод добавляет привязку контакта к указанному лиду.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор лида, к которому нужно добавить контакт. Идентификатор лида можно получить методом [получения списка лидов](../crm-lead-list.md)  ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления контакта к лиду в виде структуры:

```js
fields:
    {
        "CONTACT_ID": "значение",
        "SORT": "значение",
        "IS_PRIMARY": "значение"
    }
```
 ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`integer`](../../../data-types.md) | Идентификатор контакта ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. По умолчанию устанавливается `10`  ||
|| **IS_PRIMARY**
[`string`](../../../data-types.md) | Флаг первичного контакта

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"CONTACT_ID":1010,"SORT":10,"IS_PRIMARY":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.contact.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"CONTACT_ID":1010,"SORT":10,"IS_PRIMARY":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.contact.add
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
        method: 'crm.lead.contact.add',
        params: {
          id: 1,
          fields: {
            CONTACT_ID: 1010,
            SORT: 10,
            IS_PRIMARY: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact linked to lead:', result)
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
      async function addLeadContact() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.contact.add',
            params: {
              id: 1,
              fields: {
                CONTACT_ID: 1010,
                SORT: 10,
                IS_PRIMARY: 'Y',
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
          console.info('Contact linked to lead:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addLeadContact)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.contact.add',
                [
                    'id' => 1,
                    'fields' => [
                        'CONTACT_ID' => 1010,
                        'SORT' => 10,
                        'IS_PRIMARY' => 'Y',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding lead contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
            "crm.lead.contact.add",
            {
                id: 1,
                fields:
                {
                    "CONTACT_ID": 1010,
                    "SORT": 10,
                    "IS_PRIMARY": "Y"
                }
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
        'crm.lead.contact.add',
        [
            'id' => 1,
            'fields' =>
            [
                'CONTACT_ID' => 1010,
                'SORT' => 10,
                'IS_PRIMARY' => 'Y'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.lead.contact.add(
            bitrix_id=1201,
            fields={"CONTACT_ID": 3401, "SORT": 10, "IS_PRIMARY": "Y"},
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат операции ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `NOT_FOUND` | Элемент не найден ||
|| ` ` | Не переданы обязательные поля ||
|| ` ` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-contact-delete.md)
- [{#T}](./crm-lead-contact-items-get.md)
- [{#T}](./crm-lead-contact-items-set.md)
- [{#T}](./crm-lead-contact-items-delete.md)
- [{#T}](./crm-lead-contact-fields.md)
