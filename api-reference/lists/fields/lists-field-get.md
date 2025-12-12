# Получить параметры поля или список полей универсального списка lists.field.get

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного списка

Метод `lists.field.get` возвращает данные о поле или список полей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп 
  
Идентификатор можно получить с помощью метода [lists.get.iblock.type.id](../lists/lists-get-iblock-type-id.md) ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **FIELD_ID**
[`string`](../../data-types.md) | Идентификатор поля. Для пользовательского поля имеет вид `PROPERTY_PropertyId`. Для системного поля является его символьным кодом.

Если не указать, возвращаются все поля списка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELD_ID":"PROPERTY_1151"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELD_ID":"PROPERTY_1151","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.field.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.field.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: '123',
                FIELD_ID: 'PROPERTY_1151',
            }
        );
        
        const result = response.getData().result;
        console.log('Fetched field data:', result);
        
        processResult(result);
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
                'lists.field.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => '123',
                    'FIELD_ID' => 'PROPERTY_1151'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.field.get',
        {
            'IBLOCK_TYPE_ID': 'lists', 
            'IBLOCK_ID': '123',        
            'FIELD_ID': 'PROPERTY_1151'
        },
        function(result) { 
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.field.get',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '123',
            'FIELD_ID' => 'PROPERTY_1151'
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
        "L": {
        "FIELD_ID": "PROPERTY_1151",
        "SORT": 50,
        "NAME": "Статус задачи",
        "IS_REQUIRED": "N",
        "MULTIPLE": "N",
        "DEFAULT_VALUE": "1685",
        "TYPE": "L",
        "PROPERTY_TYPE": "L",
        "PROPERTY_USER_TYPE": false,
        "CODE": "PROJECT",
        "ID": "1151",
        "LINK_IBLOCK_ID": null,
        "ROW_COUNT": "1",
        "COL_COUNT": "30",
        "USER_TYPE_SETTINGS": null,
        "SETTINGS": {
            "SHOW_ADD_FORM": "Y",
            "SHOW_EDIT_FORM": "Y",
            "ADD_READ_ONLY_FIELD": "N",
            "EDIT_READ_ONLY_FIELD": "Y",
            "SHOW_FIELD_PREVIEW": "N"
        },
        "DISPLAY_VALUES_FORM": {
            "1669": "Планирование",
            "1671": "В активной работе",
            "1673": "Тестирование",
            "1675": "Завершен",
            "1677": "Отложен",
            "1679": "Архив"
        }
        }
    },
    "time": {
        "start": 1765375929,
        "finish": 1765375929.696936,
        "duration": 0.6969358921051025,
        "processing": 0,
        "date_start": "2025-12-10T12:12:09+03:00",
        "date_finish": "2025-12-10T12:12:09+03:00",
        "operating_reset_at": 1765376529,
        "operating": 0
    }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Данные поля или массив полей.

Пустой массив означает, что в списке нет полей с указанным `FIELD_ID` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter `X` is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-field-add.md)
- [{#T}](./lists-field-update.md)
- [{#T}](./lists-field-delete.md)
- [{#T}](./lists-field-type-get.md)