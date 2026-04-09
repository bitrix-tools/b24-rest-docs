# Получить ревизии API imbot.v2.Revision.get

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

Метод не требует `botId` и `botToken`. Параметров нет.

## Как использовать

Типичный сценарий — проверка перед использованием метода или поля, которое появилось в определенной ревизии:

```js
const revision = await BX.rest.callMethod('imbot.v2.Revision.get', {});
const restRevision = revision.data().rest;

if (restRevision >= 33)
{
    await BX.rest.callMethod('imbot.v2.Chat.Message.send', {
        botId: 456,
        botToken: '...',
        dialogId: 'chat5',
        fields: { message: 'Hello', system: true }
    });
}
else
{
    // system может не работать корректно в более ранней ревизии
}
```

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
  BX.rest.callMethod('imbot.v2.Revision.get', {})
      .then(result => console.log(result.data()));
  ```

- PHP

  ```php
  $result = $b24Service->core->call('imbot.v2.Revision.get');
  print_r($result->getResponseData()->getResult());
  ```

- BX24.js

  ```js
  BX24.callMethod('imbot.v2.Revision.get', {}, function(result) {
      if (result.error()) {
          console.error(result.error().ex);
      } else {
          console.log(result.data());
      }
  });
  ```

- PHP CRest

  ```php
  $result = CRest::call('imbot.v2.Revision.get');
  print_r($result['result']);
  ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

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
[object](../../../data-types.md) | Номера ревизий API и клиентских протоколов [(подробное описание)](#revision-object) ||
|| **time**
[time](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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

## Обработка ошибок

Метод не возвращает ошибок вызова. Возможны только стандартные ошибки авторизации REST API.

{% include notitle [Обработка ошибок](../../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../change-log.md)
- [{#T}](./bots/bot-register.md)
