# Получить поля пользователя user.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.fields` позволяет получить список названий полей пользователя. Метод отдаёт стандартный список полей, использование пользовательских полей не предусмотрено.

{% note info "" %}

Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Подробности о доступе к данным пользователей можно узнать в [статье](index.md).

{% endnote %}

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
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/user.fields
    ```

- TS

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

- UMD

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
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching user fields: ' . $e->getMessage();
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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
    {
        "result":{
            "ID":"ID",
            "XML_ID":"Внешний код",
            "ACTIVE":"Активность",
            "NAME":"Имя",
            "LAST_NAME":"Фамилия",
            "SECOND_NAME":"Отчество",
            "TITLE":"Список пользователей",
            "EMAIL":"E-Mail",
            "LAST_LOGIN":"Последняя авторизация",
            "DATE_REGISTER":"Дата регистрации",
            "TIME_ZONE":"TIME_ZONE",
            "IS_ONLINE":"IS_ONLINE",
            "TIMESTAMP_X":"TIMESTAMP_X",
            "LAST_ACTIVITY_DATE":"LAST_ACTIVITY_DATE",
            "PERSONAL_GENDER":"Пол",
            "PERSONAL_PROFESSION":"Профессия",
            "PERSONAL_WWW":"Домашняя страничка",
            "PERSONAL_BIRTHDAY":"Дата рождения",
            "PERSONAL_PHOTO":"Фотография",
            "PERSONAL_ICQ":"ICQ",
            "PERSONAL_PHONE":"Личный телефон",
            "PERSONAL_FAX":"Факс",
            "PERSONAL_MOBILE":"Личный мобильный",
            "PERSONAL_PAGER":"Пейджер",
            "PERSONAL_STREET":"Улица проживания",
            "PERSONAL_CITY":"Город проживания",
            "PERSONAL_STATE":"Область \/ край",
            "PERSONAL_ZIP":"Почтовый индекс",
            "PERSONAL_COUNTRY":"Страна",
            "PERSONAL_MAILBOX":"Почтовый ящик",
            "PERSONAL_NOTES":"Дополнительные заметки",
            "WORK_PHONE":"Телефон компании",
            "WORK_COMPANY":"Компания",
            "WORK_POSITION":"Должность",
            "WORK_DEPARTMENT":"Отдел",
            "WORK_WWW":"Сайт компании",
            "WORK_FAX":"WORK_FAX",
            "WORK_PAGER":"WORK_PAGER",
            "WORK_STREET":"WORK_STREET",
            "WORK_MAILBOX":"WORK_MAILBOX",
            "WORK_CITY":"Город работы",
            "WORK_STATE":"WORK_STATE",
            "WORK_ZIP":"WORK_ZIP",
            "WORK_COUNTRY":"WORK_COUNTRY",
            "WORK_PROFILE":"WORK_PROFILE",
            "WORK_LOGO":"WORK_LOGO",
            "WORK_NOTES":"WORK_NOTES",
            "UF_SKYPE_LINK":"Ссылка на чат в Skype",
            "UF_ZOOM":"Zoom",
            "UF_EMPLOYMENT_DATE":"Дата принятия на работу",
            "UF_TIMEMAN":"Учет рабочего времени",
            "UF_DEPARTMENT":"Подразделения",
            "UF_INTERESTS":"Интересы",
            "UF_SKILLS":"Навыки",
            "UF_WEB_SITES":"Другие сайты",
            "UF_XING":"Xing",
            "UF_LINKEDIN":"LinkedIn",
            "UF_TWITTER":"Twitter",
            "UF_SKYPE":"Skype",
            "UF_DISTRICT":"Район",
            "UF_PHONE_INNER":"Внутренний телефон",
            "USER_TYPE":"USER_TYPE"
        },
        "time":{
            "start":1721719975.764591,
            "finish":1721719975.786585,
            "duration":0.02199411392211914,
            "processing":0.0005099773406982422,
            "date_start":"2024-07-23T07:32:55+00:00",
            "date_finish":"2024-07-23T07:32:55+00:00",
            "operating":0
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа, который содержит пользовательские поля ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)