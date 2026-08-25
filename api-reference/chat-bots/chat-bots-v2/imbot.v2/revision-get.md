# Получить ревизии API imbot.v2.Revision.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.v2.Revision.get` возвращает номера ревизий REST API и клиентских протоколов мессенджера. Используется для проверки совместимости: какие методы и возможности поддерживает конкретный Битрикс24.

## Зачем нужен метод

Облако и коробочные версии Битрикс24 могут иметь разные ревизии API. Облачные Битрикс24 обновляются автоматически, а коробочные установки могут отставать по возможностям.

Вызывая `imbot.v2.Revision.get` перед использованием новых методов или полей, приложение может:

- определить, какие возможности доступны на текущем Битрикс24
- адаптировать логику бота под ревизию API
- корректно обрабатывать сценарии, когда нужный функционал еще не доступен у клиента

В документации по методам может встречаться пометка **«доступно с ревизии N»**. Это означает, что поле или поведение появилось только начиная с указанной ревизии.

## Параметры метода

Без параметров. Метод не требует `botId` и `botToken`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Revision.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Revision.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Revision.get', {});

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.imbot.v2.revision.get().response
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
            ->call('imbot.v2.Revision.get');

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: ' . print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Revision.get',
        {},
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('imbot.v2.Revision.get');

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'REST revision: ' . $result['result']['rest'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Revision.get", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imbot.v2.Revision.get: %w", err)
    }

    var item struct {
    	Rest    int `json:"rest"`
    	Web     int `json:"web"`
    	Mobile  int `json:"mobile"`
    	Desktop int `json:"desktop"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Rest, item.Web)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": {
    "rest": 33,
    "web": 130,
    "mobile": 23,
    "desktop": 6
  },
  "time": {
    "start": 1728626400.123,
    "finish": 1728626400.234,
    "duration": 0.111,
    "processing": 0.045,
    "date_start": "2024-10-11T10:00:00+03:00",
    "date_finish": "2024-10-11T10:00:00+03:00"
  }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Номера ревизий API и клиентских протоколов [(подробное описание)](#revision-object) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Revision {#revision-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **rest**
[`integer`](../../../data-types.md) | Ревизия серверного REST API. Основной ключ для проверки совместимости методов и полей ||
|| **web**
[`integer`](../../../data-types.md) | Ревизия протокола веб-клиента мессенджера ||
|| **mobile**
[`integer`](../../../data-types.md) | Ревизия протокола мобильного клиента ||
|| **desktop**
[`integer`](../../../data-types.md) | Ревизия протокола десктоп-приложения ||
|#

## Проверка совместимости перед вызовом

Типичный сценарий — сверить ревизию перед использованием метода или поля, которое появилось не сразу:

```js
const response = await $b24.callMethod('imbot.v2.Revision.get', {});
const restRevision = response.getData().result.rest;

if (restRevision >= 33) {
    // поле fields.system поддерживается — отправляем системное сообщение
    await $b24.callMethod('imbot.v2.Chat.Message.send', {
        botId: 456,
        dialogId: 'chat5',
        fields: { message: 'Hello', system: true }
    });
} else {
    // в более ранней ревизии поле fields.system может обрабатываться некорректно
}
```

Номер ревизии, начиная с которой доступно конкретное изменение, указан в [Журнале изменений API imbot.v2](../change-log.md).

## Обработка ошибок

Метод не возвращает ошибок вызова. Возможны только стандартные ошибки авторизации REST API.

{% include notitle [Обработка ошибок](../../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../change-log.md)
- [{#T}](./bots/bot-register.md)
