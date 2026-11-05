# Изменить стадию воронки CRM v 3.0 crm.<тип>.category.stage.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление стадиями» в роли доступа CRM. Для смарт-процесса цифрового рабочего места — администратор этого рабочего места или пользователь с правом «Управление стадиями» в роли доступа рабочего места. Пользователь также должен иметь право читать элементы этой воронки

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.stage.update` изменяет название, цвет, описание, группу или место стадии в воронке. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.stage.update` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.stage.update`, например `crm.smartprocess1038.category.stage.update` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Стадии воронок есть у сделки и у смарт-процесса, если в настройках его типа включены воронки и стадии. У лида, контакта, компании, предложения, счета и моей компании методов стадий воронок нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.stage.update`, а не `crm.smartProcess1038.category.stage.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор стадии, например `DT1038_127:UC_WUHOJE`. [Формат идентификатора](#stage-id).

Идентификаторы стадий возвращает метод [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми значениями полей в формате `{"поле": "значение"}`. [Описание параметра](#fields) ||
|#

### Идентификатор стадии {#stage-id}

Формат идентификатора стадии зависит от воронки:

#|
|| **Воронка** | **Формат** | **Пример** ||
|| Воронка по умолчанию сделки | Код стадии без префикса | `NEW` ||
|| Другая воронка сделки | `C<categoryId>:<код>` | `C1:NEW` ||
|| Воронка смарт-процесса | `DT<entityTypeId>_<categoryId>:<код>` | `DT1038_127:UC_WUHOJE` ||
|#

### Параметр fields {#fields}

Передавайте только поля, которые нужно изменить. Поля, которых нет в `fields`, сохраняют текущие значения. Пустой объект `fields` метод примет и ничего не изменит.

Имена полей пишутся в camelCase: `name`, `color`, `semantics`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название стадии, до 100 символов. Пустую строку и строку только из пробелов метод не примет ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`. Пустая строка убирает цвет ||
|| **description**
[`string`](../../../data-types.md) | Описание стадии ||
|| **semantics**
[`string`](../../../data-types.md) | Группа стадии.

Возможные значения:

- `process` — стадия в работе
- `success` — стадия успеха
- `failure` — стадия провала ||
|| **sort**
[`integer`](../../../data-types.md) | Место стадии в воронке: стадии идут по возрастанию `sort` ||
|#

Поля `stageId`, `categoryId` и `isSystem` метод не принимает. Стадию указывает параметр `id`. Перенести стадию в другую воронку нельзя.

У системной стадии можно менять все поля, кроме `semantics`.

Битрикс24 проверяет порядок стадий после изменения: сначала стадии в работе, затем одна стадия успеха, после нее стадии провала. Например, чтобы перенести стадию в работе за стадию успеха, передайте вместе с новым `sort` значение `semantics: failure`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.stage.update`

{% endnote %}

Примеры меняют название и цвет стадии `DT1038_127:UC_WUHOJE` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"DT1038_127:UC_WUHOJE","fields":{"name":"Проверка договора","color":"#2FC6F6"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.stage.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"DT1038_127:UC_WUHOJE","fields":{"name":"Проверка договора","color":"#2FC6F6"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.stage.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageUpdateResult>(
        'crm.smartprocess1038.category.stage.update',
        {
          id: 'DT1038_127:UC_WUHOJE',
          fields: {
            name: 'Проверка договора',
            color: '#2FC6F6',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Stage updated:', result.result)
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
      async function updateStage() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.stage.update',
            {
              id: 'DT1038_127:UC_WUHOJE',
              fields: {
                name: 'Проверка договора',
                color: '#2FC6F6',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Stage updated:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateStage)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.stage.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "DT1038_127:UC_WUHOJE",
                "fields": {
                    "name": "Проверка договора",
                    "color": "#2FC6F6",
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
                'crm.smartprocess1038.category.stage.update',
                [
                    'id' => 'DT1038_127:UC_WUHOJE',
                    'fields' => [
                        'name' => 'Проверка договора',
                        'color' => '#2FC6F6',
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
        'crm.smartprocess1038.category.stage.update',
        {
            id: 'DT1038_127:UC_WUHOJE',
            fields: {
                name: 'Проверка договора',
                color: '#2FC6F6',
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
        'crm.smartprocess1038.category.stage.update',
        [
            'id' => 'DT1038_127:UC_WUHOJE',
            'fields' => [
                'name' => 'Проверка договора',
                'color' => '#2FC6F6',
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.stage.update", b24.Params{
    	"id":     "DT1038_127:UC_WUHOJE",
    	"fields": b24.Params{
    		"name":  "Проверка договора",
    		"color": "#2FC6F6",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.stage.update: %w", err)
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
        "start": 1793715166,
        "finish": 1793715166.090675,
        "duration": 0.09067511558532715,
        "processing": 0,
        "date_start": "2026-11-03T17:12:46+03:00",
        "date_finish": "2026-11-03T17:12:46+03:00",
        "operating_reset_at": 1793715720,
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
[`boolean`](../../../data-types.md) | `true`, если запрос выполнен. На пустой [`fields`](#fields) метод тоже отвечает `true`, но ничего не меняет. Новые значения можно получить методом [crm.<тип>.category.stage.get](./crm-entity-category-stage-get-rest-v3.md) ||
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
                "message": "Поле \"categoryId\" не доступно к заполнению",
                "field": "categoryId"
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` стадии ||
|| `id` | Значение поля не может быть пустым | Передайте непустой `id` ||
|| `STAGE_NOT_FOUND` | Стадия не найдена | Проверьте `id` методом [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md). Стадии нет у этого типа объекта, она удалена или у пользователя нет права читать элементы ее воронки ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|| `OPERATION_NOT_ALLOWED_FOR_STAGE` | Действие недоступно для этой стадии | Системной стадии нельзя сменить группу. Для остальных стадий проверьте, что `semantics` и `sort` сохраняют порядок стадий ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Передайте в `name` название, в котором есть не только пробелы ||
|#

В `field` у ошибок с кодами `STAGE_NOT_FOUND`, `OPERATION_NOT_ALLOWED_FOR_STAGE` и `FIELD_VALUE_NOT_ALLOWED` приходит код ошибки, а не имя поля. Если стадии нет, метод отвечает ошибкой валидации запроса, а не кодом `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`. Определяйте такую ошибку по `STAGE_NOT_FOUND` в `field`.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Значение поля не может быть пустым | Передайте в `name` непустую строку ||
|| `name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `color` | Значения поля не соответствует регулярному выражению | Передайте цвет в формате `#RRGGBB` или пустую строку ||
|| `semantics` | Значение поля не содержится в списке допустимых значений: process, success, failure | Передайте одно из значений из описания поля ||
|| `stageId`, `categoryId`, `isSystem` | Поле "#FIELD#" не доступно к заполнению | Уберите поле из `fields` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageDto` | Проверьте имя параметра по [таблице параметра fields](#fields). Имена пишутся в camelCase: `name`, а не `NAME` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM или пользователя с правом «Управление стадиями» в роли доступа ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.stage.update`. Методы стадий есть только у сделки и смарт-процесса. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки и стадии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-stage-get-rest-v3.md)
- [{#T}](./crm-entity-category-stage-list-rest-v3.md)
- [{#T}](./crm-entity-category-stage-replace-rest-v3.md)
