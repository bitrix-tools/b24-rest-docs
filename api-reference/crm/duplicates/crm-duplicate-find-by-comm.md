# Получить лиды, контакты и компании с совпадающими данными crm.duplicate.findbycomm

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: пользователь с правом на чтение элементов CRM

Метод `crm.duplicate.findbycomm` возвращает идентификаторы лидов, контактов и компаний, содержащих телефоны или email-адреса из заданного списка. Поиск не учитывает добавочный номер телефона.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../data-types.md) | Тип коммуникации. Возможные значения:
- `EMAIL` — email-адрес
- `PHONE` — телефон ||
|| **values***
[`string[]`](../../data-types.md) | Массив email или телефонов.  

Максимальное количество значений — 20 ||
|| **entity_type**
[`string`](../../data-types.md) | Тип объекта. Возможные значения:
- `LEAD` — лид
- `CONTACT` — контакт
- `COMPANY` — компания

Если не задан — поиск выполняется по всем трем типам ||
|#

### Особенности работы метода

Если по одному объекту найдено 20 и более дублей, остальные типы не возвращаются. Например, если не указан `entity_type` и ожидаем дубли по всем трем объектам, но у нас в лидах 20 или более дублей, контакт и компания возвращены не будут. Если в контактах будет 20 или более дублей, мы получим дубли по лидам и контактам, а компания будет отсутствовать в выборке.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"entity_type":"CONTACT","type":"PHONE","values":["8976543","11223355"]}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.duplicate.findbycomm
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**","entity_type":"CONTACT","type":"PHONE","values":["8976543","11223355"]}' \
         https://**put_your_bitrix24_address**/rest/crm.duplicate.findbycomm
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.duplicate.findbycomm',
    		{
    			entity_type: 'CONTACT',
    			type: 'PHONE',
    			values: ['8976543', '11223355']
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error()) {
    		console.error(result.error());
    	} else {
    		console.dir(result);
    	}
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
                'crm.duplicate.findbycomm',
                [
                    'entity_type' => 'CONTACT',
                    'type'        => 'PHONE',
                    'values'      => ['8976543', '11223355'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Duplicate data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error finding duplicates by communication: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.duplicate.findbycomm(
            entity_type="CONTACT",
            type="PHONE",
            values=["8976543", "11223355"],
        ).response
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

- BX24.js

    ```js
    BX24.callMethod(
        "crm.duplicate.findbycomm",
        {
            entity_type: "CONTACT",
            type: "PHONE",
            values: ["8976543", "11223355"]
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.duplicate.findbycomm',
        [
            'entity_type' => 'CONTACT',
            'type' => 'PHONE',
            'values' => ['8976543', '11223355']
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
        "CONTACT": [275, 2297]
    },
    "time": {
        "start": 1750684060.672785,
        "finish": 1750684060.724903,
        "duration": 0.05211806297302246,
        "processing": 0.018191099166870117,
        "date_start": "2025-06-23T16:07:40+03:00",
        "date_finish": "2025-06-23T16:07:40+03:00",
        "operating_reset_at": 1750684660,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **LEAD**
[`integer[]`](../../data-types.md) | Массив идентификаторов найденных лидов ||
|| **CONTACT**
[`integer[]`](../../data-types.md) | Массив идентификаторов найденных контактов ||
|| **COMPANY**
[`integer[]`](../../data-types.md) | Массив идентификаторов найденных компаний ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Communication type is not defined",
    "error_description": "Parameter 'type' is required."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `403` | `Access denied` | У пользователя нет прав на чтение элементов CRM ||
|| `400` | `Communication type is not defined` | Не указан обязательный параметр `type` ||
|| `400` | `Communication type '{type}' is not supported in current context` | Указан неподдерживаемый тип коммуникации ||
|| `400` | `Communication values is not defined` | Не указан обязательный параметр `values` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-entity-merge-batch.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)