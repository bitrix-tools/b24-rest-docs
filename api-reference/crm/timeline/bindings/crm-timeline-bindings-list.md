# Получить список связей записи таймлайна с элементами CRM crm.timeline.bindings.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод `crm.timeline.bindings.list` получает список связей одной записи таймлайна с элементами CRM.

В выдачу попадает и связь с тем элементом, в котором запись создана: она появляется автоматически, без вызова [crm.timeline.bindings.bind](./crm-timeline-bindings-bind.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации выбранных записей [(подробное описание)](#filter) ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 связей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы.

По умолчанию `0` — первая страница. Если передать значение больше общего количества связей, метод вернет первую страницу, а не пустой результат ||
|| **order**
[`object`](../../../data-types.md) | Метод принимает параметр, но не учитывает его: сортировка результата не поддерживается.

Значение должно быть объектом, иначе метод вернет ошибку `Parameter 'order' must be array.` ||
|#

### Параметр filter {#filter}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **OWNER_ID***
[`integer`](../../../data-types.md) | Идентификатор записи таймлайна, связи которой нужно получить. Возьмите его из ответа метода [crm.timeline.comment.add](../comments/crm-timeline-comment-add.md) или [crm.timeline.logmessage.add](../logmessage/crm-timeline-logmessage-add.md) либо получите из списка методом [crm.timeline.comment.list](../comments/crm-timeline-comment-list.md) или [crm.timeline.logmessage.list](../logmessage/crm-timeline-logmessage-list.md).

Метод учитывает только это поле фильтра. Остальные поля не влияют на результат ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_ID":999}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.bindings.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_ID":999},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.bindings.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each binding returned in result[]
    type TimelineBindingItem = {
      OWNER_ID: string,
      ENTITY_ID: string,
      ENTITY_TYPE: string,
    }

    try {
      // The list helpers (callList.make(), fetchList.make()) page through an id cursor field,
      // and this method returns no id at all — they would stop after the first page.
      // Walk the pages manually: repeat the call with `start` increased by 50 while `next` is present.
      const response = await $b24.actions.v2.call.make<TimelineBindingItem[]>({
        method: 'crm.timeline.bindings.list',
        params: {
          filter: {
            OWNER_ID: 999,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bindings:', result.length, result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@2/dist/umd/index.min.js"></script>
    <script>
      async function listTimelineBindings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // The list helpers (callList.make(), fetchList.make()) page through an id cursor field,
          // and this method returns no id at all — they would stop after the first page.
          // Walk the pages manually: repeat the call with `start` increased by 50 while `next` is present.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.bindings.list',
            params: {
              filter: {
                OWNER_ID: 999,
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
          console.info('Bindings:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTimelineBindings)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.timeline.bindings.list(
            filter={
                "OWNER_ID": 999,
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.timeline.bindings.list(
            filter={
                "OWNER_ID": 999,
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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

    Быстрый обход `as_list_fast` для этого метода не подходит: он листает список по полю `ID`, которого нет в ответе.

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.bindings.list',
                [
                    'filter' => [
                        'OWNER_ID' => 999,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        // Следующую страницу получите тем же вызовом с параметром start
        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching timeline bindings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.bindings.list",
        {
            filter: {
                "OWNER_ID": 999,
            },
        }, result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
                if (result.more()) {
                    result.next();
                }
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.bindings.list',
        [
            'filter' => [
                'OWNER_ID' => 999,
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
    res, err := client.Core().Call(ctx, "crm.timeline.bindings.list", b24.Params{
    	"filter": b24.Params{
    		"OWNER_ID": 999,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.timeline.bindings.list: %w", err)
    }

    var items []struct {
    	OwnerID    b24.ID `json:"OWNER_ID"`
    	EntityID   b24.ID `json:"ENTITY_ID"`
    	EntityType string `json:"ENTITY_TYPE"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.OwnerID, it.EntityID)
    }

    // Для полного обхода списка подходит client.Core().Pages: он листает по start.
    // Scan здесь не работает — он идет по идентификатору, которого нет в ответе.
    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "39",
            "ENTITY_TYPE": "deal"
        },
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "92",
            "ENTITY_TYPE": "company"
        },
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "205",
            "ENTITY_TYPE": "lead"
        }
    ],
    "total": 3,
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

В примере ниже у записи 60 связей — показана одна связь из 50 на первой странице:

```json
{
    "result": [
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "39",
            "ENTITY_TYPE": "deal"
        }
    ],
    "next": 50,
    "total": 60,
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
[`array`](../../../data-types.md) | Массив объектов с найденными связями [(подробное описание)](#result) ||
|| **next**
[`integer`](../../../data-types.md) | Значение параметра `start` для следующей страницы. Возвращается, только если у записи таймлайна больше 50 связей ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных связей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **OWNER_ID**
[`string`](../../../data-types.md) | Идентификатор записи таймлайна ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор элемента CRM ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Символьный код типа объекта CRM `entityTypeName`. Метод всегда возвращает его в нижнем регистре. Возможные значения:
- `lead` — лид
- `deal` — сделка
- `contact` — контакт
- `company` — компания
- `quote` — предложение
- `smart_invoice` — счет
- `order` — заказ
- `activity` — дело
- `dynamic_<entityTypeId>` — элемент смарт-процесса, например `dynamic_128`

В ответе встречаются и другие типы объектов CRM, например `invoice` — счет в старом формате. Как устроены символьные коды типов, описано в разделе [Тип объекта CRM](../../data-types.md#object_type) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "OWNER_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | OWNER_ID is not defined or invalid. | Не передан обязательный параметр `OWNER_ID`, передано нечисловое значение или число меньше единицы ||
|| `400` | Пустое значение | Parameter 'filter' must be array. | Параметр `filter` передан не объектом ||
|| `400` | Пустое значение | Parameter 'order' must be array. | Параметр `order` передан не объектом ||
|#

Если запись таймлайна с переданным `OWNER_ID` не существует или у нее нет связей, метод возвращает пустой массив в `result` и `total` со значением `0`.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-bindings-bind.md)
- [{#T}](./crm-timeline-bindings-unbind.md)
- [{#T}](./crm-timeline-bindings-fields.md)
- [{#T}](./index.md)
