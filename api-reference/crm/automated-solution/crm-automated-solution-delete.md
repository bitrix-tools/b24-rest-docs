# Удалить цифровое рабочее место crm.automatedsolution.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Метод удаляет существующее цифровое рабочее место с идентификатором `id`.

Удаление цифрового рабочего места возможно, только если к нему нет ни одного привязанного смарт-процесса.

Если есть смарт-процессы, необходимо сначала их отвязать или перепривязать к другому рабочему месту, а уже потом удалять это цифровое рабочее место.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор цифрового рабочего места. Может быть получен из ответа метода [crm.automatedsolution.add](./crm-automated-solution-add.md) (`result.automatedSolution.id`), который был вызван при добавлении цифрового рабочего места, или [crm.automatedsolution.list](./crm-automated-solution-list.md). Так же можно воспользоваться разделом «Цифровые рабочие места» на портале Битрикс24 — колонка `ID` в списке цифровых рабочих мест ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automatedsolution.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.automatedsolution.delete',
    		{
    			"id": 5
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'crm.automatedsolution.delete',
                [
                    'id' => 5,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting automated solution: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.automatedsolution.delete",
        {
            "id": 5
        },
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

    $result = CRest::call(
        'crm.automatedsolution.delete',
        [
            'id' => 5
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.automatedsolution.delete(
            bitrix_id=5,
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": null,
    "time": {
        "start": 1715852365.744733,
        "finish": 1715852366.078274,
        "duration": 0.3335409164428711,
        "processing": 0.01611018180847168,
        "date_start": "2024-05-16T12:39:25+03:00",
        "date_finish": "2024-05-16T12:39:26+03:00",
        "operating_reset_at": 1715852966,
        "operating": 0
    }
}
```

## Обработка ошибок

HTTP-статус: **400**

```json
{	
    "error":"HAS_BOUND_TYPES",
    "error_description":"Не можем удалить рабочее место, в котором есть смарт-процессы. Перенесите их в другое рабочее место"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `HAS_BOUND_TYPES` | Цифровое рабочее место имеет привязанные к нему смарт-процессы. Перед удалением необходимо сначала отвязать смарт-процессы ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-add.md)
- [{#T}](./crm-automated-solution-update.md)
- [{#T}](./crm-automated-solution-get.md)
- [{#T}](./crm-automated-solution-list.md)
- [{#T}](./crm-automated-solution-fields.md)