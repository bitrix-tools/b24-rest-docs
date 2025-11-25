# Изменить раздел универсального списка lists.section.update

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» или «Изменение с ограничениями» для нужного списка

Метод `lists.section.update` обновляет раздел списка.

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
|| **SECTION_ID***
[`integer`](../../data-types.md) | Идентификатор раздела.

Идентификатор можно получить с помощью метода [lists.section.get](./lists-section-get.md) ||
|| **SECTION_CODE***
[`string`](../../data-types.md) | Cимвольный код раздела.

Код можно получить с помощью метода [lists.section.get](./lists-section-get.md) 

{% note info "" %}

Необходимо указать хотя бы один из параметров: `SECTION_ID` или `SECTION_CODE` 

{% endnote %} ||
|| **FIELDS***
[`array`](../../data-types.md) | Массив полей.

[Подробное описание](#parametr-fields) ||
|# 

### Параметр FIELDS {#parametr-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название раздела ||
|| **EXTERNAL_ID**
[`string`](../../data-types.md) | Внешний идентификатор раздела ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор (XML ID) ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **ACTIVE**
[`string`](../../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **PICTURE**
[`array`](../../data-types.md) | Устаревший.

Картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: 'Y'}` ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Устаревший.

Описание ||
|| **DESCRIPTION_TYPE**
[`string`](../../data-types.md) | Устаревший.

Тип описания. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию устанавливается `text` ||
|| **DETAIL_PICTURE**
[`array`](../../data-types.md) | Устаревший.

Детальная картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: 'Y'}` ||
|| **SECTION_PROPERTY**
[`array`](../../data-types.md) | Устаревший.

Пользовательские свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"SECTION_ID":169,"FIELDS":{"NAME":"Обновленные документы маркетинга","EXTERNAL_ID":"ext_marketing_docs_002","XML_ID":"xml_marketing_docs_002","SORT":600,"ACTIVE":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.section.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"SECTION_ID":169,"FIELDS":{"NAME":"Обновленные документы маркетинга","EXTERNAL_ID":"ext_marketing_docs_002","XML_ID":"xml_marketing_docs_002","SORT":600,"ACTIVE":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.section.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.section.update',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 95,
                SECTION_ID: 169,
                FIELDS: {
                    NAME: 'Обновленные документы маркетинга',
                    EXTERNAL_ID: 'ext_marketing_docs_002',
                    XML_ID: 'xml_marketing_docs_002',
                    SORT: 600,
                    ACTIVE: 'Y',
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Updated section with ID:', result);
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
                'lists.section.update',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 95,
                    'SECTION_ID' => 169,
                    'FIELDS' => [
                        'NAME' => 'Обновленные документы маркетинга',
                        'EXTERNAL_ID' => 'ext_marketing_docs_002',
                        'XML_ID' => 'xml_marketing_docs_002',
                        'SORT' => 600,
                        'ACTIVE' => 'Y',
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
        echo 'Error updating section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.section.update',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 95,
            SECTION_ID: 169,                       

            FIELDS: {
                NAME: 'Обновленные документы маркетинга',  
                EXTERNAL_ID: 'ext_marketing_docs_002',
                XML_ID: 'xml_marketing_docs_002',
                SORT: 600,
                ACTIVE: 'Y',
            }
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
        'lists.section.update',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 95,
            'SECTION_ID' => 169,
            'FIELDS' => [
                'NAME' => 'Обновленные документы маркетинга',
                'EXTERNAL_ID' => 'ext_marketing_docs_002',
                'XML_ID' => 'xml_marketing_docs_002',
                'SORT' => 600,
                'ACTIVE' => 'Y',
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
    "result": true,
    "time": {
        "start": 1761555629,
        "finish": 1761555630.010893,
        "duration": 1.0108931064605713,
        "processing": 1,
        "date_start": "2025-10-27T12:00:29+03:00",
        "date_finish": "2025-10-27T12:00:30+03:00",
        "operating_reset_at": 1761556229,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если раздел обновлен успешно ||
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
|| `ERROR_SECTION_NOT_FOUND`| Section not found | Раздел с указанным `SECTION_ID` или `SECTION_CODE` не найден ||
|| `ERROR_UPDATE_SECTION` | — | Ошибка при обновлении раздела ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для обновления раздела ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-section-add.md)
- [{#T}](./lists-section-get.md)
- [{#T}](./lists-section-delete.md)