# Как работать с полем типа Список

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — административный доступ к разделу CRM
>
> - [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) и [crm.deal.userfield.update](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-update.md) — администратор CRM
> - [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) — пользователь с правом «чтения» сделок
> - [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) — пользователь с правом «изменения» сделок
> - [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md) и [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) — пользователь с правом «чтения» сделок
> - [crm.deal.fields](../../../api-reference/crm/deals/crm-deal-fields.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поле типа Список хранит идентификатор выбранного варианта, а не его текст. Если в поле выбран вариант «Сайт», в ответе придет число `3897`, а само слово «Сайт» хранится отдельно, вместе с описанием поля.

Из этого следует главное правило работы с такими полями: и в запись, и в фильтр передается идентификатор варианта. Текст в записи обнулит поле, а текст в фильтре вернет посторонние сделки, причем оба раза без ошибки.

Разберем на примере сделок. Заведем два поля: одиночное «Источник обращения» и множественное «Интересы клиента». Заполним их в конкретной сделке, отберем сделки по значению и изменим состав вариантов.

Сценарий состоит из пяти шагов.

1. Создадим поля методом [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
2. Получим идентификаторы значений методами [crm.deal.fields](../../../api-reference/crm/deals/crm-deal-fields.md) и [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md)
3. Запишем значения методом [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md)
4. Отберем сделки по значению методом [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md)
5. Изменим состав значений методом [crm.deal.userfield.update](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-update.md)

В результате в сделке будут заполнены оба поля, отбор по значению вернет только нужные сделки, а переименование варианта не разорвет уже сохраненные ссылки на него.

## Что нужно до начала

Подготовьте данные сценария:

- **Сделка, в которой заполним поля.** Понадобится ее `id`. Сами поля создаются сразу для всех сделок, а не для одной
- **Список вариантов.** В примере это «Сайт», «Телефон» и «Партнер» для одиночного поля и «Обучение», «Внедрение», «Поддержка» для множественного
- **Доступ к REST.** Вебхук или приложение со scope `crm`. Поля создает и меняет только администратор CRM

Дальше в примерах используем сделку `8421`, коды полей `UF_CRM_ENUM_ONE` и `UF_CRM_ENUM_MULTI` и идентификаторы значений из ответов второго шага. В вашем Битрикс24 идентификаторы будут другими: жестко прописывать их в коде нельзя, каждый раз получайте их методом из второго шага.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Для примеров с b24pysdk нужен Python 3.9 или новее.

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## 1. Создадим поля со списком значений

Метод [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) создает пользовательское поле для всех сделок. Передайте параметры:

- `FIELD_NAME` — код поля. Параметр обязательный. Если код не начинается с `UF_CRM_`, префикс добавится автоматически
- `USER_TYPE_ID` — тип поля, для списка это `enumeration`
- `MULTIPLE` — `Y` для нескольких значений, `N` для одного
- `EDIT_FORM_LABEL` — название поля в карточке, по языкам
- `LIST` — массив вариантов вида `{ "VALUE": "текст" }`. Идентификаторы Битрикс24 присвоит сам

Без `LIST` поле тоже создастся, но выбирать в нем будет нечего: список вариантов останется пустым. Варианты можно добавить позже на пятом шаге.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    const sourceFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_ENUM_ONE',
                USER_TYPE_ID: 'enumeration',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Источник обращения', en: 'Request source' },
                LIST: [
                    { VALUE: 'Сайт' },
                    { VALUE: 'Телефон' },
                    { VALUE: 'Партнер' }
                ]
            }
        },
        'userfield-add-source'
    )

    const interestsFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_ENUM_MULTI',
                USER_TYPE_ID: 'enumeration',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Интересы клиента', en: 'Client interests' },
                LIST: [
                    { VALUE: 'Обучение' },
                    { VALUE: 'Внедрение' },
                    { VALUE: 'Поддержка' }
                ]
            }
        },
        'userfield-add-interests'
    )

    console.log(sourceFieldId, interestsFieldId)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    function callMethod($serviceBuilder, string $method, array $params = []): mixed
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    $sourceFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_ENUM_ONE',
            'USER_TYPE_ID' => 'enumeration',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Источник обращения', 'en' => 'Request source'],
            'LIST' => [
                ['VALUE' => 'Сайт'],
                ['VALUE' => 'Телефон'],
                ['VALUE' => 'Партнер'],
            ],
        ],
    ]);

    $interestsFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_ENUM_MULTI',
            'USER_TYPE_ID' => 'enumeration',
            'MULTIPLE' => 'Y',
            'EDIT_FORM_LABEL' => ['ru' => 'Интересы клиента', 'en' => 'Client interests'],
            'LIST' => [
                ['VALUE' => 'Обучение'],
                ['VALUE' => 'Внедрение'],
                ['VALUE' => 'Поддержка'],
            ],
        ],
    ]);

    print_r([$sourceFieldId, $interestsFieldId]);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    bitrix_token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN'

    def call_method(method, params=None):
        # Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
        return bitrix_token.call_method(
            api_method=method,
            params=params or {},
        )["result"]

    source_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_ENUM_ONE",
                "USER_TYPE_ID": "enumeration",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Источник обращения", "en": "Request source"},
                "LIST": [
                    {"VALUE": "Сайт"},
                    {"VALUE": "Телефон"},
                    {"VALUE": "Партнер"},
                ],
            },
        },
    )

    interests_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_ENUM_MULTI",
                "USER_TYPE_ID": "enumeration",
                "MULTIPLE": "Y",
                "EDIT_FORM_LABEL": {"ru": "Интересы клиента", "en": "Client interests"},
                "LIST": [
                    {"VALUE": "Обучение"},
                    {"VALUE": "Внедрение"},
                    {"VALUE": "Поддержка"},
                ],
            },
        },
    )

    print(source_field_id, interests_field_id)
    ```

{% endlist %}

Ответ содержит идентификатор поля, а не идентификаторы вариантов:

```json
{
    "result": 6007777
}
```

Идентификаторы вариантов получим на следующем шаге.

## 2. Получим идентификаторы значений

Идентификаторы вариантов возвращают два метода, выбирайте по задаче.

Метод [crm.deal.fields](../../../api-reference/crm/deals/crm-deal-fields.md) отдает описание всех полей сделки. У поля типа Список есть массив `items` с парами `ID` и `VALUE` — этого достаточно, чтобы сопоставить текст варианта с его идентификатором. Метод доступен любому пользователю.

Метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) отдает только пользовательские поля и полное описание вариантов в массиве `LIST`: там есть `SORT`, признак значения по умолчанию `DEF` и `XML_ID`. Передайте `filter` с `USER_TYPE_ID` или `FIELD_NAME`, чтобы не разбирать все поля.

{% list tabs %}

- JS

    ```js
    const dealFields = await callMethod('crm.deal.fields', {}, 'deal-fields')
    const sourceItems = dealFields.UF_CRM_ENUM_ONE.items

    const enumFields = await callMethod(
        'crm.deal.userfield.list',
        {
            filter: {
                USER_TYPE_ID: 'enumeration',
                FIELD_NAME: 'UF_CRM_ENUM_MULTI'
            }
        },
        'userfield-list-enum'
    )

    const interestItems = enumFields[0].LIST

    const sourceId = sourceItems.find((item) => item.VALUE === 'Сайт').ID
    const interestIds = interestItems
        .filter((item) => ['Обучение', 'Поддержка'].includes(item.VALUE))
        .map((item) => Number(item.ID))

    console.log(sourceId, interestIds)
    ```

- PHP

    ```php
    $dealFields = callMethod($serviceBuilder, 'crm.deal.fields');
    $sourceItems = $dealFields['UF_CRM_ENUM_ONE']['items'];

    $enumFields = callMethod($serviceBuilder, 'crm.deal.userfield.list', [
        'filter' => [
            'USER_TYPE_ID' => 'enumeration',
            'FIELD_NAME' => 'UF_CRM_ENUM_MULTI',
        ],
    ]);

    $interestItems = $enumFields[0]['LIST'];

    $sourceId = 0;

    foreach ($sourceItems as $item) {
        if ($item['VALUE'] === 'Сайт') {
            $sourceId = (int)$item['ID'];
            break;
        }
    }

    $interestIds = [];

    foreach ($interestItems as $item) {
        if (in_array($item['VALUE'], ['Обучение', 'Поддержка'], true)) {
            $interestIds[] = (int)$item['ID'];
        }
    }

    print_r([$sourceId, $interestIds]);
    ```

- Python

    ```python
    deal_fields = call_method("crm.deal.fields")
    source_items = deal_fields["UF_CRM_ENUM_ONE"]["items"]

    enum_fields = call_method(
        "crm.deal.userfield.list",
        {
            "filter": {
                "USER_TYPE_ID": "enumeration",
                "FIELD_NAME": "UF_CRM_ENUM_MULTI",
            },
        },
    )

    interest_items = enum_fields[0]["LIST"]

    source_id = int(
        next(item["ID"] for item in source_items if item["VALUE"] == "Сайт")
    )
    interest_ids = [
        int(item["ID"])
        for item in interest_items
        if item["VALUE"] in ("Обучение", "Поддержка")
    ]

    print(source_id, interest_ids)
    ```

{% endlist %}

Сокращенный ответ [crm.deal.fields](../../../api-reference/crm/deals/crm-deal-fields.md) для одного поля:

```json
{
    "result": {
        "UF_CRM_ENUM_ONE": {
            "type": "enumeration",
            "isMultiple": false,
            "isRequired": false,
            "formLabel": "Источник обращения",
            "items": [
                { "ID": "3897", "VALUE": "Сайт" },
                { "ID": "3899", "VALUE": "Телефон" },
                { "ID": "3901", "VALUE": "Партнер" }
            ]
        }
    }
}
```

Сокращенный ответ [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md):

```json
{
    "result": [
        {
            "ID": "6007779",
            "FIELD_NAME": "UF_CRM_ENUM_MULTI",
            "USER_TYPE_ID": "enumeration",
            "MULTIPLE": "Y",
            "LIST": [
                { "ID": "3903", "SORT": "500", "VALUE": "Обучение", "DEF": "N" },
                { "ID": "3907", "SORT": "500", "VALUE": "Поддержка", "DEF": "N" },
                { "ID": "3905", "SORT": "500", "VALUE": "Внедрение", "DEF": "N" }
            ]
        }
    ],
    "total": 1
}
```

Порядок вариантов в ответе не совпадает ни с порядком создания, ни с порядком идентификаторов: у всех вариантов одинаковый `SORT`. Если порядок важен, задайте разный `SORT` при создании или сортируйте варианты в своем коде.

Сохраните идентификаторы нужных вариантов: `3897` для одиночного поля и `3903` с `3907` для множественного. Не переносите их в свой код как константы — в другом Битрикс24 у тех же вариантов будут другие идентификаторы.

## 3. Запишем значения в сделку

Метод [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) записывает значения в поля сделки. Передайте параметры:

- `id` — идентификатор сделки
- `fields` — объект с кодами полей. В одиночное поле передайте идентификатор варианта числом, в множественное — массив идентификаторов

{% note warning "" %}

Передавайте идентификатор варианта, а не его текст. На строку вроде `"Сайт"` метод ответит `true`, но в поле окажется `0`: значение приводится к числу, а текст превращается в ноль. Ошибки при этом не будет.

{% endnote %}

{% list tabs %}

- JS

    ```js
    await callMethod(
        'crm.deal.update',
        {
            id: 8421,
            fields: {
                UF_CRM_ENUM_ONE: Number(sourceId),
                UF_CRM_ENUM_MULTI: interestIds
            }
        },
        'deal-update-enum'
    )

    const deal = await callMethod(
        'crm.deal.get',
        { id: 8421 },
        'deal-get-enum'
    )

    console.log(deal.UF_CRM_ENUM_ONE, deal.UF_CRM_ENUM_MULTI)
    ```

- PHP

    ```php
    callMethod($serviceBuilder, 'crm.deal.update', [
        'id' => 8421,
        'fields' => [
            'UF_CRM_ENUM_ONE' => $sourceId,
            'UF_CRM_ENUM_MULTI' => $interestIds,
        ],
    ]);

    $deal = callMethod($serviceBuilder, 'crm.deal.get', ['id' => 8421]);

    print_r([$deal['UF_CRM_ENUM_ONE'], $deal['UF_CRM_ENUM_MULTI']]);
    ```

- Python

    ```python
    call_method(
        "crm.deal.update",
        {
            "id": 8421,
            "fields": {
                "UF_CRM_ENUM_ONE": source_id,
                "UF_CRM_ENUM_MULTI": interest_ids,
            },
        },
    )

    deal = call_method("crm.deal.get", {"id": 8421})

    print(deal["UF_CRM_ENUM_ONE"], deal["UF_CRM_ENUM_MULTI"])
    ```

{% endlist %}

Ответ [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md):

```json
{
    "result": true
}
```

Сокращенный ответ [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md):

```json
{
    "result": {
        "ID": "8421",
        "TITLE": "Проверка поля типа Список",
        "UF_CRM_ENUM_ONE": "3897",
        "UF_CRM_ENUM_MULTI": [3903, 3907]
    }
}
```

Одиночное поле приходит строкой с идентификатором, множественное — массивом чисел. Текста вариантов в ответе нет: чтобы показать пользователю «Сайт», сопоставьте идентификатор с `items` из второго шага.

## 4. Отберем сделки по значению

Метод [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) отбирает сделки по фильтру. В фильтре по полю типа Список тоже указывается идентификатор варианта.

Для множественного поля фильтр по одному идентификатору находит все сделки, где этот вариант выбран, даже если рядом выбраны другие.

{% note warning "" %}

Текст варианта в фильтре не вернет ошибку и не вернет пустой результат — он вернет посторонние сделки. Строка приводится к нулю, а нулю соответствуют сделки с незаполненным полем. В тестовом Битрикс24 фильтр `UF_CRM_ENUM_ONE: "Сайт"` вернул 867 сделок, и ни в одной из них поле не было заполнено.

{% endnote %}

{% list tabs %}

- JS

    ```js
    const dealsBySource = await callMethod(
        'crm.deal.list',
        {
            filter: { UF_CRM_ENUM_ONE: Number(sourceId) },
            select: ['ID', 'TITLE', 'UF_CRM_ENUM_ONE']
        },
        'deal-list-by-source'
    )

    const dealsByInterest = await callMethod(
        'crm.deal.list',
        {
            filter: { UF_CRM_ENUM_MULTI: interestIds[0] },
            select: ['ID', 'TITLE', 'UF_CRM_ENUM_MULTI']
        },
        'deal-list-by-interest'
    )

    console.table(dealsBySource)
    console.table(dealsByInterest)
    ```

- PHP

    ```php
    $dealsBySource = callMethod($serviceBuilder, 'crm.deal.list', [
        'filter' => ['UF_CRM_ENUM_ONE' => $sourceId],
        'select' => ['ID', 'TITLE', 'UF_CRM_ENUM_ONE'],
    ]);

    $dealsByInterest = callMethod($serviceBuilder, 'crm.deal.list', [
        'filter' => ['UF_CRM_ENUM_MULTI' => $interestIds[0]],
        'select' => ['ID', 'TITLE', 'UF_CRM_ENUM_MULTI'],
    ]);

    print_r($dealsBySource);
    print_r($dealsByInterest);
    ```

- Python

    ```python
    deals_by_source = call_method(
        "crm.deal.list",
        {
            "filter": {"UF_CRM_ENUM_ONE": source_id},
            "select": ["ID", "TITLE", "UF_CRM_ENUM_ONE"],
        },
    )

    deals_by_interest = call_method(
        "crm.deal.list",
        {
            "filter": {"UF_CRM_ENUM_MULTI": interest_ids[0]},
            "select": ["ID", "TITLE", "UF_CRM_ENUM_MULTI"],
        },
    )

    print(deals_by_source)
    print(deals_by_interest)
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": [
        {
            "ID": "8421",
            "TITLE": "Проверка поля типа Список",
            "UF_CRM_ENUM_ONE": "3897"
        }
    ],
    "total": 1
}
```

Значение `total` подсказывает, что фильтр сработал верно: при отборе по тексту оно было бы неправдоподобно большим.

## 5. Изменим состав значений

Метод [crm.deal.userfield.update](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-update.md) меняет описание поля. Состав вариантов задается тем же массивом `LIST`, а действие определяется набором ключей:

- `ID` и `VALUE` — переименовать вариант. Идентификатор сохраняется, сделки продолжают ссылаться на него и показывают новый текст
- только `VALUE` — добавить новый вариант, Битрикс24 присвоит ему новый идентификатор
- `ID` и `DEL: "Y"` — удалить вариант

Варианты, которые вы не перечислили в `LIST`, остаются без изменений: полный список передавать не нужно.

{% list tabs %}

- JS

    ```js
    await callMethod(
        'crm.deal.userfield.update',
        {
            id: sourceFieldId,
            fields: {
                LIST: [
                    { ID: Number(sourceId), VALUE: 'Веб-сайт' },
                    { VALUE: 'Реклама' }
                ]
            }
        },
        'userfield-update-rename'
    )

    const updatedFields = await callMethod(
        'crm.deal.userfield.list',
        { filter: { FIELD_NAME: 'UF_CRM_ENUM_ONE' } },
        'userfield-list-after-update'
    )

    console.table(updatedFields[0].LIST)
    ```

- PHP

    ```php
    callMethod($serviceBuilder, 'crm.deal.userfield.update', [
        'id' => $sourceFieldId,
        'fields' => [
            'LIST' => [
                ['ID' => $sourceId, 'VALUE' => 'Веб-сайт'],
                ['VALUE' => 'Реклама'],
            ],
        ],
    ]);

    $updatedFields = callMethod($serviceBuilder, 'crm.deal.userfield.list', [
        'filter' => ['FIELD_NAME' => 'UF_CRM_ENUM_ONE'],
    ]);

    print_r($updatedFields[0]['LIST']);
    ```

- Python

    ```python
    call_method(
        "crm.deal.userfield.update",
        {
            "id": source_field_id,
            "fields": {
                "LIST": [
                    {"ID": source_id, "VALUE": "Веб-сайт"},
                    {"VALUE": "Реклама"},
                ],
            },
        },
    )

    updated_fields = call_method(
        "crm.deal.userfield.list",
        {"filter": {"FIELD_NAME": "UF_CRM_ENUM_ONE"}},
    )

    print(updated_fields[0]["LIST"])
    ```

{% endlist %}

Сокращенный ответ после переименования и добавления:

```json
{
    "result": [
        { "ID": "3897", "SORT": "500", "VALUE": "Веб-сайт", "DEF": "N" },
        { "ID": "3899", "SORT": "500", "VALUE": "Телефон", "DEF": "N" },
        { "ID": "3909", "SORT": "500", "VALUE": "Реклама", "DEF": "N" },
        { "ID": "3901", "SORT": "500", "VALUE": "Партнер", "DEF": "N" }
    ]
}
```

Вариант `3897` сохранил идентификатор и получил новый текст, у нового варианта «Реклама» появился идентификатор `3909`, остальные не изменились. Сделка, в которую мы записали `3897`, теперь показывает «Веб-сайт» — переписывать значения в сделках не нужно.

Чтобы удалить ненужный вариант, передайте его идентификатор с признаком удаления:

```json
{
    "id": 6007777,
    "fields": {
        "LIST": [
            { "ID": 3901, "DEL": "Y" }
        ]
    }
}
```

## Проверим результат

Сценарий выполнен, если сделка ссылается на нужные варианты, а отбор по значению находит именно ее.

Что проверить в ответах:

- `UF_CRM_ENUM_ONE` содержит строку с идентификатором варианта, а не `"0"`
- `UF_CRM_ENUM_MULTI` содержит массив идентификаторов
- [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) с фильтром по идентификатору вернул сделку, а `total` равен ожидаемому количеству
- после переименования варианта [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md) возвращает тот же идентификатор

В интерфейсе откройте карточку сделки: в полях «Источник обращения» и «Интересы клиента» будут выбранные варианты.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `The 'FIELD_NAME' field is not found.` | В [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) не передан код поля. Передайте `FIELD_NAME` ||
|| `ERROR_NOT_FOUND`, `The entity with ID '...' is not found.` | В [crm.deal.userfield.update](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-update.md) передан идентификатор несуществующего поля. Получите его методом [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) ||
|#

Ошибки этого сценария почти всегда молчаливые: метод отвечает успехом, а результат неверный. Проверьте сохраненное значение методом [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md).

- Значение `"0"` означает, что в поле передали текст варианта вместо идентификатора
- Значение есть, а в карточке пусто — передан идентификатор, которого нет среди вариантов поля. Такой идентификатор сохраняется без ошибки
- Отбор вернул слишком много сделок с пустым полем — в фильтре передан текст варианта вместо идентификатора
- В поле нечего выбрать — поле создано без `LIST` или с пустым массивом. Добавьте варианты методом [crm.deal.userfield.update](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-update.md)

Чтобы очистить одиночное поле, передайте в него пустую строку.

## Что важно учитывать

- В поле хранится идентификатор варианта. Текст варианта живет в описании поля и меняется независимо от сделок
- Идентификаторы вариантов уникальны для конкретного Битрикс24. Переносить их в код как константы нельзя: получайте идентификаторы методом [crm.deal.fields](../../../api-reference/crm/deals/crm-deal-fields.md) или [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) перед записью
- Одиночное поле возвращается строкой, множественное — массивом чисел
- Порядок вариантов в ответе не гарантирован, если у них одинаковый `SORT`
- Удаление варианта не очищает сделки, которые на него ссылались: в поле останется идентификатор, которого больше нет среди вариантов
- Для других объектов CRM поля создают одноименными методами, например [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md), а в смарт-процессе — методом [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md)

## Пример кода

Полный сценарий одним скриптом: создает оба поля, получает идентификаторы вариантов, записывает значения, отбирает сделки и переименовывает вариант.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const DEAL_ID = 8421

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function main() {
        const sourceFieldId = await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_ENUM_ONE',
                USER_TYPE_ID: 'enumeration',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Источник обращения', en: 'Request source' },
                LIST: [{ VALUE: 'Сайт' }, { VALUE: 'Телефон' }, { VALUE: 'Партнер' }]
            }
        }, 'userfield-add-source')

        await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_ENUM_MULTI',
                USER_TYPE_ID: 'enumeration',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Интересы клиента', en: 'Client interests' },
                LIST: [{ VALUE: 'Обучение' }, { VALUE: 'Внедрение' }, { VALUE: 'Поддержка' }]
            }
        }, 'userfield-add-interests')

        const dealFields = await callMethod('crm.deal.fields', {}, 'deal-fields')
        const sourceId = Number(dealFields.UF_CRM_ENUM_ONE.items.find((item) => item.VALUE === 'Сайт').ID)
        const interestIds = dealFields.UF_CRM_ENUM_MULTI.items
            .filter((item) => ['Обучение', 'Поддержка'].includes(item.VALUE))
            .map((item) => Number(item.ID))

        await callMethod('crm.deal.update', {
            id: DEAL_ID,
            fields: {
                UF_CRM_ENUM_ONE: sourceId,
                UF_CRM_ENUM_MULTI: interestIds
            }
        }, 'deal-update-enum')

        const deal = await callMethod('crm.deal.get', { id: DEAL_ID }, 'deal-get-enum')

        const dealsBySource = await callMethod('crm.deal.list', {
            filter: { UF_CRM_ENUM_ONE: sourceId },
            select: ['ID', 'TITLE', 'UF_CRM_ENUM_ONE']
        }, 'deal-list-by-source')

        await callMethod('crm.deal.userfield.update', {
            id: sourceFieldId,
            fields: {
                LIST: [
                    { ID: sourceId, VALUE: 'Веб-сайт' },
                    { VALUE: 'Реклама' }
                ]
            }
        }, 'userfield-update-rename')

        const afterRename = await callMethod('crm.deal.get', { id: DEAL_ID }, 'deal-get-after-rename')

        console.log(deal.UF_CRM_ENUM_ONE, deal.UF_CRM_ENUM_MULTI)
        console.table(dealsBySource)
        console.log(afterRename.UF_CRM_ENUM_ONE)
    }

    main().catch((error) => console.error(error.message))
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    const DEAL_ID = 8421;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    function callMethod($serviceBuilder, string $method, array $params = []): mixed
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    $sourceFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_ENUM_ONE',
            'USER_TYPE_ID' => 'enumeration',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Источник обращения', 'en' => 'Request source'],
            'LIST' => [['VALUE' => 'Сайт'], ['VALUE' => 'Телефон'], ['VALUE' => 'Партнер']],
        ],
    ]);

    callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_ENUM_MULTI',
            'USER_TYPE_ID' => 'enumeration',
            'MULTIPLE' => 'Y',
            'EDIT_FORM_LABEL' => ['ru' => 'Интересы клиента', 'en' => 'Client interests'],
            'LIST' => [['VALUE' => 'Обучение'], ['VALUE' => 'Внедрение'], ['VALUE' => 'Поддержка']],
        ],
    ]);

    $dealFields = callMethod($serviceBuilder, 'crm.deal.fields');

    $sourceId = 0;

    foreach ($dealFields['UF_CRM_ENUM_ONE']['items'] as $item) {
        if ($item['VALUE'] === 'Сайт') {
            $sourceId = (int)$item['ID'];
            break;
        }
    }

    $interestIds = [];

    foreach ($dealFields['UF_CRM_ENUM_MULTI']['items'] as $item) {
        if (in_array($item['VALUE'], ['Обучение', 'Поддержка'], true)) {
            $interestIds[] = (int)$item['ID'];
        }
    }

    callMethod($serviceBuilder, 'crm.deal.update', [
        'id' => DEAL_ID,
        'fields' => [
            'UF_CRM_ENUM_ONE' => $sourceId,
            'UF_CRM_ENUM_MULTI' => $interestIds,
        ],
    ]);

    $deal = callMethod($serviceBuilder, 'crm.deal.get', ['id' => DEAL_ID]);

    $dealsBySource = callMethod($serviceBuilder, 'crm.deal.list', [
        'filter' => ['UF_CRM_ENUM_ONE' => $sourceId],
        'select' => ['ID', 'TITLE', 'UF_CRM_ENUM_ONE'],
    ]);

    callMethod($serviceBuilder, 'crm.deal.userfield.update', [
        'id' => $sourceFieldId,
        'fields' => [
            'LIST' => [
                ['ID' => $sourceId, 'VALUE' => 'Веб-сайт'],
                ['VALUE' => 'Реклама'],
            ],
        ],
    ]);

    $afterRename = callMethod($serviceBuilder, 'crm.deal.get', ['id' => DEAL_ID]);

    print_r([$deal['UF_CRM_ENUM_ONE'], $deal['UF_CRM_ENUM_MULTI']]);
    print_r($dealsBySource);
    print_r($afterRename['UF_CRM_ENUM_ONE']);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    DEAL_ID = 8421

    bitrix_token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN'

    def call_method(method, params=None):
        # Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
        return bitrix_token.call_method(
            api_method=method,
            params=params or {},
        )["result"]

    source_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_ENUM_ONE",
                "USER_TYPE_ID": "enumeration",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Источник обращения", "en": "Request source"},
                "LIST": [{"VALUE": "Сайт"}, {"VALUE": "Телефон"}, {"VALUE": "Партнер"}],
            },
        },
    )

    call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_ENUM_MULTI",
                "USER_TYPE_ID": "enumeration",
                "MULTIPLE": "Y",
                "EDIT_FORM_LABEL": {"ru": "Интересы клиента", "en": "Client interests"},
                "LIST": [{"VALUE": "Обучение"}, {"VALUE": "Внедрение"}, {"VALUE": "Поддержка"}],
            },
        },
    )

    deal_fields = call_method("crm.deal.fields")

    source_id = int(
        next(
            item["ID"]
            for item in deal_fields["UF_CRM_ENUM_ONE"]["items"]
            if item["VALUE"] == "Сайт"
        )
    )
    interest_ids = [
        int(item["ID"])
        for item in deal_fields["UF_CRM_ENUM_MULTI"]["items"]
        if item["VALUE"] in ("Обучение", "Поддержка")
    ]

    call_method(
        "crm.deal.update",
        {
            "id": DEAL_ID,
            "fields": {
                "UF_CRM_ENUM_ONE": source_id,
                "UF_CRM_ENUM_MULTI": interest_ids,
            },
        },
    )

    deal = call_method("crm.deal.get", {"id": DEAL_ID})

    deals_by_source = call_method(
        "crm.deal.list",
        {
            "filter": {"UF_CRM_ENUM_ONE": source_id},
            "select": ["ID", "TITLE", "UF_CRM_ENUM_ONE"],
        },
    )

    call_method(
        "crm.deal.userfield.update",
        {
            "id": source_field_id,
            "fields": {
                "LIST": [
                    {"ID": source_id, "VALUE": "Веб-сайт"},
                    {"VALUE": "Реклама"},
                ],
            },
        },
    )

    after_rename = call_method("crm.deal.get", {"id": DEAL_ID})

    print(deal["UF_CRM_ENUM_ONE"], deal["UF_CRM_ENUM_MULTI"])
    print(deals_by_source)
    print(after_rename["UF_CRM_ENUM_ONE"])
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-update.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-fields.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-update.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-list.md)
