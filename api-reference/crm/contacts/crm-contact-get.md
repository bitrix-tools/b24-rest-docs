# Получить контакт по Id crm.contact.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «чтения» контактов

Метод `crm.contact.get` возвращает контакт по его идентификатору.

Чтобы получить список компаний, привязанных к контакту, используйте метод [`crm.contact.company.items.get`](company/crm-contact-company-items-get.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор контакта. Можно получить при помощи методов [`crm.contact.list`](crm-contact-list.md) или [`crm.contact.add`](crm-contact-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить контакт с `id = 23`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":23}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":23,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.contact.get',
    		{
    			id: 23,
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
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php        
    try {
        $contactId = 123; // Example contact ID
        $contactResult = $serviceBuilder
            ->getCRMScope()
            ->contact()
            ->get($contactId);
        $itemResult = $contactResult->contact();
        print("ID: " . $itemResult->ID . PHP_EOL);
        print("Name: " . $itemResult->NAME . PHP_EOL);
        print("Last Name: " . $itemResult->LAST_NAME . PHP_EOL);
        print("Birthday: " . $itemResult->BIRTHDATE?->format(DATE_ATOM) . PHP_EOL);
        print("Created Date: " . $itemResult->DATE_CREATE->format(DATE_ATOM) . PHP_EOL);
        print("Modified Date: " . $itemResult->DATE_MODIFY->format(DATE_ATOM) . PHP_EOL);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.get',
        {
            id: 23,
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
        'crm.contact.get',
        [
            'ID' => 23
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
        "ID": "43",
        "POST": "Администратор",
        "COMMENTS": "\nПример комментария внутри контакта\n\n[B]Жирный текст[\/B]\n[I]Курсив[\/I]\n[U]Подчеркнутый[\/U]\n[S]Зачеркнутый[\/S]\n[B][I][U][S]Микс[\/S][\/U][\/I][\/B]\n\n[LIST]\n[*]Элемент списка #1\n[*]Элемент списка #2\n[*]Элемент списка #3\n[\/LIST]\n\n[LIST=1]\n[*]Нумерованный элемент списка #1\n[*]Нумерованный элемент списка #2\n[*]Нумерованный элемент списка #3\n[\/LIST]\n",
        "HONORIFIC": "HNR_RU_1",
        "NAME": "Иван",
        "SECOND_NAME": "Иванович",
        "LAST_NAME": "Иванов",
        "PHOTO": null,
        "LEAD_ID": null,
        "TYPE_ID": "PARTNER",
        "SOURCE_ID": "WEB",
        "SOURCE_DESCRIPTION": "*Дополнительно об источнике*",
        "COMPANY_ID": "12",
        "BIRTHDATE": "2001-11-11T02:00:00+02:00",
        "EXPORT": "N",
        "HAS_PHONE": "Y",
        "HAS_EMAIL": "Y",
        "HAS_IMOL": "N",
        "DATE_CREATE": "2024-08-15T10:38:21+02:00",
        "DATE_MODIFY": "2024-08-15T10:38:21+02:00",
        "ASSIGNED_BY_ID": "6",
        "CREATED_BY_ID": "1",
        "MODIFY_BY_ID": "1",
        "OPENED": "Y",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "ORIGIN_VERSION": null,
        "FACE_ID": null,
        "LAST_ACTIVITY_TIME": "2024-08-15T10:38:21+02:00",
        "ADDRESS": null,
        "ADDRESS_2": null,
        "ADDRESS_CITY": null,
        "ADDRESS_POSTAL_CODE": null,
        "ADDRESS_REGION": null,
        "ADDRESS_PROVINCE": null,
        "ADDRESS_COUNTRY": null,
        "ADDRESS_LOC_ADDR_ID": null,
        "UTM_SOURCE": "yandex",
        "UTM_MEDIUM": "CPC",
        "UTM_CAMPAIGN": "summer_sale",
        "UTM_CONTENT": "header_banner",
        "UTM_TERM": "discount",
        "PARENT_ID_1224": "12",
        "LAST_ACTIVITY_BY": "1",
        "UF_CRM_1720697698689": "Пример значения пользовательского поля с типом \u0022Строка\u0022",
        "PHONE": [
        {
            "ID": "156",
            "VALUE_TYPE": "WORK",
            "VALUE": "+7333333555",
            "TYPE_ID": "PHONE"
        },
        {
            "ID": "157",
            "VALUE_TYPE": "HOME",
            "VALUE": "+35599888666",
            "TYPE_ID": "PHONE"
        }
        ],
        "EMAIL": [
        {
            "ID": "158",
            "VALUE_TYPE": "MAILING",
            "VALUE": "ivanov@example.mailing",
            "TYPE_ID": "EMAIL"
        },
        {
            "ID": "159",
            "VALUE_TYPE": "WORK",
            "VALUE": "ivanov@example.work",
            "TYPE_ID": "EMAIL"
        }
        ]
    },
    "time": {
        "start": 1723736139.883652,
        "finish": 1723736140.299369,
        "duration": 0.41571712493896484,
        "processing": 0.14158892631530762,
        "date_start": "2024-08-15T17:35:39+02:00",
        "date_finish": "2024-08-15T17:35:40+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`contact`](#contact) | Корневой элемент ответа. Содержит информацию о полях контакта. Структура описана [ниже](#contact) ||
|| **time**
[`time`][1] | Объект, содержащий в себе информацию о времени выполнения запроса ||
|#

### contact

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`][1] | Идентификатор контакта ||
|| **POST**
[`string`][1] | Должность ||
|| **COMMENTS**
[`text`][1] | Комментарий ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Обращение ||
|| **NAME**
[`string`][1] | Имя ||
|| **SECOND_NAME**
[`string`][1] | Отчество ||
|| **LAST_NAME**
[`string`][1] | Фамилия ||
|| **PHOTO**
[`file`][1] | Фотография ||
|| **LEAD_ID**
[`crm_lead`](../data-types.md) | Идентификатор лида, на основе которого был создан контакт ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Тип контакта ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник ||
|| **SOURCE_DESCRIPTION**
[`text`][1] | Дополнительно об источнике ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор основной компании ||
|| **BIRTHDATE**
[`date`][1] | Дата рождения ||
|| **EXPORT**
[`boolean`][1] | Участвует ли в экспорте контактов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **HAS_PHONE**
[`boolean`][1] | Задан ли телефон. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **HAS_EMAIL**
[`boolean`][1] | Задан ли e-mail. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **HAS_IMOL**
[`boolean`][1] | Задана ли открытая линия. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **DATE_CREATE**
[`datetime`][1] | Дата создания ||
|| **DATE_MODIFY**
[`datetime`][1] | Дата изменения ||
|| **ASSIGNED_BY_ID**
[`user`][1] | Ответственный ||
|| **CREATED_BY_ID**
[`user`][1] | Кем создан ||
|| **MODIFY_BY_ID**
[`user`][1] | Кем изменен ||
|| **OPENED**
[`boolean`][1] | Доступно ли для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **FACE_ID**
[`integer`][1] | Привязка к лицам из модуля `faceid` ||
|| **LAST_ACTIVITY_TIME**
[`datetime`][1] | Последняя активность ||
|| **LAST_ACTIVITY_BY**
[`user`][1] | Кем осуществлена последняя активность в таймлайне ||
|| **UTM_SOURCE**
[`string`][1] | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
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
[`string`][1] | Внешний источник ||
|| **ORIGIN_ID**
[`string`][1] | Идентификатор элемента во внешнем источнике ||
|| **ORIGIN_VERSION**
[`string`][1] | Версия оригинала ||
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
|| **ADDRESS_LOC_ADDR_ID**
[`integer`][1] | Идентификатор адреса местоположения ||
|#

{% note tip "Поля типа `crm_multifield`" %}

Поля типа `crm_multifield` (`PHONE`, `EMAIL`, `WEB`, `IM`, `LINK`) явно отдаются данным методом только в случае, если значения данного поля не равны `null`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Описание** | **Значение** ||
|| `ID is not defined or invalid` | Параметр `id` не передан либо переданное значение не является целым числом больше 0 ||
|| `Access denied` | У пользователя нет прав на «Чтение» контакта ||
|| `Not found` | Контакт с переданным `id` не найден ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-activity-to-contact.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)

[1]: ../../data-types.md
