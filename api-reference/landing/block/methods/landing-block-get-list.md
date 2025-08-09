# Получить список блоков страницы landing.block.getlist

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.block.getlist` получает список блоков страницы. Возвращает массив блоков или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы, или массив идентификаторов. | ||
|| **params**
[`unknown`](../../../data-types.md) | Параметры:
- **edit_mode** - Режим редактирования (1) или нет (0 - по умолчанию), вернется разный набор блоков. Обратите внимание, если вы еще [не публиковали страницу](../../page/methods/landing-landing-publication.md), в случае режима 0 не вернется ничего.
- **deleted** - удаленные (1) или нет (0) блоки, по умолчанию выводятся все не удаленные. В режиме `edit_mode=0` удаленных блоков быть не может. | ||
|#

## Примеры

{% list tabs %}

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.block.getlist',
                [
                    'lid' => 313,
                    'params' => [
                        'edit_mode' => 0
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting block list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getlist',
        {
            lid: 313,
            params: {
                edit_mode: 0
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

