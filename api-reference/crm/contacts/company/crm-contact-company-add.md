# Добавить компанию к указанному контакту crm.contact.company.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» контакта и правом «Чтение» компании, которую добавляют

Метод `crm.contact.company.add` добавляет компанию к указанному контакту.

Остальные компании контакта при этом остаются привязанными. Чтобы задать весь набор компаний сразу, используйте [crm.contact.company.items.set](./crm-contact-company-items-set.md). Как устроен объект привязки, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор контакта. Должен быть больше `0`.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 3`
||
|| **fields***
[`object`](../../../data-types.md) | Объект с информацией о компании, которую нужно привязать к контакту.

Список доступных полей описан [ниже](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMPANY_ID***
[`crm_entity`](../../data-types.md) | Идентификатор компании, которую нужно привязать к контакту.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 4`.

Метод отдельно не проверяет, существует ли компания, поэтому может создать привязку к несуществующей компании ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md#standart-types) | Сделать ли компанию основной для контакта. Возможные значения:
- `Y` — да
- `N` — нет

Если у контакта еще нет основной компании, добавленная станет основной независимо от переданного значения.

Значение `Y` делает добавленную компанию основной вместо прежней: у прежней компании флаг сбрасывается в `N`, а новая попадает в поле контакта `COMPANY_ID` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки.

Если `SORT` не передан, метод подставляет `i + 10`, где `i` — наибольший положительный индекс сортировки среди компаний контакта. Если таких нет, `i` равен `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления связи контакт-компания, где:
- идентификатор контакта — `54`
- идентификатор компании — `32`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54,"fields":{"COMPANY_ID":32,"IS_PRIMARY":"Y","SORT":1000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.company.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54,"fields":{"COMPANY_ID":32,"IS_PRIMARY":"Y","SORT":1000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.company.add
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
        method: 'crm.contact.company.add',
        params: {
          id: 54,
          fields: {
            COMPANY_ID: 32,
            IS_PRIMARY: 'Y',
            SORT: 1000,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Company added to contact:', result)
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
      async function addContactCompany() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.company.add',
            params: {
              id: 54,
              fields: {
                COMPANY_ID: 32,
                IS_PRIMARY: 'Y',
                SORT: 1000,
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
          console.info('Company added to contact:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addContactCompany)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.company.add(
            bitrix_id=54,
            fields={
                "COMPANY_ID": 32,
                "IS_PRIMARY": "Y",
                "SORT": 1000,
            },
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
                'crm.contact.company.add',
                [
                    'id' => 54,
                    'fields' => [
                        'COMPANY_ID' => 32,
                        'IS_PRIMARY' => 'Y',
                        'SORT' => 1000,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result[0], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding contact company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.company.add',
        {
            id: 54,
            fields: {
                COMPANY_ID: 32,
                IS_PRIMARY: "Y",
                SORT: 1000,
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
        'crm.contact.company.add',
        [
            'id' => 54,
            'fields' => [
                'COMPANY_ID' => 32,
                'IS_PRIMARY' => 'Y',
                'SORT' => 1000,
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
    res, err := client.Core().Call(ctx, "crm.contact.company.add", b24.Params{
    	"id": 54,
    	"fields": b24.Params{
    		"COMPANY_ID": 32,
    		"IS_PRIMARY": "Y",
    		"SORT":       1000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.company.add: %w", err)
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
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2024-08-19T13:47:08+02:00",
        "date_finish": "2024-08-19T13:47:08+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — компания добавлена
- `false` — компания уже привязана к контакту. Метод в этом случае ничего не меняет, в том числе `SORT` и `IS_PRIMARY`
||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | The parameter 'ownerEntityID' is invalid or not defined. | Параметр `id` не передан или меньше либо равен `0` ||
|| `400` | Пустое значение | The parameter 'fields' must be array. | Параметр `fields` не передан или передан строкой либо числом ||
|| `400` | Пустое значение | The parameter 'fields' is not valid. | В `fields` нет `COMPANY_ID` или он меньше либо равен `0` ||
|| `400` | Пустое значение | Access denied. | У пользователя нет права на чтение объектов CRM, в том числе в цифровых рабочих местах ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права на изменение контакта ||
|| `400` | Пустое значение | Not found. | Контакт с переданным `id` не найден ||
|| `400` | Пустое значение | [Компания #18] У Вас нет прав на просмотр этого элемента | У пользователя нет права на чтение компании. В тексте ошибки — идентификатор компании ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-contact-company-delete.md)
- [{#T}](./crm-contact-company-fields.md)
- [{#T}](./crm-contact-company-items-get.md)
- [{#T}](./crm-contact-company-items-set.md)
- [{#T}](./crm-contact-company-items-delete.md)
