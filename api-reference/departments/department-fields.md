# Получить список названий полей подразделения department.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `department.fields` возвращает названия полей подразделения.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/department.fields
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/department.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"department.fields", {}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.department.fields().response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'department.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "department.fields", {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('department.fields');

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "department.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("department.fields: %w", err)
    }

    var item struct {
    	ID     string `json:"ID"`
    	Name   string `json:"NAME"`
    	Sort   string `json:"SORT"`
    	Parent string `json:"PARENT"`
    	UFHead string `json:"UF_HEAD"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "ID",
        "NAME": "Название подразделения",
        "SORT": "Порядок сортировки",
        "PARENT": "Вышестоящее подразделение",
        "UF_HEAD": "Руководитель"
    },
    "time": {
        "start": 1736926600.426408,
        "finish": 1736926600.667272,
        "duration": 0.24086403846740723,
        "processing": 0.0050868988037109375,
        "date_start": "2025-01-15T07:36:40+00:00",
        "date_finish": "2025-01-15T07:36:40+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Ключи — коды полей подразделения, значения — их названия ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

### Поля объекта result

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Название поля идентификатора подразделения. Значение — `ID` ||
|| **NAME**
[`string`](../data-types.md) | Название поля наименования подразделения ||
|| **SORT**
[`string`](../data-types.md) | Название поля порядка сортировки подразделения ||
|| **PARENT**
[`string`](../data-types.md) | Название поля вышестоящего подразделения ||
|| **UF_HEAD**
[`string`](../data-types.md) \| [`null`](../data-types.md) | Название поля руководителя подразделения из настроек пользовательского поля. Если поле не настроено, значение может быть `null` ||
|#

Названия полей `NAME`, `SORT`, `PARENT` локализуются. Название `UF_HEAD` берется из настройки пользовательского поля для текущего языка и может отличаться от примера ответа.

## Обработка ошибок

HTTP-статус: **401**

```json
{
    "error": "insufficient_scope",
    "error_description": "The request requires higher privileges than provided by the webhook token"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

У метода нет собственных кодов ошибок. Если вебхуку или приложению не выдан скоуп `department`, REST API вернет `insufficient_scope`. В примере показан ответ для вебхука. В ответе для приложения `error_description` заканчивается на `provided by the access token`. Другие системные ошибки перечислены ниже.

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./department-add.md)
- [{#T}](./department-update.md)
- [{#T}](./department-get.md)
- [{#T}](./department-delete.md)
