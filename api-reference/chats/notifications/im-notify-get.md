# Получить уведомления im.notify.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.get` возвращает уведомления текущего пользователя постранично.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего уведомления на предыдущей странице — поле `id` последнего элемента массива `notifications`. Метод вернет уведомления с идентификатором меньше `LAST_ID`.

Для первой страницы не передавайте. Передавайте вместе с `LAST_TYPE`, иначе метод вернет ошибку `LAST_ID_AND_LAST_TYPE`. Значение должно состоять только из цифр, иначе метод вернет ошибку `LAST_ID_STRING` ||
|| **LAST_TYPE**
[`integer`](../../data-types.md) | Тип последнего уведомления на предыдущей странице. Допустимые значения:
- `1` — последнее уведомление требует подтверждения, его поле `notify_type` равно `1`
- `3` — последнее уведомление обычное, его поле `notify_type` равно `2` или `4`

Для первой страницы не передавайте. Передавайте вместе с `LAST_ID`.

Если передать `1`, когда последним было обычное уведомление, метод вернет обычные уведомления с начала списка, и они повторятся. При других значениях метод вернет пустой массив `notifications` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество уведомлений на странице. По умолчанию — `50`, максимум — `50`. Большее значение метод уменьшает до `50`.

Не передавайте `0` и отрицательные значения: метод не вернет обычные уведомления ||
|| **CONVERT_TEXT**
[`string`](../../data-types.md) | Метод принимает параметр, но не учитывает его ||
|#

### Как получить все уведомления {#pagination}

Метод сортирует уведомления по убыванию даты создания, затем по убыванию `id`. Сначала на страницу попадают уведомления, которые требуют подтверждения, затем метод добирает страницу обычными уведомлениями.

1. Запросите первую страницу без `LAST_ID` и `LAST_TYPE`
2. Возьмите последний элемент массива `notifications`. Передайте его `id` в `LAST_ID`. Если его `notify_type` равен `1`, передайте `LAST_TYPE` = `1`, иначе `LAST_TYPE` = `3`
3. Повторяйте шаг 2, пока метод не вернет меньше уведомлений, чем `LIMIT`

Ответ не содержит готового курсора следующей страницы: `LAST_ID` и `LAST_TYPE` вычисляйте по последнему элементу.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_ID":1500,"LAST_TYPE":3,"LIMIT":20}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_ID":1500,"LAST_TYPE":3,"LIMIT":20,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type NotificationItem = {
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
    }

    type UserItem = {
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
      idle: ISODate | false
      last_activity_date: ISODate | false
      mobile_last_date: ISODate | false
      desktop_last_date: ISODate | false
      absent: ISODate | false
      departments: number[]
      phones: Record<string, string> | false
      bot_data: object | null
      type: string
      website: string
      email: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    // total_count, total_unread_count and chat_id are absent when the user has no notifications
    type ImNotifyGetResult = {
      total_count?: number
      total_unread_count?: number
      chat_id?: number
      notifications: NotificationItem[]
      users: UserItem[]
    }

    try {
      const response = await $b24.actions.v2.call.make<ImNotifyGetResult>({
        method: 'im.notify.get',
        params: {
          LAST_ID: 1500,
          LAST_TYPE: 3,
          LIMIT: 20,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Notifications on page:', result.notifications.length)

        // Cursor for the next page is built from the last notification
        const last = result.notifications.at(-1)
        if (last && result.notifications.length === 20) {
          console.info('Next page:', { LAST_ID: last.id, LAST_TYPE: last.notify_type === 1 ? 1 : 3 })
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
      async function getNotifications() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.notify.get',
            params: {
              LAST_ID: 1500,
              LAST_TYPE: 3,
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
          console.info('Notifications on page:', result.notifications.length)

          // Cursor for the next page is built from the last notification
          const last = result.notifications.at(-1)
          if (last && result.notifications.length === 20) {
            console.info('Next page:', { LAST_ID: last.id, LAST_TYPE: last.notify_type === 1 ? 1 : 3 })
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getNotifications)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.notify.get(
            last_id=1500,
            last_type=3,
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
            'im.notify.get',
            [
                'LAST_ID' => 1500,
                'LAST_TYPE' => 3,
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
        'im.notify.get',
        {
            LAST_ID: 1500,
            LAST_TYPE: 3,
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
        'im.notify.get',
        [
            'LAST_ID' => 1500,
            'LAST_TYPE' => 3,
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
    res, err := client.Core().Call(ctx, "im.notify.get", b24.Params{
    	"LAST_ID":   1500,
    	"LAST_TYPE": 3,
    	"LIMIT":     20,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("im.notify.get: %w", err)
    }

    var item struct {
    	TotalCount       int `json:"total_count"`
    	TotalUnreadCount int `json:"total_unread_count"`
    	ChatID           int `json:"chat_id"`
    	Notifications    []struct {
    		ID         int    `json:"id"`
    		NotifyType int    `json:"notify_type"`
    		Text       string `json:"text"`
    	} `json:"notifications"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.TotalCount, item.TotalUnreadCount, len(item.Notifications))

    // Курсор следующей страницы строится по последнему уведомлению
    if n := len(item.Notifications); n == 20 {
    	last := item.Notifications[n-1]
    	lastType := 3
    	if last.NotifyType == 1 {
    		lastType = 1
    	}
    	fmt.Println("LAST_ID:", last.ID, "LAST_TYPE:", lastType)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "total_count": 34,
        "total_unread_count": 13,
        "chat_id": 2535,
        "notifications": [
            {
                "id": 1499,
                "chat_id": 2535,
                "author_id": 0,
                "date": "2026-11-10T16:30:11+03:00",
                "notify_type": 4,
                "notify_module": "rest",
                "notify_event": "rest_notify",
                "notify_tag": "",
                "notify_sub_tag": "",
                "notify_title": "",
                "setting_name": "rest|rest_notify",
                "text": "Счет [B]№ 42[/B] оплачен",
                "params": {
                    "ATTACH": [
                        {
                            "ID": 1794317528,
                            "BLOCKS": [
                                {
                                    "MESSAGE": "Сумма: 15 000 руб."
                                }
                            ],
                            "DESCRIPTION": "",
                            "COLOR": "#29619b",
                            "COLOR_TOKEN": "base"
                        }
                    ]
                },
                "notify_read": "N"
            },
            {
                "id": 1497,
                "chat_id": 2535,
                "author_id": 15,
                "date": "2026-11-10T16:29:54+03:00",
                "notify_type": 2,
                "notify_module": "rest",
                "notify_event": "rest_notify",
                "notify_tag": "",
                "notify_sub_tag": "",
                "notify_title": "",
                "setting_name": "rest|rest_notify",
                "text": "Проверьте договор до конца дня",
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
                "last_activity_date": "2026-11-10T16:28:38+03:00",
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
        ]
    },
    "time": {
        "start": 1794317458,
        "finish": 1794317458.62455,
        "duration": 0.6245501041412354,
        "processing": 0,
        "date_start": "2026-11-10T16:30:58+03:00",
        "date_finish": "2026-11-10T16:30:58+03:00",
        "operating_reset_at": 1794317940,
        "operating": 0.120635986328125
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с уведомлениями и их авторами [(подробное описание)](#result-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **total_count**
[`integer`](../../data-types.md) | Общее количество уведомлений пользователя ||
|| **total_unread_count**
[`integer`](../../data-types.md) | Количество непрочитанных уведомлений ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений пользователя ||
|| **notifications**
[`array`](../../data-types.md) | Массив уведомлений на странице [(подробное описание)](#notification-object) ||
|| **users**
[`array`](../../data-types.md) | Массив авторов уведомлений на странице [(подробное описание)](#users-object). В массив не попадают системные уведомления с `author_id` = `0` ||
|#

Если у пользователя нет уведомлений, `result` содержит только пустые массивы `notifications` и `users`.

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
- `4` — системное уведомление

Используйте значение последнего элемента, чтобы выбрать `LAST_TYPE` для следующей страницы ||
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

#### Объект users {#users-object}

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
    "error": "LAST_ID_AND_LAST_TYPE",
    "error_description": "Parameters LAST_ID and LAST_TYPE should be used together."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `LAST_ID_AND_LAST_TYPE` | Parameters LAST_ID and LAST_TYPE should be used together | Передан только один параметр из пары `LAST_ID` и `LAST_TYPE` ||
|| `400` | `LAST_ID_STRING` | Last notification ID can't be string | Значение `LAST_ID` содержит не только цифры, например `abc` или `-5` ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)
