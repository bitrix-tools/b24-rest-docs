# Получить путь к файлу lists.element.get.file.url

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного списка

Метод `lists.element.get.file.url` возвращает путь к файлу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **ELEMENT_ID***
[`integer`](../../data-types.md) | Идентификатор элемента.

Идентификатор можно получить с помощью метода [lists.element.get](./lists-element-get.md) ||
|| **ELEMENT_CODE***
[`string`](../../data-types.md) | Символьный код элемента.

Код можно получить с помощью метода [lists.element.get](./lists-element-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `ELEMENT_ID` или `ELEMENT_CODE`

{% endnote %} ||
|| **FIELD_ID***
[`integer`](../../data-types.md) | Идентификатор свойства Файл или Файл (Диск), без префикса `PROPERTY_` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}



{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":37,"ELEMENT_ID":231,"FIELD_ID":423}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.get.file.url
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":37,"ELEMENT_ID":231,"FIELD_ID":423,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.get.file.url
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.element.get.file.url',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 37,
                ELEMENT_ID: 231,
                FIELD_ID: 423
            }
        );
        
        const result = response.getData().result;
        console.log('URL файла:', result);
        
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
                'lists.element.get.file.url',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 37,
                    'ELEMENT_ID' => 231,
                    'FIELD_ID' => 423
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'URL файла: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching file URL: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.element.get.file.url',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 37,
            ELEMENT_ID: 231,
            FIELD_ID: 423  // Файл (Диск)
        },
        function(res) {
            if (res.error()) {
                console.error(res.error());
            } else {
                const result = res.data();
                console.log('URL файла:', result);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.get.file.url',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 37,
            'ELEMENT_ID' => 231,
            'FIELD_ID' => 423
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

### Пример ответа для свойства типа Файл (Диск)

HTTP-статус: **200**

```json
{
    "result": ["/bitrix/tools/disk/uf.php?attachedId=103&action=download&ncc=1"],
    "time": {
        "start": 1763660762,
        "finish": 1763660762.617248,
        "duration": 0.6172480583190918,
        "processing": 0,
        "date_start": "2025-11-19T16:46:02+03:00",
        "date_finish": "2025-11-19T16:46:02+03:00",
        "operating_reset_at": 1763661362,
        "operating": 0
    }
}
```
### Пример ответа для свойства типа Файл

HTTP-статус: **200**

```json
{
    "result": ["/company/lists/37/file/0/6651/PROPERTY_425/32521/?ncc=y&download=y"],
        "time": {
            "start": 1764014727,
            "finish": 1764014727.124893,
            "duration": 0.1248929500579834,
            "processing": 0,
            "date_start": "2025-11-24T17:05:27+03:00",
            "date_finish": "2025-11-24T17:05:27+03:00",
            "operating_reset_at": 1764015327,
            "operating": 0
        }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив ссылок для скачивания файлов.

Пустой массив означает, что в указанном свойстве нет файлов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ERROR_ELEMENT_NOT_FOUND` | Element not found |  Элемент с таким `ID`/`CODE` не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-element-add.md)
- [{#T}](./lists-element-update.md)
- [{#T}](./lists-element-delete.md)
- [{#T}](./lists-element-get.md)