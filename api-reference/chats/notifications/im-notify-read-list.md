# Прочитать список уведомлений (кроме CONFIRM) im.notify.read.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.read.list` «прочитывает» список уведомлений, исключая уведомления типа CONFIRM.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **IDS^*^**
[`unknown`](../../data-types.md) | `[1,2,3]` | Массив идентификаторов уведомлений | 30 ||
|| **ACTION**
[`unknown`](../../data-types.md) | `'Y'` | Отметить, как прочитанные|непрочитанные (`Y`\|`N`) | 30 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'im.notify.read.list',
        {
          IDS: [1, 2, 3],
          ACTION: 'Y'
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
      const generator = $b24.fetchListMethod('im.notify.read.list', { IDS: [1, 2, 3], ACTION: 'Y' }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('im.notify.read.list', { IDS: [1, 2, 3], ACTION: 'Y' }, 0)
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
                'im.notify.read.list',
                [
                    'IDS'    => [1, 2, 3],
                    'ACTION' => 'Y',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error reading notification list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.read.list',
        {
            IDS: [1,2,3],
            ACTION: 'Y'
        },
        res => {
            if (res.error())
            {
            console.error(result.error().ex);
            }
            else
            {
            console.log(res.data())
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}        
```

## Ответ в случае ошибки

```json
{
    "error": "PARAMS_ERROR",
    "error_description": "No IDS param or it is not an array"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **PARAMS_ERROR** | Не передан параметр `IDS` или он не является массивом ||
|#