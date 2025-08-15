# Получить список привязок типов цен к группам покупателей catalog.priceTypeGroup.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.priceTypeGroup.list(select, filter, order, start)
```

Метод получает список привязок типов цен к группам покупателей.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-group-get-fields.md).||
|| **filter** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-group-get-fields.md). ||
|| **order**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-group-get-fields.md). ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.priceTypeGroup.list',
        {
          select: ['catalogGroupId'],
          filter: {
            groupId: 8
          }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('catalog.priceTypeGroup.list', {
        select: ['catalogGroupId'],
        filter: {
          groupId: 8
        }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('catalog.priceTypeGroup.list', {
        select: ['catalogGroupId'],
        filter: {
          groupId: 8
        }
      }, 0)
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
                'catalog.priceTypeGroup.list',
                [
                    'select' => ['catalogGroupId'],
                    'filter' => [
                        'groupId' => 8
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing price type groups: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeGroup.list',
        {
            select: ['catalogGroupId'],
            filter: {
                groupId: 8
            },
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

{% endlist %}

Пример HTTPS запроса

```
https://ваш_портал/rest/catalog.priceTypeGroup.list?auth=_ключ_авторизации_&start=50
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}
