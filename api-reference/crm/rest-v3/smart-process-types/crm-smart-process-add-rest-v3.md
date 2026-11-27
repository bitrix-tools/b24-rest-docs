# Создать тип смарт-процесса v 3.0 crm.smartprocess.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом управлять смарт-процессами в настройках прав CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.smartprocess.add` создает тип смарт-процесса и возвращает его идентификатор `entityTypeId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с настройками нового типа в формате `{"поле": "значение"}`. Обязательно поле `title`. [Описание параметра](#fields) ||
|#

Имя метода пишется в нижнем регистре: `crm.smartprocess.add`. На имя `crm.smartProcess.add` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **title***
[`string`](../../../data-types.md) | Название типа. Пробелы в начале и в конце метод удаляет. Строка из одних пробелов вызывает ошибку ||
|| **code**
[`string`](../../../data-types.md) | Символьный код типа, до 255 символов ||
|| **description**
[`string`](../../../data-types.md) | Описание типа, до 1000 символов. Пробелы и переносы строк в начале и в конце метод удаляет. Пустая строка сохраняется как `null` ||
|| **daysBeforeClose**
[`integer`](../../../data-types.md) | Сколько дней с момента создания отводится элементу до завершения: от `0` до `365`. Чтобы не задавать срок, передайте `null` ||
|| **isCategoriesEnabled**
[`boolean`](../../../data-types.md) | Включить свои воронки ||
|| **isStagesEnabled**
[`boolean`](../../../data-types.md) | Включить свои стадии и канбан ||
|| **isBeginCloseDatesEnabled**
[`boolean`](../../../data-types.md) | Включить поля «Дата начала» и «Дата завершения» ||
|| **isClientEnabled**
[`boolean`](../../../data-types.md) | Включить поле «Клиент». Вместе с ним у типа появляются системные связи с контактом и компанией ||
|| **isUseInUserfieldEnabled**
[`boolean`](../../../data-types.md) | Разрешить использовать тип в пользовательском поле ||
|| **isLinkWithProductsEnabled**
[`boolean`](../../../data-types.md) | Включить привязку товаров каталога ||
|| **isMycompanyEnabled**
[`boolean`](../../../data-types.md) | Включить поле «Реквизиты вашей компании» ||
|| **isDocumentsEnabled**
[`boolean`](../../../data-types.md) | Включить печать документов ||
|| **isSourceEnabled**
[`boolean`](../../../data-types.md) | Включить поля «Источник» и «Дополнительно об источнике» ||
|| **isObserversEnabled**
[`boolean`](../../../data-types.md) | Включить поле «Наблюдатели» ||
|| **isRecurringEnabled**
[`boolean`](../../../data-types.md) | Включить регулярные элементы ||
|| **isRecyclebinEnabled**
[`boolean`](../../../data-types.md) | Отправлять удаленные элементы в корзину ||
|| **isAutomationEnabled**
[`boolean`](../../../data-types.md) | Включить роботов и триггеры ||
|| **isBizProcEnabled**
[`boolean`](../../../data-types.md) | Включить дизайнер бизнес-процессов ||
|| **isCountersEnabled**
[`boolean`](../../../data-types.md) | Включить режим просмотра «Дела» и счетчики ||
|| **isMultifieldsEnabled**
[`boolean`](../../../data-types.md) | Включить поля коммуникаций: телефон, почту, сайт, мессенджер ||
|| **isPersonEnabled**
[`boolean`](../../../data-types.md) | Включить учет людей ||
|| **isStartCatalogEnabled**
[`boolean`](../../../data-types.md) | Показывать тип в каталоге запуска процессов ||
|| **isCreateByFormEnabled**
[`boolean`](../../../data-types.md) | Разрешить создавать элементы через CRM-форму ||
|| **isSetOpenPermissions**
[`boolean`](../../../data-types.md) | Делать новые воронки доступными для всех ||
|| **startCatalogFormId**
[`integer`](../../../data-types.md) | CRM-форма для каталога запуска процессов. При создании типа можно передать только `null` или `0`: форму выбирают методом [crm.smartprocess.update](./crm-smart-process-update-rest-v3.md) ||
|| **relations**
[`object`](./crm-smart-process-get-rest-v3.md#relations) | Связи типа с другими объектами CRM. Допускаются ключи `parent` и `child`, внутри каждого — массив объектов с `entityTypeId` и `isChildrenListEnabled`. Поле `isPredefined` при записи не передается.

Список заменяет прежние связи целиком: если ключ `parent` или `child` не передан, связи этого направления удаляются. Системные связи с `isPredefined: true` сохраняются, передавать их нельзя ||
|| **linkedUserFields**
[`object`](./crm-smart-process-get-rest-v3.md#linked-user-fields) | Привязки к пользовательским полям календаря и задач. Ключи: ```CALENDAR_EVENT|UF_CRM_CAL_EVENT```, ```TASKS_TASK|UF_CRM_TASK```, ```TASKS_TASK_TEMPLATE|UF_CRM_TASK```, значения — `true` или `false`.

Объект заменяет прежние привязки целиком: ключи, которые не переданы, получают `false` ||
|| **primaryCustomSectionId**
[`integer`](../../../data-types.md) | Основное цифровое рабочее место типа. Если передано вместе с `customSectionIds`, должно входить в этот список. Если не передано, основным становится первое место из `customSectionIds`.

При изменении типа без `customSectionIds` основным можно сделать только место, в котором тип уже размещен. Значение `null` метод пропускает ||
|| **customSectionIds**
[`integer[]`](../../../data-types.md) | Цифровые рабочие места типа. Идентификаторы — положительные целые числа без повторов.

Список заменяет прежний целиком. Пустой массив убирает тип из всех цифровых рабочих мест ||
|#

Признаки передаются как `true` или `false`. Если признак не передан, он выключен, кроме `isSetOpenPermissions`: по умолчанию он включен. Значения по умолчанию у созданного типа возвращает метод [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md).

Поля `entityTypeId`, `createdBy`, `updatedBy`, `createdTime`, `updatedTime` и `isPaymentsEnabled` метод не принимает: идентификатор типа Битрикс24 назначает сам, остальные поля только для чтения. Списки `relations`, `linkedUserFields` и `customSectionIds` задаются целиком и заменяют прежние при изменении типа.

{% note info "" %}

Признаки `isStartCatalogEnabled`, `isCreateByFormEnabled` и поле `startCatalogFormId` меняются, только если в Битрикс24 включен запуск смарт-процессов через CRM-формы. Иначе на значение, отличное от текущего, метод отвечает [ошибкой доступа](#access-denied).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess.add`

{% endnote %}

Примеры создают тип «Заявки поставщикам» с воронками, стадиями и полем «Клиент».

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Заявки поставщикам","code":"supplier_requests","description":"Заявки на поставку товаров","isCategoriesEnabled":true,"isStagesEnabled":true,"isClientEnabled":true}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Заявки поставщикам","code":"supplier_requests","description":"Заявки на поставку товаров","isCategoriesEnabled":true,"isStagesEnabled":true,"isClientEnabled":true},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SmartProcessAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<SmartProcessAddResult>(
        'crm.smartprocess.add',
        {
          fields: {
            title: 'Заявки поставщикам',
            code: 'supplier_requests',
            description: 'Заявки на поставку товаров',
            isCategoriesEnabled: true,
            isStagesEnabled: true,
            isClientEnabled: true,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created smart process type, entityTypeId:', result.id)
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
      async function addSmartProcessType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess.add',
            {
              fields: {
                title: 'Заявки поставщикам',
                code: 'supplier_requests',
                description: 'Заявки на поставку товаров',
                isCategoriesEnabled: true,
                isStagesEnabled: true,
                isClientEnabled: true,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created smart process type, entityTypeId:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addSmartProcessType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "title": "Заявки поставщикам",
                    "code": "supplier_requests",
                    "description": "Заявки на поставку товаров",
                    "isCategoriesEnabled": True,
                    "isStagesEnabled": True,
                    "isClientEnabled": True,
                },
            },
            prefer_version=3,
        )
        print("entityTypeId:", response["result"]["id"])
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
                'crm.smartprocess.add',
                [
                    'fields' => [
                        'title' => 'Заявки поставщикам',
                        'code' => 'supplier_requests',
                        'description' => 'Заявки на поставку товаров',
                        'isCategoriesEnabled' => true,
                        'isStagesEnabled' => true,
                        'isClientEnabled' => true,
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
        'crm.smartprocess.add',
        {
            fields: {
                title: 'Заявки поставщикам',
                code: 'supplier_requests',
                description: 'Заявки на поставку товаров',
                isCategoriesEnabled: true,
                isStagesEnabled: true,
                isClientEnabled: true,
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
        'crm.smartprocess.add',
        [
            'fields' => [
                'title' => 'Заявки поставщикам',
                'code' => 'supplier_requests',
                'description' => 'Заявки на поставку товаров',
                'isCategoriesEnabled' => true,
                'isStagesEnabled' => true,
                'isClientEnabled' => true,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess.add", b24.Params{
    	"fields": b24.Params{
    		"title":               "Заявки поставщикам",
    		"code":                "supplier_requests",
    		"description":         "Заявки на поставку товаров",
    		"isCategoriesEnabled": true,
    		"isStagesEnabled":     true,
    		"isClientEnabled":     true,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess.add: %w", err)
    }

    var created struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &created); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("entityTypeId:", created.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 1250
    },
    "time": {
        "start": 1795431025,
        "finish": 1795431028.336084,
        "duration": 3.3360838890075684,
        "processing": 3,
        "date_start": "2026-11-23T13:50:25+03:00",
        "date_finish": "2026-11-23T13:50:28+03:00",
        "operating_reset_at": 1795431600,
        "operating": 3.2407209873199463
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
[`integer`](../../../data-types.md) | Идентификатор `entityTypeId` созданного типа. Его подставляют в имя методов элементов, например `crm.smartprocess1250.add`. Настройки типа возвращает метод [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md) ||
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
                "message": "Не заполнено обязательное поле \"title\"",
                "field": "title"
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
|| `fields.title` | Title must not be empty. | Передайте в `title` непустую строку ||
|| `title` | В поле `title` требуется тип данных `string` для такого запроса | Передайте значение того типа, который указан в [описании поля](#fields) ||
|| `isClientEnabled` | В поле `isClientEnabled` требуется тип данных `bool` для такого запроса | Передайте признак как `true` или `false`, а не `"Y"` ||
|| `fields.daysBeforeClose` | Invalid smart process field. | Передайте в `daysBeforeClose` число от `0` до `365` или `null`. Та же ошибка приходит на `code` длиннее 255 символов ||
|| `fields` | Invalid smart process fields. | Уберите `startCatalogFormId` больше `0`: форму выбирают после создания типа методом [crm.smartprocess.update](./crm-smart-process-update-rest-v3.md) ||
|| `DESCRIPTION_TOO_LONG` | Описание должно быть не больше 1000 символов | Сократите `description` до 1000 символов ||
|| `fields.relations` | Invalid smart process field. | Проверьте структуру связей: `parent` и `child` содержат объекты с положительным `entityTypeId` и булевым `isChildrenListEnabled`. Для `linkedUserFields`, `primaryCustomSectionId` и `customSectionIds` проверьте формат по таблице параметров ||
|| `fields.relations` | The requested relations are unavailable. | Оставьте доступные связи. Для `linkedUserFields` сообщение — `The requested linked user fields are unavailable.`, для рабочих мест — `The requested workplace is unavailable.` ||
|| `fields.primaryCustomSectionId` | The primary workplace must be in the list. | Добавьте `primaryCustomSectionId` в список `customSectionIds` или не передавайте его: основным станет первое место списка ||
|| `RESTRICTION` | The smart process change is restricted. | Битрикс24 не сохранил тип. Например, на тарифе исчерпан лимит смарт-процессов или нельзя включить переданный признак: так метод отвечает на `"isPersonEnabled": true` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `title` | Не заполнено обязательное поле "title" | Передайте `title` в `fields` ||
|| `entityTypeId` | Поле "entityTypeId" не доступно к заполнению | Уберите `entityTypeId` из `fields`: идентификатор типа назначается автоматически. Так же метод отвечает на другие поля только для чтения, например `isPaymentsEnabled` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `SmartProcessDto` | Проверьте имя поля по [таблице параметра fields](#fields). Ошибку с именем поля `0` вызывает `fields`, переданный строкой вместо объекта. Так же метод отвечает на устаревшие поля `customSectionId` и `customSections` ||
|#

#### Ошибка доступа {#access-denied}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM или пользователя с правом управлять смарт-процессами. Ошибку также вызывает `isStartCatalogEnabled` или `isCreateByFormEnabled` со значением `true`, если в Битрикс24 выключен запуск смарт-процессов через CRM-формы ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartProcess.add` не найден | Напишите имя метода в нижнем регистре: `crm.smartprocess.add` ||
|#

#### Внутренняя ошибка

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INTERNAL_INTERNALEXCEPTION`, HTTP-статус **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Что-то пошло не так | Битрикс24 не завершил запись типа. Проверьте методом [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md), создан ли тип, и повторите запрос ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-smart-process-update-rest-v3.md)
- [{#T}](./crm-smart-process-get-rest-v3.md)
- [{#T}](../items/crm-entity-add-rest-v3.md)
- [{#T}](../fields/crm-entity-field-custom-add-rest-v3.md)
