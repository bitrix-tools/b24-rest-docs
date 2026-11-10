# Получить список календарей calendar.section.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, кроме экстранет-пользователей

Метод `calendar.section.get` получает список календарей указанного типа и владельца, к которым у пользователя есть право просмотра времени событий.

Постраничной навигации у метода нет.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип календаря. Стандартные значения:
- `user` — календарь пользователя
- `group` — календарь группы
- `company_calendar` — календарь компании
- `location` — календарь переговорной комнаты, используется для бронирования времени в календаре переговорной комнаты через стороннее приложение
- `resource` — календарь ресурса

В Битрикс24 могут быть дополнительные типы календарей, в том числе созданные вручную. Их строковый код приходит в поле `CAL_TYPE` ответа, его же можно передать в `type` ||
|| **ownerId**
[`integer`](../data-types.md) | Идентификатор владельца календаря.

Обязателен для всех типов календаря, кроме `user`. Для типа `user` параметр можно не передавать — тогда используется идентификатор текущего пользователя.

Что передавать:
- `user` — идентификатор пользователя
- `group` — идентификатор группы
- `company_calendar` и `location` — `0`

Ресурсы, созданные методом [calendar.resource.add](./resource/calendar-resource-add.md), метод не возвращает: владелец у них не заполнен, поэтому фильтр по `ownerId` их не находит. Для ресурсов используйте [calendar.resource.list](./resource/calendar-resource-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.section.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.section.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each CalendarSection returned in result[]
    type CalendarSection = {
      ID: string
      NAME: string
      GAPI_CALENDAR_ID: string | null
      DESCRIPTION: string
      COLOR: string
      TEXT_COLOR: string | null
      EXPORT: { ALLOW: boolean; PATH: string; LINK: string }
      CAL_TYPE: string
      OWNER_ID: string
      CREATED_BY: string
      DATE_CREATE: string
      TIMESTAMP_X: string
      CAL_DAV_CON: number | string | false | null
      SYNC_TOKEN: string | null
      PAGE_TOKEN: string | null
      EXTERNAL_TYPE: string
      ACCESS?: Record<string, number>
      IS_COLLAB: boolean
      PERM: {
        view_time: boolean
        view_title: boolean
        view_full: boolean
        add: boolean
        edit: boolean
        edit_section: boolean
        access: boolean
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CalendarSection[]>({
        method: 'calendar.section.get',
        params: {
          type: 'user',
          ownerId: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sections count:', result.length, 'first section:', result[0])
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
      async function getCalendarSections() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.section.get',
            params: {
              type: 'user',
              ownerId: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Sections count:', result.length, 'first section:', result[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCalendarSections)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.section.get(
            type="user",
            owner_id=1,
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
                'calendar.section.get',
                [
                    'type'    => 'user',
                    'ownerId' => 1
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Дальше обработайте $result в своем коде

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting calendar section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.section.get',
        {
            type: 'user',
            ownerId: 1
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.section.get',
        [
            'type' => 'user',
            'ownerId' => 1
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "calendar.section.get", b24.Params{
    	"type":    "user",
    	"ownerId": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("calendar.section.get: %w", err)
    }

    var sections []struct {
    	ID             string  `json:"ID"`
    	Name           string  `json:"NAME"`
    	GapiCalendarID *string `json:"GAPI_CALENDAR_ID"`
    	Description    string  `json:"DESCRIPTION"`
    	Color          string  `json:"COLOR"`
    	TextColor      *string `json:"TEXT_COLOR"`
    	Export         struct {
    		Allow bool   `json:"ALLOW"`
    		Path  string `json:"PATH"`
    		Link  string `json:"LINK"`
    	} `json:"EXPORT"`
    	CalType      string          `json:"CAL_TYPE"`
    	OwnerID      string          `json:"OWNER_ID"`
    	CreatedBy    string          `json:"CREATED_BY"`
    	DateCreate   string          `json:"DATE_CREATE"`
    	TimestampX   string          `json:"TIMESTAMP_X"`
    	CalDavCon    json.RawMessage `json:"CAL_DAV_CON"`
    	SyncToken    *string         `json:"SYNC_TOKEN"`
    	PageToken    *string         `json:"PAGE_TOKEN"`
    	ExternalType string          `json:"EXTERNAL_TYPE"`
    	Access       map[string]int  `json:"ACCESS"`
    	IsCollab     bool            `json:"IS_COLLAB"`
    	Perm         struct {
    		ViewTime    bool `json:"view_time"`
    		ViewTitle   bool `json:"view_title"`
    		ViewFull    bool `json:"view_full"`
    		Add         bool `json:"add"`
    		Edit        bool `json:"edit"`
    		EditSection bool `json:"edit_section"`
    		Access      bool `json:"access"`
    	} `json:"PERM"`
    }
    if err := json.Unmarshal(res.Result, &sections); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("календарей:", len(sections))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Первый элемент массива показан полностью, второй — сокращенно.

```json
{
    "result": [
        {
            "ID": "190",
            "NAME": "New Section",
            "GAPI_CALENDAR_ID": null,
            "DESCRIPTION": "Description for section",
            "COLOR": "#9cbeee",
            "TEXT_COLOR": "#283000",
            "EXPORT": {
                "ALLOW": true,
                "PATH": "https://example.bitrix24.ru/company/personal/user/1/calendar/",
                "LINK": "&type=user&owner=1&ncc=1&user=1&sec_id=190&sign=704a559a691722ae080fa420dcb9d7f8&bx_hit_hash=e7A0WxIDCc1ZVozSP9S6CsxsqXG5efsL"
            },
            "CAL_TYPE": "user",
            "OWNER_ID": "1",
            "CREATED_BY": "1",
            "DATE_CREATE": "2024-12-10 06:36:00",
            "TIMESTAMP_X": "2024-12-10 06:36:00",
            "CAL_DAV_CON": null,
            "SYNC_TOKEN": null,
            "PAGE_TOKEN": null,
            "EXTERNAL_TYPE": "local",
            "ACCESS": {
                "D114": 17,
                "G2": 13,
                "U2": 15,
                "U1": 19
            },
            "IS_COLLAB": false,
            "PERM": {
                "view_time": true,
                "view_title": true,
                "view_full": true,
                "add": true,
                "edit": true,
                "edit_section": true,
                "access": true
            }
        },
        {
            "ID": "191",
            "NAME": "Work Section",
            "CAL_TYPE": "user",
            "OWNER_ID": "1",
            "IS_COLLAB": false
        }
    ],
    "time": {
        "start": 1733824626.418185,
        "finish": 1733824626.650208,
        "duration": 0.23202300071716309,
        "processing": 0.0054471492767333984,
        "date_start": "2024-12-10T09:57:06+00:00",
        "date_finish": "2024-12-10T09:57:06+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив календарей [(подробное описание)](#calendar-section) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса. Поле верхнего уровня ответа, к элементам массива `result` не относится ||
|#

#### Объект календаря {#calendar-section}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор календаря ||
|| **NAME**
[`string`](../data-types.md) | Название календаря ||
|| **GAPI_CALENDAR_ID**
[`string`](../data-types.md) | Идентификатор календаря Google для синхронизации. Может быть `null`, если синхронизация не настроена ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание календаря ||
|| **COLOR**
[`string`](../data-types.md) | Цвет календаря в формате `#RRGGBB` ||
|| **TEXT_COLOR**
[`string`](../data-types.md) | Цвет текста в календаре в формате `#RRGGBB`. Может быть `null`, если цвет не задан: так приходит календарь, созданный автоматически ||
|| **EXPORT**
[`object`](../data-types.md) | Объект с параметрами экспорта календаря [(подробное описание)](#export) ||
|| **CAL_TYPE**
[`string`](../data-types.md) | Тип календаря ||
|| **OWNER_ID**
[`string`](../data-types.md) | Идентификатор владельца календаря.

Правила по типам:
- `user` — идентификатор пользователя
- `group` — идентификатор группы
- `company_calendar` — `0`
- `location` — `0` ||
|| **CREATED_BY**
[`string`](../data-types.md) | Идентификатор создателя календаря ||
|| **DATE_CREATE**
[`string`](../data-types.md) | Дата создания календаря строкой, например `2024-12-10 06:36:00` ||
|| **TIMESTAMP_X**
[`string`](../data-types.md) | Дата изменения календаря строкой, например `2024-12-10 06:36:00` ||
|| **CAL_DAV_CON**
[```integer|boolean|string```](../data-types.md) | Идентификатор подключения CalDAV. Значение зависит от типа календаря:
- для календаря пользователя — число, если подключение существует, `false`, если подключение удалено, `null`, если синхронизация не настроена
- для календарей остальных типов — всегда `false` ||
|| **SYNC_TOKEN**
[`string`](../data-types.md) | Токен синхронизации календаря. Может быть `null`, если синхронизация не настроена ||
|| **PAGE_TOKEN**
[`string`](../data-types.md) | Токен постраничной синхронизации календаря. Может быть `null`, если синхронизация не настроена ||
|| **EXTERNAL_TYPE**
[`string`](../data-types.md) | Тип провайдера для синхронизации. Для локального календаря — `local` ||
|| **ACCESS**
[`object`](../data-types.md) | Объект данных доступа к календарю.

Поле приходит для всех календарей, которые вернул метод. Исключение — пользователи коллаб без права управлять доступом к календарю: им поле не приходит.

Ключ объекта — код объекта, которому выдан доступ: `U<id>` — пользователь, `G<id>` — группа пользователей, `D<id>` — отдел. Для календаря группы код обозначает роль в группе: `SG<id>_A` — владелец группы, `SG<id>_E` — модераторы, `SG<id>_K` — все участники. Значение — числовой идентификатор разрешения на право доступа. Получить название прав доступа можно методом [access.name](../common/system/access-name.md). Определить права доступа для текущего пользователя — методом [user.access](../common/users/user-access.md).

Идентификаторы разрешения на право доступа отличаются в разных Битрикс24. Узнать все идентификаторы может только администратор коробочной версии Битрикс24 ||
|| **IS_COLLAB**
[`boolean`](../data-types.md) | Флаг принадлежности календаря к коллабе ||
|| **PERM**
[`object`](../data-types.md) | Объект прав доступа текущего пользователя к календарю [(подробное описание)](#perm). Поле приходит всегда: календари без права просмотра времени событий метод не возвращает ||
|#

#### Объект EXPORT {#export}

#|
|| **Название**
`тип` | **Описание** ||
|| **ALLOW**
[`boolean`](../data-types.md) | Экспорт календаря разрешен. В ответе всегда `true` ||
|| **PATH**
[`string`](../data-types.md) | Полный адрес календаря в Битрикс24, например `https://example.bitrix24.ru/company/personal/user/1/calendar/` ||
|| **LINK**
[`string`](../data-types.md) | Подписанные параметры ссылки на экспорт: строка запроса с `sec_id`, `sign` и `bx_hit_hash`, которую добавляют к адресу календаря. Сама по себе не является ссылкой ||
|#

Поле `SET` с периодом экспорта метод не возвращает: значение `export.SET`, переданное в [calendar.section.add](./calendar-section-add.md), не сохраняется, период экспорта всегда `all`.

#### Объект PERM {#perm}

#|
|| **Название**
`тип` | **Описание** ||
|| **view_time**
[`boolean`](../data-types.md) | Просмотр времени событий календаря ||
|| **view_title**
[`boolean`](../data-types.md) | Просмотр названия событий календаря ||
|| **view_full**
[`boolean`](../data-types.md) | Полный доступ к информации о событии календаря ||
|| **add**
[`boolean`](../data-types.md) | Добавление событий в календарь ||
|| **edit**
[`boolean`](../data-types.md) | Редактирование событий в календаре ||
|| **edit_section**
[`boolean`](../data-types.md) | Редактирование календаря ||
|| **access**
[`boolean`](../data-types.md) | Полный доступ к календарю ||
|#

Значения `PERM` описывают права текущего пользователя на этот календарь, поэтому часть из них может быть `false`. Например, у календаря другого пользователя без выданных прав: `view_time` равно `true`, а `add`, `edit`, `edit_section` и `access` — `false`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр \"type\" для метода \"calendar.section.get\""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Не задан обязательный параметр "type" для метода "calendar.section.get" | Не передан обязательный параметр `type` ||
|| `400` | Пустое значение | Не задан обязательный параметр "ownerId" для метода "calendar.section.get" | Не передан обязательный параметр `ownerId` и параметр `type` не равен `user` ||
|| `400` | Пустое значение | Доступ запрещен | Метод недоступен экстранет-пользователям ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-section-add.md)
- [{#T}](./calendar-section-update.md)
- [{#T}](./calendar-section-delete.md)
