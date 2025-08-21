# Обновить раздел хранилища entity.section.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.section.update` обновляет раздел хранилища. Пользователь должен обладать хотя бы правами на запись (**W**) в хранилище.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища. ||
|| **ID^*^**
[`integer`](../../data-types.md) | Обязательный. Идентификатор обновляемого раздела. ||
|| **NAME**
[`string`](../../data-types.md) | Наименование раздела. ||
|| **DESCRIPTION**
[`unknown`](../../data-types.md) | Описание раздела. ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Флаг активности раздела (Y\|N). ||
|| **SORT**
[`unknown`](../../data-types.md) | Сортировочный параметр раздела. ||
|| **PICTURE**
[`unknown`](../../data-types.md) | Картинка раздела. ||
|| **DETAIL_PICTURE**
[`unknown`](../../data-types.md) | Детальная картинка раздела. ||
|| **SECTION**
[`unknown`](../../data-types.md) | Идентификатор родительского раздела. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.section.update',
    		{
    			ENTITY: 'menu_new',
    			ID: 220,
    			NAME: 'Не очень тестовый раздел'
    		}
    	);
    	
    	const result = response.getData().result;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.section.update',
                [
                    'ENTITY' => 'menu_new',
                    'ID'     => 220,
                    'NAME'   => 'Не очень тестовый раздел',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating entity section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.section.update',
        {
            ENTITY: 'menu_new',
            ID: 220,
            NAME: 'Не очень тестовый раздел'
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.section.update.json?auth=9affe382af74d9c5caa588e28096e872&ENTITY=menu_new&ID=220&NAME=%D0%9D%D0%B5%20%D0%BE%D1%87%D0%B5%D0%BD%D1%8C%20%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9%20%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```