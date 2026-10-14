# Получить список зарегистрированных приложением роботов bizproc.robot.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `bizproc.robot.list` возвращает список роботов, зарегистрированных приложением.

Работает только в контексте [приложения](../../../settings/app-installation/index.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.robot.list
    ```

- JS


    ```js
    try {
      const response = await $b24.actions.v2.call.make({ method: 'bizproc.robot.list', params: {} })
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        for (const code of response.getData().result) { console.log('Robot code:', code) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.robot.list().response
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
        $result = $serviceBuilder
            ->getBizProcScope()
            ->robot()
            ->list();

        foreach ($result->getRobots() as $code) {
            print($code . PHP_EOL);
        }
    } catch (Throwable $e) {
        // Handle the exception
        print('Error: ' . $e->getMessage());
    }
	```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.robot.list',
        {},
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data().join(', '));
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.robot.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "bizproc.robot.list", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("bizproc.robot.list: %w", err)
    }

    var items []string
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("получено:", len(items))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        "test_robot",
        "sms_robot"
    ],
    "time": {
        "start": 1738151724.710429,
        "finish": 1738151724.7319269,
        "duration": 0.021497964859008789,
        "processing": 0.0011229515075683594,
        "date_start": "2025-01-29T14:55:24+03:00",
        "date_finish": "2025-01-29T14:55:24+03:00",
        "operating_reset_at": 1738152324,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Коды `CODE` роботов, которые зарегистрировало это приложение. Если роботов нет, приходит пустой массив `[]` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! Application context required | Метод вызван не из приложения, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал не администратор ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./bizproc-robot-add.md)
- [{#T}](./bizproc-robot-update.md)
- [{#T}](./bizproc-robot-delete.md)
- [{#T}](./bizproc-event-send.md)
