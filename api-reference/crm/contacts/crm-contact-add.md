# Создать новый контакт crm.contact.add

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «добавления|импорта» контакта

Метод `crm.contact.add` создает новый контакт.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`object`][1] | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано ||
|| **params**
[`object`][1] | Объект, содержащий набор дополнительных параметров.

Структура и возможные значения описана [ниже](#parameter-params) ||
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Обращение.

Список доступных типов обращений можно узнать с помощью метода [`crm.status.list`][2], применив фильтр `{ ENTITY_ID: "HONORIFIC" }`.

По умолчанию — первый доступный тип обращения ||
|| **NAME**
[`string`][1] | Имя ||
|| **SECOND_NAME**
[`string`][1] | Отчество ||
|| **LAST_NAME**
[`string`][1] | Фамилия ||
|| **PHOTO**
[`file`][1] | Фотография ||
|| **BIRTHDATE**
[`date`][1] | Дата рождения ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Тип контакта.

Список доступных типов контакта можно узнать с помощью метода [`crm.status.list`][2], применив фильтр `{ ENTITY_ID: "CONTACT_TYPE" }`.

По умолчанию — первый доступный тип контакта ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник.

Список доступных типов источника можно узнать с помощью метода [`crm.status.list`][2], применив фильтр `{ ENTITY_ID: "SOURCE" }`.

По умолчанию — первый доступный тип источника ||
|| **SOURCE_DESCRIPTION**
[`string`][1] | Дополнительно об источнике ||
|| **POST**
[`string`][1] | Должность ||
|| **COMMENTS**
[`string`][1] | Комментарий. Поддерживает bb-коды ||
|| **OPENED**
[`boolean`][1] | Доступен ли для всех. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y`. Значение по умолчанию может быть изменено в настройках CRM ||
|| **EXPORT**
[`boolean`][1] | Участвует ли контакт в экспорте. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **ASSIGNED_BY_ID**
[`user`][1] | Идентификатор пользователя, ответственного за элемент.

По умолчанию — идентификатор пользователя, который вызывает метод ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор основной компании для контакта.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4` ||
|| **COMPANY_IDS**
[`crm_company[]`](../data-types.md) | Массив идентификаторов компаний, к которым привязан контакт.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4`  ||
|| **UTM_SOURCE**
[`string`][1] | Рекламная система (Yandex-Direct, Google-Adwords и другие)  ||
|| **UTM_MEDIUM**
[`string`][1] | Тип трафика. Возможные значения:
- `CPC` — объявления
- `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`][1] | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **TRACE**
[`string`][1] | Информация для [сквозной аналитики](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-contact.md) ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md) | Телефон ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md) | E-mail ||
|| **WEB**
[`crm_multifield[]`](../data-types.md) | Сайт ||
|| **IM**
[`crm_multifield[]`](../data-types.md) | Мессенджер ||
|| **LINK**
[`crm_multifield[]`](../data-types.md) | Ссылки. Служебное поле ||
||**UF_...**  | Пользовательские поля. Например, `UF_CRM_25534736`. 

В зависимости от настроек портала у контактов может быть набор пользовательских полей определенных типов. 

Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) ||
||**PARENT_ID_...** | Поля связей. 

Если на портале есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и контактом. Само поле хранит идентификатор элемента такого смарт-процесса. 

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`. Оно хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом ||
|#

**Поля связи с внешними источниками данных**

Если контакт создан внешней системой, то:
- поле `ORIGINATOR_ID` хранит строковый идентификатор этой системы
- поле `ORIGIN_ID` хранит строковый идентификатор контакта в этой внешней системе
- поле `ORIGIN_VERSION` хранит версию данных контакта в этой внешней системе

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINATOR_ID**
[`string`][1] | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
|| **ORIGIN_ID**
[`string`][1] | Версия данных о контакте во внешней системе. Используется для защиты данных от случайного перетирания внешней системой. 

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **ORIGIN_VERSION**
[`string`][1] | Версия оригинала ||
|#

**Импорт**

Данные поля доступны для заполнения при передаче параметра `IMPORT = 'Y'` в параметр `params`.

#|
|| **Название**
`тип` | **Описание** ||
|| **DATE_CREATE**
[`datetime`][1] | Дата создания.

Доступен при передаче `IMPORT = Y` в `params`.

Не может быть меньше, чем дата создания последнего созданного контакта
||
|| **DATE_MODIFY**
[`datetime`][1] | Дата изменения.

Доступен при передаче `IMPORT = Y` в `params` ||
|| **CREATED_BY_ID**
[`user`][1] | Кем создан.

Доступен при передаче `IMPORT = Y` в `params` ||
|| **MODIFY_BY_ID**
[`user`][1] | Кем изменен.
Доступен при передаче `IMPORT = Y` в `params` ||
|#

**Устаревшие поля**

Поля адреса в контакте являются устаревшими и используются только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **ADDRESS**
[`string`][1] | Адрес ||
|| **ADDRESS_2**
[`string`][1] | Вторая строка адреса ||
|| **ADDRESS_CITY**
[`string`][1] | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`][1] | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`][1] | Район ||
|| **ADDRESS_PROVINCE**
[`string`][1] | Область ||
|| **ADDRESS_COUNTRY**
[`string`][1] | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`][1] | Код страны ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`][1] | Идентификатор адреса местоположения ||
|#

### Параметр params {#parameter-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`boolean`][1] | Производить ли регистрацию события добавления контакта в живой ленте. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **IMPORT**
[`boolean`][1] | Включен ли режим импорта. Возможные значения:
- `Y` — да

Чтобы передать значение `Нет`, необходимо либо вообще не передавать параметр, либо передать значение `0`, `''`

По умолчанию `Нет` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FIELDS":{"HONORIFIC":"HNR_RU_1","NAME":"Иван","SECOND_NAME":"Иванович","LAST_NAME":"Иванов","PHOTO":{"fileData":"**put_photo_data_here**"},"BIRTHDATE":"11.11.2001","TYPE_ID":"PARTNER","SOURCE_ID":"WEB","SOURCE_DESCRIPTION":"*Дополнительно об источнике*","POST":"Администратор","COMMENTS":"**put_comment_here**","OPENED":"Y","EXPORT":"N","ASSIGNED_BY_ID":6,"COMPANY_ID":12,"COMPANY_IDS":[12,13,15],"UTM_SOURCE":"yandex","UTM_MEDIUM":"CPC","UTM_CAMPAIGN":"summer_sale","UTM_CONTENT":"header_banner","UTM_TERM":"discount","PHONE":[{"VALUE":"+7333333555","VALUE_TYPE":"WORK"},{"VALUE":"+35599888666","VALUE_TYPE":"HOME"}],"EMAIL":[{"VALUE":"ivanov@example.mailing","VALUE_TYPE":"MAILING"},{"VALUE":"ivanov@example.work","VALUE_TYPE":"WORK"}],"UF_CRM_1720697698689":"Пример значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":12}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FIELDS":{"HONORIFIC":"HNR_RU_1","NAME":"Иван","SECOND_NAME":"Иванович","LAST_NAME":"Иванов","PHOTO":{"fileData":"**put_photo_data_here**"},"BIRTHDATE":"11.11.2001","TYPE_ID":"PARTNER","SOURCE_ID":"WEB","SOURCE_DESCRIPTION":"*Дополнительно об источнике*","POST":"Администратор","COMMENTS":"**put_comment_here**","OPENED":"Y","EXPORT":"N","ASSIGNED_BY_ID":6,"COMPANY_ID":12,"COMPANY_IDS":[12,13,15],"UTM_SOURCE":"yandex","UTM_MEDIUM":"CPC","UTM_CAMPAIGN":"summer_sale","UTM_CONTENT":"header_banner","UTM_TERM":"discount","PHONE":[{"VALUE":"+7333333555","VALUE_TYPE":"WORK"},{"VALUE":"+35599888666","VALUE_TYPE":"HOME"}],"EMAIL":[{"VALUE":"ivanov@example.mailing","VALUE_TYPE":"MAILING"},{"VALUE":"ivanov@example.work","VALUE_TYPE":"WORK"}],"UF_CRM_1720697698689":"Пример значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":12},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.add
    ```

- JS


    ```js
    try
    {
        const response = await $b24.callMethod(
            'crm.contact.add',
            {
                fields: {
                    HONORIFIC: "HNR_RU_1",
                    NAME: "Иван",
                    SECOND_NAME: "Иванович",
                    LAST_NAME: "Иванов",
                    PHOTO: {
                        fileData: document.getElementById('photo'),
                    },
                    BIRTHDATE: '11.11.2001',
                    TYPE_ID: "PARTNER",
                    SOURCE_ID: "WEB",
                    SOURCE_DESCRIPTION: "*Дополнительно об источнике*",
                    POST: "Администратор",
                    COMMENTS: `
                        Пример комментария внутри контакта

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
                    `,
                    OPENED: "Y",
                    EXPORT: "N",
                    ASSIGNED_BY_ID: 6,
                    COMPANY_ID: 12,
                    COMPANY_IDS: [12, 13, 15],
                    UTM_SOURCE: "yandex",
                    UTM_MEDIUM: "CPC",
                    UTM_CAMPAIGN: "summer_sale",
                    UTM_CONTENT: "header_banner",
                    UTM_TERM: "discount",
                    PHONE: [
                        {
                            VALUE: "+7333333555",
                            VALUE_TYPE: "WORK",
                        },
                        {
                            VALUE: "+35599888666",
                            VALUE_TYPE: "HOME",
                        }
                    ],
                    EMAIL: [
                        {
                            VALUE: "ivanov@example.mailing",
                            VALUE_TYPE: "MAILING",
                        },
                        {
                            VALUE: "ivanov@example.work",
                            VALUE_TYPE: "WORK",
                        }
                    ],
                    UF_CRM_1720697698689: "Пример значения пользовательского поля с типом \"Строка\"",
                    PARENT_ID_1224: 12,
                },
            }
        );
        
        const result = response.getData().result;
        result.error()
            ? console.error(result.error())
            : console.info(result)
        ;
    }
    catch( error )
    {
        console.error(error);
    }
    ```

- PHP

    ```php        
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.add',
                [
                    'fields' => [
                        'HONORIFIC' => 'HNR_RU_1',
                        'NAME' => 'Иван',
                        'SECOND_NAME' => 'Иванович',
                        'LAST_NAME' => 'Иванов',
                        'PHOTO' => [
                            'fileData' => document.getElementById('photo'),
                        ],
                        'BIRTHDATE' => '11.11.2001',
                        'TYPE_ID' => 'PARTNER',
                        'SOURCE_ID' => 'WEB',
                        'SOURCE_DESCRIPTION' => '*Дополнительно об источнике*',
                        'POST' => 'Администратор',
                        'COMMENTS' => '
                            Пример комментария внутри контакта

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
                        ',
                        'OPENED' => 'Y',
                        'EXPORT' => 'N',
                        'ASSIGNED_BY_ID' => 6,
                        'COMPANY_ID' => 12,
                        'COMPANY_IDS' => [12, 13, 15],
                        'UTM_SOURCE' => 'yandex',
                        'UTM_MEDIUM' => 'CPC',
                        'UTM_CAMPAIGN' => 'summer_sale',
                        'UTM_CONTENT' => 'header_banner',
                        'UTM_TERM' => 'discount',
                        'PHONE' => [
                            [
                                'VALUE' => '+7333333555',
                                'VALUE_TYPE' => 'WORK',
                            ],
                            [
                                'VALUE' => '+35599888666',
                                'VALUE_TYPE' => 'HOME',
                            ]
                        ],
                        'EMAIL' => [
                            [
                                'VALUE' => 'ivanov@example.mailing',
                                'VALUE_TYPE' => 'MAILING',
                            ],
                            [
                                'VALUE' => 'ivanov@example.work',
                                'VALUE_TYPE' => 'WORK',
                            ]
                        ],
                        'UF_CRM_1720697698689' => 'Пример значения пользовательского поля с типом "Строка"',
                        'PARENT_ID_1224' => 12,
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.add',
        {
            fields: {
                HONORIFIC: "HNR_RU_1",
                NAME: "Иван",
                SECOND_NAME: "Иванович",
                LAST_NAME: "Иванов",
                PHOTO: {
                    fileData: document.getElementById('photo'),
                },
                BIRTHDATE: '11.11.2001',
                TYPE_ID: "PARTNER",
                SOURCE_ID: "WEB",
                SOURCE_DESCRIPTION: "*Дополнительно об источнике*",
                POST: "Администратор",
                COMMENTS: `
                    Пример комментария внутри контакта

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
                `,
                OPENED: "Y",
                EXPORT: "N",
                ASSIGNED_BY_ID: 6,
                COMPANY_ID: 12,
                COMPANY_IDS: [12, 13, 15],
                UTM_SOURCE: "yandex",
                UTM_MEDIUM: "CPC",
                UTM_CAMPAIGN: "summer_sale",
                UTM_CONTENT: "header_banner",
                UTM_TERM: "discount",
                PHONE: [
                    {
                        VALUE: "+7333333555",
                        VALUE_TYPE: "WORK",
                    },
                    {
                        VALUE: "+35599888666",
                        VALUE_TYPE: "HOME",
                    }
                ],
                EMAIL: [
                    {
                        VALUE: "ivanov@example.mailing",
                        VALUE_TYPE: "MAILING",
                    },
                    {
                        VALUE: "ivanov@example.work",
                        VALUE_TYPE: "WORK",
                    }
                ],
                UF_CRM_1720697698689: "Пример значения пользовательского поля с типом \"Строка\"",
                PARENT_ID_1224: 12,
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.add',
        [
            'fields' => [
                'HONORIFIC' => 'HNR_RU_1',
                'NAME' => 'Иван',
                'SECOND_NAME' => 'Иванович',
                'LAST_NAME' => 'Иванов',
                'PHOTO' => [
                    'fileData' => document.getElementById('photo'),
                ],
                'BIRTHDATE' => '11.11.2001',
                'TYPE_ID' => 'PARTNER',
                'SOURCE_ID' => 'WEB',
                'SOURCE_DESCRIPTION' => '*Дополнительно об источнике*',
                'POST' => 'Администратор',
                'COMMENTS' => '
                    Пример комментария внутри контакта

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
                ',
                'OPENED' => 'Y',
                'EXPORT' => 'N',
                'ASSIGNED_BY_ID' => 6,
                'COMPANY_ID' => 12,
                'COMPANY_IDS' => [12, 13, 15],
                'UTM_SOURCE' => 'yandex',
                'UTM_MEDIUM' => 'CPC',
                'UTM_CAMPAIGN' => 'summer_sale',
                'UTM_CONTENT' => 'header_banner',
                'UTM_TERM' => 'discount',
                'PHONE' => [
                    [
                        'VALUE' => '+7333333555',
                        'VALUE_TYPE' => 'WORK',
                    ],
                    [
                        'VALUE' => '+35599888666',
                        'VALUE_TYPE' => 'HOME',
                    ]
                ],
                'EMAIL' => [
                    [
                        'VALUE' => 'ivanov@example.mailing',
                        'VALUE_TYPE' => 'MAILING',
                    ],
                    [
                        'VALUE' => 'ivanov@example.work',
                        'VALUE_TYPE' => 'WORK',
                    ]
                ],
                'UF_CRM_1720697698689' => 'Пример значения пользовательского поля с типом "Строка"',
                'PARENT_ID_1224' => 12,
            ]
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
    "result": 46,
    "time": {
        "start": 1723713732.235658,
        "finish": 1723713733.742049,
        "duration": 1.5063910484313965,
        "processing": 1.1416668891906738,
        "date_start": "2024-08-15T11:22:12+02:00",
        "date_finish": "2024-08-15T11:22:13+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`][1] | Корневой элемент ответа, содержит идентификатор созданного контакта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'fields' must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `Parameter 'fields' must be array` | В параметр `fields` передан не объект ||
|| `-`     | `Parameter 'params' must be array` | В параметр `params` передан не объект ||
|| `-`     | `Access denied` | У пользователя нет прав на «Добавление» или «Импорт» контактов ||
|| `-`     | Исчерпан выделенный дисковый ресурс | ||
|| `ERROR_CORE` | Поле `Рабочий e-mail` содержит некорректный адрес | ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact-with-requisite.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)

[1]: ../../data-types.md
[2]: ../status/crm-status-list.md