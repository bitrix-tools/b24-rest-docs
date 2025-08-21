# Получить поля свойства товаров или вариаций catalog.productProperty.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.productProperty.getFields()
```

Метод возвращает поля свойств товаров или вариаций.

## Параметры

Без параметров.

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.productProperty.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.productProperty.getFields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.productProperty.getFields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error().ex);
    	}
    	else
    	{
    		console.log(result);
    	}
    }
    catch(error)
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
                'catalog.productProperty.getFields',
                []
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
        echo 'Error getting product property fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productProperty.getFields',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productProperty.getFields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Возвращаемые поля

#|
|| **Поле ** | **Описание** | **Примечание** ||
|| **active** 
[`char`](../../data-types.md) | Активно ли свойство. | ||
|| **code** 
[`string`](../../data-types.md) | Символьный код. | ||
|| **rowCount, colCount**
[`integer`](../../data-types.md) | Размер поля для ввода значения (Строк х Столбцов). | ||
|| **defaultValue** 
[`text`](../../data-types.md) | Значение по умолчанию. | ||
|| **filtrable** 
[`char`](../../data-types.md) | Выводить ли на странице списка элементов поле для фильтрации по этому свойству. | ||
|| **hint** 
[`string`](../../data-types.md) | Подсказка. | ||
|| **iblockId^*^** 
[`integer`](../../data-types.md) | Идентификатор инфоблока. | ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор свойства. | Только для чтения. ||
|| **isRequired** 
[`char`](../../data-types.md) | Является ли обязательным. | ||
|| **linkIblockId** 
[`integer`](../../data-types.md) | Идентификатор инфоблока, с элементами которого связано значение. На сегодняшний день поле не используется (данное поле предназначено для типов, которые пока в REST не поддерживаются). | ||
|| **listType**
[`char`](../../data-types.md) | Внешний вид. | Только для поля типа "Список". ||
|| **multiple** 
[`char`](../../data-types.md) | Является ли свойство множественным. | ||
|| **multipleCnt** 
[`integer`](../../data-types.md) | Количество полей для ввода новых множественных значений. | ||
|| **name^*^** 
[`string`](../../data-types.md) | Название. | ||
|| **propertyType^*^** 
[`string`](../../data-types.md) | Тип свойства. |  ||
|| **searchable** 
[`char`](../../data-types.md) | Участвуют ли значения свойства в поиске. | ||
|| **sort** 
[`integer`](../../data-types.md) | Порядок сортировки. | ||
|| **timestampX** 
[`datetime`](../../data-types.md) | Дата последнего изменения параметров. | Только для чтения. ||
|| **userType** 
[`string`](../../data-types.md) | Пользовательский тип свойства. | ||
|| **withDescription** 
[`char`](../../data-types.md) | Выводить ли поле для описания значения. | ||
|| **xmlId** 
[`string`](../../data-types.md) | Внешний идентификатор. | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}