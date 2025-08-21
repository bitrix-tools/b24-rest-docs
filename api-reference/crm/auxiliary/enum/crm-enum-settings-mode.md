# Получить описание режимов работы CRM crm.enum.settings.mode

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.enum.settings.mode` возвращает список режимов работы CRM. Используйте метод для расшифровки значения `ID` типа, которое возвращает метод [crm.settings.mode.get](../../crm-settings-mode-get.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.enum.settings.mode
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.enum.settings.mode
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod("crm.enum.settings.mode");
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
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
                'crm.enum.settings.mode'
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling crm.enum.settings.mode: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod("crm.enum.settings.mode", result => {
        if (result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    });
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.enum.settings.mode',
        []
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
     "ID": 1,
     "NAME": "Классическая CRM",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    },
    {
     "ID": 2,
     "NAME": "Простая CRM",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    }
],
"time": {
    "start": 1750153429.516902,
    "finish": 1750153429.650327,
    "duration": 0.13342499732971191,
    "processing": 0.0002980232238769531,
    "date_start": "2025-06-17T12:43:49+03:00",
    "date_finish": "2025-06-17T12:43:49+03:00",
    "operating_reset_at": 1750154029,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив с режимами работы CRM [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор режима работы ||
|| **NAME**
[`string`](../../../data-types.md) | Название режима работы ||
|| **SYMBOL_CODE**
[`string`](../../../data-types.md) | Символьный код ||
|| **SYMBOL_CODE_SHORT**
[`string`](../../../data-types.md) | Краткий символьный код ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
