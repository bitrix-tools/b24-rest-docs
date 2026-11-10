# Поиск по истории уведомлений im.notify.history.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.history.search` ищет уведомления текущего пользователя по тексту, типу, дате и автору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SEARCH_TEXT**
[`string`](../../data-types.md) | Текст для поиска в тексте уведомления. Регистр не учитывается.

Если других фильтров нет, длина без учета пробелов по краям — от `3` символов ||
|| **SEARCH_TYPE**
[`string`](../../data-types.md) | Тип уведомления в формате `MODULE` или ```MODULE|EVENT```, например `calendar` или ```calendar|change```. Коды типов возвращает метод [im.notify.schema.get](./im-notify-schema-get.md).

Не учитывается, если передан `SEARCH_TYPES` ||
|| **SEARCH_TYPES**
[`array`](../../data-types.md) | Массив типов уведомлений, например `["calendar", "tasks"]`.

Если в массиве один элемент, допустим формат ```MODULE|EVENT```. Если элементов несколько, передавайте только коды модулей `MODULE`: значения ```MODULE|EVENT``` в этом случае ничего не находят ||
|| **SEARCH_DATE**
[`datetime`](../../data-types.md) | Дата и время в формате RFC 3339, например `2026-11-10T00:00:00+03:00`. Метод найдет уведомления, созданные в течение 24 часов от этого момента.

Не учитывается, если переданы `SEARCH_DATE_FROM` и `SEARCH_DATE_TO` ||
|| **SEARCH_DATE_FROM**
[`datetime`](../../data-types.md) | Начало периода в формате RFC 3339. Передавайте вместе с `SEARCH_DATE_TO`.

Если передать только `SEARCH_DATE_FROM` без других фильтров, метод вернет пустой массив `result` ||
|| **SEARCH_DATE_TO**
[`datetime`](../../data-types.md) | Конец периода в формате RFC 3339. Передавайте вместе с `SEARCH_DATE_FROM`. Метод добавляет к значению 24 часа: при `2026-11-10T00:00:00+03:00` в выборку попадут уведомления за 10 ноября ||
|| **SEARCH_AUTHORS**
[`array`](../../data-types.md) | Массив идентификаторов авторов уведомлений, например `[1, 15]`. Значение `0` выбирает системные уведомления.

Получить идентификаторы пользователей можно методом [user.get](../../user/user-get.md) ||
|| **GROUP_TAG**
[`string`](../../data-types.md) | Группа уведомлений для дополнительной фильтрации. Допустимые значения:
- `confirm` — уведомления, которые требуют подтверждения
- `mention` — упоминания
- `admin` — уведомления для администратора
- числовой идентификатор пользовательской группы уведомлений

Работает только вместе с другими фильтрами ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего уведомления на предыдущей странице — поле `id` последнего элемента массива `notifications`. Метод вернет уведомления с идентификатором меньше `LAST_ID`.

Для первой страницы не передавайте. Значение должно состоять только из цифр, иначе метод вернет ошибку `LAST_ID_STRING` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество уведомлений на странице. По умолчанию — `50`, максимум — `50`. Большее значение метод уменьшает до `50`.

Не передавайте `0` и отрицательные значения: метод вернет все найденные уведомления без ограничения ||
|| **CONVERT_TEXT**
[`string`](../../data-types.md) | Метод принимает параметр, но не учитывает его ||
|#

{% note info "" %}

Передайте хотя бы один фильтр: `SEARCH_TEXT` длиной от `3` символов, `SEARCH_TYPE`, `SEARCH_TYPES`, `SEARCH_DATE`, `SEARCH_AUTHORS` или пару `SEARCH_DATE_FROM` и `SEARCH_DATE_TO`. Иначе метод вернет ошибку `SEARCH_TEXT_ERROR`. Несколько фильтров объединяются условием И.

{% endnote %}

### Как получить все результаты поиска {#pagination}

Метод сортирует уведомления по убыванию даты создания, затем по убыванию `id`.

1. Запросите первую страницу без `LAST_ID`. В ответе будет поле `total_results` — общее количество найденных уведомлений
2. Для следующей страницы передайте те же фильтры и `LAST_ID` = `id` последнего элемента массива `notifications`. На этих страницах поля `total_results` нет
3. Повторяйте шаг 2, пока метод не вернет меньше уведомлений, чем `LIMIT`

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SEARCH_TEXT":"счет","SEARCH_TYPE":"rest|rest_notify","SEARCH_DATE_FROM":"2026-11-01T00:00:00+03:00","SEARCH_DATE_TO":"2026-11-10T00:00:00+03:00","LIMIT":20}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.history.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SEARCH_TEXT":"счет","SEARCH_TYPE":"rest|rest_notify","SEARCH_DATE_FROM":"2026-11-01T00:00:00+03:00","SEARCH_DATE_TO":"2026-11-10T00:00:00+03:00","LIMIT":20,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.history.search
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    // total_results is returned only on the first page (without LAST_ID)
    type NotifyHistorySearchResult = {
      chat_id: number
      notifications: Array<{
        id: number
        chat_id: number
        author_id: number
        date: ISODate
        notify_type: number
        notify_module: string
        notify_event: string
        notify_tag: string
        notify_sub_tag: string
        notify_title: string
        setting_name: string
        text: string
        params: object | null
        notify_read: 'Y' | 'N'
        notify_buttons?: string
      }>
      users: Array<{
        id: number
        active: boolean
        name: string
        first_name: string
        last_name: string
        work_position: string | null
        color: string
        avatar: string
        avatar_hr: string
        gender: 'M' | 'F'
        birthday: string
        extranet: boolean
        network: boolean
        bot: boolean
        connector: boolean
        external_auth_id: string
        internal_account: boolean
        intranet_user: boolean
        status: string
        idle: false
        last_activity_date: ISODate | false
        mobile_last_date: false
        desktop_last_date: false
        absent: ISODate | false
        departments: number[]
        phones: Record<string, string> | false
        bot_data: object | null
        type: string
        website: string
        email: string
      }>
      total_results?: number
    }

    try {
      const response = await $b24.actions.v2.call.make<NotifyHistorySearchResult>({
        method: 'im.notify.history.search',
        params: {
          SEARCH_TEXT: 'счет',
          SEARCH_TYPE: 'rest|rest_notify',
          SEARCH_DATE_FROM: '2026-11-01T00:00:00+03:00',
          SEARCH_DATE_TO: '2026-11-10T00:00:00+03:00',
          LIMIT: 20,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Found:', result.total_results, 'On page:', result.notifications.length)

        // Pass the id of the last notification as LAST_ID to get the next page
        const last = result.notifications.at(-1)
        if (last && result.notifications.length === 20) {
          console.info('Next page LAST_ID:', last.id)
        }
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
      async function searchNotifyHistory() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.notify.history.search',
            params: {
              SEARCH_TEXT: 'счет',
              SEARCH_TYPE: 'rest|rest_notify',
              SEARCH_DATE_FROM: '2026-11-01T00:00:00+03:00',
              SEARCH_DATE_TO: '2026-11-10T00:00:00+03:00',
              LIMIT: 20,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Found:', result.total_results, 'On page:', result.notifications.length)

          // Pass the id of the last notification as LAST_ID to get the next page
          const last = result.notifications.at(-1)
          if (last && result.notifications.length === 20) {
            console.info('Next page LAST_ID:', last.id)
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchNotifyHistory)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.notify.history.search(
            search_text="счет",
            search_type="rest|rest_notify",
            search_date_from="2026-11-01T00:00:00+03:00",
            search_date_to="2026-11-10T00:00:00+03:00",
            limit=20,
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
        $response = $b24Service->core->call(
            'im.notify.history.search',
            [
                'SEARCH_TEXT' => 'счет',
                'SEARCH_TYPE' => 'rest|rest_notify',
                'SEARCH_DATE_FROM' => '2026-11-01T00:00:00+03:00',
                'SEARCH_DATE_TO' => '2026-11-10T00:00:00+03:00',
                'LIMIT' => 20,
            ]
        );

        $result = $response->getResponseData()->getResult();

        print_r($result);
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.history.search',
        {
            SEARCH_TEXT: 'счет',
            SEARCH_TYPE: 'rest|rest_notify',
            SEARCH_DATE_FROM: '2026-11-01T00:00:00+03:00',
            SEARCH_DATE_TO: '2026-11-10T00:00:00+03:00',
            LIMIT: 20,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.notify.history.search',
        [
            'SEARCH_TEXT' => 'счет',
            'SEARCH_TYPE' => 'rest|rest_notify',
            'SEARCH_DATE_FROM' => '2026-11-01T00:00:00+03:00',
            'SEARCH_DATE_TO' => '2026-11-10T00:00:00+03:00',
            'LIMIT' => 20,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.notify.history.search", b24.Params{
    	"SEARCH_TEXT":      "счет",
    	"SEARCH_TYPE":      "rest|rest_notify",
    	"SEARCH_DATE_FROM": "2026-11-01T00:00:00+03:00",
    	"SEARCH_DATE_TO":   "2026-11-10T00:00:00+03:00",
    	"LIMIT":            20,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("im.notify.history.search: %w", err)
    }

    var item struct {
    	ChatID        int `json:"chat_id"`
    	TotalResults  int `json:"total_results"`
    	Notifications []struct {
    		ID   int    `json:"id"`
    		Text string `json:"text"`
    	} `json:"notifications"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.TotalResults, len(item.Notifications))

    // id последнего уведомления передайте в LAST_ID для следующей страницы
    if n := len(item.Notifications); n == 20 {
    	fmt.Println("LAST_ID:", item.Notifications[n-1].ID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "chat_id": 2535,
        "notifications": [
            {
                "id": 44021,
                "chat_id": 2535,
                "author_id": 15,
                "date": "2026-11-10T16:37:49+03:00",
                "notify_type": 2,
                "notify_module": "rest",
                "notify_event": "rest_notify",
                "notify_tag": "",
                "notify_sub_tag": "",
                "notify_title": "",
                "setting_name": "rest|rest_notify",
                "text": "Проверьте счет [B]№ 42[/B]",
                "params": null,
                "notify_read": "N"
            }
        ],
        "users": [
            {
                "id": 15,
                "active": true,
                "name": "Иван Петров",
                "first_name": "Иван",
                "last_name": "Петров",
                "work_position": null,
                "color": "#58cc47",
                "avatar": "https://cdn-ru.bitrix24.ru/b1234567/main/avatar.png",
                "avatar_hr": "https://cdn-ru.bitrix24.ru/b1234567/main/avatar.png",
                "gender": "M",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "internal_account": true,
                "intranet_user": false,
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-11-10T16:36:42+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [],
                "phones": {
                    "personal_mobile": "79001234567"
                },
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": ""
            }
        ],
        "total_results": 1
    },
    "time": {
        "start": 1794317871,
        "finish": 1794317871.341717,
        "duration": 0.341717004776001,
        "processing": 0,
        "date_start": "2026-11-10T16:37:51+03:00",
        "date_finish": "2026-11-10T16:37:51+03:00",
        "operating_reset_at": 1794318420,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатами поиска [(подробное описание)](#result-object).

Если у пользователя еще нет системного чата уведомлений или передан только `SEARCH_DATE_FROM` либо только `SEARCH_DATE_TO`, метод вернет пустой массив `[]` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений пользователя ||
|| **notifications**
[`array`](../../data-types.md) | Массив найденных уведомлений на странице [(подробное описание)](#notification-object). Если ничего не найдено — пустой массив ||
|| **users**
[`array`](../../data-types.md) | Массив авторов найденных уведомлений [(подробное описание)](#user-object). В массив не попадают системные уведомления с `author_id` = `0` ||
|| **total_results**
[`integer`](../../data-types.md) | Общее количество найденных уведомлений. Есть только в ответе на запрос без `LAST_ID` ||
|#

#### Объект notification {#notification-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор уведомления. Используйте `id` последнего элемента как `LAST_ID` для следующей страницы ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений пользователя ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора уведомления. Для системных уведомлений — `0` ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время создания уведомления ||
|| **notify_type**
[`integer`](../../data-types.md) | Тип уведомления. Возможные значения:
- `1` — уведомление с кнопками, требует подтверждения
- `2` — персональное уведомление от пользователя
- `4` — системное уведомление ||
|| **notify_module**
[`string`](../../data-types.md) | Идентификатор модуля, который отправил уведомление ||
|| **notify_event**
[`string`](../../data-types.md) | Код события уведомления ||
|| **notify_tag**
[`string`](../../data-types.md) | Тег уведомления или пустая строка ||
|| **notify_sub_tag**
[`string`](../../data-types.md) | Дополнительный тег уведомления или пустая строка ||
|| **notify_title**
[`string`](../../data-types.md) | Заголовок уведомления или пустая строка ||
|| **setting_name**
[`string`](../../data-types.md) | Код типа уведомления в формате ```MODULE|EVENT```. Список кодов возвращает метод [im.notify.schema.get](./im-notify-schema-get.md) ||
|| **text**
[`string`](../../data-types.md) | Текст уведомления. Форматирование передается BB-кодами, например `[B]...[/B]` ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры уведомления, например вложение `ATTACH`, или `null` ||
|| **notify_read**
[`string`](../../data-types.md) | Статус прочтения уведомления. Возможные значения: `Y` — прочитано, `N` — не прочитано ||
|| **notify_buttons**
[`string`](../../data-types.md) | JSON-строка с кнопками уведомления. Поле есть только у уведомлений с `notify_type` = `1` ||
|#

#### Объект user {#user-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Признак активности пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../data-types.md) | Должность пользователя или `null` ||
|| **color**
[`string`](../../data-types.md) | Цвет пользователя в формате hex ||
|| **avatar**
[`string`](../../data-types.md) | Ссылка на аватар или пустая строка ||
|| **avatar_hr**
[`string`](../../data-types.md) | Ссылка на аватар высокого разрешения или пустая строка ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя. Возможные значения: `M` — мужской, `F` — женский ||
|| **birthday**
[`string`](../../data-types.md) | День рождения в формате `DD-MM` или пустая строка ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак внешнего пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Битрикс24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Код внешней авторизации ||
|| **internal_account**
[`boolean`](../../data-types.md) | Признак внутренней учетной записи: `external_auth_id` не относится к внешним типам авторизации ||
|| **intranet_user**
[`boolean`](../../data-types.md) | Признак сотрудника: у пользователя есть подразделение и внутренняя учетная запись ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя ||
|| **idle**
[`boolean`](../../data-types.md) | В этом методе всегда `false` ||
|| **last_activity_date**
[`datetime`](../../data-types.md) | Дата последней активности пользователя или `false` ||
|| **mobile_last_date**
[`boolean`](../../data-types.md) | В этом методе всегда `false` ||
|| **desktop_last_date**
[`boolean`](../../data-types.md) | В этом методе всегда `false` ||
|| **absent**
[`datetime`](../../data-types.md) | Дата окончания отсутствия пользователя или `false` ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя [(подробное описание)](#phones) или `false`, если телефонов нет ||
|| **bot_data**
[`object`](../../data-types.md) | Данные бота или `null` ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя. Возможные значения: `user`, `bot`, `extranet`, `collaber`, `guest` ||
|| **website**
[`string`](../../data-types.md) | Сайт пользователя ||
|| **email**
[`string`](../../data-types.md) | Email пользователя ||
|#

#### Объект phones {#phones}

В объекте есть только заполненные телефоны.

#|
|| **Название**
`тип` | **Описание** ||
|| **work_phone**
[`string`](../../data-types.md) | Рабочий телефон ||
|| **personal_mobile**
[`string`](../../data-types.md) | Мобильный телефон ||
|| **inner_phone**
[`string`](../../data-types.md) | Внутренний телефон ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SEARCH_TEXT_ERROR",
    "error_description": "SEARCH_TEXT can't be less then 3 symbols"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `SEARCH_TEXT_ERROR` | SEARCH_TEXT can't be less then 3 symbols | Не передан ни один фильтр, а `SEARCH_TEXT` не передан или короче `3` символов. Ошибка возникает и в том случае, если передан только `GROUP_TAG` ||
|| `400` | `LAST_ID_STRING` | Last notification ID can't be string | Значение `LAST_ID` содержит не только цифры, например `abc` или `-5` ||
|| `400` | `500` | Incorrect date/time: abc | Значение `SEARCH_DATE`, `SEARCH_DATE_FROM` или `SEARCH_DATE_TO` нельзя распознать как дату ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
