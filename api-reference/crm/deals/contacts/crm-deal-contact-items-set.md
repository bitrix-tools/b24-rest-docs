# Установить набор контактов, связанных с указанной сделкой crm.deal.contact.items.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» сделки

Метод `crm.deal.contact.items.set` устанавливает набор контактов, связанных с указанной сделкой. Контакты, которых нет в переданном списке, будут отвязаны.

Чтобы добавить или убрать один контакт, не затрагивая остальные, используйте [crm.deal.contact.add](./crm-deal-contact-add.md) или [crm.deal.contact.delete](./crm-deal-contact-delete.md). Как устроена связь и как выбрать метод, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сделки

Можно получить с помощью методов [crm.deal.list](../crm-deal-list.md) или [crm.deal.add](../crm-deal-add.md)
||
|| **items***
[`object[]`](../../../data-types.md) | Набор объектов, которые описывают контакты, привязанные к сделке [(подробное описание)](#deal_contact_binding).

Если передать пустой массив `[]`, метод отвяжет от сделки все контакты.

Элементы без корректного `CONTACT_ID` метод молча пропускает. Если один контакт передан несколько раз, сохраняется последний из повторов вместе с его `IS_PRIMARY` и `SORT`, поэтому передавайте каждый контакт один раз ||
|#

### Объект deal_contact_binding {#deal_contact_binding}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`integer`](../../../data-types.md) | Идентификатор контакта, который будет привязан к сделке

Идентификатор можно получить методом [crm.item.list](../../universal/crm-item-list.md) с `entityTypeId = 3`.

Метод не проверяет, что контакт существует: привязка к несуществующему идентификатору тоже будет создана ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | Является ли контакт основным контактом сделки. Возможные значения:
- `Y` — да
- `N` — нет

Если ни у одной привязки нет `IS_PRIMARY = Y`, основным становится первый контакт в `items` с корректным `CONTACT_ID`.

Если `IS_PRIMARY = Y` передано у нескольких привязок, основным станет первый из этих контактов.

Идентификатор основного контакта записывается в поле сделки `CONTACT_ID` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки

Если `SORT` не передан или не больше 0, подставляется `(i + 1) * 10`, где `i` — индекс элемента в массиве `items`, начиная с 0. Пропущенные элементы без корректного `CONTACT_ID` тоже учитываются в индексе ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить у сделки с `id = 1875` следующие привязанные контакты:
- контакт с `id = 55`, сделать его основным и установить `SORT = 100`
- контакт с `id = 54`, установить `SORT = 200`
- контакт с `id = 56`, установить `SORT = 400`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"items":[{"CONTACT_ID":55,"IS_PRIMARY":"Y","SORT":100},{"CONTACT_ID":54,"SORT":200},{"CONTACT_ID":56,"SORT":400}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.contact.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"items":[{"CONTACT_ID":55,"IS_PRIMARY":"Y","SORT":100},{"CONTACT_ID":54,"SORT":200},{"CONTACT_ID":56,"SORT":400}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.contact.items.set
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
        method: 'crm.deal.contact.items.set',
        params: {
          id: 1875,
          items: [
            {
              CONTACT_ID: 55,
              IS_PRIMARY: 'Y',
              SORT: 100,
            },
            {
              CONTACT_ID: 54,
              SORT: 200,
            },
            {
              CONTACT_ID: 56,
              SORT: 400,
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
        console.info('Deal contacts set:', result)
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
      async function setDealContactItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.contact.items.set',
            params: {
              id: 1875,
              items: [
                {
                  CONTACT_ID: 55,
                  IS_PRIMARY: 'Y',
                  SORT: 100,
                },
                {
                  CONTACT_ID: 54,
                  SORT: 200,
                },
                {
                  CONTACT_ID: 56,
                  SORT: 400,
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
          console.info('Deal contacts set:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setDealContactItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.deal.contact.items.set(
            bitrix_id=1875,
            items=[
                {
                    "CONTACT_ID": 55,
                    "IS_PRIMARY": "Y",
                    "SORT": 100,
                },
                {
                    "CONTACT_ID": 54,
                    "SORT": 200,
                },
                {
                    "CONTACT_ID": 56,
                    "SORT": 400,
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
                'crm.deal.contact.items.set',
                [
                    'id'    => 1875,
                    'items' => [
                        [
                            'CONTACT_ID' => 55,
                            'IS_PRIMARY' => 'Y',
                            'SORT'       => 100,
                        ],
                        [
                            'CONTACT_ID' => 54,
                            'SORT'       => 200,
                        ],
                        [
                            'CONTACT_ID' => 56,
                            'SORT'       => 400,
                        ],
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
        'crm.deal.contact.items.set',
        {
            id: 1875,
            items: [
                {
                    CONTACT_ID: 55,
                    IS_PRIMARY: "Y",
                    SORT: 100,
                },
                {
                    CONTACT_ID: 54,
                    SORT: 200,
                },
                {
                    CONTACT_ID: 56,
                    SORT: 400,
                }
            ],
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
        'crm.deal.contact.items.set',
        [
            'id' => 1875,
            'items' => [
                [
                    'CONTACT_ID' => 55,
                    'IS_PRIMARY' => 'Y',
                    'SORT' => 100,
                ],
                [
                    'CONTACT_ID' => 54,
                    'SORT' => 200,
                ],
                [
                    'CONTACT_ID' => 56,
                    'SORT' => 400,
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
    res, err := client.Core().Call(ctx, "crm.deal.contact.items.set", b24.Params{
    	"id": 1875,
    	"items": []b24.Params{
    		{
    			"CONTACT_ID": 55,
    			"IS_PRIMARY": "Y",
    			"SORT":       100,
    		},
    		{
    			"CONTACT_ID": 54,
    			"SORT":       200,
    		},
    		{
    			"CONTACT_ID": 56,
    			"SORT":       400,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.deal.contact.items.set: %w", err)
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
        "start": 1773225418,
        "finish": 1773225418.981286,
        "duration": 0.9812860488891602,
        "processing": 0,
        "date_start": "2026-03-11T13:36:58+03:00",
        "date_finish": "2026-03-11T13:36:58+03:00",
        "operating_reset_at": 1773226018,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит `true` в случае успеха.

Метод возвращает `true` и в том случае, когда переданный набор совпадает с текущим ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| 400 | Пустое значение | `The parameter ownerEntityID is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| 400 | Пустое значение | `The parameter items must be array.` | Параметр `items` не передан или передан не массив ||
|| 400 | Пустое значение | `Access denied.` | Сделка с переданным `id` не найдена, и у пользователя нет права «изменения» сделок ||
|| 403 | `ACCESS_DENIED` | `Access denied!` | Нет права «изменения» сделки ||
|| 400 | Пустое значение | `Not found.` | Сделка с переданным `id` не найдена ||
|| 400 | Пустое значение | `[Контакт #1] У Вас нет прав на просмотр этого элемента` | Набор меняется, а у пользователя нет права «чтения» контакта с идентификатором `1`. Из-за особенности реализации метод проверяет право на этот контакт, а не на контакты из `items` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-deal-contact-add.md)
- [{#T}](./crm-deal-contact-delete.md)
- [{#T}](./crm-deal-contact-items-get.md)
- [{#T}](./crm-deal-contact-items-delete.md)
- [{#T}](./crm-deal-contact-fields.md)
