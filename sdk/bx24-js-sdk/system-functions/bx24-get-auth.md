# Получить данные для OAuth 2.0 BX24.getAuth

```js
BX24.getAuth(): boolean|object;
```

Функция `BX24.getAuth` получает текущие данные для авторизации через протокол OAuth 2.0. Возвращается объект вида:

```json
{
    access_token: "cd4b8566006efd82005fdecc000000007dccbb3dcc7411d1e5878338535115c7e"
    domain: "b24.yurta.bx"
    expires_in: 1720011727002
    member_id: "42bc01fbd89dd1d45d13506933f6f4fc"
    refresh_token: "bdc"
}
```

Дата истечения передается в виде объекта `date`.

Работает только после [BX24.init](./bx24-init.md). В случае вызова до инициализации приложения или после истечения кода вернет `false`. При истечении кода новый автоматически генерируется при следующем вызове **BX24.callMethod** или **BX24.refreshAuth**.

Без параметров.

## Пример

```js
document.addEventListener("DOMContentLoaded", function() {
    BX24.init(() => {
        const authInfo = BX24.getAuth();
        console.log('B24: authInfo: ', authInfo);	
    });
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-init.md)
- [{#T}](./bx24-install.md)
- [{#T}](./bx24-install-finish.md)
- [{#T}](./bx24-refresh-auth.md)