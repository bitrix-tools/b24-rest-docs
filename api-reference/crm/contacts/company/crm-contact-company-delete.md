# Удалить компанию из указанного контакта crm.contact.company.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «изменения» контактов

Метод `crm.contact.company.delete` удаляет компанию из указанного контакта.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор контакта.

Идентификатор можно получить с помощью методов [crm.contact.list](../crm-contact-list.md) или [crm.contact.add](../crm-contact-add.md) ||
|| **fields***
[`object`][1] | Объект с информацией о том, какую компанию необходимо удалить из привязок.

Содержит единственный ключ `COMPANY_ID` ||
|| **fields.COMPANY_ID***
[`integer`][1] | Идентификатор компании, которую необходимо удалить из привязок ||
|#

{% note info "Удалить первичную привязку" %}

Если удалить первичную привязку, то новой первичной привязкой станет первая доступная привязка.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления связи контакт-компания, где:
- идентификатор контакта — `54`
- идентификатор компании — `32`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54,"fields":{"COMPANY_ID":32}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.company.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54,"fields":{"COMPANY_ID":32},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.company.delete
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
        method: 'crm.contact.company.delete',
        params: {
          id: 54,
          fields: {
            COMPANY_ID: 32,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Company removed from contact:', result)
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
      async function deleteContactCompany() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.company.delete',
            params: {
              id: 54,
              fields: {
                COMPANY_ID: 32,
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
          console.info('Company removed from contact:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteContactCompany)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.company.delete',
                [
                    'id'     => 54,
                    'fields' => [
                        'COMPANY_ID' => 32,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting company from contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.company.delete',
        {
            id: 54,
            fields: {
                COMPANY_ID: 32,
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
        'crm.contact.company.delete',
        [
            'id' => 54,
            'fields' => [
                'COMPANY_ID' => 32,
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
        "start": 1724072653.79827,
        "finish": 1724072717.749956,
        "duration": 63.95168590545654,
        "processing": 63.63148093223572,
        "date_start": "2024-08-19T15:04:13+02:00",
        "date_finish": "2024-08-19T15:05:17+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа. Содержит:
- `true` — в случае успеха
- `false` — в случае неудачи (скорее всего компания, которую вы пытаетесь удалить, не привязана к контакту)
||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter 'ownerEntityID' is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `The parameter 'ownerEntityID' is invalid or not defined` | Передан `id` меньше 0 ||
|| `-`     | `The parameter 'fields' must be array` | В `fields` передан не объект ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на изменения контактов ||
|| `-`     | `Not found` | Контакт с переданным `id` не найден ||
|| `-`     | `The parameter 'fields' is not valid` | Может возникать из-за нескольких причин:
- если не передан обязательный параметр `fields.COMPANY_ID`
- если переданный параметр `fields.COMPANY_ID` меньше или равен 0 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-company-add.md)
- [{#T}](./crm-contact-company-fields.md)
- [{#T}](./crm-contact-company-items-get.md)
- [{#T}](./crm-contact-company-items-set.md)
- [{#T}](./crm-contact-company-items-delete.md)

[1]: ../../../data-types.md
