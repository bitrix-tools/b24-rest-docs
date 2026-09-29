# Вернуть параметры действию или роботу bizproc.event.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `bizproc.event.send` возвращает роботу или действию выходные параметры, которые были заданы при регистрации или обновлении робота либо действия.

Вызов завершает шаг, который ждет ответа, даже если `RETURN_VALUES` не передан. Чтобы записать промежуточное сообщение в журнал и не завершать шаг, используйте метод [bizproc.activity.log](../bizproc-activity/bizproc-activity-log.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание**||
|| **EVENT_TOKEN***
[`string`](../../data-types.md) | Токен запуска робота или действия. Битрикс24 передает его на обработчик приложения в поле `event_token`.

Процесс примет результат, только если шаг с этим токеном еще ждет ответа. Ожидание включает параметр `USE_SUBSCRIPTION: 'Y'` при регистрации робота или действия. Если параметр не задали, по умолчанию шаг ответа не ждет, а включить ожидание можно в его настройках ||
|| **RETURN_VALUES**
[`object`](../../data-types.md) | Возвращаемые значения робота или действия. Ключи — коды параметров из `RETURN_PROPERTIES`, которые задали методами:
- [bizproc.robot.add](./bizproc-robot-add.md), [bizproc.robot.update](./bizproc-robot-update.md)
- [bizproc.activity.add](../bizproc-activity/bizproc-activity-add.md), [bizproc.activity.update](../bizproc-activity/bizproc-activity-update.md)

Регистр ключей не важен. Значение Битрикс24 приводит к типу `Type` этого параметра. Ключи, которых нет в `RETURN_PROPERTIES`, Битрикс24 не сохранит ||
|| **LOG_MESSAGE**
[`string`](../../data-types.md) | Текст для журнала бизнес-процесса.

Если параметр не передать, в журнал попадет стандартная запись «Получен ответ от приложения».

Запись событий в журнал должна быть включена в шаблоне бизнес-процесса
||
|#

{% note warning "" %}

Метод проверяет только подпись `EVENT_TOKEN`: с неверным токеном он вернет ошибку `ACCESS_DENIED`. Метод отвечает до того, как Битрикс24 передаст значения в процесс. Если шаг уже завершился, прервался по тайм-ауту или не ждет ответа, метод все равно вернет `true`, а процесс не изменится.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event_token":"55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90","return_values":{"outputString":"846c55d14f552180874a628d2615e285"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/bizproc.event.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event_token":"55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90","return_values":{"outputString":"846c55d14f552180874a628d2615e285"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.event.send
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.actions.v2.call.make({
    		method: 'bizproc.event.send',
    		params: {
    			event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
    			return_values: {
    				outputString: '846c55d14f552180874a628d2615e285'
    			}
    		}
    	});

    	if (!response.isSuccess)
    		console.error(response.getErrorMessages().join('; '));
    	else
    		console.log('Success:', response.getData().result);
    }
    catch (error)
    {
    	console.error('Error:', error);
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.event.send(
            event_token="55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90",
            return_values={
                "outputString": "846c55d14f552180874a628d2615e285",
            },
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.event.send',
                [
                    'event_token' => '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
                    'return_values' => [
                        'outputString' => '846c55d14f552180874a628d2615e285'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result[0], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending bizproc event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.event.send',
        {
            event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
            return_values: {
                outputString: '846c55d14f552180874a628d2615e285'
            }
        },
        function(result) {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Success: " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.event.send',
        [
            'event_token' => '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
            'return_values' => [
                'outputString' => '846c55d14f552180874a628d2615e285'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "bizproc.event.send", b24.Params{
    	"EVENT_TOKEN": "55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90",
    	"RETURN_VALUES": b24.Params{
    		"outputString": "846c55d14f552180874a628d2615e285",
    	},
    })
    if err != nil {
    	return fmt.Errorf("bizproc.event.send: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1738152544.203554,
        "finish": 1738152544.248411,
        "duration": 0.044857025146484375,
        "processing": 0.0039920806884765625,
        "date_start": "2025-01-29T15:09:04+03:00",
        "date_finish": "2025-01-29T15:09:04+03:00",
        "operating_reset_at": 1738153144,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если Битрикс24 принял запрос. Это не подтверждает, что процесс применил значения ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! | `EVENT_TOKEN` не передан или его подпись неверна ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./bizproc-robot-add.md)
- [{#T}](../bizproc-activity/index.md)
- [{#T}](../bizproc-activity/bizproc-activity-log.md)
