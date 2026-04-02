# Запустить видеозвонок Messenger.startVideoCall

Метод `Messenger.startVideoCall` запускает видеозвонок в Битрикс24. Метод рекомендуется использовать вместо `BX24.im.callTo`.

```js
Promise Messenger.startVideoCall([String dialogId[, Boolean withVideo]])
```

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId**
`string` | Идентификатор диалога или чата. По умолчанию используется пустая строка `''`. Пустое или невалидное значение не проходит проверку, вызов завершается без запуска звонка ||
|| **withVideo**
`boolean` | Тип звонка: `true` - видеозвонок, `false` - аудиозвонок ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX.Messenger.Public.startVideoCall('chat123', true);
```

## Обработка ответа

Метод возвращает `Promise`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`Promise` | Promise выполнения операции запуска видеозвонка ||
|#

## Продолжите изучение

- [{#T}](./messenger-start-phone-call.md)
- [{#T}](./outdated/bx24-im-call-to.md)
