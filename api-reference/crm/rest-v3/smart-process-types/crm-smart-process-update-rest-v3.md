# Изменить тип смарт-процесса v 3.0 crm.smartprocess.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом управлять этим смарт-процессом в настройках прав CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.smartprocess.update` изменяет настройки типа смарт-процесса по его идентификатору `entityTypeId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор типа смарт-процесса, например `1038`.

Идентификаторы типов возвращает метод [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми значениями в формате `{"поле": "значение"}`. Поля, которые можно передать, описаны в [таблице параметра fields](./crm-smart-process-add-rest-v3.md#fields) метода `crm.smartprocess.add` ||
|#

Метод меняет только переданные поля, остальные настройки типа остаются прежними. Если передать пустой объект `fields`, метод вернет `true` и ничего не изменит.

Связи `relations`, привязки `linkedUserFields` и список рабочих мест `customSectionIds` метод заменяет целиком. Например, `"relations": {"parent": [...]}` без ключа `child` удалит все несистемные дочерние связи типа. Как передавать эти поля, описано в [таблице параметра fields](./crm-smart-process-add-rest-v3.md#fields).

Поле `title` при изменении необязательно, но пустую строку в нем передать нельзя. Чтобы удалить описание, передайте в `description` значение `null` или пустую строку. Чтобы убрать срок завершения элементов, передайте `"daysBeforeClose": null`.

В `startCatalogFormId` можно передать идентификатор CRM-формы этого типа, которая доступна в каталоге запуска процессов. Значение `null` или `0` снимает выбор формы.

Метод изменяет один тип и не принимает параметр `filter`: с ним метод отвечает [ошибкой валидации](#request-validation).

Имя метода пишется в нижнем регистре: `crm.smartprocess.update`. На имя `crm.smartProcess.update` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

{% note info "" %}

Если у типа выключить воронки, стадии, поле «Клиент» или привязку товаров, у его элементов пропадут соответствующие поля и группы методов. Что зависит от каждой настройки, показано на странице [полей смарт-процесса](../items/fields-smart-process.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess.update`

{% endnote %}

Примеры меняют описание типа с `entityTypeId = 1038`, включают поле «Наблюдатели» и задают срок завершения элементов 30 дней. Подставьте идентификатор своего типа из ответа метода [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1038,"fields":{"description":"Заявки на поставку товаров","isObserversEnabled":true,"daysBeforeClose":30}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1038,"fields":{"description":"Заявки на поставку товаров","isObserversEnabled":true,"daysBeforeClose":30},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SmartProcessUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<SmartProcessUpdateResult>(
        'crm.smartprocess.update',
        {
          entityTypeId: 1038,
          fields: {
            description: 'Заявки на поставку товаров',
            isObserversEnabled: true,
            daysBeforeClose: 30,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info('Updated:', response.getData()!.result.result)
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
      async function updateSmartProcessType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess.update',
            {
              entityTypeId: 1038,
              fields: {
                description: 'Заявки на поставку товаров',
                isObserversEnabled: true,
                daysBeforeClose: 30,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info('Updated:', response.getData().result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSmartProcessType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "entityTypeId": 1038,
                "fields": {
                    "description": "Заявки на поставку товаров",
                    "isObserversEnabled": True,
                    "daysBeforeClose": 30,
                },
            },
            prefer_version=3,
        )
        print("Updated:", response["result"]["result"])
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
                'crm.smartprocess.update',
                [
                    'entityTypeId' => 1038,
                    'fields' => [
                        'description' => 'Заявки на поставку товаров',
                        'isObserversEnabled' => true,
                        'daysBeforeClose' => 30,
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
        'crm.smartprocess.update',
        {
            entityTypeId: 1038,
            fields: {
                description: 'Заявки на поставку товаров',
                isObserversEnabled: true,
                daysBeforeClose: 30,
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
        'crm.smartprocess.update',
        [
            'entityTypeId' => 1038,
            'fields' => [
                'description' => 'Заявки на поставку товаров',
                'isObserversEnabled' => true,
                'daysBeforeClose' => 30,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess.update", b24.Params{
    	"entityTypeId": 1038,
    	"fields": b24.Params{
    		"description":        "Заявки на поставку товаров",
    		"isObserversEnabled": true,
    		"daysBeforeClose":    30,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess.update: %w", err)
    }

    var updated struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &updated); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("Updated:", updated.Result)
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
        "start": 1795431177,
        "finish": 1795431177.890654,
        "duration": 0.8906540870666504,
        "processing": 0,
        "date_start": "2026-11-23T13:52:57+03:00",
        "date_finish": "2026-11-23T13:52:57+03:00",
        "operating_reset_at": 1795431720,
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
[`boolean`](../../../data-types.md) | `true`, если тип изменен. Новые настройки возвращает метод [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Title must not be empty.",
                "field": "fields.title"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Тип не найден {#not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `0` не найдена | Типа с таким `entityTypeId` нет, это системный тип, например `2` для сделки, или у пользователя нет права управлять этим смарт-процессом. Проверьте идентификатор методом [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md). В тексте ошибки всегда `0`, а не переданный идентификатор ||
|#

#### Ошибки валидации запроса {#request-validation}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `entityTypeId` | Обязательное поле `entityTypeId` не указано | Передайте `entityTypeId` ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `filter` | Update addresses one smart process by entityTypeId and takes no filter. | Уберите `filter`: метод изменяет один тип по `entityTypeId` ||
|| `fields.title` | Title must not be empty. | Передайте в `title` непустую строку или не передавайте поле ||
|| `isClientEnabled` | В поле `isClientEnabled` требуется тип данных `bool` для такого запроса | Передайте признак как `true` или `false`, а не `"Y"` ||
|| `fields.daysBeforeClose` | Invalid smart process field. | Передайте в `daysBeforeClose` число от `0` до `365` или `null`. Та же ошибка приходит на `code` длиннее 255 символов ||
|| `DESCRIPTION_TOO_LONG` | Описание должно быть не больше 1000 символов | Сократите `description` до 1000 символов ||
|| `fields.relations` | Invalid smart process field. | Проверьте структуру `relations`, `linkedUserFields`, `primaryCustomSectionId` и `customSectionIds` [по таблице параметров](./crm-smart-process-add-rest-v3.md#fields). Списки заменяют прежние целиком ||
|| `fields.relations` | The requested relations are unavailable. | Оставьте доступные связи. Для `linkedUserFields` сообщение — `The requested linked user fields are unavailable.`, для рабочих мест — `The requested workplace is unavailable.` Та же ошибка приходит, если без `customSectionIds` передать в `primaryCustomSectionId` место, в котором тип не размещен ||
|| `fields.primaryCustomSectionId` | The primary workplace must be in the list. | Добавьте `primaryCustomSectionId` в список `customSectionIds` или не передавайте его: основным станет первое место списка ||
|| `RESTRICTION` | The smart process change is restricted. | Настройки типа недоступны на тарифе или нельзя включить переданный признак: так метод отвечает на `"isPersonEnabled": true` у обычного смарт-процесса ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `entityTypeId` | Поле "entityTypeId" не доступно к заполнению | Уберите поле из `fields`: оно только для чтения, как и `isPaymentsEnabled`. На устаревшее поле `customSectionId` метод отвечает [ошибкой неизвестного поля](#unknown-field) ||
|#

#### Ошибка неизвестного поля {#unknown-field}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `SmartProcessDto` | Проверьте имя поля по [таблице параметра fields](./crm-smart-process-add-rest-v3.md#fields). Ошибку с именем поля `0` вызывает `fields`, переданный строкой вместо объекта ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | В Битрикс24 выключен запуск смарт-процессов через CRM-формы, а в `fields` переданы `isStartCatalogEnabled`, `isCreateByFormEnabled` или `startCatalogFormId` со значением, отличным от текущего. Уберите эти поля из `fields` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartProcess.update` не найден | Напишите имя метода в нижнем регистре: `crm.smartprocess.update` ||
|#

#### Внутренняя ошибка

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INTERNAL_INTERNALEXCEPTION`, HTTP-статус **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Что-то пошло не так | Битрикс24 не завершил запись типа. Проверьте настройки методом [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md) и повторите запрос ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-smart-process-add-rest-v3.md)
- [{#T}](./crm-smart-process-get-rest-v3.md)
- [{#T}](./crm-smart-process-list-rest-v3.md)
- [{#T}](../items/fields-smart-process.md)
