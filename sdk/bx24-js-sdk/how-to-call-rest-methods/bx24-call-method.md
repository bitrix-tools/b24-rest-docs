# Вызвать метод Битрикс24 BX24.callMethod

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

```js
void BX24.callMethod(
    String method,
    Object params[,
        Function callback
    ]
);
```

Функция `BX24.callMethod` вызывает метод Битрикс24 от имени пользователя, который открыл приложение. Библиотека сама добавляет в запрос данные авторизации и превращает объект **params** в строку POST-запроса.

Значениями в **params** могут быть строки, числа, массивы, вложенные объекты и даты. Дату библиотека передает строкой в формате ISO 8601. Вместо значения можно передать элемент поля формы: у обычного поля библиотека возьмет значение, у поля `<input type="file">` — выбранный файл.

Функция ничего не возвращает: результат приходит в функцию `callback`. Если вызвать `BX24.callMethod` до [BX24.init](../system-functions/bx24-init.md), библиотека отложит запрос до завершения инициализации.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **method***
[`string`](../../../api-reference/data-types.md) | Название метода Битрикс24, например [user.get](../../../api-reference/user/user-get.md) ||
|| **params***
[`object`](../../../api-reference/data-types.md) | Параметры вызываемого метода. Их состав описан на странице этого метода. Если параметров нет, передайте пустой объект `{}`: функция `callback` должна стоять третьим аргументом ||
|| **callback**
[`function`](../../../api-reference/data-types.md) | Функция, которая получит результат запроса — объект [ajaxResult](#ajax-result). Без нее запрос выполнится, но результат узнать не получится ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить пользователя с идентификатором `10`. Для метода [user.get](../../../api-reference/user/user-get.md) приложению нужен один из scope: `user`, `user_brief` или `user_basic`:

```js
BX24.init(() => {
    BX24.callMethod('user.get', { ID: 10 }, (result) => {
        if (result.error())
        {
            console.error(result.error());
        }
        else if (result.data())
        {
            const user = result.data()[0];
            if (user)
            {
                alert('Пользователя №' + user.ID + ' зовут ' + user.NAME);
            }
        }
    });
});
```

Получить всех пользователей постранично. Метод [user.get](../../../api-reference/user/user-get.md) возвращает до 50 записей за вызов. Пока `result.more()` возвращает `true`, функция `result.next()` запрашивает следующую страницу и передает ее в тот же обработчик. Передать `start` в `params` не получится: библиотека удаляет этот параметр из запроса.

```js
BX24.init(() => {
    BX24.callMethod('user.get', { sort: 'ID', order: 'ASC' }, (result) => {
        if (result.error())
        {
            console.error(result.error().toString());
            return;
        }

        console.log(result.data());
        if (result.more())
        {
            result.next();
        }
    });
});
```

Загрузить фото сотрудника из поля формы методом [user.update](../../../api-reference/user/user-update.md). Библиотека прочитает выбранный файл и передаст его в параметре `PERSONAL_PHOTO`. Методу нужен scope `user`, а изменить профиль другого сотрудника может только администратор:

```js
// <input type="file" id="photo"> — поле на странице приложения
BX24.init(() => {
    BX24.callMethod('user.update', {
        ID: 10,
        PERSONAL_PHOTO: document.getElementById('photo'),
    }, (result) => {
        if (result.error())
        {
            console.error(result.error().toString());
            return;
        }

        console.log(result.data()); // true
    });
});
```

## Обработка ответа {#ajax-result}

Функция `callback` получает объект `ajaxResult`. Исходный ответ Битрикс24 хранится в его свойстве `answer`, например для метода [user.get](../../../api-reference/user/user-get.md):

```json
{
    "result": [
        {
            "ID": "10",
            "ACTIVE": true,
            "NAME": "Иван",
            "LAST_NAME": "Петров",
            "UF_DEPARTMENT": [1]
        }
    ],
    "total": 1,
    "time": {
        "start": 1790283114,
        "finish": 1790283114.0253,
        "duration": 0.0253,
        "processing": 0,
        "date_start": "2026-09-24T20:51:54+00:00",
        "date_finish": "2026-09-24T20:51:54+00:00"
    }
}
```

Читать ответ удобнее методами объекта.

### Методы объекта ajaxResult

#|
|| **Метод** | **Что возвращает** ||
|| `data()` | Поле `result` ответа: массив, объект или скалярное значение — зависит от вызванного метода. Если произошла ошибка, возвращает `undefined` ||
|| `error()` | Объект ошибки или `undefined`, если ошибки нет. Как устроен объект ошибки, описано в разделе [Обработка ошибок](#errors) ||
|| `error_description()` | Текст ошибки или `undefined`, если ошибки нет ||
|| `more()` | `true`, если у списка есть следующая страница ||
|| `total()` | Общее число записей списка. Если метод его не вернул, `total()` возвращает `NaN` ||
|| `next(cb)` | Запрашивает следующую страницу списка и передает ее в функцию `cb`, а без нее — в прежний обработчик. Если страниц больше нет, возвращает `false` ||
|#

Кроме методов, у объекта есть свойства: `answer` — исходный ответ Битрикс24, `status` — HTTP-статус ответа, `query` — копия настроек запроса с именем метода, параметрами и `callback`. Время выполнения запроса отдельным методом не возвращается: оно лежит в `result.answer.time`, его поля описаны в разделе [Объект time](../../../api-reference/data-types.md#time).

## Обработка ошибок {#errors}

Ошибку, которую вернул Битрикс24, библиотека передает в `callback`. Метод `result.error()` возвращает объект:

```json
{
    "status": 401,
    "ex": {
        "error": "insufficient_scope",
        "error_description": "The request requires higher privileges than provided by the access token"
    }
}
```

Код ошибки доступен как `result.error().ex.error`, текст — как `result.error().ex.error_description`. Объект `ex` целиком возвращает метод `getError()`, HTTP-статус — свойство `result.error().status` и метод `getStatus()`, а готовую строку с кодом, текстом и статусом — метод `toString()`.

Коды ошибок зависят от вызванного метода и описаны на его странице.

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

В `callback` не попадают:

- ответ со статусом `5xx`, сетевой сбой и ответ, который не удалось разобрать как JSON. Библиотека выбрасывает исключение `Query error!` из асинхронного обработчика запроса, поэтому `try/catch` вокруг вызова его не перехватит
- ошибка `expired_token`. Библиотека сама обновляет авторизацию и повторяет запрос, а `callback` получает результат повтора

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./bx24-call-batch.md)
- [{#T}](./bx24-call-bind.md)
- [{#T}](./bx24-call-unbind.md)