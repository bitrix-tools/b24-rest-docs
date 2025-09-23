# Получить список доступных хранилищ disk.storage.getlist

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- нет подробного примера в случае успеха

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.storage.getlist` возвращает список доступных хранилищ.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **filter**
[`unknown`](../../data-types.md) | Необязательный параметр. Поддерживает фильтрацию по полям, которые указаны в [disk.storage.getfields](./disk-storage-get-fields.md) как `USE_IN_FILTER: true`. ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

{% note info %}

Cм. также описание [списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

{% endnote %}

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'disk.storage.getlist',
        {
          filter: {
            'ENTITY_TYPE': 'group',
            '%NAME': 'Фут'
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
      const generator = $b24.fetchListMethod('disk.storage.getlist', { filter: { 'ENTITY_TYPE': 'group', '%NAME': 'Фут' } }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('disk.storage.getlist', { filter: { 'ENTITY_TYPE': 'group', '%NAME': 'Фут' } }, 0)
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
                'disk.storage.getlist',
                [
                    'filter' => [
                        'ENTITY_TYPE' => 'group',
                        '%NAME'      => 'Фут'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching for group storage: ' . $e->getMessage();
    }
    ```

- BX24.js

```js
//поиск хранилища группы с именем содержащем "Фут"
BX24.callMethod(
    "disk.storage.getlist",
    {
        filter: {
            'ENTITY_TYPE': 'group',
            '%NAME': 'Фут'
        }
    },
    function (result)
    {
        if (result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

В ответе массив объектов, структура которых аналогична [disk.storage.get](./disk-storage-get.md).