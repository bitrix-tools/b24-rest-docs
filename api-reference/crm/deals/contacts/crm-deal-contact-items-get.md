# Получить набор контактов, связанных с указанной сделкой crm.deal.contact.items.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» сделки

Метод `crm.deal.contact.items.get` возвращает набор контактов, связанных с указанной сделкой.

Методы [crm.deal.get](../crm-deal-get.md) и [crm.deal.list](../crm-deal-list.md) набор контактов не возвращают, поэтому для чтения привязок нужен этот метод. Если нужны только идентификаторы контактов, без `SORT` и `IS_PRIMARY`, их возвращает [crm.item.get](../../universal/crm-item-get.md) с `entityTypeId = 2` в поле `contactIds`. Как устроена связь, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сделки

Можно получить с помощью методов [crm.deal.list](../crm-deal-list.md) или [crm.deal.add](../crm-deal-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения всех привязанных контактов у сделки с `id = 1875`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.contact.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.contact.items.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each contact binding returned in result[]
    type DealContactBinding = {
      CONTACT_ID: number
      SORT: number
      ROLE_ID: number
      IS_PRIMARY: string
    }

    try {
      const response = await $b24.actions.v2.call.make<DealContactBinding[]>({
        method: 'crm.deal.contact.items.get',
        params: {
          id: 1875,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contacts linked to deal:', result.length, result)
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
      async function getDealContactItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.contact.items.get',
            params: {
              id: 1875,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contacts linked to deal:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDealContactItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.deal.contact.items.get(bitrix_id=1875).response
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
                'crm.deal.contact.items.get',
                [
                    'id' => 1875,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.contact.items.get',
        {
            id: 1875,
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
        'crm.deal.contact.items.get',
        [
            'id' => 1875
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.deal.contact.items.get", b24.Params{
    	"id": 1875,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.deal.contact.items.get: %w", err)
    }

    var items []struct {
    	ContactID b24.ID `json:"CONTACT_ID"`
    	Sort      int    `json:"SORT"`
    	RoleID    b24.ID `json:"ROLE_ID"`
    	IsPrimary string `json:"IS_PRIMARY"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ContactID, it.Sort)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "CONTACT_ID": 55,
            "SORT": 100,
            "ROLE_ID": 0,
            "IS_PRIMARY": "Y"
        },
        {
            "CONTACT_ID": 54,
            "SORT": 200,
            "ROLE_ID": 0,
            "IS_PRIMARY": "N"
        },
        {
            "CONTACT_ID": 56,
            "SORT": 400,
            "ROLE_ID": 0,
            "IS_PRIMARY": "N"
        }
    ],
    "time": {
        "start": 1773231773,
        "finish": 1773231773.901404,
        "duration": 0.9014039039611816,
        "processing": 0,
        "date_start": "2026-03-11T15:22:53+03:00",
        "date_finish": "2026-03-11T15:22:53+03:00",
        "operating_reset_at": 1773232373,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`deal_contact_binding[]`](#deal_contact_binding) | Корневой элемент ответа. Содержит массив с информацией о привязанных к сделке контактах, упорядоченный по возрастанию `SORT`.

Если у сделки нет контактов, приходит пустой массив `[]` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект deal_contact_binding {#deal_contact_binding}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID**
[`integer`](../../../data-types.md) | Идентификатор контакта ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Контакт с меньшим значением стоит в карточке сделки выше ||
|| **ROLE_ID**
[`integer`](../../../data-types.md) | Идентификатор роли. Служебное поле: задать его нельзя, в ответе [crm.deal.contact.fields](./crm-deal-contact-fields.md) оно не описано ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | Является ли контакт основным контактом сделки. У сделки один основной контакт, его идентификатор хранится в поле сделки `CONTACT_ID`. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "",
    "error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| 400 | Пустое значение | `The parameter ownerEntityID is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| 400 | Пустое значение | `Access denied` | Сделка с переданным `id` не найдена, и у пользователя нет права «чтения» сделок ||
|| 403 | `ACCESS_DENIED` | `Access denied!` | Нет права «чтения» сделки ||
|| 400 | Пустое значение | `Not found` | Сделка с переданным `id` не найдена ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-deal-contact-add.md)
- [{#T}](./crm-deal-contact-delete.md)
- [{#T}](./crm-deal-contact-items-set.md)
- [{#T}](./crm-deal-contact-items-delete.md)
- [{#T}](./crm-deal-contact-fields.md)
