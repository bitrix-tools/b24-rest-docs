# Получить список зарегистрированных типов пользовательских полей userfieldtype.list

> Scope: [`в зависимости от места встройки`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список зарегистрированных приложением типов пользовательских полей. На выход отдает список типов полей с постраничной навигацией.

Без параметров. 

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userfieldtype.list
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/userfieldtype.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'userfieldtype.list',
        {},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('userfieldtype.list', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('userfieldtype.list', {}, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP

    ```php        
    try {
        $userFieldTypesResult = $serviceBuilder->getPlacementScope()->userFieldType()->list();
        $userFieldTypes = $userFieldTypesResult->getUserFieldTypes();
        foreach ($userFieldTypes as $userFieldType) {
            print("Description: " . $userFieldType->DESCRIPTION . "\n");
            print("Handler: " . $userFieldType->HANDLER . "\n");
            print("Title: " . $userFieldType->TITLE . "\n");
            print("User Type ID: " . $userFieldType->USER_TYPE_ID . "\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldtype.list',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldtype.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "USER_TYPE_ID": "my_custom_type_2",
            "HANDLER": "http:\/\/test.com\/test2.php",
            "TITLE": "test title 2",
            "DESCRIPTION":"test desc 2"
        },
        {
            "USER_TYPE_ID": "my_custom_type_1",
            "HANDLER": "http:\/\/test.com\/test1.php",
            "TITLE": "test title 1",
            "DESCRIPTION": "test desc 1"
        },
        {
            "USER_TYPE_ID": "test_user_type",
            "HANDLER": "http:\/\/test.com\/test.php",
            "TITLE": "test title",
            "DESCRIPTION": "test desc"
        }
    ],
    "total": 3,
    "time":{
        "start":1724423274.842117,
        "finish":1724423275.558021,
        "duration":0.7159039974212646,
        "processing":0.0018908977508544922,
        "date_start":"2024-08-23T16:27:54+02:00",
        "date_finish":"2024-08-23T16:27:55+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **total**
[`integer`](../../data-types.md) | Число обработанных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Продолжите изучение

- [{#T}](./userfieldtype-add.md)
- [{#T}](./userfieldtype-update.md)
- [{#T}](./userfieldtype-delete.md)