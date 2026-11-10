# Пригласить пользователя user.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, а в облачном Битрикс24 — также пользователь с правом приглашать сотрудников

Метод `user.add` приглашает пользователя в Битрикс24 и отправляет приглашение на `EMAIL`. Сотруднику нужно передать подразделение в `UF_DEPARTMENT`, внешнему пользователю экстранета — `EXTRANET` и `SONET_GROUP_ID`.

{% note info "" %}

Метод работает только в версии скоупа `user`. В версиях `user_brief` и `user_basic` вызов вернет ошибку `insufficient_scope` — подробнее в статье [Версии скоупа user](user-scope.md). Событие [onUserAdd](../common/events/on-user-add.md) придет не сразу, а когда приглашенный пользователь впервые войдет в Битрикс24 и завершит регистрацию.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **EMAIL***
[`string`](../data-types.md) | E-mail пользователя. На него придет приглашение. Адрес должен пройти проверку Битрикс24.Network ||
|| **NAME**
[`string`](../data-types.md) | Имя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол:
- `M` — мужской
- `F` — женский ||
|| **PERSONAL_PROFESSION**
[`string`](../data-types.md) | Профессия ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Личный сайт ||
|| **PERSONAL_BIRTHDAY**
[`date`](../data-types.md) | Дата рождения в формате ISO 8601, например `1990-05-20` ||
|| **PERSONAL_PHOTO**
[`array`](../data-types.md) | Фотография — массив из двух строк: имени файла и содержимого в [Base64](../files/how-to-upload-files.md), например `["photo.png", "iVBORw0KGgo..."]` ||
|| **PERSONAL_ICQ**
[`string`](../data-types.md) | ICQ ||
|| **PERSONAL_PHONE**
[`string`](../data-types.md) | Личный телефон ||
|| **PERSONAL_FAX**
[`string`](../data-types.md) | Личный факс ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Личный мобильный ||
|| **PERSONAL_PAGER**
[`string`](../data-types.md) | Пейджер ||
|| **PERSONAL_STREET**
[`string`](../data-types.md) | Улица проживания ||
|| **PERSONAL_CITY**
[`string`](../data-types.md) | Город проживания ||
|| **PERSONAL_STATE**
[`string`](../data-types.md) | Область или край проживания ||
|| **PERSONAL_ZIP**
[`string`](../data-types.md) | Почтовый индекс ||
|| **PERSONAL_COUNTRY**
[`string`](../data-types.md) | Числовой код страны проживания из справочника стран Битрикс24. Код уже заданной страны возвращает поле `PERSONAL_COUNTRY` в ответе [user.get](./user-get.md) ||
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
[`string`](../data-types.md) | Отдел — текстовое поле. Подразделение из структуры компании передавайте в `UF_DEPARTMENT` ||
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
[`string`](../data-types.md) | Город работы ||
|| **WORK_STATE**
[`string`](../data-types.md) | Область или край места работы ||
|| **WORK_ZIP**
[`string`](../data-types.md) | Почтовый индекс места работы ||
|| **WORK_COUNTRY**
[`string`](../data-types.md) | Числовой код страны места работы из справочника стран Битрикс24. Код уже заданной страны возвращает поле `WORK_COUNTRY` в ответе [user.get](./user-get.md) ||
|| **WORK_PROFILE**
[`string`](../data-types.md) | Направление деятельности компании ||
|| **WORK_LOGO**
[`array`](../data-types.md) | Логотип компании. Передавайте массив из имени файла и строки в [Base64](../files/how-to-upload-files.md), как для `PERSONAL_PHOTO` ||
|| **WORK_NOTES**
[`string`](../data-types.md) | Заметки о месте работы ||
|| **UF_SKYPE_LINK**
[`string`](../data-types.md) | Ссылка на чат в Skype ||
|| **UF_ZOOM**
[`string`](../data-types.md) | Zoom ||
|| **UF_DEPARTMENT**
[`integer[]`](../data-types.md) | Идентификаторы подразделений из структуры компании. Получить подразделения можно методом [department.get](../departments/department-get.md).

Обязателен для сотрудника, если не передан `EXTRANET` = `Y`. Без него метод вернет ошибку `no_extranet_field` ||
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
[`string`](../data-types.md) | Facebook** ||
|| **UF_TWITTER**
[`string`](../data-types.md) | Twitter ||
|| **UF_SKYPE**
[`string`](../data-types.md) | Microsoft Teams. Код поля сохранился от Skype ||
|| **UF_DISTRICT**
[`string`](../data-types.md) | Район ||
|| **UF_PHONE_INNER**
[`string`](../data-types.md) | Внутренний телефон ||
|| **EXTRANET**
[`string`](../data-types.md) | Пригласить внешнего пользователя экстранета:
- `Y` — пригласить в экстранет

Другое значение или отсутствие параметра — приглашение сотрудника, для которого нужен `UF_DEPARTMENT`. Вместе с `EXTRANET` = `Y` обязательно передайте `SONET_GROUP_ID`. Значение `UF_DEPARTMENT` в этом случае не учитывается. Работает, если в Битрикс24 установлен модуль экстранета ||
|| **SONET_GROUP_ID**
[`integer[]`](../data-types.md) | Идентификаторы рабочих групп, в которые приглашается пользователь экстранета. Можно передать одно число. Получить группы можно методом [sonet_group.get](../sonet-group/sonet-group-get.md).

Обязателен, если передан `EXTRANET` = `Y`. Без него метод вернет ошибку `no_sonet_group_for_extranet` ||
|| **MESSAGE_TEXT**
[`string`](../data-types.md) | Текст приглашения. Если не передан, используется стандартный текст ||
|#

\
**Принадлежит компании Meta Platforms, Inc., которая признана экстремистской и запрещена на территории Российской Федерации.*

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

### Пригласить сотрудника

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "EMAIL": "newuser1@example.com",
        "UF_DEPARTMENT": [1]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.add
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "EMAIL": "newuser1@example.com",
        "UF_DEPARTMENT": [1],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'user.add',
        params: {
          EMAIL: 'newuser1@example.com',
          UF_DEPARTMENT: [1]
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New user ID:', result)
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
      async function addUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.add',
            params: {
              EMAIL: 'newuser1@example.com',
              UF_DEPARTMENT: [1]
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New user ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addUser)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.add(
            fields={
                "EMAIL": "newuser1@example.com",
                "UF_DEPARTMENT": [
                    1,
                ],
            },
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
                'user.add',
                [
                    'EMAIL'        => 'newuser1@example.com',
                    'UF_DEPARTMENT' => [1],
                ]
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
        "user.add",
        {
            "EMAIL": "newuser1@example.com",
            "UF_DEPARTMENT": [1]
        },
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
        'user.add',
        [
            'EMAIL' => 'newuser1@example.com',
            'UF_DEPARTMENT' => [1]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.add", b24.Params{
    	"EMAIL":         "newuser1@example.com",
    	"UF_DEPARTMENT": []int{1},
    })
    if err != nil {
    	return fmt.Errorf("user.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

### Пригласить пользователя экстранета

Пользователь получит приглашение в рабочую группу `7`. Подразделение `UF_DEPARTMENT` для него не передается.

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "EMAIL": "partner@example.com",
        "EXTRANET": "Y",
        "SONET_GROUP_ID": [7]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.add
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "EMAIL": "partner@example.com",
        "EXTRANET": "Y",
        "SONET_GROUP_ID": [7],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'user.add',
        params: {
          EMAIL: 'partner@example.com',
          EXTRANET: 'Y',
          SONET_GROUP_ID: [7]
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New user ID:', result)
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
      async function addUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.add',
            params: {
              EMAIL: 'partner@example.com',
              EXTRANET: 'Y',
              SONET_GROUP_ID: [7]
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New user ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addUser)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.add(
            fields={
                "EMAIL": "partner@example.com",
                "EXTRANET": "Y",
                "SONET_GROUP_ID": [
                    7,
                ],
            },
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
                'user.add',
                [
                    'EMAIL'        => 'partner@example.com',
                    'EXTRANET' => 'Y',
                    'SONET_GROUP_ID' => [7],
                ]
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
        "user.add",
        {
            "EMAIL": "partner@example.com",
            "EXTRANET": "Y",
            "SONET_GROUP_ID": [7]
        },
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
        'user.add',
        [
            'EMAIL' => 'partner@example.com',
            'EXTRANET' => 'Y',
            'SONET_GROUP_ID' => [7]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.add", b24.Params{
    	"EMAIL":         "partner@example.com",
    	"EXTRANET":      "Y",
    	"SONET_GROUP_ID": []int{7},
    })
    if err != nil {
    	return fmt.Errorf("user.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
    {
        "result":12,
        "time":{
            "start":1721733827.713938,
            "finish":1721733828.286292,
            "duration":0.5723540782928467,
            "processing":0.5508849620819092,
            "date_start":"2024-07-23T11:23:47+00:00",
            "date_finish":"2024-07-23T11:23:48+00:00",
            "operating":0.5508630275726318
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор нового пользователя ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "no_extranet_field",
    "argument": ""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | wrong_email | Не передан `EMAIL` или передан некорректный e-mail ||
|| `400` | `ERROR_ARGUMENT` | no_extranet_field | Не передан `UF_DEPARTMENT` для сотрудника и не передан `EXTRANET` = `Y` ||
|| `400` | `ERROR_ARGUMENT` | no_sonet_group_for_extranet | Передан `EXTRANET` = `Y`, но не передан `SONET_GROUP_ID` ||
|| `400` | `ERROR_ARGUMENT` | invalid_type_field | В текстовое поле передан массив или объект. Код поля приходит в ключе `argument` ответа ||
|| `400` | `ERROR_ARGUMENT` | Не удалось выполнить проверку Битрикс24.Network. Попробуйте позже или обратитесь в поддержку. | E-mail не прошел проверку Битрикс24.Network ||
|| `400` | `ERROR_ARGUMENT` | Пользователь с таким email уже существует | Пользователь с этим e-mail уже есть в Битрикс24 ||
|| `400` | `ERROR_ARGUMENT` | user_count_exceeded | Превышен лимит пользователей на тарифе ||
|| `400` | `ERROR_CORE` | access_denied | У пользователя нет права приглашать сотрудников ||
|| `400` | `ERROR_CORE` | Текст ошибки зависит от причины | Не удалось отправить приглашение через Битрикс24.Network или добавить пользователя в группу из `SONET_GROUP_ID` ||
|| `401` | `insufficient_scope` | The request requires higher privileges than provided by the access token | У приложения или вебхука версия скоупа `user_brief` или `user_basic`. Метод работает только в версии `user` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)