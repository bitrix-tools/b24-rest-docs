# Зарегистрировать звонок в Битрикс24 telephony.externalCall.register

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.register` регистрирует внешний звонок в Битрикс24.

Для создания дела звонок необходимо также вызвать метод [telephony.externalCall.finish](./telephony-external-call-finish.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID***
[`integer`](../data-types.md) | Идентификатор пользователя, для которого регистрируется звонок.

Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| **USER_PHONE_INNER***
[`string`](../data-types.md) или [`string[]`](../data-types.md) | Внутренний номер пользователя или массив внутренних номеров. Если передан массив, пользователь ищется по любому из номеров. Если передан `USER_ID`, параметр не используется.

Внутренний номер можно получить методом [user.get](../user/user-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `USER_ID` или `USER_PHONE_INNER`

{% endnote %} ||
|| **PHONE_NUMBER***
[`string`](../data-types.md) | Номер телефона клиента ||
|| **TYPE***
[`integer`](../data-types.md) | Тип звонка.

Возможные значения:
- `1` — исходящий
- `2` — входящий
- `3` — входящий с перенаправлением
- `4` — обратный звонок
- `5` — информационный звонок ||
|| **CALL_START_DATE**
[`string`](../data-types.md) | Дата и время начала звонка в формате ISO-8601 с указанием часового пояса, например `2026-03-07T10:20:30+03:00`.

По умолчанию — текущее время на сервере ||
|| **CRM_CREATE**
[`integer`](../data-types.md) | Автоматическое создание объекта CRM, если по номеру не найден подходящий объект.

Возможные значения:
- `0` — не создавать
- `1` — создавать

Объект CRM не создается, если `PHONE_NUMBER` совпадает с внутренним номером сотрудника.

Параметр `CRM_AUTO_CREATE` внешней линии из методов [telephony.externalLine.add](./telephony-external-line-add.md) и [telephony.externalLine.update](./telephony-external-line-update.md) на этот метод не влияет. Он применяется, когда Битрикс24 сам регистрирует исходящий звонок при нажатии на номер в CRM.

По умолчанию — `0` ||
|| **CRM_SOURCE**
[`string`](../data-types.md) | Идентификатор источника CRM (значение поля `STATUS_ID`).

Список значений можно получить методом [crm.status.list](../crm/status/crm-status-list.md) с фильтром `ENTITY_ID: 'SOURCE'` ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта CRM, с которым нужно связать звонок.

Параметр работает только вместе с `CRM_ENTITY_ID`. Если один из параметров не передан, объект CRM ищется по `PHONE_NUMBER`.

Возможные значения:
- `CONTACT` — контакт
- `COMPANY` — компания
- `LEAD` — лид ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор объекта CRM из `CRM_ENTITY_TYPE`.

Идентификатор можно получить методами:
- [crm.contact.list](../crm/contacts/crm-contact-list.md)
- [crm.company.list](../crm/companies/crm-company-list.md)
- [crm.lead.list](../crm/leads/crm-lead-list.md) ||
|| **SHOW**
[`integer`](../data-types.md) | Показывать карточку звонка после регистрации.

Возможные значения:
- `0` — не показывать
- `1` — показывать

По умолчанию — `1` ||
|| **ADD_TO_CHAT**
[`integer`](../data-types.md) | Добавлять сообщение о звонке в чат сотрудника.

Параметр сейчас не влияет на результат метода. Добавлением сообщения о звонке в чат управляет параметр `ADD_TO_CHAT` метода [telephony.externalCall.finish](./telephony-external-call-finish.md) ||
|| **CALL_LIST_ID**
[`integer`](../data-types.md) | Идентификатор [списка обзвона](../crm/call-list/index.md), к которому привязывается звонок.

Параметр сейчас не влияет на результат метода ||
|| **LINE_NUMBER**
[`string`](../data-types.md) | Номер внешней линии.

Номер линии можно получить методом [telephony.externalLine.get](./telephony-external-line-get.md).

Если у приложения нет линии с таким номером, она создается автоматически без названия. Номер длиннее 50 символов обрезается.

Параметр не является обязательным, но рекомендуется передавать его всегда, особенно для входящих звонков, чтобы корректно работали привязка линии и отчеты/аналитика телефонии ||
|| **EXTERNAL_CALL_ID**
[`string`](../data-types.md) | Внешний идентификатор звонка на стороне АТС/интеграции.

Рекомендуется передавать уникальное значение для каждого физического звонка. Если незавершенный звонок с таким `EXTERNAL_CALL_ID` уже зарегистрирован, метод вернет его `CALL_ID` ||
|#

## Особенности повторной регистрации

Если метод `telephony.externalCall.register` вызывается повторно для того же звонка, Битрикс24 может вернуть уже существующий `CALL_ID` вместо создания новой регистрации.

Для поиска существующей регистрации используются технические параметры звонка:
- `PHONE_NUMBER`
- `TYPE`
- `USER_ID` или `USER_PHONE_INNER`
- `LINE_NUMBER` (если передан)
- `EXTERNAL_CALL_ID` (если передан)

Поиск выполняется в рамках приложения и только среди незавершенных звонков. После вызова [telephony.externalCall.finish](./telephony-external-call-finish.md) звонок в поиске не участвует.

Ограничение по времени зависит от `EXTERNAL_CALL_ID`:
- если параметр не передан, ищутся регистрации за последние 30 минут
- если параметр передан, ищется звонок с тем же `EXTERNAL_CALL_ID` без ограничения по времени

Если существующая регистрация найдена и `SHOW` не равен `0`, карточка звонка показывается снова.

Поля CRM и времени старта не используются как ключ дедупликации:
- `CRM_ENTITY_TYPE`
- `CRM_ENTITY_ID`
- `CALL_START_DATE`

Чтобы гарантированно зарегистрировать каждый физический звонок как отдельный, передавайте уникальный `EXTERNAL_CALL_ID` для каждого вызова на стороне АТС/интеграции.

{% note warning "" %}

В сценариях click-to-call, когда звонок создается самим Битрикс24, внутренний вызов регистрации выполняется без `EXTERNAL_CALL_ID`. Поэтому в статистике у таких звонков поле `EXTERNAL_CALL_ID` обычно пустое.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":1269,"PHONE_NUMBER":"79062195047","TYPE":2,"CRM_ENTITY_TYPE":"CONTACT","CRM_ENTITY_ID":797,"SHOW":1,"LINE_NUMBER":"3","EXTERNAL_CALL_ID":"asterisk-1710140185.18441"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.externalCall.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":1269,"PHONE_NUMBER":"79062195047","TYPE":2,"CRM_ENTITY_TYPE":"CONTACT","CRM_ENTITY_ID":797,"SHOW":1,"LINE_NUMBER":"3","EXTERNAL_CALL_ID":"asterisk-1710140185.18441","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.register
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ExternalCallRegisterResult = {
      CALL_ID: string
      CRM_CREATED_LEAD: number | null
      CRM_CREATED_ENTITIES: { ENTITY_TYPE: string; ENTITY_ID: number }[]
      CRM_ENTITY_TYPE: string | null
      CRM_ENTITY_ID: number | null
      LEAD_CREATION_ERROR?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<ExternalCallRegisterResult>({
        method: 'telephony.externalCall.register',
        params: {
          USER_ID: 1269,
          PHONE_NUMBER: '79062195047',
          TYPE: 2,
          CRM_ENTITY_TYPE: 'CONTACT',
          CRM_ENTITY_ID: 797,
          SHOW: 1,
          LINE_NUMBER: '3',
          EXTERNAL_CALL_ID: 'asterisk-1710140185.18441',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.CALL_ID, result.CRM_ENTITY_TYPE, result.CRM_ENTITY_ID)
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
      async function registerExternalCall() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'telephony.externalCall.register',
            params: {
              USER_ID: 1269,
              PHONE_NUMBER: '79062195047',
              TYPE: 2,
              CRM_ENTITY_TYPE: 'CONTACT',
              CRM_ENTITY_ID: 797,
              SHOW: 1,
              LINE_NUMBER: '3',
              EXTERNAL_CALL_ID: 'asterisk-1710140185.18441',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.CALL_ID, result.CRM_ENTITY_TYPE, result.CRM_ENTITY_ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', registerExternalCall)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.telephony.external_call.register(
            user_id=1269,
            phone_number="79062195047",
            call_type=2,
            crm_entity_type="CONTACT",
            crm_entity_id=797,
            show=1,
            line_number="3",
            external_call_id="asterisk-1710140185.18441",
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
                'telephony.externalCall.register',
                [
                    'USER_ID' => 1269,
                    'PHONE_NUMBER' => '79062195047',
                    'TYPE' => 2,
                    'CRM_ENTITY_TYPE' => 'CONTACT',
                    'CRM_ENTITY_ID' => 797,
                    'SHOW' => 1,
                    'LINE_NUMBER' => '3',
                    'EXTERNAL_CALL_ID' => 'asterisk-1710140185.18441'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering call: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.register",
        {
            USER_ID: 1269,
            PHONE_NUMBER: '79062195047',
            TYPE: 2,
            CRM_ENTITY_TYPE: 'CONTACT',
            CRM_ENTITY_ID: 797,
            SHOW: 1,
            LINE_NUMBER: '3',
            EXTERNAL_CALL_ID: 'asterisk-1710140185.18441'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.externalCall.register',
        [
            'USER_ID' => 1269,
            'PHONE_NUMBER' => '79062195047',
            'TYPE' => 2,
            'CRM_ENTITY_TYPE' => 'CONTACT',
            'CRM_ENTITY_ID' => 797,
            'SHOW' => 1,
            'LINE_NUMBER' => '3',
            'EXTERNAL_CALL_ID' => 'asterisk-1710140185.18441'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "telephony.externalCall.register", b24.Params{
    	"USER_ID":          1269,
    	"PHONE_NUMBER":     "79062195047",
    	"TYPE":             2,
    	"CRM_ENTITY_TYPE":  "CONTACT",
    	"CRM_ENTITY_ID":    797,
    	"SHOW":             1,
    	"LINE_NUMBER":      "3",
    	"EXTERNAL_CALL_ID": "asterisk-1710140185.18441",
    })
    if err != nil {
    	return fmt.Errorf("telephony.externalCall.register: %w", err)
    }

    var item struct {
    	CallID        string `json:"CALL_ID"`
    	CRMEntityType string `json:"CRM_ENTITY_TYPE"`
    	CRMEntityID   b24.ID `json:"CRM_ENTITY_ID"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.CallID, item.CRMEntityType)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "CALL_ID": "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
        "CRM_CREATED_LEAD": null,
        "CRM_CREATED_ENTITIES": [],
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 797
    },
    "time": {
        "start": 1773130778,
        "finish": 1773130779.120838,
        "duration": 1.120837926864624,
        "processing": 1,
        "date_start": "2026-03-10T11:19:38+03:00",
        "date_finish": "2026-03-10T11:19:39+03:00",
        "operating_reset_at": 1773131378,
        "operating": 0.22185301780700684
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../data-types.md) | Идентификатор звонка ||
|| **CRM_CREATED_LEAD**
[`integer`](../data-types.md) | Идентификатор автоматически созданного лида. `null`, если лид не создан ||
|| **CRM_CREATED_ENTITIES**
[`array`](../data-types.md) | Массив автоматически созданных объектов CRM [(подробное описание)](#result-crm-created-entities) ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип основного объекта CRM звонка. Пустая строка или `null`, если объект не найден ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор основного объекта CRM звонка. `null`, если объект не найден ||
|| **LEAD_CREATION_ERROR**
[`string`](../data-types.md) | Текст ошибки автосоздания лида. Возвращается, если лид создать не удалось ||
|#

#### Элемент массива CRM_CREATED_ENTITIES {#result-crm-created-entities}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../data-types.md) | Тип созданного объекта CRM ||
|| **ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор созданного объекта CRM ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "",
    "error_description": "Unknown TYPE"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не через OAuth-токен приложения и не через входящий вебхук, например из сессии браузера ||
|| `400` | Пустое значение | USER_ID or USER_PHONE_INNER should be set | Не переданы `USER_ID` и `USER_PHONE_INNER` ||
|| `400` | Пустое значение | Unknown TYPE | Передано недопустимое значение `TYPE` ||
|| `400` | Пустое значение | CALL_START_DATE should be in the ISO-8601 format | Некорректный формат `CALL_START_DATE` ||
|| `400` | Пустое значение | Unsupported phone number format | Некорректный формат `PHONE_NUMBER` ||
|| `400` | Пустое значение | User is not found or is not active | Пользователь не найден или неактивен ||
|| `400` | Пустое значение | Could not acquire external call registration lock | Не удалось заблокировать регистрацию звонка. Повторите запрос ||
|| `400` | Пустое значение | External call registration is already in progress | Параллельно выполняется регистрация такого же звонка. Повторите запрос ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-search-crm-entities.md)
- [{#T}](./telephony-external-call-show.md)
- [{#T}](./telephony-external-call-hide.md)
- [{#T}](./telephony-external-call-finish.md)
- [{#T}](./telephony-external-call-attach-record.md)
