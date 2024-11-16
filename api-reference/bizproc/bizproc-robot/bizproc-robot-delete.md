# Удалить зарегистрированного робота bizproc.provider.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет зарегистрированного робота.

#|
|| Параметры  | Описание ||
|| **CODE** | Идентификатор робота. ||
|#

## Примеры


- B24-PHP-SDK

    ```php
        
    try {
        $robotCode = 'your_robot_code_here'; // Replace with the actual robot code
        $result = $serviceBuilder
            ->getBizProcScope()
            ->robot()
            ->delete($robotCode);
    
        if ($result->isSuccess()) {
            print("Robot deleted successfully.");
        } else {
            print("Failed to delete robot.");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    
    ```

```javascript
var params = {
    'CODE': 'robot'
};

BX24.callMethod(
    'bizproc.robot.delete',
    params,
    function(result) {
        if(result.error())
            alert('Error: ' + result.error());
        else
            alert("Успешно: " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}