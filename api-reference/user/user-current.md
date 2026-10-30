# Получить информацию о текущем пользователе user.current

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.current` возвращает профиль пользователя, чей токен использован в запросе: для сохраненного токена администратора это администратор, для токена из фрейма приложения — пользователь, который открыл приложение.

{% note info "" %}

Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Какие поля доступны в каждой версии — в статье [Версии скоупа user](user-scope.md).

{% endnote %}

## Параметры метода

Без параметров.

Чтобы узнать, какой пользователь открыл приложение во фрейме Битрикс24, вызовите метод с токеном `AUTH_ID` из запроса к приложению на домен `DOMAIN`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.current
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.current
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UserCurrentResult = {
      ID: string
      ACTIVE: boolean
      NAME: string
      LAST_NAME: string
      EMAIL: string
      LAST_LOGIN: ISODate | ''
      DATE_REGISTER: ISODate | ''
      IS_ONLINE: string
      LAST_ACTIVITY_DATE?: string
      PERSONAL_GENDER: string
      PERSONAL_BIRTHDAY: string
      WORK_POSITION: string
      UF_EMPLOYMENT_DATE: string
      UF_DEPARTMENT: number[]
    }

    try {
      const response = await $b24.actions.v2.call.make<UserCurrentResult>({
        method: 'user.current',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Current user:', result.ID, result.NAME, result.LAST_NAME)
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
      async function getCurrentUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.current',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Current user:', result.ID, result.NAME, result.LAST_NAME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCurrentUser)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.current().response
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
                'user.current',
                []
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
        "user.current",
        {},
        function(result)
        {
            if(result.error())
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
        'user.current',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.current", nil)
    if err != nil {
    	return fmt.Errorf("user.current: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Active    bool   `json:"ACTIVE"`
    	Name      string `json:"NAME"`
    	LastName  string `json:"LAST_NAME"`
    	Email     string `json:"EMAIL"`
    	LastLogin string `json:"LAST_LOGIN"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Active)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "1",
        "XML_ID": "10001",
        "ACTIVE": true,
        "NAME": "Иван",
        "LAST_NAME": "Иванов",
        "EMAIL": "ivanov@example.com",
        "LAST_LOGIN": "2026-10-29T15:13:52+03:00",
        "DATE_REGISTER": "2025-10-02T03:00:00+03:00",
        "TIME_ZONE": "Europe/Moscow",
        "IS_ONLINE": "Y",
        "TIMESTAMP_X": "10/27/2026 12:12:19 pm",
        "LAST_ACTIVITY_DATE": "2026-10-29 17:58:08",
        "PERSONAL_GENDER": "M",
        "PERSONAL_BIRTHDAY": "",
        "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b1/main/a1b/a1b2c3/avatar.png",
        "PERSONAL_MOBILE": "+79990000000",
        "WORK_POSITION": "Менеджер по продажам",
        "UF_EMPLOYMENT_DATE": "",
        "UF_DEPARTMENT": [
            1
        ],
        "UF_USR_USER_DEALS": false
    },
    "time": {
        "start": 1793286068,
        "finish": 1793286068.341957,
        "duration": 0.34195709228515625,
        "processing": 0,
        "date_start": "2026-10-29T18:01:08+03:00",
        "date_finish": "2026-10-29T18:01:08+03:00",
        "operating_reset_at": 1793286660,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Профиль пользователя [(подробное описание)](#user-fields) ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Поля пользователя {#user-fields}

Метод возвращает только поля, разрешенные версией скоупа, — список по версиям в статье [Версии скоупа user](user-scope.md). Поле со значением `null` в ответ не попадает, пустые строки возвращаются.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор пользователя. Число в виде строки ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний код пользователя ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Активен ли пользователь:
- `true` — работает
- `false` — уволен ||
|| **NAME**
[`string`](../data-types.md) | Имя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **TITLE**
[`string`](../data-types.md) | Обращение ||
|| **EMAIL**
[`string`](../data-types.md) | E-mail ||
|| **LAST_LOGIN**
[`string`](../data-types.md) | Дата и время последней авторизации в формате ISO 8601, например `2026-10-29T15:13:52+03:00` ||
|| **DATE_REGISTER**
[`string`](../data-types.md) | Дата регистрации в формате ISO 8601 ||
|| **TIME_ZONE**
[`string`](../data-types.md) | Часовой пояс пользователя, например `Europe/Moscow` ||
|| **IS_ONLINE**
[`string`](../data-types.md) | Пользователь в сети:
- `Y` — в сети
- `N` — не в сети ||
|| **TIMESTAMP_X**
[`string`](../data-types.md) | Дата и время последнего изменения профиля в формате сайта, например `10/27/2026 12:12:19 pm` ||
|| **LAST_ACTIVITY_DATE**
[`string`](../data-types.md) | Дата и время последней активности в формате `ГГГГ-ММ-ДД ЧЧ:ММ:СС` ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол:
- `M` — мужской
- `F` — женский
- пустая строка — не указан ||
|| **PERSONAL_PROFESSION**
[`string`](../data-types.md) | Профессия ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Личный сайт ||
|| **PERSONAL_BIRTHDAY**
[`string`](../data-types.md) | Дата рождения в формате ISO 8601. Пустая строка, если не указана ||
|| **PERSONAL_PHOTO**
[`string`](../data-types.md) | Ссылка на фотографию профиля ||
|| **PERSONAL_ICQ**
[`string`](../data-types.md) | ICQ ||
|| **PERSONAL_PHONE**
[`string`](../data-types.md) | Личный телефон ||
|| **PERSONAL_FAX**
[`string`](../data-types.md) | Личный факс ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Личный мобильный телефон ||
|| **PERSONAL_PAGER**
[`string`](../data-types.md) | Пейджер ||
|| **PERSONAL_STREET**
[`string`](../data-types.md) | Улица проживания ||
|| **PERSONAL_CITY**
[`string`](../data-types.md) | Город проживания ||
|| **PERSONAL_STATE**
[`string`](../data-types.md) | Область или край проживания ||
|| **PERSONAL_ZIP**
[`string`](../data-types.md) | Почтовый индекс проживания ||
|| **PERSONAL_COUNTRY**
[`string`](../data-types.md) | Код страны проживания. `0`, если страна не указана ||
|| **PERSONAL_MAILBOX**
[`string`](../data-types.md) | Почтовый ящик ||
|| **PERSONAL_NOTES**
[`string`](../data-types.md) | Дополнительные заметки ||
|| **WORK_PHONE**
[`string`](../data-types.md) | Рабочий телефон ||
|| **WORK_COMPANY**
[`string`](../data-types.md) | Компания ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность ||
|| **WORK_DEPARTMENT**
[`string`](../data-types.md) | Отдел — текстовое поле. Подразделения из структуры компании хранятся в `UF_DEPARTMENT` ||
|| **WORK_WWW**
[`string`](../data-types.md) | Сайт компании ||
|| **WORK_FAX**
[`string`](../data-types.md) | Рабочий факс ||
|| **WORK_PAGER**
[`string`](../data-types.md) | Рабочий пейджер ||
|| **WORK_STREET**
[`string`](../data-types.md) | Улица места работы ||
|| **WORK_MAILBOX**
[`string`](../data-types.md) | Рабочий почтовый ящик ||
|| **WORK_CITY**
[`string`](../data-types.md) | Город места работы ||
|| **WORK_STATE**
[`string`](../data-types.md) | Область или край места работы ||
|| **WORK_ZIP**
[`string`](../data-types.md) | Почтовый индекс места работы ||
|| **WORK_COUNTRY**
[`string`](../data-types.md) | Код страны места работы. `0`, если страна не указана ||
|| **WORK_PROFILE**
[`string`](../data-types.md) | Направление деятельности компании ||
|| **WORK_LOGO**
[`string`](../data-types.md) | Логотип компании ||
|| **WORK_NOTES**
[`string`](../data-types.md) | Заметки о месте работы ||
|| **UF_SKYPE_LINK**
[`string`](../data-types.md) | Ссылка на чат в Skype ||
|| **UF_ZOOM**
[`string`](../data-types.md) | Zoom ||
|| **UF_EMPLOYMENT_DATE**
[`string`](../data-types.md) | Дата приема на работу в формате ISO 8601. Пустая строка, если не указана ||
|| **UF_TIMEMAN**
[`string`](../data-types.md) | Включен ли учет рабочего времени для пользователя: `1` — включен, другое значение — выключен ||
|| **UF_DEPARTMENT**
[`integer[]`](../data-types.md) | Идентификаторы подразделений из структуры компании. Получить подразделения можно методом [department.get](../departments/department-get.md) ||
|| **UF_INTERESTS**
[`string`](../data-types.md) | Интересы ||
|| **UF_SKILLS**
[`string`](../data-types.md) | Навыки ||
|| **UF_WEB_SITES**
[`string`](../data-types.md) | Другие сайты ||
|| **UF_XING**
[`string`](../data-types.md) | Xing ||
|| **UF_LINKEDIN**
[`string`](../data-types.md) | LinkedIn ||
|| **UF_FACEBOOK**
[`string`](../data-types.md) | Facebook\* ||
|| **UF_TWITTER**
[`string`](../data-types.md) | Twitter ||
|| **UF_SKYPE**
[`string`](../data-types.md) | Microsoft Teams. Код поля сохранился от Skype ||
|| **UF_DISTRICT**
[`string`](../data-types.md) | Район ||
|| **UF_PHONE_INNER**
[`string`](../data-types.md) | Внутренний телефон ||
|| **USER_TYPE**
[`string`](../data-types.md) | Тип пользователя. Основные значения:
- `employee` — сотрудник
- `extranet` — внешний пользователь экстранета
- `email` — пользователь, который пишет из почты
- `bot` — чат-бот ||
|| **UF_USR_\***
`разные` | Пользовательские поля профиля. Тип значения зависит от типа поля: строка, число, массив или для файла объект с ключами `id`, `showUrl` и `downloadData`. Поля создают методы [user.userfield.*](./userfields/index.md) ||
|#

Поле `USER_TYPE` возвращают методы [user.get](./user-get.md) и [user.search](./user-search.md). Метод `user.current` это поле не возвращает.

\
**Принадлежит компании Meta Platforms, Inc., которая признана экстремистской и запрещена на территории Российской Федерации.*

## Обработка ошибок

HTTP-статус: **401**

```json
{
    "error": "INVALID_CREDENTIALS",
    "error_description": "Invalid request credentials"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

У метода нет параметров, поэтому собственных ошибок у него нет. Метод возвращает только системные ошибки, например:

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `401` | `INVALID_CREDENTIALS` | Invalid request credentials | Неверный код вебхука или токен авторизации ||
|| `401` | `insufficient_scope` | The request requires higher privileges than provided by the webhook token | У вебхука или приложения нет ни одной версии скоупа: `user`, `user_basic` или `user_brief` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)
- [{#T}](../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md)