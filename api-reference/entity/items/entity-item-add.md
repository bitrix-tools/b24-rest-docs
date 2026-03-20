# Добавить элемент хранилища entity.item.add

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

Метод `entity.item.add` добавляет элемент хранилища. Пользователь должен обладать хотя бы правами на запись (**W**) в хранилище.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища. ||
|| **NAME**^*^
[`string`](../../data-types.md) | Обязательный. Наименование элемента. ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Флаг активности элемента (Y\|N). ||
|| **DATE_ACTIVE_FROM**
[`unknown`](../../data-types.md) | Дата начала активности элемента. ||
|| **DATE_ACTIVE_TO**
[`unknown`](../../data-types.md) | Дата окончания активности элемента. ||
|| **SORT**
[`unknown`](../../data-types.md) | Сортировочный вес элемента. ||
|| **PREVIEW_PICTURE**
[`unknown`](../../data-types.md) | Картинка анонса элемента. Как передать файл в поле описано в статье [Как загрузить файлы](../../files/how-to-upload-files.md). ||
|| **PREVIEW_TEXT**
[`unknown`](../../data-types.md) | Анонс элемента. ||
|| **DETAIL_PICTURE**
[`unknown`](../../data-types.md) | Детальная картинка элемента. Как передать файл в поле описано в статье [Как загрузить файлы](../../files/how-to-upload-files.md). ||
|| **DETAIL_TEXT**
[`unknown`](../../data-types.md) | Детальный текст элемента. ||
|| **CODE**
[`unknown`](../../data-types.md) | Символьный код элемента. ||
|| **SECTION**
[`unknown`](../../data-types.md) | Идентификатор раздела хранилища. ||
|| **PROPERTY_VALUES**
[`unknown`](../../data-types.md) | Ассоциативный список значений свойств элемента. Свойства хранилища создаются при помощи [entity.item.property.add](./properties/entity-item-property-add.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.add',
    		{
    			ENTITY: 'menu_new',
    			DATE_ACTIVE_FROM: new Date(),
    			DETAIL_PICTURE: '',
    			NAME: 'Hello, world!',
    			PROPERTY_VALUES: {
    				test: 11,
    				test1: 22,
    				test_file: ''
    			},
    			SECTION: 219
    		}
    	);
    	
    	const result = response.getData().result;
    	// Необходимая вам логика обработки данных
    	processResult(result);
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
                'entity.item.add',
                [
                    'ENTITY'          => 'menu_new',
                    'DATE_ACTIVE_FROM' => new DateTime(),
                    'DETAIL_PICTURE'  => '',
                    'NAME'            => 'Hello, world!',
                    'PROPERTY_VALUES' => [
                        'test'     => 11,
                        'test1'    => 22,
                        'test_file' => ''
                    ],
                    'SECTION'         => 219
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
        echo 'Error adding entity item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'entity.item.add',
        {
            ENTITY: 'menu_new',
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_PICTURE: '',
            NAME: 'Hello, world!',
            PROPERTY_VALUES: {
                test: 11,
                test1: 22,
                test_file: ''
            },
            SECTION: 219
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.add.json?DATE_ACTIVE_FROM=2013-06-26T11%3A54%3A30.421Z&DETAIL_PICTURE=&ENTITY=menu_new&NAME=Hello%2C%20world!&PROPERTY_VALUES%5Btest1%5D=22&PROPERTY_VALUES%5Btest%5D=11&PROPERTY_VALUES%5Btest_file%5D=&SECTION=219&auth=9affe382af74d9c5caa588e28096e872
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":842}
```
