# Получить список адресов по фильтру crm.address.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение контактов, компаний и лидов

В результат попадают только адреса объектов, доступных пользователю для чтения.

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.address.list](../../rest-v3/addresses/crm-address-list-rest-v3.md).

{% endnote %}

Метод `crm.address.list` возвращает список адресов по фильтру.

Адреса компаний и контактов хранятся в реквизитах.

К объекту CRM могут быть привязаны несколько реквизитов. Внутри реквизита может быть несколько адресов (каждый своего типа).

## Параметры метода

Все параметры метода необязательные.

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите [поля адресов](#fields)).

Если массив не передан или пуст, будут выбраны все доступные поля адресов ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных адресов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют [полям адреса](#fields). Неизвестное поле фильтра игнорируется без ошибки, и в результат попадают адреса без учета этого условия.

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных адресов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют [полям адреса](#fields).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы получить вторую страницу результатов, передайте значение `50`, третью — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Передайте `start: -1`, чтобы получить первую страницу без подсчета общего количества
||
|#

### Описание полей адреса {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа адреса. Элемент перечисления «Тип адреса».

Элементы перечисления «Тип адреса» можно получить с помощью метода [crm.enum.addresstype](../../auxiliary/enum/crm-enum-address-type.md)
||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

Для адресов реквизитов используйте `8`, для адресов лидов — `1`.

Для обратной совместимости фильтр `ENTITY_TYPE_ID` со значением компании (`4`) или контакта (`3`) преобразуется в фильтр по `ANCHOR_TYPE_ID`. Если в фильтре также передан `ENTITY_ID`, он преобразуется в `ANCHOR_ID`
||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор родительского объекта ||
|| **ADDRESS_1**
[`string`](../../../data-types.md) | Улица, дом, корпус, строение ||
|| **ADDRESS_2**
[`string`](../../../data-types.md) | Квартира / офис ||
|| **CITY**
[`string`](../../../data-types.md) | Город ||
|| **POSTAL_CODE**
[`string`](../../../data-types.md) | Почтовый индекс ||
|| **REGION**
[`string`](../../../data-types.md) | Район ||
|| **PROVINCE**
[`string`](../../../data-types.md) | Область ||
|| **COUNTRY**
[`string`](../../../data-types.md) | Страна ||
|| **COUNTRY_CODE**
[`string`](../../../data-types.md) | Код страны из справочника местоположений модуля `sale`. В ответе может быть `null`
||
|| **LOC_ADDR_ID**
[`integer`](../../../data-types.md) | Идентификатор связанного адреса в модуле Location. Подробнее — в [описании полей адресов](./index.md#fields)
||
|| **ANCHOR_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа основного родительского объекта.

Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

В этом поле содержится идентификатор типа родительского объекта реквизита (компания или контакт), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор типа лида
||
|| **ANCHOR_ID**
[`integer`](../../../data-types.md) | Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

В этом поле содержится идентификатор родительского объекта реквизита (компании или контакта), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор лида
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Поиск адресов по привязке к типу Реквизит:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"TYPE_ID":"asc"},"filter":{"ENTITY_TYPE_ID":8,"ENTITY_ID":7335},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.address.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"TYPE_ID":"asc"},"filter":{"ENTITY_TYPE_ID":8,"ENTITY_ID":7335},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.address.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each AddressItem returned in result[]
    type AddressItem = {
      TYPE_ID: string
      ENTITY_TYPE_ID: string
      ENTITY_ID: string
      ADDRESS_1: string | null
      ADDRESS_2: string | null
      CITY: string | null
      POSTAL_CODE: string | null
      REGION: string | null
      PROVINCE: string | null
      COUNTRY: string | null
      COUNTRY_CODE: string | null
      LOC_ADDR_ID: string
      ANCHOR_TYPE_ID: string
      ANCHOR_ID: string
    }

    try {
      // crm.address.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<AddressItem[]>({
        method: 'crm.address.list',
        params: {
          order: { TYPE_ID: 'asc' },
          filter: { ENTITY_TYPE_ID: 8, ENTITY_ID: 7335 },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Addresses found:', result.length, result)
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
      async function fetchAddressList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.address.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.address.list',
            params: {
              order: { TYPE_ID: 'asc' },
              filter: { ENTITY_TYPE_ID: 8, ENTITY_ID: 7335 },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Addresses found:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchAddressList)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.address.list(
            select=[
                "TYPE_ID",
                "ENTITY_TYPE_ID",
                "ENTITY_ID",
                "ADDRESS_1",
                "ADDRESS_2",
                "CITY",
                "POSTAL_CODE",
                "COUNTRY",
            ],
            filter={
                "ENTITY_TYPE_ID": 8,
                "ENTITY_ID": 7335,
            },
            order={
                "TYPE_ID": "asc",
            },
            start=0,
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
        bitrix_response = client.crm.address.list(
            select=[
                "TYPE_ID",
                "ENTITY_TYPE_ID",
                "ENTITY_ID",
                "ADDRESS_1",
                "CITY",
                "COUNTRY",
            ],
            filter={
                "ENTITY_TYPE_ID": 8,
                "ENTITY_ID": 7335,
            },
            order={
                "TYPE_ID": "asc",
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.address.list',
                [
                    'order' => ['TYPE_ID' => 'asc'],
                    'filter' => ['ENTITY_TYPE_ID' => 8, 'ENTITY_ID' => 7335],
                    'start' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);


    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching address list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.address.list",
        {
            order: { "TYPE_ID": "asc"},
            filter: { "ENTITY_TYPE_ID": 8, "ENTITY_ID": 7335},
            start: 0
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.address.list',
        [
            'order' => ['TYPE_ID' => 'asc'],
            'filter' => ['ENTITY_TYPE_ID' => 8, 'ENTITY_ID' => 7335],
            'start' => 0
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
    "result": [
        {
            "TYPE_ID": "1",
            "ENTITY_TYPE_ID": "8",
            "ENTITY_ID": "7335",
            "ADDRESS_1": "Ленина 2",
            "ADDRESS_2": "701",
            "CITY": "Тюмень",
            "POSTAL_CODE": "625003",
            "REGION": "Тюменская обл",
            "PROVINCE": "Тюменская обл",
            "COUNTRY": "Россия",
            "COUNTRY_CODE": null,
            "LOC_ADDR_ID": "479",
            "ANCHOR_TYPE_ID": "3",
            "ANCHOR_ID": "17192"
        }
    ],
    "total": 1,
    "time": {
        "start": 1716301758.664873,
        "finish": 1716301759.73158,
        "duration": 1.0667071342468262,
        "processing": 0.028820037841796875,
        "date_start": "2024-05-21T16:29:18+02:00",
        "date_finish": "2024-05-21T16:29:19+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив объектов с информацией о выбранных адресах. Каждый элемент содержит выбранные [поля адресов](#fields). Если адресов нет, возвращается пустой массив `[]`. Текстовые поля могут содержать `null`.

Поля адреса с типом integer могут возвращаться в JSON как строки, например `"TYPE_ID": "1"` ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей. Не возвращается при `start: -1` ||
|| **next**
[`integer`](../../../data-types.md) | Смещение следующей страницы. Передайте его в `start`. Возвращается, если есть следующая страница, кроме режима `start: -1` ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'order' must be array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Parameter 'order' must be array. | Переданный `order` не является объектом или массивом ||
|| `400` | Пустое значение | Parameter 'filter' must be array. | Переданный `filter` не является объектом или массивом ||
|| `400` | `100` | `Unknown field definition ...` | В `select` или `order` передано неизвестное поле адреса ||
|| `400` | Пустое значение | Access denied. | Нет права чтения компаний, контактов или лидов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-address-add.md)
- [{#T}](./crm-address-update.md)
- [{#T}](./crm-address-delete.md)
- [{#T}](./crm-address-fields.md)
- [{#T}](./index.md)
