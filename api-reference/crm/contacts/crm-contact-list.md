# Получить список контактов crm.contact.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение контактов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.list](../rest-v3/items/crm-entity-list-rest-v3.md).

{% endnote %}

Метод `crm.contact.list` возвращает список контактов по фильтру.

Метод выбирает только контакты из общего направления, фильтр по `CATEGORY_ID` это не меняет. Контакты других направлений, например «Контакты поставщика», получайте методом [crm.item.list](../universal/crm-item-list.md) с `entityTypeId=3` и `categoryId`.

Чтобы получить список компаний, привязанных к контакту, используйте метод [`crm.contact.company.items.get`](company/crm-contact-company-items-get.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей контакта, которые нужно вернуть в ответе. Поле `ID` возвращается, даже если его нет в списке.

Маски:
- `'*'` — все поля, кроме пользовательских и множественных
- `'UF_*'` — все пользовательские поля, включая множественные

Для выборки множественных контактных данных укажите нужные поля в списке выбора (`PHONE`, `EMAIL` и так далее).

Список доступных полей для выборки можно узнать с помощью метода [`crm.contact.fields`](crm-contact-fields.md).

По умолчанию возвращаются стандартные поля. Чтобы получить пользовательские поля, укажите их или маску `UF_*`
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
- `field_n` — название поля, по которому фильтруются контакты
- `value_n` — значение фильтра

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Подстрока ищется в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `*` — поиск по словам. Значение разбивается на слова, в поле должно найтись каждое слово как подстрока, порядок слов не важен. Для полей, которые не являются строками, работает как `=`
- `*=` — аналогично `*`
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Поле `LAST_COMMUNICATION_TIME` в фильтре принимает дату в формате ISO 8601, например `2026-01-01T00:00:00+03:00`.

Фильтр по множественным полям `PHONE`, `EMAIL`, `WEB`, `IM` без префикса ищет значения, начинающиеся с переданной строки. Фильтр по `LINK` игнорируется.

Также фильтр `LIKE` не работает с полями типа `crm_status`, `crm_contact`, `crm_company` — например, Тип контакта (`TYPE_ID`), Обращение (`HONORIFIC`) и так далее.

Список доступных полей для фильтрации можно узнать с помощью метода [`crm.contact.fields`](crm-contact-fields.md).

Ключ `logic` в фильтре не поддерживается. Для фильтра со сложной логикой используйте метод [crm.item.list](../universal/crm-item-list.md)
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
- `field_n` — название поля, по которому сортируются контакты
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Множественные контактные данные, например `EMAIL` и `PHONE`, для сортировки не поддерживаются.

Список доступных полей для сортировки можно узнать с помощью метода [`crm.contact.fields`](crm-contact-fields.md)
||
|| **start**
[`integer`](../../data-types.md) | Параметр для управления постраничной навигацией.

Размер страницы фиксирован — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

Также смотрите описание [списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список контактов, у которых:
1. источник — CRM-форма
2. имя и фамилия не пустые
3. имя и фамилия начинаются на «И»
4. признак экспорта — `Y`
5. e-mail начинается с `special-for@example.com`
6. ответственный — пользователь 1 или 6
7. дата создания — не раньше чем шесть месяцев назад

Отсортировать по фамилии и имени по возрастанию.

Для наглядности выбрать только необходимые поля:
- идентификатор контакта
- имя
- фамилия
- e-mail
- участвует ли в экспорте
- ответственный
- дата создания

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"SOURCE_ID":"WEBFORM","!=NAME":"","!=LAST_NAME":"","=%NAME":"И%","=%LAST_NAME":"И%","EMAIL":"special-for@example.com","@ASSIGNED_BY_ID":[1,6],"EXPORT":"Y",">=DATE_CREATE":"**put_six_month_ago_date_here**"},"ORDER":{"LAST_NAME":"ASC","NAME":"ASC"},"SELECT":["ID","NAME","LAST_NAME","EMAIL","EXPORT","ASSIGNED_BY_ID","DATE_CREATE"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"SOURCE_ID":"WEBFORM","!=NAME":"","!=LAST_NAME":"","=%NAME":"И%","=%LAST_NAME":"И%","EMAIL":"special-for@example.com","@ASSIGNED_BY_ID":[1,6],"EXPORT":"Y",">=DATE_CREATE":"**put_six_month_ago_date_here**"},"ORDER":{"LAST_NAME":"ASC","NAME":"ASC"},"SELECT":["ID","NAME","LAST_NAME","EMAIL","EXPORT","ASSIGNED_BY_ID","DATE_CREATE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each contact object returned in result[]
    type CrmContactListItem = {
      ID: string
      NAME: string
      LAST_NAME: string
      EXPORT: string
      ASSIGNED_BY_ID: string
      DATE_CREATE: ISODate | null
      EMAIL?: CrmContactEmail[]
    }

    type CrmContactEmail = {
      ID: string
      VALUE_TYPE: string
      VALUE: string
      TYPE_ID: string
    }

    const sixMonthAgo = new Date()
    sixMonthAgo.setMonth(new Date().getMonth() - 6)

    try {
      // crm.contact.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CrmContactListItem[]>({
        method: 'crm.contact.list',
        params: {
          filter: {
            SOURCE_ID: 'WEBFORM',
            '!=NAME': '',
            '!=LAST_NAME': '',
            '=%NAME': 'И%',
            '=%LAST_NAME': 'И%',
            EMAIL: 'special-for@example.com',
            '@ASSIGNED_BY_ID': [1, 6],
            EXPORT: 'Y',
            '>=DATE_CREATE': sixMonthAgo.toISOString(),
          },
          order: {
            LAST_NAME: 'ASC',
            NAME: 'ASC',
          },
          select: [
            'ID',
            'NAME',
            'LAST_NAME',
            'EMAIL',
            'EXPORT',
            'ASSIGNED_BY_ID',
            'DATE_CREATE',
          ],
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contacts on this page:', result.length, result)
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
      async function listContacts() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const sixMonthAgo = new Date()
          sixMonthAgo.setMonth(new Date().getMonth() - 6)

          // crm.contact.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.list',
            params: {
              filter: {
                SOURCE_ID: 'WEBFORM',
                '!=NAME': '',
                '!=LAST_NAME': '',
                '=%NAME': 'И%',
                '=%LAST_NAME': 'И%',
                EMAIL: 'special-for@example.com',
                '@ASSIGNED_BY_ID': [1, 6],
                EXPORT: 'Y',
                '>=DATE_CREATE': sixMonthAgo.toISOString(),
              },
              order: {
                LAST_NAME: 'ASC',
                NAME: 'ASC',
              },
              select: [
                'ID',
                'NAME',
                'LAST_NAME',
                'EMAIL',
                'EXPORT',
                'ASSIGNED_BY_ID',
                'DATE_CREATE',
              ],
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
          console.info('Contacts on this page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listContacts)
    </script>
    ```

- PHP

    ```php
    try {
        $sixMonthAgo = new DateTime();
        $sixMonthAgo->modify('-6 months');
    
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.list',
                [
                    'filter' => [
                        'SOURCE_ID'      => 'WEBFORM',
                        '!=NAME'         => '',
                        '!=LAST_NAME'    => '',
                        '=%NAME'         => 'И%',
                        '=%LAST_NAME'    => 'И%',
                        'EMAIL'          => 'special-for@example.com',
                        '@ASSIGNED_BY_ID' => [1, 6],
                        'EXPORT'         => 'Y',
                        '>=DATE_CREATE'  => $sixMonthAgo->format('Y-m-d\TH:i:s'),
                    ],
                    'order'  => [
                        'LAST_NAME' => 'ASC',
                        'NAME'      => 'ASC',
                    ],
                    'select' => [
                        'ID',
                        'NAME',
                        'LAST_NAME',
                        'EMAIL',
                        'EXPORT',
                        'ASSIGNED_BY_ID',
                        'DATE_CREATE',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching contact list: ' . $e->getMessage();
    }
    ```
- BX24.js

    ```js
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth((new Date()).getMonth() - 6);

    BX24.callMethod(
        'crm.contact.list',
        {
            filter: {
                "SOURCE_ID": "WEBFORM",
                "!=NAME": "",
                "!=LAST_NAME": "",
                "=%NAME": "И%",
                "=%LAST_NAME": "И%",
                "EMAIL": "special-for@example.com",
                "@ASSIGNED_BY_ID": [1, 6],
                "EXPORT": "Y",
                ">=DATE_CREATE": sixMonthAgo.toISOString(),
            },
            order: {
                LAST_NAME: "ASC",
                NAME: "ASC",
            },
            select: [
                "ID",
                "NAME",
                "LAST_NAME",
                "EMAIL",
                "EXPORT",
                "ASSIGNED_BY_ID",
                "DATE_CREATE",
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

    $sixMonthAgo = new DateTime();
    $sixMonthAgo->modify('-6 months');

    $result = CRest::call(
        'crm.contact.list',
        [
            'FILTER' => [
                'SOURCE_ID' => 'WEBFORM',
                '!=NAME' => '',
                '!=LAST_NAME' => '',
                '=%NAME' => 'И%',
                '=%LAST_NAME' => 'И%',
                'EMAIL' => 'special-for@example.com',
                '@ASSIGNED_BY_ID' => [1, 6],
                'EXPORT' => 'Y',
                '>=DATE_CREATE' => $sixMonthAgo->format(DateTime::ATOM),
            ],
            'ORDER' => [
                'LAST_NAME' => 'ASC',
                'NAME' => 'ASC',
            ],
            'SELECT' => [
                'ID',
                'NAME',
                'LAST_NAME',
                'EMAIL',
                'EXPORT',
                'ASSIGNED_BY_ID',
                'DATE_CREATE',
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
    res, err := client.Core().Call(ctx, "crm.contact.list", b24.Params{
    	"filter": b24.Params{
    		"SOURCE_ID":       "WEBFORM",
    		"!=NAME":          "",
    		"!=LAST_NAME":     "",
    		"=%NAME":          "И%",
    		"=%LAST_NAME":     "И%",
    		"EMAIL":           "special-for@example.com",
    		"@ASSIGNED_BY_ID": []int{1, 6},
    		"EXPORT":          "Y",
    		">=DATE_CREATE":   "**put_six_month_ago_date_here**",
    	},
    	"order": b24.Params{
    		"LAST_NAME": "ASC",
    		"NAME":      "ASC",
    	},
    	"select": []string{"ID", "NAME", "LAST_NAME", "EMAIL", "EXPORT", "ASSIGNED_BY_ID", "DATE_CREATE"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.list: %w", err)
    }

    var items []struct {
    	ID           b24.ID `json:"ID"`
    	Name         string `json:"NAME"`
    	LastName     string `json:"LAST_NAME"`
    	Export       string `json:"EXPORT"`
    	AssignedByID b24.ID `json:"ASSIGNED_BY_ID"`
    	DateCreate   string `json:"DATE_CREATE"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name)
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

Пример ответа на запрос от 16 августа 2024 года: нижняя граница `DATE_CREATE` — 16 февраля 2024 года.

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "78",
            "NAME": "Иван",
            "LAST_NAME": "Исаев",
            "EXPORT": "Y",
            "ASSIGNED_BY_ID": "1",
            "DATE_CREATE": "2024-08-15T00:00:00+02:00",
            "EMAIL": [
                {
                    "ID": "218",
                    "VALUE_TYPE": "WORK",
                    "VALUE": "special-for@example.com",
                    "TYPE_ID": "EMAIL"
                }
            ]
        }
    ],
    "total": 1,
    "time": {
        "start": 1723807142.916445,
        "finish": 1723807143.44846,
        "duration": 0.5320150852203369,
        "processing": 0.1967020034790039,
        "date_start": "2024-08-16T13:19:02+02:00",
        "date_finish": "2024-08-16T13:19:03+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`contact[]`](./crm-contact-get.md#contact) | Корневой элемент ответа. Массив, содержащий информацию о найденных контактах.

Состав полей контакта задает параметр `select` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных контактов по заданным условиям ||
|| **next**
[`integer`](../../data-types.md) | Значение для `start` в следующем запросе, чтобы получить очередную страницу. Поле `next` возвращается, если после текущей страницы есть еще записи ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

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
|| `400` | Пустое значение | `Access denied.` | У пользователя нет прав на «Чтение» контактов ||
|| `400` | Пустое значение | `Parameter 'order' must be array.` | В параметр `order` передан не массив ||
|| `400` | Пустое значение | `Parameter 'filter' must be array.` | В параметр `filter` передан не массив ||
|| `400` | Пустое значение | `Failed to get list. General error.` | Произошла неизвестная ошибка ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)
