# Удалить привязку поставщика к документу catalog.documentcontractor.delete

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами:
> — «Просмотр» и «Cоздание и редактирование» на тип документа «Приход»,
> — «Просмотр раздела Складской учет»
> — «Просмотр каталога товаров»    

Метод `catalog.documentcontractor.delete` удаляет поставщика из документа складского учета.

## Параметры метода  

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}  

#|
|| **Название**
`тип` | **Описание** || 
|| **id***
[`catalog_documentcontractor.id`](../data-types.md#catalog_documentcontractor) | Идентификатор привязки поставщика к документу. Получить можно методом [catalog.documentcontractor.list](./catalog-documentcontractor-list.md) ||  
|#  

## Примеры кода  

{% include [Сноска о примерах](../../../_includes/examples.md) %}  

{% list tabs %}

- cURL (Webhook)

    ```bash 
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.documentcontractor.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.documentcontractor.delete
    ```

- JS

    ```js 
    try
    {
        const response = await $b24.callMethod(
            'catalog.documentcontractor.delete',
            { id: 42 }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.documentcontractor.delete',
                [
                    'id' => 42,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result === true) {
            echo 'Contractor binding deleted';
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting contractor binding: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.documentcontractor.delete',
        { id: 42 },
        function(result)
        {
            if (result.error())
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
        'catalog.documentcontractor.delete',
        [
            'id' => 42,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}    

## Обработка ответа  

HTTP-код: **200**

```json
{
     "result": true,
     "time": {
         "start": 1761908531,
         "finish": 1761908531.935914,
         "duration": 0.9359140396118164,
         "processing": 0,
         "date_start": "2025-10-31T14:02:11+03:00",
         "date_finish": "2025-10-31T14:02:11+03:00",
         "operating_reset_at": 1761909131,
         "operating": 0
    }
}
```

## Возвращаемые данные  

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md)| Корневой элемент ответа, содержит `true`, если привязка успешно удалена.  
Если ответ содержит `null` — привязка не найдена или у пользователя нет прав на изменение документа ||  
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса || 
|#  

## Обработка ошибок  

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}  

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Binding was not found"
}
```

### Возможные коды ошибок  

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Binding was not found | Указанный идентификатор привязки не существует ||  
|| `0` | Access denied | Недостаточно прав для изменения документа складского учета ||  
|| `0` | Contractors should be provided by CRM | Модуль CRM не активен как поставщик контрагентов ||  
|#  

{% include [Системные ошибки](../../../_includes/system-errors.md) %}  

## Продолжите изучение  

- [{#T}](./catalog-documentcontractor-list.md)  
- [{#T}](./catalog-documentcontractor-add.md)  
- [{#T}](./catalog-documentcontractor-get-fields.md)

