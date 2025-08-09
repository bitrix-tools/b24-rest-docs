# Изменить атрибуты ноды блока landing.block.updateattrs

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

Метод `landing.block.updateattrs` изменяет атрибуты ноды блока. Возвращает _true_ или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **data**
[`unknown`](../../../data-types.md) | Массив селектора и новых значений дата-атрибутов.
Например, `data: {'.bitrix24forms': {'data-b24form': 'tratrata'}}`.
Манифест должен содержать в себе [атрибуты](../manifest.md#ключ-attrs), которые вы хотите изменять таким образом. | ||
|#

Если атрибут относится к карточке (то есть может иметь различное содержимое от карточки к карточке), селектор необходимо передавать с разделителем @:

```http
data: {
    '.container-fluid@1': {//влияние произойдет на атрибут второй карточки (отсчет от нуля)
        'data-test-checkbox': [1, 2, 3]
    }
}
```

## Типы изменяемого контента

Каждый тип атрибута обладает тем или иным форматом сохранения. В примерах даны значения по-умолчанию для каждого [типа](../attributes.md#типы-атрибутов). Передача нового значения происходит по аналогичному формату. Например, сохранение в атрибут типа **image**:

```http
data: {
    '.container-fluid': {
        'data-test-image': {src: 'https://i.img.com/images/i/291626458734-0-1/s-l1000.jpg', alt: 666}
    }
}
```

Отдельные пояснения для типа **checkbox** и **multiselect**: для сохранения нового значения необходимо отправлять значения выделенных элементов:

```http
data: {
    '.container-fluid': {
        'data-test-checkbox': [1, 2, 3]
    }
}
```

Редактирование параметров динамических блоков производится через метод [landing.block.updatenodes](./landing-block-update-nodes.md).

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updateattrs',
    		{
    			lid: 313,
    			block: 6134,
    			data: {
    				'.bitrix24forms': {
    					'data-b24form': 'tratrata'
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch(error)
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
                'landing.block.updateattrs',
                [
                    'lid'   => 313,
                    'block' => 6134,
                    'data'  => [
                        '.bitrix24forms' => [
                            'data-b24form' => 'tratrata'
                        ]
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
        echo 'Error updating block attributes: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updateattrs',
        {
            lid: 313,
            block: 6134,
            data: {
                '.bitrix24forms': {
                    'data-b24form': 'tratrata'
                }
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

