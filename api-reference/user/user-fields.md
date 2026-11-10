# Получить поля пользователя user.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.fields` возвращает коды и названия полей профиля пользователя: стандартных и пользовательских полей с префиксом `UF_USR_`.

{% note info "" %}

Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Какие поля доступны в каждой версии — в статье [Версии скоупа user](user-scope.md).

{% endnote %}

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.fields
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UserFieldsResult = {
      [field: string]: string
    }

    try {
      const response = await $b24.actions.v2.call.make<UserFieldsResult>({
        method: 'user.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User fields:', result)
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
      async function fetchUserFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('User fields:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchUserFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.fields().response
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
                'user.fields',
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
        "user.fields",
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
        'user.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.fields", b24.Params{}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.fields: %w", err)
    }

    // result — объект «код поля: название поля»
    var fields map[string]*string
    if err := json.Unmarshal(res.Result, &fields); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for code, title := range fields {
    	if title != nil {
    		fmt.Println(code, *title)
    	}
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "ID",
        "XML_ID": "Внешний код",
        "ACTIVE": "Активность",
        "NAME": "Имя",
        "LAST_NAME": "Фамилия",
        "SECOND_NAME": "Отчество",
        "TITLE": "Список пользователей",
        "EMAIL": "E-Mail",
        "LAST_LOGIN": "Последняя авторизация",
        "DATE_REGISTER": "Дата регистрации",
        "TIME_ZONE": "TIME_ZONE",
        "IS_ONLINE": "IS_ONLINE",
        "TIMESTAMP_X": "TIMESTAMP_X",
        "LAST_ACTIVITY_DATE": "LAST_ACTIVITY_DATE",
        "PERSONAL_GENDER": "Пол",
        "PERSONAL_PROFESSION": "Профессия",
        "PERSONAL_WWW": "Домашняя страничка",
        "PERSONAL_BIRTHDAY": "Дата рождения",
        "PERSONAL_PHOTO": "Фотография",
        "PERSONAL_ICQ": "ICQ",
        "PERSONAL_PHONE": "Личный телефон",
        "PERSONAL_FAX": "Факс",
        "PERSONAL_MOBILE": "Личный мобильный",
        "PERSONAL_PAGER": "Пейджер",
        "PERSONAL_STREET": "Улица проживания",
        "PERSONAL_CITY": "Город проживания",
        "PERSONAL_STATE": "Область / край",
        "PERSONAL_ZIP": "Почтовый индекс",
        "PERSONAL_COUNTRY": "Страна",
        "PERSONAL_MAILBOX": "Почтовый ящик",
        "PERSONAL_NOTES": "Дополнительные заметки",
        "WORK_PHONE": "Телефон компании",
        "WORK_COMPANY": "Компания",
        "WORK_POSITION": "Должность",
        "WORK_DEPARTMENT": "Отдел",
        "WORK_WWW": "Сайт компании",
        "WORK_FAX": "WORK_FAX",
        "WORK_PAGER": "WORK_PAGER",
        "WORK_STREET": "WORK_STREET",
        "WORK_MAILBOX": "WORK_MAILBOX",
        "WORK_CITY": "Город работы",
        "WORK_STATE": "WORK_STATE",
        "WORK_ZIP": "WORK_ZIP",
        "WORK_COUNTRY": "WORK_COUNTRY",
        "WORK_PROFILE": "WORK_PROFILE",
        "WORK_LOGO": "WORK_LOGO",
        "WORK_NOTES": "WORK_NOTES",
        "UF_SKYPE_LINK": "Ссылка на чат в Skype",
        "UF_ZOOM": "Zoom",
        "UF_EMPLOYMENT_DATE": "Дата принятия на работу",
        "UF_TIMEMAN": "Учет рабочего времени",
        "UF_DEPARTMENT": "Подразделения",
        "UF_INTERESTS": "Интересы",
        "UF_SKILLS": "Навыки",
        "UF_WEB_SITES": "Другие сайты",
        "UF_XING": "Xing",
        "UF_LINKEDIN": "LinkedIn",
        "UF_FACEBOOK": "Facebook",
        "UF_TWITTER": "Twitter",
        "UF_SKYPE": "Microsoft Teams",
        "UF_DISTRICT": "Район",
        "UF_PHONE_INNER": "Внутренний телефон",
        "UF_USR_1623996826645": "Подпись",
        "USER_TYPE": "USER_TYPE"
    },
    "time": {
        "start": 1793286069,
        "finish": 1793286069.582253,
        "duration": 0.5822529792785645,
        "processing": 0,
        "date_start": "2026-10-29T18:01:09+03:00",
        "date_finish": "2026-10-29T18:01:09+03:00",
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
[`object`](../data-types.md) | Объект вида `{"код поля": "название поля"}`, все значения — строки. Вызовите метод перед `select` в [user.get](./user-get.md) или записью в [user.update](./user-update.md), чтобы узнать коды полей, доступные в текущей версии скоупа.

Содержит стандартные поля профиля, которые разрешены версией скоупа — список по версиям в статье [Версии скоупа user](user-scope.md). Типы и описания стандартных полей — в таблице [полей пользователя](user-current.md#user-fields).

Пользовательские поля с префиксом `UF_USR_` возвращаются с названием, заданным при создании поля.

Названия берутся из интерфейса Битрикс24 и могут не совпадать с назначением поля. Например, у поля `TITLE` (обращение) название «Список пользователей». У части стандартных полей нет локализованного названия, для них значение совпадает с кодом, например `"TIME_ZONE": "TIME_ZONE"` ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

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
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./userfields/index.md)
