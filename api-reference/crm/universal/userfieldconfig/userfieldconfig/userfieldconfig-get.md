# Получить настройки пользовательского поля userfieldconfig.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`userfieldconfig`](../../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../../scopes/permissions.md))
>
> Кто может выполнять метод: пользователь с правом чтения объекта, которому принадлежит поле, в модуле `moduleId`

Метод `userfieldconfig.get` возвращает настройки пользовательского поля по его идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, в котором находится поле ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор настроек пользовательского поля.

Идентификатор можно получить методом [userfieldconfig.list](./userfieldconfig-list.md) или при создании поля методом [userfieldconfig.add](./userfieldconfig-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","id":7095}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userfieldconfig.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","id":7095,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userfieldconfig.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'userfieldconfig.get',
    		{
    			moduleId: 'crm',
    			id: 7095,
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
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
                'userfieldconfig.get',
                [
                    'moduleId' => 'crm',
                    'id' => 7095,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Result: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldconfig.get',
        {
            moduleId: 'crm',
            id: 7095,
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
        'userfieldconfig.get',
        [
            'moduleId' => 'crm',
            'id' => 7095,
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
        "field": {
            "id": "7095",
            "entityId": "CRM_7",
            "fieldName": "UF_CRM_7_NEW_REST_LIST_2026",
            "userTypeId": "enumeration",
            "xmlId": null,
            "sort": "100",
            "multiple": "Y",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "DISPLAY": "LIST",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "List of characteristics",
                "ru": "Список характеристик"
            },
            "listColumnLabel": {
                "en": null,
                "ru": null
            },
            "listFilterLabel": {
                "en": null,
                "ru": null
            },
            "errorMessage": {
                "en": null,
                "ru": null
            },
            "helpMessage": {
                "en": null,
                "ru": null
            },
            "enum": [
                {
                    "id": "3671",
                    "userFieldId": "7095",
                    "value": "Характеристика 1",
                    "def": "N",
                    "sort": "100",
                    "xmlId": "38a8c98a5de02f8ccdca2244e5065ecd"
                },
                {
                    "id": "3673",
                    "userFieldId": "7095",
                    "value": "Характеристика 2",
                    "def": "Y",
                    "sort": "200",
                    "xmlId": "9520e17b39f3525b820b809914b52207"
                }
            ]
        }
    },
    "time": {
        "start": 1774355752,
        "finish": 1774355752.177393,
        "duration": 0.17739295959472656,
        "processing": 0,
        "date_start": "2026-03-24T15:35:52+03:00",
        "date_finish": "2026-03-24T15:35:52+03:00",
        "operating_reset_at": 1774356352,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Если поле не найдено, может вернуться `null` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **field**
[`object`](../../../data-types.md) | Настройки пользовательского поля [(подробное описание)](#result_field) ||
|#

##### Объект field {#result_field}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор настроек поля ||
|| **entityId**
[`string`](../../../data-types.md) | Идентификатор объекта ||
|| **fieldName**
[`string`](../../../data-types.md) | Код поля ||
|| **userTypeId**
[`string`](../../../data-types.md) | Идентификатор типа поля ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор поля ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **multiple**
[`boolean`](../../../data-types.md) | Флаг множественного значения (`Y`/`N`) ||
|| **mandatory**
[`boolean`](../../../data-types.md) | Флаг обязательного поля (`Y`/`N`) ||
|| **showFilter**
[`boolean`](../../../data-types.md) | Флаг показа поля в фильтре ||
|| **showInList**
[`boolean`](../../../data-types.md) | Флаг показа поля в списке ||
|| **editInList**
[`boolean`](../../../data-types.md) | Флаг редактирования в списке ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Флаг участия в поиске ||
|| **settings**
[`object`](../../../data-types.md) | Дополнительные настройки поля.

Состав ключей зависит от `userTypeId` ||
|| **languageId**
[`object`](../../../data-types.md) | Языки, для которых заданы подписи поля ||
|| **editFormLabel**
[`lang_map`](../../../data-types.md) | Подписи в форме редактирования ||
|| **listColumnLabel**
[`lang_map`](../../../data-types.md) | Подписи колонки в списке ||
|| **listFilterLabel**
[`lang_map`](../../../data-types.md) | Подписи в фильтре ||
|| **errorMessage**
[`lang_map`](../../../data-types.md) | Текст сообщения об ошибке ||
|| **helpMessage**
[`lang_map`](../../../data-types.md) | Подсказка по полю ||
|| **enum**
[`object[]`](../../../data-types.md) | Варианты значений.

Поле возвращается только для `userTypeId = enumeration` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Вы не можете просматривать настройки пользовательских полей"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Вы не можете просматривать настройки пользовательских полей | Недостаточно прав на просмотр поля. Эта же ошибка может возвращаться, если поле с переданным `id` уже удалено или недоступно в контексте `moduleId` ||
|| `-` | The current method required more scopes. (crm) | У приложения нет нужного scope для модуля из `moduleId` ||
|| `-` | No settings for UserFieldAccess | Для переданного `moduleId` не настроен доступ к пользовательским полям ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldconfig-add.md)
- [{#T}](./userfieldconfig-update.md)
- [{#T}](./userfieldconfig-list.md)
- [{#T}](./userfieldconfig-delete.md)
- [{#T}](./userfieldconfig-get-types.md)
