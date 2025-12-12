# Получить доступные типы полей для универсального списка lists.field.type.get

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного списка

Метод `lists.field.type.get` возвращает список доступных типов полей для списка.

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
[`integer`](../../data-types.md) | Идентификатор поля. Для пользовательского поля имеет вид `PROPERTY_PropertyId`. Для системного поля является его символьным кодом.

Если указать идентификатор существующего в списке поля, его тип будет включен в результат. Для системных полей это означает, что их тип будет отображен, несмотря на то, что добавить их повторно нельзя ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.field.type.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.field.type.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.field.type.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: '123',
            }
        );
        
        const result = response.getData().result;
        console.log('Data:', result);
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
                'lists.field.type.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => '123'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.field.type.get', 
        {
            'IBLOCK_TYPE_ID': 'lists',
            'IBLOCK_ID': '123'
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
        'lists.field.type.get',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '123'
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
        "SORT": "Сортировка",
        "ACTIVE_FROM": "Начало активности",
        "ACTIVE_TO": "Окончание активности",
        "PREVIEW_PICTURE": "Изображение для анонса",
        "PREVIEW_TEXT": "Текст анонса",
        "DETAIL_PICTURE": "Детальное изображение",
        "DETAIL_TEXT": "Детальный текст",
        "CREATED_BY": "Кем создан",
        "TIMESTAMP_X": "Дата изменения",
        "MODIFIED_BY": "Кем изменен",
        "S": "Строка",
        "N": "Число",
        "L": "Список",
        "F": "Файл",
        "G": "Привязка к разделам",
        "E": "Привязка к элементам",
        "S:Date": "Дата",
        "S:DateTime": "Дата/Время",
        "S:HTML": "HTML/текст",
        "E:EList": "Привязка к элементам в виде списка",
        "N:Sequence": "Счетчик",
        "S:ECrm": "Привязка к элементам CRM",
        "S:Money": "Деньги",
        "S:DiskFile": "Файл (Диск)",
        "S:map_yandex": "Привязка к Яндекс.Карте",
        "S:employee": "Привязка к сотруднику"
    },
    "time": {
        "start": 1765379410,
        "finish": 1765379410.123019,
        "duration": 0.12301898002624512,
        "processing": 0,
        "date_start": "2025-12-10T16:10:10+03:00",
        "date_finish": "2025-12-10T16:10:10+03:00",
        "operating_reset_at": 1765380010,
        "operating": 0
    }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив доступных типов полей для списка ||
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
- [{#T}](./lists-field-get.md)
- [{#T}](./lists-field-delete.md)