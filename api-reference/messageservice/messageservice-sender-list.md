# Получить список СМС-провайдеров или провайдеров сообщений messageservice.sender.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны параметры, типы и обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- Нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список зарегистрированных текущим приложением (или тем же входящим вебхуком) провайдеров сообщений.

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'messageservice.sender.list',
        {},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
      const generator = $b24.fetchListMethod('messageservice.sender.list', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('messageservice.sender.list', {}, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'messageservice.sender.list',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Успешно: ' . implode(', ', $result->data());
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling messageservice.sender.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'messageservice.sender.list',
        {},
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data().join(', '));
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}