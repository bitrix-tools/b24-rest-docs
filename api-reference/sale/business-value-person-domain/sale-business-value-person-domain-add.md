# Добавить соответствие физическому или юридическому лицу sale.businessValuePersonDomain.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.businessValuePersonDomain.add` задает типу плательщика соответствие физическому или юридическому лицу. Без соответствия тип плательщика не участвует в настройках бизнес-смыслов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля нового соответствия [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md) | Идентификатор типа плательщика.

Получить идентификаторы типов плательщиков можно с помощью метода [sale.persontype.list](../person-type/sale-person-type-list.md) ||
|| **domain***
[`string`](../../data-types.md) | Кто платит по этому типу плательщика:
- `I` — физическое лицо
- `E` — юридическое лицо ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"domain":"I"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.businessValuePersonDomain.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"domain":"I"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.businessValuePersonDomain.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BusinessValuePersonDomainAddResult = {
      businessValuePersonDomain: {
        domain: string
        personTypeId: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<BusinessValuePersonDomainAddResult>({
        method: 'sale.businessValuePersonDomain.add',
        params: {
          fields: {
            personTypeId: 3,
            domain: 'I',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.businessValuePersonDomain.personTypeId, result.businessValuePersonDomain.domain)
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
      async function addBusinessValuePersonDomain() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.businessValuePersonDomain.add',
            params: {
              fields: {
                personTypeId: 3,
                domain: 'I',
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
          console.info(result.businessValuePersonDomain.personTypeId, result.businessValuePersonDomain.domain)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addBusinessValuePersonDomain)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "personTypeId": 3,
        "domain": "I",
    }

    try:
        bitrix_response = client.sale.businessvaluepersondomain.add(
            fields=fields,
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
                'sale.businessValuePersonDomain.add',
                [
                    'fields' => [
                        'personTypeId' => 3,
                        'domain'       => 'I',
                    ],
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
        'sale.businessValuePersonDomain.add',
        {
            fields: {
                personTypeId: 3,
                domain: 'I'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.businessValuePersonDomain.add',
        [
            'fields' =>
            [
                'personTypeId' => 3,
                'domain' => 'I'
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
    res, err := client.Core().Call(ctx, "sale.businessValuePersonDomain.add", b24.Params{
    	"fields": b24.Params{
    		"personTypeId": 3,
    		"domain":       "I",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.businessValuePersonDomain.add: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "businessValuePersonDomain": {
            "domain": "I",
            "personTypeId": 3
        }
    },
    "time": {
        "start": 1712325642.686926,
        "finish": 1712325642.949075,
        "duration": 0.2621490955352783,
        "processing": 0.004400968551635742,
        "date_start": "2024-04-05T16:00:42+02:00",
        "date_finish": "2024-04-05T16:00:42+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **businessValuePersonDomain**
[`sale_business_value_person_domain`](../data-types.md#sale_business_value_person_domain) | Добавленное соответствие ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201450000001",
    "error_description": "Duplicate entry for key [personTypeId]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `201450000001` | Duplicate entry for key [personTypeId] | Для типа плательщика уже задано соответствие. Чтобы изменить домен, удалите соответствие методом [sale.businessValuePersonDomain.deleteByFilter](./sale-business-value-person-domain-delete-by-filter.md) и добавьте заново ||
|| `400` | `201440400002` | person type is not exists | Тип плательщика с указанным идентификатором не существует ||
|| `400` | `200040300020` | Access Denied | Нет прав на изменение соответствия ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Required fields: `список полей` | Не переданы обязательные поля `personTypeId` или `domain` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-business-value-person-domain-list.md)
- [{#T}](./sale-business-value-person-domain-delete-by-filter.md)
- [{#T}](./sale-business-value-person-domain-get-fields.md)