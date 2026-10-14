# Прикрепить список контактов к лиду crm.lead.contact.items.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» лида и правом «Чтение» контактов

Метод `crm.lead.contact.items.set` устанавливает набор контактов, связанных с указанным лидом.

Он заменяет набор целиком: контакты, которых нет в `items`, отвязываются от лида. Чтобы добавить или убрать один контакт и не трогать остальные, используйте [crm.lead.contact.add](./crm-lead-contact-add.md) и [crm.lead.contact.delete](./crm-lead-contact-delete.md). Как устроен объект привязки, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор лида. Должен быть больше `0`.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 1` ||
|| **items***
[`object[]`](../../../data-types.md) | Набор объектов, которые описывают контакты лида. Структуру объекта привязки смотрите [ниже](#lead_contact_binding).

Пустой массив отвязывает от лида все контакты.

Элементы без `CONTACT_ID` или со значением меньше либо равным `0` метод пропускает без ошибки ||
|#

### Параметр items {#lead_contact_binding}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который нужно привязать к лиду.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 3`.

Метод отдельно не проверяет, существует ли контакт, поэтому может создать привязку к несуществующему контакту ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md#standart-types) | Сделать ли контакт основным для лида. Возможные значения:
- `Y` — да
- `N` — нет

Основным станет первый контакт в `items` с `IS_PRIMARY = Y`, а если такого нет — первый контакт в `items`. У остальных флаг сбрасывается в `N`.

Основной контакт попадает в поле лида `CONTACT_ID`
||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки.

Если `SORT` не передан или меньше либо равен `0`, метод вычисляет его по позиции контакта в `items` как `(n + 1) * 10`, где `n` — порядковый номер контакта в `items`, отсчет начинается с нуля. Первый контакт получает `10`, второй — `20` и так далее ||
|#

{% note warning "" %}

Правило действует и для уже привязанных контактов: если не передать `SORT`, метод перезапишет их прежний индекс сортировки. Чтобы сохранить порядок, получите набор методом [crm.lead.contact.items.get](./crm-lead-contact-items-get.md) и передайте `SORT` каждому контакту.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"items":[{"CONTACT_ID":1010,"SORT":10,"IS_PRIMARY":"Y"},{"CONTACT_ID":1020,"SORT":20,"IS_PRIMARY":"N"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.contact.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"items":[{"CONTACT_ID":1010,"SORT":10,"IS_PRIMARY":"Y"},{"CONTACT_ID":1020,"SORT":20,"IS_PRIMARY":"N"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.contact.items.set
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
        method: 'crm.lead.contact.items.set',
        params: {
          id: 1,
          items: [
            {
              CONTACT_ID: 1010,
              SORT: 10,
              IS_PRIMARY: 'Y',
            },
            {
              CONTACT_ID: 1020,
              SORT: 20,
              IS_PRIMARY: 'N',
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
        console.info('Lead contacts set:', result)
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
      async function setLeadContactItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.contact.items.set',
            params: {
              id: 1,
              items: [
                {
                  CONTACT_ID: 1010,
                  SORT: 10,
                  IS_PRIMARY: 'Y',
                },
                {
                  CONTACT_ID: 1020,
                  SORT: 20,
                  IS_PRIMARY: 'N',
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
          console.info('Lead contacts set:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setLeadContactItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.lead.contact.items.set(
            bitrix_id=1,
            items=[
                {
                    "CONTACT_ID": 1010,
                    "SORT": 10,
                    "IS_PRIMARY": "Y",
                },
                {
                    "CONTACT_ID": 1020,
                    "SORT": 20,
                    "IS_PRIMARY": "N",
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
                'crm.lead.contact.items.set',
                [
                    'id'    => 1,
                    'items' => [
                        [
                            'CONTACT_ID' => 1010,
                            'SORT'       => 10,
                            'IS_PRIMARY' => 'Y',
                        ],
                        [
                            'CONTACT_ID' => 1020,
                            'SORT'       => 20,
                            'IS_PRIMARY' => 'N',
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result[0], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting lead contact items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.lead.contact.items.set",
        {
            id: 1,
            items: [
                {
                    "CONTACT_ID": 1010,
                    "SORT": 10,
                    "IS_PRIMARY": "Y"
                },
                {
                    "CONTACT_ID": 1020,
                    "SORT": 20,
                    "IS_PRIMARY": "N"
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
        'crm.lead.contact.items.set',
        [
            'id' => 1,
            'items' => [
                [
                    'CONTACT_ID' => 1010,
                    'SORT' => 10,
                    'IS_PRIMARY' => 'Y'
                ],
                [
                    'CONTACT_ID' => 1020,
                    'SORT' => 20,
                    'IS_PRIMARY' => 'N'
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
    res, err := client.Core().Call(ctx, "crm.lead.contact.items.set", b24.Params{
    	"id": 1,
    	"items": []b24.Params{
    		{
    			"CONTACT_ID": 1010,
    			"SORT":       10,
    			"IS_PRIMARY": "Y",
    		},
    		{
    			"CONTACT_ID": 1020,
    			"SORT":       20,
    			"IS_PRIMARY": "N",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.lead.contact.items.set: %w", err)
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
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-07T17:19:01+03:00",
        "date_finish": "2024-05-07T17:19:01+03:00",
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

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter items must be array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | The parameter ownerEntityID is invalid or not defined. | Параметр `id` не передан или меньше либо равен `0` ||
|| `400` | Пустое значение | The parameter items must be array. | Параметр `items` не передан или передан не массивом ||
|| `400` | Пустое значение | Access denied. | У пользователя нет права на чтение объектов CRM, в том числе в цифровых рабочих местах ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права на изменение лида ||
|| `400` | Пустое значение | Not found. | Лид с переданным `id` не найден ||
|| `400` | Пустое значение | [Контакт #1] У Вас нет прав на просмотр этого элемента | У пользователя нет права на чтение контактов. Метод проверяет это право, только если вызов что-то меняет в привязках ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-lead-contact-add.md)
- [{#T}](./crm-lead-contact-delete.md)
- [{#T}](./crm-lead-contact-items-get.md)
- [{#T}](./crm-lead-contact-items-delete.md)
- [{#T}](./crm-lead-contact-fields.md)