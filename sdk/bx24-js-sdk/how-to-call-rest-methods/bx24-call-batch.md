# Отправить пакет запросов BX24.callBatch

В некоторых случаях возникает необходимость отправить несколько запросов подряд. Например, при создании необходимых сущностей в процессе инсталляции приложения. Для оптимизации процесса можно использовать пакетное выполнение запросов.

```js
void BX24.callBatch(
    Object|Array calls,
    [Function callback[,
    Boolean bHaltOnError = false]]
);
```

Функция `BX24.callBatch` отправляет пакет запросов к REST-сервису. В случае вызова до [BX24.init](../system-functions/bx24-init.md) выполнение запроса будет отложено.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **calls***
[`object`](../../../api-reference/data-types.md)\|[`array`](../../../api-reference/data-types.md) | Обычный или ассоциативный массив (объект) с запросами. Каждый запрос представляет собой либо массив `[имя_метода, параметры_метода]`, либо объект `{method: имя_метода, params: параметры_метода}`. 

В параметрах методов можно использовать макросы, позволяющие получить доступ к результатам предыдущих запросов текущего пакета. Макрос можно составить примерно так: `$result[идентификатор_запроса][поле_ответа]`, где идентификатором запроса служит его ключ в массиве пакета запросов ||
|| **callback**
[`function`](../../../api-reference/data-types.md) | Функция-обработчик результата пакетного запроса. На вход получит массив или ассоциативный массив (объект) объектов [ajaxResult](./bx24-call-method.md#ajax-result) с ключами, соответствующими ключам из пакета запросов ||
|| **bHaltOnError**
[`boolean`](../../../api-reference/data-types.md) | Флаг «прерывать исполнение пакета в при возникновении ошибки». По умолчанию — `false` (не прерывать) ||
|#

## Пример

```js
BX24.init(() => {
    const prepareMessage = (name, lastName, departmentNumber) => {
        return `The current user ${name} ${lastName} is assigned to the departmen${departmentNumber > 1 ? 'ts ' : 't '}`;
    };
    BX24.callBatch({
        get_user: ['user.current', {}],
        get_department: {
            method: 'department.get',
            params: {
                ID: '$result[get_user][UF_DEPARTMENT]',
            },
        },
    }, (result) => {
        if (result.get_user.error() || result.get_department.error())
        {
            if (result.get_user.error())
            {
                console.error(result.get_user.error());
            }

            if (result.get_department.error())
            {
                console.error(result.get_department.error());
            }
        }
        else
        {
            const departmentNumber = result.get_department.data().length;
            let message = prepareMessage(result.get_user.data().NAME, result.get_user.data().LAST_NAME, departmentNumber);

            for (let i = 0; i < departmentNumber; i++)
            {
                message += i === 0 ? '' : ', ';
                message += result.get_department.data()[i].NAME;
            }

            alert(message);
        }
    }, true);
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-call-bind.md)
- [{#T}](./bx24-call-unbind.md)
- [{#T}](./bx24-call-method.md)