# Получить список компаний по фильтру crm.company.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» компаний

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.company.list](../rest-v3/items/crm-entity-list-rest-v3.md).

{% endnote %}

Метод `crm.company.list` возвращает список компаний по фильтру. Является реализацией [списочного метода](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) для компаний.

Метод выбирает только компании из общего направления, фильтр по `CATEGORY_ID` это не меняет. Компании других направлений получайте методом [crm.item.list](../universal/crm-item-list.md) с `entityTypeId=4` и `categoryId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которыми можно ограничить выборку.

При выборке можно использовать маски:
- `'*'` — для выборки всех полей, без пользовательских и множественных
- `'UF_*'` — для выборки всех пользовательских полей без множественных

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора — `PHONE`, `EMAIL` и так далее.

Список доступных полей для выборки можно узнать с помощью метода [crm.company.fields](crm-company-fields.md).

По умолчанию возвращаются все поля — `'*'` + пользовательские поля — `'UF_*'`
||
|| **filter**
[`object`](../../data-types.md) | Объект формата:

```text
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
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
- `*` — поиск по словам. Значение разбивается на слова, в поле должно найтись каждое слово как подстрока, порядок слов не важен. Для полей, которые не являются строками, работает как `=`
- `*=` — аналогично `*`
- `=` — равно, точное совпадение. Используется по умолчанию, кроме полей `PHONE`, `EMAIL`, `WEB`, `IM`
- `!=` — не равно
- `!` — не равно

Поле `LAST_COMMUNICATION_TIME` в фильтре принимает дату в формате ISO 8601, например `2026-01-01T00:00:00+03:00`.

Для полей `PHONE`, `EMAIL`, `WEB`, `IM` фильтр без префикса ищет значения, начинающиеся с переданной строки.

Фильтр `LIKE` не работает с полями типа `crm_status`, `crm_company` — например, `COMPANY_TYPE`.

Список доступных полей для фильтрации можно узнать с помощью метода [crm.company.fields](crm-company-fields.md).

Ключ `logic` в фильтре не поддерживается. Для использования сложной логики в фильтре используйте метод [crm.item.list](../universal/crm-item-list.md)
||
|| **order**
[`object`](../../data-types.md) | Объект формата:

```text
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где:
- `field_n` — название поля, по которому будет произведена сортировка выборки компаний
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки можно узнать с помощью метода [crm.company.fields](crm-company-fields.md)
||
|| **start**
[`integer`](../../data-types.md) | Параметр для управления постраничной навигацией.

Одна страница содержит не более 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Передайте `-1`, чтобы получить первую порцию без подсчета общего количества. В этом режиме `total` равен `0`, а `next` не возвращается.
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Вывести компании:
- c сортировкой по дате создания
- с выборкой полей: название, ответственный, телефон
- по фильтру: тип компании `CUSTOMER` и дата создания с 2025-01-01

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ORDER":{"DATE_CREATE":"ASC"},"FILTER":{"COMPANY_TYPE":"CUSTOMER",">=DATE_CREATE":"2025-01-01"},"SELECT":["TITLE","ASSIGNED_BY_ID","PHONE"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ORDER":{"DATE_CREATE":"ASC"},"FILTER":{"COMPANY_TYPE":"CUSTOMER",">=DATE_CREATE":"2025-01-01"},"SELECT":["TITLE","ASSIGNED_BY_ID","PHONE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each company object returned in result[]
    type CrmCompanyListItem = {
      ID: string
      TITLE: string
      ASSIGNED_BY_ID: string
      PHONE?: CrmCompanyPhone[]
    }

    type CrmCompanyPhone = {
      ID: string
      VALUE_TYPE: string
      VALUE: string
      TYPE_ID: string
    }

    try {
      // crm.company.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CrmCompanyListItem[]>({
        method: 'crm.company.list',
        params: {
          order: { DATE_CREATE: 'ASC' },
          filter: { COMPANY_TYPE: 'CUSTOMER', '>=DATE_CREATE': '2025-01-01' },
          select: ['TITLE', 'ASSIGNED_BY_ID', 'PHONE'],
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Companies on this page:', result.length, result)
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
      async function listCompanies() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.company.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.company.list',
            params: {
              order: { DATE_CREATE: 'ASC' },
              filter: { COMPANY_TYPE: 'CUSTOMER', '>=DATE_CREATE': '2025-01-01' },
              select: ['TITLE', 'ASSIGNED_BY_ID', 'PHONE'],
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
          console.info('Companies on this page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCompanies)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.list',
                [
                    'order' => ['DATE_CREATE' => 'ASC'],
                    'filter' => ['COMPANY_TYPE' => 'CUSTOMER', '>=DATE_CREATE' => '2025-01-01'],
                    'select' => ['TITLE', 'ASSIGNED_BY_ID', 'PHONE'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
        if ($result->more()) {
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching company list: ' . $e->getMessage();
    }
    ```
- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.list",
        {
            order: { "DATE_CREATE": "ASC" },
            filter: { "COMPANY_TYPE": "CUSTOMER", ">=DATE_CREATE": "2025-01-01" },
            select: [ "TITLE", "ASSIGNED_BY_ID", "PHONE" ]
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
        'crm.company.list',
        [
            'order' => ['DATE_CREATE' => 'ASC'],
            'filter' => ['COMPANY_TYPE' => 'CUSTOMER', '>=DATE_CREATE' => '2025-01-01'],
            'select' => ['TITLE', 'ASSIGNED_BY_ID', 'PHONE'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.company.list", b24.Params{
    	"order": b24.Params{
    		"DATE_CREATE": "ASC",
    	},
    	"filter": b24.Params{
    		"COMPANY_TYPE":  "CUSTOMER",
    		">=DATE_CREATE": "2025-01-01",
    	},
    	"select": []string{"TITLE", "ASSIGNED_BY_ID", "PHONE"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.list: %w", err)
    }

    var items []struct {
    	Title        string `json:"TITLE"`
    	AssignedByID b24.ID `json:"ASSIGNED_BY_ID"`
    	ID           b24.ID `json:"ID"`
    	Phone        []struct {
    		ID        string `json:"ID"`
    		ValueType string `json:"VALUE_TYPE"`
    		Value     string `json:"VALUE"`
    		TypeID    string `json:"TYPE_ID"`
    	} `json:"PHONE"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Title, it.AssignedByID, it.Phone)
    }

    // Total и Next заполняют списочные методы; для полного
    // обхода списка есть client.Core().Pages и Scan.
    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
    }
    ```

{% endlist %}

## Обработка ответа

Системные поля, закрытые для пользователя [настройкой видимости системных полей](../index.md#system-field-visibility), не возвращаются даже при указании в `select`. Условия `filter` и ключи `order` по закрытым полям молча отбрасываются без ошибки.

HTTP-статус: **200**

```json
{
    "result": [
        {
            "TITLE": "Перекресток",
            "ASSIGNED_BY_ID": "811",
            "ID": "2919",
            "PHONE": [
                {
                    "ID": "8303",
                    "VALUE_TYPE": "WORK",
                    "VALUE": "+79998887766",
                    "TYPE_ID": "PHONE"
                }
            ]
        }
    ],
    "total": 1,
    "time": {
        "start": 1769498859,
        "finish": 1769498859.948139,
        "duration": 0.948138952255249,
        "processing": 0,
        "date_start": "2026-01-27T10:27:39+03:00",
        "date_finish": "2026-01-27T10:27:39+03:00",
        "operating_reset_at": 1769499459,
        "operating": 0.1621239185333252
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Массив компаний, соответствующих фильтру. Набор полей зависит от `select`; описание полей можно получить методом [crm.company.fields](crm-company-fields.md) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных компаний ||
|| **next**
[`integer`](../../data-types.md) | Значение для `start` в следующем запросе, чтобы получить очередную страницу. Возвращается, если после текущей страницы есть еще записи и `start` не равен `-1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result

Каждый элемент — объект компании. Например, `ID` — идентификатор компании, `TITLE` — название, `ASSIGNED_BY_ID` — идентификатор ответственного. Поля `PHONE`, `EMAIL`, `WEB`, `IM`, если выбраны в `select`, содержат массивы объектов `crm_multifield`.

#### Объект crm_multifield

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор значения множественного поля ||
|| **VALUE_TYPE**
[`string`](../../data-types.md) | Тип значения, например `WORK` — рабочий телефон ||
|| **VALUE**
[`string`](../../data-types.md) | Значение: телефон, адрес электронной почты, сайт или мессенджер ||
|| **TYPE_ID**
[`string`](../../data-types.md) | Тип поля: `PHONE`, `EMAIL`, `WEB` или `IM` ||
|#

Полный список типов значений — в описании [crm_multifield](../data-types.md#crm_multifield).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет прав на «Чтение» компаний ||
|| `400` | Пустое значение | `Parameter 'order' must be array.` | В параметр `order` передан не объект ||
|| `400` | Пустое значение | `Parameter 'filter' must be array.` | В параметр `filter` передан не объект ||
|| `400` | Пустое значение | `Failed to get list. General error.` | Произошла неизвестная ошибка ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-update.md)
- [{#T}](./crm-company-get.md)
- [{#T}](./crm-company-delete.md)
- [{#T}](./crm-company-fields.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)





