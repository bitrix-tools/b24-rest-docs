# Обновить поля действия bizproc.activity.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы.
  
{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод позволяет обновить поля уже добавленного действия для бизнес-процессов. Параметры метода аналогичны [bizproc.activity.add](./bizproc-activity-add.md).

## Пример


- B24-PHP-SDK

    ```php
        
    try {
        $result = $serviceBuilder
            ->getBizProcScope()
            ->activity()
            ->update(
                'activity_code',
                'https://example.com/handler',
                1,
                ['en' => 'Activity Name', 'ru' => 'Название Активности'],
                ['en' => 'Activity Description', 'ru' => 'Описание Активности'],
                true,
                ['param1' => 'value1'],
                false,
                ['returnParam1' => 'value1'],
                null,
                null
            );
    
        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print('Update failed.');
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    
    ```

```javascript
function updateActivity1()
{
    var params = {
        'CODE': 'hash',
        'FIELDS': {
            'DOCUMENT_TYPE': '',
            'FILTER': ''
        },
    };

    BX24.callMethod(
        'bizproc.activity.update',
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