# Записать информацию для документов в профиль сотрудника sign.b2e.legal.profile.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`, `user`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменять раздел с информацией для документов в профиле сотрудника

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `sign.b2e.legal.profile.update` записывает в профиль пользователя значения полей из раздела с информацией для документов, например должность, адрес, СНИЛС или ИНН. Из этих полей кадровый электронный документооборот (КЭДО) подставляет данные в документы.

Метод записывает все переданные значения разом или не записывает ни одного. Если хотя бы одно значение не подходит по формату, метод вернет ошибку со списком таких полей, и профиль не изменится.

Значения можно записать в профиль активного пользователя — сотрудника или пользователя экстранета. В профиль служебной учетной записи, например бота, записать нельзя.

Метод работает в приложении и через входящий вебхук. Приложению или вебхуку нужны два scope: `sign.b2e` и `user`.

Метод можно вызвать внутри [batch](../rest-v3.md#batch). Заголовок `Idempotency-Key` метод не учитывает: повторный вызов снова запишет те же значения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId***
[`integer`](../data-types.md) | Идентификатор пользователя, в профиль которого записываются значения.

Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| **fields***
[`object`](../data-types.md) | Значения полей в формате `{"код поля": значение}`, от 1 до 50 полей.

Коды полей возвращает метод [sign.b2e.legal.field.list](./sign-b2e-legal-field-list.md). Записать можно только поля с `writable` равным `true`. Формат значения зависит от типа поля [(подробное описание)](#fields) ||
|#

Другие параметры метод не принимает: вызов с ними вернет ошибку валидации.

### Значения полей {#fields}

Тип поля — значение `type` в ответе [sign.b2e.legal.field.list](./sign-b2e-legal-field-list.md#items). Пробелы в начале и в конце значения метод отбрасывает. Пустое значение и значение из одних пробелов записать нельзя.

#|
|| **Тип поля** | **Значение** ||
|| `string` | Строка до 2000 символов ||
|| `snils` | СНИЛС с правильной контрольной суммой. Можно передать с пробелами и дефисами, например `112-233-445 95` ||
|| `inn` | ИНН с правильной контрольной суммой ||
|| `date` | Дата в формате `YYYY-MM-DD`, например `2026-11-12` ||
|| `url` | Ссылка, которая начинается с `http://` или `https://`, до 2000 символов. Домен может быть на кириллице, например `https://пример.рф` ||
|| `address` | Адрес строкой или объектом из частей адреса. Длина строки или каждой части — до 500 символов, символ `\|` использовать нельзя. Строка записывается в часть `ADDRESS_2`.

Ключи объекта:

- `ADDRESS_1` — улица и дом
- `ADDRESS_2` — квартира, офис
- `CITY` — город
- `POSTAL_CODE` — почтовый индекс
- `REGION` — район
- `PROVINCE` — регион
- `COUNTRY` — страна ||
|| `enumeration` | Идентификатор варианта из `options` числом или строкой из цифр ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/sign.b2e.legal.profile.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1595,"fields":{"UF_LEGAL_POSITION":"Менеджер по продажам","UF_LEGAL_SNILS":"112-233-445 95"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/sign.b2e.legal.profile.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":1595,"fields":{"UF_LEGAL_POSITION":"Менеджер по продажам","UF_LEGAL_SNILS":"112-233-445 95"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/sign.b2e.legal.profile.update
    ```

- JS (TS)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type LegalProfileUpdateResult = {
      item: {
        userId: number
        updated: string[]
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<LegalProfileUpdateResult>(
        'sign.b2e.legal.profile.update',
        {
          userId: 1595,
          fields: {
            UF_LEGAL_POSITION: 'Менеджер по продажам',
            UF_LEGAL_SNILS: '112-233-445 95',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated:', result.item.updated.join(', '))
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateLegalProfile() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'sign.b2e.legal.profile.update',
            {
              userId: 1595,
              fields: {
                UF_LEGAL_POSITION: 'Менеджер по продажам',
                UF_LEGAL_SNILS: '112-233-445 95',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated:', result.item.updated.join(', '))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateLegalProfile)
    </script>
    ```

- Python

    SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`, а методов `sign.b2e.*` в нем пока нет. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "sign.b2e.legal.profile.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "userId": 1595,
                "fields": {
                    "UF_LEGAL_POSITION": "Менеджер по продажам",
                    "UF_LEGAL_SNILS": "112-233-445 95",
                },
            },
            prefer_version=3,
        )
        print("Updated:", ", ".join(response["result"]["item"]["updated"]))
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.legal.profile.update',
                [
                    'userId' => 1595,
                    'fields' => [
                        'UF_LEGAL_POSITION' => 'Менеджер по продажам',
                        'UF_LEGAL_SNILS' => '112-233-445 95',
                    ],
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'sign.b2e.legal.profile.update',
        {
            userId: 1595,
            fields: {
                UF_LEGAL_POSITION: 'Менеджер по продажам',
                UF_LEGAL_SNILS: '112-233-445 95',
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.legal.profile.update',
        [
            'userId' => 1595,
            'fields' => [
                'UF_LEGAL_POSITION' => 'Менеджер по продажам',
                'UF_LEGAL_SNILS' => '112-233-445 95',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.legal.profile.update", b24.Params{
    	"userId": 1595,
    	"fields": b24.Params{
    		"UF_LEGAL_POSITION": "Менеджер по продажам",
    		"UF_LEGAL_SNILS":    "112-233-445 95",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sign.b2e.legal.profile.update: %w", err)
    }

    var result struct {
    	Item struct {
    		UserID  int      `json:"userId"`
    		Updated []string `json:"updated"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.UserID, result.Item.Updated)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "userId": 1595,
            "updated": [
                "UF_LEGAL_POSITION",
                "UF_LEGAL_SNILS"
            ]
        }
    },
    "time": {
        "start": 1794477046,
        "finish": 1794477046.481356,
        "duration": 0.4813559055328369,
        "processing": 0,
        "date_start": "2026-11-12T12:50:46+03:00",
        "date_finish": "2026-11-12T12:50:46+03:00",
        "operating_reset_at": 1794477600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../data-types.md) | Результат записи [(подробное описание)](#item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя, в профиль которого записаны значения ||
|| **updated**
[`array`](../data-types.md) | Коды записанных полей. Сами значения метод не возвращает ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "SIGN_B2E_LEGAL_FIELDS_INVALID",
        "message": "Проверьте переданные поля с информацией для документов",
        "validation": [
            {
                "field": "UF_LEGAL_SNILS",
                "code": "SIGN_B2E_LEGAL_FIELD_INVALID_SNILS"
            },
            {
                "field": "UF_LEGAL_FULL_NAME",
                "code": "SIGN_B2E_LEGAL_FIELD_READ_ONLY"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка значений полей

Код ошибки: `SIGN_B2E_LEGAL_FIELDS_INVALID`

HTTP-статус: **400**

Массив `error.validation` перечисляет все поля, которые не прошли проверку: `field` — код поля, `code` — код причины из таблицы. Значения полей в ответ не попадают.

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_LEGAL_FIELD_UNKNOWN` | Такого поля нет на Битрикс24 | Возьмите код поля из ответа [sign.b2e.legal.field.list](./sign-b2e-legal-field-list.md) ||
|| `SIGN_B2E_LEGAL_FIELD_READ_ONLY` | Значение поля записать нельзя | Передавайте только поля с `writable` равным `true`. ФИО записывайте по частям — в поля имени, фамилии и отчества, например `UF_LEGAL_NAME` ||
|| `SIGN_B2E_LEGAL_FIELD_EMPTY` | Передано пустое значение или `null` | Передайте непустое значение ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_TYPE` | Значение не того типа, например число вместо строки | Передайте значение в формате из [таблицы](#fields) ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_SNILS` | СНИЛС с ошибкой | Проверьте цифры и контрольную сумму ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_INN` | ИНН с ошибкой | Проверьте цифры и контрольную сумму ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_DATE` | Дата не в формате `YYYY-MM-DD` или такой даты нет | Передайте дату, например `2026-11-12` ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_URL` | Ссылка с ошибкой | Передайте ссылку, которая начинается с `http://` или `https://` ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_ADDRESS` | Адрес длиннее 500 символов, содержит `\|` или в объекте неизвестный ключ | Проверьте длину, символы и ключи частей адреса ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_OPTION` | Такого варианта нет в списке | Передайте `id` варианта из `options` ||
|| `SIGN_B2E_LEGAL_FIELD_INVALID_VALUE` | Значение не прошло проверку, например строка длиннее 2000 символов | Сократите или исправьте значение ||
|#

#### Ошибки пользователя

HTTP-статус: **400**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_LEGAL_USER_NOT_FOUND` | Сотрудник с таким ID не найден | Проверьте `userId`. Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| `SIGN_B2E_LEGAL_USER_INACTIVE` | Сотрудник уволен, поэтому информацию для документов указать нельзя | Укажите активного пользователя ||
|| `SIGN_B2E_LEGAL_USER_NOT_SUPPORTED` | Сотрудник — служебная учетная запись, поэтому информацию для документов указать нельзя | Укажите пользователя, который не является служебной учетной записью ||
|#

#### Ошибки доступа

HTTP-статус: **403**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_LEGAL_ACCESS_DENIED` | Недостаточно прав на просмотр или изменение информации для документов в профиле сотрудника. Обратитесь к администратору Битрикс24 | Выдайте пользователю право изменять раздел с информацией для документов в профиле сотрудника. Вызывать метод должен активный сотрудник: служебная учетная запись, пользователь экстранета и гость коллабы получают эту ошибку ||
|| `SIGN_REST_SCOPE_REQUIRED` | Не хватает права доступа user. Добавьте его в настройках приложения или входящего вебхука | Добавьте scope `user` приложению или вебхуку ||
|| `SIGN_REST_AUTH_TYPE_NOT_ALLOWED` | Метод доступен только приложениям и входящим вебхукам | Вызовите метод из приложения или через входящий вебхук ||
|| `SIGN_B2E_UNAVAILABLE` | Подписание с сотрудниками недоступно в этом Битрикс24 | Проверьте, что КЭДО доступен в вашем Битрикс24 ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `userId` | Обязательное поле `userId` не указано | Добавьте `userId` в тело запроса ||
|| `fields` | Значение поля не может быть пустым | Передайте хотя бы одно поле ||
|| `fields` | Слишком много полей или неверный код поля. Передайте не больше 50 полей с кодами, которые возвращает метод sign.b2e.legal.field.list | Передайте до 50 полей. Код поля начинается с `UF_` и состоит из заглавных латинских букв, цифр и `_` ||
|| имя параметра | Unknown parameter | Уберите параметр, которого нет в описании ||
|#

#### Внутренняя ошибка

HTTP-статус: **500**

Если запись не удалась по внутренней причине, метод возвращает ошибку без подробностей и не записывает ни одного значения. Повторите запрос позже.

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-legal-field-list.md)
- [{#T}](./sign-b2e-template-send.md)
- [{#T}](./index.md)
