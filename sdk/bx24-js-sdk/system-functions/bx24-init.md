# Инициализировать библиотеку BX24.init

```js
BX24.init(someCallback: function): void;
```

Метод выполняет функцию `someCallback` в контексте страницы приложения после того, как данные о портале были получены. Все функции, контактирующие с целевым порталом, имеет смысл выполнять после инициализации. 

Функция `BX24.init` добавляет в список обработчик события «библиотека готова к работе». При инициализации приложения библиотека запрашивает данные для работы у родительского фрейма. Некоторые действия могут быть совершены только после получения этих данных (например, работа с настройками приложения, с правами текущего пользователя, отправка запросов к REST и т.д.).

## Параметры функции

#|
|| **Название**
`тип` | **Описание** ||
|| **someCallback**
[`function`](../../../api-reference/data-types.md) | Принимает на вход функцию, которую в случае успеха выполняет ||
|#

## Пример

```js
document.addEventListener("DOMContentLoaded", function() {
    BX24.init(function() {
        console.log("BX24 initialized successfully.");

        // Make an API call to fetch current user information
        BX24.callMethod(
            'user.current',
            {},
            function(result) {
                if(result.error()) {
                    console.error("Error fetching user data: ", result.error());
                } else {
                    console.log("User data: ", result.data());
                }
            }
        );
    });
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-install.md)
- [{#T}](./bx24-install-finish.md)
- [{#T}](./bx24-get-auth.md)
- [{#T}](./bx24-refresh-auth.md)