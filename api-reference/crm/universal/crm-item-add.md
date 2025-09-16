# Создать новый элемент CRM crm.item.add

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «добавления» элемента объекта CRM

Метод является универсальным методом для создания объектов в CRM. С помощью него вы можете создавать различные типы объектов, такие как сделки, контакты, компании и другие.

Для создания объекта необходимо передать соответствующие параметры, включая тип объекта и информацию о нем: название, описание, контактные данные и другие детали.

После успешного выполнения запроса создается новый объект.

Этот метод предоставляет гибкую возможность автоматизировать процесс создания объектов и интегрировать CRM с другими системами.

При создании элемента производится стандартный ряд проверок, модификаций и автоматических действий:

- проверяются права доступа
- проверяется заполненность обязательных полей
- проверяется заполненность зависимых от стадий обязательных полей
- проверяется корректность заполнения полей
- полям присваиваются значения по умолчанию
- после сохранения запускаются роботы

Далее рассмотрим подробнее, как использовать этот метод и какие параметры нужно передать.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`          | **Описание**                                                                                                                        ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./index.md) или [пользовательского типа](user-defined-object-types/index.md), чей элемент мы хотим создать ||
|| **fields***
[`object`][1]  | Объект формата.

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где
- `field_n` — название поля
- `value_n` — значение поля

У каждого типа сущности CRM свой набор полей. Это значит, что набор полей для создания Лида не обязан подходить набору полей для создания Контакта или Смарт-процесса.

Список доступных полей для каждого типа сущности описан [ниже](#parametr-fields).

Некорректное поле в `fields` будет проигнорировано
||
|| **useOriginalUfNames**
[`boolean`][1] | Параметр для управления форматом имен пользовательских полей в запросе и ответе.   
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

### Параметр fields

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% include [Параметр fields](../../../_includes/crm-item.md) %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

1. Пример создания сделки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"fields":{"title":"Новая сделка (специально для примера REST методов)","typeId":"SERVICE","categoryId":9,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"RUB","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"Тут должно быть дополнительное описание об источнике","leadId":102,"additionalInfo":"Тут должна быть дополнительная информация","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":2}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"fields":{"title":"Новая сделка (специально для примера REST методов)","typeId":"SERVICE","categoryId":9,"stageId":"C9:UC_KN8KFI","isReccurring":"Y","probability":50,"currencyId":"RUB","isManualOpportunity":"Y","opportunity":999.99,"taxValue":99.9,"companyId":5,"contactId":4,"contactIds":[4,5],"quoteId":7,"begindate":"formatDate(monthAgo)","closedate":"formatDate(twelveDaysInAdvance)","opened":"N","comments":"commentsExample","assignedById":6,"sourceId":"WEB","sourceDescription":"Тут должно быть дополнительное описание об источнике","leadId":102,"additionalInfo":"Тут должна быть дополнительная информация","observers":[2,3],"utmSource":"google","utmMedium":"CPC","ufCrm_1721244707107":1111.1,"parentId1220":2},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.item.add
        ```

    - JS

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

        BX24.callMethod(
            'crm.item.add', 
            {
                entityTypeId: 2,
                fields: 
                {
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
                },
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
            'crm.item.add',
            [
                'entityTypeId' => 2,
                'fields' => [
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
                    'parentId1220' => 2,
                ],
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

   - PHP (B24PhpSdk)

        ```php
       try {
           $entityTypeId = 1; // Example entity type ID
           $fields = [
               'title' => 'New Item',
               'createdTime' => (new DateTime())->format(DateTime::ATOM),
               'updatedTime' => (new DateTime())->format(DateTime::ATOM),
               'begindate' => (new DateTime())->format(DateTime::ATOM),
               'closedate' => (new DateTime())->format(DateTime::ATOM),
               // Add other necessary fields as required
           ];

           $result = $serviceBuilder
               ->getCRMScope()
               ->item()
               ->add($entityTypeId, $fields);

           print("ID: " . $result->item()->id . PHP_EOL);
           print("Title: " . $result->item()->title . PHP_EOL);
           print("Created By: " . $result->item()->createdBy . PHP_EOL);
           print("Updated By: " . $result->item()->updatedBy . PHP_EOL);
           print("Created Time: " . $result->item()->createdTime->format(DateTime::ATOM) . PHP_EOL);
           print("Updated Time: " . $result->item()->updatedTime->format(DateTime::ATOM) . PHP_EOL);
       } catch (Throwable $e) {
           print("Error: " . $e->getMessage() . PHP_EOL);
       }
        ```

    {% endlist %}


2. Пример создания элемента смарт-процесса, у которого есть некоторый набор пользовательских полей

    {% cut "Пользовательские поля, участвующие в примере" %}

    ```json
    {
    "ufCrm44_1721812760630": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "title": "Пользовательское поле (строка)",
        "listLabel": "Пользовательское поле (строка)",
        "formLabel": "Пользовательское поле (строка)",
        "filterLabel": "Пользовательское поле (строка)",
        "settings": {
        "SIZE": 20,
        "ROWS": 1,
        "REGEXP": "",
        "MIN_LENGTH": 0,
        "MAX_LENGTH": 0,
        "DEFAULT_VALUE": ""
        },
        "upperName": "UF_CRM_44_1721812760630"
    },
    "ufCrm44_1721812814433": {
        "type": "enumeration",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "items": [
        {
            "ID": "79",
            "VALUE": "Элемент списка #1"
        },
        {
            "ID": "80",
            "VALUE": "Элемент списка #2"
        },
        {
            "ID": "81",
            "VALUE": "Элемент списка #3"
        },
        {
            "ID": "82",
            "VALUE": "Элемент списка #4"
        }
        ],
        "title": "Пользовательское поле (список)",
        "listLabel": "Пользовательское поле (список)",
        "formLabel": "Пользовательское поле (список)",
        "filterLabel": "Пользовательское поле (список)",
        "settings": {
        "DISPLAY": "LIST",
        "LIST_HEIGHT": 1,
        "CAPTION_NO_VALUE": "",
        "SHOW_NO_VALUE": "Y"
        },
        "upperName": "UF_CRM_44_1721812814433"
    },
    "ufCrm44_1721812853419": {
        "type": "date",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "title": "Пользовательское поле (дата)",
        "listLabel": "Пользовательское поле (дата)",
        "formLabel": "Пользовательское поле (дата)",
        "filterLabel": "Пользовательское поле (дата)",
        "settings": {
        "DEFAULT_VALUE": {
            "TYPE": "NONE",
            "VALUE": ""
        }
        },
        "upperName": "UF_CRM_44_1721812853419"
    },
    "ufCrm44_1721812885588": {
        "type": "url",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": true,
        "title": "Множественное пользовательское поле (ссылка)",
        "listLabel": "Множественное пользовательское поле (ссылка)",
        "formLabel": "Множественное пользовательское поле (ссылка)",
        "filterLabel": "Множественное пользовательское поле (ссылка)",
        "settings": {
        "POPUP": "Y",
        "SIZE": 20,
        "MIN_LENGTH": 0,
        "MAX_LENGTH": 0,
        "DEFAULT_VALUE": "",
        "ROWS": 1
        },
        "upperName": "UF_CRM_44_1721812885588"
    },
    "ufCrm44_1721812898903": {
        "type": "file",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "title": "Пользовательское поле (файл)",
        "listLabel": "Пользовательское поле (файл)",
        "formLabel": "Пользовательское поле (файл)",
        "filterLabel": "Пользовательское поле (файл)",
        "settings": {
        "SIZE": 20,
        "LIST_WIDTH": 0,
        "LIST_HEIGHT": 0,
        "MAX_SHOW_SIZE": 0,
        "MAX_ALLOWED_SIZE": 0,
        "EXTENSIONS": [],
        "TARGET_BLANK": "Y"
        },
        "upperName": "UF_CRM_44_1721812898903"
    },
    "ufCrm44_1721812915476": {
        "type": "money",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "title": "Пользовательское поле (деньги)",
        "listLabel": "Пользовательское поле (деньги)",
        "formLabel": "Пользовательское поле (деньги)",
        "filterLabel": "Пользовательское поле (деньги)",
        "settings": {
        "DEFAULT_VALUE": ""
        },
        "upperName": "UF_CRM_44_1721812915476"
    },
    "ufCrm44_1721812935209": {
        "type": "boolean",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "title": "Пользовательское поле (Да/Нет)",
        "listLabel": "Пользовательское поле (Да/Нет)",
        "formLabel": "Пользовательское поле (Да/Нет)",
        "filterLabel": "Пользовательское поле (Да/Нет)",
        "settings": {
        "DEFAULT_VALUE": 0,
        "DISPLAY": "CHECKBOX",
        "LABEL": [
            "",
            ""
        ],
        "LABEL_CHECKBOX": {
            "en": "Пользовательское поле (Да/Нет)",
            "ru": "Пользовательское поле (Да/Нет)",
            "th": "Пользовательское поле (Да/Нет)",
            "la": "Пользовательское поле (Да/Нет)",
            "tc": "Пользовательское поле (Да/Нет)",
            "sc": "Пользовательское поле (Да/Нет)",
            "br": "Пользовательское поле (Да/Нет)",
            "ar": "Пользовательское поле (Да/Нет)",
            "fr": "Пользовательское поле (Да/Нет)",
            "vn": "Пользовательское поле (Да/Нет)",
            "pl": "Пользовательское поле (Да/Нет)",
            "tr": "Пользовательское поле (Да/Нет)",
            "ja": "Пользовательское поле (Да/Нет)",
            "it": "Пользовательское поле (Да/Нет)",
            "ms": "Пользовательское поле (Да/Нет)",
            "id": "Пользовательское поле (Да/Нет)"
        }
        },
        "upperName": "UF_CRM_44_1721812935209"
    },
    "ufCrm44_1721812948498": {
        "type": "double",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": true,
        "title": "Пользовательское поле (число)",
        "listLabel": "Пользовательское поле (число)",
        "formLabel": "Пользовательское поле (число)",
        "filterLabel": "Пользовательское поле (число)",
        "settings": {
        "PRECISION": 2,
        "SIZE": 20,
        "MIN_VALUE": 0,
        "MAX_VALUE": 0,
        "DEFAULT_VALUE": null
        },
        "upperName": "UF_CRM_44_1721812948498"
    }
    }
    ```

    {% endcut %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
            "entityTypeId": 1302,
            "fields": {
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
            }
        }' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
            "entityTypeId": 1302,
            "fields": {
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
            },
            "auth": "**put_access_token_here**"
        }' \
        https://**put_your_bitrix24_address**/rest/crm.item.add
        ```

    - JS

        ```js
        const greenPixelInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAAAMCAYAAACqTLVoAAAALklEQVR42u3SAQEAAAQDsEsuOj3YMqwy6fBWCSCAAAIgAAIgAAIgAAIgAAJw3QLOrRH1U/gU4gAAAABJRU5ErkJggg==";

        BX24.callMethod(
            'crm.item.add', 
            {
                entityTypeId: 1302,
                fields: {
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
            'crm.item.add',
            [
                'entityTypeId' => 1302,
                'fields' => [
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
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 342,
            "createdTime": "2024-07-18T14:00:14+02:00",
            "dateCreateShort": null,
            "updatedTime": "2024-07-18T14:00:14+02:00",
            "dateModifyShort": null,
            "createdBy": 1,
            "updatedBy": 1,
            "assignedById": 6,
            "opened": "N",
            "leadId": 102,
            "companyId": 5,
            "contactId": 4,
            "quoteId": 7,
            "title": "Новая сделка (специально для примера rest методов)",
            "productId": null,
            "categoryId": 9,
            "stageId": "C9:UC_KN8KFI",
            "stageSemanticId": "P",
            "isNew": "N",
            "isRecurring": "N",
            "isReturnCustomer": "N",
            "isRepeatedApproach": "Y",
            "closed": "N",
            "typeId": "SERVICE",
            "opportunity": 999.99,
            "isManualOpportunity": "Y",
            "taxValue": 0,
            "currencyId": "RUB",
            "probability": 50,
            "comments": "\nПример комментария внутри сделки\n\n[B]Жирный текст[/B]\n[I]Курсив[/I]\n[U]Подчеркнутый[/U]\n[S]Зачеркнутый[/S]\n[B][I][U][S]Микс[/S][/U][/I][/B]\n\n[LIST]\n[*]Элемент списка #1\n[*]Элемент списка #2\n[*]Элемент списка #3\n[/LIST]\n\n[LIST=1]\n[*]Нумерованный элемент списка #1\n[*]Нумерованный элемент списка #2\n[*]Нумерованный элемент списка #3\n[/LIST]\n",
            "begindate": "2024-06-18T02:00:00+02:00",
            "begindateShort": null,
            "closedate": "2024-07-30T02:00:00+02:00",
            "closedateShort": null,
            "eventDate": null,
            "eventDateShort": null,
            "eventId": null,
            "eventDescription": null,
            "locationId": null,
            "webformId": null,
            "sourceId": "WEB",
            "sourceDescription": "Тут должно быть дополнительное описание об источнике",
            "originatorId": null,
            "originId": null,
            "additionalInfo": "Тут должна быть дополнительная информация",
            "searchContent": null,
            "orderStage": null,
            "movedBy": 1,
            "movedTime": "2024-07-18T14:00:14+02:00",
            "lastActivityBy": 1,
            "lastActivityTime": "2024-07-18T14:00:14+02:00",
            "isWork": null,
            "isWon": null,
            "isLose": null,
            "receivedAmount": null,
            "lostAmount": null,
            "hasProducts": null,
            "ufCrm_1721244707107": 1111.1,
            "parentId1220": 2,
            "utmSource": "google",
            "utmMedium": "CPC",
            "utmCampaign": null,
            "utmContent": null,
            "utmTerm": null,
            "observers": [
                2,
                3
            ],
            "contactIds": [
                4,
                5
            ],
            "entityTypeId": 2
        }
    },
    "time": {
        "start": 1721304013.245896,
        "finish": 1721304015.555471,
        "duration": 2.309574842453003,
        "processing": 1.8328988552093506,
        "date_start": "2024-07-18T14:00:13+02:00",
        "date_finish": "2024-07-18T14:00:15+02:00",
        "operating": 1.8328571319580078
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа, содержит единственный ключ `item` ||
|| **item**
[`item`](#item) | Информация о созданном элементе ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

{% note info %}

Выключенные поля всегда отдают `null`

{% endnote %}

{% include [Объект item](../../../_includes/crm-item-2.md) %}

{% note info " " %}

По умолчанию имена пользовательских полей передаются и возвращаются в camelCase, например `ufCrm2_1639669411830`.
При передаче параметра `useOriginalUfNames` со значением `Y` пользовательские поля будут возвращаться с оригинальными именами, например `UF_CRM_2_1639669411830`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                           | **Описание**                                                       | **Значение**                                                                                    ||
|| `403`      | `allowed_only_intranet_user`      | Действие разрешено только интранет-пользователям                   | Пользователь не является интранет-пользователем                                                 ||
|| `400`      | `NOT_FOUND`                       | Смарт-процесс не найден                                            | Возникает, при передаче невалидного `entityTypeId`                                              ||
|| `400`      | `ACCESS_DENIED`                   | Доступ запрещен                                                    | У пользователя нет прав на добавление элементов типа `entityTypeId`                             ||
|| `400`      | `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля "`field`"                                   | Передано неправильное значения поля `field`                                                     ||
|| `400`      | `100`                             | Expected iterable value for multiple field, but got `type` instead | В одно из множественных полей было передано значения типа `type`, хотя ожидался итерируемый тип ||
|| `400`      | `CREATE_DYNAMIC_ITEM_RESTRICTED`  | Вы не можете создать новый элемент из-за ограничений вашего тарифа | Ограничения тарифа не позволяют создавать элементы смарт-процессов                              ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}


## Продолжите изучение


- [{#T}](crm-item-update.md)
- [{#T}](crm-item-get.md)
- [{#T}](crm-item-list.md)
- [{#T}](crm-item-delete.md)
- [{#T}](crm-item-fields.md)

[1]: ../data-types.md