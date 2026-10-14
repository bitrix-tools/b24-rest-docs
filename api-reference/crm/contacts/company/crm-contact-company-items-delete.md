# Очистить набор компаний, связанных с указанным контактом crm.contact.company.items.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» контакта

Метод `crm.contact.company.items.delete` очищает набор компаний, связанных с указанным контактом.

Он отвязывает все компании сразу, сами компании остаются в CRM. Поле контакта `COMPANY_ID` очищается. Чтобы убрать одну компанию, используйте [crm.contact.company.delete](./crm-contact-company-delete.md).

Чтобы восстановить набор, привяжите компании заново методом [crm.contact.company.items.set](./crm-contact-company-items-set.md) или [crm.contact.company.add](./crm-contact-company-add.md). Прежние значения `SORT` и `IS_PRIMARY` Битрикс24 не хранит: если они понадобятся, получите набор методом [crm.contact.company.items.get](./crm-contact-company-items-get.md) до очистки. Что означают эти поля, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор контакта. Должен быть больше `0`.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 3` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления всех привязанных компаний у контакта с `id = 54`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.company.items.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.company.items.delete
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
        method: 'crm.contact.company.items.delete',
        params: {
          id: 54,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact companies cleared:', result)
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
      async function deleteContactCompanyItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.company.items.delete',
            params: {
              id: 54,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contact companies cleared:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteContactCompanyItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.company.items.delete(
            bitrix_id=54,
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
                'crm.contact.company.items.delete',
                [
                    'id' => 54,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result[0], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting contact company item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.company.items.delete',
        {
            id: 54,
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
        'crm.contact.company.items.delete',
        [
            'id' => 54
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.company.items.delete", b24.Params{
    	"id": 54,
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.company.items.delete: %w", err)
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
        "start": 1724075916.767978,
        "finish": 1724075917.346106,
        "duration": 0.5781280994415283,
        "processing": 0.2096860408782959,
        "date_start": "2024-08-19T15:58:36+02:00",
        "date_finish": "2024-08-19T15:58:37+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит `true` в случае успеха.

Метод возвращает `true` и в том случае, когда у контакта не было привязанных компаний. Для несуществующего `id` ответ тоже будет `true`, если проверка прав пройдена: существование контакта метод отдельно не проверяет ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter ownerEntityID is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | The parameter ownerEntityID is invalid or not defined. | Параметр `id` не передан или меньше либо равен `0` ||
|| `400` | Пустое значение | Access denied. | У пользователя нет права на чтение объектов CRM, в том числе в цифровых рабочих местах ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права на изменение контакта ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-contact-company-add.md)
- [{#T}](./crm-contact-company-delete.md)
- [{#T}](./crm-contact-company-fields.md)
- [{#T}](./crm-contact-company-items-get.md)
- [{#T}](./crm-contact-company-items-set.md)
