# Изменить внешнюю линию telephony.externalLine.update

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalLine.update` изменяет параметры внешней линии приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NUMBER***
[`string`](../data-types.md) | Номер внешней линии.

Номер можно получить методом [telephony.externalLine.get](./telephony-external-line-get.md) ||
|| **NAME**
[`string`](../data-types.md) | Новое название внешней линии ||
|| **CRM_AUTO_CREATE**
[`string`](../data-types.md) | Автосоздание объекта CRM при исходящих звонках.

Возможные значения:

 `Y` — включено
 `N` — выключено ||
|#

{% note info "" %}

Нужно передать хотя бы одно поле для изменения: `NAME` или `CRM_AUTO_CREATE`. Иначе получите ошибку `ERROR_CORE`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NUMBER":"74951234567","NAME":"Линия поддержки","CRM_AUTO_CREATE":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalLine.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.externalLine.update',
            {
                NUMBER: '74951234567',
                NAME: 'Линия поддержки',
                CRM_AUTO_CREATE: 'N'
            }
        );
        
        const result = response.getData().result;
        console.log('Updated external line with ID:', result);
        
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
                'telephony.externalLine.update',
                [
                    'NUMBER' => '74951234567',
                    'NAME' => 'Линия поддержки',
                    'CRM_AUTO_CREATE' => 'N'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating external line: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalLine.update",
        {
            NUMBER: '74951234567',
            NAME: 'Линия поддержки',
            CRM_AUTO_CREATE: 'N'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.externalLine.update',
        [
            'NUMBER' => '74951234567',
            'NAME' => 'Линия поддержки',
            'CRM_AUTO_CREATE' => 'N'
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
        "ID": "7"
    },
    "time": {
        "start": 1772806119,
        "finish": 1772806120.006578,
        "duration": 1.006577968597412,
        "processing": 1,
        "date_start": "2026-03-06T17:08:39+03:00",
        "date_finish": "2026-03-06T17:08:40+03:00",
        "operating_reset_at": 1772806719,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор обновленной внешней линии ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван вне контекста приложения ||
|| `ERROR_CORE` | There are no fields to update | Не переданы поля для изменения `NAME` или `CRM_AUTO_CREATE` ||
|| `ERROR_CORE` | NUMBER should not be empty | Не передан обязательный параметр `NUMBER` ||
|| `ERROR_CORE` | Could not find line with number {NUMBER} | Линия с указанным номером не найдена ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-line-add.md)
- [{#T}](./telephony-external-line-get.md)
- [{#T}](./telephony-external-line-delete.md)
- [{#T}](./telephony-external-call-register.md)
