# Удалить раздел универсального списка lists.section.delete

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» для нужного списка

Метод `lists.section.delete` удаляет раздел списка.

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
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"SECTION_ID":169}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.section.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"SECTION_ID":169,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.section.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.section.delete',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 95,
                SECTION_ID: 169,
            }
        );
        
        const result = response.getData().result;
        console.log('Deleted section:', result);
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
                'lists.section.delete',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 95,
                    'SECTION_ID' => 169,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.section.delete',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 95,
            SECTION_ID: 169,
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
        'lists.section.delete',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 95,
            'SECTION_ID' => 169,
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
        "start": 1761557326,
        "finish": 1761557326.424922,
        "duration": 0.42492198944091797,
        "processing": 0,
        "date_start": "2025-10-27T12:28:46+03:00",
        "date_finish": "2025-10-27T12:28:46+03:00",
        "operating_reset_at": 1761557926,
        "operating": 0.13587212562561035
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если раздел удален успешно ||
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
|| `ERROR_DELETE_SECTION` | — | Ошибка при удалении раздела ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для удаления раздела ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-section-add.md)
- [{#T}](./lists-section-update.md)
- [{#T}](./lists-section-get.md)