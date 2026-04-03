# Запустить звонок на телефонный номер Messenger.startPhoneCall

Метод `Messenger.startPhoneCall` запускает звонок на телефонный номер в Битрикс24. Метод рекомендуется использовать вместо `BX24.im.phoneTo`.

```js
Promise Messenger.startPhoneCall(String number[, Object params])
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **number***
`string` | Телефонный номер для звонка ||
|| **params**
`object` | Дополнительные параметры звонка. Объект параметров передается дальше в phone manager ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX.Messenger.Public.startPhoneCall('88000000000');
```

## Обработка ответа

Метод возвращает `Promise`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`Promise` | Promise выполнения операции запуска звонка ||
|#

## Продолжите изучение

- [{#T}](./messenger-start-video-call.md)
- [{#T}](./outdated/bx24-im-phone-to.md)
