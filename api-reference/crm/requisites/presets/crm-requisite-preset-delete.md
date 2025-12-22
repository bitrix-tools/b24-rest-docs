# Удалить шаблон реквизита crm.requisite.preset.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет шаблон реквизитов по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизита. Можно получить с помощью метода [`crm.requisite.preset.list`](./crm-requisite-preset-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Поиск шаблонов по привязке к стране:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":347}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.preset.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":347,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.delete",
    		{
    			id: 347    // Идентификатор удаляемого шаблона
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
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
                'crm.requisite.preset.delete',
                [
                    'id' => 347,    // Идентификатор удаляемого шаблона
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting preset: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.delete",
        {
            id: 347    // Идентификатор удаляемого шаблона
        },
        function(result)
        {
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
        'crm.requisite.preset.delete',
        [
            'id' => 347
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
        "start": 1716554949.294631,
        "finish": 1716554949.795059,
        "duration": 0.5004279613494873,
        "processing": 0.057311058044433594,
        "date_start": "2024-05-24T14:49:09+02:00",
        "date_finish": "2024-05-24T14:49:09+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления шаблона:
- `true` — шаблон удален
- `false` — шаблон не удален 
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The Preset with ID '347' is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The Preset with ID '347' is not found` | Шаблон с указанным идентификатором не найден ||
|| `Вы не можете удалить шаблон, так как по нему уже созданы реквизиты` | Нельзя удалить шаблон, по которому созданы рекизиты. Чтобы удалить шаблон, сначала удалите реквизиты ||
|| `Access denied` | Недостаточно прав доступа для удаления шаблона ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-add.md)
- [{#T}](./crm-requisite-preset-update.md)
- [{#T}](./crm-requisite-preset-countries.md)
- [{#T}](./crm-requisite-preset-get.md)
- [{#T}](./crm-requisite-preset-list.md)
- [{#T}](./crm-requisite-preset-fields.md)
