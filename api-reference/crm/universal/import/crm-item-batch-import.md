# Импортировать группу записей crm.item.batchImport

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «импорта» элемента объекта CRM

Универсальный метод для импорта объектов в CRM. Отличия от добавления объекта описаны подробнее [`тут`](./index.md).

Логика добавления элементов работает по аналогии с методом [crm.item.import](crm-item-import.md).

{% note warning "Внимание!" %}

В одном запросе допустимо импортировать максимум — 20 элементов

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип`          | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор системного или [пользовательского типа](../user-defined-object-types/index.md), для которого нужно создать элемент ||
|| **data***
[`array`][1] | Массив значений полей элементов. Можно рассматривать его как массив, каждый элемент которого содержит набор полей `fields`, описанный в методе [crm.item.import](crm-item-import.md) ||
|| **useOriginalUfNames**
[`boolean`][1] | Параметр для управления форматом имен пользовательских полей в запросе и ответе.   
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Как импортировать сделки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"data":[{"title":"Новая сделка (специально для примера REST методов)","typeId":"SERVICE","categoryId":9,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"RUB","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"Тут должно быть дополнительное описание об источнике","leadId":102,"additionalInfo":"Тут должна быть дополнительная информация","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":2},{"title":"Новая сделка (специально для примера REST методов)","typeId":"SERVICE","categoryId":4,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"RUB","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"Тут должно быть дополнительное описание об источнике","leadId":102,"additionalInfo":"Тут должна быть дополнительная информация","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":2}]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.batchImport
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"data":[{"title":"Новая сделка (специально для примера REST методов)","typeId":"SERVICE","categoryId":9,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"RUB","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"Тут должно быть дополнительное описание об источнике","leadId":102,"additionalInfo":"Тут должна быть дополнительная информация","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":2},{"title":"Новая сделка (специально для примера REST методов)","typeId":"SERVICE","categoryId":4,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"RUB","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"Тут должно быть дополнительное описание об источнике","leadId":102,"additionalInfo":"Тут должна быть дополнительная информация","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":2}],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.item.batchImport
        ```

    - BX24.js

        ```js
        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        };

        const day = 60 * 60 * 24 * 1000;

        const now = new Date();
        const twelveDaysInAdvance = new Date(now.getTime() + 12 * day);
        const monthAgo = new Date(now.getTime() - 30 * day);

        const commentsExample = `
        Пример комментария внутри сделки

        [B]Жирный текст[/B]
        [I]Курсив[/I]
        [U]Подчеркнутый[/U]
        [S]Зачеркнутый[/S]
        [B][I][U][S]Микс[/S][/U][/I][/B]

        [LIST]
        [*]Элемент списка #1
        [*]Элемент списка #2
        [*]Элемент списка #3
        [/LIST]

        [LIST=1]
        [*]Нумерованный элемент списка #1
        [*]Нумерованный элемент списка #2
        [*]Нумерованный элемент списка #3
        [/LIST]
        `;
      
        const deal = {
            title: "Новая сделка (специально для примера REST методов)",
            typeId: "SERVICE",
            categoryId: 9,
            stageId: "C9:UC_KN8KFI",
            isReccurring: "Y",
            probability: 50,
            currencyId: "RUB",
            isManualOpportunity: "Y",
            opportunity: 999.99,
            taxValue: 99.9,
            companyId: 5,
            contactId: 4,
            contactIds: [4, 5],
            quoteId: 7,
            begindate: formatDate(monthAgo),
            closedate: formatDate(twelveDaysInAdvance),
            opened: "N",
            comments: commentsExample,
            assignedById: 6,
            sourceId: "WEB",
            sourceDescription: "Тут должно быть дополнительное описание об источнике",
            leadId: 102,
            additionalInfo: "Тут должна быть дополнительная информация",
            observers: [2, 3],
            utmSource: "google",
            utmMedium: "CPC",
            ufCrm_1721244707107: 1111.1,
            parentId1220: 2,
        };

        const secondDeal = {
            title: "Новая сделка (специально для примера REST методов)",
            typeId: "SERVICE",
            categoryId: 4,
            stageId: "C9:UC_KN8KFI",
            isReccurring: "Y",
            probability: 50,
            currencyId: "RUB",
            isManualOpportunity: "Y",
            opportunity: 999.99,
            taxValue: 99.9,
            companyId: 5,
            contactId: 4,
            contactIds: [4, 5],
            quoteId: 7,
            begindate: formatDate(monthAgo),
            closedate: formatDate(twelveDaysInAdvance),
            opened: "N",
            comments: commentsExample,
            assignedById: 6,
            sourceId: "WEB",
            sourceDescription: "Тут должно быть дополнительное описание об источнике",
            leadId: 102,
            additionalInfo: "Тут должна быть дополнительная информация",
            observers: [2, 3],
            utmSource: "google",
            utmMedium: "CPC",
            ufCrm_1721244707107: 1111.1,
            parentId1220: 2,
        };

        BX24.callMethod(
            'crm.item.batchImport', 
            {
                entityTypeId: 2,
                data: [
                    deal,
                    secondDeal
                ]
            },
            (result) => 
            {
                result.error() 
                    ? console.error(result.error()) 
                    : console.info(result.data())
                ;
            }
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');
        
        $deal = [
            'title' => "Новая сделка (специально для примера REST методов)",
            'typeId' => "SERVICE",
            'categoryId' => 9,
            'stageId' => "C9:UC_KN8KFI",
            'isReccurring' => "Y",
            'probability' => 50,
            'currencyId' => "RUB",
            'isManualOpportunity' => "Y",
            'opportunity' => 999.99,
            'taxValue' => 99.9,
            'companyId' => 5,
            'contactId' => 4,
            'contactIds' => [4, 5],
            'quoteId' => 7,
            'begindate' => formatDate(monthAgo),
            'closedate' => formatDate(twelveDaysInAdvance),
            'opened' => "N",
            'comments' => $commentsExample,
            'assignedById' => 6,
            'sourceId' => "WEB",
            'sourceDescription' => "Тут должно быть дополнительное описание об источнике",
            'leadId' => 102,
            'additionalInfo' => "Тут должна быть дополнительная информация",
            'observers' => [2, 3],
            'utmSource' => "google",
            'utmMedium' => "CPC",
            'ufCrm_1721244707107' => 1111.1,
            'parentId1220' => 2
        ]
        
        $secondDeal = [
            'title' => "Новая сделка (специально для примера REST методов)",
            'typeId' => "SERVICE",
            'categoryId' => 4,
            'stageId' => "C9:UC_KN8KFI",
            'isReccurring' => "Y",
            'probability' => 50,
            'currencyId' => "RUB",
            'isManualOpportunity' => "Y",
            'opportunity' => 999.99,
            'taxValue' => 99.9,
            'companyId' => 5,
            'contactId' => 4,
            'contactIds' => [4, 5],
            'quoteId' => 7,
            'begindate' => formatDate(monthAgo),
            'closedate' => formatDate(twelveDaysInAdvance),
            'opened' => "N",
            'comments' => $commentsExample,
            'assignedById' => 6,
            'sourceId' => "WEB",
            'sourceDescription' => "Тут должно быть дополнительное описание об источнике",
            'leadId' => 102,
            'additionalInfo' => "Тут должна быть дополнительная информация",
            'observers' => [2, 3],
            'utmSource' => "google",
            'utmMedium' => "CPC",
            'ufCrm_1721244707107' => 1111.1,
            'parentId1220' => 2
        ]
        $result = CRest::call(
            'crm.item.batchImport',
            [
                'entityTypeId' => 2,
                'data' => [
                        $deal,
                        $secondDeal,
                    ],
            ],
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}


2. Как создать элемент смарт-процесса с набором пользовательских полей

    {% cut "Пользовательские поля, участвующие в примере" %}

    {% include [Набор пользовательских полей](../../_include/user-fields-for-examples-cut.md) %}

    {% endcut %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
            "entityTypeId": 1302,
            "data": [{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 81,
                "ufCrm44_1721812853419": "'"$(date '+%Y-%m-%d')"'",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "300|RUB",
                "ufCrm44_1721812935209": "Y",
                "ufCrm44_1721812948498": 9999.9
            },{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 45,
                "ufCrm44_1721812853419": "'"$(date '+%Y-%m-%d')"'",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel2.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "600|RUB",
                "ufCrm44_1721812935209": "N",
                "ufCrm44_1721812948498": 9999.9
            }]
        }' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.batchImport
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
            "entityTypeId": 1302,
            "data": [{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 81,
                "ufCrm44_1721812853419": "'"$(date '+%Y-%m-%d')"'",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "300|RUB",
                "ufCrm44_1721812935209": "Y",
                "ufCrm44_1721812948498": 9999.9
            },{
                "ufCrm44_1721812760630": "Строка для пользовательского поля типа Строка",
                "ufCrm44_1721812814433": 45,
                "ufCrm44_1721812853419": "'"$(date '+%Y-%m-%d')"'",
                "ufCrm44_1721812885588": [
                    "example.com",
                    "second-example.com"
                ],
                "ufCrm44_1721812898903": [
                    "green_pixel2.png",
                    "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg=="
                ],
                "ufCrm44_1721812915476": "600|RUB",
                "ufCrm44_1721812935209": "N",
                "ufCrm44_1721812948498": 9999.9
            }],
            "auth": "**put_access_token_here**"
        }' \
        https://**put_your_bitrix24_address**/rest/crm.item.batchImport
        ```

    - JS

        ```js
        const greenPixelInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==";

        BX24.callMethod(
            'crm.item.batchImport', 
            {
                entityTypeId: 1302,
                data: [
                    {
                        ufCrm44_1721812760630: "Строка для пользовательского поля типа Строка",
                        ufCrm44_1721812814433: 81,
                        ufCrm44_1721812853419: (new Date()).toISOString().slice(0, 10),
                        ufCrm44_1721812885588: [
                            "example.com",
                            "second-example.com",
                        ],
                        ufCrm44_1721812898903: [
                            "green_pixel.png",
                            greenpixelBase64,
                        ],
                        ufCrm44_1721812915476: "300|RUB",
                        ufCrm44_1721812935209: "Y",
                        ufCrm44_1721812948498: 9999.9,
                    },
                    {
                        ufCrm44_1721812760630: "Строка для пользовательского поля типа Строка",
                        ufCrm44_1721812814433: 45,
                        ufCrm44_1721812853419: (new Date()).toISOString().slice(0, 10),
                        ufCrm44_1721812885588: [
                            "example.com",
                            "second-example.com",
                        ],
                        ufCrm44_1721812898903: [
                            "green_pixel2.png",
                            greenpixelBase64,
                        ],
                        ufCrm44_1721812915476: "600|RUB",
                        ufCrm44_1721812935209: "N",
                        ufCrm44_1721812948498: 9999.9,
                    }
                ],
            },
            (result) => 
            {
                result.error() 
                    ? console.error(result.error()) 
                    : console.info(result.data())
                ;
            }
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.item.batchImport',
            [
                'entityTypeId' => 1302,
                'data' => [
                    [
                        'ufCrm44_1721812760630' => "Строка для пользовательского поля типа Строка",
                        'ufCrm44_1721812814433' => 81,
                        'ufCrm44_1721812853419' => date('Y-m-d'),
                        'ufCrm44_1721812885588' => [
                            "example.com",
                            "second-example.com",
                        ],
                        'ufCrm44_1721812898903' => [
                            "green_pixel.png",
                            "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==",
                        ],
                        'ufCrm44_1721812915476' => "300|RUB",
                        'ufCrm44_1721812935209' => "Y",
                        'ufCrm44_1721812948498' => 9999.9,
                    ],
                    [
                        'ufCrm44_1721812760630' => "Строка для пользовательского поля типа Строка",
                        'ufCrm44_1721812814433' => 45,
                        'ufCrm44_1721812853419' => date('Y-m-d'),
                        'ufCrm44_1721812885588' => [
                            "example.com",
                            "second-example.com",
                        ],
                        'ufCrm44_1721812898903' => [
                            "green_pixel2.png",
                            "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==",
                        ],
                        'ufCrm44_1721812915476' => "600|RUB",
                        'ufCrm44_1721812935209' => "N",
                        'ufCrm44_1721812948498' => 9999.9,
                    ],
                ],
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}


## Обработка ответа

Метод вернет массив `items`, содержащий объекты, где каждый объект этого массива будет содержать идентификатор созданного элемента в случае успеха, либо объект сообщение об ошибке.

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "item": {
                    "id": 15
                }
            },
            {
                "error": "CRM_FIELD_ERROR_REQUIRED",
                "error_description": "Поле \"Название\" обязательно для заполнения"
            }
        ]
    },
    "time": {
        "start": 1723414961.913589,
        "finish": 1723414964.652124,
        "duration": 2.738534927368164,
        "processing": 2.376383066177368,
        "date_start": "2024-08-11T22:22:41+00:00",
        "date_finish": "2024-08-11T22:22:44+00:00",
        "operating": 2.3762991428375244
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа.

Содержит единственный ключ `item` ||
|| **items**
[`array`][1] | Массив содержащих объекты `item` или ошибки ||
|| **item**
[`object`][1] | Информация о созданном элементе.

Содержит единственный ключ `id` ||
|| **id**
[`int`][1] | Идентификатор созданного элемента ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

{% note info " " %}

По умолчанию имена пользовательских полей передаются и возвращаются в camelCase, например `ufCrm2_1639669411830`.
При передаче параметра `useOriginalUfNames` со значением `Y` пользовательские поля будут возвращаться с оригинальными именами, например `UF_CRM_2_1639669411830`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **401**, **400**, **403**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                           | **Описание**                                                       | **Значение**                                                                                    ||
|| `400`      | `NOT_FOUND`                       | Смарт-процесс не найден                                            | Возникает, при передаче невалидного `entityTypeId`                                              ||
|| `400`      | `ACCESS_DENIED`                   | Доступ запрещен                                                    | У пользователя нет прав на добавление элементов типа `entityTypeId`                             ||
|| `400`      | `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля "`field`"                                   | Передано неправильное значения поля `field`.

Для системных полей типа `createdTime`, если запрос не от администратора ||
|| `400`      | `100`                             | Expected iterable value for multiple field, but got `type` instead | В одно из множественных полей было передано значения типа `type`, хотя ожидался итерируемый тип. Также может возникать при некорректном запросе (некорректный JSON или заголовки запроса) ||
|| `400`      | `CREATE_DYNAMIC_ITEM_RESTRICTED`  | Вы не можете создать новый элемент из-за ограничений вашего тарифа | Ограничения тарифа не позволяют создавать элементы смарт-процессов                              ||
|| `400`      | `MAX_IMPORT_BATCH_SIZE_EXCEEDED`  | Вы не можете импортировать больше 20 элементов                     | Возникает, при передаче более 20 элементов при импорте                                        ||
|| `401`      | `INVALID_CREDENTIALS`             | Неверные данные авторизации для запроса                            | Некорректный `ID` пользователя и/или код для в пути запроса                                       ||
|| `403`      | `allowed_only_intranet_user`      | Действие разрешено только интранет-пользователям                   | Пользователь не является интранет-пользователем                                                 ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-item-import.md)

[1]: ../../data-types.md