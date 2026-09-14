# Получить набор контактов, связанных с указанной компанией crm.company.contact.items.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» компаний

Метод `crm.company.contact.items.get` возвращает набор контактов, связанных с указанной компанией.

Метод отдает все привязки компании целиком: параметров фильтрации, выборки полей и постраничной навигации у него нет. Чтобы изменить набор, используйте [crm.company.contact.items.set](./crm-company-contact-items-set.md), а чтобы добавить или убрать один контакт — [crm.company.contact.add](./crm-company-contact-add.md) и [crm.company.contact.delete](./crm-company-contact-delete.md). Как устроен объект привязки, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор компании. Должен быть больше `0`.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 4` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.contact.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.contact.items.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each company-contact binding returned in result[]
    type CrmCompanyContactBinding = {
      CONTACT_ID: number
      SORT: number
      ROLE_ID: number
      IS_PRIMARY: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmCompanyContactBinding[]>({
        method: 'crm.company.contact.items.get',
        params: {
          id: 32,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Company contacts:', result.length, result)
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
      async function getCompanyContactItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.company.contact.items.get',
            params: {
              id: 32,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Company contacts:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCompanyContactItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.company.contact.items.get(
            bitrix_id=32,
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
                'crm.company.contact.items.get',
                [
                    'id' => 32,
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
        echo 'Error getting company contact items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.company.contact.items.get',
        {
            id: 32,
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
        'crm.company.contact.items.get',
        [
            'id' => 32
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.company.contact.items.get", b24.Params{
    	"id": 32,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.contact.items.get: %w", err)
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
            "CONTACT_ID": 7,
            "SORT": 100,
            "ROLE_ID": 0,
            "IS_PRIMARY": "Y"
        },
        {
            "CONTACT_ID": 8,
            "SORT": 110,
            "ROLE_ID": 0,
            "IS_PRIMARY": "Y"
        },
        {
            "CONTACT_ID": 9,
            "SORT": 120,
            "ROLE_ID": 0,
            "IS_PRIMARY": "N"
        }
    ],
    "time": {
        "start": 1724078791.470108,
        "finish": 1724078791.969407,
        "duration": 0.4992990493774414,
        "processing": 0.19150400161743164,
        "date_start": "2024-08-19T16:46:31+02:00",
        "date_finish": "2024-08-19T16:46:31+02:00"
    }
}
```

Ответ, когда у компании нет привязанных контактов:

```json
{
    "result": [],
    "time": {
        "start": 1724078812.104471,
        "finish": 1724078812.487903,
        "duration": 0.3834319114685059,
        "processing": 0.1382269859313965,
        "date_start": "2024-08-19T16:46:52+02:00",
        "date_finish": "2024-08-19T16:46:52+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`company_contact_binding[]`](#company_contact_binding) | Корневой элемент ответа. Содержит массив с информацией о привязанных к компании контактах, отсортированный по возрастанию `SORT`.

Если компании с переданным `id` не существует, метод тоже возвращает пустой массив, а не ошибку ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект company_contact_binding {#company_contact_binding}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID**
[`integer`](../../../data-types.md) | Идентификатор связанного контакта.

Получить данные контакта можно методом [crm.item.get](../../universal/crm-item-get.md) с `entityTypeId = 3` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **ROLE_ID**
[`integer`](../../../data-types.md) | Идентификатор роли. Поле зарезервировано, доступно только на чтение и всегда равно `0` ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md#standart-types) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет

Флаг относится к контакту и означает, что эта компания для него основная. Поэтому метод может вернуть несколько привязок с `IS_PRIMARY = Y` — по одной на каждый такой контакт ||
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
|| **Код** | **Описание** | **Значение** ||
|| Пустое значение | `The parameter ownerEntityID is invalid or not defined.` | Передан `id` меньше или равен 0 или не передан вовсе ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на чтение компаний ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-company-contact-add.md)
- [{#T}](./crm-company-contact-delete.md)
- [{#T}](./crm-company-contact-items-set.md)
- [{#T}](./crm-company-contact-items-delete.md)
- [{#T}](./crm-company-contact-fields.md)
