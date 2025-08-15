# Получить список календарей calendar.section.get

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список календарей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип календаря: 
- `user` — календарь пользователя
- `group` — календарь группы
- `company_calendar` — календарь компании 
- `location` — календарь переговорной комнаты. Используется для бронирования времени в календаре переговорной комнаты через стороннее приложение
- другие типы, в том числе пользовательские ||
|| **ownerId***
[`integer`](../data-types.md) | Идентификатор владельца календаря.

Для типа календаря `location` параметр `ownerId` должен иметь значение `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.section.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.section.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.section.get',
    		{
    			type: 'user',
    			ownerId: 1
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'calendar.section.get',
                [
                    'type'    => 'user',
                    'ownerId' => 1
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting calendar section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.section.get',
        {
            type: 'user',
            ownerId: 1
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.section.get',
        [
            'type' => 'user',
            'ownerId' => 1
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
    "result": [
        {
            "ID": "190",
            "NAME": "New Section",
            "GAPI_CALENDAR_ID": null,
            "DESCRIPTION": "Description for section",
            "COLOR": "#9cbeee",
            "TEXT_COLOR": "#283000",
            "EXPORT": {
                "ALLOW": true
            },
            "CAL_TYPE": "user",
            "OWNER_ID": "1",
            "CREATED_BY": "1",
            "DATE_CREATE": "2024-12-10 06:36:00",
            "TIMESTAMP_X": "2024-12-10 06:36:00",
            "CAL_DAV_CON": null,
            "SYNC_TOKEN": null,
            "PAGE_TOKEN": null,
            "EXTERNAL_TYPE": "local",
            "ACCESS": {
                "D114": 17,
                "G2": 13,
                "U2": 15,
                "U1": 19
            },
            "IS_COLLAB": false,
            "PERM": {
                "view_time": true,
                "view_title": true,
                "view_full": true,
                "add": true,
                "edit": true,
                "edit_section": true,
                "access": true
            }
        },
        {
            "ID": "191",
            ...
        }
        {
            "ID": "192",
            ...
        }
    ],
    "time": {
        "start": 1733828946.418185,
        "finish": 1733828946.650208,
        "duration": 0.23202300071716309,
        "processing": 0.0054471492767333984,
        "date_start": "2024-12-08T11:09:06+00:00",
        "date_finish": "2024-12-08T11:09:06+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив календарей ||
|| **ID**
[`string`](../data-types.md) | Идентификатор календаря ||
|| **NAME**
[`string`](../data-types.md) | Название календаря ||
|| **GAPI_CALENDAR_ID**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание календаря ||
|| **COLOR**
[`string`](../data-types.md) | Цвет календаря ||
|| **TEXT_COLOR**
[`string`](../data-types.md) | Цвет текста в календаре ||
|| **EXPORT**
[`object`](../data-types.md) | Объект с [параметрами экспорта календаря](#export)
 ||
|| **CAL_TYPE**
[`string`](../data-types.md) | Тип календаря ||
|| **OWNER_ID**
[`string`](../data-types.md) | Идентификатор владельца календаря. 

Для типа Календарь пользователя `user` поле содержит идентификатор пользователя. Для Календаря группы `group` — идентификатор группы ||
|| **CREATED_BY**
[`string`](../data-types.md) | Идентификатор создателя календаря ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания календаря ||
|| **TIMESTAMP_X**
[`datetime`](../data-types.md) | Дата изменения календаря ||
|| **CAL_DAV_CON**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **SYNC_TOKEN**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **PAGE_TOKEN**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **EXTERNAL_TYPE**
[`string`](../data-types.md) | Тип провайдера для синхронизации ||
|| **ACCESS**
[`object`](../data-types.md) | Объект данных доступа к календарю. 

Ключ объекта — идентификатор прав доступа. Получить название прав доступа можно методом [access.name](../common/system/access-name.md). Определить права доступа для текущего пользователя — методом [user.access](../common/users/user-access.md).

Значение обьекта содержит числовой идентификатор разрешения на право доступа. Индентификаторы разрешения на право доступа отличаются на разных порталах. На текущий момент узнать все идентификаторы может только администратор портала в коробочной версии Битрикс24 ||
|| **IS_COLLAB**
[`boolean`](../data-types.md) | Флаг принадлежности календаря к коллабе ||
|| **PERM**
[`object`](../data-types.md) | Объект [прав доступа](#perm) текущего пользователя к календарю ||
|#

#### Объект EXPORT {#export}

#|
|| **Название**
`тип` | **Описание** ||
|| **ALLOW**
[`boolean`](../data-types.md) | Экспорт календаря разрешен ||
|#
 
#### Объект PERM {#perm}

#|
|| **Название**
`тип` | **Описание** ||
|| **view_time**
[`boolean`](../data-types.md) | Просмотр времени событий календаря ||
|| **view_title**
[`boolean`](../data-types.md) | Просмотр названия событий календаря ||
|| **view_full**
[`boolean`](../data-types.md) | Полный доступ к информации о событии календаря ||
|| **add**
[`boolean`](../data-types.md) | Добавление событий в календарь ||
|| **edit**
[`boolean`](../data-types.md) | Редактирование событий в календаре ||
|| **edit_section**
[`boolean`](../data-types.md) | Редактирование календаря ||
|| **access**
[`boolean`](../data-types.md) | Полный доступ к календарю ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "type" для метода "calendar.section.get""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "type" для метода "calendar.section.get" | Не передан обязательный параметр `type` ||
|| Пустая строка | Не задан обязательный параметр "ownerId" для метода "calendar.section.get" | Не передан обязательный параметр `ownerId` и параметр `type` не равен `user` ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-section-add.md)
- [{#T}](./calendar-section-update.md)
- [{#T}](./calendar-section-delete.md)