# Обновить принудительно ключ авторизации BX24.refreshAuth

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

```js
BX24.refreshAuth(someCallback: function): object
```

Функция `BX24.refreshAuth` обновляет ключ авторизации принудительно. Функция-обработчик `someCallback` получит на вход объект, аналогичный [BX24.getAuth()](./bx24-get-auth.md). Работает только после [BX24.init](./bx24-init.md).

## Параметры функции

#|
|| **Название**
`тип` | **Описание** ||
|| **someCallback**
[`function`](../../../api-reference/data-types.md) | Принимает на вход функцию, которую в случае успеха выполняет ||
|#


## Пример

```js
BX24.init(() => {
    const authInfo = BX24.getAuth();
    console.log('BX24: current authInfo: ', authInfo);

    const button = document.createElement('button');
    button.textContent = 'Refresh auth';
    button.addEventListener('click', () => {
        BX24.refreshAuth((refreshedAuthInfo) => {
            console.log('BX24: refreshed authInfo: ', refreshedAuthInfo);
        })
    });
    document.body.appendChild(button);
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-init.md)
- [{#T}](./bx24-install.md)
- [{#T}](./bx24-install-finish.md)
- [{#T}](./bx24-get-auth.md)