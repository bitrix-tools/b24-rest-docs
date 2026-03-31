# Открыть путь в слайдере BX24.openPath

Метод `BX24.openPath` открывает указанный путь внутри Битрикс24 в слайдере.

```js
void BX24.openPath(String path[, Function callback])
```

{% note warning "" %}

По соображениям безопасности метод не работает в мобильном приложении.

{% endnote %}

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **path***
`string` | Путь внутри Битрикс24. Поддерживаются префиксы:

- `/crm/deal/` — карточки и разделы сделок CRM
- `/crm/lead/` — карточки и разделы лидов CRM
- `/crm/contact/` — карточки и разделы контактов CRM
- `/crm/company/` — карточки и разделы компаний CRM
- `/crm/type/` — смарт-процессы CRM
- `/marketplace/` — страницы Маркетплейса
- `/company/personal/user/{ID}/` — профиль пользователя
- `/workgroups/group/{ID}/` — рабочая группа или проект ||
|| **callback**
`function` | Функция обратного вызова. Вызывается при ошибке открытия пути или при закрытии слайдера ||
|#

Перед открытием SDK автоматически добавляет к пути служебные параметры:
`from=rest_placement&from_app={appId}`.

## Пример кода

```js
BX24.init(function () {
    BX24.openPath('/crm/deal/details/5/', function (result) {
        console.log(result);
    });
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Обработка ответа

Метод не возвращает данные (`void`).

Если передан `callback`, в него приходит объект результата.

### Результат callback

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`string` | Статус выполнения: `close` или `error` ||
|| **errorCode**
`string` | Код ошибки. Передается только при `result: "error"`. Возможные значения: `PATH_NOT_AVAILABLE`, `METHOD_NOT_SUPPORTED_ON_DEVICE` ||
|#

## Продолжите изучение

- [{#T}](./bx24-open-application.md)
- [{#T}](./bx24-close-application.md)
