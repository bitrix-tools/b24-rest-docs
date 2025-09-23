# Получить список значений пользовательских полей документов складского учета catalog.userfield.document.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- добавить ссылку на `userfieldconfig.list`(.)
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.userfield.document.list(select, filter, order, start)
```

Метод возвращает список значений пользовательских полей документов складского учёта.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select**
[`array`](../../data-types.md)| Массив с полями, которые надо показать. Обязательно должен быть указан `documentType` – [тип документов складского учёта](../enum/catalog-enum-get-store-document-types.md). | ||
|| **order** 
[`object`](../../data-types.md)| Список для определения порядка отображения, где ключ – название поля, а значение – `ASC` или `DESC`. | ||
|| **filter** 
[`object`](../../data-types.md)| Список для фильтрации. Обязательно должен быть указан `documentType` – [тип документов складского учёта](../enum/catalog-enum-get-store-document-types.md). | ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

В API используются названия полей в виде `field[ID поля в базе]` – например, `field288`. ID поля можно узнать с помощью метода [`userfieldconfig.list`](.).

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.userfield.document.list',
        {
          select: [
            'documentType',
            'documentId',
            'field287',
            'field288',
            'field289',
          ],
          filter: {
            'documentType': 'S',
            '>=field287': 10,
          },
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
      const generator = $b24.fetchListMethod('catalog.userfield.document.list', {
        select: [
          'documentType',
          'documentId',
          'field287',
          'field288',
          'field289',
        ],
        filter: {
          'documentType': 'S',
          '>=field287': 10,
        },
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('catalog.userfield.document.list', {
        select: [
          'documentType',
          'documentId',
          'field287',
          'field288',
          'field289',
        ],
        filter: {
          'documentType': 'S',
          '>=field287': 10,
        },
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
                'catalog.userfield.document.list',
                [
                    'select' => [
                        'documentType',
                        'documentId',
                        'field287',
                        'field288',
                        'field289',
                    ],
                    'filter' => [
                        'documentType' => 'S',
                        '>=field287'   => 10,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling catalog.userfield.document.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'catalog.userfield.document.list',
    {
        select: [
            'documentType',
            'documentId',
            'field287',
            'field288',
            'field289',
        ],
        filter:{
            'documentType' : 'S',
            '>=field287': 10,
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

- Для HTTPS:

    ```
    https://ваш_портал/rest/catalog.userfield.document.list?auth=_ключ_авторизации_&start=50
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
