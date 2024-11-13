# Записать информацию в лог бизнес-процесса bizproc.activity.log

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- в описании нужно дописать, что это за лог такой, где лежит и как выглядит.
- нет типов параметров и ссылки на страницу типов.
- надо как-то пояснить, что за уникальный идентификатор и нафига он нужен
- нет сноски про обязательные параметры
- не хватает примеров
- пример непонятный, лучше сделать описание и пояснить, что происходит. или добавить ссылку на туториал, где этот метод используется в реальной задаче
- нет стандартных блоков

{% endnote %}

{% endif %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод записывает информацию в лог бизнес-процесса.

## Параметры

#|
|| **Параметр**    | **Описание**  ||
|| **EVENT_TOKEN**^*^ | Уникальный ключ, который необходимо использовать при отправке события бизнес-процессу.    ||
|| **LOG_MESSAGE**^*^ | Сообщения для записи в лог. ||
|#

## Пример

- B24-PHP-SDK

    ```php
    
try {
    $eventToken = 'your_event_token'; // Replace with actual event token
    $message = 'Your log message'; // Replace with actual message

    $result = $serviceBuilder
        ->getBizProcScope()
        ->activity()
        ->log($eventToken, $message);

    if ($result->isSuccess()) {
        print($result->getCoreResponse()->getResponseData()->getResult()[0]);
    } else {
        print('Log entry failed.');
    }
} catch (Throwable $e) {
    print('Error: ' . $e->getMessage());
}

    ```
```javascript
var params = {
    event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
    log_message: 'Please wait for answer!'
};

BX24.callMethod(
    'bizproc.activity.log',
    params,
    function(result) {
        if(result.error())
            alert("Error: " + result.error());
        else
            alert("Success: " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}