# Изменить воронку CRM v 3.0 crm.<тип>.category.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление воронками» в роли доступа CRM. Для смарт-процесса цифрового рабочего места — администратор этого рабочего места или пользователь с правом «Управление воронками» в роли доступа рабочего места. Пользователь также должен иметь право читать элементы этой воронки

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.update` изменяет название, порядок и признак по умолчанию у существующей воронки. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.update` ||
|| Контакт | `crm.contact.category.update` ||
|| Компания | `crm.company.category.update` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.update`, например `crm.smartprocess1038.category.update` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Воронки есть у сделки, контакта, компании и у смарт-процесса, если в настройках его типа включены воронки. У лида, предложения, счета и моей компании их нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.update`, а не `crm.smartProcess1038.category.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор воронки, которую нужно изменить. У воронки по умолчанию сделки, контакта и компании — `0`.

Его возвращает метод [crm.<тип>.category.add](./crm-entity-category-add-rest-v3.md) при создании воронки. Идентификаторы существующих воронок можно получить методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми значениями полей в формате `{"поле": "значение"}`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

Передавайте только поля, которые нужно изменить. Поля, которых нет в `fields`, сохраняют текущие значения. Пустой объект `fields` метод примет и ничего не изменит.

Имена полей пишутся в camelCase: `name`, `sort`, `isDefault`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название воронки, до 100 символов. Пустую строку и строку только из пробелов метод не примет ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок воронки: метод [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) возвращает воронки по возрастанию `sort` ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Признак воронки по умолчанию. Метод принимает поле у контакта, компании и смарт-процесса — [отличия типов](#entity-differences).

Возможные значения:

- `true` — воронка станет воронкой по умолчанию, у прежней признак снимется
- `false` — воронка будет обычной ||
|#

Поле `id` в `fields` метод не принимает: воронку указывает параметр `id`. Список полей воронки с признаком, можно ли поле изменять, возвращает метод [crm.<тип>.category.field.list](./index.md).

### Отличия типов объектов {#entity-differences}

#|
|| **Что отличается** | **Сделка** | **Контакт, компания** | **Смарт-процесс** ||
|| `isDefault` | Только для чтения: метод вернет ошибку | Можно передать | Можно передать ||
|| Отрицательный `sort` | Метод сохранит `0` | Метод сохранит как есть | Метод сохранит как есть ||
|| Пробелы в начале и в конце `name` | Метод обрежет | Метод сохранит | Метод сохранит ||
|| Поля `isSystem` и `code` | Нет: метод ответит ошибкой неизвестного поля | Есть, только для чтения | Есть, только для чтения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.update`

{% endnote %}

Примеры меняют название и порядок воронки `105` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":105,"fields":{"name":"Закупки оборудования и мебели","sort":650}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":105,"fields":{"name":"Закупки оборудования и мебели","sort":650},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CategoryUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CategoryUpdateResult>(
        'crm.smartprocess1038.category.update',
        {
          id: 105,
          fields: {
            name: 'Закупки оборудования и мебели',
            sort: 650,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Category updated:', result.result)
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
      async function updateCategory() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.update',
            {
              id: 105,
              fields: {
                name: 'Закупки оборудования и мебели',
                sort: 650,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Category updated:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCategory)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 105,
                "fields": {
                    "name": "Закупки оборудования и мебели",
                    "sort": 650,
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
                'crm.smartprocess1038.category.update',
                [
                    'id' => 105,
                    'fields' => [
                        'name' => 'Закупки оборудования и мебели',
                        'sort' => 650,
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
        'crm.smartprocess1038.category.update',
        {
            id: 105,
            fields: {
                name: 'Закупки оборудования и мебели',
                sort: 650,
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
        'crm.smartprocess1038.category.update',
        [
            'id' => 105,
            'fields' => [
                'name' => 'Закупки оборудования и мебели',
                'sort' => 650,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.update", b24.Params{
    	"id":     105,
    	"fields": b24.Params{
    		"name": "Закупки оборудования и мебели",
    		"sort": 650,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.update: %w", err)
    }

    var updated struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &updated); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(updated.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1793714729,
        "finish": 1793714729.963392,
        "duration": 0.9633920192718506,
        "processing": 0,
        "date_start": "2026-11-03T17:05:29+03:00",
        "date_finish": "2026-11-03T17:05:29+03:00",
        "operating_reset_at": 1793715300,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.result**
[`boolean`](../../../data-types.md) | `true`, если запрос выполнен. Метод отвечает `true` и на пустой `fields` — смотрите [описание параметра fields](#fields). Новые значения можно получить методом [crm.<тип>.category.get](./crm-entity-category-get-rest-v3.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Воронка не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор воронки методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md). Воронки с таким `id` нет у этого типа объекта или у пользователя нет права читать ее элементы ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` воронки ||
|| `id` | Значение поля должно быть не меньше, чем 0 | Передайте неотрицательный идентификатор воронки ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте `id` числом ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Название из одних пробелов. Передайте в `name` название, в котором есть не только пробелы. В `field` приходит код ошибки, а не имя поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Значение поля не может быть пустым | Пустая строка. Передайте в `name` непустую строку ||
|| `name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `id`, `isSystem`, `code` | Поле "#FIELD#" не доступно к заполнению | Передайте идентификатор параметром `id`, а не в `fields`. Поля `isSystem` и `code` изменить нельзя ||
|| `isDefault` | Поле "isDefault" не доступно к заполнению | Уберите `isDefault` из `fields`. Метод вернет эту ошибку у сделки: у нее поле только для чтения ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя параметра по [таблице параметра fields](#fields). Имена пишутся в camelCase: `name`, а не `NAME` ||
|| `-` | Неизвестное поле `code` для сущности `CategoryDealDto` | У воронки сделки нет полей `isSystem` и `code`. Уберите их из `fields` ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.update`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-add-rest-v3.md)
- [{#T}](./crm-entity-category-get-rest-v3.md)
- [{#T}](./crm-entity-category-list-rest-v3.md)
- [{#T}](./crm-entity-category-delete-rest-v3.md)
