# Получить список элементов CRM v 3.0 crm.<тип>.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение элементов этого типа объекта CRM. Для моей компании — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.list` возвращает список элементов CRM с фильтрацией, сортировкой и постраничной навигацией. Тип объекта задает сегмент `<тип>` в имени метода.

В список попадают только элементы, которые пользователь может читать. Элементы без доступа метод пропускает без ошибки.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.list` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.list` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.list` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.list` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.list` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.list` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.list` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.list`, например `crm.smartprocess1038.list` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.list`, а не `crm.smartInvoice.list`. На имя в другом регистре или с несуществующим `entityTypeId` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

Количество элементов по тому же фильтру без выгрузки списка возвращает метод [crm.<тип>.aggregate](./crm-entity-aggregate-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть для каждого элемента. [Описание параметра](#select)

Если параметр не передан, каждый элемент списка содержит только `id` ||
|| **filter**
[`array`](../../../data-types.md) | Условия отбора элементов в формате REST 3.0. [Описание параметра](#filter)

Если параметр не передан, метод возвращает все доступные элементы ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. [Описание параметра](#order)

По умолчанию: `{"id": "ASC"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации. [Описание параметра](#pagination)

По умолчанию метод возвращает первые 50 элементов ||
|#

### Параметр select {#select}

Имена полей пишутся в camelCase: `title`, `stageId`, `assignedById`. Состав полей у каждого типа объекта свой, описания полей — на страницах:

- [поля сделки](./fields-deal.md)
- [поля лида](./fields-lead.md)
- [поля контакта](./fields-contact.md)
- [поля компании](./fields-company.md)
- [поля предложения](./fields-quote.md)
- [поля счета](./fields-smart-invoice.md)
- [поля моей компании](./fields-my-company.md)
- [поля смарт-процесса](./fields-smart-process.md)

Список полей возвращает метод [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).

Элементы в ответе содержат только поля из `select`. Поле `id` не добавляется автоматически — передайте его в списке, если оно нужно в ответе. Пустой массив `[]` возвращает элементы пустыми массивами. Звездочка `*` не поддерживается.

Связанные объекты запрашиваются по имени поля без суффикса `Id`: `assignedBy`, `stage`, `category`, `company`. Есть два способа:

- имя связанного объекта целиком, например `assignedBy`, возвращает все поля объекта
- путь через точку, например `assignedBy.firstName`, `stage.name` или `company.title`, возвращает только выбранные поля

Путь допускает одну точку: `company.assignedBy.firstName` вызывает ошибку неизвестного поля. У сотрудников — `assignedBy`, `createdBy` и других — имя хранится в полях `firstName` и `lastName`, поля `name` нет. Подробнее о связанных полях — в [обзоре REST 3.0](../../../rest-v3.md#connection).

Пользовательские поля передаются по имени, например `UF_CRM_1687529546`. Их список возвращает метод [crm.<тип>.field.custom.list](../fields/crm-entity-field-custom-list-rest-v3.md).

Неизвестное поле в `select` — у самого элемента или у связанного объекта — вызывает ошибку `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`. Метод не пропускает такое поле молча.

### Параметр filter {#filter}

Фильтр — массив условий. Условия массива соединяются логикой И. Условие записывается одним из способов:

- `["поле", "оператор", значение]` — например `["opportunity", ">=", 10000]`
- `["поле", значение]` — оператор `=`, а для значения-массива `in`: `["id", [17, 19]]`

Операторы: `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`, `between`. Их описание — в [обзоре REST 3.0](../../../rest-v3.md#operators). Других операторов нет: `like` и поиск по части строки не поддерживаются, `["title", "=", "Поставка"]` находит только элементы с точно таким названием.

Фильтровать можно по полям, у которых в ответе [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md) признак `filterable` равен `true`. Значение должно соответствовать типу поля:

#|
|| **Тип поля** | **Формат значения** ||
|| `int`, `float` | Число: `69`, `10000` ||
|| `bool` | `true` или `false`. Строки `Y` и `N` вызывают ошибку валидации ||
|| `date-time` | Дата и время с часовым поясом: `2026-11-03T14:41:00+03:00`. Без пояса или только дата — ошибка валидации ||
|| `date` | Дата: `2026-11-01` ||
|| `string` | Строка, сравнение на точное совпадение ||
|#

#### Группы условий

Чтобы соединить условия логикой ИЛИ, передайте группу — объект с ключами:

- `type` — значение `filter`. Внутри массива `filter` ключ обязателен: группа без него вызывает ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`
- `logic` — `and` или `or`, по умолчанию `and`
- `negative` — `true` инвертирует группу: подходят элементы, для которых условие группы не выполнено
- `conditions` — массив условий и вложенных групп

Пример: элементы воронки `69` с суммой от 10 000, у которых стадия `DT1038_69:CLIENT` или ответственный — пользователь `1`.

```json
{
    "filter": [
        ["categoryId", "=", 69],
        ["opportunity", ">=", 10000],
        {
            "type": "filter",
            "logic": "or",
            "conditions": [
                ["stageId", "=", "DT1038_69:CLIENT"],
                ["assignedById", "=", 1]
            ]
        }
    ]
}
```

Если весь фильтр — одна группа, ее можно передать объектом вместо массива: `"filter": {"logic": "or", "conditions": [...]}`. В этом случае `type` можно не указывать.

Ограничения фильтра:

- вложенность групп — до 8 уровней
- условий и групп в фильтре — до 100
- значений во всех списках `in` фильтра — до 1000

#### Связанные поля в фильтре

Условие можно задать по полю связанного объекта через точку:

- поле связанного элемента CRM — `["company.title", "=", "Ромашка"]`, `["myCompany.title", "=", "Моя компания"]`, `["contact.name", "=", "Иван"]`
- значение телефона, почты, сайта или мессенджера — `["phone.value", "=", "+79990000000"]`, у сделки — `["contact.phone.value", "=", "+79990000000"]`. Для этих полей доступны только операторы `=` и `in`
- метка UTM — `["utm.source", "=", "google"]`, поля `source`, `medium`, `campaign`, `content`, `term`
- время последней коммуникации — `["lastCommunication.callTime", ">", "2026-11-01T00:00:00+03:00"]`

Поля сотрудников, стадий, воронок и других справочников через точку не фильтруются: `["assignedBy.lastName", "=", "Иванова"]` вызывает ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`. Фильтруйте по идентификатору: `assignedById`, `stageId`, `categoryId`.

#### Пустые значения и множественные поля

Значение `null` можно передать только с операторами `=` и `!=` и только для полей, которые бывают пустыми, например `companyId`, `contactId`, `myCompanyId`. Для остальных полей `null` вызывает ошибку валидации типа.

Пустая привязка к элементу CRM хранится по-разному: в ответе `companyId` равен `null`, но в базе может лежать `0`. Чтобы найти все элементы без компании, проверяйте оба значения:

```json
{
    "filter": [
        {
            "type": "filter",
            "logic": "or",
            "conditions": [
                ["companyId", "=", 0],
                ["companyId", "=", null]
            ]
        }
    ]
}
```

Для множественных полей `contactsId` и `observersId` доступны только операторы `=`, `!=` и `in`. Условие `["contactsId", "in", [5, 7]]` находит элементы, к которым привязан хотя бы один из контактов. Для полей-идентификаторов связанных элементов, например `contactId`, оператор `between` не поддерживается.

{% note warning "" %}

Если `filter` передан не массивом и не объектом, например строкой или числом, метод не возвращает ошибку: условие не применяется, и ответ содержит все доступные элементы. Объект с полями вида `{"id": 17}` вызывает ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`.

{% endnote %}

### Параметр order {#order}

Объект, где ключ — имя поля, а значение — направление сортировки. Сортировать можно по полям, у которых в ответе [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md) признак `sortable` равен `true`. Поля связанных объектов через точку и множественные поля, например `contactsId`, сортировку не поддерживают.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Регистр направления не важен: `asc` и `ASC` работают одинаково.

Если передано несколько полей, элементы сортируются по ним в порядке перечисления: `{"stageId": "ASC", "opportunity": "DESC"}`. Если `id` нет в `order`, метод добавляет его последним ключом с направлением `ASC`. Поэтому порядок элементов с одинаковыми значениями не меняется между страницами.

Строковые поля сортируются по значению. Например, `stageId` сортируется по коду стадии, а не по ее положению в воронке.

По умолчанию: `{"id": "ASC"}`

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество элементов на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Ноль и отрицательное значение возвращают первую страницу.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество элементов, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

Другие ключи в `pagination` вызывают ошибку. Параметр `start` из предыдущей версии REST метод не учитывает.

{% note info "" %}

Ответ не содержит общего количества элементов. Если на странице вернулось меньше элементов, чем указано в `limit`, это последняя страница. Количество элементов по фильтру возвращает метод [crm.<тип>.aggregate](./crm-entity-aggregate-rest-v3.md).

{% endnote %}

## Отличия типов объектов

- `crm.company.list` не возвращает компании из списка «Мои компании». Их получают методом `crm.mycompany.list`
- `crm.deal.list` не возвращает шаблоны регулярных сделок. Шаблоны регулярных счетов и смарт-процессов с включенной регулярностью метод тоже пропускает
- у смарт-процесса состав полей зависит от настроек типа: например, без стадий нет `stageId`, без привязки к клиенту — `companyId` и `contactId`. Подробнее — на странице [полей смарт-процесса](./fields-smart-process.md)

{% note warning "" %}

У смарт-процессов поле `stageSemanticId` и объект `stageSemantic` есть в ответе `crm.<тип>.field.list`, но в `select`, `filter` и `order` вызывают ошибку `Неизвестное поле stageSemanticId`. Группу стадии смарт-процесса берите из объекта `stage` — поле `semanticId`. У сделки `stageSemanticId` работает.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.list`

{% endnote %}

Примеры получают элементы смарт-процесса с идентификатором типа `1038` из воронки `69` с суммой от 10 000 — первую страницу по два элемента, по убыванию суммы. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","stageId","opportunity","assignedBy.firstName"],"filter":[["categoryId","=",69],["opportunity",">=",10000]],"order":{"opportunity":"DESC"},"pagination":{"limit":2,"page":1}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","stageId","opportunity","assignedBy.firstName"],"filter":[["categoryId","=",69],["opportunity",">=",10000]],"order":{"opportunity":"DESC"},"pagination":{"limit":2,"page":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ItemListResult = {
      items: {
        id: number
        title: string
        stageId: string
        opportunity: number
        assignedBy: {
          firstName: string
        }
      }[]
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ItemListResult>(
        'crm.smartprocess1038.list',
        {
          select: ['id', 'title', 'stageId', 'opportunity', 'assignedBy.firstName'],
          filter: [
            ['categoryId', '=', 69],
            ['opportunity', '>=', 10000],
          ],
          order: {
            opportunity: 'DESC',
          },
          pagination: {
            limit: 2,
            page: 1,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Items:', result.items)
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
      async function listItems() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.list',
            {
              select: ['id', 'title', 'stageId', 'opportunity', 'assignedBy.firstName'],
              filter: [
                ['categoryId', '=', 69],
                ['opportunity', '>=', 10000],
              ],
              order: {
                opportunity: 'DESC',
              },
              pagination: {
                limit: 2,
                page: 1,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Items:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listItems)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "title", "stageId", "opportunity", "assignedBy.firstName"],
                "filter": [
                    ["categoryId", "=", 69],
                    ["opportunity", ">=", 10000],
                ],
                "order": {"opportunity": "DESC"},
                "pagination": {"limit": 2, "page": 1},
            },
            prefer_version=3,
        )
        for item in response["result"]["items"]:
            print(item["id"], item["title"], item["opportunity"])
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
                'crm.smartprocess1038.list',
                [
                    'select' => ['id', 'title', 'stageId', 'opportunity', 'assignedBy.firstName'],
                    'filter' => [
                        ['categoryId', '=', 69],
                        ['opportunity', '>=', 10000],
                    ],
                    'order' => [
                        'opportunity' => 'DESC',
                    ],
                    'pagination' => [
                        'limit' => 2,
                        'page' => 1,
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
        'crm.smartprocess1038.list',
        {
            select: ['id', 'title', 'stageId', 'opportunity', 'assignedBy.firstName'],
            filter: [
                ['categoryId', '=', 69],
                ['opportunity', '>=', 10000],
            ],
            order: {
                opportunity: 'DESC',
            },
            pagination: {
                limit: 2,
                page: 1,
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
        'crm.smartprocess1038.list',
        [
            'select' => ['id', 'title', 'stageId', 'opportunity', 'assignedBy.firstName'],
            'filter' => [
                ['categoryId', '=', 69],
                ['opportunity', '>=', 10000],
            ],
            'order' => [
                'opportunity' => 'DESC',
            ],
            'pagination' => [
                'limit' => 2,
                'page' => 1,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.list", b24.Params{
    	"select": []string{"id", "title", "stageId", "opportunity", "assignedBy.firstName"},
    	"filter": []any{
    		[]any{"categoryId", "=", 69},
    		[]any{"opportunity", ">=", 10000},
    	},
    	"order": b24.Params{
    		"opportunity": "DESC",
    	},
    	"pagination": b24.Params{
    		"limit": 2,
    		"page":  1,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID          int     `json:"id"`
    	Title       string  `json:"title"`
    	StageID     string  `json:"stageId"`
    	Opportunity float64 `json:"opportunity"`
    	AssignedBy  struct {
    		FirstName string `json:"firstName"`
    	} `json:"assignedBy"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Title, it.Opportunity)
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
                "id": 21,
                "title": "Ремонт оргтехники",
                "stageId": "DT1038_69:CLIENT",
                "opportunity": 95000,
                "assignedBy": {
                    "firstName": "Мария"
                }
            },
            {
                "id": 19,
                "title": "Поставка картриджей",
                "stageId": "DT1038_69:PREPARATION",
                "opportunity": 48000,
                "assignedBy": {
                    "firstName": "Мария"
                }
            }
        ]
    },
    "time": {
        "start": 1793706441,
        "finish": 1793706441.814752,
        "duration": 0.8147521018981934,
        "processing": 0,
        "date_start": "2026-11-03T14:47:21+03:00",
        "date_finish": "2026-11-03T14:47:21+03:00",
        "operating_reset_at": 1793706780,
        "operating": 0.14652299880981445
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
[`array`](../../../data-types.md) | Массив элементов текущей страницы. Если под фильтр ничего не подходит или страница за пределами списка, массив пустой ||
|| **result.items[]**
[`object`](../../../data-types.md) | Элемент CRM. Состав полей задает параметр `select`, без него элемент содержит только `id`. Связанные поля из `select` приходят вложенными объектами, например `"assignedBy": {"firstName": "Мария"}`. Описание полей — на странице полей типа объекта ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION",
        "message": "Не удается распознать выражение фильтра `{\"logic\":\"or\",\"conditions\":[[\"id\",17],[\"id\",\"in\",[21,23]]]}`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | В DTO `#DTO#` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Поле не участвует в фильтре. Используйте поля, у которых в `crm.<тип>.field.list` признак `filterable` равен `true` ||
|| `#FIELD#` | В DTO `#DTO#` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Поле не участвует в сортировке. Используйте поля, у которых в `crm.<тип>.field.list` признак `sortable` равен `true` ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Передайте значение типа поля: число, `true` или `false`, дату и время с часовым поясом. Ошибку вызывает и `null` для поля, которое не бывает пустым ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Проверьте условие из текста ошибки. Частые причины: группа внутри массива без `"type": "filter"`, неверное значение `logic`, условие не из двух или трех элементов, объект вида `{"id": 17}` вместо массива условий, недопустимый оператор для поля, `null` с оператором кроме `=` и `!=`, путь через точку к полю сотрудника или справочника ||
|| `-` | Не удается распознать выражение фильтра `Filter node limit exceeded.` | Сократите фильтр до 100 условий и групп ||
|| `-` | Не удается распознать выражение фильтра `Filter depth limit exceeded.` | Уменьшите вложенность групп до 8 уровней ||
|| `-` | Не удается распознать выражение фильтра `Filter collection operand limit exceeded.` | Передайте во всех списках `in` не больше 1000 значений ||
|#

#### Неизвестный оператор фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../../rest-v3.md#operators) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля в `select`, `filter` или `order` по странице полей типа объекта. Ошибку вызывают также путь через точку в `order` и путь с двумя точками в `select` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","title"]` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `#ORDER#` | Передайте `order` объектом, например `{"opportunity":"DESC"}`, с направлением `ASC` или `DESC` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `pagination` объектом только с ключами `limit`, `page`, `offset`. В `limit` — положительное число, в `offset` — неотрицательное, в `page` — число ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-add-rest-v3.md)
- [{#T}](./crm-entity-update-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-delete-rest-v3.md)
- [{#T}](./crm-entity-aggregate-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
