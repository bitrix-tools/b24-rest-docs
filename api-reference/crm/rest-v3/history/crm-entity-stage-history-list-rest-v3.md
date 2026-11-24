# Получить историю стадий элемента v 3.0 crm.<тип>.stagehistory.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента и правом на просмотр истории в роли CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.stagehistory.list` возвращает переходы элементов CRM по стадиям и воронкам: в каждой записи новая стадия и стадия, с которой элемент перешел.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.stagehistory.list` ||
|| Лид | `crm.lead.stagehistory.list` ||
|| Счет | `crm.smartinvoice.stagehistory.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.stagehistory.list`, например `crm.smartprocess1038.stagehistory.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). Метод есть только у смарт-процесса с включенными стадиями — `isStagesEnabled`. У контактов, компаний, предложений, моей компании и документов метода нет.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.stagehistory.list`, а не `crm.smartInvoice.stageHistory.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Обязательно условие по элементу `["ownerId","=",<идентификатор элемента>]` или период по `createdTime` с обеими границами, например `[["ownerId","=",69]]`. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей записи, которые нужно вернуть, например `["id","entryType","stageId","previousStageId"]`. [Поля записи истории стадий](#item).

По умолчанию: все поля записи ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `id` и `createdTime`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `{"createdTime": "asc", "id": "asc"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание параметра](#pagination) ||
|#

### Параметр filter {#filter}

Фильтр принимает только эти условия:

#|
|| **Условие** | **Описание** ||
|| `["ownerId","=",69]` | Записи одного элемента. Значение — положительное целое число ||
|| `["createdTime",">=","2026-11-01T00:00:00+03:00"]` | Начало периода, включительно ||
|| `["createdTime","<","2026-12-01T00:00:00+03:00"]` | Конец периода, не включая границу ||
|#

Правила фильтра:

- нужно условие по `ownerId` или обе границы периода `createdTime`. Без `ownerId` метод возвращает переходы всех элементов этого типа объекта за период
- начало периода должно быть раньше конца
- дата и время передаются полностью, в формате `YYYY-MM-DDThh:mm:ss±hh:mm`. Дата без времени, например `2026-11-01`, вызывает ошибку
- каждое условие — не больше одного раза, условия объединяются по И
- другие поля, операторы, группы условий с `"logic": "or"` и отрицание не поддерживаются. Фильтра по стадии нет: отберите записи по `stageId` в своем коде

Если элемента из `ownerId` нет, он в корзине или у вас нет права на его просмотр, метод отвечает ошибкой [«Элемент не найден»](#entity-not-found), а не пустым списком.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество записей на странице. Значения больше `1000` уменьшаются до `1000`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество записей, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества записей. Если на странице вернулось меньше записей, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.stagehistory.list`

{% endnote %}

Примеры получают переходы по стадиям элемента смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",69]],"select":["id","createdTime","entryType","stageId","categoryId","previousStageId","previousCategoryId"],"order":{"createdTime":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.stagehistory.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",69]],"select":["id","createdTime","entryType","stageId","categoryId","previousStageId","previousCategoryId"],"order":{"createdTime":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.stagehistory.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageHistoryListResult = {
      items: Array<{
        id: number
        createdTime: string
        entryType: string
        stageId: string
        categoryId: number | null
        previousStageId: string | null
        previousCategoryId: number | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageHistoryListResult>(
        'crm.smartprocess1038.stagehistory.list',
        {
          filter: [
            ['ownerId', '=', 69],
          ],
          select: ['id', 'createdTime', 'entryType', 'stageId', 'categoryId', 'previousStageId', 'previousCategoryId'],
          order: {
            createdTime: 'asc',
          },
          pagination: {
            limit: 50,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Stage history:', result.items)
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
      async function listStageHistory() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.stagehistory.list',
            {
              filter: [
                ['ownerId', '=', 69],
              ],
              select: ['id', 'createdTime', 'entryType', 'stageId', 'categoryId', 'previousStageId', 'previousCategoryId'],
              order: {
                createdTime: 'asc',
              },
              pagination: {
                limit: 50,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Stage history:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listStageHistory)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.stagehistory.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerId", "=", 69],
                ],
                "select": ["id", "createdTime", "entryType", "stageId", "categoryId", "previousStageId", "previousCategoryId"],
                "order": {
                    "createdTime": "asc",
                },
                "pagination": {
                    "limit": 50,
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
                'crm.smartprocess1038.stagehistory.list',
                [
                    'filter' => [
                        ['ownerId', '=', 69],
                    ],
                    'select' => ['id', 'createdTime', 'entryType', 'stageId', 'categoryId', 'previousStageId', 'previousCategoryId'],
                    'order' => [
                        'createdTime' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 50,
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
        'crm.smartprocess1038.stagehistory.list',
        {
            filter: [
                ['ownerId', '=', 69],
            ],
            select: ['id', 'createdTime', 'entryType', 'stageId', 'categoryId', 'previousStageId', 'previousCategoryId'],
            order: {
                createdTime: 'asc',
            },
            pagination: {
                limit: 50,
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
        'crm.smartprocess1038.stagehistory.list',
        [
            'filter' => [
                ['ownerId', '=', 69],
            ],
            'select' => ['id', 'createdTime', 'entryType', 'stageId', 'categoryId', 'previousStageId', 'previousCategoryId'],
            'order' => [
                'createdTime' => 'asc',
            ],
            'pagination' => [
                'limit' => 50,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.stagehistory.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerId", "=", 69},
    	},
    	"select": []string{"id", "createdTime", "entryType", "stageId", "categoryId", "previousStageId", "previousCategoryId"},
    	"order": b24.Params{
    		"createdTime": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.stagehistory.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID                 int     `json:"id"`
    		CreatedTime        string  `json:"createdTime"`
    		EntryType          string  `json:"entryType"`
    		StageID            string  `json:"stageId"`
    		CategoryID         *int    `json:"categoryId"`
    		PreviousStageID    *string `json:"previousStageId"`
    		PreviousCategoryID *int    `json:"previousCategoryId"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.CreatedTime, item.EntryType, item.StageID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 215,
                "createdTime": "2026-11-23T13:50:53+03:00",
                "entryType": "creation",
                "stageId": "DT1038_69:NEW",
                "categoryId": 69,
                "previousStageId": null,
                "previousCategoryId": null
            },
            {
                "id": 217,
                "createdTime": "2026-11-23T13:51:06+03:00",
                "entryType": "modification",
                "stageId": "DT1038_69:PREPARATION",
                "categoryId": 69,
                "previousStageId": "DT1038_69:NEW",
                "previousCategoryId": 69
            }
        ]
    },
    "time": {
        "start": 1795431071,
        "finish": 1795431072.028404,
        "duration": 1.0284039974212646,
        "processing": 0,
        "date_start": "2026-11-23T13:51:11+03:00",
        "date_finish": "2026-11-23T13:51:12+03:00",
        "operating_reset_at": 1795431660,
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
|| **result.items**
[`object[]`](../../../data-types.md) | Массив записей истории стадий с полями из `select`, без `select` — со всеми полями. Если записей нет, массив пустой. [Поля записи истории стадий](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля записи истории стадий {#item}

Описание полей с признаками `filterable` и `sortable` возвращают методы `crm.<тип>.stagehistory.field.list` и `crm.<тип>.stagehistory.field.get`.

#|
|| **Название**
`тип` | **Описание** | **Фильтр** | **Сортировка** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор записи истории стадий | Нет | Да ||
|| **ownerId**
[`integer`](../../../data-types.md) | Идентификатор элемента | Да | Нет ||
|| **ownerTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта, например `2` у сделки или `1038` у смарт-процесса. Список типов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md) | Нет | Нет ||
|| **createdTime**
[`datetime`](../../../data-types.md) | Дата и время перехода | Да | Да ||
|| **entryType**
[`string`](../../../data-types.md) | Вид записи.

Возможные значения:

- `creation` — элемент создан на стадии `stageId`
- `modification` — элемент перешел на промежуточную стадию
- `finalization` — элемент перешел на финальную стадию, успешную или неуспешную
- `categoryChange` — элемент перенесен в другую воронку
- `junk` — служебный вид записи, новые записи с ним не создаются
- `unknown` — вид записи не распознан | Нет | Нет ||
|| **stageId**
[`string`](../../../data-types.md) | Код стадии после перехода, например `PREPARATION` у сделки или `DT1038_69:PREPARATION` у смарт-процесса | Нет | Нет ||
|| **categoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки после перехода. У лида — `null`: у лидов нет воронок | Нет | Нет ||
|| **previousStageId**
[`string`](../../../data-types.md) | Код стадии до перехода. У записи `creation` — `null` | Нет | Нет ||
|| **previousCategoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки до перехода. У записи `creation` и у лида — `null` | Нет | Нет ||
|#

Стадии и воронки сделки и смарт-процесса возвращают методы [crm.<тип>.category.stage.list](../categories/crm-entity-category-stage-list-rest-v3.md) и [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md). Стадии лида и счета возвращает метод прошлой версии [crm.status.list](../../status/crm-status-list.md).

{% note info "" %}

Записи о стадиях удаленного элемента недоступны. Элемент, восстановленный из корзины методом [crm.recyclebin.restore](../recyclebin/crm-recyclebin-restore-rest-v3.md), получает новый идентификатор, и история его стадий начинается заново.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Не удается распознать выражение фильтра `filter.createdTime`",
                "field": "filter.createdTime"
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
|| `filter.createdTime` | Не удается распознать выражение фильтра `filter.createdTime` | Фильтр не передан, в нем нет `ownerId` и одной из границ периода, начало периода не раньше конца или у `createdTime` другой оператор. Передайте `["ownerId","=",<идентификатор элемента>]` или обе границы: `[">=", начало]` и `["<", конец]` ||
|| `filter.ownerId` | Не удается распознать выражение фильтра `filter.ownerId` | Передайте одно условие `["ownerId","=",<идентификатор элемента>]` с положительным числом ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Уберите группы условий с `"logic": "or"` и отрицание: условия объединяются только по И ||
|| `createdTime` | В поле `createdTime` требуется тип данных `DateTime` для такого запроса | Передайте дату и время полностью, например `2026-11-01T00:00:00+03:00` ||
|| `ownerId` | В поле `ownerId` требуется тип данных `int` для такого запроса | Передайте идентификатор элемента числом, а не строкой ||
|| `stageId` | В DTO `StageTransitionDto` в поле `stageId` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `ownerId` и `createdTime` ||
|| `stageId` | В DTO `StageTransitionDto` в поле `stageId` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` и `createdTime` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Элемент не найден {#entity-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `9199` не найдена | Элемента из `ownerId` нет у этого типа объекта, он удален или у вас нет права на его просмотр. Проверьте `ownerId` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `fieldName` для сущности `StageTransitionDto` | Проверьте имена полей в `select`, `filter` и `order` по [таблице полей записи истории стадий](#item). Фильтра по `fieldName` у истории стадий нет ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права на просмотр истории в роли CRM, а у смарт-процесса цифрового рабочего места — права на просмотр истории этого рабочего места. Для методов лида — лиды выключены в настройках CRM. Вызовите метод от имени пользователя с правом или включите лиды ||
|#

#### Функция недоступна на тарифе

Код ошибки: `FEATURE_NOT_AVAILABLE_ON_CURRENT_PLAN`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Функция недоступна на текущем тарифе. | Тариф Битрикс24 не включает лиды. Ошибка приходит только у методов лида ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.contact.stagehistory.list` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.stagehistory.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md) и включены ли у типа стадии. У контактов, компаний, предложений, моей компании и документов метода нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-history-list-rest-v3.md)
- [{#T}](../categories/crm-entity-category-stage-list-rest-v3.md)
- [{#T}](../../crm-stage-history-list.md)
