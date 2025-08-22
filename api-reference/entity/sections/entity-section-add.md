# Добавить раздел хранилища entity.section.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.section.add` добавляет раздел хранилища. Пользователь должен обладать хотя бы правами на запись (**W**) в хранилище.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища. ||
|| **NAME**^*^
[`string`](../../data-types.md) | Обязательный. Наименование раздела. ||
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
    		'entity.section.add',
    		{
    			ENTITY: 'menu_new',
    			'NAME': 'Тестовый раздел'
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
                'entity.section.add',
                [
                    'ENTITY' => 'menu_new',
                    'NAME'   => 'Тестовый раздел',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding entity section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.section.add',
        {
            ENTITY: 'menu_new',
            'NAME': 'Тестовый раздел'
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.section.add.json?ENTITY=menu_new&NAME=%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9%20%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB&auth=9affe382af74d9c5caa588e28096e872
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":220}
```

