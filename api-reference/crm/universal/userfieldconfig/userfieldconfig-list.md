# Получить список настроек пользовательских полей userfieldconfig.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`userfieldconfig`](../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../scopes/permissions.md))
>
> Кто может выполнять метод: пользователь с правом чтения объекта, которому принадлежат поля, в модуле `moduleId`

Метод `userfieldconfig.list` возвращает список настроек пользовательских полей по фильтру.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, в котором выполняется поиск полей ||
|| **select**
[`object`](../../../data-types.md) | Набор полей, которые нужно вернуть [(подробное описание)](#select) ||
|| **order**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` - название поля, по которому будет произведена сортировка выборки
- `value_n` - значение типа `string`, равное:
  - `ASC` - сортировка по возрастанию
  - `DESC` - сортировка по убыванию

Список доступных полей для сортировки:
- `id` - идентификатор пользовательского поля
- `fieldName` - код пользовательского поля
- `userTypeId` - тип пользовательского поля
- `xmlId` - внешний код
- `sort` - индекс сортировки

По умолчанию:
```
{
    "sort": "ASC",
    "id": "ASC"
}
```
||
|| **filter**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` - название поля, по которому будет отфильтрована выборка пользовательских полей
- `value_n` - значение фильтра

Все условия по отдельным полям соединяются с помощью `AND`.

Смотрите ниже [список доступных полей для фильтрации](#filterable)
||
|| **start**
[`integer`](../../../data-types.md) | Смещение для постраничной выборки.

Используйте значение параметра `next` из предыдущего ответа ||
|#

### Параметр select {#select}

#|
|| **Название**
`тип` | **Описание** ||
|| **\***
[`string`](../../../data-types.md) | Вернуть все стандартные поля настройки ||
|| **language**
[`string`](../../../data-types.md) | Языковой идентификатор для языковых полей, например `ru` или `en` ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор настройки поля ||
|| **entityId**
[`string`](../../../data-types.md) | Идентификатор объекта ||
|| **fieldName**
[`string`](../../../data-types.md) | Код поля ||
|| **userTypeId**
[`string`](../../../data-types.md) | Тип поля ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор ||
|| **sort**
[`string`](../../../data-types.md) | Индекс сортировки ||
|| **multiple**
[`string`](../../../data-types.md) | Является ли пользовательское поле множественным. Возможные значения: `Y` или `N` ||
|| **mandatory**
[`string`](../../../data-types.md) | Является ли пользовательское поле обязательным. Возможные значения: `Y` или `N` ||
|| **showFilter**
[`string`](../../../data-types.md) | Показывать ли поле в фильтре списка. Возможные значения: `N`, `I`, `E`, `S` ||
|| **showInList**
[`string`](../../../data-types.md) | Показывать ли поле в списке. Возможные значения: `Y` или `N` ||
|| **editInList**
[`string`](../../../data-types.md) | Разрешать ли редактирование значения в списке. Возможные значения: `Y` или `N` ||
|| **isSearchable**
[`string`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения: `Y` или `N` ||
|| **settings**
[`string`](../../../data-types.md) | Дополнительные настройки поля ||
|| **languageId**
[`string`](../../../data-types.md) | [Языковой идентификатор](../../../data-types.md#lang-ids). При передаче этого параметра возвращается набор языковых полей на выбранном языке:
- `editFormLabel` - подпись в форме редактирования
- `listColumnLabel` - заголовок в списке
- `listFilterLabel` - подпись фильтра в списке
- `errorMessage` - сообщение об ошибке
- `helpMessage` - помощь ||
|#

### Доступные для фильтрации поля {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **fieldName**
[`string`](../../../data-types.md) | Код пользовательского поля ||
|| **userTypeId**
[`string`](../../../data-types.md) | Тип пользовательского поля ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **multiple**
[`boolean`](../../../data-types.md) | Является ли пользовательское поле множественным. Возможные значения: `Y` или `N` ||
|| **mandatory**
[`boolean`](../../../data-types.md) | Является ли пользовательское поле обязательным. Возможные значения: `Y` или `N` ||
|| **showFilter**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения: `N`, `I`, `E`, `S` ||
|| **showInList**
[`boolean`](../../../data-types.md) | Показывать ли в списке. Возможные значения: `Y` или `N` ||
|| **editInList**
[`boolean`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения: `Y` или `N` ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения: `Y` или `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","select":{"0":"*","language":"ru"},"order":{"id":"DESC"},"filter":{"multiple":"Y"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userfieldconfig.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","select":{"0":"*","language":"ru"},"order":{"id":"DESC"},"filter":{"multiple":"Y"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userfieldconfig.list
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'userfieldconfig.list',
    		{
    			moduleId: 'crm',
    			select: {
    				0: '*',
    				language: 'ru',
    			},
    			order: {
    				id: 'DESC',
    			},
    			filter: {
    				multiple: 'Y',
    			},
    			start: 0,
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
                'userfieldconfig.list',
                [
                    'moduleId' => 'crm',
                    'select' => [
                        0 => '*',
                        'language' => 'ru',
                    ],
                    'order' => [
                        'id' => 'DESC',
                    ],
                    'filter' => [
                        'multiple' => 'Y',
                    ],
                    'start' => 0,
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
        'userfieldconfig.list',
        {
            moduleId: 'crm',
            select: {
                0: '*',
                language: 'ru',
            },
            order: {
                id: 'DESC',
            },
            filter: {
                multiple: 'Y',
            },
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.info(result.data());

            if (result.more()) {
                result.next();
            }
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.list',
        [
            'moduleId' => 'crm',
            'select' => [
                0 => '*',
                'language' => 'ru',
            ],
            'order' => [
                'id' => 'DESC',
            ],
            'filter' => [
                'multiple' => 'Y',
            ],
            'start' => 0,
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
        "fields": [
            {
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
                    "ru": "ru"
                },
                "editFormLabel": {
                    "ru": "Список характеристик"
                },
                "listColumnLabel": null,
                "listFilterLabel": null,
                "errorMessage": null,
                "helpMessage": null
            }
        ]
    },
    "next": 50,
    "total": 94,
    "time": {
        "start": 1724239307.903115,
        "finish": 1724239308.567422,
        "duration": 0.6643068790435791,
        "processing": 0.20090818405151367,
        "date_start": "2024-08-21T13:21:47+02:00",
        "date_finish": "2024-08-21T13:21:48+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных настроек ||
|| **next**
[`integer`](../../../data-types.md) | Смещение следующей страницы.

Поле возвращается, если количество найденных элементов больше 50 ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`object[]`](../../../data-types.md) | Список найденных настроек пользовательских полей [(подробное описание)](#result_fields) ||
|#

##### Объект fields[] {#result_fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **entityId**
[`string`](../../../data-types.md) | Идентификатор объекта, к которому относится пользовательское поле ||
|| **fieldName**
[`string`](../../../data-types.md) | Код пользовательского поля ||
|| **userTypeId**
[`string`](../../../data-types.md) | Тип пользовательского поля ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **multiple**
[`boolean`](../../../data-types.md) | Является ли пользовательское поле множественным. Возможные значения: `Y` или `N` ||
|| **mandatory**
[`boolean`](../../../data-types.md) | Является ли пользовательское поле обязательным. Возможные значения: `Y` или `N` ||
|| **showFilter**
[`char`](../../../data-types.md) | Режим отображения в фильтре.

Возможные значения: `N`, `I`, `E`, `S` ||
|| **showInList**
[`boolean`](../../../data-types.md) | Показывать ли поле в списке. Возможные значения: `Y` или `N` ||
|| **editInList**
[`boolean`](../../../data-types.md) | Разрешать ли редактирование значения в списке. Возможные значения: `Y` или `N` ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения: `Y` или `N` ||
|| **settings**
[`object`](../../../data-types.md) | Дополнительные настройки поля.

Состав ключей зависит от `userTypeId` ||
|| **languageId**
[`object`](../../../data-types.md) | Языковые идентификаторы, для которых заданы подписи ||
|| **editFormLabel**
[`lang_map`](../../../data-types.md) | Подписи в форме редактирования ||
|| **listColumnLabel**
[`lang_map`](../../../data-types.md) | Заголовок в списке ||
|| **listFilterLabel**
[`lang_map`](../../../data-types.md) | Подпись фильтра в списке ||
|| **errorMessage**
[`lang_map`](../../../data-types.md) | Сообщение об ошибке ||
|| **helpMessage**
[`lang_map`](../../../data-types.md) | Подсказка ||
|| **enum**
[`object[]`](../../../data-types.md) | Элементы списка для `userTypeId = enumeration`.

Поле может отсутствовать для других типов ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Вы не можете просматривать настройки пользовательских полей"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Вы не можете просматривать настройки пользовательских полей | Недостаточно прав на чтение полей по переданному фильтру ||
|| `-` | The current method required more scopes. (crm) | У приложения нет нужного scope для модуля из `moduleId` ||
|| `-` | No settings for UserFieldAccess | Для переданного `moduleId` не настроен доступ к пользовательским полям ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldconfig-add.md)
- [{#T}](./userfieldconfig-update.md)
- [{#T}](./userfieldconfig-get.md)
- [{#T}](./userfieldconfig-delete.md)
- [{#T}](./userfieldconfig-get-types.md)
