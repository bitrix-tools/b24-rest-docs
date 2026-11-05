# Создать воронку CRM v 3.0 crm.<тип>.category.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление воронками» в роли доступа CRM. Для смарт-процесса цифрового рабочего места — администратор этого рабочего места или пользователь с правом «Управление воронками» в роли доступа рабочего места

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.add` создает воронку у типа объекта CRM и возвращает ее идентификатор. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.add` ||
|| Контакт | `crm.contact.category.add` ||
|| Компания | `crm.company.category.add` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.add`, например `crm.smartprocess1038.category.add` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Воронки есть у сделки, контакта, компании и у смарт-процесса, если в настройках его типа включены воронки. У лида, предложения, счета и моей компании их нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.add`, а не `crm.smartProcess1038.category.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями новой воронки в формате `{"поле": "значение"}`. Обязательное поле — `name`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

Имена полей пишутся в camelCase: `name`, `sort`, `isDefault`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Название воронки, до 100 символов. Пустую строку и строку только из пробелов метод не примет ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок воронки: метод [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) возвращает воронки по возрастанию `sort`. Значение по умолчанию зависит от типа объекта — [отличия типов](#entity-differences) ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию. Метод принимает поле у контакта, компании и смарт-процесса — [отличия типов](#entity-differences).

Возможные значения:

- `true` — новая воронка станет воронкой по умолчанию вместо прежней
- `false` — новая воронка будет обычной

По умолчанию: `false` ||
|#

Поле `id` только для чтения, метод его не принимает. Список полей воронки с признаком, можно ли поле изменять, возвращает метод [crm.<тип>.category.field.list](./index.md#field-methods).

### Отличия типов объектов {#entity-differences}

#|
|| **Что отличается** | **Сделка** | **Контакт, компания** | **Смарт-процесс** ||
|| Стадии новой воронки | Создаются стадии по умолчанию | Стадий нет | Создаются стадии по умолчанию, если в настройках типа включены стадии ||
|| `isDefault` при создании | Только для чтения: метод вернет ошибку | Можно передать | Можно передать ||
|| `sort` по умолчанию | `0` | `500` | `500` ||
|| Отрицательный `sort` | Метод сохранит `0` | Метод сохранит как есть | Метод сохранит как есть ||
|| Пробелы в начале и в конце `name` | Метод обрежет | Метод сохранит | Метод сохранит ||
|| Поля `isSystem` и `code` у воронки | Нет: метод ответит ошибкой неизвестного поля | Есть, только для чтения | Есть, только для чтения ||
|#

Стадии, которые Битрикс24 создал в новой воронке, возвращает метод [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.add`

{% endnote %}

Примеры создают воронку в смарт-процессе с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Закупки оборудования","sort":600}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Закупки оборудования","sort":600},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CategoryAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CategoryAddResult>(
        'crm.smartprocess1038.category.add',
        {
          fields: {
            name: 'Закупки оборудования',
            sort: 600,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Category created:', result.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addCategory() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.add',
            {
              fields: {
                name: 'Закупки оборудования',
                sort: 600,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Category created:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCategory)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "name": "Закупки оборудования",
                    "sort": 600,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
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
                'crm.smartprocess1038.category.add',
                [
                    'fields' => [
                        'name' => 'Закупки оборудования',
                        'sort' => 600,
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
        'crm.smartprocess1038.category.add',
        {
            fields: {
                name: 'Закупки оборудования',
                sort: 600,
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
        'crm.smartprocess1038.category.add',
        [
            'fields' => [
                'name' => 'Закупки оборудования',
                'sort' => 600,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.add", b24.Params{
    	"fields": b24.Params{
    		"name": "Закупки оборудования",
    		"sort": 600,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.add: %w", err)
    }

    var created struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &created); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(created.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 113
    },
    "time": {
        "start": 1793711086,
        "finish": 1793711086.787867,
        "duration": 0.7878670692443848,
        "processing": 0,
        "date_start": "2026-11-03T16:04:46+03:00",
        "date_finish": "2026-11-03T16:04:46+03:00",
        "operating_reset_at": 1793711520,
        "operating": 0.1263599395751953
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.id**
[`integer`](../../../data-types.md) | Идентификатор созданной воронки. Передайте его в `categoryId`, когда создаете элементы и стадии в этой воронке у сделки или смарт-процесса. Поля воронки можно получить методом [crm.<тип>.category.get](./crm-entity-category-get-rest-v3.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"name\"",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Название из одних пробелов. Передайте в `name` название, в котором есть не только пробелы. В `field` приходит код ошибки, а не имя поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `name` | Значение поля не может быть пустым | Пустая строка. Передайте в `name` непустую строку ||
|| `name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `id`, `isSystem`, `code` | Поле "#FIELD#" не доступно к заполнению | Уберите поле из `fields`: оно только для чтения. Для `isSystem` и `code` эта ошибка приходит у контакта, компании и смарт-процесса ||
|| `isDefault` | Поле "isDefault" не доступно к заполнению | Уберите `isDefault` из `fields`. Метод вернет эту ошибку у сделки: у нее поле только для чтения ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя параметра по [таблице параметра fields](#fields). Имена пишутся в camelCase: `name`, а не `NAME`. Если в ошибке поле `0`, значит `fields` передан строкой или непустым массивом. Передайте `fields` объектом ||
|| `-` | Неизвестное поле `isSystem` для сущности `CategoryDealDto` | У воронки сделки нет полей `isSystem` и `code`. Уберите их из `fields` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM или пользователя с правом «Управление воронками» в роли доступа ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.add`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-update-rest-v3.md)
- [{#T}](./crm-entity-category-get-rest-v3.md)
- [{#T}](./crm-entity-category-list-rest-v3.md)
- [{#T}](./crm-entity-category-delete-rest-v3.md)
- [{#T}](./crm-entity-category-stage-add-rest-v3.md)
