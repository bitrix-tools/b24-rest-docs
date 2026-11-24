# Получить тип смарт-процесса v 3.0 crm.smartprocess.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM, администратор этого смарт-процесса, пользователь с правом на чтение его элементов или с правом управлять смарт-процессами

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.smartprocess.get` возвращает настройки типа смарт-процесса по его идентификатору `entityTypeId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор типа смарт-процесса, например `1038`. Значение больше `0`.

Идентификаторы типов возвращает метод [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) ||
|#

Метод всегда возвращает все поля типа, вместе со связями `relations`, привязками к пользовательским полям `linkedUserFields` и цифровыми рабочими местами `customSections`. Параметр `select` метод не учитывает и пропускает без ошибки. Чтобы получить только часть полей, используйте метод [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) с фильтром по `entityTypeId` и параметром `select`.

Имя метода пишется в нижнем регистре: `crm.smartprocess.get`. На имя `crm.smartProcess.get` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess.get`

{% endnote %}

Примеры получают настройки типа смарт-процесса с `entityTypeId = 1038`. Подставьте идентификатор своего типа из ответа метода [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1038}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1038,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SmartProcessGetResult = {
      item: {
        entityTypeId: number
        title: string
        isCategoriesEnabled: boolean
        isStagesEnabled: boolean
        [key: string]: unknown
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<SmartProcessGetResult>(
        'crm.smartprocess.get',
        {
          entityTypeId: 1038,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const item = response.getData()!.result.item
        console.info('Smart process type:', item.entityTypeId, item.title)
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
      async function getSmartProcessType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess.get',
            {
              entityTypeId: 1038,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const item = response.getData().result.item
          console.info('Smart process type:', item.entityTypeId, item.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSmartProcessType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={"entityTypeId": 1038},
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item["entityTypeId"], item["title"])
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
                'crm.smartprocess.get',
                [
                    'entityTypeId' => 1038,
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
        'crm.smartprocess.get',
        {
            entityTypeId: 1038,
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
        'crm.smartprocess.get',
        [
            'entityTypeId' => 1038,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess.get", b24.Params{
    	"entityTypeId": 1038,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	EntityTypeID        int    `json:"entityTypeId"`
    	Title               string `json:"title"`
    	IsCategoriesEnabled bool   `json:"isCategoriesEnabled"`
    	IsStagesEnabled     bool   `json:"isStagesEnabled"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.EntityTypeID, item.Title)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "entityTypeId": 1038,
            "title": "Заявки поставщикам",
            "code": "",
            "createdBy": 1,
            "updatedBy": 1,
            "createdTime": "2025-07-01T11:26:42+03:00",
            "updatedTime": "2026-09-29T14:33:45+03:00",
            "customSectionId": null,
            "daysBeforeClose": null,
            "startCatalogFormId": null,
            "isCategoriesEnabled": true,
            "isStagesEnabled": true,
            "isBeginCloseDatesEnabled": true,
            "isClientEnabled": true,
            "isUseInUserfieldEnabled": true,
            "isLinkWithProductsEnabled": true,
            "isMycompanyEnabled": true,
            "isDocumentsEnabled": true,
            "isSourceEnabled": true,
            "isObserversEnabled": true,
            "isRecurringEnabled": false,
            "isRecyclebinEnabled": false,
            "isAutomationEnabled": false,
            "isBizProcEnabled": false,
            "isPaymentsEnabled": false,
            "isCountersEnabled": true,
            "isMultifieldsEnabled": false,
            "isStartCatalogEnabled": false,
            "isCreateByFormEnabled": false,
            "isPersonEnabled": false,
            "isSetOpenPermissions": false,
            "additionalCustomSectionIds": [],
            "description": null,
            "relations": {
                "parent": [
                    {
                        "entityTypeId": 3,
                        "isChildrenListEnabled": true,
                        "isPredefined": true
                    },
                    {
                        "entityTypeId": 4,
                        "isChildrenListEnabled": true,
                        "isPredefined": true
                    },
                    {
                        "entityTypeId": 1,
                        "isChildrenListEnabled": false,
                        "isPredefined": false
                    },
                    {
                        "entityTypeId": 14,
                        "isChildrenListEnabled": false,
                        "isPredefined": false
                    },
                    {
                        "entityTypeId": 31,
                        "isChildrenListEnabled": false,
                        "isPredefined": false
                    },
                    {
                        "entityTypeId": 177,
                        "isChildrenListEnabled": false,
                        "isPredefined": false
                    }
                ],
                "child": [
                    {
                        "entityTypeId": 39,
                        "isChildrenListEnabled": true,
                        "isPredefined": true
                    }
                ]
            },
            "linkedUserFields": {
                "CALENDAR_EVENT|UF_CRM_CAL_EVENT": true,
                "TASKS_TASK|UF_CRM_TASK": true,
                "TASKS_TASK_TEMPLATE|UF_CRM_TASK": true
            },
            "customSections": [
                {
                    "id": 1,
                    "title": "Закупки",
                    "isSelected": false,
                    "isAdditional": false
                }
            ]
        }
    },
    "time": {
        "start": 1795430922,
        "finish": 1795430922.129126,
        "duration": 0.12912607192993164,
        "processing": 0,
        "date_start": "2026-11-23T13:48:42+03:00",
        "date_finish": "2026-11-23T13:48:42+03:00",
        "operating_reset_at": 1795431480,
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
|| **result.item**
[`object`](#item) | Настройки типа смарт-процесса. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля типа смарт-процесса {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа. Подставляется в имя методов элементов, например `crm.smartprocess1038.add` ||
|| **title**
[`string`](../../../data-types.md) | Название типа ||
|| **code**
[`string`](../../../data-types.md) | Символьный код типа. Если код не задан — пустая строка ||
|| **description**
[`string`](../../../data-types.md) | Описание типа, до 1000 символов. Если описания нет — `null` ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал тип ||
|| **updatedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил тип ||
|| **createdTime**
[`datetime`](../../../data-types.md) | Дата и время создания типа ||
|| **updatedTime**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения типа ||
|| **customSectionId**
[`integer`](../../../data-types.md) | Идентификатор цифрового рабочего места, в котором размещен тип. Если тип размещен в CRM — `null` ||
|| **additionalCustomSectionIds**
[`integer[]`](../../../data-types.md) | Идентификаторы цифровых рабочих мест, в которые тип добавлен дополнительно. В список попадают только места, которые видит пользователь ||
|| **daysBeforeClose**
[`integer`](../../../data-types.md) | Сколько дней с момента создания отводится элементу до завершения: от `0` до `365`. Если срок не задан — `null` ||
|| **startCatalogFormId**
[`integer`](../../../data-types.md) | Идентификатор CRM-формы, через которую процесс запускается из каталога запуска процессов. Если форма не выбрана — `null` ||
|| **isCategoriesEnabled**
[`boolean`](../../../data-types.md) | Включены ли свои воронки ||
|| **isStagesEnabled**
[`boolean`](../../../data-types.md) | Включены ли свои стадии и канбан ||
|| **isBeginCloseDatesEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля «Дата начала» и «Дата завершения» ||
|| **isClientEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле «Клиент». При включенном поле у типа есть системные связи с контактом и компанией ||
|| **isUseInUserfieldEnabled**
[`boolean`](../../../data-types.md) | Можно ли использовать тип в пользовательском поле. В каких полях он показывается, задает объект `linkedUserFields` ||
|| **isLinkWithProductsEnabled**
[`boolean`](../../../data-types.md) | Включена ли привязка товаров каталога ||
|| **isMycompanyEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле «Реквизиты вашей компании» ||
|| **isDocumentsEnabled**
[`boolean`](../../../data-types.md) | Включена ли печать документов ||
|| **isSourceEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля «Источник» и «Дополнительно об источнике» ||
|| **isObserversEnabled**
[`boolean`](../../../data-types.md) | Включено ли поле «Наблюдатели» ||
|| **isRecurringEnabled**
[`boolean`](../../../data-types.md) | Включены ли регулярные элементы ||
|| **isRecyclebinEnabled**
[`boolean`](../../../data-types.md) | Попадают ли удаленные элементы в корзину ||
|| **isAutomationEnabled**
[`boolean`](../../../data-types.md) | Включены ли роботы и триггеры ||
|| **isBizProcEnabled**
[`boolean`](../../../data-types.md) | Включен ли дизайнер бизнес-процессов ||
|| **isPaymentsEnabled**
[`boolean`](../../../data-types.md) | Включен ли прием платежей ||
|| **isCountersEnabled**
[`boolean`](../../../data-types.md) | Включены ли режим просмотра «Дела» и счетчики ||
|| **isMultifieldsEnabled**
[`boolean`](../../../data-types.md) | Включены ли поля коммуникаций: телефон, почта, сайт, мессенджер ||
|| **isStartCatalogEnabled**
[`boolean`](../../../data-types.md) | Показывается ли тип в каталоге запуска процессов ||
|| **isCreateByFormEnabled**
[`boolean`](../../../data-types.md) | Можно ли создавать элементы через CRM-форму ||
|| **isPersonEnabled**
[`boolean`](../../../data-types.md) | Включен ли учет людей ||
|| **isSetOpenPermissions**
[`boolean`](../../../data-types.md) | Становятся ли новые воронки доступными для всех ||
|| **relations**
[`object`](#relations) | Связи типа с другими объектами CRM. [Описание объекта](#relations) ||
|| **linkedUserFields**
[`object`](#linked-user-fields) | Пользовательские поля других модулей, в которых можно выбрать элемент типа. [Описание объекта](#linked-user-fields) ||
|| **customSections**
[`object[]`](#custom-sections) | Цифровые рабочие места, которые видит пользователь, с признаком размещения в них типа. [Описание объекта](#custom-sections) ||
|#

#### Объект relations {#relations}

#|
|| **Название**
`тип` | **Описание** ||
|| **parent**
[`object[]`](#relation) | Родительские типы объектов CRM: к их элементам можно привязать элемент смарт-процесса ||
|| **child**
[`object[]`](#relation) | Дочерние типы объектов CRM: их элементы можно привязать к элементу смарт-процесса ||
|#

#### Объект связи {#relation}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор связанного типа объекта CRM, например `3` для контакта. Идентификаторы системных типов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md#entity-types) ||
|| **isChildrenListEnabled**
[`boolean`](../../../data-types.md) | Показывается ли список дочерних элементов в карточке родительского элемента ||
|| **isPredefined**
[`boolean`](../../../data-types.md) | Системная ли связь. Например, при включенном поле «Клиент» связи с контактом и компанией системные ||
|#

В ответ попадают только связи с типами, которые пользователь может читать.

#### Объект linkedUserFields {#linked-user-fields}

Ключ — код пользовательского поля, значение — признак `true` или `false`: можно ли выбрать элемент смарт-процесса в этом поле.

#|
|| **Название**
`тип` | **Описание** ||
|| ```CALENDAR_EVENT|UF_CRM_CAL_EVENT```
[`boolean`](../../../data-types.md) | Привязка к CRM в событии календаря ||
|| ```TASKS_TASK|UF_CRM_TASK```
[`boolean`](../../../data-types.md) | Привязка к CRM в задаче ||
|| ```TASKS_TASK_TEMPLATE|UF_CRM_TASK```
[`boolean`](../../../data-types.md) | Привязка к CRM в шаблоне задачи ||
|#

#### Объект цифрового рабочего места {#custom-sections}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор цифрового рабочего места ||
|| **title**
[`string`](../../../data-types.md) | Название цифрового рабочего места ||
|| **isSelected**
[`boolean`](../../../data-types.md) | Размещен ли тип в этом рабочем месте. Совпадает с полем `customSectionId` ||
|| **isAdditional**
[`boolean`](../../../data-types.md) | Добавлен ли тип в это рабочее место дополнительно. Совпадает со списком `additionalCustomSectionIds` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `0` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Тип не найден {#not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `0` не найдена | Типа с таким `entityTypeId` нет, это системный тип, например `2` для сделки или `31` для счета, или у пользователя нет доступа к типу. Проверьте идентификатор методом [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md). В тексте ошибки всегда `0`, а не переданный идентификатор ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `entityTypeId` | Обязательное поле `entityTypeId` не указано | Передайте `entityTypeId`. Параметр `id` метод не принимает ||
|| `entityTypeId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор типа ||
|| `entityTypeId` | В поле `entityTypeId` требуется тип данных `int` для такого запроса | Передайте идентификатор числом, например `1038` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartProcess.get` не найден | Напишите имя метода в нижнем регистре: `crm.smartprocess.get` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-smart-process-list-rest-v3.md)
- [{#T}](./crm-smart-process-update-rest-v3.md)
- [{#T}](./crm-smart-process-field-list-rest-v3.md)
- [{#T}](../items/crm-entity-get-rest-v3.md)
