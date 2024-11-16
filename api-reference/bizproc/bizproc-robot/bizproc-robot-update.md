# Обновить поля робота bizproc.robot.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет поля робота. В массив **FIELDS** передаются те же параметры, которые используются в [bizproc.robot.add](./bizproc-robot-add.md).

## Примеры


- B24-PHP-SDK

    ```php
        
    try {
        $result = $serviceBuilder
            ->getBizProcScope()
            ->robot()
            ->update(
                'robot_code',
                'https://example.com/handler',
                1,
                ['en' => 'Localized Name'],
                true,
                ['property1' => 'value1'],
                false,
                ['returnProperty1']
            );
    
        // Process the result
        if ($result->isSuccess()) {
            print_r($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print("Update failed.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    
    ```

```js
function updateRobot1()
{
    var params = {
        'CODE': 'hash',
        'FIELDS': {
            'DOCUMENT_TYPE': '',
            'FILTER': ''
        },
    };
    BX24.callMethod(
        'bizproc.robot.update',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
}
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
